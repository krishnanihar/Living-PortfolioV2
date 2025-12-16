'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Atropos from 'atropos';
import 'atropos/css';
import Link from 'next/link';

export function PsoriAssistHeroCard() {
  const [isMobile, setIsMobile] = useState(false);
  const atroposRef = useRef<HTMLDivElement>(null);
  const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize Atropos 3D effect
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

  if (isMobile) {
    return <MobileView />;
  }

  return (
    <div style={{
      height: '75vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: '#000',
      borderRadius: '24px',
    }}>
      {/* Atropos Container */}
      <div
        ref={atroposRef}
        className="atropos"
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        <div className="atropos-scale" style={{ height: '100%', pointerEvents: 'none' }}>
          <div className="atropos-rotate" style={{ height: '100%', pointerEvents: 'none' }}>
            <div className="atropos-inner" style={{ width: '100%', height: '100%', position: 'relative' }}>
              {/* Editorial Number "02" (behind everything) */}
              <div
                data-atropos-offset="-8"
                style={{
                  position: 'absolute',
                  top: '15%',
                  left: '5%',
                  fontSize: 'clamp(220px, 30vw, 450px)',
                  fontWeight: 200,
                  color: 'rgba(80, 200, 120, 0.15)', // Success green
                  lineHeight: 1,
                  pointerEvents: 'none',
                  textShadow: '0 0 150px rgba(80, 200, 120, 0.3)',
                  zIndex: 5,
                }}
              >
                02
              </div>

              {/* Background Layer */}
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
                  src="/images/Psori_back.png"
                  alt=""
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: 'scale(1.2)'
                  }}
                  priority
                  quality={95}
                />
              </div>

              {/* Hero iPhone Layer (center, no parallax) */}
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
                  src="/images/Psori_front.png"
                  alt="PsoriAssist App on iPhone"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transform: 'scale(0.9)'
                  }}
                  priority
                  quality={95}
                />
              </div>

              {/* Floating Glass Panel - Bottom Right (matches Air India) */}
              <div
                data-atropos-offset="4"
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '12%' : '10%',
                  right: isMobile ? '5%' : '6%',
                  zIndex: 10,
                  width: isMobile ? '90%' : 'clamp(340px, 28vw, 420px)',
                  padding: isMobile ? '1.75rem' : '2rem 2.5rem',
                  pointerEvents: 'auto', // CRITICAL: Enable clicking on content
                  // Stronger glassmorphism for better text readability
                  background: `
                    linear-gradient(135deg,
                      rgba(255, 255, 255, 0.12) 0%,
                      rgba(255, 255, 255, 0.08) 50%,
                      rgba(255, 255, 255, 0.10) 100%
                    ),
                    rgba(0, 0, 0, 0.65)
                  `,
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  borderRadius: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  // Enhanced shadows for depth
                  boxShadow: `
                    0 40px 80px rgba(0, 0, 0, 0.3),
                    0 20px 40px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    inset 0 0 20px rgba(0, 0, 0, 0.15),
                    0 0 80px rgba(80, 200, 120, 0.08)
                  `,
                  textAlign: 'left',
                  overflow: 'hidden',
                }}
              >
                {/* Category Tag */}
                <div style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '1rem',
                }}>
                  Healthcare · 2024
                </div>

                {/* Project Title */}
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.98)',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em',
                }}>
                  PsoriAssist
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '1.5rem',
                }}>
                  AI-powered psoriasis management app with ghost overlay innovation,
                  predictive flare alerts, and clinical-grade PASI scoring.
                </p>

                {/* Tech Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                }}>
                  {['React Native', 'Python', 'TensorFlow', 'iOS'].map(tech => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.65rem',
                        padding: '0.35rem 0.75rem',
                        background: 'rgba(255,255,255,0.10)',
                        border: '1px solid rgba(255,255,255,0.20)',
                        borderRadius: 12,
                        color: 'rgba(255,255,255,0.85)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href="/work/psoriassist"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.98)',
                    background: 'rgba(80, 200, 120, 0.20)', // Green accent
                    border: '1px solid rgba(80, 200, 120, 0.4)',
                    borderRadius: 12,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(80, 200, 120, 0.30)';
                    e.currentTarget.style.borderColor = 'rgba(80, 200, 120, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(80, 200, 120, 0.20)';
                    e.currentTarget.style.borderColor = 'rgba(80, 200, 120, 0.4)';
                  }}
                >
                  View Case Study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile fallback (no parallax)
function MobileView() {
  return (
    <div style={{
      position: 'relative',
      height: '75vh',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '24px',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="/images/Psori_back.png"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* iPhone */}
      <div style={{
        position: 'relative',
        width: '90%',
        maxWidth: 400,
        aspectRatio: '9/19.5',
        zIndex: 2,
      }}>
        <Image
          src="/images/Psori_front.png"
          alt="PsoriAssist App"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      {/* Simplified Glass Panel for Mobile */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        right: '5%',
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(80, 200, 120, 0.2)',
        borderRadius: 32,
        padding: '1.5rem',
        zIndex: 3,
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#fff',
          marginBottom: '0.5rem',
        }}>
          PsoriAssist
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '1rem',
        }}>
          AI-powered psoriasis management
        </p>
        <Link
          href="/work/psoriassist"
          style={{
            display: 'inline-block',
            padding: '0.625rem 1.25rem',
            fontSize: '0.8125rem',
            color: '#fff',
            background: 'rgba(80, 200, 120, 0.2)',
            border: '1px solid rgba(80, 200, 120, 0.4)',
            borderRadius: 12,
            textDecoration: 'none',
          }}
        >
          View Case Study →
        </Link>
      </div>
    </div>
  );
}
