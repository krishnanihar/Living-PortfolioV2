'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Atropos from 'atropos';
import 'atropos/css';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
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
  Server,
  Cloud,
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
  expandedDescription?: string;
  imagePlaceholder: string;
  stats: ProjectStat[];
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
    icon: Target,
    color: '218, 14, 41',
    category: 'TOOL'
  },
  {
    id: 3,
    label: '03',
    title: 'Search with AI',
    subtitle: 'AI-native search using natural language',
    description: '3rd place at Battle of the Apps 2024.',
    longDescription: 'While the organization modernized basics, I was designing for what comes next. Search with AI—an AI-native search experience using natural language understanding—rethinks how passengers interact with an airline.\n\nThis feature helped Air India reach 3rd place at the Battle of the Airline Apps 2024 (World Aviation Festival), competing against Lufthansa, Emirates, and Qatar Airways.',
    imagePlaceholder: 'AI Search Interface Mockup',
    stats: [
      { value: '3rd', label: 'Battle of Apps' },
      { value: 'NLU', label: 'Powered' },
      { value: 'WAF', label: '2024' }
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
  // Air India brand color (RGB: 218, 14, 41 = #DA0E29)
  const brandRgb = '218, 14, 41';

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
  const heroImageRef = useRef<HTMLDivElement>(null);
  const atroposRef = useRef<HTMLDivElement>(null);
  const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

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
  const [figmaExpandedCollections, setFigmaExpandedCollections] = useState<Set<string>>(new Set(['primitives']));
  const [figmaSelectedCollection, setFigmaSelectedCollection] = useState<string>('primitives');
  const [figmaExpandedCategories, setFigmaExpandedCategories] = useState<Set<string>>(new Set(['color']));
  const [figmaExpandedGroups, setFigmaExpandedGroups] = useState<Set<string>>(new Set(['color/brand', 'color/text']));
  const [figmaHoveredRow, setFigmaHoveredRow] = useState<string | null>(null);
  const [figmaHoveredSidebarItem, setFigmaHoveredSidebarItem] = useState<string | null>(null);
  const [figmaSearchQuery, setFigmaSearchQuery] = useState<string>('');
  // Enhanced interactivity states
  const [figmaSelectedRows, setFigmaSelectedRows] = useState<Set<string>>(new Set());
  const [figmaCascadePhase, setFigmaCascadePhase] = useState<'idle' | 'playing' | 'complete'>('idle');
  const [figmaCascadeStep, setFigmaCascadeStep] = useState<number>(0);
  const [figmaHighlightedGroup, setFigmaHighlightedGroup] = useState<string | null>(null);
  const [figmaPulsingRow, setFigmaPulsingRow] = useState<string | null>(null);
  // Preview Mode states for token-to-component visualization
  const [figmaPreviewMode, setFigmaPreviewMode] = useState<boolean>(false);
  const [expandedTokenCard, setExpandedTokenCard] = useState<string | null>(null);
  const [figmaPreviewComponent, setFigmaPreviewComponent] = useState<'button' | 'card'>('button');
  const [figmaHighlightedProperty, setFigmaHighlightedProperty] = useState<string | null>(null);

  // Card 2: Search with AI - NLU Query Pipeline states
  const [queryPhase, setQueryPhase] = useState<'idle' | 'typing' | 'tokenize' | 'entities' | 'intent' | 'results'>('idle');
  const [displayedQuery, setDisplayedQuery] = useState('');
  const [aiExplorerScreen, setAiExplorerScreen] = useState<'home' | 'loading' | 'results'>('home');
  const [selectedDestination, setSelectedDestination] = useState<{ name: string; location: string; temp: string; image: string } | null>(null);
  const homeScreenRef = useRef<HTMLDivElement>(null);
  const resultsScreenRef = useRef<HTMLDivElement>(null);

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

  // Atropos 3D parallax initialization
  useEffect(() => {
    if (atroposRef.current && !isMobile) {
      atroposInstance.current = Atropos({
        el: atroposRef.current,
        activeOffset: 60,
        rotateXMax: 1,
        rotateYMax: 1,
        shadow: false,
        highlight: false,
        duration: 300,
        alwaysActive: false,
        commonOrigin: true,
      });
    }

    return () => {
      if (atroposInstance.current) {
        atroposInstance.current.destroy();
      }
    };
  }, [isMobile]);

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
          {/* Transition text */}
        <p style={{
          maxWidth: '500px',
          margin: '0 auto',
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
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* =========================================================================
          SECTION 1: HERO - Full-Screen Cinematic with Centered Card
      ========================================================================= */}
      <header
        ref={heroRef}
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Atropos Container - 3D Parallax Wrapper */}
        <div
          ref={atroposRef}
          className="atropos"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <div className="atropos-scale" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
            <div className="atropos-rotate" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
              <div className="atropos-inner" style={{ width: '100%', height: '100%', position: 'relative' }}>

                {/* LAYER 1: Sky Background - Furthest Back */}
                <div
                  data-atropos-offset="-10"
                  style={{
                    position: 'absolute',
                    inset: '-10%',
                    zIndex: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src="/images/home/hero-sky.png"
                    alt="Sky background"
                    fill
                    priority
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center 40%',
                      transform: 'scale(1.2)',
                    }}
                    quality={95}
                  />
                </div>

                {/* LAYER 2: Clouds - Middle Depth */}
                <div
                  data-atropos-offset="-5"
                  style={{
                    position: 'absolute',
                    inset: '-10%',
                    zIndex: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src="/images/home/hero-clouds.png"
                    alt="Clouds"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center 40%',
                      transform: 'scale(1.2)',
                    }}
                    quality={95}
                  />
                </div>

                {/* LAYER 3: Aircraft - Center */}
                <div
                  data-atropos-offset="0"
                  style={{
                    position: 'absolute',
                    inset: '-10%',
                    zIndex: 3,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src="/images/home/hero-aircraft.png"
                    alt="Air India Aircraft"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center 40%',
                      transform: 'scale(1.2)',
                    }}
                    quality={95}
                  />
                </div>

                {/* Bottom Fade - Theme-aware blend */}
                <div
                  data-atropos-offset="-2"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, var(--bg-primary) 0%, var(--bg-primary) 25%, transparent 100%)',
                    pointerEvents: 'none',
                    zIndex: 4,
                  }}
                />

                {/* Centered Content Card - Liquid Glass (Static, No Parallax) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    width: '90%',
                    maxWidth: '580px',
                    padding: isMobile ? '2rem' : '2.5rem 3rem',
                    pointerEvents: 'auto', // CRITICAL: Enable clicking on content
                    // Theme-aware glassmorphism
                    background: `
                      linear-gradient(135deg, var(--glass-04) 0%, var(--glass-02) 50%, var(--glass-03) 100%),
                      var(--overlay-45)
                    `,
                    backdropFilter: 'blur(60px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                    borderRadius: '32px',
                    border: '1px solid var(--glass-04)',
                    // Theme-aware shadows
                    boxShadow: `
                      0 40px 80px var(--overlay-20),
                      0 20px 40px var(--overlay-15),
                      inset 0 1px 0 var(--glass-05),
                      inset 0 0 20px var(--overlay-10)
                    `,
                    textAlign: 'center',
                    overflow: 'hidden',
                  }}
                >
          {/* Gradient Border Overlay - Theme-aware */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '32px',
            padding: '1px',
            background: 'linear-gradient(135deg, var(--glass-06) 0%, var(--glass-02) 50%, var(--glass-04) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
          }} />

          {/* Top Highlight - Theme-aware */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--glass-10), transparent)',
            pointerEvents: 'none',
          }} />
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontSize: '0.6875rem',
              fontWeight: '500',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Case Study
          </motion.div>

          {/* Brand Mark - Air India Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}
          >
            <img
              src="/logos/air-india.svg"
              alt="Air India"
              style={{
                width: '180px',
                height: 'auto',
                filter: 'drop-shadow(0 4px 16px rgba(218, 14, 41, 0.25))',
              }}
            />
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>$200M Digital Transformation</div>
          </motion.div>

          {/* Main Statement */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              lineHeight: '1.3',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
            }}
          >
            Building{' '}
            <span style={{
              fontWeight: '600',
              background: 'linear-gradient(90deg, #DA0E29, #FF2D4A, #DA0E29, #B80B22)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 4s ease-in-out infinite',
            }}>
              design infrastructure
            </span>
            <br />where none existed
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontWeight: '400',
              marginBottom: '1.75rem',
              maxWidth: '420px',
              margin: '0 auto 1.75rem',
            }}
          >
            When Tata acquired Air India, they inherited 69 years of technical debt. I built the design systems and tools from zero.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? '1.5rem' : '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {[
              { value: '4', label: 'Airlines Merged' },
              { value: '450+', label: 'Daily Users' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}>{stat.value}</div>
                <div style={{
                  fontSize: '0.625rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginTop: '0.25rem',
                }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                  data-atropos-offset="2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    pointerEvents: 'none',
                    zIndex: 5,
                  }}
                >
          <div style={{
            fontSize: '0.625rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>Scroll</div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '20px',
              height: '32px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div style={{
              width: '3px',
              height: '8px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.4)',
            }} />
          </motion.div>
                </motion.div>

              </div>
            </div>
          </div>
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
        overflow: 'visible',
      }}>
        {/* Full-Screen Project Sections */}
        <div style={{
          width: '100%',
          position: 'relative',
          overflow: 'visible',
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
                    color: 'var(--text-70)',
                    fontWeight: '500',
                  }}>
                    Interactive Prototype
                  </span>
                  <span style={{
                    fontSize: '10px',
                    color: 'var(--text-40)',
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

            // Render Design System Demo - Figma Variables Panel (Pixel-Perfect)
            // Figma dark theme color constants
            const FIGMA = {
              bg: '#1E1E1E',
              bgSecondary: '#2C2C2C',
              bgTertiary: '#252525',
              bgInput: '#383838',
              border: 'rgba(255,255,255,0.08)',
              borderSubtle: 'rgba(255,255,255,0.04)',
              textPrimary: 'rgba(255,255,255,0.9)',
              textSecondary: 'rgba(255,255,255,0.6)',
              textMuted: 'rgba(255,255,255,0.4)',
              textDisabled: 'rgba(255,255,255,0.25)',
              brand: '#0D99FF',
              brandSubtle: 'rgba(13,153,255,0.15)',
              hover: 'rgba(255,255,255,0.04)',
              selected: 'rgba(24,160,251,0.12)',
              success: '#30D158',
            };

            // Complete W3C DTCG-compliant token data structure (~105 tokens)
            const figmaTokenData = {
              primitives: {
                id: 'primitives',
                name: 'Primitives',
                categories: [
                  {
                    id: 'color',
                    name: 'color',
                    displayName: 'Colors',
                    icon: 'circle' as const,
                    groups: [
                      {
                        id: 'brand',
                        name: 'brand',
                        displayName: 'Brand',
                        tokens: [
                          { name: 'color/brand/primary', type: 'color', light: '#DA0E29', dark: '#FF4D6A' },
                          { name: 'color/brand/secondary', type: 'color', light: '#0D99FF', dark: '#3DB4FF' },
                          { name: 'color/brand/accent', type: 'color', light: '#6366F1', dark: '#818CF8' },
                        ]
                      },
                      {
                        id: 'text',
                        name: 'text',
                        displayName: 'Text',
                        tokens: [
                          { name: 'color/text/primary', type: 'color', light: '#0A0A0A', dark: '#FFFFFF' },
                          { name: 'color/text/secondary', type: 'color', light: '#525252', dark: '#A1A1AA' },
                          { name: 'color/text/tertiary', type: 'color', light: '#737373', dark: '#71717A' },
                          { name: 'color/text/muted', type: 'color', light: '#A3A3A3', dark: '#52525B' },
                          { name: 'color/text/inverse', type: 'color', light: '#FFFFFF', dark: '#0A0A0A' },
                          { name: 'color/text/link', type: 'color', light: '#0D99FF', dark: '#3DB4FF' },
                          { name: 'color/text/success', type: 'color', light: '#16A34A', dark: '#22C55E' },
                          { name: 'color/text/warning', type: 'color', light: '#CA8A04', dark: '#FACC15' },
                          { name: 'color/text/error', type: 'color', light: '#DC2626', dark: '#EF4444' },
                        ]
                      },
                      {
                        id: 'surface',
                        name: 'surface',
                        displayName: 'Surface',
                        tokens: [
                          { name: 'color/surface/primary', type: 'color', light: '#FFFFFF', dark: '#0A0A0A' },
                          { name: 'color/surface/secondary', type: 'color', light: '#FAFAFA', dark: '#141414' },
                          { name: 'color/surface/tertiary', type: 'color', light: '#F5F5F5', dark: '#1E1E1E' },
                          { name: 'color/surface/elevated', type: 'color', light: '#FFFFFF', dark: '#252525' },
                          { name: 'color/surface/overlay', type: 'color', light: 'rgba(0,0,0,0.5)', dark: 'rgba(0,0,0,0.7)' },
                          { name: 'color/surface/inverse', type: 'color', light: '#0A0A0A', dark: '#FFFFFF' },
                        ]
                      },
                      {
                        id: 'border',
                        name: 'border',
                        displayName: 'Border',
                        tokens: [
                          { name: 'color/border/default', type: 'color', light: '#E5E5E5', dark: '#2E2E2E' },
                          { name: 'color/border/subtle', type: 'color', light: '#F0F0F0', dark: '#1A1A1A' },
                          { name: 'color/border/strong', type: 'color', light: '#D4D4D4', dark: '#404040' },
                          { name: 'color/border/focus', type: 'color', light: '#0D99FF', dark: '#3DB4FF' },
                          { name: 'color/border/error', type: 'color', light: '#DC2626', dark: '#EF4444' },
                        ]
                      },
                      {
                        id: 'semantic',
                        name: 'semantic',
                        displayName: 'Semantic',
                        tokens: [
                          { name: 'color/semantic/success', type: 'color', light: '#16A34A', dark: '#22C55E' },
                          { name: 'color/semantic/success-subtle', type: 'color', light: '#DCFCE7', dark: '#052E16' },
                          { name: 'color/semantic/warning', type: 'color', light: '#CA8A04', dark: '#FACC15' },
                          { name: 'color/semantic/warning-subtle', type: 'color', light: '#FEF9C3', dark: '#422006' },
                          { name: 'color/semantic/error', type: 'color', light: '#DC2626', dark: '#EF4444' },
                          { name: 'color/semantic/error-subtle', type: 'color', light: '#FEE2E2', dark: '#450A0A' },
                          { name: 'color/semantic/info', type: 'color', light: '#0D99FF', dark: '#3DB4FF' },
                          { name: 'color/semantic/info-subtle', type: 'color', light: '#DBEAFE', dark: '#082F49' },
                        ]
                      },
                      {
                        id: 'interaction',
                        name: 'interaction',
                        displayName: 'Interaction',
                        tokens: [
                          { name: 'color/interaction/hover', type: 'color', light: 'rgba(0,0,0,0.04)', dark: 'rgba(255,255,255,0.04)' },
                          { name: 'color/interaction/pressed', type: 'color', light: 'rgba(0,0,0,0.08)', dark: 'rgba(255,255,255,0.08)' },
                          { name: 'color/interaction/disabled', type: 'color', light: 'rgba(0,0,0,0.12)', dark: 'rgba(255,255,255,0.12)' },
                          { name: 'color/interaction/focus-ring', type: 'color', light: 'rgba(13,153,255,0.4)', dark: 'rgba(61,180,255,0.4)' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'typography',
                    name: 'typography',
                    displayName: 'Typography',
                    icon: 'text' as const,
                    groups: [
                      {
                        id: 'font-family',
                        name: 'font-family',
                        displayName: 'Font Family',
                        tokens: [
                          { name: 'typography/font-family/heading', type: 'string', light: 'Space Grotesk', dark: 'Space Grotesk' },
                          { name: 'typography/font-family/body', type: 'string', light: 'DM Sans', dark: 'DM Sans' },
                          { name: 'typography/font-family/mono', type: 'string', light: 'SF Mono', dark: 'SF Mono' },
                        ]
                      },
                      {
                        id: 'font-size',
                        name: 'font-size',
                        displayName: 'Font Size',
                        tokens: [
                          { name: 'typography/font-size/xs', type: 'dimension', light: '12px', dark: '12px' },
                          { name: 'typography/font-size/sm', type: 'dimension', light: '14px', dark: '14px' },
                          { name: 'typography/font-size/md', type: 'dimension', light: '16px', dark: '16px' },
                          { name: 'typography/font-size/lg', type: 'dimension', light: '18px', dark: '18px' },
                          { name: 'typography/font-size/xl', type: 'dimension', light: '20px', dark: '20px' },
                          { name: 'typography/font-size/2xl', type: 'dimension', light: '24px', dark: '24px' },
                          { name: 'typography/font-size/3xl', type: 'dimension', light: '32px', dark: '32px' },
                          { name: 'typography/font-size/4xl', type: 'dimension', light: '40px', dark: '40px' },
                        ]
                      },
                      {
                        id: 'font-weight',
                        name: 'font-weight',
                        displayName: 'Font Weight',
                        tokens: [
                          { name: 'typography/font-weight/regular', type: 'number', light: '400', dark: '400' },
                          { name: 'typography/font-weight/medium', type: 'number', light: '500', dark: '500' },
                          { name: 'typography/font-weight/semibold', type: 'number', light: '600', dark: '600' },
                          { name: 'typography/font-weight/bold', type: 'number', light: '700', dark: '700' },
                        ]
                      },
                      {
                        id: 'line-height',
                        name: 'line-height',
                        displayName: 'Line Height',
                        tokens: [
                          { name: 'typography/line-height/tight', type: 'number', light: '1.2', dark: '1.2' },
                          { name: 'typography/line-height/normal', type: 'number', light: '1.5', dark: '1.5' },
                          { name: 'typography/line-height/relaxed', type: 'number', light: '1.75', dark: '1.75' },
                        ]
                      },
                      {
                        id: 'letter-spacing',
                        name: 'letter-spacing',
                        displayName: 'Letter Spacing',
                        tokens: [
                          { name: 'typography/letter-spacing/tight', type: 'dimension', light: '-0.02em', dark: '-0.02em' },
                          { name: 'typography/letter-spacing/normal', type: 'dimension', light: '0', dark: '0' },
                          { name: 'typography/letter-spacing/wide', type: 'dimension', light: '0.05em', dark: '0.05em' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'spacing',
                    name: 'spacing',
                    displayName: 'Spacing',
                    icon: 'spacing' as const,
                    groups: [
                      {
                        id: 'scale',
                        name: 'scale',
                        displayName: 'Scale',
                        tokens: [
                          { name: 'spacing/0', type: 'dimension', light: '0px', dark: '0px' },
                          { name: 'spacing/1', type: 'dimension', light: '4px', dark: '4px' },
                          { name: 'spacing/2', type: 'dimension', light: '8px', dark: '8px' },
                          { name: 'spacing/3', type: 'dimension', light: '12px', dark: '12px' },
                          { name: 'spacing/4', type: 'dimension', light: '16px', dark: '16px' },
                          { name: 'spacing/5', type: 'dimension', light: '20px', dark: '20px' },
                          { name: 'spacing/6', type: 'dimension', light: '24px', dark: '24px' },
                          { name: 'spacing/8', type: 'dimension', light: '32px', dark: '32px' },
                          { name: 'spacing/10', type: 'dimension', light: '40px', dark: '40px' },
                          { name: 'spacing/12', type: 'dimension', light: '48px', dark: '48px' },
                          { name: 'spacing/16', type: 'dimension', light: '64px', dark: '64px' },
                          { name: 'spacing/20', type: 'dimension', light: '80px', dark: '80px' },
                          { name: 'spacing/24', type: 'dimension', light: '96px', dark: '96px' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'sizing',
                    name: 'sizing',
                    displayName: 'Sizing',
                    icon: 'hash' as const,
                    groups: [
                      {
                        id: 'radius',
                        name: 'radius',
                        displayName: 'Border Radius',
                        tokens: [
                          { name: 'sizing/radius/none', type: 'dimension', light: '0px', dark: '0px' },
                          { name: 'sizing/radius/sm', type: 'dimension', light: '4px', dark: '4px' },
                          { name: 'sizing/radius/md', type: 'dimension', light: '8px', dark: '8px' },
                          { name: 'sizing/radius/lg', type: 'dimension', light: '12px', dark: '12px' },
                          { name: 'sizing/radius/xl', type: 'dimension', light: '16px', dark: '16px' },
                          { name: 'sizing/radius/full', type: 'dimension', light: '9999px', dark: '9999px' },
                        ]
                      },
                      {
                        id: 'border-width',
                        name: 'border-width',
                        displayName: 'Border Width',
                        tokens: [
                          { name: 'sizing/border-width/none', type: 'dimension', light: '0px', dark: '0px' },
                          { name: 'sizing/border-width/thin', type: 'dimension', light: '1px', dark: '1px' },
                          { name: 'sizing/border-width/medium', type: 'dimension', light: '2px', dark: '2px' },
                          { name: 'sizing/border-width/thick', type: 'dimension', light: '4px', dark: '4px' },
                        ]
                      },
                      {
                        id: 'icon',
                        name: 'icon',
                        displayName: 'Icon Sizes',
                        tokens: [
                          { name: 'sizing/icon/xs', type: 'dimension', light: '12px', dark: '12px' },
                          { name: 'sizing/icon/sm', type: 'dimension', light: '16px', dark: '16px' },
                          { name: 'sizing/icon/md', type: 'dimension', light: '20px', dark: '20px' },
                          { name: 'sizing/icon/lg', type: 'dimension', light: '24px', dark: '24px' },
                          { name: 'sizing/icon/xl', type: 'dimension', light: '32px', dark: '32px' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'effect',
                    name: 'effect',
                    displayName: 'Effects',
                    icon: 'hash' as const,
                    groups: [
                      {
                        id: 'shadow',
                        name: 'shadow',
                        displayName: 'Shadows',
                        tokens: [
                          { name: 'effect/shadow/none', type: 'string', light: 'none', dark: 'none' },
                          { name: 'effect/shadow/sm', type: 'string', light: '0 1px 2px rgba(0,0,0,0.05)', dark: '0 1px 2px rgba(0,0,0,0.3)' },
                          { name: 'effect/shadow/md', type: 'string', light: '0 4px 6px rgba(0,0,0,0.07)', dark: '0 4px 6px rgba(0,0,0,0.4)' },
                          { name: 'effect/shadow/lg', type: 'string', light: '0 10px 15px rgba(0,0,0,0.1)', dark: '0 10px 15px rgba(0,0,0,0.5)' },
                          { name: 'effect/shadow/xl', type: 'string', light: '0 20px 25px rgba(0,0,0,0.1)', dark: '0 20px 25px rgba(0,0,0,0.6)' },
                        ]
                      },
                      {
                        id: 'opacity',
                        name: 'opacity',
                        displayName: 'Opacity',
                        tokens: [
                          { name: 'effect/opacity/0', type: 'number', light: '0', dark: '0' },
                          { name: 'effect/opacity/5', type: 'number', light: '0.05', dark: '0.05' },
                          { name: 'effect/opacity/10', type: 'number', light: '0.1', dark: '0.1' },
                          { name: 'effect/opacity/20', type: 'number', light: '0.2', dark: '0.2' },
                          { name: 'effect/opacity/50', type: 'number', light: '0.5', dark: '0.5' },
                          { name: 'effect/opacity/100', type: 'number', light: '1', dark: '1' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'number',
                    name: 'number',
                    displayName: 'Numbers',
                    icon: 'hash' as const,
                    groups: [
                      {
                        id: 'z-index',
                        name: 'z-index',
                        displayName: 'Z-Index',
                        tokens: [
                          { name: 'number/z-index/base', type: 'number', light: '0', dark: '0' },
                          { name: 'number/z-index/dropdown', type: 'number', light: '100', dark: '100' },
                          { name: 'number/z-index/sticky', type: 'number', light: '200', dark: '200' },
                          { name: 'number/z-index/modal', type: 'number', light: '300', dark: '300' },
                          { name: 'number/z-index/toast', type: 'number', light: '400', dark: '400' },
                        ]
                      }
                    ]
                  }
                ]
              },
              semantics: {
                id: 'semantics',
                name: 'Semantics',
                categories: [
                  {
                    id: 'text',
                    name: 'text',
                    displayName: 'Text',
                    icon: 'text' as const,
                    groups: [
                      {
                        id: 'text-colors',
                        name: 'text-colors',
                        displayName: 'Text Colors',
                        tokens: [
                          { name: 'text/primary', type: 'color', light: '#0A0A0A', dark: '#FFFFFF', alias: 'color/text/primary' },
                          { name: 'text/secondary', type: 'color', light: '#525252', dark: '#A1A1AA', alias: 'color/text/secondary' },
                          { name: 'text/tertiary', type: 'color', light: '#737373', dark: '#71717A', alias: 'color/text/tertiary' },
                          { name: 'text/muted', type: 'color', light: '#A3A3A3', dark: '#52525B', alias: 'color/text/muted' },
                          { name: 'text/inverse', type: 'color', light: '#FFFFFF', dark: '#0A0A0A', alias: 'color/text/inverse' },
                          { name: 'text/link', type: 'color', light: '#0D99FF', dark: '#3DB4FF', alias: 'color/text/link' },
                          { name: 'text/on-action', type: 'color', light: '#FFFFFF', dark: '#FFFFFF', alias: 'color/text/inverse' },
                          { name: 'text/success', type: 'color', light: '#16A34A', dark: '#22C55E', alias: 'color/text/success' },
                          { name: 'text/error', type: 'color', light: '#DC2626', dark: '#EF4444', alias: 'color/text/error' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'background',
                    name: 'background',
                    displayName: 'Background',
                    icon: 'circle' as const,
                    groups: [
                      {
                        id: 'surfaces',
                        name: 'surfaces',
                        displayName: 'Surfaces',
                        tokens: [
                          { name: 'bg/canvas', type: 'color', light: '#FFFFFF', dark: '#0A0A0A', alias: 'color/surface/primary' },
                          { name: 'bg/surface', type: 'color', light: '#FAFAFA', dark: '#141414', alias: 'color/surface/secondary' },
                          { name: 'bg/elevated', type: 'color', light: '#FFFFFF', dark: '#252525', alias: 'color/surface/elevated' },
                          { name: 'bg/overlay', type: 'color', light: 'rgba(0,0,0,0.5)', dark: 'rgba(0,0,0,0.7)', alias: 'color/surface/overlay' },
                          { name: 'bg/inverse', type: 'color', light: '#0A0A0A', dark: '#FFFFFF', alias: 'color/surface/inverse' },
                          { name: 'bg/subtle', type: 'color', light: '#F5F5F5', dark: '#1E1E1E', alias: 'color/surface/tertiary' },
                          { name: 'bg/brand', type: 'color', light: '#DA0E29', dark: '#FF4D6A', alias: 'color/brand/primary' },
                          { name: 'bg/muted', type: 'color', light: 'rgba(0,0,0,0.12)', dark: 'rgba(255,255,255,0.12)', alias: 'color/interaction/disabled' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'action',
                    name: 'action',
                    displayName: 'Action',
                    icon: 'circle' as const,
                    groups: [
                      {
                        id: 'interactive',
                        name: 'interactive',
                        displayName: 'Interactive',
                        tokens: [
                          { name: 'action/primary', type: 'color', light: '#DA0E29', dark: '#FF4D6A', alias: 'color/brand/primary' },
                          { name: 'action/primary-hover', type: 'color', light: '#0D99FF', dark: '#3DB4FF', alias: 'color/brand/secondary' },
                          { name: 'action/secondary', type: 'color', light: '#FFFFFF', dark: '#252525', alias: 'color/surface/elevated' },
                          { name: 'action/secondary-hover', type: 'color', light: 'rgba(0,0,0,0.04)', dark: 'rgba(255,255,255,0.04)', alias: 'color/interaction/hover' },
                          { name: 'action/ghost', type: 'color', light: 'transparent', dark: 'transparent', alias: 'transparent' },
                          { name: 'action/ghost-hover', type: 'color', light: 'rgba(0,0,0,0.04)', dark: 'rgba(255,255,255,0.04)', alias: 'color/interaction/hover' },
                          { name: 'action/disabled', type: 'color', light: 'rgba(0,0,0,0.12)', dark: 'rgba(255,255,255,0.12)', alias: 'color/interaction/disabled' },
                          { name: 'action/destructive', type: 'color', light: '#DC2626', dark: '#EF4444', alias: 'color/semantic/error' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'border',
                    name: 'border',
                    displayName: 'Border',
                    icon: 'hash' as const,
                    groups: [
                      {
                        id: 'border-colors',
                        name: 'border-colors',
                        displayName: 'Border Colors',
                        tokens: [
                          { name: 'border/default', type: 'color', light: '#E5E5E5', dark: '#2E2E2E', alias: 'color/border/default' },
                          { name: 'border/subtle', type: 'color', light: '#F0F0F0', dark: '#1A1A1A', alias: 'color/border/subtle' },
                          { name: 'border/strong', type: 'color', light: '#D4D4D4', dark: '#404040', alias: 'color/border/strong' },
                          { name: 'border/focus', type: 'color', light: '#0D99FF', dark: '#3DB4FF', alias: 'color/border/focus' },
                          { name: 'border/error', type: 'color', light: '#DC2626', dark: '#EF4444', alias: 'color/border/error' },
                          { name: 'border/interactive', type: 'color', light: '#6366F1', dark: '#818CF8', alias: 'color/brand/accent' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'feedback',
                    name: 'feedback',
                    displayName: 'Feedback',
                    icon: 'circle' as const,
                    groups: [
                      {
                        id: 'status',
                        name: 'status',
                        displayName: 'Status',
                        tokens: [
                          { name: 'feedback/success', type: 'color', light: '#16A34A', dark: '#22C55E', alias: 'color/semantic/success' },
                          { name: 'feedback/success-subtle', type: 'color', light: '#DCFCE7', dark: '#052E16', alias: 'color/semantic/success-subtle' },
                          { name: 'feedback/warning', type: 'color', light: '#CA8A04', dark: '#FACC15', alias: 'color/semantic/warning' },
                          { name: 'feedback/warning-subtle', type: 'color', light: '#FEF9C3', dark: '#422006', alias: 'color/semantic/warning-subtle' },
                          { name: 'feedback/error', type: 'color', light: '#DC2626', dark: '#EF4444', alias: 'color/semantic/error' },
                          { name: 'feedback/error-subtle', type: 'color', light: '#FEE2E2', dark: '#450A0A', alias: 'color/semantic/error-subtle' },
                          { name: 'feedback/info', type: 'color', light: '#0D99FF', dark: '#3DB4FF', alias: 'color/semantic/info' },
                          { name: 'feedback/info-subtle', type: 'color', light: '#DBEAFE', dark: '#082F49', alias: 'color/semantic/info-subtle' },
                        ]
                      }
                    ]
                  },
                  {
                    id: 'icon',
                    name: 'icon',
                    displayName: 'Icon',
                    icon: 'circle' as const,
                    groups: [
                      {
                        id: 'icon-colors',
                        name: 'icon-colors',
                        displayName: 'Icon Colors',
                        tokens: [
                          { name: 'icon/primary', type: 'color', light: '#0A0A0A', dark: '#FFFFFF', alias: 'color/text/primary' },
                          { name: 'icon/secondary', type: 'color', light: '#525252', dark: '#A1A1AA', alias: 'color/text/secondary' },
                          { name: 'icon/muted', type: 'color', light: '#A3A3A3', dark: '#52525B', alias: 'color/text/muted' },
                          { name: 'icon/inverse', type: 'color', light: '#FFFFFF', dark: '#0A0A0A', alias: 'color/text/inverse' },
                          { name: 'icon/brand', type: 'color', light: '#DA0E29', dark: '#FF4D6A', alias: 'color/brand/primary' },
                          { name: 'icon/interactive', type: 'color', light: '#6366F1', dark: '#818CF8', alias: 'color/brand/accent' },
                        ]
                      }
                    ]
                  }
                ]
              }
            };

            // Component Token Mappings - Maps semantic/primitive tokens to component properties
            const componentTokenMappings = {
              button: {
                id: 'button',
                name: 'Button',
                properties: [
                  { id: 'bg', name: 'Background', cssProperty: 'background',
                    semanticToken: 'action/primary', primitiveToken: 'color/brand/primary',
                    value: { light: '#DA0E29', dark: '#FF4D6A' } },
                  { id: 'text', name: 'Text Color', cssProperty: 'color',
                    semanticToken: 'text/on-action', primitiveToken: 'color/text/inverse',
                    value: { light: '#FFFFFF', dark: '#FFFFFF' } },
                  { id: 'radius', name: 'Border Radius', cssProperty: 'borderRadius',
                    semanticToken: null, primitiveToken: 'sizing/radius/md',
                    value: { light: '8px', dark: '8px' } },
                  { id: 'padding-x', name: 'Padding X', cssProperty: 'paddingInline',
                    semanticToken: null, primitiveToken: 'spacing/4',
                    value: { light: '16px', dark: '16px' } },
                  { id: 'padding-y', name: 'Padding Y', cssProperty: 'paddingBlock',
                    semanticToken: null, primitiveToken: 'spacing/3',
                    value: { light: '12px', dark: '12px' } },
                  { id: 'font-size', name: 'Font Size', cssProperty: 'fontSize',
                    semanticToken: null, primitiveToken: 'typography/font-size/sm',
                    value: { light: '14px', dark: '14px' } },
                  { id: 'font-weight', name: 'Font Weight', cssProperty: 'fontWeight',
                    semanticToken: null, primitiveToken: 'typography/font-weight/medium',
                    value: { light: '500', dark: '500' } },
                  { id: 'shadow', name: 'Box Shadow', cssProperty: 'boxShadow',
                    semanticToken: null, primitiveToken: 'effect/shadow/sm',
                    value: { light: '0 1px 2px rgba(0,0,0,0.05)', dark: '0 1px 2px rgba(0,0,0,0.3)' } },
                ]
              },
              card: {
                id: 'card',
                name: 'Card',
                properties: [
                  { id: 'bg', name: 'Background', cssProperty: 'background',
                    semanticToken: 'bg/elevated', primitiveToken: 'color/surface/elevated',
                    value: { light: '#FFFFFF', dark: '#252525' } },
                  { id: 'border', name: 'Border', cssProperty: 'borderColor',
                    semanticToken: 'border/subtle', primitiveToken: 'color/border/subtle',
                    value: { light: '#F0F0F0', dark: '#1A1A1A' } },
                  { id: 'radius', name: 'Border Radius', cssProperty: 'borderRadius',
                    semanticToken: null, primitiveToken: 'sizing/radius/lg',
                    value: { light: '12px', dark: '12px' } },
                  { id: 'padding', name: 'Padding', cssProperty: 'padding',
                    semanticToken: null, primitiveToken: 'spacing/6',
                    value: { light: '24px', dark: '24px' } },
                  { id: 'shadow', name: 'Box Shadow', cssProperty: 'boxShadow',
                    semanticToken: null, primitiveToken: 'effect/shadow/md',
                    value: { light: '0 4px 6px rgba(0,0,0,0.07)', dark: '0 4px 6px rgba(0,0,0,0.4)' } },
                  { id: 'title-color', name: 'Title Color', cssProperty: 'color',
                    semanticToken: 'text/primary', primitiveToken: 'color/text/primary',
                    value: { light: '#0A0A0A', dark: '#FFFFFF' } },
                  { id: 'desc-color', name: 'Description', cssProperty: 'color',
                    semanticToken: 'text/secondary', primitiveToken: 'color/text/secondary',
                    value: { light: '#525252', dark: '#A1A1AA' } },
                ]
              }
            } as const;

            type ComponentId = keyof typeof componentTokenMappings;

            // Helper function to get total token count for a collection
            const getCollectionTokenCount = (collectionId: string) => {
              const collection = figmaTokenData[collectionId as keyof typeof figmaTokenData];
              if (!collection) return 0;
              return collection.categories.reduce((catAcc, cat) =>
                catAcc + cat.groups.reduce((grpAcc, grp) => grpAcc + grp.tokens.length, 0), 0
              );
            };

            // Helper function to get category token count
            const getCategoryTokenCount = (collectionId: string, categoryId: string) => {
              const collection = figmaTokenData[collectionId as keyof typeof figmaTokenData];
              if (!collection) return 0;
              const category = collection.categories.find(c => c.id === categoryId);
              if (!category) return 0;
              return category.groups.reduce((acc, grp) => acc + grp.tokens.length, 0);
            };

            // Helper to check if value is a color
            const isColorValue = (value: string) => value.startsWith('#') || value.startsWith('rgba') || value.startsWith('rgb');

            // Handle token row click - connects to component preview
            const handleTokenRowClick = (tokenName: string) => {
              // Check if this token maps to current preview component
              const component = componentTokenMappings[figmaPreviewComponent];
              const matchingProp = component.properties.find(
                p => p.primitiveToken === tokenName ||
                     p.primitiveToken.endsWith('/' + tokenName.split('/').pop()) ||
                     p.semanticToken === tokenName
              );

              if (matchingProp && figmaPreviewMode) {
                // Animate: pulse token row → highlight component property
                setFigmaPulsingRow(tokenName);
                setTimeout(() => {
                  setFigmaHighlightedProperty(matchingProp.id);
                }, 300);
                setTimeout(() => {
                  setFigmaPulsingRow(null);
                  setFigmaHighlightedProperty(null);
                }, 1800);
              } else {
                // Normal row selection toggle
                setFigmaSelectedRows(prev => {
                  const next = new Set(prev);
                  if (next.has(tokenName)) next.delete(tokenName);
                  else next.add(tokenName);
                  return next;
                });
              }
            };

            // Helper to render type icon
            const renderTypeIcon = (type: string, colorValue?: string) => {
              if (type === 'color' && colorValue) {
                return (
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '3px',
                    background: colorValue,
                    border: '1px solid rgba(255,255,255,0.15)',
                    flexShrink: 0,
                  }} />
                );
              }
              if (type === 'number' || type === 'dimension') {
                return (
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '3px',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '9px', fontWeight: 600, color: FIGMA.textSecondary }}>#</span>
                  </div>
                );
              }
              if (type === 'string') {
                return (
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '3px',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '9px', fontWeight: 600, color: FIGMA.textSecondary }}>T</span>
                  </div>
                );
              }
              return null;
            };

            // Helper to render category icon
            const renderCategoryIcon = (icon: string) => {
              if (icon === 'circle') {
                return (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #DA0E29, #6366F1, #0D99FF)',
                    flexShrink: 0,
                  }} />
                );
              }
              if (icon === 'text') {
                return (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: FIGMA.textSecondary }}>T</span>
                  </div>
                );
              }
              if (icon === 'spacing') {
                return (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                    flexShrink: 0,
                  }}>
                    <div style={{ width: '2px', height: '8px', background: FIGMA.textSecondary, borderRadius: '1px' }} />
                    <div style={{ width: '2px', height: '8px', background: FIGMA.textSecondary, borderRadius: '1px' }} />
                  </div>
                );
              }
              return (
                <div style={{
                  width: '12px',
                  height: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: FIGMA.textSecondary }}>#</span>
                </div>
              );
            };

            // Filter tokens by search query
            const filterTokensBySearch = (tokens: typeof figmaTokenData.primitives.categories[0]['groups'][0]['tokens']) => {
              if (!figmaSearchQuery.trim()) return tokens;
              const query = figmaSearchQuery.toLowerCase();
              return tokens.filter(t => t.name.toLowerCase().includes(query));
            };

            // Play cascade animation handler
            const playCascadeAnimation = () => {
              if (figmaCascadePhase === 'playing') return;
              setFigmaCascadePhase('playing');
              setFigmaPreviewMode(false);
              setFigmaHighlightedProperty(null);

              // === PHASE 1: PRIMITIVES (0-4200ms) ===

              // Step 1: Expand color category
              setFigmaExpandedCategories(new Set(['color']));
              setTimeout(() => {
                setFigmaExpandedGroups(new Set(['color/brand']));
                setFigmaHighlightedGroup('color/brand');
              }, 200);

              // Step 2: Pulse through brand tokens
              setTimeout(() => setFigmaPulsingRow('color/brand/primary'), 400);
              setTimeout(() => setFigmaPulsingRow('color/brand/secondary'), 700);
              setTimeout(() => setFigmaPulsingRow('color/brand/accent'), 1000);

              // Step 3: Expand text group
              setTimeout(() => {
                setFigmaPulsingRow(null);
                setFigmaExpandedGroups(prev => new Set([...prev, 'color/text']));
                setFigmaHighlightedGroup('color/text');
              }, 1300);

              // Step 4: Pulse text tokens
              setTimeout(() => setFigmaPulsingRow('color/text/primary'), 1500);
              setTimeout(() => setFigmaPulsingRow('color/text/secondary'), 1800);

              // Step 5: Switch to Typography
              setTimeout(() => {
                setFigmaPulsingRow(null);
                setFigmaExpandedCategories(prev => new Set([...prev, 'typography']));
                setFigmaHighlightedGroup('typography');
              }, 2200);

              // Step 6: Expand font-size
              setTimeout(() => {
                setFigmaExpandedGroups(prev => new Set([...prev, 'typography/font-size']));
                setFigmaHighlightedGroup('typography/font-size');
              }, 2500);

              // Step 7: Pulse typography tokens
              setTimeout(() => setFigmaPulsingRow('typography/font-size/md'), 2700);
              setTimeout(() => setFigmaPulsingRow('typography/font-size/lg'), 3000);

              // Step 8: Switch to Spacing
              setTimeout(() => {
                setFigmaPulsingRow(null);
                setFigmaExpandedCategories(prev => new Set([...prev, 'spacing']));
                setFigmaExpandedGroups(prev => new Set([...prev, 'spacing/scale']));
                setFigmaHighlightedGroup('spacing/scale');
              }, 3400);

              // Step 9: Pulse spacing tokens
              setTimeout(() => setFigmaPulsingRow('spacing/4'), 3600);
              setTimeout(() => setFigmaPulsingRow('spacing/8'), 3900);

              // Step 10: Clear primitives highlighting
              setTimeout(() => {
                setFigmaPulsingRow(null);
                setFigmaHighlightedGroup(null);
              }, 4200);

              // === PHASE 2: SEMANTICS (4300-5400ms) ===

              // Step 11: Switch to Semantics collection
              setTimeout(() => {
                setFigmaSelectedCollection('semantics');
                setFigmaExpandedCollections(new Set(['semantics']));
              }, 4300);

              // Step 12: Pulse action/primary
              setTimeout(() => setFigmaPulsingRow('action/primary'), 4700);

              // Step 13: Pulse action/primary-hover
              setTimeout(() => setFigmaPulsingRow('action/primary-hover'), 5100);

              // === PHASE 3: COMPONENT PREVIEW (5500-8000ms) ===

              // Step 14: Activate Preview Panel with Button
              setTimeout(() => {
                setFigmaPulsingRow(null);
                setFigmaPreviewMode(true);
                setFigmaPreviewComponent('button');
              }, 5500);

              // Step 15: Highlight button properties sequentially
              setTimeout(() => setFigmaHighlightedProperty('bg'), 5900);
              setTimeout(() => setFigmaHighlightedProperty('text'), 6300);
              setTimeout(() => setFigmaHighlightedProperty('radius'), 6700);
              setTimeout(() => setFigmaHighlightedProperty('padding-x'), 7100);

              // Step 16: Switch to Card preview
              setTimeout(() => {
                setFigmaHighlightedProperty(null);
                setFigmaPreviewComponent('card');
                setFigmaHighlightedProperty('bg');
              }, 7500);

              // Step 17: Complete
              setTimeout(() => {
                setFigmaHighlightedProperty(null);
                setFigmaCascadePhase('complete');
              }, 8000);

              // Reset to idle after showing complete state
              setTimeout(() => {
                setFigmaCascadePhase('idle');
              }, 9500);
            };

            const renderDesignSystemDemo = () => (
              <div style={{
                width: '100%',
                maxWidth: '1000px',
                margin: '0 auto',
                borderRadius: '8px',
                overflow: 'hidden',
                background: FIGMA.bgSecondary,
                border: `1px solid ${FIGMA.border}`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}>
                {/* Panel Header */}
                <div style={{
                  background: FIGMA.bg,
                  padding: '10px 12px',
                  borderBottom: `1px solid ${FIGMA.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  {/* Left: Traffic lights + Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* macOS Traffic Lights */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
                    </div>

                    {/* Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        background: FIGMA.brand,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{ fontSize: '11px', color: 'white', fontWeight: 700 }}>V</span>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: FIGMA.textPrimary }}>
                        Local Variables
                      </span>
                      {figmaCascadePhase === 'complete' && (
                        <span style={{ fontSize: '11px', color: FIGMA.success }}>✓</span>
                      )}
                    </div>
                  </div>

                  {/* Right: Search + Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Search Input */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: FIGMA.bgInput,
                      borderRadius: '6px',
                      padding: '5px 10px',
                      border: `1px solid ${FIGMA.border}`,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.5 }}>
                        <path d="M7 13A6 6 0 107 1a6 6 0 000 12zM15 15l-3.5-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={figmaSearchQuery}
                        onChange={(e) => setFigmaSearchQuery(e.target.value)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          fontSize: '11px',
                          color: FIGMA.textPrimary,
                          width: '100px',
                        }}
                      />
                    </div>

                    {/* Add Variable Button */}
                    <button style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      background: FIGMA.brand,
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}>
                      <span style={{ fontSize: '16px', color: 'white', lineHeight: 1 }}>+</span>
                    </button>

                    {/* Play Cascade */}
                    <button
                      onClick={playCascadeAnimation}
                      disabled={figmaCascadePhase === 'playing'}
                      style={{
                        height: '24px',
                        borderRadius: '4px',
                        background: figmaCascadePhase === 'playing' ? FIGMA.bgInput : 'rgba(99,102,241,0.9)',
                        border: 'none',
                        padding: '0 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: figmaCascadePhase === 'playing' ? 'not-allowed' : 'pointer',
                        opacity: figmaCascadePhase === 'playing' ? 0.7 : 1,
                      }}
                    >
                      {figmaCascadePhase === 'playing' ? (
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          border: '2px solid rgba(255,255,255,0.2)',
                          borderTopColor: 'white',
                          animation: 'spin 0.8s linear infinite',
                        }} />
                      ) : (
                        <span style={{ fontSize: '10px', color: 'white' }}>▶</span>
                      )}
                      <span style={{ fontSize: '10px', color: 'white', fontWeight: 500 }}>
                        {figmaCascadePhase === 'playing' ? 'Playing' : 'Demo'}
                      </span>
                    </button>

                    {/* Preview Toggle */}
                    <button
                      onClick={() => setFigmaPreviewMode(!figmaPreviewMode)}
                      style={{
                        height: '24px',
                        padding: '0 10px',
                        borderRadius: '4px',
                        border: 'none',
                        background: figmaPreviewMode ? 'rgba(13,153,255,0.15)' : FIGMA.bgInput,
                        color: figmaPreviewMode ? '#0D99FF' : FIGMA.textSecondary,
                        fontSize: '10px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 3a5 5 0 100 10A5 5 0 008 3zm0 1a4 4 0 110 8 4 4 0 010-8z"/>
                        <circle cx="8" cy="8" r="2"/>
                      </svg>
                      Preview
                    </button>
                  </div>
                </div>

                {/* Main Content: Sidebar + Table + Preview */}
                <div style={{ display: 'flex', minHeight: '400px' }}>
                  {/* Sidebar */}
                  {!isMobile && (
                    <div style={{
                      width: '200px',
                      background: FIGMA.bgTertiary,
                      borderRight: `1px solid ${FIGMA.border}`,
                      padding: '12px 0',
                      flexShrink: 0,
                    }}>
                      {/* Collections Header */}
                      <div style={{
                        padding: '0 12px 8px',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: FIGMA.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        Collections
                      </div>

                      {/* Collection Items */}
                      {Object.values(figmaTokenData).map((collection) => (
                        <div key={collection.id}>
                          {/* Collection Row */}
                          <div
                            onClick={() => {
                              setFigmaSelectedCollection(collection.id);
                              setFigmaExpandedCollections(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(collection.id)) newSet.delete(collection.id);
                                else newSet.add(collection.id);
                                return newSet;
                              });
                            }}
                            onMouseEnter={() => setFigmaHoveredSidebarItem(collection.id)}
                            onMouseLeave={() => setFigmaHoveredSidebarItem(null)}
                            style={{
                              padding: '6px 12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              cursor: 'pointer',
                              background: figmaSelectedCollection === collection.id ? FIGMA.selected :
                                         figmaHoveredSidebarItem === collection.id ? FIGMA.hover : 'transparent',
                              transition: 'background 0.1s ease',
                            }}
                          >
                            <span style={{ fontSize: '8px', color: FIGMA.textMuted }}>
                              {figmaExpandedCollections.has(collection.id) ? '▼' : '▶'}
                            </span>
                            <span style={{ fontSize: '11px', fontWeight: 500, color: FIGMA.textPrimary, flex: 1 }}>
                              {collection.name}
                            </span>
                            <span style={{ fontSize: '10px', color: FIGMA.textMuted }}>
                              {getCollectionTokenCount(collection.id)}
                            </span>
                          </div>

                          {/* Category Items (when expanded) */}
                          {figmaExpandedCollections.has(collection.id) && collection.categories.map((category) => (
                            <div
                              key={category.id}
                              onClick={() => setFigmaExpandedCategories(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(category.id)) newSet.delete(category.id);
                                else newSet.add(category.id);
                                return newSet;
                              })}
                              onMouseEnter={() => setFigmaHoveredSidebarItem(category.id)}
                              onMouseLeave={() => setFigmaHoveredSidebarItem(null)}
                              style={{
                                padding: '5px 12px 5px 28px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                cursor: 'pointer',
                                background: figmaHoveredSidebarItem === category.id ? FIGMA.hover : 'transparent',
                              }}
                            >
                              {renderCategoryIcon(category.icon)}
                              <span style={{ fontSize: '11px', color: FIGMA.textSecondary }}>
                                {category.displayName}
                              </span>
                              <span style={{ fontSize: '9px', color: FIGMA.textDisabled, marginLeft: 'auto' }}>
                                {getCategoryTokenCount(collection.id, category.id)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}

                      {/* New Collection Button */}
                      <div style={{
                        padding: '12px',
                        marginTop: '8px',
                        borderTop: `1px solid ${FIGMA.border}`,
                      }}>
                        <button style={{
                          width: '100%',
                          padding: '6px',
                          borderRadius: '4px',
                          border: `1px dashed ${FIGMA.border}`,
                          background: 'transparent',
                          color: FIGMA.textMuted,
                          fontSize: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                        }}>
                          <span>+</span>
                          <span>New collection</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Table Area */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Table Header */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr 80px 80px' : '1fr 120px 120px 32px',
                      padding: '8px 12px',
                      borderBottom: `1px solid ${FIGMA.border}`,
                      background: FIGMA.bg,
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                    }}>
                      <span style={{ fontSize: '10px', fontWeight: 500, color: FIGMA.textMuted }}>Name</span>
                      <span style={{ fontSize: '10px', fontWeight: 500, color: FIGMA.textMuted, textAlign: 'center' }}>Light</span>
                      <span style={{ fontSize: '10px', fontWeight: 500, color: FIGMA.textMuted, textAlign: 'center' }}>Dark</span>
                      {!isMobile && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <button style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '3px',
                            border: `1px solid ${FIGMA.border}`,
                            background: 'transparent',
                            color: FIGMA.textMuted,
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>+</button>
                        </div>
                      )}
                    </div>

                    {/* Table Body - Scrollable */}
                    <div style={{ flex: 1, overflowY: 'auto', maxHeight: '350px' }}>
                      {figmaTokenData[figmaSelectedCollection as keyof typeof figmaTokenData]?.categories.map((category) => (
                        <div key={category.id}>
                          {/* Category Row */}
                          <div
                            onClick={() => setFigmaExpandedCategories(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(category.id)) newSet.delete(category.id);
                              else newSet.add(category.id);
                              return newSet;
                            })}
                            style={{
                              padding: '8px 12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              background: figmaHighlightedGroup === category.id ? FIGMA.brandSubtle : 'transparent',
                              borderBottom: `1px solid ${FIGMA.borderSubtle}`,
                              transition: 'background 0.15s ease',
                            }}
                          >
                            <span style={{ fontSize: '8px', color: FIGMA.textMuted }}>
                              {figmaExpandedCategories.has(category.id) ? '▼' : '▶'}
                            </span>
                            {renderCategoryIcon(category.icon)}
                            <span style={{ fontSize: '11px', fontWeight: 600, color: FIGMA.textPrimary }}>
                              {category.displayName}
                            </span>
                            <span style={{ fontSize: '10px', color: FIGMA.textMuted }}>
                              {getCategoryTokenCount(figmaSelectedCollection, category.id)}
                            </span>
                          </div>

                          {/* Groups (when category expanded) */}
                          {figmaExpandedCategories.has(category.id) && category.groups.map((group) => {
                            const filteredTokens = filterTokensBySearch(group.tokens);
                            if (figmaSearchQuery && filteredTokens.length === 0) return null;

                            return (
                              <div key={group.id}>
                                {/* Group Row */}
                                <div
                                  onClick={() => setFigmaExpandedGroups(prev => {
                                    const groupKey = `${category.id}/${group.id}`;
                                    const newSet = new Set(prev);
                                    if (newSet.has(groupKey)) newSet.delete(groupKey);
                                    else newSet.add(groupKey);
                                    return newSet;
                                  })}
                                  style={{
                                    padding: '6px 12px 6px 32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    cursor: 'pointer',
                                    background: figmaHighlightedGroup === `${category.id}/${group.id}` ? FIGMA.brandSubtle : 'transparent',
                                    borderBottom: `1px solid ${FIGMA.borderSubtle}`,
                                    transition: 'background 0.15s ease',
                                  }}
                                >
                                  <span style={{ fontSize: '7px', color: FIGMA.textDisabled }}>
                                    {figmaExpandedGroups.has(`${category.id}/${group.id}`) ? '▼' : '▶'}
                                  </span>
                                  <span style={{ fontSize: '11px', fontWeight: 500, color: FIGMA.textSecondary }}>
                                    {group.displayName}
                                  </span>
                                  <span style={{ fontSize: '9px', color: FIGMA.textDisabled }}>
                                    {filteredTokens.length}
                                  </span>
                                </div>

                                {/* Token Rows (when group expanded) */}
                                {figmaExpandedGroups.has(`${category.id}/${group.id}`) && filteredTokens.map((token) => (
                                  <div
                                    key={token.name}
                                    onMouseEnter={() => setFigmaHoveredRow(token.name)}
                                    onMouseLeave={() => setFigmaHoveredRow(null)}
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: isMobile ? '1fr 80px 80px' : '1fr 120px 120px 32px',
                                      padding: '6px 12px 6px 52px',
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      background: figmaPulsingRow === token.name ? FIGMA.brandSubtle :
                                                 figmaHoveredRow === token.name ? FIGMA.hover : 'transparent',
                                      borderBottom: `1px solid ${FIGMA.borderSubtle}`,
                                      transition: 'background 0.1s ease',
                                      animation: figmaPulsingRow === token.name ? 'rowPulse 0.5s ease' : 'none',
                                    }}
                                  >
                                    {/* Token Name with Type Icon */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                                      {renderTypeIcon(token.type, token.type === 'color' ? token.dark : undefined)}
                                      <span style={{
                                        fontSize: '11px',
                                        color: FIGMA.textSecondary,
                                        fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                      }}>
                                        {token.name}
                                      </span>
                                      {/* Alias indicator for semantic tokens */}
                                      {(token as { alias?: string }).alias && (
                                        <span style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '4px',
                                          fontSize: '10px',
                                          color: FIGMA.textMuted,
                                          fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                                          flexShrink: 0,
                                        }}>
                                          <span style={{ color: FIGMA.brand }}>→</span>
                                          <span style={{
                                            opacity: 0.7,
                                            maxWidth: isMobile ? '80px' : '140px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                          }}>
                                            {(token as { alias?: string }).alias}
                                          </span>
                                        </span>
                                      )}
                                    </div>

                                    {/* Light Value */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                                      {isColorValue(token.light) ? (
                                        <>
                                          <div style={{
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '4px',
                                            background: token.light,
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            flexShrink: 0,
                                          }} />
                                          {!isMobile && (
                                            <span style={{ fontSize: '9px', color: FIGMA.textMuted, fontFamily: 'monospace' }}>
                                              {token.light.length <= 7 ? token.light : ''}
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        <span style={{ fontSize: '10px', color: FIGMA.textMuted }}>
                                          {token.light}
                                        </span>
                                      )}
                                    </div>

                                    {/* Dark Value */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                                      {isColorValue(token.dark) ? (
                                        <>
                                          <div style={{
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '4px',
                                            background: token.dark,
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            flexShrink: 0,
                                          }} />
                                          {!isMobile && (
                                            <span style={{ fontSize: '9px', color: FIGMA.textMuted, fontFamily: 'monospace' }}>
                                              {token.dark.length <= 7 ? token.dark : ''}
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        <span style={{ fontSize: '10px', color: FIGMA.textMuted }}>
                                          {token.dark}
                                        </span>
                                      )}
                                    </div>

                                    {/* Context Menu */}
                                    {!isMobile && (
                                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <span style={{
                                          fontSize: '12px',
                                          color: FIGMA.textDisabled,
                                          opacity: figmaHoveredRow === token.name ? 1 : 0,
                                          transition: 'opacity 0.1s ease',
                                        }}>⋯</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Table Footer */}
                    <div style={{
                      padding: '8px 12px',
                      borderTop: `1px solid ${FIGMA.border}`,
                      background: FIGMA.bg,
                    }}>
                      <button style={{
                        width: '100%',
                        padding: '6px',
                        borderRadius: '4px',
                        border: 'none',
                        background: FIGMA.brand,
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                      }}>
                        <span>+</span>
                        <span>Create variable</span>
                      </button>
                    </div>
                  </div>

                  {/* Preview Panel - slides in from right */}
                  <div style={{
                    width: figmaPreviewMode ? '280px' : '0px',
                    overflow: 'hidden',
                    background: '#1E1E1E',
                    borderLeft: figmaPreviewMode ? `1px solid ${FIGMA.border}` : 'none',
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    flexShrink: 0,
                  }}>
                    {/* Header with component tabs */}
                    <div style={{
                      padding: '8px 12px',
                      borderBottom: `1px solid ${FIGMA.border}`,
                      background: FIGMA.bgSecondary,
                    }}>
                      <div style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: FIGMA.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '8px',
                      }}>
                        Component Preview
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {(['button', 'card'] as const).map((comp) => (
                          <button
                            key={comp}
                            onClick={() => setFigmaPreviewComponent(comp)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: 'none',
                              background: figmaPreviewComponent === comp ? 'rgba(13,153,255,0.15)' : 'transparent',
                              color: figmaPreviewComponent === comp ? '#0D99FF' : FIGMA.textSecondary,
                              fontSize: '10px',
                              fontWeight: 500,
                              cursor: 'pointer',
                              textTransform: 'capitalize',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {comp}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preview Area */}
                    <div style={{
                      flex: 1,
                      padding: '24px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#1A1A1A',
                      minHeight: '160px',
                    }}>
                      {figmaPreviewComponent === 'button' ? (
                        /* Preview Button */
                        <div style={{ position: 'relative' }}>
                          {figmaHighlightedProperty && (
                            <div style={{
                              position: 'absolute',
                              inset: '-6px',
                              borderRadius: '12px',
                              border: '2px dashed #0D99FF',
                              pointerEvents: 'none',
                              animation: 'pulse 1s ease infinite',
                            }} />
                          )}
                          <button style={{
                            background: componentTokenMappings.button.properties.find(p => p.id === 'bg')?.value.dark || '#DA0E29',
                            color: componentTokenMappings.button.properties.find(p => p.id === 'text')?.value.dark || '#FFFFFF',
                            padding: '12px 16px',
                            borderRadius: componentTokenMappings.button.properties.find(p => p.id === 'radius')?.value.dark || '8px',
                            fontSize: '14px',
                            fontWeight: 500,
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                          }}>
                            Primary Button
                          </button>
                          {figmaHighlightedProperty && (
                            <div style={{
                              position: 'absolute',
                              bottom: '-24px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              padding: '2px 8px',
                              background: '#0D99FF',
                              color: 'white',
                              fontSize: '9px',
                              borderRadius: '3px',
                              whiteSpace: 'nowrap',
                              fontWeight: 500,
                            }}>
                              {componentTokenMappings.button.properties.find(p => p.id === figmaHighlightedProperty)?.name || figmaHighlightedProperty}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Preview Card */
                        <div style={{ position: 'relative', width: '200px' }}>
                          {figmaHighlightedProperty && (
                            <div style={{
                              position: 'absolute',
                              inset: '-6px',
                              borderRadius: '16px',
                              border: '2px dashed #0D99FF',
                              pointerEvents: 'none',
                            }} />
                          )}
                          <div style={{
                            background: componentTokenMappings.card.properties.find(p => p.id === 'bg')?.value.dark || '#252525',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.4)',
                            border: `1px solid ${componentTokenMappings.card.properties.find(p => p.id === 'border')?.value.dark || '#1A1A1A'}`,
                            overflow: 'hidden',
                          }}>
                            <div style={{
                              padding: '12px 14px',
                              borderBottom: `1px solid ${componentTokenMappings.card.properties.find(p => p.id === 'border')?.value.dark || '#1A1A1A'}`,
                            }}>
                              <div style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: componentTokenMappings.card.properties.find(p => p.id === 'title-color')?.value.dark || '#FFFFFF',
                              }}>
                                Card Title
                              </div>
                            </div>
                            <div style={{ padding: '16px 14px' }}>
                              <p style={{
                                fontSize: '11px',
                                color: componentTokenMappings.card.properties.find(p => p.id === 'desc-color')?.value.dark || '#A1A1AA',
                                margin: 0,
                                lineHeight: 1.5,
                              }}>
                                Sample card component with design tokens.
                              </p>
                            </div>
                          </div>
                          {figmaHighlightedProperty && (
                            <div style={{
                              position: 'absolute',
                              bottom: '-24px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              padding: '2px 8px',
                              background: '#0D99FF',
                              color: 'white',
                              fontSize: '9px',
                              borderRadius: '3px',
                              whiteSpace: 'nowrap',
                              fontWeight: 500,
                            }}>
                              {componentTokenMappings.card.properties.find(p => p.id === figmaHighlightedProperty)?.name || figmaHighlightedProperty}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Property List */}
                    <div style={{
                      maxHeight: '180px',
                      overflow: 'auto',
                      borderTop: `1px solid ${FIGMA.border}`,
                    }}>
                      {componentTokenMappings[figmaPreviewComponent].properties.map((prop) => (
                        <div
                          key={prop.id}
                          onClick={() => {
                            setFigmaHighlightedProperty(prop.id);
                            setTimeout(() => setFigmaHighlightedProperty(null), 1500);
                          }}
                          style={{
                            padding: '6px 12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: `1px solid ${FIGMA.border}`,
                            background: figmaHighlightedProperty === prop.id ? 'rgba(13,153,255,0.15)' : 'transparent',
                            cursor: 'pointer',
                            transition: 'background 0.15s ease',
                          }}
                        >
                          <span style={{
                            fontSize: '10px',
                            color: figmaHighlightedProperty === prop.id ? '#0D99FF' : FIGMA.textSecondary,
                            fontWeight: figmaHighlightedProperty === prop.id ? 500 : 400,
                          }}>
                            {prop.name}
                          </span>
                          <span style={{
                            fontSize: '9px',
                            color: FIGMA.textMuted,
                            fontFamily: 'monospace',
                          }}>
                            {prop.primitiveToken.split('/').pop()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Play Button - cycles through properties */}
                    <div style={{
                      padding: '8px 12px',
                      borderTop: `1px solid ${FIGMA.border}`,
                      background: FIGMA.bgSecondary,
                    }}>
                      <button
                        onClick={() => {
                          const properties = componentTokenMappings[figmaPreviewComponent].properties;
                          let index = 0;
                          const interval = setInterval(() => {
                            if (index < properties.length) {
                              setFigmaHighlightedProperty(properties[index].id);
                              index++;
                            } else {
                              clearInterval(interval);
                              setTimeout(() => setFigmaHighlightedProperty(null), 500);
                            }
                          }, 400);
                        }}
                        style={{
                          width: '100%',
                          padding: '6px',
                          borderRadius: '4px',
                          border: 'none',
                          background: 'rgba(99,102,241,0.9)',
                          color: 'white',
                          fontSize: '10px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>▶</span>
                        <span>Play All Properties</span>
                      </button>
                    </div>
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
                    padding: isMobile ? '6rem 1.5rem' : 'clamp(6rem, 10vh, 8rem) clamp(3rem, 5vw, 5rem)',
                    overflow: 'visible',
                  }}
                >
                  {/* Background Gradient - Always rendered, opacity controlled */}
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(ellipse at ${index % 2 === 0 ? '70%' : '30%'} 50%, rgba(${project.color}, 0.12), rgba(${project.color}, 0.04) 40%, transparent 70%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
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
                        {project.longDescription?.split('\n\n')[0]}
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
                        margin: '5rem auto 0',
                        padding: '0 1rem',
                      }}
                    >
                      {index === 0 ? renderDesignSystemDemo() : renderPixelRadarDemo()}

                      {/* Pixel Radar Featured Section */}
                      {index === 1 && (
                        <div style={{
                          marginTop: '2rem',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '1.5rem',
                          maxWidth: '680px',
                          margin: '2rem auto 0',
                          padding: '1.25rem',
                          background: 'var(--glass-04)',
                          border: '1px solid var(--glass-10)',
                          borderRadius: '16px',
                          backdropFilter: 'blur(20px)',
                        }}>
                          {/* Left: Image */}
                          <img
                            src="/images/pixel-radar-author.jpeg"
                            alt="Pixel Radar Featured in Magazine"
                            style={{
                              width: '200px',
                              height: '200px',
                              objectFit: 'cover',
                              borderRadius: '12px',
                              border: '1px solid var(--glass-10)',
                              flexShrink: 0,
                            }}
                          />
                          {/* Right: Text */}
                          <div style={{ flex: 1 }}>
                            <p style={{
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: `rgb(${brandRgb})`,
                              marginBottom: '0.5rem',
                            }}>
                              Featured in Magazine
                            </p>
                            <p style={{
                              fontSize: '0.875rem',
                              color: 'var(--text-60)',
                              lineHeight: 1.6,
                              margin: 0,
                            }}>
                              The Pixel Radar Figma plugin was recognized and featured in our internal design magazine for its contribution to maintaining visual consistency across Air India's digital products.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* External Play Button - Air India branded glassmorphism style */}
                      {index === 0 && (
                        <div style={{
                          marginTop: '2rem',
                          display: 'flex',
                          justifyContent: 'center',
                        }}>
                          <button
                            onClick={playCascadeAnimation}
                            disabled={figmaCascadePhase === 'playing'}
                            style={{
                              padding: '14px 28px',
                              borderRadius: '14px',
                              background: figmaCascadePhase === 'playing'
                                ? 'var(--glass-08)'
                                : `linear-gradient(135deg, rgba(${brandRgb}, 0.12), var(--glass-08))`,
                              border: `1px solid rgba(${brandRgb}, 0.25)`,
                              backdropFilter: 'blur(20px)',
                              WebkitBackdropFilter: 'blur(20px)',
                              color: figmaCascadePhase === 'playing' ? 'var(--text-40)' : 'var(--text-80)',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              letterSpacing: '0.02em',
                              cursor: figmaCascadePhase === 'playing' ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                              opacity: figmaCascadePhase === 'playing' ? 0.7 : 1,
                              boxShadow: figmaCascadePhase === 'playing'
                                ? 'none'
                                : `0 8px 32px rgba(${brandRgb}, 0.12)`,
                            }}
                          >
                            {figmaCascadePhase === 'playing' ? (
                              <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                border: '2px solid var(--text-20)',
                                borderTopColor: `rgb(${brandRgb})`,
                                animation: 'spin 0.8s linear infinite',
                              }} />
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M4 2.5v11l9-5.5L4 2.5z"/>
                              </svg>
                            )}
                            <span>{figmaCascadePhase === 'playing' ? 'Running Demo...' : 'Play Token Cascade'}</span>
                          </button>
                        </div>
                      )}

                      {/* Token Architecture Visualization - 4-Tier Hierarchy (Interactive) */}
                      {index === 0 && (
                        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                          {/* Section Label */}
                          <div style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'var(--text-40)',
                            textAlign: 'center',
                            marginBottom: '0.5rem',
                          }}>
                            Design Token Architecture
                          </div>

                          {/* Click hint */}
                          <div style={{
                            fontSize: '0.65rem',
                            color: 'var(--text-30)',
                            textAlign: 'center',
                            marginBottom: '0.5rem',
                          }}>
                            Click cards to explore token details
                          </div>

                          {/* ====== TIER 1: FOUNDATIONS ====== */}
                          <div
                            style={{
                              background: figmaCascadePhase === 'playing' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.08), var(--glass-04))` : 'var(--glass-04)',
                              border: figmaCascadePhase === 'playing' ? `1px solid rgba(${brandRgb}, 0.3)` : '1px solid var(--glass-10)',
                              borderRadius: '16px',
                              padding: '1rem 1.25rem',
                              backdropFilter: 'blur(20px)',
                              transition: 'all 0.4s ease',
                            }}
                          >
                            {/* Tier Label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: `rgba(${brandRgb}, 0.15)`,
                                border: `1px solid rgba(${brandRgb}, 0.3)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: `rgb(${brandRgb})`,
                              }}>1</div>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                color: 'var(--text-60)',
                                textTransform: 'uppercase',
                              }}>Foundations</span>
                              <span style={{
                                fontSize: '0.6rem',
                                color: 'var(--text-30)',
                                marginLeft: 'auto',
                              }}>Base values & raw colors</span>
                            </div>

                            {/* Token Cards */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {/* Unit Tokens Card */}
                              <motion.div
                                onClick={() => setExpandedTokenCard(expandedTokenCard === 'unit-tokens' ? null : 'unit-tokens')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                  background: expandedTokenCard === 'unit-tokens' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.12), var(--glass-08))` : 'var(--glass-06)',
                                  border: expandedTokenCard === 'unit-tokens' ? `1px solid rgba(${brandRgb}, 0.3)` : '1px solid var(--glass-12)',
                                  borderRadius: '12px',
                                  padding: '0.75rem 1rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  flex: expandedTokenCard === 'unit-tokens' ? '1 1 100%' : '0 0 auto',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-85)' }}>Unit Tokens</span>
                                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ transform: expandedTokenCard === 'unit-tokens' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                    <path d="M2 4L6 8L10 4" stroke="var(--text-40)" strokeWidth="1.5" fill="none" />
                                  </svg>
                                </div>
                                {expandedTokenCard === 'unit-tokens' && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--glass-10)' }}
                                  >
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-50)', marginBottom: '0.5rem' }}>
                                      Quantum measurement unit establishing absolute dimensional scale
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                                      <div style={{ background: 'var(--glass-04)', padding: '0.5rem', borderRadius: '8px' }}>
                                        <div style={{ fontSize: '0.6rem', color: 'var(--text-40)', marginBottom: '0.25rem' }}>Micro</div>
                                        <div style={{ fontSize: '0.7rem', color: `rgb(${brandRgb})`, fontFamily: 'monospace' }}>0-2px</div>
                                        <div style={{ fontSize: '0.55rem', color: 'var(--text-35)' }}>borders, hairlines</div>
                                      </div>
                                      <div style={{ background: 'var(--glass-04)', padding: '0.5rem', borderRadius: '8px' }}>
                                        <div style={{ fontSize: '0.6rem', color: 'var(--text-40)', marginBottom: '0.25rem' }}>Standard</div>
                                        <div style={{ fontSize: '0.7rem', color: `rgb(${brandRgb})`, fontFamily: 'monospace' }}>4-48px</div>
                                        <div style={{ fontSize: '0.55rem', color: 'var(--text-35)' }}>spacing, padding</div>
                                      </div>
                                      <div style={{ background: 'var(--glass-04)', padding: '0.5rem', borderRadius: '8px' }}>
                                        <div style={{ fontSize: '0.6rem', color: 'var(--text-40)', marginBottom: '0.25rem' }}>Macro</div>
                                        <div style={{ fontSize: '0.7rem', color: `rgb(${brandRgb})`, fontFamily: 'monospace' }}>50-600px</div>
                                        <div style={{ fontSize: '0.55rem', color: 'var(--text-35)' }}>layouts, containers</div>
                                      </div>
                                    </div>
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.6rem', color: 'var(--text-40)' }}>
                                      <span style={{ color: `rgb(${brandRgb})` }}>4n scale:</span> 4, 8, 12, 16, 20, 24... &nbsp;|&nbsp; <span style={{ color: `rgb(${brandRgb})` }}>2^n:</span> 2, 4, 8, 16, 32...
                                    </div>
                                  </motion.div>
                                )}
                              </motion.div>

                              {/* Primitives: Colour Card */}
                              <motion.div
                                onClick={() => setExpandedTokenCard(expandedTokenCard === 'primitives-colour' ? null : 'primitives-colour')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                  background: expandedTokenCard === 'primitives-colour' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.12), var(--glass-08))` : 'var(--glass-06)',
                                  border: expandedTokenCard === 'primitives-colour' ? `1px solid rgba(${brandRgb}, 0.3)` : '1px solid var(--glass-12)',
                                  borderRadius: '12px',
                                  padding: '0.75rem 1rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  flex: expandedTokenCard === 'primitives-colour' ? '1 1 100%' : '0 0 auto',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-85)' }}>Primitives: Colour</span>
                                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ transform: expandedTokenCard === 'primitives-colour' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                    <path d="M2 4L6 8L10 4" stroke="var(--text-40)" strokeWidth="1.5" fill="none" />
                                  </svg>
                                </div>
                                {expandedTokenCard === 'primitives-colour' && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--glass-10)' }}
                                  >
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-50)', marginBottom: '0.5rem' }}>
                                      Abstract colour values without semantic application
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                      {[
                                        { name: 'AI Red', color: '#DA0E29', scale: 'R50-R900' },
                                        { name: 'AI Grey', color: '#6B7280', scale: 'G50-G900' },
                                        { name: 'AI Purple', color: '#7C3AED', scale: 'P50-P900' },
                                        { name: 'Base White', color: '#FFFFFF', scale: '#FFFFFF' },
                                        { name: 'Base Black', color: '#000000', scale: '#000000' },
                                      ].map((c) => (
                                        <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--glass-04)', padding: '0.35rem 0.6rem', borderRadius: '6px' }}>
                                          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: c.color, border: c.name === 'Base White' ? '1px solid var(--glass-20)' : 'none' }} />
                                          <span style={{ fontSize: '0.6rem', color: 'var(--text-70)' }}>{c.name}</span>
                                          <span style={{ fontSize: '0.55rem', color: 'var(--text-35)', fontFamily: 'monospace' }}>{c.scale}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </motion.div>
                            </div>
                          </div>

                          {/* Connection Line 1 - Multi-branch */}
                          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.15rem 0' }}>
                            <svg width="200" height="32" viewBox="0 0 200 32">
                              <defs>
                                <linearGradient id="tierLineGradNew1" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor={`rgba(${brandRgb}, 0.3)`} />
                                  <stop offset="100%" stopColor={`rgba(${brandRgb}, 0.7)`} />
                                </linearGradient>
                              </defs>
                              {/* Main trunk */}
                              <line x1="100" y1="0" x2="100" y2="16" stroke="url(#tierLineGradNew1)" strokeWidth="2" strokeDasharray="4 3" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none' }} />
                              {/* Branch left */}
                              <path d="M100 16 Q100 24 60 28" stroke="url(#tierLineGradNew1)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: '0.1s' }} />
                              {/* Branch right */}
                              <path d="M100 16 Q100 24 140 28" stroke="url(#tierLineGradNew1)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: '0.2s' }} />
                              <circle cx="60" cy="28" r="3" fill={`rgb(${brandRgb})`} style={{ animation: figmaCascadePhase === 'playing' ? 'statusPulse 1.5s ease-in-out infinite' : 'none' }} />
                              <circle cx="140" cy="28" r="3" fill={`rgb(${brandRgb})`} style={{ animation: figmaCascadePhase === 'playing' ? 'statusPulse 1.5s ease-in-out infinite' : 'none', animationDelay: '0.2s' }} />
                            </svg>
                          </div>

                          {/* ====== TIER 2: PRIMITIVES ====== */}
                          <div
                            style={{
                              background: figmaCascadePhase === 'playing' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.06), var(--glass-04))` : 'var(--glass-04)',
                              border: '1px solid var(--glass-10)',
                              borderRadius: '16px',
                              padding: '1rem 1.25rem',
                              backdropFilter: 'blur(20px)',
                              transition: 'all 0.4s ease 0.3s',
                            }}
                          >
                            {/* Tier Label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: `rgba(${brandRgb}, 0.15)`,
                                border: `1px solid rgba(${brandRgb}, 0.3)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: `rgb(${brandRgb})`,
                              }}>2</div>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                color: 'var(--text-60)',
                                textTransform: 'uppercase',
                              }}>Primitives</span>
                              <span style={{
                                fontSize: '0.6rem',
                                color: 'var(--text-30)',
                                marginLeft: 'auto',
                              }}>Abstract attributes</span>
                            </div>

                            {/* Token Cards Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
                              {[
                                { id: 'type', name: 'Primitives: Type', desc: 'Font families, weights, sizes', subItems: ['Font Family', 'Weight', 'Size', 'Line Height'] },
                                { id: 'space', name: 'Space', desc: 'T-shirt sizing scale', subItems: ['3XS: 0px', 'XS: 4px', 'S: 8px', 'M: 12px', 'L: 16px', 'XL: 20px', '2XL: 24px', '3XL: 32px'] },
                                { id: 'border', name: 'Border', desc: 'Border weights & styles', subItems: ['S: 0.5px', 'M: 1px', 'L: 2px', 'XL: 4px'] },
                                { id: 'semantics-color', name: 'Semantics: Color', desc: 'Contextual color application', subItems: ['text/default', 'surface/brand', 'border/subtle'] },
                              ].map((token) => (
                                <motion.div
                                  key={token.id}
                                  onClick={() => setExpandedTokenCard(expandedTokenCard === token.id ? null : token.id)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  style={{
                                    background: expandedTokenCard === token.id ? `linear-gradient(135deg, rgba(${brandRgb}, 0.1), var(--glass-08))` : 'var(--glass-06)',
                                    border: expandedTokenCard === token.id ? `1px solid rgba(${brandRgb}, 0.25)` : '1px solid var(--glass-12)',
                                    borderRadius: '10px',
                                    padding: '0.6rem 0.8rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    gridColumn: expandedTokenCard === token.id ? '1 / -1' : 'auto',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-80)' }}>{token.name}</span>
                                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ transform: expandedTokenCard === token.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                      <path d="M2 3L5 7L8 3" stroke="var(--text-35)" strokeWidth="1.2" fill="none" />
                                    </svg>
                                  </div>
                                  {expandedTokenCard === token.id && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid var(--glass-08)' }}
                                    >
                                      <div style={{ fontSize: '0.6rem', color: 'var(--text-45)', marginBottom: '0.4rem' }}>{token.desc}</div>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                        {token.subItems.map((item, idx) => (
                                          <span key={idx} style={{
                                            fontSize: '0.55rem',
                                            color: 'var(--text-60)',
                                            background: 'var(--glass-06)',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            border: '1px solid var(--glass-08)',
                                            fontFamily: item.includes(':') || item.includes('px') ? 'monospace' : 'inherit',
                                          }}>{item}</span>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Connection Line 2 */}
                          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.15rem 0' }}>
                            <svg width="100" height="24" viewBox="0 0 100 24">
                              <line x1="50" y1="0" x2="50" y2="24" stroke={`rgba(${brandRgb}, 0.5)`} strokeWidth="2" strokeDasharray="4 3" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: '0.4s' }} />
                              <circle cx="50" cy="20" r="3" fill={`rgb(${brandRgb})`} style={{ animation: figmaCascadePhase === 'playing' ? 'statusPulse 1.5s ease-in-out infinite' : 'none', animationDelay: '0.4s' }} />
                            </svg>
                          </div>

                          {/* ====== TIER 3: SEMANTICS ====== */}
                          <div
                            style={{
                              background: figmaCascadePhase === 'playing' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.05), var(--glass-04))` : 'var(--glass-04)',
                              border: '1px solid var(--glass-10)',
                              borderRadius: '16px',
                              padding: '1rem 1.25rem',
                              backdropFilter: 'blur(20px)',
                              transition: 'all 0.4s ease 0.6s',
                            }}
                          >
                            {/* Tier Label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: `rgba(${brandRgb}, 0.15)`,
                                border: `1px solid rgba(${brandRgb}, 0.3)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: `rgb(${brandRgb})`,
                              }}>3</div>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                color: 'var(--text-60)',
                                textTransform: 'uppercase',
                              }}>Semantics</span>
                              <span style={{
                                fontSize: '0.6rem',
                                color: 'var(--text-30)',
                                marginLeft: 'auto',
                              }}>Contextual meaning</span>
                            </div>

                            {/* Token Cards */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {[
                                { id: 'sem-type', name: 'Semantics: Type', desc: 'Heading, Body, Caption styles', example: 'heading/h1 → 48px Bold' },
                                { id: 'radius', name: 'Radius', desc: 'Corner curvature', example: 'S: 4px, M: 8px, L: 16px' },
                                { id: 'width', name: 'Width', desc: 'Border thickness', example: 'hairline: 0.5px, default: 1px' },
                              ].map((token) => (
                                <motion.div
                                  key={token.id}
                                  onClick={() => setExpandedTokenCard(expandedTokenCard === token.id ? null : token.id)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  style={{
                                    background: expandedTokenCard === token.id ? `linear-gradient(135deg, rgba(${brandRgb}, 0.1), var(--glass-08))` : 'var(--glass-06)',
                                    border: expandedTokenCard === token.id ? `1px solid rgba(${brandRgb}, 0.25)` : '1px solid var(--glass-12)',
                                    borderRadius: '10px',
                                    padding: '0.6rem 0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    flex: expandedTokenCard === token.id ? '1 1 100%' : '0 0 auto',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-80)' }}>{token.name}</span>
                                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ transform: expandedTokenCard === token.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                      <path d="M2 3L5 7L8 3" stroke="var(--text-35)" strokeWidth="1.2" fill="none" />
                                    </svg>
                                  </div>
                                  {expandedTokenCard === token.id && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--glass-08)' }}
                                    >
                                      <div style={{ fontSize: '0.6rem', color: 'var(--text-45)', marginBottom: '0.3rem' }}>{token.desc}</div>
                                      <div style={{ fontSize: '0.6rem', color: `rgb(${brandRgb})`, fontFamily: 'monospace', background: 'var(--glass-04)', padding: '0.3rem 0.5rem', borderRadius: '4px', display: 'inline-block' }}>
                                        {token.example}
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Connection Line 3 - Fan out */}
                          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.15rem 0' }}>
                            <svg width="300" height="32" viewBox="0 0 300 32">
                              <line x1="150" y1="0" x2="150" y2="12" stroke={`rgba(${brandRgb}, 0.5)`} strokeWidth="2" strokeDasharray="4 3" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: '0.8s' }} />
                              {/* Fan out lines */}
                              {[-100, -60, -20, 20, 60, 100].map((offset, i) => (
                                <g key={i}>
                                  <path d={`M150 12 Q150 22 ${150 + offset} 28`} stroke={`rgba(${brandRgb}, 0.4)`} strokeWidth="1" fill="none" strokeDasharray="2 2" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: `${0.8 + i * 0.05}s` }} />
                                  <circle cx={150 + offset} cy="28" r="2" fill={`rgb(${brandRgb})`} style={{ animation: figmaCascadePhase === 'playing' ? 'statusPulse 1.5s ease-in-out infinite' : 'none', animationDelay: `${0.8 + i * 0.05}s` }} />
                                </g>
                              ))}
                            </svg>
                          </div>

                          {/* ====== TIER 4: COMPONENTS ====== */}
                          <div
                            style={{
                              background: figmaCascadePhase === 'playing' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.05), var(--glass-04))` : 'var(--glass-04)',
                              border: '1px solid var(--glass-10)',
                              borderRadius: '16px',
                              padding: '1rem 1.25rem',
                              backdropFilter: 'blur(20px)',
                              transition: 'all 0.4s ease 0.6s',
                            }}
                          >
                            {/* Tier Label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: `rgba(${brandRgb}, 0.15)`,
                                border: `1px solid rgba(${brandRgb}, 0.3)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: `rgb(${brandRgb})`,
                              }}>4</div>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                color: 'var(--text-60)',
                                textTransform: 'uppercase',
                              }}>Components</span>
                              <span style={{
                                fontSize: '0.6rem',
                                color: 'var(--text-30)',
                                marginLeft: 'auto',
                              }}>Direct usage in UI</span>
                            </div>

                            {/* Component Cards - Enhanced with detailed content */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {[
                                { name: 'Heading', icon: 'H', tokens: ['H1: 48px', 'H2: 40px', 'H3: 32px', 'H4: 28px'], desc: 'Primary typography hierarchy for page titles and sections', specs: [{ label: 'Font', value: 'Space Grotesk' }, { label: 'Weights', value: '600-700' }, { label: 'Line Height', value: '1.1-1.2' }], tokenRef: 'type/heading/*' },
                                { name: 'Subheading', icon: 'Sh', tokens: ['Large: 24px', 'Medium: 20px', 'Small: 18px'], desc: 'Secondary titles and section labels', specs: [{ label: 'Font', value: 'Space Grotesk' }, { label: 'Weight', value: '500-600' }, { label: 'Letter Spacing', value: '-0.02em' }], tokenRef: 'type/subheading/*' },
                                { name: 'Body', icon: 'B', tokens: ['Large: 18px', 'Medium: 16px', 'Small: 14px'], desc: 'Primary reading text and paragraphs', specs: [{ label: 'Font', value: 'DM Sans' }, { label: 'Weight', value: '400-500' }, { label: 'Line Height', value: '1.5-1.6' }], tokenRef: 'type/body/*' },
                                { name: 'Caption', icon: 'C', tokens: ['Default: 12px', 'Secondary: 11px'], desc: 'Supporting text, labels, and metadata', specs: [{ label: 'Font', value: 'DM Sans' }, { label: 'Weight', value: '400' }, { label: 'Opacity', value: '60-80%' }], tokenRef: 'type/caption/*' },
                                { name: 'Button', icon: 'Bt', tokens: ['Primary', 'Secondary', 'Tertiary', 'Ghost'], desc: 'Interactive call-to-action elements', specs: [{ label: 'Height', value: '40/48/56px' }, { label: 'Padding', value: '12px 24px' }, { label: 'Radius', value: '8px' }], tokenRef: 'color/button/*' },
                                { name: 'Text Color', icon: 'Tx', tokens: ['Primary: 95%', 'Secondary: 70%', 'Muted: 50%', 'Brand'], desc: 'Semantic text color applications', specs: [{ label: 'Primary', value: '--text-95' }, { label: 'Secondary', value: '--text-70' }, { label: 'Link', value: 'AI Red' }], tokenRef: 'color/text/*' },
                                { name: 'Background', icon: 'Bg', tokens: ['Default', 'Surface', 'Elevated', 'Subtle'], desc: 'Container and surface backgrounds', specs: [{ label: 'Canvas', value: '#0A0A0A' }, { label: 'Surface', value: '4-6% white' }, { label: 'Elevated', value: '8-12%' }], tokenRef: 'color/background/*' },
                                { name: 'Border', icon: 'Bd', tokens: ['Default: 1px', 'Subtle: 0.5px', 'Focus: 2px'], desc: 'Element boundaries and separators', specs: [{ label: 'Color', value: '--glass-10' }, { label: 'Focus', value: 'AI Red' }, { label: 'Radius', value: '4-16px' }], tokenRef: 'border/*' },
                                { name: 'Icon', icon: 'Ic', tokens: ['16px', '20px', '24px', '32px'], desc: 'Iconography sizing and colors', specs: [{ label: 'Default', value: '--text-70' }, { label: 'Brand', value: 'AI Red' }, { label: 'Stroke', value: '1.5-2px' }], tokenRef: 'icon/*' },
                                { name: 'Feedback', icon: 'Fb', tokens: ['Success', 'Warning', 'Critical', 'Info'], desc: 'System status and validation colors', specs: [{ label: 'Success', value: '#10B981' }, { label: 'Warning', value: '#F59E0B' }, { label: 'Critical', value: '#EF4444' }], tokenRef: 'color/feedback/*' },
                              ].map((component, i) => (
                                <motion.div
                                  key={component.name}
                                  onClick={() => setExpandedTokenCard(expandedTokenCard === `comp-${component.name}` ? null : `comp-${component.name}`)}
                                  whileHover={{ scale: 1.02, boxShadow: `0 4px 20px rgba(${brandRgb}, 0.1)` }}
                                  whileTap={{ scale: 0.98 }}
                                  style={{
                                    background: expandedTokenCard === `comp-${component.name}` ? `linear-gradient(135deg, rgba(${brandRgb}, 0.12), var(--glass-08))` : 'var(--glass-06)',
                                    border: expandedTokenCard === `comp-${component.name}` ? `1px solid rgba(${brandRgb}, 0.3)` : '1px solid var(--glass-12)',
                                    borderRadius: '10px',
                                    padding: '0.75rem 1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.4rem',
                                    flex: expandedTokenCard === `comp-${component.name}` ? '1 1 100%' : '0 0 auto',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '5px',
                                      background: `rgba(${brandRgb}, 0.1)`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '0.55rem',
                                      fontWeight: 700,
                                      color: `rgb(${brandRgb})`,
                                    }}>{component.icon}</span>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-80)' }}>{component.name}</span>
                                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginLeft: 'auto', transform: expandedTokenCard === `comp-${component.name}` ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                      <path d="M2 3L5 7L8 3" stroke="var(--text-40)" strokeWidth="1.2" fill="none" />
                                    </svg>
                                  </div>
                                  {expandedTokenCard === `comp-${component.name}` && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.3rem', paddingTop: '0.5rem', borderTop: '1px solid var(--glass-08)' }}
                                    >
                                      <div style={{ fontSize: '0.6rem', color: 'var(--text-50)', lineHeight: 1.4 }}>{component.desc}</div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                                        {component.specs.map((spec, idx) => (
                                          <div key={idx} style={{ background: 'var(--glass-04)', padding: '0.4rem', borderRadius: '6px' }}>
                                            <div style={{ fontSize: '0.5rem', color: 'var(--text-35)', marginBottom: '0.15rem' }}>{spec.label}</div>
                                            <div style={{ fontSize: '0.6rem', color: `rgb(${brandRgb})`, fontFamily: 'monospace' }}>{spec.value}</div>
                                          </div>
                                        ))}
                                      </div>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.2rem' }}>
                                        {component.tokens.map((t, idx) => (
                                          <span key={idx} style={{
                                            fontSize: '0.5rem',
                                            color: 'var(--text-60)',
                                            background: 'var(--glass-06)',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            fontFamily: 'monospace',
                                          }}>{t}</span>
                                        ))}
                                      </div>
                                      <div style={{ fontSize: '0.5rem', color: 'var(--text-30)', fontFamily: 'monospace', marginTop: '0.1rem' }}>
                                        Token: {component.tokenRef}
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Connection Line 4 - Downward converge to Atoms */}
                          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.15rem 0' }}>
                            <svg width="300" height="32" viewBox="0 0 300 32">
                              {/* Fan-in lines from components to atoms */}
                              {[-90, -45, 0, 45, 90].map((offset, i) => (
                                <g key={i}>
                                  <path d={`M${150 + offset} 4 Q${150 + offset * 0.5} 16 150 28`} stroke={`rgba(${brandRgb}, 0.4)`} strokeWidth="1.5" fill="none" strokeDasharray="3 2" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: `${1.0 + i * 0.05}s` }} />
                                </g>
                              ))}
                              <circle cx="150" cy="28" r="3" fill={`rgb(${brandRgb})`} style={{ animation: figmaCascadePhase === 'playing' ? 'statusPulse 1.5s ease-in-out infinite' : 'none', animationDelay: '1.0s' }} />
                            </svg>
                          </div>

                          {/* ====== TIER 5: ATOMS ====== */}
                          <div
                            style={{
                              background: figmaCascadePhase === 'playing' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.04), var(--glass-04))` : 'var(--glass-04)',
                              border: '1px solid var(--glass-10)',
                              borderRadius: '16px',
                              padding: '1rem 1.25rem',
                              backdropFilter: 'blur(20px)',
                              transition: 'all 0.4s ease 0.8s',
                            }}
                          >
                            {/* Tier Label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: `rgba(${brandRgb}, 0.15)`,
                                border: `1px solid rgba(${brandRgb}, 0.3)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: `rgb(${brandRgb})`,
                              }}>5</div>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                color: 'var(--text-60)',
                                textTransform: 'uppercase',
                              }}>Atoms</span>
                              <span style={{
                                fontSize: '0.6rem',
                                color: 'var(--text-30)',
                                marginLeft: 'auto',
                              }}>Basic UI building blocks</span>
                            </div>

                            {/* Atom Cards - Enhanced */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {[
                                { name: 'Button', icon: 'Bt', variants: ['Primary', 'Secondary', 'Ghost', 'Icon-only'], desc: 'Core interactive triggers for all user actions across booking, navigation, and forms', specs: [{ label: 'Min Width', value: '88px' }, { label: 'Height', value: '40-56px' }, { label: 'States', value: '4 states' }], usage: 'Booking CTAs, form submissions, navigation' },
                                { name: 'Input', icon: 'In', variants: ['Text', 'Number', 'Password', 'Search', 'Date'], desc: 'Data entry fields for passenger information, flight search, and user authentication', specs: [{ label: 'Height', value: '48px' }, { label: 'Padding', value: '12px 16px' }, { label: 'Border', value: '1px' }], usage: 'Flight search, passenger details, login' },
                                { name: 'Icon', icon: 'Ic', variants: ['Navigation', 'Action', 'Status', 'Decorative'], desc: 'Visual symbols from Lucide icon library for UI actions and status indicators', specs: [{ label: 'Sizes', value: '16-32px' }, { label: 'Stroke', value: '1.5-2px' }, { label: 'Colors', value: '3 variants' }], usage: 'Nav icons, action buttons, status' },
                                { name: 'Label', icon: 'Lb', variants: ['Form', 'Tag', 'Status', 'Category'], desc: 'Text identifiers for form fields, content tags, and status indicators', specs: [{ label: 'Font Size', value: '12-14px' }, { label: 'Weight', value: '500-600' }, { label: 'Case', value: 'Mixed' }], usage: 'Form labels, flight tags, badges' },
                                { name: 'Avatar', icon: 'Av', variants: ['User', 'Placeholder', 'Group', 'Status'], desc: 'Identity representation for user profiles and passenger information', specs: [{ label: 'Sizes', value: '24-64px' }, { label: 'Shape', value: 'Circle' }, { label: 'Fallback', value: 'Initials' }], usage: 'User profiles, passenger list, crew' },
                                { name: 'Badge', icon: 'Bd', variants: ['Count', 'Status', 'New', 'Priority'], desc: 'Notification indicators for alerts, counts, and status updates', specs: [{ label: 'Min Width', value: '18px' }, { label: 'Height', value: '18-24px' }, { label: 'Radius', value: 'Full' }], usage: 'Notifications, flight status, alerts' },
                              ].map((atom, i) => (
                                <motion.div
                                  key={atom.name}
                                  onClick={() => setExpandedTokenCard(expandedTokenCard === `atom-${atom.name}` ? null : `atom-${atom.name}`)}
                                  whileHover={{ scale: 1.02, boxShadow: `0 4px 20px rgba(${brandRgb}, 0.1)` }}
                                  whileTap={{ scale: 0.98 }}
                                  style={{
                                    background: expandedTokenCard === `atom-${atom.name}` ? `linear-gradient(135deg, rgba(${brandRgb}, 0.12), var(--glass-08))` : 'var(--glass-06)',
                                    border: expandedTokenCard === `atom-${atom.name}` ? `1px solid rgba(${brandRgb}, 0.3)` : '1px solid var(--glass-12)',
                                    borderRadius: '10px',
                                    padding: '0.75rem 1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.4rem',
                                    flex: expandedTokenCard === `atom-${atom.name}` ? '1 1 100%' : '0 0 auto',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '5px',
                                      background: `rgba(${brandRgb}, 0.1)`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '0.55rem',
                                      fontWeight: 700,
                                      color: `rgb(${brandRgb})`,
                                    }}>{atom.icon}</span>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-80)' }}>{atom.name}</span>
                                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginLeft: 'auto', transform: expandedTokenCard === `atom-${atom.name}` ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                      <path d="M2 3L5 7L8 3" stroke="var(--text-40)" strokeWidth="1.2" fill="none" />
                                    </svg>
                                  </div>
                                  {expandedTokenCard === `atom-${atom.name}` && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.3rem', paddingTop: '0.5rem', borderTop: '1px solid var(--glass-08)' }}
                                    >
                                      <div style={{ fontSize: '0.6rem', color: 'var(--text-50)', lineHeight: 1.4 }}>{atom.desc}</div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                                        {atom.specs.map((spec, idx) => (
                                          <div key={idx} style={{ background: 'var(--glass-04)', padding: '0.4rem', borderRadius: '6px' }}>
                                            <div style={{ fontSize: '0.5rem', color: 'var(--text-35)', marginBottom: '0.15rem' }}>{spec.label}</div>
                                            <div style={{ fontSize: '0.6rem', color: `rgb(${brandRgb})`, fontFamily: 'monospace' }}>{spec.value}</div>
                                          </div>
                                        ))}
                                      </div>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.2rem' }}>
                                        {atom.variants.map((v, idx) => (
                                          <span key={idx} style={{
                                            fontSize: '0.5rem',
                                            color: 'var(--text-60)',
                                            background: 'var(--glass-06)',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            fontFamily: 'monospace',
                                          }}>{v}</span>
                                        ))}
                                      </div>
                                      <div style={{ fontSize: '0.5rem', color: 'var(--text-30)', marginTop: '0.1rem' }}>
                                        <span style={{ color: 'var(--text-40)' }}>Usage:</span> {atom.usage}
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Connection Line 5 - Branching to Molecules */}
                          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.15rem 0' }}>
                            <svg width="300" height="32" viewBox="0 0 300 32">
                              <line x1="150" y1="0" x2="150" y2="12" stroke={`rgba(${brandRgb}, 0.5)`} strokeWidth="2" strokeDasharray="4 3" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: '1.1s' }} />
                              {/* Branch to molecules */}
                              {[-80, -40, 0, 40, 80].map((offset, i) => (
                                <g key={i}>
                                  <path d={`M150 12 Q150 20 ${150 + offset} 28`} stroke={`rgba(${brandRgb}, 0.4)`} strokeWidth="1" fill="none" strokeDasharray="2 2" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: `${1.1 + i * 0.04}s` }} />
                                  <circle cx={150 + offset} cy="28" r="2" fill={`rgb(${brandRgb})`} style={{ animation: figmaCascadePhase === 'playing' ? 'statusPulse 1.5s ease-in-out infinite' : 'none', animationDelay: `${1.1 + i * 0.04}s` }} />
                                </g>
                              ))}
                            </svg>
                          </div>

                          {/* ====== TIER 6: MOLECULES ====== */}
                          <div
                            style={{
                              background: figmaCascadePhase === 'playing' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.035), var(--glass-04))` : 'var(--glass-04)',
                              border: '1px solid var(--glass-10)',
                              borderRadius: '16px',
                              padding: '1rem 1.25rem',
                              backdropFilter: 'blur(20px)',
                              transition: 'all 0.4s ease 1s',
                            }}
                          >
                            {/* Tier Label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: `rgba(${brandRgb}, 0.15)`,
                                border: `1px solid rgba(${brandRgb}, 0.3)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: `rgb(${brandRgb})`,
                              }}>6</div>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                color: 'var(--text-60)',
                                textTransform: 'uppercase',
                              }}>Molecules</span>
                              <span style={{
                                fontSize: '0.6rem',
                                color: 'var(--text-30)',
                                marginLeft: 'auto',
                              }}>Atom combinations</span>
                            </div>

                            {/* Molecule Cards - Enhanced */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {[
                                { name: 'Search Bar', icon: 'Sb', atoms: [{ name: 'Input', role: 'Destination entry' }, { name: 'Icon', role: 'Search indicator' }, { name: 'Button', role: 'Submit action' }], desc: 'Flight search interface enabling destination, date, and passenger input for booking flows', specs: [{ label: 'Width', value: '100%' }, { label: 'Height', value: '56px' }, { label: 'Gap', value: '8px' }], example: 'Homepage hero, flight search' },
                                { name: 'Form Field', icon: 'Ff', atoms: [{ name: 'Label', role: 'Field identifier' }, { name: 'Input', role: 'Data entry' }, { name: 'Helper', role: 'Validation feedback' }], desc: 'Complete data entry unit with label, input, and contextual help for passenger information', specs: [{ label: 'Stack', value: 'Vertical' }, { label: 'Label Gap', value: '6px' }, { label: 'Helper Gap', value: '4px' }], example: 'Passenger details, checkout' },
                                { name: 'Card Header', icon: 'Ch', atoms: [{ name: 'Avatar', role: 'User identity' }, { name: 'Title', role: 'Primary info' }, { name: 'Badge', role: 'Status indicator' }], desc: 'Content card identifier showing user info, flight details, or booking status', specs: [{ label: 'Height', value: '48px' }, { label: 'Avatar', value: '32px' }, { label: 'Gap', value: '12px' }], example: 'Booking cards, user profiles' },
                                { name: 'Nav Item', icon: 'Ni', atoms: [{ name: 'Icon', role: 'Visual cue' }, { name: 'Label', role: 'Link text' }, { name: 'Chevron', role: 'Expand indicator' }], desc: 'Navigation link component for menus, sidebars, and mobile navigation', specs: [{ label: 'Height', value: '44px' }, { label: 'Padding', value: '12px 16px' }, { label: 'Icon', value: '20px' }], example: 'Main nav, mobile menu' },
                                { name: 'List Item', icon: 'Li', atoms: [{ name: 'Checkbox', role: 'Selection' }, { name: 'Content', role: 'Item details' }, { name: 'Action', role: 'Quick action' }], desc: 'Selectable list row for flight results, passenger lists, and service selections', specs: [{ label: 'Height', value: '64-80px' }, { label: 'Padding', value: '16px' }, { label: 'Divider', value: '1px' }], example: 'Flight results, add-ons' },
                                { name: 'Metric Card', icon: 'Mc', atoms: [{ name: 'Icon', role: 'Category symbol' }, { name: 'Value', role: 'Primary metric' }, { name: 'Label', role: 'Description' }], desc: 'Data visualization unit for stats, prices, and key information display', specs: [{ label: 'Min Width', value: '120px' }, { label: 'Padding', value: '16px' }, { label: 'Icon', value: '24px' }], example: 'Pricing, flight stats' },
                              ].map((molecule, i) => (
                                <motion.div
                                  key={molecule.name}
                                  onClick={() => setExpandedTokenCard(expandedTokenCard === `mol-${molecule.name}` ? null : `mol-${molecule.name}`)}
                                  whileHover={{ scale: 1.02, boxShadow: `0 4px 20px rgba(${brandRgb}, 0.1)` }}
                                  whileTap={{ scale: 0.98 }}
                                  style={{
                                    background: expandedTokenCard === `mol-${molecule.name}` ? `linear-gradient(135deg, rgba(${brandRgb}, 0.12), var(--glass-08))` : 'var(--glass-06)',
                                    border: expandedTokenCard === `mol-${molecule.name}` ? `1px solid rgba(${brandRgb}, 0.3)` : '1px solid var(--glass-12)',
                                    borderRadius: '10px',
                                    padding: '0.75rem 1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.4rem',
                                    flex: expandedTokenCard === `mol-${molecule.name}` ? '1 1 100%' : '0 0 auto',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '5px',
                                      background: `rgba(${brandRgb}, 0.1)`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '0.55rem',
                                      fontWeight: 700,
                                      color: `rgb(${brandRgb})`,
                                    }}>{molecule.icon}</span>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-80)' }}>{molecule.name}</span>
                                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginLeft: 'auto', transform: expandedTokenCard === `mol-${molecule.name}` ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                      <path d="M2 3L5 7L8 3" stroke="var(--text-40)" strokeWidth="1.2" fill="none" />
                                    </svg>
                                  </div>
                                  {expandedTokenCard === `mol-${molecule.name}` && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.3rem', paddingTop: '0.5rem', borderTop: '1px solid var(--glass-08)' }}
                                    >
                                      <div style={{ fontSize: '0.6rem', color: 'var(--text-50)', lineHeight: 1.4 }}>{molecule.desc}</div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                                        {molecule.specs.map((spec, idx) => (
                                          <div key={idx} style={{ background: 'var(--glass-04)', padding: '0.4rem', borderRadius: '6px' }}>
                                            <div style={{ fontSize: '0.5rem', color: 'var(--text-35)', marginBottom: '0.15rem' }}>{spec.label}</div>
                                            <div style={{ fontSize: '0.6rem', color: `rgb(${brandRgb})`, fontFamily: 'monospace' }}>{spec.value}</div>
                                          </div>
                                        ))}
                                      </div>
                                      <div style={{ fontSize: '0.55rem', color: 'var(--text-40)', marginTop: '0.2rem' }}>Composition:</div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
                                        {molecule.atoms.map((a, idx) => (
                                          <React.Fragment key={idx}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem', background: `rgba(${brandRgb}, 0.08)`, padding: '0.3rem 0.5rem', borderRadius: '5px' }}>
                                              <span style={{ fontSize: '0.55rem', color: `rgb(${brandRgb})`, fontWeight: 600 }}>{a.name}</span>
                                              <span style={{ fontSize: '0.45rem', color: 'var(--text-40)' }}>{a.role}</span>
                                            </div>
                                            {idx < molecule.atoms.length - 1 && (
                                              <span style={{ fontSize: '0.6rem', color: 'var(--text-30)', fontWeight: 600 }}>+</span>
                                            )}
                                          </React.Fragment>
                                        ))}
                                      </div>
                                      <div style={{ fontSize: '0.5rem', color: 'var(--text-30)', marginTop: '0.1rem' }}>
                                        <span style={{ color: 'var(--text-40)' }}>Example:</span> {molecule.example}
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Connection Line 6 - Tree to Organisms */}
                          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.15rem 0' }}>
                            <svg width="300" height="32" viewBox="0 0 300 32">
                              {/* Multiple inputs converging */}
                              {[-60, -30, 0, 30, 60].map((offset, i) => (
                                <g key={i}>
                                  <path d={`M${150 + offset * 1.5} 4 Q${150 + offset} 16 ${150 + offset * 0.6} 28`} stroke={`rgba(${brandRgb}, 0.35)`} strokeWidth="1" fill="none" strokeDasharray="2 2" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: `${1.2 + i * 0.04}s` }} />
                                  <circle cx={150 + offset * 0.6} cy="28" r="1.5" fill={`rgb(${brandRgb})`} style={{ animation: figmaCascadePhase === 'playing' ? 'statusPulse 1.5s ease-in-out infinite' : 'none', animationDelay: `${1.2 + i * 0.04}s` }} />
                                </g>
                              ))}
                            </svg>
                          </div>

                          {/* ====== TIER 7: ORGANISMS ====== */}
                          <div
                            style={{
                              background: figmaCascadePhase === 'playing' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.03), var(--glass-04))` : 'var(--glass-04)',
                              border: '1px solid var(--glass-10)',
                              borderRadius: '16px',
                              padding: '1rem 1.25rem',
                              backdropFilter: 'blur(20px)',
                              transition: 'all 0.4s ease 1.2s',
                            }}
                          >
                            {/* Tier Label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: `rgba(${brandRgb}, 0.15)`,
                                border: `1px solid rgba(${brandRgb}, 0.3)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: `rgb(${brandRgb})`,
                              }}>7</div>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                color: 'var(--text-60)',
                                textTransform: 'uppercase',
                              }}>Organisms</span>
                              <span style={{
                                fontSize: '0.6rem',
                                color: 'var(--text-30)',
                                marginLeft: 'auto',
                              }}>Complex UI sections</span>
                            </div>

                            {/* Organism Cards - Enhanced */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {[
                                { name: 'Navigation', icon: 'Nv', molecules: ['Logo', 'Nav Items', 'User Menu'], desc: 'Global site navigation header with responsive behavior across all device sizes', layout: 'Flex: space-between', specs: [{ label: 'Height', value: '64px' }, { label: 'Z-Index', value: '100' }, { label: 'Position', value: 'Sticky' }], breakpoints: { desktop: '3-column', tablet: 'Hamburger', mobile: 'Bottom sheet' } },
                                { name: 'Hero Section', icon: 'Hr', molecules: ['Heading', 'Search Form', 'Media'], desc: 'Primary landing focal point with flight search and brand imagery for homepage engagement', layout: 'Grid: 2-column', specs: [{ label: 'Min Height', value: '600px' }, { label: 'Padding', value: '80px' }, { label: 'Media', value: '50% width' }], breakpoints: { desktop: 'Side-by-side', tablet: 'Stacked', mobile: 'Compact' } },
                                { name: 'Footer', icon: 'Ft', molecules: ['Link Groups', 'Social', 'Legal'], desc: 'Site-wide page terminus with navigation links, social media, and legal information', layout: 'Grid: 4-column', specs: [{ label: 'Padding', value: '64px 0' }, { label: 'Gap', value: '48px' }, { label: 'Border', value: 'Top 1px' }], breakpoints: { desktop: '4-column', tablet: '2-column', mobile: 'Stacked' } },
                                { name: 'Sidebar', icon: 'Sd', molecules: ['Profile Card', 'Nav Menu', 'Actions'], desc: 'Secondary navigation panel for logged-in user dashboard and account management', layout: 'Flex: column', specs: [{ label: 'Width', value: '280px' }, { label: 'Position', value: 'Fixed' }, { label: 'Scroll', value: 'Internal' }], breakpoints: { desktop: 'Visible', tablet: 'Collapsible', mobile: 'Hidden' } },
                                { name: 'Booking Card', icon: 'Bc', molecules: ['Flight Info', 'Price Card', 'Actions'], desc: 'Flight booking information card displaying route, timing, pricing, and selection actions', layout: 'Grid: responsive', specs: [{ label: 'Padding', value: '24px' }, { label: 'Radius', value: '16px' }, { label: 'Shadow', value: 'Level 2' }], breakpoints: { desktop: 'Horizontal', tablet: 'Compact', mobile: 'Stacked' } },
                                { name: 'Modal', icon: 'Md', molecules: ['Header', 'Content', 'Actions'], desc: 'Overlay dialog for confirmations, forms, and focused interactions requiring user attention', layout: 'Flex: column', specs: [{ label: 'Max Width', value: '560px' }, { label: 'Padding', value: '32px' }, { label: 'Backdrop', value: '60% black' }], breakpoints: { desktop: 'Centered', tablet: 'Centered', mobile: 'Full-screen' } },
                              ].map((organism, i) => (
                                <motion.div
                                  key={organism.name}
                                  onClick={() => setExpandedTokenCard(expandedTokenCard === `org-${organism.name}` ? null : `org-${organism.name}`)}
                                  whileHover={{ scale: 1.02, boxShadow: `0 4px 20px rgba(${brandRgb}, 0.1)` }}
                                  whileTap={{ scale: 0.98 }}
                                  style={{
                                    background: expandedTokenCard === `org-${organism.name}` ? `linear-gradient(135deg, rgba(${brandRgb}, 0.12), var(--glass-08))` : 'var(--glass-06)',
                                    border: expandedTokenCard === `org-${organism.name}` ? `1px solid rgba(${brandRgb}, 0.3)` : '1px solid var(--glass-12)',
                                    borderRadius: '10px',
                                    padding: '0.75rem 1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.4rem',
                                    flex: expandedTokenCard === `org-${organism.name}` ? '1 1 100%' : '0 0 auto',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '5px',
                                      background: `rgba(${brandRgb}, 0.1)`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '0.55rem',
                                      fontWeight: 700,
                                      color: `rgb(${brandRgb})`,
                                    }}>{organism.icon}</span>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-80)' }}>{organism.name}</span>
                                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginLeft: 'auto', transform: expandedTokenCard === `org-${organism.name}` ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                      <path d="M2 3L5 7L8 3" stroke="var(--text-40)" strokeWidth="1.2" fill="none" />
                                    </svg>
                                  </div>
                                  {expandedTokenCard === `org-${organism.name}` && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.3rem', paddingTop: '0.5rem', borderTop: '1px solid var(--glass-08)' }}
                                    >
                                      <div style={{ fontSize: '0.6rem', color: 'var(--text-50)', lineHeight: 1.4 }}>{organism.desc}</div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                                        {organism.specs.map((spec, idx) => (
                                          <div key={idx} style={{ background: 'var(--glass-04)', padding: '0.4rem', borderRadius: '6px' }}>
                                            <div style={{ fontSize: '0.5rem', color: 'var(--text-35)', marginBottom: '0.15rem' }}>{spec.label}</div>
                                            <div style={{ fontSize: '0.6rem', color: `rgb(${brandRgb})`, fontFamily: 'monospace' }}>{spec.value}</div>
                                          </div>
                                        ))}
                                      </div>
                                      <div style={{ fontSize: '0.55rem', color: 'var(--text-40)', marginTop: '0.2rem' }}>Layout: <span style={{ color: `rgb(${brandRgb})`, fontFamily: 'monospace' }}>{organism.layout}</span></div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
                                        {organism.molecules.map((m, idx) => (
                                          <React.Fragment key={idx}>
                                            <span style={{
                                              fontSize: '0.55rem',
                                              color: `rgb(${brandRgb})`,
                                              background: `rgba(${brandRgb}, 0.1)`,
                                              padding: '0.2rem 0.5rem',
                                              borderRadius: '4px',
                                              fontWeight: 500,
                                            }}>{m}</span>
                                            {idx < organism.molecules.length - 1 && (
                                              <span style={{ fontSize: '0.6rem', color: 'var(--text-30)', fontWeight: 600 }}>+</span>
                                            )}
                                          </React.Fragment>
                                        ))}
                                      </div>
                                      <div style={{ fontSize: '0.5rem', color: 'var(--text-35)', marginTop: '0.2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <span><span style={{ color: 'var(--text-45)' }}>Desktop:</span> {organism.breakpoints.desktop}</span>
                                        <span><span style={{ color: 'var(--text-45)' }}>Tablet:</span> {organism.breakpoints.tablet}</span>
                                        <span><span style={{ color: 'var(--text-45)' }}>Mobile:</span> {organism.breakpoints.mobile}</span>
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Connection Line 7 - Consolidation to Templates */}
                          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.15rem 0' }}>
                            <svg width="300" height="32" viewBox="0 0 300 32">
                              {/* Consolidating lines */}
                              {[-50, -25, 0, 25, 50].map((offset, i) => (
                                <g key={i}>
                                  <path d={`M${150 + offset * 2} 4 Q${150 + offset} 16 ${150 + offset * 0.4} 28`} stroke={`rgba(${brandRgb}, 0.35)`} strokeWidth="1" fill="none" strokeDasharray="2 2" style={{ animation: figmaCascadePhase === 'playing' ? 'flowLine 1s linear infinite' : 'none', animationDelay: `${1.3 + i * 0.04}s` }} />
                                </g>
                              ))}
                              {[-20, 0, 20].map((offset, i) => (
                                <circle key={i} cx={150 + offset} cy="28" r="2" fill={`rgb(${brandRgb})`} style={{ animation: figmaCascadePhase === 'playing' ? 'statusPulse 1.5s ease-in-out infinite' : 'none', animationDelay: `${1.3 + i * 0.05}s` }} />
                              ))}
                            </svg>
                          </div>

                          {/* ====== TIER 8: TEMPLATES ====== */}
                          <div
                            style={{
                              background: figmaCascadePhase === 'playing' ? `linear-gradient(135deg, rgba(${brandRgb}, 0.025), var(--glass-04))` : 'var(--glass-04)',
                              border: '1px solid var(--glass-10)',
                              borderRadius: '16px',
                              padding: '1rem 1.25rem',
                              backdropFilter: 'blur(20px)',
                              transition: 'all 0.4s ease 1.4s',
                            }}
                          >
                            {/* Tier Label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: `rgba(${brandRgb}, 0.15)`,
                                border: `1px solid rgba(${brandRgb}, 0.3)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: `rgb(${brandRgb})`,
                              }}>8</div>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                color: 'var(--text-60)',
                                textTransform: 'uppercase',
                              }}>Templates</span>
                              <span style={{
                                fontSize: '0.6rem',
                                color: 'var(--text-30)',
                                marginLeft: 'auto',
                              }}>Page layouts & compositions</span>
                            </div>

                            {/* Template Cards - Enhanced */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {[
                                { name: 'Homepage', icon: 'Hp', organisms: ['Navigation', 'Hero Section', 'Featured', 'Footer'], desc: 'Primary landing page with flight search, featured destinations, and brand storytelling', grid: '12-column responsive', regions: [{ name: 'Nav', size: '64px' }, { name: 'Hero', size: '600px' }, { name: 'Content', size: 'auto' }, { name: 'Footer', size: '200px' }], responsive: 'Mobile-first with breakpoints at 768px, 1024px, 1440px' },
                                { name: 'Booking Flow', icon: 'Bf', organisms: ['Navigation', 'Progress', 'Form Section', 'Summary'], desc: 'Multi-step flight booking wizard with passenger details, seat selection, and payment', grid: '2-column (form + summary)', regions: [{ name: 'Progress', size: '80px' }, { name: 'Form', size: '60%' }, { name: 'Summary', size: '40%' }], responsive: 'Summary collapses below form on mobile' },
                                { name: 'My Trips', icon: 'Mt', organisms: ['Navigation', 'Sidebar', 'Trip Cards', 'Footer'], desc: 'User dashboard showing upcoming flights, past journeys, and booking management', grid: 'Sidebar + content grid', regions: [{ name: 'Sidebar', size: '280px' }, { name: 'Cards', size: 'auto' }, { name: 'Filters', size: '200px' }], responsive: 'Sidebar becomes bottom sheet on mobile' },
                                { name: 'Flight Results', icon: 'Fr', organisms: ['Navigation', 'Filters', 'Results List', 'Pagination'], desc: 'Search results page with filtering, sorting, and flight comparison features', grid: 'Filters + list', regions: [{ name: 'Filters', size: '260px' }, { name: 'Results', size: 'auto' }, { name: 'Sort', size: '48px' }], responsive: 'Filters slide-in on mobile' },
                              ].map((template, i) => (
                                <motion.div
                                  key={template.name}
                                  onClick={() => setExpandedTokenCard(expandedTokenCard === `tpl-${template.name}` ? null : `tpl-${template.name}`)}
                                  whileHover={{ scale: 1.02, boxShadow: `0 4px 20px rgba(${brandRgb}, 0.1)` }}
                                  whileTap={{ scale: 0.98 }}
                                  style={{
                                    background: expandedTokenCard === `tpl-${template.name}` ? `linear-gradient(135deg, rgba(${brandRgb}, 0.12), var(--glass-08))` : 'var(--glass-06)',
                                    border: expandedTokenCard === `tpl-${template.name}` ? `1px solid rgba(${brandRgb}, 0.3)` : '1px solid var(--glass-12)',
                                    borderRadius: '10px',
                                    padding: '0.75rem 1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.4rem',
                                    flex: expandedTokenCard === `tpl-${template.name}` ? '1 1 100%' : '0 0 auto',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '5px',
                                      background: `rgba(${brandRgb}, 0.1)`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '0.55rem',
                                      fontWeight: 700,
                                      color: `rgb(${brandRgb})`,
                                    }}>{template.icon}</span>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-80)' }}>{template.name}</span>
                                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginLeft: 'auto', transform: expandedTokenCard === `tpl-${template.name}` ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                      <path d="M2 3L5 7L8 3" stroke="var(--text-40)" strokeWidth="1.2" fill="none" />
                                    </svg>
                                  </div>
                                  {expandedTokenCard === `tpl-${template.name}` && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.3rem', paddingTop: '0.5rem', borderTop: '1px solid var(--glass-08)' }}
                                    >
                                      <div style={{ fontSize: '0.6rem', color: 'var(--text-50)', lineHeight: 1.4 }}>{template.desc}</div>
                                      <div style={{ fontSize: '0.55rem', color: 'var(--text-40)', marginTop: '0.1rem' }}>Grid: <span style={{ color: `rgb(${brandRgb})`, fontFamily: 'monospace' }}>{template.grid}</span></div>
                                      <div style={{ fontSize: '0.55rem', color: 'var(--text-40)' }}>Page Regions:</div>
                                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                                        {template.regions.map((r, idx) => (
                                          <div key={idx} style={{ background: 'var(--glass-04)', padding: '0.3rem 0.5rem', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
                                            <span style={{ fontSize: '0.55rem', color: `rgb(${brandRgb})`, fontWeight: 500 }}>{r.name}</span>
                                            <span style={{ fontSize: '0.45rem', color: 'var(--text-35)', fontFamily: 'monospace' }}>{r.size}</span>
                                          </div>
                                        ))}
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                                        {template.organisms.map((o, idx) => (
                                          <React.Fragment key={idx}>
                                            <span style={{
                                              fontSize: '0.55rem',
                                              color: `rgb(${brandRgb})`,
                                              background: `rgba(${brandRgb}, 0.1)`,
                                              padding: '0.2rem 0.5rem',
                                              borderRadius: '4px',
                                              fontWeight: 500,
                                            }}>{o}</span>
                                            {idx < template.organisms.length - 1 && (
                                              <span style={{ fontSize: '0.6rem', color: 'var(--text-30)', fontWeight: 600 }}>+</span>
                                            )}
                                          </React.Fragment>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Token Flow Legend */}
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '1.5rem',
                              marginTop: '0.5rem',
                              padding: '0.6rem',
                              background: 'var(--glass-03)',
                              borderRadius: '10px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <div style={{ width: '20px', height: '2px', background: `linear-gradient(90deg, rgba(${brandRgb}, 0.3), rgba(${brandRgb}, 0.7))` }} />
                              <span style={{ fontSize: '0.55rem', color: 'var(--text-40)' }}>Token inheritance</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: `rgb(${brandRgb})` }} />
                              <span style={{ fontSize: '0.55rem', color: 'var(--text-40)' }}>Value resolved</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: `rgba(${brandRgb}, 0.1)`, border: `1px solid rgba(${brandRgb}, 0.2)` }} />
                              <span style={{ fontSize: '0.55rem', color: 'var(--text-40)' }}>Click to expand</span>
                            </div>
                          </div>

                        </div>
                      )}
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

                {/* EXPANDED CONTENT - Interactive demos */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  marginTop: '2rem',
                }}>
                  {/* Animated Illustration or Placeholder */}
                  {index === 2 ? (
                    /* Card 2: Search with AI - Interactive Mobile Mockup */
                    <>
                    {/* Interactive Prototype Helper */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '16px',
                      padding: '8px 16px',
                      background: `rgba(${project.color}, 0.1)`,
                      borderRadius: '20px',
                      border: `1px solid rgba(${project.color}, 0.2)`,
                      width: 'fit-content',
                      margin: '0 auto 16px',
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: `rgb(${project.color})`,
                        animation: 'statusPulse 1.5s ease infinite',
                      }} />
                      <span style={{
                        fontSize: '11px',
                        color: 'var(--text-70)',
                        fontWeight: '500',
                      }}>
                        Interactive Prototype
                      </span>
                      <span style={{
                        fontSize: '10px',
                        color: 'var(--text-40)',
                      }}>
                        — Tap a destination to explore
                      </span>
                    </div>

                    {/* Mobile Phone Frame */}
                    <div style={{
                      width: '320px',
                      height: '680px',
                      margin: '0 auto',
                      borderRadius: '44px',
                      background: '#000',
                      padding: '10px',
                      boxShadow: '0 25px 80px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {/* Dynamic Island */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100px',
                        height: '28px',
                        borderRadius: '20px',
                        background: '#000',
                        zIndex: 20,
                      }} />

                      {/* Screen Container */}
                      <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '36px',
                        overflow: 'hidden',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)',
                        position: 'relative',
                      }}>
                        <AnimatePresence mode="wait">
                          {/* SCREEN 1: AI Explorer Home */}
                          {aiExplorerScreen === 'home' && (
                            <motion.div
                              key="home"
                              ref={homeScreenRef}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              onWheel={(e) => {
                                e.stopPropagation();
                                if (homeScreenRef.current) {
                                  homeScreenRef.current.scrollTop += e.deltaY;
                                }
                              }}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '60px 20px 20px',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                WebkitOverflowScrolling: 'touch',
                                touchAction: 'pan-y',
                                overscrollBehavior: 'contain',
                              }}
                            >
                              {/* Header */}
                              <div style={{
                                textAlign: 'center',
                                marginBottom: '32px',
                              }}>
                                <div style={{
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '14px',
                                  background: `rgb(${brandRgb})`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  margin: '0 auto 12px',
                                  boxShadow: `0 8px 24px rgba(${brandRgb}, 0.3)`,
                                }}>
                                  <Plane size={22} style={{ color: 'white' }} />
                                </div>
                                <h3 style={{
                                  fontSize: '18px',
                                  fontWeight: '700',
                                  color: '#1A1A1A',
                                  marginBottom: '4px',
                                }}>AI Explorer</h3>
                                <p style={{
                                  fontSize: '12px',
                                  color: 'rgba(0,0,0,0.5)',
                                }}>Your intelligent travel companion</p>
                              </div>

                              {/* Search Input */}
                              <div style={{
                                background: '#F5F5F5',
                                borderRadius: '16px',
                                padding: '16px',
                                border: '1px solid rgba(0,0,0,0.08)',
                                marginBottom: '24px',
                              }}>
                                <div style={{
                                  fontSize: '11px',
                                  color: 'rgba(0,0,0,0.5)',
                                  marginBottom: '8px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                }}>Where do you want to go?</div>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                }}>
                                  <Search size={16} style={{ color: 'rgba(0,0,0,0.3)' }} />
                                  <span style={{
                                    fontSize: '14px',
                                    color: 'rgba(0,0,0,0.35)',
                                  }}>Search destinations...</span>
                                </div>
                              </div>

                              {/* Suggested Destinations */}
                              <div style={{ marginBottom: '16px' }}>
                                <div style={{
                                  fontSize: '11px',
                                  color: 'rgba(0,0,0,0.5)',
                                  marginBottom: '12px',
                                  fontWeight: '600',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                }}>Popular Destinations</div>
                                <div style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1fr 1fr',
                                  gap: '10px',
                                }}>
                                  {[
                                    { name: 'Taj Mahal', location: 'Agra, India', temp: '28°C', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop' },
                                    { name: 'Maldives', location: 'South Asia', temp: '30°C', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop' },
                                    { name: 'Paris', location: 'France', temp: '18°C', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop' },
                                    { name: 'Tokyo', location: 'Japan', temp: '22°C', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop' },
                                    { name: 'Dubai', location: 'UAE', temp: '35°C', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop' },
                                    { name: 'Singapore', location: 'Southeast Asia', temp: '32°C', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop' },
                                  ].map((dest) => (
                                    <motion.button
                                      key={dest.name}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => {
                                        setSelectedDestination(dest);
                                        setAiExplorerScreen('loading');
                                        setTimeout(() => setAiExplorerScreen('results'), 1800);
                                      }}
                                      style={{
                                        background: '#FFFFFF',
                                        border: '1px solid rgba(0,0,0,0.08)',
                                        borderRadius: '14px',
                                        padding: '0',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                        overflow: 'hidden',
                                      }}
                                    >
                                      <div style={{
                                        width: '100%',
                                        height: '70px',
                                        backgroundImage: `url(${dest.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                      }} />
                                      <div style={{ padding: '10px 12px' }}>
                                        <div style={{
                                          fontSize: '13px',
                                          fontWeight: '600',
                                          color: '#1A1A1A',
                                          marginBottom: '2px',
                                        }}>{dest.name}</div>
                                        <div style={{
                                          fontSize: '10px',
                                          color: 'rgba(0,0,0,0.5)',
                                        }}>{dest.location}</div>
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>
                              </div>

                              {/* AI Badge */}
                              <div style={{
                                marginTop: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                padding: '10px',
                                background: 'rgba(0,0,0,0.03)',
                                borderRadius: '12px',
                                flexShrink: 0,
                              }}>
                                <Sparkles size={14} style={{ color: `rgb(${brandRgb})` }} />
                                <span style={{
                                  fontSize: '11px',
                                  color: 'rgba(0,0,0,0.5)',
                                }}>Powered by AI.g — 3rd Place, Battle of Apps</span>
                              </div>
                            </motion.div>
                          )}

                          {/* SCREEN 2: Loading State */}
                          {aiExplorerScreen === 'loading' && selectedDestination && (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '40px 20px',
                                background: `linear-gradient(180deg, rgba(${brandRgb}, 0.1) 0%, transparent 50%)`,
                              }}
                            >
                              {/* Airplane Animation */}
                              <motion.div
                                animate={{
                                  y: [0, -10, 0],
                                  rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                                style={{
                                  marginBottom: '24px',
                                }}
                              >
                                <Plane size={48} style={{ color: `rgb(${brandRgb})` }} />
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                  textAlign: 'center',
                                }}
                              >
                                <div style={{
                                  fontSize: '13px',
                                  color: 'rgba(0,0,0,0.5)',
                                  marginBottom: '8px',
                                }}>Taking you on a trip to</div>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.4 }}
                                  style={{
                                    fontSize: '22px',
                                    fontWeight: '700',
                                    color: '#1A1A1A',
                                    marginBottom: '20px',
                                  }}
                                >
                                  {selectedDestination.name}
                                </motion.div>
                              </motion.div>

                              {/* Progress Bar */}
                              <div style={{
                                width: '200px',
                                height: '4px',
                                borderRadius: '2px',
                                background: 'rgba(0,0,0,0.08)',
                                overflow: 'hidden',
                              }}>
                                <motion.div
                                  initial={{ width: '0%' }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 1.5, ease: 'easeOut' }}
                                  style={{
                                    height: '100%',
                                    background: `rgb(${brandRgb})`,
                                    borderRadius: '2px',
                                  }}
                                />
                              </div>

                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                style={{
                                  marginTop: '16px',
                                  fontSize: '11px',
                                  color: 'rgba(0,0,0,0.4)',
                                }}
                              >
                                Curating your personalized itinerary...
                              </motion.div>
                            </motion.div>
                          )}

                          {/* SCREEN 3: Results Page */}
                          {aiExplorerScreen === 'results' && selectedDestination && (
                            <motion.div
                              key="results"
                              ref={resultsScreenRef}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              onWheel={(e) => {
                                e.stopPropagation();
                                if (resultsScreenRef.current) {
                                  resultsScreenRef.current.scrollTop += e.deltaY;
                                }
                              }}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                WebkitOverflowScrolling: 'touch',
                                touchAction: 'pan-y',
                                overscrollBehavior: 'contain',
                              }}
                            >
                              {/* Hero Image */}
                              <div style={{
                                height: '180px',
                                backgroundImage: `linear-gradient(180deg, transparent 0%, rgba(248,248,248,0.6) 60%, rgba(248,248,248,1) 100%), url(${selectedDestination.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '16px',
                                position: 'relative',
                              }}>
                                {/* Back Button */}
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    setAiExplorerScreen('home');
                                    setSelectedDestination(null);
                                  }}
                                  style={{
                                    position: 'absolute',
                                    top: '52px',
                                    left: '12px',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.9)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                  }}
                                >
                                  <ArrowLeft size={16} style={{ color: '#1A1A1A' }} />
                                </motion.button>

                                {/* Weather Pill */}
                                <div style={{
                                  position: 'absolute',
                                  top: '52px',
                                  right: '12px',
                                  padding: '6px 12px',
                                  borderRadius: '20px',
                                  background: 'rgba(255,255,255,0.9)',
                                  backdropFilter: 'blur(10px)',
                                  border: '1px solid rgba(0,0,0,0.08)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="4"/>
                                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                                  </svg>
                                  <span style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: '500' }}>
                                    {selectedDestination.temp}
                                  </span>
                                </div>

                                {/* Destination Title */}
                                <h2 style={{
                                  fontSize: '22px',
                                  fontWeight: '700',
                                  color: '#1A1A1A',
                                  marginBottom: '4px',
                                  textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                                }}>{selectedDestination.name}</h2>
                                <p style={{
                                  fontSize: '12px',
                                  color: 'rgba(0,0,0,0.6)',
                                }}>{selectedDestination.location}</p>
                              </div>

                              {/* Content */}
                              <div style={{ padding: '16px' }}>
                                {/* Why Visit */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  style={{
                                    background: '#FFFFFF',
                                    borderRadius: '14px',
                                    padding: '14px',
                                    marginBottom: '12px',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                  }}
                                >
                                  <div style={{
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    color: `rgb(${brandRgb})`,
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                  }}>Why Visit?</div>
                                  <p style={{
                                    fontSize: '12px',
                                    color: 'rgba(0,0,0,0.7)',
                                    lineHeight: '1.5',
                                  }}>
                                    {selectedDestination.name === 'Taj Mahal'
                                      ? 'A UNESCO World Heritage Site and one of the Seven Wonders of the World. Best visited at sunrise.'
                                      : `Experience the beauty of ${selectedDestination.name}, curated just for you.`}
                                  </p>
                                </motion.div>

                                {/* Best Flights */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.15 }}
                                  style={{
                                    marginBottom: '12px',
                                    padding: '14px',
                                    background: '#FFFFFF',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                  }}
                                >
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '12px',
                                  }}>
                                    <div style={{
                                      fontSize: '11px',
                                      fontWeight: '600',
                                      color: `rgb(${brandRgb})`,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px',
                                    }}>Best Flights</div>
                                    <div style={{
                                      fontSize: '10px',
                                      color: 'rgba(0,0,0,0.4)',
                                    }}>From Delhi</div>
                                  </div>

                                  {[
                                    { airline: 'Air India', depart: '06:30', arrive: '07:15', price: '₹3,450', duration: '45m', direct: true },
                                  ].map((flight, i) => (
                                    <motion.div
                                      key={flight.airline}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 + i * 0.08 }}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '10px 12px',
                                        background: i === 0 ? `rgba(${brandRgb}, 0.06)` : 'rgba(0,0,0,0.02)',
                                        borderRadius: '10px',
                                        marginBottom: i === 0 ? '8px' : '0',
                                        border: i === 0 ? `1px solid rgba(${brandRgb}, 0.15)` : '1px solid transparent',
                                      }}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                          width: '32px',
                                          height: '32px',
                                          borderRadius: '8px',
                                          background: flight.airline === 'Air India' ? `rgb(${brandRgb})` : '#3B82F6',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                          <Plane size={14} style={{ color: 'white' }} />
                                        </div>
                                        <div>
                                          <div style={{ fontSize: '12px', fontWeight: '600', color: '#1A1A1A' }}>{flight.airline}</div>
                                          <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.5)' }}>
                                            {flight.depart} → {flight.arrive} · {flight.duration}
                                          </div>
                                        </div>
                                      </div>
                                      <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A1A1A' }}>{flight.price}</div>
                                        <div style={{ fontSize: '9px', color: `rgb(${brandRgb})`, fontWeight: '500' }}>Direct</div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </motion.div>

                                {/* AI-Picked Stays */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.18 }}
                                  style={{
                                    marginBottom: '12px',
                                    padding: '14px',
                                    background: '#FFFFFF',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                  }}
                                >
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '12px',
                                  }}>
                                    <div style={{
                                      fontSize: '11px',
                                      fontWeight: '600',
                                      color: `rgb(${brandRgb})`,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px',
                                    }}>AI-Picked Stays</div>
                                    <div style={{
                                      fontSize: '10px',
                                      color: 'rgba(0,0,0,0.5)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                    }}>
                                      <Sparkles size={10} />
                                      Top Rated
                                    </div>
                                  </div>

                                  {[
                                    { name: 'Oberoi Amarvilas', stars: 5, price: '₹28,000', location: 'Taj view rooms' },
                                    { name: 'ITC Mughal', stars: 5, price: '₹15,500', location: '5 min from Taj' },
                                  ].map((hotel, i) => (
                                    <motion.div
                                      key={hotel.name}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.25 + i * 0.08 }}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '10px',
                                        background: i === 0 ? `rgba(${brandRgb}, 0.06)` : 'rgba(0,0,0,0.02)',
                                        borderRadius: '10px',
                                        marginBottom: i === 0 ? '8px' : '0',
                                        border: i === 0 ? `1px solid rgba(${brandRgb}, 0.15)` : '1px solid transparent',
                                      }}
                                    >
                                      <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #F3E8FF, #E9D5FF)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '18px',
                                      }}>
                                        🏨
                                      </div>
                                      <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#1A1A1A', marginBottom: '2px' }}>{hotel.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                          <div style={{ display: 'flex', gap: '1px' }}>
                                            {[...Array(hotel.stars)].map((_, s) => (
                                              <span key={s} style={{ fontSize: '8px', color: '#F59E0B' }}>★</span>
                                            ))}
                                          </div>
                                          <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.5)' }}>· {hotel.location}</span>
                                        </div>
                                      </div>
                                      <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#1A1A1A' }}>{hotel.price}</div>
                                        <div style={{ fontSize: '9px', color: 'rgba(0,0,0,0.4)' }}>/night</div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </motion.div>

                                {/* AI Itinerary */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 }}
                                  style={{ marginBottom: '12px' }}
                                >
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '10px',
                                  }}>
                                    <div style={{
                                      fontSize: '11px',
                                      fontWeight: '600',
                                      color: 'rgba(0,0,0,0.7)',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px',
                                    }}>7-Day Itinerary</div>
                                    <div style={{
                                      fontSize: '10px',
                                      color: 'rgba(0,0,0,0.5)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                    }}>
                                      <Sparkles size={10} />
                                      AI Curated
                                    </div>
                                  </div>

                                  {[
                                    { day: 1, title: 'Arrive & Explore Old City', time: '9:00 AM', icon: '🏛️', cost: '₹500', duration: '4h' },
                                    { day: 2, title: 'Sunrise at Main Site', time: '5:30 AM', icon: '🌅', cost: '₹1,100', duration: '6h' },
                                    { day: 3, title: 'Local Markets & Culture', time: '10:00 AM', icon: '🛍️', cost: '₹2,000', duration: '5h' },
                                  ].map((item, i) => (
                                    <motion.div
                                      key={item.day}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.3 + i * 0.1 }}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '10px',
                                        background: i === 0 ? `rgba(${brandRgb}, 0.08)` : '#FFFFFF',
                                        borderRadius: '10px',
                                        marginBottom: '8px',
                                        border: i === 0 ? `1px solid rgba(${brandRgb}, 0.2)` : '1px solid rgba(0,0,0,0.06)',
                                        boxShadow: i === 0 ? 'none' : '0 1px 4px rgba(0,0,0,0.04)',
                                      }}
                                    >
                                      <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: i === 0 ? `rgb(${brandRgb})` : 'rgba(0,0,0,0.04)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                      }}>
                                        {item.icon}
                                      </div>
                                      <div style={{ flex: 1 }}>
                                        <div style={{
                                          fontSize: '12px',
                                          fontWeight: '600',
                                          color: '#1A1A1A',
                                          marginBottom: '3px',
                                        }}>{item.title}</div>
                                        <div style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px',
                                          fontSize: '10px',
                                          color: 'rgba(0,0,0,0.5)',
                                        }}>
                                          <span>{item.time}</span>
                                          <span>·</span>
                                          <span>{item.duration}</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        color: i === 0 ? `rgb(${brandRgb})` : 'rgba(0,0,0,0.6)',
                                      }}>
                                        {item.cost}
                                      </div>
                                    </motion.div>
                                  ))}

                                  <div style={{
                                    fontSize: '11px',
                                    color: 'rgba(0,0,0,0.4)',
                                    textAlign: 'center',
                                    padding: '8px',
                                  }}>
                                    + 4 more days...
                                  </div>
                                </motion.div>

                                {/* Quick Tips */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.35 }}
                                  style={{
                                    marginBottom: '12px',
                                    padding: '14px',
                                    background: '#FFFFFF',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                  }}
                                >
                                  <div style={{
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    color: `rgb(${brandRgb})`,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: '12px',
                                  }}>Quick Tips</div>

                                  <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '10px',
                                  }}>
                                    {[
                                      { label: 'Best Time', value: 'Oct - Mar', icon: '📅' },
                                      { label: 'Visa', value: 'e-Visa available', icon: '📋' },
                                      { label: 'Currency', value: 'INR (₹)', icon: '💱' },
                                      { label: 'Tip', value: 'Remove shoes at monuments', icon: '👟' },
                                    ].map((tip, i) => (
                                      <motion.div
                                        key={tip.label}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + i * 0.05 }}
                                        style={{
                                          padding: '10px',
                                          background: 'rgba(0,0,0,0.02)',
                                          borderRadius: '10px',
                                          border: '1px solid rgba(0,0,0,0.04)',
                                        }}
                                      >
                                        <div style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '6px',
                                          marginBottom: '4px',
                                        }}>
                                          <span style={{ fontSize: '12px' }}>{tip.icon}</span>
                                          <span style={{ fontSize: '9px', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{tip.label}</span>
                                        </div>
                                        <div style={{
                                          fontSize: '11px',
                                          fontWeight: '600',
                                          color: '#1A1A1A',
                                          lineHeight: '1.3',
                                        }}>{tip.value}</div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>

                                {/* Book Flight CTA */}
                                <motion.button
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5 }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => {
                                    setAiExplorerScreen('home');
                                    setSelectedDestination(null);
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '14px',
                                    background: `rgb(${brandRgb})`,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: `0 8px 24px rgba(${brandRgb}, 0.3)`,
                                  }}
                                >
                                  <Plane size={16} style={{ color: 'white' }} />
                                  <span style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: 'white',
                                  }}>Book Flight</span>
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Disclaimer + App Store Links */}
                    <div style={{
                      marginTop: '20px',
                      textAlign: 'center',
                      maxWidth: '320px',
                      margin: '20px auto 0',
                    }}>
                      <p style={{
                        fontSize: '11px',
                        color: 'var(--text-50)',
                        marginBottom: '16px',
                        lineHeight: '1.5',
                      }}>
                        This is a conceptual representation.<br />
                        The AI Explorer feature will be released in the Air India app soon.
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '12px',
                      }}>
                        <a
                          href="https://apps.apple.com/in/app/air-india-book-flight-tickets/id932302964"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            background: '#000',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            transition: 'transform 0.2s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)', lineHeight: 1 }}>Download on the</div>
                            <div style={{ fontSize: '12px', color: 'white', fontWeight: '600', lineHeight: 1.2 }}>App Store</div>
                          </div>
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.bets.airindia.ui"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            background: '#000',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            transition: 'transform 0.2s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                          </svg>
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)', lineHeight: 1 }}>Get it on</div>
                            <div style={{ fontSize: '12px', color: 'white', fontWeight: '600', lineHeight: 1.2 }}>Google Play</div>
                          </div>
                        </a>
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
                      {/* Impact Header */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '24px',
                        paddingBottom: '20px',
                        borderBottom: '1px solid var(--glass-10)',
                      }}>
                        <div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '8px',
                          }}>
                            <span style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              background: `rgba(${project.color}, 0.15)`,
                              fontSize: '9px',
                              fontWeight: '700',
                              color: `rgb(${project.color})`,
                              letterSpacing: '0.1em',
                            }}>EARLY ADOPTER</span>
                            <span style={{
                              fontSize: '10px',
                              color: 'var(--text-40)',
                            }}>Implemented Q1 2025</span>
                          </div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'var(--text-90)',
                          }}>Bridging Design-Engineering Handoff with MCP</div>
                        </div>

                        {/* Impact Metrics */}
                        <div style={{ display: 'flex', gap: '20px' }}>
                          {[
                            { value: '3x', label: 'Faster' },
                            { value: '75%', label: 'Accuracy' },
                            { value: '0', label: 'Manual Docs' },
                          ].map((stat) => (
                            <div key={stat.label} style={{ textAlign: 'center' }}>
                              <div style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                color: `rgb(${project.color})`,
                                lineHeight: 1,
                              }}>{stat.value}</div>
                              <div style={{
                                fontSize: '9px',
                                color: 'var(--text-40)',
                                marginTop: '4px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}>{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pipeline Stages */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: '16px',
                        marginBottom: '24px',
                        position: 'relative',
                      }}>
                        {[
                          {
                            icon: '◇',
                            title: 'FIGMA DESIGN',
                            items: ['Components', 'Variables', 'Styles', 'Tokens'],
                            phase: 'design',
                            color: '#A259FF'
                          },
                          {
                            icon: '⚡',
                            title: 'MCP SERVER',
                            items: ['get_design_context()', 'get_variables()', 'get_code_connect()'],
                            phase: 'server',
                            color: '#0D99FF'
                          },
                          {
                            icon: '◉',
                            title: 'AI AGENT',
                            items: ['Claude 4.5', 'Cursor', 'VS Code'],
                            phase: 'agent',
                            color: '#30D158'
                          },
                          {
                            icon: '</>',
                            title: 'CODE OUTPUT',
                            items: ['<Button />', 'Tokens Applied', 'Zero Translation'],
                            phase: 'output',
                            color: '#FF9F0A'
                          },
                        ].map((stage) => (
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

                      {/* Industry Adoption */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                        marginBottom: '20px',
                        padding: '12px 0',
                      }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-30)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Adopted by</span>
                        {['Anthropic', 'OpenAI', 'Figma', 'Cursor'].map((company) => (
                          <span key={company} style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: 'var(--text-50)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: 'var(--glass-04)',
                            border: '1px solid var(--glass-08)',
                          }}>{company}</span>
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
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '10px',
                        }}>
                          <div style={{
                            fontSize: '9px',
                            fontWeight: '600',
                            color: '#30D158',
                            letterSpacing: '0.15em',
                          }}>
                            LIVE CONTEXT STREAM
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}>
                            <span style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: mcpPhase !== 'idle' ? '#30D158' : 'var(--glass-30)',
                              animation: mcpPhase !== 'idle' ? 'statusPulse 1s ease infinite' : 'none',
                            }} />
                            <span style={{ fontSize: '9px', color: 'var(--text-40)' }}>
                              {mcpPhase !== 'idle' ? 'Streaming...' : 'Ready'}
                            </span>
                          </div>
                        </div>
                        <pre style={{
                          fontFamily: 'SF Mono, Monaco, monospace',
                          fontSize: '10px',
                          color: '#30D158',
                          opacity: mcpPhase !== 'idle' ? 1 : 0.6,
                          transition: 'opacity 0.3s ease',
                          margin: 0,
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                        }}>
{`{
  "component": "Button",
  "variant": "primary",
  "tokens": {
    "color": "var(--brand-red)",
    "radius": "var(--radius-md)"
  },
  "codeConnect": "src/ui/Button.tsx"
}`}
                        </pre>
                      </div>

                      {/* Action Button & Impact Statement */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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
                          {mcpPhase === 'idle' ? 'Watch Pipeline Demo' : 'Streaming Context...'}
                        </button>

                        <div style={{ fontSize: '11px', color: 'var(--text-50)', maxWidth: '300px', textAlign: 'right' }}>
                          Reduced design-to-code cycle from <span style={{ color: `rgb(${project.color})`, fontWeight: '600' }}>days to hours</span>
                        </div>
                      </div>
                    </div>
                    </>
                  ) : index === 4 ? (
                    /* Card 4: IFE System Design - Real IFE Image */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '900px',
                      margin: '0 auto',
                    }}>
                      {/* IFE Image */}
                      <div style={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid var(--glass-15)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                        marginBottom: '24px',
                      }}>
                        <Image
                          src="/images/air-india/IFE.png"
                          alt="Passenger using Air India In-Flight Entertainment system"
                          width={900}
                          height={600}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
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

                      {/* Learn More Link */}
                      <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <a
                          href="https://www.airindia.com/in/en/experience/in-air/whats-on-my-ai/inflight-entertainment.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '12px',
                            color: `rgb(${project.color})`,
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: `rgba(${project.color}, 0.1)`,
                            border: `1px solid rgba(${project.color}, 0.2)`,
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Learn more about Air India IFE
                          <span style={{ fontSize: '14px' }}>→</span>
                        </a>
                      </div>
                    </div>
                    </>
                  ) : index === 5 ? (
                    /* Card 5: NPS Feedback System - Vihaan.AI Transformation Journey */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '1000px',
                      margin: '0 auto',
                    }}>
                      {/* Section 1: Vihaan.AI Transformation Timeline */}
                      <div style={{
                        padding: '24px',
                        borderRadius: '16px',
                        background: 'var(--glass-06)',
                        border: `1px solid rgba(${project.color}, 0.2)`,
                        marginBottom: '20px',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '20px',
                        }}>
                          <span style={{ fontSize: '10px', fontWeight: '600', color: `rgb(${project.color})`, letterSpacing: '0.15em' }}>
                            VIHAAN.AI TRANSFORMATION
                          </span>
                          <div style={{ flex: 1, height: '1px', background: `rgba(${project.color}, 0.3)` }} />
                        </div>

                        {/* Timeline */}
                        <div style={{ position: 'relative', padding: '20px 0' }}>
                          {/* Progress Line */}
                          <div style={{
                            position: 'absolute',
                            top: '35px',
                            left: isMobile ? '20px' : '10%',
                            width: isMobile ? '4px' : '80%',
                            height: isMobile ? 'calc(100% - 70px)' : '4px',
                            background: 'var(--glass-15)',
                            borderRadius: '2px',
                          }}>
                            <div style={{
                              width: isMobile ? '100%' : '100%',
                              height: isMobile ? '100%' : '100%',
                              background: `linear-gradient(${isMobile ? '180deg' : '90deg'}, rgb(${project.color}), #8B5CF6, #3B82F6)`,
                              borderRadius: '2px',
                            }} />
                          </div>

                          {/* Milestones */}
                          <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            justifyContent: 'space-between',
                            gap: isMobile ? '24px' : '0',
                            position: 'relative',
                            zIndex: 1,
                          }}>
                            {[
                              { date: 'JAN 2022', title: 'Tata Acquisition', subtitle: '63% OTP', phase: 'START' },
                              { date: 'SEP 2022', title: 'Vihaan.AI Launch', subtitle: '5-Year Plan', phase: 'TAXI' },
                              { date: 'MAR 2023', title: 'Digital NPS Live', subtitle: '140K+ responses', phase: 'TAKE OFF' },
                              { date: '2024', title: 'Phase 2 Complete', subtitle: '4 Airlines Merged', phase: 'TAKE OFF' },
                              { date: '2025', title: 'APEX Four Star', subtitle: '"Most Improved"', phase: 'CLIMB' },
                            ].map((milestone, i) => (
                              <div key={milestone.date} style={{
                                display: 'flex',
                                flexDirection: isMobile ? 'row' : 'column',
                                alignItems: isMobile ? 'flex-start' : 'center',
                                gap: isMobile ? '16px' : '8px',
                                textAlign: isMobile ? 'left' : 'center',
                                flex: isMobile ? 'none' : 1,
                              }}>
                                {/* Node */}
                                <div style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  background: i === 4 ? '#30D158' : `rgb(${project.color})`,
                                  border: '3px solid var(--glass-06)',
                                  boxShadow: `0 0 20px rgba(${project.color}, 0.4)`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}>
                                  {i === 4 && <span style={{ fontSize: '10px' }}>✓</span>}
                                </div>
                                <div>
                                  <div style={{ fontSize: '9px', color: `rgb(${project.color})`, fontWeight: '600', letterSpacing: '0.1em', marginBottom: '2px' }}>
                                    {milestone.date}
                                  </div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-90)', marginBottom: '2px' }}>
                                    {milestone.title}
                                  </div>
                                  <div style={{ fontSize: '10px', color: 'var(--text-50)' }}>
                                    {milestone.subtitle}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Phase Labels */}
                          {!isMobile && (
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                              marginTop: '16px',
                              paddingTop: '12px',
                              borderTop: '1px solid var(--glass-10)',
                            }}>
                              {['TAXI', 'TAKE OFF', 'CLIMB'].map((phase, i) => (
                                <span key={phase} style={{
                                  fontSize: '9px',
                                  fontWeight: '700',
                                  color: i === 2 ? '#30D158' : 'var(--text-40)',
                                  letterSpacing: '0.15em',
                                  padding: '4px 12px',
                                  borderRadius: '10px',
                                  background: i === 2 ? 'rgba(48, 209, 88, 0.15)' : 'var(--glass-06)',
                                }}>
                                  {phase}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Section 2: NPS Score Hero */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: '20px',
                        marginBottom: '20px',
                      }}>
                        {/* +40 Points Card */}
                        <div style={{
                          padding: '32px',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, rgba(48, 209, 88, 0.15), var(--glass-06))',
                          border: '1px solid rgba(48, 209, 88, 0.3)',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: '10px', color: '#30D158', fontWeight: '600', letterSpacing: '0.15em', marginBottom: '12px' }}>
                            NPS IMPROVEMENT
                          </div>
                          <div style={{
                            fontSize: '64px',
                            fontWeight: '700',
                            color: '#30D158',
                            lineHeight: 1,
                            textShadow: '0 0 40px rgba(48, 209, 88, 0.5)',
                          }}>
                            +40
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-70)', marginTop: '8px' }}>
                            points since Tata acquisition
                          </div>
                          <div style={{
                            marginTop: '16px',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: 'rgba(48, 209, 88, 0.2)',
                            display: 'inline-block',
                          }}>
                            <span style={{ fontSize: '11px', color: '#30D158', fontWeight: '600' }}>
                              A350 Fleet: NPS 56 (World-Class)
                            </span>
                          </div>
                        </div>

                        {/* Gauge Visualization */}
                        <div style={{
                          padding: '24px',
                          borderRadius: '16px',
                          background: 'var(--glass-06)',
                          border: '1px solid var(--glass-15)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <svg viewBox="0 0 200 120" style={{ width: '180px', height: '110px' }}>
                            {/* Background arc */}
                            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--glass-15)" strokeWidth="12" strokeLinecap="round" />
                            {/* Colored segments */}
                            <path d="M 20 100 A 80 80 0 0 1 60 35" fill="none" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
                            <path d="M 60 35 A 80 80 0 0 1 140 35" fill="none" stroke="#F59E0B" strokeWidth="12" />
                            <path d="M 140 35 A 80 80 0 0 1 180 100" fill="none" stroke="#30D158" strokeWidth="12" strokeLinecap="round" />
                            {/* Needle pointing to excellent zone */}
                            <line x1="100" y1="100" x2="100" y2="35" stroke="white" strokeWidth="3" strokeLinecap="round"
                              style={{ transformOrigin: '100px 100px', transform: 'rotate(75deg)' }} />
                            <circle cx="100" cy="100" r="6" fill="white" />
                          </svg>
                          <div style={{ fontSize: '11px', color: 'var(--text-50)', marginTop: '8px' }}>
                            Upper Four Star Category
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Impact Metrics Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: '12px',
                        marginBottom: '20px',
                      }}>
                        {[
                          { icon: '📊', value: '140K+', label: 'Feedback responses', sublabel: 'in 3 months' },
                          { icon: '⏱️', value: '63% → 87%', label: 'On-Time Performance', sublabel: 'transformation' },
                          { icon: '⭐', value: '4.7★', label: 'App Store Rating', sublabel: 'Best Indian Airline' },
                          { icon: '🔄', value: 'Paper → Digital', label: 'Feedback System', sublabel: 'modernization' },
                        ].map((metric) => (
                          <div key={metric.label} style={{
                            padding: '20px 16px',
                            borderRadius: '12px',
                            background: 'var(--glass-06)',
                            border: '1px solid var(--glass-15)',
                            textAlign: 'center',
                          }}>
                            <span style={{ fontSize: '20px' }}>{metric.icon}</span>
                            <div style={{
                              fontSize: metric.value.length > 8 ? '14px' : '18px',
                              fontWeight: '700',
                              color: `rgb(${project.color})`,
                              marginTop: '8px',
                            }}>
                              {metric.value}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-70)', marginTop: '4px' }}>
                              {metric.label}
                            </div>
                            <div style={{ fontSize: '9px', color: 'var(--text-40)' }}>
                              {metric.sublabel}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Section 4: Industry Recognition Bar */}
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                      }}>
                        {[
                          { award: 'APEX 2025', detail: 'Most Improved Airline', color: '#30D158' },
                          { award: 'Gold Stevie 2024', detail: 'Mobile App Innovation', color: '#F59E0B' },
                          { award: 'Upper Four Star', detail: 'NPS 50+ Category', color: '#8B5CF6' },
                        ].map((badge) => (
                          <div key={badge.award} style={{
                            padding: '12px 20px',
                            borderRadius: '12px',
                            background: `rgba(${badge.color === '#30D158' ? '48, 209, 88' : badge.color === '#F59E0B' ? '245, 158, 11' : '139, 92, 246'}, 0.1)`,
                            border: `1px solid ${badge.color}30`,
                            textAlign: 'center',
                          }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: badge.color }}>
                              {badge.award}
                            </div>
                            <div style={{ fontSize: '9px', color: 'var(--text-50)', marginTop: '2px' }}>
                              {badge.detail}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Technical Scale Section */}
                      <div style={{
                        marginTop: '28px',
                        paddingTop: '24px',
                        borderTop: '1px solid var(--glass-10)',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          marginBottom: '20px',
                        }}>
                          <Server size={14} style={{ color: 'var(--text-40)' }} />
                          <span style={{ fontSize: '10px', color: 'var(--text-40)', letterSpacing: '0.15em', fontWeight: '600' }}>
                            DIGITAL TRANSFORMATION SCALE
                          </span>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                          gap: '16px',
                        }}>
                          {/* $200M Investment */}
                          <div style={{
                            padding: '20px 16px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(48, 209, 88, 0.08) 0%, rgba(48, 209, 88, 0.02) 100%)',
                            border: '1px solid rgba(48, 209, 88, 0.15)',
                            textAlign: 'center',
                          }}>
                            <div style={{
                              fontSize: '28px',
                              fontWeight: '700',
                              color: '#30D158',
                              lineHeight: 1,
                              marginBottom: '4px',
                            }}>
                              $200M
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-50)', lineHeight: 1.4 }}>
                              Investment in<br />digital systems
                            </div>
                          </div>

                          {/* 140 IT Systems */}
                          <div style={{
                            padding: '20px 16px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(13, 153, 255, 0.08) 0%, rgba(13, 153, 255, 0.02) 100%)',
                            border: '1px solid rgba(13, 153, 255, 0.15)',
                            textAlign: 'center',
                          }}>
                            <div style={{
                              fontSize: '28px',
                              fontWeight: '700',
                              color: '#0D99FF',
                              lineHeight: 1,
                              marginBottom: '4px',
                            }}>
                              140
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-50)', lineHeight: 1.4 }}>
                              Legacy IT systems<br />replaced
                            </div>
                          </div>

                          {/* Cloud-Only */}
                          <div style={{
                            padding: '20px 16px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(175, 82, 222, 0.08) 0%, rgba(175, 82, 222, 0.02) 100%)',
                            border: '1px solid rgba(175, 82, 222, 0.15)',
                            textAlign: 'center',
                          }}>
                            <div style={{
                              fontSize: '28px',
                              fontWeight: '700',
                              color: '#AF52DE',
                              lineHeight: 1,
                              marginBottom: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                            }}>
                              <Cloud size={22} />
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-50)', lineHeight: 1.4 }}>
                              Cloud-only infra<br />(industry first)
                            </div>
                          </div>

                          {/* Cost Savings */}
                          <div style={{
                            padding: '20px 16px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(255, 159, 10, 0.08) 0%, rgba(255, 159, 10, 0.02) 100%)',
                            border: '1px solid rgba(255, 159, 10, 0.15)',
                            textAlign: 'center',
                          }}>
                            <div style={{
                              fontSize: '28px',
                              fontWeight: '700',
                              color: '#FF9F0A',
                              lineHeight: 1,
                              marginBottom: '4px',
                            }}>
                              ~$1M
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-50)', lineHeight: 1.4 }}>
                              Annual savings<br />from consolidation
                            </div>
                          </div>
                        </div>

                        {/* Timeline context */}
                        <div style={{
                          marginTop: '16px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '10px',
                          color: 'var(--text-30)',
                        }}>
                          <span>Vihaan.AI Program</span>
                          <span>•</span>
                          <span>2022-2025</span>
                          <span>•</span>
                          <span>4 airlines consolidated</span>
                        </div>
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
                    /* Card 7: Liftoff Program - Team Workshop Image */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '900px',
                      margin: '0 auto',
                    }}>
                      {/* Liftoff Image */}
                      <div style={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid var(--glass-15)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                        marginBottom: '24px',
                      }}>
                        <Image
                          src="/images/air-india/liftoff.png"
                          alt="Liftoff Program - Design team workshop session"
                          width={900}
                          height={600}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
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
                    /* Card 8: Microsoft Hackathon - Certificate Image */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '500px',
                      margin: '0 auto',
                    }}>
                      {/* Certificate Image */}
                      <div style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid var(--glass-15)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                        marginBottom: '20px',
                      }}>
                        <Image
                          src="/images/air-india/microsoft.jpeg"
                          alt="Microsoft | Air India Hackathon Winner Certificate - 2nd Prize"
                          width={500}
                          height={667}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>

                      {/* Award Badge */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
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
                          <span style={{ fontSize: '12px', fontWeight: '600', color: `rgb(${project.color})` }}>2nd Prize</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-40)' }}>Aug 2025 • Microsoft Azure AI</span>
                      </div>
                    </div>
                    </>
                  ) : index === 9 ? (
                    /* Card 9: Internal Hackathon - Team Photo */
                    <>
                    <div style={{
                      width: '100%',
                      maxWidth: '800px',
                      margin: '0 auto',
                    }}>
                      {/* Team Photo */}
                      <div style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid var(--glass-15)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                        marginBottom: '20px',
                      }}>
                        <Image
                          src="/images/air-india/internal_hackathon.jpeg"
                          alt="Internal Hackathon Winner - Team receiving certificate"
                          width={800}
                          height={600}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
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
                        <span style={{ fontSize: '11px', color: 'var(--text-40)' }}>24hr Build • Firebase Studio</span>
                      </div>
                    </div>
                    </>
                  ) : index === 2 ? (
                    /* Search with AI - Interactive Demo */
                    <>
                    {/* Interactive Prototype Helper */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                      padding: '8px 16px',
                      background: `rgba(${project.color}, 0.1)`,
                      borderRadius: '20px',
                      border: `1px solid rgba(${project.color}, 0.2)`,
                      width: 'fit-content',
                      margin: '0 auto 12px',
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: `rgb(${project.color})`,
                        animation: 'statusPulse 1.5s ease infinite',
                      }} />
                      <span style={{
                        fontSize: '11px',
                        color: 'var(--text-70)',
                        fontWeight: '500',
                      }}>
                        Interactive Prototype
                      </span>
                      <span style={{
                        fontSize: '10px',
                        color: 'var(--text-40)',
                      }}>
                        — Click &quot;Send&quot; to see AI in action
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
                      fontSize: '11px',
                    }}>
                      {/* LEFT PANEL: AI.g Chat Interface */}
                      <div style={{
                        background: '#1A1A2E',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                        {/* Chat Header */}
                        <div style={{
                          background: '#0F0F1A',
                          padding: '12px 16px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '8px',
                              background: `linear-gradient(135deg, rgb(${project.color}), rgb(${brandRgb}))`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <span style={{ fontSize: '14px' }}>✈️</span>
                            </div>
                            <div>
                              <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)' }}>AI.g</span>
                              <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>Air India Assistant</div>
                            </div>
                          </div>
                          <div style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            background: 'rgba(48, 209, 88, 0.15)',
                            fontSize: '10px',
                            fontWeight: '600',
                            color: '#30D158',
                          }}>
                            3rd Place - Battle of Apps
                          </div>
                        </div>

                        {/* Chat Messages */}
                        <div style={{
                          flex: 1,
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          minHeight: '280px',
                          maxHeight: '320px',
                          overflowY: 'auto',
                        }}>
                          {/* User Message */}
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{
                              maxWidth: '80%',
                              padding: '10px 14px',
                              borderRadius: '16px 16px 4px 16px',
                              background: `rgb(${project.color})`,
                              color: 'white',
                              fontSize: '12px',
                              lineHeight: 1.4,
                            }}>
                              {queryPhase === 'idle' ? 'Show me flights to Delhi under ₹5000 next weekend' :
                               queryPhase === 'typing' ? displayedQuery.replace(/"/g, '') :
                               'Show me flights to Delhi under ₹5000 next weekend'}
                            </div>
                          </div>

                          {/* AI Response - appears after processing */}
                          {(queryPhase === 'results' || queryPhase === 'idle') && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                              <div style={{
                                maxWidth: '85%',
                                padding: '12px 14px',
                                borderRadius: '16px 16px 16px 4px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '12px',
                                lineHeight: 1.5,
                              }}>
                                <div style={{ marginBottom: '10px' }}>
                                  I found <strong style={{ color: `rgb(${project.color})` }}>12 flights</strong> to Delhi for next weekend under ₹5,000:
                                </div>
                                {/* Flight Cards */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {[
                                    { flight: 'AI-302', time: '06:00', price: '₹4,299', seats: '8 left' },
                                    { flight: 'AI-456', time: '08:30', price: '₹4,599', seats: '12 left' },
                                    { flight: 'AI-118', time: '14:15', price: '₹4,850', seats: '5 left' },
                                  ].map((f, i) => (
                                    <div key={i} style={{
                                      padding: '8px 12px',
                                      borderRadius: '8px',
                                      background: 'rgba(255, 255, 255, 0.06)',
                                      border: i === 0 ? `1px solid rgba(${project.color}, 0.4)` : '1px solid rgba(255, 255, 255, 0.08)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      opacity: queryPhase === 'results' ? 1 : 0.7,
                                      transition: `all 0.3s ease ${i * 0.1}s`,
                                    }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>{f.flight}</span>
                                        <span style={{ fontWeight: '600', color: 'white' }}>{f.time}</span>
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '10px', color: '#30D158' }}>{f.seats}</span>
                                        <span style={{ fontWeight: '700', color: `rgb(${project.color})` }}>{f.price}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ marginTop: '10px', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                  Would you like me to book one of these?
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Processing indicator */}
                          {queryPhase !== 'idle' && queryPhase !== 'results' && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                              <div style={{
                                padding: '10px 14px',
                                borderRadius: '16px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: `rgb(${project.color})`, animation: 'statusPulse 0.8s ease infinite' }} />
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: `rgb(${project.color})`, animation: 'statusPulse 0.8s ease infinite 0.2s' }} />
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: `rgb(${project.color})`, animation: 'statusPulse 0.8s ease infinite 0.4s' }} />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Chat Input */}
                        <div style={{
                          padding: '12px 16px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}>
                          <div style={{
                            flex: 1,
                            padding: '10px 14px',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.4)',
                          }}>
                            Type your travel plans...
                          </div>
                          <button
                            onClick={() => {
                              if (queryPhase !== 'idle') return;
                              const fullQuery = '"Show me flights to Delhi under ₹5000 next weekend"';
                              setQueryPhase('typing');
                              setDisplayedQuery('');

                              let charIndex = 0;
                              const typeInterval = setInterval(() => {
                                if (charIndex < fullQuery.length) {
                                  setDisplayedQuery(fullQuery.slice(0, charIndex + 1));
                                  charIndex++;
                                } else {
                                  clearInterval(typeInterval);
                                  setTimeout(() => setQueryPhase('tokenize'), 300);
                                  setTimeout(() => setQueryPhase('entities'), 800);
                                  setTimeout(() => setQueryPhase('intent'), 1300);
                                  setTimeout(() => setQueryPhase('results'), 1800);
                                  setTimeout(() => setQueryPhase('idle'), 5000);
                                }
                              }, 25);
                            }}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: queryPhase === 'idle' ? `rgb(${project.color})` : 'rgba(255, 255, 255, 0.1)',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: queryPhase === 'idle' ? 'pointer' : 'default',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            <span style={{ color: 'white', fontSize: '14px' }}>→</span>
                          </button>
                        </div>
                      </div>

                      {/* RIGHT PANEL: NLU Pipeline Visualization */}
                      <div style={{
                        background: '#0F0F1A',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                      }}>
                        {/* Pipeline Header */}
                        <div style={{
                          background: '#1A1A2E',
                          padding: '12px 16px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px' }}>⚡</span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)' }}>NLU Processing Pipeline</span>
                          </div>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: queryPhase === 'idle' ? 'rgba(255, 255, 255, 0.2)' : '#30D158',
                            animation: queryPhase !== 'idle' ? 'statusPulse 1s ease infinite' : 'none',
                          }} />
                        </div>

                        {/* Pipeline Stages */}
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {[
                            {
                              title: 'Intent Detection',
                              icon: '🎯',
                              result: 'BOOK_FLIGHT',
                              detail: 'confidence: 94.7%',
                              phase: 'tokenize',
                              color: '#6B7280'
                            },
                            {
                              title: 'Entity Extraction',
                              icon: '📍',
                              result: 'destination: DEL',
                              detail: 'budget: ₹5000 • date: weekend',
                              phase: 'entities',
                              color: '#0D99FF'
                            },
                            {
                              title: 'Context Memory',
                              icon: '🧠',
                              result: 'Frequent: DEL route',
                              detail: 'preference: morning • class: economy',
                              phase: 'intent',
                              color: '#30D158'
                            },
                            {
                              title: 'Response Generation',
                              icon: '✨',
                              result: 'Personalized results',
                              detail: '12 flights matched • 3 recommended',
                              phase: 'results',
                              color: project.color
                            },
                          ].map((stage, i) => {
                            const isActive = queryPhase === stage.phase ||
                              (queryPhase === 'results' && i < 4) ||
                              (queryPhase === 'intent' && i < 3) ||
                              (queryPhase === 'entities' && i < 2) ||
                              (queryPhase === 'tokenize' && i < 1);
                            const isCurrent = queryPhase === stage.phase;

                            return (
                              <div key={stage.title} style={{
                                padding: '14px',
                                borderRadius: '10px',
                                background: isCurrent ? `rgba(${stage.color === project.color ? project.color : stage.color.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(', ')}, 0.15)` : 'rgba(255, 255, 255, 0.03)',
                                border: `1px solid ${isCurrent ? `rgba(${stage.color === project.color ? project.color : stage.color.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(', ')}, 0.4)` : 'rgba(255, 255, 255, 0.06)'}`,
                                transition: 'all 0.4s ease',
                                transform: isCurrent ? 'translateX(4px)' : 'translateX(0)',
                                opacity: queryPhase === 'idle' ? 0.6 : (isActive ? 1 : 0.3),
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '14px' }}>{stage.icon}</span>
                                    <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)' }}>{stage.title}</span>
                                  </div>
                                  {isActive && queryPhase !== 'idle' && (
                                    <span style={{ fontSize: '10px', color: '#30D158' }}>✓</span>
                                  )}
                                </div>
                                <div style={{
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  color: stage.color === project.color ? `rgb(${project.color})` : stage.color,
                                  marginBottom: '4px',
                                  fontFamily: 'SF Mono, Monaco, monospace',
                                  opacity: isActive ? 1 : 0.5,
                                }}>
                                  {stage.result}
                                </div>
                                <div style={{
                                  fontSize: '10px',
                                  color: 'rgba(255, 255, 255, 0.4)',
                                  opacity: isActive ? 1 : 0.5,
                                }}>
                                  {stage.detail}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Status Bar */}
                        <div style={{
                          padding: '12px 16px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: queryPhase === 'idle' ? 'rgba(255, 255, 255, 0.3)' : '#30D158',
                            }} />
                            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                              {queryPhase === 'idle' ? 'Ready to process' :
                               queryPhase === 'results' ? 'Complete' : 'Processing...'}
                            </span>
                          </div>
                          <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.3)' }}>
                            ~0.8s latency
                          </span>
                        </div>
                      </div>
                    </div>
                    </>
                  ) : null}
                </div>
                {/* END LEGACY EXPANDED CONTENT */}

                {/* Narrative Connectors */}
                {index === 1 && (
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
