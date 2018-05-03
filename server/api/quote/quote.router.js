const QuoteController = require('./quote.controller');

/**
 * Get quotes
 */
exports.quote = function (req, res, next) {
  QuoteController.getQuote(req, res);
};

exports.currentQuote = function (req, res, next) {
  QuoteController.getCurrentQuote(req, res);
};

exports.rawQuote = function (req, res, next) {
  QuoteController.getRawData(req, res);
};

exports.intraday = function (req, res, next) {
  QuoteController.getIntraday(req, res);
};

exports.companySummary = function (req, res, next) {
  QuoteController.getCompanySummary(req, res);
};