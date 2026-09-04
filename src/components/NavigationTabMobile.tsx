'use client';

import { TabValue } from "@/types";
import { ChevronDown, History, ListTodo, Repeat, Star } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Badge from "./Badge";

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
  const [open, setOpen] = useState<boolean>(false);

  const activeTab = TABS_CONFIG.find((t) => t.id === value);
  const count = activeTab?.id === 'favorites' ? favoritesCount : activeTab?.id === 'log' ? logsCount : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button
        variant="outline"
        className="w-full justify-between border-neutral-700 h-14 px-5 rounded-lg text-white hover:bg-neutral-700 active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-widest flex items-center gap-3">
            {activeTab?.label}
            {count !== null && <Badge amount={count} />}
          </span>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-neutral-400 transition-transform", open && "rotate-180")} />
      </Button>} />

      <PopoverContent
        style={{ width: 'var(--anchor-width)' }}
        className="p-2 bg-neutral-600 border-neutral-700 rounded-2xl shadow-2xl"
        align="start"
      >
        <div className="w-full flex flex-col gap-1">
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
                  "bg-neutral-600 flex items-center justify-between px-4 py-4 rounded-xl transition-colors text-left",
                  isActive ? "text-lime-500" : " hover:bg-neutral-600/50"
                )}
              >
                <div className="w-full flex items-center gap-3">
                  <span className="w-full font-medium tracking-wide flex justify-between items-center">
                    {tab.label}
                    {count !== null && <Badge amount={count} />}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
