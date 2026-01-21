'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Atropos from 'atropos';
import 'atropos/css';
import { useAtroposGyroscope } from '@/hooks/useAtroposGyroscope';

/**
 * Giant Origen Hero Card with Atropos 3D Parallax Effect
 * Features orbital rings animation representing MCP tools, React components, and design tokens
 * Displays on the work page alongside Air India, Cleara, and Metamorphic sections
 */
export function OrigenHeroCard() {
  // State management
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

  // Origen brand color (RGB: 59, 130, 246 - Blue)
  const brandRgb = '59, 130, 246';

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
        padding: isMobile ? '0 0.5rem' : '0 1.5rem',
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
          <div ref={rotateRef} className="atropos-rotate" style={{ height: '100%', overflow: 'visible', pointerEvents: 'all' }}>
            {/* Visual card with background/border */}
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
                02
              </div>

              {/* LAYER 1: Grid Background */}
              <div
                data-atropos-offset="-10"
                className="origen-grid"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  overflow: 'hidden',
                  borderRadius: '24px',
                  background: `
                    linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px),
                    linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
                    linear-gradient(180deg, #0a0a0a 0%, #0f172a 50%, #0a0a0a 100%)
                  `,
                  backgroundSize: '40px 40px, 40px 40px, 100% 100%',
                }}
              />

              {/* LAYER 2: Radial Gradient Glows */}
              <div
                data-atropos-offset="-5"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  borderRadius: '24px',
                  background: `
                    radial-gradient(ellipse at 25% 25%, rgba(168, 85, 247, 0.18) 0%, transparent 50%),
                    radial-gradient(ellipse at 75% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.22) 0%, transparent 45%)
                  `,
                }}
              />

              {/* LAYER 3: SVG Orbital Rings */}
              <div
                data-atropos-offset="-2"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  viewBox="0 0 400 400"
                  style={{
                    width: isMobile ? '75%' : '55%',
                    height: isMobile ? '75%' : '55%',
                    overflow: 'visible',
                  }}
                >
                  {/* Outer ring - purple (tokens) */}
                  <g style={{ transform: 'rotate(-20deg)', transformOrigin: '200px 200px' }}>
                    <ellipse
                      cx="200"
                      cy="200"
                      rx="150"
                      ry="55"
                      fill="none"
                      stroke="#A855F7"
                      strokeWidth="0.75"
                      opacity="0.35"
                      strokeDasharray="6 4"
                      className="origen-orbit-1"
                    />
                  </g>
                  {/* Middle ring - blue (react) */}
                  <g style={{ transform: 'rotate(15deg)', transformOrigin: '200px 200px' }}>
                    <ellipse
                      cx="200"
                      cy="200"
                      rx="120"
                      ry="45"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="1"
                      opacity="0.45"
                      strokeDasharray="8 3"
                      className="origen-orbit-2"
                    />
                  </g>
                  {/* Inner ring - green (mcp) */}
                  <g style={{ transform: 'rotate(40deg)', transformOrigin: '200px 200px' }}>
                    <ellipse
                      cx="200"
                      cy="200"
                      rx="90"
                      ry="35"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="0.75"
                      opacity="0.4"
                      strokeDasharray="4 6"
                      className="origen-orbit-3"
                    />
                  </g>
                  {/* Central hub glow */}
                  <circle
                    cx="200"
                    cy="200"
                    r="25"
                    fill="url(#hubGradientOrigen)"
                    opacity="0.6"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="18"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  {/* Gradient definitions */}
                  <defs>
                    <radialGradient id="hubGradientOrigen" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                      <stop offset="70%" stopColor="#A855F7" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* LAYER 4: Package Nodes */}
              <div
                data-atropos-offset="0"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 4,
                  pointerEvents: 'none',
                }}
              >
                {/* Tokens node - top left */}
                <div
                  className="origen-node-1"
                  style={{
                    position: 'absolute',
                    top: isMobile ? '20%' : '22%',
                    left: isMobile ? '15%' : '25%',
                    width: isMobile ? '36px' : '48px',
                    height: isMobile ? '36px' : '48px',
                    borderRadius: '50%',
                    background: 'rgba(168, 85, 247, 0.12)',
                    border: '1px solid rgba(168, 85, 247, 0.35)',
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.25), inset 0 0 15px rgba(168, 85, 247, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>

                {/* React node - center right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: isMobile ? '12%' : '22%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <div
                    className="origen-node-2"
                    style={{
                      width: isMobile ? '42px' : '54px',
                      height: isMobile ? '42px' : '54px',
                      borderRadius: '50%',
                      background: 'rgba(59, 130, 246, 0.15)',
                      border: '1px solid rgba(59, 130, 246, 0.4)',
                      boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                </div>

                {/* MCP node - bottom left */}
                <div
                  className="origen-node-3"
                  style={{
                    position: 'absolute',
                    bottom: isMobile ? '25%' : '25%',
                    left: isMobile ? '22%' : '30%',
                    width: isMobile ? '36px' : '48px',
                    height: isMobile ? '36px' : '48px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    boxShadow: '0 0 30px rgba(16, 185, 129, 0.25), inset 0 0 15px rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" rx="1" />
                    <line x1="9" y1="2" x2="9" y2="4" />
                    <line x1="15" y1="2" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="22" />
                    <line x1="15" y1="20" x2="15" y2="22" />
                  </svg>
                </div>
              </div>

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
                    Design System for AI
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
                    2025
                  </span>
                </div>

                {/* Title */}
                <h3
                  data-atropos-offset="2"
                  style={{
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    fontWeight: '700',
                    color: 'var(--text-95)',
                    margin: '0 0 0.875rem 0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Origen
                </h3>

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
                  The first design system built for the AI era. Give LLMs programmatic access to query design decisions instead of hallucinating tokens.
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
                  {['MCP Protocol', 'Design Tokens', 'React', 'AI-Native'].map((tag, i) => (
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
                  href="/work/origen"
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

      {/* Origen orbital animations */}
      <style jsx global>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
        @keyframes orbitalSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitalSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes nodePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.85;
          }
        }
        .origen-orbit-1 {
          animation: orbitalSpin 80s linear infinite;
          transform-origin: 200px 200px;
        }
        .origen-orbit-2 {
          animation: orbitalSpinReverse 60s linear infinite;
          transform-origin: 200px 200px;
        }
        .origen-orbit-3 {
          animation: orbitalSpin 100s linear infinite;
          transform-origin: 200px 200px;
        }
        .origen-node-1 {
          animation: nodePulse 3s ease-in-out infinite;
        }
        .origen-node-2 {
          animation: nodePulse 3s ease-in-out infinite 0.5s;
        }
        .origen-node-3 {
          animation: nodePulse 3s ease-in-out infinite 1s;
        }
        .origen-grid {
          animation: gridPulse 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
