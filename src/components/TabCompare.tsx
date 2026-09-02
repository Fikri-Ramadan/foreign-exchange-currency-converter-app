'use client';

import useHasHydrated from "@/hooks/useHasHydrated";
import { formatCurrency } from "@/lib/utils";
import CompareCard from "./CompareCard";
import useCompareRate from "@/hooks/useCompareRate";
import { COMPARE_DATA } from "@/lib/CompareData";
import { useConverter } from "@/stores/ConverterStore";
import { useCompare } from "@/stores/CompareStore";

export default function TabCompare() {
  const { hasHydrated } = useHasHydrated();
  const { isValidating } = useCompareRate();

  const send = useConverter(state => state.send);
  const sendAmount = useConverter(state => state.sendAmount);
  const rates = useCompare(state => state.rates);

  if (!hasHydrated) return null;

  if (sendAmount === 0 || sendAmount == null) {
    return (
      <div className="mx-auto mt-8 pb-10 text-center">
        <div className="mb-4 text-2xl text-neutral-100 tracking-wider">No comparison available</div>
        <div className="text-lg text-neutral-200 tracking-wide">Enter an amount in SEND above to see what your</div>
        <div className="text-lg text-neutral-200 tracking-wide">money is worth in other currencies.</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-700 rounded-3xl p-5 space-y-5">
      <div className="tracking-wider flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-neutral-200/90">MULTI-CURRENCY</div>
          <div className="text-base">{formatCurrency(sendAmount ?? 0, 4)} FROM {send.code}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-neutral-100/70">{COMPARE_DATA.length - 1} PAIRS</div>
        </div>
      </div>
        <div className="space-y-3">
          {
            COMPARE_DATA.map((item, index) => {
              if (send.code === item.code) return;
              if (item.code === 'AED') return;
              return (
                <CompareCard
                  key={index}
                  base={send}
                  quote={item}
                  sendAmount={sendAmount ?? 0}
                  rate={rates[item.code] ?? 0}
                  isValidating={isValidating}
                />
              );
            })
          }
          {
            COMPARE_DATA.some(item => item.code === send.code)
            &&
            // data from last index of COMPARE_DATA
            <CompareCard
              base={send}
              quote={COMPARE_DATA[COMPARE_DATA.length - 1]}
              sendAmount={sendAmount ?? 0}
              rate={rates[COMPARE_DATA[COMPARE_DATA.length - 1].code] ?? 0}
              isValidating={isValidating}
            />
          }
        </div>
    </div>
  );
}