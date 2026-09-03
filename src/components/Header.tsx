import Image from "next/image";
import LiveMarket from "./LiveMarket";
import { CURRENCIES } from "@/lib/Flags";

export default function Header() {
  const totalCurrencies = CURRENCIES.length;
  return (
    <div>
      <div className="h-14 md:h-16 px-3 md:px-5 flex justify-between items-center">
        <Image
          src={'/assets/images/logo.svg'}
          alt="logo"
          width={140}
          height={140}
          className="w-28 h-28 md:w-35 md:h-35"
        />
        <div className="text-[9px] md:text-sm text-neutral-100/70 tracking-widest flex items-center gap-1.5 md:gap-3">
          <div>{totalCurrencies} CURRENCIES</div>
          <div>·</div>
          <div>EOD</div>
          <div>·</div>
          <div>ECB DATA</div>
        </div>
      </div>
      <LiveMarket />
    </div>
  );
}