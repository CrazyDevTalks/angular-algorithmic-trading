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

export const stockList = ['AAPL',
'MSFT',
'GOOG',
'GOOGL',
'AMZN',
'BRK-B',
'TSLA',
'META',
'JNJ',
'UNH',
'NVDA',
'V',
'XOM',
'JPM',
'WMT',
'PG',
'MA',
'CVX',
'HD',
'LLY',
'PFE',
'BAC',
'KO',
'ABBV',
'PEP',
'MRK',
'AVGO',
'VZ',
'COST',
'TMO',
'ORCL',
'ADBE',
'ACN',
'ABT',
'CSCO',
'DHR',
'DIS',
'MCD',
'NKE',
'CMCSA',
'CRM',
'TMUS',
'BMY',
'INTC',
'UPS',
'WFC',
'PM',
'LIN',
'TXN',
'NEE',
'QCOM',
'AMD',
'T',
'RTX',
'RTX',
'MS',
'COP',
'UNP',
'HON',
'AMGN',
'IBM',
'SCHW',
'CVS',
'MDT',
'BX',
'BX',
'LOW',
'AMT',
'ANTM',
'SPGI',
'LMT',
'CAT',
'AXP',
'INTU',
'GS',
'DE',
'C',
'BLK',
'NOW',
'PYPL',
'EL',
'PLD',
'ADP',
'SBUX',
'ENB',
'BA',
'AMAT',
'CB',
'MO',
'MDLZ',
'BKNG',
'NFLX',
'CHTR',
'CI',
'MMM',
'ADI',
'CNI',
'DUK',
'ZTS',
'GE',
'SYK',
'MMC',
'GILD',
'CME',
'SO',
'ISRG',
'CCI',
'USB',
'NOC',
'EOG',
'TGT',
'TJX',
'BDX',
'PGR',
'VRTX',
'CSX',
'MU',
'PNC',
'TFC',
'CL',
'REGN',
'FDX',
'D',
'LRCX',
'SHW',
'WM',
'PXD',
'GD',
'ATVI',
'FISV',
'ITW',
'EQIX',
'FIS',
'SLB',
'NSC',
'EW',
'OXY',
'HUM',
'AON',
'ICE',
'DG',
'EPD',
'APD',
'PSA',
'ETN',
'HCA',
'MET',
'BSX',
'MPC',
'FCX',
'MRNA',
'MAR',
'EMR',
'NEM',
'VMW',
'VLO',
'KDP',
'KLAC',
'PANW',
'GM',
'MCO',
'TRI',
'MNST',
'PSX',
'F',
'SNPS',
'AEP',
'ADM',
'CNC',
'TEAM',
'SRE',
'FTNT',
'SCCO',
'MCK',
'DVN',
'KHC',
'ECL',
'UBER',
'STZ',
'DOW',
'NXPI',
'LHX',
'COF',
'PAYX',
'AIG',
'CTVA',
'ROP',
'EXC',
'KMB',
'HSY',
'KKR',
'MRVL',
'CDNS',
'SYY',
'GIS',
'AZO',
'SNOW',
'TRV',
'ORLY',
'RSG',
'IQV',
'O',
'KMI',
'APH',
'WMB',
'TEL',
'CRWD',
'CTAS',
'ADSK',
'EA',
'DLR',
'WDAY',
'KR',
'WELL',
'PRU',
'SQ',
'XEL',
'A',
'CMG',
'AFL',
'HPQ',
'WBD',
'DLTR',
'DELL',
'CTSH',
'LULU',
'WBA',
'BK',
'HLT',
'JCI',
'MSI',
'ALL',
'HES',
'MCHP',
'MSCI',
'PH',
'ILMN',
'BAX',
'SBAC',
'AJG',
'ZM',
'LNG',
'YUM',
'SPG',
'LYB',
'HAL',
'BKR',
'GPN',
'BF-B',
'ED',
'NUE',
'CARR',
'TSN',
'DD',
'OTIS',
'MTB',
'ABC',
'TT',
'TT',
'TDG',
'PCAR',
'PEG',
'IFF',
'TWTR',
'ANET',
'WEC',
'RMD',
'BIIB',
'IDXX',
'FAST',
'VICI',
'FWONA',
'VEEV',
'APO',
'DDOG',
'CERN',
'SGEN',
'CMI',
'PPG',
'AMP',
'GLW',
'DFS',
'ODFL',
'ES',
'ROST',
'MTD',
'PCG',
'LSXMA',
'AVB',
'EQR',
'CLR',
'WY',
'AME',
'DASH',
'OKE',
'TROW',
'VRSK',
'CPRT',
'FRC',
'NDAQ',
'LVS',
'GFS',
'APTV',
'SIVB',
'EBAY',
'HRL',
'RIVN',
'ON',
'ALB',
'AWK',
'KEYS',
'AZPN',
'FANG',
'FITB',
'STT',
'RPRX',
'IBKR',
'GWW',
'ROK',
'CTRA',
'ENPH',
'TTD',
'EIX',
'CBRE',
'DTE',
'SIRI',
'K',
'DHI',
'CSGP',
'MKC',
'TSCO',
'ZBH',
'ARE',
'CDW',
'MTCH',
'EFX',
'EXR',
'WST',
'LUV',
'HIG',
'ETR',
'WTW',
'AEE',
'ULTA',
'INVH',
'DRE',
'FE',
'BALL',
'AVTR',
'LH',
'SPOT',
'ANSS',
'TTWO',
'ZS',
'NTRS',
'CHD',
'FTV',
'VMC',
'DAL',
'VTR',
'LEN',
'RJF',
'STE',
'WAT',
'MLM',
'CEG',
'PPL',
'CF',
'LYV',
'MPWR',
'SUI',
'MAA',
'MRO',
'URI',
'IT',
'GPC',
'CINF',
'HZNP',
'CTLT',
'MOS',
'ALGN',
'CFG',
'GRMN',
'AMCR',
'RF',
'FOXA',
'WRB',
'PKI',
'HBAN',
'HPE',
'CMS',
'IR',
'DOV',
'VFC',
'VRSN',
'CNP',
'FOX',
'LBRDA',
'MKL',
'MDB',
'HOLX',
'TDY',
'YUMC',
'EPAM',
'PWR',
'PFG',
'KEY',
'ARES',
'FLT',
'AGR',
'ALNY',
'JBHT',
'EXPD',
'ESS',
'PLTR',
'SWK',
'PARA',
'IP',
'PAYC',
'ACGL',
'EXPE',
'BR',
'BBY',
'ROL',
'ZBRA',
'WAB',
'TW',
'HEI',
'J',
'BG',
'SYF',
'INCY',
'TWLO',
'DGX',
'WPC',
'LBRDK',
'TRU',
'BRO',
'COO',
'UI',
'CLX',
'WDC',
'GNRC',
'LPLA',
'CAG',
'DOCU',
'MOH',
'SWKS',
'TRGP',
'ATO',
'ACI',
'HUBS',
'TRMB',
'BIO',
'TER',
'APA',
'SSNC',
'SPLK',
'POOL',
'DRI',
'AKAM',
'KMX',
'EQT',
'L',
'NTAP',
'CE',
'BXP',
'NET',
'EVRG',
'DPZ',
'LNT',
'WLK',
'CPT',
'UDR',
'IRM',
'STLD',
'PKG',
'PODD',
'BMRN',
'CPB',
'IEX',
'LKQ',
'RKT',
'XYL',
'CAH',
'FDS',
'TECH',
'FMC',
'NLOK',
'HWM',
'LDOS',
'SJM',
'TXT',
'ELS',
'PEAK',
'AES',
'OVV',
'OKTA',
'OMC',
'TYL',
'ENTG',
'VTRS',
'CHRW',
'AVY',
'HST',
'JKHY',
'MGM',
'NVR',
'BEPC',
'CSL',
'DAR',
'PINS',
'PTC',
'FWONK',
'BEN',
'TPL',
'CG',
'EMN',
'CBOE',
'KIM',
'ROKU',
'TFX',
'BILL',
'UAL',
'CCK',
'AR',
'NDSN',
'MAS',
'CNA',
'AMH',
'CTXS',
'HAS',
'AFG',
'ALLY',
'SBNY',
'FHN',
'Y',
'NI',
'WRK',
'TAP',
'DT',
'IPG',
'GLPI',
'WTRG',
'WTRG',
'U',
'DINO',
'GDDY',
'BAH',
'CHK',
'BF-A',
'CRL',
'SNA',
'LUMN',
'ABMD',
'CCL',
'RS',
'RE',
'AAP',
'BHVN',
'BURL',
'QRVO',
'FNF',
'EQH',
'RPM',
'HSIC',
'SCI',
'MKTX',
'ELAN',
'QGEN',
'CMA',
'REG',
'VST',
'MORN',
'BKI',
'FCNCA',
'GGG',
'UTHR',
'REXR',
'FICO',
'DOX',
'RCL',
'ETSY',
'AA',
'GME',
'PLAN',
'BLDR',
'HUBB',
'EWBC',
'ZNGA',
'AIZ',
'CLF',
'FFIV',
'LW',
'OLPX',
'GL',
'NWSA',
'NWS',
'JNPR',
'BSY',
'BRKR',
'UHAL',
'CUBE',
'LSI',
'NRG',
'PHM',
'WSO',
'H',
'SNX',
'RHI',
'LAMR',
'ACC',
'JAZZ',
'CZR',
'CLVT',
'ACM',
'PCTY',
'MTN',
'DISH',
'NBIX',
'AOS',
'PLUG',
'NLY',
'MPW',
'WHR',
'ALLE',
'LNC',
'OGN',
'NFE',
'SEE',
'HEI-A',
'DVA',
'RGEN',
'AGCO',
'AAL',
'SWN',
'WSM',
'BWA',
'UGI',
'PAG',
'HII',
'ZION',
'SWCH',
'FBHS',
'RRC',
'TPR',
'WMS',
'TTC',
'CAR',
'NLSN',
'ERIE',
'BJ',
'WAL',
'MHK',
'WBS',
'OLN',
'JLL',
'LSXMK',
'LAD',
'CBSH',
'OC',
'G',
'CFR',
'UHS',
'RRX',
'MAT',
'NWL',
'ARMK',
'FRT',
'JBL',
'BBWI',
'XRAY',
'COLD',
'DBX',
'IVZ',
'PNW',
'LEA',
'AGL',
'PNR',
'CNXC',
'KNX',
'PSTG',
'RGA',
'WOLF',
'ZG',
'CGNX',
'LECO',
'PDCE',
'ARW',
'GLOB',
'SEIC',
'DXC',
'PPC',
'DLB',
'CABO',
'CHNG',
'WSC',
'MANH',
'STOR',
'ZEN',
'NNN',
'CDAY',
'OGE',
'CHDN',
'MIDD',
'NOV',
'IAC',
'MRVI',
'RGLD',
'CASY',
'BERY',
'FND',
'LII',
'MASI',
'WEX',
'FSLR',
'SYNH',
'EXAS',
'FIVE',
'ORI',
'DXCM',
'WYNN',
'MTDR',
'ST',
'UNM',
'JEF',
'NXST',
'CHE',
'DECK',
'RNR',
'CPRI',
'TTEK',
'CIEN',
'COHR',
'PCOR',
'QDEL',
'AVLR',
'GNTX',
'EGP',
'OHI',
'USFD',
'WH',
'HTA',
'CDK',
'AXON',
'RL',
'CACC',
'LSCC',
'HUN',
'KBR',
'FR',
'CACI',
'DNB',
'AMC',
'PB',
'AIRC',
'',
'AN',
'ATR',
'PFGC',
'SF',
'ESTC',
'NFG',
'STWD',
'VOYA',
'GPK',
'PII',
'HALO',
'TREX',
'LFUS',
'WU',
'NVCR',
'BRX',
'GWRE',
'ACHC',
'FIVN',
'DKS',
'NVST',
'MP',
'BPOP',
'RH',
'EXEL',
'ADT',
'DCI',
'WCC',
'BYD',
'GTLS',
'KRC',
'SAIL',
'SKX',
'MUR',
'THC',
'ITT',
'IIVI',
'MSP',
'PLNT',
'MGY',
'INGR',
'CIVI',
'FCN',
'MKSI',
'HQY',
'AYI',
'COTY',
'XPO',
'SRPT',
'SWX',
'UWMC',
'SHC',
'M',
'STAG',
'PNFP',
'FAF',
'GMED',
'FFIN',
'WWD',
'SWAV',
'GXO',
'EHC',
'BLD',
'OSK',
'PLTK',
'MUSA',
'VLY',
'RYN',
'SM',
'Z',
'MTZ',
'CNM',
'INFA',
'SHLX',
'VNO',
'ASH',
'HRB',
'MIME',
'AGNC',
'AXTA',
'RCM',
'LSTR',
'NVT',
'LITE',
'BOKF',
'KSS',
'SNV',
'ITCI',
'AZTA',
'X',
'VVV',
'REYN',
'HLI',
'ROLL',
'FLO',
'PRGO',
'SITE',
'LYFT',
'MDU',
'TENB',
'SON',
'PSB',
'ADC',
'ALK',
'EEFT',
'CC',
'ANAT',
'MNDT',
'COKE',
'DDS',
'GBCI',
'WWE',
'VAC',
'OLED',
'RNG',
'NYT',
'EME',
'BC',
'CW',
'CCMP',
'TOL',
'SRC',
'RLI',
'DKNG',
'IDA',
'LHCG',
'TDOC',
'SAIA',
'SAIC',
'SLAB',
'THG',
'OMCL',
'CR',
'TXRH',
'W',
'HGV',
'ROG',
'VMI',
'UNVR',
'WOOF',
'SYNA',
'OPCH',
'TMX',
'IONS',
'DTM',
'HOG',
'KNSL',
'PENN',
'QLYS',
'LNW',
'OZK',
'CLH',
'SEB',
'LPX',
'AMG',
'ESI',
'UBSI',
'APLS',
'IRT',
'LEG',
'AM',
'RUN',
'SAFM',
'TWKS',
'AXS',
'OMF',
'BWXT',
'SIGI',
'NCLH',
'MSA',
'WTFC',
'ALKS',
'BXMT',
'CHPT',
'POST',
'INSP',
'IAA',
'TGNA',
'EXLS',
'IPGP',
'SLGN',
'IART',
'RHP',
'CHX',
'COLM',
'HP',
'PEN',
'MEDP',
'TNET',
'TXG',
'IRDM',
'PBF',
'AMN',
'BKH',
'PRI',
'DRVN',
'CMC',
'BFAM',
'CELH',
'CADE',
'DOCN',
'SMG',
'EXP',
'TRNO',
'UFPI',
'EVR',
'CUZ',
'HOMB',
'LNTH',
'POWI',
'NSA',
'ALTR',
'SLM',
'ASGN',
'ORA',
'UAA',
'ONB',
'CVNA',
'MSM',
'TKR',
'EXPO',
'HXL',
'NCR',
'OGS',
'SFBS',
'VG',
'FIZZ',
'HE',
'HR',
'AVT',
'NATI',
'COUP',
'THO',
'AMKR',
'SJI',
'MAN',
'UMBF',
'NYCB',
'SSD',
'PVH',
'JHG',
'PINC',
'CRUS',
'NJR',
'ENSG',
'ATKR',
'POR',
'NOVT',
'WTS',
'BL',
'VIRT',
'OCDX',
'ESNT',
'ALGM',
'JWN',
'PSN',
'DEI',
'SNDR',
'FIBK',
'AQUA',
'NRZ',
'IGT',
'AVNT',
'SMAR',
'QS',
'MANT',
'PYCR',
'ICUI',
'SRCL',
'HWC',
'KRG',
'PNM',
'TPX',
'GH',
'FNB',
'CRK',
'TFSL',
'BCPC',
'DOC',
'PEGA',
'ESGR',
'WEN',
'ALSN',
'HELE',
'PECO',
'MTG',
'R',
'FLR',
'FLS',
'CNX',
'CVI',
'ELY',
'TDC',
'VNT',
'GO',
'LAZ',
'MMS',
'OLLI',
'TPTX',
'NTLA',
'AWI',
'WTM',
'UA',
'SAM',
'SR',
'LTHM',
'CERE',
'AIT',
'KEX',
'RPD',
'YETI',
'SPSC',
'RRR',
'INDB',
'AMED',
'TNDM',
'AMBP',
'SMPL',
'BECN',
'PK',
'SITM',
'MSGS',
'ABG',
'RARE',
'OSH',
'GATX',
'AL',
'APLE',
'PTEN',
'APG',
'UMPQ',
'VRT',
'HIW',
'ONTO',
'TNL',
'JBT',
'CBT',
'HBI',
'GPS',
'WIX',
'AGO',
'MPLN',
'NSP',
'TRTN',
'SMTC',
'HLNE',
'DV',
'CWST',
'DEN',
'CVBF',
'ZWS',
'ZD',
'AEL',
'BPMC',
'ASAN',
'BNL',
'WHD',
'NCNO',
'WK',
'WBT',
'EPR',
'PTON',
'HHC',
'CBU',
'VRNS',
'FUL',
'LANC',
'CRC',
'EBC',
'CYTK',
'NTRA',
'GTES',
'WLL',
'IRTC',
'CWK',
'BOX',
'MCW',
'FELE',
'GT',
'CPE',
'RDN',
'PCH',
'BTU',
'KOS',
'PACW',
'MRCY',
'BIPC',
'SXT',
'ACAD',
'AYX',
'MTSI',
'SPB',
'ENOV',
'HAYW',
'NTNX',
'NSIT',
'BRBR',
'CNS',
'OPEN',
'VIR',
'PRFT',
'BHF',
'ARWR',
'SLG',
'KRTX',
'LIVN',
'HASI',
'CROX',
'SEAS',
'REGI',
'NARI',
'AJRD',
'IIPR',
'APPF',
'STAA',
'NEU',
'NEWR',
'BANF',
'FCFS',
'SPR',
'SBRA',
'PZZA',
'HAE',
'CNR',
'REZI',
'FOXF',
'MATX',
'EQC',
'VIAV',
'ALE',
'DORM',
'UCBI',
'WD',
'SHLS',
'JAMF',
'DIOD',
'NVAX',
'HRI',
'APPN',
'MLI',
'UNF',
'BE',
'KFY',
'ETRN',
'OAS',
'NWE',
'SIG',
'KMPR',
'CERT',
'SGFY',
'MMSI',
'ALRM',
'BKU',
'LXP',
'TTEC',
'ADNT',
'DH',
'CATY',
'BOH',
'ENV',
'SPWR',
'ASO',
'SFM',
'SFNC',
'SEM',
'FHB',
'MRTX',
'JBGS',
'IBTX',
'AAON',
'OFC',
'SUM',
'UPST',
'FN',
'AVA',
'GOLF',
'CVET',
'DBRG',
'CRI',
'APAM',
'HI',
'MC',
'ASB',
'STEP',
'ESMT',
'NNI',
'COOP',
'PRVA',
'DNLI',
'SITC',
'BLKB',
'ABCB',
'VC',
'ESAB',
'OUT',
'ACIW',
'VSCO',
'FRPT',
'PBH',
'FIX',
'GEF',
'NHI',
'INST',
'LESL',
'ARCH',
'EPRT',
'LOPE',
'FORM',
'FHI',
'PDCO',
'ATI',
'FOUR',
'RUSHA',
'LBRT',
'PPBI',
'ARNC',
'SPT',
'FL',
'SHOO',
'SGRY',
'MGEE',
'LCII',
'CCOI',
'GPI',
'TRIP',
'GHC',
'JBLU',
'VRNT',
'AEIS',
'LZ',
'MXL',
'CVLT',
'TMHC',
'TWNK',
'AZEK',
'KLIC',
'CVAC',
'ABM',
'BCO',
'STNE',
'TROX',
'CARG',
'BRP',
'BCC',
'DSEY',
'FBP',
'AWR',
'OTTR',
'CNMD',
'WSFS',
'CWT',
'PJT',
'AMBA',
'VSH',
'LTH',
'NEX',
'BEAM',
'CRGY',
'MAIN',
'TCBI',
'KW',
'SKY',
'MTH',
'IBOC',
'HRMY',
'DY',
'PEB',
'CWEN',
'FOCS',
'MTOR',
'ETWO',
'KWR',
'NGVT',
'NEOG',
'EVH',
'AGTI',
'XRX',
'NOG',
'AIN',
'WERN',
'HUBG',
'WDFC',
'JOE',
'PWSC',
'USM',
'ENS',
'EVTC',
'KBH',
'HLF',
'PCRX',
'AIMC',
'PGNY',
'UPWK',
'MOG-A',
'FSR',
'MCY',
'NUVA',
'AMRC',
'CPA',
'NKLA',
'SANM',
'GLNG',
'VRRM',
'IBP',
'SONO',
'AUB',
'FOLD',
'JJSF',
'VICR',
'NTCT',
'SPXC',
'OI',
'AXNX',
'FWRD',
'CLBK',
'FULT',
'BFH',
'CDEV',
'TRUP',
'SHO',
'BOOT',
'TR',
'UNIT',
'RMBS',
'COUR',
'PFSI',
'CRVL',
'PSMT',
'NAPA',
'SMCI',
'DCT',
'GCP',
'IOSP',
'HL',
'CALM',
'UNFI',
'OMI',
'SAVE',
'VSAT',
'WING',
'BRC',
'ACA',
'HPP',
'CHGG',
'FRME',
'WIRE',
'SAFE',
'MDC',
'FATE',
'BDC',
'SCL',
'ATSG',
'EYE',
'COLB',
'AHCO',
'BMI',
'NUS',
'TELL',
'KD',
'DK',
'ITGR',
'CORT',
'CENT',
'GSAT',
'CALX',
'LGF-A',
'INSM',
'ALGT',
'KRO',
'PRMW',
'FSS',
'PD',
'PLXS',
'CPK',
'ATUS',
'HTH',
'DNUT',
'RVLV',
'AEO',
'THS',
'ARVN',
'LFST',
'AX',
'ALHC',
'TEX',
'GOGO',
'HAIN',
'ESTE',
'STGW',
'MLKN',
'IPAR',
'CNO',
'KMT',
'PRGS',
'TTGT',
'WMK',
'KAI',
'MAC',
'QTWO',
'NOVA',
'TOWN',
'HLIO',
'FCPT',
'CSTM',
'YELP',
'MED',
'DAN',
'LEN-B',
'MGPI',
'WOR',
'EAF',
'ABR',
'RLJ',
'FA',
'ITRI',
'STNG',
'PIPR',
'SAGE',
'GKOS',
'CBZ',
'SBCF',
'WAFD',
'MTX',
'THRM',
'AVAV',
'URBN',
'NAVI',
'AMEH',
'ULCC',
'LAUR',
'NABL',
'PTCT',
'MSTR',
'SSTK',
'SABR',
'TRN',
'CBRL',
'PRK',
'DRH',
'CWH',
'KTB',
'ROIC',
'SI',
'LGIH',
'WSBC',
'WRE',
'MAXR',
'TAL',
'ENR',
'IDCC',
'CIM',
'SLVM',
'MSGE',
'FRO',
'SIX',
'EVOP',
'VSTO',
'ROCC',
'AI',
'BANR',
'MGRC',
'FTDR',
'FFBC',
'FBK',
'AAWW',
'CSGS',
'FROG',
'ARCB',
'GMS',
'SWI',
'CNK',
'GNW',
'FBC',
'TWST',
'MNRL',
'HTLF',
'BCRX',
'VRTV',
'ARRY',
'IRWD',
'SDGR',
'SASR',
'RLAY',
'NPO',
'ACLS',
'RAMP',
'GTN',
'EPC',
'DOOR',
'MWA',
'EXPI',
'XHR',
'KAR',
'KTOS',
'AAT',
'TDS',
'ODP',
'TRMK',
'UE',
'NG',
'HCC',
'UTZ',
'CEIX',
'MDRX',
'GPRE',
'ICFI',
'FLYW',
'POLY',
'NWN',
'TPH',
'CCXI',
'PLAY',
'CVCO',
'LKFN',
'SYBT',
'OPK',
'SATS',
'PSFE',
'SJW',
'IMKTA',
'RES',
'LILA',
'VBTX',
'NVEE',
'CTRE',
'EVCM',
'SKIN',
'TALO',
'HOPE',
'MD',
'DEA',
'PTVE',
'PFS',
'NMRK',
'ESE',
'SHAK',
'PRCT',
'ATRC',
'B',
'IAS',
'TBK',
'EMBC',
'STER',
'APPS',
'APTS',
'BDN',
'PGRE',
'CENTA',
'EFSC',
'TVTY',
'KN',
'VGR',
'SPCE',
'LPI',
'RNST',
'GBT',
'CSWI',
'PDM',
'WWW',
'BLMN',
'TSP',
'AKR',
'NXRT',
'NBTB',
'GFF',
'WGO',
'BGS',
'TCBK',
'XMTR',
'STRA',
'WABC',
'GSHD',
'SNEX',
'NWBI',
'AMPH',
'RCUS',
'BYND',
'TWO',
'COMM',
'NTB',
'MNTV',
'CNNE',
'FLGT',
'FLNC',
'CAKE',
'BKE',
'LRN',
'ALLO',
'WOW',
'FRG',
'EGBN',
'AIR',
'CMRE',
'SKT',
'MTRN',
'EVRI',
'LOB',
'NVRO',
'TVTX',
'ONEM',
'LTC',
'ATGE',
'EWCZ',
'HNI',
'PING',
'TSE',
'HMN',
'KRYS',
'SUPN',
'EBS',
'SAH',
'XPER',
'PLUS',
'CRS',
'SBGI',
'INT',
'PRAA',
'NMIH',
'ECVT',
'OXM',
'ECPG',
'MRTN',
'MYRG',
'RLGY',
'SOVO',
'PLMR',
'MNRO',
'CCS',
'UVV',
'MMI',
'SG',
'NBR',
'AMK',
'TGH',
'MEI',
'OSIS',
'USNA',
'ARI',
'MLNK',
'CRSR',
'MSEX',
'GNL',
'ARGO',
'LPRO',
'MYGN',
'CYRX',
'IBRX',
'ALG',
'RXT',
'AVDX',
'AROC',
'CTKB',
'XNCR',
'ROCK',
'TTMI',
'FSLY',
'SBH',
'ELF',
'SAFT',
'CFFN',
'USPH',
'RVMD',
'DVAX',
'LNN',
'PCT',
'CXW',
'QRTEA',
'LGND',
'IOVA',
'RXRX',
'ZNTL',
'GVA',
'ALEX',
'UCTT',
'RADI',
'IHRT',
'PUMP',
'VRTS',
'RILY',
'VCYT',
'SFL',
'RC',
'STAR',
'LC',
'KFRC',
'JELD',
'PI',
'LILAK',
'STC',
'OFG',
'CGC',
'PRLB',
'COHU',
'GDOT',
'HURN',
'DDD',
'AMCX',
'TEN',
'JACK',
'RCII',
'GBX',
'LADR',
'KALU',
'LGF-B',
'MGNI',
'PATK',
'CHEF',
'FCF',
'BUSE',
'ISEE',
'VRE',
'GDEN',
'FIGS',
'FBNC',
'EVBG',
'ADV',
'XPEL',
'ADUS',
'ANDE',
'MODV',
'PRIM',
'GIC',
'HRT',
'VMEO',
'OSTK',
'XPRO',
'SBSI',
'HCSG',
'SCS',
'FCEL',
'SPNS',
'SCHL',
'PRA',
'CTOS',
'TWI',
'KREF',
'CSR',
'PLAB',
'AVID',
'IRBT',
'CLNE',
'CHCO',
'CUBI',
'FFWM',
'CDNA',
'RETA',
'VIVO',
'AVNS',
'SILK',
'EXTR',
'BGCP',
'BHLB',
'PRTA',
'GTY',
'FBRT',
'NBHC',
'DCOM',
'PRO',
'CNXN',
'MDGL',
'LYEL',
'ZUO',
'OCFC',
'EPAC',
'SHEN',
'DIN',
'SRCE',
'CASH',
'ATRI',
'SWTX',
'VCEL',
'OFLX',
'PMT',
'ALX',
'GDYN',
'RPAY',
'CMP',
'SSP',
'EAT',
'FDP',
'SPTN',
'DNOW',
'NXGN',
'RGR',
'HEES',
'TRS',
'ESRT',
'AHH',
'CTS',
'MCRI',
'PTLO',
'LMND',
'AMWL',
'PCVX',
'SKYW',
'GES',
'BANC',
'EIG',
'STBA',
'HTLD',
'BIGC',
'BBIO',
'AZZ',
'LAW',
'INFN',
'ARIS',
'CMPR',
'OII',
'ADPT',
'ERII',
'BV',
'ENFN',
'ALKT',
'MBUU',
'BALY',
'INSW',
'PARR',
'GABC',
'CLDX',
'TNC',
'ASIX',
'MHO',
'NTUS',
'NHC',
'ROAD',
'SXI',
'ATEN',
'CRNC',
'FNKO',
'AVO',
'KDNY',
'MFA',
'STEM',
'GIII',
'BRKL',
'NCBS',
'ACRS',
'ARQT',
'LZB',
'CAL',
'TMP',
'AGM',
'CNOB',
'MBIN',
'NGM',
'INVA',
'RYI',
'PGTI',
'BFS',
'SGH',
'DBI',
'OEC',
'RXDX',
'VERU',
'DAWN',
'EB',
'',];

