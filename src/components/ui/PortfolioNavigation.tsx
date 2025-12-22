'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, User, Moon, Sun, HelpCircle } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';
import { MobileBottomNav } from './MobileBottomNav';

interface PortfolioNavigationProps {
  className?: string;
  /** Current snap section index (0 = hero). When provided, uses this instead of window scroll. */
  snapIndex?: number;
}

/**
 * PortfolioNavigation - Primary navigation component fixed at top
 *
 * Features:
 * - Fixed at top with subtle backdrop blur
 * - Responsive heights optimized for 13"-16" laptop screens
 * - Active route detection with visual highlighting
 * - Theme toggle (Light / Dark)
 * - Logo gradient with hover effects using CSS variables
 *
 * Design Philosophy:
 * - Clean, minimal appearance with transparent background
 * - CSS variables prevent build timeouts (no inline theme conditionals)
 *
 * @param className - Optional className (currently unused but available for extension)
 */


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
  const pathname = usePathname();
  const { theme, resolvedTheme, toggleTheme } = useTheme();

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

  // Memoize navigation items to prevent recreation on every render
  const navItems = useMemo(() => [
    { name: 'Work', icon: Briefcase, href: '/work' as const },
    { name: 'About', icon: User, href: '/about' as const },
  ], []);

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

  // Render bottom navigation on mobile
  if (isMobile) {
    return <MobileBottomNav />;
  }

  return (
    <>
      <style jsx global>{`
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

        @keyframes auroraDrift {
          0%, 100% {
            background-position: 0% 50%;
            filter: blur(20px) saturate(1);
          }
          25% {
            background-position: 100% 25%;
            filter: blur(16px) saturate(1.2);
          }
          50% {
            background-position: 100% 75%;
            filter: blur(20px) saturate(1);
          }
          75% {
            background-position: 0% 100%;
            filter: blur(16px) saturate(1.2);
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

        /* Hover glow effect for inactive items */
        .nav-item:hover .hover-glow {
          opacity: 1 !important;
        }
      `}</style>

      {/* Navigation - fixed at top */}
      <nav style={{
        position: 'fixed',
        top: '0',
        left: 0,
        right: 0,
        zIndex: 9999,
        height: `${navHeight.normal}px`,
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        borderRadius: '0',
        overflow: 'visible',
        // GPU acceleration for buttery smooth performance
        transform: 'translate3d(0, 0, 0)',
        isolation: 'isolate',
        contain: 'layout paint',
      }}>
        {/* Subtle backdrop blur layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'transparent',
          backdropFilter: 'blur(20px) saturate(120%)',
          WebkitBackdropFilter: 'blur(20px) saturate(120%)',
          borderBottom: '1px solid transparent',
          boxShadow: 'none',
          pointerEvents: 'none',
          // GPU acceleration for smooth performance
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }} />

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
          {/* Ambient Aurora Reflection - Entire Nav Bar */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '0',
              background: isActive('/')
                ? 'radial-gradient(ellipse 600px 200px at 15% 50%, var(--text-18), var(--text-10) 40%, transparent 70%)'
                : isActive('/work')
                ? 'radial-gradient(ellipse 600px 200px at 70% 50%, var(--text-18), var(--text-10) 40%, transparent 70%)'
                : isActive('/about')
                ? 'radial-gradient(ellipse 600px 200px at 78% 50%, var(--text-18), var(--text-10) 40%, transparent 70%)'
                : isActive('/journey')
                ? 'radial-gradient(ellipse 600px 200px at 94% 50%, var(--text-18), var(--text-10) 40%, transparent 70%)'
                : 'none',
              filter: 'blur(50px)',
              transition: 'background 0.6s ease',
              pointerEvents: 'none',
              zIndex: 0,
              // GPU acceleration for smooth blur transitions
              transform: 'translate3d(0, 0, 0)',
              willChange: 'background',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}>
            <div
              className="nav-item"
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
            }}>
              <span
                className="font-heading"
                style={{
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

              {/* Simple Radial Glow - Only for inactive home on hover */}
              {!isActive('/') && (
                <div
                  className="hover-glow"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '12px',
                    background: 'radial-gradient(ellipse 90% 60% at center, var(--text-30) 0%, var(--text-12) 40%, transparent 75%)',
                    filter: 'blur(12px)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    zIndex: -1,
                  }}
                />
              )}
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
                  style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}
                  aria-current={active ? 'page' : undefined}
                >
                  <div
                    className="nav-item"
                    style={{
                      position: 'relative',
                      padding: '0.75rem 1rem',
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
                    {/* Nav item content */}
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        zIndex: 1,
                      }}
                    >
                      <Icon size={15} />
                      <span className="font-heading">{item.name}</span>
                    </div>

                    {/* Aurora Mesh - Only for active state */}
                    {active && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: '-20px',
                          borderRadius: '12px',
                          background: `
                            radial-gradient(ellipse at 20% 50%, var(--text-25), transparent 60%),
                            radial-gradient(ellipse at 80% 50%, var(--text-20), transparent 60%),
                            radial-gradient(ellipse at 50% 20%, var(--text-15), transparent 50%),
                            linear-gradient(135deg, var(--aurora-gradient-2) 0%, transparent 50%, var(--aurora-gradient-2) 100%)
                          `,
                          backgroundSize: '250% 250%',
                          animation: 'auroraDrift 4s ease-in-out infinite',
                          filter: 'blur(20px)',
                          pointerEvents: 'none',
                          zIndex: -1,
                          // GPU acceleration for smooth animation
                          transform: 'translate3d(0, 0, 0)',
                          willChange: 'transform, filter',
                          backfaceVisibility: 'hidden',
                        }}
                      />
                    )}

                    {/* Simple Radial Glow - Only for inactive items on hover */}
                    {!active && (
                      <div
                        className="hover-glow"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '12px',
                          background: 'radial-gradient(ellipse 90% 60% at center, var(--text-30) 0%, var(--text-12) 40%, transparent 75%)',
                          filter: 'blur(12px)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          pointerEvents: 'none',
                          zIndex: -1,
                        }}
                      />
                    )}
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
              role="button"
              aria-label="Toggle theme"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleTheme();
                }
              }}
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

            {/* Journey Button - HelpCircle icon represents "getting to know me" / learning journey */}
            <Link href="/journey" style={{ textDecoration: 'none' }} aria-label="View my journey">
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
