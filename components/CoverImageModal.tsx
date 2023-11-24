import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useCoverImage from "@/hooks/useCoverImage";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

const CoverImageModal = () => {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const update = useMutation(api.documents.update);

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = async (newFile?: File) => {
    if (newFile) {
      setIsSubmitting(true);
      setFile(newFile);

      const res = await edgestore.publicFiles.upload({
        file: newFile,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      coverImage.handleClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.handleClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={handleChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
