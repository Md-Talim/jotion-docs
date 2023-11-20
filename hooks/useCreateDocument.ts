import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateDocument = (parentDocumentId?: Id<"documents">) => {
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const handleCreate = () => {
    const promise = create({
      title: "Untitled",
      parentDocument: parentDocumentId,
    }).then((documentId) => {
      router.push(`/documents/${documentId}`);
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
