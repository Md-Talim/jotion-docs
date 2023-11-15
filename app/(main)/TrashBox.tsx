"use client";

import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TrashBox = () => {
  const router = useRouter();
  const archivedDocuments = useQuery(api.documents.getArchieved);
  const [search, setSearch] = useState("");

  const handleClick = (documentId: Id<"documents">) => {
    router.push(`/documents/${documentId}`);
  };

  const filteredDocuments = archivedDocuments?.filter((document) =>
    document.title.toLocaleLowerCase().includes(search),
  );

  // if there are no documents show a spinner
  if (archivedDocuments === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Search box */}
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by page title"
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
        />
      </div>

      {/* Archived documents */}
      <div className="mt-2 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No documents found.
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => handleClick(document._id)}
            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
          >
            <span className="truncate pl-2">{document.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
