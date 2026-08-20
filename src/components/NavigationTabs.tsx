'use client';

import { TabValue } from "@/types";
import TabLog from "./TabLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import Badge from "./Badge";

export default function NavigationTabs() {
  const params = useSearchParams();
  const router = useRouter();
  const currentTab = (params.get('tab') as TabValue) ?? 'history';
  const handleChange = (value: string) => {
    const tab = value as TabValue;
    router.push(`?tab=${tab}`, {scroll: false})
  };

  return (
    <div className="max-w-259 mx-auto">
      <div className="h-40 rounded-3xl">
        <Tabs value={currentTab}
          onValueChange={handleChange}>
          <TabsList variant={'line'} className={'mb-2'}>
            <TabsTrigger value="history">HISTORY</TabsTrigger>
            <TabsTrigger value="compare">COMPARE</TabsTrigger>
            <TabsTrigger value="favorites">FAVORITES</TabsTrigger>
            <TabsTrigger value="log">LOG <Badge amount={8} /></TabsTrigger>
          </TabsList>
          <TabsContent value="history">History</TabsContent>
          <TabsContent value="compare">Compare</TabsContent>
          <TabsContent value="favorites">Favorites</TabsContent>
          <TabsContent value="log"><TabLog totalLog={8} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}