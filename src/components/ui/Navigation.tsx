'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Palette, Home, User, Mail, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/effects/ThemeProvider';
import { useMagneticEffect, useGlowEffect, baseVariants, transitions, liquidMorphVariants } from '@/lib/animations';
import { MagneticText } from './MagneticText';
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
  const itemRef = useRef<HTMLAnchorElement>(null);
  const { x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.2);
  const { x: glowX, y: glowY, opacity: glowOpacity, updateGlow, hideGlow } = useGlowEffect();

  const handleMouseEnter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (itemRef.current) {
      updateGlow(event.nativeEvent, itemRef.current);
    }
  };

  const handleMouseMoveInternal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (itemRef.current) {
      handleMouseMove(event.nativeEvent, itemRef.current);
      updateGlow(event.nativeEvent, itemRef.current);
    }
  };

  const handleMouseLeaveInternal = () => {
    handleMouseLeave();
    hideGlow();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative"
    >
      <motion.div
        style={{ x, y }}
        className="relative"
      >
        <Link
          ref={itemRef}
          href={href as any}
          className={cn(
            'relative flex items-center gap-2 px-3 py-2 rounded-full font-medium transition-all duration-300 will-change-transform',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            'group overflow-hidden',
            isCompact ? 'w-10 h-10 justify-center' : 'px-4',
            isActive
              ? 'text-white/95 bg-white/10'
              : 'text-white/70 hover:text-white/95 hover:bg-white/8'
          )}
          onMouseMove={handleMouseMoveInternal}
          onMouseLeave={handleMouseLeaveInternal}
          onMouseEnter={handleMouseEnter}
        >
        {/* Dynamic glow background */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: isActive
              ? `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(218, 14, 41, 0.3), transparent 70%)`
              : `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.1), transparent 70%)`,
            opacity: glowOpacity,
          }}
        />

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={transitions.base}
        >
          <Icon size={isCompact ? 18 : 16} className="relative z-10" />
        </motion.div>

        {/* Label (hidden in compact mode) */}
        <AnimatePresence>
          {!isCompact && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 text-sm whitespace-nowrap overflow-hidden"
            >
              <MagneticText strength={0.1} splitByLetters={false}>
                {label}
              </MagneticText>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Active indicator blob */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 bg-gradient-to-r from-[#DA0E29]/20 to-[#DA0E29]/10 rounded-full"
            initial={false}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        )}

        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full scale-0 opacity-0"
          whileTap={{
            scale: [0, 1.2],
            opacity: [0.5, 0],
            transition: { duration: 0.4 }
          }}
        />
      </Link>
    </motion.div>
  </motion.div>
  );
}

interface ThemeToggleProps {
  isCompact: boolean;
}

function ThemeToggle({ isCompact }: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.15);
  const { x: glowX, y: glowY, opacity: glowOpacity, updateGlow, hideGlow } = useGlowEffect();

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggleRef.current) {
      updateGlow(event.nativeEvent, toggleRef.current);
    }
  };

  const handleMouseMoveInternal = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggleRef.current) {
      handleMouseMove(event.nativeEvent, toggleRef.current);
      updateGlow(event.nativeEvent, toggleRef.current);
    }
  };

  const handleMouseLeaveInternal = () => {
    handleMouseLeave();
    hideGlow();
  };

  const getThemeIcon = () => {
    if (theme === 'system') return Palette;
    return resolvedTheme === 'dark' ? Moon : Sun;
  };

  const ThemeIcon = getThemeIcon();

  return (
    <motion.button
      ref={toggleRef}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={transitions.spring}
      className={cn(
        'relative flex items-center justify-center rounded-full bg-white/8 hover:bg-white/12 border border-white/10 hover:border-white/20',
        'transition-all duration-300 will-change-transform group overflow-hidden',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        isCompact ? 'w-10 h-10' : 'w-11 h-11'
      )}
      onClick={toggleTheme}
      onMouseMove={handleMouseMoveInternal}
      onMouseLeave={handleMouseLeaveInternal}
      onMouseEnter={handleMouseEnter}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
    >
      {/* Glow background */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.15), transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      <ThemeIcon size={isCompact ? 16 : 18} className="text-white/70 group-hover:text-white/95 transition-colors relative z-10" />

      {/* Rotation effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/20"
        whileTap={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
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
          'flex items-center gap-1 px-2 py-2 rounded-2xl nav-glass transform-gpu',
          'border border-white/12 shadow-2xl',
          isCompact ? 'gap-2' : 'gap-4 px-4'
        )}
        style={{
          backdropFilter: 'blur(32px) saturate(180%)',
        }}
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
                className="text-base font-semibold tracking-wide text-white/95 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm px-2"
              >
                <MagneticText strength={0.2} splitByLetters={false} glowEffect>
                  NIHAR
                </MagneticText>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Items */}
        <motion.div
          layout
          className={cn(
            'flex items-center',
            isCompact ? 'gap-1' : 'gap-2'
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

        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(218, 14, 41, 0.1), transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(218, 14, 41, 0.1), transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(218, 14, 41, 0.1), transparent 50%)',
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </motion.nav>
  );
}