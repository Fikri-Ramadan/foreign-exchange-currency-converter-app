'use client';

import useExchangeRate from "@/hooks/useExchangeRate";
import { formatCurrency } from "@/lib/utils";
import { useConverter } from "@/stores/ConverterStore";

export default function RateInfo() {
  const { send, receive, rate, log } = useConverter();
  const { isValidating } = useExchangeRate();

  if (isValidating) return <div className="w-20 h-6 bg-neutral-500 rounded-sm animate-pulse" />;

  return (
    <div className="text-[12px] text-neutral-100 tracking-wider" onClick={() => log()}>1 {send.code} = {formatCurrency((1 * rate), 10)} {receive.code}</div>
  );
}