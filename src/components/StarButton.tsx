import Image from "next/image";
import { Button } from "./ui/button";

export default function StarButton() {
  return (
    <Button
      variant={'outline'}
      className={'w-8 h-8 px-1.5 py-2 rounded-md dark:border dark:border-lime-500 dark:bg-input/0 hover:cursor-pointer'}
    >
      <Image
        src={'/assets/images/icon-star-filled.svg'}
        alt="star filled icon"
        width={16}
        height={16}
      />
    </Button>
  );
}