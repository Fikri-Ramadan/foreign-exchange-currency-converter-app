import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import AddFavButton from "./AddFavButton";
import { CurrencyOption } from "@/types";

export default function CompareCard({ base, quote, sendAmount, rate }: {
  base: CurrencyOption, quote: CurrencyOption; sendAmount: number; rate: number
}) {
  const isValidating = false;
  return (
    <div className="flex justify-between border border-neutral-400 bg-neutral-600 rounded-md px-4 py-3 tracking-wide">
      <div className="flex items-center gap-12.5">
        <div className="text-neutral-100 flex items-center gap-5">
          <div>
            <Image
              src={`/assets/images/flags/${quote.flag}.webp`}
              alt="flag icon"
              width={25}
              height={25}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.75">
            <span>{quote.code}</span>
            <span className="text-xs text-neutral-200/80">{quote.name}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-end gap-1">
          {
            isValidating ?
              <div className="animate-pulse bg-neutral-500 w-10 h-3 rounded-sm" />
              :
              <>
                <div className="text-base text-neutral-100">{formatCurrency(sendAmount * rate, 4)}</div>
                <div className="text-[9px] text-neutral-200/70 font-extrabold">@ {formatCurrency(rate, 4, 1)}</div>
              </>
          }
        </div>
        <AddFavButton base={base.code} quote={quote.code} type="ICON" />
      </div>
    </div>
  );
}