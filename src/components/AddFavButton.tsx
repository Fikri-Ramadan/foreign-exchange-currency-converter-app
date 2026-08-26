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
import useFavoriteRate from "@/hooks/useFavoriteRate";
import { useState } from "react";

export default function AddFavButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { hasHydrated } = useHasHydrated();

  const router = useRouter();
  const { isValidating: isValidatingExchange } = useExchangeRate();
  const { isValidating: isValidatingFav } = useFavoriteRate();

  const { send, receive } = useConverter(useShallow((state) => ({
    send: state.send,
    receive: state.receive,
  })));

  const isFavExist = useUserFavorites((state) =>
    state.favorites.some(f => f.base === send.code && f.quote === receive.code)
  );

  const toggleFavorite = useUserFavorites((state) => state.toggleFavorite);

  const handleAddFavorite = () => {
    if (isValidatingExchange || isValidatingFav) return;
    setIsProcessing(true);
    toggleFavorite({
      id: crypto.randomUUID(),
      base: send.code,
      quote: receive.code,
    });

    toast.add({
      type: "success",
      description: isFavExist
        ? "Removed from Favorites"
        : "Added to Favorites",
    });

    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);

    if (!isFavExist) {
      router.push(`?tab=favorites`, { scroll: false });
    }
  };

  if (!hasHydrated) return null;

  return (
    <Button
      className={`${isFavExist ? 'text-neutral-900 bg-lime-500 hover:bg-lime-500/90' : 'text-neutral-50 bg-neutral-600 hover:bg-neutral-500'} text-[12px] tracking-wider font-bold h-8`}
      onClick={handleAddFavorite}
      disabled={isValidatingExchange || isValidatingFav || isProcessing}
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