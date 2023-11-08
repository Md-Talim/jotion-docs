import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Footer = () => (
  <footer className="z-50 flex w-full items-center bg-background p-6">
    <Logo />
    <div className="flex w-full items-center justify-between gap-x-2 text-muted-foreground md:ml-auto md:justify-end">
      <Button variant="ghost" size="sm">
        Privacy Policy
      </Button>
      <Button variant="ghost" size="sm">
        Terms & Coditions
      </Button>
    </div>
  </footer>
);

export default Footer;
