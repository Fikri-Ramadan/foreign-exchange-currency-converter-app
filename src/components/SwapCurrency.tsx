'use client';

import Image from "next/image";
import { Button } from "./ui/button";
import { useConverter } from "@/stores/ConverterStore";
import useExchangeRate from "@/hooks/useExchangeRate";

export default function SwapCurrency() {
  const swapCurrency = useConverter((state) => state.swapCurrency);
  const { isValidating } = useExchangeRate();

  return (
    <div className="w-full md:w-fit h-12 md:h-full flex justify-center items-center">
    <Button
      disabled={isValidating}
      className="w-12 h-12 m-auto bg-neutral-600 rounded-lg border border-neutral-400 hover:cursor-pointer hover:bg-neutral-500"
      onClick={() => { swapCurrency(); }}
    >
      <Image
        src={'/assets/images/icon-exchange.svg'}
        alt="icon exchange"
        width={20}
        height={20}
        className="rotate-90 md:rotate-0"
      />
    </Button>
    </div>
  );
}