'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ExternalLink, Smartphone, Camera, Clock, Activity, Brain, Heart, Users, Zap, CheckCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { SnapSection } from './ui/SnapSection';
import { ExpandableCard } from './ui/ExpandableCard';
import { AccordionGroup, CollapsibleSection } from './ui/AccordionGroup';
import { InteractiveSwatchPicker, InteractiveTypography } from './ui/InteractiveSwatchPicker';
import { TransformingColorPalette } from './ui/TransformingColorPalette';
import { TokenHierarchyDiagram } from './ui/TokenHierarchyDiagram';
import { ThemeSwitchVisualization } from './ui/ThemeSwitchVisualization';
import {
  heroStats,
  genesisTimeline,
  problemCards,
  heroFeatures,
  secondaryFeatures,
  impactMetrics,
  learnings,
  testimonialQuote,
  // New imports for missing sections
  stakeholders,
  researchThemes,
  adherenceGap,
  competitors,
  marketGaps,
  designPrinciples,
  personas,
  processPhases,
  testingRounds,
  usabilityMetrics,
  colorPalette,
  typographyScale,
  techStack,
  mlModels,
  securityCompliance,
  userFlows,
  roadmap,
} from './data/content';

// Import interactive prototypes
import { PsoriAssistPhoneMockup } from '@/components/sections/PsoriAssistPhoneMockup';
import { GhostOverlayDemo, SmartReminderDemo, PASIScoringDemo } from '@/components/sections/PsoriAssistInteractivePrototypes';

// Screen type matching PsoriAssistPhoneMockup
type Screen = 'home' | 'photo' | 'pasi' | 'meds' | 'mental' | 'triggers' | 'report' | 'settings' | 'pest' | 'flare' | 'reminders' | 'learn' | 'community';

// SubState type matching PsoriAssistPhoneMockup
type SubState =
  // Photo screen sub-states
  | 'selection' | 'camera' | 'ghost' | 'capture' | 'notes'
  // Meds screen sub-states
  | 'list' | 'checking' | 'checked' | 'streak'
  // Flare screen sub-states
  | 'alert' | 'thermometer' | 'factors' | 'actions'
  | null;

// Flow step with description for auto-play
interface AutoPlayStep {
  screen: Screen;
  subState?: SubState;  // Visual sub-state within the screen
  label: string;
  description: string;
}

// Flow data structure
interface FlowData {
  title: string;
  color: string;
  steps: AutoPlayStep[];
}

// Photo Capture Flow with rich descriptions
const PHOTO_CAPTURE_FLOW: FlowData = {
  title: 'Photo Capture Flow',
  color: '74, 144, 226',
  steps: [
    {
      screen: 'home',
      subState: null,
      label: 'User taps "Take Photo"',
      description: `Quick actions on the home screen provide one-tap access to the most common tasks. The "Take Photo" button is prominently placed because consistent photo documentation is the foundation of effective psoriasis tracking.`
    },
    {
      screen: 'photo',
      subState: 'selection',
      label: 'Selects body part',
      description: `The body part selector ensures photos are organized by region—left arm, right arm, trunk, scalp, and more. This organization enables meaningful comparisons over time and helps the AI analyze each area's progression independently.`
    },
    {
      screen: 'photo',
      subState: 'ghost',
      label: 'Ghost overlay appears',
      description: `The ghost overlay shows your previous photo at 50% opacity. This solves the #1 frustration patients reported: inconsistent angles making progress impossible to track. Now you can align perfectly every time.`
    },
    {
      screen: 'photo',
      subState: 'capture',
      label: 'Aligns and captures',
      description: `With the ghost overlay as your guide, position your camera to match the previous photo. Haptic feedback confirms the capture, and the app automatically saves metadata like lighting conditions and timestamp.`
    },
    {
      screen: 'photo',
      subState: 'notes',
      label: 'Adds optional notes',
      description: `Context matters. Adding notes like "after beach weekend" or "started new medication" helps you and your dermatologist understand what factors might be affecting your skin condition.`
    },
    {
      screen: 'pasi',
      subState: null,
      label: 'PASI analysis begins',
      description: `Your photo is securely uploaded for AI-powered PASI scoring. Within 2-5 minutes, you'll receive a clinical-grade severity assessment—the same metric dermatologists use, now available instantly on your phone.`
    },
  ]
};

