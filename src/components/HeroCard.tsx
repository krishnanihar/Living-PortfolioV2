'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Github, Mail } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';

export function HeroCard() {
  const { resolvedTheme } = useTheme();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      `}</style>

      <div
        ref={cardRef}
        style={{
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(120px) saturate(200%)',
          WebkitBackdropFilter: 'blur(120px) saturate(200%)',
          background: resolvedTheme === 'light'
            ? 'rgba(255, 255, 255, 0.72)'
            : 'rgba(18, 18, 18, 0.72)',
          border: '1px solid var(--border-primary)',
          borderRadius: '30px',
          padding: 'clamp(2rem, 3vw, 2.5rem)',
          boxShadow: resolvedTheme === 'light'
            ? `0px 16px 48px rgba(0, 0, 0, 0.15),
               0px 0px 1px rgba(0, 0, 0, 0.3) inset,
               0px -1px 0px rgba(0, 0, 0, 0.08) inset,
               0px 1px 2px rgba(0, 0, 0, 0.2)`
            : `0px 16px 48px rgba(0, 0, 0, 0.6),
               0px 0px 1px rgba(255, 255, 255, 0.3) inset,
               0px -1px 0px rgba(255, 255, 255, 0.08) inset,
               0px 1px 2px rgba(0, 0, 0, 0.8)`,
          overflow: 'hidden',
        }}
      >
        {/* Dynamic Mouse-Tracking Reflection Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: resolvedTheme === 'light'
              ? `radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%,
                  rgba(0, 0, 0, 0.08) 0%,
                  rgba(0, 0, 0, 0.04) 30%,
                  transparent 60%)`
              : `radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%,
                  rgba(255, 255, 255, 0.08) 0%,
                  rgba(255, 255, 255, 0.04) 30%,
                  transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 0,
            borderRadius: '30px',
            transition: 'background 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Name */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '200',
            color: 'var(--text-primary)',
            marginBottom: '0.625rem',
            lineHeight: '1.1',
            letterSpacing: '-0.04em',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}>
            Krishna Nihar
          </h1>

          {/* Tagline with Red × */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: '300',
            color: 'var(--text-secondary)',
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
            color: 'var(--text-tertiary)',
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
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          marginBottom: 'clamp(1rem, 2vw, 1.25rem)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
        }}>
          <p style={{
            fontSize: 'clamp(0.9375rem, 1.75vw, 1.0625rem)',
            fontWeight: '400',
            color: 'var(--text-secondary)',
            letterSpacing: '0.01em',
            lineHeight: '1.5',
          }}>
            Designing systems that <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>millions interact with daily</span> — from 30,000ft to healthcare
          </p>
        </div>

        {/* Current Role Badge with Pulsing Dot */}
        <div style={{
          position: 'relative',
          zIndex: 1,
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
            background: resolvedTheme === 'light'
              ? 'rgba(255, 255, 255, 0.65)'
              : 'rgba(12, 12, 12, 0.65)',
            backdropFilter: 'blur(120px) saturate(200%)',
            WebkitBackdropFilter: 'blur(120px) saturate(200%)',
            border: '1px solid var(--border-primary)',
            borderRadius: '15px',
            fontSize: '0.875rem',
            fontWeight: '400',
            color: 'var(--text-secondary)',
            letterSpacing: '0.01em',
            boxShadow: resolvedTheme === 'light'
              ? `0px 12px 36px rgba(0, 0, 0, 0.12),
                 0px 0px 1px rgba(0, 0, 0, 0.25) inset,
                 0px -1px 0px rgba(0, 0, 0, 0.06) inset`
              : `0px 12px 36px rgba(0, 0, 0, 0.5),
                 0px 0px 1px rgba(255, 255, 255, 0.25) inset,
                 0px -1px 0px rgba(255, 255, 255, 0.06) inset`,
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
          position: 'relative',
          zIndex: 1,
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
                background: resolvedTheme === 'light'
                  ? (hoveredStat === idx ? 'rgba(245, 245, 245, 0.7)' : 'rgba(255, 255, 255, 0.65)')
                  : (hoveredStat === idx ? 'rgba(15, 15, 15, 0.7)' : 'rgba(12, 12, 12, 0.65)'),
                backdropFilter: 'blur(120px) saturate(200%)',
                WebkitBackdropFilter: 'blur(120px) saturate(200%)',
                border: '1px solid var(--border-primary)',
                borderRadius: '15px',
                fontSize: '0.8125rem',
                fontWeight: '400',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredStat === idx ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: resolvedTheme === 'light'
                  ? (hoveredStat === idx
                    ? `0px 16px 40px rgba(0, 0, 0, 0.15),
                       0px 0px 1px rgba(0, 0, 0, 0.3) inset,
                       0px -1px 0px rgba(0, 0, 0, 0.08) inset`
                    : `0px 8px 24px rgba(0, 0, 0, 0.1),
                       0px 0px 1px rgba(0, 0, 0, 0.2) inset,
                       0px -1px 0px rgba(0, 0, 0, 0.04) inset`)
                  : (hoveredStat === idx
                    ? `0px 16px 40px rgba(0, 0, 0, 0.6),
                       0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                       0px -1px 0px rgba(255, 255, 255, 0.08) inset`
                    : `0px 8px 24px rgba(0, 0, 0, 0.4),
                       0px 0px 1px rgba(255, 255, 255, 0.2) inset,
                       0px -1px 0px rgba(255, 255, 255, 0.04) inset`),
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
                  background: resolvedTheme === 'light'
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(10, 10, 10, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  color: 'var(--text-secondary)',
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
                    borderTop: resolvedTheme === 'light'
                      ? '6px solid rgba(255, 255, 255, 0.95)'
                      : '6px solid rgba(10, 10, 10, 0.95)',
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{
          position: 'relative',
          zIndex: 1,
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
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(12, 12, 12, 0.7))'
                : 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(12, 12, 12, 0.65))',
              backdropFilter: 'blur(120px) saturate(200%)',
              WebkitBackdropFilter: 'blur(120px) saturate(200%)',
              border: hoveredButton === 'featured'
                ? '1px solid rgba(16, 185, 129, 0.6)'
                : '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '15px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: 'clamp(0.9375rem, 1.75vw, 1rem)',
              fontWeight: '500',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: hoveredButton === 'featured' ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
              boxShadow: resolvedTheme === 'light'
                ? (hoveredButton === 'featured'
                  ? `0 20px 48px rgba(16, 185, 129, 0.2),
                     0px 0px 1px rgba(0, 0, 0, 0.3) inset,
                     0px -1px 0px rgba(0, 0, 0, 0.1) inset`
                  : `0px 12px 36px rgba(0, 0, 0, 0.1),
                     0px 0px 1px rgba(0, 0, 0, 0.2) inset,
                     0px -1px 0px rgba(0, 0, 0, 0.05) inset`)
                : (hoveredButton === 'featured'
                  ? `0 20px 48px rgba(16, 185, 129, 0.3),
                     0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                     0px -1px 0px rgba(255, 255, 255, 0.1) inset`
                  : `0px 12px 36px rgba(0, 0, 0, 0.4),
                     0px 0px 1px rgba(255, 255, 255, 0.2) inset,
                     0px -1px 0px rgba(255, 255, 255, 0.05) inset`),
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
              background: resolvedTheme === 'light'
                ? (hoveredButton === 'contact' ? 'rgba(245, 245, 245, 0.7)' : 'rgba(255, 255, 255, 0.65)')
                : (hoveredButton === 'contact' ? 'rgba(15, 15, 15, 0.7)' : 'rgba(12, 12, 12, 0.65)'),
              backdropFilter: 'blur(120px) saturate(200%)',
              WebkitBackdropFilter: 'blur(120px) saturate(200%)',
              border: '1px solid var(--border-primary)',
              borderRadius: '15px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '400',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: hoveredButton === 'contact' ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: resolvedTheme === 'light'
                ? (hoveredButton === 'contact'
                  ? `0px 16px 40px rgba(0, 0, 0, 0.15),
                     0px 0px 1px rgba(0, 0, 0, 0.3) inset,
                     0px -1px 0px rgba(0, 0, 0, 0.08) inset`
                  : `0px 8px 24px rgba(0, 0, 0, 0.1),
                     0px 0px 1px rgba(0, 0, 0, 0.2) inset,
                     0px -1px 0px rgba(0, 0, 0, 0.04) inset`)
                : (hoveredButton === 'contact'
                  ? `0px 16px 40px rgba(0, 0, 0, 0.6),
                     0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                     0px -1px 0px rgba(255, 255, 255, 0.08) inset`
                  : `0px 8px 24px rgba(0, 0, 0, 0.4),
                     0px 0px 1px rgba(255, 255, 255, 0.2) inset,
                     0px -1px 0px rgba(255, 255, 255, 0.04) inset`),
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
              background: resolvedTheme === 'light'
                ? (hoveredButton === 'github' ? 'rgba(245, 245, 245, 0.7)' : 'rgba(255, 255, 255, 0.65)')
                : (hoveredButton === 'github' ? 'rgba(15, 15, 15, 0.7)' : 'rgba(12, 12, 12, 0.65)'),
              backdropFilter: 'blur(120px) saturate(200%)',
              WebkitBackdropFilter: 'blur(120px) saturate(200%)',
              border: '1px solid var(--border-primary)',
              borderRadius: '15px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '400',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: hoveredButton === 'github' ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: resolvedTheme === 'light'
                ? (hoveredButton === 'github'
                  ? `0px 16px 40px rgba(0, 0, 0, 0.15),
                     0px 0px 1px rgba(0, 0, 0, 0.3) inset,
                     0px -1px 0px rgba(0, 0, 0, 0.08) inset`
                  : `0px 8px 24px rgba(0, 0, 0, 0.1),
                     0px 0px 1px rgba(0, 0, 0, 0.2) inset,
                     0px -1px 0px rgba(0, 0, 0, 0.04) inset`)
                : (hoveredButton === 'github'
                  ? `0px 16px 40px rgba(0, 0, 0, 0.6),
                     0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                     0px -1px 0px rgba(255, 255, 255, 0.08) inset`
                  : `0px 8px 24px rgba(0, 0, 0, 0.4),
                     0px 0px 1px rgba(255, 255, 255, 0.2) inset,
                     0px -1px 0px rgba(255, 255, 255, 0.04) inset`),
            }}
          >
            <Github size={15} />
            <span>GitHub</span>
          </Link>
        </div>

        {/* Bio Card */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(1rem, 2vw, 1.25rem)',
          background: resolvedTheme === 'light'
            ? 'rgba(255, 255, 255, 0.65)'
            : 'rgba(12, 12, 12, 0.65)',
          backdropFilter: 'blur(120px) saturate(200%)',
          WebkitBackdropFilter: 'blur(120px) saturate(200%)',
          border: '1px solid var(--border-primary)',
          borderRadius: '15px',
          fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
          fontWeight: '300',
          color: 'var(--text-tertiary)',
          lineHeight: '1.6',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
          boxShadow: resolvedTheme === 'light'
            ? `0px 12px 36px rgba(0, 0, 0, 0.12),
               0px 0px 1px rgba(0, 0, 0, 0.25) inset,
               0px -1px 0px rgba(0, 0, 0, 0.06) inset`
            : `0px 12px 36px rgba(0, 0, 0, 0.5),
               0px 0px 1px rgba(255, 255, 255, 0.25) inset,
               0px -1px 0px rgba(255, 255, 255, 0.06) inset`,
        }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>INTP</span> building at the intersection of <span style={{ color: 'var(--text-secondary)' }}>healthcare × AI × consciousness</span>. 18-month deep dive into digital therapeutics culminating in <span style={{ color: 'var(--text-secondary)' }}>PsoriAssist</span>. Built <span style={{ color: 'var(--text-secondary)' }}>5000 lines in 48 hours</span> while winning <span style={{ color: 'var(--text-secondary)' }}>2 hackathons simultaneously</span>. Currently transforming enterprise systems at <span style={{ color: 'var(--text-secondary)' }}>Air India</span> (10K+ daily users) while exploring the future of <span style={{ color: 'var(--text-secondary)' }}>human-computer symbiosis</span>.
        </div>
      </div>
    </>
  );
}
