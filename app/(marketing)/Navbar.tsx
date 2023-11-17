"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 flex w-full items-center bg-background p-6",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 text-muted-foreground md:ml-auto md:justify-end">
        {isLoading && <Spinner />}

        {/* When not authenticated and not loading show log in sign-up buttons */}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal" afterSignInUrl="/documents">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Get Jotion free</Button>
            </SignUpButton>
          </>
        )}

        {/* When authenticated and not loading show a profile button and a link to go to the documents */}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
