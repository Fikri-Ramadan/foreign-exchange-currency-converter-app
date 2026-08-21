import Image from "next/image";
import { Button } from "./ui/button";
import CurrencySendGroup from "./CurrencySendGroup";
import CurrencyReceiveGroup from "./CurrencyReceiveGroup";
import SwapCurrency from "./SwapCurrency";
import RateInfo from "./RateInfo";
import AddConversionButton from "./AddConversionButton";

export default function ConverterCard() {

  return (
    <div className="max-w-259 mx-auto">
      <div className="text-xl mb-5 text-neutral-100">CHECK THE RATE</div>
      <div className="bg-neutral-700 h-40 rounded-t-3xl p-5 flex flex-1 gap-3 lg:gap-6">
        <CurrencySendGroup />
        <SwapCurrency />
        <CurrencyReceiveGroup />
      </div>
      <div className="bg-neutral-700">
        <svg className="w-full h-px" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            strokeWidth="2"
            strokeDasharray="4 2" /* 4px dash, 6px space */
            className="stroke-neutral-500"
          />
        </svg>
      </div>
      <div className="bg-neutral-700 h-16 rounded-b-3xl flex items-center justify-between px-5">
        <RateInfo />
        <div className="space-x-2 flex">
          <Button className={'bg-lime-500 text-[12px] tracking-wider text-neutral-900 font-bold h-8'}>
            <div className="flex items-center gap-2 px-1">
              <Image
                src={'/assets/images/icon-star-filled.svg'}
                alt="icon start"
                width={16}
                height={16}
                className="brightness-0"
              /> FAVORITED
            </div>
          </Button>
          <AddConversionButton />
        </div>
      </div>
    </div>
  );
}