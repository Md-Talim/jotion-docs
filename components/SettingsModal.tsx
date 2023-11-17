"use client";

import ThemeToggle from "@/components/ThemeToggle";
import useSettings from "@/hooks/useSettings";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";

const SettingsModal = () => {
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
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
