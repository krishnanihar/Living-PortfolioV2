'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Mail, User } from 'lucide-react';

export function IntroductionSection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth >= 1024);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('introduction-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const stats = [
    { label: '10K+ daily users', tooltip: 'Air India mobile app + IFE systems' },
    { label: '18-month research deep dive', tooltip: 'PsoriAssist healthcare design' },
    { label: '2 hackathons won simultaneously', tooltip: '5000 LOC in 48 hours' },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes gradientShift {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
        }
      `}</style>

      <section
        id="introduction-section"
        style={{
          background: 'var(--bg-primary)',
          fontFamily: 'Inter, sans-serif',
          padding: '6rem clamp(1.5rem, 3vw, 2.5rem)',
          position: 'relative',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Container */}
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Section Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '3rem',
              opacity: inView && mounted ? 1 : 0,
              animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' : 'none',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(147, 51, 234, 0.08))',
                backdropFilter: 'blur(100px) saturate(150%)',
                WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                border: '1px solid rgba(218, 14, 41, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.41), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
              }}
            >
              <User size={18} style={{ color: 'rgba(218, 14, 41, 0.95)' }} />
            </div>

            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                letterSpacing: '0.05em',
                color: 'rgba(218, 14, 41, 0.95)',
              }}
            >
              Introduction
            </h2>

            <div
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(100px) saturate(150%)',
                WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                border: '1px solid rgba(218, 14, 41, 0.2)',
                fontSize: '0.75rem',
                fontWeight: '300',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
              }}
            >
              Deep Dive
            </div>
          </div>

          {/* Split-Screen Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '60% 40%' : '1fr',
              gap: 'clamp(3rem, 6vw, 6rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Content */}
            <div>
              {/* Name */}
              <h1
                style={{
                  fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                  fontWeight: '200',
                  color: 'rgba(255, 255, 255, 0.98)',
                  marginBottom: '1rem',
                  lineHeight: '1.1',
                  letterSpacing: '-0.05em',
                  opacity: inView && mounted ? 1 : 0,
                  animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
                }}
              >
                Nihar Sunkara
              </h1>

              {/* Tagline with Red × */}
              <p
                style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.85)',
                  letterSpacing: '0.01em',
                  marginBottom: '1.5rem',
                  opacity: inView && mounted ? 1 : 0,
                  animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' : 'none',
                }}
              >
                Designer <span style={{ color: '#DA0E29', fontWeight: '400' }}>×</span> Engineer <span style={{ color: '#DA0E29', fontWeight: '400' }}>×</span> Consciousness Explorer
              </p>

              {/* Impact Statements */}
              <div
                style={{
                  marginBottom: '2rem',
                  opacity: inView && mounted ? 1 : 0,
                  animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                    fontWeight: '300',
                    color: 'rgba(255, 255, 255, 0.75)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.7',
                    marginBottom: '0.75rem',
                  }}
                >
                  From <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '400' }}>ego death simulators</span> to <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '400' }}>enterprise systems</span> — building experiences that matter
                </p>
                <p
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.75vw, 1.0625rem)',
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.85)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.6',
                  }}
                >
                  Designing systems that <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '500' }}>millions interact with daily</span> — from 30,000ft to healthcare
                </p>
              </div>

              {/* Current Role Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(100px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '15px',
                  fontSize: '0.9375rem',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.8)',
                  letterSpacing: '0.01em',
                  boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.41), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
                  marginBottom: '2.5rem',
                  opacity: inView && mounted ? 1 : 0,
                  animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' : 'none',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'rgba(218, 14, 41, 0.9)',
                    animation: 'pulseRed 2s ease-in-out infinite',
                  }}
                />
                Air India DesignLAB • Transforming 450+ daily operations
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
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(100px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '15px',
                      fontSize: '0.875rem',
                      fontWeight: '400',
                      color: 'rgba(255, 255, 255, 0.75)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredStat === idx ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: hoveredStat === idx
                        ? '0px 8px 30px rgba(0, 0, 0, 0.5), 0px 0px 12px rgba(255, 255, 255, 0.03) inset'
                        : '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                      opacity: inView && mounted ? 1 : 0,
                      animation: inView && mounted ? `fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + idx * 0.1}s both` : 'none',
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
                          fontWeight: '400',
                          color: 'rgba(255, 255, 255, 0.9)',
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

              {/* CTA Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.75rem, 1.5vw, 1rem)',
                  flexWrap: 'wrap',
                }}
              >
                {/* Primary: Featured Work */}
                <Link
                  href="/work/psoriassist"
                  onMouseEnter={() => setHoveredButton('featured')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: 'clamp(0.875rem, 1.75vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                    background: hoveredButton === 'featured'
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(255, 255, 255, 0.1))'
                      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(255, 255, 255, 0.06))',
                    backdropFilter: 'blur(100px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                    border: hoveredButton === 'featured'
                      ? '1px solid rgba(16, 185, 129, 0.6)'
                      : '1px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '15px',
                    color: 'rgba(255, 255, 255, 0.98)',
                    textDecoration: 'none',
                    fontSize: 'clamp(0.9375rem, 1.75vw, 1rem)',
                    fontWeight: '500',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredButton === 'featured' ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: hoveredButton === 'featured'
                      ? '0 16px 40px rgba(16, 185, 129, 0.25), 0px 0px 12px rgba(255, 255, 255, 0.03) inset'
                      : '0px 8px 30px rgba(0, 0, 0, 0.3), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                    opacity: inView && mounted ? 1 : 0,
                    animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both' : 'none',
                  }}
                >
                  <span>View Featured Work</span>
                  <div
                    style={{
                      padding: '0.25rem 0.625rem',
                      background: 'rgba(16, 185, 129, 0.25)',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'rgba(16, 185, 129, 1)',
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
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(100px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                    border: hoveredButton === 'contact'
                      ? '1px solid rgba(255, 255, 255, 0.12)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '15px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredButton === 'contact' ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredButton === 'contact'
                      ? '0px 8px 30px rgba(0, 0, 0, 0.4), 0px 0px 12px rgba(255, 255, 255, 0.03) inset'
                      : '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                    opacity: inView && mounted ? 1 : 0,
                    animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.0s both' : 'none',
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
                      ? 'rgba(255, 255, 255, 0.04)'
                      : 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(100px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                    border: hoveredButton === 'github'
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '15px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredButton === 'github' ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredButton === 'github'
                      ? '0px 8px 30px rgba(0, 0, 0, 0.35), 0px 0px 12px rgba(255, 255, 255, 0.03) inset'
                      : '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                    opacity: inView && mounted ? 1 : 0,
                    animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both' : 'none',
                  }}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: inView && mounted ? 1 : 0,
                animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' : 'none',
              }}
            >
              {/* Animated Gradient Orb */}
              <div
                style={{
                  position: 'relative',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(218, 14, 41, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.25) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 70%)
                  `,
                  filter: 'blur(80px)',
                  animation: 'gradientShift 20s ease-in-out infinite',
                }}
              />
              {/* Glass overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: '20%',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(100px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(100px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.41), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
