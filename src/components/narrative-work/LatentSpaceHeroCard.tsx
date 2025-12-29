'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain } from 'lucide-react';
import Atropos from 'atropos';
import 'atropos/css';
import { useAtroposGyroscope } from '@/hooks/useAtroposGyroscope';

/**
 * Giant Latent Space Hero Card with Atropos 3D Parallax Effect
 * Consciousness / speculative design / dream theme with violet brand color
 */
export function LatentSpaceHeroCard() {
  const [isMobile, setIsMobile] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const atroposRef = useRef<HTMLDivElement>(null);
  const rotateRef = useRef<HTMLDivElement>(null);
  const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);

  // Gyroscope for mobile (Android only)
  useAtroposGyroscope(rotateRef, {
    maxRotateX: 1,
    maxRotateY: 1,
    enabled: isMobile,
  });

  // Latent Space brand color (RGB: 139, 92, 246 - violet)
  const brandRgb = '139, 92, 246';

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
          <div ref={rotateRef} className="atropos-rotate" style={{ height: '100%', overflow: 'visible', pointerEvents: 'all' }}>
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
                04
              </div>

              {/* LAYER 1: Gradient Background - Consciousness/Dream Theme */}
              <div
                data-atropos-offset="0"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  overflow: 'hidden',
                  borderRadius: '24px',
                  background: `
                    radial-gradient(ellipse at 25% 25%, rgba(${brandRgb}, 0.2) 0%, transparent 50%),
                    radial-gradient(ellipse at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 60%),
                    radial-gradient(circle at 80% 20%, rgba(${brandRgb}, 0.08) 0%, transparent 30%),
                    linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)
                  `,
                }}
              />

              {/* LAYER 2: Abstract Neural/Dream Pattern */}
              <div
                data-atropos-offset="-1"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  overflow: 'hidden',
                  borderRadius: '24px',
                  opacity: 0.45,
                }}
              >
                {/* Neural network / consciousness inspired pattern */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="xMidYMid slice"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <defs>
                    <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={`rgba(${brandRgb}, 0.4)`} />
                      <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
                      <stop offset="100%" stopColor="rgba(147, 51, 234, 0.2)" />
                    </linearGradient>
                    <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={`rgba(${brandRgb}, 0.6)`} />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                  {/* Neural nodes */}
                  <circle cx="100" cy="100" r="4" fill="url(#nodeGlow)" />
                  <circle cx="200" cy="80" r="5" fill="url(#nodeGlow)" />
                  <circle cx="300" cy="120" r="4" fill="url(#nodeGlow)" />
                  <circle cx="150" cy="200" r="6" fill="url(#nodeGlow)" />
                  <circle cx="250" cy="220" r="4" fill="url(#nodeGlow)" />
                  <circle cx="350" cy="200" r="5" fill="url(#nodeGlow)" />
                  <circle cx="80" cy="280" r="4" fill="url(#nodeGlow)" />
                  <circle cx="180" cy="320" r="5" fill="url(#nodeGlow)" />
                  <circle cx="280" cy="300" r="4" fill="url(#nodeGlow)" />
                  <circle cx="380" cy="340" r="3" fill="url(#nodeGlow)" />
                  {/* Neural connections */}
                  <path d="M100,100 Q150,150 200,80" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.5" opacity="0.5" />
                  <path d="M200,80 Q250,100 300,120" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.4" opacity="0.4" />
                  <path d="M150,200 Q200,180 250,220" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.5" opacity="0.5" />
                  <path d="M100,100 Q125,150 150,200" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.4" opacity="0.4" />
                  <path d="M300,120 Q325,160 350,200" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.4" opacity="0.4" />
                  <path d="M80,280 Q130,300 180,320" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.5" opacity="0.5" />
                  <path d="M250,220 Q265,260 280,300" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.4" opacity="0.4" />
                  {/* Orbital rings suggesting consciousness */}
                  <ellipse cx="200" cy="200" rx="150" ry="60" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.3" opacity="0.25" transform="rotate(-20, 200, 200)" />
                  <ellipse cx="200" cy="200" rx="120" ry="45" fill="none" stroke="url(#neuralGrad)" strokeWidth="0.3" opacity="0.2" transform="rotate(25, 200, 200)" />
                </svg>
              </div>

              {/* LAYER 3: Floating Brain Icon */}
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
                <Brain
                  size={isMobile ? 80 : 120}
                  strokeWidth={0.5}
                  style={{
                    color: `rgba(${brandRgb}, 0.2)`,
                    filter: `drop-shadow(0 0 40px rgba(${brandRgb}, 0.3))`,
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
                    Speculative Design
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
                    2024
                  </span>
                </div>

                {/* Project Title */}
                <h2
                  data-atropos-offset="2"
                  style={{
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    fontWeight: '300',
                    color: 'var(--text-95)',
                    margin: '0 0 0.875rem 0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Latent Space
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
                  A speculative design fiction exploring dream recording technology, consciousness capture, and the ethics of accessing the sleeping mind
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
                  {['Speculative Design', 'EEG/Biometrics', 'Ethics'].map((tag, i) => (
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
                  href="/work/latent-space"
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
