import Image from "next/image";
import { Button } from "./ui/button";
import { useLogConversion } from "@/stores/LogConversionStore";

export default function DeleteLogButton({ id }: { id: string; }) {
  const deleteLogById = useLogConversion((state) => state.deleteLogById);

  const handleDelete = () => {
    deleteLogById(id);
  };

  return (
    <Button
      variant={'outline'}
      className={'group w-8 h-8 px-1.5 py-2 rounded-md dark:bg-input/0 hover:cursor-pointer'}
      onClick={handleDelete}
    >
      {/* default icon */}
      <Image
        src={'/assets/images/icon-delete.svg'}
        alt="delete icon"
        width={16}
        height={16}
        className="block group-hover:hidden"
      />
      {/* if hover use this bellow */}
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