import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const useCreateDocument = (parentDocumentId?: Id<"documents">) => {
  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = create({
      title: "Untitled",
      parentDocument: parentDocumentId,
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return handleCreate;
};

export default useCreateDocument;
