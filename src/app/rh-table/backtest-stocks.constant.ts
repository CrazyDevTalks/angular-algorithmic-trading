import { AlgoParam } from '../shared';
import * as moment from 'moment';

const start = moment().format('YYYY-MM-DD');
const end = moment().subtract(700, 'days').format('YYYY-MM-DD');

function createParam(ticker: string): AlgoParam {
  return {
    ticker,
    start,
    end
  };
}

export const stockList = [
  'QQQJ',
  'EXP',
  'QS',
  'HIMX',
  'MVIS',
  'ASO',
  'AMRS',
  'CVNA',
  'UWMC',
  'FCX',
  'ZNGA',
  'GPRO',
  'DASH',
  'EXPE',
  'XRX',
  'CLF',
  'VG',
  'KLAC',
  'VALE',
  'TRQ',
  'AG',
  'MT',
  'LUN',
  'COPX',
  'API',
  'DKNG',
  'NNDM',
  'AVAV',
  'SPCE',
  'KMTUY',
  'EXPC',
  'KTOS',
  'PCAR',
  'ONVO',
  'MTLS',
  'PSTG',
  'U',
  'REGN',
  'CDNA',
  'TSM',
  'SLV',
  'PSTG',
  'NUS',
  'RHHBY',
  'AMC',
  'FXI',
  'ARKQ',
  'ARKK',
  'ARKW',
  'ARKF',
  'CCIV',
  'CGC',
  'ACB',
  'YOLO',
  'FCEL',
  'TPIC',
  'ALB',
  'RUN',
  'SPWR',
  'DQ',
  'CNRG',
  'LIT',
  'PBW',
  'TAN',
  'ICLN',
  'PLUG',
  'NGA',
  'SKLZ',
  'BNGO',
  'AA',
  'ARKG',
  'GOEV',
  'CRSP',
  'CRSR',
  'EDIT',
  'NTLA',
  'VRTX',
  'LGVW',
  'NVS',
  'PSTH',
  'HCAC',
  'BB',
  'LUMN',
  'PLTR',
  'SDC',
  'F',
  'RKT',
  'NOK',
  'COUP',
  'TDG',
  'SE',
  'PDD',
  'MELI',
  'AZN',
  'PTON',
  'Z',
  'MET',
  'GOLD',
  'AAPL',
  'ABT',
  'ADBE',
  'CVX',
  'MTCH',
  'AGG',
  'AIG',
  'AOS',
  'ATVI',
  'MAN',
  'AXP',
  'EA',
  'BAC',
  'BDN',
  'BIG',
  'BDX',
  'BK',
  'DOCU',
  'BMY',
  'GOOS',
  'BX',
  'C',
  'CAG',
  'CARS',
  'CCI',
  'CCK',
  'CFG',
  'CLDR',
  'CIEN',
  'COF',
  'COST',
  'CSCO',
  'CSX',
  'DAL',
  'EWC',
  'DHR',
  'DIS',
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
  'IQ',
  'XLU',
  'JD',
  'GDX',
  'GIS',
  'GNRC',
  'GNTX',
  'AEM',
  'GOOG',
  'GS',
  'HAS',
  'HD',
  'HOG',
  'HON',
  'HRB',
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
  'JPM',
  'KBH',
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
  'MDY',
  'MDT',
  'PG',
  'MKC',
  'RYN',
  'MRVL',
  'MS',
  'MU',
  'MXIM',
  'NEM',
  'NET',
  'NFLX',
  'NKE',
  'NUE',
  'NVDA',
  'NXPI',
  'ORCL',
  'CRWD',
  'PAYX',
  'PEP',
  'PFE',
  'PFG',
  'PGR',
  'PANW',
  'PM',
  'PNC',
  'QCOM',
  'BOX',
  'RTX',
  'SCCO',
  'SCHE',
  'SCHF',
  'PYPL',
  'SCZ',
  'SHY',
  'SKX',
  'SNE',
  'STLD',
  'STZ',
  'SWKS',
  'SYF',
  'TD',
  'TEAM',
  'TER',
  'TGT',
  'TLT',
  'TMUS',
  'TRV',
  'TWLO',
  'TXT',
  'UAL',
  'UNH',
  'UNP',
  'URBN',
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
  'VOYA',
  'VTV',
  'VWO',
  'WBA',
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
  'WEC',
  'EIX',
  'ETR',
  'FE',
  'CMS',
  'OGE',
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
  'CHGG',
  'GLD',
  'MA',
  'EWZ',
  'MSFT',
  'EUO',
  'FMC',
  'THO',
  'OKTA',
  'TMF',
  'TMV',
  'EMR',
  'TBT',
  'SBUX',
  'JNJ',
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
  'SYK',
  'CMG',
  'SPOT',
  'UPS',
  'MRK',
  'IRM',
  'BLL',
  'LVS',
  'WYNN',
  'WHR',
  'CAT',
  'STX',
  'SPG',
  'BP',
  'AKAM',
  'SHAK',
  'BIDU',
  'FSLR',
  'AVGO',
  'VXX',
  'UVXY',
  'TOT',
  'SNAP',
  'KHC',
  'CCEP',
  'ROKU',
  'DBX',
  'OSTK',
  'PLNT',
  'YELP',
  'MCHP',
  'JWN',
  'WMT',
  'SYY',
  'ACN',
  'CRM',
  'VZ',
  'GOOGL',
  'CMCSA',
  'BHC',
  'SLB',
  'DHI',
  'LULU',
  'VIPS',
  'PENN',
  'BKNG',
  'HIG',
  'ZION',
  'FOXA',
  'MDLZ',
  'DISH',
  'TTWO',
  'DLTR',
  'HUN',
  'LLY',
  'WMB',
  'ABBV',
  'KKR',
  'COP',
  'EXAS',
  'AFL',
  'MPC',
  'AMGN',
  'ALLY',
  'MLCO',
  'SCHW',
  'WDAY',
  'CTSH',
  'TSN',
  'ITB',
  'XHB',
  'EOG',
  'PSX',
  'SU',
  'CNC',
  'TRMB',
  'DXC',
  'XLNX',
  'ECL',
  'CPB',
  'TRIP',
  'HYG',
  'EEM',
  'SH',
  'DLR',
  'AMT',
  'WELL',
  'TZA',
  'TQQQ',
  'FAZ',
  'NI',
  'NIO',
  'OIH',
  'ANTM',
  'ADSK',
  'CHTR',
  'LNG',
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
  'BSX',
  'FSLY',
  'LYFT',
  'UBER',
  'WORK',
  'PINS',
  'KMB',
  'CLX',
  'CL',
  'PRU',
  'SIX',
  'AUY'
];

const Stocks: AlgoParam[] = [];

for (const s of stockList) {
  Stocks.push(createParam(s));
}

export default Stocks;
