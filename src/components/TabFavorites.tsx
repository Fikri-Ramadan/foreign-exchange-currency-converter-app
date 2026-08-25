'use client';

import useHasHydrated from "@/hooks/useHasHydrated";
import FavoriteCard from "./FavoriteCard";
import { useUserFavorites } from "@/stores/UserFavoritesStore";
import useFavoriteRate from "@/hooks/useFavoriteRate";

export default function TabFavorites() {
  const favorites = useUserFavorites((state) => state.favorites);
  const { isValidating } = useFavoriteRate();
  const { hasHydrated } = useHasHydrated();

  if (!hasHydrated) {
    return <></>;
  }

  if (favorites.length === 0) {
    return (
      <div className="mx-auto mt-8 pb-10 text-center">
        <div className="mb-4 text-2xl text-neutral-100 tracking-wider">No pinned pairs yet</div>
        <div className="text-lg text-neutral-200 tracking-wide">Pin a pair to track its rate here. Tap the star</div>
        <div className="text-lg text-neutral-200 tracking-wide">icon on any conversion or comparison row.</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-700 rounded-3xl p-5 space-y-5">
      <div className="tracking-wider flex items-center justify-between">
        <div className="text-base">PINNED PAIRS</div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-neutral-100/70">{favorites.length} FAVORITES</div>
        </div>
      </div>

      <div className="space-y-3">
        {
          favorites.map((fav) => (
            <FavoriteCard
              key={fav.id}
              id={fav.id}
              base={fav.base}
              quote={fav.quote}
              rateDetails={fav.rateDetails}
              isValidating={isValidating}
            />
          ))
        }
      </div>
    </div>
  );
}