"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { Play, Download, Sparkles, CircuitBoard, Network, Shield, ArrowRight, Moon, Zap, Brain, Cpu, Activity, Waves, ChevronRight, ChevronDown, Volume2, Mic, Camera, FileText, Lock, Cloud, Layers, BarChart3, Eye, Heart, Timer } from "lucide-react";
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
  const [currentAct, setCurrentAct] = useState(1);

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

  // Track scroll position for act indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);

      // Divide page into three acts based on scroll position
      if (scrollPercentage < 0.25) {
        setCurrentAct(1);
      } else if (scrollPercentage < 0.65) {
        setCurrentAct(2);
      } else {
        setCurrentAct(3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Story Progress Indicator */}
      <motion.div
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {[
          { num: 'I', label: 'The Mystery', act: 1 },
          { num: 'II', label: 'The Technology', act: 2 },
          { num: 'III', label: 'The Experience', act: 3 },
        ].map((item) => (
          <motion.div
            key={item.act}
            className="group relative flex items-center gap-3 cursor-pointer"
            whileHover={{ x: 4 }}
            onClick={() => {
              const percentage = (item.act - 1) / 2;
              window.scrollTo({
                top: percentage * (document.documentElement.scrollHeight - window.innerHeight),
                behavior: 'smooth'
              });
            }}
          >
            {/* Line indicator */}
            <div className="relative">
              <div className={cx(
                "w-0.5 h-16 rounded-full transition-all duration-500",
                currentAct === item.act
                  ? "bg-gradient-to-b from-purple-500/60 to-pink-500/60"
                  : currentAct > item.act
                  ? "bg-white/20"
                  : "bg-white/5"
              )} />

              {/* Animated dot */}
              {currentAct === item.act && (
                <motion.div
                  layoutId="actIndicator"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>

            {/* Label (shows on hover) */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -10, width: 0 }}
                whileHover={{ opacity: 1, x: 0, width: "auto" }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-light text-white/40">Act {item.num}</span>
                    <span className="text-xs font-light text-white/70">{item.label}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Content - Three Act Structure */}

      {/* ACT I: THE MYSTERY (Setup) */}
      <HeroSection isLoaded={isLoaded} onInteract={trackInteraction} />

      <NarrativeConnector act="Act I: The Mystery">
        The dream vanishes. But what if it didn't?
      </NarrativeConnector>

      <ResearchOverview />
      <StoryActOne onInteract={trackInteraction} />

      {/* ACT II: THE TECHNOLOGY (Confrontation) */}
      <NarrativeConnector act="Act II: The Technology">
        Each future raised the same critical questions. Before we build this technology,
        we must ask: should we?
      </NarrativeConnector>

      <ImmersiveVision />

      <NarrativeConnector>
        If we proceed carefully, here's the science that makes it possible...
      </NarrativeConnector>

      <ComprehensiveScienceSection onInteract={trackInteraction} />
      <InteractiveConceptsSection onInteract={trackInteraction} />
      <TechnicalArchitecture onInteract={trackInteraction} />

      <StoryActTwo onInteract={trackInteraction} />

      {/* ACT III: THE EXPERIENCE (Resolution) */}
      <NarrativeConnector act="Act III: The Experience">
        These principles and questions shaped every design decision.
        Here's what responsible dream technology might look like...
      </NarrativeConnector>

      <LivePrototypes onInteract={trackInteraction} />
      <DetailedAppExperience onInteract={trackInteraction} />
      <HardwareLab onInteract={trackInteraction} />

      <NarrativeConnector>
        Ultimately, the choice is yours. Your dreams. Your data. Your consciousness.
      </NarrativeConnector>

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
          <span className="text-[10px] font-light tracking-[0.3em] text-white/30 uppercase">Speculative Design</span>
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <p className="text-base font-light text-white/50 leading-relaxed mb-4">
            Last night, you soared over impossible landscapes. You spoke with people who don't exist.
            You felt emotions that don't have names.
          </p>
          <p className="text-base font-light text-white/70 leading-relaxed">
            By morning, it was gone. <span className="text-white/40">95% of it, vanished in five minutes.</span>
          </p>
          <p className="mt-6 text-sm font-light text-white/40 italic leading-relaxed">
            This is a speculation about what we'd gain—and lose—if dreams became permanent.
          </p>
        </motion.div>

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

// ---------- Story Act One: The Promise ----------
const StoryActOne = ({ onInteract }: ComponentProps) => {
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
  ];

  return (
    <Section>
      <SectionTitle eyebrow="Speculative Futures" title="The Promise" />
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

// ---------- Story Act Two: The Shadow ----------
const StoryActTwo = ({ onInteract }: ComponentProps) => {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const chapters = [
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
      <SectionTitle eyebrow="Design Constraints" title="The Shadow" />
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
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes = [
    {
      id: 'sensor',
      label: 'EEG Sensor',
      icon: <Brain className="w-6 h-6" />,
      position: { x: 10, y: 50 },
      details: {
        tech: '4-channel dry electrodes',
        sampling: '256 Hz sampling rate',
        power: 'Low-power Bluetooth 5.0',
        privacy: 'No cloud connectivity'
      }
    },
    {
      id: 'preprocessing',
      label: 'Signal Processing',
      icon: <Waves className="w-6 h-6" />,
      position: { x: 30, y: 50 },
      details: {
        tech: 'Bandpass filter 0.5-45 Hz',
        processing: 'ICA artifact removal',
        latency: '< 5ms processing time',
        privacy: 'On-device computation'
      }
    },
    {
      id: 'ml',
      label: 'ML Model',
      icon: <Cpu className="w-6 h-6" />,
      position: { x: 50, y: 50 },
      details: {
        tech: 'CNN-based sleep staging',
        model: 'Edge-optimized TensorFlow Lite',
        accuracy: '94% stage classification',
        privacy: 'No data leaves device'
      }
    },
    {
      id: 'storage',
      label: 'Local Storage',
      icon: <Lock className="w-6 h-6" />,
      position: { x: 70, y: 50 },
      details: {
        tech: 'AES-256 encryption',
        storage: 'Secure Enclave (iOS)',
        capacity: '~50MB per night',
        privacy: 'Zero-knowledge architecture'
      }
    },
    {
      id: 'interface',
      label: 'User Interface',
      icon: <Sparkles className="w-6 h-6" />,
      position: { x: 90, y: 50 },
      details: {
        tech: 'React Native app',
        features: 'Voice-first interaction',
        offline: 'Full offline capability',
        privacy: 'Local-only visualization'
      }
    }
  ];

  return (
    <Section>
      <SectionTitle eyebrow="System Architecture" title="Privacy-First Data Flow" />
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          A speculative technical architecture where all processing happens on-device.
          <br />
          <span className="text-white/30">Click any node to explore technical details.</span>
        </p>

        {/* Architecture diagram */}
        <div className="relative h-[400px] rounded-2xl bg-white/[0.02] border border-white/10 mb-8 overflow-hidden">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.slice(0, -1).map((node, i) => {
              const nextNode = nodes[i + 1];
              return (
                <motion.line
                  key={i}
                  x1={`${node.position.x}%`}
                  y1={`${node.position.y}%`}
                  x2={`${nextNode.position.x}%`}
                  y2={`${nextNode.position.y}%`}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                />
              );
            })}
          </svg>

          {/* Animated data particles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ left: '10%', top: '50%', opacity: 0 }}
              animate={{
                left: ['10%', '30%', '50%', '70%', '90%'],
                opacity: [0, 1, 1, 1, 0]
              }}
              transition={{
                duration: 4,
                delay: i * 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Interactive nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              style={{
                position: 'absolute',
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => {
                setSelectedNode(node.id);
                onInteract();
              }}
              className="cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cx(
                  "relative p-4 rounded-xl transition-all duration-300",
                  selectedNode === node.id
                    ? "bg-white/10 border border-white/20"
                    : "bg-white/[0.03] border border-white/10 hover:bg-white/[0.05]"
                )}
              >
                <div className="flex flex-col items-center gap-2 min-w-[120px]">
                  <div className={cx(
                    "p-3 rounded-lg transition-colors",
                    selectedNode === node.id ? "bg-white/10 text-white/80" : "bg-white/5 text-white/50"
                  )}>
                    {node.icon}
                  </div>
                  <span className="text-xs font-light text-white/70 text-center whitespace-nowrap">
                    {node.label}
                  </span>
                </div>

                {/* Selection indicator */}
                {selectedNode === node.id && (
                  <motion.div
                    layoutId="nodeSelection"
                    className="absolute -inset-1 rounded-xl border-2 border-purple-500/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Details panel */}
        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/5">
                  {nodes.find(n => n.id === selectedNode)?.icon}
                </div>
                <h3 className="text-lg font-light text-white/80">
                  {nodes.find(n => n.id === selectedNode)?.label}
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(nodes.find(n => n.id === selectedNode)?.details || {}).map(([key, value]) => (
                  <div key={key} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{key}</div>
                    <div className="text-sm text-white/70">{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy guarantee badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex items-center justify-center gap-2 text-xs text-white/40"
        >
          <Shield className="w-4 h-4 text-green-500/60" />
          <span>100% on-device processing • Zero cloud storage • AES-256 encryption</span>
        </motion.div>
      </div>
    </Section>
  );
};

// ---------- Live Prototypes ----------
const LivePrototypes = ({ onInteract }: ComponentProps) => {
  const [activeProto, setActiveProto] = useState('explorer');
  const [dreamClusters, setDreamClusters] = useState([
    { id: 1, x: 30, y: 40, size: 60, label: 'Flying', count: 12, color: 'from-blue-500/30' },
    { id: 2, x: 60, y: 30, size: 45, label: 'Water', count: 8, color: 'from-cyan-500/30' },
    { id: 3, x: 45, y: 65, size: 50, label: 'People', count: 15, color: 'from-purple-500/30' },
    { id: 4, x: 75, y: 55, size: 35, label: 'Places', count: 6, color: 'from-pink-500/30' },
  ]);
  const [timelineHover, setTimelineHover] = useState<number | null>(null);
  const [patternData, setPatternData] = useState({ emotions: 65, themes: 48, symbols: 82 });
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');

  const prototypes = [
    { id: 'explorer', name: 'Dream Explorer', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'timeline', name: 'Sleep Timeline', icon: <Timer className="w-4 h-4" /> },
    { id: 'patterns', name: 'Pattern Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'voice', name: 'Voice Capture', icon: <Mic className="w-4 h-4" /> },
  ];

  const sleepData = [
    { stage: 'Wake', duration: 5, color: 'bg-blue-500/60', y: 0 },
    { stage: 'N1', duration: 10, color: 'bg-purple-500/60', y: 20 },
    { stage: 'N2', duration: 15, color: 'bg-indigo-500/60', y: 40 },
    { stage: 'N3', duration: 20, color: 'bg-pink-500/60', y: 60 },
    { stage: 'REM', duration: 15, color: 'bg-orange-500/60', y: 20 },
    { stage: 'N2', duration: 20, color: 'bg-indigo-500/60', y: 40 },
    { stage: 'REM', duration: 15, color: 'bg-orange-500/60', y: 20 },
  ];

  useEffect(() => {
    if (isRecording) {
      const texts = [
        "I was... floating? No, flying...",
        "I was... floating? No, flying... over a city made of light...",
        "I was... floating? No, flying... over a city made of light... the buildings looked like circuit boards...",
        "I was... floating? No, flying... over a city made of light... the buildings looked like circuit boards... and I wasn't afraid. That's the strangest part. I should have been afraid, but I felt... free."
      ];
      let index = 0;
      const interval = setInterval(() => {
        if (index < texts.length) {
          setVoiceText(texts[index]);
          index++;
        } else {
          setIsRecording(false);
          clearInterval(interval);
        }
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

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
          {/* Dream Explorer */}
          {activeProto === 'explorer' && (
            <motion.div
              key="explorer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative h-[600px] rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden p-8"
            >
              <div className="text-sm text-white/40 mb-4">Your dream landscape • Click clusters to explore</div>
              {dreamClusters.map((cluster) => (
                <motion.div
                  key={cluster.id}
                  onClick={() => onInteract()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    left: `${cluster.x}%`,
                    top: `${cluster.y}%`,
                    width: `${cluster.size}px`,
                    height: `${cluster.size}px`,
                  }}
                  className="cursor-pointer"
                >
                  <div className={cx(
                    "w-full h-full rounded-full bg-gradient-to-br backdrop-blur-xl border border-white/10",
                    cluster.color,
                    "flex items-center justify-center flex-col"
                  )}>
                    <div className="text-xl font-extralight text-white/80">{cluster.count}</div>
                    <div className="text-xs text-white/60">{cluster.label}</div>
                  </div>
                  {/* Connection lines */}
                  {cluster.id < 3 && (
                    <svg className="absolute inset-0 pointer-events-none" style={{ width: '200%', height: '200%' }}>
                      <line
                        x1="50%"
                        y1="50%"
                        x2="150%"
                        y2="80%"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Sleep Timeline */}
          {activeProto === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-[600px] rounded-2xl bg-white/[0.02] border border-white/10 p-8"
            >
              <div className="text-sm text-white/40 mb-8">Last night's sleep architecture • Hover for details</div>
              <div className="flex items-end gap-2 h-[400px]">
                {sleepData.map((data, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => {
                      setTimelineHover(i);
                      onInteract();
                    }}
                    onMouseLeave={() => setTimelineHover(null)}
                    className="relative flex-1 cursor-pointer"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${data.duration * 10}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className={cx(
                        "w-full rounded-t-lg transition-all duration-300",
                        data.color,
                        timelineHover === i ? "opacity-100" : "opacity-60"
                      )}
                    />
                    {timelineHover === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg bg-black/80 backdrop-blur-xl border border-white/20 whitespace-nowrap"
                      >
                        <div className="text-xs text-white/80">{data.stage}</div>
                        <div className="text-xs text-white/50">{data.duration} min</div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-white/30">
                <span>11:00 PM</span>
                <span>3:00 AM</span>
                <span>7:00 AM</span>
              </div>
            </motion.div>
          )}

          {/* Pattern Analysis */}
          {activeProto === 'patterns' && (
            <motion.div
              key="patterns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-[600px] rounded-2xl bg-white/[0.02] border border-white/10 p-8"
            >
              <div className="text-sm text-white/40 mb-8">Recurring patterns across 30 nights</div>
              <div className="space-y-8">
                {Object.entries(patternData).map(([key, value], i) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-white/70 capitalize">{key}</span>
                      <span className="text-2xl font-extralight text-white/80">{value}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ delay: i * 0.2, duration: 1 }}
                        className="h-full bg-gradient-to-r from-purple-500/60 to-pink-500/60 rounded-full"
                      />
                    </div>
                    {/* Top patterns */}
                    <div className="flex gap-2 mt-3">
                      {[
                        key === 'emotions' ? ['Joy', 'Fear', 'Wonder'] :
                        key === 'themes' ? ['Flying', 'Water', 'People'] :
                        ['Spiral', 'Door', 'Mirror']
                      ][0].map((tag, j) => (
                        <motion.span
                          key={j}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.2 + j * 0.1 }}
                          className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xs text-white/40"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Voice Capture */}
          {activeProto === 'voice' && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-[600px] rounded-2xl bg-white/[0.02] border border-white/10 p-8 flex flex-col items-center justify-center"
            >
              <motion.button
                onClick={() => {
                  setIsRecording(!isRecording);
                  if (!isRecording) setVoiceText('');
                  onInteract();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cx(
                  "relative w-32 h-32 rounded-full transition-all duration-300",
                  isRecording
                    ? "bg-red-500/20 border-2 border-red-500/50"
                    : "bg-white/5 border-2 border-white/10 hover:border-white/20"
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mic className={cx(
                    "w-12 h-12 transition-colors",
                    isRecording ? "text-red-400" : "text-white/60"
                  )} />
                </div>
                {isRecording && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full border-2 border-red-500/30"
                  />
                )}
              </motion.button>

              <p className="mt-6 text-sm text-white/40">
                {isRecording ? 'Recording...' : 'Tap to start voice capture'}
              </p>

              <AnimatePresence>
                {voiceText && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md"
                  >
                    <p className="text-base text-white/70 leading-relaxed">{voiceText}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Waveform visualization */}
              {isRecording && (
                <div className="mt-8 flex items-center gap-1">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [10, Math.random() * 40 + 10, 10],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: i * 0.05,
                      }}
                      className="w-1 bg-red-400/60 rounded-full"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      title: 'Morning Capture',
      icon: <Mic className="w-8 h-8" />,
      description: 'Voice-first dream recording immediately upon waking',
      ui: (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6"
          >
            <Mic className="w-12 h-12 text-white/60" />
          </motion.div>
          <p className="text-sm text-white/70 text-center mb-4">"Tell me about your dream..."</p>
          <div className="w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full bg-gradient-to-r from-purple-500/60 to-pink-500/60"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Dream Journal',
      icon: <FileText className="w-8 h-8" />,
      description: 'Searchable dream history with semantic understanding',
      ui: (
        <div className="p-6 space-y-3">
          {['Flying over ocean', 'Lost in building', 'Meeting old friend'].map((dream, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">{dream}</span>
                <span className="text-xs text-white/30">2 days ago</span>
              </div>
              <div className="flex gap-2">
                {['🌊', '✈️', '😊'][i] && <span className="text-xs opacity-60">{['🌊', '✈️', '😊'][i]}</span>}
                <span className="text-xs text-white/40">REM • 15 min</span>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: 'Pattern Discovery',
      icon: <BarChart3 className="w-8 h-8" />,
      description: 'AI-detected recurring themes and symbols',
      ui: (
        <div className="p-6">
          <div className="text-xs text-white/40 mb-4">Recurring themes this week:</div>
          <div className="space-y-4">
            {[
              { theme: 'Water', count: 5, color: 'from-cyan-500/40' },
              { theme: 'Flying', count: 3, color: 'from-blue-500/40' },
              { theme: 'People', count: 7, color: 'from-purple-500/40' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white/70">{item.theme}</span>
                  <span className="text-sm text-white/50">{item.count}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.count * 10}%` }}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
                    className={`h-full bg-gradient-to-r ${item.color} to-transparent`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Privacy Settings',
      icon: <Lock className="w-8 h-8" />,
      description: 'Full control over your consciousness data',
      ui: (
        <div className="p-6 space-y-4">
          {[
            { label: 'Local-only storage', enabled: true },
            { label: 'Cloud backup', enabled: false },
            { label: 'Data export', enabled: true },
            { label: 'Sharing', enabled: false }
          ].map((setting, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <span className="text-sm text-white/70">{setting.label}</span>
              <div className={cx(
                "w-12 h-6 rounded-full transition-colors",
                setting.enabled ? "bg-green-500/30" : "bg-white/10"
              )}>
                <motion.div
                  animate={{ x: setting.enabled ? 24 : 0 }}
                  className={cx(
                    "w-6 h-6 rounded-full",
                    setting.enabled ? "bg-green-500" : "bg-white/30"
                  )}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )
    }
  ];

  return (
    <Section>
      <SectionTitle eyebrow="Interface Speculation" title="Imagining the Dream App" />
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          If dream technology existed, how would we interact with it?
          <br />
          <span className="text-white/30">Swipe or click arrows to explore different screens.</span>
        </p>

        <div className="flex gap-8 items-center">
          {/* Navigation arrows */}
          <button
            onClick={() => {
              setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length);
              onInteract();
            }}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white/60 rotate-180" />
          </button>

          {/* iPhone mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* iPhone frame */}
              <div className="w-[320px] h-[640px] bg-black rounded-[48px] border-8 border-gray-900 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />

                {/* Status bar */}
                <div className="absolute top-2 left-0 right-0 flex justify-between px-8 text-xs text-white/60 z-20">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <Activity className="w-3 h-3" />
                    <span>100%</span>
                  </div>
                </div>

                {/* Screen content */}
                <div className="h-full bg-gradient-to-b from-gray-900 via-black to-black pt-10">
                  {/* Header */}
                  <div className="px-6 py-4 flex items-center gap-3 border-b border-white/5">
                    {screens[currentScreen].icon}
                    <div>
                      <div className="text-base font-light text-white/90">{screens[currentScreen].title}</div>
                      <div className="text-xs text-white/40">{screens[currentScreen].description}</div>
                    </div>
                  </div>

                  {/* Screen UI */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScreen}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="h-[calc(100%-100px)]"
                    >
                      {screens[currentScreen].ui}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => {
              setCurrentScreen((prev) => (prev + 1) % screens.length);
              onInteract();
            }}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white/60" />
          </button>
        </div>

        {/* Screen indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentScreen(i);
                onInteract();
              }}
              className={cx(
                "transition-all duration-300",
                i === currentScreen
                  ? "w-8 h-2 bg-white/60 rounded-full"
                  : "w-2 h-2 bg-white/20 rounded-full hover:bg-white/30"
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

// ---------- Hardware Lab ----------
const HardwareLab = ({ onInteract }: ComponentProps) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  const components = [
    {
      id: 'electrodes',
      name: 'Dry Electrodes',
      icon: <Activity className="w-6 h-6" />,
      specs: { channels: '4', impedance: '< 50kΩ', material: 'Gold-plated' },
      description: 'Medical-grade sensors that work without gel'
    },
    {
      id: 'processor',
      name: 'Edge Processor',
      icon: <Cpu className="w-6 h-6" />,
      specs: { chip: 'ARM Cortex-M7', freq: '216 MHz', memory: '512KB RAM' },
      description: 'Real-time signal processing on-device'
    },
    {
      id: 'battery',
      name: 'Battery System',
      icon: <Zap className="w-6 h-6" />,
      specs: { capacity: '250 mAh', runtime: '8-10 hours', charging: 'USB-C fast' },
      description: 'Lasts through full night of sleep'
    },
    {
      id: 'bluetooth',
      name: 'Bluetooth 5.0',
      icon: <Network className="w-6 h-6" />,
      specs: { range: '10m', power: 'Ultra-low', latency: '< 10ms' },
      description: 'Wireless connection to smartphone'
    }
  ];

  return (
    <Section>
      <SectionTitle eyebrow="Hardware Development" title="Building the Dream Sensor" />
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          Speculative hardware design for ethical brain-computer interfaces.
          <br />
          <span className="text-white/30">Click components to explore technical specifications.</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Hardware Visualization */}
          <div className="relative h-[500px] rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Headband visualization */}
              <motion.div
                animate={isRotating ? { rotateY: [0, 360] } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                onClick={() => {
                  setIsRotating(!isRotating);
                  onInteract();
                }}
                className="relative cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Main headband */}
                <div className="w-64 h-64 rounded-full border-8 border-white/20 relative">
                  {/* Electrode markers */}
                  {[0, 90, 180, 270].map((angle, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${angle}deg) translateY(-130px) translateX(-50%)`,
                      }}
                      className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  ))}

                  {/* Center processor */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ rotate: isRotating ? 0 : 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg border border-white/20 flex items-center justify-center"
                    >
                      <Cpu className="w-6 h-6 text-white/60" />
                    </motion.div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-xs text-white/60">EEG Headband</p>
                  <p className="text-xs text-white/30">Click to pause rotation</p>
                </div>
              </motion.div>
            </div>

            {/* Hover hint */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10">
              <span className="text-xs text-white/40">Speculative Design</span>
            </div>
          </div>

          {/* Component Details */}
          <div className="space-y-4">
            <div className="text-sm text-white/60 mb-4">Technical Components</div>
            {components.map((component, i) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setSelectedComponent(component.id);
                  onInteract();
                }}
                className={cx(
                  "p-4 rounded-xl cursor-pointer transition-all duration-300",
                  selectedComponent === component.id
                    ? "bg-white/[0.05] border border-white/20"
                    : "bg-white/[0.02] border border-white/10 hover:bg-white/[0.03]"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cx(
                    "p-3 rounded-lg transition-colors",
                    selectedComponent === component.id ? "bg-white/10 text-white/70" : "bg-white/5 text-white/40"
                  )}>
                    {component.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-light text-white/80 mb-1">{component.name}</h3>
                    <p className="text-xs text-white/50 mb-3">{component.description}</p>

                    <AnimatePresence>
                      {selectedComponent === component.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 pt-3 border-t border-white/5"
                        >
                          {Object.entries(component.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-xs text-white/40 capitalize">{key}</span>
                              <span className="text-xs text-white/60 font-mono">{value}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Sustainability badge */}
            <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-green-500/60" />
                <span className="text-sm text-white/70">Sustainable Design</span>
              </div>
              <p className="text-xs text-white/40">Recyclable materials • Repairable • 3-year lifespan</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ---------- Dream Explorer ----------
const DreamExplorer = ({ onInteract }: ComponentProps) => {
  const [selectedDream, setSelectedDream] = useState<number | null>(null);
  const [hoveredDream, setHoveredDream] = useState<number | null>(null);

  const dreams = [
    { id: 1, x: 25, y: 30, size: 50, label: 'Ocean Flight', emotion: 'Joy', color: 'from-blue-500/40', theme: 'Freedom', connections: [2, 3] },
    { id: 2, x: 55, y: 25, size: 45, label: 'Lost Building', emotion: 'Anxiety', color: 'from-orange-500/40', theme: 'Confusion', connections: [4] },
    { id: 3, x: 35, y: 60, size: 40, label: 'Old Friend', emotion: 'Nostalgia', color: 'from-purple-500/40', theme: 'Connection', connections: [5] },
    { id: 4, x: 70, y: 50, size: 55, label: 'Water World', emotion: 'Peace', color: 'from-cyan-500/40', theme: 'Flow', connections: [5] },
    { id: 5, x: 50, y: 75, size: 35, label: 'City Lights', emotion: 'Wonder', color: 'from-pink-500/40', theme: 'Discovery', connections: [] },
  ];

  return (
    <Section>
      <SectionTitle eyebrow="Final Experience" title="Your Personal Dreamscape" />
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-white/40 mb-12">
          An interactive visualization of your dream network.
          <br />
          <span className="text-white/30">Click any dream to see details • Related dreams are connected by lines</span>
        </p>

        <div className="relative h-[600px] rounded-2xl bg-gradient-to-b from-purple-900/5 via-black to-pink-900/5 border border-white/10 overflow-hidden">
          {/* Particle background */}
          <div className="absolute inset-0">
            {STATIC_PARTICLES.slice(0, 10).map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/10 rounded-full"
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

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {dreams.map((dream) =>
              dream.connections.map((targetId) => {
                const target = dreams.find(d => d.id === targetId);
                if (!target) return null;
                const isActive = selectedDream === dream.id || selectedDream === targetId ||
                                hoveredDream === dream.id || hoveredDream === targetId;
                return (
                  <motion.line
                    key={`${dream.id}-${targetId}`}
                    x1={`${dream.x}%`}
                    y1={`${dream.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={isActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}
                    strokeWidth={isActive ? "2" : "1"}
                    strokeDasharray="4 4"
                    animate={isActive ? { strokeDashoffset: [0, 8] } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                );
              })
            )}
          </svg>

          {/* Dream nodes */}
          {dreams.map((dream, i) => (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              style={{
                position: 'absolute',
                left: `${dream.x}%`,
                top: `${dream.y}%`,
                width: `${dream.size}px`,
                height: `${dream.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredDream(dream.id)}
              onMouseLeave={() => setHoveredDream(null)}
              onClick={() => {
                setSelectedDream(selectedDream === dream.id ? null : dream.id);
                onInteract();
              }}
              className="cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  selectedDream === dream.id || hoveredDream === dream.id
                    ? { boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }
                    : {}
                }
                className={cx(
                  "w-full h-full rounded-full bg-gradient-to-br backdrop-blur-xl border transition-all duration-300",
                  dream.color,
                  selectedDream === dream.id || hoveredDream === dream.id
                    ? "border-white/30 to-white/10"
                    : "border-white/10 to-transparent"
                )}
              >
                {/* Dream content */}
                <div className="w-full h-full flex flex-col items-center justify-center p-2">
                  <div className="text-xs font-light text-white/90 text-center">{dream.label}</div>
                  {(selectedDream === dream.id || hoveredDream === dream.id) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-white/60 text-center mt-1"
                    >
                      {dream.emotion}
                    </motion.div>
                  )}
                </div>

                {/* Pulse effect */}
                {selectedDream === dream.id && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-purple-500/50"
                  />
                )}
              </motion.div>
            </motion.div>
          ))}

          {/* Details panel */}
          <AnimatePresence>
            {selectedDream !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20"
              >
                {dreams
                  .filter(d => d.id === selectedDream)
                  .map(dream => (
                    <div key={dream.id}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-light text-white/90 mb-1">{dream.label}</h3>
                          <p className="text-sm text-white/60">{dream.theme}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDream(null);
                          }}
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 text-white/60 rotate-180" />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                          <div className="text-xs text-white/40 mb-1">Emotion</div>
                          <div className="text-sm text-white/70">{dream.emotion}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                          <div className="text-xs text-white/40 mb-1">Theme</div>
                          <div className="text-sm text-white/70">{dream.theme}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                          <div className="text-xs text-white/40 mb-1">Connected</div>
                          <div className="text-sm text-white/70">{dream.connections.length} dreams</div>
                        </div>
                      </div>

                      {dream.connections.length > 0 && (
                        <div className="mt-4 flex gap-2">
                          <span className="text-xs text-white/40">Related:</span>
                          <div className="flex gap-2 flex-wrap">
                            {dream.connections.map(connId => {
                              const connDream = dreams.find(d => d.id === connId);
                              return connDream ? (
                                <button
                                  key={connId}
                                  onClick={() => setSelectedDream(connId)}
                                  className="px-2 py-1 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 transition-colors text-xs text-white/60"
                                >
                                  {connDream.label}
                                </button>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          {selectedDream === null && (
            <div className="absolute top-6 left-6 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10">
              <div className="text-xs text-white/40 mb-2">30 nights of dreams</div>
              <div className="text-xs text-white/60">5 main clusters identified</div>
            </div>
          )}
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

// Narrative Connector Component
const NarrativeConnector = ({ children, act }: { children: React.ReactNode; act?: string }) => (
  <div className="relative py-16 px-6">
    <div className="max-w-2xl mx-auto text-center">
      {act && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-light tracking-[0.3em] text-white/20 uppercase mb-4"
        >
          {act}
        </motion.div>
      )}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-sm md:text-base font-light text-white/40 italic leading-relaxed"
      >
        {children}
      </motion.p>
    </div>
  </div>
);