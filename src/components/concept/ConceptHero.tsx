'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Mail, Compass, Sun, Moon, Sparkles } from 'lucide-react';
import Link from 'next/link';
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

interface ConceptHeroProps {
  scrollProgress?: number;
}

// Get time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { icon: 'sun', opener: 'Good morning', message: "I'm Nihar.", secondary: 'Welcome.' };
  } else if (hour >= 12 && hour < 17) {
    return { icon: 'sun', opener: 'Good afternoon', message: "I'm Nihar.", secondary: 'Welcome.' };
  } else if (hour >= 17 && hour < 21) {
    return { icon: 'moon', opener: 'Good evening', message: "I'm Nihar.", secondary: 'Welcome.' };
  } else {
    return { icon: 'sparkles', opener: 'Hello, night owl', message: "I'm Nihar.", secondary: 'Welcome.' };
  }
}

export default function ConceptHero({ scrollProgress = 0 }: ConceptHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenisScroll();

  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [hoveredButton, setHoveredButton] = useState<'contact' | 'tour' | null>(null);
  const [greeting] = useState(getGreeting);

  useEffect(() => {
    setMounted(true);
    // Staggered animation stages
    const stages = [1, 2, 3];
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 100);
    });
  }, []);

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

  const handleScrollToNext = () => {
    scrollTo('#philosophy-section', { offset: -60, duration: 1.5 });
  };

  const renderGreetingIcon = () => {
    const iconProps = { size: 16, style: { opacity: 0.8 } };
    switch (greeting.icon) {
      case 'sun': return <Sun {...iconProps} />;
      case 'moon': return <Moon {...iconProps} />;
      case 'sparkles': return <Sparkles {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes particleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.1); }
          33% { text-shadow: 0 0 30px rgba(59, 130, 246, 0.15); }
          66% { text-shadow: 0 0 25px rgba(236, 72, 153, 0.12); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
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

          {/* Centered Content Container */}
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
            {/* Opener Greeting - Small, Subtle with Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                fontWeight: 300,
                color: 'var(--text-60)',
                letterSpacing: '0.02em',
                marginBottom: '0.5rem',
                opacity: animationStage >= 1 ? 1 : 0,
                transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
                filter: animationStage >= 1 ? 'blur(0)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {renderGreetingIcon()}
              <span>{greeting.opener}</span>
            </div>

            {/* Main Greeting Message */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 200,
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                marginBottom: '0.75rem',
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
                {greeting.message}
              </span>
            </h1>

            {/* Secondary Message */}
            <div
              style={{
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                fontWeight: 300,
                color: 'var(--text-60)',
                letterSpacing: '0.01em',
                marginBottom: '1.5rem',
                opacity: animationStage >= 1 ? 1 : 0,
                transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(15px)',
                filter: animationStage >= 1 ? 'blur(0)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
              }}
            >
              {greeting.secondary}
            </div>

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
                  color: 'var(--text-65)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.6,
                }}
              >
                Designing experiences that millions interact with daily, from 30,000ft to healthcare
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'clamp(1.5rem, 2.5vw, 2rem)',
                flexWrap: 'wrap',
                opacity: animationStage >= 3 ? 1 : 0,
                transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(15px)',
                filter: animationStage >= 3 ? 'blur(0)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              {/* Contact Button */}
              <Link
                href="/contact"
                onMouseEnter={() => setHoveredButton('contact')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '13px 26px',
                  ...UNIFIED_GLASS,
                  background: hoveredButton === 'contact'
                    ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.04), rgba(139, 92, 246, 0.03))'
                    : 'linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(139, 92, 246, 0.02))',
                  borderColor: hoveredButton === 'contact' ? 'rgba(236, 72, 153, 0.12)' : 'rgba(236, 72, 153, 0.08)',
                  borderRadius: '20px',
                  color: 'var(--text-95)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: hoveredButton === 'contact' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg,
                      rgba(236, 72, 153, 0.08) 0%,
                      transparent 40%,
                      transparent 60%,
                      rgba(139, 92, 246, 0.05) 100%)`,
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none',
                    opacity: hoveredButton === 'contact' ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                />
                <Mail size={15} style={{ position: 'relative', zIndex: 1 }} />
                <span style={{ position: 'relative', zIndex: 1 }}>Contact</span>
              </Link>

              {/* Quick Tour Button */}
              <button
                onClick={() => scrollTo('#work-section', { offset: -60, duration: 1.5 })}
                onMouseEnter={() => setHoveredButton('tour')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '13px 26px',
                  ...UNIFIED_GLASS,
                  background: hoveredButton === 'tour'
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.06), rgba(236, 72, 153, 0.04))'
                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.04), rgba(236, 72, 153, 0.02))',
                  borderColor: hoveredButton === 'tour' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.08)',
                  borderRadius: '20px',
                  color: 'var(--text-95)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: hoveredButton === 'tour' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                  overflow: 'hidden',
                  border: '1px solid',
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
                    opacity: hoveredButton === 'tour' ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                />
                <Compass size={15} style={{ position: 'relative', zIndex: 1 }} />
                <span style={{ position: 'relative', zIndex: 1 }}>View Work</span>
              </button>
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
