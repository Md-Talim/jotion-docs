"use client";

import Cover from "@/components/Cover";
import Toolbar from "@/components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface Props {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentPage = ({ params }: Props) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    [],
  );

  const update = useMutation(api.documents.update);
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  });

  if (!document) {
    return null;
  }

  const handleChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  return (
    <div className="pb-40 pt-5">
      <Cover url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
        <Editor onChange={handleChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentPage;
