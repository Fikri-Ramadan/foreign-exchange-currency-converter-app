'use client';

import { useLogConversion } from "@/stores/LogConversionStore";
import { Button } from "./ui/button";
import { useConverter } from "@/stores/ConverterStore";
import { useShallow } from "zustand/shallow";
import useExchangeRate from "@/hooks/useExchangeRate";
import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export default function AddConversionButton() {
  const { isValidating } = useExchangeRate();
  const { send, receive, sendAmount, receiveAmount } = useConverter(
    useShallow((state) => ({
      send: state.send,
      receive: state.receive,
      sendAmount: state.sendAmount,
      receiveAmount: state.receiveAmount
    }))
  );
  const addLog = useLogConversion((state) => state.addLog);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSaveConversion = () => {
    if (isSaving) return;
    setIsSaving(true);
    addLog({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      send: send,
      receive: receive,
      sendAmount: sendAmount ?? 0,
      receiveAmount: receiveAmount ?? 0
    });
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };


  return (
    <Button
      className={'bg-transparent text-[12px] tracking-wider text-neutral-50 h-8 border border-lime-500 dark:hover:bg-lime-500/10'}
      disabled={isValidating}
      onClick={handleSaveConversion}
    >{isSaving ? <div className="text-lime-500 flex items-center gap-0.5">
      LOGGED
      <Check className="text-lime-500" /></div> :
      <>LOG CONVERTION</>}</Button>
  );
}