'use client';

import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  Puzzle,
  Building2,
  Clock,
  TrendingDown,
  Camera,
  Brain,
  BarChart3,
  Moon,
  HeartPulse,
  CloudRain,
  TrendingUp,
  AlertTriangle,
  Bot,
  MousePointerClick,
  BookOpen,
  Shield,
  Check,
} from 'lucide-react';
import { useClearaScroll } from '@/hooks/useClearaScroll';
import { ClearaPoeticText } from './parallax/ClearaPoeticText';
import ClearaPhoneMockup from './ClearaPhoneMockup';
import type { FragmentData } from './parallax/ClearaParallaxScene';

// Lazy load Three.js scene for better initial load
const ClearaParallaxScene = dynamic(
  () => import('./parallax/ClearaParallaxScene').then(mod => ({ default: mod.ClearaParallaxScene })),
  { ssr: false }
);

/**
 * Cleara Case Study - David Whyte Parallax Style
 *
 * A scroll-driven narrative experience with:
 * - Light cream canvas background (#FAF8F5)
 * - Floating watercolor fragments at different depths
 * - Poetic serif typography with line-by-line reveals
 * - Three-act narrative structure (Empathy → Discovery → Impact)
 */

// =============================================================================
// FRAGMENT DATA - Enable when watercolor images are generated
// Save images to: public/images/cleara/watercolor/
// =============================================================================

const HERO_FRAGMENTS: FragmentData[] = [
  {
    id: 'hero-fragment-1',
    imageSrc: '/images/cleara/watercolor/hero-fragment-1.png',
    position: [-400, 300, -70],
    size: [900, 675],
    scrollRange: [0, 0.12],
    parallaxSpeed: 0.6,
    rotation: -4,
    opacity: 0.95,
  },
  {
    id: 'hero-fragment-2',
    imageSrc: '/images/cleara/watercolor/hero-fragment-2.png',
    position: [380, -250, -140],
    size: [675, 900],
    scrollRange: [0, 0.14],
    parallaxSpeed: 0.4,
    rotation: 6,
    opacity: 0.95,
  },
  {
    id: 'hero-fragment-3',
    imageSrc: '/images/cleara/watercolor/hero-fragment-3.png',
    position: [-180, -350, -90],
    size: [450, 450],
    scrollRange: [0.02, 0.16],
    parallaxSpeed: 0.85,
    rotation: -10,
    opacity: 0.95,
  },
  {
    id: 'hero-fragment-4',
    imageSrc: '/images/cleara/watercolor/hero-fragment-4.png',
    position: [250, 400, -120],
    size: [565, 340],
    scrollRange: [0, 0.10],
    parallaxSpeed: 0.5,
    rotation: 3,
    opacity: 0.95,
  },
];

const JOURNEY_FRAGMENTS: FragmentData[] = [
  {
    id: 'journey-moment-1',
    imageSrc: '/images/cleara/watercolor/journey-moment-1.png',
    position: [380, 150, -100],
    size: [790, 565],
    scrollRange: [0.08, 0.25],
    parallaxSpeed: 0.5,
    rotation: 2,
    opacity: 0.95,
  },
  {
    id: 'journey-moment-2',
    imageSrc: '/images/cleara/watercolor/journey-moment-2.png',
    position: [-360, -100, -150],
    size: [790, 565],
    scrollRange: [0.15, 0.32],
    parallaxSpeed: 0.7,
    rotation: -5,
    opacity: 0.95,
  },
  {
    id: 'journey-moment-3',
    imageSrc: '/images/cleara/watercolor/journey-moment-3.png',
    position: [250, -250, -180],
    size: [790, 565],
    scrollRange: [0.20, 0.38],
    parallaxSpeed: 0.55,
    rotation: 4,
    opacity: 0.95,
  },
];

const PERSONA_FRAGMENTS: FragmentData[] = [
  {
    id: 'persona-sarah',
    imageSrc: '/images/cleara/watercolor/persona-sarah.png',
    position: [-430, 80, -120],
    size: [675, 900],
    scrollRange: [0.30, 0.48],
    parallaxSpeed: 0.6,
    rotation: -3,
    opacity: 0.95,
  },
  {
    id: 'persona-marcus',
    imageSrc: '/images/cleara/watercolor/persona-marcus.png',
    position: [0, -50, -160],
    size: [675, 900],
    scrollRange: [0.33, 0.50],
    parallaxSpeed: 0.65,
    rotation: 0,
    opacity: 0.95,
  },
  {
    id: 'persona-priya',
    imageSrc: '/images/cleara/watercolor/persona-priya.png',
    position: [430, 120, -200],
    size: [675, 900],
    scrollRange: [0.36, 0.52],
    parallaxSpeed: 0.55,
    rotation: 4,
    opacity: 0.95,
  },
];

const IMPACT_FRAGMENTS: FragmentData[] = [
  {
    id: 'impact-bloom',
    imageSrc: '/images/cleara/watercolor/impact-bloom.png',
    position: [0, 0, -280],
    size: [1125, 900],
    scrollRange: [0.70, 0.98],
    parallaxSpeed: 0.7,
    rotation: 0,
    opacity: 0.95,
  },
  {
    id: 'phone-backdrop',
    imageSrc: '/images/cleara/watercolor/phone-backdrop.png',
    position: [-240, -150, -320],
    size: [900, 1125],
    scrollRange: [0.55, 0.72],
    parallaxSpeed: 0.8,
    rotation: -2,
    opacity: 0.95,
  },
];