// Medication Reminder Flow with rich descriptions
const MEDICATION_REMINDER_FLOW: FlowData = {
  title: 'Medication Reminder',
  color: '80, 200, 120',
  steps: [
    {
      screen: 'home',
      subState: null,
      label: 'Push notification arrives',
      description: `Smart notifications arrive at the optimal time based on your routine. Research shows topical medication adherence drops to 30% within weeks—our reminder system is designed to break that cycle.`
    },
    {
      screen: 'meds',
      subState: 'list',
      label: 'Opens Medication screen',
      description: `The medication screen shows today's applications at a glance. Each body region that needs treatment is listed clearly, with visual indicators showing what's done and what's remaining.`
    },
    {
      screen: 'meds',
      subState: 'checked',
      label: 'Taps checkmark',
      description: `Marking an application complete triggers a satisfying animation and confetti burst. This isn't just for fun—behavioral psychology research shows these micro-rewards increase habit formation by 40%.`
    },
    {
      screen: 'meds',
      subState: 'streak',
      label: 'Streak celebration',
      description: `Completing all applications updates your streak counter. Milestone achievements at 7, 14, and 30 days unlock badges and celebrations, transforming medication adherence from a chore into a rewarding daily habit.`
    },
  ]
};

// Flare Alert Flow with rich descriptions
const FLARE_ALERT_FLOW: FlowData = {
  title: 'Predictive Flare-Up Alert',
  color: '251, 191, 36',
  steps: [
    {
      screen: 'home',
      subState: null,
      label: 'ML detects high risk',
      description: `Our machine learning model continuously analyzes your data—photo history, medication adherence, weather patterns, and stress indicators—to identify early warning signs of an approaching flare-up.`
    },
    {
      screen: 'flare',
      subState: 'thermometer',
      label: 'Alert notification',
      description: `When risk exceeds the threshold, you receive a proactive alert. Unlike reactive care that starts after symptoms appear, this early warning gives you 3-5 days to take preventive action.`
    },
    {
      screen: 'flare',
      subState: 'factors',
      label: 'Risk factors explained',
      description: `The alert breaks down contributing factors: cold weather incoming, two missed medication applications, elevated stress from calendar analysis. Understanding the "why" empowers you to address root causes.`
    },
    {
      screen: 'flare',
      subState: 'actions',
      label: 'Mitigation suggestions',
      description: `Actionable recommendations tailored to your specific risk factors: increase moisturizer application, use a humidifier, or practice the guided breathing exercises. You can also share this report directly with your dermatologist.`
    },
  ]
};

// Auto-Play Flow Section Component
interface AutoPlayFlowSectionProps {
  flow: FlowData;
  isMobile: boolean;
}

