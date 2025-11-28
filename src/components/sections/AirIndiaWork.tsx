'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Target,
  Trophy,
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
  Award,
  Star,
  Plane,
  Sparkles,
  Bot,
  Monitor,
  Smartphone,
  MessageSquare,
  Camera,
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

interface CompanyRelevance {
  company: string;
  relevance: string;
}

interface Project {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  expandedDescription?: string;
  imagePlaceholder: string;
  stats: ProjectStat[];
  recruiterFrame: string;
  recruiterInsight: string;
  companyRelevance: CompanyRelevance[];
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
    recruiterInsight: 'Builder mindset — shipped production tool when none existed. Shows initiative and technical depth beyond design.',
    companyRelevance: [
      { company: 'GitLab', relevance: 'Systems thinking, async tooling' },
      { company: 'Anthropic', relevance: 'Builder mindset, ships opinionated products' },
      { company: 'Automattic', relevance: 'Initiative, solved real problems' }
    ],
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
    recruiterInsight: 'Built systematic framework from chaos. Demonstrates ability to create order from ambiguity at enterprise scale.',
    companyRelevance: [
      { company: 'GitLab', relevance: 'Systematic documentation, scalable architecture' },
      { company: 'Anthropic', relevance: 'Ambiguity tolerance, first-principles thinking' },
      { company: 'Hugging Face', relevance: 'Technical depth, cross-team collaboration' }
    ],
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
    recruiterInsight: 'Designed for AI before industry patterns existed. Contributed to Red Dot Award-winning feature now in Singapore museum.',
    companyRelevance: [
      { company: 'Anthropic', relevance: 'AI-native product thinking, innovative interaction paradigms' },
      { company: 'Hugging Face', relevance: 'ML/AI product experience, forward-looking design' },
      { company: 'GitLab', relevance: 'Complex technical product design' }
    ],
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
    recruiterInsight: 'Early adopter of emerging AI infrastructure. Understands and implements cutting-edge protocols (Anthropic created MCP).',
    companyRelevance: [
      { company: 'Anthropic', relevance: 'Directly relevant — implemented MCP you created' },
      { company: 'GitLab', relevance: 'Design-engineering workflow optimization' },
      { company: 'Automattic', relevance: 'Cross-functional collaboration, async tooling' }
    ],
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
    recruiterInsight: 'Unique constraint-driven design — typography at distance, touch during turbulence, zero onboarding. Won Asia\'s Leading IFE.',
    companyRelevance: [
      { company: 'Automattic', relevance: 'UI craft, accessibility across demographics' },
      { company: 'GitLab', relevance: 'Complex interface design, user-centered methodology' },
      { company: 'Anthropic', relevance: 'Designing for diverse user contexts' }
    ],
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
    recruiterInsight: 'Transformed feedback from checkbox to strategic input. Data-driven approach to improving user research quality.',
    companyRelevance: [
      { company: 'GitLab', relevance: 'User research methodology, data-driven decisions' },
      { company: 'Automattic', relevance: 'Consumer feedback integration' },
      { company: 'Hugging Face', relevance: 'Community feedback systems' }
    ],
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
    recruiterInsight: 'Created lasting team resource through systematic research. Strategic benchmarking against 15+ competitors.',
    companyRelevance: [
      { company: 'GitLab', relevance: 'Strategic research, documentation excellence' },
      { company: 'Hugging Face', relevance: 'Industry analysis, competitive positioning' },
      { company: 'Automattic', relevance: 'Consumer product benchmarking' }
    ],
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
    recruiterInsight: 'Leadership without authority — built team programs independently. Created shared vocabulary and culture from scratch.',
    companyRelevance: [
      { company: 'Automattic', relevance: 'Remote team culture, written communication' },
      { company: 'GitLab', relevance: 'Async collaboration, distributed team building' },
      { company: 'Anthropic', relevance: 'Self-directed initiative, team enablement' }
    ],
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
    recruiterInsight: 'External collaboration with Microsoft. Won with AI-powered solution addressing real customer friction points.',
    companyRelevance: [
      { company: 'Anthropic', relevance: 'AI application to real problems, competitive wins' },
      { company: 'Hugging Face', relevance: 'ML/AI product thinking, external partnerships' },
      { company: 'GitLab', relevance: 'Cross-company collaboration, technical depth' }
    ],
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
    recruiterInsight: 'Full-stack execution — research, design, code, ship in 24 hours. Demonstrates speed and technical depth.',
    companyRelevance: [
      { company: 'Anthropic', relevance: 'End-to-end execution, builder mindset' },
      { company: 'Hugging Face', relevance: 'Technical depth, rapid prototyping' },
      { company: 'Automattic', relevance: 'Full-stack capability, self-direction' }
    ],
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
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set()); // Persistent expand state
  const [hoveredDiff, setHoveredDiff] = useState<number | null>(null);
  const [hoveredOtherProject, setHoveredOtherProject] = useState<number | null>(null);
  const [hoveredCTA, setHoveredCTA] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  // Pixel Radar interactive states
  const [pixelRadarStep, setPixelRadarStep] = useState(3); // 1, 2, or 3
  const [hoveredToken, setHoveredToken] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState<'idle' | 'scan' | 'analyze' | 'complete'>('idle');
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  // Design System & Tokenisation interactive states
  const [tokenPhase, setTokenPhase] = useState<'idle' | 'global' | 'alias' | 'component' | 'complete'>('idle');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Colors');
  const [isApplyingToken, setIsApplyingToken] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Refs for card intersection observers
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Handler for hover effects only (no expansion)
  const handleCardMouseEnter = (id: number) => {
    setHoveredProject(id);
  };

  const handleCardMouseLeave = () => {
    setHoveredProject(null);
  };

  // Auto-expand cards when they reach center of viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((element, id) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setExpandedCards(prev => new Set(prev).add(id));
          }
        },
        {
          rootMargin: '-35% 0px -35% 0px', // Trigger when card is in center 30% of viewport
          threshold: 0.1,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

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

        {/* Full-Width Stacked Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0' : '0 1.5rem',
          position: 'relative',
        }}>
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredProject === project.id;
            const isExpanded = expandedCards.has(project.id);

            // Custom visual content per project type - ENHANCED 180x180px visuals
            const renderCardVisual = () => {
              // Pixel Radar (index 0) - Floating UI panels - ENLARGED
              if (index === 0) {
                return (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '160px',
                    opacity: isHovered ? 1 : 0.8,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}>
                    {/* Floating UI Panel - Stats */}
                    <div style={{
                      padding: '16px 20px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(218,14,41,0.2), var(--glass-10))',
                      border: '1px solid rgba(218,14,41,0.35)',
                      backdropFilter: 'blur(20px)',
                      transform: isHovered ? 'translateX(-8px) rotate(-2deg)' : 'translateX(0)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isHovered ? '0 15px 30px rgba(218,14,41,0.2)' : 'none',
                    }}>
                      <div style={{ fontSize: '0.688rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Daily Active Users</div>
                      <div style={{ fontSize: '2rem', fontWeight: '700', color: 'rgb(218,14,41)', lineHeight: 1 }}>450+</div>
                    </div>
                    {/* Progress bar */}
                    <div style={{
                      padding: '16px 20px',
                      borderRadius: '14px',
                      background: 'var(--glass-08)',
                      border: '1px solid var(--glass-15)',
                      transform: isHovered ? 'translateX(8px) rotate(2deg)' : 'translateX(0)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
                      boxShadow: isHovered ? '0 15px 30px rgba(0,0,0,0.2)' : 'none',
                    }}>
                      <div style={{ fontSize: '0.688rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Review Time</div>
                      <div style={{ height: '8px', borderRadius: '4px', background: 'var(--glass-10)', overflow: 'hidden' }}>
                        <div style={{
                          width: isHovered ? '70%' : '0%',
                          height: '100%',
                          borderRadius: '4px',
                          background: 'linear-gradient(90deg, rgb(218,14,41), rgb(251,146,60))',
                          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                        }} />
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '6px' }}>30% faster</div>
                    </div>
                  </div>
                );
              }

              // Design System (index 1) - Token constellation - ENLARGED
              if (index === 1) {
                return (
                  <div style={{
                    width: '160px',
                    height: '160px',
                    position: 'relative',
                    opacity: isHovered ? 1 : 0.7,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}>
                    {/* Central node */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: `linear-gradient(135deg, rgb(${project.color}), rgba(${project.color}, 0.6))`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 40px rgba(${project.color}, 0.5)`,
                      animation: isHovered ? 'orbitPulse 2s ease-in-out infinite' : 'none',
                    }}>
                      <Layers size={26} style={{ color: 'white' }} />
                    </div>
                    {/* SVG connection lines */}
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                      {[0, 72, 144, 216, 288].map((angle, i) => {
                        const rad = (angle * Math.PI) / 180;
                        const x1 = 80 + Math.cos(rad) * 25;
                        const y1 = 80 + Math.sin(rad) * 25;
                        const x2 = 80 + Math.cos(rad) * 60;
                        const y2 = 80 + Math.sin(rad) * 60;
                        return (
                          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke={`rgba(${project.color}, ${isHovered ? 0.5 : 0.2})`}
                            strokeWidth="1.5"
                            strokeDasharray={isHovered ? "0" : "4 4"}
                            style={{ transition: 'all 0.5s ease' }}
                          />
                        );
                      })}
                    </svg>
                    {/* Orbiting nodes - 5 nodes in circle */}
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: 'var(--glass-20)',
                        border: `1.5px solid rgba(${project.color}, ${isHovered ? 0.5 : 0.3})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(60px) rotate(-${angle}deg)`,
                        transition: 'all 0.5s ease',
                        boxShadow: isHovered ? `0 0 15px rgba(${project.color}, 0.3)` : 'none',
                      }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: `rgb(${project.color})` }} />
                      </div>
                    ))}
                  </div>
                );
              }

              // AI projects (index 2, 3) - Neural network visual - ENLARGED
              if (index === 2 || index === 3) {
                return (
                  <div style={{
                    width: '150px',
                    height: '120px',
                    position: 'relative',
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'all 0.5s ease',
                  }}>
                    {/* Connection lines SVG */}
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: isHovered ? 0.6 : 0.2 }}>
                      <line x1="25" y1="25" x2="75" y2="15" stroke={`rgb(${project.color})`} strokeWidth="1" />
                      <line x1="75" y1="15" x2="125" y2="30" stroke={`rgb(${project.color})`} strokeWidth="1" />
                      <line x1="35" y1="75" x2="90" y2="65" stroke={`rgb(${project.color})`} strokeWidth="1" />
                      <line x1="90" y1="65" x2="120" y2="90" stroke={`rgb(${project.color})`} strokeWidth="1" />
                      <line x1="75" y1="15" x2="90" y2="65" stroke={`rgb(${project.color})`} strokeWidth="1" />
                      <line x1="25" y1="25" x2="35" y2="75" stroke={`rgb(${project.color})`} strokeWidth="1" />
                    </svg>
                    {[
                      { x: 20, y: 20, size: 16 },
                      { x: 70, y: 10, size: 22 },
                      { x: 120, y: 25, size: 14 },
                      { x: 30, y: 70, size: 18 },
                      { x: 85, y: 60, size: 26 },
                      { x: 115, y: 85, size: 16 },
                    ].map((orb, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        left: orb.x,
                        top: orb.y,
                        width: orb.size,
                        height: orb.size,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, rgb(${project.color}), rgba(${project.color}, 0.3))`,
                        boxShadow: `0 0 ${orb.size * 1.5}px rgba(${project.color}, ${isHovered ? 0.6 : 0.3})`,
                        animation: isHovered ? `glowPulse ${2 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` : 'none',
                      }} />
                    ))}
                  </div>
                );
              }

              // IFE (index 4) - Screen mockup - ENLARGED
              if (index === 4) {
                return (
                  <div style={{
                    width: '130px',
                    height: '90px',
                    borderRadius: '12px',
                    background: `linear-gradient(180deg, var(--glass-20), var(--glass-10))`,
                    border: `2px solid rgba(${project.color}, ${isHovered ? 0.5 : 0.3})`,
                    padding: '12px',
                    opacity: isHovered ? 1 : 0.7,
                    transition: 'all 0.5s ease',
                    boxShadow: isHovered
                      ? `0 20px 40px rgba(${project.color}, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
                      : `0 10px 30px rgba(${project.color}, 0.15)`,
                  }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                      {[1,2,3].map(i => <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: i === 1 ? '#ff5f57' : i === 2 ? '#febc2e' : '#28c840' }} />)}
                    </div>
                    <div style={{ height: '8px', borderRadius: '4px', background: `rgba(${project.color}, ${isHovered ? 0.5 : 0.3})`, marginBottom: '5px', width: '80%' }} />
                    <div style={{ height: '5px', borderRadius: '3px', background: 'var(--glass-20)', marginBottom: '4px', width: '100%' }} />
                    <div style={{ height: '5px', borderRadius: '3px', background: 'var(--glass-15)', width: '70%' }} />
                    {/* Play button */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: `rgb(${project.color})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 15px rgba(${project.color}, 0.5)`,
                    }}>
                      <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid white', marginLeft: '2px' }} />
                    </div>
                  </div>
                );
              }

              // Research cards (index 5, 6) - Chart visual - ENLARGED
              if (index === 5 || index === 6) {
                return (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '10px',
                    height: '110px',
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'all 0.5s ease',
                  }}>
                    {[45, 70, 55, 90, 60, 80].map((h, i) => (
                      <div key={i} style={{
                        width: '18px',
                        height: isHovered ? `${h}%` : `${h * 0.5}%`,
                        borderRadius: '4px 4px 0 0',
                        background: `linear-gradient(180deg, rgb(${project.color}), rgba(${project.color}, 0.3))`,
                        boxShadow: isHovered ? `0 0 15px rgba(${project.color}, 0.4)` : 'none',
                        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
                      }} />
                    ))}
                  </div>
                );
              }

              // Culture (index 7) - People nodes - ENLARGED
              if (index === 7) {
                return (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    opacity: isHovered ? 1 : 0.7,
                    transition: 'all 0.5s ease',
                  }}>
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, rgba(${project.color}, ${0.9 - i * 0.15}), rgba(${project.color}, ${0.5 - i * 0.1}))`,
                        border: '3px solid var(--glass-30)',
                        marginLeft: i > 0 ? (isHovered ? '-10px' : '-16px') : 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 20px rgba(${project.color}, 0.4)`,
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isHovered ? `translateY(${i % 2 === 0 ? '-4px' : '4px'})` : 'translateY(0)',
                      }}>
                        <Users size={18} style={{ color: 'white' }} />
                      </div>
                    ))}
                  </div>
                );
              }

              // Hackathons (index 8, 9) - Trophy/rocket visual - ENLARGED
              if (index === 8 || index === 9) {
                return (
                  <div style={{
                    position: 'relative',
                    opacity: isHovered ? 1 : 0.7,
                    transition: 'all 0.5s ease',
                  }}>
                    {/* Glow ring behind */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, rgba(${project.color}, ${isHovered ? 0.3 : 0.1}), transparent 70%)`,
                      transition: 'all 0.5s ease',
                    }} />
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '20px',
                      background: `linear-gradient(135deg, rgb(${project.color}), rgba(${project.color}, 0.6))`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 40px rgba(${project.color}, 0.5)`,
                      transform: isHovered ? 'rotate(5deg)' : 'rotate(0deg)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                      {index === 8 ? <Zap size={36} style={{ color: 'white' }} /> : <Rocket size={36} style={{ color: 'white' }} />}
                    </div>
                  </div>
                );
              }

              // Default icon visual - ENLARGED
              return (
                <div style={{
                  position: 'relative',
                  opacity: isHovered ? 1 : 0.7,
                  transition: 'all 0.5s ease',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(${project.color}, ${isHovered ? 0.25 : 0.1}), transparent 70%)`,
                    transition: 'all 0.5s ease',
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, rgb(${project.color}), rgba(${project.color}, 0.5))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 40px rgba(${project.color}, 0.5)`,
                  }}>
                    <Icon size={34} style={{ color: 'white' }} />
                  </div>
                </div>
              );
            };

            return (
              <div
                key={project.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(project.id, el);
                }}
                onMouseEnter={() => handleCardMouseEnter(project.id)}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  width: '100%',
                  minHeight: isMobile ? '280px' : (isExpanded ? '520px' : '200px'),
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  padding: isMobile ? '1.5rem' : (isExpanded ? '2.5rem 3rem' : '2rem 2.5rem'),
                  borderRadius: isExpanded ? '28px' : '24px',
                  background: `
                    radial-gradient(ellipse at 70% 30%, rgba(${project.color}, ${isExpanded ? 0.15 : 0.08}), transparent 50%),
                    radial-gradient(ellipse at 30% 70%, rgba(${project.color}, ${isExpanded ? 0.08 : 0.03}), transparent 50%),
                    var(--glass-04)
                  `,
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: `1px solid ${isExpanded ? `rgba(${project.color}, 0.4)` : 'var(--glass-08)'}`,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered && !isMobile ? 'translate3d(0, -4px, 0)' : 'translate3d(0, 0, 0)',
                  boxShadow: isExpanded
                    ? `0 40px 80px -20px rgba(${project.color}, 0.35), 0 20px 40px -15px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(${project.color}, 0.12)`
                    : '0 8px 32px -8px rgba(0,0,0,0.2)',
                  opacity: isExpanded ? 1 : 0.9,
                  animation: inView ? `scrollRevealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.05}s both` : 'none',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  zIndex: isHovered ? 20 : 1,
                }}
              >
                {/* Animated Glow Orb */}
                <div style={{
                  position: 'absolute',
                  top: '20%',
                  right: '10%',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(${project.color}, ${isExpanded ? 0.2 : 0.08}), transparent 70%)`,
                  filter: 'blur(50px)',
                  transition: 'all 0.6s ease',
                  pointerEvents: 'none',
                }} />

                {/* Border Shimmer when expanded */}
                {isExpanded && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '28px',
                    padding: '1px',
                    background: `linear-gradient(90deg, transparent, rgba(${project.color}, 0.4), transparent)`,
                    backgroundSize: '200% 100%',
                    animation: 'borderShimmer 3s ease-in-out infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* TOP ROW: Header with Category, Title, Subtitle, and Mini Visual */}
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                  alignItems: isMobile ? 'flex-start' : 'flex-start',
                  gap: isMobile ? '1rem' : '2rem',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  {/* Left: Category + Title + Subtitle */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Category Badge */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '100px',
                      background: `rgba(${project.color}, 0.12)`,
                      border: `1px solid rgba(${project.color}, 0.2)`,
                      fontSize: '0.625rem',
                      fontWeight: '600',
                      letterSpacing: '0.12em',
                      color: `rgb(${project.color})`,
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}>
                      {project.category}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '0.375rem',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                    }}>
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}>
                      {project.subtitle}
                    </p>

                    {/* Stats Row - Always visible */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      flexWrap: 'wrap',
                      marginTop: '1rem',
                    }}>
                      {project.stats.map((stat, statIndex) => (
                        <React.Fragment key={statIndex}>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                          }}>
                            <span style={{
                              fontSize: '1.25rem',
                              fontWeight: '700',
                              color: `rgb(${project.color})`,
                              lineHeight: 1,
                              textShadow: isExpanded ? `0 0 15px rgba(${project.color}, 0.4)` : 'none',
                              transition: 'text-shadow 0.4s ease',
                            }}>
                              {stat.value}
                            </span>
                            <span style={{
                              fontSize: '0.625rem',
                              color: 'var(--text-muted)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              marginTop: '0.125rem',
                            }}>
                              {stat.label}
                            </span>
                          </div>
                          {statIndex < project.stats.length - 1 && !isMobile && (
                            <div style={{
                              width: '1px',
                              height: '24px',
                              background: `linear-gradient(180deg, transparent, rgba(${project.color}, 0.25), transparent)`,
                            }} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Short Recruiter Hook - Collapsed state only */}
                    {!isExpanded && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.375rem 0.625rem',
                        borderRadius: '6px',
                        background: 'var(--glass-03)',
                        border: '1px solid var(--glass-06)',
                        marginTop: '0.75rem',
                      }}>
                        <CheckCircle size={12} style={{ color: `rgb(${project.color})` }} />
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-tertiary)',
                          fontStyle: 'italic',
                        }}>
                          {project.recruiterFrame}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: Mini Visual (smaller in collapsed, fades when expanded) */}
                  <div style={{
                    flexShrink: 0,
                    width: isMobile ? '100%' : '120px',
                    height: isMobile ? '100px' : '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    opacity: isExpanded ? 0.5 : 0.8,
                    transform: isExpanded ? 'scale(0.85)' : 'scale(1)',
                    filter: isHovered && !isExpanded ? `drop-shadow(0 0 30px rgba(${project.color}, 0.4))` : 'none',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}>
                    {renderCardVisual()}
                  </div>
                </div>

                {/* EXPANDED CONTENT - Only shown when expanded */}
                <div style={{
                  opacity: isExpanded ? 1 : 0,
                  maxHeight: isExpanded ? '800px' : '0',
                  transform: isExpanded ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}>
                  {/* Animated Illustration or Placeholder */}
                  {index === 0 ? (
                    /* PIXEL RADAR - Side-by-Side Interactive Visualization */
                    <>
                    {/* Interactive Prototype Helper */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                      padding: '8px 16px',
                      background: 'rgba(13, 153, 255, 0.1)',
                      borderRadius: '20px',
                      border: '1px solid rgba(13, 153, 255, 0.2)',
                      width: 'fit-content',
                      margin: '0 auto 12px',
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#0D99FF',
                        animation: 'statusPulse 1.5s ease infinite',
                      }} />
                      <span style={{
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontWeight: '500',
                      }}>
                        Interactive Prototype
                      </span>
                      <span style={{
                        fontSize: '10px',
                        color: 'rgba(255, 255, 255, 0.4)',
                      }}>
                        — Click &quot;Run Analysis&quot; to see it in action
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      maxWidth: '1100px',
                      margin: '0 auto',
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '24px',
                      padding: '8px',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                      fontSize: '11px',
                    }}>
                      {/* ======== LEFT PANEL: Figma Plugin UI ======== */}
                      <div style={{
                        background: '#2C2C2C',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                      }}>
                        {/* Plugin Header */}
                        <div style={{
                          background: '#1E1E1E',
                          padding: '8px 12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '4px',
                              background: '#0D99FF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <span style={{ fontSize: '10px', color: 'white', fontWeight: '700' }}>P</span>
                            </div>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              color: 'rgba(255, 255, 255, 0.9)',
                            }}>Pixel Radar</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)' }} />
                          </div>
                        </div>

                        {/* Plugin Content */}
                        <div style={{ padding: '12px' }}>
                          {/* Library Dropdown */}
                          <div style={{
                            background: '#383838',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            padding: '8px 10px',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transition: 'border-color 0.15s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>Library:</span>
                              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.9)' }}>Design System v2.0</span>
                            </div>
                            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>▼</span>
                          </div>

                          {/* Token Analysis Section */}
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            marginBottom: '12px',
                            overflow: 'hidden',
                          }}>
                            {/* Section Header */}
                            <div style={{
                              padding: '8px 10px',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                              <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.66)' }}>Token Analysis</span>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>3 tokens</span>
                            </div>

                            {/* Token Table Header */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 40px',
                              padding: '6px 10px',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                              background: 'rgba(255, 255, 255, 0.02)',
                            }}>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '500' }}>Library</span>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '500' }}>Local</span>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '500', textAlign: 'center' }}>Status</span>
                            </div>

                            {/* Token Rows */}
                            {[
                              { id: 'color', color: '#3B82F6', library: 'color/primary', local: 'color/primary', matched: true },
                              { id: 'typo', color: '#8B5CF6', library: 'typography/h1', local: 'typography/heading-1', matched: false },
                              { id: 'space', color: '#10B981', library: 'spacing/lg', local: 'spacing/lg', matched: true },
                            ].map((token) => (
                              <div
                                key={token.id}
                                onMouseEnter={() => setHoveredToken(token.id)}
                                onMouseLeave={() => setHoveredToken(null)}
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1fr 1fr 40px',
                                  padding: '6px 10px',
                                  borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                                  background: hoveredToken === token.id ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                  cursor: 'pointer',
                                  transition: 'background 0.15s ease',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '2px',
                                    background: token.color,
                                  }} />
                                  <span style={{
                                    fontSize: '10px',
                                    color: 'rgba(255, 255, 255, 0.66)',
                                    fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                                  }}>{token.library}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '2px',
                                    background: token.color,
                                  }} />
                                  <span style={{
                                    fontSize: '10px',
                                    color: 'rgba(255, 255, 255, 0.66)',
                                    fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                                  }}>{token.local}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  {token.matched ? (
                                    <span style={{ fontSize: '12px', color: '#30D158' }}>✓</span>
                                  ) : (
                                    <span style={{ fontSize: '10px', color: '#FF9F0A', fontWeight: '600' }}>!</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Stats Bar */}
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            marginBottom: '12px',
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: '8px',
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div>
                                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#30D158' }}>
                                    {analysisPhase === 'complete' ? '195' : '—'}
                                  </span>
                                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', marginLeft: '4px' }}>matched</span>
                                </div>
                                <div>
                                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#FF9F0A' }}>
                                    {analysisPhase === 'complete' ? '79' : '—'}
                                  </span>
                                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', marginLeft: '4px' }}>suggested</span>
                                </div>
                              </div>
                              <span style={{
                                fontSize: '11px',
                                fontWeight: '600',
                                color: analysisPhase === 'complete' ? '#30D158' : 'rgba(255, 255, 255, 0.4)',
                              }}>
                                {analysisPhase === 'complete' ? '71%' : '—'}
                              </span>
                            </div>
                            {/* Progress Bar */}
                            <div style={{
                              height: '4px',
                              background: 'rgba(255, 255, 255, 0.1)',
                              borderRadius: '2px',
                              overflow: 'hidden',
                            }}>
                              <div style={{
                                width: analysisPhase === 'complete' ? '71%' : '0%',
                                height: '100%',
                                background: '#30D158',
                                borderRadius: '2px',
                                transition: 'width 0.6s cubic-bezier(0.2, 0, 0, 1)',
                              }} />
                            </div>
                          </div>

                          {/* Run Analysis Button */}
                          <button
                            onClick={() => {
                              if (isAnalyzing) return;
                              setIsAnalyzing(true);
                              setAnalysisPhase('scan');
                              setPixelRadarStep(2);

                              // Phase 2: Analyze (after 500ms)
                              setTimeout(() => setAnalysisPhase('analyze'), 500);

                              // Phase 3: Complete (after 1500ms)
                              setTimeout(() => {
                                setAnalysisPhase('complete');
                                setPixelRadarStep(3);
                                setIsAnalyzing(false);
                              }, 1500);
                            }}
                            style={{
                              width: '100%',
                              background: isAnalyzing ? '#1E1E1E' : '#0D99FF',
                              color: 'white',
                              border: isAnalyzing ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                              borderRadius: '6px',
                              padding: '8px 16px',
                              fontSize: '11px',
                              fontWeight: '500',
                              cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                              transition: 'all 0.15s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                            }}
                            onMouseEnter={(e) => !isAnalyzing && (e.currentTarget.style.background = '#1A8FE8')}
                            onMouseLeave={(e) => !isAnalyzing && (e.currentTarget.style.background = '#0D99FF')}
                          >
                            {isAnalyzing ? (
                              <>
                                <div style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  border: '2px solid rgba(255, 255, 255, 0.2)',
                                  borderTopColor: 'rgba(255, 255, 255, 0.9)',
                                  animation: 'spin 0.8s linear infinite',
                                }} />
                                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Analyzing...</span>
                              </>
                            ) : (
                              <span>Run Analysis</span>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* ======== RIGHT PANEL: Backend Architecture (Enhanced V2) ======== */}
                      <div style={{
                        background: '#2C2C2C',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                        display: isMobile ? 'none' : 'block',
                      }}>
                        {/* Architecture Header */}
                        <div style={{
                          background: '#1E1E1E',
                          padding: '8px 12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            background: 'rgba(162, 89, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <span style={{ fontSize: '10px', color: '#A259FF' }}>⚡</span>
                          </div>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: 'rgba(255, 255, 255, 0.9)',
                          }}>Backend Architecture</span>
                        </div>

                        {/* Architecture Content */}
                        <div style={{ padding: '12px', position: 'relative', minHeight: '280px' }}>
                          {/* SVG Connections Layer - Enhanced with viewBox */}
                          <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              width: 'calc(100% - 24px)',
                              height: 'calc(100% - 60px)',
                              pointerEvents: 'none',
                              zIndex: 0,
                            }}
                          >
                            <defs>
                              {/* Glow filter for active connections */}
                              <filter id="connectionGlow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="1.5" result="blur" />
                                <feMerge>
                                  <feMergeNode in="blur" />
                                  <feMergeNode in="SourceGraphic" />
                                </feMerge>
                              </filter>

                              {/* Animated arrowhead marker */}
                              <marker
                                id="arrowhead-v2"
                                markerWidth="6"
                                markerHeight="5"
                                refX="5"
                                refY="2.5"
                                orient="auto"
                              >
                                <polygon
                                  points="0 0, 6 2.5, 0 5"
                                  fill={analysisPhase !== 'idle' ? '#0D99FF' : 'rgba(255, 255, 255, 0.2)'}
                                  style={{
                                    transition: 'fill 0.3s ease',
                                    transformOrigin: 'center',
                                    animation: analysisPhase !== 'idle' ? 'statusPulse 1s ease infinite' : 'none',
                                  }}
                                />
                              </marker>

                              {/* Green arrowhead for feedback loop */}
                              <marker
                                id="arrowhead-green"
                                markerWidth="6"
                                markerHeight="5"
                                refX="5"
                                refY="2.5"
                                orient="auto"
                              >
                                <polygon
                                  points="0 0, 6 2.5, 0 5"
                                  fill={analysisPhase === 'complete' ? '#30D158' : 'rgba(255, 255, 255, 0.2)'}
                                  style={{ transition: 'fill 0.3s ease' }}
                                />
                              </marker>
                            </defs>

                            {/* Connection: Figma APIs (bottom-left) → Token Scanner (top-left) */}
                            <path
                              d="M 25 72 L 25 28"
                              fill="none"
                              stroke={analysisPhase !== 'idle' ? 'rgba(13, 153, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)'}
                              strokeWidth="0.8"
                              strokeDasharray="3 2"
                              markerEnd="url(#arrowhead-v2)"
                              filter={analysisPhase === 'scan' ? 'url(#connectionGlow)' : 'none'}
                              style={{
                                transition: 'stroke 0.3s ease, filter 0.3s ease',
                                animation: analysisPhase === 'scan' ? 'flowLine 1s linear infinite' : 'none',
                              }}
                            />

                            {/* Connection: Token Scanner (top-left) → Analysis Engine (top-right) */}
                            <path
                              d="M 40 20 L 60 20"
                              fill="none"
                              stroke={['scan', 'analyze', 'complete'].includes(analysisPhase) ? 'rgba(13, 153, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)'}
                              strokeWidth="0.8"
                              strokeDasharray="3 2"
                              markerEnd="url(#arrowhead-v2)"
                              filter={analysisPhase === 'analyze' ? 'url(#connectionGlow)' : 'none'}
                              style={{
                                transition: 'stroke 0.3s ease, filter 0.3s ease',
                                animation: analysisPhase === 'analyze' ? 'flowLine 1s linear infinite' : 'none',
                              }}
                            />

                            {/* Connection: Analysis Engine (top-right) → Results (bottom-right) */}
                            <path
                              d="M 75 28 L 75 72"
                              fill="none"
                              stroke={['analyze', 'complete'].includes(analysisPhase) ? 'rgba(13, 153, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)'}
                              strokeWidth="0.8"
                              strokeDasharray="3 2"
                              markerEnd="url(#arrowhead-v2)"
                              filter={analysisPhase === 'complete' ? 'url(#connectionGlow)' : 'none'}
                              style={{
                                transition: 'stroke 0.3s ease, filter 0.3s ease',
                                animation: analysisPhase === 'complete' ? 'flowLine 1s linear infinite' : 'none',
                              }}
                            />

                            {/* Connection: Results (bottom-right) → Figma APIs (bottom-left) - feedback */}
                            <path
                              d="M 60 80 L 40 80"
                              fill="none"
                              stroke={analysisPhase === 'complete' ? 'rgba(48, 209, 88, 0.5)' : 'rgba(255, 255, 255, 0.1)'}
                              strokeWidth="0.8"
                              strokeDasharray="3 2"
                              markerEnd="url(#arrowhead-green)"
                              filter={analysisPhase === 'complete' ? 'url(#connectionGlow)' : 'none'}
                              style={{
                                transition: 'stroke 0.3s ease, filter 0.3s ease',
                                animation: analysisPhase === 'complete' ? 'flowLine 1s linear infinite reverse' : 'none',
                              }}
                            />

                            {/* Data Packets - Moving dots along paths */}
                            {analysisPhase === 'scan' && (
                              <circle r="1.5" fill="#0D99FF" style={{
                                offsetPath: "path('M 25 72 L 25 28')",
                                animation: 'movePacket 1.2s ease-in-out infinite',
                              }}>
                                <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" repeatCount="indefinite" />
                              </circle>
                            )}
                            {analysisPhase === 'analyze' && (
                              <circle r="1.5" fill="#0D99FF" style={{
                                offsetPath: "path('M 40 20 L 60 20')",
                                animation: 'movePacket 0.8s ease-in-out infinite',
                              }}>
                                <animate attributeName="opacity" values="0;1;1;0" dur="0.8s" repeatCount="indefinite" />
                              </circle>
                            )}
                            {analysisPhase === 'complete' && (
                              <>
                                <circle r="1.5" fill="#0D99FF" style={{
                                  offsetPath: "path('M 75 28 L 75 72')",
                                  animation: 'movePacket 1s ease-in-out infinite',
                                }}>
                                  <animate attributeName="opacity" values="0;1;1;0" dur="1s" repeatCount="indefinite" />
                                </circle>
                                <circle r="1.5" fill="#30D158" style={{
                                  offsetPath: "path('M 60 80 L 40 80')",
                                  animation: 'movePacket 0.8s ease-in-out infinite',
                                  animationDelay: '0.4s',
                                }}>
                                  <animate attributeName="opacity" values="0;1;1;0" dur="0.8s" repeatCount="indefinite" begin="0.4s" />
                                </circle>
                              </>
                            )}
                          </svg>

                          {/* Module Grid */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                            position: 'relative',
                            zIndex: 1,
                          }}>
                            {/* Module 1: Token Scanner (Top Left) */}
                            <div
                              onMouseEnter={() => setHoveredModule('scanner')}
                              onMouseLeave={() => setHoveredModule(null)}
                              style={{
                                background: '#1E1E1E',
                                borderRadius: '6px',
                                padding: '10px',
                                border: `1px solid ${
                                  analysisPhase === 'scan'
                                    ? 'rgba(48, 209, 88, 0.6)'
                                    : hoveredModule === 'scanner'
                                      ? 'rgba(255, 255, 255, 0.25)'
                                      : 'rgba(255, 255, 255, 0.1)'
                                }`,
                                transition: 'all 0.3s ease',
                                boxShadow: analysisPhase === 'scan'
                                  ? '0 0 8px rgba(48, 209, 88, 0.3), 0 0 16px rgba(48, 209, 88, 0.15), 0 0 32px rgba(48, 209, 88, 0.08), inset 0 0 12px rgba(48, 209, 88, 0.05)'
                                  : hoveredModule === 'scanner'
                                    ? '0 0 8px rgba(255, 255, 255, 0.05)'
                                    : 'none',
                                position: 'relative',
                              }}
                            >
                              <div style={{
                                fontSize: '10px',
                                fontWeight: '600',
                                color: '#30D158',
                                marginBottom: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}>
                                <span style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: analysisPhase === 'scan' ? '#30D158' : 'rgba(48, 209, 88, 0.3)',
                                  boxShadow: analysisPhase === 'scan' ? '0 0 6px #30D158' : 'none',
                                  animation: analysisPhase === 'scan' ? 'statusPulse 0.8s ease infinite' : 'none',
                                }} />
                                Token Scanner
                              </div>
                              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.5 }}>
                                • Variables<br />
                                • Styles<br />
                                • Libraries
                              </div>
                              {/* Tooltip */}
                              {hoveredModule === 'scanner' && (
                                <div style={{
                                  position: 'absolute',
                                  bottom: 'calc(100% + 8px)',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: 'rgba(0, 0, 0, 0.95)',
                                  padding: '6px 10px',
                                  borderRadius: '4px',
                                  fontSize: '9px',
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  whiteSpace: 'nowrap',
                                  animation: 'tooltipFade 0.2s ease',
                                  zIndex: 10,
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}>
                                  Scans Figma document for tokens
                                  <div style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)',
                                    width: '8px',
                                    height: '8px',
                                    background: 'rgba(0, 0, 0, 0.95)',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                  }} />
                                </div>
                              )}
                            </div>

                            {/* Module 2: Analysis Engine (Top Right) */}
                            <div
                              onMouseEnter={() => setHoveredModule('engine')}
                              onMouseLeave={() => setHoveredModule(null)}
                              style={{
                                background: '#1E1E1E',
                                borderRadius: '6px',
                                padding: '10px',
                                border: `1px solid ${
                                  analysisPhase === 'analyze'
                                    ? 'rgba(13, 153, 255, 0.6)'
                                    : hoveredModule === 'engine'
                                      ? 'rgba(255, 255, 255, 0.25)'
                                      : 'rgba(255, 255, 255, 0.1)'
                                }`,
                                transition: 'all 0.3s ease',
                                boxShadow: analysisPhase === 'analyze'
                                  ? '0 0 8px rgba(13, 153, 255, 0.3), 0 0 16px rgba(13, 153, 255, 0.15), 0 0 32px rgba(13, 153, 255, 0.08), inset 0 0 12px rgba(13, 153, 255, 0.05)'
                                  : hoveredModule === 'engine'
                                    ? '0 0 8px rgba(255, 255, 255, 0.05)'
                                    : 'none',
                                position: 'relative',
                              }}
                            >
                              <div style={{
                                fontSize: '10px',
                                fontWeight: '600',
                                color: '#0D99FF',
                                marginBottom: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}>
                                <span style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: analysisPhase === 'analyze' ? '#0D99FF' : 'rgba(13, 153, 255, 0.3)',
                                  boxShadow: analysisPhase === 'analyze' ? '0 0 6px #0D99FF' : 'none',
                                  animation: analysisPhase === 'analyze' ? 'statusPulse 0.8s ease infinite' : 'none',
                                }} />
                                Analysis Engine
                              </div>
                              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.5 }}>
                                • Duplicate Detection<br />
                                • Consistency Check<br />
                                • Smart Suggestions
                              </div>
                              {/* Tooltip */}
                              {hoveredModule === 'engine' && (
                                <div style={{
                                  position: 'absolute',
                                  bottom: 'calc(100% + 8px)',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: 'rgba(0, 0, 0, 0.95)',
                                  padding: '6px 10px',
                                  borderRadius: '4px',
                                  fontSize: '9px',
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  whiteSpace: 'nowrap',
                                  animation: 'tooltipFade 0.2s ease',
                                  zIndex: 10,
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}>
                                  Analyzes patterns & inconsistencies
                                  <div style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)',
                                    width: '8px',
                                    height: '8px',
                                    background: 'rgba(0, 0, 0, 0.95)',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                  }} />
                                </div>
                              )}
                            </div>

                            {/* Module 3: Figma APIs (Bottom Left) */}
                            <div
                              onMouseEnter={() => setHoveredModule('apis')}
                              onMouseLeave={() => setHoveredModule(null)}
                              style={{
                                background: 'rgba(218, 14, 41, 0.08)',
                                borderRadius: '6px',
                                padding: '10px',
                                border: `1px solid ${
                                  hoveredModule === 'apis'
                                    ? 'rgba(218, 14, 41, 0.5)'
                                    : 'rgba(218, 14, 41, 0.25)'
                                }`,
                                transition: 'all 0.3s ease',
                                boxShadow: hoveredModule === 'apis'
                                  ? '0 0 8px rgba(218, 14, 41, 0.15)'
                                  : 'none',
                                position: 'relative',
                              }}
                            >
                              <div style={{
                                fontSize: '10px',
                                fontWeight: '600',
                                color: '#DA0E29',
                                marginBottom: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}>
                                <span style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: 'rgba(218, 14, 41, 0.6)',
                                  boxShadow: '0 0 4px rgba(218, 14, 41, 0.3)',
                                }} />
                                Figma APIs
                              </div>
                              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.5 }}>
                                • variables<br />
                                • styles<br />
                                • teamLibrary
                              </div>
                              {/* Tooltip */}
                              {hoveredModule === 'apis' && (
                                <div style={{
                                  position: 'absolute',
                                  bottom: 'calc(100% + 8px)',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: 'rgba(0, 0, 0, 0.95)',
                                  padding: '6px 10px',
                                  borderRadius: '4px',
                                  fontSize: '9px',
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  whiteSpace: 'nowrap',
                                  animation: 'tooltipFade 0.2s ease',
                                  zIndex: 10,
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}>
                                  Official Figma Plugin API
                                  <div style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)',
                                    width: '8px',
                                    height: '8px',
                                    background: 'rgba(0, 0, 0, 0.95)',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                  }} />
                                </div>
                              )}
                            </div>

                            {/* Module 4: Results Processor (Bottom Right) */}
                            <div
                              onMouseEnter={() => setHoveredModule('results')}
                              onMouseLeave={() => setHoveredModule(null)}
                              style={{
                                background: '#1E1E1E',
                                borderRadius: '6px',
                                padding: '10px',
                                border: `1px solid ${
                                  analysisPhase === 'complete'
                                    ? 'rgba(48, 209, 88, 0.6)'
                                    : hoveredModule === 'results'
                                      ? 'rgba(255, 255, 255, 0.25)'
                                      : 'rgba(255, 255, 255, 0.1)'
                                }`,
                                transition: 'all 0.3s ease',
                                boxShadow: analysisPhase === 'complete'
                                  ? '0 0 8px rgba(48, 209, 88, 0.3), 0 0 16px rgba(48, 209, 88, 0.15), 0 0 32px rgba(48, 209, 88, 0.08), inset 0 0 12px rgba(48, 209, 88, 0.05)'
                                  : hoveredModule === 'results'
                                    ? '0 0 8px rgba(255, 255, 255, 0.05)'
                                    : 'none',
                                position: 'relative',
                              }}
                            >
                              <div style={{
                                fontSize: '10px',
                                fontWeight: '600',
                                color: '#30D158',
                                marginBottom: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}>
                                <span style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: analysisPhase === 'complete' ? '#30D158' : 'rgba(48, 209, 88, 0.3)',
                                  boxShadow: analysisPhase === 'complete' ? '0 0 6px #30D158' : 'none',
                                  animation: analysisPhase === 'complete' ? 'statusPulse 0.8s ease infinite' : 'none',
                                }} />
                                Results
                              </div>
                              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.5 }}>
                                {analysisPhase === 'complete' ? (
                                  <>
                                    <span style={{ color: '#30D158', animation: 'moduleReveal 0.3s ease forwards' }}>✓</span> Match tokens<br />
                                    <span style={{ color: '#30D158', animation: 'moduleReveal 0.3s ease forwards 0.1s' }}>✓</span> Fix duplicates
                                  </>
                                ) : (
                                  <>
                                    • Match tokens<br />
                                    • Fix duplicates
                                  </>
                                )}
                              </div>
                              {/* Tooltip */}
                              {hoveredModule === 'results' && (
                                <div style={{
                                  position: 'absolute',
                                  bottom: 'calc(100% + 8px)',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: 'rgba(0, 0, 0, 0.95)',
                                  padding: '6px 10px',
                                  borderRadius: '4px',
                                  fontSize: '9px',
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  whiteSpace: 'nowrap',
                                  animation: 'tooltipFade 0.2s ease',
                                  zIndex: 10,
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}>
                                  Outputs actionable fixes
                                  <div style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)',
                                    width: '8px',
                                    height: '8px',
                                    background: 'rgba(0, 0, 0, 0.95)',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                  }} />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Enhanced Status Indicator */}
                          <div style={{
                            marginTop: '12px',
                            padding: '8px 10px',
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            border: analysisPhase === 'complete'
                              ? '1px solid rgba(48, 209, 88, 0.2)'
                              : '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'border-color 0.3s ease',
                          }}>
                            <div style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: analysisPhase === 'idle'
                                ? 'rgba(255, 255, 255, 0.3)'
                                : analysisPhase === 'complete'
                                  ? '#30D158'
                                  : '#0D99FF',
                              boxShadow: analysisPhase === 'idle'
                                ? 'none'
                                : analysisPhase === 'complete'
                                  ? '0 0 8px rgba(48, 209, 88, 0.5)'
                                  : '0 0 8px rgba(13, 153, 255, 0.5)',
                              animation: analysisPhase !== 'idle' && analysisPhase !== 'complete'
                                ? 'statusPulse 0.8s ease infinite'
                                : 'none',
                              transition: 'background 0.3s ease, box-shadow 0.3s ease',
                            }} />
                            <span style={{
                              fontSize: '10px',
                              fontWeight: analysisPhase === 'complete' ? '500' : '400',
                              color: analysisPhase === 'idle'
                                ? 'rgba(255, 255, 255, 0.4)'
                                : analysisPhase === 'complete'
                                  ? '#30D158'
                                  : '#0D99FF',
                              transition: 'color 0.3s ease',
                            }}>
                              {analysisPhase === 'idle' && 'Ready to analyze'}
                              {analysisPhase === 'scan' && 'Scanning tokens...'}
                              {analysisPhase === 'analyze' && 'Analyzing patterns...'}
                              {analysisPhase === 'complete' && 'Analysis complete'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </>
                  ) : index === 1 ? (
                    /* DESIGN SYSTEM & TOKENISATION - Interactive Token Architecture Visualization */
                    <>
                    {/* Interactive Prototype Helper */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                      padding: '8px 16px',
                      background: 'rgba(99, 102, 241, 0.1)',
                      borderRadius: '20px',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      width: 'fit-content',
                      margin: '0 auto 12px',
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#6366F1',
                        animation: 'statusPulse 1.5s ease infinite',
                      }} />
                      <span style={{
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontWeight: '500',
                      }}>
                        Interactive Prototype
                      </span>
                      <span style={{
                        fontSize: '10px',
                        color: 'rgba(255, 255, 255, 0.4)',
                      }}>
                        — Click &quot;Apply Token&quot; to see cascade flow
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      maxWidth: '1100px',
                      margin: '0 auto',
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '24px',
                      padding: '8px',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                      fontSize: '11px',
                    }}>
                      {/* ======== LEFT PANEL: Token Library ======== */}
                      <div style={{
                        background: '#2C2C2C',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                      }}>
                        {/* Panel Header */}
                        <div style={{
                          background: '#1E1E1E',
                          padding: '8px 12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '4px',
                              background: '#6366F1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <span style={{ fontSize: '10px', color: 'white', fontWeight: '700' }}>T</span>
                            </div>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              color: 'rgba(255, 255, 255, 0.9)',
                            }}>Token Library</span>
                          </div>
                          <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>4 categories</span>
                        </div>

                        {/* Token Categories */}
                        <div style={{ padding: '8px' }}>
                          {/* Colors Category */}
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            marginBottom: '6px',
                            overflow: 'hidden',
                          }}>
                            <div
                              onClick={() => setExpandedCategory(expandedCategory === 'Colors' ? null : 'Colors')}
                              style={{
                                padding: '8px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                background: expandedCategory === 'Colors' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                transition: 'background 0.15s ease',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                  {expandedCategory === 'Colors' ? '▼' : '▶'}
                                </span>
                                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>Colors</span>
                              </div>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>4 tokens</span>
                            </div>
                            {expandedCategory === 'Colors' && (
                              <div style={{ padding: '4px 10px 8px 28px' }}>
                                {[
                                  { name: 'primary-500', value: '#DA0E29', color: '#DA0E29' },
                                  { name: 'primary-400', value: '#E83A50', color: '#E83A50' },
                                  { name: 'neutral-100', value: '#F5F5F5', color: '#F5F5F5' },
                                  { name: 'neutral-900', value: '#1A1A1A', color: '#1A1A1A' },
                                ].map((token) => (
                                  <div key={token.name} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '4px 0',
                                  }}>
                                    <div style={{
                                      width: '12px',
                                      height: '12px',
                                      borderRadius: '3px',
                                      background: token.color,
                                      border: token.color === '#1A1A1A' ? '1px solid rgba(255,255,255,0.2)' : 'none',
                                    }} />
                                    <span style={{
                                      fontSize: '10px',
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                                    }}>{token.name}</span>
                                    <span style={{
                                      fontSize: '9px',
                                      color: 'rgba(255, 255, 255, 0.4)',
                                      marginLeft: 'auto',
                                    }}>{token.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Typography Category */}
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            marginBottom: '6px',
                          }}>
                            <div
                              onClick={() => setExpandedCategory(expandedCategory === 'Typography' ? null : 'Typography')}
                              style={{
                                padding: '8px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                background: expandedCategory === 'Typography' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                transition: 'background 0.15s ease',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                  {expandedCategory === 'Typography' ? '▼' : '▶'}
                                </span>
                                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>Typography</span>
                              </div>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>2 tokens</span>
                            </div>
                            {expandedCategory === 'Typography' && (
                              <div style={{ padding: '4px 10px 8px 28px' }}>
                                {[
                                  { name: 'heading-xl', value: '32px/1.2' },
                                  { name: 'body-md', value: '16px/1.5' },
                                ].map((token) => (
                                  <div key={token.name} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '4px 0',
                                  }}>
                                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>Aa</span>
                                    <span style={{
                                      fontSize: '10px',
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                                    }}>{token.name}</span>
                                    <span style={{
                                      fontSize: '9px',
                                      color: 'rgba(255, 255, 255, 0.4)',
                                      marginLeft: 'auto',
                                    }}>{token.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Spacing Category */}
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            marginBottom: '6px',
                          }}>
                            <div
                              onClick={() => setExpandedCategory(expandedCategory === 'Spacing' ? null : 'Spacing')}
                              style={{
                                padding: '8px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                background: expandedCategory === 'Spacing' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                transition: 'background 0.15s ease',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                  {expandedCategory === 'Spacing' ? '▼' : '▶'}
                                </span>
                                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>Spacing</span>
                              </div>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>2 tokens</span>
                            </div>
                            {expandedCategory === 'Spacing' && (
                              <div style={{ padding: '4px 10px 8px 28px' }}>
                                {[
                                  { name: 'space-4', value: '16px' },
                                  { name: 'space-8', value: '32px' },
                                ].map((token) => (
                                  <div key={token.name} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '4px 0',
                                  }}>
                                    <div style={{
                                      width: '12px',
                                      height: '4px',
                                      background: 'rgba(99, 102, 241, 0.5)',
                                      borderRadius: '1px',
                                    }} />
                                    <span style={{
                                      fontSize: '10px',
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                                    }}>{token.name}</span>
                                    <span style={{
                                      fontSize: '9px',
                                      color: 'rgba(255, 255, 255, 0.4)',
                                      marginLeft: 'auto',
                                    }}>{token.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Border Radius Category */}
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                          }}>
                            <div
                              onClick={() => setExpandedCategory(expandedCategory === 'Border Radius' ? null : 'Border Radius')}
                              style={{
                                padding: '8px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                background: expandedCategory === 'Border Radius' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                transition: 'background 0.15s ease',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                  {expandedCategory === 'Border Radius' ? '▼' : '▶'}
                                </span>
                                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>Border Radius</span>
                              </div>
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>2 tokens</span>
                            </div>
                            {expandedCategory === 'Border Radius' && (
                              <div style={{ padding: '4px 10px 8px 28px' }}>
                                {[
                                  { name: 'radius-sm', value: '4px' },
                                  { name: 'radius-lg', value: '12px' },
                                ].map((token) => (
                                  <div key={token.name} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '4px 0',
                                  }}>
                                    <div style={{
                                      width: '12px',
                                      height: '12px',
                                      border: '2px solid rgba(99, 102, 241, 0.5)',
                                      borderRadius: token.name === 'radius-sm' ? '2px' : '4px',
                                    }} />
                                    <span style={{
                                      fontSize: '10px',
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                                    }}>{token.name}</span>
                                    <span style={{
                                      fontSize: '9px',
                                      color: 'rgba(255, 255, 255, 0.4)',
                                      marginLeft: 'auto',
                                    }}>{token.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Stats and Apply Button */}
                        <div style={{ padding: '8px 12px 12px' }}>
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            marginBottom: '10px',
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: '8px',
                            }}>
                              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>
                                4 Airlines Unified
                              </span>
                              <span style={{
                                fontSize: '11px',
                                fontWeight: '600',
                                color: tokenPhase === 'complete' ? '#30D158' : 'rgba(255, 255, 255, 0.4)',
                              }}>
                                {tokenPhase === 'complete' ? '100%' : '—'}
                              </span>
                            </div>
                            <div style={{
                              height: '4px',
                              background: 'rgba(255, 255, 255, 0.1)',
                              borderRadius: '2px',
                              overflow: 'hidden',
                            }}>
                              <div style={{
                                width: tokenPhase === 'complete' ? '100%' : '0%',
                                height: '100%',
                                background: '#6366F1',
                                borderRadius: '2px',
                                transition: 'width 0.6s cubic-bezier(0.2, 0, 0, 1)',
                              }} />
                            </div>
                          </div>

                          {/* Apply Token Button */}
                          <button
                            onClick={() => {
                              if (isApplyingToken) return;
                              setIsApplyingToken(true);
                              setTokenPhase('global');

                              // Phase 2: Alias (after 400ms)
                              setTimeout(() => setTokenPhase('alias'), 400);

                              // Phase 3: Component (after 800ms)
                              setTimeout(() => setTokenPhase('component'), 800);

                              // Phase 4: Complete (after 1200ms)
                              setTimeout(() => {
                                setTokenPhase('complete');
                                setIsApplyingToken(false);
                              }, 1200);
                            }}
                            style={{
                              width: '100%',
                              background: isApplyingToken ? '#1E1E1E' : '#6366F1',
                              color: 'white',
                              border: isApplyingToken ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                              borderRadius: '6px',
                              padding: '8px 16px',
                              fontSize: '11px',
                              fontWeight: '500',
                              cursor: isApplyingToken ? 'not-allowed' : 'pointer',
                              transition: 'all 0.15s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                            }}
                            onMouseEnter={(e) => !isApplyingToken && (e.currentTarget.style.background = '#5558E3')}
                            onMouseLeave={(e) => !isApplyingToken && (e.currentTarget.style.background = '#6366F1')}
                          >
                            {isApplyingToken ? (
                              <>
                                <div style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  border: '2px solid rgba(255, 255, 255, 0.2)',
                                  borderTopColor: 'rgba(255, 255, 255, 0.9)',
                                  animation: 'spin 0.8s linear infinite',
                                }} />
                                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Applying...</span>
                              </>
                            ) : (
                              <span>Apply Token</span>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* ======== RIGHT PANEL: Token Cascade Flow ======== */}
                      <div style={{
                        background: '#2C2C2C',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                        display: isMobile ? 'none' : 'block',
                      }}>
                        {/* Panel Header */}
                        <div style={{
                          background: '#1E1E1E',
                          padding: '8px 12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            background: 'rgba(162, 89, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <span style={{ fontSize: '10px', color: '#A259FF' }}>⚡</span>
                          </div>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: 'rgba(255, 255, 255, 0.9)',
                          }}>Token Cascade Flow</span>
                        </div>

                        {/* Cascade Visualization */}
                        <div style={{ padding: '16px', position: 'relative', minHeight: '280px' }}>
                          {/* SVG Connections */}
                          <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            style={{
                              position: 'absolute',
                              top: '16px',
                              left: '16px',
                              width: 'calc(100% - 32px)',
                              height: 'calc(100% - 80px)',
                              pointerEvents: 'none',
                              zIndex: 0,
                            }}
                          >
                            <defs>
                              <filter id="tokenGlow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feMerge>
                                  <feMergeNode in="blur" />
                                  <feMergeNode in="SourceGraphic" />
                                </feMerge>
                              </filter>
                              <marker
                                id="arrowhead-token"
                                markerWidth="6"
                                markerHeight="5"
                                refX="5"
                                refY="2.5"
                                orient="auto"
                              >
                                <polygon
                                  points="0 0, 6 2.5, 0 5"
                                  fill={tokenPhase !== 'idle' ? '#6366F1' : 'rgba(255, 255, 255, 0.2)'}
                                  style={{ transition: 'fill 0.3s ease' }}
                                />
                              </marker>
                            </defs>

                            {/* Global → Alias connection */}
                            <path
                              d="M 50 22 L 50 42"
                              fill="none"
                              stroke={['global', 'alias', 'component', 'complete'].includes(tokenPhase) ? 'rgba(48, 209, 88, 0.6)' : 'rgba(255, 255, 255, 0.1)'}
                              strokeWidth="1"
                              strokeDasharray="4 2"
                              markerEnd="url(#arrowhead-token)"
                              filter={tokenPhase === 'alias' ? 'url(#tokenGlow)' : 'none'}
                              style={{
                                transition: 'stroke 0.3s ease',
                                animation: tokenPhase === 'alias' ? 'flowLine 1s linear infinite' : 'none',
                              }}
                            />

                            {/* Alias → Component connection */}
                            <path
                              d="M 50 58 L 50 78"
                              fill="none"
                              stroke={['alias', 'component', 'complete'].includes(tokenPhase) ? 'rgba(13, 153, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)'}
                              strokeWidth="1"
                              strokeDasharray="4 2"
                              markerEnd="url(#arrowhead-token)"
                              filter={tokenPhase === 'component' ? 'url(#tokenGlow)' : 'none'}
                              style={{
                                transition: 'stroke 0.3s ease',
                                animation: tokenPhase === 'component' ? 'flowLine 1s linear infinite' : 'none',
                              }}
                            />

                            {/* Data packets */}
                            {tokenPhase === 'alias' && (
                              <circle r="2" fill="#30D158" style={{
                                offsetPath: "path('M 50 22 L 50 42')",
                                animation: 'movePacket 0.6s ease-in-out infinite',
                              }}>
                                <animate attributeName="opacity" values="0;1;1;0" dur="0.6s" repeatCount="indefinite" />
                              </circle>
                            )}
                            {tokenPhase === 'component' && (
                              <circle r="2" fill="#0D99FF" style={{
                                offsetPath: "path('M 50 58 L 50 78')",
                                animation: 'movePacket 0.6s ease-in-out infinite',
                              }}>
                                <animate attributeName="opacity" values="0;1;1;0" dur="0.6s" repeatCount="indefinite" />
                              </circle>
                            )}
                          </svg>

                          {/* Tier Boxes */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '24px',
                            position: 'relative',
                            zIndex: 1,
                          }}>
                            {/* GLOBAL Tier */}
                            <div style={{
                              background: '#1E1E1E',
                              border: `1px solid ${['global', 'alias', 'component', 'complete'].includes(tokenPhase) ? 'rgba(48, 209, 88, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                              borderRadius: '8px',
                              padding: '12px 20px',
                              minWidth: '140px',
                              textAlign: 'center',
                              transition: 'all 0.3s ease',
                              boxShadow: tokenPhase === 'global'
                                ? '0 0 8px rgba(48, 209, 88, 0.3), 0 0 16px rgba(48, 209, 88, 0.15)'
                                : 'none',
                            }}>
                              <div style={{
                                fontSize: '9px',
                                color: '#30D158',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '4px',
                              }}>GLOBAL</div>
                              <div style={{
                                fontSize: '11px',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                              }}>red-500</div>
                              <div style={{
                                fontSize: '9px',
                                color: 'rgba(255, 255, 255, 0.4)',
                                marginTop: '2px',
                              }}>#DA0E29</div>
                            </div>

                            {/* ALIAS Tier */}
                            <div style={{
                              background: '#1E1E1E',
                              border: `1px solid ${['alias', 'component', 'complete'].includes(tokenPhase) ? 'rgba(13, 153, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                              borderRadius: '8px',
                              padding: '12px 20px',
                              minWidth: '140px',
                              textAlign: 'center',
                              transition: 'all 0.3s ease',
                              boxShadow: tokenPhase === 'alias'
                                ? '0 0 8px rgba(13, 153, 255, 0.3), 0 0 16px rgba(13, 153, 255, 0.15)'
                                : 'none',
                            }}>
                              <div style={{
                                fontSize: '9px',
                                color: '#0D99FF',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '4px',
                              }}>ALIAS</div>
                              <div style={{
                                fontSize: '11px',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                              }}>brand.primary</div>
                              <div style={{
                                fontSize: '9px',
                                color: 'rgba(255, 255, 255, 0.4)',
                                marginTop: '2px',
                              }}>→ red-500</div>
                            </div>

                            {/* COMPONENT Tier */}
                            <div style={{
                              background: '#1E1E1E',
                              border: `1px solid ${['component', 'complete'].includes(tokenPhase) ? 'rgba(162, 89, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                              borderRadius: '8px',
                              padding: '12px 20px',
                              minWidth: '140px',
                              textAlign: 'center',
                              transition: 'all 0.3s ease',
                              boxShadow: tokenPhase === 'component'
                                ? '0 0 8px rgba(162, 89, 255, 0.3), 0 0 16px rgba(162, 89, 255, 0.15)'
                                : 'none',
                            }}>
                              <div style={{
                                fontSize: '9px',
                                color: '#A259FF',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '4px',
                              }}>COMPONENT</div>
                              <div style={{
                                fontSize: '11px',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                              }}>button.bg</div>
                              <div style={{
                                fontSize: '9px',
                                color: 'rgba(255, 255, 255, 0.4)',
                                marginTop: '2px',
                              }}>→ brand.primary</div>
                            </div>
                          </div>

                          {/* Status Indicator */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '16px',
                          }}>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: tokenPhase === 'idle' ? 'rgba(255, 255, 255, 0.3)'
                                : tokenPhase === 'complete' ? '#30D158'
                                : '#6366F1',
                              boxShadow: tokenPhase !== 'idle'
                                ? `0 0 8px ${tokenPhase === 'complete' ? '#30D158' : '#6366F1'}`
                                : 'none',
                              animation: tokenPhase !== 'idle' && tokenPhase !== 'complete' ? 'statusPulse 1s ease infinite' : 'none',
                              transition: 'all 0.3s ease',
                            }} />
                            <span style={{
                              fontSize: '10px',
                              color: tokenPhase === 'complete' ? '#30D158' : 'rgba(255, 255, 255, 0.5)',
                              transition: 'color 0.3s ease',
                            }}>
                              {tokenPhase === 'idle' && 'Ready to apply'}
                              {tokenPhase === 'global' && 'Reading primitives...'}
                              {tokenPhase === 'alias' && 'Mapping semantics...'}
                              {tokenPhase === 'component' && 'Applying to components...'}
                              {tokenPhase === 'complete' && 'Token cascade complete'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </>
                  ) : (
                    /* Default Image Placeholder for other cards */
                    <div style={{
                      width: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, rgba(${project.color}, 0.08), var(--glass-06))`,
                      border: `2px dashed rgba(${project.color}, 0.25)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(ellipse at center, rgba(${project.color}, 0.05), transparent 70%)`,
                        pointerEvents: 'none',
                      }} />
                      <Camera size={32} style={{ color: `rgba(${project.color}, 0.5)` }} />
                      <span style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-40)',
                        fontWeight: '500',
                      }}>
                        Add {project.title} Screenshot
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-25)',
                      }}>
                        16:9 aspect ratio recommended
                      </span>
                    </div>
                  )}

                  {/* Full Narrative Description - with image for Pixel Radar and Design System */}
                  {index === 0 ? (
                    <div style={{
                      width: '100%',
                      maxWidth: '1100px',
                      margin: '0 auto',
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '24px',
                      padding: '8px',
                      alignItems: 'start',
                    }}>
                      {/* Author Photo */}
                      <div style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.15), rgba(13, 153, 255, 0.15))',
                      }}>
                        <img
                          src="/images/pixel-radar-author.jpeg"
                          alt="Developer"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      {/* Text */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <p style={{
                          fontSize: '0.938rem',
                          color: 'var(--text-60)',
                          lineHeight: 1.8,
                          margin: '0 0 1rem 0',
                        }}>
                          When there&apos;s no design system, every screen is an island. Designers were making isolated decisions. Engineers were interpreting specs differently. Reviews caught inconsistencies too late—if at all.
                        </p>
                        <p style={{
                          fontSize: '0.938rem',
                          color: 'var(--text-60)',
                          lineHeight: 1.8,
                          margin: 0,
                        }}>
                          So I built Pixel Radar—a Figma plugin that automates consistency checks. What started as a personal workflow fix became infrastructure serving 450+ daily users, cutting design review time by 30%. It solved a problem the organization didn&apos;t have budget or bandwidth to address through official channels.
                        </p>
                      </div>
                    </div>
                  ) : index === 1 ? (
                    <div style={{
                      width: '100%',
                      maxWidth: '1100px',
                      margin: '0 auto',
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '24px',
                      padding: '8px',
                      alignItems: 'start',
                    }}>
                      {/* Design System Image */}
                      <div style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(162, 89, 255, 0.15))',
                      }}>
                        <img
                          src="/images/design-system-author.jpeg"
                          alt="Design System Architecture"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      {/* Text */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <p style={{
                          fontSize: '0.938rem',
                          color: 'var(--text-60)',
                          lineHeight: 1.8,
                          margin: '0 0 1rem 0',
                        }}>
                          I started by reverse-engineering what existed. Hundreds of screens, undocumented, built over years by people who&apos;d since left. I extracted the implicit logic—spacing patterns, typography decisions, color usage—and codified it into a systematic token framework.
                        </p>
                        <p style={{
                          fontSize: '0.938rem',
                          color: 'var(--text-60)',
                          lineHeight: 1.8,
                          margin: 0,
                        }}>
                          This became the foundation that would let four merging airlines eventually speak the same design language. Variables, naming conventions, hierarchy—the infrastructure that makes consistency possible at scale.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p style={{
                      fontSize: '0.938rem',
                      color: 'var(--text-60)',
                      lineHeight: 1.8,
                      whiteSpace: 'pre-line',
                    }}>
                      {project.longDescription}
                    </p>
                  )}
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
