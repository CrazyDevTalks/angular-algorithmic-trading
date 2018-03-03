const express = require('express');
const handler = require('./quote.router');

const router = express.Router();

router.post('/', handler.quote);
router.post('/current', handler.currentQuote);
router.post('/raw', handler.rawQuote);

module.exports = router;
