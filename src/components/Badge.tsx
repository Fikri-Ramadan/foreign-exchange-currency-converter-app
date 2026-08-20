export default function Badge({ amount }: { amount: number; }) {
  return (
    <div className="w-5 h-5 pt-0.5 pl-px rounded-full text-[10px] text-lime-500 bg-lime-500/20 flex items-center justify-center">
      {amount}
    </div>
  );
}