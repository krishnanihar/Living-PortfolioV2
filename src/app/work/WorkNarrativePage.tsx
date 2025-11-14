'use client';

import React, { useEffect, useState, useRef } from 'react';
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
import { Target, Trophy, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * Complete narrative-driven work page
 * 12 sections across 3 acts: Foundation → Industry → Innovation
 */
export function WorkNarrativePage() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
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
      <NarrativeWorkHero />

      {/* SECTION 2: Journey Overview */}
      <JourneyOverview />

      {/* SECTION 3: Act I Transition - Foundation */}
      <ActTransition
        actTitle="Act I: Foundation"
        quote="Where consciousness meets code"
        actColor="rgba(147, 51, 234, 0.8)"
      />

      {/* SECTION 4: Metamorphic Fractal Reflections */}
      <section style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
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
          >
            <p style={{
              fontSize: '0.875rem',
              fontWeight: '300',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '1rem',
            }}>
              College Project · 2023
            </p>
            <h2 style={{
              fontSize: 'clamp(2.25rem, 5vw, 3rem)',
              fontWeight: '200',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '1.5rem',
            }}>
              Metamorphic Fractal Reflections
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
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
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
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
              gap: '0.5rem',
            }}>
              {['Processing', 'Generative Art', 'Projection Mapping', 'Sound Design'].map((tech) => (
                <span
                  key={tech}
                  style={{
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                    paddingTop: '0.375rem',
                    paddingBottom: '0.375rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    background: 'rgba(147, 51, 234, 0.1)',
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    color: 'rgba(147, 51, 234, 0.9)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Breathing Moment I */}
      <BreathingMoment
        quote="From exploration to application..."
        type="reflection"
      />

      {/* SECTION 6: Act II Transition - Industry */}
      <ActTransition
        actTitle="Act II: Industry"
        quote="Designing at 40,000 feet"
        actColor="rgba(218, 14, 41, 0.8)"
      />

      {/* SECTION 7: Air India Overview - Stats */}
      <section style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}>
        <div style={{
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
          }}>
            <motion.p
              style={{
                fontSize: '0.875rem',
                fontWeight: '300',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.6)',
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
                fontSize: 'clamp(1.875rem, 4vw, 2.25rem)',
                fontWeight: '200',
                color: 'rgba(255, 255, 255, 0.9)',
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
                color: 'rgba(255, 255, 255, 0.6)',
                maxWidth: '42rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Systems and innovation across Air India's digital transformation
            </motion.p>
          </div>

          <StatCardGrid stats={airIndiaStats} inView={inView} />
        </div>
      </section>

      {/* Impact Areas */}
      <section style={{
        position: 'relative',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}>
        <div style={{
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '1rem',
            }}>
              Six Areas of Impact
            </h3>
          </div>
          <ImpactBentoGrid cards={impactCards} inView={inView} />
        </div>
      </section>

      {/* SECTION 8: Featured Projects - Accordion */}
      <section style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}>
        <div style={{
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
          }}>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '1rem',
            }}>
              Project Details
            </h3>
            <p style={{
              color: 'rgba(255, 255, 255, 0.6)',
            }}>
              Deep dives into key initiatives
            </p>
          </div>

          <ProjectAccordion projects={featuredProjects} inView={inView} />
        </div>
      </section>

      {/* SECTION 9: Breathing Moment II */}
      <BreathingMoment
        quote="What if we could reimagine the future of health and consciousness?"
        type="question"
      />

      {/* SECTION 10: Act III Transition - Innovation */}
      <ActTransition
        actTitle="Act III: Innovation"
        quote="Speculative futures & ethical AI"
        actColor="rgba(14, 165, 233, 0.8)"
      />

      {/* SECTION 11: Research Triptych */}
      <section style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}>
        <div style={{
          maxWidth: '96rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
        }}>
          {/* Latent Space */}
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

          {/* mythOS */}
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

          {/* PsoriAssist - HERO with interactive prototype */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
          }}>
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

            {/* Interactive prototype - sticky section */}
            <div style={{
              position: 'sticky',
              top: '6rem',
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <PsoriAssistPhoneMockup />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: Closing & Navigation */}
      <section style={{
        position: 'relative',
        paddingTop: '8rem',
        paddingBottom: '8rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
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
          >
            <h2 style={{
              fontSize: 'clamp(2.25rem, 5vw, 3rem)',
              fontWeight: '200',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2rem',
            }}>
              This is just the beginning...
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '3rem',
              maxWidth: '42rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Explore individual case studies, view my full journey, or get in touch to collaborate.
            </p>

            {/* CTA Grid */}
            <div className="cta-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                gap: '1.5rem',
              }}>
                {[
                  { label: 'View All Projects', href: '/work', icon: ArrowRight },
                  { label: 'Read Journey', href: '/journey', icon: ArrowRight },
                  { label: 'Contact Me', href: '/contact', icon: ArrowRight },
                ].map((cta, index) => {
                  const Icon = cta.icon;
                  const [isHovered, setIsHovered] = React.useState(false);
                  return (
                    <Link
                      key={index}
                      href={cta.href as any}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      style={{
                        padding: '2rem',
                        borderRadius: '1rem',
                        transition: 'all 500ms ease',
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(40px)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        textDecoration: 'none',
                        display: 'block',
                      }}
                    >
                      <span style={{
                        color: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.9)',
                        transition: 'color 300ms ease',
                      }}>
                        {cta.label}
                      </span>
                      <Icon
                        size={20}
                        style={{
                          display: 'inline-block',
                          marginLeft: '0.5rem',
                          transition: 'transform 300ms ease',
                          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                          color: 'rgba(255, 255, 255, 0.6)',
                        }}
                      />
                    </Link>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </section>
    </WorkPageLayout>
  );
}
