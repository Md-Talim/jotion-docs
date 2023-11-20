import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import Item from "./Item";
import TrashBox from "./TrashBox";

const ArchivedDocuments = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Popover>
      <PopoverTrigger className="mt-4 w-full">
        <Item label="Trash" icon={Trash} />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" side={isMobile ? "bottom" : "right"}>
        <TrashBox />
      </PopoverContent>
    </Popover>
  );
};

export default ArchivedDocuments;
