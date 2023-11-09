import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Logo = () => (
  <div className="hidden items-center gap-x-2 md:flex">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet="/logo-dark.svg" />
      <Image src="/logo.svg" alt="Jotion Logo" width={40} height={40} />
    </picture>
    <p className={cn("font-semibold", font.className)}>Jotion</p>
  </div>
);

export default Logo;
