"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { Play, Download, Sparkles, CircuitBoard, Network, Shield, ArrowRight, Moon, Zap, Brain, Cpu, Activity, Waves, ChevronRight, Volume2, Mic, Camera, FileText, Lock, Cloud, Layers, BarChart3, Eye, Heart, Timer } from "lucide-react";
import { SleepStagesInteractive, BrainWavesInteractive, DetectionSystemInteractive, ProcessingPipelineInteractive, ResearchPapers, Hypnogram, WaveformPattern, MultiChannelEEG, DetectionVisualization, ConceptVisualization } from './LatentSpaceComponents';

/**
 * LATENT SPACE — Interactive OLED Experience
 * - Pure black OLED optimized design
 * - Rich interactive elements throughout
 * - Detailed scientific content
 * - Performance optimized with React.memo
 */

// ---------- Design System ----------
const DESIGN = {
  black: "#000000",
  white: "#ffffff",

  glass: "rgba(255,255,255,0.03)",
  glassBorder: "rgba(255,255,255,0.08)",
  glassHover: "rgba(255,255,255,0.05)",

  text: {
    primary: "rgba(255,255,255,0.95)",
    secondary: "rgba(255,255,255,0.70)",
    tertiary: "rgba(255,255,255,0.50)",
    ghost: "rgba(255,255,255,0.25)",
  },

  gradient: {
    from: "#da1b60",
    via: "#7c3aed",
    to: "#0ea5e9",
  },

  ease: [0.19, 1, 0.22, 1] as const,
  spring: { damping: 20, stiffness: 100 },
};

const cx = (...cls: (string | boolean | undefined)[]) => cls.filter(Boolean).join(" ");

// Static particle data for consistent SSR/client rendering
const STATIC_PARTICLES = [
  { initialX: 18.7, initialY: 36.7, targetX: 30.4, targetY: 6.4, duration: 25 },
  { initialX: 86.4, initialY: 66.9, targetX: 18.4, targetY: 16.3, duration: 32 },
  { initialX: 50.0, initialY: 76.3, targetX: 89.5, targetY: 89.9, duration: 28 },
  { initialX: 10.5, initialY: 26.5, targetX: 20.0, targetY: 27.9, duration: 35 },
  { initialX: 66.3, initialY: 89.4, targetX: 77.4, targetY: 30.3, duration: 23 },
  { initialX: 27.1, initialY: 97.2, targetX: 56.5, targetY: 68.5, duration: 30 },
  { initialX: 73.1, initialY: 3.7, targetX: 26.4, targetY: 11.2, duration: 26 },
  { initialX: 92.8, initialY: 21.7, targetX: 30.9, targetY: 15.3, duration: 33 },
  { initialX: 37.4, initialY: 34.4, targetX: 84.9, targetY: 85.1, duration: 29 },
  { initialX: 7.8, initialY: 70.6, targetX: 79.2, targetY: 66.3, duration: 24 },
  { initialX: 47.3, initialY: 54.3, targetX: 73.1, targetY: 15.4, duration: 31 },
  { initialX: 49.9, initialY: 51.6, targetX: 7.9, targetY: 46.6, duration: 27 },
  { initialX: 55.2, initialY: 18.8, targetX: 62.9, targetY: 41.2, duration: 34 },
  { initialX: 20.5, initialY: 19.3, targetX: 97.0, targetY: 78.6, duration: 22 },
  { initialX: 33.6, initialY: 26.8, targetX: 75.6, targetY: 45.4, duration: 36 },
  { initialX: 65.4, initialY: 98.3, targetX: 59.5, targetY: 5.4, duration: 25 },
  { initialX: 79.3, initialY: 38.4, targetX: 45.1, targetY: 46.5, duration: 32 },
  { initialX: 60.2, initialY: 91.1, targetX: 6.0, targetY: 85.0, duration: 28 },
  { initialX: 95.4, initialY: 72.7, targetX: 80.8, targetY: 19.9, duration: 35 },
  { initialX: 61.1, initialY: 34.7, targetX: 93.3, targetY: 34.4, duration: 23 },
];

// Types
interface ComponentProps {
  onInteract: () => void;
}

