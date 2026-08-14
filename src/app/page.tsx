import ConverterCard from "@/components/ConverterCard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-neutral-900 text-neutral-50 flex-1">
      {/* header */}
      <Header />
      <div className="mb-12"></div>
      <div className="px-5">
        {/* main card */}
        <ConverterCard />
      </div>
    </div>
  );
}
