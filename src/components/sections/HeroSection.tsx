'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToNext = () => {
    const heroCard = document.getElementById('hero-card-section');
    if (heroCard) {
      heroCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>

      <section
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: 'var(--bg-primary)',
          paddingTop: '60px',
        }}
      >
        {/* Content Container */}
        <div
          style={{
            maxWidth: '1000px',
            padding: '0 clamp(1.5rem, 3vw, 2.5rem)',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Main Heading */}
          <h1
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              fontWeight: '200',
              color: 'rgba(255, 255, 255, 0.98)',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              letterSpacing: '-0.04em',
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' : 'none',
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
              marginBottom: '2rem',
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
            }}
          >
            Designer <span style={{ color: '#DA0E29', fontWeight: '400' }}>×</span> Engineer <span style={{ color: '#DA0E29', fontWeight: '400' }}>×</span> Consciousness Explorer
          </p>

          {/* Impact Statement */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '0.01em',
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' : 'none',
            }}
          >
            From <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '400' }}>ego death simulators</span> to <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '400' }}>enterprise systems</span> — building experiences that matter
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              flexWrap: 'wrap',
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
            }}
          >
            <a
              href="/work/psoriassist"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: 'clamp(0.875rem, 1.75vw, 1rem) clamp(1.75rem, 3.5vw, 2.25rem)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(255, 255, 255, 0.06))',
                backdropFilter: 'blur(100px) saturate(150%)',
                WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderRadius: '15px',
                color: 'rgba(255, 255, 255, 0.98)',
                textDecoration: 'none',
                fontSize: 'clamp(0.9375rem, 1.75vw, 1rem)',
                fontWeight: '500',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.3), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(255, 255, 255, 0.1))';
                e.currentTarget.style.border = '1px solid rgba(16, 185, 129, 0.6)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(16, 185, 129, 0.25), 0px 0px 12px rgba(255, 255, 255, 0.03) inset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(255, 255, 255, 0.06))';
                e.currentTarget.style.border = '1px solid rgba(16, 185, 129, 0.35)';
                e.currentTarget.style.boxShadow = '0px 8px 30px rgba(0, 0, 0, 0.3), 0px 0px 8px rgba(255, 255, 255, 0.02) inset';
              }}
            >
              View Featured Work
            </a>

            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: 'clamp(0.75rem, 1.5vw, 0.875rem) clamp(1.5rem, 3vw, 1.75rem)',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(100px) saturate(150%)',
                WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '15px',
                color: 'rgba(255, 255, 255, 0.85)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '400',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = '0px 8px 30px rgba(0, 0, 0, 0.4), 0px 0px 12px rgba(255, 255, 255, 0.03) inset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset';
              }}
            >
              Get in Touch
            </a>
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
            animation: mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1s both' : 'none',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.6';
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: '400',
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
