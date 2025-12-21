'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from 'recharts';
import {
  Home,
  Camera,
  BarChart3,
  Heart,
  User,
  Sun,
  Moon,
  Check,
  Plus,
  X,
  ArrowLeft,
  Sparkles,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  Clock,
  Droplets,
  Wind,
  Activity,
  Calendar,
  ChevronRight,
  Loader2,
  Brain,
  Flame,
  Leaf,
  CloudRain,
  Thermometer,
  Settings,
  Bell,
  Shield,
  Smartphone,
  FileText,
  Share2,
  Download,
  ChevronDown,
  Smile,
  SmilePlus,
  Meh,
  Frown,
  Flower2,
  Sprout,
  TreeDeciduous,
  Zap,
  Coffee,
  Utensils,
  Bed,
  TrendingDown,
  RefreshCw,
  ChevronLeft,
  MoreHorizontal,
  Link,
  Apple,
  Cloud,
  Circle,
} from 'lucide-react';

// =============================================================================
// CLEARA DESIGN SYSTEM
// =============================================================================

const CLEARA_COLORS = {
  // Core palette - warm cream aesthetic
  canvas: '#FAF8F5',
  canvasSecondary: '#F5F2EF',

  // Brand colors - watercolor-inspired
  lavender: '#8B9DC3',
  lavenderLight: '#A8B5D4',
  lavenderDark: '#6B7FA8',
  periwinkle: '#B8C5E2',
  blush: '#D4A5A5',
  blushLight: '#E2BCBC',
  sage: '#A8C5B5',
  sageLight: '#C1D6CA',
  sageDark: '#8FB39F',

  // Text colors - warm charcoal
  label: 'rgba(45, 45, 55, 0.95)',
  secondaryLabel: 'rgba(45, 45, 55, 0.70)',
  tertiaryLabel: 'rgba(45, 45, 55, 0.50)',
  quaternaryLabel: 'rgba(45, 45, 55, 0.30)',

  // Glass surfaces - warm white tints
  glassPrimary: 'rgba(255, 255, 255, 0.85)',
  glassSecondary: 'rgba(255, 255, 255, 0.70)',
  glassTertiary: 'rgba(255, 255, 255, 0.50)',
  glassLavender: 'rgba(139, 157, 195, 0.12)',
  glassSage: 'rgba(168, 197, 181, 0.12)',
  glassBlush: 'rgba(212, 165, 165, 0.12)',

  // Semantic colors
  success: '#A8C5B5',
  warning: '#E8C87A',
  error: '#D4A5A5',
  info: '#8B9DC3',
};

const CLEARA_SHADOWS = {
  // Soft, warm shadows
  card: '0 2px 8px rgba(45, 45, 55, 0.06)',
  cardHover: '0 4px 16px rgba(45, 45, 55, 0.08)',
  floating: '0 8px 32px rgba(45, 45, 55, 0.10)',
  device: '0 25px 80px rgba(45, 45, 55, 0.15), 0 8px 24px rgba(45, 45, 55, 0.08)',
  inset: 'inset 0 1px 3px rgba(45, 45, 55, 0.04)',
};

const CLEARA_BORDERS = {
  light: 'rgba(45, 45, 55, 0.06)',
  medium: 'rgba(45, 45, 55, 0.10)',
  lavender: 'rgba(139, 157, 195, 0.20)',
  sage: 'rgba(168, 197, 181, 0.20)',
  blush: 'rgba(212, 165, 165, 0.20)',
};

// =============================================================================
// SVG FILTERS - Watercolor & Liquid Glass Effects
// =============================================================================

const SVGFilters = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
    <defs>
      {/* Watercolor Texture Filter - creates soft organic displacement */}
      <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
        <feGaussianBlur stdDeviation="0.5" />
      </filter>

      {/* Liquid Glass Refraction - iOS 26 inspired light bending */}
      <filter id="liquidGlass" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
        <feColorMatrix in="blur" type="saturate" values="1.8" result="saturated" />
        <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" specularExponent="20" result="specular">
          <fePointLight x="50" y="50" z="200" />
        </feSpecularLighting>
        <feComposite in="saturated" in2="specular" operator="arithmetic" k1="0" k2="1" k3="0.3" k4="0" />
      </filter>

      {/* Soft Organic Edges - subtle displacement for natural feel */}
      <filter id="organicEdge">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
    </defs>
  </svg>
);

// =============================================================================
// WATERCOLOR DECORATIVE COMPONENTS
// =============================================================================

interface WatercolorBlobProps {
  color: string;
  size: number;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  opacity?: number;
}

const WatercolorBlob: React.FC<WatercolorBlobProps> = ({
  color,
  size,
  position,
  opacity = 0.5
}) => (
  <div style={{
    position: 'absolute',
    ...position,
    width: size,
    height: size,
    background: `radial-gradient(ellipse at 30% 30%, ${color}40 0%, ${color}20 40%, transparent 70%)`,
    filter: 'url(#watercolor)',
    opacity,
    pointerEvents: 'none',
    borderRadius: '60% 40% 50% 50%',
    transform: 'rotate(-15deg)',
  }} />
);

interface WatercolorDividerProps {
  color?: string;
  margin?: string;
}

const WatercolorDivider: React.FC<WatercolorDividerProps> = ({
  color = CLEARA_COLORS.lavender,
  margin = '16px 0'
}) => (
  <div style={{
    height: 2,
    margin,
    background: `linear-gradient(90deg,
      transparent,
      ${color}30 20%,
      ${color}50 50%,
      ${color}30 80%,
      transparent)`,
    filter: 'url(#organicEdge)',
  }} />
);

// Animated specular shimmer for liquid glass effect
const SpecularShimmer: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      backgroundPosition: ['-200% 0', '200% 0'],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
    style={{
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      pointerEvents: 'none',
      background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
      backgroundSize: '200% 100%',
    }}
  />
);

// =============================================================================
// HAPTIC FEEDBACK SYSTEM
// =============================================================================

const haptic = {
  light: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },
  medium: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },
  success: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([10, 50, 20]);
    }
  },
  selection: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(5);
    }
  },
  warning: () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]);
    }
  },
};

// Pull-to-refresh constants
const PULL_THRESHOLD = 60;
const PULL_MAX = 100;

// Spring animation configs
const SPRING_CONFIG = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  bouncy: { type: 'spring', stiffness: 300, damping: 20 },
  smooth: { type: 'spring', stiffness: 200, damping: 25 },
};

// =============================================================================
// CONFETTI PARTICLE SYSTEM
// =============================================================================

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  velocityX: number;
  velocityY: number;
  rotation: number;
  spin: number;
  size: number;
  opacity: number;
}

const CONFETTI_CONFIG = {
  count: 50,
  colors: [CLEARA_COLORS.lavender, CLEARA_COLORS.sage, CLEARA_COLORS.blush, CLEARA_COLORS.periwinkle],
  gravity: 800,
  airResistance: 0.98,
  duration: 2000,
};

// Confetti component that renders particles
const ConfettiExplosion: React.FC<{
  particles: ConfettiParticle[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}> = ({ particles }) => {
  const [animatedParticles, setAnimatedParticles] = useState<ConfettiParticle[]>(particles);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (particles.length === 0) return;

    startTimeRef.current = Date.now();
    setAnimatedParticles(particles);

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed > CONFETTI_CONFIG.duration) {
        setAnimatedParticles([]);
        return;
      }

      setAnimatedParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.velocityX,
        y: p.y + p.velocityY,
        velocityY: p.velocityY + (CONFETTI_CONFIG.gravity / 60), // 60fps gravity
        velocityX: p.velocityX * CONFETTI_CONFIG.airResistance,
        rotation: p.rotation + p.spin,
        opacity: Math.max(0, 1 - (elapsed / CONFETTI_CONFIG.duration)),
      })));

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [particles]);

  if (animatedParticles.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {animatedParticles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

// =============================================================================
// MILESTONE BADGES
// =============================================================================

const MILESTONES = [
  { days: 7, icon: Sprout, label: 'Seedling', color: CLEARA_COLORS.sage },
  { days: 14, icon: Leaf, label: 'Growing', color: CLEARA_COLORS.lavender },
  { days: 30, icon: Flower2, label: 'Blooming', color: CLEARA_COLORS.blush },
  { days: 60, icon: TreeDeciduous, label: 'Flourishing', color: CLEARA_COLORS.periwinkle },
];

const MilestoneBadge: React.FC<{
  milestone: typeof MILESTONES[0];
  unlocked: boolean;
  current?: boolean;
}> = ({ milestone, unlocked, current }) => {
  const IconComponent = milestone.icon;

  return (
    <motion.div
      initial={unlocked && current ? { scale: 0 } : false}
      animate={unlocked && current ? { scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        opacity: unlocked ? 1 : 0.4,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: unlocked
            ? `linear-gradient(135deg, ${milestone.color}40 0%, ${milestone.color}20 100%)`
            : CLEARA_COLORS.glassSecondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `2px solid ${unlocked ? milestone.color : CLEARA_COLORS.tertiaryLabel}`,
          boxShadow: unlocked ? `0 0 20px ${milestone.color}40` : 'none',
        }}
      >
        <IconComponent
          size={24}
          color={unlocked ? milestone.color : CLEARA_COLORS.tertiaryLabel}
        />
      </div>
      <span style={{
        fontSize: 10,
        fontWeight: 600,
        color: unlocked ? milestone.color : CLEARA_COLORS.tertiaryLabel,
      }}>
        {milestone.days} days
      </span>
    </motion.div>
  );
};

// iPhone 15 Pro Natural Titanium Frame
const TITANIUM_FRAME = {
  // Natural Titanium gradient - warm metallic to match Cleara aesthetic
  bezelGradient: 'linear-gradient(145deg, #E8E4DF 0%, #D4D0CB 25%, #C9C5C0 50%, #B8B4AF 75%, #A8A49F 100%)',
  bezelWidth: 12,
  deviceRadius: 56,
  screenRadius: 44,
  // Premium multi-layer shadow for depth
  deviceShadow: `
    0 50px 100px -20px rgba(0, 0, 0, 0.25),
    0 30px 60px -30px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(0, 0, 0, 0.05)
  `,
  // Inner highlights for metallic effect
  bezelHighlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

type Screen = 'home' | 'photo' | 'pasi' | 'rituals' | 'wellness' | 'insights' | 'journal' | 'flare' | 'learn' | 'profile' | 'settings' | 'patterns' | 'report' | 'breathing';

type SubState =
  | 'camera' | 'ghost' | 'capture' | 'result' | 'selection' | 'processing' | 'notes'  // Photo states
  | 'question1' | 'question2' | 'question3' | 'result'  // Wellness states
  | 'add'  // Rituals states
  | 'flare-detail'  // Flare prediction detail
  | null;

interface TriggerData {
  name: string;
  icon: React.ReactNode;
  percentage: number;
  color: string;
}

interface ArticleData {
  id: string;
  title: string;
  category: 'lifestyle' | 'skincare' | 'treatment' | 'mental';
  readTime: string;
  preview: string;
  icon: React.ReactNode;
}

interface Ritual {
  id: string;
  title: string;
  subtitle?: string;
  category: 'morning' | 'evening';
  completed: boolean;
}

interface PasiLog {
  date: string;
  score: number;
  redness: number;
  thickness: number;
  scaling: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface ClearaPhoneMockupProps {
  // Controlled mode for case study integration
  controlledScreen?: Screen;
  controlledSubState?: SubState;
  scale?: number;
  className?: string;
}

// =============================================================================
// INITIAL DATA
// =============================================================================

const INITIAL_RITUALS: Ritual[] = [
  { id: '1', title: 'Apply moisturizer', subtitle: 'After morning shower', category: 'morning', completed: false },
  { id: '2', title: 'Take vitamin D', subtitle: '1000 IU with breakfast', category: 'morning', completed: true },
  { id: '3', title: 'Gentle stretching', subtitle: '5 minutes', category: 'morning', completed: false },
  { id: '4', title: 'Evening skincare routine', subtitle: 'Ceramide cream', category: 'evening', completed: false },
  { id: '5', title: 'Relaxation practice', subtitle: 'Deep breathing', category: 'evening', completed: false },
];

const INITIAL_PASI_LOGS: PasiLog[] = [
  { date: '2024-01-01', score: 12.4, redness: 2, thickness: 2, scaling: 2 },
  { date: '2024-01-08', score: 10.8, redness: 2, thickness: 1, scaling: 2 },
  { date: '2024-01-15', score: 9.2, redness: 1, thickness: 1, scaling: 2 },
  { date: '2024-01-22', score: 7.6, redness: 1, thickness: 1, scaling: 1 },
  { date: '2024-01-29', score: 6.4, redness: 1, thickness: 1, scaling: 1 },
  { date: '2024-02-05', score: 5.2, redness: 1, thickness: 0, scaling: 1 },
];

const WELLNESS_QUESTIONS = [
  "Have you felt tired or low on energy?",
  "Have you felt little interest in doing things?",
  "Have you felt down, depressed, or hopeless?"
];

const WELLNESS_OPTIONS = [
  "Not really",
  "Sometimes",
  "Often",
  "Most days"
];

const DAILY_INSPIRATIONS = [
  "Your skin tells a story of resilience.",
  "Healing is not linear, and that's okay.",
  "Small rituals create lasting change.",
  "Be gentle with yourself today.",
  "Every day is a fresh start for your skin.",
];

// Flare prediction data
const FLARE_FACTORS = [
  { name: 'Weather changes', percentage: 85, icon: <CloudRain size={16} />, color: CLEARA_COLORS.lavender },
  { name: 'Sleep quality', percentage: 72, icon: <Bed size={16} />, color: CLEARA_COLORS.periwinkle },
  { name: 'Stress level', percentage: 68, icon: <Brain size={16} />, color: CLEARA_COLORS.blush },
  { name: 'Missed rituals', percentage: 45, icon: <Calendar size={16} />, color: CLEARA_COLORS.sage },
];

const FLARE_RECOMMENDATIONS = [
  "Apply extra moisturizer before bed tonight",
  "Try a 10-minute relaxation session",
  "Consider wearing soft, breathable fabrics",
  "Stay hydrated throughout the day",
];

// Trigger pattern data
const TRIGGER_DATA: TriggerData[] = [
  { name: 'Weather', icon: <Cloud size={18} />, percentage: 85, color: CLEARA_COLORS.lavender },
  { name: 'Stress', icon: <Brain size={18} />, percentage: 72, color: CLEARA_COLORS.blush },
  { name: 'Sleep', icon: <Bed size={18} />, percentage: 58, color: CLEARA_COLORS.periwinkle },
  { name: 'Diet', icon: <Utensils size={18} />, percentage: 45, color: CLEARA_COLORS.sage },
  { name: 'Exercise', icon: <Activity size={18} />, percentage: 32, color: CLEARA_COLORS.lavenderLight },
];

// Learn articles data
const LEARN_ARTICLES: ArticleData[] = [
  {
    id: '1',
    title: 'Understanding Your Skin',
    category: 'skincare',
    readTime: '5 min',
    preview: 'Learn about the science behind psoriasis and how your skin responds to different factors.',
    icon: <Droplets size={20} />,
  },
  {
    id: '2',
    title: 'Stress and Flares',
    category: 'mental',
    readTime: '4 min',
    preview: 'Discover the connection between stress and skin flares, with practical management tips.',
    icon: <Brain size={20} />,
  },
  {
    id: '3',
    title: 'Sleep for Healing',
    category: 'lifestyle',
    readTime: '6 min',
    preview: 'Why quality sleep is essential for skin repair and how to optimize your rest.',
    icon: <Bed size={20} />,
  },
  {
    id: '4',
    title: 'Moisturizing Guide',
    category: 'skincare',
    readTime: '4 min',
    preview: 'The best practices for keeping your skin hydrated and reducing irritation.',
    icon: <Droplets size={20} />,
  },
  {
    id: '5',
    title: 'Anti-Inflammatory Foods',
    category: 'lifestyle',
    readTime: '7 min',
    preview: 'Dietary choices that may help reduce inflammation and support skin health.',
    icon: <Utensils size={20} />,
  },
  {
    id: '6',
    title: 'Treatment Options',
    category: 'treatment',
    readTime: '8 min',
    preview: 'An overview of available treatments from topicals to biologics.',
    icon: <FileText size={20} />,
  },
];

// Milestone badges data
const MILESTONE_BADGES = [
  { days: 7, icon: <Sprout size={18} />, label: 'Week One', color: CLEARA_COLORS.sage },
  { days: 14, icon: <Leaf size={18} />, label: 'Two Weeks', color: CLEARA_COLORS.sageDark },
  { days: 30, icon: <Flower2 size={18} />, label: 'One Month', color: CLEARA_COLORS.lavender },
  { days: 60, icon: <Heart size={18} />, label: 'Two Months', color: CLEARA_COLORS.blush },
];

// =============================================================================
// UTILITY COMPONENTS
// =============================================================================

const StatusBar: React.FC = () => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div
      style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        fontSize: 14,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        fontFamily: 'var(--font-dm-sans), system-ui, -apple-system, sans-serif',
      }}
    >
      <span>{timeString}</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <div style={{
          width: 18,
          height: 10,
          borderRadius: 3,
          border: `1.5px solid ${CLEARA_COLORS.label}`,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            left: 2,
            top: 2,
            bottom: 2,
            right: 4,
            backgroundColor: CLEARA_COLORS.sage,
            borderRadius: 1,
          }} />
        </div>
      </div>
    </div>
  );
};

