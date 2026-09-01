import { formatCurrency } from "@/lib/utils";

export default function RateCardInfoSection({ open, last }: { open: number; last: number; }) {
  const change = last - open;
  const percentChange = change / open * 100;
  return (
    <div className="flex gap-4">
      <RateCardInfo label="OPEN" value={open} />
      <RateCardInfo label="LAST" value={last} />
      <RateCardInfo label="CHANGE" value={last - open} isChange={true} />
      <RateCardInfo label="% CHANGE" value={percentChange} isChange={true} isPercentage={true} />
    </div>
  );
}

function RateCardInfo({ label, value, isChange = false, isPercentage = false }: {
  label: string;
  value: number;
  isChange?: boolean;
  isPercentage?: boolean;
}) {
  const isPositive = value >= 0;
  return (
    <div className="bg-neutral-700 w-35 h-20 rounded-2xl border flex flex-col justify-between py-3 px-4 tracking-wide">
      <div className="text-neutral-200">{label}</div>
      <div className={`text-[19px] font-light flex items-center ${isChange && (isPositive ? 'text-green-500' : 'text-red-500')}`}>
        {isPercentage && <span className="text-[12.5px] pr-1.75 pt-1">{isPositive ? '▲' : '▼'}</span>}
        {isChange && <span>{isPositive ? '+' : '-'}</span>}
        <span>{formatCurrency(Math.abs(value), isPercentage ? 2 : 4, 1)}</span>
        {isPercentage && <span>{'%'}</span>}
      </div>
    </div>
  );
}