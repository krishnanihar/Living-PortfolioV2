'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Briefcase, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';
import { MobileBottomNav } from './MobileBottomNav';

interface PortfolioNavigationProps {
  className?: string;
  /** Current snap section index (0 = hero). When provided, uses this instead of window scroll. */
  snapIndex?: number;
}

// Scroll threshold for floating state (px)
const SCROLL_THRESHOLD = 50;

// Screen size breakpoints for responsive navigation heights
const BREAKPOINTS = {
  SMALL_LAPTOP_HEIGHT: 850, // 13" vertical constraint
  SMALL_LAPTOP_MIN: 1024,
  SMALL_LAPTOP: 1280,
  MEDIUM_LAPTOP: 1440,
  LARGE_LAPTOP_SCALED: 1536,
  LARGE_LAPTOP_NATIVE: 1728,
  XLARGE_LAPTOP: 1920,
  XLARGE_LAPTOP_MAX: 2560,
  LARGE_LAPTOP_MAX: 2880,
} as const;

// Navigation height configurations by screen size
const NAV_HEIGHTS = {
  SMALL: { normal: 48, scrolled: 44 }, // 13" laptops
  MEDIUM: { normal: 52, scrolled: 48 }, // 14" laptops
  LARGE_SCALED: { normal: 54, scrolled: 50 }, // 16" scaled
  LARGE_NATIVE: { normal: 58, scrolled: 54 }, // 16" native
  XLARGE: { normal: 56, scrolled: 52 }, // 15" laptops
  DEFAULT: { normal: 60, scrolled: 54 }, // Mobile and default
} as const;

