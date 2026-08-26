'use client';

import Image from "next/image";
import { Button } from "./ui/button";
import { useUserFavorites } from "@/stores/UserFavoritesStore";
import { useConverter } from "@/stores/ConverterStore";
import { useShallow } from "zustand/shallow";
import { toast } from "./ui/toast";
import useHasHydrated from "@/hooks/useHasHydrated";
import useExchangeRate from "@/hooks/useExchangeRate";
import useFavoriteRate from "@/hooks/useFavoriteRate";
import { useState } from "react";

export default function AddFavButton({ base, quote, type = 'BUTTON' }: { base: string, quote: string, type?: 'BUTTON' | 'ICON'; }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { hasHydrated } = useHasHydrated();

  const { isValidating: isValidatingExchange } = useExchangeRate();
  const { isValidating: isValidatingFav } = useFavoriteRate();

  const isFavExist = useUserFavorites((state) =>
    state.favorites.some(f => f.base === base && f.quote === quote)
  );

  const toggleFavorite = useUserFavorites((state) => state.toggleFavorite);

  const handleAddFavorite = () => {
    if (isValidatingExchange || isValidatingFav) return;
    setIsProcessing(true);
    toggleFavorite({
      id: crypto.randomUUID(),
      base: base,
      quote: quote,
    });

    toast.add({
      type: "success",
      description: isFavExist
        ? "Removed from Favorites"
        : "Added to Favorites",
    });

    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  if (!hasHydrated) return null;

  return (
    <>
      {type === 'BUTTON' ?
        <BtnTypeButton
          isFavExist={isFavExist}
          action={handleAddFavorite}
          isValidatingExchange={isValidatingExchange}
          isValidatingFav={isValidatingFav}
          isProcessing={isProcessing}
        />
        :
        <BtnTypeIcon
          isFavExist={isFavExist}
          action={handleAddFavorite}
          isValidatingExchange={isValidatingExchange}
          isValidatingFav={isValidatingFav}
          isProcessing={isProcessing}
        />
      }
    </>
  );
}

function BtnTypeIcon({ isFavExist, action, isValidatingExchange, isValidatingFav, isProcessing }: {
  isFavExist: boolean,
  action: () => void,
  isValidatingExchange: boolean,
  isValidatingFav: boolean,
  isProcessing: boolean;
}) {
  return (
    <Button
      variant={'outline'}
      className={`
        ${isFavExist ? 'dark:border-lime-500' : ''}
        w-8 h-8 px-1.5 py-2 rounded-md dark:border dark:bg-input/0 hover:cursor-pointer
        `}
      onClick={action}
      disabled={isValidatingExchange || isValidatingFav || isProcessing}
    >
      <Image
        src={`/assets/images/${isFavExist ? 'icon-star-filled' : 'icon-star'}.svg`}
        alt="star filled icon"
        width={16}
        height={16}
      />
    </Button>
  );
}

function BtnTypeButton({ isFavExist, action, isValidatingExchange, isValidatingFav, isProcessing }: {
  isFavExist: boolean,
  action: () => void,
  isValidatingExchange: boolean,
  isValidatingFav: boolean,
  isProcessing: boolean;
}) {
  return (
    <Button
      className={`${isFavExist ? 'text-neutral-900 bg-lime-500 hover:bg-lime-500/90' : 'text-neutral-50 bg-neutral-600 hover:bg-neutral-500'}
                text-[12px] tracking-wider font-bold h-8`}
      onClick={action}
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