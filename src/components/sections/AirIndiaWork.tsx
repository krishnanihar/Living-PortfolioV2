'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
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
    id: 2,
    label: '01',
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
    id: 1,
    label: '02',
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
// NARRATIVE CONFIGURATION
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
  // expandedCards removed - all sections are now full-screen (always "expanded")
  const [hoveredDiff, setHoveredDiff] = useState<number | null>(null);
  const [hoveredOtherProject, setHoveredOtherProject] = useState<number | null>(null);
  const [hoveredCTA, setHoveredCTA] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Hero image effects
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Scroll parallax for hero image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

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

  // Figma Variables Panel states
  const [figmaExpandedCollections, setFigmaExpandedCollections] = useState<Set<string>>(new Set(['Primitives']));
  const [figmaSelectedCollection, setFigmaSelectedCollection] = useState<string>('Primitives');
  const [figmaExpandedGroups, setFigmaExpandedGroups] = useState<Set<string>>(new Set(['Colors', 'Typography', 'Spacing']));
  const [figmaHoveredRow, setFigmaHoveredRow] = useState<string | null>(null);
  const [figmaHoveredSidebarItem, setFigmaHoveredSidebarItem] = useState<string | null>(null);
  // Enhanced interactivity states
  const [figmaSelectedRows, setFigmaSelectedRows] = useState<Set<string>>(new Set());
  const [figmaCascadePhase, setFigmaCascadePhase] = useState<'idle' | 'playing' | 'complete'>('idle');
  const [figmaCascadeStep, setFigmaCascadeStep] = useState<number>(0);
  const [figmaHighlightedGroup, setFigmaHighlightedGroup] = useState<string | null>(null);
  const [figmaPulsingRow, setFigmaPulsingRow] = useState<string | null>(null);

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

  // Handler for hover effects
  const handleCardMouseEnter = (id: number) => {
    setHoveredProject(id);
  };

  const handleCardMouseLeave = () => {
    setHoveredProject(null);
  };

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

  // Hero mouse parallax handler
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: x * 20, y: y * 15 }); // 20px max X, 15px max Y shift
  };

  const handleHeroMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHeroHovered(false);
  };

  // =============================================================================
  // NARRATIVE COMPONENTS
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
          SECTION 1: HERO - Split Composition with Premium Effects
      ========================================================================= */}
      <header
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={handleHeroMouseLeave}
        style={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Background Image Container */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: isMobile ? '100%' : '65%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden',
            y: heroImageY,
            scale: heroImageScale,
          }}
        >
          {/* Hero Image with Mouse Parallax */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-20px', // Extra space for parallax movement
              animation: inView ? 'heroImageReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both' : 'none',
            }}
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }}
          >
            <Image
              src="/images/air-india/hero.png"
              alt="Air India A350 aircraft flying through sunset clouds"
              fill
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                animation: isHeroHovered ? 'none' : 'kenBurns 20s ease-in-out infinite',
                filter: isHeroHovered ? 'brightness(1.08) saturate(1.1)' : 'brightness(1) saturate(1)',
                transition: 'filter 0.4s ease-out',
              }}
            />
          </motion.div>

          {/* Film Grain Overlay - Cinematic texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          {/* Diagonal Gradient Overlay - Protects text zone */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: isMobile
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,1) 100%)'
              : 'linear-gradient(105deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 15%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.3) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Bottom Fade for Content Transition */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </motion.div>

        {/* Content Container */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 'min(1400px, 92vw)',
          margin: '0 auto',
          padding: isMobile
            ? 'clamp(8rem, 15vh, 12rem) 1.5rem clamp(4rem, 8vh, 6rem)'
            : 'clamp(8rem, 15vh, 12rem) clamp(2rem, 8vw, 6rem) clamp(4rem, 8vh, 6rem)',
        }}>
          {/* Glassmorphic Content Card - Compact */}
          <div style={{
            maxWidth: isMobile ? '100%' : '520px',
            padding: isMobile ? '1.5rem' : '2rem 2.5rem',
            background: 'var(--glass-04)',
            backdropFilter: 'blur(32px) saturate(150%)',
            WebkitBackdropFilter: 'blur(32px) saturate(150%)',
            border: '1px solid var(--glass-08)',
            borderRadius: '24px',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)',
            animation: inView ? 'heroContentReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both' : 'none',
          }}>
            {/* Eyebrow */}
            <div style={{
              fontSize: '0.6875rem',
              fontWeight: '500',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              opacity: 0,
              animation: inView ? 'scrollRevealUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards' : 'none',
            }}>
              Case Study · Air India
            </div>

            {/* Anchor Stat Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'rgb(218, 14, 41)',
              marginBottom: '1rem',
              padding: '0.375rem 0.875rem',
              background: 'rgba(218, 14, 41, 0.1)',
              border: '1px solid rgba(218, 14, 41, 0.2)',
              borderRadius: '16px',
              opacity: 0,
              animation: inView ? 'scrollRevealUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards' : 'none',
            }}>
              $200M Transformation
            </div>

            {/* Main Statement */}
            <h1 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: '200',
              letterSpacing: '-0.03em',
              lineHeight: '1.15',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              opacity: 0,
              animation: inView ? 'scrollRevealUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.75s forwards' : 'none',
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
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              fontWeight: '300',
              marginBottom: '1.25rem',
              opacity: 0,
              animation: inView ? 'scrollRevealUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.9s forwards' : 'none',
            }}>
              Tata inherited 69 years of technical debt—140 systems, 4 merging airlines, zero design language. I joined to build what didn&apos;t exist.
            </p>

            {/* Metadata Row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1rem',
              opacity: 0,
              animation: inView ? 'scrollRevealUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 1.05s forwards' : 'none',
            }}>
              <div style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '10px',
                background: 'var(--glass-06)',
                border: '1px solid var(--glass-08)',
                fontSize: '0.75rem',
                fontWeight: '400',
                color: 'var(--text-secondary)',
              }}>
                Product Designer · 2022–24
              </div>
              <div style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '10px',
                background: 'var(--glass-06)',
                border: '1px solid var(--glass-08)',
                fontSize: '0.75rem',
                fontWeight: '400',
                color: 'var(--text-secondary)',
              }}>
                Kochi → Global
              </div>
            </div>

            {/* Proof Strip */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--glass-08)',
              opacity: 0,
              animation: inView ? 'scrollRevealUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 1.2s forwards' : 'none',
            }}>
              <div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)' }}>140</div>
                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Systems</div>
              </div>
              <div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)' }}>4</div>
                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Airlines</div>
              </div>
              <div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)' }}>450+</div>
                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 4vh, 3rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0,
          animation: inView ? 'scrollRevealUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 3s forwards' : 'none',
          zIndex: 10,
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}>
            See what I built
          </span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
            animation: 'scrollBounce 2s ease-in-out infinite',
          }} />
        </div>
      </header>

      {/* =========================================================================
          SECTION 2: THE CHALLENGE
      ========================================================================= */}
      <section style={{
        maxWidth: 'min(900px, 85vw)',
        margin: '0 auto',
        padding: 'clamp(6rem, 12vh, 10rem) 2rem clamp(8rem, 15vh, 12rem)',
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
            gap: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: 'clamp(3rem, 6vh, 5rem)',
          }}>
            {/* 140 Legacy Systems */}
            <div style={{
              padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
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
        maxWidth: 'min(1300px, 90vw)',
        margin: '0 auto',
        padding: 'clamp(5rem, 10vh, 8rem) 2rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vh, 5rem)',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' : 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '500',
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
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

        {/* Full-Screen Project Sections */}
        <div style={{
          width: '100%',
          position: 'relative',
        }}>
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredProject === project.id;
            const isExpanded = true; // All sections are now full-screen

            // Custom visual content per project type - ENHANCED 180x180px visuals
            const renderCardVisual = () => {
              // Design System (index 0) - Figma-like UI panels
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
                    {/* Figma-like Panel - Design Tokens */}
                    <div style={{
                      padding: '16px 20px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.2), var(--glass-10))',
                      border: '1px solid rgba(99,102,241,0.35)',
                      backdropFilter: 'blur(20px)',
                      transform: isHovered ? 'translateX(-8px) rotate(-2deg)' : 'translateX(0)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isHovered ? '0 15px 30px rgba(99,102,241,0.2)' : 'none',
                    }}>
                      <div style={{ fontSize: '0.688rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Design Tokens</div>
                      {/* Color swatches row - Figma style */}
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                        {['#DA0E29', '#6366F1', '#F59E0B', '#10B981', '#8B5CF6'].map((color, i) => (
                          <div key={i} style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            background: color,
                            border: '1px solid rgba(255,255,255,0.1)',
                            transform: isHovered ? `translateY(${i % 2 === 0 ? -2 : 2}px)` : 'translateY(0)',
                            transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
                          }} />
                        ))}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'rgb(99,102,241)' }}>48 tokens</div>
                    </div>
                    {/* Figma-like Panel - Components */}
                    <div style={{
                      padding: '16px 20px',
                      borderRadius: '14px',
                      background: 'var(--glass-08)',
                      border: '1px solid var(--glass-15)',
                      transform: isHovered ? 'translateX(8px) rotate(2deg)' : 'translateX(0)',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
                      boxShadow: isHovered ? '0 15px 30px rgba(0,0,0,0.2)' : 'none',
                    }}>
                      <div style={{ fontSize: '0.688rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Components</div>
                      {/* Layer stack - Figma style */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {['Button', 'Input', 'Card'].map((name, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            background: isHovered ? 'var(--glass-08)' : 'transparent',
                            transition: `all 0.3s ease ${i * 0.05}s`,
                          }}>
                            <Layers size={10} style={{ color: 'rgb(99,102,241)' }} />
                            <span style={{ fontSize: '0.688rem', color: 'var(--text-secondary)' }}>{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Pixel Radar (index 1) - Floating UI panels
              if (index === 1) {
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

              // Card 2: Search with AI - NLU Query Mini Pipeline
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

              // Card 3: MCP Handoff - Design-to-Code Mini Bridge
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

              // IFE (index 4) - Interactive Seatback Mini Screen
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

              // Card 5: NPS Feedback - Mini Gauge Dashboard
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

              // Card 6: Competitor Analysis - Mini Feature Matrix
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

              // Card 7: Liftoff Program - Learning Path Timeline
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

              // Card 8: Microsoft Hackathon - Azure AI Pipeline Mini
              if (index === 8) {
                const sentiments = [
                  { text: 'Great!', emoji: '😊', score: 0.92 },
                  { text: 'Okay', emoji: '😐', score: 0.45 },
                  { text: 'Love it', emoji: '😊', score: 0.89 },
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
                      {sentiments.slice(0, 2).map((item, i) => (
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
                      bottom: '-8px',
                      right: '0',
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

              // Card 9: Internal Hackathon - Sprint Timeline Mini
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
                      bottom: '-8px',
                      right: '0',
                      fontSize: '7px',
                      color: `rgb(${project.color})`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}>
                      🏆 Winner
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

            // Render Pixel Radar Demo - Full interactive Figma plugin UI
            const renderPixelRadarDemo = () => (
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
                  {/* LEFT PANEL: Figma Plugin UI */}
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
                      }}>
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
                              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: token.color }} />
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.66)', fontFamily: 'SF Mono, Monaco, Consolas, monospace' }}>{token.library}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: token.color }} />
                              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.66)', fontFamily: 'SF Mono, Monaco, Consolas, monospace' }}>{token.local}</span>
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
                        <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
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
                          setTimeout(() => setAnalysisPhase('analyze'), 500);
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
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                        }}
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

                  {/* RIGHT PANEL: Backend Architecture */}
                  {!isMobile && (
                    <div style={{
                      background: '#2C2C2C',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      overflow: 'hidden',
                    }}>
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
                      <div style={{ padding: '12px' }}>
                        {/* Module Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          {/* Token Scanner */}
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            padding: '10px',
                            border: `1px solid ${analysisPhase === 'scan' ? 'rgba(48, 209, 88, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
                            boxShadow: analysisPhase === 'scan' ? '0 0 8px rgba(48, 209, 88, 0.3)' : 'none',
                          }}>
                            <div style={{ fontSize: '10px', fontWeight: '600', color: '#30D158', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: analysisPhase === 'scan' ? '#30D158' : 'rgba(48, 209, 88, 0.3)', animation: analysisPhase === 'scan' ? 'statusPulse 0.8s ease infinite' : 'none' }} />
                              Token Scanner
                            </div>
                            <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.5 }}>• Variables<br />• Styles<br />• Libraries</div>
                          </div>
                          {/* Analysis Engine */}
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            padding: '10px',
                            border: `1px solid ${analysisPhase === 'analyze' ? 'rgba(13, 153, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
                            boxShadow: analysisPhase === 'analyze' ? '0 0 8px rgba(13, 153, 255, 0.3)' : 'none',
                          }}>
                            <div style={{ fontSize: '10px', fontWeight: '600', color: '#0D99FF', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: analysisPhase === 'analyze' ? '#0D99FF' : 'rgba(13, 153, 255, 0.3)', animation: analysisPhase === 'analyze' ? 'statusPulse 0.8s ease infinite' : 'none' }} />
                              Analysis Engine
                            </div>
                            <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.5 }}>• Duplicate Detection<br />• Consistency Check</div>
                          </div>
                          {/* Figma APIs */}
                          <div style={{
                            background: 'rgba(218, 14, 41, 0.08)',
                            borderRadius: '6px',
                            padding: '10px',
                            border: '1px solid rgba(218, 14, 41, 0.25)',
                          }}>
                            <div style={{ fontSize: '10px', fontWeight: '600', color: '#DA0E29', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(218, 14, 41, 0.6)' }} />
                              Figma APIs
                            </div>
                            <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.5 }}>• variables<br />• styles<br />• teamLibrary</div>
                          </div>
                          {/* Results */}
                          <div style={{
                            background: '#1E1E1E',
                            borderRadius: '6px',
                            padding: '10px',
                            border: `1px solid ${analysisPhase === 'complete' ? 'rgba(48, 209, 88, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
                            boxShadow: analysisPhase === 'complete' ? '0 0 8px rgba(48, 209, 88, 0.3)' : 'none',
                          }}>
                            <div style={{ fontSize: '10px', fontWeight: '600', color: '#30D158', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: analysisPhase === 'complete' ? '#30D158' : 'rgba(48, 209, 88, 0.3)', animation: analysisPhase === 'complete' ? 'statusPulse 0.8s ease infinite' : 'none' }} />
                              Results
                            </div>
                            <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.5 }}>
                              {analysisPhase === 'complete' ? <><span style={{ color: '#30D158' }}>✓</span> Match tokens<br /><span style={{ color: '#30D158' }}>✓</span> Fix duplicates</> : <>• Match tokens<br />• Fix duplicates</>}
                            </div>
                          </div>
                        </div>
                        {/* Status */}
                        <div style={{
                          marginTop: '12px',
                          padding: '8px 10px',
                          background: '#1E1E1E',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: analysisPhase === 'complete' ? '1px solid rgba(48, 209, 88, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
                        }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: analysisPhase === 'idle' ? 'rgba(255, 255, 255, 0.3)' : analysisPhase === 'complete' ? '#30D158' : '#0D99FF',
                            animation: analysisPhase !== 'idle' && analysisPhase !== 'complete' ? 'statusPulse 0.8s ease infinite' : 'none',
                          }} />
                          <span style={{
                            fontSize: '10px',
                            color: analysisPhase === 'idle' ? 'rgba(255, 255, 255, 0.4)' : analysisPhase === 'complete' ? '#30D158' : '#0D99FF',
                          }}>
                            {analysisPhase === 'idle' && 'Ready to analyze'}
                            {analysisPhase === 'scan' && 'Scanning tokens...'}
                            {analysisPhase === 'analyze' && 'Analyzing patterns...'}
                            {analysisPhase === 'complete' && 'Analysis complete'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            );

            // Render Design System Demo - Figma Variables Panel
            const renderDesignSystemDemo = () => (
              <div style={{
                width: '100%',
                maxWidth: '900px',
                margin: '0 auto',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#1E1E1E',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              }}>
                {/* Window Title Bar */}
                <div style={{
                  height: '36px',
                  background: '#2C2C2C',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  gap: '8px',
                }}>
                  {/* Traffic Lights */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
                  </div>
                  <span style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}>
                    Local Variables
                    {figmaCascadePhase === 'complete' && <span style={{ marginLeft: '8px', color: '#30D158' }}>✓</span>}
                  </span>
                  {/* Play Cascade Button */}
                  <button
                    onClick={() => {
                      if (figmaCascadePhase === 'playing') return;
                      setFigmaCascadePhase('playing');
                      // Cascade animation sequence
                      setTimeout(() => { setFigmaSelectedCollection('Primitives'); setFigmaExpandedCollections(new Set(['Primitives'])); }, 0);
                      setTimeout(() => setFigmaHighlightedGroup('Colors'), 400);
                      setTimeout(() => setFigmaPulsingRow('brand/primary'), 800);
                      setTimeout(() => { setFigmaSelectedCollection('Semantic'); setFigmaExpandedCollections(new Set(['Semantic'])); }, 1400);
                      setTimeout(() => setFigmaHighlightedGroup('Typography'), 1800);
                      setTimeout(() => setFigmaPulsingRow('heading/lg'), 2200);
                      setTimeout(() => { setFigmaSelectedCollection('Components'); setFigmaExpandedCollections(new Set(['Components'])); }, 2800);
                      setTimeout(() => setFigmaHighlightedGroup('Spacing'), 3200);
                      setTimeout(() => setFigmaPulsingRow('space-md'), 3600);
                      setTimeout(() => {
                        setFigmaCascadePhase('complete');
                        setFigmaHighlightedGroup(null);
                        setFigmaPulsingRow(null);
                      }, 4200);
                    }}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: figmaCascadePhase === 'playing' ? 'rgba(48, 209, 88, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                      border: `1px solid ${figmaCascadePhase === 'playing' ? 'rgba(48, 209, 88, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
                      color: figmaCascadePhase === 'playing' ? '#30D158' : '#6366F1',
                      fontSize: '10px',
                      fontWeight: '500',
                      cursor: figmaCascadePhase === 'playing' ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {figmaCascadePhase === 'playing' ? (
                      <>
                        <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                        Playing...
                      </>
                    ) : (
                      <>▶ Play Cascade</>
                    )}
                  </button>
                </div>

                {/* Main Content */}
                <div style={{ display: 'flex', minHeight: '280px' }}>
                  {/* Sidebar */}
                  {!isMobile && (
                    <div style={{
                      width: '180px',
                      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '8px',
                      background: '#252525',
                    }}>
                      {['Primitives', 'Semantic', 'Components'].map((collection) => (
                        <div
                          key={collection}
                          onClick={() => {
                            setFigmaSelectedCollection(collection);
                            setFigmaExpandedCollections(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(collection)) newSet.delete(collection);
                              else newSet.add(collection);
                              return newSet;
                            });
                          }}
                          onMouseEnter={() => setFigmaHoveredSidebarItem(collection)}
                          onMouseLeave={() => setFigmaHoveredSidebarItem(null)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '4px',
                            background: figmaSelectedCollection === collection ? 'rgba(99, 102, 241, 0.15)' : figmaHoveredSidebarItem === collection ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                            cursor: 'pointer',
                            marginBottom: '2px',
                          }}
                        >
                          <div style={{
                            fontSize: '11px',
                            fontWeight: figmaSelectedCollection === collection ? '600' : '400',
                            color: figmaSelectedCollection === collection ? '#6366F1' : 'rgba(255, 255, 255, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}>
                            <span style={{ fontSize: '8px' }}>{figmaExpandedCollections.has(collection) ? '▼' : '▶'}</span>
                            {collection}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Table */}
                  <div style={{ flex: 1, overflow: 'auto' }}>
                    {/* Header */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 80px 80px',
                      padding: '8px 12px',
                      background: '#252525',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      position: 'sticky',
                      top: 0,
                    }}>
                      <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)' }}>Name</span>
                      <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center' }}>Light</span>
                      <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center' }}>Dark</span>
                    </div>
                    {/* Token Groups */}
                    {[
                      { name: 'Colors', tokens: [
                        { name: 'brand/primary', light: '#DA0E29', dark: '#FF4D6A' },
                        { name: 'brand/accent', light: '#6366F1', dark: '#818CF8' },
                        { name: 'neutral/surface', light: '#FFFFFF', dark: '#1E1E1E' },
                      ]},
                      { name: 'Typography', tokens: [
                        { name: 'heading/lg', light: '32px', dark: '32px' },
                        { name: 'heading/md', light: '24px', dark: '24px' },
                        { name: 'body/md', light: '16px', dark: '16px' },
                      ]},
                      { name: 'Spacing', tokens: [
                        { name: 'space-xs', light: '4px', dark: '4px' },
                        { name: 'space-sm', light: '8px', dark: '8px' },
                        { name: 'space-md', light: '16px', dark: '16px' },
                      ]},
                    ].map((group) => (
                      <div key={group.name}>
                        <div
                          onClick={() => setFigmaExpandedGroups(prev => {
                            const newSet = new Set(prev);
                            if (newSet.has(group.name)) newSet.delete(group.name);
                            else newSet.add(group.name);
                            return newSet;
                          })}
                          style={{
                            padding: '6px 12px',
                            background: figmaHighlightedGroup === group.name ? 'rgba(99, 102, 241, 0.1)' : '#252525',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'background 0.3s ease',
                          }}
                        >
                          <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.4)' }}>{figmaExpandedGroups.has(group.name) ? '▼' : '▶'}</span>
                          <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)' }}>{group.name}</span>
                          <span style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.3)' }}>{group.tokens.length}</span>
                        </div>
                        {figmaExpandedGroups.has(group.name) && group.tokens.map((token) => (
                          <div
                            key={token.name}
                            onMouseEnter={() => setFigmaHoveredRow(token.name)}
                            onMouseLeave={() => setFigmaHoveredRow(null)}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 80px 80px',
                              padding: '6px 12px 6px 28px',
                              background: figmaPulsingRow === token.name ? 'rgba(99, 102, 241, 0.15)' : figmaHoveredRow === token.name ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease',
                              animation: figmaPulsingRow === token.name ? 'rowPulse 0.5s ease' : 'none',
                            }}
                          >
                            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'SF Mono, Monaco, Consolas, monospace' }}>{token.name}</span>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                              {token.light.startsWith('#') ? (
                                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: token.light, border: '1px solid rgba(255,255,255,0.1)' }} />
                              ) : (
                                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>{token.light}</span>
                              )}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                              {token.dark.startsWith('#') ? (
                                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: token.dark, border: '1px solid rgba(255,255,255,0.1)' }} />
                              ) : (
                                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>{token.dark}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );

            return (
              <React.Fragment key={project.id}>
                {/* Act Headers */}
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
                {index === 2 && (
                  <div ref={act2Ref}>
                    <ActHeader
                      actNum={2}
                      title={actConfig[2].name}
                      quote={actConfig[2].quote}
                      color={actConfig[2].color}
                    />
                  </div>
                )}
                {index === 6 && (
                  <div ref={act3Ref}>
                    <ActHeader
                      actNum={3}
                      title={actConfig[3].name}
                      quote={actConfig[3].quote}
                      color={actConfig[3].color}
                    />
                  </div>
                )}

                {/* Full-Screen Section */}
                <section
                  onMouseEnter={() => handleCardMouseEnter(project.id)}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: isMobile ? '4rem 1.5rem' : 'clamp(4rem, 8vh, 6rem) clamp(2rem, 4vw, 4rem)',
                  }}
                >
                  {/* Background Gradient */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse at ${index % 2 === 0 ? '70%' : '30%'} 50%, rgba(${project.color}, 0.06), transparent 60%)`,
                    pointerEvents: 'none',
                  }} />

                  {/* Animated Glow Orb */}
                  <div style={{
                    position: 'absolute',
                    top: '30%',
                    right: index % 2 === 0 ? '20%' : 'auto',
                    left: index % 2 === 0 ? 'auto' : '20%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(${project.color}, 0.12), transparent 70%)`,
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                  }} />

                  {/* Split-Screen Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '3rem' : 'clamp(3rem, 6vw, 6rem)',
                    maxWidth: '1400px',
                    width: '100%',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}>
                    {/* Content Column */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-15%' }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        order: isMobile ? 2 : (index % 2 === 0 ? 1 : 2),
                      }}
                    >
                      {/* Index Badge */}
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          letterSpacing: '0.15em',
                          color: `rgb(${project.color})`,
                          textTransform: 'uppercase',
                        }}
                      >
                        {String(index + 1).padStart(2, '0')} — {project.category}
                      </motion.span>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        style={{
                          fontSize: 'clamp(2rem, 4vw, 3rem)',
                          fontWeight: '600',
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.1,
                          margin: 0,
                        }}
                      >
                        {project.title}
                      </motion.h3>

                      {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                          fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {project.subtitle}
                      </motion.p>

                      {/* Stats Row */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'clamp(1rem, 2vw, 1.5rem)',
                          flexWrap: 'wrap',
                          marginTop: '0.5rem',
                        }}
                      >
                        {project.stats.map((stat, statIndex) => (
                          <React.Fragment key={statIndex}>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                            }}>
                              <span style={{
                                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                                fontWeight: '700',
                                color: `rgb(${project.color})`,
                                lineHeight: 1,
                              }}>
                                {stat.value}
                              </span>
                              <span style={{
                                fontSize: '0.75rem',
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
                                height: '32px',
                                background: `linear-gradient(180deg, transparent, rgba(${project.color}, 0.3), transparent)`,
                              }} />
                            )}
                          </React.Fragment>
                        ))}
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        style={{
                          fontSize: '0.938rem',
                          color: 'var(--text-60)',
                          lineHeight: 1.8,
                          margin: 0,
                          maxWidth: '540px',
                        }}
                      >
                        {project.longDescription?.split('\n\n')[0] || project.recruiterFrame}
                      </motion.p>
                    </motion.div>

                    {/* Visual Column - Always show simple scaled visual */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      viewport={{ once: true, margin: '-10%' }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        order: isMobile ? 1 : (index % 2 === 0 ? 2 : 1),
                        position: 'relative',
                      }}
                    >
                      <div style={{
                        transform: isMobile ? 'scale(0.7)' : 'scale(1.0)',
                        transformOrigin: 'center',
                        filter: isHovered ? `drop-shadow(0 0 60px rgba(${project.color}, 0.3))` : 'none',
                        transition: 'filter 0.5s ease',
                      }}>
                        {renderCardVisual()}
                      </div>
                    </motion.div>
                  </div>

                  {/* Full-width Figma Demo for Design System and Pixel Radar */}
                  {(index === 0 || index === 1) && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      style={{
                        width: '100%',
                        maxWidth: index === 0 ? '900px' : '1100px',
                        margin: '3rem auto 0',
                        padding: '0 1rem',
                      }}
                    >
                      {index === 0 ? renderDesignSystemDemo() : renderPixelRadarDemo()}
                    </motion.div>
                  )}
                </section>

                {/* LEGACY EXPANDED CONTENT - Keeping for detailed demos */}
                <div style={{
                  display: 'none', // Hidden for now - can be shown via interaction later
                  opacity: isExpanded ? 1 : 0,
                  maxHeight: isExpanded ? '800px' : '0',
                  transform: isExpanded ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                  overflow: 'hidden',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}>
                  {/* NOTE: The detailed interactive demos below are preserved but hidden.
                      They can be revealed via a "View Details" interaction in the future. */}
                </div>

                {/* Hidden legacy content - keeping structure intact */}
                <div style={{ display: 'none' }}>
                  {/* Original header section for reference */}
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
                </div>

                {/* =====================================================
                    LEGACY EXPANDED CONTENT - All interactive demos hidden
                    Keep for potential "View Details" feature
                    ===================================================== */}
                <div style={{ display: 'none' }}>
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

                {/* EXPANDED CONTENT - Hidden (legacy content) */}
                <div style={{
                  display: 'none', // Hide legacy expanded content
                  opacity: isExpanded ? 1 : 0,
                  maxHeight: isExpanded ? '800px' : '0',
                  transform: isExpanded ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                  overflow: 'hidden',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}>
                  {/* Animated Illustration or Placeholder */}
                  {index === 1 ? (
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
                  ) : index === 0 ? (
                    /* DESIGN SYSTEM & TOKENISATION - Pixel-Perfect Figma Variables Panel */
                    <>
                    {/* Figma Variables Panel Container */}
                    <div style={{
                      width: '100%',
                      maxWidth: '900px',
                      margin: '0 auto',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: '#1E1E1E',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    }}>
                      {/* Window Title Bar */}
                      <div style={{
                        height: '36px',
                        background: '#2C2C2C',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px',
                        gap: '8px',
                      }}>
                        {/* Traffic Lights */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
                          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }} />
                          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
                        </div>
                        {/* Title */}
                        <span style={{
                          flex: 1,
                          textAlign: 'center',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: 'rgba(255, 255, 255, 0.9)',
                        }}>
                          Local Variables
                          {figmaCascadePhase === 'complete' && (
                            <span style={{ marginLeft: '8px', color: '#30D158' }}>✓</span>
                          )}
                        </span>
                        {/* Play Cascade Button */}
                        <button
                          onClick={() => {
                            if (figmaCascadePhase !== 'idle') return;
                            setFigmaCascadePhase('playing');
                            setFigmaSelectedRows(new Set());

                            // Step 1: Select Primitives, expand it
                            setFigmaSelectedCollection('Primitives');
                            setFigmaExpandedCollections(new Set(['Primitives']));

                            // Step 2: Highlight Colors group
                            setTimeout(() => {
                              setFigmaExpandedGroups(new Set(['Colors', 'Typography', 'Spacing']));
                              setFigmaHighlightedGroup('Colors');
                            }, 400);

                            // Step 3: Pulse brand/primary row
                            setTimeout(() => {
                              setFigmaHighlightedGroup(null);
                              setFigmaPulsingRow('brand/primary');
                            }, 800);

                            // Step 4: Select Semantic
                            setTimeout(() => {
                              setFigmaPulsingRow(null);
                              setFigmaSelectedCollection('Semantic');
                              setFigmaExpandedCollections(prev => new Set([...prev, 'Semantic']));
                            }, 1400);

                            // Step 5: Highlight Typography
                            setTimeout(() => {
                              setFigmaHighlightedGroup('Typography');
                            }, 1800);

                            // Step 6: Pulse heading/lg
                            setTimeout(() => {
                              setFigmaHighlightedGroup(null);
                              setFigmaPulsingRow('heading/lg');
                            }, 2200);

                            // Step 7: Select Components
                            setTimeout(() => {
                              setFigmaPulsingRow(null);
                              setFigmaSelectedCollection('Components');
                              setFigmaExpandedCollections(prev => new Set([...prev, 'Components']));
                            }, 2800);

                            // Step 8: Highlight Spacing
                            setTimeout(() => {
                              setFigmaHighlightedGroup('Spacing');
                            }, 3200);

                            // Step 9: Pulse space-md
                            setTimeout(() => {
                              setFigmaHighlightedGroup(null);
                              setFigmaPulsingRow('space-md');
                            }, 3600);

                            // Step 10: Complete
                            setTimeout(() => {
                              setFigmaPulsingRow(null);
                              setFigmaCascadePhase('complete');
                            }, 4200);

                            // Reset to idle after showing complete
                            setTimeout(() => {
                              setFigmaCascadePhase('idle');
                            }, 6000);
                          }}
                          disabled={figmaCascadePhase !== 'idle'}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            background: figmaCascadePhase === 'playing'
                              ? 'rgba(48, 209, 88, 0.2)'
                              : figmaCascadePhase === 'complete'
                                ? 'rgba(48, 209, 88, 0.3)'
                                : 'rgba(13, 153, 255, 0.2)',
                            color: figmaCascadePhase === 'playing' || figmaCascadePhase === 'complete'
                              ? '#30D158'
                              : '#0D99FF',
                            fontSize: '11px',
                            fontWeight: '500',
                            cursor: figmaCascadePhase === 'idle' ? 'pointer' : 'default',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.2s ease',
                            opacity: figmaCascadePhase === 'idle' ? 1 : 0.8,
                          }}
                        >
                          {figmaCascadePhase === 'playing' ? (
                            <>
                              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                              Running...
                            </>
                          ) : figmaCascadePhase === 'complete' ? (
                            <>✓ Complete</>
                          ) : (
                            <>▶ Play Cascade</>
                          )}
                        </button>
                      </div>

                      {/* Main Content Area */}
                      <div style={{
                        display: 'flex',
                        minHeight: isMobile ? '400px' : '360px',
                      }}>
                        {/* Sidebar */}
                        {!isMobile && (
                          <div style={{
                            width: '180px',
                            background: '#252525',
                            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                          }}>
                            {/* Sidebar Header */}
                            <div style={{
                              padding: '8px 12px',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: 'rgba(255, 255, 255, 0.4)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            }}>
                              Collections
                            </div>
                            {/* Collections List */}
                            <div style={{ flex: 1, padding: '4px 0' }}>
                              {/* Primitives Collection */}
                              <div
                                onClick={() => {
                                  setFigmaExpandedCollections(prev => {
                                    const next = new Set(prev);
                                    if (next.has('Primitives')) next.delete('Primitives');
                                    else next.add('Primitives');
                                    return next;
                                  });
                                  setFigmaSelectedCollection('Primitives');
                                }}
                                onMouseEnter={() => setFigmaHoveredSidebarItem('Primitives')}
                                onMouseLeave={() => setFigmaHoveredSidebarItem(null)}
                                style={{
                                  padding: '6px 12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  background: figmaSelectedCollection === 'Primitives' ? 'rgba(24, 160, 251, 0.15)' : figmaHoveredSidebarItem === 'Primitives' ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                  borderLeft: figmaSelectedCollection === 'Primitives' ? '2px solid #0D99FF' : '2px solid transparent',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', width: '12px' }}>
                                  {figmaExpandedCollections.has('Primitives') ? '▾' : '▸'}
                                </span>
                                <span style={{ fontSize: '11px', color: figmaSelectedCollection === 'Primitives' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)', fontWeight: figmaSelectedCollection === 'Primitives' ? '500' : '400' }}>
                                  Primitives
                                </span>
                              </div>
                              {/* Nested items under Primitives */}
                              {figmaExpandedCollections.has('Primitives') && (
                                <div style={{ paddingLeft: '20px' }}>
                                  {['Colors', 'Typography', 'Spacing'].map((item) => (
                                    <div
                                      key={item}
                                      onClick={() => {
                                        // Expand the group in the table
                                        setFigmaExpandedGroups(prev => new Set([...prev, item]));
                                        // Pulse highlight the group
                                        setFigmaHighlightedGroup(item);
                                        setTimeout(() => setFigmaHighlightedGroup(null), 800);
                                      }}
                                      onMouseEnter={() => setFigmaHoveredSidebarItem(item)}
                                      onMouseLeave={() => setFigmaHoveredSidebarItem(null)}
                                      style={{
                                        padding: '4px 12px',
                                        fontSize: '11px',
                                        color: figmaHighlightedGroup === item ? '#0D99FF' : 'rgba(255, 255, 255, 0.6)',
                                        cursor: 'pointer',
                                        background: figmaHoveredSidebarItem === item ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                        transition: 'all 0.15s ease',
                                      }}
                                    >
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Semantic Collection */}
                              <div
                                onClick={() => {
                                  setFigmaExpandedCollections(prev => {
                                    const next = new Set(prev);
                                    if (next.has('Semantic')) next.delete('Semantic');
                                    else next.add('Semantic');
                                    return next;
                                  });
                                  setFigmaSelectedCollection('Semantic');
                                }}
                                onMouseEnter={() => setFigmaHoveredSidebarItem('Semantic')}
                                onMouseLeave={() => setFigmaHoveredSidebarItem(null)}
                                style={{
                                  padding: '6px 12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  background: figmaSelectedCollection === 'Semantic' ? 'rgba(24, 160, 251, 0.15)' : figmaHoveredSidebarItem === 'Semantic' ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                  borderLeft: figmaSelectedCollection === 'Semantic' ? '2px solid #0D99FF' : '2px solid transparent',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', width: '12px' }}>
                                  {figmaExpandedCollections.has('Semantic') ? '▾' : '▸'}
                                </span>
                                <span style={{ fontSize: '11px', color: figmaSelectedCollection === 'Semantic' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)', fontWeight: figmaSelectedCollection === 'Semantic' ? '500' : '400' }}>
                                  Semantic
                                </span>
                              </div>
                              {figmaExpandedCollections.has('Semantic') && (
                                <div style={{ paddingLeft: '20px' }}>
                                  {['Brand', 'Surface'].map((item) => (
                                    <div
                                      key={item}
                                      onMouseEnter={() => setFigmaHoveredSidebarItem(item)}
                                      onMouseLeave={() => setFigmaHoveredSidebarItem(null)}
                                      style={{
                                        padding: '4px 12px',
                                        fontSize: '11px',
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        cursor: 'pointer',
                                        background: figmaHoveredSidebarItem === item ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                        transition: 'background 0.15s ease',
                                      }}
                                    >
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Components Collection */}
                              <div
                                onClick={() => {
                                  setFigmaExpandedCollections(prev => {
                                    const next = new Set(prev);
                                    if (next.has('Components')) next.delete('Components');
                                    else next.add('Components');
                                    return next;
                                  });
                                  setFigmaSelectedCollection('Components');
                                }}
                                onMouseEnter={() => setFigmaHoveredSidebarItem('Components')}
                                onMouseLeave={() => setFigmaHoveredSidebarItem(null)}
                                style={{
                                  padding: '6px 12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  background: figmaSelectedCollection === 'Components' ? 'rgba(24, 160, 251, 0.15)' : figmaHoveredSidebarItem === 'Components' ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                  borderLeft: figmaSelectedCollection === 'Components' ? '2px solid #0D99FF' : '2px solid transparent',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', width: '12px' }}>
                                  {figmaExpandedCollections.has('Components') ? '▾' : '▸'}
                                </span>
                                <span style={{ fontSize: '11px', color: figmaSelectedCollection === 'Components' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)', fontWeight: figmaSelectedCollection === 'Components' ? '500' : '400' }}>
                                  Components
                                </span>
                              </div>
                              {figmaExpandedCollections.has('Components') && (
                                <div style={{ paddingLeft: '20px' }}>
                                  {['Button', 'Card'].map((item) => (
                                    <div
                                      key={item}
                                      onMouseEnter={() => setFigmaHoveredSidebarItem(item)}
                                      onMouseLeave={() => setFigmaHoveredSidebarItem(null)}
                                      style={{
                                        padding: '4px 12px',
                                        fontSize: '11px',
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        cursor: 'pointer',
                                        background: figmaHoveredSidebarItem === item ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                        transition: 'background 0.15s ease',
                                      }}
                                    >
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            {/* Sidebar Footer */}
                            <div style={{
                              padding: '8px 12px',
                              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                              fontSize: '11px',
                              color: 'rgba(255, 255, 255, 0.4)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}>
                              <span style={{ fontSize: '14px' }}>+</span> New collection
                            </div>
                          </div>
                        )}

                        {/* Table Area */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#2C2C2C' }}>
                          {/* Table Header */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 100px 100px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            background: '#2C2C2C',
                            position: 'sticky',
                            top: 0,
                          }}>
                            <div style={{ padding: '8px 16px', fontSize: '11px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.4)' }}>Name</div>
                            <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.4)', textAlign: 'center' }}>Light</div>
                            <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.4)', textAlign: 'center' }}>Dark</div>
                          </div>

                          {/* Table Body */}
                          <div style={{ flex: 1, overflow: 'auto' }}>
                            {/* Colors Group */}
                            <div
                              onClick={() => {
                                setFigmaExpandedGroups(prev => {
                                  const next = new Set(prev);
                                  if (next.has('Colors')) next.delete('Colors');
                                  else next.add('Colors');
                                  return next;
                                });
                              }}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 100px 100px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                cursor: 'pointer',
                                background: figmaHighlightedGroup === 'Colors'
                                  ? 'rgba(13, 153, 255, 0.15)'
                                  : 'rgba(255, 255, 255, 0.02)',
                                borderLeft: figmaHighlightedGroup === 'Colors'
                                  ? '3px solid #0D99FF'
                                  : '3px solid transparent',
                                boxShadow: figmaHighlightedGroup === 'Colors'
                                  ? '0 0 12px rgba(13, 153, 255, 0.2)'
                                  : 'none',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <div style={{ padding: '8px 16px', fontSize: '11px', fontWeight: '500', color: figmaHighlightedGroup === 'Colors' ? '#0D99FF' : 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s ease' }}>
                                <span style={{ fontSize: '10px', color: figmaHighlightedGroup === 'Colors' ? '#0D99FF' : 'rgba(255, 255, 255, 0.5)' }}>{figmaExpandedGroups.has('Colors') ? '▾' : '▸'}</span>
                                Colors
                              </div>
                              <div style={{ padding: '8px 12px' }} />
                              <div style={{ padding: '8px 12px' }} />
                            </div>
                            {figmaExpandedGroups.has('Colors') && (
                              <>
                                {[
                                  { name: 'brand/primary', light: '#DA0E29', dark: '#DA0E29' },
                                  { name: 'brand/accent', light: '#0D99FF', dark: '#0D99FF' },
                                  { name: 'neutral/surface', light: '#FFFFFF', dark: '#1E1E1E' },
                                  { name: 'neutral/border', light: '#E5E5E5', dark: '#383838' },
                                ].map((token) => (
                                  <div
                                    key={token.name}
                                    onClick={() => {
                                      setFigmaSelectedRows(prev => {
                                        const next = new Set(prev);
                                        if (next.has(token.name)) next.delete(token.name);
                                        else next.add(token.name);
                                        return next;
                                      });
                                    }}
                                    onMouseEnter={() => setFigmaHoveredRow(token.name)}
                                    onMouseLeave={() => setFigmaHoveredRow(null)}
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: '1fr 100px 100px',
                                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                                      background: figmaSelectedRows.has(token.name)
                                        ? 'rgba(24, 160, 251, 0.12)'
                                        : figmaHoveredRow === token.name
                                          ? 'rgba(255, 255, 255, 0.04)'
                                          : 'transparent',
                                      borderLeft: figmaSelectedRows.has(token.name)
                                        ? '2px solid #0D99FF'
                                        : figmaPulsingRow === token.name
                                          ? '3px solid #30D158'
                                          : '2px solid transparent',
                                      boxShadow: figmaPulsingRow === token.name
                                        ? '0 0 12px rgba(48, 209, 88, 0.3)'
                                        : 'none',
                                      transition: 'all 0.15s ease',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <div style={{ padding: '6px 16px 6px 30px', fontSize: '11px', color: figmaSelectedRows.has(token.name) ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)' }}>{token.name}</div>
                                    <div style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                      <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: token.light, border: token.light === '#FFFFFF' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none' }} />
                                      <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'SF Mono, Monaco, monospace' }}>{token.light}</span>
                                    </div>
                                    <div style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                      <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: token.dark, border: token.dark === '#1E1E1E' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none' }} />
                                      <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'SF Mono, Monaco, monospace' }}>{token.dark}</span>
                                    </div>
                                  </div>
                                ))}
                              </>
                            )}

                            {/* Typography Group */}
                            <div
                              onClick={() => {
                                setFigmaExpandedGroups(prev => {
                                  const next = new Set(prev);
                                  if (next.has('Typography')) next.delete('Typography');
                                  else next.add('Typography');
                                  return next;
                                });
                              }}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 100px 100px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                cursor: 'pointer',
                                background: figmaHighlightedGroup === 'Typography'
                                  ? 'rgba(13, 153, 255, 0.15)'
                                  : 'rgba(255, 255, 255, 0.02)',
                                borderLeft: figmaHighlightedGroup === 'Typography'
                                  ? '3px solid #0D99FF'
                                  : '3px solid transparent',
                                boxShadow: figmaHighlightedGroup === 'Typography'
                                  ? '0 0 12px rgba(13, 153, 255, 0.2)'
                                  : 'none',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <div style={{ padding: '8px 16px', fontSize: '11px', fontWeight: '500', color: figmaHighlightedGroup === 'Typography' ? '#0D99FF' : 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s ease' }}>
                                <span style={{ fontSize: '10px', color: figmaHighlightedGroup === 'Typography' ? '#0D99FF' : 'rgba(255, 255, 255, 0.5)' }}>{figmaExpandedGroups.has('Typography') ? '▾' : '▸'}</span>
                                Typography
                              </div>
                              <div style={{ padding: '8px 12px' }} />
                              <div style={{ padding: '8px 12px' }} />
                            </div>
                            {figmaExpandedGroups.has('Typography') && (
                              <>
                                {[
                                  { name: 'heading/lg', light: '32', dark: '32' },
                                  { name: 'heading/md', light: '24', dark: '24' },
                                  { name: 'body/md', light: '14', dark: '14' },
                                ].map((token) => (
                                  <div
                                    key={token.name}
                                    onClick={() => {
                                      setFigmaSelectedRows(prev => {
                                        const next = new Set(prev);
                                        if (next.has(token.name)) next.delete(token.name);
                                        else next.add(token.name);
                                        return next;
                                      });
                                    }}
                                    onMouseEnter={() => setFigmaHoveredRow(token.name)}
                                    onMouseLeave={() => setFigmaHoveredRow(null)}
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: '1fr 100px 100px',
                                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                                      background: figmaSelectedRows.has(token.name)
                                        ? 'rgba(24, 160, 251, 0.12)'
                                        : figmaHoveredRow === token.name
                                          ? 'rgba(255, 255, 255, 0.04)'
                                          : 'transparent',
                                      borderLeft: figmaSelectedRows.has(token.name)
                                        ? '2px solid #0D99FF'
                                        : figmaPulsingRow === token.name
                                          ? '3px solid #30D158'
                                          : '2px solid transparent',
                                      boxShadow: figmaPulsingRow === token.name
                                        ? '0 0 12px rgba(48, 209, 88, 0.3)'
                                        : 'none',
                                      transition: 'all 0.15s ease',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <div style={{ padding: '6px 16px 6px 30px', fontSize: '11px', color: figmaSelectedRows.has(token.name) ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)' }}>{token.name}</div>
                                    <div style={{ padding: '6px 12px', textAlign: 'center', fontSize: '11px', color: figmaSelectedRows.has(token.name) ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)' }}>{token.light}</div>
                                    <div style={{ padding: '6px 12px', textAlign: 'center', fontSize: '11px', color: figmaSelectedRows.has(token.name) ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)' }}>{token.dark}</div>
                                  </div>
                                ))}
                              </>
                            )}

                            {/* Spacing Group */}
                            <div
                              onClick={() => {
                                setFigmaExpandedGroups(prev => {
                                  const next = new Set(prev);
                                  if (next.has('Spacing')) next.delete('Spacing');
                                  else next.add('Spacing');
                                  return next;
                                });
                              }}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 100px 100px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                cursor: 'pointer',
                                background: figmaHighlightedGroup === 'Spacing'
                                  ? 'rgba(13, 153, 255, 0.15)'
                                  : 'rgba(255, 255, 255, 0.02)',
                                borderLeft: figmaHighlightedGroup === 'Spacing'
                                  ? '3px solid #0D99FF'
                                  : '3px solid transparent',
                                boxShadow: figmaHighlightedGroup === 'Spacing'
                                  ? '0 0 12px rgba(13, 153, 255, 0.2)'
                                  : 'none',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <div style={{ padding: '8px 16px', fontSize: '11px', fontWeight: '500', color: figmaHighlightedGroup === 'Spacing' ? '#0D99FF' : 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s ease' }}>
                                <span style={{ fontSize: '10px', color: figmaHighlightedGroup === 'Spacing' ? '#0D99FF' : 'rgba(255, 255, 255, 0.5)' }}>{figmaExpandedGroups.has('Spacing') ? '▾' : '▸'}</span>
                                Spacing
                              </div>
                              <div style={{ padding: '8px 12px' }} />
                              <div style={{ padding: '8px 12px' }} />
                            </div>
                            {figmaExpandedGroups.has('Spacing') && (
                              <>
                                {[
                                  { name: 'space-xs', light: '4', dark: '4' },
                                  { name: 'space-sm', light: '8', dark: '8' },
                                  { name: 'space-md', light: '16', dark: '16' },
                                  { name: 'space-lg', light: '24', dark: '24' },
                                ].map((token) => (
                                  <div
                                    key={token.name}
                                    onClick={() => {
                                      setFigmaSelectedRows(prev => {
                                        const next = new Set(prev);
                                        if (next.has(token.name)) next.delete(token.name);
                                        else next.add(token.name);
                                        return next;
                                      });
                                    }}
                                    onMouseEnter={() => setFigmaHoveredRow(token.name)}
                                    onMouseLeave={() => setFigmaHoveredRow(null)}
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: '1fr 100px 100px',
                                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                                      background: figmaSelectedRows.has(token.name)
                                        ? 'rgba(24, 160, 251, 0.12)'
                                        : figmaHoveredRow === token.name
                                          ? 'rgba(255, 255, 255, 0.04)'
                                          : 'transparent',
                                      borderLeft: figmaSelectedRows.has(token.name)
                                        ? '2px solid #0D99FF'
                                        : figmaPulsingRow === token.name
                                          ? '3px solid #30D158'
                                          : '2px solid transparent',
                                      boxShadow: figmaPulsingRow === token.name
                                        ? '0 0 12px rgba(48, 209, 88, 0.3)'
                                        : 'none',
                                      transition: 'all 0.15s ease',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <div style={{ padding: '6px 16px 6px 30px', fontSize: '11px', color: figmaSelectedRows.has(token.name) ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)' }}>{token.name}</div>
                                    <div style={{ padding: '6px 12px', textAlign: 'center', fontSize: '11px', color: figmaSelectedRows.has(token.name) ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)' }}>{token.light}px</div>
                                    <div style={{ padding: '6px 12px', textAlign: 'center', fontSize: '11px', color: figmaSelectedRows.has(token.name) ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)' }}>{token.dark}px</div>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>

                          {/* Table Footer */}
                          <div style={{
                            padding: '8px 16px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}>
                            <span style={{
                              fontSize: '11px',
                              color: 'rgba(255, 255, 255, 0.4)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}>
                              <span style={{ fontSize: '14px' }}>+</span> Create variable
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </>
                  ) : index === 2 ? (
                    /* Card 2: Search with AI - NLU Query Pipeline Visualization */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '1000px',
                      margin: '0 auto',
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'var(--glass-06)',
                      border: `1px solid rgba(${project.color}, 0.2)`,
                    }}>
                      {/* Query Input */}
                      <div style={{
                        padding: '16px 24px',
                        borderRadius: '28px',
                        background: 'var(--glass-08)',
                        border: `1px solid rgba(${project.color}, 0.25)`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                      }}>
                        <Search size={20} style={{ color: `rgb(${project.color})` }} />
                        <span style={{
                          flex: 1,
                          fontSize: '14px',
                          color: 'var(--text-80)',
                          fontFamily: 'inherit',
                        }}>
                          {queryPhase === 'idle' ? '"Show me flights to Delhi under ₹5000 next weekend"' :
                           queryPhase === 'typing' ? displayedQuery + '|' :
                           '"Show me flights to Delhi under ₹5000 next weekend"'}
                        </span>
                        <div style={{
                          padding: '6px 12px',
                          borderRadius: '14px',
                          background: `rgba(${project.color}, 0.15)`,
                          fontSize: '11px',
                          fontWeight: '600',
                          color: `rgb(${project.color})`,
                        }}>
                          Red Dot Award Winner
                        </div>
                      </div>

                      {/* NLU Pipeline Stages */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '12px',
                        marginBottom: '20px',
                      }}>
                        {[
                          {
                            title: 'TOKENIZE',
                            items: ['"Show"', '"me"', '"flights"', '"to"', '"Delhi"'],
                            color: '#6B7280',
                            phase: 'tokenize'
                          },
                          {
                            title: 'ENTITIES',
                            items: ['📍 Delhi', '💰 ₹5000', '📅 weekend'],
                            color: '#0D99FF',
                            phase: 'entities'
                          },
                          {
                            title: 'INTENT',
                            items: ['SEARCH_FLIGHTS', '94.7% confidence'],
                            color: '#A259FF',
                            phase: 'intent'
                          },
                          {
                            title: 'CONTEXT',
                            items: ['Weekend travel', 'Budget: Low', 'Domestic'],
                            color: '#30D158',
                            phase: 'intent'
                          },
                          {
                            title: 'RESULTS',
                            items: ['✈ DEL ₹4,299', '✈ DEL ₹4,850', '✈ DEL ₹4,990'],
                            color: project.color,
                            phase: 'results'
                          },
                        ].map((stage, stageIdx) => (
                          <div key={stage.title} style={{
                            padding: '16px',
                            borderRadius: '12px',
                            background: 'var(--glass-04)',
                            border: `1px solid ${
                              queryPhase === stage.phase || queryPhase === 'results'
                                ? `rgba(${stage.color === project.color ? project.color : stage.color.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(', ')}, 0.4)`
                                : 'var(--glass-10)'
                            }`,
                            transition: 'all 0.4s ease',
                            transform: queryPhase === stage.phase ? 'translateY(-4px)' : 'translateY(0)',
                            boxShadow: queryPhase === stage.phase ? `0 8px 24px rgba(${stage.color === project.color ? project.color : '0,0,0'}, 0.2)` : 'none',
                          }}>
                            <div style={{
                              fontSize: '10px',
                              fontWeight: '700',
                              color: stage.color === project.color ? `rgb(${project.color})` : stage.color,
                              marginBottom: '12px',
                              letterSpacing: '0.1em',
                            }}>
                              {stage.title}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              {stage.items.map((item, itemIdx) => (
                                <div key={itemIdx} style={{
                                  fontSize: '11px',
                                  color: 'var(--text-70)',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  background: 'var(--glass-06)',
                                  opacity: queryPhase === 'idle' || ['tokenize', 'entities', 'intent', 'results'].indexOf(queryPhase) >= ['tokenize', 'entities', 'intent', 'results'].indexOf(stage.phase) ? 1 : 0.3,
                                  transition: `all 0.3s ease ${itemIdx * 0.1}s`,
                                }}>
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Button & Status */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                        <button
                          onClick={() => {
                            if (queryPhase !== 'idle') return;
                            const fullQuery = '"Show me flights to Delhi under ₹5000 next weekend"';
                            setQueryPhase('typing');
                            setDisplayedQuery('');

                            // Typing animation
                            let charIndex = 0;
                            const typeInterval = setInterval(() => {
                              if (charIndex < fullQuery.length) {
                                setDisplayedQuery(fullQuery.slice(0, charIndex + 1));
                                charIndex++;
                              } else {
                                clearInterval(typeInterval);
                                // Progress through phases
                                setTimeout(() => setQueryPhase('tokenize'), 300);
                                setTimeout(() => setQueryPhase('entities'), 800);
                                setTimeout(() => setQueryPhase('intent'), 1300);
                                setTimeout(() => setQueryPhase('results'), 1800);
                                setTimeout(() => setQueryPhase('idle'), 3500);
                              }
                            }, 30);
                          }}
                          style={{
                            padding: '10px 20px',
                            borderRadius: '10px',
                            background: queryPhase === 'idle' ? `rgb(${project.color})` : 'var(--glass-15)',
                            border: 'none',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: queryPhase === 'idle' ? 'white' : 'var(--text-60)',
                            cursor: queryPhase === 'idle' ? 'pointer' : 'default',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: queryPhase === 'idle' ? 'white' : `rgb(${project.color})`,
                            animation: queryPhase !== 'idle' ? 'statusPulse 1s ease infinite' : 'none',
                          }} />
                          {queryPhase === 'idle' ? 'Run Query Pipeline' : 'Processing...'}
                        </button>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          fontSize: '11px',
                          color: 'var(--text-40)',
                        }}>
                          <span>Natural Language Understanding</span>
                          <span>•</span>
                          <span>Real-time Processing</span>
                          <span>•</span>
                          <span>Context-aware Results</span>
                        </div>
                      </div>
                    </div>
                    </>
                  ) : index === 3 ? (
                    /* Card 3: MCP Handoff - Design-to-Code Bridge Visualization */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '1000px',
                      margin: '0 auto',
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'var(--glass-06)',
                      border: `1px solid rgba(${project.color}, 0.2)`,
                    }}>
                      {/* Pipeline Stages */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '16px',
                        marginBottom: '24px',
                        position: 'relative',
                      }}>
                        {/* Connection Lines SVG */}
                        <svg style={{
                          position: 'absolute',
                          top: '50px',
                          left: '12.5%',
                          width: '75%',
                          height: '4px',
                          zIndex: 0,
                        }}>
                          <line x1="0" y1="2" x2="100%" y2="2"
                            stroke={`rgba(${project.color}, 0.3)`}
                            strokeWidth="2"
                            strokeDasharray="8 4"
                            style={{
                              animation: mcpPhase !== 'idle' ? 'flowLine 1.5s linear infinite' : 'none',
                            }}
                          />
                        </svg>

                        {[
                          {
                            icon: '◇',
                            title: 'FIGMA DESIGN',
                            items: ['Frame', 'Button', 'Card', 'Input'],
                            phase: 'design',
                            color: '#A259FF'
                          },
                          {
                            icon: '⚡',
                            title: 'MCP SERVER',
                            items: ['get_code()', 'get_variables()', 'get_metadata()'],
                            phase: 'server',
                            color: '#0D99FF'
                          },
                          {
                            icon: '◉',
                            title: 'AI AGENT',
                            items: ['Claude', 'Cursor', 'Copilot'],
                            phase: 'agent',
                            color: '#30D158'
                          },
                          {
                            icon: '<>',
                            title: 'CODE OUTPUT',
                            items: ['<Button />', 'variant="primary"', 'tokens applied'],
                            phase: 'output',
                            color: '#FF9F0A'
                          },
                        ].map((stage, idx) => (
                          <div key={stage.title} style={{
                            padding: '20px',
                            borderRadius: '12px',
                            background: 'var(--glass-04)',
                            border: `1px solid ${mcpPhase === stage.phase ? stage.color : 'var(--glass-10)'}`,
                            transition: 'all 0.4s ease',
                            position: 'relative',
                            zIndex: 1,
                            transform: mcpPhase === stage.phase ? 'scale(1.02)' : 'scale(1)',
                            boxShadow: mcpPhase === stage.phase ? `0 0 30px ${stage.color}30` : 'none',
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              background: `${stage.color}20`,
                              border: `1px solid ${stage.color}40`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '18px',
                              marginBottom: '12px',
                            }}>
                              {stage.icon}
                            </div>
                            <div style={{
                              fontSize: '10px',
                              fontWeight: '700',
                              color: stage.color,
                              marginBottom: '10px',
                              letterSpacing: '0.1em',
                            }}>
                              {stage.title}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {stage.items.map((item, itemIdx) => (
                                <div key={itemIdx} style={{
                                  fontSize: '11px',
                                  color: 'var(--text-60)',
                                  fontFamily: stage.title.includes('CODE') || stage.title.includes('SERVER') ? 'monospace' : 'inherit',
                                }}>
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Live Context Stream */}
                      <div style={{
                        padding: '16px',
                        borderRadius: '10px',
                        background: '#0D0D0D',
                        border: '1px solid var(--glass-15)',
                        marginBottom: '16px',
                      }}>
                        <div style={{
                          fontSize: '9px',
                          fontWeight: '600',
                          color: '#30D158',
                          marginBottom: '8px',
                          letterSpacing: '0.15em',
                        }}>
                          LIVE CONTEXT STREAM
                        </div>
                        <div style={{
                          fontFamily: 'SF Mono, Monaco, monospace',
                          fontSize: '11px',
                          color: '#30D158',
                          opacity: mcpPhase !== 'idle' ? 1 : 0.5,
                          transition: 'opacity 0.3s ease',
                        }}>
                          {`{ "component": "Button", "variant": "primary", "tokens": ["color.brand", "radius.md"] }`}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <button
                          onClick={() => {
                            if (mcpPhase !== 'idle') return;
                            setMcpPhase('design');
                            setTimeout(() => setMcpPhase('server'), 600);
                            setTimeout(() => setMcpPhase('agent'), 1200);
                            setTimeout(() => setMcpPhase('output'), 1800);
                            setTimeout(() => setMcpPhase('idle'), 3000);
                          }}
                          style={{
                            padding: '10px 20px',
                            borderRadius: '10px',
                            background: mcpPhase === 'idle' ? `rgb(${project.color})` : 'var(--glass-15)',
                            border: 'none',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: mcpPhase === 'idle' ? 'white' : 'var(--text-60)',
                            cursor: mcpPhase === 'idle' ? 'pointer' : 'default',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: mcpPhase === 'idle' ? 'white' : `rgb(${project.color})`,
                            animation: mcpPhase !== 'idle' ? 'statusPulse 1s ease infinite' : 'none',
                          }} />
                          {mcpPhase === 'idle' ? 'Trigger Handoff' : 'Streaming Context...'}
                        </button>

                        <div style={{ fontSize: '11px', color: 'var(--text-40)' }}>
                          Model Context Protocol • Anthropic Integration
                        </div>
                      </div>
                    </div>
                    </>
                  ) : index === 4 ? (
                    /* Card 4: IFE System Design - Seatback Experience Visualization */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '900px',
                      margin: '0 auto',
                    }}>
                      {/* Screen Mockup */}
                      <div style={{
                        padding: '20px',
                        borderRadius: '20px',
                        background: '#1A1A1A',
                        border: '4px solid #2C2C2C',
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
                        marginBottom: '16px',
                      }}>
                        <div style={{
                          borderRadius: '12px',
                          overflow: 'hidden',
                          background: 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)',
                        }}>
                          {/* Navigation Tabs */}
                          <div style={{
                            display: 'flex',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '10px',
                            gap: '6px',
                          }}>
                            {['Movies', 'TV Shows', 'Music', 'Games', 'Flight Info'].map(tab => (
                              <button
                                key={tab}
                                onClick={() => setActiveIFETab(tab.toLowerCase().replace(' ', ''))}
                                style={{
                                  background: activeIFETab === tab.toLowerCase().replace(' ', '') ? `rgb(${project.color})` : 'transparent',
                                  color: 'white',
                                  border: 'none',
                                  padding: '8px 16px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                }}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>

                          {/* Content Grid */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '12px',
                            padding: '20px',
                          }}>
                            {['Featured', 'Action', 'Drama', 'Comedy'].map((genre, i) => (
                              <div key={genre} style={{
                                aspectRatio: '2/3',
                                borderRadius: '8px',
                                background: `linear-gradient(135deg, rgba(${project.color}, ${0.3 - i * 0.05}), rgba(${project.color}, 0.1))`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                              }}>
                                <span style={{ fontSize: '24px' }}>🎬</span>
                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>{genre}</span>
                              </div>
                            ))}
                          </div>

                          {/* Now Playing Bar */}
                          <div style={{
                            background: 'rgba(0,0,0,0.8)',
                            padding: '14px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                          }}>
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: `rgb(${project.color})`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid white', marginLeft: '3px' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '13px', fontWeight: '600', color: 'white', marginBottom: '6px' }}>Now Playing: Pathaan</div>
                              <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                                <div style={{ width: '45%', height: '100%', background: `rgb(${project.color})`, borderRadius: '2px' }} />
                              </div>
                            </div>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>1:23:45</span>
                          </div>
                        </div>
                      </div>

                      {/* Seat Info */}
                      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '12px', color: 'var(--text-40)' }}>
                        SEAT 12A · Economy Class
                      </div>

                      {/* Design Constraint Badges */}
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {[
                          { icon: '🎯', value: '44px', label: 'Touch Target' },
                          { icon: '🔆', value: 'Auto', label: 'Brightness' },
                          { icon: '♿', value: 'WCAG AA', label: 'Accessible' },
                          { icon: '🌍', value: '12', label: 'Languages' },
                        ].map((badge) => (
                          <div key={badge.label} style={{
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: 'var(--glass-06)',
                            border: '1px solid var(--glass-15)',
                            textAlign: 'center',
                            minWidth: '90px',
                          }}>
                            <div style={{ fontSize: '18px', marginBottom: '4px' }}>{badge.icon}</div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: `rgb(${project.color})` }}>{badge.value}</div>
                            <div style={{ fontSize: '9px', color: 'var(--text-40)' }}>{badge.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    </>
                  ) : index === 5 ? (
                    /* Card 5: NPS Feedback System - Sentiment Dashboard Visualization */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '1000px',
                      margin: '0 auto',
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'var(--glass-06)',
                      border: `1px solid rgba(${project.color}, 0.2)`,
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '200px 1fr 1fr',
                        gap: '24px',
                        marginBottom: '24px',
                      }}>
                        {/* Score Card */}
                        <div style={{
                          padding: '24px',
                          borderRadius: '16px',
                          background: 'var(--glass-08)',
                          border: '1px solid var(--glass-15)',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: '11px', color: 'var(--text-40)', marginBottom: '8px', letterSpacing: '0.1em' }}>NPS SCORE</div>
                          <div style={{
                            fontSize: '48px',
                            fontWeight: '700',
                            color: '#30D158',
                            lineHeight: 1,
                          }}>
                            +{npsPhase === 'complete' || npsPhase === 'idle' ? 67 : npsScore}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-50)', marginTop: '8px' }}>Excellent</div>
                        </div>

                        {/* Gauge */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg viewBox="0 0 200 120" style={{ width: '200px', height: '120px' }}>
                            {/* Background arc */}
                            <path
                              d="M 20 100 A 80 80 0 0 1 180 100"
                              fill="none"
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth="12"
                              strokeLinecap="round"
                            />
                            {/* Red segment (Detractors) */}
                            <path
                              d="M 20 100 A 80 80 0 0 1 60 35"
                              fill="none"
                              stroke="#EF4444"
                              strokeWidth="12"
                              strokeLinecap="round"
                            />
                            {/* Yellow segment (Passives) */}
                            <path
                              d="M 60 35 A 80 80 0 0 1 140 35"
                              fill="none"
                              stroke="#F59E0B"
                              strokeWidth="12"
                            />
                            {/* Green segment (Promoters) */}
                            <path
                              d="M 140 35 A 80 80 0 0 1 180 100"
                              fill="none"
                              stroke="#30D158"
                              strokeWidth="12"
                              strokeLinecap="round"
                            />
                            {/* Needle */}
                            <line
                              x1="100" y1="100"
                              x2="100" y2="35"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              style={{
                                transformOrigin: '100px 100px',
                                transform: `rotate(${(npsPhase === 'complete' || npsPhase === 'idle' ? 67 : npsScore) * 0.9 + 15}deg)`,
                                transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                              }}
                            />
                            <circle cx="100" cy="100" r="6" fill="white" />
                          </svg>
                        </div>

                        {/* Distribution */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                          {[
                            { label: 'Promoters (9-10)', percent: 72, color: '#30D158' },
                            { label: 'Passives (7-8)', percent: 18, color: '#F59E0B' },
                            { label: 'Detractors (0-6)', percent: 10, color: '#EF4444' },
                          ].map((seg, i) => (
                            <div key={seg.label}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '11px', color: 'var(--text-60)' }}>{seg.label}</span>
                                <span style={{ fontSize: '11px', color: seg.color, fontWeight: '600' }}>{seg.percent}%</span>
                              </div>
                              <div style={{ height: '8px', background: 'var(--glass-10)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{
                                  width: npsPhase === 'complete' || npsPhase === 'idle' ? `${seg.percent}%` : '0%',
                                  height: '100%',
                                  background: seg.color,
                                  borderRadius: '4px',
                                  transition: `width 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.2}s`,
                                }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stat Cards */}
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
                        {[
                          { icon: '📈', value: '+12%', label: 'YoY Growth' },
                          { icon: '💬', value: '2.4K', label: 'Responses' },
                          { icon: '⏱', value: '24hr', label: 'Avg Response' },
                          { icon: '🎯', value: '78%', label: 'Action Rate' },
                        ].map((stat) => (
                          <div key={stat.label} style={{
                            padding: '12px 20px',
                            borderRadius: '10px',
                            background: 'var(--glass-04)',
                            border: '1px solid var(--glass-10)',
                            textAlign: 'center',
                          }}>
                            <span style={{ fontSize: '14px' }}>{stat.icon}</span>
                            <div style={{ fontSize: '16px', fontWeight: '700', color: `rgb(${project.color})` }}>{stat.value}</div>
                            <div style={{ fontSize: '9px', color: 'var(--text-40)' }}>{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            if (npsPhase !== 'idle') return;
                            setNpsPhase('score');
                            setNpsScore(0);
                            const scoreInterval = setInterval(() => {
                              setNpsScore(prev => {
                                if (prev >= 67) {
                                  clearInterval(scoreInterval);
                                  setNpsPhase('gauge');
                                  setTimeout(() => setNpsPhase('bars'), 500);
                                  setTimeout(() => setNpsPhase('complete'), 1500);
                                  setTimeout(() => setNpsPhase('idle'), 3000);
                                  return 67;
                                }
                                return prev + 3;
                              });
                            }, 30);
                          }}
                          style={{
                            padding: '10px 20px',
                            borderRadius: '10px',
                            background: npsPhase === 'idle' ? `rgb(${project.color})` : 'var(--glass-15)',
                            border: 'none',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: npsPhase === 'idle' ? 'white' : 'var(--text-60)',
                            cursor: npsPhase === 'idle' ? 'pointer' : 'default',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: npsPhase === 'idle' ? 'white' : '#30D158',
                            animation: npsPhase !== 'idle' && npsPhase !== 'complete' ? 'statusPulse 1s ease infinite' : 'none',
                          }} />
                          {npsPhase === 'idle' ? 'Refresh Dashboard' : npsPhase === 'complete' ? 'Data Updated ✓' : 'Loading...'}
                        </button>
                      </div>
                    </div>
                    </>
                  ) : index === 6 ? (
                    /* Card 6: Competitor Analysis - Feature Matrix Visualization */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '1000px',
                      margin: '0 auto',
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'var(--glass-06)',
                      border: `1px solid rgba(${project.color}, 0.2)`,
                    }}>
                      {/* Matrix Header */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '140px repeat(4, 1fr)',
                        gap: '8px',
                        marginBottom: '8px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid var(--glass-10)',
                      }}>
                        <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-40)', letterSpacing: '0.1em' }}>FEATURE</div>
                        {['Air India', 'Emirates', 'Singapore', 'Delta'].map(airline => (
                          <div key={airline} style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-60)', textAlign: 'center' }}>
                            {airline}
                          </div>
                        ))}
                      </div>

                      {/* Matrix Rows */}
                      {[
                        { feature: 'Booking UX', scores: [4, 5, 5, 4] },
                        { feature: 'Mobile App', scores: [5, 4, 5, 5] },
                        { feature: 'IFE System', scores: [5, 5, 4, 4] },
                        { feature: 'Check-in', scores: [4, 5, 4, 5] },
                        { feature: 'Lounge Access', scores: [3, 5, 5, 4] },
                      ].map((row, rowIdx) => (
                        <div
                          key={row.feature}
                          onMouseEnter={() => setCompetitorHoveredRow(rowIdx)}
                          onMouseLeave={() => setCompetitorHoveredRow(null)}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '140px repeat(4, 1fr)',
                            gap: '8px',
                            padding: '12px 0',
                            background: competitorHoveredRow === rowIdx ? 'var(--glass-06)' : 'transparent',
                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ fontSize: '12px', color: 'var(--text-70)', fontWeight: '500' }}>{row.feature}</div>
                          {row.scores.map((score, scoreIdx) => (
                            <div key={scoreIdx} style={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
                              {[1, 2, 3, 4, 5].map(dot => (
                                <div key={dot} style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  background: dot <= score
                                    ? scoreIdx === 0 ? `rgb(${project.color})` : dot <= 3 ? '#F59E0B' : '#30D158'
                                    : 'var(--glass-15)',
                                  transition: 'all 0.2s ease',
                                  transform: competitorHoveredRow === rowIdx ? 'scale(1.1)' : 'scale(1)',
                                }} />
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}

                      {/* Summary */}
                      <div style={{
                        marginTop: '20px',
                        paddingTop: '16px',
                        borderTop: '1px solid var(--glass-10)',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '24px',
                        fontSize: '11px',
                        color: 'var(--text-40)',
                      }}>
                        <span>15+ apps analyzed</span>
                        <span>•</span>
                        <span>47 features benchmarked</span>
                        <span>•</span>
                        <span>6-month research period</span>
                      </div>
                    </div>
                    </>
                  ) : index === 7 ? (
                    /* Card 7: Liftoff Program - Learning Path Timeline Visualization */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '900px',
                      margin: '0 auto',
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'var(--glass-06)',
                      border: `1px solid rgba(${project.color}, 0.2)`,
                    }}>
                      {/* Timeline */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '32px',
                        position: 'relative',
                      }}>
                        {/* Connection Line */}
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '5%',
                          width: '90%',
                          height: '2px',
                          background: 'var(--glass-15)',
                          transform: 'translateY(-50%)',
                        }}>
                          <div style={{
                            width: `${(liftoffWeek / 6) * 100}%`,
                            height: '100%',
                            background: `rgb(${project.color})`,
                            transition: 'width 0.5s ease',
                          }} />
                        </div>

                        {[1, 2, 3, 4, 5, 6].map(week => (
                          <div
                            key={week}
                            onClick={() => setLiftoffWeek(week)}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              position: 'relative',
                              zIndex: 1,
                            }}
                          >
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: week <= liftoffWeek ? `rgb(${project.color})` : 'var(--glass-20)',
                              border: week === liftoffWeek ? `3px solid white` : '2px solid var(--glass-30)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.3s ease',
                              boxShadow: week === liftoffWeek ? `0 0 20px rgba(${project.color}, 0.5)` : 'none',
                            }}>
                              {week < liftoffWeek && <CheckCircle size={12} color="white" />}
                            </div>
                            <span style={{
                              fontSize: '10px',
                              color: week === liftoffWeek ? `rgb(${project.color})` : 'var(--text-40)',
                              fontWeight: week === liftoffWeek ? '600' : '400',
                            }}>
                              Week {week}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Current Module */}
                      <div style={{
                        padding: '20px',
                        borderRadius: '12px',
                        background: 'var(--glass-08)',
                        border: `1px solid rgba(${project.color}, 0.3)`,
                        marginBottom: '24px',
                      }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-40)', marginBottom: '8px', letterSpacing: '0.1em' }}>CURRENT MODULE</div>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-90)', marginBottom: '12px' }}>
                          {['Onboarding', 'Design Principles', 'Component Systems', 'Design Systems', 'Advanced Patterns', 'Capstone'][liftoffWeek - 1]}
                        </div>
                        <div style={{ height: '8px', background: 'var(--glass-10)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                          <div style={{
                            width: '75%',
                            height: '100%',
                            background: `linear-gradient(90deg, rgb(${project.color}), rgba(${project.color}, 0.6))`,
                            borderRadius: '4px',
                          }} />
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-50)' }}>3 of 4 workshops completed</div>
                      </div>

                      {/* Stats */}
                      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        {[
                          { value: '12', label: 'Mentees' },
                          { value: '24', label: 'Sessions' },
                          { value: '89%', label: 'Completion' },
                        ].map(stat => (
                          <div key={stat.label} style={{
                            padding: '12px 24px',
                            borderRadius: '10px',
                            background: 'var(--glass-04)',
                            textAlign: 'center',
                          }}>
                            <div style={{ fontSize: '20px', fontWeight: '700', color: `rgb(${project.color})` }}>{stat.value}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-40)' }}>{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    </>
                  ) : index === 8 ? (
                    /* Card 8: Microsoft Hackathon - Azure AI Sentiment Pipeline Visualization */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '900px',
                      margin: '0 auto',
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'var(--glass-06)',
                      border: `1px solid rgba(${project.color}, 0.2)`,
                    }}>
                      {/* Pipeline */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '16px',
                        marginBottom: '24px',
                      }}>
                        {[
                          { title: 'INPUT', content: '"Great product!"', icon: '📝' },
                          { title: 'AZURE COGNITIVE', content: 'Sentiment Analysis', icon: '🧠' },
                          { title: 'OUTPUT', content: '😊 0.92 Positive', icon: '✨' },
                        ].map((stage, idx) => (
                          <div key={stage.title} style={{
                            padding: '20px',
                            borderRadius: '12px',
                            background: 'var(--glass-08)',
                            border: '1px solid var(--glass-15)',
                            textAlign: 'center',
                          }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stage.icon}</div>
                            <div style={{ fontSize: '10px', color: `rgb(${project.color})`, fontWeight: '600', letterSpacing: '0.1em', marginBottom: '8px' }}>
                              {stage.title}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-70)' }}>{stage.content}</div>
                          </div>
                        ))}
                      </div>

                      {/* Live Feed */}
                      <div style={{
                        padding: '16px',
                        borderRadius: '10px',
                        background: '#0D0D0D',
                        border: '1px solid var(--glass-15)',
                        marginBottom: '20px',
                      }}>
                        <div style={{ fontSize: '9px', fontWeight: '600', color: '#30D158', marginBottom: '12px', letterSpacing: '0.15em' }}>
                          LIVE SENTIMENT FEED
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {[
                            { text: '"Love this product!"', emoji: '😊', score: 0.95 },
                            { text: '"Could be better"', emoji: '😐', score: 0.45 },
                            { text: '"Amazing work!"', emoji: '😊', score: 0.89 },
                          ].map((item, idx) => (
                            <div key={idx} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              background: 'var(--glass-06)',
                              opacity: idx <= hackathonFeedIndex ? 1 : 0.3,
                              transition: 'opacity 0.3s ease',
                            }}>
                              <span style={{ fontSize: '11px', color: 'var(--text-60)' }}>{item.text}</span>
                              <span style={{ fontSize: '12px' }}>{item.emoji} {item.score.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Award Badge */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                      }}>
                        <div style={{
                          padding: '10px 20px',
                          borderRadius: '20px',
                          background: `rgba(${project.color}, 0.15)`,
                          border: `1px solid rgba(${project.color}, 0.3)`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                          <Trophy size={16} style={{ color: `rgb(${project.color})` }} />
                          <span style={{ fontSize: '12px', fontWeight: '600', color: `rgb(${project.color})` }}>1st Place</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-40)' }}>48hr Build • Azure AI Services</span>
                      </div>
                    </div>
                    </>
                  ) : index === 9 ? (
                    /* Card 9: Internal Hackathon - Sprint Timeline Visualization */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '900px',
                      margin: '0 auto',
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'var(--glass-06)',
                      border: `1px solid rgba(${project.color}, 0.2)`,
                    }}>
                      {/* Sprint Timeline */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px',
                        position: 'relative',
                      }}>
                        {/* Connection Line */}
                        <div style={{
                          position: 'absolute',
                          top: '20px',
                          left: '10%',
                          width: '80%',
                          height: '3px',
                          background: 'var(--glass-15)',
                        }}>
                          <div style={{
                            width: `${(['idea', 'design', 'build', 'test', 'ship'].indexOf(sprintPhase) + 1) * 25}%`,
                            height: '100%',
                            background: `rgb(${project.color})`,
                            transition: 'width 0.5s ease',
                          }} />
                        </div>

                        {[
                          { phase: 'idea', label: 'IDEA', time: '2hr' },
                          { phase: 'design', label: 'DESIGN', time: '4hr' },
                          { phase: 'build', label: 'BUILD', time: '12hr' },
                          { phase: 'test', label: 'TEST', time: '4hr' },
                          { phase: 'ship', label: 'SHIP', time: '2hr' },
                        ].map((stage, idx) => {
                          const phaseOrder = ['idea', 'design', 'build', 'test', 'ship'];
                          const currentIdx = phaseOrder.indexOf(sprintPhase);
                          const stageIdx = phaseOrder.indexOf(stage.phase);
                          const isComplete = stageIdx < currentIdx;
                          const isCurrent = stage.phase === sprintPhase;

                          return (
                            <div
                              key={stage.phase}
                              onClick={() => setSprintPhase(stage.phase as typeof sprintPhase)}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                position: 'relative',
                                zIndex: 1,
                              }}
                            >
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: isComplete || isCurrent ? `rgb(${project.color})` : 'var(--glass-20)',
                                border: isCurrent ? '3px solid white' : '2px solid var(--glass-30)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                transition: 'all 0.3s ease',
                                boxShadow: isCurrent ? `0 0 25px rgba(${project.color}, 0.6)` : 'none',
                              }}>
                                {isComplete ? '✓' : isCurrent ? '●' : '○'}
                              </div>
                              <span style={{
                                fontSize: '10px',
                                fontWeight: '700',
                                color: isCurrent ? `rgb(${project.color})` : 'var(--text-50)',
                                letterSpacing: '0.05em',
                              }}>
                                {stage.label}
                              </span>
                              <span style={{ fontSize: '9px', color: 'var(--text-30)' }}>{stage.time}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Progress Bar */}
                      <div style={{
                        padding: '16px 20px',
                        borderRadius: '12px',
                        background: 'var(--glass-08)',
                        border: '1px solid var(--glass-15)',
                        marginBottom: '20px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-50)' }}>Sprint Progress</span>
                          <span style={{ fontSize: '11px', color: `rgb(${project.color})`, fontWeight: '600' }}>18:32:45 remaining</span>
                        </div>
                        <div style={{ height: '12px', background: 'var(--glass-10)', borderRadius: '6px', overflow: 'hidden' }}>
                          <div style={{
                            width: '75%',
                            height: '100%',
                            background: `linear-gradient(90deg, rgb(${project.color}), rgba(${project.color}, 0.6))`,
                            borderRadius: '6px',
                          }} />
                        </div>
                      </div>

                      {/* Team & Tech */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                        flexWrap: 'wrap',
                      }}>
                        <div style={{
                          padding: '10px 20px',
                          borderRadius: '20px',
                          background: `rgba(${project.color}, 0.15)`,
                          border: `1px solid rgba(${project.color}, 0.3)`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                          <Trophy size={16} style={{ color: `rgb(${project.color})` }} />
                          <span style={{ fontSize: '12px', fontWeight: '600', color: `rgb(${project.color})` }}>Winner</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-40)' }}>Team: 4 designers</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-40)' }}>Tech: React + Figma API</span>
                        <span style={{ fontSize: '11px', color: '#30D158', fontWeight: '500' }}>Shipped to Production ✓</span>
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
                  {index === 1 ? (
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
                  ) : index === 0 ? (
                    /* Full-width narrative text for Design System */
                    <div style={{
                      width: '100%',
                      maxWidth: '1100px',
                      margin: '0 auto',
                      padding: '8px',
                    }}>
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
                {/* END LEGACY EXPANDED CONTENT */}

                {/* Narrative Connectors */}
                {index === 0 && (
                  <NarrativeConnector fromAct={1} toAct={2} text={narrativeTransitions.act1to2} />
                )}
                {index === 5 && (
                  <NarrativeConnector fromAct={2} toAct={3} text={narrativeTransitions.act2to3} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DEEP DIVE - PIXEL RADAR
      ========================================================================= */}
      <section style={{
        maxWidth: 'min(880px, 85vw)',
        margin: '0 auto',
        padding: 'clamp(8rem, 14vh, 12rem) 2rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          padding: 'clamp(2.5rem, 5vw, 4rem)',
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
        maxWidth: 'min(880px, 85vw)',
        margin: '0 auto',
        padding: 'clamp(4rem, 8vh, 6rem) 2rem clamp(8rem, 14vh, 12rem)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          padding: 'clamp(2.5rem, 5vw, 4rem)',
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
        maxWidth: 'min(1100px, 88vw)',
        margin: '0 auto',
        padding: 'clamp(6rem, 12vh, 10rem) 2rem clamp(8rem, 15vh, 12rem)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vh, 5rem)',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both' : 'none',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '400',
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
          }}>
            What I Bring
          </h2>
        </div>

        {/* Differentiators Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
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
        padding: 'clamp(6rem, 12vh, 10rem) 2rem',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
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
          padding: '0',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)',
            gap: 'clamp(1.25rem, 2.5vw, 2rem)',
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
        padding: 'clamp(6rem, 12vh, 10rem) 2rem clamp(8rem, 15vh, 12rem)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          marginBottom: 'clamp(3rem, 6vh, 5rem)',
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
          gap: 'clamp(2rem, 4vw, 3rem)',
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
