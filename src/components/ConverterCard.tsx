import Image from "next/image";
import { Button } from "./ui/button";

export default function ConverterCard() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-xl mb-5 text-neutral-100">CHECK THE RATE</div>
      <div className="bg-neutral-700 h-40 rounded-t-3xl p-5 flex flex-1 gap-8">
        <div className="bg-neutral-600 flex-1 rounded-3xl border border-neutral-400 p-5">
          <span className="text-[15px] text-neutral-200 tracking-wider">SEND</span>
        </div>
        {/* Insert icon */}
        <Button className="m-auto bg-neutral-600 rounded-lg border border-neutral-400 px-4 py-6">
          <Image
            src={'/assets/images/icon-exchange.svg'}
            alt="icon exchange"
            width={20}
            height={20}
            className=""
          />
        </Button>
        <div className="bg-neutral-600 flex-1 rounded-3xl border border-neutral-400 p-5">
          <span className="text-[15px] text-neutral-200 tracking-wider">RECEIVE</span>
        </div>
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
        <div className="text-[12px] text-neutral-100 tracking-wider">1 USD = 0.8530 EUR</div>
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
          <Button className={'text-[12px] tracking-wider text-neutral-50 h-8 border border-lime-500'}>LOG CONVERTION</Button>
        </div>
      </div>
    </div>
  );
}