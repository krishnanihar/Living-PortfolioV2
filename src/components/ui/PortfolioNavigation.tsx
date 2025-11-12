'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, User, Moon, Sun, Palette, HelpCircle } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';

interface PortfolioNavigationProps {
  className?: string;
}

export function PortfolioNavigation({ className }: PortfolioNavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState({ normal: 60, scrolled: 54 });
  const pathname = usePathname();
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  // Scroll detection - triggers at 50px like NavigationBar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Responsive navigation height based on screen size (copied from NavigationBar)
  useEffect(() => {
    const updateNavHeight = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Height constraint for 13" vertical space
      if (height <= 850 && width >= 1024) {
        setNavHeight({ normal: 48, scrolled: 44 });
      }
      // 13-inch laptops (1280-1439px)
      else if (width >= 1280 && width < 1440) {
        setNavHeight({ normal: 48, scrolled: 44 });
      }
      // 14-inch laptops (1440-1679px)
      else if (width >= 1440 && width < 1680) {
        setNavHeight({ normal: 52, scrolled: 48 });
      }
      // 16-inch scaled (1536-1727px) - takes precedence in this range
      else if (width >= 1536 && width < 1728) {
        setNavHeight({ normal: 54, scrolled: 50 });
      }
      // 16-inch native/large (1728-2879px)
      else if (width >= 1728 && width < 2880) {
        setNavHeight({ normal: 58, scrolled: 54 });
      }
      // 15-inch laptops (1920-2559px)
      else if (width >= 1920 && width < 2560) {
        setNavHeight({ normal: 56, scrolled: 52 });
      }
      // Default (mobile and small laptops)
      else {
        setNavHeight({ normal: 60, scrolled: 54 });
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  const navItems = [
    { name: 'Work', icon: Briefcase, href: '/work' as const },
    { name: 'About', icon: User, href: '/about' as const },
  ];

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
      `}</style>

      {/* Navigation with floating effect when scrolled */}
      <nav style={{
        position: 'fixed',
        top: scrolled ? '12px' : '0',
        left: 0,
        right: 0,
        zIndex: 9999,
        height: scrolled ? `${navHeight.scrolled}px` : `${navHeight.normal}px`,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        width: scrolled ? 'calc(100% - 48px)' : '100%',
        maxWidth: scrolled ? 'clamp(1200px, 90vw, 1400px)' : '100%',
        margin: '0 auto',
        borderRadius: scrolled ? '16px' : '0',
        overflow: scrolled ? 'hidden' : 'visible',
      }}>
        {/* Multi-layer glass effect */}
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
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}>
              <span style={{
                display: 'inline-block',
                background: isActive('/')
                  ? 'linear-gradient(120deg, rgba(180, 210, 240, 1) 0%, rgba(180, 210, 240, 0.8) 100%)'
                  : 'linear-gradient(120deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
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
                      padding: '0.5rem 1.25rem',
                      borderRadius: '24px',
                      fontSize: '0.825rem',
                      fontWeight: active ? '500' : '400',
                      letterSpacing: '0.025em',
                      color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Active state background */}
                    {active && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, rgba(180, 210, 240, 0.08) 0%, rgba(180, 210, 240, 0.04) 100%)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid var(--border-secondary)',
                        boxShadow: 'inset 0 1px 0 rgba(180, 210, 240, 0.1)',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }} />
                    )}

                    {/* Glass hover background */}
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

                    <div style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
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

            {/* Journey Button */}
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
