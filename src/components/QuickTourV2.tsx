'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Mail, Linkedin, Sparkles, Code, Palette, type LucideIcon } from 'lucide-react';

// =============================================================================
// ANIMATION CONSTANTS - Premium easing from site patterns
// =============================================================================
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_CONFIG = { type: "spring" as const, stiffness: 400, damping: 25 };
const TIMER_DURATION = 4000; // 4 seconds per step
const TIMER_INTERVAL = 50; // Update every 50ms for smooth animation

// Step-specific accent colors
const STEP_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899'] as const; // Blue, Purple, Pink

// =============================================================================
// ANIMATION VARIANTS - Framer Motion patterns from BentoGrid/AboutSectionV2
// =============================================================================
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: PREMIUM_EASE,
    },
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
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: PREMIUM_EASE,
    },
  }),
};

const buttonVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 },
};

// =============================================================================
// TOUR STEP DATA
// =============================================================================
const TOUR_STEPS = [
  {
    id: 'journey',
    title: 'MY JOURNEY',
    description: 'From curious designer to crafting experiences for millions',
    milestones: [
      { year: '2019', label: 'UX Design', icon: Palette },
      { year: '2021', label: 'AI + Health', icon: Code },
      { year: '2024', label: 'Now', icon: Sparkles },
    ],
  },
  {
    id: 'work',
    title: 'MY WORK',
    description: 'Projects that push boundaries',
    projects: [
      { slug: 'air-india', name: 'Air India', category: 'System Design', image: '/images/air-india/IFE.png' },
      { slug: 'psoriassist', name: 'PsoriAssist', category: 'AI + Health', image: '/images/Psori_front.png' },
      { slug: 'latent-space', name: 'Latent Space', category: 'Research', image: '/images/meta_front.png' },
    ],
  },
  {
    id: 'connect',
    title: "LET'S CONNECT",
    description: 'Ready to create something meaningful together?',
    ctas: [
      { label: 'Contact', href: 'mailto:krishnaniharsunkara@gmail.com', icon: Mail },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/krishnanihar', icon: Linkedin, external: true },
    ],
  },
];

// =============================================================================
// TIMER RING COMPONENT - SVG progress indicator
// =============================================================================
interface TimerRingProps {
  progress: number;
  stepIndex: number;
  isPaused: boolean;
}

function TimerRing({ progress, stepIndex, isPaused }: TimerRingProps) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);
  const color = STEP_COLORS[stepIndex];

  return (
    <div style={{ position: 'relative', width: 32, height: 32 }}>
      <svg
        width="32"
        height="32"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke="var(--glass-15)"
          strokeWidth="2"
        />
        {/* Progress arc */}
        <motion.circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.05, ease: 'linear' }}
          style={{ opacity: isPaused ? 0.4 : 1 }}
        />
      </svg>
      {/* Step number in center */}
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '10px',
          fontWeight: '500',
          color: 'var(--text-60)',
        }}
      >
        {stepIndex + 1}
      </span>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
interface QuickTourV2Props {
  isOpen: boolean;
  onClose: () => void;
  onStepChange?: (step: number) => void;
}

