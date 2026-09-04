import ConverterCard from "@/components/ConverterCard";
import Header from "@/components/Header";
import NavigationTabs from "@/components/NavigationTabs";
import NavigationTabSkeleton from "@/components/NavigationTabSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-neutral-900 text-neutral-50 flex-1">
      <div className="mb-10">
        <Header />
      </div>
      <div className="px-3 space-y-10">
        <ConverterCard />
        <Suspense fallback={<NavigationTabSkeleton />}>
          <NavigationTabs />
        </Suspense>
      </div>
    </div>
  );
}