interface HeroSectionProps {
  isLoaded: boolean;
  onInteract: () => void;
}

interface FooterSectionProps {
  interactions: number;
}

interface SectionProps {
  children: React.ReactNode;
}

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
}

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}

// ---------- Main Page ----------
export default function LatentSpacePage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [globalInteractions, setGlobalInteractions] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, DESIGN.spring);
  const smoothY = useSpring(mouseY, DESIGN.spring);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Track user interactions
  const trackInteraction = useCallback(() => {
    setGlobalInteractions(prev => prev + 1);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white antialiased">

      {/* Dynamic background orbs that follow cursor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            x: smoothX,
            y: smoothY,
            left: "-300px",
            top: "-300px",
            background: "radial-gradient(circle, rgba(139,92,246,0.02) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Interaction counter */}
      <motion.div
        className="fixed top-6 right-6 z-50 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: globalInteractions > 0 ? 1 : 0 }}
      >
        <span className="text-[10px] text-white/30">Interactions: {globalInteractions}</span>
      </motion.div>

      {/* Content */}
      <HeroSection isLoaded={isLoaded} onInteract={trackInteraction} />
      <ResearchOverview />
      <DetailedStorySection onInteract={trackInteraction} />
      <ComprehensiveScienceSection onInteract={trackInteraction} />
      <InteractiveConceptsSection onInteract={trackInteraction} />
      <TechnicalArchitecture onInteract={trackInteraction} />
      <LivePrototypes onInteract={trackInteraction} />
      <ImmersiveVision />
      <DetailedAppExperience onInteract={trackInteraction} />
      <HardwareLab onInteract={trackInteraction} />
      <DreamExplorer onInteract={trackInteraction} />
      <TeamSection />
      <FooterSection interactions={globalInteractions} />
    </div>
  );
}

