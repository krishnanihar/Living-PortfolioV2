'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Brain, Network, Sparkles, Lightbulb, Trophy, Briefcase, Rocket } from 'lucide-react';

interface AboutSectionV2Props {
  className?: string;
}

export default function AboutSectionV2({ className = '' }: AboutSectionV2Props) {
  const [mounted, setMounted] = useState(false);
  const [act1InView, setAct1InView] = useState(false);
  const [act2InView, setAct2InView] = useState(false);
  const [act3InView, setAct3InView] = useState(false);
  const [act4InView, setAct4InView] = useState(false);
  const [hoveredPrinciple, setHoveredPrinciple] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const [milestonesInView, setMilestonesInView] = useState<boolean[]>([false, false, false, false]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const observers: IntersectionObserver[] = [];

    const observerOptions = { threshold: 0.2, rootMargin: '0px' };

    const act1Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAct1InView(true),
      observerOptions
    );
    const act2Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAct2InView(true),
      observerOptions
    );
    const act3Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAct3InView(true),
      observerOptions
    );
    const act4Observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAct4InView(true),
      observerOptions
    );

    const act1El = document.getElementById('act-1-philosophy');
    const act2El = document.getElementById('act-2-journey');
    const act3El = document.getElementById('act-3-approach');
    const act4El = document.getElementById('act-4-impact');

    if (act1El) { act1Observer.observe(act1El); observers.push(act1Observer); }
    if (act2El) { act2Observer.observe(act2El); observers.push(act2Observer); }
    if (act3El) { act3Observer.observe(act3El); observers.push(act3Observer); }
    if (act4El) { act4Observer.observe(act4El); observers.push(act4Observer); }

    // Milestone observers
    const milestoneObservers = [0, 1, 2, 3].map((idx) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMilestonesInView(prev => {
              const newState = [...prev];
              newState[idx] = true;
              return newState;
            });
          }
        },
        { threshold: 0.3, rootMargin: '-50px' }
      );
    });

    // Observe each milestone
    setTimeout(() => {
      milestoneObservers.forEach((observer, idx) => {
        const milestoneEl = document.getElementById(`milestone-${idx}`);
        if (milestoneEl) {
          observer.observe(milestoneEl);
          observers.push(observer);
        }
      });
    }, 100);

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const principles = [
    {
      icon: Brain,
      title: 'Consciousness First',
      description: 'Design for the human behind the interaction',
      stat: '10K+ daily users',
    },
    {
      icon: Network,
      title: 'Systems Thinking',
      description: 'Every component breathes within a larger whole',
      stat: '450+ operations',
    },
    {
      icon: Sparkles,
      title: 'Thoughtful Craft',
      description: 'Details matter—from pixels to architecture',
      stat: '18-month deep dives',
    },
  ];

  const projects = [
    {
      title: 'Air India',
      category: 'Enterprise Design Systems',
      description: 'Transforming 450+ daily operations',
      link: '/work/air-india' as const,
      color: 'rgba(218, 14, 41, 0.15)',
      borderColor: 'rgba(218, 14, 41, 0.3)',
    },
    {
      title: 'PsoriAssist',
      category: 'Healthcare AI',
      description: '18-month research deep dive',
      link: '/work/psoriassist' as const,
      color: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    {
      title: 'Latent Space',
      category: 'Consciousness Exploration',
      description: 'Narrative-driven experiences',
      link: '/work/latent-space' as const,
      color: 'rgba(147, 51, 234, 0.15)',
      borderColor: 'rgba(147, 51, 234, 0.3)',
    },
  ];

  const journeyMilestones = [
    {
      year: '2020',
      title: 'The Awakening',
      hook: 'What if interfaces could understand consciousness?',
      event: 'Started exploring consciousness tech & speculative design',
      achievements: [
        'First experiments with design fiction',
        'Discovered Dunne & Raby\'s speculative design',
        'Built first narrative-driven prototypes'
      ],
      icon: Lightbulb,
      category: 'Origin',
      color: 'rgba(147, 51, 234, 0.2)',
      borderColor: 'rgba(147, 51, 234, 0.4)',
    },
    {
      year: '2022',
      title: 'The Breakthrough',
      hook: 'Two hackathons. Same weekend. Both won.',
      event: 'Won 2 hackathons simultaneously—5000 LOC in 48 hours',
      achievements: [
        '5000 lines of code in 48 hours',
        'Built PsoriAssist AI diagnostic system',
        'Created Mythos gaming platform MVP'
      ],
      metrics: [
        { label: 'Lines of Code', value: '5000+' },
        { label: 'Hackathons Won', value: '2' },
        { label: 'Sleep Hours', value: '4' }
      ],
      icon: Trophy,
      category: 'Achievement',
      color: 'rgba(251, 146, 60, 0.2)',
      borderColor: 'rgba(251, 146, 60, 0.4)',
    },
    {
      year: '2023',
      title: 'Enterprise Transformation',
      hook: 'From personal experiments to systems serving thousands.',
      event: 'Joined Air India DesignLAB—transforming enterprise systems',
      achievements: [
        'Designed multi-modal operations dashboard',
        'Built design system for 450+ daily operations',
        'Shipped features used by 10K+ users'
      ],
      metrics: [
        { label: 'Daily Operations', value: '450+' },
        { label: 'Active Users', value: '10K+' },
        { label: 'Team Size', value: '12' }
      ],
      icon: Briefcase,
      category: 'Professional',
      color: 'rgba(218, 14, 41, 0.2)',
      borderColor: 'rgba(218, 14, 41, 0.4)',
    },
    {
      year: '2024',
      title: 'Building at Scale',
      hook: 'Systems that breathe with millions of people.',
      event: 'Building systems that serve millions daily',
      achievements: [
        'Architecting consciousness-aware interfaces',
        'Shipping features to production weekly',
        'Mentoring next generation of designers'
      ],
      metrics: [
        { label: 'Users Served', value: 'Millions' },
        { label: 'Deployments/Week', value: '8+' },
        { label: 'System Uptime', value: '99.9%' }
      ],
      icon: Rocket,
      category: 'Current',
      color: 'rgba(218, 14, 41, 0.2)',
      borderColor: 'rgba(218, 14, 41, 0.4)',
    },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes drawLine {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile responsive adjustments for Act 2 timeline */
        @media (max-width: 768px) {
          #act-2-journey .timeline-container {
            padding-left: 1.5rem !important;
          }

          #act-2-journey .timeline-svg {
            width: 50px !important;
          }

          #act-2-journey .connection-dot {
            left: -1.5rem !important;
          }

          #act-2-journey .milestone-card {
            padding: 1.5rem !important;
          }

          #act-2-journey .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'transparent',
          fontFamily: 'Inter, sans-serif',
          padding: '0',
          position: 'relative',
          zIndex: 1,
        }}
        className={className}
      >
        {/* Act 1: The Philosophy */}
        <div
          id="act-1-philosophy"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 1.5rem',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: '200',
                lineHeight: '1.2',
                letterSpacing: '-0.03em',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
              }}
            >
              Most interfaces <span style={{ fontStyle: 'italic', opacity: 0.6 }}>forget</span>.
              <br />
              They demand you remember their patterns, their flows, their logic.
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '300',
                lineHeight: '1.4',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '2rem',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
              }}
            >
              I build the <span style={{ color: '#DA0E29', fontWeight: '400' }}>opposite</span>.
            </p>

            <div
              style={{
                maxWidth: '800px',
                margin: '0 auto',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
              }}
            >
              <p style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                fontWeight: '300',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '1rem',
              }}>
                Systems that <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '400' }}>remember context</span>.
              </p>
              <p style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                fontWeight: '300',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '1rem',
              }}>
                Interfaces that <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: '400' }}>breathe with human rhythms</span>.
              </p>
              <p style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                fontWeight: '300',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.75)',
              }}>
                Design that respects the space between intention and interaction.
              </p>
            </div>

            {/* Breathing Orb */}
            <div
              style={{
                marginTop: '4rem',
                display: 'flex',
                justifyContent: 'center',
                opacity: act1InView && mounted ? 1 : 0,
                animation: act1InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' : 'none',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(218, 14, 41, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)',
                  filter: 'blur(40px)',
                  animation: 'breathe 4s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Act 2: The Journey - Enhanced Timeline */}
        <div
          id="act-2-journey"
          ref={timelineRef}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '8rem 1.5rem',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative' }}>
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h3
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '1rem',
                  opacity: act2InView && mounted ? 1 : 0,
                  animation: act2InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
                }}
              >
                The Journey
              </h3>
              <p
                style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.65)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  opacity: act2InView && mounted ? 1 : 0,
                  animation: act2InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
                }}
              >
                From speculative experiments to systems serving millions
              </p>
            </div>

            {/* Timeline Container with SVG Spine */}
            <div className="timeline-container" style={{ position: 'relative', paddingLeft: '3rem' }}>
              {/* SVG Timeline Spine */}
              <svg
                className="timeline-svg"
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  height: '100%',
                  width: '100px',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
                viewBox="0 0 100 1000"
                preserveAspectRatio="none"
              >
                {/* Main vertical line */}
                <line
                  x1="48"
                  y1="0"
                  x2="48"
                  y2="1000"
                  stroke="rgba(218, 14, 41, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="0"
                />

                {/* Animated gradient overlay line */}
                <line
                  x1="48"
                  y1="0"
                  x2="48"
                  y2="1000"
                  stroke="url(#timelineGradient)"
                  strokeWidth="3"
                  strokeDasharray="0"
                  style={{
                    opacity: act2InView && mounted ? 1 : 0,
                    transition: 'opacity 1.5s ease-out 0.5s',
                  }}
                />

                <defs>
                  <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(147, 51, 234, 0.6)" />
                    <stop offset="33%" stopColor="rgba(251, 146, 60, 0.6)" />
                    <stop offset="66%" stopColor="rgba(218, 14, 41, 0.6)" />
                    <stop offset="100%" stopColor="rgba(218, 14, 41, 0.8)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Milestones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', position: 'relative', zIndex: 1 }}>
                {journeyMilestones.map((milestone, idx) => {
                  const Icon = milestone.icon;
                  const isInView = milestonesInView[idx] && mounted;
                  const isHovered = hoveredMilestone === idx;

                  return (
                    <div
                      key={idx}
                      id={`milestone-${idx}`}
                      onMouseEnter={() => setHoveredMilestone(idx)}
                      onMouseLeave={() => setHoveredMilestone(null)}
                      style={{
                        position: 'relative',
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? 'translateX(0)' : 'translateX(50px)',
                        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + idx * 0.15}s`,
                      }}
                    >
                      {/* Connection Dot on Timeline */}
                      <div
                        className="connection-dot"
                        style={{
                          position: 'absolute',
                          left: '-3rem',
                          top: '2rem',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: isHovered
                            ? milestone.borderColor.replace('0.4', '0.8')
                            : 'rgba(255, 255, 255, 0.2)',
                          border: isHovered
                            ? `2px solid ${milestone.borderColor.replace('0.4', '1)')}`
                            : '2px solid rgba(255, 255, 255, 0.1)',
                          boxShadow: isHovered
                            ? `0 0 16px ${milestone.borderColor.replace('0.4', '0.4')}`
                            : 'none',
                          transition: 'all 0.3s ease',
                          zIndex: 2,
                        }}
                      />

                      {/* Milestone Card */}
                      <div
                        className="milestone-card"
                        style={{
                          background: isHovered
                            ? 'rgba(10, 10, 10, 0.7)'
                            : 'rgba(10, 10, 10, 0.6)',
                          backdropFilter: 'blur(100px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(100px) saturate(180%)',
                          border: isHovered
                            ? `2px solid ${milestone.borderColor.replace('0.4', '0.8')}`
                            : '1px solid rgba(255, 255, 255, 0.06)',
                          borderRadius: '24px',
                          padding: 'clamp(2rem, 3vw, 2.5rem)',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: isHovered
                            ? `0px 8px 32px rgba(0, 0, 0, 0.5), 0px 0px 24px ${milestone.borderColor.replace('0.4', '0.12')}, 0px 0px 8px rgba(255, 255, 255, 0.02) inset`
                            : '0px 4px 20px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {/* Category Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            padding: '0.375rem 0.875rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            fontSize: '0.6875rem',
                            fontWeight: '500',
                            color: 'rgba(255, 255, 255, 0.5)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {milestone.category}
                        </div>

                        {/* Header: Icon + Year + Title */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
                          <div
                            style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '14px',
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={28} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                          </div>

                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: '1.75rem',
                                fontWeight: '600',
                                color: isHovered
                                  ? milestone.borderColor.replace(/[\d.]+\)$/, '1)')
                                  : 'rgba(255, 255, 255, 0.4)',
                                marginBottom: '0.5rem',
                                letterSpacing: '-0.01em',
                                transition: 'color 0.3s ease',
                              }}
                            >
                              {milestone.year}
                            </div>
                            <h4
                              style={{
                                fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                                fontWeight: '400',
                                color: 'rgba(255, 255, 255, 0.95)',
                                marginBottom: '0.5rem',
                                lineHeight: '1.3',
                              }}
                            >
                              {milestone.title}
                            </h4>
                          </div>
                        </div>

                        {/* Hook Quote */}
                        <div
                          style={{
                            fontSize: 'clamp(1.0625rem, 1.75vw, 1.25rem)',
                            fontWeight: '300',
                            fontStyle: 'italic',
                            color: 'rgba(255, 255, 255, 0.65)',
                            marginBottom: '1.5rem',
                            lineHeight: '1.6',
                          }}
                        >
                          "{milestone.hook}"
                        </div>

                        {/* Event Description */}
                        <p
                          style={{
                            fontSize: 'clamp(1rem, 1.75vw, 1.125rem)',
                            fontWeight: '300',
                            color: 'rgba(255, 255, 255, 0.75)',
                            lineHeight: '1.7',
                            marginBottom: '1.5rem',
                          }}
                        >
                          {milestone.event}
                        </p>

                        {/* Achievements List */}
                        {milestone.achievements && milestone.achievements.length > 0 && (
                          <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                              {milestone.achievements.map((achievement, achIdx) => (
                                <div
                                  key={achIdx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    opacity: isInView ? 1 : 0,
                                    transform: isInView ? 'translateX(0)' : 'translateX(20px)',
                                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + achIdx * 0.1}s`,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '4px',
                                      height: '4px',
                                      borderRadius: '50%',
                                      background: 'rgba(255, 255, 255, 0.3)',
                                      marginTop: '0.5rem',
                                      flexShrink: 0,
                                    }}
                                  />
                                  <span
                                    style={{
                                      fontSize: '0.9375rem',
                                      fontWeight: '300',
                                      color: 'rgba(255, 255, 255, 0.6)',
                                      lineHeight: '1.65',
                                    }}
                                  >
                                    {achievement}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Metrics Grid */}
                        {milestone.metrics && milestone.metrics.length > 0 && (
                          <div
                            className="metrics-grid"
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                              gap: '1.5rem',
                              marginTop: '2rem',
                              paddingTop: '1.5rem',
                              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                            }}
                          >
                            {milestone.metrics.map((metric, metricIdx) => (
                              <div
                                key={metricIdx}
                                style={{
                                  opacity: isInView ? 1 : 0,
                                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + metricIdx * 0.1}s`,
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                                    fontWeight: '500',
                                    color: isHovered
                                      ? milestone.borderColor.replace(/[\d.]+\)$/, '1)')
                                      : 'rgba(255, 255, 255, 0.9)',
                                    marginBottom: '0.375rem',
                                    lineHeight: '1.2',
                                    transition: 'color 0.3s ease',
                                  }}
                                >
                                  {metric.value}
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '400',
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                  }}
                                >
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Act 3: The Approach */}
        <div
          id="act-3-approach"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 1.5rem',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <h3
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '1.5rem',
                textAlign: 'center',
                opacity: act3InView && mounted ? 1 : 0,
                animation: act3InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
              }}
            >
              Three principles guide everything I build
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '4rem',
              }}
            >
              {principles.map((principle, idx) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredPrinciple(idx)}
                    onMouseLeave={() => setHoveredPrinciple(null)}
                    style={{
                      padding: '2.5rem 2rem',
                      background: hoveredPrinciple === idx
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(100px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '20px',
                      boxShadow: hoveredPrinciple === idx
                        ? '0px 16px 48px rgba(0, 0, 0, 0.5), 0px 0px 16px rgba(255, 255, 255, 0.04) inset'
                        : '0px 8px 30px rgba(0, 0, 0, 0.41), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredPrinciple === idx ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                      opacity: act3InView && mounted ? 1 : 0,
                      animation: act3InView && mounted ? `fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + idx * 0.15}s both` : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '15px',
                        background: 'rgba(218, 14, 41, 0.15)',
                        border: '1px solid rgba(218, 14, 41, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <Icon size={28} style={{ color: '#DA0E29' }} />
                    </div>

                    <h4
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        color: 'rgba(255, 255, 255, 0.95)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {principle.title}
                    </h4>

                    <p
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: '300',
                        color: 'rgba(255, 255, 255, 0.75)',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {principle.description}
                    </p>

                    <div
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        display: 'inline-block',
                      }}
                    >
                      <p style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: 'rgba(255, 255, 255, 0.8)',
                      }}>
                        {principle.stat}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Act 4: The Impact */}
        <div
          id="act-4-impact"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 1.5rem',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <h3
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '1.5rem',
                textAlign: 'center',
                opacity: act4InView && mounted ? 1 : 0,
                animation: act4InView && mounted ? 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
              }}
            >
              What this looks like in practice
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                marginTop: '4rem',
              }}
            >
              {projects.map((project, idx) => (
                <Link
                  key={idx}
                  href={project.link}
                  onMouseEnter={() => setHoveredProject(idx)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    display: 'block',
                    padding: '2.5rem 2rem',
                    background: hoveredProject === idx
                      ? project.color.replace('0.15', '0.2')
                      : project.color,
                    backdropFilter: 'blur(100px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                    border: `1px solid ${project.borderColor}`,
                    borderRadius: '20px',
                    textDecoration: 'none',
                    boxShadow: hoveredProject === idx
                      ? '0px 16px 48px rgba(0, 0, 0, 0.5), 0px 0px 16px rgba(255, 255, 255, 0.04) inset'
                      : '0px 8px 30px rgba(0, 0, 0, 0.41), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredProject === idx ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    opacity: act4InView && mounted ? 1 : 0,
                    animation: act4InView && mounted ? `fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + idx * 0.15}s both` : 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.6)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {project.category}
                  </div>

                  <h4
                    style={{
                      fontSize: '2rem',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.95)',
                      marginBottom: '1rem',
                    }}
                  >
                    {project.title}
                  </h4>

                  <p
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.75)',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9375rem',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    View case study
                    <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Closing: The Invitation */}
        <div
          style={{
            padding: '6rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '3rem',
              }}
            >
              Want to build something that <span style={{ color: '#DA0E29', fontWeight: '400' }}>matters</span>?
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Link
                href="/journey"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.15))',
                  border: '1.5px solid rgba(218, 14, 41, 0.4)',
                  borderRadius: '15px',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: '500',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0px 8px 30px rgba(218, 14, 41, 0.25), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
                  backdropFilter: 'blur(100px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.3), rgba(218, 14, 41, 0.2))';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.15))';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <span>Explore the Full Journey</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '15px',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: '400',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  backdropFilter: 'blur(100px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <Mail size={18} />
                <span>Let's Talk</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
