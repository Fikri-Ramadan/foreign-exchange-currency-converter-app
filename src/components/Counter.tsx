'use client';

import { useBear } from "@/stores/CurrencyLog";

export default function Counter() {
  const { bears } = useBear();
  const { increasePopulation, removeAllBears } = useBear();
  const handleIncreasePopulation = () => increasePopulation();
  const handleRemoveBears = () => removeAllBears();
  return (
    <div>
      <div className="text-[40px] tracking-[-0.5px] bg-white text-black font-bold">The quick brown fox jumps over the lazy dog.</div>
      <div className="text-2xl text-white bg-neutral-900">Counter: {bears}</div>
      <button className="w-20 bg-gray-700 text-center" onClick={handleIncreasePopulation}>+</button>
      <div onClick={handleRemoveBears}>reset</div>
    </div>
  );
}