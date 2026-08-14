import Image from "next/image";
import LiveMarket from "./LiveMarket";
import { CURRENCIES } from "@/lib/Flags";

export default function Header() {
  const totalCurrencies = CURRENCIES.length;
  return (
    <div>
      <div className="h-16 px-5 flex justify-between items-center">
        <Image
          src={'/assets/images/logo.svg'}
          alt="logo"
          width={140}
          height={140}
        />
        <div className="text-sm text-neutral-100/70 tracking-widest flex gap-3">
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