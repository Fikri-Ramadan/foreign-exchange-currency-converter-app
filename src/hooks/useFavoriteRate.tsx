import { fetcher } from "@/lib/utils";
import { useUserFavorites } from "@/stores/UserFavoritesStore";
import { Favorite, RateListResponse, USDRateMap } from "@/types";
import useSWR from "swr";
import { useShallow } from "zustand/shallow";

export default function useFavoriteRate() {
  const { favorites, updateFavorites } = useUserFavorites(useShallow((state) => ({
    favorites: state.favorites,
    updateFavorites: state.updateFavorites
  })));

  const currenciesToFetch = new Set<string>();
  favorites.forEach((fav) => {
    if (fav.base === 'USD') {
      currenciesToFetch.add('USD');
      currenciesToFetch.add(fav.quote);
    }
    else if (fav.quote === 'USD') {
      currenciesToFetch.add(fav.base);
      currenciesToFetch.add('USD');
    }
    else {
      currenciesToFetch.add(fav.base);
      currenciesToFetch.add(fav.quote);
    }
  });

  const fiveDayAgo = new Date();
  fiveDayAgo.setDate(fiveDayAgo.getDate() - 7);
  const fromfiveDayAgo = fiveDayAgo.toISOString().split('T')[0];

  const { data, isLoading, isValidating, error } = useSWR(
    favorites.length === 0 ? null : `https://api.frankfurter.dev/v2/rates?from=${fromfiveDayAgo}&base=USD&quotes=${[...currenciesToFetch].toString()}`,
    fetcher,
    {
      onSuccess: (data) => {
        if (data?.length > 0) {
          const USDRate: USDRateMap = {};
          data.forEach((item: RateListResponse) => {
            const oldLatest = USDRate[item.quote]?.latest ?? item.rate;
            USDRate[item.quote] = {
              prev: oldLatest,
              latest: item.rate
            };
          });

          const updatedFavorites: Favorite[] = favorites.map((fav) => {
            let prevRate = 0;
            let rate = 0;
            if (fav.base === 'USD') {
              rate = USDRate[fav.quote].latest;
              prevRate = USDRate[fav.quote].prev;
            } else if (fav.quote === 'USD') {
              rate = 1 / USDRate[fav.base].latest;
              prevRate = 1 / USDRate[fav.base].prev;
            } else {
              rate = USDRate[fav.quote].latest / USDRate[fav.base].latest;
              prevRate = USDRate[fav.quote].prev / USDRate[fav.base].prev;
            }

            const change = rate - prevRate;
            const percentChange = change / prevRate * 100;
            return {
              ...fav,
              rateDetails: {
                rate: rate,
                change: change,
                percentChange: percentChange,
                isPositive: percentChange > 0
              }
            };
          });
          updateFavorites(updatedFavorites);
        }
      },
      onError: (err) => {
        console.error('Failed to fetch:', err);
      },
      revalidateOnFocus: false,
      dedupingInterval: 0,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    isError: error
  };
}