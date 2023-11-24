import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: Props) => {
  return (
    <div
      className={cn(
        "group relative h-[35vh] w-full",
        !url && "h-[12vh]",
        url && "bg-muted",
      )}
    >
      {!!url && (
        <Image src={url} fill alt="Cover image" className="object-cover" />
      )}
    </div>
  );
};

export default Cover;
