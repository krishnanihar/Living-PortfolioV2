'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, User, Moon, Sun, Palette, HelpCircle, ChevronDown, Beaker } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';
import { HeroCard } from '@/components/HeroCard';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [navOpacity, setNavOpacity] = useState(0);
  const [navTranslateY, setNavTranslateY] = useState(-100);
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(0);
  const [heroCardOpacity, setHeroCardOpacity] = useState(1);
  const [heroCardScale, setHeroCardScale] = useState(1);
  const [heroCardBlur, setHeroCardBlur] = useState(0);
  const [particlesOpacity, setParticlesOpacity] = useState(1);
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  // Stabilize particle positions with deterministic algorithm
  const particlePositions = React.useMemo(() => {
    return {
      far: Array.from({ length: 50 }, (_, i) => {
        const seed = i / 50;
        return {
          left: ((seed * 87.3 + 13.7 + i * 4.2) % 100),
          top: ((seed * 73.1 + 17.3 + i * 5.7) % 100),
          delay1: ((seed * 25.5 + 2.5 + i * 0.6) % 30),
          delay2: ((seed * 18.3 + 1.7 + i * 0.4) % 20),
          duration1: 35 + ((seed * 23.7 + i * 0.5) % 25),
          duration2: 15 + ((seed * 9.4 + i * 0.2) % 10),
        };
      }),
      mid: Array.from({ length: 30 }, (_, i) => {
        const seed = i / 30;
        return {
          left: ((seed * 91.2 + 8.8 + i * 3.8) % 100),
          top: ((seed * 68.4 + 21.6 + i * 4.3) % 100),
          delay1: ((seed * 22.1 + 2.9 + i * 0.8) % 25),
          delay2: ((seed * 13.7 + 1.3 + i * 0.5) % 15),
          duration1: 28 + ((seed * 17.2 + i * 0.6) % 18),
          duration2: 12 + ((seed * 7.6 + i * 0.3) % 8),
        };
      }),
      near: Array.from({ length: 20 }, (_, i) => {
        const seed = i / 20;
        return {
          left: ((seed * 79.6 + 20.4 + i * 5.1) % 100),
          top: ((seed * 82.3 + 17.7 + i * 6.2) % 100),
          delay1: ((seed * 18.4 + 1.6 + i * 1.0) % 20),
          delay2: ((seed * 11.2 + 0.8 + i * 0.6) % 12),
          duration1: 22 + ((seed * 13.3 + i * 0.7) % 14),
          duration2: 10 + ((seed * 5.7 + i * 0.3) % 6),
        };
      }),
      accent: Array.from({ length: 3 }, (_, i) => {
        const seed = i / 3;
        return {
          left: 20 + ((seed * 52.4 + i * 8.3) % 60),
          top: 20 + ((seed * 47.8 + i * 7.6) % 60),
          delay1: ((seed * 13.6 + i * 1.5) % 15),
          delay2: ((seed * 9.1 + i * 1.1) % 10),
          duration1: 25 + ((seed * 14.2 + i * 0.9) % 15),
          duration2: 12 + ((seed * 7.4 + i * 0.8) % 8),
        };
      }),
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Progressive reveal: starts at 100px, fully visible at 300px
      const revealStart = 100;
      const revealEnd = 300;

      if (scrollY < revealStart) {
        setNavOpacity(0.7); // Minimum 70% visible (improved discoverability)
        setNavTranslateY(-30); // Slightly hidden but clearly visible
      } else if (scrollY >= revealStart && scrollY <= revealEnd) {
        const progress = (scrollY - revealStart) / (revealEnd - revealStart);
        setNavOpacity(0.7 + (progress * 0.3)); // 70% to 100%
        setNavTranslateY(-30 + (progress * 30)); // -30px to 0
      } else {
        setNavOpacity(1);
        setNavTranslateY(0);
      }

      // Scroll indicator fade-out: starts at 50px, complete at 150px
      if (scrollY < 50) {
        setScrollIndicatorOpacity(1);
      } else if (scrollY >= 50 && scrollY <= 150) {
        setScrollIndicatorOpacity(1 - ((scrollY - 50) / 100));
      } else {
        setScrollIndicatorOpacity(0);
      }

      // Hero card exit animation: 100px-400px range
      const exitStart = 100;
      const exitEnd = 400;

      if (scrollY < exitStart) {
        setHeroCardOpacity(1);
        setHeroCardScale(1);
        setHeroCardBlur(0);
      } else if (scrollY >= exitStart && scrollY <= exitEnd) {
        const progress = (scrollY - exitStart) / (exitEnd - exitStart);
        setHeroCardOpacity(1 - progress);
        setHeroCardScale(1 - (progress * 0.05));
        setHeroCardBlur(progress * 10);
      } else {
        setHeroCardOpacity(0);
        setHeroCardScale(0.95);
        setHeroCardBlur(10);
      }

      // Particles fade out: 0px-600px range
      const particleFadeStart = 0;
      const particleFadeEnd = 600;

      if (scrollY < particleFadeStart) {
        setParticlesOpacity(1);
      } else if (scrollY >= particleFadeStart && scrollY <= particleFadeEnd) {
        const progress = (scrollY - particleFadeStart) / (particleFadeEnd - particleFadeStart);
        setParticlesOpacity(1 - progress);
      } else {
        setParticlesOpacity(0);
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
    { name: 'Labs', icon: Beaker, href: '/labs' as const },
    { name: 'About', icon: User, href: '/about' as const },
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
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          style={{
            position: 'absolute',
            left: '-9999px',
            zIndex: 10000,
            padding: '1rem 1.5rem',
            background: 'var(--brand-red)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(218, 14, 41, 0.4)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.left = '1rem';
            e.currentTarget.style.top = '1rem';
          }}
          onBlur={(e) => {
            e.currentTarget.style.left = '-9999px';
          }}
        >
          Skip to main content
        </a>

        {/* Cosmic Particles Background - Hero Only */}
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: particlesOpacity,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Particle layer - Far (slowest, smoothest) with mouse attraction */}
          <div className="cosmic-particle-layer cosmic-particle-layer-far">
            {particlePositions.far.map((particle, i) => {
              // Calculate distance from mouse
              const dx = mousePos.x - particle.left;
              const dy = mousePos.y - particle.top;
              const distance = Math.sqrt(dx * dx + dy * dy);

              // Subtle attraction force
              const maxDistance = 30;
              const force = distance < maxDistance ? (1 - distance / maxDistance) : 0;

              // Smooth attraction (max ~12px movement)
              const attractX = dx * force * 0.15;
              const attractY = dy * force * 0.15;

              return (
                <div
                  key={`far-${i}`}
                  className="cosmic-particle"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: '1px',
                    height: '1px',
                    animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                    animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                    transform: `translate(${attractX}px, ${attractY}px)`,
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              );
            })}
          </div>

          {/* Particle layer - Mid (medium speed) with subtle mouse attraction */}
          <div className="cosmic-particle-layer cosmic-particle-layer-mid">
            {particlePositions.mid.map((particle, i) => {
              const dx = mousePos.x - particle.left;
              const dy = mousePos.y - particle.top;
              const distance = Math.sqrt(dx * dx + dy * dy);

              const maxDistance = 32;
              const force = distance < maxDistance ? (1 - distance / maxDistance) : 0;

              const attractX = dx * force * 0.2;
              const attractY = dy * force * 0.2;

              return (
                <div
                  key={`mid-${i}`}
                  className="cosmic-particle"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: '1.5px',
                    height: '1.5px',
                    animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                    animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                    transform: `translate(${attractX}px, ${attractY}px)`,
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              );
            })}
          </div>

          {/* Particle layer - Near (subtle attraction) */}
          <div className="cosmic-particle-layer cosmic-particle-layer-near">
            {particlePositions.near.map((particle, i) => {
              const dx = mousePos.x - particle.left;
              const dy = mousePos.y - particle.top;
              const distance = Math.sqrt(dx * dx + dy * dy);

              const maxDistance = 35;
              const force = distance < maxDistance ? (1 - distance / maxDistance) : 0;

              const attractX = dx * force * 0.25;
              const attractY = dy * force * 0.25;

              return (
                <div
                  key={`near-${i}`}
                  className="cosmic-particle"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: '2px',
                    height: '2px',
                    animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                    animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                    transform: `translate(${attractX}px, ${attractY}px)`,
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              );
            })}
          </div>

          {/* Accent particles (gentle attraction) */}
          <div className="cosmic-particle-layer cosmic-particle-layer-accent">
            {particlePositions.accent.map((particle, i) => {
              const dx = mousePos.x - particle.left;
              const dy = mousePos.y - particle.top;
              const distance = Math.sqrt(dx * dx + dy * dy);

              const maxDistance = 32;
              const force = distance < maxDistance ? (1 - distance / maxDistance) : 0;

              const attractX = dx * force * 0.18;
              const attractY = dy * force * 0.18;

              return (
                <div
                  key={`accent-${i}`}
                  className="cosmic-particle cosmic-particle-accent"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: '1.5px',
                    height: '1.5px',
                    animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                    animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                    transform: `translate(${attractX}px, ${attractY}px)`,
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              );
            })}
          </div>

          {/* Subtle grid pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              opacity: 0.15,
            }}
          />
        </div>

        {/* Minimal spotlight effect with mouse tracking */}
        <div style={{
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%,
            rgba(255, 255, 255, 0.015) 0%,
            transparent 50%)`,
          pointerEvents: 'none',
          transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1,
        }} />

        {/* Particle parallax layer - moves with mouse */}
        <div
          className="particle-parallax-layer"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
            transform: `translate(${(mousePos.x - 50) * 0.02}px, ${(mousePos.y - 50) * 0.02}px)`,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

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
          pointerEvents: 'auto', // Always clickable
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
            maxWidth: 'clamp(1200px, 90vw, 1400px)',
            margin: '0 auto',
            padding: '0 clamp(1.5rem, 3vw, 2.5rem)',
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
              {navItems.map((item) => (
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
              ))}

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
        <section id="main-content" style={{
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
            maxWidth: 'clamp(640px, 85vw, 720px)',
            padding: 'clamp(1.5rem, 2.5vw, 2rem)',
            borderRadius: '28px',
            animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1), breathe 8s ease-in-out infinite',
            position: 'relative',
            opacity: heroCardOpacity,
            transform: `scale(${heroCardScale})`,
            filter: `blur(${heroCardBlur}px)`,
            transition: 'opacity 0.1s linear, transform 0.1s linear, filter 0.1s linear',
            pointerEvents: heroCardOpacity < 0.1 ? 'none' : 'auto',
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

            {/* Hero Card */}
            <HeroCard />

            {/* Scroll to Explore Indicator */}
            <div
              onClick={() => {
                const workSection = document.getElementById('work-section');
                if (workSection) {
                  workSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                } else {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                  });
                }
              }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: 'clamp(1.25rem, 2vw, 1.75rem)',
                paddingTop: 'clamp(0.75rem, 1.5vw, 1rem)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                opacity: scrollIndicatorOpacity,
                animation: 'scrollFadeIn 0.8s ease-out 1s both',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                if (scrollIndicatorOpacity > 0.1) {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <Briefcase size={14} style={{ color: 'var(--text-secondary)', opacity: 0.7 }} />
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                }}>
                  Scroll to explore work
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'scrollBounce 3s ease-in-out infinite',
              }}>
                <ChevronDown size={18} style={{ color: 'var(--text-secondary)', opacity: 0.8 }} />
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}