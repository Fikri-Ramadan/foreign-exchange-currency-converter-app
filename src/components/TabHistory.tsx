'use client';

import useHasHydrated from "@/hooks/useHasHydrated";
import HistoryChart from "./HistoryChart";

export default function TabHistory() {
  const { hasHydrated } = useHasHydrated();

  if (!hasHydrated) null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="bg-neutral-700 w-40 h-20 rounded-3xl border"></div>
          <div className="bg-neutral-700 w-30 h-20 rounded-3xl border"></div>
          <div className="bg-neutral-700 w-30 h-20 rounded-3xl border"></div>
          <div className="bg-neutral-700 w-30 h-20 rounded-3xl border"></div>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-neutral-700 w-80 h-10 rounded-md"></div>
        </div>
      </div>
      <HistoryChart />
    </div>
  );
}