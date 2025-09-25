'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { href: '/work' as const, label: 'Work' },
  { href: '/about' as const, label: 'About' },
  { href: '/contact' as const, label: 'Contact' },
];

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50',
        'w-full max-w-7xl mx-auto px-6',
        className
      )}
    >
      <div className="flex items-center justify-between h-14 px-6 rounded-2xl border backdrop-blur-xl bg-white/3 border-white/10">
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-semibold tracking-wide text-white/92 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
        >
          NIHAR
        </Link>

        {/* Center Navigation Links */}
        <div className="flex items-center gap-8">
          {navigationItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm',
                  'hover:-translate-y-[1px]',
                  active
                    ? 'text-white/92'
                    : 'text-white/65 hover:text-white/92'
                )}
              >
                {item.label}
                {active && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white/80 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/65 hover:text-white/92 hover:bg-white/10 hover:border-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          <Moon size={16} />
        </button>
      </div>
    </nav>
  );
}