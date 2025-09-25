'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useScroll, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Palette, Home, User, Mail, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/effects/ThemeProvider';
import { prefersReducedMotion } from '@/lib/utils';

export interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { href: '/' as const, label: 'Home', icon: Home },
  { href: '/work' as const, label: 'Work', icon: Briefcase },
  { href: '/about' as const, label: 'About', icon: User },
  { href: '/contact' as const, label: 'Contact', icon: Mail },
];

interface NavItemProps {
  href: string | { pathname: string; query?: any };
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  isCompact: boolean;
  index: number;
}

function NavItem({ href, label, icon: Icon, isActive, isCompact, index }: NavItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
      }}
      className="relative"
    >
      <Link
        href={href as any}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full font-light transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DA0E29]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
          isCompact ? 'w-10 h-10 justify-center px-0' : 'px-4',
          isActive
            ? 'text-white/95 bg-[#DA0E29]/10'
            : 'text-white/60 hover:text-white/90 hover:bg-white/04'
        )}
      >
        {/* Icon */}
        <Icon size={isCompact ? 16 : 14} />

        {/* Label (hidden in compact mode) */}
        {!isCompact && (
          <span className="text-sm font-light tracking-wide">
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

  const getThemeIcon = () => {
    if (theme === 'system') return Palette;
    return resolvedTheme === 'dark' ? Moon : Sun;
  };

  const ThemeIcon = getThemeIcon();

  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-full bg-white/04 hover:bg-white/08 border border-white/08 hover:border-white/16',
        'transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DA0E29]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
        isCompact ? 'w-9 h-9' : 'w-10 h-10'
      )}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
    >
      <ThemeIcon size={isCompact ? 14 : 16} className="text-white/60 group-hover:text-white/90 transition-colors" />
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

  // Transform values based on scroll
  const navY = useMotionValue(0);
  const navScale = useMotionValue(1);
  const navBlur = useMotionValue(24);
  const navOpacity = useMotionValue(1);

  // Smooth spring animations
  const springY = useSpring(navY, { stiffness: 400, damping: 40 });
  const springScale = useSpring(navScale, { stiffness: 300, damping: 30 });
  const springBlur = useSpring(navBlur, { stiffness: 200, damping: 25 });
  const springOpacity = useSpring(navOpacity, { stiffness: 400, damping: 40 });

  // Scroll behavior
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (current) => {
      if (prefersReducedMotion()) return;

      const difference = current - lastScrollY;
      const scrollingDown = difference > 0;
      const scrollingUp = difference < 0;

      // Hide/show navigation based on scroll direction
      if (scrollingDown && current > 100) {
        setIsVisible(false);
        navY.set(-100);
        navOpacity.set(0);
      } else if (scrollingUp || current < 50) {
        setIsVisible(true);
        navY.set(0);
        navOpacity.set(1);
      }

      // Compact mode based on scroll position
      if (current > 200 && !isCompact) {
        setIsCompact(true);
        navScale.set(0.9);
        navBlur.set(32);
      } else if (current <= 200 && isCompact) {
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
      }}
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-[100]',
        'will-change-transform',
        className
      )}
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
    >
      <motion.div
        layout
        className={cn(
          'flex items-center nav-glass transform-gpu rounded-2xl',
          'shadow-xl shadow-black/20',
          isCompact ? 'gap-5 px-7 py-4' : 'gap-16 px-16 py-5'
        )}
      >
        {/* Logo - hidden in compact mode */}
        <AnimatePresence>
          {!isCompact && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mr-2"
            >
              <Link
                href="/"
                className="text-lg font-light tracking-wider text-white/90 hover:text-white/95 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm px-1"
              >
                NIHAR
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Items */}
        <motion.div
          layout
          className={cn(
            'flex items-center',
            isCompact ? 'gap-8' : 'gap-12'
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
        <motion.div layout className="ml-2">
          <ThemeToggle isCompact={isCompact} />
        </motion.div>

      </motion.div>
    </motion.nav>
  );
}