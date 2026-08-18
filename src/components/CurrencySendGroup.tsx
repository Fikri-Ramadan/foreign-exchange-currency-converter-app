'use client';

import { useRef } from "react";
import CurrencyInput from "./CurrencyInput";
import CurrencyPicker from "./CurrencyPicker";
import { useConverter } from "@/stores/ConverterStore";

export default function CurrencySendGroup() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const sendAmount = useConverter((state) => state.sendAmount);

  return (
    <div className="bg-neutral-600 flex-1 rounded-3xl border border-neutral-400 p-5 flex flex-col">
      <span className="text-[15px] text-neutral-200 tracking-wider">SEND</span>
      <div className="flex flex-1 items-end justify-between">
        <CurrencyInput inputRef={inputRef} value={sendAmount?.toString() ?? ''} />
        <CurrencyPicker type="SEND" />
      </div>
    </div>
  );
}