'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Mail,
  Compass,
  Sun,
  Moon,
  Sparkles,
  ArrowLeft,
  Linkedin,
  Github,
  MessageCircle,
  Palette,
  Code,
  ArrowRight,
  ExternalLink,
  Hand,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { usePersonalization } from '@/hooks/usePersonalization';
import { Chatbot } from '@/components/Chatbot';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// View types
type HeroView = 'default' | 'contact' | 'tour';

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

// Premium animation constants
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_CONFIG = { type: "spring" as const, stiffness: 400, damping: 25 };
const STEP_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899']; // Blue, Purple, Pink
const TIMER_DURATION = 6000; // 6 seconds per step

// Tour animation variants
const tourCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: PREMIUM_EASE },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: PREMIUM_EASE },
  }),
};

// Timer Ring Component for auto-advance
function TimerRing({ progress, stepIndex }: { progress: number; stepIndex: number }) {
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <svg
      width="32"
      height="32"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-90deg)',
      }}
    >
      <circle
        cx="16"
        cy="16"
        r={radius}
        fill="none"
        stroke="var(--glass-15)"
        strokeWidth="2"
      />
      <motion.circle
        cx="16"
        cy="16"
        r={radius}
        fill="none"
        stroke={STEP_COLORS[stepIndex]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.05, ease: 'linear' }}
      />
    </svg>
  );
}

// Contact methods data
const contactMethods = [
  {
    id: 'email',
    icon: Mail,
    title: 'Email',
    subtitle: 'hello@nihar.design',
    href: 'mailto:hello@nihar.design',
    color: '#3B82F6',
    isExternal: false
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    title: 'LinkedIn',
    subtitle: 'Connect professionally',
    href: 'https://linkedin.com/in/krishnanihar',
    color: '#8B5CF6',
    isExternal: true
  },
  {
    id: 'github',
    icon: Github,
    title: 'GitHub',
    subtitle: 'View my code',
    href: 'https://github.com/krishnanihar',
    color: '#EC4899',
    isExternal: true
  },
  {
    id: 'chat',
    icon: MessageCircle,
    title: 'Chat',
    subtitle: 'Talk to my AI',
    href: null,
    color: '#8B5CF6',
    isChat: true
  },
];

