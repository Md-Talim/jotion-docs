import { api } from "@/convex/_generated/api";
import useSearch from "@/hooks/useSearch";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

const SearchCommand = () => {
  const { user } = useUser();
  const search = useSearch();
  const [isMounted, setIsMounted] = useState(false);
  const allDocuments = useQuery(api.documents.getAllDocuments);

  const isOpen = search.isOpen;
  const handleClose = search.handleClose;
  const toggle = search.toggle;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={handleClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Jotion...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {allDocuments?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
            >
              {document?.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
