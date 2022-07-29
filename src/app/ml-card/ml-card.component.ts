import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartOrder } from '../shared/models/smart-order';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import * as moment from 'moment-timezone';
import * as _ from 'lodash';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PortfolioService, DaytradeService, ReportingService, BacktestService, MachineLearningService } from '../shared';
import { Holding } from '../shared/models';
import { GlobalSettingsService, Brokerage } from '../settings/global-settings.service';
import { take, takeWhile } from 'rxjs/operators';
import { SchedulerService } from '@shared/service/scheduler.service';

interface Bet {
  total: number;
  bearishOpen: number;
  bullishOpen: number;
  summary: String;
}

enum Sentiment {
  Bullish = 'Bullish',
  Bearish = 'Bearish',
  Neutral = 'Neutral'
}

@Component({
  selector: 'app-ml-card',
  templateUrl: './ml-card.component.html',
  styleUrls: ['./ml-card.component.css']
})
export class MlCardComponent implements OnInit {
  @ViewChild('stepper', { static: false }) stepper;

  sub: Subscription;

  alive: boolean;
  live: boolean;

  pendingResults: boolean;

  bullishPlay: FormControl;
  bearishPlay: FormControl;
  selectedModel: FormControl;
  settings: FormControl;

  error: string;
  warning: string;

  interval: number;
  reportWaitInterval: number;
  holdingCount: number;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  longOnly = new FormControl();
  allIn = new FormControl();
  inverse = new FormControl();
  triggerDaily = new FormControl();

  startTime: moment.Moment;
  stopTime: moment.Moment;

  tiles;

  testing = new FormControl();

  multiplierPreference: FormControl;
  multiplierList: number[];

  stockConstant = 'SPY';

