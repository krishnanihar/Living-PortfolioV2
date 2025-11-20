'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { WorkPageLayout } from '@/components/narrative-work/WorkPageLayout';
import { NarrativeWorkHero } from '@/components/narrative-work/NarrativeWorkHero';
import { JourneyOverview } from '@/components/narrative-work/JourneyOverview';
import { StatCardGrid, type StatCardData } from '@/components/narrative-work/StatCard';
import { ImpactBentoGrid, type ImpactCard } from '@/components/narrative-work/ImpactBentoGrid';
import { ProjectAccordion, type ProjectDetails } from '@/components/narrative-work/ProjectAccordion';
import { ResearchShowcase } from '@/components/narrative-work/ResearchShowcase';
import { BreathingMoment } from '@/components/ui/BreathingMoment';
import { ActTransition } from '@/components/narrative-work/ActTransition';
import { PsoriAssistPhoneMockup } from '@/components/sections/PsoriAssistPhoneMockup';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Trophy, TrendingUp, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';

/**
 * Complete narrative-driven work page
 * 12 sections across 3 acts: Foundation → Industry → Innovation
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
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Air India Stats
  const airIndiaStats: StatCardData[] = [
    {
      value: '8',
      label: 'Key Projects',
      icon: Target,
      color: '99, 102, 241',
      target: 8,
    },
    {
      value: '2',
      label: 'Hackathon Wins',
      icon: Trophy,
      color: '251, 191, 36',
      target: 2,
    },
    {
      value: '↑',
      label: 'Review Speed',
      icon: TrendingUp,
      color: '16, 185, 129',
    },
    {
      value: '↑',
      label: 'Consistency',
      icon: CheckCircle,
      color: '218, 14, 41',
    },
  ];

  // Impact Cards
  const impactCards: ImpactCard[] = [
    {
      id: 1,
      label: '01',
      title: 'Design Systems',
      description: 'Token architecture and Pixel Radar plugin for design consistency',
      metric: '↑ Review efficiency',
      color: '99, 102, 241',
    },
    {
      id: 2,
      label: '02',
      title: 'Data Visualization',
      description: 'Narrative dashboards with progressive disclosure',
      metric: '↓ Decision time',
      color: '16, 185, 129',
    },
    {
      id: 3,
      label: '03',
      title: 'Mobile Patterns',
      description: 'Unified UX library for iOS and Android',
      metric: '↓ Platform bugs',
      color: '139, 92, 246',
    },
    {
      id: 4,
      label: '04',
      title: 'IFE Experience',
      description: 'In-flight entertainment with offline resilience',
      metric: '↑ User satisfaction',
      color: '236, 72, 153',
    },
    {
      id: 5,
      label: '05',
      title: 'Team Culture',
      description: 'Liftoff program for skill progression',
      metric: '↑ Team velocity',
      color: '251, 146, 60',
    },
    {
      id: 6,
      label: '06',
      title: 'Innovation',
      description: 'Hackathon wins now in production',
      metric: '→ Rapid validation',
      color: '14, 165, 233',
    },
  ];

  // Featured Projects (Accordion)
  const featuredProjects: ProjectDetails[] = [
    {
      id: 'pixel-radar',
      category: 'Design Systems',
      title: 'Pixel Radar',
      badge: 'Figma Plugin',
      description: 'Design drift was causing significant rework and inconsistent experiences across Air India\'s digital products. Teams struggled to maintain token compliance without manual reviews.',
      contribution: {
        owned: 'Plugin architecture, audit logic, token normalization algorithms',
        collaborated: 'Design team on token naming, engineering on feasibility',
      },
      outcome: 'Significantly improved review speed and consistency. Teams report fewer design-dev handoff issues.',
      tags: ['Figma', 'TypeScript', 'Design Tokens', 'Automation'],
    },
    {
      id: 'analytics',
      category: 'Data Visualization',
      title: 'Analytics Platform',
      badge: 'Dashboard',
      description: 'Operations teams were overwhelmed by data complexity. Decision-making slowed as stakeholders struggled to extract insights from traditional reports.',
      contribution: {
        owned: 'Information architecture, narrative flow, interaction patterns',
        collaborated: 'Data team on metrics, operations on workflows',
      },
      outcome: 'Reduced decision time to minute-scale. Clearer understanding and faster alignment.',
      tags: ['React', 'D3.js', 'Data Viz', 'UX Research'],
    },
    {
      id: 'mobile-patterns',
      category: 'Mobile Experience',
      title: 'UX Pattern Library',
      badge: 'iOS + Android',
      description: 'Inconsistent mobile experiences across Air India\'s apps were causing user friction and development delays. Teams needed unified patterns for both platforms.',
      contribution: {
        owned: 'Pattern documentation, state matrices, gesture guidelines',
        collaborated: 'Mobile developers on constraints, QA on edge cases',
      },
      outcome: 'Faster mobile prototyping with consistent handoffs. Complete coverage of all states.',
      tags: ['React Native', 'iOS', 'Android', 'Pattern Library', 'State Machines'],
    },
    {
      id: 'token-architecture',
      category: 'Design Systems',
      title: 'Token Architecture',
      badge: 'Foundation',
      description: 'Beyond Pixel Radar, established comprehensive token architecture supporting themes, brands, and platforms. Created the foundation for scalable design decisions.',
      contribution: {
        owned: 'Token taxonomy, naming conventions, inheritance model',
        collaborated: 'Design leadership on governance, engineering on implementation',
      },
      outcome: 'Single source of truth for design decisions. Teams share common language and systematic approach.',
      tags: ['Design Tokens', 'Theming', 'Architecture', 'Documentation'],
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

      {/* SECTION 3: College Projects */}
      <ActTransition
        actTitle="College Projects"
        quote="Academic foundations & early experiments"
        actColor="rgba(147, 51, 234, 0.8)"
      />

      {/* SECTION 4: Metamorphic Fractal Reflections */}
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

      {/* SECTION 5: Breathing Moment I */}
      <BreathingMoment
        quote="From exploration to application..."
        type="reflection"
      />

      {/* SECTION 6: Professional Work */}
      <ActTransition
        actTitle="Professional Work"
        quote="Designing at scale for Air India"
        actColor="rgba(218, 14, 41, 0.8)"
      />

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

      {/* SECTION 7: Air India Overview - Stats */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        paddingLeft: isMobile ? '1rem' : '1.5rem',
        paddingRight: isMobile ? '1rem' : '1.5rem',
      }}>
        <div style={{
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? '2.5rem' : '4rem',
          }}>
            <motion.p
              style={{
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                fontWeight: '300',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: '1rem',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              2023-Present
            </motion.p>
            <motion.h2
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                fontWeight: '200',
                color: 'var(--text-90)',
                marginBottom: '1rem',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Transforming India's Flag Carrier
            </motion.h2>
            <motion.p
              style={{
                color: 'var(--text-tertiary)',
                maxWidth: '42rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: isMobile ? '0.9375rem' : '1rem',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Systems and innovation across Air India's digital transformation
            </motion.p>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <StatCardGrid stats={airIndiaStats} inView={inView} />
          </Suspense>
        </div>
      </section>

      {/* Impact Areas */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        paddingLeft: isMobile ? '1rem' : '1.5rem',
        paddingRight: isMobile ? '1rem' : '1.5rem',
      }}>
        <div style={{
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '3rem',
          }}>
            <h3 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
              fontWeight: '300',
              color: 'var(--text-90)',
              marginBottom: '1rem',
            }}>
              Six Areas of Impact
            </h3>
          </div>
          <Suspense fallback={<BentoSkeleton />}>
            <ImpactBentoGrid cards={impactCards} inView={inView} />
          </Suspense>
        </div>
      </section>

      {/* SECTION 8: Featured Projects - Accordion */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        paddingLeft: isMobile ? '1rem' : '1.5rem',
        paddingRight: isMobile ? '1rem' : '1.5rem',
      }}>
        <div style={{
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? '2.5rem' : '4rem',
          }}>
            <h3 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
              fontWeight: '300',
              color: 'var(--text-90)',
              marginBottom: '1rem',
            }}>
              Project Details
            </h3>
            <p style={{
              color: 'var(--text-tertiary)',
              fontSize: isMobile ? '0.9375rem' : '1rem',
            }}>
              Deep dives into key initiatives
            </p>
          </div>

          <Suspense fallback={<AccordionSkeleton />}>
            <ProjectAccordion projects={featuredProjects} inView={inView} />
          </Suspense>
        </div>
      </section>

      {/* SECTION 9: Breathing Moment II */}
      <BreathingMoment
        quote="What if we could reimagine the future of health and consciousness?"
        type="question"
      />

      {/* SECTION 10: Research & Innovation */}
      <ActTransition
        actTitle="Research & Innovation"
        quote="AI applications & design research"
        actColor="rgba(14, 165, 233, 0.8)"
      />

      {/* SECTION 11: Research Triptych */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        paddingLeft: isMobile ? '1rem' : '1.5rem',
        paddingRight: isMobile ? '1rem' : '1.5rem',
      }}>
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
              inView={inView}
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
              inView={inView}
              index={1}
            />
          </Suspense>

          {/* PsoriAssist - HERO with interactive prototype */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '2rem' : '3rem',
          }}>
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
                inView={inView}
                index={2}
              />
            </Suspense>

            {/* Interactive prototype - sticky section (desktop only) */}
            {!isMobile && (
              <div style={{
                position: 'sticky',
                top: '6rem',
              }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <PsoriAssistPhoneMockup />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 12: Closing & Navigation */}
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
              This is just the beginning...
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

function BentoSkeleton() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
    }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            height: '10rem',
            background: 'var(--surface-primary)',
            borderRadius: '1rem',
            border: '1px solid var(--border-primary)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: `${i * 0.1}s`,
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

function AccordionSkeleton() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          style={{
            height: '5rem',
            background: 'var(--surface-primary)',
            borderRadius: '1rem',
            border: '1px solid var(--border-primary)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: `${i * 0.2}s`,
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
