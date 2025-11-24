'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail, Github } from 'lucide-react';

// Ultra-Liquid Glass Style - iOS 26 Inspired
const UNIFIED_GLASS = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: `
    0 12px 48px rgba(0, 0, 0, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.10),
    inset 0 1px 2px rgba(255, 255, 255, 0.25),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15)
  `,
};

export function IntroductionSection() {
  const [hoveredButton, setHoveredButton] = useState<'contact' | 'github' | null>(null);
  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [greeting, setGreeting] = useState('');

  // Smart greeting system with localStorage
  const getGreeting = (visitCount: number, currentHour: number) => {
    const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

    if (visitCount === 1) return "Hi, I'm Nihar. Welcome.";
    if (visitCount <= 5) return `${timeGreeting}. I'm Nihar, welcome back.`;
    return `${timeGreeting} again. I'm Nihar.`;
  };

  useEffect(() => {
    setMounted(true);

    // Visitor tracking
    const visitCount = parseInt(localStorage.getItem('portfolio_visit_count') || '0') + 1;
    const currentHour = new Date().getHours();

    localStorage.setItem('portfolio_visit_count', visitCount.toString());
    localStorage.setItem('portfolio_last_visit', new Date().toISOString());
    localStorage.setItem('portfolio_has_visited', 'true');

    // Set personalized greeting
    setGreeting(getGreeting(visitCount, currentHour));

    // Staggered animation stages
    const stages = [1, 2, 3];
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 100);
    });
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector('[id*="about"]');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        /* Mobile - Small screens (<640px) */
        @media (max-width: 640px) {
          .hero-content {
            text-align: center !important;
          }

          .hero-greeting {
            font-size: clamp(1.75rem, 6vw, 2.25rem) !important;
          }

          .hero-subtitle {
            font-size: clamp(0.875rem, 2vw, 1rem) !important;
          }

          .hero-buttons {
            flex-direction: column !important;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
            gap: 1rem !important;
          }

          .hero-buttons a {
            width: 100% !important;
            justify-content: center !important;
            padding: 12px 24px !important;
            font-size: 0.9375rem !important;
            min-height: 48px;
          }
        }

        /* Tablet (640px - 1024px) */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero-greeting {
            font-size: clamp(2rem, 4.5vw, 3rem) !important;
          }

          .hero-subtitle {
            font-size: clamp(1rem, 2vw, 1.15rem) !important;
          }

          .hero-buttons {
            gap: 1.25rem !important;
          }

          .hero-buttons a {
            max-width: 280px;
            padding: 13px 26px !important;
            font-size: 0.9375rem !important;
          }
        }

        /* Small Laptop (1024px - 1440px) */
        @media (min-width: 1025px) and (max-width: 1440px) {
          .hero-greeting {
            font-size: clamp(2.5rem, 4.5vw, 3.5rem) !important;
          }

          .hero-subtitle {
            font-size: clamp(1rem, 2vw, 1.2rem) !important;
          }

          .hero-buttons {
            gap: 1.5rem !important;
          }

          .hero-buttons a {
            max-width: 300px;
            padding: 14px 28px !important;
            font-size: 1rem !important;
          }
        }

        /* Desktop (1440px - 1920px) */
        @media (min-width: 1441px) and (max-width: 1920px) {
          .hero-greeting {
            font-size: clamp(3rem, 4vw, 4rem) !important;
          }

          .hero-subtitle {
            font-size: clamp(1.125rem, 2vw, 1.3rem) !important;
          }

          .hero-buttons {
            gap: 2rem !important;
          }

          .hero-buttons a {
            padding: 15px 32px !important;
            font-size: 1.0625rem !important;
          }
        }

        /* Large Desktop (>1920px) */
        @media (min-width: 1921px) {
          .hero-greeting {
            font-size: 4rem !important;
          }

          .hero-subtitle {
            font-size: 1.375rem !important;
          }

          .hero-buttons {
            gap: 2.5rem !important;
          }

          .hero-buttons a {
            padding: 16px 36px !important;
            font-size: 1.125rem !important;
          }
        }

        /* Short screens - Reduce spacing */
        @media (max-height: 600px) {
          #hero-section {
            padding-top: 40px !important;
          }

          .hero-greeting {
            margin-bottom: 1rem !important;
          }

          .hero-subtitle {
            margin-bottom: 1.5rem !important;
          }
        }
      `}</style>

      <section
        id="hero-section"
        style={{
          background: 'transparent',
          fontFamily: 'Inter, sans-serif',
          padding: '6rem clamp(1.5rem, 3vw, 2.5rem) 3rem',
          paddingTop: '60px',
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {/* Centered Content Container */}
        <div
          className="hero-content"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Personalized Greeting - Integrated with Name */}
          <h1
            className="hero-greeting"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '200',
              lineHeight: '1.3',
              letterSpacing: '0.01em',
              marginBottom: '1.5rem',
              color: 'rgba(255, 255, 255, 0.95)',
              opacity: animationStage >= 1 ? 1 : 0,
              transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {greeting || "Hi, I'm Nihar. Welcome."}
          </h1>

          {/* Subtitle */}
          <div
            className="hero-subtitle"
            style={{
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: '2.5rem',
              opacity: animationStage >= 2 ? 1 : 0,
              transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.01em',
                lineHeight: '1.6',
              }}
            >
              Designing experiences that millions interact with daily, from 30,000ft to healthcare
            </p>
          </div>

          {/* Unified Glass Button Pair */}
          <div
            className="hero-buttons"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 2.5vw, 2rem)',
              flexWrap: 'wrap',
              opacity: animationStage >= 3 ? 1 : 0,
              transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            {/* Contact Button */}
            <a
              href="mailto:krishnaniharsunkara@gmail.com"
              onMouseEnter={() => setHoveredButton('contact')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '14px 28px',
                ...UNIFIED_GLASS,
                background: hoveredButton === 'contact' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: hoveredButton === 'contact' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.12)',
                borderRadius: '14px',
                color: 'rgba(255, 255, 255, 0.95)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredButton === 'contact' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                overflow: 'hidden',
              }}
            >
              {/* Refraction layer - Diagonal light reflection */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg,
                    rgba(255, 255, 255, 0.15) 0%,
                    transparent 40%,
                    transparent 60%,
                    rgba(255, 255, 255, 0.08) 100%)`,
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none',
                  opacity: hoveredButton === 'contact' ? 1 : 0.7,
                  transition: 'opacity 0.3s ease',
                }}
              />
              {/* Subtle shimmer on hover */}
              {hoveredButton === 'contact' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <Mail size={16} style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Contact</span>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/krishn404"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredButton('github')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '14px 28px',
                ...UNIFIED_GLASS,
                background: hoveredButton === 'github' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: hoveredButton === 'github' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.12)',
                borderRadius: '14px',
                color: 'rgba(255, 255, 255, 0.95)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredButton === 'github' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                overflow: 'hidden',
              }}
            >
              {/* Refraction layer - Diagonal light reflection */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg,
                    rgba(255, 255, 255, 0.15) 0%,
                    transparent 40%,
                    transparent 60%,
                    rgba(255, 255, 255, 0.08) 100%)`,
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none',
                  opacity: hoveredButton === 'github' ? 1 : 0.7,
                  transition: 'opacity 0.3s ease',
                }}
              />
              {/* Subtle shimmer on hover */}
              {hoveredButton === 'github' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <Github size={16} style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>GitHub</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={scrollToNext}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            opacity: mounted ? 0.6 : 0,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.6';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: '300',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              animation: 'scrollBounce 3s ease-in-out infinite',
            }}
          >
            <ChevronDown size={18} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
          </div>
        </div>
      </section>
    </>
  );
}
