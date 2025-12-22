'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';
import { useLenisScroll } from '@/hooks/useLenisScroll';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface WorkConceptHeroProps {
  scrollProgress?: number;
}

/**
 * Work page hero with ConceptHero-style shrinking animation
 * - Shrinking container on scroll (padding + border-radius)
 * - Glassmorphism inner container
 * - Gradient overlays for depth
 * - No particles (clean background)
 */
export function WorkConceptHero({ scrollProgress = 0 }: WorkConceptHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenisScroll();

  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Staggered animation stages
    const stages = [1, 2, 3];
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 100);
    });
  }, []);

  // Shrinking animation on scroll - using useGSAP for proper cleanup
  useGSAP(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    if (!container || !inner) return;

    // Initialize styles to prevent stale state from previous navigation
    gsap.set(container, { paddingLeft: 0, paddingRight: 0 });
    gsap.set(inner, { borderRadius: 0 });

    // Create the shrink animation with unique ID
    ScrollTrigger.create({
      id: 'work-hero-shrink', // Unique ID for this trigger
      trigger: container,
      start: 'top top',
      end: 'bottom 60%',
      scrub: 0.5,
      invalidateOnRefresh: true, // Recalculate on refresh
      onUpdate: (self) => {
        const progress = self.progress;
        const easedProgress = gsap.parseEase('power2.out')(progress);

        // Animate padding: 0 -> 48px (left/right)
        gsap.set(container, {
          paddingLeft: easedProgress * 48,
          paddingRight: easedProgress * 48,
        });

        // Animate border-radius: 0 -> 32px
        gsap.set(inner, { borderRadius: easedProgress * 32 });
      },
    });
  }, { scope: containerRef }); // Scoped cleanup

  const handleScrollToNext = () => {
    scrollTo('#journey-overview', { offset: -60, duration: 1.5 });
  };

  return (
    <>
      <style jsx>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      <section
        ref={containerRef}
        style={{
          height: '100dvh',
          position: 'relative',
          padding: 0,
          willChange: 'padding',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <div
          ref={innerRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 0,
            willChange: 'border-radius',
            background: 'var(--glass-03)',
            backdropFilter: mounted ? 'blur(60px) saturate(180%)' : 'none',
            WebkitBackdropFilter: mounted ? 'blur(60px) saturate(180%)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Gradient overlay for depth */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(
                  ellipse 80% 50% at 50% 0%,
                  var(--glass-08) 0%,
                  transparent 50%
                ),
                radial-gradient(
                  ellipse 60% 40% at 80% 100%,
                  var(--glass-05) 0%,
                  transparent 40%
                )
              `,
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              width: '100%',
              textAlign: 'center',
              padding: '0 clamp(1.5rem, 4vw, 3rem)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Eyebrow */}
            <p
              style={{
                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-50)',
                marginBottom: '1rem',
                fontFamily: 'var(--font-space-grotesk)',
                opacity: animationStage >= 1 ? 1 : 0,
                transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
                filter: animationStage >= 1 ? 'blur(0)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Selected Work
            </p>

            {/* Main title */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 200,
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                marginBottom: '1rem',
                color: 'var(--text-95)',
                fontFamily: 'var(--font-space-grotesk)',
                opacity: animationStage >= 1 ? 1 : 0,
                transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
                filter: animationStage >= 1 ? 'blur(0)' : 'blur(12px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Explore My Work
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(0.9375rem, 1.75vw, 1.125rem)',
                fontWeight: 300,
                color: 'var(--text-60)',
                maxWidth: '42rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
                letterSpacing: '0.01em',
                opacity: animationStage >= 2 ? 1 : 0,
                transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
                filter: animationStage >= 2 ? 'blur(0)' : 'blur(10px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              From enterprise systems at 30,000ft to consciousness-exploring research
            </p>

            {/* Stats Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'clamp(2rem, 5vw, 4rem)',
                flexWrap: 'wrap',
                opacity: animationStage >= 3 ? 1 : 0,
                transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(15px)',
                filter: animationStage >= 3 ? 'blur(0)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              {[
                { value: '12+', label: 'Shipped Products' },
                { value: '4', label: 'Years Experience' },
                { value: '3', label: 'Domains' },
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                      fontWeight: 300,
                      color: 'var(--text-90)',
                      fontFamily: 'var(--font-space-grotesk)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                      fontWeight: 400,
                      color: 'var(--text-45)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={handleScrollToNext}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: 1 - scrollProgress * 3,
              transition: 'opacity 0.3s ease',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <span
              style={{
                color: 'var(--text-40)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Scroll
            </span>
            <ChevronDown
              size={20}
              style={{
                color: 'var(--text-40)',
                animation: 'scrollBounce 2s ease-in-out infinite',
              }}
            />
          </button>
        </div>
      </section>
    </>
  );
}
