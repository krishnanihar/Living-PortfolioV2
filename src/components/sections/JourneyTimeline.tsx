'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MousePointer2, ArrowDown, ExternalLink } from 'lucide-react';
import { timelineMilestones, iconMap } from '@/data/timeline';
import Image from 'next/image';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactChat } from '../ContactChat';
import { Chatbot } from '../Chatbot';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function JourneyTimeline() {
  const scrollProgress = useScrollProgress();
  const [visibleMilestones, setVisibleMilestones] = useState<Set<number>>(new Set());
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [cardHovers, setCardHovers] = useState<Record<number, boolean>>({});
  const milestonesRef = useRef<(HTMLElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  // Hash navigation - scroll to anchor on page load or hash change
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const targetId = hash.substring(1); // Remove the '#'
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Wait for layout to settle
        setTimeout(() => {
          const navHeight = 120; // Account for fixed navigation
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    };

    // Handle on initial load
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

  // GSAP Hero Animation
  useEffect(() => {
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

    return () => {
      tl.kill();
    };
  }, []);

  // GSAP Timeline Progress Line Animation
  useEffect(() => {
    if (!timelineLineRef.current || !containerRef.current) return;

    const animation = gsap.to(timelineLineRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // GSAP Milestone Animations - Simplified & Subtle
  useEffect(() => {
    const timelines: gsap.core.Timeline[] = [];

    milestonesRef.current.forEach((milestone, index) => {
      if (!milestone) return;

      const card = milestone.querySelector('[data-milestone-card]');
      const year = milestone.querySelector('[data-year]');
      const icon = milestone.querySelector('[data-icon]');
      const title = milestone.querySelector('h3');
      const content = milestone.querySelectorAll('p, [data-tags]');
      const dot = milestone.querySelector('[data-dot]');

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

      // Simple card fade + slide animation
      if (card) {
        tl.fromTo(card,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          }
        );
      }

      // Year, icon, title, content - all simple fade & slide
      if (year) {
        tl.fromTo(year,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.8'
        );
      }

      if (icon) {
        tl.fromTo(icon,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );
      }

      if (title) {
        tl.fromTo(title,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );
      }

      if (content && content.length > 0) {
        tl.fromTo(content,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );
      }

      if (dot) {
        tl.fromTo(dot,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
          0
        );
      }

      timelines.push(tl);
    });

    return () => {
      timelines.forEach(tl => tl.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Track scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent auto-scroll on page load - always start at top
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  // Card interaction handlers
  const handleCardMouseEnter = (index: number) => {
    setCardHovers(prev => ({ ...prev, [index]: true }));
  };

  const handleCardMouseLeave = (index: number) => {
    setCardHovers(prev => ({ ...prev, [index]: false }));
  };

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Progress Bar - Simplified */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 10000,
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress * 100}%`,
          background: 'rgba(218, 14, 41, 0.6)',
          transition: 'width 0.1s ease-out',
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
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          letterSpacing: '0.05em',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(218, 14, 41, 0.8)',
            boxShadow: '0 0 8px rgba(218, 14, 41, 0.5)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          The Journey
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: '200',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, var(--text-primary) 0%, rgba(255, 255, 255, 0.7) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          My Journey
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: '300',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: '1.7',
          marginBottom: '2rem',
        }}>
          From curiosity to craft—designing systems that serve people
        </p>

        {/* Stats Counter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1rem, 2vw, 2rem)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}>
          <span>10 Milestones</span>
          <span style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
          }} />
          <span>19 Years</span>
          <span style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
          }} />
          <span>∞ Curiosity</span>
        </div>

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
              filter: 'drop-shadow(0 0 8px rgba(218, 14, 41, 0.3))',
            }}
          />
        </div>
      </section>

      {/* Timeline Container */}
      <div style={{
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 2rem) clamp(10rem, 20vw, 20rem) clamp(1rem, 4vw, 2rem)',
        zIndex: 10,
      }}>
        {/* Center Timeline Line - Simplified */}
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
          {/* Progress Line */}
          <div ref={timelineLineRef} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'rgba(218, 14, 41, 0.5)',
            transformOrigin: 'top',
            transform: 'scaleY(0)',
          }} />
        </div>

        {/* Milestones */}
        {timelineMilestones.map((milestone, index) => {
          const IconComponent = iconMap[milestone.icon];
          const isVisible = visibleMilestones.has(index);
          const isActive = activeSection === index;
          const isPast = visibleMilestones.has(index) && activeSection > index;
          const isHovered = cardHovers[index] || false;

          return (
            <article
              key={milestone.id}
              id={milestone.id}
              ref={(el) => { milestonesRef.current[index] = el; }}
              className="journey-milestone"
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
                gap: 'clamp(1.5rem, 4vw, 3rem)',
                marginBottom: index === timelineMilestones.length - 1 ? 0 : 'clamp(5rem, 10vw, 10rem)',
                scrollMarginTop: '100px',
              }}
            >
              {/* Connection Line to Next Milestone */}
              {index < timelineMilestones.length - 1 && (
                <svg
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: 'clamp(5rem, 10vw, 10rem)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: isVisible ? 0.3 : 0,
                    transition: 'opacity 0.8s ease-out',
                  }}
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgba(218, 14, 41, 0.6)', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'rgba(218, 14, 41, 0.2)', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d={milestone.side === 'left'
                      ? 'M 100 0 Q 150 50, 100 100'
                      : 'M 100 0 Q 50 50, 100 100'
                    }
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    style={{
                      animation: isActive ? 'dashMove 2s linear infinite' : 'none',
                    }}
                  />
                </svg>
              )}
              {/* Left Side (Card or Empty) */}
              <div className="journey-milestone-card-wrapper" style={{ gridColumn: milestone.side === 'left' ? '1' : '3' }}>
                {milestone.side === 'left' && (
                  <div
                    data-milestone-card
                    className="journey-milestone-card-wrapper"
                    onMouseEnter={() => handleCardMouseEnter(index)}
                    onMouseLeave={() => handleCardMouseLeave(index)}
                    role="article"
                    aria-label={`${milestone.title} - ${milestone.year}`}
                    style={{
                      position: 'relative',
                      background: isActive
                        ? `linear-gradient(135deg, rgba(10, 10, 10, 0.12), rgba(10, 10, 10, 0.08))`
                        : isHovered
                        ? `linear-gradient(135deg, rgba(10, 10, 10, 0.08), rgba(10, 10, 10, 0.05))`
                        : `linear-gradient(135deg, rgba(10, 10, 10, 0.05), rgba(10, 10, 10, 0.03))`,
                      backdropFilter: `blur(120px) saturate(120%) brightness(1.05)`,
                      WebkitBackdropFilter: `blur(120px) saturate(120%) brightness(1.05)`,
                      border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.20)' : isHovered ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.10)'}`,
                      borderRadius: '24px',
                      padding: 0,
                      overflow: 'hidden',
                      boxShadow: isHovered
                        ? `0 8px 32px rgba(0, 0, 0, 0.4),
                           inset 0 1px 1px rgba(255, 255, 255, 0.05)`
                        : isActive
                        ? `0 8px 32px rgba(0, 0, 0, 0.4)`
                        : '0 8px 32px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.01)' : 'scale(1)',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Cover Image Area */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 'clamp(200px, 25vw, 280px)',
                      background: milestone.coverGradient
                        ? `linear-gradient(135deg, ${milestone.coverGradient[0]}, ${milestone.coverGradient[1]})`
                        : `linear-gradient(135deg, ${milestone.brandColor}40, ${milestone.brandColor}20)`,
                      overflow: 'hidden',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                      transformOrigin: 'center',
                    }}>
                      {/* Dual Gradient Overlays */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `
                          linear-gradient(
                            to bottom,
                            transparent 0%,
                            transparent 40%,
                            rgba(0, 0, 0, 0.6) 80%,
                            rgba(0, 0, 0, 0.85) 100%
                          ),
                          linear-gradient(
                            135deg,
                            ${milestone.brandColor}30 0%,
                            ${milestone.brandColor}15 30%,
                            transparent 60%
                          )
                        `,
                      }} />

                      {/* Year Badge - Top Left */}
                      <span data-year style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        zIndex: 2,
                      }}>
                        {milestone.year}
                      </span>

                      {/* Logo - Bottom Left Overlap */}
                      <div data-icon style={{
                        position: 'absolute',
                        bottom: '0px',
                        left: '24px',
                        zIndex: 3,
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                      }}>
                        {milestone.logoFile ? (
                          <div style={{
                            width: 'clamp(72px, 8vw, 96px)',
                            height: 'clamp(72px, 8vw, 96px)',
                            padding: '16px',
                            borderRadius: '20px',
                            background: milestone.logoFile === 'bfa.jpeg'
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(40px) saturate(150%)',
                            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                            border: `2px solid rgba(255, 255, 255, ${milestone.logoFile === 'bfa.jpeg' ? '0.20' : '0.18'})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)`,
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}>
                            <Image
                              src={`/logos/${milestone.logoFile}`}
                              alt={milestone.organization || milestone.title}
                              width={64}
                              height={64}
                              style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: 'auto',
                              }}
                            />
                          </div>
                        ) : (
                          <div style={{
                            width: 'clamp(72px, 8vw, 96px)',
                            height: 'clamp(72px, 8vw, 96px)',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(40px) saturate(150%)',
                            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                            border: '2px solid rgba(255, 255, 255, 0.18)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                          }}>
                            <IconComponent
                              size={32}
                              style={{
                                color: milestone.brandColor,
                                filter: `drop-shadow(0 0 10px ${milestone.brandColor}50)`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Body - Adjusted for logo overlap */}
                    <div style={{
                      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                      paddingTop: 'clamp(2.5rem, 4vw, 3.5rem)', // Extra padding for logo overlap
                    }}>
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
                      marginBottom: '1rem',
                      fontWeight: '300',
                    }}>
                      {milestone.subtitle}
                    </p>

                    {/* Lesson Badge - Moved to top for prominence */}
                    {milestone.lesson && (
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.15), rgba(255, 255, 255, 0.08))',
                        border: '2px solid rgba(218, 14, 41, 0.4)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        marginBottom: '1.5rem',
                      }}>
                        <div style={{
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: 'rgba(218, 14, 41, 0.9)',
                          marginBottom: '0.5rem',
                          fontWeight: '600',
                        }}>
                          Key Takeaway
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '500',
                          color: 'var(--text-primary)',
                          lineHeight: '1.5',
                        }}>
                          {milestone.lesson}
                        </div>
                      </div>
                    )}

                    {/* Hook */}
                    {milestone.hook && (
                      <p style={{
                        fontSize: '1.05rem',
                        fontStyle: 'italic',
                        color: 'var(--text-secondary)',
                        marginBottom: '1rem',
                        borderLeft: '4px solid rgba(218, 14, 41, 0.6)',
                        paddingLeft: '1.25rem',
                        lineHeight: '1.7',
                        fontWeight: '400',
                      }}>
                        "{milestone.hook}"
                      </p>
                    )}

                    <p style={{
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7',
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
                          role="button"
                          tabIndex={0}
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
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(218, 14, 41, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Related Work CTA */}
                    {milestone.relatedWork && (
                      <Link
                        href={milestone.relatedWork as any}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '1.5rem',
                          padding: '1rem 1.25rem',
                          background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))',
                          border: '1px solid rgba(218, 14, 41, 0.3)',
                          borderRadius: '14px',
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.18), rgba(255, 255, 255, 0.08))';
                          e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.5)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(218, 14, 41, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))';
                          e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <span>View Full Case Study</span>
                        <ExternalLink size={16} style={{
                          color: 'rgba(218, 14, 41, 0.8)',
                          flexShrink: 0,
                        }} />
                      </Link>
                    )}
                    </div>
                  </div>
                )}
              </div>

              {/* Center Dot */}
              <div className="journey-timeline-dot-wrapper" style={{
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
              <div className="journey-milestone-card-wrapper" style={{ gridColumn: milestone.side === 'right' ? '3' : '1' }}>
                {milestone.side === 'right' && (
                  <div
                    data-milestone-card
                    className="journey-milestone-card-wrapper"
                    onMouseEnter={() => handleCardMouseEnter(index)}
                    onMouseLeave={() => handleCardMouseLeave(index)}
                    role="article"
                    aria-label={`${milestone.title} - ${milestone.year}`}
                    style={{
                      position: 'relative',
                      background: isActive
                        ? `linear-gradient(135deg, rgba(10, 10, 10, 0.12), rgba(10, 10, 10, 0.08))`
                        : isHovered
                        ? `linear-gradient(135deg, rgba(10, 10, 10, 0.08), rgba(10, 10, 10, 0.05))`
                        : `linear-gradient(135deg, rgba(10, 10, 10, 0.05), rgba(10, 10, 10, 0.03))`,
                      backdropFilter: `blur(120px) saturate(120%) brightness(1.05)`,
                      WebkitBackdropFilter: `blur(120px) saturate(120%) brightness(1.05)`,
                      border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.20)' : isHovered ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.10)'}`,
                      borderRadius: '24px',
                      padding: 0,
                      overflow: 'hidden',
                      boxShadow: isHovered
                        ? `0 8px 32px rgba(0, 0, 0, 0.4),
                           inset 0 1px 1px rgba(255, 255, 255, 0.05)`
                        : isActive
                        ? `0 8px 32px rgba(0, 0, 0, 0.4)`
                        : '0 8px 32px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.01)' : 'scale(1)',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Cover Image Area */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 'clamp(200px, 25vw, 280px)',
                      background: milestone.coverGradient
                        ? `linear-gradient(135deg, ${milestone.coverGradient[0]}, ${milestone.coverGradient[1]})`
                        : `linear-gradient(135deg, ${milestone.brandColor}40, ${milestone.brandColor}20)`,
                      overflow: 'hidden',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                      transformOrigin: 'center',
                    }}>
                      {/* Dual Gradient Overlays */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `
                          linear-gradient(
                            to bottom,
                            transparent 0%,
                            transparent 40%,
                            rgba(0, 0, 0, 0.6) 80%,
                            rgba(0, 0, 0, 0.85) 100%
                          ),
                          linear-gradient(
                            135deg,
                            ${milestone.brandColor}30 0%,
                            ${milestone.brandColor}15 30%,
                            transparent 60%
                          )
                        `,
                      }} />

                      {/* Year Badge - Top Left */}
                      <span data-year style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        zIndex: 2,
                      }}>
                        {milestone.year}
                      </span>

                      {/* Logo - Bottom Left Overlap */}
                      <div data-icon style={{
                        position: 'absolute',
                        bottom: '0px',
                        left: '24px',
                        zIndex: 3,
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                      }}>
                        {milestone.logoFile ? (
                          <div style={{
                            width: 'clamp(72px, 8vw, 96px)',
                            height: 'clamp(72px, 8vw, 96px)',
                            padding: '16px',
                            borderRadius: '20px',
                            background: milestone.logoFile === 'bfa.jpeg'
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(40px) saturate(150%)',
                            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                            border: `2px solid rgba(255, 255, 255, ${milestone.logoFile === 'bfa.jpeg' ? '0.20' : '0.18'})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)`,
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}>
                            <Image
                              src={`/logos/${milestone.logoFile}`}
                              alt={milestone.organization || milestone.title}
                              width={64}
                              height={64}
                              style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: 'auto',
                              }}
                            />
                          </div>
                        ) : (
                          <div style={{
                            width: 'clamp(72px, 8vw, 96px)',
                            height: 'clamp(72px, 8vw, 96px)',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(40px) saturate(150%)',
                            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                            border: '2px solid rgba(255, 255, 255, 0.18)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                          }}>
                            <IconComponent
                              size={32}
                              style={{
                                color: milestone.brandColor,
                                filter: `drop-shadow(0 0 10px ${milestone.brandColor}50)`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{
                      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                      paddingTop: 'clamp(2.5rem, 4vw, 3.5rem)', // Extra padding for logo overlap
                    }}>
                    {milestone.isCollaboration ? (
                      // Collaboration milestone - render chat interface
                      <>
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
                          marginBottom: '1rem',
                          fontWeight: '300',
                        }}>
                          {milestone.subtitle}
                        </p>

                        <p style={{
                          fontSize: '0.95rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.7',
                          marginBottom: '1.5rem',
                          fontWeight: '300',
                        }}>
                          {milestone.description}
                        </p>

                        <ContactChat onMessageSubmit={(message, intent) => {
                          setInitialMessage(message);
                          setChatOpen(true);
                        }} />
                      </>
                    ) : (
                      // Normal milestone
                      <>
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
                          marginBottom: '1rem',
                          fontWeight: '300',
                        }}>
                          {milestone.subtitle}
                        </p>
                        {/* Lesson Badge - Moved to top for prominence */}
                        {milestone.lesson && (
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.15), rgba(255, 255, 255, 0.08))',
                        border: '2px solid rgba(218, 14, 41, 0.4)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        marginBottom: '1.5rem',
                      }}>
                        <div style={{
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: 'rgba(218, 14, 41, 0.9)',
                          marginBottom: '0.5rem',
                          fontWeight: '600',
                        }}>
                          Key Takeaway
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '500',
                          color: 'var(--text-primary)',
                          lineHeight: '1.5',
                        }}>
                          {milestone.lesson}
                        </div>
                      </div>
                    )}

                    {/* Hook */}
                    {milestone.hook && (
                      <p style={{
                        fontSize: '1.05rem',
                        fontStyle: 'italic',
                        color: 'var(--text-secondary)',
                        marginBottom: '1rem',
                        borderLeft: '4px solid rgba(218, 14, 41, 0.6)',
                        paddingLeft: '1.25rem',
                        lineHeight: '1.7',
                        fontWeight: '400',
                      }}>
                        "{milestone.hook}"
                      </p>
                    )}

                    <p style={{
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7',
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
                          role="button"
                          tabIndex={0}
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
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(218, 14, 41, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                      </>
                    )}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Chatbot Modal */}
      {chatOpen && (
        <Chatbot
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          initialMessage={initialMessage}
          intentContext="collaboration"
        />
      )}
    </div>
  );
}