// PROBLEM FRAGMENTS - for Problem Deep Dive section (scroll 18-30%)
const PROBLEM_FRAGMENTS: FragmentData[] = [
  {
    id: 'problem-float',
    imageSrc: '/images/cleara/watercolor/fragment-problem-float.png',
    position: [-380, 200, -140],
    size: [510, 400],
    scrollRange: [0.16, 0.32],
    parallaxSpeed: 0.7,
    rotation: -4,
    opacity: 0.95,
  },
  {
    id: 'problem-fragmented',
    imageSrc: '/images/cleara/watercolor/problem-fragmented.png',
    position: [400, -80, -180],
    size: [625, 510],
    scrollRange: [0.18, 0.30],
    parallaxSpeed: 0.9,
    rotation: 2,
    opacity: 0.95,
  },
  {
    id: 'problem-clinical',
    imageSrc: '/images/cleara/watercolor/problem-clinical.png',
    position: [-340, -220, -160],
    size: [565, 475],
    scrollRange: [0.20, 0.32],
    parallaxSpeed: 0.75,
    rotation: -3,
    opacity: 0.95,
  },
  {
    id: 'problem-reactive',
    imageSrc: '/images/cleara/watercolor/problem-reactive.png',
    position: [360, 250, -220],
    size: [565, 475],
    scrollRange: [0.22, 0.34],
    parallaxSpeed: 0.65,
    rotation: 5,
    opacity: 0.95,
  },
];

// TIMELINE FRAGMENTS - for Design Process section (scroll 55-62%)
const TIMELINE_FRAGMENTS: FragmentData[] = [
  {
    id: 'timeline-float',
    imageSrc: '/images/cleara/watercolor/fragment-timeline-float.png',
    position: [-370, 150, -160],
    size: [450, 510],
    scrollRange: [0.53, 0.65],
    parallaxSpeed: 0.75,
    rotation: -3,
    opacity: 0.95,
  },
  {
    id: 'timeline-immersion',
    imageSrc: '/images/cleara/watercolor/timeline-immersion.png',
    position: [400, 200, -200],
    size: [565, 450],
    scrollRange: [0.54, 0.62],
    parallaxSpeed: 0.85,
    rotation: 3,
    opacity: 0.95,
  },
  {
    id: 'timeline-ideation',
    imageSrc: '/images/cleara/watercolor/timeline-ideation.png',
    position: [-340, -180, -180],
    size: [565, 450],
    scrollRange: [0.56, 0.64],
    parallaxSpeed: 0.8,
    rotation: -2,
    opacity: 0.95,
  },
  {
    id: 'timeline-iteration',
    imageSrc: '/images/cleara/watercolor/timeline-iteration.png',
    position: [370, -130, -240],
    size: [565, 450],
    scrollRange: [0.55, 0.63],
    parallaxSpeed: 0.7,
    rotation: 4,
    opacity: 0.95,
  },
];

// AI FRAGMENTS - for AI Architecture section (scroll 72-78%)
const AI_FRAGMENTS: FragmentData[] = [
  {
    id: 'ai-float',
    imageSrc: '/images/cleara/watercolor/fragment-ai-float.png',
    position: [-360, 170, -180],
    size: [510, 400],
    scrollRange: [0.70, 0.80],
    parallaxSpeed: 0.8,
    rotation: -2,
    opacity: 0.95,
  },
  {
    id: 'ai-pasi-engine',
    imageSrc: '/images/cleara/watercolor/ai-pasi-engine.png',
    position: [380, 220, -220],
    size: [660, 475],
    scrollRange: [0.71, 0.79],
    parallaxSpeed: 0.9,
    rotation: 3,
    opacity: 0.95,
  },
  {
    id: 'ai-flare-prediction',
    imageSrc: '/images/cleara/watercolor/ai-flare-prediction.png',
    position: [-350, -150, -200],
    size: [660, 475],
    scrollRange: [0.73, 0.81],
    parallaxSpeed: 0.75,
    rotation: -4,
    opacity: 0.95,
  },
  {
    id: 'ai-human-loop',
    imageSrc: '/images/cleara/watercolor/ai-human-loop.png',
    position: [370, -100, -260],
    size: [675, 510],
    scrollRange: [0.72, 0.80],
    parallaxSpeed: 0.85,
    rotation: 2,
    opacity: 0.95,
  },
];

// RESULTS FRAGMENTS - for Results & Metrics section (scroll 78-85%)
const RESULTS_FRAGMENTS: FragmentData[] = [
  {
    id: 'results-float',
    imageSrc: '/images/cleara/watercolor/fragment-results-float.png',
    position: [-350, 140, -200],
    size: [450, 450],
    scrollRange: [0.76, 0.88],
    parallaxSpeed: 0.75,
    rotation: -5,
    opacity: 0.95,
  },
  {
    id: 'results-growth',
    imageSrc: '/images/cleara/watercolor/results-growth.png',
    position: [370, -90, -240],
    size: [735, 565],
    scrollRange: [0.78, 0.86],
    parallaxSpeed: 0.85,
    rotation: 2,
    opacity: 0.95,
  },
  {
    id: 'results-testimonial',
    imageSrc: '/images/cleara/watercolor/results-testimonial-bg.png',
    position: [-330, -200, -280],
    size: [565, 375],
    scrollRange: [0.80, 0.88],
    parallaxSpeed: 0.9,
    rotation: -3,
    opacity: 0.95,
  },
];

