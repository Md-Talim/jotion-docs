"use client";

import Toolbar from "@/components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface Props {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentPage = ({ params }: Props) => {
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  });

  if (!document) {
    return null;
  }

  return (
    <div className="pt-40">
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentPage;
