"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { Play, Download, Sparkles, CircuitBoard, Network, Shield, ArrowRight, Moon, Zap, Brain, Cpu, Activity, Waves, ChevronRight, Volume2, Mic, Camera, FileText, Lock, Cloud, Layers, BarChart3, Eye, Heart, Timer } from "lucide-react";

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

  glass: "rgba(255,255,255,0.01)",
  glassBorder: "rgba(255,255,255,0.04)",
  glassHover: "rgba(255,255,255,0.02)",

  text: {
    primary: "rgba(255,255,255,0.95)",
    secondary: "rgba(255,255,255,0.60)",
    tertiary: "rgba(255,255,255,0.35)",
    ghost: "rgba(255,255,255,0.15)",
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

// ---------- Detailed Story Section ----------
interface ComponentProps {
  onInteract: () => void;
}

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
interface BrainWavesInteractiveProps {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  selectedWave: string | null;
  setSelectedWave: (value: string | null) => void;
  onInteract: () => void;
}

const BrainWavesInteractive = ({ isRecording, setIsRecording, selectedWave, setSelectedWave, onInteract }: BrainWavesInteractiveProps) => {
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

// Continue with rest of components...
const TechnicalArchitecture = ({ onInteract }: ComponentProps) => {
  // Implementation continues...
  return (
    <Section>
      <SectionTitle eyebrow="System Architecture" title="Interactive Data Flow" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          A speculative technical architecture for privacy-first dream analysis.
        </p>
      </div>
    </Section>
  );
};

const LivePrototypes = ({ onInteract }: ComponentProps) => {
  return (
    <Section>
      <SectionTitle eyebrow="Interactive Demos" title="Experience the Interface" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          Interactive prototypes demonstrating the dream interface concepts.
        </p>
      </div>
    </Section>
  );
};

const ImmersiveVision = () => {
  return (
    <Section>
      <SectionTitle eyebrow="Speculative Futures" title="Imagining Dream Technology" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          What if we could interface with our dreams? This design fiction explores possible futures.
        </p>
      </div>
    </Section>
  );
};

const DetailedAppExperience = ({ onInteract }: ComponentProps) => {
  return (
    <Section>
      <SectionTitle eyebrow="Interface Speculation" title="Imagining the Dream App" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          If dream technology existed, how would we interact with it?
        </p>
      </div>
    </Section>
  );
};

const HardwareLab = ({ onInteract }: ComponentProps) => {
  return (
    <Section>
      <SectionTitle eyebrow="Hardware Development" title="Building the Dream Sensor" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          Speculative hardware design for ethical brain-computer interfaces.
        </p>
      </div>
    </Section>
  );
};

const DreamExplorer = ({ onInteract }: ComponentProps) => {
  return (
    <Section>
      <SectionTitle eyebrow="Final Experience" title="Your Personal Dreamscape" />
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          An interactive experience that allows you to explore the concept of mapping dreams.
        </p>
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

// Additional visualization components
interface HypnogramProps {
  distribution: any;
}

const Hypnogram = ({ distribution }: HypnogramProps) => (
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

interface WaveformPatternProps {
  frequency: string;
  color: string;
  isActive: boolean;
}

const WaveformPattern = ({ frequency, color, isActive }: WaveformPatternProps) => (
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

interface MultiChannelEEGProps {
  isActive: boolean;
  selectedWave: string | null;
}

const MultiChannelEEG = ({ isActive, selectedWave }: MultiChannelEEGProps) => (
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

interface ConceptVisualizationProps {
  concept: any;
}

const ConceptVisualization = ({ concept }: ConceptVisualizationProps) => (
  <div className="w-full h-full rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center">
    <div className="text-8xl opacity-10">{concept.visual}</div>
  </div>
);