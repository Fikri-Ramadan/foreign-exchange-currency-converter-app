import { formatCurrency, formatTimeUltraNarrow } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { LogConversion } from "@/types";

export default function LogCard({ timestamp, base, quote, sendAmount, receiveAmount }: LogConversion) {
  return (
    <div className="flex justify-between border border-neutral-400 bg-neutral-600 rounded-md p-4 tracking-wide">
      <div className="flex items-center gap-12.5">
        <div className="text-neutral-200">{formatTimeUltraNarrow(timestamp)}</div>
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
        <div className="text-lg text-neutral-200">{formatCurrency(sendAmount, 4, 2)}</div>
        <div className="text-base text-lime-500">{formatCurrency(receiveAmount, 4, 2)}</div>
        <Button variant={'outline'} className={'group w-8 h-8 px-1.5 py-2 rounded-md dark:bg-input/0 hover:cursor-pointer'}>
          {/* default icon */}
          <Image
            src={'/assets/images/icon-delete.svg'}
            alt="delete icon"
            width={16}
            height={16}
            className="block group-hover:hidden"
          />
          {/* if hover use this bellow */}
          <Image
            src={'/assets/images/icon-delete-filled.svg'}
            alt="delete icon"
            width={16}
            height={16}
            className="hidden group-hover:block"
          />
        </Button>
      </div>
    </div>
  );
}