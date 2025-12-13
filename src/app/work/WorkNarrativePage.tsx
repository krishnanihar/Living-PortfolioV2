'use client';

import React, { useEffect, useState, useRef, Suspense, useCallback } from 'react';
import { WorkPageLayout } from '@/components/narrative-work/WorkPageLayout';
import { NarrativeWorkHero } from '@/components/narrative-work/NarrativeWorkHero';
import { JourneyOverview } from '@/components/narrative-work/JourneyOverview';
import { AirIndiaHeroCard } from '@/components/narrative-work/AirIndiaHeroCard';
import { PsoriAssistHeroCard } from '@/components/narrative-work/PsoriAssistHeroCard';
import { MetamorphicHeroCard } from '@/components/narrative-work/MetamorphicHeroCard';
import { LatentSpaceHeroCard } from '@/components/narrative-work/LatentSpaceHeroCard';
import { MicroVisualization } from '@/components/narrative-work/MicroVisualizations';
import { type ImpactCard } from '@/components/narrative-work/ImpactBentoGrid';
import { ResearchShowcase } from '@/components/narrative-work/ResearchShowcase';
import { ActTransition } from '@/components/narrative-work/ActTransition';
import { motion, LayoutGroup } from 'framer-motion';
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
  const [debouncedHoveredCard, setDebouncedHoveredCard] = useState<number | null>(null);
  const [ripplePosition, setRipplePosition] = useState<{ x: number; y: number } | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const researchSectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // PsoriAssist section state
  const [psoriassistHoveredCard, setPsoriassistHoveredCard] = useState<number | null>(null);
  const [psoriassistDebouncedCard, setPsoriassistDebouncedCard] = useState<number | null>(null);
  const psoriassistHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [psoriassistCarouselIndex, setPsoriassistCarouselIndex] = useState(0);
  const psoriassistCarouselRef = useRef<HTMLDivElement>(null);

  // Metamorphic section state
  const [metamorphicHoveredCard, setMetamorphicHoveredCard] = useState<number | null>(null);
  const [metamorphicDebouncedCard, setMetamorphicDebouncedCard] = useState<number | null>(null);
  const metamorphicHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [metamorphicCarouselIndex, setMetamorphicCarouselIndex] = useState(0);
  const metamorphicCarouselRef = useRef<HTMLDivElement>(null);

  // Latent Space section state
  const [latentHoveredCard, setLatentHoveredCard] = useState<number | null>(null);
  const [latentDebouncedCard, setLatentDebouncedCard] = useState<number | null>(null);
  const latentHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [latentCarouselIndex, setLatentCarouselIndex] = useState(0);
  const latentCarouselRef = useRef<HTMLDivElement>(null);

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

  // Debounced hover handler to prevent grid transition interruption
  // Uses two states: hoveredCard (immediate) for card content, debouncedHoveredCard (delayed) for grid template
  const handleCardHover = useCallback((cardId: number | null) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (cardId !== null) {
      setHoveredCard(cardId); // Immediate for card content changes
      hoverTimeoutRef.current = setTimeout(() => {
        setDebouncedHoveredCard(cardId); // Delayed for grid template (prevents mid-transition interruption)
      }, 50);
    } else {
      setHoveredCard(null);
      setDebouncedHoveredCard(null);
    }
  }, []);

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (psoriassistHoverTimeoutRef.current) {
        clearTimeout(psoriassistHoverTimeoutRef.current);
      }
      if (metamorphicHoverTimeoutRef.current) {
        clearTimeout(metamorphicHoverTimeoutRef.current);
      }
      if (latentHoverTimeoutRef.current) {
        clearTimeout(latentHoverTimeoutRef.current);
      }
    };
  }, []);

  // PsoriAssist debounced hover handler
  const handlePsoriassistHover = useCallback((cardId: number | null) => {
    if (psoriassistHoverTimeoutRef.current) {
      clearTimeout(psoriassistHoverTimeoutRef.current);
    }
    if (cardId !== null) {
      setPsoriassistHoveredCard(cardId);
      psoriassistHoverTimeoutRef.current = setTimeout(() => {
        setPsoriassistDebouncedCard(cardId);
      }, 50);
    } else {
      setPsoriassistHoveredCard(null);
      setPsoriassistDebouncedCard(null);
    }
  }, []);

  // Metamorphic debounced hover handler
  const handleMetamorphicHover = useCallback((cardId: number | null) => {
    if (metamorphicHoverTimeoutRef.current) {
      clearTimeout(metamorphicHoverTimeoutRef.current);
    }
    if (cardId !== null) {
      setMetamorphicHoveredCard(cardId);
      metamorphicHoverTimeoutRef.current = setTimeout(() => {
        setMetamorphicDebouncedCard(cardId);
      }, 50);
    } else {
      setMetamorphicHoveredCard(null);
      setMetamorphicDebouncedCard(null);
    }
  }, []);

  // Latent Space debounced hover handler
  const handleLatentHover = useCallback((cardId: number | null) => {
    if (latentHoverTimeoutRef.current) {
      clearTimeout(latentHoverTimeoutRef.current);
    }
    if (cardId !== null) {
      setLatentHoveredCard(cardId);
      latentHoverTimeoutRef.current = setTimeout(() => {
        setLatentDebouncedCard(cardId);
      }, 50);
    } else {
      setLatentHoveredCard(null);
      setLatentDebouncedCard(null);
    }
  }, []);

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

  // PsoriAssist Impact Cards
  const psoriassistImpactCards = [
    {
      id: 1,
      label: '01',
      title: 'Ghost Overlay',
      description: 'Photo alignment for progress tracking',
      expandedDescription: 'Innovative camera overlay system that aligns previous photos with current shots, enabling precise visual comparison of psoriasis progression over time.',
      metric: '↑ Tracking accuracy',
      tags: ['Computer Vision', 'UX'],
      color: '236, 72, 153',
    },
    {
      id: 2,
      label: '02',
      title: 'AI PASI Scoring',
      description: 'CNN-based severity assessment, 33% better',
      expandedDescription: 'Deep learning model trained on dermatological data to provide automated PASI severity scores, improving assessment consistency by 33% compared to manual methods.',
      metric: '+33% accuracy',
      tags: ['ML', 'Clinical'],
      color: '139, 92, 246',
    },
    {
      id: 3,
      label: '03',
      title: 'Smart Reminders',
      description: 'Context-aware medication adherence',
      expandedDescription: 'Intelligent notification system that learns user behavior patterns to deliver reminders at optimal times, improving medication adherence rates.',
      metric: '↑ Adherence rate',
      tags: ['Notifications', 'AI'],
      color: '16, 185, 129',
    },
    {
      id: 4,
      label: '04',
      title: 'Early PsA Detection',
      description: 'PEST screening for arthritis',
      expandedDescription: 'Integrated PEST (Psoriasis Epidemiology Screening Tool) questionnaire with AI analysis to flag early signs of psoriatic arthritis.',
      metric: '→ Prevention first',
      tags: ['Prevention', 'ML'],
      color: '251, 146, 60',
    },
    {
      id: 5,
      label: '05',
      title: 'Mental Health',
      description: 'PHQ-9/GAD-7 integrated screening',
      expandedDescription: 'Holistic health approach with validated mental health questionnaires integrated into regular check-ins, recognizing the psychological impact of chronic skin conditions.',
      metric: '↑ Holistic care',
      tags: ['Holistic', 'Research'],
      color: '14, 165, 233',
    },
    {
      id: 6,
      label: '06',
      title: 'Provider Dashboard',
      description: 'Clinical data export & analytics',
      expandedDescription: 'B2B analytics dashboard for healthcare providers with HIPAA-compliant data export, patient progress tracking, and population health insights.',
      metric: '→ Clinical integration',
      tags: ['B2B', 'Analytics'],
      color: '99, 102, 241',
    },
  ];

  // Metamorphic Impact Cards
  const metamorphicImpactCards = [
    {
      id: 1,
      label: '01',
      title: 'Research Foundation',
      description: 'Psychedelic literature & trip reports',
      expandedDescription: 'Deep research into psychedelic phenomenology, studying trip reports and academic literature to inform the visual language of consciousness exploration.',
      metric: '→ Conceptual depth',
      tags: ['Conceptual', 'Research'],
      color: '147, 51, 234',
    },
    {
      id: 2,
      label: '02',
      title: '3D Modelling',
      description: 'VR previsualization of installation',
      expandedDescription: 'Created detailed 3D models in Blender for VR previsualization, allowing stakeholders to experience the installation before physical construction.',
      metric: '↑ Stakeholder buy-in',
      tags: ['Blender', 'VR'],
      color: '139, 92, 246',
    },
    {
      id: 3,
      label: '03',
      title: 'TouchDesigner',
      description: 'Real-time visual generation',
      expandedDescription: 'Built the core visual engine in TouchDesigner, creating responsive generative systems that morph and evolve based on audience interaction.',
      metric: '→ Real-time response',
      tags: ['Creative Coding', 'TD'],
      color: '236, 72, 153',
    },
    {
      id: 4,
      label: '04',
      title: 'Stable Diffusion',
      description: 'AI-generated fractal imagery',
      expandedDescription: 'Trained custom Stable Diffusion models on fractal and psychedelic imagery to generate unique visual assets that blend organic and geometric forms.',
      metric: '→ Unique aesthetics',
      tags: ['Generative AI', 'SD'],
      color: '16, 185, 129',
    },
    {
      id: 5,
      label: '05',
      title: 'Arduino Integration',
      description: 'Sensor-driven interactions',
      expandedDescription: 'Designed custom Arduino sensor arrays to capture audience presence and movement, translating physical interaction into visual responses.',
      metric: '↑ Interactivity',
      tags: ['Hardware', 'IoT'],
      color: '251, 146, 60',
    },
    {
      id: 6,
      label: '06',
      title: 'Audio-Reactive SFX',
      description: 'Sound-responsive visuals',
      expandedDescription: 'Created a binaural audio soundscape with visuals that respond to frequency and amplitude, creating a multi-sensory immersive experience.',
      metric: '→ Multi-sensory',
      tags: ['Sound Design', 'Audio'],
      color: '14, 165, 233',
    },
  ];

  // Latent Space Impact Cards
  const latentSpaceImpactCards = [
    {
      id: 1,
      label: '01',
      title: 'Eye-Gaze Tracking',
      description: '87% REM detection accuracy',
      expandedDescription: 'Developed speculative eye-tracking algorithms capable of detecting REM sleep phases with 87% accuracy through subtle lid movement analysis.',
      metric: '87% accuracy',
      tags: ['Detection', 'ML'],
      color: '139, 92, 246',
    },
    {
      id: 2,
      label: '02',
      title: 'EEG Delta Analysis',
      description: '92% dream state accuracy',
      expandedDescription: 'Proposed EEG-based system analyzing delta wave patterns to identify dream states with 92% accuracy, enabling precise dream capture timing.',
      metric: '92% accuracy',
      tags: ['Neuroscience', 'EEG'],
      color: '147, 51, 234',
    },
    {
      id: 3,
      label: '03',
      title: 'Biometric Fusion',
      description: '95% multi-modal accuracy',
      expandedDescription: 'Conceptualized sensor fusion architecture combining EEG, eye-tracking, and physiological data for comprehensive dream state detection.',
      metric: '95% combined',
      tags: ['Sensor Fusion', 'AI'],
      color: '236, 72, 153',
    },
    {
      id: 4,
      label: '04',
      title: 'Consent Framework',
      description: 'Ethical dream data ownership',
      expandedDescription: 'Designed a comprehensive ethical framework addressing dream data ownership, privacy rights, and consent protocols for speculative dream technology.',
      metric: '→ Ethics first',
      tags: ['Ethics', 'Privacy'],
      color: '16, 185, 129',
    },
    {
      id: 5,
      label: '05',
      title: 'Dream Recorder',
      description: 'Speculative design fiction prototype',
      expandedDescription: 'Created detailed product fiction for the Dream Recorder device, exploring form factors, interaction paradigms, and user experience implications.',
      metric: '→ Speculation',
      tags: ['Speculation', 'Product'],
      color: '251, 146, 60',
    },
    {
      id: 6,
      label: '06',
      title: 'Narrative Arc',
      description: 'Three-act storytelling structure',
      expandedDescription: 'Structured the case study as a three-act narrative: Seduction (promise), Complication (ethics), Resolution (framework), creating an immersive reading experience.',
      metric: '→ Storytelling',
      tags: ['UX Writing', 'Narrative'],
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
          padding: '0',
          marginBottom: '0',
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

        {/* Desktop: Bento Grid */}
        {!isMobile && (() => {
          // Grid template control - card stays in place, grid resizes around it
          // Uses debouncedHoveredCard to prevent mid-transition interruptions
          const getGridTemplate = () => {
            if (!debouncedHoveredCard) {
              return { cols: '1fr 1fr 1fr', rows: '1fr 1fr' };
            }
            const index = impactCards.findIndex(c => c.id === debouncedHoveredCard);
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
            <LayoutGroup>
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: cols,
                  gridTemplateRows: rows,
                  gap: '1.5rem',
                }}
                transition={{
                  layout: {
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }
                }}
              >
              {impactCards.map((card) => {
                const isHovered = hoveredCard === card.id;

                return (
                  <motion.div
                    key={card.id}
                    layout
                    layoutId={`impact-card-${card.id}`}
                    onHoverStart={() => handleCardHover(card.id)}
                    onHoverEnd={() => {
                      handleCardHover(null);
                      setRipplePosition(null);
                    }}
                    transition={{
                      layout: {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1],
                      }
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

                    {/* Right Column - Micro Visualization (shown when expanded) */}
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
                        {/* Main Visualization */}
                        <div style={{
                          flex: '1',
                          borderRadius: '12px',
                          background: `linear-gradient(135deg, rgba(${card.color}, 0.1), rgba(${card.color}, 0.05))`,
                          border: `1px solid rgba(${card.color}, 0.2)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: '120px',
                          padding: '1rem',
                        }}>
                          <MicroVisualization
                            cardId={card.id}
                            projectId="air-india"
                            color={card.color}
                            isHovered={isHovered}
                            size="main"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}

              {/* CTA Card - View Full Case Study */}
              <CTACard isMobile={false} inView={inView} />
              </motion.div>
            </LayoutGroup>
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

      {/* PSORIASSIST SECTION */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <PsoriAssistHeroCard />

        {/* Desktop: Bento Grid */}
        {!isMobile && (() => {
          const getGridTemplate = () => {
            if (!psoriassistDebouncedCard) {
              return { cols: '1fr 1fr 1fr', rows: '1fr 1fr' };
            }
            const index = psoriassistImpactCards.findIndex(c => c.id === psoriassistDebouncedCard);
            const col = index % 3;
            const row = Math.floor(index / 3);
            const cols = [0, 1, 2].map(c => c === col ? '2fr' : '0.5fr').join(' ');
            const rows = [0, 1].map(r => r === row ? '2fr' : '0.5fr').join(' ');
            return { cols, rows };
          };
          const { cols, rows } = getGridTemplate();

          return (
            <LayoutGroup>
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: cols,
                  gridTemplateRows: rows,
                  gap: '1.5rem',
                }}
                transition={{
                  layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
                }}
              >
                {psoriassistImpactCards.map((card) => {
                  const isHovered = psoriassistHoveredCard === card.id;
                  return (
                    <motion.div
                      key={card.id}
                      layout
                      layoutId={`psoriassist-card-${card.id}`}
                      onHoverStart={() => handlePsoriassistHover(card.id)}
                      onHoverEnd={() => handlePsoriassistHover(null)}
                      transition={{ layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }}
                      style={{
                        position: 'relative',
                        padding: isHovered ? '2rem' : '1.5rem',
                        borderRadius: 20,
                        background: isHovered
                          ? `linear-gradient(135deg, rgba(${card.color}, 0.08), var(--surface-primary))`
                          : 'var(--surface-primary)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid transparent',
                        cursor: 'pointer',
                        boxShadow: isHovered
                          ? `0 30px 60px rgba(${card.color}, 0.2)`
                          : 'var(--shadow-sm)',
                        overflow: 'hidden',
                        transition: 'background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease',
                      }}
                    >
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
                      <div style={{ display: 'flex', gap: '1.5rem', height: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}
                            >
                              {card.tags.map((tag: string, i: number) => (
                                <span key={i} style={{
                                  fontSize: '0.6875rem',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '4px',
                                  background: `rgba(${card.color}, 0.15)`,
                                  color: `rgb(${card.color})`,
                                  fontWeight: '500',
                                }}>
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
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                          >
                            <div style={{
                              flex: 1,
                              borderRadius: '12px',
                              background: `linear-gradient(135deg, rgba(${card.color}, 0.1), rgba(${card.color}, 0.05))`,
                              border: `1px solid rgba(${card.color}, 0.2)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '120px',
                              padding: '1rem',
                            }}>
                              <MicroVisualization
                                cardId={card.id}
                                projectId="psoriassist"
                                color={card.color}
                                isHovered={isHovered}
                                size="main"
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                <PsoriAssistCTACard isMobile={false} />
              </motion.div>
            </LayoutGroup>
          );
        })()}

        {/* Mobile: Horizontal Carousel */}
        {isMobile && (
          <>
            <div
              ref={psoriassistCarouselRef}
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
              {psoriassistImpactCards.map((card) => (
                <div
                  key={card.id}
                  style={{
                    flex: '0 0 85%',
                    scrollSnapAlign: 'center',
                    position: 'relative',
                    padding: '2rem',
                    borderRadius: '20px',
                    background: 'var(--surface-primary)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid var(--border-primary)',
                    boxShadow: 'var(--shadow-sm)',
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
                  }}>
                    {card.metric}
                  </div>
                </div>
              ))}
              <PsoriAssistCTACard isMobile={true} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
            }}>
              {psoriassistImpactCards.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: psoriassistCarouselIndex === index ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: psoriassistCarouselIndex === index ? 'var(--accent-primary)' : 'var(--border-primary)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* METAMORPHIC FRACTAL SECTION */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <MetamorphicHeroCard />

        {/* Desktop: Bento Grid */}
        {!isMobile && (() => {
          const getGridTemplate = () => {
            if (!metamorphicDebouncedCard) {
              return { cols: '1fr 1fr 1fr', rows: '1fr 1fr' };
            }
            const index = metamorphicImpactCards.findIndex(c => c.id === metamorphicDebouncedCard);
            const col = index % 3;
            const row = Math.floor(index / 3);
            const cols = [0, 1, 2].map(c => c === col ? '2fr' : '0.5fr').join(' ');
            const rows = [0, 1].map(r => r === row ? '2fr' : '0.5fr').join(' ');
            return { cols, rows };
          };
          const { cols, rows } = getGridTemplate();

          return (
            <LayoutGroup>
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: cols,
                  gridTemplateRows: rows,
                  gap: '1.5rem',
                }}
                transition={{
                  layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
                }}
              >
                {metamorphicImpactCards.map((card) => {
                  const isHovered = metamorphicHoveredCard === card.id;
                  return (
                    <motion.div
                      key={card.id}
                      layout
                      layoutId={`metamorphic-card-${card.id}`}
                      onHoverStart={() => handleMetamorphicHover(card.id)}
                      onHoverEnd={() => handleMetamorphicHover(null)}
                      transition={{ layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }}
                      style={{
                        position: 'relative',
                        padding: isHovered ? '2rem' : '1.5rem',
                        borderRadius: 20,
                        background: isHovered
                          ? `linear-gradient(135deg, rgba(${card.color}, 0.08), var(--surface-primary))`
                          : 'var(--surface-primary)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid transparent',
                        cursor: 'pointer',
                        boxShadow: isHovered
                          ? `0 30px 60px rgba(${card.color}, 0.2)`
                          : 'var(--shadow-sm)',
                        overflow: 'hidden',
                        transition: 'background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease',
                      }}
                    >
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
                      <div style={{ display: 'flex', gap: '1.5rem', height: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}
                            >
                              {card.tags.map((tag: string, i: number) => (
                                <span key={i} style={{
                                  fontSize: '0.6875rem',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '4px',
                                  background: `rgba(${card.color}, 0.15)`,
                                  color: `rgb(${card.color})`,
                                  fontWeight: '500',
                                }}>
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
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                          >
                            <div style={{
                              flex: 1,
                              borderRadius: '12px',
                              background: `linear-gradient(135deg, rgba(${card.color}, 0.1), rgba(${card.color}, 0.05))`,
                              border: `1px solid rgba(${card.color}, 0.2)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '120px',
                              padding: '1rem',
                            }}>
                              <MicroVisualization
                                cardId={card.id}
                                projectId="metamorphic"
                                color={card.color}
                                isHovered={isHovered}
                                size="main"
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                <MetamorphicCTACard isMobile={false} />
              </motion.div>
            </LayoutGroup>
          );
        })()}

        {/* Mobile: Horizontal Carousel */}
        {isMobile && (
          <>
            <div
              ref={metamorphicCarouselRef}
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
              {metamorphicImpactCards.map((card) => (
                <div
                  key={card.id}
                  style={{
                    flex: '0 0 85%',
                    scrollSnapAlign: 'center',
                    position: 'relative',
                    padding: '2rem',
                    borderRadius: '20px',
                    background: 'var(--surface-primary)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid var(--border-primary)',
                    boxShadow: 'var(--shadow-sm)',
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
                  }}>
                    {card.metric}
                  </div>
                </div>
              ))}
              <MetamorphicCTACard isMobile={true} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
            }}>
              {metamorphicImpactCards.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: metamorphicCarouselIndex === index ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: metamorphicCarouselIndex === index ? 'var(--accent-primary)' : 'var(--border-primary)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* LATENT SPACE SECTION */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <LatentSpaceHeroCard />

        {/* Desktop: Bento Grid */}
        {!isMobile && (() => {
          const getGridTemplate = () => {
            if (!latentDebouncedCard) {
              return { cols: '1fr 1fr 1fr', rows: '1fr 1fr' };
            }
            const index = latentSpaceImpactCards.findIndex(c => c.id === latentDebouncedCard);
            const col = index % 3;
            const row = Math.floor(index / 3);
            const cols = [0, 1, 2].map(c => c === col ? '2fr' : '0.5fr').join(' ');
            const rows = [0, 1].map(r => r === row ? '2fr' : '0.5fr').join(' ');
            return { cols, rows };
          };
          const { cols, rows } = getGridTemplate();

          return (
            <LayoutGroup>
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: cols,
                  gridTemplateRows: rows,
                  gap: '1.5rem',
                }}
                transition={{
                  layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
                }}
              >
                {latentSpaceImpactCards.map((card) => {
                  const isHovered = latentHoveredCard === card.id;
                  return (
                    <motion.div
                      key={card.id}
                      layout
                      layoutId={`latent-card-${card.id}`}
                      onHoverStart={() => handleLatentHover(card.id)}
                      onHoverEnd={() => handleLatentHover(null)}
                      transition={{ layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }}
                      style={{
                        position: 'relative',
                        padding: isHovered ? '2rem' : '1.5rem',
                        borderRadius: 20,
                        background: isHovered
                          ? `linear-gradient(135deg, rgba(${card.color}, 0.08), var(--surface-primary))`
                          : 'var(--surface-primary)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid transparent',
                        cursor: 'pointer',
                        boxShadow: isHovered
                          ? `0 30px 60px rgba(${card.color}, 0.2)`
                          : 'var(--shadow-sm)',
                        overflow: 'hidden',
                        transition: 'background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease',
                      }}
                    >
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
                      <div style={{ display: 'flex', gap: '1.5rem', height: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}
                            >
                              {card.tags.map((tag: string, i: number) => (
                                <span key={i} style={{
                                  fontSize: '0.6875rem',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '4px',
                                  background: `rgba(${card.color}, 0.15)`,
                                  color: `rgb(${card.color})`,
                                  fontWeight: '500',
                                }}>
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
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                          >
                            <div style={{
                              flex: 1,
                              borderRadius: '12px',
                              background: `linear-gradient(135deg, rgba(${card.color}, 0.1), rgba(${card.color}, 0.05))`,
                              border: `1px solid rgba(${card.color}, 0.2)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '120px',
                              padding: '1rem',
                            }}>
                              <MicroVisualization
                                cardId={card.id}
                                projectId="latent-space"
                                color={card.color}
                                isHovered={isHovered}
                                size="main"
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                <LatentSpaceCTACard isMobile={false} />
              </motion.div>
            </LayoutGroup>
          );
        })()}

        {/* Mobile: Horizontal Carousel */}
        {isMobile && (
          <>
            <div
              ref={latentCarouselRef}
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
              {latentSpaceImpactCards.map((card) => (
                <div
                  key={card.id}
                  style={{
                    flex: '0 0 85%',
                    scrollSnapAlign: 'center',
                    position: 'relative',
                    padding: '2rem',
                    borderRadius: '20px',
                    background: 'var(--surface-primary)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid var(--border-primary)',
                    boxShadow: 'var(--shadow-sm)',
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
                  }}>
                    {card.metric}
                  </div>
                </div>
              ))}
              <LatentSpaceCTACard isMobile={true} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
            }}>
              {latentSpaceImpactCards.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: latentCarouselIndex === index ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: latentCarouselIndex === index ? 'var(--accent-primary)' : 'var(--border-primary)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* SECTION: Closing & Navigation */}
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

/**
 * CTA Card for PsoriAssist case study
 */
function PsoriAssistCTACard({ isMobile }: { isMobile: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const brandColor = '236, 72, 153';

  return (
    <Link
      href="/work/psoriassist"
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
          ? `linear-gradient(135deg, rgba(${brandColor}, 0.06), var(--surface-primary))`
          : 'var(--surface-primary)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        boxShadow: isHovered
          ? `0 20px 40px rgba(${brandColor}, 0.15)`
          : 'var(--shadow-sm)',
        overflow: 'hidden',
        textDecoration: 'none',
      }}
    >
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          padding: '1px',
          background: `linear-gradient(90deg, transparent, rgba(${brandColor}, 0.8), transparent)`,
          backgroundSize: '200% 100%',
          animation: 'borderShimmer 3s ease-in-out infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        }} />
      )}
      <div style={{
        fontSize: '0.75rem',
        fontWeight: '600',
        color: `rgb(${brandColor})`,
        marginBottom: '1rem',
        letterSpacing: '0.1em',
        opacity: 0.8,
      }}>
        →
      </div>
      <h3 style={{
        fontSize: isMobile ? '1.25rem' : '1.5rem',
        fontWeight: '500',
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
        letterSpacing: '-0.01em',
      }}>
        View Full Case Study
      </h3>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-tertiary)',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
      }}>
        AI-powered psoriasis management for 125M patients
      </p>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.813rem',
          fontWeight: '500',
          color: `rgb(${brandColor})`,
          letterSpacing: '0.02em',
        }}
      >
        <span>Explore case study</span>
        <ArrowRight size={14} />
      </motion.div>
    </Link>
  );
}

/**
 * CTA Card for Metamorphic Fractal Reflections case study
 */
function MetamorphicCTACard({ isMobile }: { isMobile: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const brandColor = '147, 51, 234';

  return (
    <Link
      href="/work/metamorphic-fractal-reflections"
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
          ? `linear-gradient(135deg, rgba(${brandColor}, 0.06), var(--surface-primary))`
          : 'var(--surface-primary)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        boxShadow: isHovered
          ? `0 20px 40px rgba(${brandColor}, 0.15)`
          : 'var(--shadow-sm)',
        overflow: 'hidden',
        textDecoration: 'none',
      }}
    >
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          padding: '1px',
          background: `linear-gradient(90deg, transparent, rgba(${brandColor}, 0.8), transparent)`,
          backgroundSize: '200% 100%',
          animation: 'borderShimmer 3s ease-in-out infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        }} />
      )}
      <div style={{
        fontSize: '0.75rem',
        fontWeight: '600',
        color: `rgb(${brandColor})`,
        marginBottom: '1rem',
        letterSpacing: '0.1em',
        opacity: 0.8,
      }}>
        →
      </div>
      <h3 style={{
        fontSize: isMobile ? '1.25rem' : '1.5rem',
        fontWeight: '500',
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
        letterSpacing: '-0.01em',
      }}>
        View Full Case Study
      </h3>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-tertiary)',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
      }}>
        Immersive installation exploring consciousness
      </p>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.813rem',
          fontWeight: '500',
          color: `rgb(${brandColor})`,
          letterSpacing: '0.02em',
        }}
      >
        <span>Explore case study</span>
        <ArrowRight size={14} />
      </motion.div>
    </Link>
  );
}

