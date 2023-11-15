"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

const TrashBox = () => {
  const router = useRouter();
  const archivedDocuments = useQuery(api.documents.getArchieved);

  const handleClick = (documentId: Id<"documents">) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <div>
      <div className="mt-2 px-1 pb-1">
        {archivedDocuments?.map((document) => (
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
