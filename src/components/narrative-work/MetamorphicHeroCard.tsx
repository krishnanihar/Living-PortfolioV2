'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Atropos from 'atropos';
import 'atropos/css';

/**
 * Giant Metamorphic Fractal Reflections Hero Card with Atropos 3D Parallax Effect
 * Psychedelic / immersive art installation theme with purple brand color
 */
export function MetamorphicHeroCard() {
  const [isMobile, setIsMobile] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const atroposRef = useRef<HTMLDivElement>(null);
  const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);

  // Metamorphic brand color (RGB: 147, 51, 234 - purple)
  const brandRgb = '147, 51, 234';

  // Mobile detection - disable Atropos on touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Initialize Atropos 3D effect (desktop only)
  useEffect(() => {
    if (atroposRef.current && !isMobile) {
      atroposInstance.current = Atropos({
        el: atroposRef.current,
        activeOffset: 60,
        rotateXMax: 1,
        rotateYMax: 1,
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
  }, [isMobile]);

  return (
    <section
      style={{
        maxWidth: 'clamp(1200px, 90vw, 1400px)',
        margin: '0 auto 3rem auto',
        padding: '0 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        ref={atroposRef}
        className="atropos"
        style={{
          height: isMobile ? '85vh' : 'clamp(600px, 75vh, 800px)',
          width: '100%',
          position: 'relative',
          pointerEvents: 'auto',
        }}
      >
        <div className="atropos-scale" style={{ height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
          <div className="atropos-rotate" style={{ height: '100%', overflow: 'visible', pointerEvents: 'all' }}>
            <div
              className="atropos-inner"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                background: 'var(--bg-primary)',
                borderRadius: '24px',
                border: '1px solid var(--border-primary)',
              }}
            >
              {/* Giant Editorial Number - Parallax BACK */}
              <div
                data-atropos-offset="-8"
                style={{
                  position: 'absolute',
                  top: '6%',
                  left: '4%',
                  fontSize: isMobile ? '28vw' : 'clamp(180px, 22vw, 320px)',
                  fontWeight: '200',
                  color: `rgba(${brandRgb}, 0.15)`,
                  lineHeight: '0.85',
                  letterSpacing: '-0.05em',
                  pointerEvents: 'none',
                  zIndex: 5,
                  textShadow: `0 0 150px rgba(${brandRgb}, 0.3)`,
                }}
              >
                03
              </div>

              {/* LAYER 1: Gradient Background - Psychedelic/Fractal Theme */}
              <div
                data-atropos-offset="0"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  overflow: 'hidden',
                  borderRadius: '24px',
                  background: `
                    radial-gradient(ellipse at 20% 30%, rgba(${brandRgb}, 0.2) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 60%),
                    conic-gradient(from 180deg at 50% 50%, rgba(${brandRgb}, 0.05) 0deg, transparent 60deg, rgba(236, 72, 153, 0.05) 120deg, transparent 180deg, rgba(139, 92, 246, 0.05) 240deg, transparent 300deg, rgba(${brandRgb}, 0.05) 360deg),
                    linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)
                  `,
                }}
              />

              {/* LAYER 2: Abstract Fractal Pattern */}
              <div
                data-atropos-offset="-1"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  overflow: 'hidden',
                  borderRadius: '24px',
                  opacity: 0.5,
                }}
              >
                {/* Fractal/kaleidoscope inspired pattern */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="xMidYMid slice"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <defs>
                    <linearGradient id="fractalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={`rgba(${brandRgb}, 0.4)`} />
                      <stop offset="50%" stopColor="rgba(236, 72, 153, 0.3)" />
                      <stop offset="100%" stopColor="rgba(139, 92, 246, 0.2)" />
                    </linearGradient>
                    <linearGradient id="fractalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(236, 72, 153, 0.3)" />
                      <stop offset="100%" stopColor={`rgba(${brandRgb}, 0.2)`} />
                    </linearGradient>
                  </defs>
                  {/* Concentric hexagonal shapes suggesting fractals */}
                  <polygon points="200,50 350,125 350,275 200,350 50,275 50,125" fill="none" stroke="url(#fractalGrad1)" strokeWidth="0.5" opacity="0.6" />
                  <polygon points="200,80 320,140 320,260 200,320 80,260 80,140" fill="none" stroke="url(#fractalGrad1)" strokeWidth="0.4" opacity="0.5" />
                  <polygon points="200,110 290,155 290,245 200,290 110,245 110,155" fill="none" stroke="url(#fractalGrad2)" strokeWidth="0.3" opacity="0.4" />
                  <polygon points="200,140 260,170 260,230 200,260 140,230 140,170" fill="none" stroke="url(#fractalGrad2)" strokeWidth="0.3" opacity="0.3" />
                  {/* Radiating lines from center */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <line
                      key={i}
                      x1="200"
                      y1="200"
                      x2={200 + 180 * Math.cos((angle * Math.PI) / 180)}
                      y2={200 + 180 * Math.sin((angle * Math.PI) / 180)}
                      stroke="url(#fractalGrad1)"
                      strokeWidth="0.3"
                      opacity="0.3"
                    />
                  ))}
                </svg>
              </div>

              {/* LAYER 3: Floating Sparkle Icon */}
              <div
                data-atropos-offset="-2"
                style={{
                  position: 'absolute',
                  top: '15%',
                  right: '10%',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              >
                <Sparkles
                  size={isMobile ? 80 : 120}
                  strokeWidth={0.5}
                  style={{
                    color: `rgba(${brandRgb}, 0.25)`,
                    filter: `drop-shadow(0 0 40px rgba(${brandRgb}, 0.4))`,
                  }}
                />
              </div>

              {/* Gradient overlay for readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  background: `linear-gradient(180deg,
                    transparent 0%,
                    transparent 70%,
                    var(--overlay-40) 100%
                  )`,
                  pointerEvents: 'none',
                  zIndex: 4,
                }}
              />

              {/* Floating Glass Panel - Parallax FORWARD */}
              <div
                data-atropos-offset="4"
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '6%' : '3%',
                  right: isMobile ? '2%' : '2%',
                  width: isMobile ? '90%' : 'clamp(340px, 32vw, 420px)',
                  zIndex: 10,
                  background: `linear-gradient(135deg, var(--glass-04) 0%, var(--glass-02) 50%, var(--glass-03) 100%), var(--overlay-65)`,
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  borderRadius: '24px',
                  border: `1px solid rgba(${brandRgb}, 0.2)`,
                  padding: isMobile ? '1.75rem' : '2.25rem',
                  boxShadow: `
                    0 32px 64px var(--overlay-20),
                    0 0 0 1px var(--glass-05),
                    inset 0 1px 0 var(--glass-10),
                    0 0 80px rgba(${brandRgb}, 0.08)
                  `,
                  pointerEvents: 'auto',
                }}
              >
                {/* Category Tag */}
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
                      letterSpacing: '0.05em',
                    }}
                  >
                    NID 2023
                  </span>
                </div>

                {/* Project Title */}
                <h2
                  data-atropos-offset="2"
                  style={{
                    fontSize: isMobile ? '1.75rem' : '2.25rem',
                    fontWeight: '300',
                    color: 'var(--text-95)',
                    margin: '0 0 0.875rem 0',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1',
                  }}
                >
                  Metamorphic Fractal Reflections
                </h2>

                {/* Divider */}
                <div
                  style={{
                    width: '48px',
                    height: '2px',
                    background: `linear-gradient(90deg, rgba(${brandRgb}, 0.5), transparent)`,
                    marginBottom: '1rem',
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
                    margin: '0 0 1.25rem 0',
                  }}
                >
                  Immersive art installation exploring consciousness through generative fractals, real-time audio-reactive visuals, and psychedelic-informed design
                </p>

                {/* Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {['TouchDesigner', 'Stable Diffusion', 'VR'].map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: '500',
                        color: 'var(--text-50)',
                        background: 'var(--glass-05)',
                        border: '1px solid var(--text-10)',
                        borderRadius: '6px',
                        padding: '0.35rem 0.65rem',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href="/work/metamorphic-fractal-reflections"
                  draggable="false"
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    fontSize: '0.8125rem',
                    fontWeight: '500',
                    color: 'var(--text-95)',
                    background: isButtonHovered
                      ? `rgba(${brandRgb}, 0.15)`
                      : 'var(--glass-08)',
                    border: isButtonHovered
                      ? `1px solid rgba(${brandRgb}, 0.3)`
                      : '1px solid var(--text-15)',
                    borderRadius: '12px',
                    padding: '0.75rem 1.25rem',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    position: 'relative',
                    zIndex: 20,
                  }}
                >
                  View Case Study
                  <ArrowRight
                    size={16}
                    style={{
                      transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isButtonHovered ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
