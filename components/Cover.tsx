import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useCoverImage from "@/hooks/useCoverImage";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";

interface Props {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: Props) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const removeCover = useMutation(api.documents.removeCover);
  const coverImage = useCoverImage();

  const handleRemoveCover = async () => {
    removeCover({
      documentId: params.documentId as Id<"documents">,
    });

    if (url) {
      await edgestore.publicFiles.delete({ url });
    }
  };

  return (
    <div
      className={cn(
        "group relative h-[35vh] w-full",
        !url && "h-[12vh]",
        url && "bg-muted",
      )}
    >
      {!!url && (
        <Image src={url} fill alt="Cover image" className="object-cover" />
      )}

      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            onClick={() => coverImage.handleReplace(url)}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change cover
          </Button>
          <Button
            onClick={handleRemoveCover}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Remove cover
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
