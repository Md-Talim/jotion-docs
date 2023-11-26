"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => (
  <main className="flex h-screen flex-col items-center justify-center space-y-4">
    <Image
      src="/error.png"
      alt="error"
      width={300}
      height={300}
      className="dark:hidden"
    />
    <Image
      src="/error-dark.png"
      alt="error"
      width={300}
      height={300}
      className="hidden dark:block"
    />

    <h2>The page you&apos;re looking for doesn&apos;t exists.</h2>
    <Button asChild>
      <Link href="/documents">Go back</Link>
    </Button>
  </main>
);

export default ErrorPage;
