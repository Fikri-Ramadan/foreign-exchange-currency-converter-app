'use client';

import { formatCurrency, formatTimeUltraNarrow } from "@/lib/utils";
import Image from "next/image";
import { LogConversion } from "@/types";
import DeleteLogButton from "./DeleteLogButton";
import { useConverter } from "@/stores/ConverterStore";
import { useShallow } from "zustand/shallow";
import useExchangeRate from "@/hooks/useExchangeRate";

export default function LogCard({ id, createdAt, send, receive, sendAmount, receiveAmount }: LogConversion) {
  const { isValidating } = useExchangeRate();
  const { setSend, setReceive } = useConverter(
    useShallow((state) => ({
      setSend: state.setSend, setReceive: state.setReceive
    }))
  );

  const handleSetConversion = () => {
    if (!isValidating) {
      setSend(send);
      setReceive(receive);
    }
  };

  return (
    <div
      className="flex justify-between items-center md:gap-5 border border-neutral-400 bg-neutral-600 rounded-md p-2 px-4 md:p-4 tracking-wide hover:border-neutral-200/50 hover:cursor-pointer transition-colors duration-300 ease-in-out"
      onClick={handleSetConversion}
    >
      <div className="w-1/2 flex flex-col md:flex-row items-start md:items-center md:gap-12.5">
        <div className="text-neutral-200 w-8">{formatTimeUltraNarrow(createdAt)}</div>
        <div className="text-neutral-100 flex gap-3">
          <span>{send.code}</span>
          <Image
            src={'/assets/images/icon-arrow-right.svg'}
            alt="arrow right icon"
            width={12}
            height={12}
          />
          <span>{receive.code}</span>
        </div>
      </div>
      <div className="w-1/2 flex flex-col md:flex-row items-center justify-end md:gap-5">
        <div className="text-lg text-neutral-200">{formatCurrency(sendAmount, 4, 2)}</div>
        <div className="text-base text-lime-500">{formatCurrency(receiveAmount, 4, 2)}</div>
      </div>
      <DeleteLogButton id={id} />
    </div>
  );
}