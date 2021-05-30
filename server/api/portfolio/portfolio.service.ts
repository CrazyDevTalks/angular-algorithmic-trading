import * as request from 'request-promise';
import * as Robinhood from 'robinhood';
import * as _ from 'lodash';
import * as moment from 'moment';

const RobinHoodApi = require('robinhood-api');
const robinhood = new RobinHoodApi();

import QuoteService from '../quote/quote.service';
import * as configurations from '../../config/environment';

const robinhoodDevice = {
  deviceToken: configurations.robinhood.deviceId
};

const globalAccountId = configurations.tdameritrade.accountId;

const apiUrl = 'https://api.robinhood.com/';
const tdaUrl = 'https://api.tdameritrade.com/v1/';

interface TokenInfo {
  timestamp: number;
  token: string;
}

class PortfolioService {

  access_token: { [key: string]: TokenInfo } = {};
  tdaKey = {};
  refreshToken = {};

  login(username, password, reply) {
    const options = {
      uri: apiUrl + 'oauth2/token/',
      headers: {
        'X-Robinhood-API-Version': '1.265.0'
      },
      form: {
        username: username,
        password: password,
        client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
        grant_type: 'password',
        expires_in: 86400,
        device_token: robinhoodDevice.deviceToken,
        scope: 'internal'
      }
    };

    return request.post(options)
      .then(() => reply.status(200).send({}))
      .catch((e) => (reply.status(401).send(e)));
  }

  mfaLogin(username, password, code, reply) {
    const options = {
      uri: apiUrl + 'oauth2/token/',
      headers: {
        'X-Robinhood-API-Version': '1.265.0'
      },
      form: {
        username: username,
        password: password,
        client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
        grant_type: 'password',
        expires_in: 86400,
        device_token: robinhoodDevice.deviceToken,
        scope: 'internal',
        mfa_code: code
      }
    };

    return request.post(options)
      .then((response) => reply.status(200).send(response))
      .catch((e) => (reply.status(401).send(e)));
  }

  expireToken(token, reply) {
    return request.post({
      uri: apiUrl + 'oauth2/revoke_token/',
      form: {
        client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
        token
      }
    })
      .then(() => reply.status(200).send({}))
      .catch((e) => (reply.status(401).send(e)));
  }

  getPortfolio(token, reply) {
    const options = {
      uri: apiUrl + 'positions/',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    };

    return request.get(options)
      .then((response) => reply.status(200).send(response))
      .catch((e) => (reply.status(500).send(e)));
  }

