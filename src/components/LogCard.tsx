import { formatCurrency } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

export default function LogCard() {
  return (
    <div className="flex justify-between border border-neutral-400 bg-neutral-600 rounded-md p-4 tracking-wide">
      <div className="flex items-center gap-12">
        <div className="text-neutral-200">20M</div>
        <div className="text-neutral-100 flex gap-2">
          <span>USD</span>
          <Image
            src={'/assets/images/icon-arrow-right.svg'}
            alt="arrow right icon"
            width={12}
            height={12}
          />
          <span>EUR</span>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="text-lg text-neutral-200">{formatCurrency(1000, 4, 2)}</div>
        <div className="text-base text-lime-500">{formatCurrency(853, 4, 2)}</div>
        <Button variant={'outline'} className={'w-8 h-8 px-1.5 py-2 rounded-md dark:bg-input/0'}>
          <Image
            src={'/assets/images/icon-delete.svg'}
            alt="delete icon"
            width={16}
            height={16}
          />
        </Button>
      </div>
    </div>
  );
}