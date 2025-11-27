'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Target,
  Trophy,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  Hexagon,
  Grid3X3,
  Heart,
  Zap,
  Layers,
  Cpu,
  Users,
  Search,
  GitBranch,
  BarChart3,
  Compass,
  Rocket,
  Clock,
  Award,
  Star,
  Plane,
  Sparkles,
  Bot,
  Palette,
  Monitor,
  Smartphone,
  MessageSquare,
  type LucideIcon
} from 'lucide-react';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface Award {
  id: string;
  name: string;
  year: string;
  detail: string;
  icon: LucideIcon;
  color: string;
}

interface Project {
  id: number;
  label: string;
  title: string;
  description: string;
  impact: string;
  recruiterFrame: string;
  icon: LucideIcon;
  color: string;
  featured?: boolean;
}

interface OtherProject {
  id: number;
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  year: string;
  href: '/work/latent-space' | '/work/metamorphic-fractal-reflections' | '/' | '/work/psoriassist';
  orbColor: string;
}

interface Differentiator {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface TargetCompany {
  name: string;
  skills: string[];
  color: string;
}

// =============================================================================
// DATA
// =============================================================================

const awards: Award[] = [
  {
    id: 'reddot',
    name: 'Red Dot Award',
    year: '2024',
    detail: 'Displayed in Singapore Museum',
    icon: Award,
    color: '218, 14, 41'
  },
  {
    id: 'stevie',
    name: 'Gold Stevie',
    year: '2024',
    detail: 'First Indian Airline',
    icon: Trophy,
    color: '251, 191, 36'
  },
  {
    id: 'apex',
    name: 'APEX Four Star',
    year: '2025',
    detail: 'Most Improved Airline',
    icon: Star,
    color: '99, 102, 241'
  },
  {
    id: 'wta',
    name: 'World Travel Award',
    year: '2024',
    detail: "Asia's Leading IFE",
    icon: Plane,
    color: '16, 185, 129'
  },
  {
    id: 'appstore',
    name: '4.7★ App Store',
    year: '2024',
    detail: 'Highest Indian Airline',
    icon: Smartphone,
    color: '139, 92, 246'
  },
  {
    id: 'opus',
    name: 'Opus Research',
    year: '2024',
    detail: "Industry's First Gen AI",
    icon: Bot,
    color: '236, 72, 153'
  }
];

const projects: Project[] = [
  {
    id: 1,
    label: '01',
    title: 'Pixel Radar',
    description: 'Figma plugin for automated design consistency checks. Built it myself when no tools existed.',
    impact: '450+ daily users · 30% faster reviews',
    recruiterFrame: 'Builder mindset — shipped tool when none existed',
    icon: Target,
    color: '218, 14, 41',
    featured: true
  },
  {
    id: 2,
    label: '02',
    title: 'Design System & Tokenisation',
    description: 'Reverse-engineered undocumented screens into systematic token framework for four merging airlines.',
    impact: 'Foundation for 4-airline merger',
    recruiterFrame: 'Systems thinking from ambiguity',
    icon: Layers,
    color: '99, 102, 241'
  },
  {
    id: 3,
    label: '03',
    title: 'Search with AI',
    description: 'AI-native search experience using natural language understanding. Part of Red Dot winning trajectory.',
    impact: 'Red Dot Award winning concept',
    recruiterFrame: 'AI-native thinking before playbooks',
    icon: Search,
    color: '139, 92, 246'
  },
  {
    id: 4,
    label: '04',
    title: 'MCP Handoff',
    description: 'Implemented Model Context Protocol for design-engineering handoff. Structured, reliable, modern.',
    impact: 'Replaced fragmented Figma-Slack chaos',
    recruiterFrame: 'Understands AI infrastructure',
    icon: GitBranch,
    color: '16, 185, 129'
  },
  {
    id: 5,
    label: '05',
    title: 'IFE System Design',
    description: 'In-flight entertainment for seat-back screens. Typography at distance, touch during turbulence, zero onboarding.',
    impact: "Asia's Leading Airline IFE Award",
    recruiterFrame: 'Constraint-driven design excellence',
    icon: Monitor,
    color: '251, 146, 60'
  },
  {
    id: 6,
    label: '06',
    title: 'NPS Feedback System',
    description: 'Audited and redesigned feedback collection flows. Turned feedback from checkbox into strategic input.',
    impact: 'Improved response quality & actionability',
    recruiterFrame: 'Data-driven design, research methodology',
    icon: BarChart3,
    color: '236, 72, 153'
  },
  {
    id: 7,
    label: '07',
    title: 'Competitor Analysis',
    description: 'Research methodology analyzing 15+ airline and travel apps. Created the lens for world-class.',
    impact: 'Ongoing reference for team decisions',
    recruiterFrame: 'Strategic thinking, research skills',
    icon: Compass,
    color: '14, 165, 233'
  },
  {
    id: 8,
    label: '08',
    title: 'Liftoff Program',
    description: 'Upskilling workshops, skill shares, critique rituals. Built collaborative culture without waiting for HR.',
    impact: 'Built shared vocabulary & culture',
    recruiterFrame: 'Leadership without authority',
    icon: Users,
    color: '251, 191, 36'
  },
  {
    id: 9,
    label: '09',
    title: 'Microsoft Hackathon',
    description: 'AI-powered solution to improve customer experience. Partnered with Microsoft, built working concept.',
    impact: 'Winner — AI customer experience',
    recruiterFrame: 'External collaboration, AI application',
    icon: Zap,
    color: '99, 102, 241'
  },
  {
    id: 10,
    label: '10',
    title: 'Internal Hackathon',
    description: 'AI-powered time and resource tracking platform. Research, design, code, ship — in a single day.',
    impact: 'Winner — Full platform in 24 hours',
    recruiterFrame: 'Speed, full-stack capability',
    icon: Rocket,
    color: '218, 14, 41'
  }
];

const differentiators: Differentiator[] = [
  {
    id: 1,
    title: 'Builder Mindset',
    description: 'Ships tools, not just designs. Pixel Radar, hackathons, MCP.',
    icon: Zap,
    color: '218, 14, 41'
  },
  {
    id: 2,
    title: 'AI-Native Thinking',
    description: 'Designing for AI before playbooks existed.',
    icon: Cpu,
    color: '139, 92, 246'
  },
  {
    id: 3,
    title: 'Systems from Chaos',
    description: 'Token architecture from undocumented screens.',
    icon: Layers,
    color: '99, 102, 241'
  },
  {
    id: 4,
    title: 'Technical Depth',
    description: '5000 lines in 48 hours. Full-stack execution.',
    icon: GitBranch,
    color: '16, 185, 129'
  },
  {
    id: 5,
    title: 'Written Communication',
    description: 'Works async, documents clearly, builds programs.',
    icon: MessageSquare,
    color: '251, 191, 36'
  },
  {
    id: 6,
    title: 'Ambiguity Tolerance',
    description: 'Four airlines merging. Startup speed in enterprise.',
    icon: Compass,
    color: '236, 72, 153'
  }
];

const targetCompanies: TargetCompany[] = [
  {
    name: 'GitLab',
    skills: ['Systems thinking', 'Async work', 'Technical docs'],
    color: '252, 109, 38'
  },
  {
    name: 'Automattic',
    skills: ['UI craft', 'Written comms', 'Consumer product'],
    color: '0, 148, 194'
  },
  {
    name: 'Anthropic',
    skills: ['AI-native', 'Builder mindset', 'Ambiguity tolerance'],
    color: '204, 149, 106'
  },
  {
    name: 'Hugging Face',
    skills: ['ML product', 'Open source', 'Remote skills'],
    color: '255, 213, 0'
  }
];

const otherProjects: OtherProject[] = [
  {
    id: 2,
    icon: Hexagon,
    title: 'Latent Space',
    category: 'Speculative Design',
    description: 'Speculative design exploration of dream technology ethics.',
    year: '2024',
    href: '/work/latent-space',
    orbColor: '140, 100, 255'
  },
  {
    id: 3,
    icon: Grid3X3,
    title: 'Metamorphic Fractal Reflections',
    category: 'Psychedelic Journey',
    description: 'An immersive installation exploring consciousness through ego dissolution.',
    year: '2023',
    href: '/work/metamorphic-fractal-reflections',
    orbColor: '50, 200, 150'
  },
  {
    id: 4,
    icon: Heart,
    title: 'PsoriAssist',
    category: 'Healthcare AI',
    description: 'AI-powered psoriasis management with 18 months of research.',
    year: '2024',
    href: '/work/psoriassist',
    orbColor: '16, 185, 129'
  }
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AirIndiaWork() {
  const [inView, setInView] = useState(false);
  const [hoveredAward, setHoveredAward] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredDiff, setHoveredDiff] = useState<number | null>(null);
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const [hoveredOtherProject, setHoveredOtherProject] = useState<number | null>(null);
  const [hoveredCTA, setHoveredCTA] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsCarouselRef = useRef<HTMLDivElement>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Projects carousel scroll detection
  useEffect(() => {
    const carousel = projectsCarouselRef.current;
    if (!carousel || !isMobile) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.offsetWidth * 0.85;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentProjectIndex(index);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Background Orbs */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(218, 14, 41, 0.08), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          animation: 'floatOrb 30s ease-in-out infinite',
          opacity: inView ? 1 : 0,
          transition: 'opacity 2s ease-in-out',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'floatOrb 35s ease-in-out infinite 10s',
          opacity: inView ? 1 : 0,
          transition: 'opacity 2s ease-in-out',
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.04), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'floatOrb 40s ease-in-out infinite 20s',
          opacity: inView ? 1 : 0,
          transition: 'opacity 2s ease-in-out',
        }} />
      </div>

