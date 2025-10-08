'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, User, Moon, Sun, Palette, Beaker } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';

interface PortfolioNavigationProps {
  className?: string;
}

export function PortfolioNavigation({ className }: PortfolioNavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Work', icon: Briefcase, href: '/work' as const },
    { name: 'Labs', icon: Beaker, href: '/labs' as const },
    { name: 'About', icon: User, href: '/about' as const },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%) translateZ(0);
            opacity: 0;
          }
          to {
            transform: translateY(0) translateZ(0);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      {/* Navigation with enhanced glass */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: scrolled ? '54px' : '60px',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        animation: 'slideDown 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Multi-layer glass effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg,
            var(--surface-secondary) 0%,
            var(--surface-primary) 50%,
            var(--surface-secondary) 100%)`,
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          borderBottom: '1px solid var(--border-primary)',
          boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
        }}>
          {/* Animated shimmer overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, var(--highlight-subtle) 50%, transparent 100%)',
            animation: 'shimmer 8s linear infinite',
            pointerEvents: 'none',
          }} />
        </div>

        <div style={{
          position: 'relative',
          height: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2.5rem',
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
          </div>
        </div>
      </nav>
    </>
  );
}