'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Briefcase, Star, Building2, Sparkles, Code, Palette } from 'lucide-react';

interface SimpleAboutSectionProps {
  className?: string;
}

export default function SimpleAboutSection({ className = '' }: SimpleAboutSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const [hoveredSkillTag, setHoveredSkillTag] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const [hoveredFactIndex, setHoveredFactIndex] = useState<number | null>(null);
  const [ripplePosition, setRipplePosition] = useState<{ x: number; y: number } | null>(null);
  const [ripplePositionAbout, setRipplePositionAbout] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLAnchorElement>(null);

  const journeyMilestones = [
    {
      year: '2005',
      label: 'The Spark',
      opacity: 0.4,
      id: 'hyderabad-roots',
      description: 'Where creativity first ignited in Hyderabad'
    },
    {
      year: '2018',
      label: 'BFA Journey',
      opacity: 0.55,
      id: 'undergrad-2018',
      description: 'Foundation years exploring visual design'
    },
    {
      year: '2021',
      label: 'NID Masters',
      opacity: 0.7,
      id: 'nid-2021',
      description: 'Advanced design thinking and systems'
    },
    {
      year: '2024',
      label: 'Air India',
      opacity: 1,
      id: 'air-india-2024',
      description: 'Leading transformation at scale'
    },
  ];

  const skillTags = [
    'Aviation UX',
    'Systems Thinking',
    'Creative Coding',
    'Generative Art',
    'AI/ML',
    'Design Systems'
  ];

  const keyFacts = [
    {
      label: 'Education',
      value: 'NID Masters (2021-2023) + BFA (2016-2020)',
      icon: GraduationCap,
      color: '99, 102, 241' // Indigo
    },
    {
      label: 'Experience',
      value: '4+ Years, 12 Products Shipped',
      icon: Briefcase,
      color: '16, 185, 129' // Green
    },
    {
      label: 'Currently',
      value: 'Air India DesignLAB, 450+ Daily Users',
      icon: Building2,
      color: '218, 14, 41' // Brand Red
    },
  ];

  // Intersection Observer for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipplePosition({ x, y });
    setTimeout(() => setRipplePosition(null), 600);
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    if (!aboutRef.current) return;
    const rect = aboutRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipplePositionAbout({ x, y });
    setTimeout(() => setRipplePositionAbout(null), 600);
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap');

        @keyframes aboutFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes milestonePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(218, 14, 41, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 8px rgba(218, 14, 41, 0);
          }
        }

        /* Mobile timeline horizontal scroll */
        .mobile-timeline {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .mobile-timeline::-webkit-scrollbar {
          display: none;
        }

        .mobile-timeline > * {
          scroll-snap-align: start;
          flex-shrink: 0;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: 'var(--bg-primary)',
          fontFamily: 'Inter, sans-serif',
          padding: '3rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
        }}
        className={className}
      >
        {/* Ambient Background Orbs - Gold/Amber Themed */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          {isHovered && (
            <>
              <div style={{
                position: 'absolute',
                top: '15%',
                right: '20%',
                width: '450px',
                height: '450px',
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.06), transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(90px)',
                animation: 'floatOrb 25s ease-in-out infinite',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 1.5s ease-in-out',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '25%',
                left: '15%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.04), transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(70px)',
                animation: 'floatOrb 30s ease-in-out infinite 10s',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 1.5s ease-in-out',
              }} />
            </>
          )}
        </div>

        {/* Section Header - Enhanced */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 5rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          opacity: inView ? 1 : 0,
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            flexWrap: 'wrap',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--surface-primary)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgb(251, 191, 36)',
                animation: 'pulseOrb 2s ease-in-out infinite',
              }} />
            </div>
            <h2 className="text-gradient-animated" style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
            }}>
              About
            </h2>
            <div style={{
              padding: '0.375rem 0.875rem',
              borderRadius: '12px',
              background: 'var(--surface-primary)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-primary)',
              fontSize: '0.75rem',
              fontWeight: '300',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
            }}>
              Designer · Hyderabad → San Francisco
            </div>
          </div>
        </div>

        {/* Single Unified Card */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
              transform: isHovered ? 'translateY(-4px) scale(1.005)' : 'translateY(0) scale(1)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Glass Card Body */}
            <div style={{
              position: 'relative',
              background: isHovered
                ? 'linear-gradient(135deg, var(--surface-secondary) 0%, var(--surface-primary) 100%)'
                : 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
              backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
              WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
              border: '1px solid var(--border-primary)',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isHovered
                ? 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 10px 20px rgba(0, 0, 0, 0.3)'
                : 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
            }}>

              {/* Introduction */}
              <p style={{
                fontSize: 'clamp(0.938rem, 2vw, 1.125rem)',
                fontWeight: '300',
                color: 'var(--text-primary)',
                lineHeight: '1.7',
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
                maxWidth: '900px',
                opacity: isHovered ? 0.9 : 0.8,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' : 'none',
              }}>
                I'm Nihar, crafting interfaces that breathe, remember, and evolve. Currently leading design transformation at Air India DesignLAB, where I build systems that serve 450+ daily users.
              </p>

              {/* Two-Column Grid: Key Facts + Journey */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(2rem, 4vw, 4rem)',
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
              }}>

                {/* Left Column: Key Facts as Interactive Cards */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  animation: inView ? 'scrollRevealLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                    opacity: 0.7,
                  }}>
                    KEY FACTS
                  </h3>

                  {keyFacts.map((fact, index) => {
                    const Icon = fact.icon;
                    const isFactHovered = hoveredFactIndex === index;

                    return (
                      <div
                        key={index}
                        onMouseEnter={() => setHoveredFactIndex(index)}
                        onMouseLeave={() => setHoveredFactIndex(null)}
                        style={{
                          position: 'relative',
                          padding: '1rem',
                          borderRadius: '12px',
                          background: isFactHovered
                            ? `linear-gradient(135deg, rgba(${fact.color}, 0.06), var(--surface-primary))`
                            : 'var(--surface-primary)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: `1px solid ${isFactHovered ? `rgba(${fact.color}, 0.3)` : 'var(--border-primary)'}`,
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          transform: isFactHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                          cursor: 'default',
                          animation: inView ? `factCardReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.1}s both` : 'none',
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                        }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: `rgba(${fact.color}, 0.1)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            transform: isFactHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                          }}>
                            <Icon size={16} style={{ color: `rgb(${fact.color})` }} />
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            flex: 1,
                          }}>
                            <div style={{
                              fontSize: '0.688rem',
                              fontWeight: '400',
                              color: 'var(--text-muted)',
                              letterSpacing: '0.05em',
                              opacity: 0.6,
                            }}>
                              {fact.label}
                            </div>
                            <div style={{
                              fontSize: '0.813rem',
                              fontWeight: '300',
                              color: 'var(--text-secondary)',
                              lineHeight: '1.5',
                              opacity: isFactHovered ? 0.9 : 0.7,
                              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}>
                              {fact.value}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Interactive Skill Tags */}
                  <div style={{
                    marginTop: '1rem',
                  }}>
                    <h4 style={{
                      fontSize: '0.688rem',
                      fontWeight: '400',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                      marginBottom: '0.75rem',
                      opacity: 0.6,
                    }}>
                      SPECIALIZATION
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}>
                      {skillTags.map((tag, index) => (
                        <span
                          key={tag}
                          onMouseEnter={() => setHoveredSkillTag(tag)}
                          onMouseLeave={() => setHoveredSkillTag(null)}
                          style={{
                            padding: '0.375rem 0.75rem',
                            borderRadius: '10px',
                            background: hoveredSkillTag === tag
                              ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.12), var(--surface-primary))'
                              : 'var(--surface-primary)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: hoveredSkillTag === tag
                              ? '1px solid rgba(251, 191, 36, 0.3)'
                              : '1px solid var(--border-primary)',
                            fontSize: '0.75rem',
                            fontWeight: '300',
                            color: 'var(--text-secondary)',
                            letterSpacing: '0.01em',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            transform: hoveredSkillTag === tag ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
                            animation: hoveredSkillTag === tag ? 'skillTagFloat 2s ease-in-out infinite' : 'none',
                            opacity: inView ? 1 : 0,
                            animationDelay: `${0.7 + index * 0.05}s`,
                            animationName: inView ? 'factCardReveal' : 'none',
                            animationDuration: '0.4s',
                            animationFillMode: 'both',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Journey Timeline with Progress Indicator */}
                <div style={{
                  position: 'relative',
                  animation: inView ? 'scrollRevealRight 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                  }}>
                    <h3 style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.05em',
                      opacity: 0.7,
                    }}>
                      THE JOURNEY
                    </h3>
                    <span style={{
                      fontSize: '0.688rem',
                      fontWeight: '300',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.02em',
                      opacity: 0.5,
                    }}>
                      In Progress...
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '4px',
                    background: 'var(--surface-primary)',
                    borderRadius: '2px',
                    marginBottom: '2rem',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      background: 'linear-gradient(90deg, rgba(218, 14, 41, 0.6), rgba(251, 191, 36, 0.8))',
                      borderRadius: '2px',
                      animation: inView ? 'progressFill 2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
                      boxShadow: '0 0 12px rgba(251, 191, 36, 0.4)',
                    }} />
                  </div>

                  {/* Timeline Container */}
                  <div style={{
                    position: 'relative',
                  }}
                  className={isMobile ? 'mobile-timeline' : ''}
                  >
                    {/* Vertical Timeline Line (Desktop) */}
                    {!isMobile && (
                      <div style={{
                        position: 'absolute',
                        left: '8px',
                        top: '0',
                        width: '2px',
                        background: 'linear-gradient(180deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.6), rgba(218, 14, 41, 0.2))',
                        animation: inView ? 'timelineDraw 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' : 'none',
                      }} />
                    )}

                    {/* Milestone Items */}
                    <div style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'row' : 'column',
                      gap: isMobile ? '1rem' : '1.75rem',
                      paddingLeft: isMobile ? '0' : '2rem',
                    }}>
                      {journeyMilestones.map((milestone, index) => {
                        const isMilestoneHovered = hoveredMilestone === index;

                        return (
                          <Link
                            key={milestone.year}
                            href={`/journey#${milestone.id}`}
                            onMouseEnter={() => setHoveredMilestone(index)}
                            onMouseLeave={() => setHoveredMilestone(null)}
                            style={{
                              position: 'relative',
                              display: 'flex',
                              flexDirection: isMobile ? 'column' : 'row',
                              alignItems: isMobile ? 'flex-start' : 'center',
                              gap: isMobile ? '0.5rem' : '0.75rem',
                              textDecoration: 'none',
                              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                              transform: isMilestoneHovered ? (isMobile ? 'translateY(-4px)' : 'translateX(4px)') : isMobile ? 'translateY(0)' : 'translateX(0)',
                              minWidth: isMobile ? '140px' : 'auto',
                              padding: isMobile ? '1rem' : '0',
                              background: isMobile ? 'var(--surface-primary)' : 'transparent',
                              borderRadius: isMobile ? '12px' : '0',
                              border: isMobile ? '1px solid var(--border-primary)' : 'none',
                            }}
                          >
                            {/* Dot - Desktop */}
                            {!isMobile && (
                              <div style={{
                                position: 'absolute',
                                left: '-31px',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                background: `rgba(218, 14, 41, ${milestone.opacity})`,
                                boxShadow: `0 0 20px rgba(218, 14, 41, ${milestone.opacity * 0.5})`,
                                border: '2px solid rgba(218, 14, 41, 0.3)',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                animation: isMilestoneHovered ? 'milestonePulse 2s ease-in-out infinite' : (inView ? `pulseOrb 3s ease-in-out infinite ${index * 0.5}s` : 'none'),
                                transform: isMilestoneHovered ? 'scale(1.2)' : 'scale(1)',
                              }} />
                            )}

                            {/* Content */}
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.25rem',
                            }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '0.5rem',
                              }}>
                                <span style={{
                                  fontSize: '0.688rem',
                                  color: 'var(--text-muted)',
                                  fontWeight: '400',
                                  letterSpacing: '0.05em',
                                  opacity: isMilestoneHovered ? 1 : 0.6,
                                  transition: 'all 0.3s ease',
                                }}>
                                  {milestone.year}
                                </span>
                                <span style={{
                                  fontSize: '0.875rem',
                                  fontWeight: '400',
                                  color: 'var(--text-primary)',
                                  opacity: isMilestoneHovered ? 1 : milestone.opacity,
                                  transition: 'all 0.3s ease',
                                }}>
                                  {milestone.label}
                                </span>
                              </div>

                              {/* Tooltip Description on Hover */}
                              <div style={{
                                maxHeight: isMilestoneHovered ? '100px' : '0',
                                opacity: isMilestoneHovered ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                              }}>
                                <p style={{
                                  fontSize: '0.75rem',
                                  fontWeight: '300',
                                  color: 'var(--text-tertiary)',
                                  lineHeight: '1.5',
                                  marginTop: '0.25rem',
                                }}>
                                  {milestone.description}
                                </p>
                                <span style={{
                                  fontSize: '0.688rem',
                                  color: 'rgba(218, 14, 41, 0.8)',
                                  fontWeight: '400',
                                  marginTop: '0.25rem',
                                  display: 'inline-block',
                                }}>
                                  Click to explore →
                                </span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer CTA with Ripple */}
              <div style={{
                paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
                borderTop: '1px solid var(--border-primary)',
                animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both' : 'none',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}>
                  <Link
                    ref={ctaRef}
                    href="/journey"
                    onClick={handleCtaClick}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))',
                      border: '1px solid rgba(218, 14, 41, 0.3)',
                      borderRadius: '16px',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '400',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.18), rgba(255, 255, 255, 0.08))';
                      e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(218, 14, 41, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))';
                      e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Ripple Effect */}
                    {ripplePosition && (
                      <div style={{
                        position: 'absolute',
                        top: ripplePosition.y,
                        left: ripplePosition.x,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(218, 14, 41, 0.4)',
                        animation: 'aboutRipple 0.6s ease-out',
                        pointerEvents: 'none',
                      }} />
                    )}
                    <span>Explore the Full Journey</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    ref={aboutRef}
                    href="/about"
                    onClick={handleAboutClick}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(255, 255, 255, 0.04))',
                      border: '1px solid rgba(251, 191, 36, 0.25)',
                      borderRadius: '16px',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '400',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(255, 255, 255, 0.06))';
                      e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(251, 191, 36, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(255, 255, 255, 0.04))';
                      e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.25)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Ripple Effect */}
                    {ripplePositionAbout && (
                      <div style={{
                        position: 'absolute',
                        top: ripplePositionAbout.y,
                        left: ripplePositionAbout.x,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(251, 191, 36, 0.4)',
                        animation: 'aboutRipple 0.6s ease-out',
                        pointerEvents: 'none',
                      }} />
                    )}
                    <span>About Me</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
