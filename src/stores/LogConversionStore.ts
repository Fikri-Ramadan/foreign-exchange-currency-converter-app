import { LogStore } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const LogConversionStore = create<LogStore>()(
  persist(
    (set, get) => ({
      logs: [],
      addLog: (log) => set(() => ({
        logs: [log, ...get().logs]
      })),
      deleteLogById: (id) => {
        set((state) => ({
          logs: state.logs.filter((log) => log.id != id),
        }));
      },
      clearLog: () => set(() => ({
        logs: []
      }))
    }),
    {
      name: 'user-log-conversion-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useLogConversion = LogConversionStore;