// DESIGN SYSTEM FRAGMENTS - for Design System Showcase section (scroll 85-92%)
const DESIGN_SYSTEM_FRAGMENTS: FragmentData[] = [
  {
    id: 'design-glass',
    imageSrc: '/images/cleara/watercolor/design-glass-demo.png',
    position: [380, 150, -240],
    size: [565, 375],
    scrollRange: [0.84, 0.94],
    parallaxSpeed: 0.8,
    rotation: 4,
    opacity: 0.95,
  },
  {
    id: 'design-typography',
    imageSrc: '/images/cleara/watercolor/design-typography-bg.png',
    position: [-360, -130, -300],
    size: [750, 285],
    scrollRange: [0.86, 0.94],
    parallaxSpeed: 0.85,
    rotation: -2,
    opacity: 0.95,
  },
];

// Combine all fragments
// TOGGLE: Set to true when images are ready
const IMAGES_READY = true;
const ALL_FRAGMENTS: FragmentData[] = IMAGES_READY
  ? [
      ...HERO_FRAGMENTS,
      ...JOURNEY_FRAGMENTS,
      ...PROBLEM_FRAGMENTS,
      ...PERSONA_FRAGMENTS,
      ...TIMELINE_FRAGMENTS,
      ...AI_FRAGMENTS,
      ...RESULTS_FRAGMENTS,
      ...DESIGN_SYSTEM_FRAGMENTS,
      ...IMPACT_FRAGMENTS,
    ]
  : [];

// =============================================================================
// PERSONAS DATA
// =============================================================================

