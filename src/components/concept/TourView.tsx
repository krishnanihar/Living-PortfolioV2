'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, Linkedin, Sparkles, Code, Palette } from 'lucide-react';

// ============================================================================
// CONSTANTS - Synchronized timing
// ============================================================================
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_CONFIG = { type: "spring" as const, stiffness: 400, damping: 25 };
const TIMER_DURATION = 4000; // 4s matches aurora breathing
const TIMER_INTERVAL = 50;
const STEP_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899'];

// Type definitions for tour steps
import type { LucideIcon } from 'lucide-react';

type JourneyStep = {
  id: 'journey';
  title: string;
  description: string;
  milestones: Array<{ year: string; label: string; icon: LucideIcon; color: string }>;
};

type WorkStep = {
  id: 'work';
  title: string;
  description: string;
  projects: Array<{ id: string; name: string; role: string; color: string }>;
};

type ConnectStep = {
  id: 'connect';
  title: string;
  description: string;
  ctas: Array<{ id: string; label: string; icon: LucideIcon }>;
};

type TourStep = JourneyStep | WorkStep | ConnectStep;

// Glass styling (matches UNIFIED_GLASS from ConceptHero)
const TOUR_GLASS = {
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

// Tour steps data
const TOUR_STEPS: TourStep[] = [
  {
    id: 'journey',
    title: 'My Journey',
    description: 'From curious designer to crafting experiences for millions',
    milestones: [
      { year: '2019', label: 'UX Design', icon: Palette, color: '#3B82F6' },
      { year: '2021', label: 'AI + Health', icon: Code, color: '#8B5CF6' },
      { year: '2024', label: 'Now', icon: Sparkles, color: '#EC4899' },
    ],
  },
  {
    id: 'work',
    title: 'Selected Work',
    description: 'Projects that push boundaries',
    projects: [
      { id: 'air-india', name: 'Air India', role: 'System Design', color: '#DA0E29' },
      { id: 'cleara', name: 'Cleara', role: 'AI + Health', color: '#10B981' },
    ],
  },
  {
    id: 'connect',
    title: "Let's Connect",
    description: 'Ready to create something meaningful together?',
    ctas: [
      { id: 'contact', label: "Let's Talk", icon: Mail },
      { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    ],
  },
];

// Animation variants
const cardVariants = {
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

// ============================================================================
// SUB-COMPONENTS (isolated to prevent re-renders)
// ============================================================================

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

interface MilestoneCardProps {
  milestone: { year: string; label: string; icon: LucideIcon; color: string };
  index: number;
  prefersReducedMotion: boolean | null;
}

function MilestoneCard({ milestone, index, prefersReducedMotion }: MilestoneCardProps) {
  const Icon = milestone.icon;
  return (
    <motion.div
      custom={index + 3}
      variants={prefersReducedMotion ? undefined : contentVariants}
      initial="hidden"
      animate="visible"
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -4 }}
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
        minWidth: '100px',
      }}
    >
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
      <span style={{ color: 'var(--text-95)', fontSize: '0.875rem', fontWeight: 500 }}>
        {milestone.label}
      </span>
      <span style={{ color: 'var(--text-45)', fontSize: '0.75rem' }}>{milestone.year}</span>
    </motion.div>
  );
}

interface ProjectCardProps {
  project: { id: string; name: string; role: string; color: string };
  index: number;
  prefersReducedMotion: boolean | null;
}

function ProjectCard({ project, index, prefersReducedMotion }: ProjectCardProps) {
  return (
    <motion.div
      custom={index + 3}
      variants={prefersReducedMotion ? undefined : contentVariants}
      initial="hidden"
      animate="visible"
    >
      <Link href={`/work/${project.id}`} style={{ textDecoration: 'none' }}>
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -6 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
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
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 var(--glass-10)',
            cursor: 'pointer',
          }}
        >
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
          <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-95)' }}>
            {project.name}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-45)' }}>{project.role}</span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface TourViewProps {
  onClose: () => void;
  onSwitchToContact: () => void;
  viewTransition: boolean;
}

