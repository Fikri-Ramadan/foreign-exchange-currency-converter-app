import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import StarButton from "./StarButton";
import { Favorite } from "@/types";

export default function FavoriteCard({ id, base, quote, rateDetails, isValidating }: Favorite & { isValidating: boolean; }) {
  return (
    <div className="flex justify-between border border-neutral-400 bg-neutral-600 rounded-md px-4 py-3 tracking-wide">
      <div className="flex items-center gap-12.5">
        <div className="text-neutral-100 flex gap-3">
          <span>{base}</span>
          <Image
            src={'/assets/images/icon-arrow-right.svg'}
            alt="arrow right icon"
            width={12}
            height={12}
          />
          <span>{quote}</span>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-end gap-1">
          {
            isValidating ?
              <div className="animate-pulse bg-neutral-400 w-10 h-3 rounded-sm" />
              :
              <>
                <div className="text-base text-neutral-100">{formatCurrency(rateDetails?.rate ?? 0, 4, 1)}</div>
                <div className={`flex items-center gap-1 ${rateDetails?.percentChange == 0 ? 'text-neutral-200' : rateDetails?.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  <div className="text-[5px] font-bold">{rateDetails?.percentChange == 0 ? '' : rateDetails?.isPositive ? '▲' : '▼'}</div>
                  <div className="text-[10px] font-extralight">{rateDetails?.percentChange == 0 ? '' : rateDetails?.isPositive && '+'}{formatCurrency(rateDetails?.percentChange ?? 0, 4, 1)}%</div>
                </div>
              </>
          }
        </div>
        <StarButton id={id} />
      </div>
    </div>
  );
}