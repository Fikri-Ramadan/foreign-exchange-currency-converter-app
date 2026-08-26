import { LiveMarketPair } from "@/types";

export const PAIRS_TO_FETCH: Pick<LiveMarketPair, 'id' | 'symbol' | 'base' | 'quote'>[] = [
  { id: "usd-jpy", symbol: "USD/JPY", base: "USD", quote: "JPY" },
  { id: "gbp-usd", symbol: "GBP/USD", base: "GBP", quote: "USD" },
  { id: "usd-chf", symbol: "USD/CHF", base: "USD", quote: "CHF" },
  { id: "eur-gbp", symbol: "EUR/GBP", base: "EUR", quote: "GBP" },
  { id: "aud-usd", symbol: "AUD/USD", base: "AUD", quote: "USD" },
  { id: "usd-cad", symbol: "USD/CAD", base: "USD", quote: "CAD" },
  { id: "eur-usd", symbol: "EUR/USD", base: "EUR", quote: "USD" },
  { id: "usd-idr", symbol: "USD/IDR", base: "USD", quote: "IDR" },
];