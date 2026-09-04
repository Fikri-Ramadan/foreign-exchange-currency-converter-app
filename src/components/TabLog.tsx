'use client';

import { useLogConversion } from "@/stores/LogConversionStore";
import LogCard from "./LogCard";
import ClearLogButton from "./ClearLogButton";
import useHasHydrated from "@/hooks/useHasHydrated";

export default function TabLog() {
  const logs = useLogConversion((state) => state.logs);
  const { hasHydrated } = useHasHydrated();

  if (!hasHydrated) null;
  
  if (logs.length === 0) {
    return (
      <div className="mx-auto my-8 pb-10 px-5 text-center">
        <div className="mb-6 md:mb-4 text-xl md:text-2xl text-neutral-100 tracking-wider">No conversions logged yet</div>
        <div className="mb-1 md:mb-0 text-base md:text-lg text-neutral-200 tracking-wide">Every conversion is recorded here automatically when you tap LOG CONVERSION.</div>
        <div className="text-base md:text-lg text-neutral-200 tracking-wide">Your log is private to this session and this browser.</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-700 rounded-3xl p-5 space-y-5">
      <div className="tracking-wider flex flex-wrap md:flex-nowrap items-center justify-between gap-2 md:gap-0">
        <div className="flex-9/10 text-base">CONVERSION LOG</div>
        <div className="w-full md:w-1/5 flex items-center justify-between gap-3">
          <div className="text-xs text-neutral-100/70">{logs.length} LOGGED</div>
          <ClearLogButton />
        </div>
      </div>

      <div className="space-y-3">
        {
          logs.map((log) => (
            <LogCard
              key={log.id}
              id={log.id}
              createdAt={log.createdAt}
              send={log.send}
              receive={log.receive}
              sendAmount={log.sendAmount}
              receiveAmount={log.receiveAmount}
            />
          ))
        }
      </div>
    </div>
  );
}