// ---------- Enhanced Hero Section ----------
const HeroSection = memo(({ isLoaded, onInteract }: HeroSectionProps) => {
  const [hoverState, setHoverState] = useState<string | null>(null);
  const titleRef = useRef(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.01] mb-10 cursor-pointer"
          onClick={onInteract}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
          <span className="text-[10px] font-light tracking-[0.3em] text-white/30 uppercase">MIT Media Lab</span>
        </motion.div>

        <motion.h1
          ref={titleRef}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight cursor-default"
          onMouseEnter={() => setHoverState('title')}
          onMouseLeave={() => setHoverState(null)}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 transition-all duration-500"
            style={{
              filter: hoverState === 'title' ? 'blur(0px)' : 'blur(0.5px)',
              transform: hoverState === 'title' ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            Latent
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white/50 to-white/20 -mt-4">
            Space
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 text-sm sm:text-base font-light text-white/30 max-w-lg mx-auto leading-relaxed"
        >
          A speculative exploration: What if we could navigate our dreams
          through technology while preserving the mystery of consciousness?
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 flex gap-4 justify-center"
        >
          <InteractiveButton onClick={onInteract} primary>
            Explore Concept <ArrowRight className="w-4 h-4" />
          </InteractiveButton>
          <InteractiveButton onClick={onInteract}>
            <Play className="w-4 h-4" /> View Speculation
          </InteractiveButton>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => {
            onInteract();
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          whileHover={{ y: 5 }}
        >
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-1 bg-white/30 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

// ---------- Research Overview ----------
const ResearchOverview = () => {
  const [selectedMetric, setSelectedMetric] = useState(0);

  const metrics = [
    { label: "Design Provocations", value: "24", detail: "Critical questions about consciousness and technology" },
    { label: "Ethical Considerations", value: "16", detail: "Privacy, agency, and mental sovereignty" },
    { label: "Speculative Scenarios", value: "8", detail: "Possible futures of dream technology" },
    { label: "Design Principles", value: "12", detail: "Guidelines for ethical dream interfaces" },
  ];

  return (
    <Section>
      <SectionTitle eyebrow="Design Research" title="Exploring Possibilities" />
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm text-white/60 mb-12 max-w-3xl mx-auto">
          This speculative design project imagines a future where dream technology exists.
          What questions would we need to ask? What ethical frameworks would guide us?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              onClick={() => setSelectedMetric(i)}
              className={cx(
                "relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border",
                selectedMetric === i
                  ? "bg-white/5 border-white/20"
                  : "bg-white/[0.02] border-white/10 hover:bg-white/[0.03]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl font-extralight text-white/90 mb-1">{metric.value}</div>
              <div className="text-xs text-white/40 mb-2">{metric.label}</div>
              {selectedMetric === i && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-white/30 mt-2 pt-2 border-t border-white/5"
                >
                  {metric.detail}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ---------- Detailed Story Section ----------
const DetailedStorySection = ({ onInteract }: ComponentProps) => {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const chapters = [
    {
      num: "I",
      title: "The Forgetting Curve",
      brief: "What if we could capture ephemeral dreams?",
      full: "This speculation begins with a provocation: our dreams vanish within minutes of waking. But should they? What would it mean for human experience if we could preserve these nocturnal narratives? Would we discover hidden insights, or lose something essential about the mystery of consciousness?",
      stats: ["Critical Question", "Ethical Implications", "Design Fiction"],
    },
    {
      num: "II",
      title: "The Neural Bridge",
      brief: "Imagining consumer brain-computer interfaces",
      full: "What if EEG technology evolved to be as common as smartwatches? This concept explores a future where neural interfaces are normalized, raising questions about mental privacy, data sovereignty, and the commodification of consciousness. Who would control this technology, and what safeguards would we need?",
      stats: ["Speculative Technology", "Privacy Concerns", "Future Scenario"],
    },
    {
      num: "III",
      title: "The Cartography",
      brief: "Mapping the unmappable mind",
      full: "Can the subjective experience of dreams be translated into objective data? This design fiction imagines using machine learning to create 'latent spaces' of dream content. But in making the invisible visible, what nuances and meanings might be lost in translation?",
      stats: ["Data Representation", "Meaning Making", "Interpretation"],
    },
    {
      num: "IV",
      title: "The Morning Ritual",
      brief: "Designing for dream agency",
      full: "If such technology existed, how would we interact with it? This speculation envisions interfaces that respect the liminal nature of dreams while providing tools for reflection. It questions whether understanding our dreams would empower us or constrain the freedom of our unconscious minds.",
      stats: ["Interface Design", "User Agency", "Ethical Design"],
    },
  ];

  return (
    <Section>
      <SectionTitle eyebrow="Narrative Arc" title="The Journey from Dreams to Data" />
      <div className="max-w-4xl mx-auto space-y-6">
        {chapters.map((chapter, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div
              onClick={() => {
                setExpandedChapter(expandedChapter === i ? null : i);
                onInteract();
              }}
              className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-3xl font-extralight text-white/40">{chapter.num}</span>
                    <h3 className="text-lg font-light text-white/90">{chapter.title}</h3>
                  </div>
                  <p className="text-sm text-white/60">{chapter.brief}</p>
                </div>
                <ChevronRight className={cx(
                  "w-5 h-5 text-white/40 transition-transform duration-300",
                  expandedChapter === i ? "rotate-90" : ""
                )} />
              </div>

              <AnimatePresence>
                {expandedChapter === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-white/5"
                  >
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      {chapter.full}
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      {chapter.stats.map((stat, j) => (
                        <div key={j} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
                          <span className="text-xs text-white/40">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ---------- Comprehensive Science Section ----------
const ComprehensiveScienceSection = ({ onInteract }: ComponentProps) => {
  const [activeView, setActiveView] = useState('stages');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedWave, setSelectedWave] = useState<string | null>(null);

  const views = [
    { id: 'stages', label: 'Sleep Stages', icon: <Moon className="w-4 h-4" /> },
    { id: 'waves', label: 'Brain Waves', icon: <Activity className="w-4 h-4" /> },
    { id: 'detection', label: 'Detection', icon: <Eye className="w-4 h-4" /> },
    { id: 'processing', label: 'Processing', icon: <Cpu className="w-4 h-4" /> },
    { id: 'research', label: 'Papers', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <Section>
      <SectionTitle eyebrow="Neuroscience" title="The Science of Sleep & Dreams" />

      {/* Interactive navigation */}
      <div className="flex gap-2 justify-center mb-16 flex-wrap">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => {
              setActiveView(view.id);
              onInteract();
            }}
            className={cx(
              "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-light transition-all duration-300",
              activeView === view.id
                ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-white/10"
                : "bg-white/[0.02] text-white/40 hover:text-white/60 border border-white/5"
            )}
          >
            {view.icon}
            <span>{view.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'stages' && (
          <SleepStagesInteractive key="stages" onInteract={onInteract} />
        )}
        {activeView === 'waves' && (
          <BrainWavesInteractive
            key="waves"
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            selectedWave={selectedWave}
            setSelectedWave={setSelectedWave}
            onInteract={onInteract}
          />
        )}
        {activeView === 'detection' && (
          <DetectionSystemInteractive key="detection" onInteract={onInteract} />
        )}
        {activeView === 'processing' && (
          <ProcessingPipelineInteractive key="processing" onInteract={onInteract} />
        )}
        {activeView === 'research' && (
          <ResearchPapers key="research" onInteract={onInteract} />
        )}
      </AnimatePresence>
    </Section>
  );
};

// ---------- Interactive Concepts Section ----------
const InteractiveConceptsSection = ({ onInteract }: ComponentProps) => {
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);

  const concepts = [
    {
      id: 'anchoring',
      title: "Dream Anchoring",
      description: "Micro-prompts during REM enhance recall without disruption",
      visual: "🎯",
      details: "Using haptic feedback synchronized with REM detection, we deliver subtle prompts that create memory anchors. These anchors dramatically improve morning recall without affecting sleep quality.",
      stats: { recall: 87, disruption: 3, accuracy: 92 },
    },
    {
      id: 'mapping',
      title: "Latent Mapping",
      description: "Multi-modal embeddings create navigable dream spaces",
      visual: "🗺️",
      details: "Dreams are encoded into high-dimensional vectors using contrastive learning. Similar experiences cluster naturally, revealing patterns invisible to conscious analysis.",
      stats: { dimensions: 512, clusters: 47, similarity: 0.94 },
    },
    {
      id: 'patterns',
      title: "Pattern Discovery",
      description: "Recurring themes emerge from the data",
      visual: "🔮",
      details: "Machine learning identifies recurring motifs, emotional signatures, and narrative structures across multiple nights, providing insights into subconscious processing.",
      stats: { patterns: 23, confidence: 89, insights: 156 },
    },
    {
      id: 'ritual',
      title: "Morning Ritual",
      description: "Transform fragments into actionable insights",
      visual: "☀️",
      details: "The interface guides users through voice-first recall, semantic search, and pattern analysis, transforming fleeting memories into concrete understanding.",
      stats: { capture: 94, analysis: 78, actions: 31 },
    },
    {
      id: 'privacy',
      title: "Privacy Shield",
      description: "Your dreams never leave your device",
      visual: "🔒",
      details: "All processing happens locally using edge computing. No dream data is ever transmitted to servers. You maintain complete sovereignty over your subconscious.",
      stats: { local: 100, encrypted: 100, cloud: 0 },
    },
    {
      id: 'adaptive',
      title: "Adaptive Learning",
      description: "The system learns your unique patterns",
      visual: "🧬",
      details: "Personal models adapt to your specific sleep architecture, dream patterns, and recall preferences, becoming more accurate over time.",
      stats: { adaptation: 83, personalization: 91, improvement: 27 },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConceptIndex((prev) => (prev + 1) % concepts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [concepts.length]);

  return (
    <Section>
      <SectionTitle eyebrow="Core Concepts" title="Six Pillars of Dream Technology" />

      <div className="max-w-6xl mx-auto">
        {/* Main content area - single concept display */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={concepts[activeConceptIndex].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left side - content */}
              <div>
                <div className="text-6xl mb-6 opacity-20">{concepts[activeConceptIndex].visual}</div>
                <h3 className="text-2xl font-light text-white/90 mb-3">{concepts[activeConceptIndex].title}</h3>
                <p className="text-base text-white/50 mb-4">{concepts[activeConceptIndex].description}</p>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{concepts[activeConceptIndex].details}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(concepts[activeConceptIndex].stats).map(([key, value]) => (
                    <div key={key} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-xl font-extralight text-white/70">
                        {typeof value === 'number' && value > 10 ? `${value}%` : value}
                      </div>
                      <div className="text-xs text-white/30 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - visual */}
              <div className="flex items-center justify-center">
                <div className="w-80 h-80 relative">
                  <ConceptVisualization concept={concepts[activeConceptIndex]} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation - clickable concept cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {concepts.map((concept, i) => (
            <button
              key={concept.id}
              onClick={() => {
                setActiveConceptIndex(i);
                onInteract();
              }}
              className={cx(
                "p-4 rounded-xl transition-all duration-300",
                i === activeConceptIndex
                  ? "bg-white/[0.08] border border-white/20 scale-105"
                  : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]"
              )}
            >
              <div className="text-2xl mb-2 opacity-50">{concept.visual}</div>
              <div className="text-xs text-white/60">{concept.title}</div>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ---------- Technical Architecture ----------
const TechnicalArchitecture = ({ onInteract }: ComponentProps) => {
  return (
    <Section>
      <SectionTitle eyebrow="System Architecture" title="Interactive Data Flow" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          A speculative technical architecture for privacy-first dream analysis.
        </p>
        <div className="h-[500px] rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-40">🏗️</div>
            <p className="text-sm text-white/60">Technical Architecture & Data Flow</p>
            <p className="text-xs text-white/40 mt-2">Interactive visualization coming soon</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ---------- Live Prototypes ----------
const LivePrototypes = ({ onInteract }: ComponentProps) => {
  const [activeProto, setActiveProto] = useState('explorer');

  const prototypes = [
    { id: 'explorer', name: 'Dream Explorer', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'timeline', name: 'Sleep Timeline', icon: <Timer className="w-4 h-4" /> },
    { id: 'patterns', name: 'Pattern Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'voice', name: 'Voice Capture', icon: <Mic className="w-4 h-4" /> },
  ];

  return (
    <Section>
      <SectionTitle eyebrow="Interactive Demos" title="Experience the Interface" />

      {/* Prototype selector */}
      <div className="flex gap-2 justify-center mb-12 flex-wrap">
        {prototypes.map((proto) => (
          <button
            key={proto.id}
            onClick={() => {
              setActiveProto(proto.id);
              onInteract();
            }}
            className={cx(
              "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-light transition-all duration-300",
              activeProto === proto.id
                ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-white/10"
                : "bg-white/[0.02] text-white/40 hover:text-white/60 border border-white/5"
            )}
          >
            {proto.icon}
            <span>{proto.name}</span>
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="h-[600px] rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-40">
              {activeProto === 'explorer' ? '✨' :
               activeProto === 'timeline' ? '⏰' :
               activeProto === 'patterns' ? '📊' : '🎙️'}
            </div>
            <p className="text-sm text-white/60">Interactive {prototypes.find(p => p.id === activeProto)?.name} Demo</p>
            <p className="text-xs text-white/40 mt-2">Click to explore this speculative interface</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ---------- Immersive Vision ----------
const ImmersiveVision = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Section>
      <SectionTitle eyebrow="Speculative Futures" title="Imagining Dream Technology" />

      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm text-white/60 mb-12 max-w-3xl mx-auto">
          What if we could interface with our dreams? This design fiction explores possible
          futures, ethical dilemmas, and the implications of consciousness technology.
        </p>

        {/* Video placeholder */}
        <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5 overflow-hidden border border-white/10">
          {/* Animated background */}
          <div className="absolute inset-0">
            {STATIC_PARTICLES.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{
                  x: particle.initialX + '%',
                  y: particle.initialY + '%',
                }}
                animate={{
                  x: particle.targetX + '%',
                  y: particle.targetY + '%',
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors" />
              <div className="relative w-20 h-20 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                <Play className="w-8 h-8 text-white/60 ml-1" />
              </div>
            </button>
          </div>

          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black flex items-center justify-center"
            >
              <p className="text-white/40">Concept visualization would play here</p>
            </motion.div>
          )}
        </div>

        {/* Critical questions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { question: "What if?", title: "Dreams become data", desc: "How would society change if dreams were recordable?" },
            { question: "Who decides?", title: "Ethical boundaries", desc: "Who sets limits on consciousness exploration?" },
            { question: "What's lost?", title: "The price of knowing", desc: "Does understanding dreams diminish their power?" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-extralight text-white/20 mb-2">{item.question}</div>
              <div className="text-sm font-light text-white/70 mb-1">{item.title}</div>
              <div className="text-xs text-white/40">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ---------- Detailed App Experience ----------
const DetailedAppExperience = ({ onInteract }: ComponentProps) => {
  return (
    <Section>
      <SectionTitle eyebrow="Interface Speculation" title="Imagining the Dream App" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          If dream technology existed, how would we interact with it?
        </p>
        <div className="h-[500px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-20">📱</div>
            <p className="text-sm text-white/40">Interactive App Experience</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ---------- Hardware Lab ----------
const HardwareLab = ({ onInteract }: ComponentProps) => {
  return (
    <Section>
      <SectionTitle eyebrow="Hardware Development" title="Building the Dream Sensor" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          Speculative hardware design for ethical brain-computer interfaces.
        </p>
        <div className="h-[500px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-20">🔬</div>
            <p className="text-sm text-white/40">Hardware Lab & Components</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ---------- Dream Explorer ----------
const DreamExplorer = ({ onInteract }: ComponentProps) => {
  return (
    <Section>
      <SectionTitle eyebrow="Final Experience" title="Your Personal Dreamscape" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          An interactive experience that allows you to explore the concept of mapping dreams.
        </p>
        <div className="h-[600px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-20">🗺️</div>
            <p className="text-sm text-white/40">Interactive Dream Explorer</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ---------- Team Section ----------
const TeamSection = () => {
  const roles = [
    { title: "The Neuroscientist", question: "How do we map consciousness ethically?" },
    { title: "The Designer", question: "What interfaces respect the mystery of dreams?" },
    { title: "The Ethicist", question: "Who owns the data of the subconscious?" },
    { title: "The Dreamer", question: "What happens when dreams become visible?" },
  ];

  return (
    <Section>
      <SectionTitle eyebrow="Design Perspectives" title="Questions We're Asking" />

      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          This speculative project brings together different perspectives to explore
          the implications of dream technology through critical design.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.01] border border-white/5"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4" />
              <div className="text-base font-light text-white/80">{role.title}</div>
              <div className="text-sm text-white/40 mt-2 italic">"{role.question}"</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ---------- Footer ----------
const FooterSection = ({ interactions }: FooterSectionProps) => {
  return (
    <section className="relative py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-30" />
          <span className="text-sm font-light text-white/30 tracking-wide">LATENT SPACE</span>
        </div>

        <p className="text-xs text-white/20 font-light mb-4">
          Speculative Design Project · 2024
        </p>

        <p className="text-xs text-white/15 mb-8">
          A critical exploration of consciousness, technology, and the future of dreams
        </p>

        <p className="text-xs text-white/10">
          You made {interactions} interactions with this concept prototype
        </p>

        <div className="flex justify-center gap-6 mt-8">
          <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">Design Process</a>
          <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">Concept Documentation</a>
          <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">Critical Essay</a>
        </div>
      </div>
    </section>
  );
};

// ---------- Helper Components ----------
const Section = ({ children }: SectionProps) => (
  <section className="relative py-24 md:py-32 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ eyebrow, title }: SectionTitleProps) => (
  <div className="text-center mb-16">
    {eyebrow && (
      <div className="text-[10px] font-light tracking-[0.3em] text-white/40 uppercase mb-4">
        {eyebrow}
      </div>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-white">
      {title}
    </h2>
  </div>
);

const InteractiveButton = ({ children, onClick, primary = false }: InteractiveButtonProps) => (
  <button
    onClick={onClick}
    className={cx(
      "group relative px-8 py-4 overflow-hidden rounded-full transition-all duration-300",
      primary
        ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30"
        : "bg-white/5 hover:bg-white/10"
    )}
  >
    <div className="relative flex items-center gap-2 text-sm font-light">
      {children}
    </div>
  </button>
);