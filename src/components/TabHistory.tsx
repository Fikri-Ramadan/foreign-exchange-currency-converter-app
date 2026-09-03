'use client';

import useHasHydrated from "@/hooks/useHasHydrated";
import HistoryChart from "./HistoryChart";
import RateCardInfoSection from "./RateCardInfoSection";
import FilterChartSection from "./FilterChartSection";
import useHistoryData from "@/hooks/useHistoryData";
import { useConverter } from "@/stores/ConverterStore";
import { useShallow } from "zustand/shallow";

export default function TabHistory() {
  const { isValidating } = useHistoryData();
  const { hasHydrated } = useHasHydrated();
  const { base, quote, data } = useConverter(useShallow((state) => ({
    base: state.send.code,
    quote: state.receive.code,
    data: state.rateHistory
  })));

  if (!hasHydrated) null;

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <RateCardInfoSection />
        <FilterChartSection />
      </div>
      {
        isValidating && data?.length > 0 ?
          <div className="w-full h-[375px] bg-neutral-600 animate-pulse rounded-2xl" />
          :
          <HistoryChart base={base} quote={quote} data={data} />
      }
    </div>
  );
}