  getPositions(token, reply) {
    const options = {
      uri: apiUrl + 'positions/?nonzero=true',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return request.get(options)
      .then((response) => reply.status(200).send(response))
      .catch((e) => (reply.status(500).send(e)));
  }

  getResource(instrument, reply) {
    (async () => {
      try {
        const inst = await robinhood.getResource(instrument);
        reply.status(200).send(inst);
      } catch (e) {
        reply.status(500).send(e);
      }
    })();
  }

  getQuote(symbol, accountId) {
    if (!this.access_token[accountId]) {
      return this.renewExpiredTDAccessTokenAndGetQuote(symbol, accountId);
    } else {
      return this.getTDMarketData(symbol, accountId)
        .then(this.processTDData)
        .then(quote => {
          if (quote[symbol].delayed) {
            return this.renewExpiredTDAccessTokenAndGetQuote(symbol, accountId);
          } else {
            return quote;
          }
        })
        .catch(error => this.renewExpiredTDAccessTokenAndGetQuote(symbol, accountId));
    }
  }

  sell(account, token, instrumentUrl, symbol, quantity, price, type = 'limit',
    extendedHours = false) {
    const headers = {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Connection': 'keep-alive',
      'Authorization': `Bearer ${token}`
    };

    console.log('Sell order: ', {
      account: account,
      instrument: instrumentUrl,
      price: price,
      stop_price: null,
      quantity: quantity,
      side: 'sell',
      symbol: symbol,
      time_in_force: 'gfd',
      trigger: 'immediate',
      type: type,
      extended_hours: extendedHours
    });

    return request.post({
      uri: apiUrl + 'orders/',
      headers: headers,
      json: true,
      gzip: true,
      form: {
        account: account,
        instrument: instrumentUrl,
        price: price,
        stop_price: null,
        quantity: quantity,
        side: 'sell',
        symbol: symbol,
        time_in_force: 'gfd',
        trigger: 'immediate',
        type: type,
        extended_hours: extendedHours
      }
    });
  }

  buy(account,
    token,
    instrumentUrl,
    symbol,
    quantity,
    price,
    type = 'limit',
    extendedHours = false) {
    const headers = {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Connection': 'keep-alive',
      'Authorization': `Bearer ${token}`
    };

    console.log('Buy order: ', {
      account: account,
      instrument: instrumentUrl,
      price: price,
      stop_price: null,
      quantity: quantity,
      side: 'buy',
      symbol: symbol,
      time_in_force: 'gfd',
      trigger: 'immediate',
      type: type,
      extended_hours: extendedHours
    });

    return request.post({
      uri: apiUrl + 'orders/',
      headers: headers,
      json: true,
      gzip: true,
      form: {
        account: account,
        instrument: instrumentUrl,
        price: price,
        stop_price: null,
        quantity: quantity,
        side: 'buy',
        symbol: symbol,
        time_in_force: 'gfd',
        trigger: 'immediate',
        type: type,
        extended_hours: extendedHours
      }
    });
  }

  getInstruments(symbol, reply) {
    Robinhood().instruments(symbol, (error, response, body) => {
      if (error) {
        console.error(error);
        reply.status(500).send(error);
      } else {
        reply.status(200).send(body);
      }
    });
  }

  renewTDAuth(accountId) {
    console.log('renewTDAuth ');

    if (accountId === null) {
      for (const id in this.access_token) {
        if (id) {
          accountId = id;
        }
      }
    }

    if (this.access_token[accountId]) {
      const diffMinutes = moment().diff(moment(this.access_token[accountId].timestamp), 'minutes');
      console.log('Found access token ', diffMinutes);

      if (diffMinutes < 30) {
        return Promise.resolve();
      }
    }

    return this.getTDAccessToken(accountId);
  }

  getIntraday(symbol, accountId) {
    if (!accountId || !this.access_token[accountId]) {
      console.log('missing access token for ', accountId, this.access_token);
      return this.renewTDAuth(accountId)
        .then(() => this.getTDIntraday(symbol, accountId));
    } else {
      return this.getTDIntraday(symbol, accountId)
        .catch((error) => {
          console.log('Error retrieving access token ', error);

          return this.renewTDAuth(accountId)
            .then(() => this.getTDIntraday(symbol, accountId));
        });
    }
  }

  getTDIntraday(symbol, accountId) {
    if (!accountId) {
      accountId = configurations.tdameritrade.accountId;
    }

    const query = `${tdaUrl}marketdata/${symbol}/pricehistory`;
    const options = {
      uri: query,
      qs: {
        apikey: this.tdaKey[accountId],
        periodType: 'day',
        period: 2,
        frequencyType: 'minute',
        frequency: 1,
        endDate: Date.now(),
        needExtendedHoursData: false
      },
      headers: {
        Authorization: `Bearer ${this.access_token[accountId].token}`
      }
    };

    return request.get(options)
      .then((data) => {
        const response = this.processTDData(data);
        return QuoteService.convertTdIntraday(response.candles);
      });
  }

  getIntradayV2(symbol, period = 2, frequencyType = 'minute', frequency = 1) {
    return this.renewTDAuth(null)
      .then(() => this.getTDIntradayV2(symbol, period, frequencyType, frequency));
  }

  getTDIntradayV2(symbol, period, frequencyType, frequency) {
    const accountId = configurations.tdameritrade.accountId;

    const query = `${tdaUrl}marketdata/${symbol}/pricehistory`;
    const options = {
      uri: query,
      qs: {
        apikey: this.tdaKey[accountId],
        periodType: 'day',
        period,
        frequencyType,
        frequency,
        endDate: Date.now(),
        needExtendedHoursData: false
      },
      headers: {
        Authorization: `Bearer ${this.access_token[accountId].token}`
      }
    };

    return request.get(options)
      .then((data) => {
        return this.processTDData(data);
      });
  }

  getIntradayV3(symbol, startDate = moment().subtract({ days: 1 }).valueOf(), endDate = moment().valueOf()) {
    return this.renewTDAuth(null)
      .then(() => this.getTDIntradayV3(symbol, moment(startDate).valueOf(), moment(endDate).valueOf()));
  }

  getTDIntradayV3(symbol, startDate, endDate) {
    const accountId = configurations.tdameritrade.accountId;

    const query = `${tdaUrl}marketdata/${symbol}/pricehistory`;
    const options = {
      uri: query,
      qs: {
        apikey: this.tdaKey[accountId],
        periodType: 'day',
        period: 2,
        frequencyType: 'minute',
        frequency: 1,
        startDate,
        endDate,
        needExtendedHoursData: false
      },
      headers: {
        Authorization: `Bearer ${this.access_token[accountId].token}`
      }
    };

    return request.get(options)
      .then((data) => {
        const response = this.processTDData(data);
        return QuoteService.convertTdIntradayV2(symbol, response.candles);
      });
  }

  getDailyQuotes(symbol, startDate, endDate, accountId) {
    if (!this.access_token[accountId]) {
      console.log('missing access token');

      return this.renewTDAuth(accountId)
        .then(() => this.getTDDailyQuotes(symbol, startDate, endDate, accountId));
    } else {
      return this.getTDDailyQuotes(symbol, startDate, endDate, accountId)
        .catch(error => {
          console.log('Error retrieving access token ', error);

          return this.renewTDAuth(accountId)
            .then(() => this.getTDDailyQuotes(symbol, startDate, endDate, accountId));
        });
    }
  }

  getDailyQuoteInternal(symbol, startDate, endDate) {
    let accountId;
    const accountIds = Object.getOwnPropertyNames(this.refreshToken);
    if (accountIds.length > 0) {
      accountId = accountIds[0];
    } else if (configurations.tdameritrade.accountId) {
      accountId = configurations.tdameritrade.accountId;
    } else {
      console.log('Missing accountId');
    }
    return this.getDailyQuotes(symbol, startDate, endDate, accountId);
  }

  getTDDailyQuotes(symbol, startDate, endDate, accountId) {
    const query = `${tdaUrl}marketdata/${symbol}/pricehistory`;
    const options = {
      uri: query,
      qs: {
        apikey: this.tdaKey[accountId],
        periodType: 'month',
        frequencyType: 'daily',
        frequency: 1,
        startDate: startDate,
        endDate: endDate,
        needExtendedHoursData: false
      },
      headers: {
        Authorization: `Bearer ${this.access_token[accountId].token}`
      }
    };

    return request.get(options)
      .then((data) => {
        const response = this.processTDData(data);
        return QuoteService.convertTdIntraday(response.candles);
      });
  }

  getTDMarketData(symbol, accountId) {
    const query = `${tdaUrl}marketdata/${symbol}/quotes`;
    const options = {
      uri: query,
      qs: {
        apikey: this.tdaKey[accountId]
      },
      headers: {
        Authorization: `Bearer ${this.access_token[accountId].token}`
      }
    };
    return request.get(options);
  }

  processTDData(data) {
    return JSON.parse(data);
  }

  getTDAccessToken(accountId) {
    console.log('getting access token');
    let refreshToken;
    let key;
    if (!accountId ||
      !this.refreshToken[accountId] || !this.tdaKey[accountId]) {
      accountId = configurations.tdameritrade.accountId;
      key = configurations.tdameritrade.consumer_key;
      refreshToken = configurations.tdameritrade.refresh_token;
    } else {
      refreshToken = this.refreshToken[accountId];
      key = this.tdaKey[accountId];
    }

    return request.post({
      uri: tdaUrl + 'oauth2/token',
      form: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: `${key}@AMER.OAUTHAP`
      }
    })
      .then(this.processTDData)
      .then(EASObject => {
        this.access_token[accountId] = {
          token: EASObject.access_token,
          timestamp: moment().valueOf()
        };

        return this.access_token[accountId].token;
      });
  }

