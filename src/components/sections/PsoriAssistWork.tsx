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
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null);
  const [hoveredOtherProject, setHoveredOtherProject] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Section navigation for scroll progress
  const sections = [
    { id: 'hero', label: 'Overview' },
    { id: 'genesis', label: 'Genesis' },
    { id: 'research', label: 'Research' },
    { id: 'personas', label: 'Personas' },
    { id: 'process', label: 'Process' },
    { id: 'features', label: 'Features' },
    { id: 'testing', label: 'Testing' },
    { id: 'impact', label: 'Impact' }
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
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
        padding: isMobile ? '5rem 1rem 3rem' : '6rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Scroll Progress Indicator */}
      {!isMobile && <ScrollProgress sections={sections} color="74, 144, 226" />}

      {/* Ambient Gradient Orb (follows mouse) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(74, 144, 226, 0.06) 0%, transparent 50%)`,
          transition: 'background 0.3s ease-out'
        }}
      />
      {/* Back Button */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '2rem' }}>
        <Link
          href="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
          }}
        >
          <ArrowLeft size={16} />
          All Work
        </Link>
      </div>

      {/* Hero */}
      <div id="hero" style={{ maxWidth: '1400px', margin: '0 auto 6rem', position: 'relative' }}>
        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          backgroundColor: 'rgba(74, 144, 226, 0.1)',
          border: '1px solid rgba(74, 144, 226, 0.2)',
          color: 'rgb(74, 144, 226)',
          fontSize: '0.85rem',
          fontWeight: '500',
          marginBottom: '1.5rem',
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.05s ease-out'
        }}>
          Digital Health · AI/ML · Clinical Validation · 18-Month Research
        </div>

        <h1 style={{
          fontSize: isMobile ? '2.5rem' : '4rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: `translateY(${scrollY * 0.05}px)`,
          transition: 'transform 0.05s ease-out'
        }}>
          PsoriAssist
        </h1>

        <p style={{
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '2rem',
          maxWidth: '900px',
          lineHeight: '1.6',
          transform: `translateY(${scrollY * 0.08}px)`,
          transition: 'transform 0.05s ease-out'
        }}>
          Reimagining psoriasis care through AI-powered digital therapeutics. An 18-month design concept addressing treatment adherence, mental health integration, and early comorbidity detection for 125 million patients globally.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1rem',
          maxWidth: '900px'
        }}>
          {[
            { label: 'Role', value: 'Lead Product Designer & Researcher' },
            { label: 'Duration', value: '18-month design concept' },
            { label: 'Platform', value: 'Cross-platform mobile + Provider web portal' }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '1rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '0.25rem' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '1.5rem'
        }}>
          {stats.map((stat, index) => {
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
                  backgroundColor: isHovered ? `rgba(${stat.color}, 0.1)` : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered ? `1px solid rgba(${stat.color}, 0.3)` : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.4s ease',
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
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: `rgb(${stat.color})`
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.25rem', fontWeight: '500' }}>
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)' }}>
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
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : '2.5rem',
            fontWeight: '700',
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
                    fontWeight: '600',
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

      {/* Research Discovery */}
      <div id="research" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
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
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${theme.color}, 0.05)`;
                e.currentTarget.style.borderColor = `rgba(${theme.color}, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: `rgb(${theme.color})`,
                marginBottom: '0.5rem'
              }}>
                {theme.stat}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
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
      </div>

      {/* Personas */}
      <div id="personas" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
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

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredPersona(persona.name)}
                onMouseLeave={() => setHoveredPersona(null)}
                style={{
                  padding: isMobile ? '2rem 1.5rem' : '2rem 1.5rem',
                  borderRadius: '24px',
                  backgroundColor: isHovered ? `rgba(${persona.color}, 0.05)` : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered ? `1px solid rgba(${persona.color}, 0.3)` : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.4s ease',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
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
                  fontWeight: '700',
                  color: `rgb(${persona.color})`,
                  marginBottom: '1rem'
                }}>
                  {persona.name[0]}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
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
                    fontWeight: '600',
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
                    fontWeight: '600',
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
          })}
        </div>
      </div>

      {/* Double Diamond */}
      <div id="process" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
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
                fontWeight: '600',
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
      <div id="features" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
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
                  backgroundColor: isHovered || isExpanded ? `rgba(${feature.color}, 0.05)` : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered || isExpanded ? `1px solid rgba(${feature.color}, 0.3)` : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.4s ease',
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
                          fontWeight: '600',
                          marginBottom: '0.5rem'
                        }}>
                          {feature.priority} HAVE
                        </div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
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
                              fontWeight: '600',
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
          fontWeight: '700',
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
                    fontWeight: '600',
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
                    fontWeight: '700',
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
            fontWeight: '600',
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
                  fontWeight: '700',
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

      {/* Impact & Business */}
      <div id="impact" style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Impact & Business Strategy
        </h2>

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
                fontWeight: '600',
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
                      fontWeight: '600',
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
            fontWeight: '600',
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
                  fontWeight: '700',
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
            fontWeight: '700',
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

      {/* Other Projects */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: isMobile ? '1.75rem' : '2.5rem',
          fontWeight: '700',
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
                      fontWeight: '600',
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
