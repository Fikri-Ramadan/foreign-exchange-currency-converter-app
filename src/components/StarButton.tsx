'use client';

import Image from "next/image";
import { Button } from "./ui/button";
import { useUserFavorites } from "@/stores/UserFavoritesStore";
import { toast } from "./ui/toast";

export default function StarButton({ id }: { id: string; }) {
  const deleteFavoriteById = useUserFavorites((state) => state.deleteFavoriteById);
  const handleDeleteFavorite = () => {
    deleteFavoriteById(id);
    toast.add({
      type: "success",
      description: "Conversion has been removed from Favorites",
    });
  };

  return (
    <Button
      variant={'outline'}
      className={'w-8 h-8 px-1.5 py-2 rounded-md dark:border dark:border-lime-500 dark:bg-input/0 hover:cursor-pointer'}
      onClick={handleDeleteFavorite}
    >
      <Image
        src={'/assets/images/icon-star-filled.svg'}
        alt="star filled icon"
        width={16}
        height={16}
      />
    </Button>
  );
}