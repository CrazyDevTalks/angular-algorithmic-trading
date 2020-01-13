import { OrderRow } from '../shared/models/order-row';
const stockList = [
  'AA',
  'GOLD',
  'AAPL',
  'ABT',
  'ADBE',
  'CVX',
  'MTCH',
  'AGG',
  'AIG',
  'AMTD',
  'AOS',
  'NRZ',
  'ATVI',
  'AXP',
  'EA',
  'BAC',
  'BDN',
  'BIG',
  'BK',
  'DOCU',
  'BMY',
  'BRKL',
  'GOOS',
  'BTG',
  'BX',
  'SYMC',
  'C',
  'CAG',
  'F',
  'CCI',
  'CCL',
  'CFG',
  'CIEN',
  'CMA',
  'COF',
  'COST',
  'CSCO',
  'FCAU',
  'CSX',
  'DAL',
  'EWC',
  'DHR',
  'DIS',
  'DLPH',
  'DOV',
  'DPZ',
  'DRI',
  'EBAY',
  'EFV',
  'ETFC',
  'FAST',
  'FB',
  'FDX',
  'FEYE',
  'FHN',
  'FITB',
  'IQ',
  'XLU',
  'JD',
  'GDX',
  'GE',
  'GIS',
  'GNRC',
  'GNTX',
  'AEM',
  'GOOG',
  'GS',
  'HAS',
  'HBAN',
  'HD',
  'HIMX',
  'HOG',
  'HON',
  'HPE',
  'HPQ',
  'HRB',
  'HEAR',
  'IBM',
  'IEF',
  'IEFA',
  'IEMG',
  'IJH',
  'IJR',
  'INTC',
  'ISRG',
  'IVV',
  'IWN',
  'JBHT',
  'JBL',
  'JBLU',
  'JPM',
  'KBH',
  'KEY',
  'GDXJ',
  'KO',
  'KR',
  'KSU',
  'LEN',
  'LOGM',
  'LOW',
  'LQD',
  'LRCX',
  'AMAT',
  'MCO',
  'MDSO',
  'MDY',
  'PG',
  'MKC',
  'RYN',
  'MRVL',
  'MS',
  'MTG',
  'MU',
  'MXIM',
  'NEM',
  'NFLX',
  'NKE',
  'NR',
  'NUE',
  'NVDA',
  'NXPI',
  'ORCL',
  'PANW',
  'PAYX',
  'PBCT',
  'PBYI',
  'PEP',
  'PFE',
  'PGR',
  'PLD',
  'PM',
  'PNC',
  'QCOM',
  'RAD',
  'BOX',
  'RF',
  'RTN',
  'SCCO',
  'SCHE',
  'SCHF',
  'PYPL',
  'SCZ',
  'SHY',
  'SKX',
  'SLM',
  'SNE',
  'SPWR',
  'SPY',
  'JCP',
  'STI',
  'STLD',
  'STZ',
  'SWKS',
  'SYF',
  'TD',
  'TEAM',
  'TER',
  'TERP',
  'TGT',
  'TLT',
  'TMUS',
  'TRV',
  'TWLO',
  'TXT',
  'UAA',
  'UAL',
  'UMPQ',
  'UNH',
  'UNP',
  'URI',
  'USB',
  'USO',
  'V',
  'VB',
  'VEA',
  'VFC',
  'VFH',
  'VNQ',
  'VOO',
  'VTI',
  'VTV',
  'VWO',
  'WBA',
  'WBT',
  'WDC',
  'WEN',
  'WFC',
  'WGO',
  'XOM',
  'YUMC',
  'ALGN',
  'AMZN',
  'FRT',
  'SQ',
  'RDFN',
  'XLF',
  'BABA',
  'MO',
  'AMD',
  'CTL',
  'NRG',
  'EXC',
  'VST',
  'PNW',
  'DUK',
  'NEE',
  'D',
  'SO',
  'AEP',
  'ED',
  'XEL',
  'PCG',
  'WEC',
  'EIX',
  'ETR',
  'FE',
  'CMS',
  'S',
  'OGE',
  'AES',
  'PEG',
  'GM',
  'NGG',
  'TSLA',
  'BA',
  'MCHI',
  'XLE',
  'XLB',
  'IYR',
  'JNPR',
  'MCD',
  'SAP',
  'KEM',
  'AOBC',
  'CHGG',
  'GLD',
  'MA',
  'EWZ',
  'MSFT',
  'EUO',
  'TVIX',
  'FMC',
  'THO',
  'OKTA',
  'TMF',
  'TMV',
  'EMR',
  'TBT',
  'XOP',
  'SBUX',
  'JNJ',
  'PLAY',
  'W',
  'LMT',
  'CVS',
  'TWTR',
  'SFIX',
  'T',
  'TXN',
  'MMM',
  'GRUB',
  'GILD',
  'SIRI',
  'CMG',
  'SPOT',
  'UPS',
  'IRM',
  'BLL',
  'MGM',
  'LVS',
  'WYNN',
  'ARNC',
  'HAL',
  'WHR',
  'CAT',
  'AKS',
  'STX',
  'SPG',
  'RIG',
  'BP',
  'AKAM',
  'P',
  'CHK',
  'SHAK',
  'BIDU',
  'AMC',
  'FSLR',
  'AVGO',
  'VXX',
  'UVXY',
  'TOT',
  'SNAP',
  'FIT',
  'GPRO',
  'KHC',
  'CCEP',
  'ROKU',
  'DBX',
  'OSTK',
  'PLNT',
  'MYL',
  'NCLH',
  'YELP',
  'CARS',
  'MCHP',
  'PLUG',
  'M',
  'JWN',
  'WMT',
  'SYY',
  'CLF',
  'SONO',
  'RUN',
  'PEGI',
  'BB',
  'ACN',
  'PBR',
  'MJ',
  'RLJ',
  'NYCB',
  'DF',
  'ASNA',
  'AMRN',
  'AAL',
  'FCX',
  'TLRY',
  'CRM',
  'VZ',
  'GOOGL',
  'CMCSA',
  'BHC',
  'TEVA',
  'X',
  'UTX',
  'CGC',
  'NIO',
  'CELG',
  'GME',
  'SLB',
  'DHI',
  'LULU',
  'SWN',
  'CS',
  'ITUB',
  'VIPS',
  'KMI',
  'PENN',
  'CRON',
  'BKNG',
  'HIG',
  'ZION',
  'FOXA',
  'CX',
  'YPF',
  'MDLZ',
  'DISH',
  'TTWO',
  'BPY',
  'DVN',
  'RRC',
  'GERN',
  'DLTR',
  'HUN',
  'LLY',
  'CZR',
  'KGC',
  'WMB',
  'ABBV',
  'DB',
  'BBBY',
  'KKR',
  'COP',
  'NWL',
  'MRO',
  'ACRX',
  'EXAS',
  'OXY',
  'AFL',
  'MPC',
  'AMGN',
  'ALLY',
  'MLCO',
  'SCHW',
  'MAT',
  'WDAY',
  'CAR',
  'CTSH',
  'TSN',
  'ITB',
  'XHB',
  'TPR',
  'PSX',
  'SU',
  'SC',
  'CNC',
  'TRMB',
  'DXC',
  'XLNX',
  'MTW',
  'ECL',
  'CPB',
  'TRIP',
  'HYG',
  'EEM',
  'SH',
  'LC',
  'DLR',
  'AMT',
  'WELL',
  'TZA',
  'TQQQ',
  'SPXS',
  'FAZ',
  'SDS',
  'SPXU',
  'NI',
  'ARRY',
  'OIH',
  'SQQQ',
  'AGN',
  'ANTM',
  'ADSK',
  'CHTR',
  'CI',
  'HLT',
  'IQV',
  'LKQ',
  'NOW',
  'TJX',
  'VMW',
  'SPLK',
  'AZO',
  'BUD',
  'MDB',
  'TTD',
  'SHOP',
  'VEEV',
  'HUBS',
  'FSLY',
  'SOHU',
  'LYFT',
  'UBER',
  'WORK',
  'PINS'
];

function createRow(ticker: string): OrderRow {
  return {
    symbol: ticker,
    price: 10,
    quantity: 100,
    side: 'DayTrade',
    Stop: 0.003,
    TrailingStop: 0.001,
    Target: 0.007,
    StopLoss: true,
    TrailingStopLoss: true,
    TakeProfit: true,
    MeanReversion1: true,
    Mfi: true,
    SpyMomentum: true,
    BuyCloseSellOpen: false,
    YahooData: false,
    SellAtClose: true,
    OrderSize: 10
  };
}

const IntradayStocks: OrderRow[] = [];

for (const s of stockList) {
  IntradayStocks.push(createRow(s));
}

export default IntradayStocks;
