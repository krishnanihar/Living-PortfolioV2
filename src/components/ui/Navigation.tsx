'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/work', label: 'Work', key: 'work' },
  { href: '/about', label: 'About', key: 'about' },
  { href: '/contact', label: 'Contact', key: 'contact' },
];

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Show navigation after hero animation (1.2s delay like v1)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1], // Premium easing
              type: "spring",
              stiffness: 100,
              damping: 20,
            }
          }}
          className={cn(
            'fixed top-5 left-1/2 -translate-x-1/2 z-50',
            'w-[min(92%,800px)] h-14',
            className
          )}
        >
          <div
            className={cn(
              // Base structure
              'relative h-full',
              'flex items-center justify-between',
              'px-8 rounded-full',
              // Glass effect
              'bg-white/5 backdrop-blur-lg',
              'border border-white/12',
              '[data-theme="light"] &:bg-white/85 [data-theme="light"] &:border-black/8',
              // Shadow and depth
              'shadow-lg shadow-black/10',
              '[data-theme="light"] &:shadow-lg [data-theme="light"] &:shadow-black/5',
              // Transitions
              'transition-all duration-300 ease-premium',
              // Scrolled state
              scrolled && [
                'bg-white/8 border-white/16',
                '[data-theme="light"] &:bg-white/90 [data-theme="light"] &:border-black/12',
                'shadow-xl shadow-black/20',
                '[data-theme="light"] &:shadow-xl [data-theme="light"] &:shadow-black/10',
              ]
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                'font-normal text-lg tracking-wide',
                'text-white/95 hover:text-white',
                '[data-theme="light"] &:text-black/85 [data-theme="light"] &:hover:text-black',
                'transition-all duration-200',
                'hover:scale-105 focus:scale-105',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                'rounded-lg px-2 py-1'
              )}
            >
              NIHAR
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navigationItems.slice(1).map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.key}
                    href={item.href as any}
                    className={cn(
                      'relative px-4 py-2 rounded-full',
                      'text-sm font-light transition-all duration-200',
                      'hover:scale-105 focus:scale-105',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                      // Default state
                      'text-white/70 hover:text-white/90',
                      '[data-theme="light"] &:text-black/65 [data-theme="light"] &:hover:text-black/90',
                      // Active state
                      active && [
                        'text-white/95',
                        '[data-theme="light"] &:text-black/95',
                      ]
                    )}
                  >
                    {item.label}

                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId="navigation-active"
                        className={cn(
                          'absolute -bottom-0.5 left-1/2 -translate-x-1/2',
                          'w-5 h-0.5 rounded-full',
                          'bg-white/80',
                          '[data-theme="light"] &:bg-black/70'
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Background glow effect */}
            <div
              className={cn(
                'absolute inset-0 rounded-full opacity-0',
                'bg-gradient-to-r from-transparent via-white/5 to-transparent',
                'transition-opacity duration-300',
                'group-hover:opacity-100 hover:opacity-100'
              )}
              aria-hidden="true"
            />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}