  renewExpiredTDAccessTokenAndGetQuote(symbol, accountId) {
    return this.getTDAccessToken(accountId)
      .then((token) => {
        return this.getTDMarketData(symbol, accountId || configurations.tdameritrade.accountId)
          .then(this.processTDData);
      });
  }

  sendTdBuyOrder(symbol,
    quantity,
    price,
    type = 'LIMIT',
    extendedHours = false, accountId) {
    return this.renewTDAuth(accountId)
      .then(() => {
        return this.tdBuy(symbol,
          quantity,
          price,
          type,
          extendedHours, accountId);
      });
  }

  tdBuy(symbol,
    quantity,
    price,
    type = 'LIMIT',
    extendedHours = false, accountId) {
    const headers = {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip',
      'Accept-Language': 'en-US',
      'Authorization': `Bearer ${this.access_token[accountId].token}`,
      'Content-Type': 'application/json',
    };

    const options = {
      uri: tdaUrl + `accounts/${accountId}/orders`,
      headers: headers,
      json: true,
      gzip: true,
      body: {
        orderType: type,
        session: extendedHours ? 'SEAMLESS' : 'NORMAL',
        duration: 'DAY',
        orderStrategyType: 'SINGLE',
        price: price,
        taxLotMethod: 'LIFO',
        orderLegCollection: [
          {
            instruction: 'Buy',
            quantity: quantity,
            instrument: {
              symbol: symbol,
              assetType: 'EQUITY'
            }
          }
        ]
      }
    };

    return request.post(options);
  }

