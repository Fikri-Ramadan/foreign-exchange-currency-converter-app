'use client';

import useHistoryData from "@/hooks/useHistoryData";
import { formatCurrency } from "@/lib/utils";
import { useConverter } from "@/stores/ConverterStore";

export default function RateCardInfoSection() {
  const { isValidating } = useHistoryData();
  const rateHistory = useConverter((state) => state.rateHistory);

  const open = rateHistory[rateHistory.length - 1]?.rate ?? 0;
  const last = rateHistory[0]?.rate ?? 0;
  const change = last - open;
  const percentChange = change / open * 100;
  return (
    <>
      {
        isValidating ?
          <div className="flex flex-wrap gap-3 md:gap-4">
            <div className="flex-1/3 md:flex-1 w-35 h-20 bg-neutral-600 rounded-2xl border animate-pulse" />
            <div className="flex-1/3 md:flex-1 w-35 h-20 bg-neutral-600 rounded-2xl border animate-pulse" />
            <div className="flex-1/3 md:flex-1 w-35 h-20 bg-neutral-600 rounded-2xl border animate-pulse" />
            <div className="flex-1/3 md:flex-1 w-35 h-20 bg-neutral-600 rounded-2xl border animate-pulse" />
          </div>
          :
          <div className="flex flex-wrap gap-3 md:gap-4">
            <RateCardInfo label="OPEN" value={open} />
            <RateCardInfo label="LAST" value={last} />
            <RateCardInfo label="CHANGE" value={last - open} isChange={true} />
            <RateCardInfo label="% CHANGE" value={percentChange} isChange={true} isPercentage={true} />
          </div>
      }
    </>
  );
}

function RateCardInfo({ label, value, isChange = false, isPercentage = false }: {
  label: string;
  value: number;
  isChange?: boolean;
  isPercentage?: boolean;
}) {
  const isPositive = value >= 0;
  return (
    <div className="flex-1/3 md:flex-1 bg-neutral-700 w-35 h-20 rounded-2xl border flex flex-col justify-between py-2 md:py-3 px-5 md:px-4 tracking-wide">
      <div className="text-neutral-200">{label}</div>
      <div className={`text-xl md:text-base font-light flex items-center ${isChange && (isPositive ? 'text-green-500' : 'text-red-500')}`}>
        {isPercentage && <span className="text-[12.5px] pr-1.75 pt-1">{isPositive ? '▲' : '▼'}</span>}
        {isChange && <span>{isPositive ? '+' : '-'}</span>}
        <span>{formatCurrency(Math.abs(value), isPercentage ? 2 : 4, 1)}</span>
        {isPercentage && <span>{'%'}</span>}
      </div>
    </div>
  );
};