export function QuickTourV2({ isOpen, onClose, onStepChange }: QuickTourV2Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();

  const totalSteps = TOUR_STEPS.length;
  const step = TOUR_STEPS[currentStep];
  const stepColor = STEP_COLORS[currentStep];

  // ==========================================================================
  // Timer Logic - Auto-advance with visual progress
  // ==========================================================================
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      setTimerProgress((prev) => {
        const increment = 100 / (TIMER_DURATION / TIMER_INTERVAL);
        if (prev + increment >= 100) {
          // Auto-advance to next step
          if (currentStep < totalSteps - 1) {
            setCurrentStep((s) => s + 1);
          }
          return 0;
        }
        return prev + increment;
      });
    }, TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, currentStep, totalSteps]);

  // Reset timer when step changes
  useEffect(() => {
    setTimerProgress(0);
  }, [currentStep]);

  // Notify parent of step changes
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  // ==========================================================================
  // Mouse Tracking for Reflection Layer
  // ==========================================================================
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  // ==========================================================================
  // Navigation Handlers
  // ==========================================================================
  const goToStep = useCallback((nextStep: number) => {
    if (nextStep >= 0 && nextStep < totalSteps && nextStep !== currentStep) {
      setCurrentStep(nextStep);
    }
  }, [currentStep, totalSteps]);

  const handleClose = useCallback(() => {
    onClose();
    setCurrentStep(0);
    setTimerProgress(0);
  }, [onClose]);

  const handlePrev = () => {
    if (currentStep > 0) goToStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  // ==========================================================================
  // Memoized Styles
  // ==========================================================================
  const reflectionGradient = useMemo(() => `
    radial-gradient(
      circle 400px at ${mousePosition.x}% ${mousePosition.y}%,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.04) 30%,
      transparent 60%
    )
  `, [mousePosition.x, mousePosition.y]);

  const auroraGradient = useMemo(() => `
    radial-gradient(
      ellipse 60% 50% at center,
      ${stepColor}15 0%,
      ${stepColor}08 40%,
      transparent 70%
    )
  `, [stepColor]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
      }}
    >
      {/* Aurora Glow Background */}
      <motion.div
        key={`aurora-${currentStep}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          inset: '-40px',
          borderRadius: '60px',
          background: auroraGradient,
          filter: 'blur(40px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Main Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={prefersReducedMotion ? undefined : cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onMouseMove={handleMouseMove}
          style={{
            position: 'relative',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, var(--glass-08) 0%, var(--glass-04) 100%)',
            backdropFilter: 'blur(80px) saturate(180%)',
            WebkitBackdropFilter: 'blur(80px) saturate(180%)',
            border: '1px solid var(--text-06)',
            borderRadius: '24px',
            color: 'var(--text-95)',
            overflow: 'hidden',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.12),
              inset 0 1px 0 var(--text-08),
              inset 0 -1px 0 var(--glass-04)
            `,
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',
          }}
        >
          {/* Mouse-Tracking Reflection Layer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              background: reflectionGradient,
              pointerEvents: 'none',
              zIndex: 0,
              transition: 'background 0.15s ease-out',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Header: Timer Ring + Skip */}
          <motion.div
            custom={0}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            {/* Timer Ring */}
            <TimerRing
              progress={timerProgress}
              stepIndex={currentStep}
              isPaused={isPaused}
            />

            {/* Skip button */}
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={SPRING_CONFIG}
              onClick={handleClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'var(--glass-05)',
                border: '1px solid var(--text-08)',
                borderRadius: '12px',
                color: 'var(--text-50)',
                fontSize: '0.75rem',
                fontWeight: '400',
                cursor: 'pointer',
              }}
            >
              <X size={12} />
              <span>Skip</span>
            </motion.button>
          </motion.div>

          {/* Title */}
          <motion.h2
            custom={1}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative',
              zIndex: 1,
              fontSize: '0.875rem',
              fontWeight: '500',
              letterSpacing: '0.1em',
              color: 'var(--text-50)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            {step.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            custom={2}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative',
              zIndex: 1,
              fontSize: '1rem',
              fontWeight: '300',
              color: 'var(--text-70)',
              marginBottom: '1.5rem',
              lineHeight: '1.5',
            }}
          >
            {step.description}
          </motion.p>

          {/* Step Content */}
          <motion.div
            custom={3}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative',
              zIndex: 1,
              marginBottom: '1.5rem',
            }}
          >
            {/* Journey Step - Milestones */}
            {step.id === 'journey' && step.milestones && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {step.milestones.map((milestone, idx) => {
                  const Icon = milestone.icon;
                  return (
                    <React.Fragment key={idx}>
                      <MilestoneCard milestone={milestone} Icon={Icon} index={idx} />
                      {idx < step.milestones.length - 1 && (
                        <div
                          style={{
                            width: '24px',
                            height: '2px',
                            background: 'linear-gradient(90deg, rgba(59,130,246,0.5), rgba(139,92,246,0.5))',
                            borderRadius: '1px',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* Work Step - Project Cards */}
            {step.id === 'work' && step.projects && (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {step.projects.map((project, idx) => (
                  <ProjectCard key={idx} project={project} onClose={handleClose} index={idx} />
                ))}
              </div>
            )}

            {/* Connect Step - CTAs */}
            {step.id === 'connect' && step.ctas && (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {step.ctas.map((cta, idx) => (
                  <CTAButton key={idx} cta={cta} onClose={handleClose} isPrimary={idx === 0} />
                ))}
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <motion.div
            custom={4}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Prev Button */}
            <NavButton
              direction="prev"
              onClick={handlePrev}
              disabled={currentStep === 0}
            />

            {/* Step Indicator Dots */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {TOUR_STEPS.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => goToStep(idx)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: idx === currentStep ? '16px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    border: 'none',
                    cursor: 'pointer',
                    background: idx === currentStep ? stepColor : 'var(--glass-25)',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next/Done Button */}
            <NavButton
              direction={currentStep === totalSteps - 1 ? 'done' : 'next'}
              onClick={handleNext}
              isLast={currentStep === totalSteps - 1}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface MilestoneCardProps {
  milestone: { year: string; label: string };
  Icon: LucideIcon;
  index: number;
}

function MilestoneCard({ milestone, Icon, index }: MilestoneCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: PREMIUM_EASE }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: '0 0 auto',
        width: '110px',
        padding: '1rem 0.75rem',
        background: isHovered ? 'var(--glass-10)' : 'var(--glass-05)',
        border: `1px solid ${isHovered ? 'rgba(59, 130, 246, 0.2)' : 'var(--text-06)'}`,
        borderRadius: '16px',
        textAlign: 'center',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default',
        transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      <Icon
        size={18}
        style={{
          color: 'rgba(59, 130, 246, 0.9)',
          marginBottom: '0.5rem',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)',
        }}
      />
      <div style={{
        fontSize: '1.125rem',
        fontWeight: '600',
        color: 'var(--text-90)',
        marginBottom: '0.25rem',
      }}>
        {milestone.year}
      </div>
      <div style={{
        fontSize: '0.6875rem',
        fontWeight: '400',
        color: 'var(--text-50)',
        letterSpacing: '0.02em',
      }}>
        {milestone.label}
      </div>
    </motion.div>
  );
}

interface ProjectCardProps {
  project: { slug: string; name: string; category: string; image: string };
  onClose: () => void;
  index: number;
}

function ProjectCard({ project, onClose, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: PREMIUM_EASE }}
    >
      <Link
        href={`/work/${project.slug}`}
        onClick={onClose}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: isHovered ? 'var(--glass-10)' : 'var(--glass-05)',
          border: `1px solid ${isHovered ? 'rgba(139, 92, 246, 0.25)' : 'var(--text-06)'}`,
          borderRadius: '16px',
          textDecoration: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered ? '0 12px 32px rgba(139, 92, 246, 0.15)' : 'none',
        }}
      >
        {/* Thumbnail */}
        <div style={{
          height: '72px',
          overflow: 'hidden',
          borderRadius: '15px 15px 0 0',
          background: 'var(--glass-08)',
          position: 'relative',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.85,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Text */}
        <div style={{ padding: '0.75rem', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--text-90)',
            marginBottom: '0.2rem',
          }}>
            {project.name}
          </div>
          <div style={{
            fontSize: '0.625rem',
            fontWeight: '400',
            color: 'var(--text-45)',
            letterSpacing: '0.02em',
          }}>
            {project.category}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface CTAButtonProps {
  cta: { label: string; href: string; icon: LucideIcon; external?: boolean };
  onClose: () => void;
  isPrimary: boolean;
}

function CTAButton({ cta, onClose, isPrimary }: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = cta.icon;
  const Component = cta.external ? 'a' : Link;
  const props = cta.external
    ? { href: cta.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: cta.href };

  return (
    <motion.div
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={SPRING_CONFIG}
    >
      <Component
        {...props}
        onClick={onClose}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '1rem 1.5rem',
          background: isPrimary
            ? (isHovered
              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(139, 92, 246, 0.08))'
              : 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(139, 92, 246, 0.05))')
            : (isHovered ? 'var(--glass-10)' : 'var(--glass-05)'),
          border: `1px solid ${isPrimary
            ? 'rgba(236, 72, 153, 0.15)'
            : 'var(--text-06)'}`,
          borderRadius: '16px',
          textDecoration: 'none',
          color: 'var(--text-85)',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        <Icon size={16} />
        <span>{cta.label}</span>
      </Component>
    </motion.div>
  );
}

interface NavButtonProps {
  direction: 'prev' | 'next' | 'done';
  onClick: () => void;
  disabled?: boolean;
  isLast?: boolean;
}

function NavButton({ direction, onClick, disabled, isLast }: NavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isPrev = direction === 'prev';
  const isDone = direction === 'done';

  return (
    <motion.button
      variants={disabled ? undefined : buttonVariants}
      initial="rest"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      transition={SPRING_CONFIG}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        background: isDone
          ? (isHovered
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.15))'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1))')
          : (isHovered && !disabled ? 'var(--glass-05)' : 'transparent'),
        border: `1px solid ${isDone
          ? 'rgba(139, 92, 246, 0.2)'
          : 'var(--text-08)'}`,
        borderRadius: '12px',
        color: disabled
          ? 'var(--text-20)'
          : (isHovered ? 'var(--text-80)' : 'var(--text-60)'),
        fontSize: '0.8125rem',
        fontWeight: isDone ? '500' : '400',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
      }}
    >
      {isPrev && <ChevronLeft size={14} />}
      <span>{isPrev ? 'Prev' : (isDone ? 'Done' : 'Next')}</span>
      {!isPrev && (isDone ? <Check size={14} /> : <ChevronRight size={14} />)}
    </motion.button>
  );
}

export default QuickTourV2;
