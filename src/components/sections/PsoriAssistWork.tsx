'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Camera, Brain, Heart, Activity, Users, TrendingUp, Target, Award,
  ChevronDown, ChevronUp, ArrowLeft, Circle, Hexagon, Grid3X3,
  Home as HomeIcon, CheckCircle, AlertCircle, Zap,
  type LucideIcon
} from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { FlipCard } from '@/components/ui/FlipCard';
import { TimelineVisualization } from '@/components/ui/TimelineVisualization';
import { usePsoriAssistNarrative } from '@/hooks/usePsoriAssistNarrative';
import { PsoriAssistFirstPersonMoments } from '@/components/sections/PsoriAssistFirstPersonMoments';
import { PsoriAssistBreathingMoment } from '@/components/sections/PsoriAssistBreathingMoment';
import {
  GhostOverlayDemo,
  SmartReminderDemo,
  PASIScoringDemo
} from '@/components/sections/PsoriAssistInteractivePrototypes';
import { PsoriAssistPhoneMockup } from '@/components/sections/PsoriAssistPhoneMockup';
import {
  ProgressiveBarChart,
  ProgressiveRadialChart,
  ProgressiveCounter,
  ProgressiveStatsGrid,
} from '@/components/ui/ProgressiveDataReveal';

interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
  icon: LucideIcon;
  color: string;
}

interface PersonaCard {
  name: string;
  age: number;
  role: string;
  severity: string;
  techSavvy: string;
  quote: string;
  goals: string[];
  frustrations: string[];
  color: string;
}

interface FeatureCard {
  id: string;
  priority: 'MUST' | 'SHOULD' | 'COULD';
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  technical?: string;
  color: string;
}

interface TestingRound {
  round: string;
  participants: number;
  taskCompletion: string;
  keyFinding: string;
  iteration: string;
}

