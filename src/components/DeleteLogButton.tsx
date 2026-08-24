import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useLogConversion } from "@/stores/LogConversionStore";
import React from "react";
import { toast } from "./ui/toast";

export default function DeleteLogButton({ id }: { id: string; }) {
  const deleteLogById = useLogConversion((state) => state.deleteLogById);

  const handleDelete = () => {
    deleteLogById(id);
    toast.add({
      type: "success",
      description: "Conversion has been deleted from Log",
    });
  };

  return (
    <Dialog>
      <DialogTrigger render={<DeleteButton />} />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this conversion log? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            variant={'destructive'}
            onClick={handleDelete}
          >Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const DeleteButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        variant={'outline'}
        className={'group w-8 h-8 px-1.5 py-2 rounded-md dark:bg-input/0 hover:cursor-pointer'}
      >
        <Image
          src={'/assets/images/icon-delete.svg'}
          alt="delete icon"
          width={16}
          height={16}
          className="block group-hover:hidden"
        />
        <Image
          src={'/assets/images/icon-delete-filled.svg'}
          alt="delete icon"
          width={16}
          height={16}
          className="hidden group-hover:block"
        />
      </Button>
    );
  }
);
