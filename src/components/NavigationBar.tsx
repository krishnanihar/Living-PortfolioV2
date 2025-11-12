'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, User, Moon, Sun, Palette, HelpCircle } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';

export function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState({ normal: 60, scrolled: 54 });
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive navigation height based on screen size
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

      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: scrolled ? `${navHeight.scrolled}px` : `${navHeight.normal}px`,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Multi-layer glass effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: scrolled
              ? `linear-gradient(90deg,
                var(--surface-secondary) 0%,
                var(--surface-primary) 50%,
                var(--surface-secondary) 100%)`
              : 'transparent',
            backdropFilter: scrolled ? 'blur(40px) saturate(150%)' : 'blur(20px) saturate(120%)',
            WebkitBackdropFilter: scrolled ? 'blur(40px) saturate(150%)' : 'blur(20px) saturate(120%)',
            borderBottom: scrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
            boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
            pointerEvents: 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Animated shimmer overlay */}
          {scrolled && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
                animation: 'shimmer 8s linear infinite',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        <div
          style={{
            position: 'relative',
            height: '100%',
            maxWidth: 'clamp(1200px, 90vw, 1400px)',
            margin: '0 auto',
            padding: '0 clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: '0.925rem',
              fontWeight: '500',
              letterSpacing: '0.08em',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(120deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              NIHAR
            </span>
          </div>

          {/* Nav Items */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            {/* Navigation Links */}
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '24px',
                    fontSize: '0.825rem',
                    fontWeight: '400',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.name}
                </div>
              </Link>
            ))}

            <div
              style={{
                width: '1px',
                height: '18px',
                background: 'rgba(255, 255, 255, 0.1)',
                margin: '0 0.5rem',
              }}
            />

            {/* Theme Toggle */}
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
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px) brightness(0.8)',
                WebkitBackdropFilter: 'blur(20px) brightness(0.8)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) rotate(15deg)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1) rotate(0)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              {theme === 'system' ? (
                <Palette size={15} />
              ) : resolvedTheme === 'dark' ? (
                <Moon size={15} />
              ) : (
                <Sun size={15} />
              )}
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
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px) brightness(0.8)',
                  WebkitBackdropFilter: 'blur(20px) brightness(0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.03)';
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
