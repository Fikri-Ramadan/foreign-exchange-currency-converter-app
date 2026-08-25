'use client';

import Image from "next/image";
import { Button } from "./ui/button";
import { useUserFavorites } from "@/stores/UserFavoritesStore";
import { useConverter } from "@/stores/ConverterStore";
import { useShallow } from "zustand/shallow";
import { toast } from "./ui/toast";
import { useRouter } from "next/navigation";
import useHasHydrated from "@/hooks/useHasHydrated";
import useExchangeRate from "@/hooks/useExchangeRate";

export default function AddFavButton() {
  const { hasHydrated } = useHasHydrated();

  const router = useRouter();
  const {isValidating} = useExchangeRate();

  const { send, receive } = useConverter(useShallow((state) => ({
    send: state.send,
    receive: state.receive,
  })));

  const { checkFavoriteExist, toggleFavorite } = useUserFavorites(useShallow((state) => ({
    favorites: state.favorites,
    checkFavoriteExist: state.checkFavoriteExist,
    toggleFavorite: state.toggleFavorite
  })));

  const isFavExist = checkFavoriteExist({ base: send.code, quote: receive.code });

  const handleAddFavorite = () => {
    toggleFavorite({
      id: crypto.randomUUID(),
      base: send.code,
      quote: receive.code,
    });

    if (isFavExist) {
      toast.add({
        type: "success",
        description: "Conversion has been removed from Favorites",
      });
    } else {
      toast.add({
        type: "success",
        description: "Conversion has been added to Favorites",
      });
      router.push(`?tab=favorites`, { scroll: false });
    }
  };

  if (!hasHydrated) {
    return <></>;
  }

  return (
    <Button
      className={`${isFavExist ? 'text-neutral-900 bg-lime-500 hover:bg-lime-500/90' : 'text-neutral-50 bg-neutral-600 hover:bg-neutral-500'} text-[12px] tracking-wider font-bold h-8`}
      onClick={handleAddFavorite}
      disabled={isValidating}
    >
      <div className="flex items-center gap-2 px-1">
        <Image
          src={isFavExist ? '/assets/images/icon-star-filled.svg' : '/assets/images/icon-star.svg'}
          alt="icon star"
          width={16}
          height={16}
          className={isFavExist ? 'brightness-0' : ''}
        />
        {isFavExist ? 'FAVORITED' : 'FAVORITE'}
      </div>
    </Button>
  );
}