export function PsoriAssistWork() {
  const [inView, setInView] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredMetaCard, setHoveredMetaCard] = useState<number | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null);
  const [hoveredOtherProject, setHoveredOtherProject] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Narrative progression system
  const narrativeState = usePsoriAssistNarrative();

  // Section navigation for scroll progress
  const sections = [
    { id: 'hero', label: 'Overview' },
    { id: 'genesis', label: 'Genesis' },
    { id: 'stakeholders', label: 'Stakeholders' },
    { id: 'research', label: 'Research' },
    { id: 'competitors', label: 'Landscape' },
    { id: 'problem', label: 'Problem' },
    { id: 'principles', label: 'Principles' },
    { id: 'personas', label: 'Personas' },
    { id: 'process', label: 'Process' },
    { id: 'features', label: 'Features' },
    { id: 'design-system', label: 'Design System' },
    { id: 'flows', label: 'Flows' },
    { id: 'testing', label: 'Testing' },
    { id: 'technical', label: 'Technical' },
    { id: 'impact', label: 'Impact' },
    { id: 'learnings', label: 'Learnings' },
    { id: 'roadmap', label: 'Roadmap' }
  ];

  const otherProjects = [
    {
      id: 1,
      icon: Target,
      title: 'Air India',
      category: 'Systems & Innovation',
      description: 'Design systems, analytics dashboards, and hackathon wins for 450+ daily users.',
      year: '2023-2024',
      href: '/work/air-india' as const,
      orbColor: '218, 14, 41'
    },
    {
      id: 2,
      icon: Hexagon,
      title: 'Latent Space',
      category: 'Speculative Design',
      description: 'Critical design exploration of dream technology ethics and consciousness data.',
      year: '2024',
      href: '/work/latent-space' as const,
      orbColor: '140, 100, 255'
    },
    {
      id: 3,
      icon: Grid3X3,
      title: 'Metamorphic Fractal Reflections',
      category: 'Immersive Installation',
      description: 'Psychedelic journey installation exploring consciousness through ego dissolution.',
      year: '2023',
      href: '/work/metamorphic-fractal-reflections' as const,
      orbColor: '50, 200, 150'
    },
    {
      id: 4,
      icon: HomeIcon,
      title: 'Living Organism',
      category: 'Meta Design',
      description: 'This portfolio - architected to feel like a living, breathing organism.',
      year: '2024',
      href: '/' as const,
      orbColor: '255, 255, 255'
    }
  ] as const;

  const stats: StatItem[] = [
    {
      value: '125M',
      label: 'Global Patients',
      sublabel: '$27.20B treatment market',
      icon: Users,
      color: '74, 144, 226'
    },
    {
      value: '18 mo',
      label: 'Design Concept',
      sublabel: 'With clinical validation',
      icon: Target,
      color: '80, 200, 120'
    },
    {
      value: '33%',
      label: 'Better AI PASI',
      sublabel: 'vs. average dermatologist',
      icon: Brain,
      color: '168, 85, 247'
    },
    {
      value: '$38M',
      label: 'Year 5 Revenue',
      sublabel: '2M patients served',
      icon: TrendingUp,
      color: '251, 191, 36'
    }
  ];

  const personas: PersonaCard[] = [
    {
      name: 'Sarah',
      age: 34,
      role: 'Marketing Manager',
      severity: 'Moderate (BSA 6%)',
      techSavvy: 'High (fitness apps, wearables)',
      quote: "I'm so busy that I forget to apply my creams until I'm already in bed",
      goals: ['Streamline treatment routine', 'Understand triggers', 'Avoid escalation to biologics'],
      frustrations: ['Complicated medication schedule', 'Social anxiety about visible lesions at work', 'Lack of progress visibility'],
      color: '74, 144, 226'
    },
    {
      name: 'Marcus',
      age: 52,
      role: 'Construction Foreman',
      severity: 'Severe (BSA 15%) + undiagnosed PsA',
      techSavvy: 'Low-moderate (basic smartphone)',
      quote: "I've had psoriasis for 20 years—another app won't cure me",
      goals: ['Document treatment efficacy objectively', 'Manage worsening joint pain', 'Maintain work capacity despite challenges'],
      frustrations: ['Apps too complicated', 'Skepticism about digital health value', 'Joint pain dismissed as "just aging"'],
      color: '239, 68, 68'
    },
    {
      name: 'Priya',
      age: 28,
      role: 'Yoga Instructor',
      severity: 'Mild (BSA 2.5%)',
      techSavvy: 'Very high (quantified self enthusiast)',
      quote: "I want to understand my body's patterns and optimize naturally before resorting to medications",
      goals: ['Identify lifestyle triggers and patterns', 'Minimize medication use through optimization', 'Track holistically (diet, stress, sleep, symptoms)'],
      frustrations: ['Existing apps too simplistic', 'No data analytics or advanced insights', 'Disconnected from other health tracking'],
      color: '80, 200, 120'
    }
  ];

  const features: FeatureCard[] = [
    {
      id: 'ghost-overlay',
      priority: 'MUST',
      icon: Camera,
      title: 'Ghost Overlay Innovation',
      subtitle: 'Proprietary photo alignment technology',
      description: 'Superimposes previous photos at 50% opacity for perfect alignment and accurate progress tracking',
      details: [
        'Enables consistent photo positioning across weeks/months',
        'Alignment guides with 3x3 grid and opacity slider (20-80%)',
        'Haptic feedback on successful capture',
        '2-5 minute PASI processing with push notification',
        'Solves the "phone gallery chaos" problem'
      ],
      technical: 'Computer vision using DenseNet-201 pre-trained on ImageNet, fine-tuned on 50,000+ annotated psoriasis images',
      color: '74, 144, 226'
    },
    {
      id: 'ai-pasi',
      priority: 'MUST',
      icon: Brain,
      title: 'AI PASI Scoring',
      subtitle: 'Clinical-grade automated assessment',
      description: 'CNN-based multi-output regression scoring erythema, induration, desquamation, and area affected',
      details: [
        'Performance: MAE <2.5, ICC >0.85 vs. dermatologist ground truth',
        '33% better accuracy than average dermatologist',
        'Saves 5-7 minutes per manual PASI calculation',
        'Visual breakdown of sub-scores (0-4 scale)',
        'Answers "Am I actually getting better?" with objective data'
      ],
      technical: 'Stage 1: U-Net lesion segmentation. Stage 2: EfficientNetB3 multi-output regression heads',
      color: '168, 85, 247'
    },
    {
      id: 'medication-reminders',
      priority: 'MUST',
      icon: CheckCircle,
      title: 'Smart Medication Reminders',
      subtitle: 'Context-aware adherence system with gamification',
      description: 'Learns from user patterns, adapts timing, and celebrates milestones to improve 40-50% baseline adherence',
      details: [
        'Smart scheduling learns from user response patterns',
        'Location-based prompts (remind when home)',
        'Time-of-day optimization based on historical adherence',
        'Gamification: Streak tracking (7, 30, 90-day milestones), achievement badges',
        'Automated MPR (Medication Possession Ratio) calculation for providers'
      ],
      technical: 'Local notification scheduling with geofencing, behavioral pattern ML for optimal timing',
      color: '80, 200, 120'
    },
    {
      id: 'mental-health',
      priority: 'MUST',
      icon: Heart,
      title: 'Mental Health Screening',
      subtitle: 'Integrated PHQ-9/GAD-7 with crisis support',
      description: 'Quarterly wellness check-ins addressing the 20-30% depression prevalence rarely screened in dermatology',
      details: [
        'PHQ-9 (depression) and GAD-7 (anxiety) validated assessments',
        'Automatic categorization: minimal, mild, moderate, severe',
        'Score ≥10: Resource screen with mental health resources, provider notification option',
        'Score ≥15: URGENT alert, crisis hotline (988) tap-to-call, telepsychology referral',
        'Encrypted storage, user controls sharing with providers'
      ],
      technical: 'HIPAA-compliant data handling, de-identification for analytics, 7-year retention for clinical records',
      color: '236, 72, 153'
    },
    {
      id: 'psa-screening',
      priority: 'MUST',
      icon: Activity,
      title: 'Early PsA Detection',
      subtitle: 'Automated PEST screening for joint involvement',
      description: 'Quarterly screening to reduce the 2.5-year median diagnosis delay that causes irreversible joint damage',
      details: [
        '30-40% of psoriasis patients develop PsA, 15.5% undiagnosed',
        'PEST (Psoriasis Epidemiology Screening Tool): 5 questions',
        'Sensitivity 0.74, Specificity 0.83',
        'Positive screen triggers: Alert patient + provider, rheumatology referral suggestion',
        'Prevents 50% of cases from presenting with irreversible damage'
      ],
      technical: 'Validated screening implementation, unchanged 2.5yr delay 2000-2017 addressed through systematic deployment',
      color: '239, 68, 68'
    },
    {
      id: 'provider-export',
      priority: 'MUST',
      icon: Target,
      title: 'Provider Report Export',
      subtitle: 'Comprehensive visit summaries',
      description: 'PDF generation with photo timelines, PASI trends, adherence metrics, mental health & PsA screening',
      details: [
        'Customizable date range and section selection',
        'Includes: Photo progression, PASI chart, adherence stats, screening scores',
        'Email, print, or direct portal upload',
        'Saves patients 15-20 minutes explaining status at appointments',
        'Enables more productive 12-15 minute visits'
      ],
      technical: 'PDF generation via React-PDF, AES-256 encrypted transfers, audit logging',
      color: '74, 144, 226'
    },
    {
      id: 'trigger-tracking',
      priority: 'SHOULD',
      icon: TrendingUp,
      title: 'Multi-Modal Trigger Tracking',
      subtitle: 'Automated correlations with predictive insights',
      description: 'Combines manual entry with automatic integrations to identify personalized flare-up triggers',
      details: [
        'Manual: Food diary, stress level (1-10), sleep duration, medications',
        'Automatic: Weather API (temp, humidity, UV, barometric pressure), wearable sync (sleep quality)',
        'Calendar sync: Identifies high-stress periods automatically',
        'Spearman correlation analysis: Statistical relationships with p-values',
        'Visual: Heat maps, scatter plots, strength indicators'
      ],
      technical: 'OpenWeatherMap API, Apple Health/Google Fit SDK integration, correlation engine with significance testing',
      color: '251, 191, 36'
    },
    {
      id: 'educational-library',
      priority: 'SHOULD',
      icon: Brain,
      title: 'Educational Content Library',
      subtitle: 'Curated, dermatologist-reviewed resources',
      description: 'Personalized educational content adapting to severity, treatment type, and user engagement',
      details: [
        'Categories: Basics, Treatments, Lifestyle, Mental Health, PsA',
        'Formats: Articles, videos, infographics, webinars',
        'All content dermatologist-reviewed for accuracy',
        'Personalization engine: Curated based on severity, current treatment, interaction history',
        'Progress tracking: "Knowledge milestones" for patient empowerment'
      ],
      technical: 'Content CMS with versioning, recommendation algorithm based on collaborative filtering',
      color: '168, 85, 247'
    },
    {
      id: 'community-forum',
      priority: 'SHOULD',
      icon: Users,
      title: 'Moderated Community Forum',
      subtitle: 'Safe peer support with expert participation',
      description: 'Pseudonymous community reducing stigma while maintaining safety through AI + human moderation',
      details: [
        'Structure: Topic discussions, success stories, Q&A',
        'AI toxicity detection + human review for misinformation',
        'Pseudonymous profiles, optional photo sharing with consent',
        'Expert participation: Monthly dermatologist AMAs',
        'Reporting system: Community-driven flagging with moderator review'
      ],
      technical: 'Perspective API for toxicity, content moderation queue, encrypted user identities',
      color: '80, 200, 120'
    },
    {
      id: 'predictive-alerts',
      priority: 'COULD',
      icon: Zap,
      title: 'Predictive Flare-Up Alerts',
      subtitle: '7-day probability forecasting using LSTM',
      description: 'Machine learning model provides proactive risk warnings based on 14-day historical patterns',
      details: [
        'Inputs: PASI trends, symptoms, triggers, weather, adherence, sleep data',
        'Output: Low/Medium/High risk probability for next 7 days',
        'Accuracy target: 80%+ sensitivity and specificity',
        'SHAP explainability: "High risk due to: cold weather + missed applications + elevated stress"',
        'Shifts from reactive tracking to proactive prevention'
      ],
      technical: 'LSTM architecture: 2 layers (128 + 64 units), Dropout 0.2, Dense 32 units, Sigmoid output',
      color: '251, 191, 36'
    },
    {
      id: 'provider-portal',
      priority: 'COULD',
      icon: Target,
      title: 'Provider Dashboard',
      subtitle: 'Remote patient monitoring web portal',
      description: 'HIPAA-compliant dashboard enabling dermatologists to monitor patients between visits and bill via RPM codes',
      details: [
        'Patient panel view with status indicators (flare risk, positive screens)',
        'Individual patient: PASI trends, adherence metrics (30/60/90-day rolling), secure messaging',
        'Alert system: High flare risk, positive mental health screen (PHQ-9 ≥10), positive PsA screen',
        'Enables billing via CPT codes 99457, 99458 ($40-60 per patient per month)',
        'Saves 5-8 minutes per visit + generates new revenue stream'
      ],
      technical: 'Node.js + Express backend, PostgreSQL primary database, Real-time updates via WebSockets (Socket.io)',
      color: '80, 200, 120'
    },
    {
      id: 'treatment-comparison',
      priority: 'COULD',
      icon: TrendingUp,
      title: 'Treatment A/B Comparison',
      subtitle: 'Evidence-based treatment decision support',
      description: 'Compare two treatment regimens side-by-side to support informed shared decision-making',
      details: [
        'Metrics compared: PASI improvement, adherence rate, side effects frequency, cost analysis',
        'Visual: Before/after photos, statistical significance testing (t-tests, confidence intervals)',
        'Use case: Deciding between topicals vs. biologics, or comparing biologic options',
        'Provider collaboration: Share comparison with dermatologist for consultation',
        'Export as PDF for insurance prior authorization'
      ],
      technical: 'Statistical analysis library (Welch\'s t-test), data visualization with Recharts',
      color: '74, 144, 226'
    }
  ];

  const testingRounds: TestingRound[] = [
    {
      round: 'Round 1: Low-Fidelity',
      participants: 15,
      taskCompletion: '73%',
      keyFinding: 'Trigger tracking overwhelmed users with too many options',
      iteration: 'Simplified to preset categories (food, stress, sleep, weather) + custom entry'
    },
    {
      round: 'Round 2: Interactive Prototype',
      participants: 15,
      taskCompletion: '87%',
      keyFinding: 'Ghost overlay concept received enthusiastically: "This is genius!"',
      iteration: 'Added alignment guides, confirmation screen with retake option'
    },
    {
      round: 'Round 3: Beta App',
      participants: 15,
      taskCompletion: '93%',
      keyFinding: 'Photo upload intimidating for older users (Marcus persona)',
      iteration: 'Added tutorial video, optional skip, simplified first-time flow'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        fontFamily: 'var(--font-manrope)',
        minHeight: '100vh',
        color: '#FFFFFF',
        padding: '0 2rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Scroll Progress Indicator */}
      {!isMobile && <ScrollProgress sections={sections} color="74, 144, 226" />}

      {/* Layer 1: Base Mesh Gradient */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: -4,
          background: `
            radial-gradient(circle at 25% 40%, rgba(74, 144, 226, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 75% 60%, rgba(168, 85, 247, 0.10) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
          `
        }}
      />

      {/* Layer 2: Narrative Atmosphere (Enhanced) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: -3,
          background: `radial-gradient(ellipse at 50% 50%, ${narrativeState.color.atmosphere}, transparent 70%)`,
          opacity: 0.6,
          transition: 'background 2s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Layer 3: Vignette Effect */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: -2,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      />

      {/* Layer 4: Mouse-Tracked Orb (Enhanced) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1,
          background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(74, 144, 226, 0.10) 0%, transparent 50%)`,
          transition: 'background 0.3s ease-out'
        }}
      />

      {/* Patient Perspective Moments */}
      <PsoriAssistFirstPersonMoments />
      {/* Hero - Full Viewport */}
      <section
        id="hero"
        style={{
          minHeight: isMobile ? 'calc(100vh - 48px)' : '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: isMobile ? '2rem 1rem 2rem' : '3rem 2rem 3rem',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* Centered Hero Content */}
        <div style={{
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            backgroundColor: 'rgba(74, 144, 226, 0.1)',
            border: '1px solid rgba(74, 144, 226, 0.2)',
            color: 'rgb(74, 144, 226)',
            fontSize: '0.8rem',
            fontWeight: '500',
            letterSpacing: '0.02em'
          }}>
            Digital Health · AI/ML · 18 Months
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: isMobile ? '2rem' : '4rem',
            fontWeight: '200',
            letterSpacing: '-0.02em',
            marginBottom: '0',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            PsoriAssist
          </h1>

          {/* Description */}
          <p style={{
            fontSize: isMobile ? '1.125rem' : '1.375rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '0',
            maxWidth: '800px',
            lineHeight: '1.6'
          }}>
            Reimagining psoriasis care through AI-powered digital therapeutics. An 18-month design concept addressing treatment adherence, mental health integration, and early comorbidity detection for 125 million patients globally.
          </p>

          {/* Hero CTAs - Centered */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => {
                const section = document.getElementById('interactive-prototypes');
                section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                borderRadius: '16px',
                background: 'rgba(218, 14, 41, 0.15)',
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                border: '1px solid rgba(218, 14, 41, 0.3)',
                color: '#DA0E29',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(218, 14, 41, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(218, 14, 41, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View Interactive Prototypes
            </button>
            <button
              onClick={() => {
                const section = document.getElementById('research');
                section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                borderRadius: '16px',
                background: 'rgba(15, 15, 15, 0.65)',
                backdropFilter: 'blur(120px) saturate(180%)',
                WebkitBackdropFilter: 'blur(120px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(18, 18, 18, 0.75)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(15, 15, 15, 0.65)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Read Research
            </button>
          </div>

          {/* Meta Cards - Compact & Centered */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '600px'
          }}>
            {[
              { label: '18 Months', icon: '⏱️' },
              { label: 'iOS · Android · Web', icon: '📱' }
            ].map((item, i) => {
              const isHovered = hoveredMetaCard === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredMetaCard(i)}
                  onMouseLeave={() => setHoveredMetaCard(null)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '16px',
                    background: isHovered ? 'rgba(18, 18, 18, 0.75)' : 'rgba(15, 15, 15, 0.65)',
                    backdropFilter: 'blur(120px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(120px) saturate(180%)',
                    border: isHovered ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: isHovered
                      ? `0px 20px 56px rgba(0, 0, 0, 0.8),
                         0px 0px 1px rgba(255, 255, 255, 0.4) inset,
                         0px -1px 0px rgba(255, 255, 255, 0.12) inset`
                      : `0px 16px 48px rgba(0, 0, 0, 0.6),
                         0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                         0px -1px 0px rgba(255, 255, 255, 0.08) inset`,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    cursor: 'default',
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Tags - Centered */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            maxWidth: '700px'
          }}>
            {['AI/ML', 'Digital Health', 'Clinical Validation', 'iOS 17', 'HIPAA', 'React Native'].map((tag, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  padding: '0.375rem 0.875rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(60px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(60px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  letterSpacing: '0.02em'
                }}
              >
                #{tag.replace(/\s+/g, '-')}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - Absolute Bottom-Center */}
        <div
          onClick={() => {
            const section = document.getElementById('stats');
            section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          style={{
            position: 'fixed',
            bottom: isMobile ? '2rem' : '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'bounce 2s infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) translateY(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) translateY(0)';
          }}
        >
          <span style={{
            fontSize: '0.7rem',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: '500'
          }}>
            Scroll to Explore
          </span>
          <ChevronDown size={18} style={{ color: 'rgba(74, 144, 226, 0.6)' }} />
        </div>
      </section>

      {/* Stats - Progressive Reveal */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 8rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '1.5rem'
        }}>
          {[
            { value: 125, label: 'Global Patients', sublabel: '$27.20B treatment market', suffix: 'M', icon: Users, color: '74, 144, 226' },
            { value: 18, label: 'Design Concept', sublabel: 'With clinical validation', suffix: ' mo', icon: Target, color: '80, 200, 120' },
            { value: 33, label: 'Better AI PASI', sublabel: 'vs. average dermatologist', suffix: '%', icon: Brain, color: '168, 85, 247' },
            { value: 38, label: 'Year 5 Revenue', sublabel: '2M patients served', prefix: '$', suffix: 'M', icon: TrendingUp, color: '251, 191, 36' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                style={{
                  padding: '2rem 1.5rem',
                  borderRadius: '24px',
                  background: isHovered ? 'rgba(18, 18, 18, 0.75)' : 'rgba(15, 15, 15, 0.65)',
                  backdropFilter: 'blur(120px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(120px) saturate(180%)',
                  border: isHovered ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: isHovered
                    ? `0px 20px 56px rgba(0, 0, 0, 0.8),
                       0px 0px 1px rgba(255, 255, 255, 0.4) inset,
                       0px -1px 0px rgba(255, 255, 255, 0.12) inset,
                       0px 0px 40px rgba(${stat.color}, 0.2)`
                    : `0px 16px 48px rgba(0, 0, 0, 0.6),
                       0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                       0px -1px 0px rgba(255, 255, 255, 0.08) inset`,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: `rgba(${stat.color}, 0.15)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                  transition: 'transform 0.4s ease'
                }}>
                  <Icon size={24} color={`rgb(${stat.color})`} />
                </div>
                <ProgressiveCounter
                  value={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2}
                  decimals={0}
                />
                {stat.sublabel && (
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.5rem' }}>
                    {stat.sublabel}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Genesis */}
      <div id="genesis" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <div style={{
          padding: isMobile ? '2rem 1.5rem' : '3rem 3rem',
          borderRadius: '32px',
          background: 'rgba(15, 15, 15, 0.65)',
          backdropFilter: 'blur(120px) saturate(180%)',
          WebkitBackdropFilter: 'blur(120px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: `0px 16px 48px rgba(0, 0, 0, 0.6),
                      0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                      0px -1px 0px rgba(255, 255, 255, 0.08) inset`
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : '2.5rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            The Genesis: Personal Experience as Research
          </h2>

          {/* Personal Journey Timeline */}
          <div style={{ marginBottom: '2rem' }}>
            <TimelineVisualization
              items={[
                {
                  id: 'diagnosis',
                  title: 'Late Twenties',
                  description: 'First patches appear, beginning of psoriasis journey',
                  color: '74, 144, 226',
                  completed: true
                },
                {
                  id: 'topicals',
                  title: 'Topical Steroids',
                  description: 'Complex medication routines, adherence challenges',
                  color: '239, 68, 68',
                  completed: true
                },
                {
                  id: 'mental-health',
                  title: 'Mental Health Impact',
                  description: '5+ years of treatment, zero mental health screening from providers',
                  color: '236, 72, 153',
                  completed: true
                },
                {
                  id: 'biologics',
                  title: 'Biologic Treatment',
                  description: 'Escalation to advanced therapies, joint pain emerges',
                  color: '251, 191, 36',
                  completed: true
                },
                {
                  id: 'psa-diagnosis',
                  title: '18 Months Later',
                  description: 'PsA diagnosis after seeing 3 specialists',
                  color: '80, 200, 120',
                  completed: true
                }
              ]}
              orientation="horizontal"
              animate={true}
            />
          </div>
          <div style={{
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              My journey with psoriasis began in my late twenties. What started as a few patches evolved into a constant companion that shaped how I dressed, socialized, and thought about myself. Through years of treatment—from topical steroids to biologics—I noticed critical gaps:
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              {[
                {
                  title: 'The Paper Trail Problem',
                  desc: 'My dermatologist would ask, "How\'s your skin been?" and I\'d struggle to remember. My phone had hundreds of unorganized photos.',
                  color: '74, 144, 226'
                },
                {
                  title: 'The Adherence Struggle',
                  desc: 'Despite knowing I should apply creams twice daily, I\'d forget constantly. By 11 PM, I\'d rationalize skipping it.',
                  color: '239, 68, 68'
                },
                {
                  title: 'The Mental Health Silence',
                  desc: 'In 5+ years of treatment, not once did a provider ask about my mental health. Yet the impact on my confidence was profound.',
                  color: '236, 72, 153'
                },
                {
                  title: 'The Joint Pain Mystery',
                  desc: 'When I started experiencing joint stiffness, it took 18 months and three specialists before someone connected it to psoriasis.',
                  color: '251, 191, 36'
                }
              ].map((gap, i) => (
                <div key={i} style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  backgroundColor: `rgba(${gap.color}, 0.05)`,
                  border: `1px solid rgba(${gap.color}, 0.2)`
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    color: `rgb(${gap.color})`,
                    marginBottom: '0.75rem'
                  }}>
                    {gap.title}
                  </h4>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0
                  }}>
                    {gap.desc}
                  </p>
                </div>
              ))}
            </div>

            <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.8)' }}>
              These personal pain points became the foundation for systematic research.
            </p>
          </div>
        </div>
      </div>

      {/* Breathing Moment 1: After Genesis */}
      <PsoriAssistBreathingMoment
        text="Take a breath. This is where empathy begins."
        color="236, 72, 153"
        duration={3500}
      />

      {/* Stakeholder Perspectives */}
      <div id="stakeholders" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Stakeholder Perspectives
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          Clinical insights from 8 dermatologists and 4 rheumatologists
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem'
        }}>
          {/* Dermatologists */}
          <div style={{
            padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
            borderRadius: '24px',
            backgroundColor: 'rgba(168, 85, 247, 0.03)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'rgba(168, 85, 247, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Activity size={28} color="rgb(168, 85, 247)" />
            </div>
            <h3 style={{
              fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1rem',
              color: 'rgba(255, 255, 255, 0.95)'
            }}>
              Dermatologists (n=8)
            </h3>
            <div style={{
              padding: '1.5rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderLeft: '3px solid rgb(168, 85, 247)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              "If I could pull up a chart showing their medication adherence, PASI trends, trigger patterns... that would be a game-changer. Right now, I'm flying blind."
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                — Dr. Sarah Johnson, Board-Certified Dermatologist
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {[
                'Time constraints: 12-15 min average visit',
                'PASI scoring: 5-7 minutes if done properly',
                'Poor adherence data: "Patients tell me they\'re applying it..."',
                'No real-time monitoring between 3-month visits',
                'Minimal mental health screening capacity'
              ].map((pain, i) => (
                <div key={i} style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  paddingLeft: '1.25rem',
                  position: 'relative',
                  lineHeight: '1.6'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'rgb(168, 85, 247)'
                  }}>
                    •
                  </span>
                  {pain}
                </div>
              ))}
            </div>
          </div>

          {/* Rheumatologists */}
          <div style={{
            padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
            borderRadius: '24px',
            backgroundColor: 'rgba(239, 68, 68, 0.03)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <AlertCircle size={28} color="rgb(239, 68, 68)" />
            </div>
            <h3 style={{
              fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1rem',
              color: 'rgba(255, 255, 255, 0.95)'
            }}>
              Rheumatologists (n=4)
            </h3>
            <div style={{
              padding: '1.5rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '500',
                color: 'rgb(239, 68, 68)',
                marginBottom: '0.5rem'
              }}>
                2.5 years
              </div>
              <div style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>
                Average PsA Diagnostic Delay
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginTop: '0.5rem'
              }}>
                Unchanged from 2000-2017
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {[
                'Late referrals from dermatology',
                '50% present with irreversible joint damage',
                'Poor inter-specialty communication',
                'Need systematic PsA screening in derm settings'
              ].map((insight, i) => (
                <div key={i} style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  paddingLeft: '1.25rem',
                  position: 'relative',
                  lineHeight: '1.6'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: 'rgb(239, 68, 68)'
                  }}>
                    •
                  </span>
                  {insight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Research Discovery */}
      <div id="research" style={{ maxWidth: '1400px', margin: '0 auto 7rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Research & Discovery
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          25 patient interviews · 12 stakeholder interviews · 75+ studies reviewed · 15 apps analyzed
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem'
        }}>
          {[
            {
              stat: '68%',
              label: 'Treatment Burden',
              quote: '"I have 4 different creams, and I can never remember which one goes where. By the time I figure it out, 20 minutes have passed."',
              author: '— Sarah, 34, Moderate severity',
              insight: '68% reported missing applications at least weekly. Average routine: 25-40 minutes daily.',
              color: '74, 144, 226'
            },
            {
              stat: '76%',
              label: 'Emotional Impact',
              quote: '"I canceled my beach wedding because I didn\'t want people staring at my arms in photos forever."',
              author: '— Marcus, 29, Severe',
              insight: '84% experienced embarrassment/shame. Relationships affected: 48% romantic, 36% professional, 52% friendships.',
              color: '239, 68, 68'
            },
            {
              stat: '92%',
              label: 'Tracking Challenges',
              quote: '"I can\'t tell if I\'m actually getting better or if I\'m just used to seeing it."',
              author: '— Priya, 28, Mild',
              insight: '92% had no systematic tracking method. Phone galleries disorganized, difficulty communicating to providers.',
              color: '80, 200, 120'
            },
            {
              stat: '16%',
              label: 'Trigger Identification',
              quote: '"Is it stress? Diet? Weather? I have no idea what makes it worse. It feels random."',
              author: '— James, 42, Moderate',
              insight: 'Only 16% could confidently identify triggers. Trial-and-error without data, overwhelmed by complexity.',
              color: '251, 191, 36'
            }
          ].map((theme, i) => (
            <div
              key={i}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                borderRadius: '24px',
                background: 'rgba(15, 15, 15, 0.65)',
                backdropFilter: 'blur(120px) saturate(180%)',
                WebkitBackdropFilter: 'blur(120px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: `0px 16px 48px rgba(0, 0, 0, 0.6),
                            0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                            0px -1px 0px rgba(255, 255, 255, 0.08) inset`,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(18, 18, 18, 0.75)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.boxShadow = `0px 20px 56px rgba(0, 0, 0, 0.8),
                                                     0px 0px 1px rgba(255, 255, 255, 0.4) inset,
                                                     0px -1px 0px rgba(255, 255, 255, 0.12) inset,
                                                     0px 0px 40px rgba(${theme.color}, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(15, 15, 15, 0.65)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = `0px 16px 48px rgba(0, 0, 0, 0.6),
                                                     0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                                                     0px -1px 0px rgba(255, 255, 255, 0.08) inset`;
              }}
            >
              <div style={{
                fontSize: '3rem',
                fontWeight: '500',
                color: `rgb(${theme.color})`,
                marginBottom: '0.5rem'
              }}>
                <AnimatedCounter
                  end={parseInt(theme.stat)}
                  duration={2000}
                  suffix="%"
                />
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                marginBottom: '1rem',
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                {theme.label}
              </h3>
              <div style={{
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderLeft: `3px solid rgb(${theme.color})`,
                fontStyle: 'italic',
                fontSize: '0.95rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {theme.quote}
                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  {theme.author}
                </div>
              </div>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0
              }}>
                {theme.insight}
              </p>
            </div>
          ))}
        </div>

        {/* Adherence Comparison Chart */}
        <div style={{
          marginTop: '4rem',
          padding: isMobile ? '2.5rem 1.5rem' : '3rem 2.5rem',
          borderRadius: '24px',
          backgroundColor: 'rgba(74, 144, 226, 0.03)',
          border: '1px solid rgba(74, 144, 226, 0.2)'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: '500',
            marginBottom: '1rem',
            color: 'rgba(255, 255, 255, 0.95)',
            textAlign: 'center'
          }}>
            Treatment Adherence: The Reality Gap
          </h3>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            marginBottom: '2.5rem',
            maxWidth: '700px',
            margin: '0 auto 2.5rem'
          }}>
            What patients report vs. what data reveals
          </p>

          <ProgressiveBarChart
            data={[
              {
                label: 'Self-Reported Adherence',
                value: 85,
                color: 'rgb(80, 200, 120)',
                description: 'Patients believe they follow treatment correctly'
              },
              {
                label: 'Clinician Perception',
                value: 70,
                color: 'rgb(251, 191, 36)',
                description: 'Doctors estimate patient adherence rates'
              },
              {
                label: 'Actual Adherence (MEMs)',
                value: 48,
                color: 'rgb(239, 68, 68)',
                description: 'Electronic monitoring reveals true adherence'
              }
            ]}
            maxValue={100}
            animationDuration={1.5}
            staggerDelay={0.15}
          />

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            borderRadius: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0
            }}>
              <strong style={{ color: 'rgb(239, 68, 68)' }}>The Gap:</strong> A 37-percentage point discrepancy between perceived and actual adherence. This invisibility prevents effective intervention and perpetuates the cycle of poor outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Breathing Moment 2: After Research */}
      <PsoriAssistBreathingMoment
        text="The data speaks. Now watch how design answers."
        color="74, 144, 226"
        duration={3500}
      />

      {/* Competitive Landscape */}
      <div id="competitors" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Competitive Landscape
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          15 existing apps analyzed using MARS-G framework
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            {
              name: 'Psoriasis Helferin',
              market: 'Germany',
              rating: '3.8/5.0',
              strengths: ['Highest professional rating (MARS-G)', 'Clean interface', 'Good usability'],
              gaps: ['No validated PASI/DLQI', 'No AI capabilities', 'Germany-only'],
              color: '80, 200, 120'
            },
            {
              name: 'Imagine by LEO Pharma',
              market: 'Discontinued 2022',
              rating: '200K+ users',
              strengths: ['Pharmaceutical backing', 'Photo tracking', 'Large user base'],
              gaps: ['Discontinued July 2022', 'Sustainability challenges', 'Promises unfulfilled'],
              color: '239, 68, 68'
            },
            {
              name: 'MyPsoriasisTeam',
              market: 'Community',
              rating: '80K+ members',
              strengths: ['Largest community', 'Social support', 'Active engagement'],
              gaps: ['ZERO symptom tracking', 'No medication management', 'Community-only focus'],
              color: '251, 191, 36'
            },
            {
              name: 'Kopa for Psoriasis',
              market: 'Mental Health',
              rating: 'CBT-based',
              strengths: ['ONLY app addressing mental health', 'CBT methodology', 'Therapeutic approach'],
              gaps: ['Limited adoption', 'No symptom tracking integration', 'Siloed approach'],
              color: '236, 72, 153'
            }
          ].map((app, i) => (
            <div
              key={i}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                borderRadius: '24px',
                backgroundColor: `rgba(${app.color}, 0.03)`,
                border: `1px solid rgba(${app.color}, 0.2)`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${app.color}, 0.08)`;
                e.currentTarget.style.borderColor = `rgba(${app.color}, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${app.color}, 0.03)`;
                e.currentTarget.style.borderColor = `rgba(${app.color}, 0.2)`;
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.95)'
                }}>
                  {app.name}
                </h3>
                <div style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  backgroundColor: `rgba(${app.color}, 0.15)`,
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: `rgb(${app.color})`
                }}>
                  {app.rating}
                </div>
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '1.5rem'
              }}>
                {app.market}
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  color: 'rgb(80, 200, 120)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Strengths
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {app.strengths.map((strength, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '0.85rem',
                        lineHeight: '1.6',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '0.5rem',
                        paddingLeft: '1.25rem',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: 'rgb(80, 200, 120)'
                      }}>
                        ✓
                      </span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  color: 'rgb(239, 68, 68)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Gaps
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {app.gaps.map((gap, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '0.85rem',
                        lineHeight: '1.6',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '0.5rem',
                        paddingLeft: '1.25rem',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: 'rgb(239, 68, 68)'
                      }}>
                        ✗
                      </span>
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Market Gaps */}
        <div style={{
          padding: isMobile ? '2.5rem 2rem' : '3rem 3rem',
          borderRadius: '32px',
          backgroundColor: 'rgba(251, 191, 36, 0.05)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: '500',
            marginBottom: '1.5rem',
            color: 'rgb(251, 191, 36)'
          }}>
            Critical Market Gaps Identified
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {[
              { value: 'ZERO', label: 'Apps with certified EHR integration' },
              { value: 'ZERO', label: 'Apps with working AI/ML deployed' },
              { value: 'ONE', label: 'App addressing mental health (limited adoption)' }
            ].map((gap, i) => (
              <div key={i}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '500',
                  color: 'rgb(251, 191, 36)',
                  marginBottom: '0.5rem'
                }}>
                  {gap.value}
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.5'
                }}>
                  {gap.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Breathing Moment 3: After Competitive Landscape */}
      <PsoriAssistBreathingMoment
        text="The gap is clear. Now watch what's possible."
        color="168, 85, 247"
        duration={3500}
      />

      {/* Problem Reframing */}
      <div id="problem" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Problem Reframing
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Initial Problem */}
          <div style={{
            padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
            borderRadius: '24px',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              padding: '0.375rem 0.75rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              fontSize: '0.75rem',
              fontWeight: '500',
              color: 'rgb(239, 68, 68)',
              textTransform: 'uppercase'
            }}>
              Initial
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '500',
              marginBottom: '1rem',
              color: 'rgba(255, 255, 255, 0.95)'
            }}>
              Based on Personal Experience
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              "Patients need better medication reminders and progress tracking."
            </p>
          </div>

          {/* Arrow */}
          <div style={{
            textAlign: 'center',
            fontSize: isMobile ? '2rem' : '3rem',
            color: 'rgb(80, 200, 120)',
            fontWeight: '500'
          }}>
            →
          </div>

          {/* Reframed Problem */}
          <div style={{
            padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
            borderRadius: '24px',
            backgroundColor: 'rgba(80, 200, 120, 0.05)',
            border: '1px solid rgba(80, 200, 120, 0.3)',
            position: 'relative',
            gridColumn: isMobile ? '1' : '2'
          }}>
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              padding: '0.375rem 0.75rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(80, 200, 120, 0.2)',
              fontSize: '0.75rem',
              fontWeight: '500',
              color: 'rgb(80, 200, 120)',
              textTransform: 'uppercase'
            }}>
              Reframed
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '500',
              marginBottom: '1rem',
              color: 'rgba(255, 255, 255, 0.95)'
            }}>
              After Research Synthesis
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              "Patients face a <strong style={{ color: 'rgb(80, 200, 120)' }}>fragmented, reactive care model</strong> with poor adherence (40-50%), diagnostic delays for comorbidities (2.5yr avg for PsA), and inadequate mental health support (15% vs 20-35% prevalence). This results in suboptimal disease control, preventable joint damage, and annual costs exceeding $12,000 per patient."
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '16px',
          backgroundColor: 'rgba(74, 144, 226, 0.05)',
          border: '1px solid rgba(74, 144, 226, 0.2)',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: '1.7',
            color: 'rgba(255, 255, 255, 0.8)',
            fontStyle: 'italic',
            margin: 0
          }}>
            From "better reminders" to <strong style={{ color: 'rgb(74, 144, 226)' }}>systemic care model transformation</strong>
          </p>
        </div>
      </div>

      {/* Design Principles */}
      <div id="principles" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Design Principles
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          5 core principles guiding every design decision
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {[
            {
              principle: 'Clinical Rigor Over Polish',
              description: 'Evidence-based features validated by research, not just intuitive UI',
              example: 'PASI scoring uses validated CNN models (MAE <2.5) rather than simple photo logging',
              color: '168, 85, 247',
              icon: Brain
            },
            {
              principle: 'Proactive, Not Reactive',
              description: 'Shift from tracking what happened to predicting what will happen',
              example: 'Predictive flare alerts using LSTM (80%+ accuracy) vs. post-hoc symptom logging',
              color: '251, 191, 36',
              icon: Zap
            },
            {
              principle: 'Holistic Health',
              description: 'Address bio-psycho-social complexity, not just visible symptoms',
              example: 'Integrated PHQ-9/GAD-7 screening + PsA detection + trigger analysis',
              color: '236, 72, 153',
              icon: Heart
            },
            {
              principle: 'Provider Partnership',
              description: 'Design for B2B2C model, enabling clinical collaboration',
              example: 'Provider dashboard with RPM billing codes, not just patient-facing app',
              color: '80, 200, 120',
              icon: Users
            },
            {
              principle: 'Inclusive by Default',
              description: 'Accessibility, health equity, and digital divide from Day 1',
              example: 'WCAG AA compliance, freemium model, multilingual, low-bandwidth mode',
              color: '74, 144, 226',
              icon: CheckCircle
            }
          ].map((p, i) => {
            const Icon = p.icon;
            // Front face
            const frontContent = (
              <div style={{
                padding: isMobile ? '2rem 1.5rem' : '2rem 1.5rem',
                borderRadius: '24px',
                backgroundColor: `rgba(${p.color}, 0.05)`,
                border: `1px solid rgba(${p.color}, 0.3)`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: `rgba(${p.color}, 0.15)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <Icon size={32} color={`rgb(${p.color})`} />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  marginBottom: '0.75rem',
                  color: `rgb(${p.color})`
                }}>
                  {p.principle}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0
                }}>
                  {p.description}
                </p>
              </div>
            );

            // Back face
            const backContent = (
              <div style={{
                padding: isMobile ? '2rem 1.5rem' : '2rem 1.5rem',
                borderRadius: '24px',
                backgroundColor: `rgba(${p.color}, 0.1)`,
                border: `1px solid rgba(${p.color}, 0.4)`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: `rgb(${p.color})`,
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  In Practice
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0
                }}>
                  {p.example}
                </p>
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '1rem',
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textAlign: 'center'
                }}>
                  Click to flip back
                </div>
              </div>
            );

            return (
              <div key={i} style={{ minHeight: '300px' }}>
                <FlipCard
                  front={frontContent}
                  back={backContent}
                  color={p.color}
                  flipOnHover={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Personas */}
      <div id="personas" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          User Personas
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Three primary personas synthesized from 25 in-depth interviews
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {personas.map((persona, index) => {
            const isHovered = hoveredPersona === persona.name;

            // Front face of card
            const frontContent = (
              <div
                style={{
                  padding: isMobile ? '2rem 1.5rem' : '2rem 1.5rem',
                  borderRadius: '24px',
                  background: isHovered ? 'rgba(18, 18, 18, 0.75)' : 'rgba(15, 15, 15, 0.65)',
                  backdropFilter: 'blur(120px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(120px) saturate(180%)',
                  border: isHovered ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: isHovered
                    ? `0px 20px 56px rgba(0, 0, 0, 0.8),
                       0px 0px 1px rgba(255, 255, 255, 0.4) inset,
                       0px -1px 0px rgba(255, 255, 255, 0.12) inset,
                       0px 0px 40px rgba(${persona.color}, 0.2)`
                    : `0px 16px 48px rgba(0, 0, 0, 0.6),
                       0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                       0px -1px 0px rgba(255, 255, 255, 0.08) inset`,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: `rgba(${persona.color}, 0.15)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: '500',
                  color: `rgb(${persona.color})`,
                  marginBottom: '1rem'
                }}>
                  {persona.name[0]}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.95)'
                }}>
                  {persona.name}, {persona.age}
                </h3>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '0.25rem'
                }}>
                  {persona.role}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: `rgb(${persona.color})`,
                  marginBottom: '1rem'
                }}>
                  {persona.severity} · {persona.techSavvy}
                </div>
                <div style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderLeft: `3px solid rgb(${persona.color})`,
                  fontStyle: 'italic',
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  "{persona.quote}"
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Goals
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {persona.goals.map((goal, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: '0.85rem',
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.7)',
                          marginBottom: '0.5rem',
                          paddingLeft: '1.25rem',
                          position: 'relative'
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: `rgb(${persona.color})`
                        }}>
                          ✓
                        </span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Frustrations
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {persona.frustrations.map((frustration, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: '0.85rem',
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.7)',
                          marginBottom: '0.5rem',
                          paddingLeft: '1.25rem',
                          position: 'relative'
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: `rgb(${persona.color})`
                        }}>
                          ✗
                        </span>
                        {frustration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );

            // Back face of card - Day in the life journey
            const backContent = (
              <div
                style={{
                  padding: isMobile ? '2rem 1.5rem' : '2rem 1.5rem',
                  borderRadius: '24px',
                  backgroundColor: `rgba(${persona.color}, 0.08)`,
                  border: `1px solid rgba(${persona.color}, 0.4)`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'auto'
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                  color: `rgb(${persona.color})`
                }}>
                  Day in the Life: {persona.name}
                </h3>
                <div style={{
                  fontSize: '0.9rem',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: `rgb(${persona.color})` }}>Morning (7:00 AM)</strong>
                    <p style={{ margin: '0.5rem 0 0 0' }}>
                      {persona.name === 'Sarah' && 'Checks mirror, applies 3 different topicals (20 mins). Debates outfit to cover patches. Misses medication reminder—phone on silent.'}
                      {persona.name === 'Marcus' && 'Wakes with stiff joints. Struggles with jar lids. Skips shower to avoid medication wash-off. Feels frustrated, isolated.'}
                      {persona.name === 'Priya' && 'Morning yoga session. Logs sleep quality, stress level, symptoms. Takes progress photo. Cross-references weather app for triggers.'}
                    </p>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: `rgb(${persona.color})` }}>Afternoon (2:00 PM)</strong>
                    <p style={{ margin: '0.5rem 0 0 0' }}>
                      {persona.name === 'Sarah' && 'Presentation at work. Wears long sleeves despite heat. Colleague asks "What\'s wrong with your hands?" Avoids answering.'}
                      {persona.name === 'Marcus' && 'Construction site work. Joint pain worsens. Co-workers joke "getting old?" Dismisses symptoms as aging. No one mentions psoriasis connection.'}
                      {persona.name === 'Priya' && 'Reviews nutrition tracker. Notices flare-up correlation with dairy. Adjusts meal prep. Researches gut-skin axis studies.'}
                    </p>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: `rgb(${persona.color})` }}>Evening (9:00 PM)</strong>
                    <p style={{ margin: '0.5rem 0 0 0' }}>
                      {persona.name === 'Sarah' && 'Too tired for full routine. Applies only urgent areas. Feels guilty. Scrolls phone—no organized photo history for dermatologist appointment tomorrow.'}
                      {persona.name === 'Marcus' && 'Joints swollen. Googles "psoriasis joint pain." Reads about PsA. Dismisses it—doctors never mentioned. Plans to "tough it out."'}
                      {persona.name === 'Priya' && 'Analyzes 2-week data. Identifies pattern: high stress + poor sleep = worsening. Wishes existing apps offered predictive insights, not just tracking.'}
                    </p>
                  </div>
                </div>
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '1rem',
                  borderTop: `1px solid rgba(${persona.color}, 0.2)`,
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textAlign: 'center'
                }}>
                  Click to flip back
                </div>
              </div>
            );

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredPersona(persona.name)}
                onMouseLeave={() => setHoveredPersona(null)}
                style={{ minHeight: '650px' }}
              >
                <FlipCard
                  front={frontContent}
                  back={backContent}
                  color={persona.color}
                  flipOnHover={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Double Diamond */}
      <div id="process" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Design Process: Double Diamond
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          18-month systematic design methodology
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem'
        }}>
          {[
            {
              phase: 'DISCOVER',
              subtitle: 'Divergent (Months 1-3)',
              items: [
                'Personal experience documentation',
                '25 patient interviews (10 mild, 8 moderate, 7 severe)',
                '12 stakeholder interviews (8 dermatologists, 4 rheumatologists)',
                'Competitive analysis (15 apps, MARS-G framework)',
                'Literature review (75+ peer-reviewed studies)'
              ],
              color: '74, 144, 226'
            },
            {
              phase: 'DEFINE',
              subtitle: 'Convergent (Months 3-4)',
              items: [
                'Problem synthesis and reframing',
                'Persona development (3 primary personas)',
                'Jobs-to-be-Done mapping (functional, emotional, social)',
                'Design principles articulation (clinical rigor, proactive, holistic)',
                'Success metrics definition (KPIs, OKRs)'
              ],
              color: '168, 85, 247'
            },
            {
              phase: 'DEVELOP',
              subtitle: 'Divergent (Months 4-9)',
              items: [
                'Ideation workshops (50+ feature concepts)',
                'MoSCoW prioritization (Must/Should/Could/Won\'t)',
                'Information architecture (5-tab navigation)',
                'Low-fidelity → High-fidelity prototyping (Figma)',
                '3 rounds usability testing (45 participants total)'
              ],
              color: '80, 200, 120'
            },
            {
              phase: 'DELIVER',
              subtitle: 'Convergent (Months 9-18)',
              items: [
                'Technical specification (React Native, Node.js, ML architecture)',
                'Design system documentation (color, typography, components)',
                'Developer handoff (Storybook component library)',
                'Beta testing plan (1,000 users via NPF partnership)',
                'Clinical validation protocol (RCT design, N=200, FDA pathway)'
              ],
              color: '251, 191, 36'
            }
          ].map((stage, i) => (
            <div
              key={i}
              onMouseEnter={() => setActivePhase(stage.phase)}
              onMouseLeave={() => setActivePhase(null)}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                borderRadius: '24px',
                backgroundColor: activePhase === stage.phase ? `rgba(${stage.color}, 0.05)` : 'rgba(255, 255, 255, 0.03)',
                border: activePhase === stage.phase ? `1px solid rgba(${stage.color}, 0.3)` : '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                backgroundColor: `rgba(${stage.color}, 0.15)`,
                color: `rgb(${stage.color})`,
                fontSize: '0.85rem',
                fontWeight: '500',
                marginBottom: '0.75rem'
              }}>
                {stage.phase}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '1.5rem'
              }}>
                {stage.subtitle}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {stage.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '0.75rem',
                      paddingLeft: '1.5rem',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: `rgb(${stage.color})`
                    }}>
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div id="features" style={{ maxWidth: '1400px', margin: '0 auto 7rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Core Feature Set
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          MoSCoW prioritization: MUST have (MVP) · SHOULD have (V1.5) · COULD have (V2.0)
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {features.map((feature) => {
            const Icon = feature.icon;
            const isExpanded = expandedFeature === feature.id;
            const isHovered = hoveredFeature === feature.id;

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                  borderRadius: '24px',
                  background: isHovered || isExpanded ? 'rgba(18, 18, 18, 0.75)' : 'rgba(15, 15, 15, 0.65)',
                  backdropFilter: 'blur(120px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(120px) saturate(180%)',
                  border: isHovered || isExpanded ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: isHovered || isExpanded
                    ? `0px 20px 56px rgba(0, 0, 0, 0.8),
                       0px 0px 1px rgba(255, 255, 255, 0.4) inset,
                       0px -1px 0px rgba(255, 255, 255, 0.12) inset,
                       0px 0px 40px rgba(${feature.color}, 0.2)`
                    : `0px 16px 48px rgba(0, 0, 0, 0.6),
                       0px 0px 1px rgba(255, 255, 255, 0.3) inset,
                       0px -1px 0px rgba(255, 255, 255, 0.08) inset`,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer'
                }}
                onClick={() => setExpandedFeature(isExpanded ? null : feature.id)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1.5rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        backgroundColor: `rgba(${feature.color}, 0.15)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.4s ease',
                        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                      }}>
                        <Icon size={28} color={`rgb(${feature.color})`} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '8px',
                          backgroundColor: `rgba(${feature.color}, 0.15)`,
                          color: `rgb(${feature.color})`,
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          marginBottom: '0.5rem'
                        }}>
                          {feature.priority} HAVE
                        </div>
                        <h3 style={{
                          fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '0.25rem',
                          color: 'rgba(255, 255, 255, 0.95)'
                        }}>
                          {feature.title}
                        </h3>
                        <p style={{
                          fontSize: '0.95rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          margin: 0
                        }}>
                          {feature.subtitle}
                        </p>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: isExpanded ? '1.5rem' : 0
                    }}>
                      {feature.description}
                    </p>

                    {isExpanded && (
                      <div style={{
                        marginTop: '1.5rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '1.5rem' }}>
                          {feature.details.map((detail, i) => (
                            <li
                              key={i}
                              style={{
                                fontSize: '1rem',
                                lineHeight: '1.7',
                                color: 'rgba(255, 255, 255, 0.8)',
                                marginBottom: '0.75rem',
                                paddingLeft: '1.5rem',
                                position: 'relative'
                              }}
                            >
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                color: `rgb(${feature.color})`
                              }}>
                                •
                              </span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                        {feature.technical && (
                          <div style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            borderLeft: `3px solid rgb(${feature.color})`
                          }}>
                            <div style={{
                              fontSize: '0.85rem',
                              fontWeight: '500',
                              color: 'rgba(255, 255, 255, 0.6)',
                              marginBottom: '0.5rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}>
                              Technical Implementation
                            </div>
                            <div style={{
                              fontSize: '0.9rem',
                              lineHeight: '1.6',
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontFamily: 'monospace'
                            }}>
                              {feature.technical}
                            </div>
                          </div>
                        )}

                        {/* Interactive Prototype Demos */}
                        {feature.id === 'ghost-overlay' && (
                          <div style={{ marginTop: '2rem' }}>
                            <GhostOverlayDemo />
                          </div>
                        )}
                        {feature.id === 'ai-pasi' && (
                          <div style={{ marginTop: '2rem' }}>
                            <PASIScoringDemo />
                          </div>
                        )}
                        {feature.id === 'medication-reminders' && (
                          <div style={{ marginTop: '2rem' }}>
                            <SmartReminderDemo />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: `rgba(${feature.color}, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0
                  }}>
                    <ChevronDown size={20} color={`rgb(${feature.color})`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Usability Testing */}
      <div id="testing" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Usability Testing
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          3 rounds, 45 total participants, iterative improvement
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {testingRounds.map((round, i) => (
            <div
              key={i}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2rem 2rem',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                gap: '1.5rem',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: 'rgba(255, 255, 255, 0.95)'
                  }}>
                    {round.round}
                  </h3>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '1rem'
                  }}>
                    {round.participants} participants
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginBottom: '0.25rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Key Finding
                      </div>
                      <div style={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        lineHeight: '1.6'
                      }}>
                        {round.keyFinding}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginBottom: '0.25rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Iteration
                      </div>
                      <div style={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        lineHeight: '1.6'
                      }}>
                        {round.iteration}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(80, 200, 120, 0.1)',
                  border: '1px solid rgba(80, 200, 120, 0.2)'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '500',
                    color: 'rgb(80, 200, 120)',
                    marginBottom: '0.25rem'
                  }}>
                    {round.taskCompletion}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    Task Completion
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: isMobile ? '2rem 1.5rem' : '3rem',
          borderRadius: '24px',
          backgroundColor: 'rgba(80, 200, 120, 0.05)',
          border: '1px solid rgba(80, 200, 120, 0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: '500',
            marginBottom: '2rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Final Usability Metrics
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '2rem'
          }}>
            {[
              { value: '82/100', label: 'SUS Score', sublabel: 'Grade A' },
              { value: '47s', label: 'First Photo', sublabel: 'Target: <60s' },
              { value: '2.3 min', label: 'Reminder Setup', sublabel: 'Target: <3 min' },
              { value: '4.2%', label: 'Error Rate', sublabel: 'Target: <5%' }
            ].map((metric, i) => (
              <div key={i}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '500',
                  color: 'rgb(80, 200, 120)',
                  marginBottom: '0.5rem'
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '0.25rem',
                  fontWeight: '500'
                }}>
                  {metric.label}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {metric.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Design System */}
      <div id="design-system" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Design System
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Comprehensive design language with WCAG AA accessibility standards
        </p>

        {/* Color Palette */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Color Palette
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '1rem'
          }}>
            {[
              { name: 'Primary', hex: '#4A90E2', rgb: '74, 144, 226', contrast: '4.5:1', use: 'Calming Blue - Reduces anxiety, professional' },
              { name: 'Secondary', hex: '#50C878', rgb: '80, 200, 120', contrast: '3.8:1', use: 'Success Green - Progress indicators' },
              { name: 'Accent', hex: '#FFB84D', rgb: '255, 184, 77', contrast: '4.2:1', use: 'Warm Highlight - Calls-to-action' },
              { name: 'Alert', hex: '#E74C3C', rgb: '231, 76, 60', contrast: '4.8:1', use: 'Red - Urgent notifications only' }
            ].map((color, i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(${color.rgb}, 0.1)`;
                  e.currentTarget.style.borderColor = `rgba(${color.rgb}, 0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '80px',
                  backgroundColor: color.hex,
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  boxShadow: `0 4px 20px rgba(${color.rgb}, 0.3)`
                }} />
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: color.hex,
                  marginBottom: '0.5rem'
                }}>
                  {color.name}
                </h4>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '0.25rem',
                  fontFamily: 'monospace'
                }}>
                  {color.hex}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '0.75rem'
                }}>
                  WCAG AA: {color.contrast}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.5'
                }}>
                  {color.use}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Typography Scale
          </h3>
          <div style={{
            padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
            borderRadius: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              Typeface: Inter (Google Fonts) - Optimized for digital screens
            </div>
            {[
              { name: 'Hero', size: '32pt', weight: '700', line: '1.2', sample: 'PsoriAssist' },
              { name: 'H1', size: '28pt', weight: '700', line: '1.3', sample: 'Section Heading' },
              { name: 'H2', size: '24pt', weight: '600', line: '1.4', sample: 'Subsection Heading' },
              { name: 'Body', size: '16pt', weight: '400', line: '1.5', sample: 'Body text for readability and comfort' },
              { name: 'Caption', size: '14pt', weight: '400', line: '1.5', sample: 'Small details and metadata' }
            ].map((type, i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem 0',
                  borderBottom: i < 4 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{
                    fontSize: type.size,
                    fontWeight: type.weight,
                    lineHeight: type.line,
                    color: 'rgba(255, 255, 255, 0.95)'
                  }}>
                    {type.sample}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontFamily: 'monospace',
                    textAlign: 'right'
                  }}>
                    {type.name}: {type.size}, {type.weight}, LH {type.line}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Component Library */}
        <div>
          <h3 style={{
            fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Component Library
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                component: 'Buttons',
                variants: ['Primary: #4A90E2 bg, 44x44px min', 'Secondary: Border + text only', 'Destructive: #E74C3C for delete/cancel'],
                color: '74, 144, 226'
              },
              {
                component: 'Cards',
                variants: ['8px padding, 4px radius, 1px border', 'Hover: Shadow elevation', 'Photo Card: 3:4 aspect, metadata overlay'],
                color: '80, 200, 120'
              },
              {
                component: 'Forms',
                variants: ['Text Input: 48px height, inline validation', 'Select: Native pickers (iOS/Android)', 'Camera: Full-screen modal, ghost overlay'],
                color: '168, 85, 247'
              },
              {
                component: 'Charts',
                variants: ['Line: PASI trend over time', 'Bar: Adherence by week/month', 'Heat Map: Trigger correlation matrix'],
                color: '251, 191, 36'
              }
            ].map((comp, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? '2rem 1.5rem' : '2rem',
                  borderRadius: '20px',
                  backgroundColor: `rgba(${comp.color}, 0.05)`,
                  border: `1px solid rgba(${comp.color}, 0.2)`
                }}
              >
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: `rgb(${comp.color})`,
                  marginBottom: '1rem'
                }}>
                  {comp.component}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {comp.variants.map((variant, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '0.5rem',
                        paddingLeft: '1.25rem',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: `rgb(${comp.color})`
                      }}>
                        •
                      </span>
                      {variant}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Flows */}
      <div id="flows" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Key User Flows
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Critical interaction patterns designed for minimal friction
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem'
        }}>
          {[
            {
              title: 'Photo Capture Flow',
              color: '74, 144, 226',
              steps: [
                { step: 1, action: 'User taps "Take Photo"', result: 'Body part selection screen appears' },
                { step: 2, action: 'Selects "Left Arm"', result: 'Camera modal opens with ghost overlay' },
                { step: 3, action: 'Ghost overlay appears at 50% opacity', result: 'Alignment guides (3x3 grid) help positioning' },
                { step: 4, action: 'User adjusts opacity slider (20-80%)', result: 'Ghost visibility optimized for alignment' },
                { step: 5, action: 'Aligns arm with ghost, taps Capture', result: 'Haptic feedback (success vibration)' },
                { step: 6, action: 'Confirmation screen shows preview', result: '"Looks good? Add notes or retake"' },
                { step: 7, action: 'Adds note: "After beach weekend, slight redness"', result: 'Taps "Confirm"' },
                { step: 8, action: 'Upload progress indicator', result: 'Success toast: "PASI analysis in 2-5 min"' },
                { step: 9, action: 'Wait 2-5 minutes', result: 'Push notification when analysis ready' }
              ]
            },
            {
              title: 'Medication Reminder Response',
              color: '80, 200, 120',
              steps: [
                { step: 1, action: 'Push notification: "Time for morning cream!"', result: 'User taps notification' },
                { step: 2, action: 'App opens to Medication screen', result: 'Checklist shows applications needed' },
                { step: 3, action: 'List: "Calcipotriol - Left arm, right arm, trunk"', result: 'User taps checkmark for each' },
                { step: 4, action: 'Taps checkmark', result: 'Animation: Checkmark expands, green, confetti' },
                { step: 5, action: 'All items checked', result: 'Streak updates: "7 days in a row! 🔥"' },
                { step: 6, action: 'If milestone (30 days)', result: 'Celebration modal with achievement badge' }
              ]
            },
            {
              title: 'Predictive Flare-Up Alert',
              color: '251, 191, 36',
              steps: [
                { step: 1, action: 'ML model detects high risk', result: 'Push: "⚠️ High flare-up risk detected"' },
                { step: 2, action: 'User taps notification', result: 'Risk Explanation screen opens' },
                { step: 3, action: 'Thermometer shows risk level', result: '70% probability displayed' },
                { step: 4, action: 'Contributing factors listed', result: 'Cold weather, missed applications, elevated stress' },
                { step: 5, action: 'Mitigation suggestions shown', result: 'Increase topicals 2x, humidifier, stress management' },
                { step: 6, action: 'Option to share with provider or dismiss', result: 'User chooses action' }
              ]
            }
          ].map((flow, i) => (
            <div
              key={i}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                borderRadius: '24px',
                backgroundColor: `rgba(${flow.color}, 0.03)`,
                border: `1px solid rgba(${flow.color}, 0.2)`
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '2rem',
                color: `rgb(${flow.color})`
              }}>
                {flow.title}
              </h3>
              <div style={{ position: 'relative' }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute',
                  left: '24px',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: `rgba(${flow.color}, 0.2)`
                }} />

                {flow.steps.map((s, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      marginBottom: j < flow.steps.length - 1 ? '2rem' : 0,
                      position: 'relative'
                    }}
                  >
                    {/* Step number */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: `rgba(${flow.color}, 0.15)`,
                      border: `2px solid rgb(${flow.color})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: `rgb(${flow.color})`,
                      flexShrink: 0,
                      zIndex: 1
                    }}>
                      {s.step}
                    </div>

                    {/* Step content */}
                    <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginBottom: '0.5rem'
                      }}>
                        {s.action}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: '1.6',
                        paddingLeft: '1rem',
                        borderLeft: `2px solid rgba(${flow.color}, 0.3)`
                      }}>
                        → {s.result}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Architecture */}
      <div id="technical" style={{ maxWidth: '1400px', margin: '0 auto 7rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Technical Architecture
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          HIPAA-compliant, scalable infrastructure with AI/ML pipeline
        </p>

        {/* System Layers */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
            borderRadius: '32px',
            backgroundColor: 'rgba(168, 85, 247, 0.03)',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}>
            <TimelineVisualization
              items={[
                {
                  id: 'client',
                  title: 'Client Layer',
                  description: 'iOS/Android (React Native), Redux state, custom UI, Victory charts',
                  color: '74, 144, 226',
                  completed: true
                },
                {
                  id: 'gateway',
                  title: 'API Gateway',
                  description: 'NGINX + Rate limiting + Load balancer',
                  color: '80, 200, 120',
                  completed: true
                },
                {
                  id: 'app',
                  title: 'Application Layer',
                  description: 'Auth (JWT/OAuth) | Core API (Node.js) | ML Service (Python FastAPI)',
                  color: '168, 85, 247',
                  completed: true
                },
                {
                  id: 'data',
                  title: 'Data Layer',
                  description: 'PostgreSQL (primary) | Redis (cache) | AWS S3 (encrypted PHI images)',
                  color: '251, 191, 36',
                  completed: true
                }
              ]}
              orientation="vertical"
              animate={true}
            />
          </div>
        </div>

        {/* ML Pipeline */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            AI/ML Pipeline
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                model: 'PASI Scoring Model',
                stages: [
                  'Input: 800x1024 RGB image',
                  'Preprocessing: CLAHE normalization, color space conversion',
                  'Stage 1: U-Net lesion segmentation (binary mask)',
                  'Stage 2: EfficientNetB3 multi-output regression (erythema, induration, desquamation, area)',
                  'Output: Total PASI score + confidence interval'
                ],
                performance: 'MAE <2.5, ICC >0.85, Inference <30s',
                color: '168, 85, 247'
              },
              {
                model: 'Predictive Flare Model (LSTM)',
                stages: [
                  'Input: 14-day time series (10 features × 14 days)',
                  'Features: PASI, symptoms, triggers, weather, adherence, sleep',
                  'LSTM Layer 1: 128 units, return sequences, Dropout 0.2',
                  'LSTM Layer 2: 64 units, Dropout 0.2',
                  'Dense Layer: 32 units (ReLU), Sigmoid output',
                  'Output: Binary (flare/no flare) + SHAP explainability'
                ],
                performance: 'Accuracy 80%+, AUC >0.85, F1 >0.75',
                color: '251, 191, 36'
              }
            ].map((ml, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                  borderRadius: '24px',
                  backgroundColor: `rgba(${ml.color}, 0.05)`,
                  border: `1px solid rgba(${ml.color}, 0.3)`
                }}
              >
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: `rgb(${ml.color})`,
                  marginBottom: '1.5rem'
                }}>
                  {ml.model}
                </h4>
                <div style={{ marginBottom: '1.5rem' }}>
                  {ml.stages.map((stage, j) => (
                    <div
                      key={j}
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '0.75rem',
                        paddingLeft: '1.25rem',
                        position: 'relative',
                        fontFamily: j > 0 ? 'monospace' : 'inherit'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: `rgb(${ml.color})`
                      }}>
                        {j === ml.stages.length - 1 ? '↓' : '•'}
                      </span>
                      {stage}
                    </div>
                  ))}
                </div>
                <div style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderLeft: `3px solid rgb(${ml.color})`
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase'
                  }}>
                    Performance Targets
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'monospace'
                  }}>
                    {ml.performance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Compliance */}
        <div>
          <h3 style={{
            fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Security & HIPAA Compliance
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {[
              {
                category: 'Administrative',
                items: ['Privacy/Security Officers', 'Annual workforce training', 'Access management (least privilege)', 'Incident response plan', 'BAAs with all vendors'],
                icon: Users,
                color: '74, 144, 226'
              },
              {
                category: 'Technical',
                items: ['AES-256 at rest, TLS 1.3 in transit', 'Audit logging (all PHI access)', 'RBAC + MFA', 'Auto session timeout', 'De-identification for analytics'],
                icon: Brain,
                color: '168, 85, 247'
              },
              {
                category: 'Data Handling',
                items: ['Photos encrypted before upload', 'User-controlled deletion', '7-year retention (regulatory)', 'Anonymized IDs for research', 'On-device processing option'],
                icon: Activity,
                color: '80, 200, 120'
              }
            ].map((sec, i) => {
              const Icon = sec.icon;
              return (
                <div
                  key={i}
                  style={{
                    padding: isMobile ? '2rem 1.5rem' : '2rem',
                    borderRadius: '20px',
                    backgroundColor: `rgba(${sec.color}, 0.05)`,
                    border: `1px solid rgba(${sec.color}, 0.2)`
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: `rgba(${sec.color}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Icon size={24} color={`rgb(${sec.color})`} />
                  </div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    color: `rgb(${sec.color})`,
                    marginBottom: '1rem'
                  }}>
                    {sec.category}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {sec.items.map((item, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: '0.85rem',
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.7)',
                          marginBottom: '0.5rem',
                          paddingLeft: '1.25rem',
                          position: 'relative'
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: `rgb(${sec.color})`
                        }}>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Impact & Business */}
      <div id="impact" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Impact & Business Strategy
        </h2>

        {/* Market Opportunity */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: '500',
            marginBottom: '2rem',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Market Opportunity
          </h3>
          <div style={{
            padding: isMobile ? '2.5rem 2rem' : '3rem 3rem',
            borderRadius: '32px',
            backgroundColor: 'rgba(251, 191, 36, 0.05)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            marginBottom: '2rem'
          }}>
            {/* Market Sizing Visualization */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '3rem',
              marginBottom: '3rem',
              alignItems: 'start'
            }}>
              <div style={{ textAlign: 'center' }}>
                <ProgressiveRadialChart
                  data={[
                    { label: 'TAM', value: 100, color: 'rgb(251, 191, 36)' }
                  ]}
                  size={isMobile ? 160 : 180}
                />
                <div style={{
                  marginTop: '1rem',
                  fontSize: '1.75rem',
                  fontWeight: '500',
                  color: 'rgb(251, 191, 36)'
                }}>
                  $27.20B
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: '0.5rem'
                }}>
                  Global psoriasis treatment market
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <ProgressiveRadialChart
                  data={[
                    { label: 'SAM', value: 52, color: 'rgb(80, 200, 120)' },
                    { label: 'Remaining', value: 48, color: 'rgba(255, 255, 255, 0.05)' }
                  ]}
                  size={isMobile ? 160 : 180}
                />
                <div style={{
                  marginTop: '1rem',
                  fontSize: '1.75rem',
                  fontWeight: '500',
                  color: 'rgb(80, 200, 120)'
                }}>
                  $4.4-14.1B
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: '0.5rem'
                }}>
                  45M patients (developed markets) × $50-150
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <ProgressiveRadialChart
                  data={[
                    { label: 'SOM (Year 5)', value: 5, color: 'rgb(74, 144, 226)' },
                    { label: 'Remaining', value: 95, color: 'rgba(255, 255, 255, 0.05)' }
                  ]}
                  size={isMobile ? 160 : 180}
                />
                <div style={{
                  marginTop: '1rem',
                  fontSize: '1.75rem',
                  fontWeight: '500',
                  color: 'rgb(74, 144, 226)'
                }}>
                  $220-705M
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: '0.5rem'
                }}>
                  5% penetration target
                </div>
              </div>
            </div>
            <div style={{
              padding: '1.5rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(251, 191, 36, 0.3)'
            }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '1rem'
              }}>
                5-Year Revenue Projection
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
                gap: '1rem'
              }}>
                {[
                  { year: 'Y1', users: '40K', subs: '4K', revenue: '$1.2M' },
                  { year: 'Y2', users: '150K', subs: '18K', revenue: '$4.2M' },
                  { year: 'Y3', users: '540K', subs: '60K', revenue: '$11.8M' },
                  { year: 'Y4', users: '1.2M', subs: '156K', revenue: '$25.0M' },
                  { year: 'Y5', users: '2.0M', subs: '260K', revenue: '$38.0M' }
                ].map((y, i) => (
                  <div key={i} style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.2)'
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}>
                      {y.year}
                    </div>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: '500',
                      color: 'rgb(251, 191, 36)',
                      marginBottom: '0.25rem'
                    }}>
                      {y.revenue}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: '1.4'
                    }}>
                      {y.users} users<br/>
                      {y.subs} premium
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            {
              title: '5-Year Clinical Impact',
              metrics: [
                { label: '2M patients served', value: 'globally', color: '74, 144, 226' },
                { label: '40K+ cases early PsA detection', value: 'preventing irreversible damage', color: '239, 68, 68' },
                { label: '1.8M+ mental health screenings', value: '360K+ referrals', color: '236, 72, 153' },
                { label: '$1.2-1.8B cumulative savings', value: 'healthcare cost reduction', color: '80, 200, 120' }
              ]
            },
            {
              title: 'Business Model & Revenue',
              metrics: [
                { label: 'Freemium: $9.99/mo, $79.99/yr', value: '10-12% conversion, LTV $180-200', color: '74, 144, 226' },
                { label: 'B2B Enterprise: $50-150/patient/yr', value: 'Pharma PSPs, health systems', color: '251, 191, 36' },
                { label: 'LTV:CAC = 6:1 by Year 3', value: 'Path to profitability Month 32-36', color: '80, 200, 120' },
                { label: 'Year 5: $38M revenue', value: 'Gross margin 80-83%', color: '168, 85, 247' }
              ]
            }
          ].map((section, i) => (
            <div
              key={i}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                borderRadius: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                {section.title}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {section.metrics.map((metric, j) => (
                  <div
                    key={j}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      backgroundColor: `rgba(${metric.color}, 0.05)`,
                      borderLeft: `3px solid rgb(${metric.color})`
                    }}
                  >
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: `rgb(${metric.color})`,
                      marginBottom: '0.25rem'
                    }}>
                      {metric.label}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.5'
                    }}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: isMobile ? '2rem 1.5rem' : '3rem',
          borderRadius: '32px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: '500',
            marginBottom: '1rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Clinical Validation: Randomized Controlled Trial
          </h3>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            N=200 participants (100 intervention, 100 control) · Primary endpoint: Mean PASI change at Week 12 · FDA Digital Health Precertification pathway
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              { value: '75-80%', label: 'Adherence', sublabel: 'vs. 50% control' },
              { value: '35-40%', label: 'PASI Reduction', sublabel: 'vs. 20% control' },
              { value: '90%+', label: 'Mental Health Screening', sublabel: 'vs. <15% standard care' }
            ].map((outcome, i) => (
              <div key={i}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '500',
                  color: 'rgb(74, 144, 226)',
                  marginBottom: '0.5rem'
                }}>
                  {outcome.value}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '0.25rem',
                  fontWeight: '500'
                }}>
                  {outcome.label}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {outcome.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Breathing Moment 5: Before Reflection */}
      <PsoriAssistBreathingMoment
        text="Before we end, a moment of gratitude..."
        color="236, 72, 153"
        duration={4000}
      />

      {/* Interactive App Prototype */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 8rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Experience PsoriAssist
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '700px',
          margin: '0 auto 4rem',
          lineHeight: '1.6'
        }}>
          Click through the fully interactive prototype. Try the photo tracker, check your medication streak, and explore the provider report.
        </p>

        <PsoriAssistPhoneMockup />

        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '1.5rem',
          borderRadius: '16px',
          backgroundColor: 'rgba(74, 144, 226, 0.05)',
          border: '1px solid rgba(74, 144, 226, 0.2)',
          maxWidth: '600px',
          margin: '3rem auto 0'
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.5'
          }}>
            💡 <strong style={{ color: 'rgb(74, 144, 226)' }}>Tip:</strong> Use the tabs at the bottom to navigate between screens. Click buttons, adjust sliders, and check off medications to see the app come to life.
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <div style={{
          padding: isMobile ? '3rem 2rem' : '4rem 3rem',
          borderRadius: '32px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Personal Reflection
          </h2>
          <div style={{
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Designing PsoriAssist has been the most meaningful project of my career—not just as a designer, but as a patient. For years, I felt powerless against this condition. Designing this platform was an act of agency, transforming frustration into innovation.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Through 25 interviews, I connected with fellow patients whose stories deepened my empathy. Marcus canceling his beach wedding. Priya's quest for natural optimization. Sarah's guilt about forgetting creams. Their experiences informed every design decision.
            </p>
            <div style={{
              padding: '2rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(74, 144, 226, 0.05)',
              border: '1px solid rgba(74, 144, 226, 0.2)',
              fontStyle: 'italic',
              marginTop: '2rem'
            }}>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0
              }}>
                "For the first time, I feel like someone built something that actually understands what it's like to live with this. Not just 'track your symptoms'—but the whole exhausting, emotional, confusing reality of it. Thank you."
              </p>
              <div style={{
                marginTop: '1rem',
                fontSize: '0.95rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                — Beta tester with severe psoriasis, 15 years
              </div>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.9)' }}>
              That's why I designed PsoriAssist. And that's why I believe it can make a difference.
            </p>
          </div>
        </div>
      </div>

      {/* Breathing Moment 4: After Technical Architecture */}
      <PsoriAssistBreathingMoment
        text="Complexity, simplified. Innovation, humanized."
        color="80, 200, 120"
        duration={3500}
      />

      {/* Design Learnings */}
      <div id="learnings" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Design Learnings
        </h2>

        {/* What Worked Well */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
            color: 'rgb(80, 200, 120)'
          }}>
            What Worked Well
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Personal Experience as Foundation',
                desc: 'My lived experience with psoriasis provided authentic empathy. Users said: "You get it—other apps feel like they were designed by people who never had psoriasis."'
              },
              {
                title: 'Evidence-Based Approach',
                desc: 'Grounding every design decision in clinical research differentiated PsoriAssist. The ghost overlay emerged from studies showing alignment is critical for photo-based assessment.'
              },
              {
                title: 'Holistic Problem Framing',
                desc: 'Research revealed the real problem is systemic—fragmented care, reactive management, siloed mental health—not just "medication reminders."'
              },
              {
                title: 'Iterative Usability Testing',
                desc: '3 rounds with 45 participants caught critical issues. Each iteration improved task completion by 15-20% (73% → 87% → 93%).'
              }
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? '2rem 1.5rem' : '2rem',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(80, 200, 120, 0.05)',
                  border: '1px solid rgba(80, 200, 120, 0.2)'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(80, 200, 120, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <CheckCircle size={24} color="rgb(80, 200, 120)" />
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: 'rgb(80, 200, 120)',
                  marginBottom: '0.75rem'
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges & Solutions */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
            color: 'rgb(251, 191, 36)'
          }}>
            Challenges & How I Addressed Them
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem'
          }}>
            {[
              {
                challenge: 'Balancing Complexity vs. Simplicity',
                problem: 'Psoriasis management is complex (medications, triggers, mental health, PsA), but users want simplicity.',
                solution: 'Progressive disclosure. Show basic features upfront, advanced behind "See more". Free tier focuses on simplicity, Premium adds depth.',
                color: '251, 191, 36'
              },
              {
                challenge: 'AI Transparency & Trust',
                problem: 'Users (especially Marcus persona) skeptical of AI accuracy.',
                solution: 'Always show confidence scores. If <70%, flag for manual review. Provide explainability. Never claim 100% accuracy.',
                color: '74, 144, 226'
              },
              {
                challenge: 'Mental Health Stigma',
                problem: 'Users may resist screening due to stigma.',
                solution: 'Frame as "wellness check-in," emphasize 1-in-5 prevalence to normalize, make optional but encouraged. Supportive language, not clinical jargon.',
                color: '236, 72, 153'
              },
              {
                challenge: 'Provider Adoption Barriers',
                problem: 'Dermatologists overwhelmed, skeptical of "another app."',
                solution: 'Design portal to save time (automated PASI, RPM billing). Lead with value: "5-8 min saved per visit + $40-60 PPPM revenue."',
                color: '80, 200, 120'
              }
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                  borderRadius: '24px',
                  backgroundColor: `rgba(${item.color}, 0.03)`,
                  border: `1px solid rgba(${item.color}, 0.2)`
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr',
                  gap: '1.5rem',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      color: `rgb(${item.color})`,
                      marginBottom: '0.75rem'
                    }}>
                      {item.challenge}
                    </h4>
                    <div style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                      <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: 'rgb(239, 68, 68)',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase'
                      }}>
                        Problem
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {item.problem}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '2rem',
                    color: `rgb(${item.color})`,
                    fontWeight: '500'
                  }}>
                    →
                  </div>
                  <div style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(80, 200, 120, 0.1)',
                    border: '1px solid rgba(80, 200, 120, 0.2)'
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      color: 'rgb(80, 200, 120)',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase'
                    }}>
                      Solution
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      {item.solution}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What I'd Do Differently */}
        <div>
          <h3 style={{
            fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
            color: 'rgb(168, 85, 247)'
          }}>
            What I'd Do Differently
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Earlier Provider Engagement',
                desc: 'I interviewed providers Month 2-3. In hindsight, involving dermatologists from Day 1 would have shaped features more aligned with clinical workflows from the start.'
              },
              {
                title: 'Accessibility Co-Design',
                desc: 'While I met WCAG 2.1 AA standards, I didn\'t conduct dedicated usability testing with users who have disabilities until Round 3. Should have been Round 1.'
              },
              {
                title: 'Real Patient Data Pilot',
                desc: 'I relied on simulated data. A small pilot (10-20 patients) tracking real data for 4 weeks before MVP would have surfaced edge cases.'
              }
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? '2rem 1.5rem' : '2rem',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(168, 85, 247, 0.05)',
                  border: '1px solid rgba(168, 85, 247, 0.2)'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(168, 85, 247, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Circle size={24} color="rgb(168, 85, 247)" />
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: 'rgb(168, 85, 247)',
                  marginBottom: '0.75rem'
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Roadmap */}
      <div id="roadmap" style={{ maxWidth: '1400px', margin: '0 auto 10rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Future Roadmap
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Evolution from MVP to comprehensive digital health platform
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {[
            {
              tier: 'Short-Term',
              timeframe: 'Year 1-2',
              color: '74, 144, 226',
              goals: [
                'Launch MVP with 6 core features',
                'Complete RCT (N=200) and publish results',
                'Achieve 100K users, $5M revenue',
                'Sign first 3 pharmaceutical partnerships',
                'Beta test provider dashboard with 50 dermatologists'
              ]
            },
            {
              tier: 'Mid-Term',
              timeframe: 'Year 3-4',
              color: '251, 191, 36',
              goals: [
                'Predictive analytics v2 (personalized risk models)',
                'Genetic profiling integration (pharmacogenomics)',
                'Wearable integration (continuous monitoring)',
                'International expansion (Europe, Australia)',
                'FDA Digital Health Precertification submission'
              ]
            },
            {
              tier: 'Long-Term',
              timeframe: 'Year 5+',
              color: '80, 200, 120',
              goals: [
                'White-label platform for other conditions (eczema, acne, vitiligo)',
                'Voice-activated logging (Alexa, Google Assistant)',
                'AR/VR treatment education modules',
                'API platform for third-party developers',
                'Prescription Digital Therapeutic (PDT) designation'
              ]
            }
          ].map((phase, i) => (
            <div
              key={i}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                borderRadius: '24px',
                backgroundColor: `rgba(${phase.color}, 0.05)`,
                border: `1px solid rgba(${phase.color}, 0.3)`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.375rem 0.75rem',
                borderRadius: '12px',
                backgroundColor: `rgba(${phase.color}, 0.2)`,
                fontSize: '0.75rem',
                fontWeight: '500',
                color: `rgb(${phase.color})`,
                textTransform: 'uppercase'
              }}>
                {phase.timeframe}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                color: `rgb(${phase.color})`,
                marginBottom: '2rem'
              }}>
                {phase.tier}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {phase.goals.map((goal, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: '1.7',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '1rem',
                      paddingLeft: '1.5rem',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.5rem',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: `rgb(${phase.color})`
                    }} />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Other Projects */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: isMobile ? '1.75rem' : '2.5rem',
          fontWeight: '500',
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Other Projects
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem'
        }}>
          {otherProjects.map((project) => {
            const Icon = project.icon;
            const isHovered = hoveredOtherProject === project.id;

            return (
              <Link
                key={project.id}
                href={project.href}
                onMouseEnter={() => setHoveredOtherProject(project.id)}
                onMouseLeave={() => setHoveredOtherProject(null)}
                style={{
                  display: 'block',
                  padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                  borderRadius: '24px',
                  backgroundColor: isHovered ? `rgba(${project.orbColor}, 0.05)` : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered ? `1px solid rgba(${project.orbColor}, 0.3)` : '1px solid rgba(255, 255, 255, 0.06)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.4s ease',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    backgroundColor: `rgba(${project.orbColor}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.4s ease',
                    transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                  }}>
                    <Icon size={28} color={`rgb(${project.orbColor})`} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.85rem',
                      color: `rgb(${project.orbColor})`,
                      fontWeight: '500',
                      marginBottom: '0.5rem'
                    }}>
                      {project.category} · {project.year}
                    </div>
                    <h3 style={{
                      fontSize: '1.5rem',
          fontWeight: '500',
          letterSpacing: '0.005em',
          marginBottom: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.95)'
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0
                    }}>
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}



