'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Mail } from 'lucide-react';

export function HeroCard() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes gradientOrb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.15;
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.2;
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9);
            opacity: 0.15;
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
      `}</style>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Animated Gradient Orbs Background */}
        <div style={{
          position: 'absolute',
          inset: '-100px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1s ease-out',
        }}>
          {/* Red Orb */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(218, 14, 41, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'gradientOrb 20s ease-in-out infinite',
          }} />
          {/* Purple Orb */}
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'gradientOrb 25s ease-in-out infinite',
            animationDelay: '5s',
          }} />
          {/* Green Orb */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
            filter: 'blur(65px)',
            animation: 'gradientOrb 22s ease-in-out infinite',
            animationDelay: '10s',
          }} />
        </div>

        {/* Name */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '200',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '0.625rem',
            lineHeight: '1.1',
            letterSpacing: '-0.04em',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}>
            Nihar Sunkara
          </h1>

          {/* Tagline with Red × */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.8)',
            letterSpacing: '0.01em',
            marginBottom: '0.5rem',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}>
            Designer <span style={{ color: '#DA0E29', fontWeight: '400' }}>×</span> Engineer <span style={{ color: '#DA0E29', fontWeight: '400' }}>×</span> Consciousness Explorer
          </p>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '0.02em',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}>
            From ego death simulators to enterprise systems
          </p>
        </div>

        {/* Impact Statement */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(1rem, 2vw, 1.25rem)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
        }}>
          <p style={{
            fontSize: 'clamp(0.9375rem, 1.75vw, 1.0625rem)',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.85)',
            letterSpacing: '0.01em',
            lineHeight: '1.5',
          }}>
            Designing systems that <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '500' }}>millions interact with daily</span> — from 30,000ft to healthcare
          </p>
        </div>

        {/* Current Role Badge with Pulsing Dot */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.8)',
            letterSpacing: '0.01em',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(218, 14, 41, 0.9)',
              animation: 'pulseRed 2s ease-in-out infinite',
            }} />
            Air India DesignLAB • Transforming 450+ daily operations
          </div>
        </div>

        {/* Credibility Stats Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.75rem, 2vw, 1rem)',
          flexWrap: 'wrap',
          marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
        }}>
          {[
            { label: '10K+ daily users', tooltip: 'Air India mobile app + IFE systems' },
            { label: '18-month research deep dive', tooltip: 'PsoriAssist healthcare design' },
            { label: '2 hackathons won simultaneously', tooltip: '5000 LOC in 48 hours' },
          ].map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredStat(idx)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{
                position: 'relative',
                padding: '0.625rem 1rem',
                background: hoveredStat === idx
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '0.8125rem',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.75)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredStat === idx ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredStat === idx
                  ? '0 8px 24px rgba(0, 0, 0, 0.15)'
                  : 'none',
              }}
            >
              {stat.label}
              {hoveredStat === idx && (
                <div style={{
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
                }}>
                  {stat.tooltip}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid rgba(10, 10, 10, 0.95)',
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.75rem, 1.5vw, 1rem)',
          flexWrap: 'wrap',
          marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
        }}>
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
              border: hoveredButton === 'featured'
                ? '1px solid rgba(16, 185, 129, 0.6)'
                : '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '18px',
              color: 'rgba(255, 255, 255, 0.98)',
              textDecoration: 'none',
              fontSize: 'clamp(0.9375rem, 1.75vw, 1rem)',
              fontWeight: '500',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: hoveredButton === 'featured' ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
              boxShadow: hoveredButton === 'featured'
                ? '0 16px 40px rgba(16, 185, 129, 0.25), 0 0 0 1px rgba(16, 185, 129, 0.1) inset'
                : '0 4px 12px rgba(0, 0, 0, 0.1)',
              position: 'relative',
            }}
          >
            <span>View Featured Work</span>
            <div style={{
              padding: '0.25rem 0.625rem',
              background: 'rgba(16, 185, 129, 0.25)',
              borderRadius: '10px',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'rgba(16, 185, 129, 1)',
              letterSpacing: '0.02em',
            }}>
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
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(255, 255, 255, 0.04)',
              border: hoveredButton === 'contact'
                ? '1px solid rgba(255, 255, 255, 0.15)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              color: 'rgba(255, 255, 255, 0.85)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '400',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: hoveredButton === 'contact' ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: hoveredButton === 'contact'
                ? '0 8px 24px rgba(0, 0, 0, 0.2)'
                : 'none',
            }}
          >
            <Mail size={16} />
            <span>Get in Touch</span>
          </Link>

          {/* Tertiary: GitHub Link */}
          <Link
            href="https://github.com/krishn404"
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
                ? 'rgba(255, 255, 255, 0.06)'
                : 'rgba(255, 255, 255, 0.03)',
              border: hoveredButton === 'github'
                ? '1px solid rgba(255, 255, 255, 0.12)'
                : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '400',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: hoveredButton === 'github' ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: hoveredButton === 'github'
                ? '0 6px 20px rgba(0, 0, 0, 0.15)'
                : 'none',
            }}
          >
            <Github size={15} />
            <span>GitHub</span>
          </Link>
        </div>

        {/* Bio Card */}
        <div style={{
          padding: 'clamp(1rem, 2vw, 1.25rem)',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
          fontWeight: '300',
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: '1.6',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
        }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '400' }}>INTP</span> building at the intersection of <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>healthcare × AI × consciousness</span>. 18-month deep dive into digital therapeutics culminating in <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>PsoriAssist</span>. Built <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>5000 lines in 48 hours</span> while winning <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>2 hackathons simultaneously</span>. Currently transforming enterprise systems at <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Air India</span> (10K+ daily users) while exploring the future of <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>human-computer symbiosis</span>.
        </div>
      </div>
    </>
  );
}