  sendTdSellOrder(symbol,
    quantity,
    price,
    type = 'LIMIT',
    extendedHours = false, accountId) {
    return this.renewTDAuth(accountId)
      .then(() => {
        return this.tdSell(symbol,
          quantity,
          price,
          type,
          extendedHours, accountId);
      });
  }

  tdSell(symbol,
    quantity,
    price,
    type = 'LIMIT',
    extendedHours = false, accountId) {
    const headers = {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip',
      'Accept-Language': 'en-US',
      'Authorization': `Bearer ${this.access_token[accountId].token}`,
      'Content-Type': 'application/json',
    };

    const options = {
      uri: tdaUrl + `accounts/${accountId}/orders`,
      headers: headers,
      json: true,
      gzip: true,
      body: {
        orderType: type,
        session: extendedHours ? 'SEAMLESS' : 'NORMAL',
        duration: 'DAY',
        orderStrategyType: 'SINGLE',
        taxLotMethod: 'LIFO',
        orderLegCollection: [
          {
            instruction: 'Sell',
            quantity: quantity,
            instrument: {
              symbol: symbol,
              assetType: 'EQUITY'
            }
          }
        ]
      }
    };

    if (type === 'limit') {
      options.body['price'] = price;
    }

    return request.post(options);
  }

  getTdPositions(accountId) {
    return this.renewTDAuth(accountId)
      .then(() => {
        return this.sendTdPositionRequest(accountId)
          .then((pos) => {
            return pos.securitiesAccount.positions;
          });
      });
  }

  getTdBalance(accountId) {
    return this.renewTDAuth(accountId)
      .then(() => {
        return this.sendTdPositionRequest(accountId)
          .then((pos) => {
            return pos.securitiesAccount.currentBalances;
          });
      });
  }

  sendTdPositionRequest(accountId) {
    const query = `${tdaUrl}accounts/${accountId}`;
    const options = {
      uri: query,
      qs: {
        fields: 'positions'
      },
      headers: {
        Authorization: `Bearer ${this.access_token[accountId].token}`
      }
    };

    return request.get(options)
      .then((data) => {
        return this.processTDData(data);
      });
  }

  setCredentials(accountId, key, refreshToken, response) {
    this.refreshToken[accountId] = refreshToken;
    this.tdaKey[accountId] = key;
    response.status(200).send();
  }

  isSet(accountId, response) {
    const isSet = !_.isNil(this.refreshToken[accountId]) && !_.isNil(this.tdaKey[accountId]);

    if (isSet) {
      response.status(200).send(isSet);
    } else {
      response.status(404).send(isSet);
    }
  }

  deleteCredentials(accountId, response) {
    this.refreshToken[accountId] = null;
    this.tdaKey[accountId] = null;
    response.status(200).send({});
  }

  getOptionsStraddle(accountId, symbol, strikeCount, optionType = 'S') {
    if (!accountId) {
      accountId = configurations.tdameritrade.accountId;
    }

    return this.renewTDAuth(accountId)
      .then(() => {
        const query = `${tdaUrl}marketdata/chains`;
        const options = {
          uri: query,
          qs: {
            symbol,
            strikeCount,
            includeQuotes: true,
            strategy: 'STRADDLE',
            interval: 0,
            range: 'SNK',
            optionType
          },
          headers: {
            Authorization: `Bearer ${this.access_token[accountId].token}`
          }
        };
        return request.get(options)
          .then((data) => {
            return this.processTDData(data);
          });
      });
  }
}

export default new PortfolioService();
