'use client';

import useScrollTop from '@/hooks/useScrollTop';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        'z-50 bg-background fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm',
      )}
    >
      <Logo />
      <div className="flex items-center justify-between md:justify-end gap-x-2 text-muted-foreground w-full md:ml-auto">
        Login
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
