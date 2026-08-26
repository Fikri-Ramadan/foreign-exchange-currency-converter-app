'use client';

import useLiveMarketData from "@/hooks/useLiveMarketData";
import { formatCurrency } from "@/lib/utils";
import { useLiveMarket } from "@/stores/MarketStore";
import { LiveMarketPair } from "@/types";

export default function LiveMarket() {
  const marketPairs = useLiveMarket((state) => state.marketPairs);
  const { isValidating } = useLiveMarketData();

  return (
    <div className="h-10 flex items-center">
      <div className="h-full bg-lime-500 text-neutral-500 px-4 flex items-center justify-center gap-2">
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3Z" fill="#0A0A0A" />
        </svg>
        <div className="text-xs text-neutral-950 font-bold tracking-wide">LIVE MARKETS</div>
      </div>
      {
        isValidating ?
          <div className="w-full h-full bg-neutral-500 animate-pulse" />
          :
          <div className="w-full h-full flex-1 bg-neutral-700 flex overflow-hidden scrollbar-none">
            <div className="flex whitespace-nowrap animate-autoscroll hover:paused">
              {
                marketPairs.map((item, index) => (
                  <LivePairItem key={`orig-${index}`} symbol={item.symbol} rate={item.rate} percentChange={item.percentChange} isPositive={item.isPositive} />
                ))
              }
              {
                marketPairs.map((item, index) => (
                  <LivePairItem key={`dup-${index}`} symbol={item.symbol} rate={item.rate} percentChange={item.percentChange} isPositive={item.isPositive} />
                ))
              }
            </div>
          </div>
      }
    </div>
  );
}

function LivePairItem({ symbol, rate, percentChange, isPositive }: Pick<LiveMarketPair, 'symbol' | 'rate' | 'percentChange' | 'isPositive'>) {
  return (
    <div className="text-xs tracking-wide flex items-center gap-2 border-l border-r border-neutral-500 px-4">
      <div className="text-neutral-200">{symbol}</div>
      <div className="text-neutral-100">{formatCurrency(rate, 4)}</div>
      <div className={`flex items-center pl-1 gap-2
        ${percentChange == 0 ? 'text-neutral-200' : isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <div className="text-[7px] font-bold">{percentChange == 0 ? '' : isPositive ? '▲' : '▼'}</div>
        <div className="font-extralight">{percentChange == 0 ? '' : isPositive && '+'}{formatCurrency(percentChange, 4, 1)}%</div>
      </div>
    </div>
  );
}


