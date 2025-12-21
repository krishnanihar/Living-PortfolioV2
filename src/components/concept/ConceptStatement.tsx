'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useLenisScroll } from '@/hooks/useLenisScroll';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ConceptStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenisScroll();
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Trigger animations when section comes into view
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      onEnter: () => setInView(true),
      onLeaveBack: () => setInView(false),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleScrollToWork = () => {
    scrollTo('#work-section', { offset: -60, duration: 1.5 });
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blurToSharp {
          0% {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="philosophy-section"
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 10,
        }}
      >
        <div
          ref={contentRef}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Main Philosophy Statement */}
          <h2
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
              fontWeight: 300,
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
              color: 'var(--text-95)',
              marginBottom: '1.5rem',
              opacity: inView && mounted ? 1 : 0,
              animation: inView && mounted ? 'blurToSharp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
              fontFamily: 'var(--font-space-grotesk)',
            }}
          >
            Most designers can't{' '}
            <span
              style={{
                background: 'linear-gradient(120deg, rgba(59,130,246,0.7), rgba(96,165,250,0.8), rgba(59,130,246,0.7), rgba(96,165,250,0.8))',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 500,
                animation: 'gradientFlow 18s ease-in-out infinite',
              }}
            >
              code
            </span>
            . Most developers can't{' '}
            <span
              style={{
                background: 'linear-gradient(120deg, rgba(236,72,153,0.7), rgba(139,92,246,0.8), rgba(236,72,153,0.7), rgba(139,92,246,0.8))',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 500,
                animation: 'gradientFlow 18s ease-in-out infinite',
              }}
            >
              design
            </span>
            .
          </h2>

          {/* Value Proposition */}
          <p
            style={{
              fontSize: 'clamp(0.9375rem, 1.75vw, 1.125rem)',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'var(--text-85)',
              marginBottom: '1.5rem',
              opacity: inView && mounted ? 1 : 0,
              animation: inView && mounted ? 'blurToSharp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
            }}
          >
            I design and code experiences that remember, learn, and scale—
            <br />
            serving <span style={{ fontWeight: 400 }}>millions</span> across aviation, healthcare, and beyond.
          </p>

          {/* Meta Statement */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'var(--text-95)',
              marginBottom: '2rem',
              opacity: inView && mounted ? 1 : 0,
              animation: inView && mounted ? 'blurToSharp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
            }}
          >
            Including this site. Designed and coded <span style={{ fontWeight: 500 }}>from the ground up</span>.
          </p>

          {/* Breathing Orb */}
          <div
            style={{
              marginTop: '3rem',
              display: 'flex',
              justifyContent: 'center',
              opacity: inView && mounted ? 1 : 0,
              animation: inView && mounted ? 'blurToSharp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' : 'none',
            }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(218, 14, 41, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)',
                filter: 'blur(40px)',
                animation: 'breathe 4s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={handleScrollToWork}
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
            background: 'none',
            border: 'none',
            padding: '0.5rem',
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
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'var(--text-50)',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <div style={{ animation: 'scrollBounce 3s ease-in-out infinite' }}>
            <ChevronDown size={18} style={{ color: 'var(--text-50)' }} />
          </div>
        </button>
      </section>
    </>
  );
}
