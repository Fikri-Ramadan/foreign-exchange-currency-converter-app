import { useLogConversion } from "@/stores/LogConversionStore";
import { Button } from "./ui/button";

export default function ClearLogButton() {
  const clearLog = useLogConversion((state) => state.clearLog);

  const handleClearLog = () => {
    clearLog();
  };

  return (
    <Button
      variant={'outline'}
      className={'text-neutral-100/50 text-xs rounded-md h-7 py-3.25 border border-neutral-500 hover:text-neutral-100/60'}
      onClick={handleClearLog}
    >
      CLEAR ALL
    </Button>
  );
}