'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Atropos from 'atropos';
import 'atropos/css';

/**
 * Giant Air India Hero Card with Atropos 3D Parallax Effect
 * Containerized version of the full-screen card from AboutSectionV2.tsx
 * Displays above the "Six Systems" grid in the work page
 */
export function AirIndiaHeroCard() {
  // State management
  const [isMobile, setIsMobile] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const atroposRef = useRef<HTMLDivElement>(null);
  const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);

  // Air India brand color (RGB: 218, 14, 41)
  const brandRgb = '218, 14, 41';

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
        activeOffset: 60,     // Mouse must be 60px from edge to activate
        rotateXMax: 1,        // Maximum 1 degree tilt on X axis
        rotateYMax: 1,        // Maximum 1 degree tilt on Y axis
        shadow: false,        // No automatic shadow
        highlight: false,     // No automatic highlight
        duration: 600,        // 600ms transition duration
      });
    }

    // Cleanup on unmount
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
        padding: isMobile ? '0 0.5rem' : '0 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Atropos wrapper - hover triggers within card boundaries */}
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
            {/* Visual card with background/border - sized to original dimensions */}
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
                  01
                </div>

                {/* LAYER 1: Sky Background - Static, no parallax movement */}
                <div
                  data-atropos-offset="0"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    overflow: 'hidden',
                    borderRadius: '24px',
                  }}
                >
                  <Image
                    src="/images/home/hero-sky.png"
                    alt="Sky background"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transform: 'scale(1.3)',
                    }}
                    quality={95}
                    priority
                  />
                </div>

                {/* LAYER 2: Clouds - Static, no parallax movement */}
                <div
                  data-atropos-offset="0"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    overflow: 'hidden',
                    borderRadius: '24px',
                  }}
                >
                  <Image
                    src="/images/home/hero-clouds.png"
                    alt="Clouds"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transform: 'scale(1.3)',
                    }}
                    quality={95}
                  />
                </div>

                {/* LAYER 3: Aircraft - breaks out of card, behind glass panel */}
                <div
                  data-atropos-offset="-2"
                  style={{
                    position: 'absolute',
                    inset: '-15%',
                    zIndex: 3,
                    overflow: 'visible',
                    pointerEvents: 'none',
                  }}
                >
                  <Image
                    src="/images/home/hero-aircraft.png"
                    alt="Air India Aircraft"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transform: 'scale(1.15)',
                    }}
                    quality={95}
                  />
                </div>

                {/* Gradient overlay for readability - clips to card */}
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
                    left: isMobile ? '0.5rem' : 'auto',
                    right: isMobile ? '0.5rem' : '2%',
                    width: isMobile ? 'auto' : 'clamp(340px, 32vw, 420px)',
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
                      Aviation Design System
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

                  {/* Air India Logo */}
                  <div
                    data-atropos-offset="2"
                    style={{ margin: '0 0 0.875rem 0' }}
                  >
                    <Image
                      src="/logos/air-india.svg"
                      alt="Air India"
                      width={180}
                      height={64}
                      style={{
                        objectFit: 'contain',
                        opacity: 0.95,
                      }}
                    />
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      width: '48px',
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--text-20), transparent)',
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
                    Designing experiences for millions of passengers at 30,000ft across mobile app and in-flight entertainment systems
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
                    {['Design System', 'React', 'Aviation'].map((tag, i) => (
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

                  {/* CTA Button - No atropos-offset to ensure clickability */}
                  <Link
                    href="/work/air-india"
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
