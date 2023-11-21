import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const useRestoreDocument = () => {
  const restore = useMutation(api.documents.restore);

  const handleRestore = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
    documentId: Id<"documents">,
  ) => {
    event.stopPropagation();
    const promise = restore({ documentId });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Added to the document list!",
      error: "Error restoring document!",
    });
  };

  return handleRestore;
};

export default useRestoreDocument;