const AutoPlayFlowSection = ({ flow, isMobile }: AutoPlayFlowSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic (3 seconds per step, stops at end)
  useEffect(() => {
    if (isPlaying && !isComplete) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= flow.steps.length - 1) {
            // Stop at end
            setIsPlaying(false);
            setIsComplete(true);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isComplete, flow.steps.length]);

  const handlePlayClick = () => {
    if (isComplete) {
      // Reset and play again
      setCurrentStep(0);
      setIsComplete(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Navigation handlers
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsComplete(false);
    }
  };

  const goToNextStep = () => {
    if (currentStep < flow.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
      setIsPlaying(false);
    }
  };

  // Button states: "Play Demo" | "Pause" | "Play Again"
  const getButtonState = () => {
    if (isComplete) return { icon: 'replay', text: 'Play Again' };
    if (isPlaying) return { icon: 'pause', text: 'Pause' };
    return { icon: 'play', text: 'Play Demo' };
  };

  const buttonState = getButtonState();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        padding: isMobile ? '2rem 1.25rem' : '2.5rem 2rem',
        borderRadius: 24,
        backgroundColor: `rgba(${flow.color}, 0.03)`,
        border: `1px solid rgba(${flow.color}, 0.15)`,
        marginBottom: '2rem',
      }}
    >
      {/* Title */}
      <h3 style={{
        fontSize: isMobile ? '1.5rem' : '1.75rem',
        fontWeight: 500,
        color: `rgb(${flow.color})`,
        textAlign: 'center',
        marginBottom: '1.5rem',
      }}>
        {flow.title}
      </h3>

      {/* Dynamic Description (changes per step with animation) */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{
            maxWidth: '650px',
            margin: '0 auto 2rem',
            lineHeight: 1.7,
            color: 'var(--text-70)',
            textAlign: 'center',
            fontSize: isMobile ? '0.95rem' : '1.05rem',
          }}
        >
          {flow.steps[currentStep].description}
        </motion.p>
      </AnimatePresence>

      {/* Phone Mockup (non-interactive display) */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        height: isMobile ? '500px' : '650px',
      }}>
        <div style={{
          transform: `scale(${isMobile ? 0.52 : 0.68})`,
          transformOrigin: 'top center',
        }}>
          <PsoriAssistPhoneMockup
            controlledScreen={flow.steps[currentStep].screen}
            controlledSubState={flow.steps[currentStep].subState}
            showThemeToggle={false}
          />
        </div>
      </div>

      {/* Controls: Prev Arrow | Play/Pause | Next Arrow */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Previous Step Arrow */}
        <motion.button
          onClick={goToPrevStep}
          whileHover={{ scale: currentStep === 0 ? 1 : 1.1 }}
          whileTap={{ scale: currentStep === 0 ? 1 : 0.9 }}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: currentStep === 0 ? 'var(--glass-05)' : `rgba(${flow.color}, 0.15)`,
            border: `2px solid ${currentStep === 0 ? 'var(--glass-15)' : `rgb(${flow.color})`}`,
            color: currentStep === 0 ? 'var(--text-30)' : `rgb(${flow.color})`,
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        {/* Play/Pause Button - Icon only when playing */}
        <motion.button
          onClick={handlePlayClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: isPlaying ? '0.75rem' : '0.75rem 1.5rem',
            minWidth: isPlaying ? '48px' : 'auto',
            height: '48px',
            borderRadius: '100px',
            background: `rgba(${flow.color}, 0.15)`,
            border: `2px solid rgb(${flow.color})`,
            color: `rgb(${flow.color})`,
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {isPlaying ? (
            <Pause size={20} fill={`rgb(${flow.color})`} />
          ) : isComplete ? (
            <>
              <RotateCcw size={20} />
              Play Again
            </>
          ) : (
            <>
              <Play size={20} fill={`rgb(${flow.color})`} />
              Play Demo
            </>
          )}
        </motion.button>

        {/* Next Step Arrow */}
        <motion.button
          onClick={goToNextStep}
          whileHover={{ scale: (currentStep === flow.steps.length - 1 && isComplete) ? 1 : 1.1 }}
          whileTap={{ scale: (currentStep === flow.steps.length - 1 && isComplete) ? 1 : 0.9 }}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: (currentStep === flow.steps.length - 1 && isComplete) ? 'var(--glass-05)' : `rgba(${flow.color}, 0.15)`,
            border: `2px solid ${(currentStep === flow.steps.length - 1 && isComplete) ? 'var(--glass-15)' : `rgb(${flow.color})`}`,
            color: (currentStep === flow.steps.length - 1 && isComplete) ? 'var(--text-30)' : `rgb(${flow.color})`,
            cursor: (currentStep === flow.steps.length - 1 && isComplete) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Progress Bar with Step Counter */}
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.85rem',
          color: 'var(--text-60)',
        }}>
          <span>Step {currentStep + 1} of {flow.steps.length}</span>
          <span>{flow.steps[currentStep].label}</span>
        </div>
        <div style={{
          height: '4px',
          borderRadius: '2px',
          background: 'var(--glass-10)',
        }}>
          <motion.div
            style={{
              height: '100%',
              borderRadius: '2px',
              background: `rgb(${flow.color})`,
            }}
            animate={{ width: `${((currentStep + 1) / flow.steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export function PsoriAssistCase() {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState<string | null>(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [expandedLearnings, setExpandedLearnings] = useState(false);
  const [activeDemo, setActiveDemo] = useState<'phone' | 'ghost' | 'reminder' | 'pasi'>('phone');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div>
      {/* ===== SECTION 1: HERO ===== */}
      <SnapSection id="hero">
        <div
          style={{
            maxWidth: 900,
            width: '100%',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              borderRadius: 20,
              background: 'rgba(74, 144, 226, 0.1)',
              border: '1px solid rgba(74, 144, 226, 0.2)',
              color: 'rgb(74, 144, 226)',
              fontSize: '0.8rem',
              fontWeight: 500,
              marginBottom: '2rem',
            }}
          >
            Digital Health &middot; AI/ML &middot; CONCEPT
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: isMobile ? '3rem' : '6rem',
              fontWeight: 100,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              background: 'linear-gradient(135deg, var(--text-95) 0%, var(--text-60) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
            }}
          >
            PsoriAssist
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: isMobile ? '1.125rem' : '1.375rem',
              color: 'var(--text-60)',
              maxWidth: 600,
              margin: '0 auto 3rem',
              lineHeight: 1.6,
            }}
          >
            Reimagining psoriasis care through AI-powered digital therapeutics
          </motion.p>

          {/* Stats Grid - Staggered entrance */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.7 },
              },
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            {heroStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: '1.25rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                  cursor: 'default',
                }}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
                  style={{
                    fontSize: '2rem',
                    fontWeight: 200,
                    color: `rgb(${stat.color})`,
                    marginBottom: '0.25rem',
                  }}
                >
                  {stat.value}
                </motion.div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-70)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-30)',
            }}
          >
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>SCROLL</span>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 2: GENESIS ===== */}
      <SnapSection id="genesis" background="subtle">
        <div style={{ maxWidth: 1000, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            The Genesis
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '3rem',
              fontStyle: 'italic',
            }}
          >
            "It starts with a single patch. Then another."
          </motion.p>

          {/* Timeline - Enhanced with stagger and glow effects */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
            }}
          >
            {genesisTimeline.map((node, i) => (
              <motion.div
                key={node.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{ y: -4 }}
                onClick={() =>
                  setExpandedTimeline(expandedTimeline === node.id ? null : node.id)
                }
                style={{
                  flex: isMobile ? '1 1 45%' : 1,
                  padding: '1.5rem',
                  borderRadius: 20,
                  background:
                    expandedTimeline === node.id ? 'var(--glass-06)' : 'var(--glass-03)',
                  border: `1px solid ${
                    expandedTimeline === node.id
                      ? `rgba(${node.color}, 0.3)`
                      : 'var(--border-primary)'
                  }`,
                  cursor: 'pointer',
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `rgba(${node.color}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: `rgb(${node.color})`,
                  }}
                >
                  {node.shortLabel}
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-40)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {node.year}
                </div>

                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--text-80)',
                    marginBottom: expandedTimeline === node.id ? '1rem' : 0,
                  }}
                >
                  {node.title}
                </div>

                <AnimatePresence>
                  {expandedTimeline === node.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-50)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {node.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 3: RESEARCH ===== */}
      <SnapSection id="research">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Research Discovery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            25 patient interviews · 12 provider interviews · 75+ studies reviewed
          </motion.p>

          {/* Research Themes Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}>
            {researchThemes.map((theme, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                  cursor: 'default',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: `rgb(${theme.color})`,
                  }}>
                    {theme.stat}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--text-70)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {theme.label}
                  </div>
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-60)',
                  fontStyle: 'italic',
                  marginBottom: '0.75rem',
                  lineHeight: 1.6,
                }}>
                  {theme.quote}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-40)', marginBottom: '0.75rem' }}>
                  {theme.author}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-50)',
                  padding: '0.75rem',
                  background: 'var(--glass-05)',
                  borderRadius: 10,
                }}>
                  {theme.insight}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Adherence Gap Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              borderRadius: 20,
              background: 'var(--glass-03)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <h4 style={{ fontSize: '1rem', color: 'var(--text-80)', marginBottom: '1rem', textAlign: 'center' }}>
              {adherenceGap.title}
            </h4>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {adherenceGap.data.map((item, i) => (
                <div key={i} style={{ textAlign: 'center', minWidth: 120 }}>
                  <div style={{
                    height: 8,
                    background: 'var(--glass-10)',
                    borderRadius: 4,
                    marginBottom: '0.5rem',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      style={{
                        height: '100%',
                        background: `rgb(${item.color})`,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, color: `rgb(${item.color})` }}>
                    {item.value}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-50)' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginTop: '1rem',
              fontStyle: 'italic',
            }}>
              {adherenceGap.insight}
            </p>
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 4: COMPETITIVE LANDSCAPE ===== */}
      <SnapSection id="landscape" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Competitive Landscape
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            15 apps analyzed using MARS-G framework
          </motion.p>

          {/* Competitor Accordion Cards */}
          <div style={{ marginBottom: '1.5rem' }}>
            <AccordionGroup
              columns={isMobile ? 1 : 2}
              gap="1rem"
              items={competitors.map((app, i) => ({
                id: `competitor-${i}`,
                title: app.name,
                subtitle: app.market,
                accentColor: app.color,
                badge: (
                  <span style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: 6,
                    background: `rgba(${app.color}, 0.15)`,
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: `rgb(${app.color})`,
                  }}>
                    {app.rating}
                  </span>
                ),
                content: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgb(80, 200, 120)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Strengths
                      </div>
                      {app.strengths.map((s, j) => (
                        <div key={j} style={{ fontSize: '0.8rem', color: 'var(--text-60)', paddingLeft: '1rem', position: 'relative', marginBottom: '0.3rem' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'rgb(80, 200, 120)' }}>✓</span>
                          {s}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgb(239, 68, 68)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Gaps
                      </div>
                      {app.gaps.map((g, j) => (
                        <div key={j} style={{ fontSize: '0.8rem', color: 'var(--text-60)', paddingLeft: '1rem', position: 'relative', marginBottom: '0.3rem' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'rgb(239, 68, 68)' }}>✗</span>
                          {g}
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              }))}
            />
          </div>

          {/* Market Gaps Summary - Collapsible */}
          <CollapsibleSection title="Critical Market Gaps Identified">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
              {marketGaps.map((gap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 600, color: 'rgb(251, 191, 36)' }}>{gap.value}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-60)', maxWidth: 150 }}>{gap.label}</div>
                </motion.div>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </SnapSection>

      {/* ===== SECTION 5: PROBLEM ===== */}
      <SnapSection id="problem">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            The Treatment Gap
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            125 million patients. Three critical failures.
          </motion.p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1.5rem',
            }}
          >
            {problemCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ExpandableCard
                  key={card.id}
                  id={card.id}
                  icon={<Icon size={24} color={`rgb(${card.color})`} />}
                  title={card.title}
                  subtitle={card.subtitle}
                  accentColor={card.color}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <div
                        style={{
                          fontSize: '3rem',
                          fontWeight: 100,
                          color: `rgb(${card.color})`,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {card.stat}
                      </div>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-40)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Research
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-70)', margin: 0 }}>
                        {card.expandedContent.research}
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-40)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Impact
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-70)', margin: 0 }}>
                        {card.expandedContent.impact}
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-40)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Insight
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-70)', margin: 0 }}>
                        {card.expandedContent.insight}
                      </p>
                    </div>
                  </div>
                </ExpandableCard>
              );
            })}
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 6: DESIGN PRINCIPLES ===== */}
      <SnapSection id="principles" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Design Principles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            5 core principles guiding every design decision
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}>
            {designPrinciples.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  style={{
                    padding: '1.5rem',
                    borderRadius: 20,
                    background: 'var(--glass-03)',
                    border: '1px solid var(--border-primary)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: `rgba(${p.color}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                  }}>
                    <Icon size={28} color={`rgb(${p.color})`} />
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: `rgb(${p.color})`,
                    marginBottom: '0.5rem',
                  }}>
                    {p.principle}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-60)',
                    marginBottom: '1rem',
                    lineHeight: 1.5,
                  }}>
                    {p.description}
                  </p>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-50)',
                    padding: '0.75rem',
                    background: 'var(--glass-03)',
                    borderRadius: 10,
                    fontStyle: 'italic',
                  }}>
                    {p.example}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 7: PERSONAS ===== */}
      <SnapSection id="personas">
        <div style={{ maxWidth: 1200, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            User Personas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            Synthesized from 25 in-depth patient interviews
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}>
            {personas.map((persona, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: `rgba(${persona.color}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: `rgb(${persona.color})`,
                  }}>
                    {persona.name[0]}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-90)', marginBottom: '0.125rem' }}>
                      {persona.name}, {persona.age}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-50)' }}>{persona.role}</div>
                  </div>
                </div>

                {/* Severity Badge */}
                <div style={{
                  fontSize: '0.75rem',
                  color: `rgb(${persona.color})`,
                  marginBottom: '1rem',
                }}>
                  {persona.severity} · {persona.techSavvy}
                </div>

                {/* Quote */}
                <div style={{
                  padding: '0.75rem',
                  background: 'var(--glass-05)',
                  borderRadius: 10,
                  marginBottom: '1rem',
                }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-70)', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                    "{persona.quote}"
                  </p>
                </div>

                {/* Goals */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.7rem', color: 'var(--text-40)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Goals</h4>
                  {persona.goals.map((goal, j) => (
                    <div key={j} style={{ fontSize: '0.8rem', color: 'var(--text-60)', paddingLeft: '1rem', position: 'relative', marginBottom: '0.2rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: `rgb(${persona.color})` }}>✓</span>
                      {goal}
                    </div>
                  ))}
                </div>

                {/* Frustrations */}
                <div>
                  <h4 style={{ fontSize: '0.7rem', color: 'var(--text-40)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Frustrations</h4>
                  {persona.frustrations.map((frust, j) => (
                    <div key={j} style={{ fontSize: '0.8rem', color: 'var(--text-60)', paddingLeft: '1rem', position: 'relative', marginBottom: '0.2rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: `rgb(${persona.color})` }}>✗</span>
                      {frust}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 8: DESIGN PROCESS ===== */}
      <SnapSection id="process" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Double Diamond Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            18-month systematic design methodology
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}>
            {processPhases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '0.375rem 0.75rem',
                  borderRadius: 10,
                  background: `rgba(${phase.color}, 0.15)`,
                  color: `rgb(${phase.color})`,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                }}>
                  {phase.phase}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-50)', marginBottom: '1rem' }}>
                  {phase.subtitle}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {phase.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-60)',
                        paddingLeft: '1.25rem',
                        position: 'relative',
                        marginBottom: '0.4rem',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: `rgb(${phase.color})` }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 9: SOLUTION ===== */}
      <SnapSection id="solution" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            AI-Powered Care
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            Four core innovations. Click to explore.
          </motion.p>

          {/* Hero Features Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            {heroFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <ExpandableCard
                  key={feature.id}
                  id={feature.id}
                  icon={<Icon size={24} color={`rgb(${feature.color})`} />}
                  title={feature.title}
                  subtitle={feature.subtitle}
                  accentColor={feature.color}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p style={{ fontSize: '1rem', color: 'var(--text-70)', margin: 0 }}>
                      {feature.description}
                    </p>

                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      {feature.details.map((detail, i) => (
                        <li
                          key={i}
                          style={{ fontSize: '0.9rem', color: 'var(--text-60)' }}
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div
                      style={{
                        padding: '1rem',
                        borderRadius: 12,
                        background: 'var(--glass-03)',
                        border: '1px solid var(--border-primary)',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-40)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Technical
                      </h4>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-50)',
                          margin: 0,
                          fontFamily: 'monospace',
                        }}
                      >
                        {feature.technical}
                      </p>
                    </div>
                  </div>
                </ExpandableCard>
              );
            })}
          </div>

          {/* See All Features Button */}
          <motion.button
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            whileHover={{ y: -2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto',
              padding: '0.75rem 1.5rem',
              borderRadius: 16,
              background: 'var(--glass-05)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-70)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {showAllFeatures ? 'Hide' : 'See All 12 Features'}
            <motion.span animate={{ rotate: showAllFeatures ? 180 : 0 }}>
              <ChevronDown size={16} />
            </motion.span>
          </motion.button>

          {/* Secondary Features */}
          <AnimatePresence>
            {showAllFeatures && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden', marginTop: '2rem' }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: '1rem',
                  }}
                >
                  {secondaryFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.id}
                        whileHover={{ y: -4, background: 'var(--glass-06)' }}
                        style={{
                          padding: '1.25rem',
                          borderRadius: 16,
                          background: 'var(--glass-03)',
                          border: '1px solid var(--border-primary)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: `rgba(${feature.color}, 0.1)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.75rem',
                          }}
                        >
                          <Icon size={18} color={`rgb(${feature.color})`} />
                        </div>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: 'var(--text-80)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {feature.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-50)' }}>
                          {feature.subtitle}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SnapSection>

      {/* ===== SECTION 10: USABILITY TESTING ===== */}
      <SnapSection id="testing">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Usability Testing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            3 rounds · 45 participants · iterative improvement
          </motion.p>

          {/* Testing Rounds */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {testingRounds.map((round, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: 16,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-90)', marginBottom: '0.25rem' }}>
                    {round.round}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-50)', marginBottom: '0.75rem' }}>
                    {round.participants} participants
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-40)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Key Finding
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-70)', lineHeight: 1.5 }}>{round.keyFinding}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-40)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Iteration
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-70)', lineHeight: 1.5 }}>{round.iteration}</div>
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: '1rem',
                  borderRadius: 12,
                  background: 'var(--glass-05)',
                  border: '1px solid var(--border-primary)',
                  textAlign: 'center',
                  minWidth: 80,
                }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-90)' }}>
                    {round.taskCompletion}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-50)' }}>Task Completion</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              padding: '1.5rem',
              borderRadius: 20,
              background: 'var(--glass-03)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-90)', textAlign: 'center', marginBottom: '1.25rem' }}>
              Final Usability Metrics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {usabilityMetrics.map((m, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-90)' }}>{m.value}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-70)', fontWeight: 500 }}>{m.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-50)' }}>{m.sublabel}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 11: DESIGN SYSTEM ===== */}
      <SnapSection id="design-system" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Design System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            WCAG AA compliant · Inter typeface · Calming color palette
          </motion.p>

          {/* Transforming Color Palette */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '0.5rem' }}>
              Color System
            </h3>
            <TransformingColorPalette />
          </div>

          {/* Interactive Typography */}
          <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '1rem' }}>
              Typography Scale
              <span style={{ fontSize: '0.75rem', color: 'var(--text-40)', marginLeft: '0.75rem', fontWeight: 400 }}>
                Hover for specs
              </span>
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-40)', marginBottom: '0.75rem' }}>
              Typeface: Inter (Google Fonts) - Optimized for digital screens
            </div>
            <InteractiveTypography
              items={typographyScale.map((t) => ({
                name: t.name,
                sample: t.sample,
                size: t.size,
                weight: parseInt(String(t.weight)),
              }))}
            />
          </div>

          {/* Token Architecture - Three-tier system */}
          <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '0.5rem' }}>
              Token Architecture
            </h3>
            <TokenHierarchyDiagram />
          </div>

          {/* Adaptive Theming - Light/Dark mode */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '0.5rem' }}>
              Adaptive Theming
            </h3>
            <ThemeSwitchVisualization />
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 12: USER FLOWS WITH INTERACTIVE PROTOTYPES ===== */}
      <SnapSection id="flows">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Key User Flows
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            Watch each feature in action
          </motion.p>

          {/* Photo Capture Flow */}
          <AutoPlayFlowSection flow={PHOTO_CAPTURE_FLOW} isMobile={isMobile} />

          {/* Medication Reminder Flow */}
          <AutoPlayFlowSection flow={MEDICATION_REMINDER_FLOW} isMobile={isMobile} />

          {/* Predictive Flare-Up Flow */}
          <AutoPlayFlowSection flow={FLARE_ALERT_FLOW} isMobile={isMobile} />
        </div>
      </SnapSection>

      {/* ===== SECTION 13: TECHNICAL ARCHITECTURE ===== */}
      <SnapSection id="technical" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Technical Architecture
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            HIPAA-compliant · Scalable · AI/ML pipeline
          </motion.p>

          {/* System Architecture Accordion Stack */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '1rem' }}>
              System Architecture
              <span style={{ fontSize: '0.75rem', color: 'var(--text-40)', marginLeft: '0.75rem', fontWeight: 400 }}>
                Click layers to explore
              </span>
            </h3>
            <AccordionGroup
              items={techStack.map((layer) => ({
                id: layer.id,
                title: layer.title,
                accentColor: layer.color,
                icon: (
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: `rgb(${layer.color})`,
                  }} />
                ),
                content: (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-70)', lineHeight: 1.6 }}>
                    {layer.description}
                  </div>
                ),
              }))}
            />
          </div>

          {/* ML Models - Accordion */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '1rem' }}>AI/ML Pipeline</h3>
            <AccordionGroup
              columns={isMobile ? 1 : 2}
              gap="1rem"
              items={mlModels.map((ml, i) => ({
                id: `ml-${i}`,
                title: ml.model,
                subtitle: ml.performance,
                accentColor: ml.color,
                content: (
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-50)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Pipeline Stages
                    </div>
                    {ml.stages.map((stage, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-60)',
                          paddingLeft: '1rem',
                          position: 'relative',
                          marginBottom: '0.4rem',
                          fontFamily: j > 0 ? 'monospace' : 'inherit',
                        }}
                      >
                        <span style={{ position: 'absolute', left: 0, color: `rgb(${ml.color})` }}>
                          {j === ml.stages.length - 1 ? '↓' : '•'}
                        </span>
                        {stage}
                      </div>
                    ))}
                  </div>
                ),
              }))}
            />
          </div>

          {/* Security - Collapsible */}
          <CollapsibleSection title="HIPAA Compliance" defaultOpen={false}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1rem', paddingTop: '0.5rem' }}>
              {securityCompliance.map((sec, i) => {
                const Icon = sec.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      padding: '1rem',
                      borderRadius: 14,
                      background: 'var(--glass-03)',
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: `rgba(${sec.color}, 0.15)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon size={16} color={`rgb(${sec.color})`} />
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: `rgb(${sec.color})`, margin: 0 }}>
                        {sec.category}
                      </h4>
                    </div>
                    {sec.items.map((item, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-60)',
                          paddingLeft: '0.75rem',
                          position: 'relative',
                          marginBottom: '0.25rem',
                        }}
                      >
                        <span style={{ position: 'absolute', left: 0, color: `rgb(${sec.color})` }}>✓</span>
                        {item}
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </CollapsibleSection>
        </div>
      </SnapSection>

      {/* ===== SECTION 14: PROTOTYPE (Full Interactive) ===== */}
      <SnapSection id="prototype">
        <div style={{ maxWidth: 1200, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Experience It
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-50)',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            Interactive prototypes. Try them yourself.
          </motion.p>

          {/* Demo Selector Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { id: 'phone', label: 'Full App', icon: Smartphone, color: '74, 144, 226' },
              { id: 'ghost', label: 'Ghost Overlay', icon: Camera, color: '74, 144, 226' },
              { id: 'reminder', label: 'Smart Reminders', icon: Clock, color: '168, 85, 247' },
              { id: 'pasi', label: 'PASI Scoring', icon: Activity, color: '80, 200, 120' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeDemo === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveDemo(tab.id as typeof activeDemo)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem 1rem',
                    borderRadius: 12,
                    background: isActive ? `rgba(${tab.color}, 0.15)` : 'var(--glass-03)',
                    border: `1px solid ${isActive ? `rgba(${tab.color}, 0.3)` : 'var(--border-primary)'}`,
                    color: isActive ? `rgb(${tab.color})` : 'var(--text-60)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Demo Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: isMobile ? 500 : 600,
              }}
            >
              {activeDemo === 'phone' && (
                <div style={{ transform: isMobile ? 'scale(0.75)' : 'scale(0.85)', transformOrigin: 'center' }}>
                  <PsoriAssistPhoneMockup />
                </div>
              )}

              {activeDemo === 'ghost' && (
                <div style={{ width: '100%', maxWidth: 500 }}>
                  <GhostOverlayDemo />
                </div>
              )}

              {activeDemo === 'reminder' && (
                <div style={{ width: '100%', maxWidth: 500 }}>
                  <SmartReminderDemo />
                </div>
              )}

              {activeDemo === 'pasi' && (
                <div style={{ width: '100%', maxWidth: 600 }}>
                  <PASIScoringDemo />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Feature description */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: 12,
              background: 'var(--glass-02)',
            }}
          >
            {activeDemo === 'phone' && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-50)', margin: 0 }}>
                Full iOS 17 prototype with 8 interactive screens. Swipe to navigate, pull to refresh.
              </p>
            )}
            {activeDemo === 'ghost' && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-50)', margin: 0 }}>
                Ghost overlay innovation for consistent photo tracking. Adjust opacity 20-80% for perfect alignment.
              </p>
            )}
            {activeDemo === 'reminder' && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-50)', margin: 0 }}>
                AI-powered reminders learn from your patterns to suggest optimal treatment times.
              </p>
            )}
            {activeDemo === 'pasi' && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-50)', margin: 0 }}>
                AI PASI scoring is 33% more accurate than average dermatologist assessment.
              </p>
            )}
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 6: IMPACT ===== */}
      <SnapSection id="impact" background="accent">
        <div style={{ maxWidth: 1000, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '3rem',
              textAlign: 'center',
            }}
          >
            The Impact
          </motion.h2>

          {/* Impact Metrics - Staggered with glow hover */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            {impactMetrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                  textAlign: 'center',
                  cursor: 'default',
                }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 150 }}
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 100,
                    color: `rgb(${metric.color})`,
                    marginBottom: '0.25rem',
                  }}
                >
                  {metric.value}
                </motion.div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-70)' }}>
                  {metric.label}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-40)' }}>
                  {metric.sublabel}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote - Elegant entrance */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -2 }}
            style={{
              padding: '2rem',
              borderRadius: 24,
              background: 'var(--glass-03)',
              border: '1px solid var(--border-primary)',
              marginBottom: '2rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative quote marks */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 24,
                fontSize: '4rem',
                color: 'var(--glass-08)',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}
            >
              "
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: '1.25rem',
                color: 'var(--text-80)',
                fontStyle: 'italic',
                marginBottom: '1rem',
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 1,
              }}
            >
              "{testimonialQuote.text}"
            </motion.p>
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: '0.9rem', color: 'var(--text-50)' }}
            >
              — {testimonialQuote.author}, {testimonialQuote.role}
            </motion.footer>
          </motion.blockquote>

          {/* Learnings Expandable */}
          <motion.button
            onClick={() => setExpandedLearnings(!expandedLearnings)}
            whileHover={{ y: -2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto',
              padding: '0.75rem 1.5rem',
              borderRadius: 16,
              background: 'var(--glass-05)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-70)',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            {expandedLearnings ? 'Hide' : 'View'} Learnings
            <motion.span animate={{ rotate: expandedLearnings ? 180 : 0 }}>
              <ChevronDown size={16} />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {expandedLearnings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden', marginTop: '2rem' }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      padding: '1.5rem',
                      borderRadius: 20,
                      background: 'var(--glass-03)',
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '1rem',
                        color: 'var(--text-80)',
                        marginBottom: '1rem',
                      }}
                    >
                      What Worked
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                      {learnings.worked.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-60)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    style={{
                      padding: '1.5rem',
                      borderRadius: 20,
                      background: 'var(--glass-03)',
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '1rem',
                        color: 'var(--text-80)',
                        marginBottom: '1rem',
                      }}
                    >
                      What I'd Do Differently
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                      {learnings.different.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-60)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '3rem',
              flexWrap: 'wrap',
            }}
          >
            <motion.a
              href="/work"
              whileHover={{ y: -2 }}
              style={{
                padding: '0.875rem 1.75rem',
                borderRadius: 16,
                background: 'rgba(74, 144, 226, 0.15)',
                border: '1px solid rgba(74, 144, 226, 0.3)',
                color: 'rgb(74, 144, 226)',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              View Other Projects
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ y: -2 }}
              style={{
                padding: '0.875rem 1.75rem',
                borderRadius: 16,
                background: 'var(--glass-05)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-70)',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Get in Touch
            </motion.a>
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 16: FUTURE ROADMAP ===== */}
      <SnapSection id="roadmap" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Future Roadmap
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            Evolution from MVP to comprehensive digital health platform
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}>
            {roadmap.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Timeframe badge */}
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  padding: '0.25rem 0.5rem',
                  borderRadius: 8,
                  background: `rgba(${phase.color}, 0.2)`,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: `rgb(${phase.color})`,
                  textTransform: 'uppercase',
                }}>
                  {phase.timeframe}
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: `rgb(${phase.color})`,
                  marginBottom: '1.5rem',
                }}>
                  {phase.tier}
                </h3>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {phase.goals.map((goal, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        color: 'var(--text-60)',
                        marginBottom: '0.75rem',
                        paddingLeft: '1.25rem',
                        position: 'relative',
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.4rem',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: `rgb(${phase.color})`,
                      }} />
                      {goal}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '2.5rem',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-60)',
              marginBottom: '1.5rem',
            }}>
              Interested in collaborating on digital health solutions?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="/contact"
                whileHover={{ y: -2 }}
                style={{
                  padding: '0.875rem 1.75rem',
                  borderRadius: 16,
                  background: 'rgba(74, 144, 226, 0.15)',
                  border: '1px solid rgba(74, 144, 226, 0.3)',
                  color: 'rgb(74, 144, 226)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Let's Connect
              </motion.a>
              <motion.a
                href="/work"
                whileHover={{ y: -2 }}
                style={{
                  padding: '0.875rem 1.75rem',
                  borderRadius: 16,
                  background: 'var(--glass-05)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-70)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                View Other Projects
              </motion.a>
            </div>
          </motion.div>
        </div>
      </SnapSection>
    </div>
  );
}
