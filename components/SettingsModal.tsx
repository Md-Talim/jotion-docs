"use client";

import ThemeToggle from "@/components/ThemeToggle";
import useSettings from "@/hooks/useSettings";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import ConfirmModal from "./ConfirmModal";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const SettingsModal = () => {
  const removeAllDocs = useMutation(api.documents.removeAllDocuments);
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.handleClose}>
      <DialogContent>
        <DialogTitle>
          <h1 className="border-b pb-3 text-xl font-medium">Settings</h1>
        </DialogTitle>
        <DialogHeader>
          <h2 className="text-lg font-medium">My preferences</h2>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Apperance</Label>

            <span className="text-[0.8rem] text-muted-foreground">
              Customise how Jotino looks on your device
            </span>
          </div>

          <ThemeToggle />
        </div>

        <section className="mt-4 rounded-sm border bg-red-50 p-2 dark:bg-transparent">
          <DialogHeader className="mb-3">
            <h2 className="text-lg font-medium">Danger Zone</h2>
          </DialogHeader>

          <div className="flex flex-col gap-y-1">
            <Label>Delete All Documents</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              It will delete all your data including archived documents.
            </span>
            <ConfirmModal onConfirm={() => removeAllDocs()}>
              <Button className="mt-2" variant="destructive">
                Delete All Docs
              </Button>
            </ConfirmModal>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
