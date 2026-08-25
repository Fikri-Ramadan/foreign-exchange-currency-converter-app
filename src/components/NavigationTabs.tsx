'use client';

import { TabValue } from "@/types";
import TabLog from "./TabLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import Badge from "./Badge";
import { useLogConversion } from "@/stores/LogConversionStore";
import TabFavorites from "./TabFavorites";
import { useUserFavorites } from "@/stores/UserFavoritesStore";

export default function NavigationTabs() {
  const logs = useLogConversion((state) => state.logs);
  const favorites = useUserFavorites((state) => state.favorites);

  const params = useSearchParams();
  const router = useRouter();
  const currentTab = (params.get('tab') as TabValue) ?? 'history';
  const handleChange = (value: string) => {
    const tab = value as TabValue;
    router.push(`?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="max-w-259 mx-auto">
      <div className="h-40 rounded-3xl">
        <Tabs value={currentTab}
          onValueChange={handleChange}>
          <TabsList variant={'line'} className={'mb-2'}>
            <TabsTrigger value="history">HISTORY</TabsTrigger>
            <TabsTrigger value="compare">COMPARE</TabsTrigger>
            <TabsTrigger value="favorites">FAVORITES <Badge amount={favorites.length} /></TabsTrigger>
            <TabsTrigger value="log">LOG <Badge amount={logs.length} /></TabsTrigger>
          </TabsList>
          <TabsContent value="history" className={'mb-20'}>History</TabsContent>
          <TabsContent value="compare" className={'mb-20'}>Compare</TabsContent>
          <TabsContent value="favorites" className={'mb-20'}><TabFavorites /></TabsContent>
          <TabsContent value="log" className={'mb-20'}><TabLog /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}