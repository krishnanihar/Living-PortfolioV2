'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, User, Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';
import { LivingConsciousnessExperience } from '@/components/LivingConsciousnessExperience';
import { ConversationStarter } from '@/components/ConversationStarter';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.8; // 80% of viewport (for BOTH nav and bot)
      setScrolled(window.scrollY > 20);
      setPastHero(window.scrollY > heroThreshold); // Navigation visibility (80%)
      setShowChatbot(window.scrollY > heroThreshold); // Chatbot visibility (80%)
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      requestAnimationFrame(() => {
        setMousePos({ x, y });
        // Calculate tilt based on mouse position (very subtle)
        const tiltX = ((y - 50) / 50) * 2; // Max 2 degrees
        const tiltY = ((x - 50) / 50) * -2; // Max 2 degrees, inverted
        setCardTilt({ x: tiltX, y: tiltY });
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleIntentSelect = (intentId: string) => {
    setSelectedIntent(intentId);
    setShowChatbot(true);
  };

  const navItems = [
    { name: 'Work', icon: Briefcase, href: '/work' as const },
    { name: 'About', icon: User, href: '/about' as const },
  ];

  const companies = [
    'Air India DesignLAB',
    'National Institute of Design',
    'Indian School of Business',
    'Microsoft'
  ];




  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .portfolio-container {
          margin: 0;
          padding: 0;
          width: 100%;
          position: relative;
          display: block;
        }

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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
      `}</style>

      <div className="portfolio-container" style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        width: '100%',
      }}>
        {/* Dark translucent overlay with mouse tracking */}
        <div style={{
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,
            rgba(218, 14, 41, 0.02) 0%,
            transparent 40%)`,
          pointerEvents: 'none',
          transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />

        {/* Navigation with enhanced glass */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: scrolled ? '54px' : '60px',
          opacity: pastHero ? 1 : 0,
          pointerEvents: pastHero ? 'auto' : 'none',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
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
            pointerEvents: 'none',
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
                        color: 'var(--text-secondary)',
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
                {theme === 'system' ? <Palette size={15} /> : (resolvedTheme === 'dark' ? <Moon size={15} /> : <Sun size={15} />)}
              </div>

            </div>
          </div>
        </nav>


        {/* Hero Section with Revolutionary Consciousness Experience */}
        <section style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
            width: '100%',
            maxWidth: '720px',
            padding: '3rem',
            borderRadius: '36px',
            animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1), breathe 8s ease-in-out infinite',
            transformStyle: 'preserve-3d' as const,
            transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
          }}>
            {/* Primary glass layer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '36px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
              backdropFilter: 'blur(60px) saturate(120%) brightness(0.9)',
              WebkitBackdropFilter: 'blur(60px) saturate(120%) brightness(0.9)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.03),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                0 8px 16px rgba(0, 0, 0, 0.3),
                0 0 40px rgba(218, 14, 41, 0.005)
              `,
            }} />

            {/* Theme-aware translucent layer */}
            <div style={{
              position: 'absolute',
              inset: '1px',
              borderRadius: '35px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.05) 100%)',
              pointerEvents: 'none',
              opacity: 0.3,
            }} />

            {/* Top shine */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              borderRadius: '50%',
              filter: 'blur(0.5px)',
            }} />

            {/* Revolutionary Consciousness Experience Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <ConversationStarter onIntentSelect={handleIntentSelect} />

              {/* Company credits with glass separator */}
              <div style={{
                display: 'flex',
                gap: '1.75rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1s both',
              }}>
                {companies.map((company) => (
                  <div
                    key={company}
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                      fontWeight: '300',
                      letterSpacing: '0.03em',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.8)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.4)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEMPORARILY DISABLED FOR DEBUGGING CLICK ISSUES */}
        {/* <LivingConsciousnessExperience
          pastHero={pastHero}
          showExperience={showChatbot}
          selectedIntent={selectedIntent}
        /> */}
      </div>
    </>
  );
}