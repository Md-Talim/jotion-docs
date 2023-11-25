"use client";

import IconPicker from "@/components/IconPicker";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useCoverImage from "@/hooks/useCoverImage";
import { useMutation } from "convex/react";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: Props) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    update({
      id: initialData._id,
      title: newValue,
    });
  };

  const handleIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  return (
    <div className="group relative pl-[56px]">
      {!!initialData.icon && !preview && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={handleIconSelect}>
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={() => removeIcon({ documentId: initialData._id })}
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
        {!initialData.coverImage && !preview && (
          <Button
            className="text-x s text-muted-foreground"
            onClick={coverImage.handleOpen}
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add cover
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