// iPhone 15 Pro Side Buttons
const SideButtons: React.FC = () => (
  <>
    {/* Power Button - Right side */}
    <div
      style={{
        position: 'absolute',
        right: -3,
        top: 120,
        width: 3,
        height: 65,
        background: 'linear-gradient(90deg, #C9C5C0 0%, #A8A49F 100%)',
        borderRadius: '0 2px 2px 0',
        boxShadow: '1px 0 2px rgba(0, 0, 0, 0.2)',
      }}
    />

    {/* Action Button - Left side (new for iPhone 15 Pro) */}
    <div
      style={{
        position: 'absolute',
        left: -3,
        top: 60,
        width: 3,
        height: 28,
        background: 'linear-gradient(270deg, #C9C5C0 0%, #A8A49F 100%)',
        borderRadius: '2px 0 0 2px',
        boxShadow: '-1px 0 2px rgba(0, 0, 0, 0.2)',
      }}
    />

    {/* Volume Up - Left side */}
    <div
      style={{
        position: 'absolute',
        left: -3,
        top: 100,
        width: 3,
        height: 35,
        background: 'linear-gradient(270deg, #C9C5C0 0%, #A8A49F 100%)',
        borderRadius: '2px 0 0 2px',
        boxShadow: '-1px 0 2px rgba(0, 0, 0, 0.2)',
      }}
    />

    {/* Volume Down - Left side */}
    <div
      style={{
        position: 'absolute',
        left: -3,
        top: 145,
        width: 3,
        height: 35,
        background: 'linear-gradient(270deg, #C9C5C0 0%, #A8A49F 100%)',
        borderRadius: '2px 0 0 2px',
        boxShadow: '-1px 0 2px rgba(0, 0, 0, 0.2)',
      }}
    />
  </>
);

interface TabBarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeScreen, onNavigate }) => {
  const tabs: { screen: Screen; icon: React.ReactNode; label: string }[] = [
    { screen: 'home', icon: <Home size={22} />, label: 'Home' },
    { screen: 'photo', icon: <Camera size={22} />, label: 'Track' },
    { screen: 'insights', icon: <BarChart3 size={22} />, label: 'Insights' },
    { screen: 'rituals', icon: <Heart size={22} />, label: 'Rituals' },
    { screen: 'profile', icon: <User size={22} />, label: 'Profile' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 84,
        background: `linear-gradient(180deg,
          rgba(255,255,255,0.92) 0%,
          rgba(255,255,255,0.88) 100%)`,
        backdropFilter: 'blur(24px) saturate(200%) brightness(102%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%) brightness(102%)',
        borderTop: `1px solid ${CLEARA_BORDERS.light}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 24,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
    >
      {/* iOS 26 Liquid Glass specular highlight rim */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 80%, transparent)',
        opacity: 0.7,
      }} />
      {tabs.map((tab) => {
        const isActive = activeScreen === tab.screen;
        return (
          <motion.button
            key={tab.screen}
            onClick={() => onNavigate(tab.screen)}
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: isActive ? CLEARA_COLORS.lavender : CLEARA_COLORS.tertiaryLabel,
              transition: 'color 0.2s ease',
            }}
          >
            {tab.icon}
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 600 : 500,
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
            }}>
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'lavender' | 'sage' | 'blush';
  padding?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
  showShimmer?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'primary',
  padding = 16,
  style,
  onClick,
  showShimmer = false,
}) => {
  // Liquid Glass gradient backgrounds with layered transparency
  const backgrounds = {
    primary: `linear-gradient(135deg,
      rgba(255,255,255,0.28) 0%,
      rgba(255,255,255,0.12) 50%,
      rgba(255,255,255,0.18) 100%)`,
    lavender: `linear-gradient(135deg,
      rgba(139,157,195,0.18) 0%,
      rgba(139,157,195,0.08) 50%,
      rgba(139,157,195,0.12) 100%)`,
    sage: `linear-gradient(135deg,
      rgba(168,197,181,0.18) 0%,
      rgba(168,197,181,0.08) 50%,
      rgba(168,197,181,0.12) 100%)`,
    blush: `linear-gradient(135deg,
      rgba(212,165,165,0.18) 0%,
      rgba(212,165,165,0.08) 50%,
      rgba(212,165,165,0.12) 100%)`,
  };

  const borders = {
    primary: CLEARA_BORDERS.light,
    lavender: CLEARA_BORDERS.lavender,
    sage: CLEARA_BORDERS.sage,
    blush: CLEARA_BORDERS.blush,
  };

  // iOS 26 Liquid Glass specular shadow with inner highlights
  const liquidGlassShadow = `
    inset 0 1px 1px rgba(255,255,255,0.5),
    inset 0 -1px 1px rgba(255,255,255,0.15),
    0 2px 8px rgba(45,45,55,0.06),
    0 1px 2px rgba(45,45,55,0.04)
  `;

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: backgrounds[variant],
        backdropFilter: 'blur(16px) saturate(180%) brightness(105%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%) brightness(105%)',
        borderRadius: 20,
        border: `1px solid ${borders[variant]}`,
        padding,
        boxShadow: liquidGlassShadow,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {showShimmer && <SpecularShimmer />}
      {children}
    </motion.div>
  );
};

// =============================================================================
// HOME SCREEN
// =============================================================================

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  rituals: Ritual[];
  pasiLogs: PasiLog[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, rituals, pasiLogs }) => {
  const completedRituals = rituals.filter(r => r.completed).length;
  const latestPasi = pasiLogs[pasiLogs.length - 1];
  const previousPasi = pasiLogs[pasiLogs.length - 2];
  const pasiChange = previousPasi ? latestPasi.score - previousPasi.score : 0;

  const inspiration = DAILY_INSPIRATIONS[Math.floor(Date.now() / 86400000) % DAILY_INSPIRATIONS.length];

  const quickActions = [
    { icon: <Camera size={20} />, label: 'Log Photo', screen: 'photo' as Screen, color: CLEARA_COLORS.lavender },
    { icon: <Activity size={20} />, label: 'Check PASI', screen: 'pasi' as Screen, color: CLEARA_COLORS.sage },
    { icon: <Heart size={20} />, label: 'Wellness', screen: 'wellness' as Screen, color: CLEARA_COLORS.blush },
    { icon: <BookOpen size={20} />, label: 'Journal', screen: 'journal' as Screen, color: CLEARA_COLORS.periwinkle },
    { icon: <AlertTriangle size={20} />, label: 'Flare Risk', screen: 'flare' as Screen, color: CLEARA_COLORS.blush },
    { icon: <Leaf size={20} />, label: 'Learn', screen: 'learn' as Screen, color: CLEARA_COLORS.sage },
  ];

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <p style={{
          fontSize: 14,
          color: CLEARA_COLORS.secondaryLabel,
          marginBottom: 4,
          fontWeight: 500,
        }}>
          Good morning
        </p>
        <h1 style={{
          fontSize: 28,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          margin: 0,
        }}>
          Sarah
        </h1>
      </div>

      {/* Daily Inspiration Card */}
      <GlassCard variant="lavender" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            backgroundColor: `${CLEARA_COLORS.lavender}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles size={18} color={CLEARA_COLORS.lavender} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              color: CLEARA_COLORS.lavender,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 6,
            }}>
              Daily Inspiration
            </p>
            <p style={{
              fontSize: 16,
              color: CLEARA_COLORS.label,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              lineHeight: 1.5,
              margin: 0,
            }}>
              &ldquo;{inspiration}&rdquo;
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions Grid */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontSize: 13,
          fontWeight: 600,
          color: CLEARA_COLORS.secondaryLabel,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: 12,
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}>
          {quickActions.map((action, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(action.screen)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: 16,
                backgroundColor: CLEARA_COLORS.glassPrimary,
                backdropFilter: 'blur(8px)',
                border: `1px solid ${CLEARA_BORDERS.light}`,
                borderRadius: 16,
                cursor: 'pointer',
                boxShadow: CLEARA_SHADOWS.card,
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: `${action.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: action.color,
              }}>
                {action.icon}
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: 500,
                color: CLEARA_COLORS.secondaryLabel,
              }}>
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Rituals Progress */}
      <GlassCard
        variant="sage"
        onClick={() => onNavigate('rituals')}
        style={{ marginBottom: 20 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{
            fontSize: 15,
            fontWeight: 600,
            color: CLEARA_COLORS.label,
            margin: 0,
          }}>
            Today&apos;s Rituals
          </h3>
          <ChevronRight size={18} color={CLEARA_COLORS.tertiaryLabel} />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            border: `3px solid ${CLEARA_COLORS.sage}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <span style={{
              fontSize: 14,
              fontWeight: 700,
              color: CLEARA_COLORS.sage,
            }}>
              {completedRituals}/{rituals.length}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              height: 6,
              backgroundColor: `${CLEARA_COLORS.sage}20`,
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedRituals / rituals.length) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: CLEARA_COLORS.sage,
                  borderRadius: 3,
                }}
              />
            </div>
            <p style={{
              fontSize: 12,
              color: CLEARA_COLORS.tertiaryLabel,
              marginTop: 6,
            }}>
              {completedRituals === rituals.length ? 'All done! Great job!' : `${rituals.length - completedRituals} more to go`}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* PASI Score */}
      <GlassCard onClick={() => onNavigate('pasi')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{
            fontSize: 15,
            fontWeight: 600,
            color: CLEARA_COLORS.label,
            margin: 0,
          }}>
            PASI Score
          </h3>
          <ChevronRight size={18} color={CLEARA_COLORS.tertiaryLabel} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontSize: 36,
            fontWeight: 700,
            color: CLEARA_COLORS.lavender,
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          }}>
            {latestPasi.score.toFixed(1)}
          </span>
          <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: pasiChange <= 0 ? CLEARA_COLORS.sage : CLEARA_COLORS.blush,
          }}>
            {pasiChange <= 0 ? '↓' : '↑'} {Math.abs(pasiChange).toFixed(1)}
          </span>
        </div>
        <p style={{
          fontSize: 12,
          color: CLEARA_COLORS.tertiaryLabel,
          marginTop: 4,
        }}>
          Mild severity - Keep up the great work!
        </p>
      </GlassCard>
    </div>
  );
};