// Tour steps data
const tourSteps = [
  {
    id: 'journey',
    title: 'My Journey',
    description: 'From design to code to AI',
    milestones: [
      { year: '2019', label: 'Design', icon: Palette, color: '#EC4899' },
      { year: '2021', label: 'Code', icon: Code, color: '#3B82F6' },
      { year: '2024', label: 'AI', icon: Sparkles, color: '#8B5CF6' },
    ],
  },
  {
    id: 'work',
    title: 'Featured Work',
    description: 'Products used by millions',
    projects: [
      { id: 'air-india', name: 'Air India', role: 'Design System', color: '#DA0E29' },
      { id: 'cleara', name: 'Cleara', role: 'AI Healthcare', color: '#8B9DC3' },
    ],
  },
  {
    id: 'connect',
    title: "Let's Connect",
    description: 'Start a conversation',
    ctas: [
      { id: 'contact', label: 'Get in Touch', icon: Mail },
      { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    ],
  },
];

interface ConceptHeroProps {
  scrollProgress?: number;
}

export default function ConceptHero({ scrollProgress = 0 }: ConceptHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenisScroll();

  // Personalization hook
  const { state: personalizationState } = usePersonalization();
  const { greeting, scrollMemory, isHydrated } = personalizationState;

  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [hoveredButton, setHoveredButton] = useState<'contact' | 'tour' | null>(null);
  const [showScrollPill, setShowScrollPill] = useState(true);
  const [scrollPillHovered, setScrollPillHovered] = useState(false);

  // Multi-view state
  const [activeView, setActiveView] = useState<HeroView>('default');
  const [tourStep, setTourStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [viewTransition, setViewTransition] = useState(false);

  // Tour-specific state (lifted to parent to prevent re-render issues)
  const [tourMousePosition, setTourMousePosition] = useState({ x: 50, y: 50 });
  const [tourTimerProgress, setTourTimerProgress] = useState(0);
  const [tourIsPaused, setTourIsPaused] = useState(false);

  // Switch view with transition
  const switchView = useCallback((newView: HeroView) => {
    setViewTransition(true);
    setTimeout(() => {
      setActiveView(newView);
      if (newView === 'tour') {
        setTourStep(0);
        setTourTimerProgress(0);
        setTourIsPaused(false);
      }
      setTimeout(() => setViewTransition(false), 50);
    }, 200);
  }, []);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeView !== 'default') {
        switchView('default');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, switchView]);

  useEffect(() => {
    setMounted(true);
    // Staggered animation stages (4 = scroll memory pill)
    const stages = [1, 2, 3, 4];
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 100);
    });
  }, []);

  // Tour auto-advance timer (lifted to parent)
  useEffect(() => {
    if (tourIsPaused || activeView !== 'tour') return;

    const interval = setInterval(() => {
      setTourTimerProgress((prev) => {
        if (prev >= 100) {
          if (tourStep < tourSteps.length - 1) {
            setTourStep((s) => s + 1);
          } else {
            switchView('default');
          }
          return 0;
        }
        return prev + (100 / (TIMER_DURATION / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [tourIsPaused, tourStep, activeView, switchView]);

  // Reset timer on step change
  useEffect(() => {
    setTourTimerProgress(0);
  }, [tourStep]);

  // Shrinking animation on scroll - using useGSAP for proper cleanup
  useGSAP(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    if (!container || !inner) return;

    // Initialize styles to prevent stale state from previous navigation
    gsap.set(container, { paddingLeft: 0, paddingRight: 0 });
    gsap.set(inner, { borderRadius: 0 });

    // Create the shrink animation with unique ID
    ScrollTrigger.create({
      id: 'home-hero-shrink', // Unique ID for this trigger
      trigger: container,
      start: 'top top',
      end: 'bottom 60%',
      scrub: 0.5,
      invalidateOnRefresh: true, // Recalculate on refresh
      onUpdate: (self) => {
        const progress = self.progress;
        const easedProgress = gsap.parseEase('power2.out')(progress);

        // Animate padding: 0 -> 48px (left/right)
        gsap.set(container, {
          paddingLeft: easedProgress * 48,
          paddingRight: easedProgress * 48,
        });

        // Animate border-radius: 0 -> 32px
        gsap.set(inner, { borderRadius: easedProgress * 32 });
      },
    });
  }, { scope: containerRef }); // Scoped cleanup

  const handleScrollToNext = () => {
    scrollTo('#philosophy-section', { offset: -60, duration: 1.5 });
  };

  const renderGreetingIcon = () => {
    const iconProps = { size: 16, style: { opacity: 0.8 } };
    switch (greeting.icon) {
      case 'hand': return <Hand {...iconProps} />;
      case 'sun': return <Sun {...iconProps} />;
      case 'moon': return <Moon {...iconProps} />;
      case 'sparkles': return <Sparkles {...iconProps} />;
      default: return <Sun {...iconProps} />;
    }
  };

  // Dismiss scroll memory pill
  const dismissScrollPill = useCallback(() => {
    setShowScrollPill(false);
  }, []);

  // Contact View Component
  const ContactView = () => (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 1.5rem',
        position: 'relative',
        opacity: viewTransition ? 0 : 1,
        transform: viewTransition ? 'scale(0.98)' : 'scale(1)',
        filter: viewTransition ? 'blur(8px)' : 'blur(0)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => switchView('default')}
        style={{
          position: 'absolute',
          top: '-3rem',
          left: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-60)',
          fontSize: '0.875rem',
          fontWeight: 400,
          cursor: 'pointer',
          padding: '0.5rem',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-95)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-60)')}
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* Heading */}
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 300,
          color: 'var(--text-95)',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-space-grotesk)',
          textAlign: 'center',
        }}
      >
        Let's Connect
      </h2>
      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--text-50)',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Choose your preferred way to reach me
      </p>

      {/* Contact Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}
      >
        {contactMethods.map((method) => {
          const Icon = method.icon;
          const isHovered = hoveredCard === method.id;

          const cardContent = (
            <div
              onMouseEnter={() => setHoveredCard(method.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={method.isChat ? () => setChatOpen(true) : undefined}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem 1rem',
                background: isHovered ? 'var(--glass-08)' : 'var(--glass-04)',
                backdropFilter: mounted ? 'blur(40px) saturate(150%)' : 'none',
                WebkitBackdropFilter: mounted ? 'blur(40px) saturate(150%)' : 'none',
                border: `1px solid ${isHovered ? `${method.color}30` : 'var(--text-08)'}`,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered
                  ? `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px ${method.color}20`
                  : '0 4px 16px rgba(0,0,0,0.1)',
                textDecoration: 'none',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: `${method.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.75rem',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <Icon size={22} style={{ color: method.color }} />
              </div>

              {/* Title */}
              <span
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--text-95)',
                  marginBottom: '0.25rem',
                }}
              >
                {method.title}
              </span>

              {/* Subtitle */}
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-45)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                {method.subtitle}
                {method.isExternal && <ExternalLink size={10} />}
              </span>
            </div>
          );

          if (method.isChat) {
            return <div key={method.id}>{cardContent}</div>;
          }

          return (
            <Link
              key={method.id}
              href={method.href || '#'}
              target={method.isExternal ? '_blank' : undefined}
              rel={method.isExternal ? 'noopener noreferrer' : undefined}
              style={{ textDecoration: 'none' }}
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );

  // Tour View Component - Premium Version
  // Note: State lifted to parent to prevent re-render issues
  const TourView = () => {
    const currentStep = tourSteps[tourStep];
    const isLastStep = tourStep === tourSteps.length - 1;

    // Handle mouse movement for reflection (uses parent state)
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTourMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }, []);

    // Memoized aurora gradient
    const auroraGradient = useMemo(
      () =>
        `radial-gradient(ellipse 60% 50% at center, ${STEP_COLORS[tourStep]}15 0%, transparent 70%)`,
      [tourStep]
    );

    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setTourIsPaused(true)}
        onMouseLeave={() => setTourIsPaused(false)}
        style={{
          width: '100%',
          maxWidth: '640px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          position: 'relative',
          ...UNIFIED_GLASS,
          borderRadius: '28px',
          overflow: 'hidden',
          opacity: viewTransition ? 0 : 1,
          transform: viewTransition ? 'scale(0.95)' : 'scale(1)',
          filter: viewTransition ? 'blur(12px)' : 'blur(0)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Aurora glow - breathing background */}
        <motion.div
          key={`aurora-${tourStep}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: '-80px',
            borderRadius: '100px',
            background: auroraGradient,
            filter: 'blur(50px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Mouse-tracking reflection */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '28px',
            background: `radial-gradient(circle 350px at ${tourMousePosition.x}% ${tourMousePosition.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'background 0.15s ease-out',
          }}
        />

        {/* Back Button */}
        <motion.button
          onClick={() => switchView('default')}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-50)',
            fontSize: '0.8125rem',
            fontWeight: 400,
            cursor: 'pointer',
            padding: '0.5rem',
            zIndex: 10,
          }}
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </motion.button>

        {/* Main Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tourStep}
            variants={tourCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ position: 'relative', zIndex: 2, paddingTop: '2rem' }}
          >
            {/* Step title with stagger */}
            <motion.h2
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 300,
                color: 'var(--text-95)',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-space-grotesk)',
                textAlign: 'center',
              }}
            >
              {currentStep.title}
            </motion.h2>

            {/* Step description with stagger */}
            <motion.p
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-50)',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              {currentStep.description}
            </motion.p>

            {/* Step-specific content */}
            <div style={{ marginBottom: '2rem' }}>
              {/* Journey Step - Timeline with premium cards */}
              {currentStep.id === 'journey' && currentStep.milestones && (
                <motion.div
                  custom={2}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {currentStep.milestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    return (
                      <motion.div
                        key={milestone.year}
                        custom={index + 3}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05, y: -4 }}
                        transition={SPRING_CONFIG}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '1.25rem 1.5rem',
                          background: `linear-gradient(135deg, ${milestone.color}12 0%, ${milestone.color}06 100%)`,
                          borderRadius: '18px',
                          border: `1px solid ${milestone.color}20`,
                          boxShadow: `0 4px 20px ${milestone.color}10, inset 0 1px 0 ${milestone.color}15`,
                          cursor: 'default',
                          minWidth: '100px',
                        }}
                      >
                        {/* Icon with glow */}
                        <div
                          style={{
                            padding: '0.875rem',
                            background: `${milestone.color}15`,
                            borderRadius: '14px',
                            boxShadow: `0 0 24px ${milestone.color}25`,
                          }}
                        >
                          <Icon size={22} style={{ color: milestone.color }} />
                        </div>
                        <span
                          style={{
                            color: 'var(--text-95)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          {milestone.label}
                        </span>
                        <span
                          style={{
                            color: 'var(--text-45)',
                            fontSize: '0.75rem',
                          }}
                        >
                          {milestone.year}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Work Step - Project Cards with premium styling */}
              {currentStep.id === 'work' && currentStep.projects && (
                <motion.div
                  custom={2}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {currentStep.projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      custom={index + 3}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={`/work/${project.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.03, y: -6 }}
                          whileTap={{ scale: 0.98 }}
                          transition={SPRING_CONFIG}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '1.5rem 2.5rem',
                            background: 'var(--glass-04)',
                            backdropFilter: 'blur(40px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                            borderRadius: '18px',
                            border: '1px solid var(--text-08)',
                            boxShadow:
                              '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 var(--glass-10)',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                          }}
                        >
                          {/* Hover gradient overlay */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: `linear-gradient(135deg, ${project.color}12 0%, transparent 50%)`,
                              pointerEvents: 'none',
                            }}
                          />
                          <div
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: '14px',
                              background: `linear-gradient(135deg, ${project.color}25 0%, ${project.color}15 100%)`,
                              marginBottom: '0.875rem',
                              boxShadow: `0 4px 16px ${project.color}20`,
                            }}
                          />
                          <span
                            style={{
                              fontSize: '1rem',
                              fontWeight: 500,
                              color: 'var(--text-95)',
                              position: 'relative',
                              zIndex: 1,
                            }}
                          >
                            {project.name}
                          </span>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              color: 'var(--text-45)',
                              position: 'relative',
                              zIndex: 1,
                            }}
                          >
                            {project.role}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Connect Step - CTA Buttons with premium styling */}
              {currentStep.id === 'connect' && currentStep.ctas && (
                <motion.div
                  custom={2}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {currentStep.ctas.map((cta, index) => {
                    const Icon = cta.icon;
                    return (
                      <motion.button
                        key={cta.id}
                        custom={index + 3}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING_CONFIG}
                        onClick={() => {
                          if (cta.id === 'contact') switchView('contact');
                          if (cta.id === 'linkedin')
                            window.open(
                              'https://linkedin.com/in/krishnanihar',
                              '_blank'
                            );
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.625rem',
                          padding: '1rem 1.75rem',
                          ...UNIFIED_GLASS,
                          background:
                            cta.id === 'contact'
                              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(139, 92, 246, 0.05))'
                              : 'var(--glass-06)',
                          borderRadius: '16px',
                          color: 'var(--text-95)',
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        <Icon size={18} />
                        {cta.label}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Step Navigation */}
            <motion.div
              custom={6}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem',
              }}
            >
              {/* Progress dots with timer ring */}
              <div
                style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}
              >
                {tourSteps.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setTourStep(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: index === tourStep ? '32px' : '10px',
                      height: index === tourStep ? '32px' : '10px',
                      borderRadius: '50%',
                      background:
                        index === tourStep ? 'transparent' : 'var(--glass-20)',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {index === tourStep && (
                      <>
                        <TimerRing progress={tourTimerProgress} stepIndex={index} />
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: STEP_COLORS[index],
                          }}
                        />
                      </>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Next/Done Button */}
              <motion.button
                onClick={() => {
                  if (isLastStep) {
                    switchView('default');
                  } else {
                    setTourStep((prev) => prev + 1);
                  }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={SPRING_CONFIG}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.75rem',
                  ...UNIFIED_GLASS,
                  background: `linear-gradient(135deg, ${STEP_COLORS[tourStep]}15, ${STEP_COLORS[tourStep]}08)`,
                  borderColor: `${STEP_COLORS[tourStep]}25`,
                  borderRadius: '14px',
                  color: 'var(--text-95)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {isLastStep ? 'Done' : 'Next'}
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // Default View Component (original hero content)
  const DefaultView = () => (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
        padding: '0 clamp(1.5rem, 4vw, 3rem)',
        position: 'relative',
        zIndex: 10,
        opacity: viewTransition ? 0 : 1,
        transform: viewTransition ? 'scale(0.98)' : 'scale(1)',
        filter: viewTransition ? 'blur(8px)' : 'blur(0)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
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

      {/* Secondary Message - Only show if present (null for 8+ visits) */}
      {greeting.secondary && (
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
      )}

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
        <button
          onClick={() => switchView('contact')}
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
        </button>

        {/* Quick Tour Button */}
        <button
          onClick={() => switchView('tour')}
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
          <span style={{ position: 'relative', zIndex: 1 }}>Quick Tour</span>
        </button>
      </div>

      {/* Scroll Memory Pill - Shows if user has viewing history */}
      {isHydrated && scrollMemory.hasHistory && showScrollPill && scrollMemory.lastProjectName && (
        <div
          onMouseEnter={() => setScrollPillHovered(true)}
          onMouseLeave={() => setScrollPillHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '2rem',
            padding: '10px 16px 10px 20px',
            ...UNIFIED_GLASS,
            background: scrollPillHovered
              ? 'var(--glass-08)'
              : 'var(--glass-04)',
            borderRadius: '24px',
            opacity: animationStage >= 4 ? 1 : 0,
            transform: animationStage >= 4 ? 'translateY(0)' : 'translateY(15px)',
            filter: animationStage >= 4 ? 'blur(0)' : 'blur(8px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, background 0.2s ease, transform 0.2s ease',
          }}
        >
          <Link
            href={`/work/${scrollMemory.lastProject}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-80)',
              fontSize: '0.8125rem',
              fontWeight: 400,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-95)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-80)')}
          >
            <span style={{ color: 'var(--text-50)' }}>Continue from</span>
            <span style={{ fontWeight: 500, color: 'var(--text-90)' }}>
              {scrollMemory.lastProjectName}
            </span>
            <ArrowRight size={14} style={{ opacity: 0.6 }} />
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dismissScrollPill();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--glass-08)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginLeft: '0.25rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--glass-15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--glass-08)';
            }}
            aria-label="Dismiss"
          >
            <X size={12} style={{ color: 'var(--text-50)' }} />
          </button>
        </div>
      )}
    </div>
  );

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

          {/* View-based Content */}
          {activeView === 'default' && <DefaultView />}
          {activeView === 'contact' && <ContactView />}
          {activeView === 'tour' && <TourView />}

          {/* Scroll indicator - only show in default view */}
          {activeView === 'default' && (
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
          )}
        </div>
      </section>

      {/* Chatbot Modal */}
      {chatOpen && (
        <Chatbot
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          intentContext="collaboration"
          initialMessage=""
        />
      )}
    </>
  );
}