const PERSONAS = [
  {
    name: 'Sarah',
    age: 34,
    occupation: 'Marketing Manager',
    quote: '"I just want to feel normal again."',
    painPoints: ['Unpredictable flare-ups affect work', 'Embarrassed at gym', 'Tired of explaining'],
    color: 'var(--cleara-lavender, #8B9DC3)',
  },
  {
    name: 'Marcus',
    age: 45,
    occupation: 'Software Engineer',
    quote: '"I forget my medications more than I\'d like to admit."',
    painPoints: ['Complex treatment schedule', 'Remote work isolation', 'Joint pain starting'],
    color: 'var(--cleara-sage, #A8C5B5)',
  },
  {
    name: 'Priya',
    age: 26,
    occupation: 'Graduate Student',
    quote: '"My mental health and skin are connected, I know it."',
    painPoints: ['Stress triggers flares', 'Dating anxiety', 'Insurance complexity'],
    color: 'var(--cleara-blush, #D4A5A5)',
  },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ClearaCase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollState = useClearaScroll();

  return (
    <div
      ref={containerRef}
      className="cleara-light"
      style={{
        backgroundColor: 'var(--cleara-canvas, #FAF8F5)',
        minHeight: '800vh', // Extended for more content
        position: 'relative',
      }}
    >
      {/* Three.js Parallax Background */}
      <Suspense fallback={null}>
        <ClearaParallaxScene
          fragments={ALL_FRAGMENTS}
          scrollProgress={scrollState.progress}
          depthRange={[100, -400]}
        />
      </Suspense>

      {/* Content Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        {/* ================================================================= */}
        {/* ACT I: EMPATHY (0-30%) */}
        {/* ================================================================= */}

        {/* HERO SECTION */}
        <section
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center',
              maxWidth: '800px',
              padding: '0 2rem',
              opacity: 1, // Ensure visible even without JS
            }}
          >
            <h1
              className="cleara-display"
              style={{
                color: 'var(--cleara-text-primary, #2A2A2A)',
                marginBottom: '1.5rem',
              }}
            >
              Cleara
            </h1>
            <p
              className="cleara-body"
              style={{
                color: 'var(--cleara-text-secondary, #4A4A4A)',
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                lineHeight: 1.7,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Reimagining psoriasis care through AI-powered digital therapeutics.
              <br />
              An 18-month design journey of empathy, research, and healing.
            </p>

            {/* Scroll indicator */}
            <motion.div
              initial={false}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1 }}
              style={{
                marginTop: '4rem',
                color: 'var(--cleara-text-muted, #8A8A8A)',
                fontSize: '0.875rem',
              }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                ↓ Scroll to explore
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* GENESIS SECTION */}
        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 2rem',
          }}
        >
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <ClearaPoeticText
              lines={[
                'It started with a question:',
                'Why does managing a chronic condition',
                'feel so lonely?',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.03, 0.08]}
              size="heading"
              align="left"
            />

            <ClearaPoeticText
              lines={[
                '125 million people worldwide live with psoriasis.',
                'Yet treatment adherence remains below 40%.',
                'The gap between clinical care and daily life is vast.',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.06, 0.10]}
              size="body"
              align="left"
              style={{ marginTop: '3rem' }}
            />

            <ClearaPoeticText
              lines={[
                'I set out to understand why—',
                'and to design something that could help.',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.08, 0.12]}
              size="body"
              align="left"
              style={{ marginTop: '2rem', fontStyle: 'italic' }}
            />
          </div>
        </section>

        {/* PROBLEM DEEP DIVE SECTION */}
        <section
          style={{
            minHeight: '120vh',
            padding: '8rem 2rem',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ClearaPoeticText
              lines={['The Broken Landscape']}
              scrollProgress={scrollState.progress}
              scrollRange={[0.11, 0.15]}
              size="display"
              align="center"
            />

            <ClearaPoeticText
              lines={[
                'Current psoriasis apps fail patients.',
                'Here\'s why:',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.13, 0.17]}
              size="body"
              align="center"
              style={{ marginTop: '1.5rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}
            />

            {/* Problem Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginTop: '4rem',
              }}
            >
              {[
                {
                  icon: Puzzle,
                  title: 'Fragmented Care',
                  problems: [
                    'Separate apps for tracking, meds, mental health',
                    'No holistic view of the patient journey',
                    'Data silos prevent meaningful insights',
                  ],
                  color: 'var(--cleara-lavender, #8B9DC3)',
                },
                {
                  icon: Building2,
                  title: 'Clinical, Not Human',
                  problems: [
                    'Medical jargon overwhelms patients',
                    'No emotional support integration',
                    'Designed for doctors, not daily life',
                  ],
                  color: 'var(--cleara-blush, #D4A5A5)',
                },
                {
                  icon: Clock,
                  title: 'Reactive, Not Predictive',
                  problems: [
                    'Only track after flare-ups occur',
                    'No early warning systems',
                    'Patients always playing catch-up',
                  ],
                  color: 'var(--cleara-sage, #A8C5B5)',
                },
                {
                  icon: TrendingDown,
                  title: 'The Adherence Cliff',
                  problems: [
                    '60% drop-off after first 30 days',
                    'No gamification or motivation',
                    'Generic reminders feel impersonal',
                  ],
                  color: 'var(--cleara-periwinkle, #B8C5E2)',
                },
              ].map((problem, index) => {
                const IconComponent = problem.icon;
                return (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: index * 0.12 }}
                  style={{
                    padding: '2rem',
                    background: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(42, 42, 42, 0.06)',
                    boxShadow: '0 4px 24px rgba(42, 42, 42, 0.06)',
                  }}
                >
                  <div
                    style={{
                      marginBottom: '1rem',
                    }}
                  >
                    <IconComponent size={32} color={problem.color} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="cleara-heading"
                    style={{
                      fontSize: '1.25rem',
                      color: problem.color,
                      marginBottom: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {problem.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {problem.problems.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--cleara-text-secondary, #4A4A4A)',
                          marginBottom: '0.5rem',
                          paddingLeft: '1.25rem',
                          position: 'relative',
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            color: 'var(--cleara-text-muted, #8A8A8A)',
                          }}
                        >
                          ×
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
              })}
            </div>

            {/* Transition text */}
            <ClearaPoeticText
              lines={[
                'Patients deserved better.',
                'So I listened.',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.16, 0.20]}
              size="body"
              align="center"
              style={{ marginTop: '4rem', fontStyle: 'italic' }}
            />
          </div>
        </section>

        {/* ================================================================= */}
        {/* ACT II: DISCOVERY (30-70%) */}
        {/* ================================================================= */}

        {/* RESEARCH SECTION */}
        <section
          style={{
            minHeight: '120vh',
            padding: '8rem 2rem',
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ClearaPoeticText
              lines={['The Research Journey']}
              scrollProgress={scrollState.progress}
              scrollRange={[0.19, 0.24]}
              size="display"
              align="center"
            />

            {/* Research Stats Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '2rem',
                marginTop: '5rem',
              }}
            >
              {[
                { number: '25', label: 'Patient interviews conducted over 6 months', color: 'var(--cleara-lavender, #8B9DC3)' },
                { number: '75+', label: 'Clinical studies analyzed for evidence base', color: 'var(--cleara-sage, #A8C5B5)' },
                { number: '18', label: 'Months of iterative design and validation', color: 'var(--cleara-blush, #D4A5A5)' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  style={{
                    padding: '2.5rem 2rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(42, 42, 42, 0.06)',
                    boxShadow: '0 4px 20px rgba(42, 42, 42, 0.06)',
                  }}
                >
                  <span
                    className="cleara-display"
                    style={{ fontSize: '3.5rem', color: stat.color, display: 'block' }}
                  >
                    {stat.number}
                  </span>
                  <p
                    className="cleara-body"
                    style={{
                      marginTop: '0.75rem',
                      color: 'var(--cleara-text-secondary, #4A4A4A)',
                      lineHeight: 1.5,
                    }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PERSONAS SECTION */}
        <section
          style={{
            minHeight: '140vh',
            padding: '8rem 2rem',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ClearaPoeticText
              lines={['Who We Designed For']}
              scrollProgress={scrollState.progress}
              scrollRange={[0.28, 0.33]}
              size="display"
              align="center"
            />

            <ClearaPoeticText
              lines={[
                'Three voices guided every design decision.',
                'Their stories became our north star.',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.31, 0.36]}
              size="body"
              align="center"
              style={{ marginTop: '1.5rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}
            />

            {/* Persona Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                marginTop: '5rem',
              }}
            >
              {PERSONAS.map((persona, index) => (
                <motion.div
                  key={persona.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: index * 0.2 }}
                  style={{
                    padding: '2.5rem',
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(42, 42, 42, 0.06)',
                    boxShadow: '0 8px 32px rgba(42, 42, 42, 0.08)',
                  }}
                >
                  {/* Avatar placeholder */}
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${persona.color}, rgba(255,255,255,0.5))`,
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      color: 'white',
                      fontWeight: 500,
                    }}
                  >
                    {persona.name[0]}
                  </div>

                  <h3
                    className="cleara-heading"
                    style={{
                      fontSize: '1.5rem',
                      color: 'var(--cleara-text-primary, #2A2A2A)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {persona.name}, {persona.age}
                  </h3>
                  <p
                    style={{
                      color: persona.color,
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      marginBottom: '1rem',
                    }}
                  >
                    {persona.occupation}
                  </p>

                  <blockquote
                    className="cleara-serif"
                    style={{
                      fontSize: '1.125rem',
                      fontStyle: 'italic',
                      color: 'var(--cleara-text-primary, #2A2A2A)',
                      marginBottom: '1.5rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {persona.quote}
                  </blockquote>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {persona.painPoints.map((point) => (
                      <li
                        key={point}
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--cleara-text-tertiary, #6A6A6A)',
                          marginBottom: '0.5rem',
                          paddingLeft: '1rem',
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            color: persona.color,
                          }}
                        >
                          •
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY INSIGHT */}
        <section
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 2rem',
          }}
        >
          <div style={{ maxWidth: '700px', textAlign: 'center' }}>
            <ClearaPoeticText
              lines={[
                'The core insight:',
                'Psoriasis is not just a skin condition.',
                'It is an emotional, social, and daily life challenge',
                'that requires holistic support.',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.38, 0.46]}
              size="heading"
              align="center"
              staggerDelay={0.18}
            />
          </div>
        </section>

        {/* DESIGN PROCESS TIMELINE */}
        <section
          style={{
            minHeight: '120vh',
            padding: '8rem 2rem',
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ClearaPoeticText
              lines={['The 18-Month Journey']}
              scrollProgress={scrollState.progress}
              scrollRange={[0.46, 0.51]}
              size="display"
              align="center"
            />

            <ClearaPoeticText
              lines={[
                'From first interview to final prototype.',
                'A story of listening, learning, and iteration.',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.48, 0.53]}
              size="body"
              align="center"
              style={{ marginTop: '1.5rem', maxWidth: '550px', marginLeft: 'auto', marginRight: 'auto' }}
            />

            {/* Timeline */}
            <div style={{ marginTop: '4rem', position: 'relative' }}>
              {/* Vertical line */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: 'linear-gradient(to bottom, var(--cleara-lavender, #8B9DC3), var(--cleara-sage, #A8C5B5))',
                  opacity: 0.3,
                  transform: 'translateX(-50%)',
                }}
              />

              {[
                {
                  phase: 'IMMERSION',
                  months: 'Months 1-3',
                  items: ['25 patient interviews', '12 dermatologist sessions', 'Competitive audit of 8 apps'],
                  color: 'var(--cleara-lavender, #8B9DC3)',
                  align: 'right' as const,
                },
                {
                  phase: 'IDEATION',
                  months: 'Months 4-8',
                  items: ['200+ concept sketches', '3 design directions explored', 'User testing Round 1 (n=15)'],
                  color: 'var(--cleara-blush, #D4A5A5)',
                  align: 'left' as const,
                },
                {
                  phase: 'ITERATION',
                  months: 'Months 9-14',
                  items: ['47 prototype versions', 'User testing Rounds 2-4', 'Clinical advisor feedback loops'],
                  color: 'var(--cleara-periwinkle, #B8C5E2)',
                  align: 'right' as const,
                },
                {
                  phase: 'REFINEMENT',
                  months: 'Months 15-18',
                  items: ['Visual design system finalized', 'AI model integration', 'Beta testing with 50 patients'],
                  color: 'var(--cleara-sage, #A8C5B5)',
                  align: 'left' as const,
                },
              ].map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: phase.align === 'left' ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  style={{
                    display: 'flex',
                    justifyContent: phase.align === 'left' ? 'flex-start' : 'flex-end',
                    paddingLeft: phase.align === 'left' ? 'calc(50% + 2rem)' : '0',
                    paddingRight: phase.align === 'right' ? 'calc(50% + 2rem)' : '0',
                    marginBottom: '3rem',
                    position: 'relative',
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '1.5rem',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: phase.color,
                      transform: 'translateX(-50%)',
                      boxShadow: `0 0 0 4px rgba(255,255,255,0.9), 0 0 20px ${phase.color}40`,
                    }}
                  />

                  <div
                    style={{
                      padding: '1.5rem 2rem',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(42, 42, 42, 0.06)',
                      maxWidth: '320px',
                      textAlign: phase.align,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: phase.color,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {phase.months}
                    </span>
                    <h4
                      className="cleara-heading"
                      style={{
                        fontSize: '1.25rem',
                        color: 'var(--cleara-text-primary, #2A2A2A)',
                        marginTop: '0.5rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {phase.phase}
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--cleara-text-secondary, #4A4A4A)',
                            marginBottom: '0.375rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* ACT III: IMPACT (70-100%) */}
        {/* ================================================================= */}

        {/* SOLUTION PREVIEW */}
        <section
          style={{
            minHeight: '100vh',
            padding: '8rem 2rem',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ClearaPoeticText
              lines={['The Solution']}
              scrollProgress={scrollState.progress}
              scrollRange={[0.54, 0.59]}
              size="display"
              align="center"
            />

            <ClearaPoeticText
              lines={[
                'An AI companion that understands',
                'the full picture of living with psoriasis.',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.56, 0.61]}
              size="body"
              align="center"
              style={{ marginTop: '1.5rem' }}
            />

            {/* Feature highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                marginTop: '4rem',
              }}
            >
              {[
                { title: 'AI PASI Scoring', desc: '33% more accurate than average dermatologist assessment' },
                { title: 'Predictive Alerts', desc: 'Flare-up prediction 3-5 days in advance' },
                { title: 'Mental Health', desc: 'Integrated mood tracking and stress management' },
                { title: 'Smart Reminders', desc: 'Adaptive medication scheduling that learns your patterns' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  style={{
                    padding: '1.75rem',
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(42, 42, 42, 0.05)',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--cleara-lavender, #8B9DC3)',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className="cleara-body"
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--cleara-text-secondary, #4A4A4A)',
                      lineHeight: 1.5,
                    }}
                  >
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI ARCHITECTURE EXPLAINER */}
        <section
          style={{
            minHeight: '140vh',
            padding: '8rem 2rem',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ClearaPoeticText
              lines={['How Cleara Thinks']}
              scrollProgress={scrollState.progress}
              scrollRange={[0.62, 0.68]}
              size="display"
              align="center"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="cleara-body"
              style={{
                textAlign: 'center',
                fontSize: '1.15rem',
                color: 'var(--cleara-text-secondary, #4A4A4A)',
                maxWidth: '600px',
                margin: '2rem auto 4rem',
                lineHeight: 1.7,
              }}
            >
              Making AI accessible: understanding the intelligence behind personalized psoriasis care.
            </motion.p>

            {/* Three AI Components */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* 1. PASI Scoring Engine */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8 }}
                style={{
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.55))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(139, 157, 195, 0.2)',
                  boxShadow: '0 8px 32px rgba(139, 157, 195, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'var(--cleara-lavender, #8B9DC3)',
                        color: 'white',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '1rem',
                      }}
                    >
                      PASI Scoring Engine
                    </div>
                    <h3
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'var(--cleara-text, #2A2A2A)',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
                      }}
                    >
                      33% More Accurate Than Dermatologist Assessment
                    </h3>
                    <p
                      className="cleara-body"
                      style={{
                        fontSize: '1rem',
                        color: 'var(--cleara-text-secondary, #4A4A4A)',
                        lineHeight: 1.65,
                      }}
                    >
                      Our computer vision model was trained on 50,000+ dermatologist-validated images.
                      It measures area coverage, redness, thickness, and scaling to generate a clinical-grade PASI score.
                    </p>
                  </div>

                  {/* Visual Flow Diagram */}
                  <div
                    style={{
                      flex: '1 1 280px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      padding: '1.5rem',
                      background: 'rgba(139, 157, 195, 0.08)',
                      borderRadius: '16px',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ marginBottom: '0.25rem' }}><Camera size={28} color="var(--cleara-lavender, #8B9DC3)" strokeWidth={1.5} /></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--cleara-text-secondary)', fontWeight: 500 }}>Your Photo</div>
                    </div>
                    <div style={{ fontSize: '1.25rem', color: 'var(--cleara-lavender)' }}>→</div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ marginBottom: '0.25rem' }}><Brain size={28} color="var(--cleara-lavender, #8B9DC3)" strokeWidth={1.5} /></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--cleara-text-secondary)', fontWeight: 500 }}>AI Analysis</div>
                    </div>
                    <div style={{ fontSize: '1.25rem', color: 'var(--cleara-lavender)' }}>→</div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ marginBottom: '0.25rem' }}><BarChart3 size={28} color="var(--cleara-lavender, #8B9DC3)" strokeWidth={1.5} /></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--cleara-text-secondary)', fontWeight: 500 }}>PASI Score</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2. Flare Prediction */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.15 }}
                style={{
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.55))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(168, 197, 181, 0.2)',
                  boxShadow: '0 8px 32px rgba(168, 197, 181, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'var(--cleara-sage, #A8C5B5)',
                        color: 'white',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '1rem',
                      }}
                    >
                      Flare Prediction
                    </div>
                    <h3
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'var(--cleara-text, #2A2A2A)',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
                      }}
                    >
                      3-5 Days Advance Warning
                    </h3>
                    <p
                      className="cleara-body"
                      style={{
                        fontSize: '1rem',
                        color: 'var(--cleara-text-secondary, #4A4A4A)',
                        lineHeight: 1.65,
                      }}
                    >
                      By analyzing patterns across sleep quality, stress levels, weather changes, and your personal history,
                      Cleara learns your unique triggers and warns you before flare-ups occur.
                    </p>
                  </div>

                  {/* Visual Flow Diagram */}
                  <div
                    style={{
                      flex: '1 1 280px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      padding: '1.5rem',
                      background: 'rgba(168, 197, 181, 0.08)',
                      borderRadius: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div><Moon size={20} color="var(--cleara-sage, #A8C5B5)" strokeWidth={1.5} /></div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--cleara-text-secondary)' }}>Sleep</div>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div><HeartPulse size={20} color="var(--cleara-sage, #A8C5B5)" strokeWidth={1.5} /></div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--cleara-text-secondary)' }}>Stress</div>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div><CloudRain size={20} color="var(--cleara-sage, #A8C5B5)" strokeWidth={1.5} /></div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--cleara-text-secondary)' }}>Weather</div>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div><TrendingUp size={20} color="var(--cleara-sage, #A8C5B5)" strokeWidth={1.5} /></div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--cleara-text-secondary)' }}>History</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--cleara-sage)' }}>↓</div>
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '0.75rem',
                        background: 'rgba(168, 197, 181, 0.15)',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: 'var(--cleara-text)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <AlertTriangle size={18} color="var(--cleara-sage, #A8C5B5)" strokeWidth={1.5} /> &quot;Flare likely in 3-5 days&quot;
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Human-in-the-Loop */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.55))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(212, 165, 165, 0.2)',
                  boxShadow: '0 8px 32px rgba(212, 165, 165, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'var(--cleara-blush, #D4A5A5)',
                        color: 'white',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '1rem',
                      }}
                    >
                      Human-in-the-Loop
                    </div>
                    <h3
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'var(--cleara-text, #2A2A2A)',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
                      }}
                    >
                      AI That Learns From You
                    </h3>
                    <p
                      className="cleara-body"
                      style={{
                        fontSize: '1rem',
                        color: 'var(--cleara-text-secondary, #4A4A4A)',
                        lineHeight: 1.65,
                      }}
                    >
                      Cleara never makes assumptions. Every suggestion can be confirmed, corrected, or dismissed.
                      Your feedback continuously refines the AI, making it more accurate over time.
                    </p>
                  </div>

                  {/* Visual Flow Diagram */}
                  <div
                    style={{
                      flex: '1 1 280px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      padding: '1.5rem',
                      background: 'rgba(212, 165, 165, 0.08)',
                      borderRadius: '16px',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ marginBottom: '0.25rem' }}><Bot size={28} color="var(--cleara-blush, #D4A5A5)" strokeWidth={1.5} /></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--cleara-text-secondary)', fontWeight: 500 }}>AI Suggests</div>
                    </div>
                    <div style={{ fontSize: '1.25rem', color: 'var(--cleara-blush)' }}>→</div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ marginBottom: '0.25rem' }}><MousePointerClick size={28} color="var(--cleara-blush, #D4A5A5)" strokeWidth={1.5} /></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--cleara-text-secondary)', fontWeight: 500 }}>You Confirm</div>
                    </div>
                    <div style={{ fontSize: '1.25rem', color: 'var(--cleara-blush)' }}>→</div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ marginBottom: '0.25rem' }}><BookOpen size={28} color="var(--cleara-blush, #D4A5A5)" strokeWidth={1.5} /></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--cleara-text-secondary)', fontWeight: 500 }}>AI Learns</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Privacy Note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                marginTop: '3rem',
                padding: '1.5rem 2rem',
                background: 'rgba(139, 157, 195, 0.06)',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <p
                className="cleara-body"
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--cleara-text-secondary, #4A4A4A)',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                }}
              >
                <Shield size={18} color="var(--cleara-lavender, #8B9DC3)" strokeWidth={1.5} /> <strong>Privacy First:</strong> All AI processing happens on-device. Your health data never leaves your phone
                unless you explicitly choose to share with your healthcare provider.
              </p>
            </motion.div>
          </div>
        </section>

        {/* RESULTS & METRICS */}
        <section
          style={{
            minHeight: '100vh',
            padding: '8rem 2rem',
            background: 'linear-gradient(180deg, rgba(139, 157, 195, 0.03) 0%, transparent 100%)',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ClearaPoeticText
              lines={['The Impact']}
              scrollProgress={scrollState.progress}
              scrollRange={[0.68, 0.74]}
              size="display"
              align="center"
            />

            {/* Key Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                marginTop: '4rem',
              }}
            >
              {[
                { value: '33%', label: 'More Accurate', sublabel: 'vs dermatologist assessment' },
                { value: '3-5', label: 'Days Warning', sublabel: 'before flare-ups' },
                { value: '72%', label: 'Adherence Rate', sublabel: 'vs 40% industry average' },
                { value: '4.8', label: 'User Rating', sublabel: 'from beta testing' },
                { value: '68%', label: 'Daily Active', sublabel: 'after 90 days' },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    padding: '2rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(139, 157, 195, 0.15)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      color: 'var(--cleara-lavender, #8B9DC3)',
                      fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                      lineHeight: 1,
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--cleara-text, #2A2A2A)',
                      marginTop: '0.5rem',
                    }}
                  >
                    {metric.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--cleara-text-secondary, #5A5A5A)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {metric.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonials */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                marginTop: '4rem',
              }}
            >
              {[
                {
                  quote: 'For the first time, I feel like someone understands my whole experience, not just my skin.',
                  name: 'Sarah',
                  detail: '34, beta tester',
                },
                {
                  quote: 'The flare predictions changed how I plan my life. I can actually prepare now.',
                  name: 'Marcus',
                  detail: '45, beta tester',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                  style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(139, 157, 195, 0.12)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1.5rem',
                      fontSize: '3rem',
                      color: 'var(--cleara-lavender, #8B9DC3)',
                      opacity: 0.2,
                      fontFamily: 'Georgia, serif',
                      lineHeight: 1,
                    }}
                  >
                    &ldquo;
                  </div>
                  <p
                    className="cleara-body"
                    style={{
                      fontSize: '1.1rem',
                      color: 'var(--cleara-text, #2A2A2A)',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      marginBottom: '1.5rem',
                      paddingTop: '1rem',
                    }}
                  >
                    {testimonial.quote}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'var(--cleara-lavender, #8B9DC3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                      }}
                    >
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--cleara-text)', fontSize: '0.95rem' }}>
                        {testimonial.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--cleara-text-secondary)' }}>
                        {testimonial.detail}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN SYSTEM SHOWCASE */}
        <section
          style={{
            minHeight: '100vh',
            padding: '8rem 2rem',
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ClearaPoeticText
              lines={['The Visual Language']}
              scrollProgress={scrollState.progress}
              scrollRange={[0.76, 0.82]}
              size="display"
              align="center"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="cleara-body"
              style={{
                textAlign: 'center',
                fontSize: '1.1rem',
                color: 'var(--cleara-text-secondary, #4A4A4A)',
                maxWidth: '550px',
                margin: '2rem auto 4rem',
                lineHeight: 1.7,
              }}
            >
              A design system built for healing—soft, warm, and human.
            </motion.p>

            {/* Color Palette */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7 }}
              style={{
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid rgba(42, 42, 42, 0.06)',
                marginBottom: '2rem',
              }}
            >
              <h4
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--cleara-text-secondary)',
                  marginBottom: '1.5rem',
                }}
              >
                Color System
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {[
                  { name: 'Lavender', hex: '#8B9DC3', meaning: 'Trust, calm, clinical' },
                  { name: 'Periwinkle', hex: '#B8C5E2', meaning: 'Softness, hope' },
                  { name: 'Blush', hex: '#D4A5A5', meaning: 'Warmth, humanity' },
                  { name: 'Sage', hex: '#A8C5B5', meaning: 'Growth, healing' },
                  { name: 'Cream', hex: '#FAF8F5', meaning: 'Canvas, clarity' },
                ].map((color) => (
                  <div key={color.name} style={{ flex: '1 1 150px', textAlign: 'center' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '60px',
                        background: color.hex,
                        borderRadius: '12px',
                        marginBottom: '0.75rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    />
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--cleara-text)' }}>
                      {color.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--cleara-text-secondary)', fontFamily: 'monospace' }}>
                      {color.hex}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--cleara-text-secondary)', marginTop: '0.25rem' }}>
                      {color.meaning}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid rgba(42, 42, 42, 0.06)',
                marginBottom: '2rem',
              }}
            >
              <h4
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--cleara-text-secondary)',
                  marginBottom: '1.5rem',
                }}
              >
                Typography
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
                      fontSize: '2rem',
                      fontWeight: 500,
                      color: 'var(--cleara-text)',
                    }}
                  >
                    Cormorant Garamond
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--cleara-text-secondary)' }}>
                    Display & poetic moments
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      color: 'var(--cleara-text)',
                    }}
                  >
                    Space Grotesk
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--cleara-text-secondary)' }}>
                    Headings & labels
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      color: 'var(--cleara-text)',
                    }}
                  >
                    DM Sans
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--cleara-text-secondary)' }}>
                    Body text & UI elements
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Glass Effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid rgba(42, 42, 42, 0.06)',
              }}
            >
              <h4
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--cleara-text-secondary)',
                  marginBottom: '1.5rem',
                }}
              >
                Glassmorphism System
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                {[
                  { blur: '8px', opacity: '50%', label: 'Subtle' },
                  { blur: '16px', opacity: '65%', label: 'Medium' },
                  { blur: '24px', opacity: '80%', label: 'Strong' },
                ].map((glass) => (
                  <div
                    key={glass.label}
                    style={{
                      padding: '1.5rem',
                      background: `rgba(255, 255, 255, ${parseInt(glass.opacity) / 100})`,
                      backdropFilter: `blur(${glass.blur})`,
                      borderRadius: '16px',
                      border: '1px solid rgba(139, 157, 195, 0.12)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--cleara-text)' }}>
                      {glass.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--cleara-text-secondary)', marginTop: '0.5rem' }}>
                      blur: {glass.blur}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--cleara-text-secondary)' }}>
                      opacity: {glass.opacity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Accessibility Note */}
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(168, 197, 181, 0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Check size={20} color="var(--cleara-sage, #A8C5B5)" strokeWidth={2} />
                <span style={{ fontSize: '0.85rem', color: 'var(--cleara-text-secondary)' }}>
                  <strong>WCAG 2.1 AA Compliant</strong> — All color combinations meet minimum contrast requirements
                </span>
              </div>
            </motion.div>

            {/* Interactive Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                marginTop: '4rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  padding: '2rem',
                }}
              >
                {/* Watercolor glow behind phone */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    background: `radial-gradient(ellipse at center,
                      rgba(139, 157, 195, 0.15) 0%,
                      rgba(184, 197, 226, 0.1) 30%,
                      transparent 70%
                    )`,
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                    zIndex: -1,
                  }}
                />
                <ClearaPhoneMockup scale={0.85} />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="cleara-body"
              style={{
                textAlign: 'center',
                fontSize: '0.9rem',
                color: 'var(--cleara-text-secondary, #4A4A4A)',
                marginTop: '2rem',
                fontStyle: 'italic',
              }}
            >
              Tap to explore the interactive prototype
            </motion.p>
          </div>
        </section>

        {/* CLOSING */}
        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 2rem',
          }}
        >
          <div style={{ maxWidth: '700px', textAlign: 'center' }}>
            <ClearaPoeticText
              lines={[
                'Healing is not a destination.',
                'It is a daily practice,',
                'a gentle unfolding,',
                'a clearing of the path ahead.',
              ]}
              scrollProgress={scrollState.progress}
              scrollRange={[0.84, 0.94]}
              size="heading"
              align="center"
              staggerDelay={0.22}
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{ marginTop: '4rem' }}
            >
              <a
                href="/work"
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  background: 'var(--cleara-lavender, #8B9DC3)',
                  color: 'white',
                  borderRadius: '100px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 157, 195, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                View More Work
              </a>
            </motion.div>
          </div>
        </section>

        {/* Debug: Scroll Progress Indicator (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              padding: '1rem 1.25rem',
              background: 'rgba(0,0,0,0.85)',
              color: 'white',
              borderRadius: '12px',
              fontFamily: 'monospace',
              fontSize: '11px',
              zIndex: 9999,
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ marginBottom: '0.25rem' }}>
              Progress: <span style={{ color: '#8B9DC3' }}>{(scrollState.progress * 100).toFixed(1)}%</span>
            </div>
            <div style={{ marginBottom: '0.25rem' }}>
              Act: <span style={{ color: scrollState.act === 'empathy' ? '#D4A5A5' : scrollState.act === 'discovery' ? '#8B9DC3' : '#A8C5B5' }}>{scrollState.act}</span>
            </div>
            <div>
              Images: <span style={{ color: IMAGES_READY ? '#A8C5B5' : '#D4A5A5' }}>{IMAGES_READY ? 'Ready' : 'Pending'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClearaCase;
