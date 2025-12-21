'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Atropos from 'atropos';
import 'atropos/css';

/**
 * Giant Cleara Hero Card with Atropos 3D Parallax Effect
 * Watercolor aesthetic with cream canvas and lavender accents
 * Displays in the work narrative page
 */
export function ClearaHeroCard() {
  // State management
  const [isMobile, setIsMobile] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const atroposRef = useRef<HTMLDivElement>(null);
  const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);

  // Cleara brand colors
  const lavenderRgb = '139, 157, 195';
  const creamCanvas = '#FAF8F5';

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
      {/* Atropos wrapper */}
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
            {/* Visual card with cream background */}
            <div
              className="atropos-inner"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                background: creamCanvas,
                borderRadius: '24px',
                border: `1px solid rgba(${lavenderRgb}, 0.3)`,
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
                  color: `rgba(${lavenderRgb}, 0.15)`,
                  lineHeight: '0.85',
                  letterSpacing: '-0.05em',
                  pointerEvents: 'none',
                  zIndex: 5,
                  textShadow: `0 0 150px rgba(${lavenderRgb}, 0.3)`,
                }}
              >
                02
              </div>

              {/* LAYER 1: Background */}
              <div
                data-atropos-offset="-10"
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  zIndex: 1,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/images/cleara/cleara_bg.png"
                  alt=""
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: 'scale(1.2)',
                  }}
                  quality={95}
                  priority
                />
              </div>

              {/* LAYER 2: Features - Middle */}
              <div
                data-atropos-offset="0"
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  zIndex: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/images/cleara/cleara_features.png"
                  alt="Cleara Features"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transform: 'scale(0.9)',
                  }}
                  quality={95}
                  priority
                />
              </div>

              {/* LAYER 3: Phone - Foreground */}
              <div
                data-atropos-offset="5"
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  zIndex: 3,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/images/cleara/cleara_phone.png"
                  alt="Cleara App"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transform: 'scale(0.75)',
                  }}
                  quality={95}
                  priority
                />
              </div>

              {/* Glass Info Panel - Parallax FORWARD */}
              <div
                data-atropos-offset="4"
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '6%' : '10%',
                  right: isMobile ? '4%' : '6%',
                  zIndex: 10,
                  width: isMobile ? 'calc(100% - 8%)' : 'clamp(320px, 26vw, 400px)',
                  padding: isMobile ? '1.5rem' : '2rem 2.5rem',
                  pointerEvents: 'auto',
                  // Cream-tinted glassmorphism
                  background: `
                    linear-gradient(135deg,
                      rgba(250, 248, 245, 0.90) 0%,
                      rgba(250, 248, 245, 0.80) 50%,
                      rgba(250, 248, 245, 0.85) 100%
                    )
                  `,
                  backdropFilter: 'blur(60px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                  borderRadius: '28px',
                  border: `1px solid rgba(${lavenderRgb}, 0.25)`,
                  boxShadow: `
                    0 40px 80px rgba(0, 0, 0, 0.12),
                    0 20px 40px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9),
                    0 0 80px rgba(${lavenderRgb}, 0.08)
                  `,
                  textAlign: 'left',
                  overflow: 'hidden',
                }}
              >
                {/* Category Tag */}
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '0.6875rem',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(45, 45, 55, 0.6)',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                  }}
                >
                  Digital Therapeutic &middot; 2024
                </div>

                {/* Title - Serif for Cleara */}
                <h2
                  style={{
                    fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 2vw, 1.875rem)',
                    fontWeight: '500',
                    color: 'rgba(45, 45, 55, 0.95)',
                    marginBottom: '0.875rem',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                  }}
                >
                  Cleara
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: isMobile ? '0.875rem' : '0.9375rem',
                    lineHeight: '1.65',
                    color: 'rgba(45, 45, 55, 0.75)',
                    marginBottom: '1.5rem',
                  }}
                >
                  AI-powered psoriasis digital therapeutic with watercolor healing aesthetic, ghost overlay innovation, and clinical-grade PASI scoring.
                </p>

                {/* Tech Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {['React Native', 'TensorFlow', 'iOS', 'Clinical AI'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.6875rem',
                        padding: '0.375rem 0.75rem',
                        background: `rgba(${lavenderRgb}, 0.12)`,
                        border: `1px solid rgba(${lavenderRgb}, 0.25)`,
                        borderRadius: '12px',
                        color: 'rgba(45, 45, 55, 0.8)',
                        fontWeight: '500',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href="/work/cleara"
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.375rem',
                    fontSize: '0.8125rem',
                    fontWeight: '500',
                    color: 'rgba(45, 45, 55, 0.95)',
                    background: isButtonHovered
                      ? `rgba(${lavenderRgb}, 0.25)`
                      : `rgba(${lavenderRgb}, 0.15)`,
                    border: `1px solid rgba(${lavenderRgb}, ${isButtonHovered ? '0.5' : '0.35'})`,
                    borderRadius: '14px',
                    textDecoration: 'none',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isButtonHovered ? 'translateY(-1px)' : 'translateY(0)',
                    boxShadow: isButtonHovered
                      ? `0 8px 24px rgba(${lavenderRgb}, 0.2)`
                      : 'none',
                  }}
                >
                  View Case Study
                  <ArrowRight
                    size={14}
                    style={{
                      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isButtonHovered ? 'translateX(2px)' : 'translateX(0)',
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
