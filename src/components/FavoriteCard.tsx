import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import StarButton from "./StarButton";

export default function FavoriteCard() {
  let percentChange = 0.12;
  let isPositive = true;
  return (
    <div className="flex justify-between border border-neutral-400 bg-neutral-600 rounded-md px-4 py-3 tracking-wide">
      <div className="flex items-center gap-12.5">
        <div className="text-neutral-100 flex gap-3">
          <span>{'USD'}</span>
          <Image
            src={'/assets/images/icon-arrow-right.svg'}
            alt="arrow right icon"
            width={12}
            height={12}
          />
          <span>{'GBP'}</span>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-end gap-1">
          <div className="text-base text-neutral-100">{formatCurrency(0.8531, 4, 1)}</div>
          <div className={`flex items-center gap-1 ${percentChange == 0 ? 'text-neutral-200' : isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <div className="text-[5px] font-bold">{percentChange == 0 ? '' : isPositive ? '▲' : '▼'}</div>
            <div className="text-[10px] font-extralight">{percentChange == 0 ? '' : isPositive && '+'}{formatCurrency(percentChange, 4, 1)}%</div>
          </div>
        </div>
        <StarButton />
      </div>
    </div>
  );
}