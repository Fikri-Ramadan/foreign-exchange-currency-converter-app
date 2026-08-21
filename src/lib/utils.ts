import { TimeSubUnit } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (...args: [string]) => fetch(...args).then(res => res.json());

export const formatCurrency = (rawCurr: number, maximumFraction: number, minimumFraction: number = 0) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minimumFraction,
    maximumFractionDigits: maximumFraction,
  }).format(rawCurr);
;

export const formatTimeUltraNarrow = (date: Date | string | number): string => {
  const d = date instanceof Date ? date : new Date(date);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  if (seconds < 1) {
    return 'Now';
  }

  const intervals: Record<TimeSubUnit, number> = {
    Y: 31536000,
    MO: 2592000,
    W: 604800,
    D: 86400,
    H: 3600,
    M: 60,
    S: 1
  };

  for (const [unit, value] of Object.entries(intervals) as [TimeSubUnit, number][]) {
    const counter = Math.floor(seconds / value);
    if (counter >= 1) {
      return `${counter}${unit}`;
    }
  }

  return 'Now';
};

