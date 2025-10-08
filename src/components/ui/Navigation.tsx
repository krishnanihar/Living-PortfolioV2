'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion';
import { Moon, Sun, Palette, Home, User, Mail, Briefcase, Compass, Beaker } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/effects/ThemeProvider';
import { useMagneticEffect } from '@/lib/micro-interactions';

export interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { href: '/' as const, label: 'Home', icon: Home },
  { href: '/work' as const, label: 'Work', icon: Briefcase },
  { href: '/labs' as const, label: 'Labs', icon: Beaker },
  { href: '/journey' as const, label: 'Journey', icon: Compass },
  { href: '/about' as const, label: 'About', icon: User },
  { href: '/contact' as const, label: 'Contact', icon: Mail },
];

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  isCompact: boolean;
  index: number;
}

function NavItem({ href, label, icon: Icon, isActive, isCompact, index }: NavItemProps) {
  const itemRef = useRef<HTMLAnchorElement>(null);

  // Apply magnetic effect
  useMagneticEffect(itemRef, {
    strength: 0.2,
    radius: 80,
    scale: isActive ? 1.02 : 1.05,
    glow: isActive,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <Link
        ref={itemRef}
        href={href as any}
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-full font-medium transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          'transform-gpu will-change-transform',
          isCompact ? 'w-12 h-12 justify-center px-0' : 'px-4',
          isActive
            ? 'text-[var(--text-primary)] bg-[var(--surface-active)] shadow-lg shadow-[var(--brand-red)]/10 border border-[var(--border-secondary)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:shadow-md hover:shadow-black/5 border border-transparent hover:border-[var(--border-primary)]'
        )}
        style={{
          backdropFilter: isActive ? 'blur(16px) saturate(180%)' : 'blur(12px)',
          WebkitBackdropFilter: isActive ? 'blur(16px) saturate(180%)' : 'blur(12px)',
        }}
      >
        {React.createElement(Icon, {
          size: isCompact ? 16 : 15,
          className: cn(
            'transition-all duration-300',
            isActive ? 'drop-shadow-sm' : ''
          )
        })}
        {!isCompact && (
          <span className={cn(
            'text-sm font-medium tracking-wide transition-all duration-300',
            isActive ? 'font-semibold' : ''
          )}>
            {label}
          </span>
        )}
      </Link>
    </motion.div>
  );
}

interface ThemeToggleProps {
  isCompact: boolean;
}

function ThemeToggle({ isCompact }: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Apply magnetic effect
  useMagneticEffect(buttonRef, {
    strength: 0.3,
    radius: 60,
    scale: 1.1,
    glow: true,
  });

  const getThemeIcon = () => {
    if (theme === 'system') return Palette;
    return resolvedTheme === 'dark' ? Moon : Sun;
  };

  const ThemeIcon = getThemeIcon();

  return (
    <button
      ref={buttonRef}
      className={cn(
        'flex items-center justify-center rounded-full border transition-all duration-300 transform-gpu will-change-transform',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        'bg-[var(--surface-primary)] hover:bg-[var(--surface-hover)] border-[var(--border-primary)] hover:border-[var(--border-hover)]',
        'hover:shadow-lg hover:shadow-[var(--brand-red)]/5',
        isCompact ? 'w-11 h-11' : 'w-12 h-12'
      )}
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      }}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
    >
      <ThemeIcon
        size={isCompact ? 15 : 17}
        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300"
      />
    </button>
  );
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smooth spring values for transforms
  const navY = useMotionValue(0);
  const navScale = useMotionValue(1);
  const navBlur = useMotionValue(24);
  const navOpacity = useMotionValue(1);

  const springY = useSpring(navY, { stiffness: 400, damping: 40 });
  const springScale = useSpring(navScale, { stiffness: 300, damping: 30 });
  const springBlur = useSpring(navBlur, { stiffness: 200, damping: 25 });
  const springOpacity = useSpring(navOpacity, { stiffness: 400, damping: 40 });

  // Enhanced scroll behavior
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (current) => {
      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const difference = current - lastScrollY;
      const scrollingDown = difference > 0;
      const scrollingUp = difference < 0;

      // Enhanced hide/show logic
      if (scrollingDown && current > 100) {
        setIsVisible(false);
        navY.set(-120);
        navOpacity.set(0);
      } else if (scrollingUp || current < 50) {
        setIsVisible(true);
        navY.set(0);
        navOpacity.set(1);
      }

      // Sophisticated compact mode
      if (current > 150 && !isCompact) {
        setIsCompact(true);
        navScale.set(0.95);
        navBlur.set(32);
      } else if (current <= 150 && isCompact) {
        setIsCompact(false);
        navScale.set(1);
        navBlur.set(24);
      }

      setLastScrollY(current);
    });

    return unsubscribe;
  }, [scrollY, lastScrollY, isCompact, navY, navOpacity, navScale, navBlur]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      ref={navRef}
      style={{
        y: springY,
        scale: springScale,
        opacity: springOpacity,
        backdropFilter: `blur(${springBlur}px)`,
        WebkitBackdropFilter: `blur(${springBlur}px)`,
      }}
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-[100]',
        'will-change-transform',
        className
      )}
      initial={{ opacity: 0, y: -60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3,
      }}
    >
      <motion.div
        layout
        className={cn(
          'flex items-center glass-nav transform-gpu rounded-full',
          'shadow-2xl shadow-black/20 border-[var(--border-primary)]',
          isCompact ? 'gap-3 px-4 py-3' : 'gap-8 px-8 py-4'
        )}
        style={{
          background: 'var(--surface-primary)',
          backdropFilter: 'blur(var(--blur-xl)) saturate(180%)',
          WebkitBackdropFilter: 'blur(var(--blur-xl)) saturate(180%)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--border-primary)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 1px 0 rgba(255, 255, 255, 0.1) inset,
            0 -1px 0 rgba(255, 255, 255, 0.05) inset
          `,
        }}
      >
        {/* Logo - hidden in compact mode */}
        {!isCompact && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mr-4"
          >
            <Link
              href="/"
              className="text-lg font-light tracking-wider text-[var(--text-primary)] hover:text-[var(--brand-red)] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm px-2 py-1"
            >
              NIHAR
            </Link>
          </motion.div>
        )}

        {/* Navigation Items */}
        <motion.div
          layout
          className={cn(
            'flex items-center',
            isCompact ? 'gap-3' : 'gap-6'
          )}
        >
          {navigationItems.map((item, index) => (
            <NavItem
              key={item.href}
              {...item}
              isActive={isActive(item.href)}
              isCompact={isCompact}
              index={index}
            />
          ))}
        </motion.div>

        {/* Theme Toggle */}
        <motion.div layout className="ml-4">
          <ThemeToggle isCompact={isCompact} />
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}