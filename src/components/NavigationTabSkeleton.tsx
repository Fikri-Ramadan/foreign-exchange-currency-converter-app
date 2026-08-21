import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function NavigationTabSkeleton() {
  return (
    <div className="max-w-259 mx-auto">
      <div className="h-40 rounded-3xl">
        <Tabs defaultValue={'history'}>
          <TabsList variant={'line'} className={'mb-2'}>
            <TabsTrigger value="history">HISTORY</TabsTrigger>
            <TabsTrigger value="compare">COMPARE</TabsTrigger>
            <TabsTrigger value="favorites">FAVORITES</TabsTrigger>
            <TabsTrigger value="log">LOG</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}