export function TourView({ onClose, onSwitchToContact, viewTransition }: TourViewProps) {
  // ALL state is internal - no cascade to parent
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);

  const prefersReducedMotion = useReducedMotion();
  const step = TOUR_STEPS[currentStep];
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  // Timer - auto advance
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) {
          if (currentStep < TOUR_STEPS.length - 1) {
            setCurrentStep((s) => s + 1);
          } else {
            onClose();
          }
          return 0;
        }
        return prev + (100 / (TIMER_DURATION / TIMER_INTERVAL));
      });
    }, TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, currentStep, onClose]);

  // Reset timer on step change
  useEffect(() => {
    setTimerProgress(0);
  }, [currentStep]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden',
        opacity: viewTransition ? 0 : 1,
        transform: viewTransition ? 'scale(0.95)' : 'scale(1)',
        filter: viewTransition ? 'blur(12px)' : 'blur(0)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Back Button */}
      <motion.button
        onClick={onClose}
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

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={prefersReducedMotion ? undefined : cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ position: 'relative', zIndex: 2, paddingTop: '2rem' }}
        >
          {/* Title & Description */}
          <motion.h2
            custom={0}
            variants={prefersReducedMotion ? undefined : contentVariants}
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
            {step.title}
          </motion.h2>

          <motion.p
            custom={1}
            variants={prefersReducedMotion ? undefined : contentVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: '0.9375rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            {step.description}
          </motion.p>

          {/* Step Content */}
          <div style={{ marginBottom: '2rem' }}>
            {/* Journey */}
            {step.id === 'journey' && (
              <motion.div
                custom={2}
                variants={prefersReducedMotion ? undefined : contentVariants}
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
                {(step as JourneyStep).milestones.map((m, i) => (
                  <MilestoneCard
                    key={m.year}
                    milestone={m}
                    index={i}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </motion.div>
            )}

            {/* Work */}
            {step.id === 'work' && (
              <motion.div
                custom={2}
                variants={prefersReducedMotion ? undefined : contentVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {(step as WorkStep).projects.map((p, i) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    index={i}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </motion.div>
            )}

            {/* Connect */}
            {step.id === 'connect' && (
              <motion.div
                custom={2}
                variants={prefersReducedMotion ? undefined : contentVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {(step as ConnectStep).ctas.map((cta, i) => {
                  const Icon = cta.icon;
                  return (
                    <motion.button
                      key={cta.id}
                      custom={i + 3}
                      variants={prefersReducedMotion ? undefined : contentVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -3 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                      transition={SPRING_CONFIG}
                      onClick={() => {
                        if (cta.id === 'contact') onSwitchToContact();
                        if (cta.id === 'linkedin')
                          window.open('https://linkedin.com/in/krishnanihar', '_blank');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        padding: '1rem 1.75rem',
                        ...TOUR_GLASS,
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

          {/* Navigation */}
          <motion.div
            custom={6}
            variants={prefersReducedMotion ? undefined : contentVariants}
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
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {TOUR_STEPS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: i === currentStep ? '32px' : '10px',
                    height: i === currentStep ? '32px' : '10px',
                    borderRadius: '50%',
                    background: i === currentStep ? 'transparent' : 'var(--glass-20)',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {i === currentStep && (
                    <>
                      <TimerRing progress={timerProgress} stepIndex={i} />
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: STEP_COLORS[i],
                        }}
                      />
                    </>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Next/Done Button */}
            <motion.button
              onClick={() => (isLastStep ? onClose() : setCurrentStep((p) => p + 1))}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              transition={SPRING_CONFIG}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                ...TOUR_GLASS,
                background: `linear-gradient(135deg, ${STEP_COLORS[currentStep]}15, ${STEP_COLORS[currentStep]}08)`,
                borderColor: `${STEP_COLORS[currentStep]}25`,
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
}
