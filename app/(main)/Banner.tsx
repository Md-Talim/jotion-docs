import ConfirmModal from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useRestoreDocument from "@/hooks/useRestoreDocument";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Banner = ({ documentId }: { documentId: Id<"documents"> }) => {
  const router = useRouter();

  const handleRestore = useRestoreDocument();
  const remove = useMutation(api.documents.remove);

  const handleRemove = () => {
    const promise = remove({ documentId: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>This page is in the Trash.</p>

      <Button
        variant="outline"
        size="sm"
        onClick={(e) => handleRestore(e, documentId)}
        className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={handleRemove}>
        <Button
          variant="outline"
          size="sm"
          className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