/**
 * CTA Card for Latent Space case study
 */
function LatentSpaceCTACard({ isMobile }: { isMobile: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const brandColor = '139, 92, 246';

  return (
    <Link
      href="/work/latent-space"
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
          ? `linear-gradient(135deg, rgba(${brandColor}, 0.06), var(--surface-primary))`
          : 'var(--surface-primary)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        boxShadow: isHovered
          ? `0 20px 40px rgba(${brandColor}, 0.15)`
          : 'var(--shadow-sm)',
        overflow: 'hidden',
        textDecoration: 'none',
      }}
    >
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          padding: '1px',
          background: `linear-gradient(90deg, transparent, rgba(${brandColor}, 0.8), transparent)`,
          backgroundSize: '200% 100%',
          animation: 'borderShimmer 3s ease-in-out infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        }} />
      )}
      <div style={{
        fontSize: '0.75rem',
        fontWeight: '600',
        color: `rgb(${brandColor})`,
        marginBottom: '1rem',
        letterSpacing: '0.1em',
        opacity: 0.8,
      }}>
        →
      </div>
      <h3 style={{
        fontSize: isMobile ? '1.25rem' : '1.5rem',
        fontWeight: '500',
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
        letterSpacing: '-0.01em',
      }}>
        View Full Case Study
      </h3>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-tertiary)',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
      }}>
        Speculative design fiction on dream recording
      </p>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.813rem',
          fontWeight: '500',
          color: `rgb(${brandColor})`,
          letterSpacing: '0.02em',
        }}
      >
        <span>Explore case study</span>
        <ArrowRight size={14} />
      </motion.div>
    </Link>
  );
}