// =============================================================================
// PHOTO SCREEN - Enhanced 9-Step Flow
// =============================================================================

// Body areas for photo tracking
const BODY_AREAS = [
  { id: 'scalp', label: 'Scalp', icon: Circle },
  { id: 'face', label: 'Face', icon: Circle },
  { id: 'chest', label: 'Chest', icon: Circle },
  { id: 'back', label: 'Back', icon: Circle },
  { id: 'arms', label: 'Arms', icon: Circle },
  { id: 'legs', label: 'Legs', icon: Circle },
  { id: 'hands', label: 'Hands', icon: Circle },
  { id: 'feet', label: 'Feet', icon: Circle },
];

interface PhotoScreenProps {
  onNavigate: (screen: Screen) => void;
  subState: SubState;
  setSubState: (state: SubState) => void;
}

const PhotoScreen: React.FC<PhotoScreenProps> = ({ onNavigate, subState, setSubState }) => {
  const [ghostOpacity, setGhostOpacity] = useState(0.5);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [selectedBodyArea, setSelectedBodyArea] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [photoNote, setPhotoNote] = useState('');
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // Simulate camera access for mockup
    setHasCamera(true);
  }, []);

  // Handle capture with flash animation
  const handleCapture = () => {
    haptic.medium();
    setIsCapturing(true);
    setShowFlash(true);

    // Flash effect
    setTimeout(() => setShowFlash(false), 150);

    // Move to processing after capture animation
    setTimeout(() => {
      setIsCapturing(false);
      setSubState('processing');
      haptic.success();

      // Simulate AI processing
      setTimeout(() => {
        setSubState('result');
      }, 2000);
    }, 500);
  };

  // Render body area selection grid
  const renderBodySelection = () => (
    <div style={{
      padding: '0 20px 100px',
      height: '100%',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <button
          onClick={() => setSubState(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: CLEARA_COLORS.secondaryLabel,
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 style={{
          fontSize: 17,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          margin: 0,
        }}>
          Select Body Area
        </h2>
        <div style={{ width: 40 }} />
      </div>

      <p style={{
        fontSize: 14,
        color: CLEARA_COLORS.secondaryLabel,
        marginBottom: 24,
        textAlign: 'center',
      }}>
        Which area would you like to track today?
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
      }}>
        {BODY_AREAS.map((area) => (
          <motion.div
            key={area.id}
            whileTap={{ scale: 0.97 }}
          >
            <GlassCard
              onClick={() => {
                haptic.selection();
                setSelectedBodyArea(area.id);
                setSubState('ghost');
              }}
              variant={selectedBodyArea === area.id ? 'lavender' : undefined}
              style={{
                textAlign: 'center',
                padding: 20,
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: selectedBodyArea === area.id
                  ? `${CLEARA_COLORS.lavender}30`
                  : CLEARA_COLORS.canvasSecondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <area.icon
                  size={24}
                  color={selectedBodyArea === area.id
                    ? CLEARA_COLORS.lavender
                    : CLEARA_COLORS.tertiaryLabel}
                />
              </div>
              <p style={{
                fontSize: 14,
                fontWeight: 500,
                color: CLEARA_COLORS.label,
                margin: 0,
              }}>
                {area.label}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render processing animation
  const renderProcessing = () => (
    <div style={{
      padding: '0 20px 100px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Processing animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          background: `linear-gradient(135deg, ${CLEARA_COLORS.lavender}30, ${CLEARA_COLORS.periwinkle}30)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
        />
        <Brain size={48} color={CLEARA_COLORS.lavender} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 8,
        }}
      >
        Analyzing Your Photo
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          fontSize: 14,
          color: CLEARA_COLORS.secondaryLabel,
          textAlign: 'center',
        }}
      >
        Our AI is evaluating clarity, lighting, and skin indicators...
      </motion.p>

      {/* Progress dots */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginTop: 32,
      }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: CLEARA_COLORS.lavender,
            }}
          />
        ))}
      </div>
    </div>
  );

  // Render notes input
  const renderNotes = () => (
    <div style={{
      padding: '0 20px 100px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <button
          onClick={() => setSubState('result')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: CLEARA_COLORS.secondaryLabel,
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 style={{
          fontSize: 17,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          margin: 0,
        }}>
          Add Context
        </h2>
        <button
          onClick={() => {
            haptic.success();
            setSubState(null);
            onNavigate('insights');
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: CLEARA_COLORS.lavender,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Done
        </button>
      </div>

      <GlassCard style={{ marginBottom: 20 }}>
        <p style={{
          fontSize: 12,
          fontWeight: 600,
          color: CLEARA_COLORS.secondaryLabel,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: 12,
        }}>
          Notes (Optional)
        </p>
        <textarea
          value={photoNote}
          onChange={(e) => setPhotoNote(e.target.value)}
          placeholder="Any context about how you're feeling, recent triggers, or observations..."
          style={{
            width: '100%',
            minHeight: 120,
            padding: 12,
            border: 'none',
            borderRadius: 12,
            backgroundColor: CLEARA_COLORS.canvasSecondary,
            color: CLEARA_COLORS.label,
            fontSize: 15,
            lineHeight: 1.6,
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
      </GlassCard>

      {/* Quick tags */}
      <p style={{
        fontSize: 12,
        fontWeight: 600,
        color: CLEARA_COLORS.secondaryLabel,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
      }}>
        Quick Tags
      </p>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        {['After shower', 'Morning routine', 'Flare day', 'Feeling better', 'New product', 'Stressful week'].map((tag) => (
          <motion.button
            key={tag}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              haptic.selection();
              setPhotoNote(prev => prev ? `${prev} #${tag}` : `#${tag}`);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: 20,
              border: `1px solid ${CLEARA_COLORS.lavender}30`,
              backgroundColor: 'transparent',
              color: CLEARA_COLORS.lavender,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderGhostOverlay = () => (
    <div style={{
      padding: '0 20px 100px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <button
          onClick={() => setSubState(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: CLEARA_COLORS.secondaryLabel,
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 style={{
          fontSize: 17,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          margin: 0,
        }}>
          Ghost Overlay
        </h2>
        <div style={{ width: 40 }} />
      </div>

      {/* Camera View with Ghost */}
      <div style={{
        flex: 1,
        backgroundColor: '#1a1a1a',
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 20,
      }}>
        {/* Simulated camera feed */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Camera size={48} color="rgba(255,255,255,0.3)" />
        </div>

        {/* Ghost overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/cleara/ghost-reference.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: ghostOpacity,
          pointerEvents: 'none',
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          pointerEvents: 'none',
        }}>
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              style={{
                border: '0.5px solid rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Ghost Opacity Slider */}
      <GlassCard style={{ marginBottom: 20 }}>
        <p style={{
          fontSize: 12,
          fontWeight: 600,
          color: CLEARA_COLORS.secondaryLabel,
          marginBottom: 12,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          Ghost Opacity
        </p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={ghostOpacity}
          onChange={(e) => setGhostOpacity(parseFloat(e.target.value))}
          style={{
            width: '100%',
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(to right, ${CLEARA_COLORS.lavender} ${ghostOpacity * 100}%, ${CLEARA_COLORS.quaternaryLabel} ${ghostOpacity * 100}%)`,
            appearance: 'none',
            cursor: 'pointer',
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
          <span style={{ fontSize: 11, color: CLEARA_COLORS.tertiaryLabel }}>0%</span>
          <span style={{ fontSize: 11, color: CLEARA_COLORS.lavender, fontWeight: 600 }}>
            {Math.round(ghostOpacity * 100)}%
          </span>
          <span style={{ fontSize: 11, color: CLEARA_COLORS.tertiaryLabel }}>100%</span>
        </div>
      </GlassCard>

      {/* Flash Overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'white',
              zIndex: 100,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Capture Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        animate={isCapturing ? { scale: [1, 0.9, 1] } : {}}
        onClick={handleCapture}
        disabled={isCapturing}
        style={{
          width: '100%',
          padding: 16,
          backgroundColor: isCapturing ? `${CLEARA_COLORS.lavender}80` : CLEARA_COLORS.lavender,
          border: 'none',
          borderRadius: 16,
          color: 'white',
          fontSize: 16,
          fontWeight: 600,
          cursor: isCapturing ? 'default' : 'pointer',
          boxShadow: `0 4px 16px ${CLEARA_COLORS.lavender}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {isCapturing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 size={18} />
            </motion.div>
            Capturing...
          </>
        ) : (
          'Capture Photo'
        )}
      </motion.button>
    </div>
  );

  const renderPhotoResult = () => (
    <div style={{
      padding: '0 20px 100px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <button
          onClick={() => setSubState('ghost')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: CLEARA_COLORS.secondaryLabel,
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 style={{
          fontSize: 17,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          margin: 0,
        }}>
          AI Analysis
        </h2>
        <div style={{ width: 40 }} />
      </div>

      {/* Analysis Result */}
      <GlassCard variant="lavender" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: `${CLEARA_COLORS.lavender}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Brain size={22} color={CLEARA_COLORS.lavender} />
          </div>
          <div>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              color: CLEARA_COLORS.lavender,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              PASI Analysis
            </p>
            <p style={{
              fontSize: 24,
              fontWeight: 700,
              color: CLEARA_COLORS.label,
              margin: 0,
            }}>
              5.2
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'Redness', value: 1, max: 4 },
            { label: 'Thickness', value: 0, max: 4 },
            { label: 'Scaling', value: 1, max: 4 },
          ].map((metric) => (
            <div key={metric.label} style={{ flex: 1 }}>
              <p style={{
                fontSize: 10,
                color: CLEARA_COLORS.secondaryLabel,
                marginBottom: 4,
              }}>
                {metric.label}
              </p>
              <div style={{
                height: 4,
                backgroundColor: `${CLEARA_COLORS.lavender}20`,
                borderRadius: 2,
              }}>
                <div style={{
                  width: `${(metric.value / metric.max) * 100}%`,
                  height: '100%',
                  backgroundColor: CLEARA_COLORS.lavender,
                  borderRadius: 2,
                }} />
              </div>
              <p style={{
                fontSize: 11,
                fontWeight: 600,
                color: CLEARA_COLORS.label,
                marginTop: 4,
              }}>
                {metric.value}/{metric.max}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* AI Summary */}
      <GlassCard style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Sparkles size={16} color={CLEARA_COLORS.lavender} />
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            color: CLEARA_COLORS.label,
          }}>
            Healing Note
          </p>
        </div>
        <p style={{
          fontSize: 15,
          color: CLEARA_COLORS.secondaryLabel,
          lineHeight: 1.6,
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
        }}>
          Your skin is showing wonderful signs of improvement. The mild presentation
          suggests your current routine is working well. Keep focusing on gentle
          moisturization and stress management.
        </p>
      </GlassCard>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 12 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            haptic.selection();
            setSubState('notes');
          }}
          style={{
            flex: 1,
            padding: 14,
            backgroundColor: 'transparent',
            border: `1px solid ${CLEARA_COLORS.lavender}40`,
            borderRadius: 12,
            color: CLEARA_COLORS.lavender,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <FileText size={16} />
          Add Notes
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            haptic.success();
            setSubState(null);
            onNavigate('insights');
          }}
          style={{
            flex: 1,
            padding: 14,
            backgroundColor: CLEARA_COLORS.lavender,
            border: 'none',
            borderRadius: 12,
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Check size={16} />
          Save
        </motion.button>
      </div>
    </div>
  );

  // Main photo menu - handle all substates
  if (subState === 'selection') return renderBodySelection();
  if (subState === 'ghost') return renderGhostOverlay();
  if (subState === 'processing') return renderProcessing();
  if (subState === 'result') return renderPhotoResult();
  if (subState === 'notes') return renderNotes();

  return (
    <div style={{
      padding: '0 20px 100px',
      height: '100%',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        marginBottom: 8,
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}>
        Track Progress
      </h1>
      <p style={{
        fontSize: 14,
        color: CLEARA_COLORS.secondaryLabel,
        marginBottom: 24,
      }}>
        Capture photos to monitor your skin over time.
      </p>

      {/* Photo Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <GlassCard onClick={() => {
          haptic.selection();
          setSubState('selection');
        }} variant="lavender">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: `${CLEARA_COLORS.lavender}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Camera size={24} color={CLEARA_COLORS.lavender} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: CLEARA_COLORS.label,
                marginBottom: 4,
              }}>
                Track New Photo
              </h3>
              <p style={{
                fontSize: 13,
                color: CLEARA_COLORS.secondaryLabel,
              }}>
                Select body area & compare with ghost
              </p>
            </div>
            <ChevronRight size={20} color={CLEARA_COLORS.tertiaryLabel} />
          </div>
        </GlassCard>

        <GlassCard onClick={() => {
          haptic.selection();
          setSubState('ghost');
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: `${CLEARA_COLORS.sage}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Plus size={24} color={CLEARA_COLORS.sage} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: CLEARA_COLORS.label,
                marginBottom: 4,
              }}>
                Quick Capture
              </h3>
              <p style={{
                fontSize: 13,
                color: CLEARA_COLORS.secondaryLabel,
              }}>
                Take a new photo without overlay
              </p>
            </div>
            <ChevronRight size={20} color={CLEARA_COLORS.tertiaryLabel} />
          </div>
        </GlassCard>
      </div>

      {/* Recent Photos */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{
          fontSize: 13,
          fontWeight: 600,
          color: CLEARA_COLORS.secondaryLabel,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: 16,
        }}>
          Recent Photos
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                backgroundColor: CLEARA_COLORS.canvasSecondary,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Camera size={20} color={CLEARA_COLORS.quaternaryLabel} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// RITUALS SCREEN
// =============================================================================

interface RitualsScreenProps {
  onNavigate: (screen: Screen) => void;
  rituals: Ritual[];
  onToggleRitual: (id: string) => void;
  onAddRitual: (title: string, category: 'morning' | 'evening') => void;
  subState: SubState;
  setSubState: (state: SubState) => void;
  streak: number;
  onTriggerConfetti: (x: number, y: number) => void;
}

const RitualsScreen: React.FC<RitualsScreenProps> = ({
  onNavigate,
  rituals,
  onToggleRitual,
  onAddRitual,
  subState,
  setSubState,
  streak,
  onTriggerConfetti,
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [newRitualTitle, setNewRitualTitle] = useState('');
  const [newRitualCategory, setNewRitualCategory] = useState<'morning' | 'evening'>('morning');
  const [showMilestoneUnlock, setShowMilestoneUnlock] = useState(false);

  // Calculate current and next milestone
  const currentMilestone = MILESTONES.filter(m => streak >= m.days).pop();
  const nextMilestone = MILESTONES.find(m => streak < m.days);
  const progressToNext = nextMilestone
    ? ((streak - (currentMilestone?.days || 0)) / (nextMilestone.days - (currentMilestone?.days || 0))) * 100
    : 100;

  const handleCheck = (e: React.MouseEvent, id: string) => {
    const ritual = rituals.find(r => r.id === id);
    if (ritual && !ritual.completed) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();

      // Trigger confetti explosion
      onTriggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      haptic.success();

      // Also add sparkles for extra visual flair
      const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
        y: rect.top + rect.height / 2 + (Math.random() - 0.5) * 100,
        color: [CLEARA_COLORS.lavender, CLEARA_COLORS.periwinkle, CLEARA_COLORS.sage, CLEARA_COLORS.blush][i % 4],
      }));
      setSparkles(prev => [...prev, ...newSparkles]);
      setTimeout(() => setSparkles(prev => prev.slice(12)), 1000);

      // Check if this completes all rituals today
      const allComplete = rituals.every(r => r.id === id ? true : r.completed);
      if (allComplete) {
        // Check for milestone unlock
        const wouldUnlockMilestone = MILESTONES.find(m => m.days === streak + 1);
        if (wouldUnlockMilestone) {
          setTimeout(() => setShowMilestoneUnlock(true), 500);
          setTimeout(() => setShowMilestoneUnlock(false), 3000);
        }
      }
    }
    onToggleRitual(id);
  };

  const handleAddRitual = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRitualTitle.trim()) {
      onAddRitual(newRitualTitle, newRitualCategory);
      setNewRitualTitle('');
      setSubState(null);
    }
  };

  const morningRituals = rituals.filter(r => r.category === 'morning');
  const eveningRituals = rituals.filter(r => r.category === 'evening');

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
      position: 'relative',
    }}>
      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            left: sparkle.x,
            top: sparkle.y,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: sparkle.color,
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        />
      ))}

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
      }}>
        <div>
          <h1 style={{
            fontSize: 24,
            fontWeight: 600,
            color: CLEARA_COLORS.label,
            marginBottom: 4,
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          }}>
            Your Rituals
          </h1>
          <p style={{
            fontSize: 14,
            color: CLEARA_COLORS.secondaryLabel,
          }}>
            Small acts of care, every day.
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSubState('add')}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: CLEARA_COLORS.label,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: CLEARA_SHADOWS.floating,
          }}
        >
          <Plus size={20} color="white" />
        </motion.button>
      </div>

      {/* Streak & Milestone Card */}
      <GlassCard variant="blush" style={{ marginBottom: 24 }} showShimmer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <motion.span
              key={streak}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: CLEARA_COLORS.blush,
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              }}
            >
              {streak}
            </motion.span>
            <span style={{
              fontSize: 14,
              fontWeight: 500,
              color: CLEARA_COLORS.label,
              marginLeft: 8,
            }}>
              day streak
            </span>
          </div>
          <Flame size={24} color={CLEARA_COLORS.blush} />
        </div>

        {/* Milestone Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
          padding: '12px 0',
          borderTop: `1px solid ${CLEARA_BORDERS.light}`,
          borderBottom: `1px solid ${CLEARA_BORDERS.light}`,
        }}>
          {MILESTONES.map((milestone, i) => (
            <MilestoneBadge
              key={milestone.days}
              milestone={milestone}
              unlocked={streak >= milestone.days}
              current={currentMilestone?.days === milestone.days}
            />
          ))}
        </div>

        {/* Progress to next milestone */}
        {nextMilestone && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: CLEARA_COLORS.secondaryLabel }}>
                Next: {nextMilestone.label}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: nextMilestone.color }}>
                {nextMilestone.days - streak} days to go
              </span>
            </div>
            <div style={{
              height: 6,
              backgroundColor: CLEARA_COLORS.glassSecondary,
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: nextMilestone.color,
                  borderRadius: 3,
                }}
              />
            </div>
          </>
        )}
      </GlassCard>

      {/* Milestone Unlock Overlay */}
      <AnimatePresence>
        {showMilestoneUnlock && currentMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 2000,
            }}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              style={{
                background: CLEARA_COLORS.canvas,
                borderRadius: 24,
                padding: 32,
                textAlign: 'center',
                boxShadow: CLEARA_SHADOWS.floating,
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                <currentMilestone.icon size={64} color={currentMilestone.color} />
              </motion.div>
              <h3 style={{
                fontSize: 24,
                fontWeight: 700,
                color: currentMilestone.color,
                marginTop: 16,
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              }}>
                {currentMilestone.label} Unlocked!
              </h3>
              <p style={{
                fontSize: 14,
                color: CLEARA_COLORS.secondaryLabel,
                marginTop: 8,
              }}>
                {currentMilestone.days} days of consistent care
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Morning Rituals */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Sun size={18} color={CLEARA_COLORS.secondaryLabel} />
          <h2 style={{
            fontSize: 15,
            fontWeight: 600,
            color: CLEARA_COLORS.secondaryLabel,
          }}>
            Morning Ritual
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {morningRituals.map(ritual => (
            <GlassCard
              key={ritual.id}
              variant={ritual.completed ? 'sage' : 'primary'}
              padding={12}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: ritual.completed ? CLEARA_COLORS.tertiaryLabel : CLEARA_COLORS.label,
                    textDecoration: ritual.completed ? 'line-through' : 'none',
                    marginBottom: 2,
                  }}>
                    {ritual.title}
                  </h4>
                  {ritual.subtitle && (
                    <p style={{
                      fontSize: 12,
                      color: CLEARA_COLORS.tertiaryLabel,
                    }}>
                      {ritual.subtitle}
                    </p>
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => handleCheck(e, ritual.id)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: ritual.completed ? CLEARA_COLORS.sage : 'transparent',
                    border: ritual.completed ? 'none' : `2px solid ${CLEARA_COLORS.quaternaryLabel}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {ritual.completed && <Check size={14} color="white" strokeWidth={3} />}
                </motion.button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Evening Rituals */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Moon size={18} color={CLEARA_COLORS.secondaryLabel} />
          <h2 style={{
            fontSize: 15,
            fontWeight: 600,
            color: CLEARA_COLORS.secondaryLabel,
          }}>
            Evening Ritual
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {eveningRituals.map(ritual => (
            <GlassCard
              key={ritual.id}
              variant={ritual.completed ? 'sage' : 'primary'}
              padding={12}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: ritual.completed ? CLEARA_COLORS.tertiaryLabel : CLEARA_COLORS.label,
                    textDecoration: ritual.completed ? 'line-through' : 'none',
                    marginBottom: 2,
                  }}>
                    {ritual.title}
                  </h4>
                  {ritual.subtitle && (
                    <p style={{
                      fontSize: 12,
                      color: CLEARA_COLORS.tertiaryLabel,
                    }}>
                      {ritual.subtitle}
                    </p>
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => handleCheck(e, ritual.id)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: ritual.completed ? CLEARA_COLORS.sage : 'transparent',
                    border: ritual.completed ? 'none' : `2px solid ${CLEARA_COLORS.quaternaryLabel}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {ritual.completed && <Check size={14} color="white" strokeWidth={3} />}
                </motion.button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Add Ritual Modal */}
      <AnimatePresence>
        {subState === 'add' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(45, 45, 55, 0.3)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: 16,
              zIndex: 100,
            }}
            onClick={() => setSubState(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 400,
                backgroundColor: CLEARA_COLORS.canvas,
                borderRadius: 24,
                padding: 24,
                boxShadow: CLEARA_SHADOWS.floating,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: CLEARA_COLORS.label,
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                }}>
                  New Ritual
                </h3>
                <button
                  onClick={() => setSubState(null)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: CLEARA_COLORS.canvasSecondary,
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} color={CLEARA_COLORS.secondaryLabel} />
                </button>
              </div>

              <form onSubmit={handleAddRitual}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: CLEARA_COLORS.secondaryLabel,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    display: 'block',
                    marginBottom: 8,
                  }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={newRitualTitle}
                    onChange={(e) => setNewRitualTitle(e.target.value)}
                    placeholder="e.g., Drink Green Tea"
                    style={{
                      width: '100%',
                      padding: 12,
                      fontSize: 16,
                      border: 'none',
                      borderBottom: `2px solid ${CLEARA_COLORS.quaternaryLabel}`,
                      backgroundColor: 'transparent',
                      color: CLEARA_COLORS.label,
                      outline: 'none',
                      fontFamily: 'Georgia, serif',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: CLEARA_COLORS.secondaryLabel,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    display: 'block',
                    marginBottom: 8,
                  }}>
                    Time of Day
                  </label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => setNewRitualCategory('morning')}
                      style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: 12,
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        cursor: 'pointer',
                        backgroundColor: newRitualCategory === 'morning'
                          ? `${CLEARA_COLORS.sage}20`
                          : CLEARA_COLORS.canvasSecondary,
                        color: newRitualCategory === 'morning'
                          ? CLEARA_COLORS.sageDark
                          : CLEARA_COLORS.tertiaryLabel,
                        fontWeight: 500,
                      }}
                    >
                      <Sun size={16} /> Morning
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewRitualCategory('evening')}
                      style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: 12,
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        cursor: 'pointer',
                        backgroundColor: newRitualCategory === 'evening'
                          ? `${CLEARA_COLORS.lavender}20`
                          : CLEARA_COLORS.canvasSecondary,
                        color: newRitualCategory === 'evening'
                          ? CLEARA_COLORS.lavenderDark
                          : CLEARA_COLORS.tertiaryLabel,
                        fontWeight: 500,
                      }}
                    >
                      <Moon size={16} /> Evening
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  disabled={!newRitualTitle.trim()}
                  style={{
                    width: '100%',
                    padding: 16,
                    backgroundColor: newRitualTitle.trim() ? CLEARA_COLORS.label : CLEARA_COLORS.quaternaryLabel,
                    border: 'none',
                    borderRadius: 16,
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: newRitualTitle.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  Begin Ritual
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// =============================================================================
// WELLNESS SCREEN (PHQ-9)
// =============================================================================

interface WellnessScreenProps {
  onNavigate: (screen: Screen) => void;
  subState: SubState;
  setSubState: (state: SubState) => void;
}

const WellnessScreen: React.FC<WellnessScreenProps> = ({ onNavigate, subState, setSubState }) => {
  const [step, setStep] = useState(0); // 0 = intro, 1-3 = questions, 4 = result
  const [answers, setAnswers] = useState<number[]>([]);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAnswer = (val: number) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    if (step < WELLNESS_QUESTIONS.length) {
      setStep(prev => prev + 1);
    } else {
      setStep(4);
    }
  };

  const getAiGuidance = async () => {
    setLoadingAi(true);
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiAdvice(
      "The most gentle path forward is always one step at a time. " +
      "Today, try these healing rituals:\n\n" +
      "• Take a warm bath with lavender oil\n" +
      "• Listen to calming nature sounds for 10 minutes\n" +
      "• Write down three things you're grateful for"
    );
    setLoadingAi(false);
  };

  const resetWellness = () => {
    setStep(0);
    setAnswers([]);
    setAiAdvice(null);
  };

  // Intro screen
  if (step === 0) {
    return (
      <div style={{
        padding: '0 24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
      }}>
        <button
          onClick={() => onNavigate('home')}
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: CLEARA_COLORS.tertiaryLabel,
          }}
        >
          <X size={24} />
        </button>

        <div style={{
          width: 160,
          height: 160,
          borderRadius: 80,
          overflow: 'hidden',
          marginBottom: 32,
          boxShadow: CLEARA_SHADOWS.floating,
          border: `4px solid ${CLEARA_COLORS.glassSecondary}`,
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${CLEARA_COLORS.lavenderLight} 0%, ${CLEARA_COLORS.periwinkle} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Heart size={48} color="white" />
          </div>
        </div>

        <h1 style={{
          fontSize: 28,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 16,
          lineHeight: 1.3,
          fontFamily: 'Georgia, serif',
        }}>
          Taking a moment for yourself is an act of healing.
        </h1>
        <p style={{
          fontSize: 15,
          color: CLEARA_COLORS.secondaryLabel,
          marginBottom: 40,
          lineHeight: 1.6,
        }}>
          We&apos;ll ask a few gentle questions to understand how you&apos;re feeling lately. No judgment, just clarity.
        </p>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(1)}
          style={{
            width: '100%',
            padding: 18,
            backgroundColor: CLEARA_COLORS.label,
            border: 'none',
            borderRadius: 20,
            color: 'white',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: `0 8px 24px ${CLEARA_COLORS.lavender}30`,
          }}
        >
          Begin Check-in
        </motion.button>
      </div>
    );
  }

  // Result screen
  if (step === 4) {
    return (
      <div style={{
        padding: '0 20px 100px',
        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
      }}>
        <div style={{
          width: '100%',
          height: 140,
          borderRadius: 24,
          overflow: 'hidden',
          marginBottom: 24,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${CLEARA_COLORS.lavender} 0%, ${CLEARA_COLORS.periwinkle} 100%)`,
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(250,248,245,0.9) 0%, transparent 100%)',
          }} />
        </div>

        <p style={{
          fontSize: 11,
          fontWeight: 700,
          color: CLEARA_COLORS.blush,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 8,
        }}>
          Reflection
        </p>
        <h2 style={{
          fontSize: 28,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 16,
          fontFamily: 'Georgia, serif',
        }}>
          <Heart size={24} color={CLEARA_COLORS.lavender} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
          You&apos;re not alone
        </h2>
        <p style={{
          fontSize: 16,
          color: CLEARA_COLORS.secondaryLabel,
          lineHeight: 1.6,
          marginBottom: 24,
        }}>
          Your check-in suggests you might benefit from some extra support right now.
        </p>

        <GlassCard variant="primary" style={{ marginBottom: 16 }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 600,
            color: CLEARA_COLORS.label,
            marginBottom: 8,
          }}>
            <Flower2 size={14} color={CLEARA_COLORS.blush} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            This is common
          </h3>
          <p style={{
            fontSize: 13,
            color: CLEARA_COLORS.secondaryLabel,
            lineHeight: 1.5,
          }}>
            1 in 5 people living with psoriasis experience these feelings.
            Your skin and emotions are deeply connected.
          </p>
        </GlassCard>

        {!aiAdvice && !loadingAi && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={getAiGuidance}
            style={{
              width: '100%',
              padding: 20,
              background: `linear-gradient(135deg, ${CLEARA_COLORS.glassLavender} 0%, ${CLEARA_COLORS.glassSage} 100%)`,
              border: `1px solid ${CLEARA_BORDERS.lavender}`,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              cursor: 'pointer',
              marginBottom: 16,
            }}
          >
            <Sparkles size={20} color={CLEARA_COLORS.lavender} />
            <span style={{
              fontSize: 16,
              fontWeight: 500,
              color: CLEARA_COLORS.label,
              fontFamily: 'Georgia, serif',
            }}>
              Ask Cleara for gentle guidance
            </span>
          </motion.button>
        )}

        {loadingAi && (
          <GlassCard style={{ marginBottom: 16, textAlign: 'center', padding: 32 }}>
            <Loader2
              size={24}
              color={CLEARA_COLORS.lavender}
              style={{ animation: 'spin 1s linear infinite' }}
            />
            <p style={{
              fontSize: 15,
              color: CLEARA_COLORS.secondaryLabel,
              marginTop: 12,
              fontFamily: 'Georgia, serif',
            }}>
              Crafting your healing note...
            </p>
          </GlassCard>
        )}

        {aiAdvice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard variant="lavender" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Sparkles size={16} color={CLEARA_COLORS.lavender} />
                <span style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: CLEARA_COLORS.label,
                }}>
                  Personalized Wisdom
                </span>
              </div>
              <p style={{
                fontSize: 15,
                color: CLEARA_COLORS.secondaryLabel,
                lineHeight: 1.7,
                fontFamily: 'Georgia, serif',
                whiteSpace: 'pre-wrap',
              }}>
                {aiAdvice}
              </p>
            </GlassCard>
          </motion.div>
        )}

        <GlassCard style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 600,
            color: CLEARA_COLORS.label,
            marginBottom: 12,
          }}>
            Professional Support
          </h3>
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}>
            {[
              'Talk to someone you trust',
              'Gentle movement helps',
              'Consider speaking with a doctor',
            ].map((item, i) => (
              <li key={i} style={{
                display: 'flex',
                gap: 8,
                fontSize: 13,
                color: CLEARA_COLORS.secondaryLabel,
                marginBottom: 8,
              }}>
                <span>•</span> {item}
              </li>
            ))}
          </ul>
        </GlassCard>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            resetWellness();
            onNavigate('home');
          }}
          style={{
            width: '100%',
            padding: 16,
            backgroundColor: CLEARA_COLORS.glassPrimary,
            border: `1px solid ${CLEARA_BORDERS.lavender}`,
            borderRadius: 16,
            color: CLEARA_COLORS.label,
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Close
        </motion.button>
      </div>
    );
  }

  // Question screens
  return (
    <div style={{
      padding: '0 20px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        color: CLEARA_COLORS.tertiaryLabel,
      }}>
        <button
          onClick={() => setStep(step - 1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: CLEARA_COLORS.tertiaryLabel,
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <span style={{ fontSize: 14, fontWeight: 500 }}>
          {step} of {WELLNESS_QUESTIONS.length}
        </span>
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{
          fontSize: 24,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 8,
          lineHeight: 1.3,
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
        }}>
          Over the last two weeks, have you felt...
        </h2>
        <p style={{
          fontSize: 20,
          color: CLEARA_COLORS.lavender,
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          marginBottom: 32,
        }}>
          &ldquo;{WELLNESS_QUESTIONS[step - 1]}&rdquo;
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {WELLNESS_OPTIONS.map((option, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(idx)}
              style={{
                width: '100%',
                padding: 20,
                textAlign: 'left',
                backgroundColor: CLEARA_COLORS.glassPrimary,
                backdropFilter: 'blur(8px)',
                border: `1px solid ${CLEARA_BORDERS.light}`,
                borderRadius: 20,
                color: CLEARA_COLORS.label,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// INSIGHTS SCREEN (Placeholder)
// =============================================================================

interface InsightsScreenProps {
  onNavigate: (screen: Screen) => void;
  pasiLogs: PasiLog[];
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ onNavigate, pasiLogs }) => {
  const latestPasi = pasiLogs[pasiLogs.length - 1];

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        marginBottom: 8,
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}>
        Your Insights
      </h1>
      <p style={{
        fontSize: 14,
        color: CLEARA_COLORS.secondaryLabel,
        marginBottom: 24,
      }}>
        Track your progress over time.
      </p>

      {/* PASI Score Card */}
      <GlassCard variant="lavender" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              color: CLEARA_COLORS.lavender,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 8,
            }}>
              Current PASI Score
            </p>
            <p style={{
              fontSize: 48,
              fontWeight: 700,
              color: CLEARA_COLORS.label,
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              lineHeight: 1,
            }}>
              {latestPasi.score.toFixed(1)}
            </p>
            <p style={{
              fontSize: 13,
              color: CLEARA_COLORS.sage,
              fontWeight: 600,
              marginTop: 8,
            }}>
              ↓ 57% improvement
            </p>
          </div>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: `${CLEARA_COLORS.lavender}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TrendingUp size={32} color={CLEARA_COLORS.lavender} />
          </div>
        </div>
      </GlassCard>

      {/* Trend Chart with Recharts */}
      <GlassCard style={{ marginBottom: 20 }}>
        <h3 style={{
          fontSize: 14,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 16,
        }}>
          PASI Trend
        </h3>
        <div style={{ height: 140, marginLeft: -10, marginRight: -10 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={pasiLogs.map(log => ({
                ...log,
                date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              }))}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPasi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CLEARA_COLORS.lavender} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={CLEARA_COLORS.lavender} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: CLEARA_COLORS.tertiaryLabel }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 15]}
                tick={{ fontSize: 9, fill: CLEARA_COLORS.tertiaryLabel }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: CLEARA_COLORS.glassPrimary,
                  border: `1px solid ${CLEARA_BORDERS.light}`,
                  borderRadius: 12,
                  boxShadow: CLEARA_SHADOWS.card,
                  fontSize: 12,
                }}
                labelStyle={{ color: CLEARA_COLORS.label, fontWeight: 600 }}
                formatter={(value) => [typeof value === 'number' ? value.toFixed(1) : String(value), 'PASI']}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke={CLEARA_COLORS.lavender}
                strokeWidth={2}
                fill="url(#colorPasi)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Symptom Breakdown */}
      <GlassCard>
        <h3 style={{
          fontSize: 14,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 16,
        }}>
          Symptom Breakdown
        </h3>
        {[
          { label: 'Redness', value: latestPasi.redness, color: CLEARA_COLORS.blush },
          { label: 'Thickness', value: latestPasi.thickness, color: CLEARA_COLORS.lavender },
          { label: 'Scaling', value: latestPasi.scaling, color: CLEARA_COLORS.periwinkle },
        ].map((symptom) => (
          <div key={symptom.label} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: CLEARA_COLORS.secondaryLabel }}>{symptom.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: CLEARA_COLORS.label }}>{symptom.value}/4</span>
            </div>
            <div style={{
              height: 6,
              backgroundColor: CLEARA_COLORS.canvasSecondary,
              borderRadius: 3,
            }}>
              <div style={{
                width: `${(symptom.value / 4) * 100}%`,
                height: '100%',
                backgroundColor: symptom.color,
                borderRadius: 3,
              }} />
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
};

// =============================================================================
// PROFILE SCREEN (Placeholder)
// =============================================================================

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  return (
    <div style={{
      padding: '0 20px 100px',
      height: '100%',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: CLEARA_COLORS.lavenderLight,
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 32 }}>S</span>
        </div>
        <h1 style={{
          fontSize: 22,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 4,
        }}>
          Sarah Mitchell
        </h1>
        <p style={{
          fontSize: 14,
          color: CLEARA_COLORS.secondaryLabel,
        }}>
          Member since Jan 2024
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { icon: <User size={20} />, label: 'Edit Profile' },
          { icon: <Clock size={20} />, label: 'Reminders' },
          { icon: <BookOpen size={20} />, label: 'Export Data' },
          { icon: <Heart size={20} />, label: 'Share with Provider' },
        ].map((item, i) => (
          <GlassCard key={i} padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ color: CLEARA_COLORS.lavender }}>{item.icon}</div>
              <span style={{
                flex: 1,
                fontSize: 15,
                color: CLEARA_COLORS.label,
              }}>
                {item.label}
              </span>
              <ChevronRight size={18} color={CLEARA_COLORS.tertiaryLabel} />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// PASI SCREEN (with RadarChart)
// =============================================================================

interface PASIScreenProps {
  onNavigate: (screen: Screen) => void;
  pasiLogs: PasiLog[];
}

const PASIScreen: React.FC<PASIScreenProps> = ({ onNavigate, pasiLogs }) => {
  const latestPasi = pasiLogs[pasiLogs.length - 1];

  const radarData = [
    { subject: 'Scalp', A: 2, fullMark: 4 },
    { subject: 'Trunk', A: 1, fullMark: 4 },
    { subject: 'Upper Limbs', A: 1, fullMark: 4 },
    { subject: 'Lower Limbs', A: 2, fullMark: 4 },
  ];

  const symptomRadarData = [
    { symptom: 'Redness', value: latestPasi.redness },
    { symptom: 'Thickness', value: latestPasi.thickness },
    { symptom: 'Scaling', value: latestPasi.scaling },
  ];

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <button
        onClick={() => onNavigate('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          marginLeft: -8,
          marginBottom: 8,
          color: CLEARA_COLORS.secondaryLabel,
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        marginBottom: 8,
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}>
        PASI Score
      </h1>
      <p style={{
        fontSize: 14,
        color: CLEARA_COLORS.secondaryLabel,
        marginBottom: 24,
      }}>
        Psoriasis Area and Severity Index
      </p>

      {/* Main Score Display */}
      <GlassCard variant="lavender" style={{ marginBottom: 20, textAlign: 'center' }}>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: CLEARA_COLORS.lavender,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: 8,
        }}>
          Current Score
        </p>
        <p style={{
          fontSize: 64,
          fontWeight: 700,
          color: CLEARA_COLORS.label,
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          lineHeight: 1,
          marginBottom: 8,
        }}>
          {latestPasi.score.toFixed(1)}
        </p>
        <div style={{
          display: 'inline-block',
          padding: '6px 12px',
          backgroundColor: `${CLEARA_COLORS.sage}20`,
          borderRadius: 20,
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: CLEARA_COLORS.sage,
          }}>
            Mild Severity
          </span>
        </div>
      </GlassCard>

      {/* Body Area Chart */}
      <GlassCard style={{ marginBottom: 20 }}>
        <h3 style={{
          fontSize: 14,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 8,
        }}>
          Affected Body Areas
        </h3>
        <div style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke={CLEARA_COLORS.quaternaryLabel} />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 11, fill: CLEARA_COLORS.secondaryLabel }}
              />
              <Radar
                name="Severity"
                dataKey="A"
                stroke={CLEARA_COLORS.lavender}
                fill={CLEARA_COLORS.lavender}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Symptom Breakdown */}
      <GlassCard>
        <h3 style={{
          fontSize: 14,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 16,
        }}>
          Component Scores
        </h3>
        {[
          { label: 'Redness (Erythema)', value: latestPasi.redness, color: CLEARA_COLORS.blush },
          { label: 'Thickness (Induration)', value: latestPasi.thickness, color: CLEARA_COLORS.lavender },
          { label: 'Scaling (Desquamation)', value: latestPasi.scaling, color: CLEARA_COLORS.periwinkle },
        ].map((symptom) => (
          <div key={symptom.label} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: CLEARA_COLORS.secondaryLabel }}>{symptom.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: CLEARA_COLORS.label }}>{symptom.value}/4</span>
            </div>
            <div style={{
              height: 8,
              backgroundColor: CLEARA_COLORS.canvasSecondary,
              borderRadius: 4,
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(symptom.value / 4) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: symptom.color,
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
};

// =============================================================================
// JOURNAL SCREEN
// =============================================================================

interface JournalScreenProps {
  onNavigate: (screen: Screen) => void;
}

const JOURNAL_PROMPTS = [
  "What made your skin feel better today?",
  "How did stress affect you this week?",
  "What self-care moment brought you joy?",
  "What patterns have you noticed lately?",
];

const JournalScreen: React.FC<JournalScreenProps> = ({ onNavigate }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const moods = [
    { icon: Smile, label: 'Great', color: CLEARA_COLORS.sage },
    { icon: SmilePlus, label: 'Good', color: CLEARA_COLORS.lavender },
    { icon: Meh, label: 'Okay', color: CLEARA_COLORS.periwinkle },
    { icon: Frown, label: 'Low', color: CLEARA_COLORS.blush },
  ];

  const prompt = JOURNAL_PROMPTS[Math.floor(Date.now() / 86400000) % JOURNAL_PROMPTS.length];

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <button
        onClick={() => onNavigate('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          marginLeft: -8,
          marginBottom: 8,
          color: CLEARA_COLORS.secondaryLabel,
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        marginBottom: 8,
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}>
        Healing Journal
      </h1>
      <p style={{
        fontSize: 14,
        color: CLEARA_COLORS.secondaryLabel,
        marginBottom: 24,
      }}>
        Reflect on your journey.
      </p>

      {/* Mood Selector */}
      <GlassCard variant="lavender" style={{ marginBottom: 20 }}>
        <p style={{
          fontSize: 12,
          fontWeight: 600,
          color: CLEARA_COLORS.lavender,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: 12,
        }}>
          How are you feeling today?
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          {moods.map((mood, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedMood(i)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: 12,
                backgroundColor: selectedMood === i ? `${mood.color}20` : 'transparent',
                border: selectedMood === i ? `2px solid ${mood.color}` : `2px solid transparent`,
                borderRadius: 16,
                cursor: 'pointer',
              }}
            >
              <mood.icon size={28} color={selectedMood === i ? mood.color : CLEARA_COLORS.secondaryLabel} />
              <span style={{
                fontSize: 11,
                color: selectedMood === i ? mood.color : CLEARA_COLORS.secondaryLabel,
                fontWeight: selectedMood === i ? 600 : 400,
              }}>
                {mood.label}
              </span>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Journal Prompt */}
      <GlassCard style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Sparkles size={16} color={CLEARA_COLORS.lavender} />
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: CLEARA_COLORS.lavender,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            Today&apos;s Reflection
          </span>
        </div>
        <p style={{
          fontSize: 18,
          color: CLEARA_COLORS.label,
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          lineHeight: 1.5,
          marginBottom: 16,
        }}>
          &ldquo;{prompt}&rdquo;
        </p>
        <textarea
          placeholder="Write your thoughts..."
          style={{
            width: '100%',
            height: 100,
            padding: 12,
            backgroundColor: CLEARA_COLORS.canvasSecondary,
            border: 'none',
            borderRadius: 12,
            fontSize: 15,
            color: CLEARA_COLORS.label,
            resize: 'none',
            outline: 'none',
            fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
          }}
        />
      </GlassCard>

      {/* Recent Entries */}
      <h3 style={{
        fontSize: 13,
        fontWeight: 600,
        color: CLEARA_COLORS.secondaryLabel,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
      }}>
        Recent Entries
      </h3>
      {[
        { date: 'Yesterday', MoodIcon: SmilePlus, color: CLEARA_COLORS.lavender, excerpt: 'Felt good about my morning routine...' },
        { date: '2 days ago', MoodIcon: Smile, color: CLEARA_COLORS.sage, excerpt: 'Skin looked clearer after...' },
      ].map((entry, i) => (
        <GlassCard key={i} padding={14} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <entry.MoodIcon size={24} color={entry.color} />
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: 11,
                color: CLEARA_COLORS.tertiaryLabel,
                marginBottom: 2,
              }}>
                {entry.date}
              </p>
              <p style={{
                fontSize: 14,
                color: CLEARA_COLORS.secondaryLabel,
              }}>
                {entry.excerpt}
              </p>
            </div>
            <ChevronRight size={18} color={CLEARA_COLORS.tertiaryLabel} />
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

// =============================================================================
// FLARE SCREEN
// =============================================================================

interface FlareScreenProps {
  onNavigate: (screen: Screen) => void;
}

const FlareScreen: React.FC<FlareScreenProps> = ({ onNavigate }) => {
  const riskLevel = 35; // 0-100

  const factors = [
    { icon: <Moon size={18} />, label: 'Sleep', status: 'Low', value: '5.2 hrs', impact: 'negative' as const },
    { icon: <Activity size={18} />, label: 'Stress', status: 'Moderate', value: '6/10', impact: 'warning' as const },
    { icon: <CloudRain size={18} />, label: 'Weather', status: 'Cold', value: '42°F', impact: 'warning' as const },
    { icon: <Droplets size={18} />, label: 'Hydration', status: 'Good', value: '2.1L', impact: 'positive' as const },
  ];

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <button
        onClick={() => onNavigate('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          marginLeft: -8,
          marginBottom: 8,
          color: CLEARA_COLORS.secondaryLabel,
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        marginBottom: 8,
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}>
        Flare Risk
      </h1>
      <p style={{
        fontSize: 14,
        color: CLEARA_COLORS.secondaryLabel,
        marginBottom: 24,
      }}>
        Predictive analysis based on your patterns.
      </p>

      {/* Risk Thermometer */}
      <GlassCard style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 60,
            height: 180,
            backgroundColor: CLEARA_COLORS.canvasSecondary,
            borderRadius: 30,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Thermometer fill */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${riskLevel}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: riskLevel > 60
                  ? `linear-gradient(to top, ${CLEARA_COLORS.blush}, ${CLEARA_COLORS.blushLight})`
                  : riskLevel > 30
                    ? `linear-gradient(to top, ${CLEARA_COLORS.warning}, #F5D898)`
                    : `linear-gradient(to top, ${CLEARA_COLORS.sage}, ${CLEARA_COLORS.sageLight})`,
                borderRadius: 30,
              }}
            />
            {/* Thermometer bulb */}
            <div style={{
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: riskLevel > 60 ? CLEARA_COLORS.blush : riskLevel > 30 ? CLEARA_COLORS.warning : CLEARA_COLORS.sage,
            }} />
          </div>

          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              color: CLEARA_COLORS.secondaryLabel,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 8,
            }}>
              Current Risk Level
            </p>
            <p style={{
              fontSize: 48,
              fontWeight: 700,
              color: riskLevel > 60 ? CLEARA_COLORS.blush : riskLevel > 30 ? CLEARA_COLORS.warning : CLEARA_COLORS.sage,
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              lineHeight: 1,
              marginBottom: 8,
            }}>
              {riskLevel}%
            </p>
            <div style={{
              display: 'inline-block',
              padding: '6px 12px',
              backgroundColor: `${CLEARA_COLORS.sage}20`,
              borderRadius: 20,
            }}>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                color: CLEARA_COLORS.sage,
              }}>
                Low Risk
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Contributing Factors */}
      <h3 style={{
        fontSize: 13,
        fontWeight: 600,
        color: CLEARA_COLORS.secondaryLabel,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
      }}>
        Contributing Factors
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {factors.map((factor, i) => (
          <GlassCard
            key={i}
            padding={14}
            variant={factor.impact === 'positive' ? 'sage' : factor.impact === 'warning' ? 'primary' : 'blush'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                backgroundColor: factor.impact === 'positive'
                  ? `${CLEARA_COLORS.sage}20`
                  : factor.impact === 'warning'
                    ? `${CLEARA_COLORS.warning}20`
                    : `${CLEARA_COLORS.blush}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: factor.impact === 'positive'
                  ? CLEARA_COLORS.sage
                  : factor.impact === 'warning'
                    ? CLEARA_COLORS.warning
                    : CLEARA_COLORS.blush,
              }}>
                {factor.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: CLEARA_COLORS.label,
                }}>
                  {factor.label}
                </p>
                <p style={{
                  fontSize: 12,
                  color: CLEARA_COLORS.tertiaryLabel,
                }}>
                  {factor.status}
                </p>
              </div>
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: CLEARA_COLORS.label,
              }}>
                {factor.value}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// LEARN SCREEN
// =============================================================================

interface LearnScreenProps {
  onNavigate: (screen: Screen) => void;
}

const LearnScreen: React.FC<LearnScreenProps> = ({ onNavigate }) => {
  const categories = [
    { icon: <Leaf size={24} />, label: 'Lifestyle', count: 12, color: CLEARA_COLORS.sage },
    { icon: <Droplets size={24} />, label: 'Skincare', count: 8, color: CLEARA_COLORS.lavender },
    { icon: <Heart size={24} />, label: 'Mental Health', count: 6, color: CLEARA_COLORS.blush },
    { icon: <Activity size={24} />, label: 'Treatment', count: 10, color: CLEARA_COLORS.periwinkle },
  ];

  const articles = [
    { title: 'Understanding PASI Scores', category: 'Treatment', time: '5 min read' },
    { title: 'Stress and Your Skin', category: 'Mental Health', time: '4 min read' },
    { title: 'Building a Skincare Routine', category: 'Skincare', time: '6 min read' },
  ];

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <button
        onClick={() => onNavigate('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          marginLeft: -8,
          marginBottom: 8,
          color: CLEARA_COLORS.secondaryLabel,
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        marginBottom: 8,
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}>
        Learn
      </h1>
      <p style={{
        fontSize: 14,
        color: CLEARA_COLORS.secondaryLabel,
        marginBottom: 24,
      }}>
        Understand your condition better.
      </p>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        marginBottom: 28,
      }}>
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: 20,
              backgroundColor: `${cat.color}10`,
              borderRadius: 20,
              border: `1px solid ${cat.color}20`,
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: `${cat.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: cat.color,
              marginBottom: 12,
            }}>
              {cat.icon}
            </div>
            <p style={{
              fontSize: 15,
              fontWeight: 600,
              color: CLEARA_COLORS.label,
              marginBottom: 2,
            }}>
              {cat.label}
            </p>
            <p style={{
              fontSize: 12,
              color: CLEARA_COLORS.tertiaryLabel,
            }}>
              {cat.count} articles
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Articles */}
      <h3 style={{
        fontSize: 13,
        fontWeight: 600,
        color: CLEARA_COLORS.secondaryLabel,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
      }}>
        Recommended for You
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {articles.map((article, i) => (
          <GlassCard key={i} padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                backgroundColor: CLEARA_COLORS.canvasSecondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <BookOpen size={22} color={CLEARA_COLORS.lavender} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: CLEARA_COLORS.label,
                  marginBottom: 4,
                }}>
                  {article.title}
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{
                    fontSize: 11,
                    color: CLEARA_COLORS.lavender,
                    fontWeight: 500,
                  }}>
                    {article.category}
                  </span>
                  <span style={{
                    fontSize: 11,
                    color: CLEARA_COLORS.tertiaryLabel,
                  }}>
                    {article.time}
                  </span>
                </div>
              </div>
              <ChevronRight size={18} color={CLEARA_COLORS.tertiaryLabel} />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// SETTINGS SCREEN
// =============================================================================

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState({
    ritualReminders: true,
    flareAlerts: true,
    weeklyReport: false,
    tips: true,
  });

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        { key: 'ritualReminders', label: 'Ritual reminders', icon: <Bell size={20} /> },
        { key: 'flareAlerts', label: 'Flare alerts', icon: <AlertTriangle size={20} /> },
        { key: 'weeklyReport', label: 'Weekly report', icon: <FileText size={20} /> },
        { key: 'tips', label: 'Daily tips', icon: <Sparkles size={20} /> },
      ],
    },
  ];

  const menuItems = [
    { label: 'Connected Apps', icon: <Link size={20} />, screen: 'patterns' as Screen },
    { label: 'Export Data', icon: <Download size={20} />, screen: 'report' as Screen },
    { label: 'Privacy & Data', icon: <Shield size={20} />, screen: null },
    { label: 'About Cleara', icon: <Smartphone size={20} />, screen: null },
  ];

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <button
        onClick={() => { haptic.selection(); onNavigate('home'); }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          marginLeft: -8,
          marginBottom: 8,
          color: CLEARA_COLORS.secondaryLabel,
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        marginBottom: 24,
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}>
        Settings
      </h1>

      {/* Profile Card */}
      <GlassCard padding={16} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            background: `linear-gradient(135deg, ${CLEARA_COLORS.lavender}, ${CLEARA_COLORS.periwinkle})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <User size={28} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: 17,
              fontWeight: 600,
              color: CLEARA_COLORS.label,
              marginBottom: 2,
            }}>
              Sarah Chen
            </p>
            <p style={{
              fontSize: 13,
              color: CLEARA_COLORS.secondaryLabel,
            }}>
              Member since January 2024
            </p>
          </div>
          <ChevronRight size={20} color={CLEARA_COLORS.tertiaryLabel} />
        </div>
      </GlassCard>

      {/* Notification Settings */}
      {settingsSections.map((section, sectionIndex) => (
        <div key={sectionIndex} style={{ marginBottom: 20 }}>
          <h3 style={{
            fontSize: 13,
            fontWeight: 600,
            color: CLEARA_COLORS.secondaryLabel,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            marginBottom: 10,
          }}>
            {section.title}
          </h3>
          <GlassCard padding={0}>
            {section.items.map((item, itemIndex) => (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  borderBottom: itemIndex < section.items.length - 1 ? `1px solid ${CLEARA_BORDERS.light}` : 'none',
                }}
              >
                <div style={{ color: CLEARA_COLORS.lavender, marginRight: 12 }}>
                  {item.icon}
                </div>
                <span style={{
                  flex: 1,
                  fontSize: 15,
                  color: CLEARA_COLORS.label,
                }}>
                  {item.label}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    haptic.selection();
                    setNotifications(prev => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof prev],
                    }));
                  }}
                  style={{
                    width: 48,
                    height: 28,
                    borderRadius: 14,
                    border: 'none',
                    cursor: 'pointer',
                    background: notifications[item.key as keyof typeof notifications]
                      ? CLEARA_COLORS.sage
                      : CLEARA_COLORS.canvasSecondary,
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <motion.div
                    animate={{
                      x: notifications[item.key as keyof typeof notifications] ? 20 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: 'white',
                      boxShadow: CLEARA_SHADOWS.card,
                    }}
                  />
                </motion.button>
              </div>
            ))}
          </GlassCard>
        </div>
      ))}

      {/* Menu Items */}
      <GlassCard padding={0}>
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              haptic.selection();
              if (item.screen) onNavigate(item.screen);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 16px',
              cursor: 'pointer',
              borderBottom: index < menuItems.length - 1 ? `1px solid ${CLEARA_BORDERS.light}` : 'none',
            }}
          >
            <div style={{ color: CLEARA_COLORS.lavender, marginRight: 12 }}>
              {item.icon}
            </div>
            <span style={{
              flex: 1,
              fontSize: 15,
              color: CLEARA_COLORS.label,
            }}>
              {item.label}
            </span>
            <ChevronRight size={18} color={CLEARA_COLORS.tertiaryLabel} />
          </motion.div>
        ))}
      </GlassCard>

      {/* Version */}
      <p style={{
        textAlign: 'center',
        fontSize: 12,
        color: CLEARA_COLORS.tertiaryLabel,
        marginTop: 24,
      }}>
        Cleara v1.0.0
      </p>
    </div>
  );
};

// =============================================================================
// PATTERNS SCREEN
// =============================================================================

interface PatternsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const PatternsScreen: React.FC<PatternsScreenProps> = ({ onNavigate }) => {
  const [stressLevel, setStressLevel] = useState(4);

  const connectedSources = [
    { name: 'Apple Health', icon: <Heart size={20} />, status: 'Connected', color: '#FF3B30' },
    { name: 'Weather', icon: <Cloud size={20} />, status: 'Connected', color: CLEARA_COLORS.lavender },
    { name: 'Calendar', icon: <Calendar size={20} />, status: 'Not connected', color: CLEARA_COLORS.tertiaryLabel },
  ];

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <button
        onClick={() => { haptic.selection(); onNavigate('home'); }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          marginLeft: -8,
          marginBottom: 8,
          color: CLEARA_COLORS.secondaryLabel,
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        marginBottom: 8,
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}>
        Your Patterns
      </h1>
      <p style={{
        fontSize: 14,
        color: CLEARA_COLORS.secondaryLabel,
        marginBottom: 24,
      }}>
        Understanding what affects your skin.
      </p>

      {/* Trigger Correlations */}
      <h3 style={{
        fontSize: 13,
        fontWeight: 600,
        color: CLEARA_COLORS.secondaryLabel,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
      }}>
        Trigger Correlations
      </h3>
      <GlassCard padding={16} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {TRIGGER_DATA.map((trigger, index) => (
            <div key={index}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ color: trigger.color }}>{trigger.icon}</div>
                  <span style={{ fontSize: 14, color: CLEARA_COLORS.label }}>{trigger.name}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: trigger.color }}>
                  {trigger.percentage}%
                </span>
              </div>
              <div style={{
                height: 8,
                backgroundColor: CLEARA_COLORS.canvasSecondary,
                borderRadius: 4,
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trigger.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{
                    height: '100%',
                    backgroundColor: trigger.color,
                    borderRadius: 4,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Quick Check-in */}
      <h3 style={{
        fontSize: 13,
        fontWeight: 600,
        color: CLEARA_COLORS.secondaryLabel,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
      }}>
        How stressed are you today?
      </h3>
      <GlassCard padding={16} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: CLEARA_COLORS.tertiaryLabel }}>Relaxed</span>
          <span style={{ fontSize: 12, color: CLEARA_COLORS.tertiaryLabel }}>Stressed</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((level) => (
            <motion.button
              key={level}
              whileTap={{ scale: 0.9 }}
              onClick={() => { haptic.selection(); setStressLevel(level); }}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: stressLevel === level
                  ? (level <= 3 ? CLEARA_COLORS.sage : level <= 5 ? CLEARA_COLORS.lavender : CLEARA_COLORS.blush)
                  : CLEARA_COLORS.canvasSecondary,
                color: stressLevel === level ? 'white' : CLEARA_COLORS.label,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Connected Sources */}
      <h3 style={{
        fontSize: 13,
        fontWeight: 600,
        color: CLEARA_COLORS.secondaryLabel,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
      }}>
        Data Sources
      </h3>
      <GlassCard padding={0}>
        {connectedSources.map((source, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 16px',
              borderBottom: index < connectedSources.length - 1 ? `1px solid ${CLEARA_BORDERS.light}` : 'none',
            }}
          >
            <div style={{ color: source.color, marginRight: 12 }}>
              {source.icon}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 15, color: CLEARA_COLORS.label }}>{source.name}</span>
            </div>
            <span style={{
              fontSize: 12,
              color: source.status === 'Connected' ? CLEARA_COLORS.sage : CLEARA_COLORS.tertiaryLabel,
            }}>
              {source.status}
            </span>
          </div>
        ))}
      </GlassCard>
    </div>
  );
};

// =============================================================================
// REPORT SCREEN
// =============================================================================

interface ReportScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ReportScreen: React.FC<ReportScreenProps> = ({ onNavigate }) => {
  const [selectedSections, setSelectedSections] = useState({
    photos: true,
    pasi: true,
    rituals: true,
    wellness: false,
  });

  const sections = [
    { key: 'photos', label: 'Photo Progress', icon: <Camera size={20} /> },
    { key: 'pasi', label: 'PASI Trends', icon: <TrendingDown size={20} /> },
    { key: 'rituals', label: 'Ritual Consistency', icon: <Check size={20} /> },
    { key: 'wellness', label: 'Wellness Data', icon: <Heart size={20} /> },
  ];

  return (
    <div style={{
      padding: '0 20px 100px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
    }}>
      <button
        onClick={() => { haptic.selection(); onNavigate('home'); }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          marginLeft: -8,
          marginBottom: 8,
          color: CLEARA_COLORS.secondaryLabel,
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <h1 style={{
        fontSize: 24,
        fontWeight: 600,
        color: CLEARA_COLORS.label,
        marginBottom: 8,
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}>
        Provider Report
      </h1>
      <p style={{
        fontSize: 14,
        color: CLEARA_COLORS.secondaryLabel,
        marginBottom: 24,
      }}>
        Share your progress with your healthcare provider.
      </p>

      {/* Report Preview */}
      <GlassCard padding={20} style={{ marginBottom: 20, textAlign: 'center' }}>
        <div style={{
          width: 80,
          height: 100,
          margin: '0 auto 16px',
          backgroundColor: 'white',
          borderRadius: 8,
          boxShadow: CLEARA_SHADOWS.card,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <FileText size={32} color={CLEARA_COLORS.lavender} />
        </div>
        <p style={{
          fontSize: 16,
          fontWeight: 600,
          color: CLEARA_COLORS.label,
          marginBottom: 4,
        }}>
          Health Summary
        </p>
        <p style={{
          fontSize: 13,
          color: CLEARA_COLORS.secondaryLabel,
        }}>
          Last 30 days
        </p>
      </GlassCard>

      {/* Section Selection */}
      <h3 style={{
        fontSize: 13,
        fontWeight: 600,
        color: CLEARA_COLORS.secondaryLabel,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
      }}>
        Include in Report
      </h3>
      <GlassCard padding={0} style={{ marginBottom: 24 }}>
        {sections.map((section, index) => (
          <motion.div
            key={section.key}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              haptic.selection();
              setSelectedSections(prev => ({
                ...prev,
                [section.key]: !prev[section.key as keyof typeof prev],
              }));
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 16px',
              cursor: 'pointer',
              borderBottom: index < sections.length - 1 ? `1px solid ${CLEARA_BORDERS.light}` : 'none',
            }}
          >
            <div style={{ color: CLEARA_COLORS.lavender, marginRight: 12 }}>
              {section.icon}
            </div>
            <span style={{ flex: 1, fontSize: 15, color: CLEARA_COLORS.label }}>
              {section.label}
            </span>
            <div style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              border: `2px solid ${selectedSections[section.key as keyof typeof selectedSections] ? CLEARA_COLORS.sage : CLEARA_COLORS.tertiaryLabel}`,
              backgroundColor: selectedSections[section.key as keyof typeof selectedSections] ? CLEARA_COLORS.sage : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {selectedSections[section.key as keyof typeof selectedSections] && (
                <Check size={14} color="white" />
              )}
            </div>
          </motion.div>
        ))}
      </GlassCard>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => haptic.success()}
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: 14,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: CLEARA_COLORS.lavender,
            color: 'white',
            fontSize: 15,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Download size={18} />
          Generate PDF
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => haptic.light()}
          style={{
            padding: '14px 20px',
            borderRadius: 14,
            border: `1px solid ${CLEARA_BORDERS.lavender}`,
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: CLEARA_COLORS.lavender,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          <Share2 size={18} />
        </motion.button>
      </div>
    </div>
  );
};

// =============================================================================
// BREATHING SCREEN
// =============================================================================

interface BreathingScreenProps {
  onNavigate: (screen: Screen) => void;
  breathPhase: 'inhale' | 'exhale';
  setBreathPhase: React.Dispatch<React.SetStateAction<'inhale' | 'exhale'>>;
  breathCount: number;
  setBreathCount: React.Dispatch<React.SetStateAction<number>>;
}

const BreathingScreen: React.FC<BreathingScreenProps> = ({
  onNavigate,
  breathPhase,
  setBreathPhase,
  breathCount,
  setBreathCount,
}) => {
  const [isActive, setIsActive] = useState(false);
  const maxBreaths = 3;

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setBreathPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');

      if (breathPhase === 'exhale') {
        setBreathCount(prev => {
          if (prev + 1 >= maxBreaths) {
            setIsActive(false);
            haptic.success();
            return 0;
          }
          return prev + 1;
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, breathPhase, setBreathPhase, setBreathCount]);

  const handleStart = () => {
    haptic.medium();
    setBreathPhase('inhale');
    setBreathCount(0);
    setIsActive(true);
  };

  return (
    <div style={{
      padding: '0 20px',
      fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <button
        onClick={() => { haptic.selection(); onNavigate('home'); }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          marginLeft: -8,
          marginBottom: 8,
          color: CLEARA_COLORS.secondaryLabel,
        }}
      >
        <ArrowLeft size={24} />
      </button>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 60,
      }}>
        {/* Breathing Circle */}
        <motion.div
          animate={{
            scale: isActive ? (breathPhase === 'inhale' ? 1.4 : 1) : 1,
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
          }}
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${CLEARA_COLORS.lavender}40, ${CLEARA_COLORS.periwinkle}40)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            boxShadow: `0 0 60px ${CLEARA_COLORS.lavender}30`,
          }}
        >
          <motion.div
            animate={{
              scale: isActive ? (breathPhase === 'inhale' ? 1.3 : 1) : 1,
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${CLEARA_COLORS.lavender}, ${CLEARA_COLORS.periwinkle})`,
            }}
          />
        </motion.div>

        {/* Instructions */}
        <motion.p
          key={breathPhase + isActive}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: CLEARA_COLORS.label,
            marginBottom: 8,
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          }}
        >
          {!isActive ? 'Take a moment' : (breathPhase === 'inhale' ? 'Breathe in...' : 'Breathe out...')}
        </motion.p>

        <p style={{
          fontSize: 14,
          color: CLEARA_COLORS.secondaryLabel,
          marginBottom: 32,
        }}>
          {!isActive ? 'A few deep breaths can help calm your mind.' : `${breathCount + 1} of ${maxBreaths}`}
        </p>

        {/* Start/Skip Button */}
        {!isActive ? (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            style={{
              padding: '14px 40px',
              borderRadius: 100,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: CLEARA_COLORS.lavender,
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Begin
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              haptic.selection();
              setIsActive(false);
              onNavigate('home');
            }}
            style={{
              padding: '10px 24px',
              borderRadius: 100,
              border: `1px solid ${CLEARA_BORDERS.light}`,
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: CLEARA_COLORS.secondaryLabel,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Skip
          </motion.button>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const ClearaPhoneMockup: React.FC<ClearaPhoneMockupProps> = ({
  controlledScreen,
  controlledSubState,
  scale = 1,
  className = '',
}) => {
  // Screen state
  const [internalScreen, setInternalScreen] = useState<Screen>('home');
  const [internalSubState, setInternalSubState] = useState<SubState>(null);

  // Data state
  const [rituals, setRituals] = useState<Ritual[]>(INITIAL_RITUALS);
  const [pasiLogs] = useState<PasiLog[]>(INITIAL_PASI_LOGS);

  // Scroll container ref
  const screenContainerRef = useRef<HTMLDivElement>(null);

  // Pull-to-refresh state
  const [pullToRefresh, setPullToRefresh] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullThresholdCrossed, setPullThresholdCrossed] = useState(false);

  // Swipe navigation state
  const [swipeProgress, setSwipeProgress] = useState(0);

  // Breathing state
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);

  // Streak & Confetti state
  const [streak, setStreak] = useState(7);
  const [confettiParticles, setConfettiParticles] = useState<ConfettiParticle[]>([]);
  const confettiContainerRef = useRef<HTMLDivElement>(null);

  // Confetti trigger function
  const triggerConfetti = (x: number, y: number) => {
    const particles = Array.from({ length: CONFETTI_CONFIG.count }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      color: CONFETTI_CONFIG.colors[Math.floor(Math.random() * CONFETTI_CONFIG.colors.length)],
      velocityX: (Math.random() - 0.5) * 12,
      velocityY: -Math.random() * 15 - 5,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 20,
      size: 6 + Math.random() * 6,
      opacity: 1,
    }));
    setConfettiParticles(particles);
  };

  // Use controlled props if provided
  const activeScreen = controlledScreen ?? internalScreen;
  const activeSubState = controlledSubState ?? internalSubState;

  const handleNavigate = (screen: Screen) => {
    if (!controlledScreen) {
      setInternalScreen(screen);
      setInternalSubState(null);
    }
  };

  const handleSetSubState = (state: SubState) => {
    if (!controlledSubState) {
      setInternalSubState(state);
    }
  };

  const handleToggleRitual = (id: string) => {
    setRituals(prev => {
      const updated = prev.map(r =>
        r.id === id ? { ...r, completed: !r.completed } : r
      );
      // Check if all rituals are now complete
      const allComplete = updated.every(r => r.completed);
      const wasComplete = prev.every(r => r.completed);
      if (allComplete && !wasComplete) {
        // Increment streak when completing all rituals
        setStreak(s => s + 1);
      }
      return updated;
    });
  };

  const handleAddRitual = (title: string, category: 'morning' | 'evening') => {
    const newRitual: Ritual = {
      id: Date.now().toString(),
      title,
      category,
      completed: false,
    };
    setRituals(prev => [...prev, newRitual]);
  };

  // Pull-to-refresh handlers
  const handlePullDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { y: number } }) => {
    if (activeScreen === 'home' && info.offset.y > 0) {
      const pullAmount = Math.min(info.offset.y, PULL_MAX);
      setPullToRefresh(pullAmount);

      if (pullAmount >= PULL_THRESHOLD && !pullThresholdCrossed) {
        setPullThresholdCrossed(true);
        haptic.medium();
      } else if (pullAmount < PULL_THRESHOLD && pullThresholdCrossed) {
        setPullThresholdCrossed(false);
      }
    }
  };

  const handlePullDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { y: number } }) => {
    if (info.offset.y >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      haptic.success();
      setTimeout(() => {
        setIsRefreshing(false);
        setPullToRefresh(0);
        setPullThresholdCrossed(false);
      }, 1500);
    } else {
      setPullToRefresh(0);
      setPullThresholdCrossed(false);
    }
  };

  // Swipe navigation handlers
  const handleHorizontalDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    const progress = Math.max(-1, Math.min(1, info.offset.x / 150));
    setSwipeProgress(progress);
  };

  const handleSwipeEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
    setSwipeProgress(0);
    const swipeThreshold = 50;
    const velocityThreshold = 200;

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      // Swipe right - go back
      haptic.selection();
      if (activeScreen !== 'home') {
        handleNavigate('home');
      }
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            rituals={rituals}
            pasiLogs={pasiLogs}
          />
        );
      case 'photo':
        return (
          <PhotoScreen
            onNavigate={handleNavigate}
            subState={activeSubState}
            setSubState={handleSetSubState}
          />
        );
      case 'rituals':
        return (
          <RitualsScreen
            onNavigate={handleNavigate}
            rituals={rituals}
            onToggleRitual={handleToggleRitual}
            onAddRitual={handleAddRitual}
            subState={activeSubState}
            setSubState={handleSetSubState}
            streak={streak}
            onTriggerConfetti={triggerConfetti}
          />
        );
      case 'wellness':
        return (
          <WellnessScreen
            onNavigate={handleNavigate}
            subState={activeSubState}
            setSubState={handleSetSubState}
          />
        );
      case 'insights':
        return (
          <InsightsScreen
            onNavigate={handleNavigate}
            pasiLogs={pasiLogs}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onNavigate={handleNavigate}
          />
        );
      case 'pasi':
        return (
          <PASIScreen
            onNavigate={handleNavigate}
            pasiLogs={pasiLogs}
          />
        );
      case 'journal':
        return (
          <JournalScreen
            onNavigate={handleNavigate}
          />
        );
      case 'flare':
        return (
          <FlareScreen
            onNavigate={handleNavigate}
          />
        );
      case 'learn':
        return (
          <LearnScreen
            onNavigate={handleNavigate}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            onNavigate={handleNavigate}
          />
        );
      case 'patterns':
        return (
          <PatternsScreen
            onNavigate={handleNavigate}
          />
        );
      case 'report':
        return (
          <ReportScreen
            onNavigate={handleNavigate}
          />
        );
      case 'breathing':
        return (
          <BreathingScreen
            onNavigate={handleNavigate}
            breathPhase={breathPhase}
            setBreathPhase={setBreathPhase}
            breathCount={breathCount}
            setBreathCount={setBreathCount}
          />
        );
      default:
        return null;
    }
  };

  // Check if we should hide the tab bar
  const hideTabBar = activeScreen === 'wellness' ||
    (activeScreen === 'photo' && (activeSubState === 'ghost' || activeSubState === 'result'));

  return (
    <div
      className={className}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* SVG Filter Definitions for Watercolor & Liquid Glass Effects */}
      <SVGFilters />

      {/* iPhone 15 Pro Device Frame with Titanium Bezel */}
      <div
        style={{
          position: 'relative',
          width: 393 + TITANIUM_FRAME.bezelWidth * 2,  // iPhone 15 Pro viewport + bezel
          height: 852 + TITANIUM_FRAME.bezelWidth * 2, // iPhone 15 Pro viewport + bezel
          background: TITANIUM_FRAME.bezelGradient,
          borderRadius: TITANIUM_FRAME.deviceRadius,
          padding: TITANIUM_FRAME.bezelWidth,
          boxShadow: TITANIUM_FRAME.deviceShadow,
        }}
      >
        {/* Side Buttons */}
        <SideButtons />

        {/* Titanium Edge Highlight Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: TITANIUM_FRAME.deviceRadius,
            boxShadow: TITANIUM_FRAME.bezelHighlight,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        {/* Screen Container */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: CLEARA_COLORS.canvas,
            borderRadius: TITANIUM_FRAME.screenRadius,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Status Bar */}
          <StatusBar />

          {/* Watercolor Decorative Blobs */}
          <WatercolorBlob
            color={CLEARA_COLORS.lavender}
            size={180}
            position={{ top: '10%', right: '-40px' }}
            opacity={0.4}
          />
          <WatercolorBlob
            color={CLEARA_COLORS.sage}
            size={150}
            position={{ bottom: '25%', left: '-30px' }}
            opacity={0.35}
          />
          <WatercolorBlob
            color={CLEARA_COLORS.blush}
            size={120}
            position={{ top: '50%', right: '10%' }}
            opacity={0.3}
          />

          {/* Screen Content */}
          <motion.div
            ref={screenContainerRef}
            drag={activeScreen === 'home' ? 'y' : 'x'}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={activeScreen === 'home' ? { top: 0.3, bottom: 0 } : 0.2}
            onDrag={(e, info) => {
              if (activeScreen === 'home') {
                handlePullDrag(e, info);
              } else {
                handleHorizontalDrag(e, info);
              }
            }}
            onDragEnd={(e, info) => {
              if (activeScreen === 'home') {
                handlePullDragEnd(e, info);
              } else {
                handleSwipeEnd(e, info as { offset: { x: number }; velocity: { x: number } });
              }
            }}
            onWheel={(e) => {
              e.stopPropagation();
              if (screenContainerRef.current) {
                screenContainerRef.current.scrollTop += e.deltaY;
              }
            }}
            style={{
              position: 'absolute',
              top: 44,
              left: 0,
              right: 0,
              bottom: hideTabBar ? 0 : 84,
              overflow: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              cursor: 'grab',
            }}
          >
            {/* Pull-to-Refresh Indicator */}
            {activeScreen === 'home' && pullToRefresh > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: Math.min(pullToRefresh / PULL_THRESHOLD, 1),
                  y: 0,
                  scale: pullThresholdCrossed ? 1.2 : 0.8 + (pullToRefresh / PULL_MAX) * 0.4
                }}
                style={{
                  position: 'absolute',
                  top: 12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <motion.div
                  animate={{
                    rotate: isRefreshing ? 360 : pullToRefresh * 3.6,
                  }}
                  transition={isRefreshing ? {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'linear'
                  } : { duration: 0.1 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: pullThresholdCrossed
                      ? `linear-gradient(135deg, ${CLEARA_COLORS.lavender}40, ${CLEARA_COLORS.lavender}20)`
                      : 'rgba(255,255,255,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: CLEARA_SHADOWS.card,
                  }}
                >
                  <RefreshCw
                    size={18}
                    color={pullThresholdCrossed ? CLEARA_COLORS.lavender : CLEARA_COLORS.tertiaryLabel}
                  />
                </motion.div>
                {isRefreshing && (
                  <span style={{
                    fontSize: 11,
                    color: CLEARA_COLORS.lavender,
                    fontWeight: 500,
                  }}>
                    Refreshing...
                  </span>
                )}
              </motion.div>
            )}

            {/* Swipe Edge Indicator */}
            {activeScreen !== 'home' && swipeProgress > 0.1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: swipeProgress }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 24,
                  height: 60,
                  background: `linear-gradient(90deg, ${CLEARA_COLORS.lavender}30, transparent)`,
                  borderRadius: '0 12px 12px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <ChevronLeft size={16} color={CLEARA_COLORS.lavender} />
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen + (activeSubState || '')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Tab Bar */}
          {!hideTabBar && (
            <TabBar
              activeScreen={activeScreen}
              onNavigate={handleNavigate}
            />
          )}

          {/* Home Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 134,
              height: 5,
              backgroundColor: CLEARA_COLORS.tertiaryLabel,
              borderRadius: 3,
            }}
          />

          {/* Confetti Explosion Overlay */}
          <div
            ref={confettiContainerRef}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              overflow: 'hidden',
              zIndex: 100,
            }}
          >
            <ConfettiExplosion
              particles={confettiParticles}
              containerRef={confettiContainerRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearaPhoneMockup;
