'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, ArrowDown } from 'lucide-react';
import { timelineMilestones, iconMap } from '@/data/timeline';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import 3D scene to avoid SSR issues
const HeroScene3D = dynamic(() => import('@/components/HeroScene3D').then(mod => ({ default: mod.HeroScene3D })), {
  ssr: false,
  loading: () => null
});

export function JourneyTimeline() {
  const scrollProgress = useScrollProgress();
  const scrollVelocity = useScrollVelocity();
  const [visibleMilestones, setVisibleMilestones] = useState<Set<number>>(new Set());
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const milestonesRef = useRef<(HTMLElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Hero Animation
  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    tl.from(heroRef.current.querySelector('h1'), {
      y: 60,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
    })
    .from(heroRef.current.querySelector('p'), {
      y: 40,
      opacity: 0,
      duration: 1,
    }, '-=0.8')
    .from(heroRef.current.querySelector('[data-scroll-indicator]'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
    }, '-=0.6');
  }, { scope: heroRef });

  // GSAP Timeline Progress Line Animation
  useGSAP(() => {
    if (!timelineLineRef.current || !containerRef.current) return;

    gsap.to(timelineLineRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });
  }, { scope: containerRef, dependencies: [] });

  // GSAP Milestone Animations with Text Split
  useGSAP(() => {
    milestonesRef.current.forEach((milestone, index) => {
      if (!milestone) return;

      const card = milestone.querySelector('[data-milestone-card]');
      const year = milestone.querySelector('[data-year]');
      const icon = milestone.querySelector('[data-icon]');
      const title = milestone.querySelector('h3');
      const content = milestone.querySelectorAll('p, [data-tags]');
      const dot = milestone.querySelector('[data-dot]');

      // Split title text into characters
      let splitTitle: SplitType | null = null;
      if (title) {
        splitTitle = new SplitType(title, { types: 'chars' });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: milestone,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => {
            setVisibleMilestones((prev) => new Set(prev).add(index));
            setActiveSection(index);
          },
        }
      });

      // Stagger animation for card elements
      if (card) {
        tl.fromTo(card,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotateY: index % 2 === 0 ? -15 : 15,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
          }
        );
      }

      if (year) {
        tl.fromTo(year,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.6'
        );
      }

      if (icon) {
        tl.fromTo(icon,
          { scale: 0, rotation: -180, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
          '-=0.4'
        );
      }

      // Animate title characters
      if (splitTitle && splitTitle.chars) {
        tl.from(splitTitle.chars, {
          y: 30,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '-=0.5');
      }

      if (content && content.length > 0) {
        tl.fromTo(content,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (dot) {
        tl.fromTo(dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' },
          0
        );
      }
    });
  }, { scope: containerRef, dependencies: [] });

  // Track scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle milestone card mouse move for magnetic effect
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;

    card.style.transform = `
      translate(${x}px, ${y}px)
      scale(1.02)
      rotateY(${x * 0.5}deg)
      rotateX(${-y * 0.5}deg)
    `;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = '';
  };

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated Background with Parallax */}
      <div style={{
        position: 'absolute',
        inset: 0,
        minHeight: '100%',
        pointerEvents: 'none',
        transform: `translateY(${scrollProgress * -200}px)`,
        background: `
          radial-gradient(
            circle at 50% ${50 + scrollProgress * 50}%,
            rgba(218, 14, 41, 0.08),
            transparent
          ),
          linear-gradient(180deg, #0a0a0a 0%, #111111 100%)
        `,
        transition: 'background 0.3s ease',
      }} />

      {/* Animated Film Grain Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
        backgroundSize: '120%',
        opacity: 0.15,
        pointerEvents: 'none',
        animation: 'filmGrain 8s steps(10) infinite',
        mixBlendMode: 'overlay',
      }} />

      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 10000,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, rgba(218, 14, 41, 0.8), rgba(218, 14, 41, 0.4))',
          boxShadow: scrollProgress > 0.25 && scrollProgress < 0.26 ? '0 0 20px rgba(218, 14, 41, 0.8)' :
                     scrollProgress > 0.5 && scrollProgress < 0.51 ? '0 0 20px rgba(218, 14, 41, 0.8)' :
                     scrollProgress > 0.75 && scrollProgress < 0.76 ? '0 0 20px rgba(218, 14, 41, 0.8)' : 'none',
          transition: 'width 0.1s ease-out, box-shadow 0.3s ease',
        }} />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '2rem',
      }}>
        {/* 3D Background Scene */}
        <HeroScene3D />

        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: '200',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          The Journey
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: '300',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: '1.6',
        }}>
          From experimenting with interfaces to designing at scale
        </p>

        {/* Scroll Indicator */}
        <div data-scroll-indicator style={{
          position: 'absolute',
          bottom: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          opacity: scrolled ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: scrolled ? 'none' : 'auto',
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Scroll to explore
          </span>
          <ArrowDown
            size={24}
            style={{
              color: 'var(--text-muted)',
              animation: 'scrollBounce 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* Timeline Container */}
      <div style={{
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '8rem 2rem 20rem 2rem',
        zIndex: 10,
      }}>
        {/* Center Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '8rem',
          bottom: '15rem',
          width: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          transform: 'translateX(-50%)',
          overflow: 'hidden',
        }}>
          {/* Shimmer Effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            animation: 'shimmer 2s linear infinite',
          }} />

          {/* Progress Line */}
          <div ref={timelineLineRef} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(180deg, rgba(218, 14, 41, 0.8), rgba(218, 14, 41, 0.4))',
            boxShadow: '0 0 20px rgba(218, 14, 41, 0.5)',
            transformOrigin: 'top',
            scaleY: 0,
          }} />

          {/* Progress Particles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(218, 14, 41, 0.8)',
                boxShadow: '0 0 8px rgba(218, 14, 41, 0.6)',
                animation: `particleFloat 3s ease-in infinite ${i * 0.6}s`,
                opacity: scrollProgress > 0.1 ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Milestones */}
        {timelineMilestones.map((milestone, index) => {
          const IconComponent = iconMap[milestone.icon];
          const isVisible = visibleMilestones.has(index);
          const isActive = activeSection === index;
          const isPast = visibleMilestones.has(index) && activeSection > index;

          // Calculate scroll velocity effects
          const blurAmount = Math.min(scrollVelocity * 2, 8);
          const skewAmount = Math.min(scrollVelocity * 0.5, 2);
          const chromaticOffset = Math.min(scrollVelocity * 0.3, 1.5);

          return (
            <article
              key={milestone.id}
              ref={(el) => { milestonesRef.current[index] = el; }}
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: milestone.side === 'left' ? '1fr auto 1fr' : '1fr auto 1fr',
                gap: '3rem',
                marginBottom: index === timelineMilestones.length - 1 ? 0 : '10rem',
              }}
            >
              {/* Left Side (Card or Empty) */}
              <div style={{ gridColumn: milestone.side === 'left' ? '1' : '3' }}>
                {milestone.side === 'left' && (
                  <div
                    data-milestone-card
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(60px) saturate(140%) brightness(0.95)',
                      WebkitBackdropFilter: 'blur(60px) saturate(140%) brightness(0.95)',
                      border: `1px solid rgba(255, 255, 255, ${isActive ? 0.15 : 0.08})`,
                      borderRadius: '32px',
                      padding: '2.5rem',
                      boxShadow: isActive
                        ? `
                          inset 0 1px 0 rgba(255, 255, 255, 0.1),
                          inset 0 -1px 0 rgba(0, 0, 0, 0.15),
                          0 24px 80px rgba(0, 0, 0, 0.4),
                          0 0 60px rgba(218, 14, 41, 0.2)
                        `
                        : `
                          inset 0 1px 0 rgba(255, 255, 255, 0.05),
                          inset 0 -1px 0 rgba(0, 0, 0, 0.15),
                          0 24px 80px rgba(0, 0, 0, 0.4)
                        `,
                      filter: blurAmount > 2
                        ? `blur(${blurAmount * 0.5}px)`
                        : 'none',
                      transform: skewAmount > 0.5
                        ? `skewY(${skewAmount * (milestone.side === 'left' ? -1 : 1)}deg)`
                        : '',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer',
                      willChange: 'transform, filter',
                    }}
                  >
                    <span data-year style={{
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '1.5rem',
                    }}>
                      {milestone.year}
                    </span>

                    <div data-icon style={{ marginBottom: '1.5rem' }}>
                      <IconComponent
                        size={32}
                        style={{
                          color: 'rgba(218, 14, 41, 0.8)',
                          filter: 'drop-shadow(0 0 10px rgba(218, 14, 41, 0.3))',
                        }}
                      />
                    </div>

                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.01em',
                    }}>
                      {milestone.title}
                    </h3>

                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      marginBottom: '1.5rem',
                      fontWeight: '300',
                    }}>
                      {milestone.subtitle}
                    </p>

                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      fontWeight: '300',
                    }}>
                      {milestone.description}
                    </p>

                    <div data-tags style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}>
                      {milestone.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            cursor: 'pointer',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Center Dot */}
              <div style={{
                gridColumn: '2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <div data-dot style={{
                  width: isPast || isActive ? '16px' : '12px',
                  height: isPast || isActive ? '16px' : '12px',
                  borderRadius: '50%',
                  background: isPast || isActive ? 'rgba(218, 14, 41, 0.9)' : 'rgba(255, 255, 255, 0.2)',
                  border: isPast || isActive ? '2px solid rgba(218, 14, 41, 0.5)' : '2px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: isActive ? '0 0 0 8px rgba(218, 14, 41, 0.2)' : 'none',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  animation: isActive ? 'dotPulse 2s ease-in-out infinite' : 'none',
                  cursor: 'pointer',
                }} />
              </div>

              {/* Right Side (Card or Empty) */}
              <div style={{ gridColumn: milestone.side === 'right' ? '3' : '1' }}>
                {milestone.side === 'right' && (
                  <div
                    data-milestone-card
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(60px) saturate(140%) brightness(0.95)',
                      WebkitBackdropFilter: 'blur(60px) saturate(140%) brightness(0.95)',
                      border: `1px solid rgba(255, 255, 255, ${isActive ? 0.15 : 0.08})`,
                      borderRadius: '32px',
                      padding: '2.5rem',
                      boxShadow: isActive
                        ? `
                          inset 0 1px 0 rgba(255, 255, 255, 0.1),
                          inset 0 -1px 0 rgba(0, 0, 0, 0.15),
                          0 24px 80px rgba(0, 0, 0, 0.4),
                          0 0 60px rgba(218, 14, 41, 0.2)
                        `
                        : `
                          inset 0 1px 0 rgba(255, 255, 255, 0.05),
                          inset 0 -1px 0 rgba(0, 0, 0, 0.15),
                          0 24px 80px rgba(0, 0, 0, 0.4)
                        `,
                      filter: blurAmount > 2
                        ? `blur(${blurAmount * 0.5}px)`
                        : 'none',
                      transform: skewAmount > 0.5
                        ? `skewY(${skewAmount * (milestone.side === 'left' ? -1 : 1)}deg)`
                        : '',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer',
                      willChange: 'transform, filter',
                    }}
                  >
                    <span data-year style={{
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '1.5rem',
                    }}>
                      {milestone.year}
                    </span>

                    <div data-icon style={{ marginBottom: '1.5rem' }}>
                      <IconComponent
                        size={32}
                        style={{
                          color: 'rgba(218, 14, 41, 0.8)',
                          filter: 'drop-shadow(0 0 10px rgba(218, 14, 41, 0.3))',
                        }}
                      />
                    </div>

                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.01em',
                    }}>
                      {milestone.title}
                    </h3>

                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      marginBottom: '1.5rem',
                      fontWeight: '300',
                    }}>
                      {milestone.subtitle}
                    </p>

                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      fontWeight: '300',
                    }}>
                      {milestone.description}
                    </p>

                    <div data-tags style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}>
                      {milestone.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            cursor: 'pointer',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
