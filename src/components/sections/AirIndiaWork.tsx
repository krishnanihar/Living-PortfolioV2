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

interface ProjectStat {
  value: string;
  label: string;
}

interface Project {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  imagePlaceholder: string;
  stats: ProjectStat[];
  recruiterFrame: string;
  icon: LucideIcon;
  color: string;
  category: string;
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
    subtitle: 'Figma plugin for automated design consistency',
    description: 'Built it myself when no tools existed.',
    longDescription: 'When there\'s no design system, every screen is an island. Designers were making isolated decisions. Engineers were interpreting specs differently. Reviews caught inconsistencies too late—if at all.\n\nSo I built Pixel Radar—a Figma plugin that automates consistency checks. What started as a personal workflow fix became infrastructure serving 450+ daily users, cutting design review time by 30%. It solved a problem the organization didn\'t have budget or bandwidth to address through official channels.',
    imagePlaceholder: 'Pixel Radar Plugin Interface',
    stats: [
      { value: '450+', label: 'Daily Users' },
      { value: '30%', label: 'Faster Reviews' },
      { value: 'Active', label: 'Production Use' }
    ],
    recruiterFrame: 'Builder mindset — shipped tool when none existed',
    icon: Target,
    color: '218, 14, 41',
    category: 'TOOL'
  },
  {
    id: 2,
    label: '02',
    title: 'Design System & Tokenisation',
    subtitle: 'Token architecture for four merging airlines',
    description: 'Reverse-engineered undocumented screens into systematic framework.',
    longDescription: 'I started by reverse-engineering what existed. Hundreds of screens, undocumented, built over years by people who\'d since left. I extracted the implicit logic—spacing patterns, typography decisions, color usage—and codified it into a systematic token framework.\n\nThis became the foundation that would let four merging airlines eventually speak the same design language. Variables, naming conventions, hierarchy—the infrastructure that makes consistency possible at scale.',
    imagePlaceholder: 'Token Architecture Diagram',
    stats: [
      { value: '4', label: 'Airlines Unified' },
      { value: '100s', label: 'Screens Analyzed' },
      { value: 'Core', label: 'Infrastructure' }
    ],
    recruiterFrame: 'Systems thinking from ambiguity',
    icon: Layers,
    color: '99, 102, 241',
    category: 'SYSTEM'
  },
  {
    id: 3,
    label: '03',
    title: 'Search with AI',
    subtitle: 'AI-native search using natural language',
    description: 'Part of Red Dot winning trajectory.',
    longDescription: 'While the organization modernized basics, I was designing for what comes next. Search with AI—an AI-native search experience using natural language understanding—rethinks how passengers interact with an airline.\n\nThis was part of a broader push that led to Air India\'s generative AI booking feature winning the Red Dot Design Award 2024, now showcased in the Red Dot Design Museum in Singapore.',
    imagePlaceholder: 'AI Search Interface Mockup',
    stats: [
      { value: 'Red Dot', label: '2024 Award' },
      { value: 'NLU', label: 'Powered' },
      { value: 'Singapore', label: 'Museum Display' }
    ],
    recruiterFrame: 'AI-native thinking before playbooks',
    icon: Search,
    color: '139, 92, 246',
    category: 'AI'
  },
  {
    id: 4,
    label: '04',
    title: 'MCP Handoff',
    subtitle: 'Model Context Protocol for design-dev workflow',
    description: 'Structured, reliable, modern handoff.',
    longDescription: 'Design systems only matter if engineering implements them accurately. Handoff at Air India was fragmented—Figma links in Slack threads, specs that didn\'t match builds, endless back-and-forth.\n\nI implemented a design-dev handoff workflow using Model Context Protocol—bridging design and engineering through AI-assisted tooling. The kind of workflow a transformed airline should have, not the duct-tape process we inherited.',
    imagePlaceholder: 'MCP Workflow Diagram',
    stats: [
      { value: 'MCP', label: 'Protocol' },
      { value: '0', label: 'Slack Chaos' },
      { value: 'AI', label: 'Assisted' }
    ],
    recruiterFrame: 'Understands AI infrastructure (Anthropic created MCP)',
    icon: GitBranch,
    color: '16, 185, 129',
    category: 'AI'
  },
  {
    id: 5,
    label: '05',
    title: 'IFE System Design',
    subtitle: 'In-flight entertainment at 35,000 feet',
    description: 'Typography at distance, touch during turbulence, zero onboarding.',
    longDescription: 'Designing for a screen you can\'t control, lighting you can\'t predict, and users who range from toddlers to elderly passengers with no onboarding. IFE is constraint-driven design at its most demanding.\n\nTypography legible at seat-back distance. Touch targets that work during turbulence. Content hierarchy for passengers browsing at 35,000 feet. This work contributed to Air India winning Asia\'s Leading Airline Inflight Entertainment at the World Travel Awards.',
    imagePlaceholder: 'IFE Seat-back Interface',
    stats: [
      { value: 'WTA', label: '2024 Winner' },
      { value: '3000+', label: 'Hours Content' },
      { value: 'Asia #1', label: 'IFE Ranking' }
    ],
    recruiterFrame: 'Constraint-driven design excellence',
    icon: Monitor,
    color: '251, 146, 60',
    category: 'IFE'
  },
  {
    id: 6,
    label: '06',
    title: 'NPS Feedback System',
    subtitle: 'Turning feedback into strategic input',
    description: 'Audited and redesigned feedback collection flows.',
    longDescription: 'Transformation requires knowing what\'s working. I audited existing feedback flows, identified friction through data, and rebuilt how Air India listens to its passengers.\n\nFeedback went from a checkbox exercise to a strategic input—improving response quality, actionability, and the speed at which insights reached decision-makers.',
    imagePlaceholder: 'Feedback Flow Screens',
    stats: [
      { value: 'Data', label: 'Driven' },
      { value: 'Quality', label: 'Improved' },
      { value: 'Strategic', label: 'Input' }
    ],
    recruiterFrame: 'Data-driven design, research methodology',
    icon: BarChart3,
    color: '236, 72, 153',
    category: 'RESEARCH'
  },
  {
    id: 7,
    label: '07',
    title: 'Competitor Analysis',
    subtitle: 'Research framework for world-class benchmarking',
    description: 'Analyzing 15+ airline and travel apps.',
    longDescription: 'You can\'t build a world-class airline experience without understanding what world-class looks like. I created a comprehensive research methodology analyzing 15+ airline and travel apps.\n\nThe framework became an ongoing reference for team decisions—a shared lens for evaluating design choices against industry best practices and emerging patterns.',
    imagePlaceholder: 'Competitor Research Framework',
    stats: [
      { value: '15+', label: 'Apps Analyzed' },
      { value: 'Ongoing', label: 'Reference' },
      { value: 'Team', label: 'Resource' }
    ],
    recruiterFrame: 'Strategic thinking, research skills',
    icon: Compass,
    color: '14, 165, 233',
    category: 'RESEARCH'
  },
  {
    id: 8,
    label: '08',
    title: 'Liftoff Program',
    subtitle: 'Team upskilling and culture building',
    description: 'Built collaborative culture without waiting for HR.',
    longDescription: 'You can\'t transform products without transforming the people building them. Tata inherited employees from legacy Air India—talented individuals, but no shared culture, no common design vocabulary, no upskilling infrastructure.\n\nI initiated Liftoff—workshops, skill shares, critique rituals—building the collaborative culture a transformation of this scale demands. I didn\'t wait for HR. The team needed it, so I built it.',
    imagePlaceholder: 'Workshop & Team Sessions',
    stats: [
      { value: 'Culture', label: 'Built' },
      { value: 'Shared', label: 'Vocabulary' },
      { value: 'Self', label: 'Initiated' }
    ],
    recruiterFrame: 'Leadership without authority',
    icon: Users,
    color: '251, 191, 36',
    category: 'CULTURE'
  },
  {
    id: 9,
    label: '09',
    title: 'Microsoft Hackathon',
    subtitle: 'AI-powered customer experience solution',
    description: 'Partnered with Microsoft, built working concept.',
    longDescription: 'Partnered with Microsoft on an AI-powered solution to improve customer experience across Air India\'s touchpoints. Built and presented a working concept addressing real friction points passengers face.\n\nUsing AI to make the airline more responsive, more intuitive, more human. The solution won, demonstrating the potential of AI-native thinking applied to real operational challenges.',
    imagePlaceholder: 'Hackathon Presentation',
    stats: [
      { value: 'Winner', label: 'Microsoft' },
      { value: 'AI', label: 'Powered' },
      { value: 'Working', label: 'Concept' }
    ],
    recruiterFrame: 'External collaboration, AI application',
    icon: Zap,
    color: '99, 102, 241',
    category: 'HACKATHON'
  },
  {
    id: 10,
    label: '10',
    title: 'Internal Hackathon',
    subtitle: 'Full platform shipped in 24 hours',
    description: 'Research, design, code, ship — in a single day.',
    longDescription: 'Researched Firebase Studio, then designed and built an AI-powered internal platform for time tracking, resource allocation, and work management—in a single day.\n\nEnd-to-end: research, design, code, ship. Solved an operational pain point the organization hadn\'t prioritized. Two different hackathons, two wins. Same pattern: see a gap, build the solution, ship fast.',
    imagePlaceholder: 'Platform Screenshots',
    stats: [
      { value: 'Winner', label: 'Internal' },
      { value: '24hrs', label: 'Shipped' },
      { value: 'E2E', label: 'Execution' }
    ],
    recruiterFrame: 'Speed, full-stack capability',
    icon: Rocket,
    color: '218, 14, 41',
    category: 'HACKATHON'
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
  const [inView, setInView] = useState(true);
  const [hoveredAward, setHoveredAward] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredDiff, setHoveredDiff] = useState<number | null>(null);
  const [hoveredOtherProject, setHoveredOtherProject] = useState<number | null>(null);
  const [hoveredCTA, setHoveredCTA] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
          SECTION 2: THE CHALLENGE
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
          SECTION 4: KEY PROJECTS - PREMIUM VISUAL BENTO GRID
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
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '500',
            letterSpacing: '-0.03em',
            marginBottom: '0.75rem',
            color: 'var(--text-primary)',
          }}>
            What I Built
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-tertiary)',
          }}>
            10 projects shipped during the transformation
          </p>
        </div>

        {/* Premium Visual Bento Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gridAutoRows: 'minmax(300px, auto)',
          gap: '1.25rem',
        }}>
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredProject === project.id;

            // Determine card size based on index
            const getCardSize = () => {
              if (isMobile) return { cols: 'span 1', rows: 'span 1', minHeight: '380px' };
              switch(index) {
                case 0: return { cols: 'span 2', rows: 'span 2', minHeight: '620px' }; // Pixel Radar - HERO
                case 5: return { cols: 'span 2', rows: 'span 1', minHeight: '320px' }; // NPS - Wide
                case 6: return { cols: 'span 2', rows: 'span 1', minHeight: '320px' }; // Competitor - Wide
                case 9: return { cols: 'span 3', rows: 'span 1', minHeight: '300px' }; // Internal Hackathon - Full
                default: return { cols: 'span 1', rows: 'span 1', minHeight: '320px' }; // Standard
              }
            };
            const cardSize = getCardSize();
            const isHero = index === 0 && !isMobile;
            const isWide = (index === 5 || index === 6) && !isMobile;
            const isFull = index === 9 && !isMobile;

            // Custom visual content per project type
            const renderCardVisual = () => {
              // Hero card (Pixel Radar) - Figma plugin UI mockup
              if (isHero) {
                return (
                  <div style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '320px',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    opacity: isHovered ? 1 : 0.7,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}>
                    {/* Floating UI Panel 1 */}
                    <div style={{
                      padding: '16px 20px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(218,14,41,0.15), var(--glass-08))',
                      border: '1px solid rgba(218,14,41,0.25)',
                      backdropFilter: 'blur(20px)',
                      transform: isHovered ? 'translateX(-20px) rotate(-2deg)' : 'translateX(0) rotate(-1deg)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 20px 40px -10px rgba(218,14,41,0.2)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgb(16,185,129)' }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Consistency Check</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {['Spacing', 'Colors', 'Typography'].map((item, i) => (
                          <span key={i} style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: 'var(--glass-10)',
                            fontSize: '0.625rem',
                            color: 'var(--text-muted)',
                            fontWeight: '500',
                          }}>{item} ✓</span>
                        ))}
                      </div>
                    </div>
                    {/* Floating UI Panel 2 - Stats */}
                    <div style={{
                      padding: '16px 20px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, var(--glass-08), rgba(218,14,41,0.1))',
                      border: '1px solid var(--glass-12)',
                      backdropFilter: 'blur(20px)',
                      transform: isHovered ? 'translateX(-30px) rotate(1deg)' : 'translateX(0) rotate(0deg)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                      boxShadow: '0 15px 30px -10px rgba(0,0,0,0.3)',
                    }}>
                      <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Daily Active Users</div>
                      <div style={{ fontSize: '2rem', fontWeight: '700', color: 'rgb(218,14,41)', lineHeight: 1 }}>450+</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <TrendingUp size={12} style={{ color: 'rgb(16,185,129)' }} />
                        <span style={{ fontSize: '0.625rem', color: 'rgb(16,185,129)' }}>+23% this week</span>
                      </div>
                    </div>
                    {/* Floating UI Panel 3 - Progress */}
                    <div style={{
                      padding: '16px 20px',
                      borderRadius: '16px',
                      background: 'var(--glass-06)',
                      border: '1px solid var(--glass-10)',
                      backdropFilter: 'blur(20px)',
                      transform: isHovered ? 'translateX(-15px) rotate(-1deg)' : 'translateX(0) rotate(0deg)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                    }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Review Time Reduced</div>
                      <div style={{ height: '8px', borderRadius: '4px', background: 'var(--glass-10)', overflow: 'hidden' }}>
                        <div style={{ width: '70%', height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg, rgb(218,14,41), rgb(251,146,60))' }} />
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '8px' }}>30% faster</div>
                    </div>
                  </div>
                );
              }

              // Design System (index 1) - Token nodes
              if (index === 1) {
                return (
                  <div style={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '80px',
                    width: '140px',
                    height: '140px',
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}>
                    {/* Central node */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`,
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, rgb(${project.color}), rgba(${project.color}, 0.6))`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 40px rgba(${project.color}, 0.4)`,
                      transition: 'transform 0.4s ease',
                    }}>
                      <Layers size={20} style={{ color: 'white' }} />
                    </div>
                    {/* Orbiting nodes */}
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '24px',
                        height: '24px',
                        borderRadius: '8px',
                        background: 'var(--glass-15)',
                        border: `1px solid rgba(${project.color}, 0.3)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(55px) rotate(-${angle}deg)`,
                        transition: 'all 0.4s ease',
                        animation: isHovered ? `pulse 2s ease-in-out ${i * 0.2}s infinite` : 'none',
                      }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '3px', background: `rgb(${project.color})` }} />
                      </div>
                    ))}
                    {/* Connection lines (SVG) */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                      {[0, 72, 144, 216, 288].map((angle, i) => {
                        const rad = (angle * Math.PI) / 180;
                        const x2 = 70 + Math.cos(rad) * 45;
                        const y2 = 70 + Math.sin(rad) * 45;
                        return (
                          <line key={i} x1="70" y1="70" x2={x2} y2={y2}
                            stroke={`rgba(${project.color}, 0.3)`}
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                        );
                      })}
                    </svg>
                  </div>
                );
              }

              // AI projects (index 2, 3) - Neural network visual
              if (index === 2 || index === 3) {
                return (
                  <div style={{
                    position: 'absolute',
                    right: '15px',
                    bottom: '70px',
                    width: '120px',
                    height: '100px',
                    opacity: isHovered ? 1 : 0.5,
                    transition: 'all 0.5s ease',
                  }}>
                    {/* Glowing orbs */}
                    {[
                      { x: 20, y: 20, size: 12, delay: 0 },
                      { x: 60, y: 10, size: 16, delay: 0.2 },
                      { x: 100, y: 25, size: 10, delay: 0.4 },
                      { x: 30, y: 60, size: 14, delay: 0.1 },
                      { x: 70, y: 50, size: 20, delay: 0.3 },
                      { x: 95, y: 70, size: 12, delay: 0.5 },
                    ].map((orb, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        left: orb.x,
                        top: orb.y,
                        width: orb.size,
                        height: orb.size,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, rgb(${project.color}), rgba(${project.color}, 0.3))`,
                        boxShadow: `0 0 ${orb.size * 2}px rgba(${project.color}, 0.5)`,
                        animation: isHovered ? `float 3s ease-in-out ${orb.delay}s infinite` : 'none',
                      }} />
                    ))}
                    {/* Connection lines */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                      <line x1="26" y1="26" x2="68" y2="18" stroke={`rgba(${project.color}, 0.2)`} strokeWidth="1" />
                      <line x1="68" y1="18" x2="105" y2="30" stroke={`rgba(${project.color}, 0.2)`} strokeWidth="1" />
                      <line x1="37" y1="67" x2="80" y2="60" stroke={`rgba(${project.color}, 0.2)`} strokeWidth="1" />
                      <line x1="80" y1="60" x2="101" y2="76" stroke={`rgba(${project.color}, 0.2)`} strokeWidth="1" />
                      <line x1="68" y1="18" x2="80" y2="60" stroke={`rgba(${project.color}, 0.15)`} strokeWidth="1" />
                    </svg>
                  </div>
                );
              }

              // IFE (index 4) - Screen mockup
              if (index === 4) {
                return (
                  <div style={{
                    position: 'absolute',
                    right: '15px',
                    bottom: '70px',
                    width: '100px',
                    height: '70px',
                    borderRadius: '8px',
                    background: 'linear-gradient(180deg, var(--glass-15), var(--glass-08))',
                    border: `1px solid rgba(${project.color}, 0.3)`,
                    padding: '8px',
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'all 0.5s ease',
                    transform: isHovered ? 'scale(1.05) rotate(-2deg)' : 'scale(1)',
                    boxShadow: `0 10px 30px rgba(${project.color}, 0.2)`,
                  }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                      {[1,2,3].map(i => <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: `rgb(${project.color})` }} />)}
                    </div>
                    <div style={{ height: '6px', borderRadius: '3px', background: `rgba(${project.color}, 0.3)`, marginBottom: '4px', width: '70%' }} />
                    <div style={{ height: '4px', borderRadius: '2px', background: 'var(--glass-15)', marginBottom: '2px', width: '90%' }} />
                    <div style={{ height: '4px', borderRadius: '2px', background: 'var(--glass-10)', width: '60%' }} />
                  </div>
                );
              }

              // Research cards (index 5, 6) - Chart visual
              if (index === 5 || index === 6) {
                return (
                  <div style={{
                    position: 'absolute',
                    right: '40px',
                    bottom: '70px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    height: '80px',
                    opacity: isHovered ? 1 : 0.5,
                    transition: 'all 0.5s ease',
                  }}>
                    {[40, 65, 50, 80, 55, 70].map((h, i) => (
                      <div key={i} style={{
                        width: '16px',
                        height: `${h}%`,
                        borderRadius: '4px 4px 0 0',
                        background: `linear-gradient(180deg, rgb(${project.color}), rgba(${project.color}, 0.3))`,
                        transition: 'all 0.4s ease',
                        transform: isHovered ? `scaleY(${1 + i * 0.05})` : 'scaleY(1)',
                        transformOrigin: 'bottom',
                        boxShadow: isHovered ? `0 0 15px rgba(${project.color}, 0.3)` : 'none',
                      }} />
                    ))}
                  </div>
                );
              }

              // Culture (index 7) - People nodes
              if (index === 7) {
                return (
                  <div style={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '75px',
                    display: 'flex',
                    gap: '-8px',
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'all 0.5s ease',
                  }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, rgba(${project.color}, ${0.8 - i * 0.2}), rgba(${project.color}, ${0.4 - i * 0.1}))`,
                        border: '2px solid var(--glass-20)',
                        marginLeft: i > 0 ? '-10px' : 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: isHovered ? `translateY(${i * -4}px)` : 'translateY(0)',
                        transition: `all 0.4s ease ${i * 0.1}s`,
                        boxShadow: `0 0 20px rgba(${project.color}, 0.3)`,
                      }}>
                        <Users size={14} style={{ color: 'white' }} />
                      </div>
                    ))}
                  </div>
                );
              }

              // Hackathons (index 8, 9) - Trophy/rocket visual
              if (index === 8 || index === 9) {
                return (
                  <div style={{
                    position: 'absolute',
                    right: index === 9 ? '60px' : '20px',
                    bottom: index === 9 ? '50%' : '75px',
                    transform: index === 9 ? 'translateY(50%)' : 'none',
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'all 0.5s ease',
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: `linear-gradient(135deg, rgb(${project.color}), rgba(${project.color}, 0.5))`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 40px rgba(${project.color}, 0.4), 0 0 80px rgba(${project.color}, 0.2)`,
                      transform: isHovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
                      transition: 'all 0.4s ease',
                    }}>
                      {index === 8 ? <Zap size={24} style={{ color: 'white' }} /> : <Rocket size={24} style={{ color: 'white' }} />}
                    </div>
                    {/* Sparkle particles */}
                    {isHovered && [0, 1, 2].map(i => (
                      <div key={i} style={{
                        position: 'absolute',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: `rgb(${project.color})`,
                        top: `${10 + i * 15}px`,
                        right: `${-5 + i * 8}px`,
                        animation: `sparkle 1s ease-in-out ${i * 0.2}s infinite`,
                        boxShadow: `0 0 10px rgb(${project.color})`,
                      }} />
                    ))}
                  </div>
                );
              }

              return null;
            };

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  gridColumn: cardSize.cols,
                  gridRow: cardSize.rows,
                  minHeight: cardSize.minHeight,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: isHero ? '2.5rem' : isFull ? '2rem 2.5rem' : '2rem',
                  borderRadius: '24px',
                  background: `
                    radial-gradient(ellipse at ${isHero ? '30% 30%' : '70% 30%'}, rgba(${project.color}, ${isHovered ? 0.2 : 0.12}), transparent 50%),
                    radial-gradient(ellipse at ${isHero ? '80% 80%' : '30% 70%'}, rgba(${project.color}, ${isHovered ? 0.08 : 0.04}), transparent 50%),
                    var(--glass-04)
                  `,
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: `1px solid ${isHovered ? `rgba(${project.color}, 0.4)` : 'var(--glass-08)'}`,
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered
                    ? `0 30px 80px -20px rgba(${project.color}, 0.3), 0 0 0 1px rgba(${project.color}, 0.1)`
                    : '0 4px 20px rgba(0,0,0,0.1)',
                  animation: inView ? `scrollRevealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.08}s both` : 'none',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Animated Glow Orb */}
                <div style={{
                  position: 'absolute',
                  top: isHero ? '30%' : '20%',
                  right: isHero ? '15%' : '10%',
                  width: isHero ? '200px' : '100px',
                  height: isHero ? '200px' : '100px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(${project.color}, ${isHovered ? 0.25 : 0.1}), transparent 70%)`,
                  filter: 'blur(40px)',
                  transition: 'all 0.6s ease',
                  pointerEvents: 'none',
                }} />

                {/* Border Shimmer on Hover */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '24px',
                    padding: '1px',
                    background: `linear-gradient(90deg, transparent, rgba(${project.color}, 0.6), transparent)`,
                    backgroundSize: '200% 100%',
                    animation: 'borderShimmer 2s ease-in-out infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Custom Visual Content */}
                {!isMobile && renderCardVisual()}

                {/* Top Section: Category Badge */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: isHero ? '1.5rem' : '1rem',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.375rem 0.875rem',
                    borderRadius: '100px',
                    background: `rgba(${project.color}, 0.15)`,
                    border: `1px solid rgba(${project.color}, 0.25)`,
                    fontSize: '0.625rem',
                    fontWeight: '600',
                    letterSpacing: '0.15em',
                    color: `rgb(${project.color})`,
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(10px)',
                  }}>
                    {project.category}
                  </div>
                </div>

                {/* Middle Section: Title + Subtitle */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: isHero ? 'center' : 'flex-start',
                  position: 'relative',
                  zIndex: 2,
                  maxWidth: isHero ? '55%' : isWide ? '50%' : '100%',
                }}>
                  <h3 style={{
                    fontSize: isHero ? 'clamp(2rem, 4vw, 2.75rem)' : isFull ? 'clamp(1.5rem, 2.5vw, 1.875rem)' : 'clamp(1.25rem, 2vw, 1.5rem)',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    fontSize: isHero ? '1.125rem' : '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}>
                    {project.subtitle}
                  </p>
                </div>

                {/* Bottom Section: Stats + Recruiter Hook */}
                <div style={{ marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                  {/* Stats Row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isHero ? '2rem' : isFull ? '3rem' : '1.25rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                  }}>
                    {project.stats.map((stat, statIndex) => (
                      <React.Fragment key={statIndex}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}>
                          <span style={{
                            fontSize: isHero ? '2rem' : isFull ? '1.75rem' : '1.5rem',
                            fontWeight: '700',
                            color: `rgb(${project.color})`,
                            lineHeight: 1,
                            textShadow: isHovered ? `0 0 20px rgba(${project.color}, 0.5)` : 'none',
                            transition: 'text-shadow 0.4s ease',
                          }}>
                            {stat.value}
                          </span>
                          <span style={{
                            fontSize: '0.6875rem',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginTop: '0.25rem',
                          }}>
                            {stat.label}
                          </span>
                        </div>
                        {statIndex < project.stats.length - 1 && !isMobile && (
                          <div style={{
                            width: '1px',
                            height: isHero ? '40px' : '32px',
                            background: `linear-gradient(180deg, transparent, rgba(${project.color}, 0.3), transparent)`,
                          }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Recruiter Hook */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    background: 'var(--glass-04)',
                    border: '1px solid var(--glass-08)',
                  }}>
                    <CheckCircle size={14} style={{ color: `rgb(${project.color})` }} />
                    <span style={{
                      fontSize: '0.8125rem',
                      color: 'var(--text-tertiary)',
                      fontStyle: 'italic',
                    }}>
                      {project.recruiterFrame}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
          SECTION 7: KEY DIFFERENTIATORS
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
          SECTION 8: TEAM RECOGNITION
      ========================================================================= */}
      <section style={{
        padding: '4rem 0',
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
          SECTION 9: MORE PROJECTS
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
