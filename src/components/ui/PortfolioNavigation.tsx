'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, User, Moon, Sun, Palette, HelpCircle } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';

interface PortfolioNavigationProps {
  className?: string;
}

/**
 * PortfolioNavigation - Primary navigation component with floating effect
 *
 * Features:
 * - Floating pill design when scrolled past 50px threshold
 * - Responsive heights optimized for 13"-16" laptop screens
 * - Multi-layer glassmorphism (iOS 18 / macOS Sequoia aesthetic)
 * - Active route detection with visual highlighting
 * - Theme toggle (Light / Dark / System)
 * - Logo gradient with hover effects using CSS variables
 *
 * Design Philosophy:
 * - Scroll threshold at 50px provides immediate feedback without being too sensitive
 * - Floating effect (12px offset, 48px narrowing) creates premium app-like feel
 * - Passive event listeners for 60fps scroll performance
 * - CSS variables prevent build timeouts (no inline theme conditionals)
 *
 * @param className - Optional className (currently unused but available for extension)
 */

// Navigation constants
const SCROLL_THRESHOLD = 50; // Pixels scrolled before floating effect activates
const NAV_FLOATING_OFFSET = 12; // Top offset in pixels when navigation floats
const NAV_WIDTH_OFFSET = 48; // Width reduction in pixels when navigation narrows
const NAV_BORDER_RADIUS = 16; // Border radius in pixels for floating state
const NAV_MAX_WIDTH = 'clamp(1200px, 90vw, 1400px)'; // Max width when floating

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

