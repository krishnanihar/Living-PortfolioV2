'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Mail, ChevronDown } from 'lucide-react';
import { ParticleSphere } from '@/components/effects/ParticleSphere';
import { useOrbReflection } from '@/contexts/OrbReflectionContext';
import { HealthcareResearchIcon } from '@/components/icons/HealthcareResearchIcon';

export function IntroductionSection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Get orb reflection state for dynamic color effects
  const { orbState } = useOrbReflection();

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

    const section = document.getElementById('hero-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const stats = [
    { label: 'Air India 10K users', tooltip: 'Mobile app + IFE systems serving 10K+ daily' },
    { label: '18-month research deep dive', tooltip: 'PsoriAssist healthcare design' },
    { label: '2 hackathons won simultaneously', tooltip: '5000 LOC in 48 hours' },
  ];

  const scrollToNext = () => {
    const aboutSection = document.querySelector('[id*="about"]');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
                  fontWeight: '100',
                  lineHeight: '1.1',
                  letterSpacing: '-0.05em',
                  color: 'rgba(255, 255, 255, 0.98)',
                  marginBottom: '2rem',
                  opacity: inView && mounted ? 1 : 0,
                  animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
                }}
              >
                Krishna Nihar
              </h1>

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
                    fontWeight: '200',
                    color: 'rgba(255, 255, 255, 0.75)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.7',
                    marginBottom: '0.75rem',
                  }}
                >
                  From <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '300' }}>ego death simulators</span> to <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '300' }}>enterprise systems</span> — building experiences that matter
                </p>
                <p
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.75vw, 1.0625rem)',
                    fontWeight: '200',
                    color: 'rgba(255, 255, 255, 0.85)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.6',
                  }}
                >
                  Designing systems that <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '300' }}>millions interact with daily</span> — from 30,000ft to healthcare
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
                        ? 'rgba(15, 15, 15, 0.95)'
                        : 'rgba(8, 8, 8, 0.9)',
                      backdropFilter: 'blur(80px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(80px) saturate(180%)',
                      border: hoveredStat === idx
                        ? '1px solid rgba(255, 255, 255, 0.22)'
                        : '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: '15px',
                      fontSize: '0.875rem',
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.85)',
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
                          fontWeight: '300',
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
                    background: 'rgba(10, 10, 10, 0.6)',
                    backdropFilter: 'blur(100px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(100px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '15px',
                    color: 'rgba(255, 255, 255, 0.98)',
                    textDecoration: 'none',
                    fontSize: 'clamp(0.9375rem, 1.75vw, 1rem)',
                    fontWeight: '300',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredButton === 'featured' ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: hoveredButton === 'featured'
                      ? `inset 0 1px 0 rgba(255, 255, 255, 0.02),
                         inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                         0 12px 32px rgba(0, 0, 0, 0.7)`
                      : `inset 0 1px 0 rgba(255, 255, 255, 0.02),
                         inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                         0 8px 24px rgba(0, 0, 0, 0.6)`,
                    opacity: inView && mounted ? 1 : 0,
                    animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both' : 'none',
                  }}
                >
                  <HealthcareResearchIcon size={20} />
                  <span>View Featured Work</span>
                  <div
                    style={{
                      padding: '0.25rem 0.625rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.9)',
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
                      ? 'rgba(15, 15, 15, 0.95)'
                      : 'rgba(8, 8, 8, 0.9)',
                    backdropFilter: 'blur(80px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(80px) saturate(180%)',
                    border: hoveredButton === 'contact'
                      ? '1px solid rgba(255, 255, 255, 0.22)'
                      : '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '15px',
                    color: 'rgba(255, 255, 255, 0.9)',
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
                      ? 'rgba(15, 15, 15, 0.95)'
                      : 'rgba(8, 8, 8, 0.9)',
                    backdropFilter: 'blur(80px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(80px) saturate(180%)',
                    border: hoveredButton === 'github'
                      ? '1px solid rgba(255, 255, 255, 0.22)'
                      : '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '15px',
                    color: 'rgba(255, 255, 255, 0.9)',
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
                    opacity: inView && mounted ? 1 : 0,
                    animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both' : 'none',
                  }}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Right Column: Particle Sphere Visual */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '700px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible', // Allow effects to extend beyond container
                opacity: inView && mounted ? 1 : 0,
                animation: inView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' : 'none',
              }}
            >
              <ParticleSphere
                radius={140}
                particleCount={350}
                enableInteraction={true}
              />
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