      {/* =========================================================================
          SECTION 1: HERO
      ========================================================================= */}
      <header style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(6rem, 12vh, 10rem) 1.5rem clamp(3rem, 8vh, 6rem)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          opacity: inView ? 1 : 0,
        }}>
          {/* Context Header */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.813rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            padding: '0.625rem 1.25rem',
            background: 'var(--glass-05)',
            border: '1px solid var(--glass-10)',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            letterSpacing: '0.05em',
          }}>
            <span style={{ color: 'rgb(218, 14, 41)', fontWeight: '600' }}>$200M transformation</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>140 legacy systems</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Zero design infrastructure</span>
          </div>

          {/* Main Statement */}
          <h1 style={{
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            fontWeight: '200',
            letterSpacing: '-0.04em',
            lineHeight: '1.15',
            marginBottom: '1.75rem',
            color: 'var(--text-primary)',
          }}>
            I build{' '}
            <span style={{
              fontWeight: '600',
              background: 'linear-gradient(135deg, rgb(218, 14, 41), rgb(251, 146, 60))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              design infrastructure
            </span>{' '}
            where none exists.
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.8',
            fontWeight: '300',
          }}>
            When Tata acquired Air India, they inherited decades of technical debt and no design system.
            I joined to build what didn&apos;t exist—systems, tooling, AI features, team culture.
          </p>

          {/* Metadata Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
          }}>
            <div style={{
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              background: 'var(--glass-05)',
              border: '1px solid var(--glass-08)',
              fontSize: '0.813rem',
              fontWeight: '400',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
            }}>
              2022–2024 · Product & New Media Designer
            </div>
            <div style={{
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              background: 'var(--glass-05)',
              border: '1px solid var(--glass-08)',
              fontSize: '0.813rem',
              fontWeight: '400',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
            }}>
              Kochi, India · Remote-ready
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 2: AWARDS MARQUEE
      ========================================================================= */}
      <section style={{
        padding: '2rem 0 4rem',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '500',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}>
            Team Recognition
          </span>
        </div>

        {/* Awards Grid */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)',
            gap: '1rem',
          }}>
            {awards.map((award, index) => {
              const Icon = award.icon;
              const isHovered = hoveredAward === award.id;

              return (
                <div
                  key={award.id}
                  onMouseEnter={() => setHoveredAward(award.id)}
                  onMouseLeave={() => setHoveredAward(null)}
                  style={{
                    position: 'relative',
                    padding: '1.25rem 1rem',
                    borderRadius: '16px',
                    background: isHovered
                      ? `linear-gradient(135deg, rgba(${award.color}, 0.12), var(--glass-05))`
                      : 'var(--glass-04)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${isHovered ? `rgba(${award.color}, 0.3)` : 'var(--glass-08)'}`,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                    cursor: 'default',
                    animation: inView ? `scrollRevealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.08}s both` : 'none',
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: `rgba(${award.color}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.75rem',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  }}>
                    <Icon size={18} style={{ color: `rgb(${award.color})` }} />
                  </div>
                  <div style={{
                    fontSize: '0.813rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}>
                    {award.name}
                  </div>
                  <div style={{
                    fontSize: '0.688rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.4',
                  }}>
                    {award.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE PROBLEM
      ========================================================================= */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '4rem 1.5rem 6rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '300',
            color: 'var(--text-primary)',
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
          }}>
            The Challenge
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            {/* 140 Legacy Systems */}
            <div style={{
              padding: '2rem 1.5rem',
              borderRadius: '20px',
              background: 'var(--glass-04)',
              border: '1px solid var(--glass-08)',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: '600',
                color: 'rgb(218, 14, 41)',
                lineHeight: '1',
                marginBottom: '0.5rem',
              }}>
                140
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}>
                Legacy IT Systems
              </div>
            </div>

            {/* 4 Airlines Merging */}
            <div style={{
              padding: '2rem 1.5rem',
              borderRadius: '20px',
              background: 'var(--glass-04)',
              border: '1px solid var(--glass-08)',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: '600',
                color: 'rgb(99, 102, 241)',
                lineHeight: '1',
                marginBottom: '0.5rem',
              }}>
                4
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}>
                Airlines Merging
              </div>
            </div>

            {/* Zero Infrastructure */}
            <div style={{
              padding: '2rem 1.5rem',
              borderRadius: '20px',
              background: 'var(--glass-04)',
              border: '1px solid var(--glass-08)',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: '600',
                color: 'rgb(251, 191, 36)',
                lineHeight: '1',
                marginBottom: '0.5rem',
              }}>
                0
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}>
                Design Infrastructure
              </div>
            </div>
          </div>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-tertiary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.8',
          }}>
            In January 2022, Tata Group acquired Air India after 69 years of government ownership.
            No design system. No tokens. No documentation. No shared language between design and engineering.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: KEY PROJECTS
      ========================================================================= */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' : 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            marginBottom: '0.75rem',
            color: 'var(--text-primary)',
          }}>
            What I Built
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-tertiary)',
          }}>
            10 projects shipped during the transformation
          </p>
        </div>

        {/* Desktop: Grid Layout */}
        {!isMobile && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}>
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isHovered = hoveredProject === project.id;
              const isFeatured = project.featured;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    position: 'relative',
                    padding: isFeatured ? '2rem' : '1.5rem',
                    borderRadius: '20px',
                    gridColumn: isFeatured ? 'span 2' : 'span 1',
                    gridRow: isFeatured ? 'span 2' : 'span 1',
                    background: isHovered
                      ? `linear-gradient(135deg, rgba(${project.color}, 0.08), var(--glass-04))`
                      : 'var(--glass-04)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: `1px solid ${isHovered ? `rgba(${project.color}, 0.3)` : 'var(--glass-08)'}`,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    cursor: 'default',
                    animation: inView ? `scrollRevealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + index * 0.05}s both` : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Border Shimmer */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '20px',
                      padding: '1px',
                      background: `linear-gradient(90deg, transparent, rgba(${project.color}, 0.6), transparent)`,
                      backgroundSize: '200% 100%',
                      animation: 'borderShimmer 3s ease-in-out infinite',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}>
                    <div style={{
                      width: isFeatured ? '48px' : '40px',
                      height: isFeatured ? '48px' : '40px',
                      borderRadius: '12px',
                      background: `rgba(${project.color}, 0.12)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                    }}>
                      <Icon size={isFeatured ? 24 : 20} style={{ color: `rgb(${project.color})` }} />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.688rem',
                        fontWeight: '600',
                        color: `rgb(${project.color})`,
                        letterSpacing: '0.1em',
                        marginBottom: '0.25rem',
                        opacity: 0.8,
                      }}>
                        {project.label}
                      </div>
                      <h3 style={{
                        fontSize: isFeatured ? '1.375rem' : '1.125rem',
                        fontWeight: '500',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                      }}>
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: isFeatured ? '0.938rem' : '0.875rem',
                    color: 'var(--text-tertiary)',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                    flex: 1,
                  }}>
                    {project.description}
                  </p>

                  {/* Impact */}
                  <div style={{
                    fontSize: '0.813rem',
                    fontWeight: '500',
                    color: `rgb(${project.color})`,
                    marginBottom: '0.5rem',
                  }}>
                    {project.impact}
                  </div>

                  {/* Recruiter Frame */}
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                  }}>
                    {project.recruiterFrame}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile: Horizontal Carousel */}
        {isMobile && (
          <>
            <div
              ref={projectsCarouselRef}
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: '1rem',
              }}
            >
              {projects.map((project) => {
                const Icon = project.icon;

                return (
                  <div
                    key={project.id}
                    style={{
                      flex: '0 0 85%',
                      scrollSnapAlign: 'center',
                      padding: '1.5rem',
                      borderRadius: '20px',
                      background: 'var(--glass-04)',
                      border: '1px solid var(--glass-08)',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: `rgba(${project.color}, 0.12)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon size={20} style={{ color: `rgb(${project.color})` }} />
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.688rem',
                          fontWeight: '600',
                          color: `rgb(${project.color})`,
                          letterSpacing: '0.1em',
                        }}>
                          {project.label}
                        </div>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '500',
                          color: 'var(--text-primary)',
                        }}>
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-tertiary)',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                    }}>
                      {project.description}
                    </p>
                    <div style={{
                      fontSize: '0.813rem',
                      fontWeight: '500',
                      color: `rgb(${project.color})`,
                      marginBottom: '0.5rem',
                    }}>
                      {project.impact}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontStyle: 'italic',
                    }}>
                      {project.recruiterFrame}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Progress */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
            }}>
              {projects.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: currentProjectIndex === index ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: currentProjectIndex === index
                      ? 'rgb(218, 14, 41)'
                      : 'var(--glass-15)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* =========================================================================
          SECTION 5: DEEP DIVE - PIXEL RADAR
      ========================================================================= */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '6rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          padding: '3rem',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.06), var(--glass-04))',
          border: '1px solid rgba(218, 14, 41, 0.15)',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both' : 'none',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            <Sparkles size={20} style={{ color: 'rgb(218, 14, 41)' }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'rgb(218, 14, 41)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Featured Project
            </span>
          </div>

          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            Pixel Radar: Building the Tool That Didn&apos;t Exist
          </h3>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '2rem',
          }}>
            When there&apos;s no design system, every screen is an island. Designers were making isolated decisions.
            Engineers were interpreting specs differently. Reviews caught inconsistencies too late—if at all.
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '2rem',
          }}>
            So I built Pixel Radar—a Figma plugin that automates consistency checks. What started as a personal
            workflow fix became infrastructure serving <strong style={{ color: 'var(--text-primary)' }}>450+ daily users</strong>,
            cutting design review time by <strong style={{ color: 'var(--text-primary)' }}>30%</strong>. It solved a problem the organization
            didn&apos;t have budget or bandwidth to address through official channels.
          </p>

          {/* Stats Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem',
            padding: '1.5rem',
            borderRadius: '16px',
            background: 'var(--glass-04)',
            border: '1px solid var(--glass-08)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: 'rgb(218, 14, 41)',
                lineHeight: '1',
                marginBottom: '0.25rem',
              }}>
                450+
              </div>
              <div style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>
                Daily Users
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: 'rgb(16, 185, 129)',
                lineHeight: '1',
                marginBottom: '0.25rem',
              }}>
                30%
              </div>
              <div style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>
                Faster Reviews
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: 'rgb(99, 102, 241)',
                lineHeight: '1',
                marginBottom: '0.25rem',
              }}>
                Still Running
              </div>
              <div style={{ fontSize: '0.813rem', color: 'var(--text-muted)' }}>
                Production Use
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DEEP DIVE - AI FEATURES
      ========================================================================= */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 1.5rem 6rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          padding: '3rem',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.06), var(--glass-04))',
          border: '1px solid rgba(139, 92, 246, 0.15)',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' : 'none',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            <Cpu size={20} style={{ color: 'rgb(139, 92, 246)' }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'rgb(139, 92, 246)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              AI-Native Design
            </span>
          </div>

          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            Designing for AI Before the Playbook Existed
          </h3>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '2rem',
          }}>
            While the organization modernized basics, I was designing for what comes next. <strong style={{ color: 'var(--text-primary)' }}>Search with AI</strong>—an
            AI-native search experience using natural language understanding—was part of a broader push that led to
            Air India&apos;s generative AI booking feature winning the <strong style={{ color: 'var(--text-primary)' }}>Red Dot Design Award 2024</strong>.
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '2rem',
          }}>
            I also implemented <strong style={{ color: 'var(--text-primary)' }}>Model Context Protocol (MCP)</strong> for design-engineering handoff—bridging
            design and engineering through AI-assisted tooling. The kind of workflow a transformed airline should have,
            not the duct-tape process we inherited.
          </p>

          {/* Connection to AI.g */}
          <div style={{
            padding: '1.5rem',
            borderRadius: '16px',
            background: 'var(--glass-04)',
            border: '1px solid var(--glass-08)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              <Bot size={24} style={{ color: 'rgb(139, 92, 246)' }} />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{
                  fontSize: '0.938rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                }}>
                  Part of the AI.g Ecosystem
                </div>
                <div style={{
                  fontSize: '0.813rem',
                  color: 'var(--text-tertiary)',
                }}>
                  The industry&apos;s first generative AI virtual agent. 20,000+ daily inquiries. 93% containment rate.
                  Winner of Opus Research Conversational AI Award 2024.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: SKILLS TRANSLATION
      ========================================================================= */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1.5rem 6rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both' : 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '400',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}>
            Skills That Translate
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-tertiary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Designing for 140 legacy systems merging under pressure is the same muscle as designing for complex developer platforms.
          </p>
        </div>

        {/* Company Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '1rem',
        }}>
          {targetCompanies.map((company, index) => {
            const isHovered = hoveredCompany === company.name;

            return (
              <div
                key={company.name}
                onMouseEnter={() => setHoveredCompany(company.name)}
                onMouseLeave={() => setHoveredCompany(null)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: isHovered
                    ? `linear-gradient(135deg, rgba(${company.color}, 0.1), var(--glass-04))`
                    : 'var(--glass-04)',
                  border: `1px solid ${isHovered ? `rgba(${company.color}, 0.3)` : 'var(--glass-08)'}`,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  cursor: 'default',
                  animation: inView ? `scrollRevealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${1.0 + index * 0.1}s both` : 'none',
                }}
              >
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: `rgb(${company.color})`,
                  marginBottom: '1rem',
                }}>
                  {company.name}
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}>
                  {company.skills.map((skill, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.813rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <CheckCircle size={14} style={{ color: `rgb(${company.color})`, flexShrink: 0 }} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FULL RECOGNITION
      ========================================================================= */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1.5rem 6rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both' : 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '400',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}>
            Recognition
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-tertiary)',
          }}>
            Team achievements during the transformation
          </p>
        </div>

        {/* Awards Detailed Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1.25rem',
        }}>
          {/* Red Dot */}
          <div style={{
            padding: '2rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.08), var(--glass-04))',
            border: '1px solid rgba(218, 14, 41, 0.2)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <Award size={28} style={{ color: 'rgb(218, 14, 41)' }} />
              <div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                }}>
                  Red Dot Design Award 2024
                </div>
                <div style={{
                  fontSize: '0.813rem',
                  color: 'rgb(218, 14, 41)',
                }}>
                  Design Concepts Category
                </div>
              </div>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              lineHeight: '1.6',
            }}>
              AI-driven booking feature concept. Now displayed in the Red Dot Design Museum in Singapore.
            </p>
          </div>

          {/* Stevie */}
          <div style={{
            padding: '2rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), var(--glass-04))',
            border: '1px solid rgba(251, 191, 36, 0.2)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <Trophy size={28} style={{ color: 'rgb(251, 191, 36)' }} />
              <div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                }}>
                  Gold Stevie Award 2024
                </div>
                <div style={{
                  fontSize: '0.813rem',
                  color: 'rgb(251, 191, 36)',
                }}>
                  Asia-Pacific Innovation
                </div>
              </div>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              lineHeight: '1.6',
            }}>
              First Indian airline to receive this honor. Mobile app innovation and functionality.
            </p>
          </div>

          {/* World Travel */}
          <div style={{
            padding: '2rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), var(--glass-04))',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <Plane size={28} style={{ color: 'rgb(16, 185, 129)' }} />
              <div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                }}>
                  World Travel Awards 2024
                </div>
                <div style={{
                  fontSize: '0.813rem',
                  color: 'rgb(16, 185, 129)',
                }}>
                  Asia&apos;s Leading IFE
                </div>
              </div>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              lineHeight: '1.6',
            }}>
              First Indian airline to win this title. Over 3,000 hours of entertainment content.
            </p>
          </div>

          {/* APEX */}
          <div style={{
            padding: '2rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), var(--glass-04))',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <Star size={28} style={{ color: 'rgb(99, 102, 241)' }} />
              <div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                }}>
                  APEX Four Star 2025
                </div>
                <div style={{
                  fontSize: '0.813rem',
                  color: 'rgb(99, 102, 241)',
                }}>
                  Most Improved Airline
                </div>
              </div>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              lineHeight: '1.6',
            }}>
              Global airline recognition alongside British Airways, Lufthansa, and Thai Airways.
            </p>
          </div>
        </div>

        {/* App Store Rating */}
        <div style={{
          marginTop: '1.25rem',
          padding: '1.5rem 2rem',
          borderRadius: '16px',
          background: 'var(--glass-04)',
          border: '1px solid var(--glass-08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <Smartphone size={24} style={{ color: 'rgb(139, 92, 246)' }} />
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'rgb(139, 92, 246)',
          }}>
            4.7★
          </span>
          <span style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
          }}>
            App Store Rating — Highest of any Indian airline
          </span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: KEY DIFFERENTIATORS
      ========================================================================= */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1.5rem 6rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both' : 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '400',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}>
            What I Bring
          </h2>
        </div>

        {/* Differentiators Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '1rem',
        }}>
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            const isHovered = hoveredDiff === diff.id;

            return (
              <div
                key={diff.id}
                onMouseEnter={() => setHoveredDiff(diff.id)}
                onMouseLeave={() => setHoveredDiff(null)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: isHovered
                    ? `linear-gradient(135deg, rgba(${diff.color}, 0.1), var(--glass-04))`
                    : 'var(--glass-04)',
                  border: `1px solid ${isHovered ? `rgba(${diff.color}, 0.3)` : 'var(--glass-08)'}`,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  cursor: 'default',
                  animation: inView ? `scrollRevealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${1.3 + index * 0.08}s both` : 'none',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: `rgba(${diff.color}, 0.12)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                }}>
                  <Icon size={22} style={{ color: `rgb(${diff.color})` }} />
                </div>
                <div style={{
                  fontSize: '0.938rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}>
                  {diff.title}
                </div>
                <div style={{
                  fontSize: '0.813rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: '1.5',
                }}>
                  {diff.description}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: MORE PROJECTS
      ========================================================================= */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem 6rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          marginBottom: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            More Projects
          </h2>
          <Link
            href="/work"
            onMouseEnter={() => setHoveredCTA('back')}
            onMouseLeave={() => setHoveredCTA(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              background: hoveredCTA === 'back'
                ? 'var(--surface-secondary)'
                : 'transparent',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '400',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <ArrowLeft size={16} />
            <span>All Work</span>
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
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
                  position: 'relative',
                  display: 'block',
                  padding: '2rem',
                  borderRadius: '20px',
                  background: 'var(--surface-primary)',
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: '1px solid var(--border-primary)',
                  textDecoration: 'none',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? `0 20px 40px rgba(${project.orbColor}, 0.15)`
                    : 'var(--shadow-sm)',
                }}
              >
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    padding: '1px',
                    background: `linear-gradient(135deg, rgba(${project.orbColor}, 0.6), rgba(${project.orbColor}, 0.2), rgba(${project.orbColor}, 0.6))`,
                    backgroundSize: '200% 200%',
                    animation: 'borderShimmer 3s ease-in-out infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                  }} />
                )}

                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `rgba(${project.orbColor}, 0.1)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                }}>
                  <Icon size={24} style={{ color: `rgb(${project.orbColor})` }} />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '400',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {project.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.5 }}>•</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{project.year}</span>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: '1.6',
                }}>
                  {project.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border-primary)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          fontSize: '0.813rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--text-tertiary)',
          opacity: 0.5,
        }}>
          © 2024 Air India Case Study · Public-safe with directional metrics
        </div>
      </footer>
    </div>
  );
}
