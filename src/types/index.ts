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
