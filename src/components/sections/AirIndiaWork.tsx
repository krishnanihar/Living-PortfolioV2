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
// ACT CONFIGURATION - THREE-ACT NARRATIVE STRUCTURE
// =============================================================================

interface ActConfig {
  name: string;
  color: string;
  quote: string;
  projects: number[];
}

const actConfig: Record<1 | 2 | 3, ActConfig> = {
  1: {
    name: 'Building Foundations',
    color: '99, 102, 241', // Indigo
    quote: "When there's no design system, every screen is an island.",
    projects: [0, 1], // Pixel Radar, Design System
  },
  2: {
    name: 'Shipping Innovation',
    color: '218, 14, 41', // Brand Red
    quote: 'While the organization modernized basics, I designed for what comes next.',
    projects: [2, 3, 4, 5], // AI Search, MCP, IFE, NPS
  },
  3: {
    name: 'Scaling Impact',
    color: '251, 191, 36', // Gold
    quote: "Products ship. But lasting change requires transforming the people building them.",
    projects: [6, 7, 8, 9], // Competitor, Liftoff, MS Hackathon, Internal Hackathon
  },
};

const narrativeTransitions = {
  intro: "What follows is not a list of projects. It's the story of how one designer helped transform India's flag carrier—from inherited chaos to award-winning excellence.",
  act1to2: "With design infrastructure in place and tools serving 450+ daily users, the foundation was set. It was time to build the products that would win awards.",
  act2to3: "Four awards. Three platforms redesigned. AI-native features in production. But transformation isn't just about shipping products. It's about changing how people work.",
};

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

  // Narrative act tracking
  const [currentAct, setCurrentAct] = useState<1 | 2 | 3>(1);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);
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

  // Card 2: Search with AI - NLU Query Pipeline states
  const [queryPhase, setQueryPhase] = useState<'idle' | 'typing' | 'tokenize' | 'entities' | 'intent' | 'results'>('idle');
  const [displayedQuery, setDisplayedQuery] = useState('');

  // Card 3: MCP Handoff states
  const [mcpPhase, setMcpPhase] = useState<'idle' | 'design' | 'server' | 'agent' | 'output'>('idle');

  // Card 4: IFE System states
  const [activeIFETab, setActiveIFETab] = useState<string>('movies');

  // Card 5: NPS Feedback states
  const [npsPhase, setNpsPhase] = useState<'idle' | 'score' | 'gauge' | 'bars' | 'complete'>('idle');
  const [npsScore, setNpsScore] = useState(0);

  // Card 6: Competitor Analysis states
  const [competitorHoveredRow, setCompetitorHoveredRow] = useState<number | null>(null);

  // Card 7: Liftoff Program states
  const [liftoffWeek, setLiftoffWeek] = useState(4);

  // Card 8: Microsoft Hackathon states
  const [hackathonFeedIndex, setHackathonFeedIndex] = useState(0);

  // Card 9: Internal Hackathon states
  const [sprintPhase, setSprintPhase] = useState<'idea' | 'design' | 'build' | 'test' | 'ship'>('build');

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

  // Act tracking scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get act section positions
      const act1Top = act1Ref.current?.offsetTop ?? 0;
      const act2Top = act2Ref.current?.offsetTop ?? Infinity;
      const act3Top = act3Ref.current?.offsetTop ?? Infinity;

      const viewportCenter = scrollY + windowHeight * 0.4;

      if (viewportCenter >= act3Top) {
        setCurrentAct(3);
      } else if (viewportCenter >= act2Top) {
        setCurrentAct(2);
      } else {
        setCurrentAct(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // =============================================================================
  // INLINE HELPER COMPONENTS
  // =============================================================================

  // Act Header Component
  const ActHeader = ({ actNum, title, quote, color }: { actNum: 1 | 2 | 3; title: string; quote: string; color: string }) => (
    <div style={{
      padding: isMobile ? '3rem 1rem 2rem' : '4rem 2rem 3rem',
      textAlign: 'center',
      position: 'relative',
    }}>
      {/* Act number - eyebrow */}
      <div style={{
        fontSize: '0.625rem',
        letterSpacing: '0.3em',
        color: `rgb(${color})`,
        textTransform: 'uppercase',
        marginBottom: '0.5rem',
        fontWeight: '500',
      }}>
        Act {actNum === 1 ? 'I' : actNum === 2 ? 'II' : 'III'}
      </div>

      {/* Act title */}
      <h2 style={{
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        fontWeight: '200',
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        marginBottom: '1rem',
      }}>
        {title}
      </h2>

      {/* Narrative quote */}
      <p style={{
        fontSize: '1rem',
        fontStyle: 'italic',
        color: 'var(--text-tertiary)',
        maxWidth: '600px',
        margin: '0 auto 1.5rem',
        lineHeight: 1.6,
      }}>
        &ldquo;{quote}&rdquo;
      </p>

      {/* Accent bar */}
      <div style={{
        width: '60px',
        height: '3px',
        background: `rgb(${color})`,
        margin: '0 auto',
        borderRadius: '2px',
        boxShadow: `0 0 20px rgba(${color}, 0.5)`,
      }} />
    </div>
  );

  // Narrative Connector Component
  const NarrativeConnector = ({ fromAct, toAct, text }: { fromAct: 1 | 2; toAct: 2 | 3; text: string }) => {
    const fromColor = actConfig[fromAct].color;
    const toColor = actConfig[toAct].color;

    return (
      <div style={{
        position: 'relative',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        overflow: 'hidden',
      }}>
        {/* Gradient transition line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '60px',
          background: `linear-gradient(180deg, rgba(${fromColor}, 0.6), rgba(${toColor}, 0.6))`,
          borderRadius: '1px',
        }} />

        {/* Transition text */}
        <p style={{
          maxWidth: '500px',
          margin: '60px auto 0',
          textAlign: 'center',
          fontSize: '0.9375rem',
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          lineHeight: 1.8,
        }}>
          {text}
        </p>
      </div>
    );
  };

  // Progress Indicator Component (Desktop only)
  const ProgressIndicator = () => {
    if (isMobile) return null;

    const acts: Array<{ num: 'I' | 'II' | 'III'; label: string; color: string; actNum: 1 | 2 | 3 }> = [
      { num: 'I', label: 'Building Foundations', color: actConfig[1].color, actNum: 1 },
      { num: 'II', label: 'Shipping Innovation', color: actConfig[2].color, actNum: 2 },
      { num: 'III', label: 'Scaling Impact', color: actConfig[3].color, actNum: 3 },
    ];

    const scrollToAct = (actNum: 1 | 2 | 3) => {
      const ref = actNum === 1 ? act1Ref : actNum === 2 ? act2Ref : act3Ref;
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
      <div style={{
        position: 'fixed',
        left: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        {acts.map((act) => {
          const isActive = currentAct === act.actNum;
          const isPast = currentAct > act.actNum;

          return (
            <div
              key={act.num}
              onClick={() => scrollToAct(act.actNum)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {/* Vertical bar */}
              <div style={{
                width: '3px',
                height: '48px',
                borderRadius: '2px',
                background: isActive
                  ? `rgba(${act.color}, 0.8)`
                  : isPast
                    ? 'var(--text-30)'
                    : 'var(--glass-08)',
                transition: 'all 0.5s ease',
                boxShadow: isActive ? `0 0 12px rgba(${act.color}, 0.4)` : 'none',
                position: 'relative',
              }}>
                {/* Active dot */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    boxShadow: `0 0 10px rgba(${act.color}, 0.6)`,
                  }} />
                )}
              </div>

              {/* Label - only show on active */}
              <div style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'all 0.3s ease',
                padding: '0.5rem 0.75rem',
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '8px',
                border: '1px solid var(--glass-10)',
                pointerEvents: 'none',
              }}>
                <div style={{
                  fontSize: '0.625rem',
                  color: `rgba(${act.color}, 0.8)`,
                  letterSpacing: '0.1em',
                  fontWeight: '600',
                }}>
                  ACT {act.num}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                }}>
                  {act.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // =============================================================================
  // CARD VISUALIZATIONS - Interactive mini prototypes for each project
  // =============================================================================
  const renderCardVisual = (index: number, isHovered: boolean, project: Project) => {
    const actColor = index < 2 ? actConfig[1].color : index < 6 ? actConfig[2].color : actConfig[3].color;

    // Card 0: Pixel Radar - Floating UI Panels
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
                width: isHovered ? '70%' : '30%',
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

    // Card 1: Design System - Token Constellation
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

    // Card 2: Search with AI - NLU Query Pipeline
    if (index === 2) {
      return (
        <div style={{
          width: '160px',
          height: '100px',
          position: 'relative',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s ease',
        }}>
          {/* Search bar */}
          <div style={{
            padding: '8px 12px',
            borderRadius: '20px',
            background: 'var(--glass-10)',
            border: `1px solid rgba(${project.color}, ${isHovered ? 0.4 : 0.2})`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'all 0.3s ease',
          }}>
            <Search size={12} style={{ color: `rgb(${project.color})` }} />
            <span style={{
              fontSize: '9px',
              color: 'var(--text-50)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}>flights to Delhi...</span>
          </div>
          {/* Pipeline stages */}
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
            {['T', 'E', 'I', 'C', 'R'].map((label, i) => (
              <div key={i} style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: isHovered ? `rgba(${project.color}, ${0.3 - i * 0.04})` : 'var(--glass-08)',
                border: `1px solid rgba(${project.color}, ${isHovered ? 0.4 : 0.15})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                fontWeight: '600',
                color: isHovered ? `rgb(${project.color})` : 'var(--text-40)',
                transition: `all 0.3s ease ${i * 0.05}s`,
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}>
                {label}
              </div>
            ))}
          </div>
          {/* Result indicator */}
          <div style={{
            marginTop: '8px',
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
          }}>
            {[1, 2, 3].map((_, i) => (
              <div key={i} style={{
                width: '32px',
                height: '6px',
                borderRadius: '3px',
                background: isHovered ? `rgba(${project.color}, ${0.5 - i * 0.1})` : 'var(--glass-10)',
                transition: `all 0.4s ease ${0.2 + i * 0.1}s`,
              }} />
            ))}
          </div>
        </div>
      );
    }

    // Card 3: MCP Handoff - Design-to-Code Bridge
    if (index === 3) {
      return (
        <div style={{
          width: '160px',
          height: '100px',
          position: 'relative',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s ease',
        }}>
          {/* Pipeline nodes */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            {[
              { icon: '◇', label: 'FIG' },
              { icon: '⚡', label: 'MCP' },
              { icon: '◉', label: 'AI' },
              { icon: '<>', label: 'CODE' },
            ].map((node, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: isHovered ? `rgba(${project.color}, ${0.3 - i * 0.05})` : 'var(--glass-10)',
                  border: `1px solid rgba(${project.color}, ${isHovered ? 0.5 : 0.2})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  transition: `all 0.3s ease ${i * 0.1}s`,
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: isHovered ? `0 0 15px rgba(${project.color}, 0.3)` : 'none',
                }}>
                  {node.icon}
                </div>
                <span style={{ fontSize: '7px', color: 'var(--text-40)', fontWeight: '500' }}>{node.label}</span>
              </div>
            ))}
          </div>
          {/* Connection line with animation */}
          <svg style={{ position: 'absolute', top: '20px', left: '20px', width: '120px', height: '10px', overflow: 'visible' }}>
            <line x1="0" y1="5" x2="120" y2="5"
              stroke={`rgba(${project.color}, ${isHovered ? 0.4 : 0.15})`}
              strokeWidth="2"
              strokeDasharray={isHovered ? "4 2" : "2 2"}
              style={{ transition: 'all 0.3s ease' }}
            />
          </svg>
          {/* Code output preview */}
          <div style={{
            padding: '6px 10px',
            borderRadius: '6px',
            background: 'var(--glass-08)',
            border: `1px solid rgba(${project.color}, 0.15)`,
            fontFamily: 'monospace',
            fontSize: '8px',
            color: isHovered ? `rgb(${project.color})` : 'var(--text-40)',
            transition: 'all 0.3s ease',
          }}>
            {`<Button variant="primary" />`}
          </div>
        </div>
      );
    }

    // Card 4: IFE System - Interactive Seatback Screen
    if (index === 4) {
      const ifeTabs = ['🎬', '📺', '🎵', '🎮', '✈️'];
      return (
        <div style={{
          width: '160px',
          height: '110px',
          position: 'relative',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s ease',
        }}>
          {/* Seatback screen frame */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            background: 'linear-gradient(180deg, #1a1a1a, #0d0d0d)',
            border: `2px solid rgba(${project.color}, ${isHovered ? 0.5 : 0.25})`,
            padding: '8px',
            boxShadow: isHovered
              ? `0 15px 40px rgba(${project.color}, 0.3), inset 0 1px 0 rgba(255,255,255,0.08)`
              : `0 8px 25px rgba(${project.color}, 0.15)`,
            transition: 'all 0.4s ease',
            overflow: 'hidden',
          }}>
            {/* Tab bar */}
            <div style={{
              display: 'flex',
              gap: '2px',
              marginBottom: '6px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '4px',
              padding: '2px',
            }}>
              {ifeTabs.map((tab, i) => (
                <div key={i} style={{
                  flex: 1,
                  padding: '3px 0',
                  fontSize: '8px',
                  textAlign: 'center',
                  borderRadius: '3px',
                  background: i === 0 ? `rgba(${project.color}, ${isHovered ? 0.5 : 0.3})` : 'transparent',
                  transition: `all 0.3s ease ${i * 0.05}s`,
                  transform: isHovered && i === 0 ? 'scale(1.1)' : 'scale(1)',
                }}>
                  {tab}
                </div>
              ))}
            </div>
            {/* Content grid - movie thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', marginBottom: '6px' }}>
              {[0.4, 0.35, 0.3, 0.25].map((opacity, i) => (
                <div key={i} style={{
                  aspectRatio: '1',
                  borderRadius: '3px',
                  background: `rgba(${project.color}, ${isHovered ? opacity + 0.1 : opacity})`,
                  transition: `all 0.3s ease ${i * 0.08}s`,
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }} />
              ))}
            </div>
            {/* Now playing bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 6px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '4px',
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: `rgb(${project.color})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isHovered ? `0 0 8px rgba(${project.color}, 0.6)` : 'none',
              }}>
                <div style={{ width: 0, height: 0, borderTop: '3px solid transparent', borderBottom: '3px solid transparent', borderLeft: '5px solid white', marginLeft: '1px' }} />
              </div>
              {/* Progress bar */}
              <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: 'var(--glass-15)', overflow: 'hidden' }}>
                <div style={{
                  width: isHovered ? '65%' : '30%',
                  height: '100%',
                  borderRadius: '2px',
                  background: `rgb(${project.color})`,
                  transition: 'width 0.8s ease',
                }} />
              </div>
              <span style={{ fontSize: '7px', color: 'var(--text-40)' }}>1:23</span>
            </div>
          </div>
          {/* Seat indicator */}
          <div style={{
            position: 'absolute',
            bottom: '-16px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '7px',
            color: 'var(--text-30)',
            letterSpacing: '0.5px',
          }}>
            SEAT 12A
          </div>
        </div>
      );
    }

    // Card 5: NPS Feedback - Gauge Dashboard
    if (index === 5) {
      return (
        <div style={{
          width: '160px',
          height: '100px',
          position: 'relative',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s ease',
        }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            {/* Score badge */}
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, rgba(${project.color}, 0.3), rgba(${project.color}, 0.1))`,
              border: `1px solid rgba(${project.color}, ${isHovered ? 0.5 : 0.25})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: isHovered ? `0 0 20px rgba(${project.color}, 0.3)` : 'none',
            }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: `rgb(${project.color})` }}>+67</span>
              <span style={{ fontSize: '6px', color: 'var(--text-40)', textTransform: 'uppercase' }}>NPS</span>
            </div>
            {/* Mini gauge */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {/* Semi-circle gauge */}
              <svg width="80" height="40" viewBox="0 0 80 40" style={{ overflow: 'visible' }}>
                {/* Background arc */}
                <path
                  d="M 5 38 A 35 35 0 0 1 75 38"
                  fill="none"
                  stroke="var(--glass-15)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Colored arc */}
                <path
                  d="M 5 38 A 35 35 0 0 1 75 38"
                  fill="none"
                  stroke={`rgb(${project.color})`}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="110"
                  strokeDashoffset={isHovered ? '27' : '55'}
                  style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                />
                {/* Needle */}
                <line
                  x1="40" y1="38" x2="40" y2="12"
                  stroke={`rgb(${project.color})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '40px 38px',
                    transform: `rotate(${isHovered ? 60 : 0}deg)`,
                    transition: 'transform 0.8s ease',
                  }}
                />
              </svg>
              {/* Scale labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '6px', color: 'var(--text-30)' }}>
                <span>-100</span>
                <span>+100</span>
              </div>
            </div>
          </div>
          {/* Distribution bars */}
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {[
              { label: 'P', value: 72, color: '#30D158' },
              { label: 'N', value: 18, color: '#FF9F0A' },
              { label: 'D', value: 10, color: '#FF453A' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '6px', color: item.color, width: '8px' }}>{item.label}</span>
                <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'var(--glass-10)', overflow: 'hidden' }}>
                  <div style={{
                    width: isHovered ? `${item.value}%` : '10%',
                    height: '100%',
                    borderRadius: '2px',
                    background: item.color,
                    transition: `width 0.6s ease ${i * 0.1}s`,
                  }} />
                </div>
                <span style={{ fontSize: '6px', color: 'var(--text-30)', width: '16px', textAlign: 'right' }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Card 6: Competitor Analysis - Feature Matrix
    if (index === 6) {
      const features = ['UX', 'App', 'IFE', 'Web'];
      const airlines = [
        { name: 'AI', scores: [4, 5, 5, 4] },
        { name: 'EK', scores: [5, 4, 5, 5] },
        { name: 'SQ', scores: [5, 5, 4, 5] },
      ];
      return (
        <div style={{
          width: '160px',
          height: '100px',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s ease',
        }}>
          {/* Matrix header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '24px repeat(4, 1fr)',
            gap: '2px',
            marginBottom: '4px',
          }}>
            <div />
            {features.map((f, i) => (
              <div key={i} style={{
                fontSize: '7px',
                color: 'var(--text-40)',
                textAlign: 'center',
                fontWeight: '500',
              }}>{f}</div>
            ))}
          </div>
          {/* Matrix rows */}
          {airlines.map((airline, ai) => (
            <div key={ai} style={{
              display: 'grid',
              gridTemplateColumns: '24px repeat(4, 1fr)',
              gap: '2px',
              marginBottom: '3px',
              padding: '3px 0',
              background: ai === 0 ? `rgba(${project.color}, ${isHovered ? 0.15 : 0.08})` : 'transparent',
              borderRadius: '4px',
              transition: `all 0.3s ease ${ai * 0.1}s`,
            }}>
              <div style={{
                fontSize: '7px',
                fontWeight: '600',
                color: ai === 0 ? `rgb(${project.color})` : 'var(--text-50)',
              }}>{airline.name}</div>
              {airline.scores.map((score, si) => (
                <div key={si} style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1px',
                }}>
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div key={dot} style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: dot <= score
                        ? (ai === 0 ? `rgb(${project.color})` : dot <= 3 ? '#FF9F0A' : '#30D158')
                        : 'var(--glass-15)',
                      transition: `all 0.3s ease ${(ai * 4 + si) * 0.03}s`,
                      transform: isHovered && dot <= score ? 'scale(1.2)' : 'scale(1)',
                    }} />
                  ))}
                </div>
              ))}
            </div>
          ))}
          {/* Stats footer */}
          <div style={{
            marginTop: '6px',
            fontSize: '6px',
            color: 'var(--text-30)',
            textAlign: 'center',
          }}>
            15+ apps · 47 features
          </div>
        </div>
      );
    }

    // Card 7: Liftoff Program - Learning Timeline
    if (index === 7) {
      const weeks = [1, 2, 3, 4, 5, 6];
      const currentWeek = 4;
      return (
        <div style={{
          width: '160px',
          height: '100px',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s ease',
        }}>
          {/* Timeline */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            {/* Connection line */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              right: '10px',
              height: '2px',
              background: 'var(--glass-15)',
            }}>
              <div style={{
                width: isHovered ? `${((currentWeek - 1) / (weeks.length - 1)) * 100}%` : '20%',
                height: '100%',
                background: `rgb(${project.color})`,
                transition: 'width 0.8s ease',
                boxShadow: `0 0 8px rgba(${project.color}, 0.5)`,
              }} />
            </div>
            {/* Week nodes */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {weeks.map((week, i) => {
                const isCompleted = week <= currentWeek;
                const isCurrent = week === currentWeek;
                return (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <div style={{
                      width: isCurrent ? '20px' : '16px',
                      height: isCurrent ? '20px' : '16px',
                      borderRadius: '50%',
                      background: isCompleted
                        ? `rgb(${project.color})`
                        : 'var(--glass-15)',
                      border: isCurrent ? `2px solid rgba(${project.color}, 0.5)` : 'none',
                      transition: `all 0.4s ease ${i * 0.1}s`,
                      boxShadow: isCurrent && isHovered ? `0 0 12px rgba(${project.color}, 0.6)` : 'none',
                      transform: isHovered && isCompleted ? 'scale(1.15)' : 'scale(1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {isCompleted && (
                        <span style={{ fontSize: '8px', color: 'white' }}>✓</span>
                      )}
                    </div>
                    <span style={{
                      fontSize: '6px',
                      color: isCurrent ? `rgb(${project.color})` : 'var(--text-30)',
                      fontWeight: isCurrent ? '600' : '400',
                    }}>W{week}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Current module card */}
          <div style={{
            padding: '8px 10px',
            borderRadius: '8px',
            background: `rgba(${project.color}, ${isHovered ? 0.15 : 0.08})`,
            border: `1px solid rgba(${project.color}, 0.2)`,
            transition: 'all 0.3s ease',
          }}>
            <div style={{ fontSize: '7px', color: 'var(--text-40)', marginBottom: '4px' }}>CURRENT MODULE</div>
            <div style={{ fontSize: '9px', fontWeight: '600', color: `rgb(${project.color})`, marginBottom: '6px' }}>Design Systems</div>
            {/* Progress bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'var(--glass-10)', overflow: 'hidden' }}>
                <div style={{
                  width: isHovered ? '75%' : '30%',
                  height: '100%',
                  borderRadius: '2px',
                  background: `rgb(${project.color})`,
                  transition: 'width 0.6s ease',
                }} />
              </div>
              <span style={{ fontSize: '7px', color: 'var(--text-40)' }}>75%</span>
            </div>
          </div>
        </div>
      );
    }

    // Card 8: Microsoft Hackathon - Azure AI Pipeline
    if (index === 8) {
      const sentiments = [
        { text: 'Great!', emoji: '😊', score: 0.92 },
        { text: 'Okay', emoji: '😐', score: 0.45 },
      ];
      return (
        <div style={{
          width: '160px',
          height: '100px',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s ease',
        }}>
          {/* Pipeline nodes */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            {[
              { label: 'INPUT', icon: '📝' },
              { label: 'AZURE', icon: '🧠' },
              { label: 'OUTPUT', icon: '📊' },
            ].map((node, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: i === 1
                    ? `linear-gradient(135deg, rgba(${project.color}, 0.4), rgba(${project.color}, 0.2))`
                    : 'var(--glass-10)',
                  border: `1px solid rgba(${project.color}, ${isHovered ? 0.4 : 0.2})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  transition: `all 0.3s ease ${i * 0.15}s`,
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: isHovered && i === 1 ? `0 0 20px rgba(${project.color}, 0.4)` : 'none',
                }}>
                  {node.icon}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '5px',
                  color: 'var(--text-30)',
                  marginTop: '2px',
                  whiteSpace: 'nowrap',
                }}>{node.label}</div>
                {/* Connection arrow */}
                {i < 2 && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '100%',
                    transform: 'translateY(-50%)',
                    width: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{
                      fontSize: '8px',
                      color: `rgba(${project.color}, ${isHovered ? 0.8 : 0.4})`,
                      transition: 'color 0.3s ease',
                    }}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Live feed */}
          <div style={{
            marginTop: '12px',
            padding: '6px 8px',
            borderRadius: '6px',
            background: 'var(--glass-08)',
            border: '1px solid var(--glass-10)',
          }}>
            {sentiments.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2px 0',
                fontSize: '7px',
                opacity: isHovered ? 1 : 0.6,
                transition: `opacity 0.3s ease ${i * 0.1}s`,
              }}>
                <span style={{ color: 'var(--text-40)' }}>&quot;{item.text}&quot;</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span>{item.emoji}</span>
                  <span style={{ color: item.score > 0.7 ? '#30D158' : '#FF9F0A' }}>
                    {item.score.toFixed(2)}
                  </span>
                </span>
              </div>
            ))}
          </div>
          {/* Award badge */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            fontSize: '7px',
            color: `rgb(${project.color})`,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}>
            🏆 1st Place
          </div>
        </div>
      );
    }

    // Card 9: Internal Hackathon - Sprint Timeline
    if (index === 9) {
      const phases = [
        { name: 'IDEA', hours: 2, done: true },
        { name: 'DESIGN', hours: 4, done: true },
        { name: 'BUILD', hours: 12, done: true },
        { name: 'TEST', hours: 4, done: false },
        { name: 'SHIP', hours: 2, done: false },
      ];
      return (
        <div style={{
          width: '160px',
          height: '100px',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s ease',
        }}>
          {/* 24-HOUR header */}
          <div style={{
            fontSize: '7px',
            fontWeight: '700',
            color: `rgb(${project.color})`,
            marginBottom: '6px',
            letterSpacing: '0.5px',
          }}>24-HOUR SPRINT</div>
          {/* Phase timeline */}
          <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
            {phases.map((phase, i) => (
              <div key={i} style={{
                flex: phase.hours,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
              }}>
                <div style={{
                  width: '100%',
                  height: '16px',
                  borderRadius: '3px',
                  background: phase.done
                    ? `rgba(${project.color}, ${isHovered ? 0.5 : 0.3})`
                    : 'var(--glass-10)',
                  border: `1px solid rgba(${project.color}, ${phase.done ? 0.4 : 0.1})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: `all 0.3s ease ${i * 0.08}s`,
                  transform: isHovered && phase.done ? 'scaleY(1.1)' : 'scaleY(1)',
                }}>
                  {phase.done && (
                    <span style={{ fontSize: '8px', color: 'white' }}>✓</span>
                  )}
                </div>
                <span style={{
                  fontSize: '5px',
                  color: phase.done ? `rgb(${project.color})` : 'var(--text-30)',
                  fontWeight: phase.done ? '600' : '400',
                }}>{phase.name}</span>
              </div>
            ))}
          </div>
          {/* Timer bar */}
          <div style={{
            padding: '6px 8px',
            borderRadius: '6px',
            background: 'var(--glass-08)',
            border: '1px solid var(--glass-10)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
            }}>
              <span style={{ fontSize: '7px', color: 'var(--text-40)' }}>Progress</span>
              <span style={{ fontSize: '8px', fontWeight: '600', color: `rgb(${project.color})` }}>18:32</span>
            </div>
            <div style={{ height: '4px', borderRadius: '2px', background: 'var(--glass-10)', overflow: 'hidden' }}>
              <div style={{
                width: isHovered ? '75%' : '40%',
                height: '100%',
                borderRadius: '2px',
                background: `linear-gradient(90deg, rgb(${project.color}), rgba(${project.color}, 0.6))`,
                transition: 'width 0.6s ease',
              }} />
            </div>
          </div>
          {/* Award badge */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            fontSize: '7px',
            color: `rgb(${project.color})`,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}>
            🚀 Shipped
          </div>
        </div>
      );
    }

    // Fallback - should never reach here
    return (
      <div style={{
        width: '70px',
        height: '70px',
        borderRadius: '20px',
        background: `linear-gradient(135deg, rgb(${actColor}), rgba(${actColor}, 0.5))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 40px rgba(${actColor}, 0.5)`,
      }}>
        <project.icon size={34} style={{ color: 'white' }} />
      </div>
    );
  };

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
      {/* Progress Indicator - Fixed sidebar */}
      <ProgressIndicator />

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
          SECTION 4: KEY PROJECTS - THREE-ACT NARRATIVE STRUCTURE
      ========================================================================= */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Section Header with Narrative Intro */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' : 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '500',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
          }}>
            The Transformation
          </h2>
          <p style={{
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.7,
            fontStyle: 'italic',
          }}>
            {narrativeTransitions.intro}
          </p>
        </div>

        {/* Three-Act Project Rendering */}
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
            // Act I cards always expanded, others based on scroll trigger
            const isExpanded = index < 2 ? true : expandedCards.has(project.id);

            // Determine which act this project belongs to
            const isActI = index < 2;
            const isActII = index >= 2 && index < 6;
            const isActIII = index >= 6;
            const actColor = isActI ? actConfig[1].color : isActII ? actConfig[2].color : actConfig[3].color;

            return (
              <React.Fragment key={project.id}>
                {/* Act I Header - before first project */}
                {index === 0 && (
                  <div ref={act1Ref}>
                    <ActHeader
                      actNum={1}
                      title={actConfig[1].name}
                      quote={actConfig[1].quote}
                      color={actConfig[1].color}
                    />
                  </div>
                )}

                {/* Act II Header - before project index 2 */}
                {index === 2 && (
                  <>
                    <NarrativeConnector fromAct={1} toAct={2} text={narrativeTransitions.act1to2} />
                    <div ref={act2Ref}>
                      <ActHeader
                        actNum={2}
                        title={actConfig[2].name}
                        quote={actConfig[2].quote}
                        color={actConfig[2].color}
                      />
                    </div>
                  </>
                )}

                {/* Act III Header - before project index 6 */}
                {index === 6 && (
                  <>
                    <NarrativeConnector fromAct={2} toAct={3} text={narrativeTransitions.act2to3} />
                    <div ref={act3Ref}>
                      <ActHeader
                        actNum={3}
                        title={actConfig[3].name}
                        quote={actConfig[3].quote}
                        color={actConfig[3].color}
                      />
                    </div>
                  </>
                )}

                {/* Project Card */}
                <div
                  ref={(el) => {
                    if (el) cardRefs.current.set(project.id, el);
                  }}
                  onMouseEnter={() => handleCardMouseEnter(project.id)}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    width: '100%',
                    minHeight: isMobile ? '280px' : (isExpanded ? (isActI ? '580px' : '520px') : '200px'),
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    padding: isMobile ? '1.5rem' : (isExpanded ? '2.5rem 3rem' : '2rem 2.5rem'),
                    borderRadius: isExpanded ? '28px' : '24px',
                    background: `
                      radial-gradient(ellipse at 70% 30%, rgba(${actColor}, ${isExpanded ? 0.18 : 0.08}), transparent 50%),
                      radial-gradient(ellipse at 30% 70%, rgba(${actColor}, ${isExpanded ? 0.1 : 0.03}), transparent 50%),
                      var(--glass-04)
                    `,
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: `1px solid ${isExpanded ? `rgba(${actColor}, 0.4)` : 'var(--glass-08)'}`,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered && !isMobile ? 'translate3d(0, -4px, 0)' : 'translate3d(0, 0, 0)',
                    boxShadow: isExpanded
                      ? `0 40px 80px -20px rgba(${actColor}, 0.35), 0 20px 40px -15px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(${actColor}, 0.12)`
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
                    background: `radial-gradient(circle, rgba(${actColor}, ${isExpanded ? 0.2 : 0.08}), transparent 70%)`,
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
                      background: `linear-gradient(90deg, transparent, rgba(${actColor}, 0.4), transparent)`,
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
                      {/* Category Badge - with Act color */}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '100px',
                        background: `rgba(${actColor}, 0.12)`,
                        border: `1px solid rgba(${actColor}, 0.2)`,
                        fontSize: '0.625rem',
                        fontWeight: '600',
                        letterSpacing: '0.12em',
                        color: `rgb(${actColor})`,
                        textTransform: 'uppercase',
                        marginBottom: '0.75rem',
                      }}>
                        {project.category}
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: isActI ? 'clamp(1.5rem, 2.5vw, 1.875rem)' : 'clamp(1.25rem, 2vw, 1.5rem)',
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

                      {/* Stats Row */}
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
                                fontSize: isActI ? '1.5rem' : '1.25rem',
                                fontWeight: '700',
                                color: `rgb(${actColor})`,
                                lineHeight: 1,
                                textShadow: isExpanded ? `0 0 15px rgba(${actColor}, 0.4)` : 'none',
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
                                background: `linear-gradient(180deg, transparent, rgba(${actColor}, 0.25), transparent)`,
                              }} />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Right: Interactive Visualization */}
                    {!isMobile && (
                      <div style={{
                        width: '180px',
                        minHeight: '160px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'all 0.5s ease',
                        filter: isHovered ? `drop-shadow(0 0 20px rgba(${actColor}, 0.5))` : 'none',
                      }}>
                        {renderCardVisual(index, isHovered, project)}
                      </div>
                    )}
                  </div>

                  {/* EXPANDED CONTENT */}
                  {isExpanded && (
                    <div style={{
                      marginTop: '1.5rem',
                      padding: '1.5rem',
                      background: 'var(--glass-04)',
                      borderRadius: '16px',
                      border: `1px solid rgba(${actColor}, 0.15)`,
                    }}>
                      <p style={{
                        fontSize: '0.9375rem',
                        color: 'var(--text-60)',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',
                      }}>
                        {project.longDescription}
                      </p>

                      {/* Recruiter insight */}
                      <div style={{
                        marginTop: '1.25rem',
                        padding: '1rem',
                        background: `rgba(${actColor}, 0.06)`,
                        borderRadius: '12px',
                        border: `1px solid rgba(${actColor}, 0.12)`,
                      }}>
                        <div style={{
                          fontSize: '0.6875rem',
                          color: `rgb(${actColor})`,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '0.5rem',
                          fontWeight: '600',
                        }}>
                          Why This Matters
                        </div>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          fontStyle: 'italic',
                          lineHeight: 1.6,
                          margin: 0,
                        }}>
                          {project.recruiterInsight}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* OLD SECTION 4 CARD RENDERING CODE REMOVED - Replaced with three-act narrative structure above */}
      {/* Lines 1510-5200 of original code deleted - contained old projects.map() with 10 uniform cards */}

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
