import { CurrencyConverter, CurrencyOption } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const converterStore = create<CurrencyConverter>()(
  persist(
    (set, get) => ({
      send: {
        flag: 'us',
        code: 'USD',
        name: 'US Dollar',
      },
      receive: {
        flag: "eu",
        code: "EUR",
        name: "Euro",
      },
      sendAmount: null,
      receiveAmount: null,
      rate: 0,
      rateHistory: [],
      isSwapping: false,
      setSend: (curr: CurrencyOption) => set(() => ({
        send: { ...curr }
      })),
      setReceive: (curr: CurrencyOption) => set(() => ({
        receive: { ...curr }
      })),
      setSendAmount: (amount) => set(() => ({
        sendAmount: amount
      })),
      setReceiveAmount: (amount) => set(() => ({
        receiveAmount: amount
      })),
      setRate: (rate) => set(() => ({
        rate: rate,
      })),
      setRateHistory: (rates) => set(() => ({
        rateHistory: [...rates]
      })),
      setSwapping: (condition) => set(() => ({
        isSwapping: condition,
      })),
      swapCurrency: () => set((state) => {
        const isSameCurrency = state.send.code === state.receive.code;
        return {
          isSwapping: !isSameCurrency,
          sendAmount: state.receiveAmount,
          receiveAmount: state.sendAmount,
          send: state.receive,
          receive: state.send
        };
      }),
      log: () => {
        console.log('send', get().send);
        console.log('receive', get().receive);
        console.log('sendAmount', get().sendAmount);
        console.log('receiveAmount', get().receiveAmount);
        console.log('rate', get().rate);
      }
    }),
    {
      name: 'user-currency-storage',
      storage: createJSONStorage(() => localStorage),
    },
  )
);

export const useConverter = converterStore;