import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { MenuIcon, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Banner from "./Banner";
import Title from "./Title";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const { user } = useUser();
  const params = useParams();
  const router = useRouter();
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId as Id<"documents">,
  });

  const archive = useMutation(api.documents.archive);

  if (document === undefined) {
    return <p>Loading...</p>;
  }

  if (document === null) {
    return null;
  }

  const handleArchive = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    if (!document._id) return;

    const promise = archive({ id: document._id });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Error while archiving note.",
    });

    router.push("/documents");
  };

  return (
    <>
      {document.isArchived && <Banner documentId={document._id} />}
      <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-[#1f1f1f]">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}

        <div className="items center flex w-full justify-between">
          <Title initialData={document} />

          <div className="flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
              >
                <DropdownMenuItem onClick={handleArchive}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="p-2 text-xs text-muted-foreground">
                  Last edited by: {user?.fullName}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
