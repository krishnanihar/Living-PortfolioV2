'use client';

import React, { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { Play, Download, Sparkles, CircuitBoard, Network, Shield, ArrowRight, Moon, Zap, Brain, Cpu, Activity, Waves, ChevronRight, Volume2, Mic, Camera, FileText, Lock, Cloud, Layers, BarChart3, Eye, Heart, Timer } from "lucide-react";

/**
 * LATENT SPACE — Interactive OLED Experience
 * Adapted for portfolio design system
 */

// Design System Integration
const DESIGN = {
  black: "#0A0A0A",
  white: "#ffffff",

  glass: "rgba(255,255,255,0.02)",
  glassBorder: "rgba(255,255,255,0.08)",
  glassHover: "rgba(255,255,255,0.04)",

  text: {
    primary: "rgba(255,255,255,0.95)",
    secondary: "rgba(255,255,255,0.80)",
    tertiary: "rgba(255,255,255,0.60)",
    muted: "rgba(255,255,255,0.40)",
    ghost: "rgba(255,255,255,0.24)",
  },

  gradient: {
    from: "#da1b60",
    via: "#7c3aed",
    to: "#0ea5e9",
  },

  ease: [0.19, 1, 0.22, 1],
  spring: { damping: 20, stiffness: 100 },
};

const cx = (...cls: (string | boolean | undefined)[]) => cls.filter(Boolean).join(" ");

// Main Component
export function LatentSpaceWork() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [globalInteractions, setGlobalInteractions] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visibleElements, setVisibleElements] = useState(new Set<string>());

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, DESIGN.spring);
  const smoothY = useSpring(mouseY, DESIGN.spring);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    observerRef.current = observer;

    // Observe all reveal elements after mount
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.id) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Track user interactions
  const trackInteraction = useCallback(() => {
    setGlobalInteractions(prev => prev + 1);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white antialiased overflow-hidden">

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

      {/* Content Sections */}
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

// Enhanced Hero Section
interface HeroSectionProps {
  isLoaded: boolean;
  onInteract: () => void;
}

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

// Research Overview
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
        <p className="text-center text-sm text-white/40 mb-12 max-w-3xl mx-auto">
          This speculative design project imagines a future where dream technology exists.
          What questions would we need to ask? What ethical frameworks would guide us?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              onClick={() => setSelectedMetric(i)}
              className={cx(
                "relative p-6 rounded-2xl cursor-pointer transition-all duration-300",
                selectedMetric === i
                  ? "bg-white/[0.04] border border-white/10"
                  : "bg-white/[0.01] border border-white/5 hover:bg-white/[0.02]"
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

// Helper Components
interface SectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => (
  <section className="relative py-32 px-6">
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
}

const SectionTitle = ({ eyebrow, title }: SectionTitleProps) => (
  <div className="text-center mb-16">
    {eyebrow && (
      <div className="text-[10px] font-light tracking-[0.3em] text-white/20 uppercase mb-4">
        {eyebrow}
      </div>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-white/90">
      {title}
    </h2>
  </div>
);

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}

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

// Full Interactive Components
interface ComponentProps {
  onInteract: () => void;
}

// Detailed Story Section
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
              className="relative p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-3xl font-extralight text-white/20">{chapter.num}</span>
                    <h3 className="text-lg font-light text-white/80">{chapter.title}</h3>
                  </div>
                  <p className="text-sm text-white/40">{chapter.brief}</p>
                </div>
                <ChevronRight className={cx(
                  "w-5 h-5 text-white/20 transition-transform duration-300",
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

// Comprehensive Science Section
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

// Interactive Sleep Stages
const SleepStagesInteractive = ({ onInteract }: ComponentProps) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [timeInStage, setTimeInStage] = useState({ wake: 5, n1: 5, n2: 45, n3: 25, rem: 20 });

  const stages = [
    {
      id: 'wake',
      name: "Wake",
      eeg: "Beta (13-30 Hz) dominant",
      characteristics: ["Full consciousness", "Muscle tone present", "Eye movements"],
      color: "from-blue-500/20",
    },
    {
      id: 'n1',
      name: "Stage N1",
      eeg: "Theta (4-8 Hz) emerging",
      characteristics: ["Hypnagogic hallucinations", "Muscle jerks", "Easy arousal"],
      color: "from-purple-500/20",
    },
    {
      id: 'n2',
      name: "Stage N2",
      eeg: "Sleep spindles & K-complexes",
      characteristics: ["Memory consolidation", "Temperature drops", "Reduced heart rate"],
      color: "from-indigo-500/20",
    },
    {
      id: 'n3',
      name: "Stage N3",
      eeg: "Delta (0.5-4 Hz) waves",
      characteristics: ["Growth hormone release", "Immune function", "Deep restoration"],
      color: "from-pink-500/20",
    },
    {
      id: 'rem',
      name: "REM Sleep",
      eeg: "Mixed frequency, theta dominant",
      characteristics: ["Vivid dreams", "Rapid eye movements", "Muscle atonia"],
      color: "from-orange-500/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Stage distribution slider */}
      <div className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
        <h3 className="text-sm font-light text-white/60 mb-4">Adjust Sleep Stage Distribution</h3>
        <div className="space-y-4">
          {Object.entries(timeInStage).map(([stage, value]) => (
            <div key={stage} className="flex items-center gap-4">
              <span className="text-xs text-white/40 w-16 uppercase">{stage}</span>
              <input
                type="range"
                min="0"
                max="50"
                value={value}
                onChange={(e) => {
                  setTimeInStage(prev => ({ ...prev, [stage]: parseInt(e.target.value) }));
                  onInteract();
                }}
                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) ${value * 2}%, rgba(255,255,255,0.1) ${value * 2}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <span className="text-xs text-white/60 w-12 text-right">{value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive stages grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <motion.div
            key={stage.id}
            onMouseEnter={() => setHoveredStage(stage.id)}
            onMouseLeave={() => setHoveredStage(null)}
            onClick={onInteract}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group cursor-pointer"
          >
            <div className={cx(
              "absolute inset-0 rounded-2xl opacity-50 transition-opacity duration-300",
              `bg-gradient-to-b ${stage.color} to-transparent`,
              hoveredStage === stage.id ? "opacity-100" : ""
            )} />

            <div className="relative p-6 h-full">
              <div className="text-2xl font-extralight text-white/80 mb-2">{stage.name}</div>
              <div className="text-3xl font-thin text-white/40 mb-3">
                {timeInStage[stage.id as keyof typeof timeInStage]}%
              </div>
              <p className="text-xs text-white/30 mb-4">{stage.eeg}</p>

              {hoveredStage === stage.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  {stage.characteristics.map((char, i) => (
                    <div key={i} className="text-xs text-white/50">• {char}</div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hypnogram visualization */}
      <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
        <h3 className="text-sm font-light text-white/60 mb-6">Typical Night Hypnogram</h3>
        <Hypnogram distribution={timeInStage} />
      </div>
    </motion.div>
  );
};

// Interactive Brain Waves
const BrainWavesInteractive = ({ isRecording, setIsRecording, selectedWave, setSelectedWave, onInteract }: {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  selectedWave: string | null;
  setSelectedWave: (value: string | null) => void;
  onInteract: () => void;
}) => {
  const waves = [
    { id: 'delta', name: "Delta", freq: "0.5-4 Hz", power: 80, color: "#ef4444", purpose: "Deep sleep, healing" },
    { id: 'theta', name: "Theta", freq: "4-8 Hz", power: 60, color: "#f59e0b", purpose: "REM sleep, creativity" },
    { id: 'alpha', name: "Alpha", freq: "8-13 Hz", power: 40, color: "#10b981", purpose: "Relaxed wakefulness" },
    { id: 'beta', name: "Beta", freq: "13-30 Hz", power: 30, color: "#3b82f6", purpose: "Active thinking" },
    { id: 'gamma', name: "Gamma", freq: "30-100 Hz", power: 20, color: "#8b5cf6", purpose: "Consciousness binding" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wave selector and details */}
        <div className="space-y-4">
          {waves.map((wave) => (
            <motion.div
              key={wave.id}
              onClick={() => {
                setSelectedWave(wave.id);
                onInteract();
              }}
              whileHover={{ x: 5 }}
              className={cx(
                "relative p-6 rounded-2xl cursor-pointer transition-all duration-300",
                selectedWave === wave.id
                  ? "bg-white/[0.04] border border-white/10"
                  : "bg-white/[0.01] border border-white/5 hover:bg-white/[0.02]"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-base font-light text-white/80">{wave.name} Wave</span>
                  <span className="text-xs text-white/40 ml-3">{wave.freq}</span>
                </div>
                <div className="text-xs text-white/30">{wave.purpose}</div>
              </div>

              {/* Power bar */}
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isRecording ? `${wave.power}%` : 0 }}
                  transition={{ duration: 1, delay: waves.indexOf(wave) * 0.1 }}
                  className="h-full rounded-full transition-all duration-500"
                  style={{ backgroundColor: wave.color }}
                />
              </div>

              {selectedWave === wave.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-white/5"
                >
                  <WaveformPattern frequency={wave.freq} color={wave.color} isActive={isRecording} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Live EEG visualization */}
        <div className="sticky top-6">
          <div className="relative rounded-2xl bg-white/[0.02] border border-white/5 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-light text-white/60">Live EEG Signal</h3>
              <button
                onClick={() => {
                  setIsRecording(!isRecording);
                  onInteract();
                }}
                className={cx(
                  "px-4 py-2 rounded-full text-xs font-light transition-all duration-300",
                  isRecording
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                )}
              >
                {isRecording ? '■ Stop Recording' : '● Start Recording'}
              </button>
            </div>

            <MultiChannelEEG isActive={isRecording} selectedWave={selectedWave} />

            {/* Stats */}
            {isRecording && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-xs text-white/40">Amplitude</div>
                  <div className="text-sm text-white/60">±50 µV</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/40">Sampling</div>
                  <div className="text-sm text-white/60">256 Hz</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/40">Quality</div>
                  <div className="text-sm text-white/60">98%</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Detection System Interactive
const DetectionSystemInteractive = ({ onInteract }: ComponentProps) => {
  const [activeDetector, setActiveDetector] = useState<string | null>(null);
  const [detectionRunning, setDetectionRunning] = useState(false);

  const detectors = [
    {
      id: 'spindles',
      name: "Sleep Spindles",
      icon: <Waves className="w-6 h-6" />,
      accuracy: 94,
      description: "12-14 Hz bursts lasting 0.5-2 seconds",
      detections: 127,
    },
    {
      id: 'kcomplexes',
      name: "K-Complexes",
      icon: <Activity className="w-6 h-6" />,
      accuracy: 89,
      description: "Large biphasic waves in N2 sleep",
      detections: 43,
    },
    {
      id: 'slowwaves',
      name: "Slow Waves",
      icon: <Brain className="w-6 h-6" />,
      accuracy: 92,
      description: "Delta waves characteristic of N3",
      detections: 89,
    },
    {
      id: 'rem',
      name: "REM Detection",
      icon: <Eye className="w-6 h-6" />,
      accuracy: 87,
      description: "Rapid eye movements with theta",
      detections: 31,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detectors.map((detector) => (
          <motion.div
            key={detector.id}
            onClick={() => {
              setActiveDetector(detector.id);
              onInteract();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cx(
              "relative p-8 rounded-2xl cursor-pointer transition-all duration-300",
              activeDetector === detector.id
                ? "bg-white/[0.04] border border-white/10"
                : "bg-white/[0.01] border border-white/5 hover:bg-white/[0.02]"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/5 text-white/40">
                {detector.icon}
              </div>
              <div className="text-right">
                <div className="text-2xl font-extralight text-white/80">{detector.accuracy}%</div>
                <div className="text-xs text-white/30">accuracy</div>
              </div>
            </div>

            <h3 className="text-base font-light text-white/70 mb-2">{detector.name}</h3>
            <p className="text-xs text-white/40 mb-4">{detector.description}</p>

            {activeDetector === detector.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">Detections tonight:</span>
                  <span className="text-sm text-white/70">{detector.detections}</span>
                </div>
                <div className="mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetectionRunning(!detectionRunning);
                      onInteract();
                    }}
                    className="w-full px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-light"
                  >
                    {detectionRunning ? 'Stop Detection' : 'Run Detection'}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {detectionRunning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <DetectionVisualization />
        </motion.div>
      )}
    </motion.div>
  );
};

// Processing Pipeline Interactive
const ProcessingPipelineInteractive = ({ onInteract }: ComponentProps) => {
  const [activePipe, setActivePipe] = useState(0);

  const pipeline = [
    { name: "Signal Acquisition", desc: "4-channel EEG at 256 Hz", icon: <Activity className="w-5 h-5" /> },
    { name: "Preprocessing", desc: "Bandpass filter 0.5-45 Hz", icon: <Waves className="w-5 h-5" /> },
    { name: "Artifact Rejection", desc: "ICA-based cleaning", icon: <Shield className="w-5 h-5" /> },
    { name: "Feature Extraction", desc: "Wavelet decomposition", icon: <Layers className="w-5 h-5" /> },
    { name: "Classification", desc: "CNN-based staging", icon: <Brain className="w-5 h-5" /> },
    { name: "Event Detection", desc: "Template matching", icon: <Eye className="w-5 h-5" /> },
    { name: "Embedding", desc: "Latent space mapping", icon: <Network className="w-5 h-5" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="relative">
        {/* Pipeline flow */}
        {pipeline.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative mb-4"
          >
            {/* Connection line */}
            {i < pipeline.length - 1 && (
              <div className="absolute left-10 top-20 w-0.5 h-12 bg-gradient-to-b from-white/10 to-transparent" />
            )}

            <div
              onClick={() => {
                setActivePipe(i);
                onInteract();
              }}
              className={cx(
                "flex items-center gap-6 p-6 rounded-2xl cursor-pointer transition-all duration-300",
                activePipe === i
                  ? "bg-white/[0.03] border border-white/10 translate-x-2"
                  : "bg-white/[0.01] border border-white/5 hover:translate-x-1"
              )}
            >
              <div className={cx(
                "p-3 rounded-xl transition-colors",
                activePipe === i ? "bg-white/10 text-white/60" : "bg-white/5 text-white/30"
              )}>
                {step.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-light text-white/80 mb-1">{step.name}</h3>
                <p className="text-xs text-white/40">{step.desc}</p>
              </div>

              <div className={cx(
                "w-2 h-2 rounded-full transition-all duration-300",
                activePipe === i ? "bg-green-400 animate-pulse" : "bg-white/20"
              )} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Processing stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-2xl font-extralight text-white/60">2.4ms</div>
          <div className="text-xs text-white/30">Latency</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-2xl font-extralight text-white/60">98.2%</div>
          <div className="text-xs text-white/30">Uptime</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-2xl font-extralight text-white/60">0.01%</div>
          <div className="text-xs text-white/30">Error Rate</div>
        </div>
      </div>
    </motion.div>
  );
};

// Research Papers
const ResearchPapers = ({ onInteract }: ComponentProps) => {
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null);

  const papers = [
    {
      title: "Contrastive Learning for Sleep EEG Embeddings",
      authors: "Zhang, Smith, Johnson",
      year: 2024,
      citations: 127,
      abstract: "We present a novel approach to creating meaningful embeddings from sleep EEG data...",
      tags: ["Machine Learning", "EEG", "Contrastive Learning"],
    },
    {
      title: "Real-time Dream Content Prediction from Neural Signals",
      authors: "Lee, Chen, Williams",
      year: 2024,
      citations: 89,
      abstract: "Using transformer architectures, we demonstrate the feasibility of predicting dream themes...",
      tags: ["Transformers", "Dream Analysis", "Real-time"],
    },
    {
      title: "Privacy-Preserving Neural Interfaces for Sleep",
      authors: "Kumar, Anderson, Thompson",
      year: 2024,
      citations: 203,
      abstract: "We propose a federated learning approach for sleep stage classification that maintains...",
      tags: ["Privacy", "Federated Learning", "Neural Interfaces"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="space-y-4">
        {papers.map((paper, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => {
              setSelectedPaper(selectedPaper === i ? null : i);
              onInteract();
            }}
            className="relative p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-light text-white/80 mb-1">{paper.title}</h3>
                <p className="text-xs text-white/40">{paper.authors} · {paper.year}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-extralight text-white/60">{paper.citations}</div>
                <div className="text-xs text-white/30">citations</div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {paper.tags.map((tag, j) => (
                <span key={j} className="px-2 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xs text-white/40">
                  {tag}
                </span>
              ))}
            </div>

            {selectedPaper === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-white/5"
              >
                <p className="text-sm text-white/50 leading-relaxed mb-4">{paper.abstract}</p>
                <button className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-light">
                  Read Full Paper →
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Interactive Concepts Section
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

// Technical Architecture
const TechnicalArchitecture = ({ onInteract }: ComponentProps) => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [dataFlowing, setDataFlowing] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [flowPath, setFlowPath] = useState(0);

  const layers = [
    {
      id: 'hardware',
      name: "Hardware Layer",
      y: 15,
      color: "#3b82f6",
      components: [
        { id: 'eeg', name: "EEG Sensors", desc: "4-channel dry electrodes" },
        { id: 'imu', name: "IMU", desc: "Motion tracking" },
        { id: 'haptic', name: "Haptic", desc: "Feedback system" },
        { id: 'ble', name: "BLE 5.0", desc: "Wireless protocol" },
      ],
    },
    {
      id: 'edge',
      name: "Edge Computing",
      y: 35,
      color: "#8b5cf6",
      components: [
        { id: 'dsp', name: "DSP", desc: "Signal processing" },
        { id: 'neural', name: "Neural Engine", desc: "ML inference" },
        { id: 'secure', name: "Secure Enclave", desc: "Encryption" },
        { id: 'power', name: "Power Mgmt", desc: "Efficiency" },
      ],
    },
    {
      id: 'ai',
      name: "AI Processing",
      y: 55,
      color: "#ec4899",
      components: [
        { id: 'staging', name: "Sleep Staging", desc: "5-stage classification" },
        { id: 'detection', name: "Event Detection", desc: "Pattern recognition" },
        { id: 'embedding', name: "Embeddings", desc: "Dream vectors" },
        { id: 'mining', name: "Pattern Mining", desc: "Motif discovery" },
      ],
    },
    {
      id: 'interface',
      name: "User Interface",
      y: 75,
      color: "#10b981",
      components: [
        { id: 'app', name: "Mobile App", desc: "Native interface" },
        { id: 'voice', name: "Voice Journal", desc: "Morning capture" },
        { id: 'viz', name: "Visualization", desc: "Dream maps" },
        { id: 'insights', name: "Insights", desc: "Discoveries" },
      ],
    },
  ];

  // Create connections between layers
  const connections = useMemo(() => {
    const conns: any[] = [];
    for (let i = 0; i < layers.length - 1; i++) {
      layers[i].components.forEach((comp1, idx1) => {
        layers[i + 1].components.forEach((comp2, idx2) => {
          // Connect each component to corresponding and adjacent components in next layer
          if (Math.abs(idx1 - idx2) <= 1) {
            conns.push({
              from: { layer: i, idx: idx1, y: layers[i].y },
              to: { layer: i + 1, idx: idx2, y: layers[i + 1].y },
            });
          }
        });
      });
    }
    return conns;
  }, [layers]);

  // Animate data flow
  useEffect(() => {
    if (dataFlowing) {
      const interval = setInterval(() => {
        setFlowPath(prev => (prev + 1) % 100);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [dataFlowing]);

  return (
    <Section>
      <SectionTitle eyebrow="System Architecture" title="Interactive Data Flow" />

      <div className="max-w-7xl mx-auto">
        {/* Control panel */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => {
              setDataFlowing(!dataFlowing);
              onInteract();
            }}
            className={cx(
              "px-8 py-3 rounded-full text-sm font-light transition-all duration-300 flex items-center gap-2",
              dataFlowing
                ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border border-green-500/30"
                : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
            )}
          >
            {dataFlowing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 rounded-full border-2 border-green-400 border-t-transparent"
                />
                Data Flowing
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Start Data Flow
              </>
            )}
          </button>

          <button
            onClick={() => {
              setSelectedLayer(null);
              setHoveredNode(null);
              onInteract();
            }}
            className="px-6 py-3 rounded-full bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 text-sm font-light transition-all"
          >
            Reset View
          </button>
        </div>

        {/* Main architecture visualization */}
        <div className="relative min-h-[700px] rounded-2xl bg-black border border-white/5 overflow-hidden p-8">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Layer components - All 16 components visible */}
          {layers.map((layer, layerIndex) => (
            <div
              key={layer.id}
              className="relative"
              style={{
                position: 'absolute',
                top: `${layer.y}%`,
                left: '0',
                right: '0',
                transform: 'translateY(-50%)',
              }}
            >
              {/* Layer label */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32">
                <div
                  className="text-xs font-light text-white/30 tracking-wide cursor-pointer hover:text-white/50 transition-colors"
                  onClick={() => {
                    setSelectedLayer(selectedLayer === layer.id ? null : layer.id);
                    onInteract();
                  }}
                >
                  {layer.name}
                </div>
              </div>

              {/* Components Grid - All 4 components per layer */}
              <div className="ml-36 mr-8 grid grid-cols-4 gap-4">
                {layer.components.map((comp, compIndex) => (
                  <motion.div
                    key={comp.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: layerIndex * 0.1 + compIndex * 0.05 }}
                    className={cx(
                      "relative p-3 rounded-xl cursor-pointer transition-all duration-300",
                      "bg-black/60 border backdrop-blur-sm group",
                      hoveredNode === `${layer.id}-${comp.id}`
                        ? "border-white/30 bg-white/10 scale-105 z-10"
                        : selectedLayer === layer.id
                        ? "border-white/20 bg-white/5"
                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                    )}
                    onMouseEnter={() => setHoveredNode(`${layer.id}-${comp.id}`)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => onInteract()}
                    style={{
                      boxShadow: hoveredNode === `${layer.id}-${comp.id}`
                        ? `0 0 20px ${layer.color}40`
                        : 'none'
                    }}
                  >
                    {/* Component icon */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 mx-auto"
                      style={{ backgroundColor: `${layer.color}20` }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: layer.color }}
                      />
                    </div>

                    {/* Component name */}
                    <div className="text-xs font-light text-white/70 text-center">
                      {comp.name}
                    </div>

                    {/* Data flow indicator */}
                    {dataFlowing && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                        style={{ backgroundColor: layer.color }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: compIndex * 0.2 }}
                      />
                    )}

                    {/* Hover tooltip */}
                    <div className={cx(
                      "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    )}>
                      <div className="px-3 py-1 rounded bg-black/90 border border-white/10 text-xs text-white/50">
                        {comp.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* Flow status indicator */}
          {dataFlowing && (
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <span className="text-xs text-white/40">Processing dream data...</span>
            </div>
          )}
        </div>

        {/* System metrics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Latency", value: dataFlowing ? "2.4ms" : "--", icon: <Timer className="w-4 h-4" /> },
            { label: "Throughput", value: dataFlowing ? "4.2 KB/s" : "--", icon: <Activity className="w-4 h-4" /> },
            { label: "Efficiency", value: dataFlowing ? "98%" : "--", icon: <Zap className="w-4 h-4" /> },
            { label: "Privacy", value: "100%", icon: <Lock className="w-4 h-4" /> },
          ].map((metric, i) => (
            <motion.div
              key={i}
              className="relative p-6 rounded-xl bg-white/[0.01] border border-white/5 overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {dataFlowing && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
              )}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-extralight text-white/80">{metric.value}</div>
                  <div className="text-white/20">{metric.icon}</div>
                </div>
                <div className="text-xs text-white/30">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

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

interface FooterSectionProps {
  interactions: number;
}

// Live Prototypes
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
        <AnimatePresence mode="wait">
          {activeProto === 'explorer' && <DreamExplorerProto key="explorer" onInteract={onInteract} />}
          {activeProto === 'timeline' && <SleepTimelineProto key="timeline" onInteract={onInteract} />}
          {activeProto === 'patterns' && <PatternAnalysisProto key="patterns" onInteract={onInteract} />}
          {activeProto === 'voice' && <VoiceCaptureProto key="voice" onInteract={onInteract} />}
        </AnimatePresence>
      </div>
    </Section>
  );
};

// Dream Explorer Prototype
const DreamExplorerProto = ({ onInteract }: ComponentProps) => {
  const [fragments, setFragments] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [selectedFragment, setSelectedFragment] = useState<any>(null);

  const themes = [
    'Flying', 'Water', 'Lost', 'Chase', 'Fall', 'Test', 'Late', 'Home', 'Friend', 'Animal',
    'Light', 'Dark', 'Door', 'Path', 'Voice', 'Color', 'Time', 'Space', 'Memory', 'Future'
  ];

  const handleAddFragment = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newFragment = {
      id: Date.now(),
      x,
      y,
      theme: themes[Math.floor(Math.random() * themes.length)],
      intensity: Math.random(),
      size: Math.random() * 30 + 20,
      color: `hsl(${Math.random() * 60 + 260}, 70%, 50%)`,
    };

    setFragments(prev => {
      const updated = [...prev, newFragment];
      // Calculate connections
      const newConnections: any[] = [];
      updated.forEach((f1, i) => {
        updated.slice(i + 1).forEach(f2 => {
          const dist = Math.sqrt(Math.pow(f1.x - f2.x, 2) + Math.pow(f1.y - f2.y, 2));
          if (dist < 25) {
            newConnections.push({ from: f1, to: f2, strength: 1 - dist / 25 });
          }
        });
      });
      setConnections(newConnections);
      return updated;
    });

    onInteract();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        onClick={handleAddFragment}
        className="relative h-[600px] rounded-2xl bg-black border border-white/5 overflow-hidden cursor-crosshair"
      >
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, i) => (
            <motion.line
              key={i}
              x1={`${conn.from.x}%`}
              y1={`${conn.from.y}%`}
              x2={`${conn.to.x}%`}
              y2={`${conn.to.y}%`}
              stroke="white"
              strokeOpacity={conn.strength * 0.2}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </svg>

        {/* Dream fragments */}
        {fragments.map((fragment) => (
          <motion.div
            key={fragment.id}
            className="absolute cursor-pointer"
            style={{ left: `${fragment.x}%`, top: `${fragment.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFragment(fragment);
              onInteract();
            }}
          >
            <div
              className="relative"
              style={{ width: fragment.size, height: fragment.size }}
            >
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{ background: fragment.color, opacity: fragment.intensity * 0.3 }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${fragment.color} 0%, transparent 70%)`,
                  opacity: fragment.intensity * 0.6
                }}
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/30 whitespace-nowrap">
              {fragment.theme}
            </div>
          </motion.div>
        ))}

        {/* Instructions */}
        {fragments.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-white/10 mx-auto mb-4" />
              <p className="text-sm text-white/20 font-light">Click to add dream fragments</p>
              <p className="text-xs text-white/15 mt-2">Nearby fragments will connect automatically</p>
            </div>
          </div>
        )}

        {/* Selected fragment details */}
        {selectedFragment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-light text-white/80 mb-1">{selectedFragment.theme}</div>
                <div className="text-xs text-white/40">
                  Intensity: {Math.round(selectedFragment.intensity * 100)}%
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFragment(null);
                }}
                className="text-white/40 hover:text-white/60"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => {
            setFragments([]);
            setConnections([]);
            onInteract();
          }}
          className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm font-light"
        >
          Clear Map
        </button>
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 transition-colors text-sm font-light">
          Analyze Patterns
        </button>
        <button className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm font-light">
          Save Session
        </button>
      </div>
    </motion.div>
  );
};

// Additional prototype components (simplified for space)
const SleepTimelineProto = ({ onInteract }: ComponentProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="h-[400px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
      <p className="text-white/40">Sleep Timeline Visualization</p>
    </div>
  </motion.div>
);

const PatternAnalysisProto = ({ onInteract }: ComponentProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="h-[400px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
      <p className="text-white/40">Pattern Analysis Interface</p>
    </div>
  </motion.div>
);

const VoiceCaptureProto = ({ onInteract }: ComponentProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="h-[400px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
      <p className="text-white/40">Voice Capture Interface</p>
    </div>
  </motion.div>
);

// Immersive Vision
const ImmersiveVision = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Section>
      <SectionTitle eyebrow="Speculative Futures" title="Imagining Dream Technology" />

      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12 max-w-3xl mx-auto">
          What if we could interface with our dreams? This design fiction explores possible
          futures, ethical dilemmas, and the implications of consciousness technology.
        </p>

        {/* Video placeholder */}
        <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5 overflow-hidden border border-white/5">
          {/* Animated background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                }}
                animate={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                }}
                transition={{
                  duration: 20 + Math.random() * 20,
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

// Detailed App Experience & Hardware Lab (simplified versions)
const DetailedAppExperience = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="Interface Speculation" title="Imagining the Dream App" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        If dream technology existed, how would we interact with it? This conceptual interface
        explores privacy-first design principles for consciousness data.
      </p>
      <div className="h-[400px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
        <p className="text-white/40">Dream App Interface Mockup</p>
      </div>
    </div>
  </Section>
);

const HardwareLab = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="Hardware Development" title="Building the Dream Sensor" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        Speculative hardware design for ethical brain-computer interfaces.
      </p>
      <div className="h-[400px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
        <p className="text-white/40">Hardware Lab Visualization</p>
      </div>
    </div>
  </Section>
);

// Final Dream Explorer
const DreamExplorer = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="Final Experience" title="Your Personal Dreamscape" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        An interactive experience that allows you to explore the concept of mapping dreams.
      </p>
      <div className="h-[400px] rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
        <p className="text-white/40">Personal Dreamscape Explorer</p>
      </div>
    </div>
  </Section>
);

const FooterSection = ({ interactions }: FooterSectionProps) => (
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

// Helper visualization components (simplified)
const Hypnogram = ({ distribution }: { distribution: any }) => (
  <svg className="w-full h-32" viewBox="0 0 800 100">
    <path
      d="M 0,80 L 100,80 L 150,60 L 200,40 L 250,20 L 300,40 L 350,60 L 400,80 L 450,60 L 500,40 L 550,20 L 600,40 L 650,60 L 700,80 L 800,80"
      fill="none"
      stroke="white"
      strokeOpacity="0.3"
      strokeWidth="2"
    />
  </svg>
);

const WaveformPattern = ({ frequency, color, isActive }: { frequency: string; color: string; isActive: boolean }) => (
  <svg className="w-full h-16" viewBox="0 0 200 50">
    <path
      d="M 0,25 Q 25,10 50,25 T 100,25 T 150,25 T 200,25"
      fill="none"
      stroke={color}
      strokeOpacity={isActive ? 0.6 : 0.2}
      strokeWidth="2"
    />
  </svg>
);

const MultiChannelEEG = ({ isActive, selectedWave }: { isActive: boolean; selectedWave: string | null }) => (
  <div className="space-y-2">
    {[1, 2, 3, 4].map((channel) => (
      <div key={channel} className="h-12 rounded bg-black/40 overflow-hidden flex items-center px-4">
        <span className="text-xs text-white/40 mr-4">CH{channel}</span>
        <div className="flex-1 h-6 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded animate-pulse" />
      </div>
    ))}
  </div>
);

const DetectionVisualization = () => (
  <div className="h-32 rounded-xl bg-black/40 flex items-center justify-center">
    <p className="text-xs text-white/30">Detection visualization running...</p>
  </div>
);

const ConceptVisualization = ({ concept }: { concept: any }) => (
  <div className="w-full h-full rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center">
    <div className="text-8xl opacity-10">{concept.visual}</div>
  </div>
);