'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { WorkPageLayout } from '@/components/narrative-work/WorkPageLayout';
import { NarrativeWorkHero } from '@/components/narrative-work/NarrativeWorkHero';
import { JourneyOverview } from '@/components/narrative-work/JourneyOverview';
import { AirIndiaHeroCard } from '@/components/narrative-work/AirIndiaHeroCard';
import { type ImpactCard } from '@/components/narrative-work/ImpactBentoGrid';
import { ResearchShowcase } from '@/components/narrative-work/ResearchShowcase';
import { ActTransition } from '@/components/narrative-work/ActTransition';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';

/**
 * Complete narrative-driven work page
 * 9 sections across 3 acts: Industry → Innovation → Foundation
 *
 * Enhanced with:
 * - CSS variable system (no theme conditionals)
 * - Loading states and skeletons
 * - Improved hover interactions with magnetic effects
 * - Mobile-optimized touch interactions
 * - Smooth scroll anchors and progress indicators
 * - Performance optimizations with IntersectionObserver
 */
export function WorkNarrativePage() {
  const [inView, setInView] = useState(false);
  const [researchInView, setResearchInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [ripplePosition, setRipplePosition] = useState<{ x: number; y: number } | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const researchSectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for animations with performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px' // Preload animations slightly before they come into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Research Triptych section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setResearchInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (researchSectionRef.current) {
      observer.observe(researchSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Carousel scroll detection
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !isMobile) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.offsetWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentCarouselIndex(index);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Impact Cards with expanded content
  const impactCards = [
    {
      id: 1,
      label: '01',
      title: 'Design Systems',
      description: 'Token architecture and Pixel Radar plugin for design consistency',
      expandedDescription: 'Built a comprehensive design token system with semantic naming conventions. Created Pixel Radar, a Figma plugin that automatically audits designs against the token library.',
      metric: '↑ Review efficiency',
      tags: ['Figma', 'Tokens', 'Plugin'],
      color: '99, 102, 241',
    },
    {
      id: 2,
      label: '02',
      title: 'Data Visualization',
      description: 'Narrative dashboards with progressive disclosure',
      expandedDescription: 'Designed analytics dashboards that tell stories through data. Implemented progressive disclosure patterns to reduce cognitive load while maintaining depth.',
      metric: '↓ Decision time',
      tags: ['D3.js', 'Charts', 'Analytics'],
      color: '16, 185, 129',
    },
    {
      id: 3,
      label: '03',
      title: 'Mobile Patterns',
      description: 'Unified UX library for iOS and Android',
      expandedDescription: 'Created a cross-platform component library ensuring consistent experiences across iOS and Android while respecting platform conventions.',
      metric: '↓ Platform bugs',
      tags: ['iOS', 'Android', 'React Native'],
      color: '139, 92, 246',
    },
    {
      id: 4,
      label: '04',
      title: 'IFE Experience',
      description: 'In-flight entertainment with offline resilience',
      expandedDescription: 'Redesigned the in-flight entertainment system with offline-first architecture. Content syncs when connected and works seamlessly at 35,000 feet.',
      metric: '↑ User satisfaction',
      tags: ['Offline', 'Media', 'UX'],
      color: '236, 72, 153',
    },
    {
      id: 5,
      label: '05',
      title: 'Team Culture',
      description: 'Liftoff program for skill progression',
      expandedDescription: 'Launched Liftoff, a structured mentorship and skill development program. Designers progress through levels with clear milestones and peer learning.',
      metric: '↑ Team velocity',
      tags: ['Mentorship', 'Growth', 'Culture'],
      color: '251, 146, 60',
    },
    {
      id: 6,
      label: '06',
      title: 'Innovation',
      description: 'Hackathon wins now in production',
      expandedDescription: 'Led hackathon projects that graduated to production. Rapid prototyping to validate ideas before committing engineering resources.',
      metric: '→ Rapid validation',
      tags: ['Prototyping', 'Hackathon', 'MVP'],
      color: '14, 165, 233',
    },
  ];

  return (
    <WorkPageLayout>
      {/* SECTION 1: Hero Entrance */}
      <Suspense fallback={<HeroSkeleton />}>
        <NarrativeWorkHero />
      </Suspense>

      {/* SECTION 2: Journey Overview */}
      <Suspense fallback={<SectionSkeleton />}>
        <JourneyOverview />
      </Suspense>

      {/* Mobile Swipe Hint for Act II */}
      {isMobile && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1rem',
          marginBottom: '1rem',
        }}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-tertiary)',
              fontSize: '0.75rem',
            }}
          >
            <ChevronDown size={20} />
            <span>Swipe to explore</span>
          </motion.div>
        </div>
      )}

      {/* SECTION 6: Six Areas of Impact - Bento Grid */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        paddingTop: '0',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingBottom: '4rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Air India Hero Card - Giant 3D Card */}
        <AirIndiaHeroCard />

        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
          opacity: inView ? 1 : 0,
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
          }}>
            Six Systems
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-tertiary)',
          }}>
            Systems and innovation across Air India's digital transformation
          </p>
        </div>

        {/* Desktop: Bento Grid */}
        {!isMobile && (() => {
          // Grid template control - card stays in place, grid resizes around it
          const getGridTemplate = () => {
            if (!hoveredCard) {
              return { cols: '1fr 1fr 1fr', rows: '1fr 1fr' };
            }
            const index = impactCards.findIndex(c => c.id === hoveredCard);
            const col = index % 3;
            const row = Math.floor(index / 3);
            // Expand hovered column, shrink others
            const cols = [0, 1, 2].map(c => c === col ? '2fr' : '0.5fr').join(' ');
            // Expand hovered row, shrink others
            const rows = [0, 1].map(r => r === row ? '2fr' : '0.5fr').join(' ');
            return { cols, rows };
          };
          const { cols, rows } = getGridTemplate();

          return (
            <div style={{
              display: 'grid',
              gridTemplateColumns: cols,
              gridTemplateRows: rows,
              gap: '1.5rem',
              transition: 'grid-template-columns 0.5s cubic-bezier(0.32, 0.72, 0, 1), grid-template-rows 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
            }}>
              {impactCards.map((card) => {
                const isHovered = hoveredCard === card.id;

                return (
                  <motion.div
                    key={card.id}
                    onHoverStart={() => setHoveredCard(card.id)}
                    onHoverEnd={() => {
                      setHoveredCard(null);
                      setRipplePosition(null);
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setRipplePosition({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                    }}
                    style={{
                      position: 'relative',
                      padding: isHovered ? '2rem' : '1.5rem',
                      borderRadius: 20,
                      background: isHovered
                        ? `linear-gradient(135deg, rgba(${card.color}, 0.08), var(--surface-primary))`
                        : 'var(--surface-primary)',
                      backdropFilter: 'blur(40px)',
                      WebkitBackdropFilter: 'blur(40px)',
                      border: `1px solid transparent`,
                      cursor: 'pointer',
                      boxShadow: isHovered
                        ? `0 30px 60px rgba(${card.color}, 0.2)`
                        : 'var(--shadow-sm)',
                      overflow: 'hidden',
                      transition: 'background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease',
                    }}
                  >
                  {/* Border Shimmer Effect */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '20px',
                      padding: '1px',
                      background: `linear-gradient(90deg, transparent, rgba(${card.color}, 0.8), transparent)`,
                      backgroundSize: '200% 100%',
                      animation: 'borderShimmer 3s ease-in-out infinite',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Ripple Effect */}
                  {isHovered && ripplePosition && hoveredCard === card.id && (
                    <div style={{
                      position: 'absolute',
                      left: ripplePosition.x,
                      top: ripplePosition.y,
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: `rgba(${card.color}, 0.4)`,
                      animation: 'ripple 0.6s ease-out',
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Card Content - Two Column Layout when expanded */}
                  <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    height: '100%',
                  }}>
                    {/* Left Column - Text Content */}
                    <div style={{
                      flex: isHovered ? '1' : '1',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: `rgb(${card.color})`,
                        marginBottom: '1rem',
                        letterSpacing: '0.1em',
                        opacity: 0.8,
                      }}>
                        {card.label}
                      </div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '500',
                        color: 'var(--text-primary)',
                        marginBottom: '0.75rem',
                        letterSpacing: '-0.01em',
                      }}>
                        {card.title}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-tertiary)',
                        lineHeight: '1.6',
                        marginBottom: '1rem',
                      }}>
                        {isHovered ? card.expandedDescription : card.description}
                      </p>

                      {/* Tags - shown when expanded */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                          }}
                        >
                          {card.tags.map((tag: string, i: number) => (
                            <span
                              key={i}
                              style={{
                                fontSize: '0.6875rem',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                background: `rgba(${card.color}, 0.15)`,
                                color: `rgb(${card.color})`,
                                fontWeight: '500',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>
                      )}

                      <div style={{
                        fontSize: '0.813rem',
                        fontWeight: '500',
                        color: `rgb(${card.color})`,
                        letterSpacing: '0.02em',
                        marginTop: 'auto',
                      }}>
                        {card.metric}
                      </div>
                    </div>

                    {/* Right Column - Image Placeholder (shown when expanded) */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                        style={{
                          flex: '1',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                        }}
                      >
                        {/* Main Image Placeholder */}
                        <div style={{
                          flex: '1',
                          borderRadius: '12px',
                          background: `linear-gradient(135deg, rgba(${card.color}, 0.1), rgba(${card.color}, 0.05))`,
                          border: `1px dashed rgba(${card.color}, 0.3)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: '120px',
                        }}>
                          <div style={{
                            textAlign: 'center',
                            color: `rgba(${card.color}, 0.5)`,
                          }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                            <p style={{ fontSize: '0.6875rem', marginTop: '0.5rem' }}>Preview</p>
                          </div>
                        </div>

                        {/* Secondary Thumbnails */}
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                        }}>
                          {[1, 2].map((i) => (
                            <div
                              key={i}
                              style={{
                                flex: '1',
                                height: '48px',
                                borderRadius: '8px',
                                background: `rgba(${card.color}, 0.08)`,
                                border: `1px dashed rgba(${card.color}, 0.2)`,
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}

              {/* CTA Card - View Full Case Study */}
              <CTACard isMobile={false} inView={inView} />
            </div>
          );
        })()}

        {/* Mobile: Horizontal Carousel */}
        {isMobile && (
          <>
            <div
              ref={carouselRef}
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {impactCards.map((card, index) => {
                const isHovered = hoveredCard === card.id;

                return (
                  <div
                    key={card.id}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      flex: '0 0 85%',
                      scrollSnapAlign: 'center',
                      position: 'relative',
                      padding: '2rem',
                      borderRadius: '20px',
                      background: isHovered
                        ? `linear-gradient(135deg, rgba(${card.color}, 0.06), var(--surface-primary))`
                        : 'var(--surface-primary)',
                      backdropFilter: 'blur(40px)',
                      WebkitBackdropFilter: 'blur(40px)',
                      border: `1px solid ${isHovered ? `rgba(${card.color}, 0.3)` : 'var(--border-primary)'}`,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isHovered
                        ? `0 20px 40px rgba(${card.color}, 0.15)`
                        : 'var(--shadow-sm)',
                    }}
                  >
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: `rgb(${card.color})`,
                      marginBottom: '1rem',
                      letterSpacing: '0.1em',
                      opacity: 0.8,
                    }}>
                      {card.label}
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      marginBottom: '0.75rem',
                      letterSpacing: '-0.01em',
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-tertiary)',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                    }}>
                      {card.description}
                    </p>
                    <div style={{
                      fontSize: '0.813rem',
                      fontWeight: '500',
                      color: `rgb(${card.color})`,
                      letterSpacing: '0.02em',
                    }}>
                      {card.metric}
                    </div>
                  </div>
                );
              })}

              {/* CTA Card - View Full Case Study */}
              <CTACard isMobile={true} inView={true} />
            </div>

            {/* Carousel Progress Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
            }}>
              {impactCards.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: currentCarouselIndex === index ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: currentCarouselIndex === index
                      ? 'var(--accent-primary)'
                      : 'var(--border-primary)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* SECTION 7: Research & Innovation */}
      <ActTransition
        actTitle="Questions"
        quote="What happens when design asks uncomfortable questions?"
        actColor="rgba(14, 165, 233, 0.8)"
      />

      {/* SECTION 8: Research Triptych */}
      <section
        ref={researchSectionRef}
        style={{
          position: 'relative',
          paddingTop: 'clamp(2rem, 4vw, 3rem)',
          paddingBottom: 'clamp(2rem, 4vw, 3rem)',
          paddingLeft: isMobile ? '1rem' : '1.5rem',
          paddingRight: isMobile ? '1rem' : '1.5rem',
        }}
      >
        <div style={{
          maxWidth: '96rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '3rem' : '4rem',
        }}>
          {/* Latent Space */}
          <Suspense fallback={<ResearchSkeleton />}>
            <ResearchShowcase
              project={{
                title: 'Latent Space',
                description: 'A speculative design exploration questioning the ethics of dream technology. What do we lose when we quantify consciousness?',
                category: 'Speculative Design',
                stats: [
                  { label: 'Provocations', value: '12+' },
                  { label: 'Ethical Considerations', value: '8' },
                  { label: 'Privacy Approach', value: 'First' },
                ],
                caseStudyUrl: '/work/latent-space',
                color: '147, 51, 234',
              }}
              inView={researchInView}
              index={0}
            />
          </Suspense>

          {/* mythOS */}
          <Suspense fallback={<ResearchSkeleton />}>
            <ResearchShowcase
              project={{
                title: 'mythOS',
                description: 'An AI-powered exhibition generator that creates personalized mythological journeys. Built with Gemini AI.',
                category: 'AI Experiment',
                demoUrl: 'https://mythos-demo.vercel.app',
                caseStudyUrl: '/work/mythos',
                color: '139, 92, 246',
              }}
              inView={researchInView}
              index={1}
            />
          </Suspense>

          {/* PsoriAssist */}
          <Suspense fallback={<ResearchSkeleton />}>
            <ResearchShowcase
              project={{
                title: 'PsoriAssist',
                description: '18 months. 2M patients. Clinical validation pathway. AI-powered psoriasis management with iOS prototypes.',
                category: 'Health Tech · Featured',
                stats: [
                  { label: 'SUS Score', value: '82/100' },
                  { label: 'Year 5 Projection', value: '$38M' },
                  { label: 'AI PASI Accuracy', value: '+33%' },
                ],
                caseStudyUrl: '/work/psoriassist',
                color: '236, 72, 153',
              }}
              inView={researchInView}
              index={2}
            />
          </Suspense>
        </div>
      </section>

      {/* SECTION 9: College Projects */}
      <ActTransition
        actTitle="Foundation"
        quote="Academic exploration, 2023"
        actColor="rgba(147, 51, 234, 0.8)"
      />

      {/* SECTION 10: Metamorphic Fractal Reflections */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        paddingLeft: isMobile ? '1rem' : '1.5rem',
        paddingRight: isMobile ? '1rem' : '1.5rem',
      }} ref={sectionRef}>
        <div style={{
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <p style={{
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              fontWeight: '300',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-100)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              {/* NID Logo */}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                background: 'var(--glass-95)',
                borderRadius: '8px',
                padding: '4px',
                flexShrink: 0,
              }}>
                <Image
                  src="/logos/nid.svg"
                  alt="National Institute of Design"
                  width={24}
                  height={24}
                  style={{ objectFit: 'contain' }}
                />
              </span>
              College Project · 2023
            </p>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '200',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
            }}>
              Metamorphic Fractal Reflections
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: 'var(--text-90)',
              lineHeight: '1.625',
              marginBottom: '2rem',
              maxWidth: '48rem',
            }}>
              An immersive installation exploring consciousness through ego dissolution.
              Inspired by <em>The Psychedelic Experience</em>, this generative art piece
              guides viewers through an 8-stage journey of self-discovery.
            </p>

            {/* Video embed */}
            <div style={{
              borderRadius: '1rem',
              overflow: 'hidden',
              marginBottom: '2rem',
              background: 'var(--surface-secondary)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid var(--border-primary)',
              willChange: 'transform',
            }}>
              <iframe
                src="https://www.youtube.com/embed/your-video-id"
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Tech stack */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: isMobile ? '0.375rem' : '0.5rem',
              marginBottom: '2rem',
            }}>
              {['Processing', 'Generative Art', 'Projection Mapping', 'Sound Design'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    paddingLeft: isMobile ? '0.625rem' : '0.75rem',
                    paddingRight: isMobile ? '0.625rem' : '0.75rem',
                    paddingTop: '0.375rem',
                    paddingBottom: '0.375rem',
                    borderRadius: '0.5rem',
                    fontSize: isMobile ? '0.6875rem' : '0.75rem',
                    background: 'var(--glass-08)',
                    border: '1px solid var(--glass-15)',
                    color: 'var(--text-90)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    willChange: 'transform',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* View Case Study Button with enhanced hover */}
            <EnhancedButton
              href="/work/metamorphic-fractal-reflections"
              label="View Full Case Study"
              isMobile={isMobile}
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 11: Closing & Navigation */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(3rem, 6vw, 4rem)',
        paddingBottom: 'clamp(3rem, 6vw, 4rem)',
        paddingLeft: isMobile ? '1rem' : '1.5rem',
        paddingRight: isMobile ? '1rem' : '1.5rem',
      }}>
        {/* Responsive styles */}
        <style jsx>{`
          @media (min-width: 768px) {
            .cta-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
          }
        `}</style>

        <div style={{
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '200',
              color: 'var(--text-90)',
              marginBottom: '2rem',
            }}>
              Explore further
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: 'var(--text-tertiary)',
              marginBottom: isMobile ? '2rem' : '3rem',
              maxWidth: '42rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Explore individual case studies, view my full journey, or get in touch to collaborate.
            </p>

            {/* CTA Grid with enhanced hover */}
            <div className="cta-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                gap: isMobile ? '1rem' : '1.5rem',
              }}>
                {[
                  { label: 'View All Projects', href: '/work', icon: ArrowRight },
                  { label: 'Read Journey', href: '/journey', icon: ArrowRight },
                  { label: 'Contact Me', href: '/contact', icon: ArrowRight },
                ].map((cta, index) => (
                  <EnhancedCTACard
                    key={index}
                    label={cta.label}
                    href={cta.href}
                    icon={cta.icon}
                    isMobile={isMobile}
                  />
                ))}
            </div>
          </motion.div>
        </div>
      </section>
    </WorkPageLayout>
  );
}

// ========================================
// ENHANCED COMPONENTS
// ========================================

/**
 * Enhanced button with magnetic hover effect
 */
function EnhancedButton({ href, label, isMobile }: { href: string; label: string; isMobile: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMousePosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        paddingLeft: isMobile ? '1.25rem' : '1.5rem',
        paddingRight: isMobile ? '1.25rem' : '1.5rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        marginTop: '2rem',
        borderRadius: '0.75rem',
        fontSize: isMobile ? '0.8125rem' : '0.875rem',
        fontWeight: '500',
        textDecoration: 'none',
        background: isHovered ? 'var(--surface-hover)' : 'var(--surface-primary)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        border: `1px solid ${isHovered ? 'var(--border-secondary)' : 'var(--border-primary)'}`,
        color: isHovered ? 'var(--text-100)' : 'var(--text-90)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) ${isHovered ? 'translateY(-2px)' : 'translateY(0)'}`,
        willChange: 'transform',
      }}
    >
      <span>{label}</span>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight size={16} />
      </motion.div>
    </Link>
  );
}

/**
 * Enhanced CTA card with magnetic hover effect
 */
function EnhancedCTACard({
  label,
  href,
  icon: Icon,
  isMobile
}: {
  label: string;
  href: string;
  icon: React.ComponentType<{ size: number; style?: React.CSSProperties }>;
  isMobile: boolean;
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle magnetic effect
    setMousePosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: isMobile ? '1.5rem' : '2rem',
        borderRadius: '1rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: isHovered ? 'var(--surface-hover)' : 'var(--surface-secondary)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: `1px solid ${isHovered ? 'var(--border-hover)' : 'var(--border-primary)'}`,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: isMobile ? '0.9375rem' : '1rem',
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) ${isHovered ? 'translateY(-4px)' : 'translateY(0)'}`,
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.3)'
          : '0 0 0 rgba(0, 0, 0, 0)',
        willChange: 'transform',
      }}
    >
      <span style={{
        color: isHovered ? 'var(--text-100)' : 'var(--text-90)',
        transition: 'color 0.3s ease',
        fontWeight: '500',
      }}>
        {label}
      </span>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Icon
          size={20}
          style={{
            color: isHovered ? 'var(--text-90)' : 'var(--text-tertiary)',
            transition: 'color 0.3s ease',
          }}
        />
      </motion.div>
    </Link>
  );
}

// ========================================
// SKELETON COMPONENTS
// ========================================

function HeroSkeleton() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '48rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        <div style={{
          height: '3rem',
          background: 'var(--surface-primary)',
          borderRadius: '0.5rem',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }} />
        <div style={{
          height: '1.5rem',
          background: 'var(--surface-primary)',
          borderRadius: '0.5rem',
          width: '80%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }} />
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div style={{
      padding: '3rem 1.5rem',
      maxWidth: '80rem',
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              height: '4rem',
              background: 'var(--surface-primary)',
              borderRadius: '1rem',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.5rem',
    }}>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          style={{
            height: '8rem',
            background: 'var(--surface-primary)',
            borderRadius: '1rem',
            border: '1px solid var(--border-primary)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function ResearchSkeleton() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      padding: '2rem',
      background: 'var(--surface-primary)',
      borderRadius: '1.5rem',
      border: '1px solid var(--border-primary)',
    }}>
      <div style={{
        height: '2rem',
        width: '60%',
        background: 'var(--surface-secondary)',
        borderRadius: '0.5rem',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }} />
      <div style={{
        height: '4rem',
        background: 'var(--surface-secondary)',
        borderRadius: '0.5rem',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        animationDelay: '0.2s',
      }} />
      <div style={{
        display: 'flex',
        gap: '1rem',
      }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '3rem',
              background: 'var(--surface-secondary)',
              borderRadius: '0.5rem',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              animationDelay: `${0.3 + i * 0.1}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

/**
 * CTA Card for Air India case study
 * 2-column wide card with Air India red accent
 * Matches the styling structure of other impact cards
 */
function CTACard({ isMobile, inView }: { isMobile: boolean; inView: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const airIndiaRed = '218, 14, 41';

  return (
    <Link
      href="/work/air-india"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '2rem',
        borderRadius: '20px',
        gridColumn: isMobile ? undefined : 'span 2',
        flex: isMobile ? '0 0 85%' : undefined,
        scrollSnapAlign: isMobile ? 'center' : undefined,
        background: isHovered
          ? `linear-gradient(135deg, rgba(${airIndiaRed}, 0.06), var(--surface-primary))`
          : 'var(--surface-primary)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        animation: !isMobile && inView ? 'scrollRevealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.3s both' : 'none',
        boxShadow: isHovered
          ? `0 20px 40px rgba(${airIndiaRed}, 0.15)`
          : 'var(--shadow-sm)',
        overflow: 'hidden',
        textDecoration: 'none',
      }}
    >
      {/* Border Shimmer Effect */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          padding: '1px',
          background: `linear-gradient(90deg, transparent, rgba(${airIndiaRed}, 0.8), transparent)`,
          backgroundSize: '200% 100%',
          animation: 'borderShimmer 3s ease-in-out infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        }} />
      )}

      {/* Label - matches "01", "02" pattern */}
      <div style={{
        fontSize: '0.75rem',
        fontWeight: '600',
        color: `rgb(${airIndiaRed})`,
        marginBottom: '1rem',
        letterSpacing: '0.1em',
        opacity: 0.8,
      }}>
        →
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: isMobile ? '1.25rem' : '1.5rem',
        fontWeight: '500',
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
        letterSpacing: '-0.01em',
      }}>
        View Full Case Study
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-tertiary)',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
      }}>
        8 systems across Air India&apos;s digital transformation
      </p>

      {/* Metric/Action - matches other cards' metric position */}
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.813rem',
          fontWeight: '500',
          color: `rgb(${airIndiaRed})`,
          letterSpacing: '0.02em',
        }}
      >
        <span>Explore case study</span>
        <ArrowRight size={14} />
      </motion.div>
    </Link>
  );
}
