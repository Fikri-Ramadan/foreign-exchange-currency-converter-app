import { PAIRS_TO_FETCH } from "@/lib/LiveMarketPair";
import { LiveMarket } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initCurrenciesToFetch = (): string[] => {
  const pairs = new Set<string>();
  PAIRS_TO_FETCH.forEach((pair) => {
    if (pair.base === 'USD') pairs.add(pair.quote);
    else if (pair.quote === 'USD') pairs.add(pair.base);
    else {
      pairs.add(pair.base);
      pairs.add(pair.quote);
    }
  });
  return [...pairs];
};

const liveMarketStore = create<LiveMarket>()(
  persist(
    (set, get) => ({
      currenciesToFetch: initCurrenciesToFetch(),
      marketPairs: [],
      setMarketPairs: (marketPairs) => set(() => ({
        marketPairs: [...marketPairs]
      }))
    }),
    {
      name: 'live-market-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useLiveMarket = liveMarketStore;