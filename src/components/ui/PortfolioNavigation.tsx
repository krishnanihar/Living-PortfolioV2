'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, User, Moon, Sun } from 'lucide-react';

interface PortfolioNavigationProps {
  className?: string;
}

export function PortfolioNavigation({ className }: PortfolioNavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

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
    { name: 'About', icon: User, href: '/about' as const },
  ];

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
            rgba(255, 255, 255, ${scrolled ? 0.06 : 0.03}) 0%,
            rgba(255, 255, 255, ${scrolled ? 0.04 : 0.02}) 50%,
            rgba(255, 255, 255, ${scrolled ? 0.05 : 0.025}) 100%)`,
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
        }}>
          {/* Animated shimmer overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
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
            }}>
              <span style={{
                display: 'inline-block',
                background: 'linear-gradient(120deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)',
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

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(-2px) scale(1.02)';
                      const bg = target.querySelector('.hover-bg') as HTMLElement;
                      if (bg) bg.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(0) scale(1)';
                      const bg = target.querySelector('.hover-bg') as HTMLElement;
                      if (bg) bg.style.opacity = '0';
                    }}
                    style={{
                      position: 'relative',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '24px',
                      fontSize: '0.825rem',
                      fontWeight: '400',
                      letterSpacing: '0.025em',
                      color: 'rgba(255, 255, 255, 0.8)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Glass hover background */}
                    <div className="hover-bg" style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '24px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      opacity: 0,
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    }} />

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
              background: 'rgba(255, 255, 255, 0.1)',
              margin: '0 0.5rem',
            }} />

            <div
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                position: 'relative',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.8)',
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
              {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}