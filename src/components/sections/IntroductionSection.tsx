'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Mail, ChevronDown } from 'lucide-react';
import { HealthcareResearchIcon } from '@/components/icons/HealthcareResearchIcon';

export function IntroductionSection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Staggered animation stages
    const stages = [1, 2, 3];
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 150);
    });
  }, []);

  const stats: Array<{ label: string; tooltip: string }> = [];

  const scrollToNext = () => {
    const aboutSection = document.querySelector('[id*="about"]');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulseRed {
          0%, 100% {
            box-shadow: 0 0 8px rgba(218, 14, 41, 0.4);
            opacity: 1;
          }
          50% {
            box-shadow: 0 0 16px rgba(218, 14, 41, 0.8);
            opacity: 0.8;
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

        @keyframes gradientSweep {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }

        @keyframes borderRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes orbGlow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(33, 150, 243, 0.5));
          }
        }

        .featured-work-button {
          position: relative;
          isolation: isolate;
        }

        .featured-work-button::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 15px;
          padding: 3px;
          background: conic-gradient(
            from 0deg,
            rgba(33, 150, 243, 0.6) 0deg,
            rgba(124, 58, 237, 0.8) 90deg,
            rgba(6, 182, 212, 0.6) 180deg,
            rgba(124, 58, 237, 0.8) 270deg,
            rgba(33, 150, 243, 0.6) 360deg
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
          animation: borderRotate 3s linear infinite, orbGlow 3s ease-in-out infinite;
          pointer-events: none;
        }

        .featured-work-button:hover::before {
          background: conic-gradient(
            from 0deg,
            rgba(33, 150, 243, 0.8) 0deg,
            rgba(124, 58, 237, 1) 90deg,
            rgba(6, 182, 212, 0.8) 180deg,
            rgba(124, 58, 237, 1) 270deg,
            rgba(33, 150, 243, 0.8) 360deg
          );
          animation-duration: 2.5s, 2.5s;
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
        {/* Background Radial Glow for Contrast */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '900px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(10,10,10,0.6) 0%, transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Container */}
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Glassmorphic Hero Card */}
          <div
            style={{
              maxWidth: '780px',
              margin: '0 auto',
              padding: 'clamp(2.5rem, 4vw, 3.5rem) clamp(2rem, 4vw, 3rem)',
              background: 'var(--glass-05)',
              backdropFilter: 'blur(80px) saturate(180%)',
              WebkitBackdropFilter: 'blur(80px) saturate(180%)',
              border: '1px solid var(--text-08)',
              borderRadius: '32px',
              boxShadow: `
                0 0 1px rgba(255, 255, 255, 0.15) inset,
                0 -1px 0 rgba(255, 255, 255, 0.08) inset,
                0 20px 60px rgba(0, 0, 0, 0.5)
              `,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Centered Content */}
            <div>
              {/* Name - Enhanced Typography */}
              <h1
                style={{
                  fontSize: 'clamp(4rem, 8vw, 6.5rem)',
                  fontWeight: '100',
                  lineHeight: '1.05',
                  letterSpacing: '-0.06em',
                  color: 'var(--text-primary)',
                  marginBottom: '2.5rem',
                  opacity: animationStage >= 1 ? 1 : 0,
                  transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                Krishna Nihar
              </h1>

              {/* Impact Statements - Improved Contrast */}
              <div
                style={{
                  marginBottom: '2rem',
                  opacity: animationStage >= 2 ? 1 : 0,
                  transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                    fontWeight: '300',
                    color: 'var(--text-95)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.7',
                    marginBottom: '0.75rem',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  From <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>ego death simulators</span> to <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>enterprise systems</span> — building experiences that matter
                </p>
                <p
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.75vw, 1.0625rem)',
                    fontWeight: '300',
                    color: 'var(--text-90)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.6',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  Designing systems that <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>millions interact with daily</span> — from 30,000ft to healthcare
                </p>
              </div>


              {/* Stats Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2.5rem',
                }}
              >
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredStat(idx)}
                    onMouseLeave={() => setHoveredStat(null)}
                    style={{
                      position: 'relative',
                      padding: '1rem 1.25rem',
                      background: hoveredStat === idx
                        ? 'rgba(15, 15, 15, 0.5)'
                        : 'rgba(8, 8, 8, 0.4)',
                      backdropFilter: 'blur(120px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(120px) saturate(180%)',
                      border: hoveredStat === idx
                        ? '1px solid rgba(255, 255, 255, 0.15)'
                        : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '15px',
                      fontSize: '0.875rem',
                      fontWeight: '300',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredStat === idx ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: hoveredStat === idx
                        ? `0px 20px 48px rgba(0, 0, 0, 0.7),
                           0px 0px 1px rgba(255, 255, 255, 0.35) inset,
                           0px -1px 0px rgba(255, 255, 255, 0.1) inset`
                        : `0px 10px 30px rgba(0, 0, 0, 0.5),
                           0px 0px 1px rgba(255, 255, 255, 0.25) inset,
                           0px -1px 0px rgba(255, 255, 255, 0.06) inset`,
                      opacity: mounted ? 1 : 0,
                    }}
                  >
                    {stat.label}
                    {hoveredStat === idx && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 'calc(100% + 8px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          padding: '0.5rem 0.75rem',
                          background: 'rgba(10, 10, 10, 0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '300',
                          color: 'var(--text-primary)',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                          zIndex: 10,
                        }}
                      >
                        {stat.tooltip}
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop: '6px solid rgba(10, 10, 10, 0.95)',
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons - Staggered Animation */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.75rem, 1.5vw, 1rem)',
                  flexWrap: 'wrap',
                  opacity: animationStage >= 3 ? 1 : 0,
                  transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(15px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
                }}
              >
                {/* Primary: Featured Work */}
                <Link
                  href="/work/psoriassist"
                  className="featured-work-button"
                  onMouseEnter={() => setHoveredButton('featured')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: 'clamp(1rem, 2vw, 1.125rem) clamp(1.75rem, 3.5vw, 2.25rem)',
                    background: 'rgba(15, 15, 15, 0.5)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid transparent',
                    borderRadius: '15px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: 'clamp(0.9375rem, 1.75vw, 1rem)',
                    fontWeight: '300',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredButton === 'featured' ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
                    boxShadow: hoveredButton === 'featured'
                      ? `inset 0 1px 0 rgba(255, 255, 255, 0.02),
                         inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                         0 16px 40px rgba(0, 0, 0, 0.7),
                         0 0 40px rgba(124, 58, 237, 0.4),
                         0 0 20px rgba(33, 150, 243, 0.3)`
                      : `inset 0 1px 0 rgba(255, 255, 255, 0.02),
                         inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                         0 8px 24px rgba(0, 0, 0, 0.6),
                         0 0 20px rgba(124, 58, 237, 0.2)`,
                  }}
                >
                  <HealthcareResearchIcon size={20} />
                  <span>View Featured Work</span>
                  <div
                    style={{
                      padding: '0.25rem 0.625rem',
                      background: 'rgba(124, 58, 237, 0.15)',
                      border: '1px solid rgba(124, 58, 237, 0.3)',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: '300',
                      color: 'var(--text-primary)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    18 Months
                  </div>
                </Link>

                {/* Secondary: Contact */}
                <Link
                  href="/contact"
                  onMouseEnter={() => setHoveredButton('contact')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: 'clamp(0.75rem, 1.5vw, 0.875rem) clamp(1.25rem, 2.5vw, 1.5rem)',
                    background: hoveredButton === 'contact'
                      ? 'rgba(15, 15, 15, 0.5)'
                      : 'rgba(8, 8, 8, 0.4)',
                    backdropFilter: 'blur(120px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(120px) saturate(180%)',
                    border: hoveredButton === 'contact'
                      ? '1px solid rgba(255, 255, 255, 0.15)'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '15px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '300',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredButton === 'contact' ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredButton === 'contact'
                      ? `0px 20px 48px rgba(0, 0, 0, 0.7),
                         0px 0px 1px rgba(255, 255, 255, 0.35) inset,
                         0px -1px 0px rgba(255, 255, 255, 0.1) inset`
                      : `0px 10px 30px rgba(0, 0, 0, 0.5),
                         0px 0px 1px rgba(255, 255, 255, 0.25) inset,
                         0px -1px 0px rgba(255, 255, 255, 0.06) inset`,
                  }}
                >
                  <Mail size={16} />
                  <span>Contact</span>
                </Link>

                {/* Tertiary: GitHub */}
                <a
                  href="https://github.com/krishnanihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredButton('github')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: 'clamp(0.75rem, 1.5vw, 0.875rem) clamp(1.25rem, 2.5vw, 1.5rem)',
                    background: hoveredButton === 'github'
                      ? 'rgba(15, 15, 15, 0.5)'
                      : 'rgba(8, 8, 8, 0.4)',
                    backdropFilter: 'blur(120px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(120px) saturate(180%)',
                    border: hoveredButton === 'github'
                      ? '1px solid rgba(255, 255, 255, 0.15)'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '15px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '300',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredButton === 'github' ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredButton === 'github'
                      ? `0px 20px 48px rgba(0, 0, 0, 0.7),
                         0px 0px 1px rgba(255, 255, 255, 0.35) inset,
                         0px -1px 0px rgba(255, 255, 255, 0.1) inset`
                      : `0px 10px 30px rgba(0, 0, 0, 0.5),
                         0px 0px 1px rgba(255, 255, 255, 0.25) inset,
                         0px -1px 0px rgba(255, 255, 255, 0.06) inset`,
                  }}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
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
              color: 'var(--text-secondary)',
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
            <ChevronDown size={18} style={{ color: 'var(--text-secondary)' }} />
          </div>
        </div>
      </section>
    </>
  );
}