export const primaryList = [
  'QQQ',
  'SPY',
  'KBH',
  'AAPL',
  'SHOP',
  'TSLA',
  'CRM',
  'MDB',
  'KMB',
  'GILD',
  'SIX',
  'DAL',
  'DBX',
  'NUE',
  'STLD',
  'AA',
  'FCX',
  'TMUS',
  'TWLO',
  'DIS',
  'ROKU',
  'MTCH',
  'META',
  'CHTR',
  'Z',
  'PLAY',
  'EA',
  'T',
  'NFLX',
  'BIDU',
  'BABA',
  'HD',
  'LOW',
  'HOG',
  'WEN',
  'LULU',
  'ALV',
  'JD',
  'F',
  'CTHR',
  'W',
  'BOX',
  'GM',
  'PENN',
  'LCID',
  'GOEV',
  'DKNG',
  'PTON',
  'SHAK',
  'INTC',
  'AMD',
  'NVDA',
  'CL',
  'KMB',
  'COST',
  'WMT',
  'TGT',
  'KO',
  'PEP',
  'TSN',
  'BUD',
  'GIS',
  'BYND',
  'JPM',
  'C',
  'COF',
  'GS',
  'SUN',
  'V',
  'HIG',
  'VOYA',
  'BK',
  'BMY',
  'MRNA',
  'VEEV',
  'GOOG'
];

const Stocks: AlgoParam[] = [];

for (const s of stockList) {
  Stocks.push(createParam(s));
}

export const PrimaryList: AlgoParam[] = [];

for (const p of primaryList) {
  PrimaryList.push(createParam(p));
}

export default Stocks;

