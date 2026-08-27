import { Compare } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useConverter } from "./ConverterStore";

const CompareStore = create<Compare>()(
  persist(
    (set, get) => ({
      baseCurrency: useConverter.getState().send.code,
      rates: {},
      setRates: (rates) => set(() => ({
        rates: {...rates},
      }))
    }),
    {
      name: 'compare-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useCompare = CompareStore;