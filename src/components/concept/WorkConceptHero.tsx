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

// Ultra-Liquid Glass Style - iOS 26 Inspired
const UNIFIED_GLASS = {
  background: 'var(--glass-03)',
  backdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  border: '1px solid var(--text-10)',
  boxShadow: `
    0 12px 48px rgba(0, 0, 0, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.10),
    inset 0 1px 2px var(--glass-25),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15)
  `,
};

// Stats data
const statsData = [
  { value: 12, label: 'Shipped Products', suffix: '+' },
  { value: 4, label: 'Years Experience', suffix: '' },
  { value: 3, label: 'Domains', suffix: '' },
];

interface WorkConceptHeroProps {
  scrollProgress?: number;
}

export default function WorkConceptHero({ scrollProgress = 0 }: WorkConceptHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollTo, lenis } = useLenisScroll();

  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [displayValues, setDisplayValues] = useState(statsData.map(() => 0));

  useEffect(() => {
    setMounted(true);
    // Staggered animation stages
    const stages = [1, 2, 3, 4];
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 100);
    });

    // Refresh ScrollTrigger after content loads
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  // Sync ScrollTrigger with Lenis
  useEffect(() => {
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });
      ScrollTrigger.refresh();
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update);
      }
    };
  }, [lenis]);

  // Animate stats counter when stage 3 is reached
  useEffect(() => {
    if (animationStage >= 3) {
      statsData.forEach((stat, index) => {
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);

          setDisplayValues(prev => {
            const newValues = [...prev];
            newValues[index] = Math.round(stat.value * eased);
            return newValues;
          });

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      });
    }
  }, [animationStage]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    if (!container || !inner) return;

    // Create the shrink animation
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom 60%',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const easedProgress = gsap.parseEase('power2.out')(progress);

        // Animate padding: 0 -> 48px (left/right)
        const padding = easedProgress * 48;
        container.style.paddingLeft = `${padding}px`;
        container.style.paddingRight = `${padding}px`;

        // Animate border-radius: 0 -> 32px
        const radius = easedProgress * 32;
        inner.style.borderRadius = `${radius}px`;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleScrollToProjects = () => {
    scrollTo('#work-content', { offset: -60, duration: 1.5 });
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
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
            backdropFilter: 'blur(60px) saturate(180%)',
            WebkitBackdropFilter: 'blur(60px) saturate(180%)',
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

          {/* Main Content */}
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
            <div
              style={{
                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                fontWeight: 400,
                color: 'var(--text-50)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                opacity: animationStage >= 1 ? 1 : 0,
                transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
                filter: animationStage >= 1 ? 'blur(0)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              Selected Work
            </div>

            {/* Main Heading */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 200,
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                marginBottom: '1rem',
                color: 'var(--text-95)',
                position: 'relative',
                opacity: animationStage >= 1 ? 1 : 0,
                transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
                filter: animationStage >= 1 ? 'blur(0)' : 'blur(12px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              <span
                style={{
                  position: 'relative',
                  background: `linear-gradient(120deg,
                    rgba(59, 130, 246, 0.15),
                    rgba(139, 92, 246, 0.15),
                    rgba(236, 72, 153, 0.15),
                    rgba(139, 92, 246, 0.15),
                    rgba(59, 130, 246, 0.15))`,
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  animation: 'gradientFlow 20s ease-in-out infinite',
                }}
              >
                Explore My Work
              </span>
            </h1>

            {/* Subtitle */}
            <div
              style={{
                maxWidth: '650px',
                margin: '0 auto',
                marginBottom: '2.5rem',
                opacity: animationStage >= 2 ? 1 : 0,
                transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
                filter: animationStage >= 2 ? 'blur(0)' : 'blur(10px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(0.9375rem, 1.75vw, 1.125rem)',
                  fontWeight: 300,
                  color: 'var(--text-60)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.6,
                }}
              >
                From enterprise systems at 30,000ft to consciousness-exploring research
              </p>
            </div>

            {/* Stats Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'clamp(2rem, 5vw, 4rem)',
                marginBottom: '2.5rem',
                opacity: animationStage >= 3 ? 1 : 0,
                transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(15px)',
                filter: animationStage >= 3 ? 'blur(0)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
                flexWrap: 'wrap',
              }}
            >
              {statsData.map((stat, index) => (
                <div
                  key={stat.label}
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
                    {displayValues[index]}{stat.suffix}
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

            {/* CTA Button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: animationStage >= 4 ? 1 : 0,
                transform: animationStage >= 4 ? 'translateY(0)' : 'translateY(15px)',
                filter: animationStage >= 4 ? 'blur(0)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              <button
                onClick={handleScrollToProjects}
                onMouseEnter={() => setHoveredButton(true)}
                onMouseLeave={() => setHoveredButton(false)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '13px 28px',
                  ...UNIFIED_GLASS,
                  background: hoveredButton
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.06), rgba(236, 72, 153, 0.04))'
                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.04), rgba(236, 72, 153, 0.02))',
                  borderColor: hoveredButton ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.08)',
                  borderRadius: '20px',
                  color: 'var(--text-95)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: hoveredButton ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg,
                      rgba(139, 92, 246, 0.08) 0%,
                      transparent 40%,
                      transparent 60%,
                      rgba(236, 72, 153, 0.05) 100%)`,
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none',
                    opacity: hoveredButton ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                />
                <span style={{ position: 'relative', zIndex: 1 }}>View Projects</span>
                <ChevronDown size={15} style={{ position: 'relative', zIndex: 1 }} />
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={handleScrollToProjects}
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
