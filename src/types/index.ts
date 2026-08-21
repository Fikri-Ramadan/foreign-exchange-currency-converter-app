export interface Currency {
  code: string;
  name: string;
  symbol?: string;
  flag?: string;
}

export interface CurrencyOption {
  flag: string;
  code: string;
  name: string;
  isPopular?: boolean;
}

export interface LogConversion {
  id: string;
  createdAt: Date;
  send: CurrencyOption;
  receive: CurrencyOption;
  sendAmount: number;
  receiveAmount: number;
};

export interface LogStore {
  logs: LogConversion[];
  addLog: (log: LogConversion) => void;
  deleteLogById: (id: string) => void;
  clearLog: () => void;
}

export interface CurrencyConverter {
  send: CurrencyOption;
  receive: CurrencyOption;
  sendAmount: number | null;
  receiveAmount: number | null;
  rate: number;
  isSwapping: boolean;
  setSend: (curr: CurrencyOption) => void;
  setReceive: (curr: CurrencyOption) => void;
  setSendAmount: (amount: number) => void;
  setReceiveAmount: (amount: number) => void;
  setRate: (rate: number) => void;
  setSwapping: (condition: boolean) => void;
  swapCurrency: () => void;
  log: () => void;
}

export interface LiveMarket {
  currenciesToFetch: string[],
  marketPairs: LiveMarketPair[],
  setMarketPairs: (marketPairs: LiveMarketPair[]) => void;
}

export interface LiveMarketPair {
  id: string;
  symbol: string;
  base: string;
  quote: string;
  rate: number;
  change: number;
  percentChange: number;
  isPositive: boolean;
}

export type CurrencyConvert = {
  base: string;
  quote: string;
};

export type RateListResponse = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

export type USDRateMap = Record<
  string, {
    prev: number; latest: number;
  }>;

export type TabValue = 'history' | 'compare' | 'favorites' | 'log';

export type TimeSubUnit = 'Y' | 'MO' | 'W' | 'D' | 'H' | 'M' | 'S';