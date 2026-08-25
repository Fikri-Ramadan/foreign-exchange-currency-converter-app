import { UserFavStore } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const UserFavoritesStore = create<UserFavStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      checkFavoriteExist: ({ base, quote }) => get().favorites.some((fav) => fav.base == base && fav.quote == quote),
      toggleFavorite: (fav) => set((state) => {
        if (state.checkFavoriteExist({ base: fav.base, quote: fav.quote })) {
          return {
            favorites: state.favorites.filter((value) => value.base != fav.base || value.quote != fav.quote)
          };
        }
        return {
          favorites: [fav, ...state.favorites]
        };
      }),
      updateFavorites: (favs) => set(() => ({
        favorites: [...favs]
      })),
      deleteFavoriteById: (id) => set((state) => ({
        favorites: state.favorites.filter((fav) => fav.id != id)
      })),
    }),
    {
      name: 'user-favorites-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useUserFavorites = UserFavoritesStore;