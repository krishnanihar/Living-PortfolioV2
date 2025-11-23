'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export function IntroductionSection() {
  const [hoveredButton, setHoveredButton] = useState(false);
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

  const scrollToNext = () => {
    const aboutSection = document.querySelector('[id*="about"]');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            text-align: center !important;
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
        {/* Centered Content Container - NO containers, pure minimalism */}
        <div
          className="hero-content"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
            textAlign: 'center', // Centered layout
          }}
        >
          {/* Name - Pure White Solid Text */}
          <h1
            style={{
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              fontWeight: '100',
              lineHeight: '0.9',
              letterSpacing: '-0.06em',
              marginBottom: '1.5rem',
              color: 'rgba(255, 255, 255, 0.95)', // Pure white - NO gradient
              opacity: animationStage >= 1 ? 1 : 0,
              transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Krishna Nihar
          </h1>

          {/* Subtitle - Single Clean Line */}
          <div
            style={{
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: '2.5rem',
              opacity: animationStage >= 2 ? 1 : 0,
              transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.01em',
                lineHeight: '1.6',
              }}
            >
              From ego death simulators to enterprise systems — designing experiences that millions interact with daily, from 30,000ft to healthcare
            </p>
          </div>

          {/* Single Minimal Button */}
          <div
            style={{
              opacity: animationStage >= 3 ? 1 : 0,
              transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <Link
              href="/work/psoriassist"
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: hoveredButton
                  ? '1px solid rgba(255, 255, 255, 0.9)'
                  : '1px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '10px',
                color: 'rgba(255, 255, 255, 0.95)',
                textDecoration: 'none',
                fontSize: 'clamp(0.9375rem, 1.75vw, 1rem)',
                fontWeight: '300',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredButton ? 'scale(1.02)' : 'scale(1)',
                opacity: hoveredButton ? 1 : 0.9,
              }}
            >
              <span>View Featured Work</span>
            </Link>
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
              color: 'rgba(255, 255, 255, 0.5)',
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
            <ChevronDown size={18} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
          </div>
        </div>
      </section>
    </>
  );
}
