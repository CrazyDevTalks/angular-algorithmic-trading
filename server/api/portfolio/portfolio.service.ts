import * as request from 'request-promise';
import * as Robinhood from 'robinhood';
import * as _ from 'lodash';
import * as moment from 'moment';

import QuoteService from '../quote/quote.service';
import * as configurations from '../../config/environment';

const robinhoodDevice = {
  deviceToken: configurations.robinhood.deviceId
};

const apiUrl = 'https://api.robinhood.com/';
const tdaUrl = 'https://api.tdameritrade.com/v1/';

interface TokenInfo {
  timestamp: number;
  token: string;
}

class PortfolioService {

  access_token: { [key: string]: TokenInfo } = {};
  tdaKey = {};
  refreshTokensHash = {};
  lastTokenRequest = null;

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
        reply.status(200).send({});
      } catch (e) {
        reply.status(500).send(e);
      }
    })();
  }

  getQuote(symbol, accountId, response) {
    if (!this.access_token[accountId]) {
      return this.renewExpiredTDAccessTokenAndGetQuote(symbol, accountId, response);
    } else {
      return this.getTDMarketData(symbol, accountId)
        .then(this.processTDData)
        .then(quote => {
          if (quote[symbol].delayed) {
            return this.renewExpiredTDAccessTokenAndGetQuote(symbol, accountId, response);
          } else {
            return quote;
          }
        })
        .catch(error => this.renewExpiredTDAccessTokenAndGetQuote(symbol, accountId, response));
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

  renewTDAuth(accountId, reply = null) {
    if (accountId === null) {
      for (const id in this.access_token) {
        if (id && id !== 'null' && this.access_token[id]) {
          console.log('Account ID: ', id);
          accountId = id;
        }
      }
    }

    if (!accountId) {
      throw new Error('Missing accountId');
    }

    if (this.access_token[accountId]) {
      const diffMinutes = moment().diff(moment(this.access_token[accountId].timestamp), 'minutes');
      console.log('Found access token ', diffMinutes);

      if (diffMinutes < 30) {
        return Promise.resolve();
      } else {
        console.log('Access token expired.');
      }
    } else if (!this.access_token[accountId]) {
      this.access_token[accountId] = { token: '123', timestamp: moment().valueOf() };
    }
    return this.sendTdPositionRequest(accountId).then(pos => {
      console.log('Added new token');
      return Promise.resolve();
    })
      .catch(error => {
        const errorMessage = JSON.parse(error.error).error;
        console.log('Token error: ', errorMessage);
        if (errorMessage === 'The access token being passed has expired or is invalid.') {
          console.log('Last token request: ', moment(this.lastTokenRequest).format());
          if (this.tdaKey[accountId] && (this.lastTokenRequest === null || moment().diff(moment(this.lastTokenRequest), 'minutes') > 29)) {
            this.lastTokenRequest = moment().valueOf();
            console.log('Requesting new token');
            return this.getTDAccessToken(accountId);
          } else {
            const tooRecentErrMsg = 'Last token request was too recent';
            console.log(tooRecentErrMsg);
            if (reply) {
              reply.status(500).send({ error: tooRecentErrMsg});
              reply.end();
            }

            throw new Error('Last token request was too recent');
          }
        }
        return Promise.reject(errorMessage);
      });
  }

  getIntraday(symbol, accountId, reply) {
    console.log(moment().format(), 'Retrieving intraday quotes ');
    if (!accountId || !this.access_token[accountId]) {
      console.log('missing access token for ', accountId, this.access_token);
      return this.renewTDAuth(accountId, reply)
        .then(() => this.getTDIntraday(symbol, accountId));
    } else {
      return this.getTDIntraday(symbol, accountId)
        .catch((error) => {
          console.log('Error retrieving intraday data ', error.error);

          return this.renewTDAuth(accountId, reply)
            .then(() => this.getTDIntraday(symbol, accountId));
        });
    }
  }

  getTDIntraday(symbol, accountId) {
    if (!accountId) {
      accountId = this.getAccountId();
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

  getIntradayV2(symbol, period = 2, frequencyType = 'minute', frequency = 1, reply = null) {
    return this.renewTDAuth(null, reply)
      .then(() => this.getTDIntradayV2(symbol, period, frequencyType, frequency));
  }

  getAccountId() {
    let accountId = configurations.tdameritrade.accountId;
    if (accountId) {
      return accountId;
    } else {
      for (const id in this.access_token) {
        if (id && id !== 'null' && this.access_token[id]) {
          accountId = id;
        }
      }
    }
    console.log('Using account id ', accountId);
    return accountId;
  }

  getTDIntradayV2(symbol, period, frequencyType, frequency) {
    const accountId = this.getAccountId();

    if (!this.access_token[accountId] || !this.access_token[accountId].token) {
      throw new Error('Token missing');
    }

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

  getIntradayV3(symbol, startDate = moment().subtract({ days: 1 }).valueOf(), endDate = moment().valueOf(), reply = null) {
    return this.renewTDAuth(null, reply)
      .then(() => this.getTDIntradayV3(symbol, moment(startDate).valueOf(), moment(endDate).valueOf()));
  }

  getTDIntradayV3(symbol, startDate, endDate) {
    const accountId = this.getAccountId();

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
      })
      .catch(error => {
        console.log('Error on getTDIntradayV3 request ', error);
        console.log('getTDIntradayV3 request ', symbol, startDate, endDate);

        return error;
      });
  }

  getDailyQuotes(symbol, startDate, endDate, accountId, reply) {
    console.log(moment().format(), 'Retrieving daily quotes ');

    if (!this.access_token[accountId]) {
      console.log('missing access token');

      return this.renewTDAuth(accountId, reply)
        .then(() => this.getTDDailyQuotes(symbol, startDate, endDate, accountId));
    } else {
      return this.getTDDailyQuotes(symbol, startDate, endDate, accountId)
        .catch(error => {
          console.log(moment().format(), 'Error retrieving daily quotes ', error.error);

          return this.renewTDAuth(accountId, reply)
            .then(() => this.getTDDailyQuotes(symbol, startDate, endDate, accountId));
        });
    }
  }

  getDailyQuoteInternal(symbol, startDate, endDate, response = null) {
    let accountId;
    const accountIds = Object.getOwnPropertyNames(this.refreshTokensHash);
    if (accountIds.length > 0) {
      accountId = accountIds[0];
    } else {
      accountId = this.getAccountId();
    }
    if (!accountId) {
      console.log('Missing accountId');
    }
    return this.getDailyQuotes(symbol, startDate, endDate, accountId, response);
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
    let refreshToken;
    let key;
    if (!accountId ||
      !this.refreshTokensHash[accountId] || !this.tdaKey[accountId]) {
      accountId = this.getAccountId();
      key = configurations.tdameritrade.consumer_key;
      refreshToken = configurations.tdameritrade.refresh_token;
    } else {
      refreshToken = this.refreshTokensHash[accountId];
      key = this.tdaKey[accountId];
    }
    if (!accountId || !this.tdaKey[accountId]) {
      throw new Error('Missing accountId');
    }
    console.log(moment().format(), ' GETTING NEW ACCESS TOKEN');

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

        console.log(moment().format(), 'Set new access token');

        return this.access_token[accountId].token;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  renewExpiredTDAccessTokenAndGetQuote(symbol, accountId, response) {
    return this.renewTDAuth(accountId, response)
      .then(() => {
        return this.getTDMarketData(symbol, accountId || this.getAccountId())
          .then(this.processTDData);
      });
  }

  sendTdBuyOrder(symbol,
    quantity,
    price,
    type = 'LIMIT',
    extendedHours = false, accountId, response) {
    return this.renewTDAuth(accountId, response)
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
    extendedHours = false, accountId, response) {
    return this.renewTDAuth(accountId, response)
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
    return this.sendTdPositionRequest(accountId)
      .then((pos) => {
        return pos.securitiesAccount.positions;
      });
  }

  getTdBalance(accountId, response) {
    return this.renewTDAuth(accountId, response)
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
    this.refreshTokensHash[accountId] = refreshToken;
    this.tdaKey[accountId] = key;
    response.status(200).send();
  }

  isSet(accountId, response) {
    const isSet = !_.isNil(this.refreshTokensHash[accountId]) && !_.isNil(this.tdaKey[accountId]);

    if (isSet) {
      response.status(200).send(isSet);
    } else {
      response.status(404).send(isSet);
    }
  }

  deleteCredentials(accountId, response) {
    this.refreshTokensHash[accountId] = null;
    this.tdaKey[accountId] = null;
    this.access_token[accountId] = null;
    this.lastTokenRequest = null;
    response.status(200).send({});
  }

  getOptionsStraddle(accountId, symbol, strikeCount, optionType = 'S', response) {
    if (!accountId) {
      accountId = this.getAccountId();
    }

    return this.renewTDAuth(accountId, response)
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

  getEquityMarketHours(date: string) {
    const accountId = this.getAccountId();

    const query = `${tdaUrl}marketdata/EQUITY/hours`;
    const options = {
      uri: query,
      qs: {
        apikey: this.tdaKey[accountId],
        date
      },
      headers: {
        Authorization: `Bearer ${this.access_token[accountId].token}`
      }
    };

      return request.get(options)
        .then(this.processTDData);
  }

}

export default new PortfolioService();
