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
  const [heroCardOpacity, setHeroCardOpacity] = useState(1);
  const [heroCardScale, setHeroCardScale] = useState(1);
  const [heroCardBlur, setHeroCardBlur] = useState(0);
  const [particlesOpacity, setParticlesOpacity] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [intentContext, setIntentContext] = useState('');
  const [isSnapping, setIsSnapping] = useState(false);
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  // Stabilize particle positions
  const particlePositions = React.useMemo(() => {
    return {
      far: Array.from({ length: 50 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay1: Math.random() * 30,
        delay2: Math.random() * 20,
        duration1: 35 + Math.random() * 25,
        duration2: 15 + Math.random() * 10,
      })),
      mid: Array.from({ length: 30 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay1: Math.random() * 25,
        delay2: Math.random() * 15,
        duration1: 28 + Math.random() * 18,
        duration2: 12 + Math.random() * 8,
      })),
      near: Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay1: Math.random() * 20,
        delay2: Math.random() * 12,
        duration1: 22 + Math.random() * 14,
        duration2: 10 + Math.random() * 6,
      })),
      accent: Array.from({ length: 3 }, () => ({
        left: 20 + Math.random() * 60,
        top: 20 + Math.random() * 60,
        delay1: Math.random() * 15,
        delay2: Math.random() * 10,
        duration1: 25 + Math.random() * 15,
        duration2: 12 + Math.random() * 8,
      })),
    };
  }, []);

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

    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // If we're in the hero section and scrolling down
      if (scrollY < heroHeight * 0.5 && e.deltaY > 0 && !isSnapping) {
        e.preventDefault();
        setIsSnapping(true);

        window.scrollTo({
          top: heroHeight,
          behavior: 'smooth'
        });

        setTimeout(() => setIsSnapping(false), 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isSnapping]);

  const navItems = [
    { name: 'Work', icon: Briefcase, href: '/work' as const },
    { name: 'About', icon: User, href: '/about' as const },
  ];

  const credentials = [
    {
      name: 'Air India DesignLAB',
      role: 'Product Designer',
      period: '2023 - Present',
      metric: '450+ daily users',
      color: '#DA0E29'
    },
    {
      name: 'National Institute of Design',
      role: 'Design Education',
      period: '2019 - 2023',
      metric: 'Bachelor of Design',
      color: '#3B82F6'
    },
    {
      name: 'Indian School of Business',
      role: 'YLP Fellow',
      period: '2023',
      metric: 'Leadership Program',
      color: '#10B981'
    },
    {
      name: 'Microsoft',
      role: 'Design Systems',
      period: '2022',
      metric: 'Collaboration',
      color: '#8B5CF6'
    }
  ];

  const [hoveredCredential, setHoveredCredential] = useState<number | null>(null);




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
          {/* Floating Gradient Orbs */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '8%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(218, 14, 41, 0.08), rgba(218, 14, 41, 0.03) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            animation: 'floatOrb 40s ease-in-out infinite',
            opacity: mousePos.x < 30 && mousePos.y < 30 ? 1.3 : 1,
            transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />

          <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06), rgba(99, 102, 241, 0.02) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(90px)',
            animation: 'floatOrb 45s ease-in-out infinite 10s',
            opacity: mousePos.x > 70 && mousePos.y < 30 ? 1.3 : 1,
            transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />

          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '25%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.02) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(85px)',
            animation: 'floatOrb 50s ease-in-out infinite 20s',
            opacity: mousePos.x < 40 && mousePos.y > 60 ? 1.3 : 1,
            transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />

          <div style={{
            position: 'absolute',
            top: '40%',
            right: '15%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.04), rgba(245, 158, 11, 0.015) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'floatOrb 42s ease-in-out infinite 15s',
            opacity: mousePos.x > 60 && mousePos.y > 30 ? 1.3 : 1,
            transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />

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
            maxWidth: '720px',
            padding: '2.5rem',
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
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                opacity: scrollIndicatorOpacity,
                animation: 'scrollFadeIn 1s ease-out 2s both',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: scrollIndicatorOpacity > 0.1 ? 'auto' : 'none',
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
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '300',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
              }}>
                Scroll to explore
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'scrollBounce 3s ease-in-out infinite',
              }}>
                <ChevronDown size={18} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
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