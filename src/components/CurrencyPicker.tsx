'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "./ui/command";
import { CURRENCIES } from "@/lib/Flags";
import Image from "next/image";
import { CurrencyOption } from "@/types";
import useHasHydrated from "@/hooks/useHasHydrated";
import useExchangeRate from "@/hooks/useExchangeRate";
import { useConverter } from "@/stores/ConverterStore";
import { useShallow } from "zustand/shallow";

export default function CurrencyPicker({ type }: { type: 'SEND' | 'RECEIVE'; }) {
  const [open, setOpen] = useState<boolean>(false);
  const { hasHydrated } = useHasHydrated();
  const { send, receive } = useConverter(
    useShallow((state) => ({
      send: state.send,
      receive: state.receive
    }))
  );
  const { isValidating } = useExchangeRate();

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={isValidating} render={<Button variant="outline" className="p-5 gap-2 text-base hover:cursor-pointer hover:bg-neutral-500">
          {
            hasHydrated ?
              <>
                <Image
                  src={`/assets/images/flags/${type == 'SEND' ? send.flag : receive.flag}.webp`}
                  alt={'flag icon'}
                  width={20} height={20}
                  className="rounded-full object-cover" />
                <span className="tracking-wider">{type == 'SEND' ? send.code : receive.code}</span>
                <Image
                  src={'/assets/images/icon-chevron-down.svg'}
                  alt="chevron down icon"
                  width={16}
                  height={16}
                />
              </> :
              <div className="animate-pulse w-13 h-2 bg-neutral-400" />
          }
        </Button>} />
        <PopoverContent align="end" className="w-95 p-0">
          <CommandBox type={type} codePicked={type == 'SEND' ? send.code : receive.code} setOpen={setOpen} />
        </PopoverContent>
      </Popover>
    </div>
  );
}


function CommandBox({ type, codePicked, setOpen }: { type: 'SEND' | 'RECEIVE'; codePicked: string; setOpen: (open: boolean) => void; }) {
  return (
    <div className="flex flex-col gap-4">
      <Command className="w-95 bg-neutral-600" >
        <CommandInput placeholder="Search currencies..." />
        <CommandList>
          <CommandEmpty>No CURRENCIES found.</CommandEmpty>
          <CommandGroup>
            <div className="flex justify-between px-3 pt-3 text-neutral-200">
              <span>POPULAR</span><span>{CURRENCIES.filter((item) => item.isPopular).length}</span>
            </div>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            {
              CURRENCIES.filter((item) => item.isPopular).map((item, index) => (
                <CommandItemComp key={index} type={type} item={item} codePicked={codePicked} setOpen={setOpen} />
              ))
            }
          </CommandGroup>
          <CommandGroup>
            <div className="flex justify-between px-2 pt-1 text-neutral-200">
              <span>OTHER CURRENCIES</span><span>{CURRENCIES.filter((item) => !item.isPopular).length}</span>
            </div>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup >
            {
              CURRENCIES.filter((item) => !item.isPopular).map((item, index) => (
                <CommandItemComp key={index} type={type} item={item} codePicked={codePicked} setOpen={setOpen} />
              ))
            }
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

function CommandItemComp({ type, item, codePicked, setOpen }: { type: 'SEND' | 'RECEIVE'; item: CurrencyOption; codePicked: string; setOpen: (open: boolean) => void; }) {
  const { setSend, setReceive } = useConverter();

  const handleSelect = (value: string) => {
    const pickedCurrency = CURRENCIES.find((curr: CurrencyOption) => curr.code == value.split(' ')[0]);
    if (pickedCurrency) {
      type == 'SEND' ? setSend(pickedCurrency) : setReceive(pickedCurrency);
    };
    setOpen(false);
  };

  return (
    <CommandItem className="gap-4 py-3 hover:cursor-pointer" value={item.code + ' ' + item.name} onSelect={handleSelect}>
      <Image
        src={`/assets/images/flags/${item.flag}.webp`}
        alt={'flag icon'}
        width={20} height={20}
        className="rounded-full object-cover" />
      <span className="tracking-wider">{item.code}</span>
      <span className="text-neutral-200 tracking-wide text-xs">{item.name}</span>
      {
        codePicked.toUpperCase() == item.code &&
        <CommandShortcut><Image src={'/assets/images/icon-check.svg'} alt={'check icon'} width={12} height={12} /></CommandShortcut>
      }
    </CommandItem>
  );
}