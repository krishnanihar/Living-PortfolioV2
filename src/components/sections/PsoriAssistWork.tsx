'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Camera, Brain, Heart, Activity, Users, TrendingUp,
  Target, Award, ChevronDown, ChevronUp, ArrowLeft,
  Circle, Hexagon, Grid3X3, Home as HomeIcon,
  type LucideIcon
} from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
  icon: LucideIcon;
  color: string;
}

interface FeatureCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  color: string;
}

interface PersonaCard {
  name: string;
  age: number;
  role: string;
  severity: string;
  quote: string;
  goals: string[];
  frustrations: string[];
  color: string;
}

export function PsoriAssistWork() {
  const [inView, setInView] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null);
  const [hoveredOtherProject, setHoveredOtherProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const otherProjects = [
    {
      id: 1,
      icon: Target,
      title: 'Air India',
      category: 'Systems & Innovation',
      description: 'Design systems and data visualization for 450+ daily users.',
      year: '2023-2024',
      href: '/work/air-india' as const,
      orbColor: '218, 14, 41'
    },
    {
      id: 2,
      icon: Hexagon,
      title: 'Latent Space',
      category: 'Speculative Design',
      description: 'Exploring ethics of dream technology through critical design.',
      year: '2024',
      href: '/work/latent-space' as const,
      orbColor: '140, 100, 255'
    },
    {
      id: 3,
      icon: Grid3X3,
      title: 'Metamorphic Fractal Reflections',
      category: 'Immersive Installation',
      description: 'Psychedelic journey exploring consciousness and ego dissolution.',
      year: '2023',
      href: '/work/metamorphic-fractal-reflections' as const,
      orbColor: '50, 200, 150'
    },
    {
      id: 4,
      icon: HomeIcon,
      title: 'Living Organism',
      category: 'Meta Design',
      description: 'This portfolio - architected to feel like a living organism.',
      year: '2024',
      href: '/' as const,
      orbColor: '255, 255, 255'
    }
  ] as const;

  const stats: StatItem[] = [
    {
      value: '125M',
      label: 'Global Patients',
      sublabel: '2-3% of population',
      icon: Users,
      color: '99, 102, 241'
    },
    {
      value: '$12M',
      label: 'Year 3 Target',
      sublabel: 'SOM projection',
      icon: TrendingUp,
      color: '34, 197, 94'
    },
    {
      value: '85%+',
      label: 'AI Accuracy',
      sublabel: 'PASI correlation',
      icon: Brain,
      color: '168, 85, 247'
    },
    {
      value: '2.5yr',
      label: 'Diagnosis Delay',
      sublabel: 'PsA detection gap',
      icon: Activity,
      color: '239, 68, 68'
    }
  ];

  const personas: PersonaCard[] = [
    {
      name: 'Sarah',
      age: 34,
      role: 'Marketing Manager',
      severity: 'Moderate (BSA 6%)',
      quote: "I'm so busy that I forget to apply my creams until I'm already in bed",
      goals: ['Streamline treatment routine', 'Understand triggers', 'Avoid biologic escalation'],
      frustrations: ['Complicated medication schedule', 'Social anxiety at work', 'No visibility into progress'],
      color: '99, 102, 241'
    },
    {
      name: 'Marcus',
      age: 52,
      role: 'Construction Foreman',
      severity: 'Severe (BSA 15%) + PsA',
      quote: "I've had psoriasis for 20 years—another app won't cure me",
      goals: ['Prove treatment efficacy objectively', 'Manage worsening joint pain', 'Maintain work capacity'],
      frustrations: ['Apps too complicated', 'Skepticism about digital health', 'Joint pain dismissed as aging'],
      color: '239, 68, 68'
    },
    {
      name: 'Priya',
      age: 28,
      role: 'Yoga Instructor',
      severity: 'Mild (BSA 2.5%)',
      quote: "I want to understand my body's patterns and optimize naturally before medications",
      goals: ['Identify lifestyle triggers', 'Minimize medication use', 'Track holistically'],
      frustrations: ['Existing apps too simplistic', 'No data analytics', 'Disconnected tracking'],
      color: '34, 197, 94'
    },
    {
      name: 'James',
      age: 42,
      role: 'Account Executive',
      severity: 'Moderate + Depression',
      quote: "I'm terrified my kids will get psoriasis—I want to be the healthiest version of myself",
      goals: ['Achieve clearance', 'Manage depression alongside psoriasis', 'Model healthy coping'],
      frustrations: ['Mental health stigma', 'Siloed care', 'Fear of genetic transmission'],
      color: '168, 85, 247'
    }
  ];

  const features: FeatureCard[] = [
    {
      id: 'photo-tracking',
      icon: Camera,
      title: 'AI Photo Tracking',
      description: 'Ghost overlay alignment with clinical-grade PASI scoring',
      details: [
        '85%+ correlation with dermatologist assessments',
        'Ghost overlay of previous photos for consistent alignment',
        'Computer vision-powered lesion detection',
        'Automated body surface area (BSA) calculation',
        'Progress visualization with timeline comparisons'
      ],
      color: '59, 130, 246'
    },
    {
      id: 'predictive',
      icon: Brain,
      title: 'Predictive Analytics',
      description: '7-day flare forecasts using machine learning correlation',
      details: [
        'Multi-modal trigger analysis (stress, weather, diet, sleep)',
        'Pattern recognition across historical data',
        'Personalized risk alerts before symptoms appear',
        'Correlation scoring for lifestyle factors',
        'Actionable recommendations based on your patterns'
      ],
      color: '168, 85, 247'
    },
    {
      id: 'mental-health',
      icon: Heart,
      title: 'Mental Health Integration',
      description: 'PHQ-9/GAD-7 screening with telepsychology referrals',
      details: [
        '20-35% of patients screen positive for depression',
        'Validated screening questionnaires (PHQ-9, GAD-7)',
        'Correlation with symptom severity tracking',
        'Integrated telepsychology referral pathways',
        'Bidirectional care: treating mind and skin together'
      ],
      color: '236, 72, 153'
    },
    {
      id: 'psa-detection',
      icon: Activity,
      title: 'Early PsA Detection',
      description: 'Automated PEST/PASE screening for joint involvement',
      details: [
        '30-40% of psoriasis patients develop PsA',
        '2.5-year average diagnosis delay addressed',
        'Validated screening tools (PEST, PASE, ToPAS)',
        'Smart alerts for rheumatology referral',
        'Preventing irreversible joint damage through early intervention'
      ],
      color: '239, 68, 68'
    },
    {
      id: 'provider-portal',
      icon: Target,
      title: 'Provider Portal',
      description: 'Real-time remote monitoring dashboard for dermatologists',
      details: [
        'Bidirectional communication between patient and provider',
        'Exportable clinical reports with photo timelines',
        'Remote patient monitoring between appointments',
        'Treatment adherence tracking',
        'Seamless EHR integration capabilities'
      ],
      color: '34, 197, 94'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

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
        overflow: 'hidden'
      }}
    >
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
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
          }}
        >
          <ArrowLeft size={16} />
          All Work
        </Link>
      </div>

      {/* Hero Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            color: 'rgb(59, 130, 246)',
            fontSize: '0.85rem',
            fontWeight: '500',
            marginBottom: '1.5rem'
          }}>
            Digital Health · AI/ML · Clinical Validation
          </div>
        </div>

        <h1 style={{
          fontSize: isMobile ? '2.5rem' : '4rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          PsoriAssist
        </h1>

        <p style={{
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '2rem',
          maxWidth: '900px',
          lineHeight: '1.6'
        }}>
          AI-powered psoriasis management platform born from lived experience. Designing clinical-grade tracking, predictive intelligence, and integrated mental health care for 125 million people worldwide.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1rem',
          maxWidth: '600px',
          marginBottom: '3rem'
        }}>
          <div style={{
            padding: '1rem',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '0.25rem' }}>
              Role
            </div>
            <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>
              Designer & Researcher
            </div>
          </div>
          <div style={{
            padding: '1rem',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '0.25rem' }}>
              Timeline
            </div>
            <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>
              Speculative Research Project
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
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
                  backgroundColor: isHovered
                    ? `rgba(${stat.color}, 0.1)`
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered
                    ? `1px solid rgba(${stat.color}, 0.3)`
                    : '1px solid rgba(255, 255, 255, 0.06)',
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
                  transition: 'all 0.4s ease',
                  transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
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
                <div style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '0.25rem',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    {stat.sublabel}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Story Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
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
            The Personal Why
          </h2>
          <div style={{
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '1.5rem'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              This isn't a hypothetical case study. This is my skin. The frustration of forgetting creams, tracking inconsistently on scattered notes, wondering if yesterday's stress or last week's weather triggered today's flare.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              When I started researching psoriasis management tools, I discovered I'm not alone. <strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>125 million people globally</strong> face the same challenges. <strong style={{ color: 'rgba(239, 68, 68, 1)' }}>40-50% of us</strong> forget applications regularly. <strong style={{ color: 'rgba(236, 72, 153, 1)' }}>1 in 5</strong> struggle with depression that's rarely discussed by dermatologists.
            </p>
            <p>
              The gap between "managing" and actually understanding your body felt like a design problem worth solving. So I designed for myself—and everyone else navigating this journey.
            </p>
          </div>
        </div>
      </div>

      {/* Problem Space Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          The Shared Struggle
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            {
              title: 'Treatment Adherence Crisis',
              stat: '40-50%',
              description: 'Adherence rate for topical therapies. Complex regimens, time-consuming applications, forgetfulness.',
              color: '239, 68, 68'
            },
            {
              title: 'Mental Health Burden',
              stat: '20-35%',
              description: 'Screen positive for depression/anxiety. Dermatologists rarely ask, but it affects outcomes.',
              color: '236, 72, 153'
            },
            {
              title: 'PsA Detection Delay',
              stat: '2.5 years',
              description: 'Average diagnosis delay for psoriatic arthritis. 30-40% develop it, many with irreversible damage.',
              color: '239, 68, 68'
            },
            {
              title: 'Trigger Identification',
              stat: '16%',
              description: 'Can identify specific triggers with confidence. Trial-and-error without data is exhausting.',
              color: '168, 85, 247'
            }
          ].map((problem, index) => (
            <div
              key={index}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                borderRadius: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${problem.color}, 0.05)`;
                e.currentTarget.style.borderColor = `rgba(${problem.color}, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: `rgb(${problem.color})`,
                marginBottom: '0.5rem'
              }}>
                {problem.stat}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                {problem.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Design Process Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Designing for Myself (& Others Like Me)
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            {
              phase: 'Discover',
              title: 'Listening Beyond My Experience',
              insights: [
                '25 patient interviews across severity levels',
                '8 dermatologists + 4 rheumatologists',
                '75+ peer-reviewed studies analyzed',
                'Competitive analysis of 12 existing apps'
              ],
              color: '99, 102, 241'
            },
            {
              phase: 'Define',
              title: 'Reframing the Problem',
              insights: [
                'Not: "I need medication reminders"',
                'But: "I need to feel in control"',
                'Jobs-to-be-done: functional, emotional, social',
                '4 personas: Sarah, Marcus, Priya, James'
              ],
              color: '168, 85, 247'
            },
            {
              phase: 'Develop',
              title: 'Solving Real Pain Points',
              insights: [
                'Ghost overlay for consistent photo tracking',
                'AI PASI: "Is it improving?" finally answered',
                '93% usability success after 3 rounds',
                'SUS score: 82/100 (Grade A)'
              ],
              color: '34, 197, 94'
            },
            {
              phase: 'Deliver',
              title: 'Making It Real',
              insights: [
                'Clinical validation RCT (200 participants)',
                'FDA Digital Health pathway consideration',
                'B2B2C model: patients + providers + pharma',
                'Not vaporware—real path to launch'
              ],
              color: '59, 130, 246'
            }
          ].map((stage, index) => (
            <div
              key={index}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                borderRadius: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${stage.color}, 0.05)`;
                e.currentTarget.style.borderColor = `rgba(${stage.color}, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
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
                marginBottom: '1rem'
              }}>
                {stage.phase}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                {stage.title}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {stage.insights.map((insight, i) => (
                  <li
                    key={i}
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
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Personas Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          Meeting the Users
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Four personas representing different experiences, ages, and needs
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
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
                  padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                  borderRadius: '24px',
                  backgroundColor: isHovered
                    ? `rgba(${persona.color}, 0.05)`
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered
                    ? `1px solid rgba(${persona.color}, 0.3)`
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.4s ease',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: `rgba(${persona.color}, 0.15)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: `rgb(${persona.color})`
                    }}>
                      {persona.name[0]}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: 'rgba(255, 255, 255, 0.95)'
                      }}>
                        {persona.name}, {persona.age}
                      </h3>
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.6)'
                      }}>
                        {persona.role} · {persona.severity}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderLeft: `3px solid rgb(${persona.color})`,
                    fontStyle: 'italic',
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: '1.6'
                  }}>
                    "{persona.quote}"
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Goals
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {persona.goals.map((goal, i) => (
                      <li
                        key={i}
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
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Frustrations
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {persona.frustrations.map((frustration, i) => (
                      <li
                        key={i}
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

      {/* Features Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          An App I'd Trust With My Health
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Five features born from frustration, validated through research
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem'
        }}>
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
                  backgroundColor: isHovered || isExpanded
                    ? `rgba(${feature.color}, 0.05)`
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered || isExpanded
                    ? `1px solid rgba(${feature.color}, 0.3)`
                    : '1px solid rgba(255, 255, 255, 0.06)',
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
                      marginBottom: '1rem'
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
                      <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          marginBottom: '0.25rem',
                          color: 'rgba(255, 255, 255, 0.95)'
                        }}>
                          {feature.title}
                        </h3>
                        <p style={{
                          fontSize: '1rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          margin: 0
                        }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{
                        marginTop: '1.5rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        animation: 'fadeIn 0.3s ease'
                      }}>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0
                        }}>
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
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    <ChevronDown size={20} color={`rgb(${feature.color})`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.95)'
        }}>
          What Success Looks Like
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            {
              metric: '+35%',
              title: 'Adherence Improvement',
              description: 'Fewer missed treatments = clearer skin, better outcomes',
              color: '34, 197, 94'
            },
            {
              metric: '20-30%',
              title: 'Greater PASI Reduction',
              description: 'vs. standard care—measurable clinical improvement',
              color: '59, 130, 246'
            },
            {
              metric: '40%',
              title: 'Faster PsA Diagnosis',
              description: 'Preventing irreversible joint damage through early detection',
              color: '239, 68, 68'
            },
            {
              metric: '$1,800',
              title: 'Annual Healthcare Savings',
              description: 'Per patient—treatment that works costs less',
              color: '168, 85, 247'
            }
          ].map((impact, index) => (
            <div
              key={index}
              style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                borderRadius: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${impact.color}, 0.05)`;
                e.currentTarget.style.borderColor = `rgba(${impact.color}, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: `rgb(${impact.color})`,
                marginBottom: '0.75rem'
              }}>
                {impact.metric}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                {impact.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0
              }}>
                {impact.description}
              </p>
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
            Business Model: Sustainable & Ethical
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'rgb(59, 130, 246)',
                marginBottom: '0.5rem'
              }}>
                $9.99/mo
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                Consumer Premium
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'rgb(34, 197, 94)',
                marginBottom: '0.5rem'
              }}>
                $50-150
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                Per Patient B2B
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'rgb(168, 85, 247)',
                marginBottom: '0.5rem'
              }}>
                $12M
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                Year 3 Target (600K users)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 6rem' }}>
        <div style={{
          padding: isMobile ? '3rem 2rem' : '4rem 3rem',
          borderRadius: '32px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Healthcare Designed BY Patients, FOR Patients
          </h2>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            This project sits at the intersection of personal need, design skills, and research rigor.
            Digital health should feel <strong style={{ color: 'rgba(255, 255, 255, 0.95)' }}>human</strong>, not transactional.
            Speculative, but grounded in real pain points.
            A case study in <strong style={{ color: 'rgba(255, 255, 255, 0.95)' }}>empathy-driven design</strong>.
          </p>
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
                  backgroundColor: isHovered
                    ? `rgba(${project.orbColor}, 0.05)`
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered
                    ? `1px solid rgba(${project.orbColor}, 0.3)`
                    : '1px solid rgba(255, 255, 255, 0.06)',
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
