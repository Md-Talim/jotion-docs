"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const WelcomeHeadingWithCTA = () => {
  const { user } = useUser();
  const usersFullName = user?.fullName;
  const create = useMutation(api.documents.create);

  const handleCreateDocument = () => {
    const promise = create({ title: "Unititled" });

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <>
      <h2>Welcome to {usersFullName}&apos;s Jotion.</h2>
      <Button onClick={handleCreateDocument}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </>
  );
};

export default WelcomeHeadingWithCTA;
