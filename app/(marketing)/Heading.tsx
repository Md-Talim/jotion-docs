"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4 text-center">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your Notes, Ideas, Docs & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base sm:text-lg md:text-xl">
        Jotion is the workspace where <br />
        better, faster work happens.
      </h3>

      {/* If user is not authenticated and is not loading then show a call to action to the sign-up button */}
      {!isLoading && !isAuthenticated && (
        <SignUpButton mode="modal">
          <Button size="sm">
            Get Jotion free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignUpButton>
      )}

      {/* When the user is authenticated and not loading show a profile button and a link to go to the documents */}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Jotion <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}

      {isLoading && <Spinner size="icon" />}
    </div>
  );
};
export default Heading;