export function PortfolioNavigation({ className }: PortfolioNavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState({ normal: 60, scrolled: 54 });
  const pathname = usePathname();
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  // Scroll detection - triggers at SCROLL_THRESHOLD
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Responsive navigation height based on screen size
  useEffect(() => {
    const updateNavHeight = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Height constraint for 13" vertical space
      if (height <= BREAKPOINTS.SMALL_LAPTOP_HEIGHT && width >= BREAKPOINTS.SMALL_LAPTOP_MIN) {
        setNavHeight(NAV_HEIGHTS.SMALL);
      }
      // 13-inch laptops
      else if (width >= BREAKPOINTS.SMALL_LAPTOP && width < BREAKPOINTS.MEDIUM_LAPTOP) {
        setNavHeight(NAV_HEIGHTS.SMALL);
      }
      // 14-inch laptops
      else if (width >= BREAKPOINTS.MEDIUM_LAPTOP && width < BREAKPOINTS.LARGE_LAPTOP_SCALED + 192) {
        setNavHeight(NAV_HEIGHTS.MEDIUM);
      }
      // 16-inch scaled - takes precedence in this range
      else if (width >= BREAKPOINTS.LARGE_LAPTOP_SCALED && width < BREAKPOINTS.LARGE_LAPTOP_NATIVE) {
        setNavHeight(NAV_HEIGHTS.LARGE_SCALED);
      }
      // 16-inch native/large
      else if (width >= BREAKPOINTS.LARGE_LAPTOP_NATIVE && width < BREAKPOINTS.LARGE_LAPTOP_MAX) {
        setNavHeight(NAV_HEIGHTS.LARGE_NATIVE);
      }
      // 15-inch laptops
      else if (width >= BREAKPOINTS.XLARGE_LAPTOP && width < BREAKPOINTS.XLARGE_LAPTOP_MAX) {
        setNavHeight(NAV_HEIGHTS.XLARGE);
      }
      // Default (mobile and small laptops)
      else {
        setNavHeight(NAV_HEIGHTS.DEFAULT);
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight, { passive: true });
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  // Primary navigation items (Work, About)
  const navItems = [
    { name: 'Work', icon: Briefcase, href: '/work' as const },
    { name: 'About', icon: User, href: '/about' as const },
  ];

  /**
   * Determines if a route is currently active
   * - Home page ('/') requires exact match
   * - Other routes match if pathname starts with href (includes sub-routes)
   * Example: /work/air-india activates the 'Work' nav item
   */
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .nav-item-content {
          position: relative;
          padding-bottom: 4px;
        }

        .nav-item-content::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--text-primary);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-item-content.active::after {
          transform: scaleX(1);
        }
      `}</style>

      {/* Navigation with floating effect when scrolled */}
      <nav style={{
        position: 'fixed',
        top: scrolled ? `${NAV_FLOATING_OFFSET}px` : '0',
        left: 0,
        right: 0,
        zIndex: 9999,
        height: scrolled ? `${navHeight.scrolled}px` : `${navHeight.normal}px`,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        width: scrolled ? `calc(100% - ${NAV_WIDTH_OFFSET}px)` : '100%',
        maxWidth: scrolled ? NAV_MAX_WIDTH : '100%',
        margin: '0 auto',
        borderRadius: scrolled ? `${NAV_BORDER_RADIUS}px` : '0',
        overflow: scrolled ? 'hidden' : 'visible',
      }}>
        {/*
          Multi-layer glassmorphism system (5 layers):
          1. Base: Radial + linear gradients for depth
          2. Backdrop filter: 80px blur + 200% saturation when scrolled (iOS 18 aesthetic)
          3. Multi-shadow system: Inset highlights + drop shadows
          4. Shimmer overlay: Animated gradient sweep (8s loop)
          5. Liquid glass: Diagonal reflection with overlay blend mode
        */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: scrolled
            ? `radial-gradient(ellipse 200% 100% at top, rgba(255, 255, 255, 0.04) 0%, transparent 50%),
               linear-gradient(135deg,
                 rgba(10, 10, 10, 0.3) 0%,
                 rgba(0, 0, 0, 0.2) 50%,
                 rgba(10, 10, 10, 0.3) 100%)`
            : 'transparent',
          backdropFilter: scrolled ? 'blur(80px) saturate(200%) brightness(0.95)' : 'blur(20px) saturate(120%)',
          WebkitBackdropFilter: scrolled ? 'blur(80px) saturate(200%) brightness(0.95)' : 'blur(20px) saturate(120%)',
          borderBottom: scrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
          boxShadow: scrolled
            ? `inset 0 1px 2px rgba(255, 255, 255, 0.1),
               inset 0 -1px 2px rgba(0, 0, 0, 0.6),
               inset 0 0 30px rgba(255, 255, 255, 0.01),
               0 8px 32px rgba(0, 0, 0, 0.6),
               0 20px 60px rgba(0, 0, 0, 0.3),
               0 0 0 1px rgba(255, 255, 255, 0.02)`
            : 'none',
          pointerEvents: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: scrolled ? 'transform, box-shadow' : 'auto',
        }}>
          {/* Animated shimmer overlay - only visible when scrolled */}
          {scrolled && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
              animation: 'shimmer 8s linear infinite',
              pointerEvents: 'none',
            }} />
          )}

          {/* Liquid Glass reflection layer - diagonal gradient overlay */}
          {scrolled && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg,
                rgba(255, 255, 255, 0.05) 0%,
                transparent 20%,
                transparent 80%,
                rgba(255, 255, 255, 0.03) 100%)`,
              pointerEvents: 'none',
              mixBlendMode: 'overlay',
              borderRadius: 'inherit',
            }} />
          )}
        </div>

        <div style={{
          position: 'relative',
          height: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 3vw, 2.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
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
            }}>
              <span style={{
                display: 'inline-block',
                background: isActive('/') ? 'var(--logo-gradient-active)' : 'var(--logo-gradient-inactive)',
                backgroundSize: '200% 100%',
                backgroundPosition: '0% 50%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: isActive('/') ? 'var(--logo-shadow-active)' : 'var(--logo-shadow-inactive)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                NIHAR
              </span>
            </div>
          </Link>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    onMouseEnter={(e) => {
                      if (!active) {
                        const target = e.currentTarget as HTMLElement;
                        target.style.transform = 'translateY(-2px) scale(1.02)';
                        const bg = target.querySelector('.hover-bg') as HTMLElement;
                        if (bg) bg.style.opacity = '1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        const target = e.currentTarget as HTMLElement;
                        target.style.transform = 'translateY(0) scale(1)';
                        const bg = target.querySelector('.hover-bg') as HTMLElement;
                        if (bg) bg.style.opacity = '0';
                      }
                    }}
                    style={{
                      position: 'relative',
                      padding: '0.5rem 1rem',
                      fontSize: '0.825rem',
                      fontWeight: active ? '500' : '400',
                      letterSpacing: '0.025em',
                      color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Glass hover background - only for inactive items */}
                    {!active && (
                      <div className="hover-bg" style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '24px',
                        background: 'var(--surface-primary)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid var(--border-primary)',
                        opacity: 0,
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                      }} />
                    )}

                    {/* Nav item content with animated bottom border */}
                    <div
                      className={`nav-item-content ${active ? 'active' : ''}`}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Icon size={15} style={{
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }} />
                      <span>{item.name}</span>
                    </div>
                  </div>
                </Link>
              );
            })}

            <div style={{
              width: '1px',
              height: '18px',
              background: 'var(--border-primary)',
              margin: '0 0.5rem',
            }} />

            <div
              onClick={toggleTheme}
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
              {theme === 'system' ? <Palette size={15} /> : (resolvedTheme === 'dark' ? <Moon size={15} /> : <Sun size={15} />)}
            </div>

            {/* Journey Button - HelpCircle icon represents "getting to know me" / learning journey */}
            <Link href="/journey" style={{ textDecoration: 'none' }}>
              <div
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
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--surface-secondary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--surface-primary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                <HelpCircle size={15} />
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
