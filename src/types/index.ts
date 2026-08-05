export interface Currency {
  code: string;
  name: string;
  symbol?: string;
  flag?: string;
}

export type CurrencyConverter = {
  base: string;
  quote: string;
}