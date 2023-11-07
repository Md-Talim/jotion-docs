import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Logo = () => (
  <div className="hidden md:flex items-center gap-x-2">
    <Image src="/logo.svg" alt="Jotion Logo" width={40} height={40} />
    <p className={cn('font-semibold', font.className)}>Jotion</p>
  </div>
);

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
