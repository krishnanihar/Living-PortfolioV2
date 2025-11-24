'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail, Github } from 'lucide-react';

// Unified Glass Button Style - Elegant & Minimal
const UNIFIED_GLASS = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(60px) saturate(180%) brightness(1.05)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1)
  `,
};

export function IntroductionSection() {
  const [hoveredButton, setHoveredButton] = useState<'contact' | 'github' | null>(null);
  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [greeting, setGreeting] = useState('');

  // Smart greeting system with localStorage
  const getGreeting = (visitCount: number, currentHour: number) => {
    const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

    if (visitCount === 1) return "Hi, I'm Nihar. Welcome.";
    if (visitCount <= 5) return `${timeGreeting}. I'm Nihar, welcome back.`;
    return `${timeGreeting} again. I'm Nihar.`;
  };

  useEffect(() => {
    setMounted(true);

    // Visitor tracking
    const visitCount = parseInt(localStorage.getItem('portfolio_visit_count') || '0') + 1;
    const currentHour = new Date().getHours();

    localStorage.setItem('portfolio_visit_count', visitCount.toString());
    localStorage.setItem('portfolio_last_visit', new Date().toISOString());
    localStorage.setItem('portfolio_has_visited', 'true');

    // Set personalized greeting
    setGreeting(getGreeting(visitCount, currentHour));

    // Staggered animation stages
    const stages = [1, 2, 3];
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 100);
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

          .hero-buttons {
            flex-direction: column !important;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
          }

          .hero-buttons a {
            width: 100% !important;
            justify-content: center !important;
          }

          .hero-greeting {
            font-size: clamp(2rem, 6vw, 2.5rem) !important;
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
        {/* Centered Content Container */}
        <div
          className="hero-content"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Personalized Greeting - Integrated with Name */}
          <h1
            className="hero-greeting"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '200',
              lineHeight: '1.3',
              letterSpacing: '0.01em',
              marginBottom: '1.5rem',
              color: 'rgba(255, 255, 255, 0.95)',
              opacity: animationStage >= 1 ? 1 : 0,
              transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {greeting || "Hi, I'm Nihar. Welcome."}
          </h1>

          {/* Subtitle */}
          <div
            style={{
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: '2.5rem',
              opacity: animationStage >= 2 ? 1 : 0,
              transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
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
              Designing experiences that millions interact with daily, from 30,000ft to healthcare
            </p>
          </div>

          {/* Unified Glass Button Pair */}
          <div
            className="hero-buttons"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 2.5vw, 2rem)',
              flexWrap: 'wrap',
              opacity: animationStage >= 3 ? 1 : 0,
              transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            {/* Contact Button */}
            <a
              href="mailto:krishnaniharsunkara@gmail.com"
              onMouseEnter={() => setHoveredButton('contact')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '14px 28px',
                ...UNIFIED_GLASS,
                background: hoveredButton === 'contact' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)',
                borderColor: hoveredButton === 'contact' ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                color: 'rgba(255, 255, 255, 0.95)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredButton === 'contact' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                overflow: 'hidden',
              }}
            >
              {/* Subtle shimmer on hover */}
              {hoveredButton === 'contact' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <Mail size={16} style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Contact</span>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/krishn404"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredButton('github')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '14px 28px',
                ...UNIFIED_GLASS,
                background: hoveredButton === 'github' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)',
                borderColor: hoveredButton === 'github' ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                color: 'rgba(255, 255, 255, 0.95)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredButton === 'github' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                overflow: 'hidden',
              }}
            >
              {/* Subtle shimmer on hover */}
              {hoveredButton === 'github' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <Github size={16} style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>GitHub</span>
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
