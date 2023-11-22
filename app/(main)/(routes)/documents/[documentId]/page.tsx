"use client";

import IconPicker from "@/components/IconPicker";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Smile, X } from "lucide-react";

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

const Toolbar = ({
  initialData,
  preview,
}: {
  initialData: Doc<"documents">;
  preview?: boolean;
}) => {
  const update = useMutation(api.documents.update);

  const handleIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  return (
    <div className="group relative pl-[54px]">
      {!!initialData.icon && !preview && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={handleIconSelect}>
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={() => {}}
            variant="outline"
            size="icon"
            className="rounded-full text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!!initialData.icon && preview && (
        <p className="pt-6 text-6xl">{initialData.icon}</p>
      )}

      <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={handleIconSelect}>
            <Button
              className="text-xs text-muted-foreground"
              variant="outline"
              size="sm"
            >
              <Smile className="mr-2 h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        )}
      </div>
    </div>
  );
};

export default DocumentPage;
