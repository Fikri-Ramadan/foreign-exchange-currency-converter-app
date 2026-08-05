import ConverterCard from "@/components/ConverterCard";

export default function Home() {
  return (
    <div className="bg-neutral-900 text-neutral-50 flex-1">
      {/* header */}
      <div className="mb-12"></div>
      <div className="">
        {/* main card */}
        <ConverterCard />
      </div>
    </div>
  );
}
