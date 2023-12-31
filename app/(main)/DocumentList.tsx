"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./Item";

interface Props {
  data?: Doc<"documents">[];
  level?: number;
  parentDocumentId?: Id<"documents">;
}

const DocumentList = ({ parentDocumentId, level = 0 }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const documents = useQuery(api.documents.getDocuments, {
    parentDocument: parentDocumentId,
  });

  const handleRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const handleExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  const padding = level * 12 + 25;

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${padding}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
        )}
      >
        No pages inside
      </p>

      {documents?.map((document) => (
        <div key={`${document._id}-${document._creationTime}`}>
          <Item
            id={document._id}
            active={params.documentId === document._id}
            documentIcon={document.icon}
            expanded={expanded[document._id]}
            icon={FileIcon}
            label={document.title}
            level={level}
            onClick={() => handleRedirect(document._id)}
            onExpand={() => handleExpand(document._id)}
          />

          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
