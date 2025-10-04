'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, User, Moon, Sun, Palette, HelpCircle, ChevronDown } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';
import { ConversationStarter } from '@/components/ConversationStarter';
import { Chatbot } from '@/components/Chatbot';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [pastHero, setPastHero] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const [navTranslateY, setNavTranslateY] = useState(-100);
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [intentContext, setIntentContext] = useState('');
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      setScrolled(scrollY > 20);
      setPastHero(scrollY > heroHeight * 0.8);

      // Progressive reveal: starts at 200px, fully visible at 500px
      const revealStart = 200;
      const revealEnd = 500;

      if (scrollY < revealStart) {
        setNavOpacity(0);
        setNavTranslateY(-100);
      } else if (scrollY >= revealStart && scrollY <= revealEnd) {
        const progress = (scrollY - revealStart) / (revealEnd - revealStart);
        setNavOpacity(progress);
        setNavTranslateY(-100 + (progress * 100));
      } else {
        setNavOpacity(1);
        setNavTranslateY(0);
      }

      // Scroll indicator fade-out: visible until 100px, then fades out
      if (scrollY < 100) {
        setScrollIndicatorOpacity(1 - (scrollY / 100));
      } else {
        setScrollIndicatorOpacity(0);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @keyframes scrollFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 0.6;
            transform: translateY(0);
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
        <nav data-tour="navigation" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: scrolled ? '54px' : '60px',
          opacity: navOpacity,
          transform: `translateY(${navTranslateY}%)`,
          pointerEvents: navOpacity > 0.1 ? 'auto' : 'none',
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
              {/* Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: '24px',
                      fontSize: '0.825rem',
                      fontWeight: '400',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}>
                      {item.name}
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

              {/* Help/Journey Button */}
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


        {/* Hero Section */}
        <section style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div
            data-tour="hero-card"
            style={{
            width: '100%',
            maxWidth: '720px',
            padding: '2.5rem',
            borderRadius: '28px',
            animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1), breathe 8s ease-in-out infinite',
            position: 'relative',
          }}>
            {/* Simplified glass layer - matching WorkSection */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '28px',
              background: 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
              backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
              WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
              border: '1px solid var(--border-primary)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
            }} />

            {/* Conversation Starter */}
            <ConversationStarter
              onMessageSubmit={(message, intent) => {
                setInitialMessage(message);
                setIntentContext(intent);
                setChatOpen(true);
              }}
            />

            {/* Scroll to Explore Indicator */}
            <div
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                });
              }}
              style={{
                position: 'absolute',
                bottom: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: scrollIndicatorOpacity,
                animation: 'scrollFadeIn 1s ease-out 2s both',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: scrollIndicatorOpacity > 0.1 ? 'auto' : 'none',
              }}
              onMouseEnter={(e) => {
                if (scrollIndicatorOpacity > 0.1) {
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(-50%) scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateX(-50%) scale(1)';
              }}
            >
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '300',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                opacity: 0.6,
                textTransform: 'uppercase',
              }}>
                Scroll to explore
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                animation: 'scrollBounce 3s ease-in-out infinite',
                transition: 'all 0.3s ease',
              }}>
                <ChevronDown size={18} style={{ color: 'var(--text-muted)', opacity: 0.8 }} />
              </div>
            </div>
          </div>
        </section>

        {/* AI Chatbot */}
        <Chatbot
          isOpen={chatOpen}
          onClose={() => {
            setChatOpen(false);
            setInitialMessage('');
          }}
          initialMessage={initialMessage}
          intentContext={intentContext}
        />

      </div>
    </>
  );
}