'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail, Github, ArrowRight, X, Sun, Moon, Hand, Sparkles } from 'lucide-react';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import {
  initializeVisit,
  clearScrollMemory,
  type PersonalizationData,
  type GreetingIcon,
} from '@/lib/personalization';

// Ultra-Liquid Glass Style - iOS 26 Inspired (More Translucent)
const UNIFIED_GLASS = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  border: '1px solid rgba(255, 255, 255, 0.10)',
  boxShadow: `
    0 12px 48px rgba(0, 0, 0, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.10),
    inset 0 1px 2px rgba(255, 255, 255, 0.25),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15)
  `,
};

// Particle Colors - From GPGPU System
const PARTICLE_COLORS = {
  blue: 'rgba(59, 130, 246, 0.95)',    // #3B82F6
  purple: 'rgba(139, 92, 246, 0.95)',  // #8B5CF6
  pink: 'rgba(236, 72, 153, 0.95)',    // #EC4899
};

export function IntroductionSection() {
  const { scrollTo } = useLenisScroll();
  const [hoveredButton, setHoveredButton] = useState<'contact' | 'github' | null>(null);
  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [personalization, setPersonalization] = useState<PersonalizationData | null>(null);
  const [showScrollPill, setShowScrollPill] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Initialize personalization system
    const data = initializeVisit();
    setPersonalization(data);

    // Staggered animation stages
    const stages = [1, 2, 3, 4]; // Added stage 4 for project trail
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 100);
    });
  }, []);

  // Dismiss scroll memory pill and clear the memory
  const dismissScrollPill = () => {
    setShowScrollPill(false);
    clearScrollMemory();
  };

  // Compose the greeting display
  const getGreetingDisplay = () => {
    if (!personalization) {
      return {
        opener: 'Good afternoon.',
        icon: 'hand' as GreetingIcon,
        message: "I'm Nihar.",
        secondary: 'Welcome.',
      };
    }
    return personalization.greeting;
  };

  const greetingDisplay = getGreetingDisplay();

  // Render the appropriate icon based on greeting context
  const renderGreetingIcon = (icon: GreetingIcon) => {
    const iconProps = { size: 14, style: { opacity: 0.7 } };
    switch (icon) {
      case 'hand':
        return <Hand {...iconProps} />;
      case 'sun':
        return <Sun {...iconProps} />;
      case 'moon':
        return <Moon {...iconProps} />;
      case 'sparkles':
        return <Sparkles {...iconProps} />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  const scrollToNext = () => {
    // Use Lenis for buttery smooth scroll to about section
    scrollTo('#act-1-philosophy', { offset: -60, duration: 1.5 });
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

        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes particleGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.1), 0 0 40px rgba(139, 92, 246, 0.05);
          }
          50% {
            text-shadow: 0 0 24px rgba(236, 72, 153, 0.12), 0 0 48px rgba(236, 72, 153, 0.06);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.005);
          }
        }

        @keyframes buttonGlow {
          0%, 100% {
            box-shadow:
              0 12px 48px rgba(0, 0, 0, 0.15),
              0 4px 16px rgba(0, 0, 0, 0.10),
              inset 0 1px 2px rgba(255, 255, 255, 0.25),
              inset 0 -1px 2px rgba(0, 0, 0, 0.15),
              0 0 20px rgba(139, 92, 246, 0.08);
          }
          50% {
            box-shadow:
              0 12px 48px rgba(0, 0, 0, 0.15),
              0 4px 16px rgba(0, 0, 0, 0.10),
              inset 0 1px 2px rgba(255, 255, 255, 0.25),
              inset 0 -1px 2px rgba(0, 0, 0, 0.15),
              0 0 24px rgba(236, 72, 153, 0.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-greeting,
          .hero-subtitle,
          .hero-buttons a {
            animation: none !important;
          }
        }

        /* Mobile - Small screens (<640px) */
        @media (max-width: 640px) {
          .hero-content {
            text-align: center !important;
          }

          .hero-greeting {
            font-size: clamp(1.5rem, 5.5vw, 1.875rem) !important;
          }

          .hero-subtitle {
            font-size: clamp(0.8125rem, 1.75vw, 0.9375rem) !important;
          }

          .hero-buttons {
            flex-direction: column !important;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
            gap: 0.875rem !important;
          }

          .hero-buttons a {
            width: 100% !important;
            justify-content: center !important;
            padding: 11px 22px !important;
            font-size: 0.875rem !important;
            min-height: 48px;
          }
        }

        /* Tablet (640px - 1024px) */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero-greeting {
            font-size: clamp(1.75rem, 4vw, 2.5rem) !important;
          }

          .hero-subtitle {
            font-size: clamp(0.9375rem, 1.75vw, 1.0625rem) !important;
          }

          .hero-buttons {
            gap: 1.125rem !important;
          }

          .hero-buttons a {
            max-width: 280px;
            padding: 12px 24px !important;
            font-size: 0.875rem !important;
          }
        }

        /* Small Laptop (1024px - 1440px) */
        @media (min-width: 1025px) and (max-width: 1440px) {
          .hero-greeting {
            font-size: clamp(2.125rem, 4vw, 2.875rem) !important;
          }

          .hero-subtitle {
            font-size: clamp(0.9375rem, 1.75vw, 1.0625rem) !important;
          }

          .hero-buttons {
            gap: 1.375rem !important;
          }

          .hero-buttons a {
            max-width: 300px;
            padding: 13px 26px !important;
            font-size: 0.875rem !important;
          }
        }

        /* Desktop (1440px - 1920px) */
        @media (min-width: 1441px) and (max-width: 1920px) {
          .hero-greeting {
            font-size: clamp(2.5rem, 3.5vw, 3.25rem) !important;
          }

          .hero-subtitle {
            font-size: clamp(1rem, 1.75vw, 1.125rem) !important;
          }

          .hero-buttons {
            gap: 1.75rem !important;
          }

          .hero-buttons a {
            padding: 13px 28px !important;
            font-size: 0.875rem !important;
          }
        }

        /* Large Desktop (>1920px) */
        @media (min-width: 1921px) {
          .hero-greeting {
            font-size: 3.5rem !important;
          }

          .hero-subtitle {
            font-size: 1.125rem !important;
          }

          .hero-buttons {
            gap: 2rem !important;
          }

          .hero-buttons a {
            padding: 14px 32px !important;
            font-size: 0.875rem !important;
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
          {/* Opener Greeting - Small, Subtle with Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.6)',
              letterSpacing: '0.02em',
              marginBottom: '0.5rem',
              opacity: animationStage >= 1 ? 1 : 0,
              transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
              filter: animationStage >= 1 ? 'blur(0)' : 'blur(8px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {renderGreetingIcon(greetingDisplay.icon)}
            <span>{greetingDisplay.opener}</span>
          </div>

          {/* Main Greeting Message - Always "I'm Nihar." */}
          <h1
            className="hero-greeting"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: '200',
              lineHeight: '1.3',
              letterSpacing: '0.02em',
              marginBottom: greetingDisplay.secondary ? '0.75rem' : '1.5rem',
              color: 'rgba(255, 255, 255, 0.95)',
              position: 'relative',
              animation: 'particleGlow 12s ease-in-out infinite, breathe 15s ease-in-out infinite',
              opacity: animationStage >= 1 ? 1 : 0,
              transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
              filter: animationStage >= 1 ? 'blur(0)' : 'blur(12px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
            }}
          >
            <span
              style={{
                position: 'relative',
                background: `linear-gradient(120deg,
                  rgba(59, 130, 246, 0.15),
                  rgba(139, 92, 246, 0.15),
                  rgba(236, 72, 153, 0.15),
                  rgba(139, 92, 246, 0.15),
                  rgba(59, 130, 246, 0.15))`,
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                animation: 'gradientFlow 20s ease-in-out infinite',
              }}
            >
              {greetingDisplay.message}
            </span>
          </h1>

          {/* Secondary Message (Welcome / Good to see you / etc.) */}
          {greetingDisplay.secondary && (
            <div
              style={{
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.6)',
                letterSpacing: '0.01em',
                marginBottom: '1.5rem',
                opacity: animationStage >= 1 ? 1 : 0,
                transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(15px)',
                filter: animationStage >= 1 ? 'blur(0)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
              }}
            >
              {greetingDisplay.secondary}
            </div>
          )}

          {/* Subtitle */}
          <div
            className="hero-subtitle"
            style={{
              maxWidth: '650px',
              margin: '0 auto',
              marginBottom: '2.5rem',
              opacity: animationStage >= 2 ? 1 : 0,
              transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
              filter: animationStage >= 2 ? 'blur(0)' : 'blur(10px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.9375rem, 1.75vw, 1.125rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.65)',
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
              filter: animationStage >= 3 ? 'blur(0)' : 'blur(8px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            {/* Contact Button - Liquid Glass with Subtle Pink Reflection */}
            <a
              href="mailto:krishnaniharsunkara@gmail.com"
              onMouseEnter={() => setHoveredButton('contact')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '13px 26px',
                ...UNIFIED_GLASS,
                background: hoveredButton === 'contact'
                  ? `linear-gradient(135deg, rgba(236, 72, 153, 0.04), rgba(139, 92, 246, 0.03))`
                  : `linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(139, 92, 246, 0.02))`,
                borderColor: hoveredButton === 'contact' ? 'rgba(236, 72, 153, 0.12)' : 'rgba(236, 72, 153, 0.08)',
                borderRadius: '20px',
                color: 'rgba(255, 255, 255, 0.95)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredButton === 'contact' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                overflow: 'hidden',
                animation: hoveredButton === 'contact' ? 'buttonGlow 8s ease-in-out infinite' : 'none',
              }}
            >
              {/* Refraction layer - Diagonal light reflection */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg,
                    rgba(236, 72, 153, 0.08) 0%,
                    transparent 40%,
                    transparent 60%,
                    rgba(139, 92, 246, 0.05) 100%)`,
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none',
                  opacity: hoveredButton === 'contact' ? 1 : 0.5,
                  transition: 'opacity 0.3s ease',
                }}
              />
              {/* Subtle shimmer on hover */}
              {hoveredButton === 'contact' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(236, 72, 153, 0.08) 50%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <Mail size={15} style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Contact</span>
            </a>

            {/* GitHub Button - Liquid Glass with Subtle Blue Reflection */}
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
                padding: '13px 26px',
                ...UNIFIED_GLASS,
                background: hoveredButton === 'github'
                  ? `linear-gradient(135deg, rgba(59, 130, 246, 0.04), rgba(139, 92, 246, 0.03))`
                  : `linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(139, 92, 246, 0.02))`,
                borderColor: hoveredButton === 'github' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.08)',
                borderRadius: '20px',
                color: 'rgba(255, 255, 255, 0.95)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredButton === 'github' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                overflow: 'hidden',
                animation: hoveredButton === 'github' ? 'buttonGlow 8s ease-in-out infinite' : 'none',
              }}
            >
              {/* Refraction layer - Diagonal light reflection */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg,
                    rgba(59, 130, 246, 0.08) 0%,
                    transparent 40%,
                    transparent 60%,
                    rgba(139, 92, 246, 0.05) 100%)`,
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none',
                  opacity: hoveredButton === 'github' ? 1 : 0.5,
                  transition: 'opacity 0.3s ease',
                }}
              />
              {/* Subtle shimmer on hover */}
              {hoveredButton === 'github' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <Github size={15} style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>GitHub</span>
            </a>
          </div>

        </div>

        {/* Scroll Memory Pill - Floating CTA for returning visitors */}
        {showScrollPill && personalization?.scrollMemory.hasHistory && personalization.scrollMemory.lastProjectName && (
          <Link
            href={`/work/${personalization.scrollMemory.lastProject}`}
            style={{
              position: 'absolute',
              bottom: '7rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '12px 20px',
              ...UNIFIED_GLASS,
              background: 'rgba(139, 92, 246, 0.06)',
              borderColor: 'rgba(139, 92, 246, 0.15)',
              borderRadius: '20px',
              color: 'rgba(255, 255, 255, 0.85)',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              fontWeight: '400',
              cursor: 'pointer',
              opacity: animationStage >= 4 ? 1 : 0,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 15,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-50%) scale(1.02)';
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.06)';
            }}
          >
            {/* Top row: Continue → Project Name [X] */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Continue</span>
              <ArrowRight size={14} style={{ opacity: 0.7 }} />
              <span style={{ fontWeight: '500' }}>{personalization.scrollMemory.lastProjectName}</span>
              <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dismissScrollPill();
              }}
              style={{
                marginLeft: '0.25rem',
                padding: '2px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <X size={14} />
            </button>
            </div>
            {/* Bottom row: X projects explored */}
            {personalization.projectTrail.viewed > 0 && (
              <span style={{ opacity: 0.5, fontSize: '0.6875rem', letterSpacing: '0.02em' }}>
                {personalization.projectTrail.viewed} of {personalization.projectTrail.total} projects explored
              </span>
            )}
          </Link>
        )}

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
