'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import Atropos from 'atropos';
import 'atropos/css';
import { useMetamorphic } from './MetamorphicContext';
import { useAtroposGyroscope } from '@/hooks/useAtroposGyroscope';

/**
 * MetamorphicHero - Immersive Mirror Portal Entrance
 *
 * Full-viewport hero section with:
 * - Atropos 3D parallax effect (desktop)
 * - Mirror-themed visual layers
 * - Psychedelic gradient background
 * - Animated "tap to enter" indicator
 */

export function MetamorphicHero() {
  const { isMobile, scrollToSection, prefersReducedMotion, atmosphereColor } = useMetamorphic();
  const [isHovered, setIsHovered] = useState(false);
  const atroposRef = useRef<HTMLDivElement>(null);
  const rotateRef = useRef<HTMLDivElement>(null);
  const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);

  // Gyroscope for mobile (Android only)
  useAtroposGyroscope(rotateRef, {
    maxRotateX: 2,
    maxRotateY: 2,
    enabled: isMobile && !prefersReducedMotion,
  });

  // Brand color (purple - matches Metamorphic theme)
  const brandRgb = '147, 51, 234';

  // Initialize Atropos 3D effect (desktop only)
  useEffect(() => {
    if (atroposRef.current && !isMobile && !prefersReducedMotion) {
      atroposInstance.current = Atropos({
        el: atroposRef.current,
        activeOffset: 60,
        rotateXMax: 2,
        rotateYMax: 2,
        shadow: false,
        highlight: false,
        duration: 600,
      });
    }

    return () => {
      if (atroposInstance.current) {
        atroposInstance.current.destroy();
      }
    };
  }, [isMobile, prefersReducedMotion]);

  const handleEnter = () => {
    scrollToSection('act-one');
  };

  return (
    <section
      id="metamorphic-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '80px 1rem' : '100px 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Hero background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(${brandRgb}, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 40%)
          `,
          zIndex: 1,
        }}
      />

      {/* Atropos container */}
      <div
        ref={atroposRef}
        className="atropos"
        style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : 'clamp(800px, 80vw, 1200px)',
          height: isMobile ? 'auto' : 'clamp(500px, 70vh, 700px)',
          minHeight: isMobile ? '70vh' : 'auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="atropos-scale" style={{ height: '100%', overflow: 'visible' }}>
          <div ref={rotateRef} className="atropos-rotate" style={{ height: '100%', overflow: 'visible' }}>
            <div
              className="atropos-inner"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                background: 'var(--bg-primary)',
                borderRadius: '32px',
                border: '1px solid var(--border-primary)',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Layer 1: Base gradient background */}
              <div
                data-atropos-offset="0"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '32px',
                  background: `
                    radial-gradient(ellipse at 30% 30%, rgba(${brandRgb}, 0.2) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                    conic-gradient(from 180deg at 50% 50%,
                      rgba(${brandRgb}, 0.05) 0deg,
                      transparent 60deg,
                      rgba(236, 72, 153, 0.05) 120deg,
                      transparent 180deg,
                      rgba(139, 92, 246, 0.05) 240deg,
                      transparent 300deg,
                      rgba(${brandRgb}, 0.05) 360deg
                    ),
                    linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)
                  `,
                  zIndex: 1,
                }}
              />

              {/* Layer 2: Hexagon fractal pattern */}
              <div
                data-atropos-offset="-1"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  opacity: 0.5,
                  borderRadius: '32px',
                  overflow: 'hidden',
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="xMidYMid slice"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <defs>
                    <linearGradient id="metamorphic-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={`rgba(${brandRgb}, 0.4)`} />
                      <stop offset="50%" stopColor="rgba(236, 72, 153, 0.3)" />
                      <stop offset="100%" stopColor="rgba(0, 255, 255, 0.2)" />
                    </linearGradient>
                  </defs>
                  {/* Concentric hexagons */}
                  <polygon points="200,50 350,125 350,275 200,350 50,275 50,125" fill="none" stroke="url(#metamorphic-grad)" strokeWidth="0.5" opacity="0.6" />
                  <polygon points="200,80 320,140 320,260 200,320 80,260 80,140" fill="none" stroke="url(#metamorphic-grad)" strokeWidth="0.4" opacity="0.5" />
                  <polygon points="200,110 290,155 290,245 200,290 110,245 110,155" fill="none" stroke="url(#metamorphic-grad)" strokeWidth="0.3" opacity="0.4" />
                  <polygon points="200,140 260,170 260,230 200,260 140,230 140,170" fill="none" stroke="url(#metamorphic-grad)" strokeWidth="0.3" opacity="0.3" />
                  {/* Radiating lines */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <line
                      key={i}
                      x1="200"
                      y1="200"
                      x2={200 + 180 * Math.cos((angle * Math.PI) / 180)}
                      y2={200 + 180 * Math.sin((angle * Math.PI) / 180)}
                      stroke="url(#metamorphic-grad)"
                      strokeWidth="0.3"
                      opacity="0.25"
                    />
                  ))}
                </svg>
              </div>

              {/* Layer 3: Mirror shimmer effect */}
              <div
                data-atropos-offset="-2"
                style={{
                  position: 'absolute',
                  inset: '20%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1), transparent 50%)`,
                  filter: 'blur(40px)',
                  opacity: isHovered ? 0.6 : 0.3,
                  transition: 'opacity 0.5s ease-out',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              />

              {/* Layer 4: Floating icon */}
              <div
                data-atropos-offset="-3"
                style={{
                  position: 'absolute',
                  top: isMobile ? '10%' : '12%',
                  right: isMobile ? '8%' : '12%',
                  zIndex: 4,
                  pointerEvents: 'none',
                }}
              >
                <Sparkles
                  size={isMobile ? 60 : 100}
                  strokeWidth={0.5}
                  style={{
                    color: `rgba(${brandRgb}, 0.25)`,
                    filter: `drop-shadow(0 0 40px rgba(${brandRgb}, 0.4))`,
                    animation: prefersReducedMotion ? 'none' : 'sparkle-pulse 3s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Layer 5: Editorial number */}
              <div
                data-atropos-offset="-8"
                style={{
                  position: 'absolute',
                  top: '8%',
                  left: '6%',
                  fontSize: isMobile ? '20vw' : 'clamp(120px, 18vw, 240px)',
                  fontWeight: '200',
                  color: `rgba(${brandRgb}, 0.12)`,
                  lineHeight: '0.85',
                  letterSpacing: '-0.05em',
                  pointerEvents: 'none',
                  zIndex: 5,
                  textShadow: `0 0 100px rgba(${brandRgb}, 0.3)`,
                }}
              >
                03
              </div>

              {/* Content panel */}
              <div
                data-atropos-offset="4"
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '5%' : '8%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isMobile ? '90%' : 'clamp(400px, 60%, 700px)',
                  zIndex: 10,
                  background: `linear-gradient(135deg, var(--glass-04) 0%, var(--glass-02) 50%, var(--glass-03) 100%), var(--overlay-65)`,
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  borderRadius: '24px',
                  border: `1px solid rgba(${brandRgb}, 0.2)`,
                  padding: isMobile ? '2rem' : '2.5rem',
                  boxShadow: `
                    0 32px 64px var(--overlay-20),
                    0 0 0 1px var(--glass-05),
                    inset 0 1px 0 var(--glass-10),
                    0 0 80px rgba(${brandRgb}, 0.1)
                  `,
                  textAlign: 'center',
                }}
              >
                {/* Category */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--text-50)',
                    }}
                  >
                    Immersive Installation
                  </span>
                  <span style={{ color: 'var(--text-25)', fontSize: '0.65rem' }}>•</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: '500',
                      color: 'var(--text-50)',
                    }}
                  >
                    NID 2023
                  </span>
                </div>

                {/* Title */}
                <h1
                  style={{
                    fontSize: isMobile ? 'clamp(1.75rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: '300',
                    color: 'var(--text-95)',
                    margin: '0 0 0.75rem 0',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1',
                  }}
                >
                  Metamorphic Fractal Reflections
                </h1>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    fontWeight: '300',
                    color: 'var(--text-70)',
                    margin: '0 0 1rem 0',
                    fontStyle: 'italic',
                  }}
                >
                  A Psychedelic Journey towards Ego Death
                </p>

                {/* Divider */}
                <div
                  style={{
                    width: '60px',
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, rgba(${brandRgb}, 0.5), transparent)`,
                    margin: '0 auto 1rem auto',
                    borderRadius: '1px',
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontSize: isMobile ? '0.875rem' : '0.9375rem',
                    fontWeight: '300',
                    lineHeight: '1.7',
                    color: 'var(--text-60)',
                    margin: '0 0 1.5rem 0',
                    maxWidth: '500px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  Step through the mirror and dissolve into a multiverse of liquid color,
                  pattern-creatures, and structureless music.
                </p>

                {/* CTA Button */}
                <button
                  onClick={handleEnter}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-95)',
                    background: isHovered
                      ? `rgba(${brandRgb}, 0.2)`
                      : 'var(--glass-08)',
                    border: isHovered
                      ? `1px solid rgba(${brandRgb}, 0.4)`
                      : '1px solid var(--text-15)',
                    borderRadius: '100px',
                    padding: '0.875rem 2rem',
                    cursor: 'pointer',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Enter the Portal
                  <ChevronDown
                    size={18}
                    style={{
                      transition: 'transform 300ms ease',
                      transform: isHovered ? 'translateY(3px)' : 'translateY(0)',
                      animation: prefersReducedMotion ? 'none' : 'bounce-down 2s ease-in-out infinite',
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes sparkle-pulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
      `}</style>
    </section>
  );
}

export default MetamorphicHero;
