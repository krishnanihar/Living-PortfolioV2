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
  { href: '/work', label: 'Work', key: 'work' },
  { href: '/about', label: 'About', key: 'about' },
  { href: '/contact', label: 'Contact', key: 'contact' },
];

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show navigation after hero animation (1.2s delay exactly like v1)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
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
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1], // Exactly like v1
            delay: 0,
          }}
          className={cn(
            // Bulletproof positioning like v1
            'fixed top-5 left-1/2 z-[10001]',
            'w-[min(92%,800px)] h-14', // v1: 56px but we'll use h-14 (56px)
            'min-w-80',
            'transform -translate-x-1/2',
            // Performance optimizations
            'will-change-transform',
            'backface-hidden',
            'isolate',
            className
          )}
          style={{
            contain: 'layout style paint',
            isolation: 'isolate',
          }}
        >
          <div
            className={cn(
              // Structure
              'relative h-full',
              'flex items-center justify-between',
              'px-8 rounded-full overflow-hidden',
              // Glassmorphism base
              'bg-white/5 border border-white/12',
              'backdrop-blur-xl',
              // Enhanced shadow for depth
              'shadow-2xl shadow-black/20',
              // Transitions
              'transition-all duration-300 ease-out',
              // Light theme
              '[data-theme=light]:bg-white/95 [data-theme=light]:border-black/8',
              '[data-theme=light]:shadow-xl [data-theme=light]:shadow-black/5',
              // Hover effects
              'hover:bg-white/8 hover:border-white/18',
              '[data-theme=light]:hover:bg-white/98 [data-theme=light]:hover:border-black/12',
              'hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
            )}
            style={{
              backdropFilter: 'blur(24px) saturate(150%)',
              WebkitBackdropFilter: 'blur(24px) saturate(150%)',
              boxShadow: `
                0 2px 8px rgba(0, 0, 0, 0.08),
                0 8px 16px rgba(0, 0, 0, 0.12),
                0 16px 32px rgba(0, 0, 0, 0.16),
                0 24px 48px rgba(0, 0, 0, 0.2),
                inset 0 0 0 1px rgba(255, 255, 255, 0.05),
                inset 0 -1px 2px rgba(0, 0, 0, 0.1)
              `,
            }}
          >
            {/* Logo - exactly like v1 */}
            <Link
              href="/"
              className={cn(
                'flex items-center min-h-11 px-1',
                'font-normal text-base tracking-wide', // v1: font-weight 400, 1rem
                'text-white/95 hover:text-white',
                '[data-theme=light]:text-black/85 [data-theme=light]:hover:text-black',
                'transition-all duration-300',
                'hover:scale-105 focus:scale-105',
                'focus-visible:outline-2 focus-visible:outline-white/40 focus-visible:outline-offset-4',
                'rounded-lg'
              )}
            >
              NIHAR
            </Link>

            {/* Navigation Links - exactly like v1 */}
            <div className="flex items-center gap-4">
              {navigationItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.key}
                    href={item.href as any}
                    className={cn(
                      'relative flex items-center min-h-11 px-4 py-2',
                      'rounded-3xl', // v1: 24px border-radius
                      'text-sm font-light', // v1: 0.9rem, font-weight 300
                      'transition-all duration-300',
                      // Default state
                      'text-white/80 hover:text-white/90',
                      '[data-theme=light]:text-black/65 [data-theme=light]:hover:text-black/90',
                      // Hover effects
                      'hover:-translate-y-0.5',
                      'focus-visible:outline-2 focus-visible:outline-white/40 focus-visible:outline-offset-2',
                      // Active state
                      active && [
                        'text-white/95',
                        '[data-theme=light]:text-black/95',
                      ]
                    )}
                  >
                    {item.label}

                    {/* Active indicator - exactly like v1 */}
                    {active && (
                      <motion.div
                        layoutId="nav-active-indicator"
                        className={cn(
                          'absolute -bottom-0.5 left-1/2 -translate-x-1/2',
                          'w-5 h-0.5 rounded-full',
                          'bg-white/80',
                          '[data-theme=light]:bg-black/70'
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Shine effect */}
                    <div
                      className={cn(
                        'absolute inset-0 rounded-3xl opacity-0',
                        'bg-gradient-to-r from-transparent via-white/8 to-transparent',
                        'transition-opacity duration-500',
                        'hover:opacity-100',
                        '[data-theme=light]:via-black/4'
                      )}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                        left: '-100%',
                        animation: 'none',
                      }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Background glow effect - exactly like v1 */}
            <div
              className={cn(
                'absolute -inset-0.5 rounded-[34px] opacity-0',
                'bg-gradient-to-45 from-transparent via-white/5 to-transparent',
                'transition-opacity duration-300',
                'group-hover:opacity-100 hover:opacity-100',
                'pointer-events-none -z-10'
              )}
              aria-hidden="true"
            />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}