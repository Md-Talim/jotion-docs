"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import useCreateDocument from "@/hooks/useCreateDocument";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import DocumentList from "./DocumentList";
import Item from "./Item";
import UserItem from "./UserItem";
import { Id } from "@/convex/_generated/dataModel";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      const width = `${newWidth}px`;

      sidebarRef.current.style.width = width;
      navbarRef.current.style.setProperty("left", width);
      navbarRef.current.style.setProperty("width", `calc(100% - ${width})`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      const width = "240px";

      sidebarRef.current.style.width = isMobile ? "100%" : width;
      navbarRef.current.style.setProperty("left", isMobile ? "0" : width);
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "100%" : `calc(100% - ${width})`,
      );

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }

    console.log({ isMobile });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleCreate = useCreateDocument();

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar relative z-[9999] flex w-60 flex-col overflow-y-auto bg-secondary",
          isResetting && "resetting",
          isMobile && "w-0",
        )}
      >
        <button
          onClick={collapse}
          className={cn(
            "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition-opacity hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
            isMobile && "opacity-100",
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </button>

        <div>
          <UserItem />
          <Item icon={Settings} label="Settings" onClick={() => {}} />
          <Item isSearch icon={Search} label="Search" onClick={() => {}} />
          <Item icon={PlusCircle} label="New Page" onClick={handleCreate} />
        </div>

        <div className="mt-4">
          {/* All documents */}
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Add a page" />

          {/* Archived documents */}
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-0"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        {/* Resize */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute left-60 top-0 z-[9999] w-[calc(100%-240px)]",
          isResetting && "resetting",
          isMobile && "left-0 w-full",
        )}
      >
        <nav className="bg-transparet w-full px-3 py-2">
          {isCollapsed && (
            <MenuIcon
              role="button"
              onClick={resetWidth}
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};

const TrashBox = () => {
  const router = useRouter();
  const archivedDocuments = useQuery(api.documents.getArchieved);

  const handleClick = (documentId: Id<"documents">) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <div>
      <div className="mt-2 px-1 pb-1">
        {archivedDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => handleClick(document._id)}
            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
          >
            <span className="truncate pl-2">{document.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
