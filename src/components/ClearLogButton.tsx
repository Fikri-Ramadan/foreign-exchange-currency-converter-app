import { useLogConversion } from "@/stores/LogConversionStore";
import { Button } from "./ui/button";
import React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "./ui/toast";

export default function ClearLogButton() {
  const clearLog = useLogConversion((state) => state.clearLog);

  const handleClearLog = () => {
    clearLog();
    toast.add({
      type: "success",
      description: "Conversion has been cleared from Logs",
    });
  };

  return (
    <Dialog>
      <DialogTrigger render={<ClearButton />} />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Clear Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to clear this conversion logs? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            variant={'destructive'}
            onClick={handleClearLog}
          >Clear</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ClearButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        variant={'outline'}
        className={'text-neutral-100/50 text-xs rounded-md h-7 py-3.25 border border-neutral-500 hover:text-neutral-100/60'}
      >
        CLEAR ALL
      </Button>
    );
  }
);