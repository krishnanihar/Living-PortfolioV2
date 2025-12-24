'use client';

import React, { useEffect, useState, useRef, Suspense, useCallback } from 'react';
import { WorkPageLayout } from '@/components/narrative-work/WorkPageLayout';
import { WorkConceptHero } from '@/components/narrative-work/WorkConceptHero';
import { JourneyOverview } from '@/components/narrative-work/JourneyOverview';
import { AirIndiaHeroCard } from '@/components/narrative-work/AirIndiaHeroCard';
import { ClearaHeroCard } from '@/components/narrative-work/ClearaHeroCard';
import { MetamorphicHeroCard } from '@/components/narrative-work/MetamorphicHeroCard';
// HIDDEN: Latent Space WIP
// import { LatentSpaceHeroCard } from '@/components/narrative-work/LatentSpaceHeroCard';
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

  // Cleara section state
  const [clearaHoveredCard, setClearaHoveredCard] = useState<number | null>(null);
  const [clearaDebouncedCard, setClearaDebouncedCard] = useState<number | null>(null);
  const clearaHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [clearaCarouselIndex, setClearaCarouselIndex] = useState(0);
  const clearaCarouselRef = useRef<HTMLDivElement>(null);

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
      if (clearaHoverTimeoutRef.current) {
        clearTimeout(clearaHoverTimeoutRef.current);
      }
      if (metamorphicHoverTimeoutRef.current) {
        clearTimeout(metamorphicHoverTimeoutRef.current);
      }
      if (latentHoverTimeoutRef.current) {
        clearTimeout(latentHoverTimeoutRef.current);
      }
    };
  }, []);

  // Cleara debounced hover handler
  const handleClearaHover = useCallback((cardId: number | null) => {
    if (clearaHoverTimeoutRef.current) {
      clearTimeout(clearaHoverTimeoutRef.current);
    }
    if (cardId !== null) {
      setClearaHoveredCard(cardId);
      clearaHoverTimeoutRef.current = setTimeout(() => {
        setClearaDebouncedCard(cardId);
      }, 50);
    } else {
      setClearaHoveredCard(null);
      setClearaDebouncedCard(null);
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

  // Impact Cards with expanded content - Air India projects
  const impactCards = [
    {
      id: 1,
      label: '01',
      title: 'Design System & Tokenisation',
      description: 'Token architecture unifying four merging airlines',
      expandedDescription: 'Reverse-engineered hundreds of undocumented screens into a systematic token framework. Built the foundation that lets four merging airlines speak the same design language.',
      metric: '4 Airlines Unified',
      tags: ['Tokens', 'Architecture', 'Scale'],
      color: '99, 102, 241',
    },
    {
      id: 2,
      label: '02',
      title: 'Pixel Radar',
      description: 'Figma plugin for automated design consistency',
      expandedDescription: 'Built a Figma plugin that automates consistency checks. What started as a personal workflow fix became infrastructure serving 10M+ users annually, cutting review time by 30%.',
      metric: '10M+ Users Annually',
      tags: ['Figma', 'Plugin', 'Automation'],
      color: '218, 14, 41',
    },
    {
      id: 3,
      label: '03',
      title: 'Search with AI',
      description: 'AI-native search using natural language',
      expandedDescription: 'Designed an AI-native search experience using NLU that rethinks how passengers interact with an airline. Helped Air India reach 3rd place at Battle of the Airline Apps 2024.',
      metric: '3rd at WAF 2024',
      tags: ['AI', 'NLU', 'Innovation'],
      color: '139, 92, 246',
    },
    {
      id: 4,
      label: '04',
      title: 'MCP Handoff',
      description: 'Model Context Protocol for design-dev workflow',
      expandedDescription: 'Implemented design-dev handoff using Model Context Protocol—bridging design and engineering through AI-assisted tooling. Structured, reliable, modern handoff.',
      metric: 'Zero Slack Chaos',
      tags: ['MCP', 'AI', 'Workflow'],
      color: '16, 185, 129',
    },
    {
      id: 5,
      label: '05',
      title: 'IFE System Design',
      description: 'In-flight entertainment at 35,000 feet',
      expandedDescription: 'Typography at seat-back distance. Touch targets that work during turbulence. Content hierarchy for 3000+ hours. Winner of Asia\'s Leading Airline IFE at World Travel Awards 2024.',
      metric: 'WTA 2024 Winner',
      tags: ['IFE', 'Aviation', 'UX'],
      color: '251, 146, 60',
    },
    {
      id: 6,
      label: '06',
      title: 'Liftoff Program',
      description: 'Team upskilling and culture building',
      expandedDescription: 'Initiated workshops, skill shares, and critique rituals—building the collaborative culture a transformation of this scale demands. Built culture without waiting for HR.',
      metric: 'Culture Built',
      tags: ['Culture', 'Leadership', 'Growth'],
      color: '251, 191, 36',
    },
  ];

  // Cleara Impact Cards
  const clearaImpactCards = [
    {
      id: 1,
      label: '01',
      title: 'Ghost Overlay Camera',
      description: 'Precise photo alignment for visual progress tracking',
      expandedDescription: 'Computer vision overlay that aligns previous photos with current camera view, enabling pixel-accurate comparison of psoriasis progression over time.',
      metric: '±2mm Precision',
      tags: ['Computer Vision', 'Camera'],
      color: '139, 157, 195',
    },
    {
      id: 2,
      label: '02',
      title: 'AI PASI Engine',
      description: 'Deep learning severity scoring trained on 50k+ images',
      expandedDescription: 'CNN model trained on 50,000+ dermatological images to provide automated PASI severity scores, achieving 33% better consistency than manual clinical assessment.',
      metric: '+33% Accuracy',
      tags: ['Deep Learning', 'Clinical'],
      color: '184, 197, 226',
    },
    {
      id: 3,
      label: '03',
      title: 'Predictive Flare Alerts',
      description: '3-5 day advance warning using multi-factor analysis',
      expandedDescription: 'Machine learning model analyzing sleep, stress, weather, and history patterns to predict flare-ups 3-5 days before onset, enabling preventive action.',
      metric: '3-5 Days Early',
      tags: ['Prediction', 'ML'],
      color: '168, 197, 181',
    },
    {
      id: 4,
      label: '04',
      title: 'Mental Health Integration',
      description: 'PHQ-9 & GAD-7 screening with mood tracking',
      expandedDescription: 'Validated mental health questionnaires integrated into daily check-ins, recognizing the psychological impact of chronic skin conditions with holistic care approach.',
      metric: 'Holistic Care',
      tags: ['Wellness', 'Research'],
      color: '212, 165, 165',
    },
    {
      id: 5,
      label: '05',
      title: 'Smart Reminders',
      description: 'Adaptive medication scheduling that learns your patterns',
      expandedDescription: 'Intelligent notification system that learns user behavior to deliver medication reminders at optimal times with supportive, encouraging language.',
      metric: '↑ 40% Adherence',
      tags: ['AI', 'Behavioral'],
      color: '139, 157, 195',
    },
    {
      id: 6,
      label: '06',
      title: 'Provider Dashboard',
      description: 'HIPAA-compliant analytics for clinical teams',
      expandedDescription: 'Healthcare provider portal with patient progress visualization, population health insights, and secure data export for clinical decision support.',
      metric: 'Clinical Ready',
      tags: ['B2B', 'Analytics'],
      color: '168, 197, 181',
    },
  ];

  // Metamorphic Impact Cards
  const metamorphicImpactCards = [
    {
      id: 1,
      label: '01',
      title: 'Psychedelic Research',
      description: 'Trip reports & phenomenology literature study',
      expandedDescription: 'Deep research into psychedelic phenomenology, analyzing 200+ trip reports and academic literature to inform the visual language of ego dissolution and consciousness exploration.',
      metric: '200+ Reports',
      tags: ['Research', 'Phenomenology'],
      color: '147, 51, 234',
    },
    {
      id: 2,
      label: '02',
      title: 'Blender Previsualization',
      description: 'Full 3D model for VR stakeholder walkthroughs',
      expandedDescription: 'Created detailed 3D bathroom environment in Blender, enabling VR walkthroughs for NID faculty and stakeholders before physical construction began.',
      metric: 'VR Approved',
      tags: ['Blender', '3D', 'VR'],
      color: '139, 92, 246',
    },
    {
      id: 3,
      label: '03',
      title: 'TouchDesigner Engine',
      description: 'Real-time generative visuals from webcam feed',
      expandedDescription: 'Built the core visual engine processing live webcam feed through TouchDesigner, creating responsive fractal systems that morph the participant\'s reflection in real-time.',
      metric: '60fps Realtime',
      tags: ['TouchDesigner', 'Creative Code'],
      color: '236, 72, 153',
    },
    {
      id: 4,
      label: '04',
      title: 'Stable Diffusion Training',
      description: 'Custom model for fractal ego-dissolution imagery',
      expandedDescription: 'Fine-tuned Stable Diffusion on curated fractal and psychedelic imagery datasets, generating unique visuals that blend organic dissolution with geometric transcendence.',
      metric: 'Custom Model',
      tags: ['Stable Diffusion', 'AI Art'],
      color: '16, 185, 129',
    },
    {
      id: 5,
      label: '05',
      title: 'Arduino Sensor Array',
      description: 'Rotary encoder in tap triggers the experience',
      expandedDescription: 'Custom Arduino setup with rotary encoder embedded in bathroom tap—turning the tap initiates the dissolution sequence, modulating lights and triggering visual processing.',
      metric: 'Physical Trigger',
      tags: ['Arduino', 'Hardware'],
      color: '251, 146, 60',
    },
    {
      id: 6,
      label: '06',
      title: 'Binaural Soundscape',
      description: 'Audio-reactive visuals with spatial sound design',
      expandedDescription: 'Immersive binaural audio composition with visuals that respond to frequency and amplitude, creating a multi-sensory dissolution experience synchronized with the visual transformation.',
      metric: 'Multi-Sensory',
      tags: ['Sound Design', 'Binaural'],
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
      {/* SECTION 1: Hero Entrance - ConceptHero style with shrinking */}
      <Suspense fallback={<HeroSkeleton />}>
        <WorkConceptHero />
      </Suspense>

      {/* SECTION 2: Journey Overview */}
      <div id="journey-overview">
        <Suspense fallback={<SectionSkeleton />}>
          <JourneyOverview />
        </Suspense>
      </div>

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
              className="hide-scrollbar"
              data-lenis-prevent
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'scroll',
                scrollSnapType: 'x proximity',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                overscrollBehaviorX: 'contain',
                touchAction: 'pan-x',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                marginLeft: '-1rem',
                marginRight: '-1rem',
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

      {/* CLEARA SECTION */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <ClearaHeroCard />

        {/* Desktop: Bento Grid */}
        {!isMobile && (() => {
          const getGridTemplate = () => {
            if (!clearaDebouncedCard) {
              return { cols: '1fr 1fr 1fr', rows: '1fr 1fr' };
            }
            const index = clearaImpactCards.findIndex(c => c.id === clearaDebouncedCard);
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
                {clearaImpactCards.map((card) => {
                  const isHovered = clearaHoveredCard === card.id;
                  return (
                    <motion.div
                      key={card.id}
                      layout
                      layoutId={`cleara-card-${card.id}`}
                      onHoverStart={() => handleClearaHover(card.id)}
                      onHoverEnd={() => handleClearaHover(null)}
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
                                projectId="cleara"
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
                <ClearaCTACard isMobile={false} />
              </motion.div>
            </LayoutGroup>
          );
        })()}

        {/* Mobile: Horizontal Carousel */}
        {isMobile && (
          <>
            <div
              ref={clearaCarouselRef}
              className="hide-scrollbar"
              data-lenis-prevent
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'scroll',
                scrollSnapType: 'x proximity',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                overscrollBehaviorX: 'contain',
                touchAction: 'pan-x',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                marginLeft: '-1rem',
                marginRight: '-1rem',
              }}
            >
              {clearaImpactCards.map((card) => (
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
              <ClearaCTACard isMobile={true} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
            }}>
              {clearaImpactCards.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: clearaCarouselIndex === index ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: clearaCarouselIndex === index ? 'var(--accent-primary)' : 'var(--border-primary)',
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
              className="hide-scrollbar"
              data-lenis-prevent
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'scroll',
                scrollSnapType: 'x proximity',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                overscrollBehaviorX: 'contain',
                touchAction: 'pan-x',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                marginLeft: '-1rem',
                marginRight: '-1rem',
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

      {/* HIDDEN: Latent Space WIP - entire section commented out */}
      {false && (
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* <LatentSpaceHeroCard /> */}
        <div />

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
              className="hide-scrollbar"
              data-lenis-prevent
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'scroll',
                scrollSnapType: 'x proximity',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                overscrollBehaviorX: 'contain',
                touchAction: 'pan-x',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                marginLeft: '-1rem',
                marginRight: '-1rem',
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
      )}

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
 * CTA Card for Cleara case study
 */
function ClearaCTACard({ isMobile }: { isMobile: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const brandColor = '139, 157, 195'; // Lavender

  return (
    <Link
      href="/work/cleara"
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
        AI-powered digital therapeutic with watercolor healing aesthetic
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
