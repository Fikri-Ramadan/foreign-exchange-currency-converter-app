'use client';

import { useConverter } from "@/stores/ConverterStore";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useShallow } from "zustand/shallow";

export default function CurrencyInput({ inputRef, value, readonly = false }: { inputRef: React.RefObject<HTMLInputElement>; value: string; readonly?: boolean; }) {
  const { setSendAmount, setReceiveAmount, rate } = useConverter(
    useShallow((state) => ({
      setSendAmount: state.setSendAmount,
      setReceiveAmount: state.setReceiveAmount,
      rate: state.rate
    })));
  const [displayValue, setDisplayValue] = useState(
    !value || +value === 0 ? '' : formatCurrency(+value, 4)
  );

  useEffect(() => {
    const numericValue = !value ? 0 : +value;
    const currentDisplay = parseFloat(displayValue.replace(/,/g, '')) || 0;

    if (currentDisplay !== numericValue) {
      setDisplayValue(numericValue === 0 ? '' : formatCurrency(numericValue, 4));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawVal = e.target.value.replace(/,/g, '');
    rawVal = rawVal.replace(/[^\d.]/g, '');

    if (/^\d*\.?\d*$/.test(rawVal)) {
      const parts = rawVal.split('.');
      const integerPart = parts[0];
      const decimalPart = parts[1];

      let formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      if (rawVal.includes('.')) {
        formatted += '.' + (decimalPart || '');
      }

      setDisplayValue(formatted);

      const num = rawVal === '' || rawVal === '.' ? 0 : parseFloat(rawVal);
      setSendAmount(num);

      setReceiveAmount(num * rate);
    }
  };

  const inputValue = readonly ? formatCurrency(+value, 4) : displayValue;

  return (
    <div className="w-full" onClick={() => { !readonly && inputRef?.current?.focus(); }}>
      <Input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        placeholder="0"
        autoComplete="off"
        readOnly={readonly}
        value={inputValue}
        onChange={handleChange}
        className={`
      text-3xl md:text-3xl font-bold font-mono text-white
      h-auto p-1 w-auto field-sizing-content max-w-40 lg:max-w-72 box-content
      md:bg-white shadow-none md:shadow-none dark:bg-input/0
      border-0 hover:border-b border-neutral-200 rounded-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
      [&::-webkit-inner-spin-button]:appearance-none
      focus-visible:ring-0
      ${readonly ? 'cursor-default text-lime-500' : `
        cursor-text
        focus-visible:border-2
        focus-visible:rounded-lg
        focus-visible:ring-offset-0
        focus-visible:field-sizing-content
        focus-visible:border-[#D2FF3A] 
        ` }
      `}
      />
    </div>
  );
}