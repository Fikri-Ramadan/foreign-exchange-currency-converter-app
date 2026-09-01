'use client';

import useHasHydrated from "@/hooks/useHasHydrated";
import HistoryChart from "./HistoryChart";
import RateCardInfoSection from "./RateCardInfoSection";
import FilterChartSection from "./FilterChartSection";

export default function TabHistory() {
  const { hasHydrated } = useHasHydrated();

  if (!hasHydrated) null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <RateCardInfoSection open={0.8516} last={0.8531} />
        <FilterChartSection />
      </div>
      <HistoryChart />
    </div>
  );
}

