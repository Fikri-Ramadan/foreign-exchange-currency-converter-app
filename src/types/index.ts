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

export interface CurrencyConverter {
  send: CurrencyOption;
  receive: CurrencyOption;
  sendAmount: number | null;
  receiveAmount: number | null;
  rate: number;
  rateHistory: RateHistory[];
  rateCompare: CompareRates;
  isSwapping: boolean;
  setSend: (curr: CurrencyOption) => void;
  setReceive: (curr: CurrencyOption) => void;
  setSendAmount: (amount: number) => void;
  setReceiveAmount: (amount: number) => void;
  setRate: (rate: number) => void;
  setRateHistory: (rates: RateHistory[]) => void;
  setRateCompare: (rates: CompareRates) => void;
  setSwapping: (condition: boolean) => void;
  swapCurrency: () => void;
  log: () => void;
}

export type RateHistory = Pick<RateListResponse, 'date' | 'rate'>
export type CompareRates = Record<string, number>;

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

export interface UserFavStore {
  favorites: Favorite[];
  checkFavoriteExist: ({ base, quote }: Pick<Favorite, 'base' | 'quote'>) => boolean;
  toggleFavorite: (fav: Favorite) => void;
  updateFavorites: (favs: Favorite[]) => void;
  deleteFavoriteById: (id: string) => void;
}

export type Favorite = {
  id: string;
  base: string;
  quote: string;
  rateDetails?: Pick<LiveMarketPair, 'rate' | 'change' | 'percentChange' | 'isPositive'>
};



export type USDRateMap = Record<
  string, {
    prev: number; latest: number;
  }>;

export type TabValue = 'history' | 'compare' | 'favorites' | 'log';

export type FilterValue = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

export type TimeSubUnit = 'Y' | 'MO' | 'W' | 'D' | 'H' | 'M' | 'S';