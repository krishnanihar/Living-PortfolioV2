'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MousePointer2, ArrowDown, Check, ChevronDown, ExternalLink, Image as ImageIcon } from 'lucide-react';
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
  const [expandedMilestones, setExpandedMilestones] = useState<Set<number>>(new Set());
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

  const toggleMilestone = (index: number) => {
    setExpandedMilestones(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
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
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: '200',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
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
        }}>
          From curiosity to craft—designing systems that serve people
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
          const isExpanded = expandedMilestones.has(index);

          // Count expandable items for better label
          const expandableCount = [
            (milestone.achievements?.length ?? 0) > 0,
            (milestone.metrics?.length ?? 0) > 0,
            milestone.media || (milestone.artifacts?.length ?? 0) > 0,
            milestone.details
          ].filter(Boolean).length;

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
                      background: isActive
                        ? `linear-gradient(135deg, rgba(10, 10, 10, 0.12), rgba(10, 10, 10, 0.08))`
                        : isHovered
                        ? `linear-gradient(135deg, rgba(10, 10, 10, 0.08), rgba(10, 10, 10, 0.05))`
                        : `linear-gradient(135deg, rgba(10, 10, 10, 0.05), rgba(10, 10, 10, 0.03))`,
                      backdropFilter: `blur(120px) saturate(120%) brightness(1.05)`,
                      WebkitBackdropFilter: `blur(120px) saturate(120%) brightness(1.05)`,
                      border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.20)' : isHovered ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.10)'}`,
                      borderRadius: '24px',
                      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                      boxShadow: isHovered
                        ? `0 8px 32px rgba(0, 0, 0, 0.4),
                           inset 0 1px 1px rgba(255, 255, 255, 0.05)`
                        : isActive
                        ? `0 8px 32px rgba(0, 0, 0, 0.4)`
                        : '0 8px 32px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.01)' : 'scale(1)',
                      cursor: 'pointer',
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

                    <div data-icon style={{
                      marginBottom: '1.5rem',
                    }}>
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

                    {/* Expandable Details Section */}
                    {expandableCount > 0 && (
                      <>
                        <button
                          onClick={() => toggleMilestone(index)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleMilestone(index);
                            }
                          }}
                          aria-expanded={isExpanded}
                          aria-controls={`milestone-details-${index}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: isExpanded ? '1.5rem' : '1rem',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '10px',
                            padding: '0.875rem 1.25rem',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            justifyContent: 'space-between',
                            fontWeight: '500',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                            e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                          }}
                        >
                          <span>{isExpanded ? 'Hide' : 'View'} Details {expandableCount > 0 && `(${expandableCount} items)`}</span>
                          <ChevronDown size={18} style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease',
                          }} />
                        </button>

                        {isExpanded && (
                          <div id={`milestone-details-${index}`} style={{
                            marginBottom: '1.5rem',
                          }}>
                            {/* Achievements */}
                            {milestone.achievements && milestone.achievements.length > 0 && (
                              <ul style={{
                                marginBottom: '1.5rem',
                                listStyle: 'none',
                                padding: 0,
                              }}>
                                {milestone.achievements.map((achievement, idx) => (
                                  <li key={idx} style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    marginBottom: '0.75rem',
                                    alignItems: 'flex-start',
                                  }}>
                                    <Check size={16} style={{
                                      color: 'rgba(218, 14, 41, 0.8)',
                                      flexShrink: 0,
                                      marginTop: '0.2rem',
                                    }} />
                                    <span style={{
                                      fontSize: '0.9rem',
                                      color: 'var(--text-secondary)',
                                      lineHeight: '1.6',
                                    }}>
                                      {achievement}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Metrics Grid */}
                            {milestone.metrics && milestone.metrics.length > 0 && (
                              <div className="journey-metrics-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1.5rem',
                              }}>
                                {milestone.metrics.map((metric, idx) => (
                                  <div key={idx} style={{
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                  }}>
                                    <div style={{
                                      fontSize: '1.5rem',
                                      fontWeight: '600',
                                      color: 'rgba(218, 14, 41, 0.9)',
                                      marginBottom: '0.25rem',
                                    }}>
                                      {metric.value}
                                    </div>
                                    <div style={{
                                      fontSize: '0.75rem',
                                      color: 'var(--text-muted)',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.05em',
                                    }}>
                                      {metric.label}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Media Placeholder */}
                            {milestone.media ? (
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '4/3',
                                marginBottom: '1.5rem',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                background: 'rgba(255, 255, 255, 0.03)',
                              }}>
                                <Image
                                  src={milestone.media}
                                  alt={milestone.title}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            ) : (
                              <div style={{
                                width: '100%',
                                aspectRatio: '4/3',
                                background: `linear-gradient(135deg, rgba(218, 14, 41, ${index * 0.05 + 0.05}), rgba(255, 255, 255, 0.05))`,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                              }}>
                                <ImageIcon size={48} style={{ color: 'rgba(255, 255, 255, 0.2)' }} />
                              </div>
                            )}

                            {/* Artifact Gallery */}
                            {milestone.artifacts && milestone.artifacts.length > 0 && (
                              <div className="journey-artifact-gallery" style={{
                                display: 'flex',
                                gap: '0.75rem',
                                overflowX: 'auto',
                                marginBottom: '1.5rem',
                                padding: '0.5rem 0',
                                scrollbarWidth: 'thin',
                              }}>
                                {milestone.artifacts.map((artifact, idx) => (
                                  <div key={idx} className="journey-artifact-item" style={{
                                    minWidth: '140px',
                                    aspectRatio: '4/3',
                                    background: `linear-gradient(135deg, rgba(218, 14, 41, ${0.08 - idx * 0.02}), rgba(255, 255, 255, 0.05))`,
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '1rem',
                                    transition: 'all 0.3s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                  }}
                                  >
                                    <ImageIcon size={24} style={{ color: 'rgba(255, 255, 255, 0.3)', marginBottom: '0.5rem' }} />
                                    <span style={{
                                      fontSize: '0.7rem',
                                      color: 'var(--text-muted)',
                                      textAlign: 'center',
                                      lineHeight: '1.3',
                                    }}>
                                      {artifact.caption}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Full Story */}
                            {milestone.details && (
                              <div style={{
                                fontSize: '0.95rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.8',
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                              }}>
                                {milestone.details}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}

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
                      background: isActive
                        ? `linear-gradient(135deg, rgba(10, 10, 10, 0.12), rgba(10, 10, 10, 0.08))`
                        : isHovered
                        ? `linear-gradient(135deg, rgba(10, 10, 10, 0.08), rgba(10, 10, 10, 0.05))`
                        : `linear-gradient(135deg, rgba(10, 10, 10, 0.05), rgba(10, 10, 10, 0.03))`,
                      backdropFilter: `blur(120px) saturate(120%) brightness(1.05)`,
                      WebkitBackdropFilter: `blur(120px) saturate(120%) brightness(1.05)`,
                      border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.20)' : isHovered ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.10)'}`,
                      borderRadius: '24px',
                      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                      boxShadow: isHovered
                        ? `0 8px 32px rgba(0, 0, 0, 0.4),
                           inset 0 1px 1px rgba(255, 255, 255, 0.05)`
                        : isActive
                        ? `0 8px 32px rgba(0, 0, 0, 0.4)`
                        : '0 8px 32px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.01)' : 'scale(1)',
                      cursor: 'pointer',
                    }}
                  >
                    {milestone.isCollaboration ? (
                      // Collaboration milestone - render chat interface
                      <>
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

                        <div data-icon style={{
                          marginBottom: '1.5rem',
                        }}>
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

                        <div data-icon style={{
                          marginBottom: '1.5rem',
                        }}>
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

                    {/* Expandable Details Section */}
                    {expandableCount > 0 && (
                      <>
                        <button
                          onClick={() => toggleMilestone(index)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleMilestone(index);
                            }
                          }}
                          aria-expanded={isExpanded}
                          aria-controls={`milestone-details-${index}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: isExpanded ? '1.5rem' : '1rem',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '10px',
                            padding: '0.875rem 1.25rem',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            justifyContent: 'space-between',
                            fontWeight: '500',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                            e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                          }}
                        >
                          <span>{isExpanded ? 'Hide' : 'View'} Details {expandableCount > 0 && `(${expandableCount} items)`}</span>
                          <ChevronDown size={18} style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease',
                          }} />
                        </button>

                        {isExpanded && (
                          <div id={`milestone-details-${index}`} style={{
                            marginBottom: '1.5rem',
                          }}>
                            {/* Achievements */}
                            {milestone.achievements && milestone.achievements.length > 0 && (
                              <ul style={{
                                marginBottom: '1.5rem',
                                listStyle: 'none',
                                padding: 0,
                              }}>
                                {milestone.achievements.map((achievement, idx) => (
                                  <li key={idx} style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    marginBottom: '0.75rem',
                                    alignItems: 'flex-start',
                                  }}>
                                    <Check size={16} style={{
                                      color: 'rgba(218, 14, 41, 0.8)',
                                      flexShrink: 0,
                                      marginTop: '0.2rem',
                                    }} />
                                    <span style={{
                                      fontSize: '0.9rem',
                                      color: 'var(--text-secondary)',
                                      lineHeight: '1.6',
                                    }}>
                                      {achievement}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Metrics Grid */}
                            {milestone.metrics && milestone.metrics.length > 0 && (
                              <div className="journey-metrics-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1.5rem',
                              }}>
                                {milestone.metrics.map((metric, idx) => (
                                  <div key={idx} style={{
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                  }}>
                                    <div style={{
                                      fontSize: '1.5rem',
                                      fontWeight: '600',
                                      color: 'rgba(218, 14, 41, 0.9)',
                                      marginBottom: '0.25rem',
                                    }}>
                                      {metric.value}
                                    </div>
                                    <div style={{
                                      fontSize: '0.75rem',
                                      color: 'var(--text-muted)',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.05em',
                                    }}>
                                      {metric.label}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Media Placeholder */}
                            {milestone.media ? (
                              <div style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '4/3',
                                marginBottom: '1.5rem',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                background: 'rgba(255, 255, 255, 0.03)',
                              }}>
                                <Image
                                  src={milestone.media}
                                  alt={milestone.title}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            ) : (
                              <div style={{
                                width: '100%',
                                aspectRatio: '4/3',
                                background: `linear-gradient(135deg, rgba(218, 14, 41, ${index * 0.05 + 0.05}), rgba(255, 255, 255, 0.05))`,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                              }}>
                                <ImageIcon size={48} style={{ color: 'rgba(255, 255, 255, 0.2)' }} />
                              </div>
                            )}

                            {/* Artifact Gallery */}
                            {milestone.artifacts && milestone.artifacts.length > 0 && (
                              <div className="journey-artifact-gallery" style={{
                                display: 'flex',
                                gap: '0.75rem',
                                overflowX: 'auto',
                                marginBottom: '1.5rem',
                                padding: '0.5rem 0',
                                scrollbarWidth: 'thin',
                              }}>
                                {milestone.artifacts.map((artifact, idx) => (
                                  <div key={idx} className="journey-artifact-item" style={{
                                    minWidth: '140px',
                                    aspectRatio: '4/3',
                                    background: `linear-gradient(135deg, rgba(218, 14, 41, ${0.08 - idx * 0.02}), rgba(255, 255, 255, 0.05))`,
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '1rem',
                                    transition: 'all 0.3s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                  }}
                                  >
                                    <ImageIcon size={24} style={{ color: 'rgba(255, 255, 255, 0.3)', marginBottom: '0.5rem' }} />
                                    <span style={{
                                      fontSize: '0.7rem',
                                      color: 'var(--text-muted)',
                                      textAlign: 'center',
                                      lineHeight: '1.3',
                                    }}>
                                      {artifact.caption}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Full Story */}
                            {milestone.details && (
                              <div style={{
                                fontSize: '0.95rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.8',
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                              }}>
                                {milestone.details}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}

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