export function PortfolioNavigation({ className, snapIndex }: PortfolioNavigationProps) {
  const [navHeight, setNavHeight] = useState({ normal: 60, scrolled: 54 });
  const [isMobile, setIsMobile] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();

  // Framer Motion scroll pipeline
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Spring config: instant for reduced motion, smooth otherwise
  const navSpring = shouldReduceMotion
    ? { stiffness: 1000, damping: 100, mass: 0.1 }
    : { stiffness: 200, damping: 30, mass: 0.8 };

  // Scroll -> spring-interpolated style values
  const rawTop = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 12]);
  const top = useSpring(rawTop, navSpring);

  const rawBorderRadius = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 20]);
  const borderRadius = useSpring(rawBorderRadius, navSpring);

  const rawHeight = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    [navHeight.normal, navHeight.scrolled]
  );
  const height = useSpring(rawHeight, navSpring);

  // Flip boolean at scroll threshold (for CSS glass toggle)
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setIsFloating(v > SCROLL_THRESHOLD));
    return unsub;
  }, [scrollY]);

  // Support snapIndex prop: if snapIndex > 0, treat as floating
  useEffect(() => {
    if (snapIndex !== undefined) {
      setIsFloating(snapIndex > 0);
    }
  }, [snapIndex]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive navigation height based on screen size
  useEffect(() => {
    const updateNavHeight = () => {
      const width = window.innerWidth;
      const h = window.innerHeight;

      if (h <= BREAKPOINTS.SMALL_LAPTOP_HEIGHT && width >= BREAKPOINTS.SMALL_LAPTOP_MIN) {
        setNavHeight(NAV_HEIGHTS.SMALL);
      } else if (width >= BREAKPOINTS.SMALL_LAPTOP && width < BREAKPOINTS.MEDIUM_LAPTOP) {
        setNavHeight(NAV_HEIGHTS.SMALL);
      } else if (width >= BREAKPOINTS.MEDIUM_LAPTOP && width < BREAKPOINTS.LARGE_LAPTOP_SCALED + 192) {
        setNavHeight(NAV_HEIGHTS.MEDIUM);
      } else if (width >= BREAKPOINTS.LARGE_LAPTOP_SCALED && width < BREAKPOINTS.LARGE_LAPTOP_NATIVE) {
        setNavHeight(NAV_HEIGHTS.LARGE_SCALED);
      } else if (width >= BREAKPOINTS.LARGE_LAPTOP_NATIVE && width < BREAKPOINTS.LARGE_LAPTOP_MAX) {
        setNavHeight(NAV_HEIGHTS.LARGE_NATIVE);
      } else if (width >= BREAKPOINTS.XLARGE_LAPTOP && width < BREAKPOINTS.XLARGE_LAPTOP_MAX) {
        setNavHeight(NAV_HEIGHTS.XLARGE);
      } else {
        setNavHeight(NAV_HEIGHTS.DEFAULT);
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight, { passive: true });
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  // Memoize navigation items
  const navItems = useMemo(() => [
    { name: 'Work', icon: Briefcase, href: '/work' as const },
    { name: 'About', icon: User, href: '/about' as const },
  ], []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Render bottom navigation on mobile
  if (isMobile) {
    return <MobileBottomNav />;
  }

  return (
    <motion.nav
      className="nav-floating-wrapper"
      data-floating={isFloating}
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top,
        left: '50%',
        x: '-50%',
        zIndex: 9999,
        height,
        width: '100%',
        maxWidth: isFloating ? 'min(90vw, 1200px)' : '100%',
        borderRadius,
        overflow: 'visible',
        willChange: 'transform',
        isolation: 'isolate',
        pointerEvents: 'auto',
        transition: shouldReduceMotion
          ? 'max-width 0s'
          : 'max-width 0.5s var(--ease-premium)',
      }}
    >
      {/* Inner content container */}
      <div style={{
        position: 'relative',
        height: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 3vw, 2.5rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Ambient Aurora Reflection - Entire Nav Bar */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: isActive('/')
              ? 'radial-gradient(ellipse 600px 200px at 15% 50%, var(--text-18), var(--text-10) 40%, transparent 70%)'
              : isActive('/work')
              ? 'radial-gradient(ellipse 600px 200px at 70% 50%, var(--text-18), var(--text-10) 40%, transparent 70%)'
              : isActive('/about')
              ? 'radial-gradient(ellipse 600px 200px at 78% 50%, var(--text-18), var(--text-10) 40%, transparent 70%)'
              : 'none',
            filter: 'blur(50px)',
            transition: 'background 0.6s ease',
            pointerEvents: 'none',
            zIndex: 0,
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        {/* Logo */}
        <Link
          href="/"
          style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-50)]"
        >
          <div
            style={{
              fontSize: '0.925rem',
              fontWeight: isActive('/') ? '600' : '500',
              letterSpacing: '0.08em',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              const span = e.currentTarget.querySelector('span') as HTMLElement;
              if (span) {
                span.style.backgroundPosition = '100% 50%';
                span.style.filter = 'var(--logo-shadow-hover)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              const span = e.currentTarget.querySelector('span') as HTMLElement;
              if (span) {
                span.style.backgroundPosition = '0% 50%';
                span.style.filter = isActive('/')
                  ? 'var(--logo-shadow-active)'
                  : 'var(--logo-shadow-inactive)';
              }
            }}
          >
            <span
              className="font-heading"
              style={{
                display: 'inline-block',
                fontStyle: 'italic',
                letterSpacing: '0.04em',
                background: isActive('/') ? 'var(--logo-gradient-active)' : 'var(--logo-gradient-inactive)',
                backgroundSize: '200% 100%',
                backgroundPosition: '0% 50%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: isActive('/') ? 'var(--logo-shadow-active)' : 'var(--logo-shadow-inactive)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              NIHAR
            </span>
          </div>
        </Link>

        {/* Right side: nav items + theme toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}
                aria-current={active ? 'page' : undefined}
                className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-50)]"
              >
                <div
                  style={{
                    position: 'relative',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: active ? 'var(--text-95)' : 'var(--text-70)',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-90)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-70)';
                    }
                  }}
                >
                  {/* Animated active indicator - shared layoutId */}
                  {active && (
                    <motion.div
                      layoutId="nav-active-indicator"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '10px',
                        background: 'var(--glass-08)',
                        border: '1px solid var(--glass-06)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Nav item content */}
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 1,
                  }}>
                    <Icon size={15} />
                    <span className="font-heading">{item.name}</span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Separator */}
          <div style={{
            width: '1px',
            height: '18px',
            background: 'var(--border-primary)',
            margin: '0 0.5rem',
          }} />

          {/* Theme toggle */}
          <div
            onClick={toggleTheme}
            role="button"
            aria-label="Toggle theme"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
              }
            }}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-50)]"
            style={{
              position: 'relative',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              background: 'var(--surface-primary)',
              backdropFilter: 'blur(20px) brightness(0.8)',
              WebkitBackdropFilter: 'blur(20px) brightness(0.8)',
              border: '1px solid var(--border-primary)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) rotate(15deg)';
              (e.currentTarget as HTMLElement).style.background = 'var(--surface-secondary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1) rotate(0)';
              (e.currentTarget as HTMLElement).style.background = 'var(--surface-primary)';
            }}
          >
            {resolvedTheme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