  constructor(private _formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private daytradeService: DaytradeService,
    private reportingService: ReportingService,
    private backtestService: BacktestService,
    public globalSettingsService: GlobalSettingsService,
    private schedulerService: SchedulerService,
    private machineLearningService: MachineLearningService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.live = false;
    this.alive = true;
    this.longOnly.setValue(false);
    this.allIn.setValue(false);
    this.inverse.setValue(false);
    this.triggerDaily.setValue(false);
    this.testing.setValue(false);

    this.multiplierList = [
      1,
      2,
      3,
      4,
      5
    ];

    this.multiplierPreference = new FormControl();
    this.multiplierPreference.setValue(1);

    this.firstFormGroup = this._formBuilder.group({
      amount: [1000, Validators.required],
      symbol: []
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.bullishPlay = new FormControl('SPY', [
      Validators.required
    ]);

    this.bearishPlay = new FormControl('TLT', [
      Validators.required
    ]);

    this.selectedModel = new FormControl('V2', [
      Validators.required
    ]);

    this.settings = new FormControl('openPositions', [
      Validators.required
    ]);

    this.setup();
  }

  getTrainingStock() {
    if (this.bullishPlay.value === 'CUSTOM' && this.firstFormGroup.value.symbol) {
      return this.firstFormGroup.value.symbol;
    } else {
      return 'SPY';
    }
  }

  getBullPick() {
    if (this.bullishPlay.value === 'CUSTOM' && this.firstFormGroup.value.symbol) {
      return this.firstFormGroup.value.symbol;
    } else {
      return this.bullishPlay.value;
    }
  }

  trainModel() {
    if (this.selectedModel.value === 'V3') {
      this.backtestService.runLstmV3(this.getTrainingStock(),
        moment().subtract({ day: 1 }).format('YYYY-MM-DD'),
        moment().subtract({ day: 365 }).format('YYYY-MM-DD'),
        0.7,
        '0,0,1,0,0,1,1,1,1,1,1,0,0')
        .subscribe(() => { });
    } else {
      this.backtestService.runLstmV2(this.getTrainingStock(),
        moment().subtract({ day: 2 }).format('YYYY-MM-DD'),
        moment().subtract({ day: 90 }).format('YYYY-MM-DD')).subscribe(() => { });
    }
  }

  getTradeDay() {
    const momentObj = moment.tz('America/New_York');

    if (momentObj.day() === 6) {
      return momentObj.subtract({ day: 1 }).format('YYYY-MM-DD');
    } else if (momentObj.day() === 0) {
      return momentObj.subtract({ day: 2 }).format('YYYY-MM-DD');
    }
    console.log('Date:', momentObj, moment(), new Date());

    return momentObj.format('YYYY-MM-DD');
  }

  executeNow() {
    this.sendActivation();
  }

  goLive() {
    this.setup();
    this.trainModel();
    this.alive = true;
    this.sub = TimerObservable.create(0, this.interval)
      .pipe(
        takeWhile(() => this.alive))
      .subscribe(() => {
        this.live = true;
        const momentInst = moment();
        if (momentInst.isAfter(this.startTime) &&
          momentInst.isBefore(this.stopTime) || this.testing.value) {
          if (this.triggerDaily.value === true) {
            this.globalSettingsService.tradeDayStart
              .pipe(take(1))
              .subscribe(start => {
                if (start) {
                  this.goLive();
                }
              });
          }
          this.alive = false;
          this.pendingResults = true;
          this.executeNow();
        }
      });
  }

  determineBet(prediction) {
    const bet: Bet = {
      total: 0,
      bearishOpen: 0,
      bullishOpen: 0,
      summary: Sentiment.Neutral
    };

    if (prediction.nextOutput > 0.55) {
      bet.bullishOpen++;
    } else if (prediction.nextOutput < 0.45) {
      bet.bearishOpen++;
    }
    bet.total++;

    const bullishRatio = _.floor(_.divide(bet.bullishOpen, bet.total), 2);
    const bearishRatio = _.floor(_.divide(bet.bearishOpen, bet.total), 2);

    if (bullishRatio > 0.6 || bearishRatio > 0.6) {
      if (bullishRatio > bearishRatio) {
        bet.summary = Sentiment.Bullish;
      } else if (bearishRatio > bullishRatio) {
        bet.summary = Sentiment.Bearish;
      } else {
        bet.summary = Sentiment.Neutral;
      }
    }

    this.reportingService.addAuditLog(null, bet);

    return bet;
  }

  getOrder(symbol: string) {
    const newHolding: Holding = {
      instrument: null,
      symbol,
    };

    const order: SmartOrder = {
      holding: newHolding,
      quantity: 0,
      price: 0,
      submitted: false,
      pending: false,
      side: 'DayTrade',
    };
    return order;
  }

  placeBet(bet: Bet) {
    switch (bet.summary) {
      case Sentiment.Bullish:
        if (this.settings.value === 'closePositions') {
          this.sellAll(this.getOrder(this.inverse.value ? this.getBullPick() : this.bearishPlay.value));
        } else if (this.settings.value === 'openPositions') {
          this.buy(this.getOrder(this.inverse.value ? this.bearishPlay.value : this.getBullPick()), _.divide(bet.bullishOpen, bet.total));
        }

        break;
      case Sentiment.Bearish:
        if (this.settings.value === 'closePositions') {
          this.sellAll(this.getOrder(this.inverse.value ? this.bearishPlay.value : this.getBullPick()));
        } else if (this.settings.value === 'openPositions' && !this.longOnly.value) {
          this.buy(this.getOrder(this.inverse.value ? this.getBullPick() : this.bearishPlay.value), _.divide(bet.bearishOpen, bet.total));
        }
        break;
      default:
        const log = 'Neutral position. No orders made.';
        this.reportingService.addAuditLog(null, log);
        this.setWarning(log);
        this.snackBar.open(log, 'Dismiss');
        break;
    }
  }

  getQuote(symbol: string) {
    return this.portfolioService.getQuote(symbol)
      .map((quote) => {
        let bid: number = quote.price;

        if (_.round(_.divide(quote.askPrice, quote.bidPrice), 3) < 1.005) {
          bid = quote.askPrice;
        } else {
          bid = quote.price;
        }

        return bid;
      });
  }

  sellAll(order: SmartOrder) {
    const resolve = () => {
      this.snackBar.open(`Sell all ${order.holding.symbol} order sent`, 'Dismiss');
    };

    const reject = (error) => {
      this.error = error._body;
      this.snackBar.open(`Error selling ${order.holding.symbol}`, 'Dismiss');
    };

    const notFound = (error) => {
      this.error = error._body;
      this.snackBar.open(`${order.holding.symbol} position not found`, 'Dismiss');
    };
    return this.getQuote(order.holding.symbol)
      .subscribe((bid) => {
        order.price = bid;
        this.daytradeService.closePosition(order, 'limit', resolve, reject, notFound);
      });
  }

  buy(order: SmartOrder, modifier: number) {
    return this.getQuote(order.holding.symbol)
      .subscribe((bid) => {
        if (this.globalSettingsService.brokerage === Brokerage.Td) {
          this.portfolioService.getTdBalance()
            .subscribe(balance => {
              const totalBalance = _.add(balance.cashBalance, balance.moneyMarketFund);
              let totalBuyAmount = this.firstFormGroup.value.amount;

              if (this.allIn.value === true || totalBuyAmount > totalBalance) {
                totalBuyAmount = totalBalance;
              }

              this.initiateBuy(modifier, totalBuyAmount, bid, order);
            });
        } else if (this.globalSettingsService.brokerage === Brokerage.Robinhood) {
          this.initiateBuy(modifier, this.firstFormGroup.value.amount, bid, order);
        }
      });
  }

  initiateBuy(modifier: number, totalBuyAmount: number, bid: number, order: SmartOrder) {
    const quantity = _.floor(modifier * this.calculateQuantity(totalBuyAmount, bid)) * this.multiplierPreference.value;
    const buyOrder = this.daytradeService.createOrder(order.holding, 'Buy', quantity, bid, moment().unix());
    const log = `ORDER SENT ${buyOrder.side} ${buyOrder.holding.symbol} ${buyOrder.quantity} ${buyOrder.price}`;

    const resolve = () => {
      this.holdingCount += quantity;
      console.log(`${moment().format('hh:mm')} ${log}`);
      this.reportingService.addAuditLog(order.holding.symbol, log);
    };

    const reject = (error) => {
      this.error = error._body;
    };
    this.portfolioService.extendedHoursBuy(buyOrder.holding, buyOrder.quantity, buyOrder.price).subscribe(
      response => {
        resolve();
      },
      error => {
        reject(error);
      });
    this.stop();
  }

  calculateQuantity(betSize: number, price: number) {
    return _.floor(_.divide(betSize, price));
  }

  goLiveClick(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Confirm', message: 'Are you sure you want to execute this order?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goLive();
      }
    });
  }

  setWarning(message) {
    this.warning = message;
    this.reportingService.addAuditLog('', `ML Card - ${message}`);
  }

  stop() {
    this.alive = false;
    this.live = false;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  resetStepper(stepper) {
    stepper.selectedIndex = 0;
    this.stop();
  }

  setup() {
    this.startTime = moment.tz(`${this.globalSettingsService.getTradeDate().format('YYYY-MM-DD')} 15:30`, 'America/New_York');
    this.stopTime = moment.tz(`${this.globalSettingsService.getTradeDate().format('YYYY-MM-DD')} 16:00`, 'America/New_York');

    this.holdingCount = 0;
    this.warning = '';
    this.holdingCount = 0;

    this.interval = 300000;
    this.reportWaitInterval = 180000;
  }

  setTest() {
    if (this.testing.value) {
      this.interval = 1000;
      this.reportWaitInterval = 50000;
    }
  }

  activateAllIn() {
    if (this.allIn.value === true) {
      this.firstFormGroup.disable();
    } else {
      this.firstFormGroup.enable();
    }
  }

  sendActivation() {
    const activationHash = {};
    const activationIntradayash = {};
    let responseCount = 0;

    this.schedulerService.schedule(() => {
      this.backtestService.getDailyActivationData('SPY').subscribe(activationData => {
        activationHash['SPY'] = activationData;
        responseCount++;
        this.handleResponse(responseCount, activationHash, activationIntradayash);
      });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getCurrentIntradayActivationData('SPY')
        .subscribe(intradayQuotes => {
          activationIntradayash['SPY'] = intradayQuotes;
          responseCount++;
          this.handleResponse(responseCount, activationHash, activationIntradayash);
        });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getDailyActivationData('QQQ').subscribe(activationData => {
        activationHash['QQQ'] = activationData;
        responseCount++;
        this.handleResponse(responseCount, activationHash, activationIntradayash);
      });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getCurrentIntradayActivationData('QQQ')
        .subscribe(intradayQuotes => {
          activationIntradayash['SPY'] = intradayQuotes;
          responseCount++;
          this.handleResponse(responseCount, activationHash, activationIntradayash);
        });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getDailyActivationData('TLT').subscribe(activationData => {
        activationHash['TLT'] = activationData;
        responseCount++;
        this.handleResponse(responseCount, activationHash, activationIntradayash);
      });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getCurrentIntradayActivationData('TLT')
        .subscribe(intradayQuotes => {
          activationIntradayash['TLT'] = intradayQuotes;
          responseCount++;
          this.handleResponse(responseCount, activationHash, activationIntradayash);
        });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getDailyActivationData('GLD').subscribe(activationData => {
        activationHash['GLD'] = activationData;
        responseCount++;
        this.handleResponse(responseCount, activationHash, activationIntradayash);
      });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getCurrentIntradayActivationData('GLD')
        .subscribe(intradayQuotes => {
          activationIntradayash['GLD'] = intradayQuotes;
          responseCount++;
          this.handleResponse(responseCount, activationHash, activationIntradayash);
        });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getDailyActivationData('VXX').subscribe(activationData => {
        activationHash['VXX'] = activationData;
        responseCount++;
        this.handleResponse(responseCount, activationHash, activationIntradayash);
      });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getCurrentIntradayActivationData('VXX')
        .subscribe(intradayQuotes => {
          activationIntradayash['VXX'] = intradayQuotes;
          responseCount++;
          this.handleResponse(responseCount, activationHash, activationIntradayash);
        });
    }, 'ml_card_activation', this.stopTime);


    this.schedulerService.schedule(() => {
      this.backtestService.getDailyActivationData('HYG').subscribe(activationData => {
        activationHash['HYG'] = activationData;
        responseCount++;
        this.handleResponse(responseCount, activationHash, activationIntradayash);
      });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getCurrentIntradayActivationData('HYG')
        .subscribe(intradayQuotes => {
          activationIntradayash['HYG'] = intradayQuotes;
          responseCount++;
          this.handleResponse(responseCount, activationHash, activationIntradayash);
        });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getDailyActivationData(this.getTrainingStock()).subscribe(activationData => {
        activationHash[this.getTrainingStock()] = activationData;
        responseCount++;
        this.handleResponse(responseCount, activationHash, activationIntradayash);
      });
    }, 'ml_card_activation', this.stopTime);

    this.schedulerService.schedule(() => {
      this.backtestService.getCurrentIntradayActivationData(this.getTrainingStock())
        .subscribe(intradayQuotes => {
          activationIntradayash[this.getTrainingStock()] = intradayQuotes;
          responseCount++;
          this.handleResponse(responseCount, activationHash, activationIntradayash);
        });
    }, 'ml_card_activation', this.stopTime);
  }

  handleResponse(responseCount, activationHash, activationIntradayash) {
    if (responseCount > 16) {
      const quotes = [
        activationHash['SPY'],
        activationHash['QQQ'],
        activationHash['TLT'],
        activationHash['GLD'],
        activationHash['VXX'],
        activationHash['IWM'],
        activationHash['HYG'],
        activationHash[this.getTrainingStock()]
      ];

      const intradayQuotes = [
        activationIntradayash['SPY'],
        activationIntradayash['QQQ'],
        activationIntradayash['TLT'],
        activationIntradayash['GLD'],
        activationIntradayash['VXX'],
        activationIntradayash['IWM'],
        activationIntradayash['HYG'],
        activationIntradayash[this.getTrainingStock()]
      ];

      let input = [new Date().getUTCDay()];
      quotes.forEach((val, idx) => {
        const quote = val[val.length - 2]; // TODO CHANGE TO -1
        const intraday = intradayQuotes[idx].candles;
        const datetime = intraday[intraday.length - 2].datetime;
        if (moment(datetime).diff(moment(quote.date), 'days') > 1) {
          console.log(moment(quote.date).diff(moment(datetime), 'days'), quote.date, moment(datetime).format());
          console.log(`The dates ${moment(quote.date).format()} ${moment(datetime).format()} are incorrect`);
        }
        input = input.concat(this.buildTrainingData(quote, intraday));
      });

      const activationInput = [{ input }];
      return this.machineLearningService.activateBuyAtCloseModel(this.getTrainingStock(), moment().subtract({ day: 1 }), activationInput)
        .subscribe(mlResult => {
          console.log('ml data: ', this.getTradeDay(), mlResult);
          if (mlResult) {
            const bet = this.determineBet(mlResult);
            this.placeBet(bet);
            this.pendingResults = false;
          }
        });
    }
  }

  buildTrainingData(quote, intradayQuotes) {
    const currentQuote = this.processIntraday(intradayQuotes);
    return this.compareQuotes(quote, currentQuote);
  }

  compareQuotes(previousQuote, currentQuote) {
    const input = [
      previousQuote.open > currentQuote.open ? 0 : 1,
      previousQuote.close > currentQuote.close ? 0 : 1,
      previousQuote.high > currentQuote.high ? 0 : 1,
      previousQuote.low > currentQuote.low ? 0 : 1,
    ];

    return input;
  }

  processIntraday(intradayQuotes) {
    const accumulator = {
      volume: 0,
      open: null,
      close: intradayQuotes[intradayQuotes.length - 2].close,
      high: null,
      low: null,
    };

    return intradayQuotes.reduce((acc, curr) => {
      if (!acc.open) {
        acc.open = curr.open;
        acc.high = curr.high;
        acc.low = curr.low;
      } else {
        acc.high = curr.high > acc.high ? curr.high : acc.high;
        acc.low = curr.low < acc.low ? curr.low : acc.low;
      }
      return acc;
    }, accumulator);
  }
}
