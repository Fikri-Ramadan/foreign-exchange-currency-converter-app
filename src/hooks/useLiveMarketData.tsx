import { PAIRS_TO_FETCH } from "@/lib/LiveMarketPair";
import { fetcher } from "@/lib/utils";
import { useLiveMarket } from "@/stores/MarketStore";
import { LiveMarketPair, RateListResponse, USDRateMap } from "@/types";
import useSWR from "swr";
import { useShallow } from "zustand/shallow";

export default function useLiveMarketData() {
  const { currenciesToFetch, setMarketPairs } = useLiveMarket(
    useShallow((state) => ({
      currenciesToFetch: state.currenciesToFetch
      , setMarketPairs: state.setMarketPairs
    })));

  const fiveDayAgo = new Date();
  fiveDayAgo.setDate(fiveDayAgo.getDate() - 7);
  const fromfiveDayAgo = fiveDayAgo.toISOString().split('T')[0];

  const { data, isLoading, isValidating, error } = useSWR(
    `https://api.frankfurter.dev/v2/rates?from=${fromfiveDayAgo}&base=USD&quotes=${currenciesToFetch.toString()}`,
    fetcher,
    {
      onSuccess: (data) => {
        if (data) {
          const USDRate: USDRateMap = {};
          data.forEach((item: RateListResponse) => {
            const oldLatest = USDRate[item.quote]?.latest ?? item.rate;
            USDRate[item.quote] = {
              prev: oldLatest,
              latest: item.rate
            };
          });

          const marketPairs: LiveMarketPair[] = PAIRS_TO_FETCH.map((item) => {
            let prevRate = 0;
            let rate = 0;
            if (item.base === 'USD') {
              rate = USDRate[item.quote].latest;
              prevRate = USDRate[item.quote].prev;
            } else if (item.quote === 'USD') {
              rate = 1 / USDRate[item.base].latest;
              prevRate = 1 / USDRate[item.base].prev;
            } else {
              rate = USDRate[item.quote].latest / USDRate[item.base].latest;
              prevRate = USDRate[item.quote].prev / USDRate[item.base].prev;
            }

            const change = rate - prevRate;
            const percentChange = change / prevRate * 100;
            return {
              id: item.id,
              symbol: item.symbol,
              base: item.base,
              quote: item.quote,
              rate: rate,
              change: change,
              percentChange: percentChange,
              isPositive: percentChange > 0
            };
          });
          setMarketPairs(marketPairs);
        }
      },
      onError: (err) => {
        console.error('Failed to fetch:', err);
      },
      revalidateOnFocus: false,
    });

  return {
    data,
    isLoading,
    isValidating,
    isError: error
  };
}