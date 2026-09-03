'use client';

import { TabValue } from "@/types";
import { Check, ChevronDown, History, ListTodo, Repeat, Star } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NavigationTabMobileProps {
  value: TabValue | null;
  onValueChange: (value: string | null) => void;
  logsCount: number;
  favoritesCount: number;
}

const TABS_CONFIG = [
  { id: "history", label: "HISTORY", icon: History },
  { id: "compare", label: "COMPARE", icon: Repeat },
  { id: "favorites", label: "FAVORITES", icon: Star },
  { id: "log", label: "LOG", icon: ListTodo },
];

export default function NavigationTabMobile({
  value,
  onValueChange,
  logsCount,
  favoritesCount
}: NavigationTabMobileProps) {
  const [open, setOpen] = useState(false);

  const activeTab = TABS_CONFIG.find((t) => t.id === value);
  const count = activeTab?.id === 'favorites' ? favoritesCount : activeTab?.id === 'log' ? logsCount : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button
        variant="outline"
        className="w-full justify-between bg-neutral-800 border-neutral-700 h-14 px-5 rounded-2xl text-white hover:bg-neutral-700 active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3">
          {/* {activeTab?.icon && <activeTab.icon className="w-5 h-5 text-lime-500" />} */}
          <span className="font-bold tracking-widest">{activeTab?.label}</span>
          {count !== null && <span className="ml-2 opacity-50 text-xs">({count})</span>}
        </div>
        <ChevronDown className={cn("w-5 h-5 text-neutral-400 transition-transform", open && "rotate-180")} />
      </Button>} />


      <PopoverContent
        className="w-[370px] p-2 bg-neutral-800 border-neutral-700 rounded-2xl shadow-2xl"
        align="start"
      >
        <div className="flex flex-col gap-1">
          {TABS_CONFIG.map((tab) => {
            const isActive = value === tab.id;
            const count = tab.id === 'favorites' ? favoritesCount : tab.id === 'log' ? logsCount : null;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  onValueChange(tab.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between px-4 py-4 rounded-xl transition-colors text-left",
                  isActive ? "bg-lime-500/10 text-lime-500" : "text-neutral-400 hover:bg-neutral-700/50"
                )}
              >
                <div className="flex items-center gap-3">
                  {/* <tab.icon className={cn("w-5 h-5", isActive ? "text-lime-500" : "text-neutral-500")} /> */}
                  <span className="font-medium tracking-wide">
                    {tab.label}
                    {count !== null && <span className="ml-2 opacity-50 text-xs">({count})</span>}
                  </span>
                </div>
                {isActive && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
