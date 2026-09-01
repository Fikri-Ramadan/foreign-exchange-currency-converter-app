'use client';

import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { FilterValue } from "@/types";

export default function FilterChartSection() {
  const router = useRouter();
  
  const handleChange = (value: string) => {
    const range = value as FilterValue;
    router.push(`?range=${range}`, { scroll: false });
  };

  return (
    <Tabs defaultValue="1m" className="w-fit" onValueChange={handleChange}>
      <TabsList className="bg-neutral-700 text-neutral-100 md:h-10 border p-0">
        <TabsTriggerComp value="1D" />
        <TabsTriggerComp value="1W" />
        <TabsTriggerComp value="1M" />
        <TabsTriggerComp value="3M" />
        <TabsTriggerComp value="1Y" />
        <TabsTriggerComp value="5Y" />
      </TabsList>
    </Tabs>
  );
}

function TabsTriggerComp({ value }: { value: string; }) {
  return (
    <TabsTrigger
      value={value}
      className="dark:data-active:border-none dark:data-active:bg-neutral-500 text-xs dark:text-foreground/40 px-3.75"
    >
      {value}
    </TabsTrigger>
  );
}
