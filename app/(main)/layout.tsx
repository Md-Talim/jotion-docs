"use client";

import SearchCommand from "@/components/SearchCommand";
import SettingsModal from "@/components/SettingsModal";
import Spinner from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./Navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="flex h-screen dark:bg-[#1F1F1F]">
      <Navigation />
      <SearchCommand />
      <SettingsModal />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
