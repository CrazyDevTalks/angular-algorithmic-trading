import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { PortfolioService } from '../shared/services/portfolio.service';
import { Holding } from '../shared/models';
import { BacktestService } from '../shared/services/backtest.service';
@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.css']
})
export class PortfolioTableComponent implements OnInit {
  portfolioData: Holding[];
  displayedColumns = ['name', 'symbol', 'gainz', 'quantity', 'average_buy_price', 'realtime_price', 'Volume', 'PERatio', 'realtime_chg_percent', 'created_at', 'updated_at'];
  dataSource = new MatTableDataSource();

  tickers = [];
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  constructor(
    private portfolioService: PortfolioService,
    private backtestService: BacktestService) { }

  ngOnInit() {
  }

  setData(data) {
    this.tickers = [];
    this.dataSource.data = data;
    this.dataSource.data.map((holding: Holding) => {
      return this.portfolioService.getResource(holding.instrument)
        .subscribe(result => {
          holding.symbol = result.symbol
          holding.name = result.name;
          this.tickers.push(holding.symbol);
          this.getCurrentPrice();
          return holding;
        });
    });
  }

  getCurrentPrice() {
    if (this.tickers.length >= this.dataSource.data.length) {
      this.backtestService.getPrice({ tickers: this.tickers })
        .subscribe(result => {
          this.dataSource.data.map((holding: Holding) => {
            let myQuote = result.query.results.quote.find(quote => {
              return quote.symbol === holding.symbol;
            });
            if (myQuote) {
              holding.realtime_price = myQuote.realtime_price;
              holding.Volume = myQuote.Volume;
              holding.PERatio = myQuote.PERatio;
              holding.realtime_chg_percent = myQuote.realtime_chg_percent;
            }
            return holding;
          });
          this.getCalculations();
        });
    }
  }

  getCalculations() {
    this.dataSource.data.map((holding: Holding) => {
      holding.gainz = (holding.realtime_price-holding.average_buy_price)/holding.average_buy_price;
      return holding;
    });
  }
}


