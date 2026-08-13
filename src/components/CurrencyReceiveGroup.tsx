'use client';

import { useRef } from "react";
import CurrencyInput from "./CurrencyInput";
import CurrencyPicker from "./CurrencyPicker";
import { useConverter } from "@/stores/ConverterStore";

export default function CurrencyReceiveGroup() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const {receiveAmount} = useConverter();

  return (
    <div className="bg-neutral-600 flex-1 rounded-3xl border border-neutral-400 p-5 flex flex-col">
      <span className="text-[15px] text-neutral-200 tracking-wider">RECEIVE</span>
      <div className="flex flex-1 items-end justify-between">
        <CurrencyInput inputRef={inputRef} value={(receiveAmount ?? 0).toString()} readonly />
        <CurrencyPicker type="RECEIVE" />
      </div>
    </div>
  );
}