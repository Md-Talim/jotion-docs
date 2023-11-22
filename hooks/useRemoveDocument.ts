import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const useRemoveDocument = () => {
  const remove = useMutation(api.documents.remove);

  const handleRemove = (documentId: Id<"documents">) => {
    const promise = remove({ documentId });

    toast.promise(promise, {
      loading: "Removing document from the database...",
      success: "Completely removed from the database!",
      error: "Error removing document!",
    });
  };

  return handleRemove;
};

export default useRemoveDocument;
