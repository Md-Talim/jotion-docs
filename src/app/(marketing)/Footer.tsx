import { Button } from '@/components/ui/button';
import Logo from './Logo';

const Footer = () => (
  <footer className="flex items-center w-full p-6 bg-background z-50">
    <Logo />
    <div className="flex items-center justify-between md:justify-end gap-x-2 text-muted-foreground w-full md:ml-auto">
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
