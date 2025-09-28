'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Play,
  Phone,
  Brain,
  Shield,
  Eye,
  Heart,
  Sparkles,
  Activity,
  Waves,
  Layers,
  Network,
  Lock,
  Timer,
  BarChart3,
  Mic,
  Camera,
  FileText,
  Moon,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * LATENT SPACE — Speculative Design Experience
 * A critical design fiction exploring dream technology, consciousness interfaces,
 * and the ethics of mental privacy. Questions what we might lose by making the invisible visible.
 */

// Animation variants using global design system
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function LatentSpaceSpeculative() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5" />
      </div>

      {/* Hero Section */}
      <HeroSection isLoaded={isLoaded} />

      {/* Design Research Overview */}
      <DesignResearchSection />

      {/* Narrative Arc */}
      <NarrativeArcSection />

      {/* Science Exploration */}
      <ScienceExplorationSection />

      {/* Six Pillars */}
      <SixPillarsSection />

      {/* System Architecture */}
      <SystemArchitectureSection />

      {/* Interactive Prototypes */}
      <InteractivePrototypesSection />

      {/* Vision Section */}
      <VisionSection />

      {/* Interface Speculation */}
      <InterfaceSpeculationSection />

      {/* Team Perspectives */}
      <TeamPerspectivesSection />
    </main>
  );
}

// Hero Section: Massive typography with provocative questioning
const HeroSection = ({ isLoaded }: { isLoaded: boolean }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
      <motion.div
        style={{ y }}
        className="text-center max-w-6xl mx-auto"
      >
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <Sparkles className="w-4 h-4 text-[var(--brand-red)]" />
          <span className="text-micro text-[var(--text-muted)] uppercase tracking-wider">
            Speculative Design
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-display font-light leading-none tracking-tight">
            <span className="block bg-gradient-to-r from-[var(--text-primary)] via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Latent
            </span>
            <span className="block bg-gradient-to-r from-cyan-200 via-purple-200 to-[var(--text-primary)] bg-clip-text text-transparent">
              Space
            </span>
          </h1>
        </motion.div>

        {/* Provocative subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-subheading text-[var(--text-secondary)] leading-relaxed">
            What if we could navigate our dreams through technology while preserving the mystery of consciousness?
          </p>
          <p className="text-body mt-4 text-[var(--text-muted)]">
            A speculative exploration questioning the ethics of consciousness interfaces.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-micro text-[var(--text-muted)] uppercase tracking-wider">
            Explore the Questions
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Design Research Section: 4 cards exploring critical questions
const DesignResearchSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const researchAreas = [
    {
      title: "Design Provocations",
      count: "24",
      brief: "Critical questions about consciousness and technology",
      expanded: "What happens when the invisible becomes visible? How do we preserve the ineffable nature of dreams while making them accessible? Each provocation challenges our assumptions about consciousness, privacy, and the right to mental sovereignty."
    },
    {
      title: "Ethical Considerations",
      count: "16",
      brief: "Privacy, agency, and mental sovereignty",
      expanded: "Who owns your consciousness data? What consent frameworks protect our most intimate thoughts? We explore the ethical minefield of dream technology - from data ownership to the right to forget our own dreams."
    },
    {
      title: "Speculative Scenarios",
      count: "8",
      brief: "Possible futures of dream technology",
      expanded: "Eight carefully crafted scenarios explore potential futures: from therapeutic applications to entertainment dystopias. Each scenario questions not just what we could build, but what we should build."
    },
    {
      title: "Design Principles",
      count: "12",
      brief: "Guidelines for ethical dream interfaces",
      expanded: "Privacy-first design, user agency, transparency, and the preservation of mystery. These principles prioritize human dignity over technological capability."
    }
  ];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-xs font-extralight tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Critical Questions
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extralight text-[var(--text-primary)]">
            What should we ask before consciousness becomes data?
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {researchAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                className={cn(
                  "relative p-8 rounded-2xl cursor-pointer transition-all duration-500 border",
                  expandedCard === index
                    ? "glass-card border-[var(--border-secondary)]"
                    : "glass-card hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]"
                )}
              >
                <div className="text-center">
                  <div className="text-4xl font-extralight text-[var(--text-primary)] mb-2">
                    {area.count}
                  </div>
                  <h3 className="text-sm font-extralight text-[var(--text-secondary)] mb-3 tracking-wide">
                    {area.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {area.brief}
                  </p>
                </div>

                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-[var(--border-primary)]"
                    >
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {area.expanded}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Narrative Arc Section: 4 expandable chapters exploring ethical dilemmas
const NarrativeArcSection = () => {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const chapters = [
    {
      number: "I",
      title: "The Capture Question",
      question: "What if we could capture dreams?",
      dilemma: "Dreams vanish within minutes of waking. Should they? What would it mean for human experience if we could preserve these nocturnal narratives? Would we discover hidden insights, or lose something essential about the mystery of consciousness?",
      implications: ["Loss of ephemerality", "Commodification of dreams", "The right to forget"]
    },
    {
      number: "II",
      title: "The Control Paradigm",
      question: "Who controls consciousness technology?",
      dilemma: "If EEG technology evolved to be as common as smartphones, who would control this intimate data? This questions mental privacy, data sovereignty, and the commodification of our most private thoughts.",
      implications: ["Mental privacy erosion", "Corporate consciousness", "Thought surveillance"]
    },
    {
      number: "III",
      title: "The Translation Problem",
      question: "Can subjective experience become data?",
      dilemma: "Is it possible to translate the subjective experience of dreams into objective data? In making the invisible visible, what nuances and meanings might be lost in translation?",
      implications: ["Reductionism of experience", "Loss of mystery", "Quantified consciousness"]
    },
    {
      number: "IV",
      title: "The Understanding Paradox",
      question: "Does understanding dreams diminish them?",
      dilemma: "If we could perfectly map and understand our dreams, would this empower us or constrain the freedom of our unconscious minds? Some mysteries might be meant to remain unsolved.",
      implications: ["Death of wonder", "Mechanical consciousness", "Loss of the ineffable"]
    }
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-xs font-extralight tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Narrative Arc
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extralight text-[var(--text-primary)] mb-6">
            The Journey from Dreams to Data
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Four chapters exploring the ethical implications of consciousness technology
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group"
            >
              <div
                onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
                className={cn(
                  "relative p-10 rounded-3xl cursor-pointer transition-all duration-500 border",
                  expandedChapter === index
                    ? "glass-card border-[var(--border-secondary)]"
                    : "glass-card hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-6 md:gap-8 mb-4">
                      <span className="text-5xl font-extralight text-[var(--text-muted)]">
                        {chapter.number}
                      </span>
                      <div>
                        <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-2">
                          {chapter.title}
                        </h3>
                        <p className="text-lg font-extralight text-[var(--text-secondary)]">
                          {chapter.question}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-6 h-6 text-[var(--text-muted)] transition-transform duration-300",
                      expandedChapter === index ? "rotate-90" : ""
                    )}
                  />
                </div>

                <AnimatePresence>
                  {expandedChapter === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-8 pt-8 border-t border-[var(--border-primary)]"
                    >
                      <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                        {chapter.dilemma}
                      </p>
                      <div>
                        <h4 className="text-sm font-extralight text-[var(--text-muted)] mb-3 tracking-wide uppercase">
                          Implications to Consider
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {chapter.implications.map((implication, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs text-[var(--text-secondary)]"
                            >
                              {implication}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Science Exploration Section: Multi-tab interface with conceptual visualizations
const ScienceExplorationSection = () => {
  const [activeTab, setActiveTab] = useState("sleep-stages");
  const [isRecording, setIsRecording] = useState(false);

  const tabs = [
    { id: "sleep-stages", label: "Sleep Stages", icon: Moon },
    { id: "brain-waves", label: "Brain Waves", icon: Activity },
    { id: "detection", label: "Detection", icon: Eye },
    { id: "processing", label: "Processing", icon: Layers },
    { id: "papers", label: "Research", icon: FileText },
  ];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-xs font-extralight tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Speculative Science
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extralight text-[var(--text-primary)] mb-6">
            What if we could map consciousness?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Exploring the theoretical frameworks that might enable dream technology
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-2 px-6 md:px-8 lg:px-12 py-3 rounded-full text-sm font-extralight transition-all duration-300 border",
                activeTab === tab.id
                  ? "bg-white/[0.03] border-white/20 text-[var(--text-primary)]"
                  : "bg-white/[0.01] border-white/10 text-[var(--text-secondary)] hover:bg-white/[0.02] hover:border-white/15"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "sleep-stages" && (
              <SleepStagesTab key="sleep-stages" />
            )}
            {activeTab === "brain-waves" && (
              <BrainWavesTab key="brain-waves" isRecording={isRecording} setIsRecording={setIsRecording} />
            )}
            {activeTab === "detection" && (
              <DetectionTab key="detection" />
            )}
            {activeTab === "processing" && (
              <ProcessingTab key="processing" />
            )}
            {activeTab === "papers" && (
              <ResearchPapersTab key="papers" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Individual tab components
const SleepStagesTab = () => {
  const stages = [
    { name: "Wake", duration: "5%", description: "Full consciousness with awareness", color: "from-blue-500/20" },
    { name: "N1", duration: "5%", description: "Light sleep transition", color: "from-purple-500/20" },
    { name: "N2", duration: "45%", description: "Deeper sleep with spindles", color: "from-indigo-500/20" },
    { name: "N3", duration: "25%", description: "Deep restorative sleep", color: "from-pink-500/20" },
    { name: "REM", duration: "20%", description: "Rapid eye movement dreams", color: "from-orange-500/20" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      <div className="md:col-span-2">
        <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-6">
          What if we could navigate between sleep stages?
        </h3>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
          Current sleep science identifies distinct stages, each with unique neural signatures.
          But what ethical questions arise if we could consciously control these transitions?
        </p>
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative p-6 rounded-2xl border border-white/10 bg-gradient-to-r to-transparent",
                stage.color
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-extralight text-[var(--text-primary)]">{stage.name}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{stage.description}</p>
                </div>
                <div className="text-2xl font-extralight text-[var(--text-secondary)]">{stage.duration}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-lg font-extralight text-[var(--text-primary)] mb-4">Critical Questions</h4>
        <div className="space-y-3 text-sm text-[var(--text-secondary)]">
          <p>• Should we have the right to alter our natural sleep cycles?</p>
          <p>• What happens to dreams if we control REM sleep?</p>
          <p>• Who decides what constitutes "healthy" sleep patterns?</p>
          <p>• Could sleep become another form of productivity optimization?</p>
        </div>
      </div>
    </motion.div>
  );
};

const BrainWavesTab = ({ isRecording, setIsRecording }: { isRecording: boolean; setIsRecording: (recording: boolean) => void }) => {
  const waves = [
    { name: "Delta", range: "0.5-4 Hz", purpose: "Deep sleep restoration", power: 85 },
    { name: "Theta", range: "4-8 Hz", purpose: "REM dreams & creativity", power: 65 },
    { name: "Alpha", range: "8-13 Hz", purpose: "Relaxed awareness", power: 45 },
    { name: "Beta", range: "13-30 Hz", purpose: "Active consciousness", power: 30 },
    { name: "Gamma", range: "30-100 Hz", purpose: "Binding consciousness", power: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div>
        <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-6">
          What if consciousness had a frequency?
        </h3>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
          Different brain wave patterns correlate with states of consciousness.
          But can frequency truly capture the richness of subjective experience?
        </p>

        <div className="space-y-4">
          {waves.map((wave, index) => (
            <motion.div
              key={wave.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl glass-card"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[var(--text-primary)] font-extralight">{wave.name} Wave</span>
                  <span className="text-[var(--text-muted)] text-sm ml-3">{wave.range}</span>
                </div>
                <span className="text-[var(--text-secondary)] text-sm">{wave.purpose}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isRecording ? `${wave.power}%` : 0 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-extralight text-[var(--text-primary)]">Speculative Recording</h4>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-extralight transition-all duration-300 border",
              isRecording
                ? "bg-red-500/20 border-red-500/40 text-red-300"
                : "bg-white/5 border-white/20 text-[var(--text-secondary)] hover:bg-white/10"
            )}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>

        <div className="h-48 rounded-xl bg-white/[0.005] border border-white/5 flex items-center justify-center mb-6">
          {isRecording ? (
            <div className="text-center">
              <Activity className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-[var(--text-muted)]">Simulating brainwave capture...</p>
            </div>
          ) : (
            <div className="text-center">
              <Waves className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
              <p className="text-sm text-[var(--text-muted)]">Click to begin simulation</p>
            </div>
          )}
        </div>

        <div className="text-xs text-[var(--text-muted)] space-y-1">
          <p>⚠ This is speculative technology</p>
          <p>⚠ Raises questions about mental privacy</p>
          <p>⚠ What consent frameworks would protect consciousness data?</p>
        </div>
      </div>
    </motion.div>
  );
};

const DetectionTab = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="text-center"
  >
    <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-6">
      What patterns would reveal our inner worlds?
    </h3>
    <p className="text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed">
      Detection algorithms might identify dream states, but what happens to the mystery and
      ineffability of consciousness when it becomes measurable data?
    </p>
    <div className="h-64 rounded-2xl glass-card flex items-center justify-center">
      <div className="text-center">
        <Eye className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
        <p className="text-[var(--text-muted)]">Pattern recognition speculation</p>
      </div>
    </div>
  </motion.div>
);

const ProcessingTab = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="text-center"
  >
    <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-6">
      How do you process a dream?
    </h3>
    <p className="text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed">
      The gap between neural activity and subjective experience remains vast.
      What would be lost in translation from consciousness to code?
    </p>
    <div className="h-64 rounded-2xl glass-card flex items-center justify-center">
      <div className="text-center">
        <Layers className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
        <p className="text-[var(--text-muted)]">Processing pipeline speculation</p>
      </div>
    </div>
  </motion.div>
);

const ResearchPapersTab = () => {
  const papers = [
    {
      title: "The Ethics of Consciousness Interfaces",
      authors: "Speculative Ethics Lab",
      question: "What frameworks protect mental sovereignty?",
    },
    {
      title: "Dreams as Data: Privacy Implications",
      authors: "Critical Technology Studies",
      question: "Who owns your subconscious thoughts?",
    },
    {
      title: "The Ineffable and the Algorithmic",
      authors: "Philosophy of Mind Collective",
      question: "What is lost when mystery becomes measurement?",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-6 text-center">
        What questions should researchers ask?
      </h3>
      <div className="space-y-6">
        {papers.map((paper, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl glass-card"
          >
            <h4 className="text-lg font-extralight text-[var(--text-primary)] mb-2">{paper.title}</h4>
            <p className="text-sm text-[var(--text-muted)] mb-3">{paper.authors}</p>
            <p className="text-[var(--text-secondary)] italic">"{paper.question}"</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Six Pillars Section: Auto-advancing concept display
const SixPillarsSection = () => {
  const [activePillar, setActivePillar] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const pillars = [
    {
      title: "Privacy Paradox",
      question: "Who owns your dreams?",
      description: "If we could record dreams, who would control that data? What happens when our most private thoughts become digital assets?",
      implications: ["Data sovereignty", "Mental privacy rights", "Corporate consciousness"],
      icon: Lock
    },
    {
      title: "Consent Complexity",
      question: "How do you consent to consciousness recording?",
      description: "Traditional consent models break down when dealing with unconscious states. What frameworks protect sleeping minds?",
      implications: ["Unconscious consent", "Revocable permissions", "Mental autonomy"],
      icon: Shield
    },
    {
      title: "Authenticity Crisis",
      question: "Are recorded dreams still real dreams?",
      description: "When dreams become data, do they lose their essential nature? What happens to the ineffable when it becomes measurable?",
      implications: ["Reductionism concerns", "Loss of mystery", "Quantified consciousness"],
      icon: Heart
    },
    {
      title: "Agency Questions",
      question: "Should we control our dreams?",
      description: "If we could direct our dreams, would we lose something fundamental about unconscious creativity and processing?",
      implications: ["Unconscious freedom", "Creative constraint", "Natural vs. artificial"],
      icon: Brain
    },
    {
      title: "Equality Implications",
      question: "Who gets access to dream technology?",
      description: "Would consciousness interfaces create new forms of inequality? What happens when some minds are more 'connected' than others?",
      implications: ["Cognitive equity", "Enhancement divide", "Mental class systems"],
      icon: Sparkles
    },
    {
      title: "Future Fears",
      question: "What world are we creating?",
      description: "Looking ahead, what kind of society emerges when consciousness itself becomes a technology? What safeguards do we need now?",
      implications: ["Dystopian scenarios", "Protective frameworks", "Human dignity preservation"],
      icon: Eye
    }
  ];

  // Auto-advance every 5 seconds unless paused
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActivePillar((prev) => (prev + 1) % pillars.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, pillars.length]);

  const currentPillar = pillars[activePillar];

  return (
    <section
      className="relative py-32 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-cyan-950/5 to-transparent mb-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-xs font-extralight tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Critical Pillars
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extralight text-[var(--text-primary)] mb-6">
            Six questions that shape the future
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Each pillar represents a fundamental question about consciousness technology
          </motion.p>
        </motion.div>

        {/* Main Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left: Active Concept */}
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <currentPillar.icon className="w-8 h-8 text-[var(--text-secondary)]" />
              </div>
              <div>
                <h3 className="text-3xl font-extralight text-[var(--text-primary)]">{currentPillar.title}</h3>
                <p className="text-lg text-[var(--text-secondary)] italic mt-2">"{currentPillar.question}"</p>
              </div>
            </div>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {currentPillar.description}
            </p>

            <div>
              <h4 className="text-sm font-extralight text-[var(--text-muted)] mb-4 tracking-wide uppercase">
                Key Implications
              </h4>
              <div className="flex flex-wrap gap-3">
                {currentPillar.implications.map((implication, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 rounded-full bg-white/[0.02] border border-white/10 text-sm text-[var(--text-secondary)]"
                  >
                    {implication}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Visual Representation */}
          <motion.div
            key={`visual-${activePillar}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl glass-card overflow-hidden">
              <div className="relative h-full flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <currentPillar.icon className="w-24 h-24 text-[var(--text-muted)]" />
                </motion.div>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    animate={{
                      x: [0, Math.cos(i * 45 * Math.PI / 180) * 80, 0],
                      y: [0, Math.sin(i * 45 * Math.PI / 180) * 80, 0],
                      opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Pills */}
        <div className="flex justify-center gap-4 flex-wrap">
          {pillars.map((pillar, index) => (
            <motion.button
              key={index}
              onClick={() => setActivePillar(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative p-4 rounded-2xl text-left transition-all duration-500 border min-w-[200px]",
                activePillar === index
                  ? "bg-white/[0.03] border-white/20"
                  : "bg-white/[0.01] border-white/8 hover:bg-white/[0.02] hover:border-white/15"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <pillar.icon className="w-5 h-5 text-[var(--text-secondary)]" />
                <span className="text-sm font-extralight text-[var(--text-secondary)]">{pillar.title}</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {pillar.question}
              </p>

              {/* Progress bar for active pillar */}
              {activePillar === index && !isPaused && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Pause indicator */}
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <span className="text-xs text-[var(--text-muted)]">Paused • Move cursor away to resume</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// System Architecture Section: 16 interactive nodes with animated data flow
const SystemArchitectureSection = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [dataFlowActive, setDataFlowActive] = useState(false);

  const layers = [
    {
      name: "Capture Layer",
      description: "How consciousness becomes data",
      components: [
        { id: "eeg", name: "EEG Sensors", question: "Who controls the collection?", icon: Activity },
        { id: "processing", name: "Signal Processing", question: "What gets filtered out?", icon: Waves },
        { id: "detection", name: "State Detection", question: "How do we define consciousness?", icon: Eye },
        { id: "validation", name: "Data Validation", question: "What counts as 'real' data?", icon: Shield }
      ]
    },
    {
      name: "Processing Layer",
      description: "Transforming neural signals into meaning",
      components: [
        { id: "filtering", name: "Noise Filtering", question: "What signal becomes noise?", icon: Layers },
        { id: "pattern", name: "Pattern Recognition", question: "Who decides what patterns matter?", icon: BarChart3 },
        { id: "feature", name: "Feature Extraction", question: "Which features define consciousness?", icon: Zap },
        { id: "classification", name: "State Classification", question: "Can dreams be categorized?", icon: FileText }
      ]
    },
    {
      name: "Interpretation Layer",
      description: "Making meaning from measurements",
      components: [
        { id: "semantic", name: "Semantic Mapping", question: "How do we translate dreams?", icon: Brain },
        { id: "context", name: "Context Building", question: "Whose context shapes meaning?", icon: Network },
        { id: "memory", name: "Memory Integration", question: "Should dreams connect to memories?", icon: Timer },
        { id: "prediction", name: "Predictive Modeling", question: "Can we predict dreams?", icon: Sparkles }
      ]
    },
    {
      name: "Interface Layer",
      description: "Presenting consciousness as information",
      components: [
        { id: "visualization", name: "Dream Visualization", question: "How do we show the invisible?", icon: Eye },
        { id: "interaction", name: "User Interaction", question: "Should we control our dreams?", icon: Phone },
        { id: "privacy", name: "Privacy Controls", question: "Who protects mental sovereignty?", icon: Lock },
        { id: "sharing", name: "Social Sharing", question: "Should dreams be shared?", icon: Heart }
      ]
    }
  ];

  const flatComponents = layers.flatMap(layer =>
    layer.components.map(comp => ({ ...comp, layer: layer.name }))
  );

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-xs font-extralight tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Speculative Architecture
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extralight text-[var(--text-primary)] mb-6">
            How would consciousness become data?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
            A speculative system architecture raising questions about data sovereignty and mental privacy
          </motion.p>

          <motion.button
            variants={fadeInUp}
            onClick={() => setDataFlowActive(!dataFlowActive)}
            className={cn(
              "px-8 py-3 rounded-full text-sm font-extralight transition-all duration-500 border",
              dataFlowActive
                ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                : "bg-white/5 border-white/20 text-[var(--text-secondary)] hover:bg-white/10"
            )}
          >
            {dataFlowActive ? "Stop Data Flow" : "Start Data Flow"}
          </motion.button>
        </motion.div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {layers.map((layer, layerIndex) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: layerIndex * 0.2 }}
              className="space-y-6"
            >
              {/* Layer Header */}
              <div className="text-center">
                <h3 className="text-lg font-extralight text-[var(--text-primary)] mb-2">{layer.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">{layer.description}</p>
              </div>

              {/* Components */}
              <div className="space-y-4">
                {layer.components.map((component, compIndex) => (
                  <motion.div
                    key={component.id}
                    onClick={() => setActiveNode(activeNode === component.id ? null : component.id)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (layerIndex * 0.2) + (compIndex * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border group",
                      activeNode === component.id
                        ? "bg-white/[0.03] border-white/20"
                        : "bg-white/[0.01] border-white/10 hover:bg-white/[0.02] hover:border-white/15"
                    )}
                  >
                    {/* Data flow animation */}
                    {dataFlowActive && layerIndex < 3 && (
                      <motion.div
                        className="absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"
                        animate={{
                          opacity: [0, 1, 0],
                          x: [0, 20, 40]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: (layerIndex * 0.5) + (compIndex * 0.2)
                        }}
                      />
                    )}

                    <div className="flex items-center gap-3 mb-3">
                      <component.icon className="w-5 h-5 text-[var(--text-secondary)]" />
                      <span className="text-sm font-extralight text-[var(--text-secondary)]">{component.name}</span>
                    </div>

                    <AnimatePresence>
                      {activeNode === component.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-3 border-t border-[var(--border-primary)]"
                        >
                          <p className="text-xs text-[var(--text-secondary)] italic">"{component.question}"</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Pulse indicator when data flows */}
                    {dataFlowActive && (
                      <motion.div
                        className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: (layerIndex * 0.3) + (compIndex * 0.1)
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Critical Questions Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-8 rounded-3xl glass-card"
        >
          <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-6 text-center">
            Critical Architecture Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-sm text-[var(--text-secondary)]">
            <div>
              <h4 className="text-[var(--text-secondary)] mb-2">Data Sovereignty</h4>
              <p>• Who owns the consciousness data collected?</p>
              <p>• What rights do users have over their dreams?</p>
              <p>• Can consciousness data be deleted?</p>
            </div>
            <div>
              <h4 className="text-[var(--text-secondary)] mb-2">Processing Ethics</h4>
              <p>• What biases exist in pattern recognition?</p>
              <p>• Who decides what constitutes 'normal' dreams?</p>
              <p>• How do algorithms shape interpretation?</p>
            </div>
            <div>
              <h4 className="text-[var(--text-secondary)] mb-2">Interface Responsibility</h4>
              <p>• Should we be able to edit our dreams?</p>
              <p>• What happens to natural sleep cycles?</p>
              <p>• How do we preserve the mystery of consciousness?</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Interactive Prototypes Section: 4 explorable demo concepts
const InteractivePrototypesSection = () => {
  const [activePrototype, setActivePrototype] = useState("dream-explorer");
  const [dreamFragments, setDreamFragments] = useState<Array<{ id: string; x: number; y: number; text: string }>>([]);

  const prototypes = [
    {
      id: "dream-explorer",
      name: "Dream Explorer",
      description: "Click to add floating dream fragments",
      question: "Should we map the unmappable?",
      icon: Sparkles
    },
    {
      id: "sleep-timeline",
      name: "Sleep Timeline",
      description: "Hourly breakdown visualization",
      question: "Who decides what constitutes healthy sleep?",
      icon: Timer
    },
    {
      id: "pattern-analysis",
      name: "Pattern Analysis",
      description: "Discovering recurring themes",
      question: "What patterns matter, and who decides?",
      icon: BarChart3
    },
    {
      id: "voice-capture",
      name: "Voice Capture",
      description: "Simulated recording interface",
      question: "Should dreams have a voice?",
      icon: Mic
    }
  ];

  const addDreamFragment = (e: React.MouseEvent) => {
    if (activePrototype !== "dream-explorer") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const fragments = [
      "floating", "mystery", "memory", "emotion", "symbol", "color", "movement",
      "voice", "shadow", "light", "fear", "joy", "transformation", "journey"
    ];

    const newFragment = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      text: fragments[Math.floor(Math.random() * fragments.length)]
    };

    setDreamFragments(prev => [...prev, newFragment]);
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-purple-950/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-xs font-extralight tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Speculative Interfaces
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extralight text-[var(--text-primary)] mb-6">
            How would we interact with consciousness data?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Four conceptual interfaces that question the ethics of dream technology
          </motion.p>
        </motion.div>

        {/* Prototype Navigation */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {prototypes.map((prototype, index) => (
            <motion.button
              key={prototype.id}
              onClick={() => setActivePrototype(prototype.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-3 px-6 md:px-8 lg:px-12 py-4 rounded-2xl text-left transition-all duration-300 border min-w-[200px]",
                activePrototype === prototype.id
                  ? "bg-white/[0.03] border-white/20"
                  : "bg-white/[0.01] border-white/10 hover:bg-white/[0.02] hover:border-white/15"
              )}
            >
              <prototype.icon className="w-5 h-5 text-[var(--text-secondary)]" />
              <div>
                <div className="text-sm font-extralight text-[var(--text-secondary)]">{prototype.name}</div>
                <div className="text-xs text-[var(--text-muted)]">{prototype.description}</div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Prototype Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activePrototype === "dream-explorer" && (
              <DreamExplorerPrototype
                key="dream-explorer"
                onCanvasClick={addDreamFragment}
                fragments={dreamFragments}
              />
            )}
            {activePrototype === "sleep-timeline" && (
              <SleepTimelinePrototype key="sleep-timeline" />
            )}
            {activePrototype === "pattern-analysis" && (
              <PatternAnalysisPrototype key="pattern-analysis" />
            )}
            {activePrototype === "voice-capture" && (
              <VoiceCapturePrototype key="voice-capture" />
            )}
          </AnimatePresence>
        </div>

        {/* Critical Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-[var(--text-secondary)] italic">
            "{prototypes.find(p => p.id === activePrototype)?.question}"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Individual prototype components
const DreamExplorerPrototype = ({
  onCanvasClick,
  fragments
}: {
  onCanvasClick: (e: React.MouseEvent) => void;
  fragments: Array<{ id: string; x: number; y: number; text: string }>;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="space-y-6"
  >
    <div className="text-center mb-6">
      <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-2">Dream Explorer</h3>
      <p className="text-[var(--text-secondary)]">Click anywhere to add dream fragments that float and connect</p>
    </div>

    <div
      onClick={onCanvasClick}
      className="relative h-96 rounded-3xl glass-card cursor-crosshair overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`
        }} />
      </div>

      {/* Dream fragments */}
      {fragments.map((fragment, index) => (
        <motion.div
          key={fragment.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.5,
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute px-3 py-1 rounded-full bg-white/[0.03] border border-white/20 text-xs text-[var(--text-secondary)]"
          style={{
            left: `${fragment.x}%`,
            top: `${fragment.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {fragment.text}
        </motion.div>
      ))}

      {/* Connection lines between fragments */}
      {fragments.length > 1 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {fragments.map((fragment, index) => {
            if (index === 0) return null;
            const prev = fragments[index - 1];
            return (
              <motion.line
                key={`line-${fragment.id}`}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${fragment.x}%`}
                y2={`${fragment.y}%`}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
            );
          })}
        </svg>
      )}

      {fragments.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-muted)]">Click to begin exploring dream space</p>
          </div>
        </div>
      )}
    </div>

    <div className="text-xs text-[var(--text-muted)] text-center">
      ⚠ Speculative interface • Questions the ethics of mapping consciousness
    </div>
  </motion.div>
);

const SleepTimelinePrototype = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="space-y-6"
  >
    <div className="text-center mb-6">
      <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-2">Sleep Timeline</h3>
      <p className="text-[var(--text-secondary)]">Visualizing a night's journey through consciousness states</p>
    </div>

    <div className="h-64 rounded-3xl glass-card p-8">
      <div className="flex items-end justify-between h-full">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${Math.random() * 80 + 20}%` }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="flex-1 mx-1 bg-gradient-to-t from-purple-500/30 to-cyan-500/30 rounded-t"
          />
        ))}
      </div>
    </div>

    <div className="text-xs text-[var(--text-muted)] text-center">
      ⚠ Who determines optimal sleep patterns? What about individual differences?
    </div>
  </motion.div>
);

const PatternAnalysisPrototype = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="space-y-6"
  >
    <div className="text-center mb-6">
      <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-2">Pattern Analysis</h3>
      <p className="text-[var(--text-secondary)]">Algorithmic interpretation of dream themes</p>
    </div>

    <div className="h-64 rounded-3xl glass-card p-8 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {['Recurring Symbols', 'Emotional Patterns', 'Narrative Structures'].map((category, i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center"
          >
            <BarChart3 className="w-6 h-6 text-[var(--text-muted)] mx-auto mb-2" />
            <span className="text-xs text-[var(--text-secondary)]">{category}</span>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="text-xs text-[var(--text-muted)] text-center">
      ⚠ What biases exist in pattern recognition? Who defines meaningful patterns?
    </div>
  </motion.div>
);

const VoiceCapturePrototype = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-2">Voice Capture</h3>
        <p className="text-[var(--text-secondary)]">Recording sleep talk and dream narration</p>
      </div>

      <div className="h-64 rounded-3xl glass-card p-8 flex flex-col items-center justify-center">
        <motion.button
          onClick={() => setIsRecording(!isRecording)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-20 h-20 rounded-full border-2 transition-all duration-300 mb-4",
            isRecording
              ? "bg-red-500/20 border-red-500/40 text-red-300"
              : "bg-white/5 border-white/20 text-[var(--text-secondary)] hover:bg-white/10"
          )}
        >
          <Mic className="w-8 h-8 mx-auto" />
        </motion.button>

        <p className="text-sm text-[var(--text-secondary)] mb-2">
          {isRecording ? "Recording dream speech..." : "Click to begin capture"}
        </p>

        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-red-400 rounded-full"
                animate={{
                  height: [10, 30, 10],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      <div className="text-xs text-[var(--text-muted)] text-center">
        ⚠ Should unconscious speech be recorded? What about consent during sleep?
      </div>
    </motion.div>
  );
};

// Vision Section: Critical "what if" scenarios with expandable future predictions
const VisionSection = () => {
  const [activeVision, setActiveVision] = useState<number | null>(null);

  const visions = [
    {
      title: "The Therapeutic Future",
      timeframe: "5-10 years",
      scenario: "What if dream technology becomes standard therapy?",
      description: "Therapists could analyze dream patterns to understand trauma, phobias, and psychological patterns. But who decides what constitutes 'healthy' dreams?",
      implications: [
        "Standardized dream analysis protocols",
        "AI-powered dream interpretation",
        "Mental health surveillance systems",
        "Loss of dream privacy in therapy"
      ],
      questions: [
        "Should therapists have access to unconscious thoughts?",
        "What happens to patient confidentiality?",
        "Who trains the AI systems interpreting dreams?",
        "Could dreams be used against patients?"
      ],
      gradient: "from-green-500/20 to-blue-500/20"
    },
    {
      title: "The Entertainment Dystopia",
      timeframe: "10-15 years",
      scenario: "What if dreams become the ultimate entertainment?",
      description: "Dream sharing platforms could emerge where people subscribe to others' dreams like streaming services. Would we lose the boundary between authentic and curated consciousness?",
      implications: [
        "Dream streaming platforms",
        "Celebrity dream content",
        "Artificial dream enhancement",
        "Commodified consciousness"
      ],
      questions: [
        "Should dreams be intellectual property?",
        "What happens to natural dreaming abilities?",
        "How do we verify authentic dreams?",
        "Could this create dream addiction?"
      ],
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "The Surveillance Society",
      timeframe: "15-20 years",
      scenario: "What if dream monitoring becomes mandatory?",
      description: "Governments could require dream monitoring for criminal prediction, thought policing, or social credit systems. The last frontier of mental privacy could disappear.",
      implications: [
        "Mandatory neural monitoring",
        "Thought crime prediction",
        "Dream-based social scoring",
        "Mental autonomy erosion"
      ],
      questions: [
        "Should the state monitor unconscious thoughts?",
        "What constitutes a 'dangerous' dream?",
        "How do we protect mental dissidents?",
        "Could dreams be fabricated as evidence?"
      ],
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      title: "The Enhancement Divide",
      timeframe: "20+ years",
      scenario: "What if consciousness enhancement creates inequality?",
      description: "Dream technology could create cognitive castes - those with enhanced consciousness versus natural dreamers. Would this fundamentally alter human nature?",
      implications: [
        "Cognitive class systems",
        "Enhanced vs. natural minds",
        "Consciousness inequality",
        "Human nature modification"
      ],
      questions: [
        "Should consciousness enhancement be a human right?",
        "What happens to unenhanced humans?",
        "How do we preserve human dignity?",
        "Is natural consciousness still valid?"
      ],
      gradient: "from-cyan-500/20 to-purple-500/20"
    }
  ];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-xs font-extralight tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Speculative Futures
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extralight text-[var(--text-primary)] mb-6">
            What worlds are we creating?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Four critical scenarios exploring potential futures of consciousness technology
          </motion.p>
        </motion.div>

        {/* Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-white/5" />

          <div className="space-y-16">
            {visions.map((vision, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={cn(
                  "relative flex items-center",
                  index % 2 === 0 ? "justify-start" : "justify-end"
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white/20 border-2 border-white/40 z-10" />

                {/* Content card */}
                <div
                  onClick={() => setActiveVision(activeVision === index ? null : index)}
                  className={cn(
                    "relative p-8 rounded-3xl cursor-pointer transition-all duration-500 border max-w-md",
                    index % 2 === 0 ? "mr-auto pr-16" : "ml-auto pl-16",
                    activeVision === index
                      ? "bg-white/[0.03] border-white/15"
                      : "bg-white/[0.01] border-white/8 hover:bg-white/[0.02] hover:border-white/12"
                  )}
                >
                  {/* Gradient overlay */}
                  <div className={cn(
                    "absolute inset-0 rounded-3xl opacity-30",
                    `bg-gradient-to-br ${vision.gradient}`
                  )} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-extralight text-[var(--text-muted)] uppercase tracking-wider">
                        {vision.timeframe}
                      </span>
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 text-[var(--text-muted)] transition-transform duration-300",
                          activeVision === index ? "rotate-90" : ""
                        )}
                      />
                    </div>

                    <h3 className="text-xl font-extralight text-[var(--text-primary)] mb-3">
                      {vision.title}
                    </h3>

                    <p className="text-lg text-[var(--text-secondary)] italic mb-4">
                      "{vision.scenario}"
                    </p>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {vision.description}
                    </p>

                    <AnimatePresence>
                      {activeVision === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mt-6 pt-6 border-t border-[var(--border-primary)] space-y-6"
                        >
                          {/* Implications */}
                          <div>
                            <h4 className="text-sm font-extralight text-[var(--text-muted)] mb-3 tracking-wide uppercase">
                              Potential Implications
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {vision.implications.map((implication, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                                  <span className="text-xs text-[var(--text-secondary)]">{implication}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Critical Questions */}
                          <div>
                            <h4 className="text-sm font-extralight text-[var(--text-muted)] mb-3 tracking-wide uppercase">
                              Critical Questions
                            </h4>
                            <div className="space-y-2">
                              {vision.questions.map((question, i) => (
                                <motion.p
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 + 0.2 }}
                                  className="text-xs text-[var(--text-secondary)] italic"
                                >
                                  "{question}"
                                </motion.p>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Central Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center p-8 rounded-3xl bg-white/[0.01] border border-white/8"
        >
          <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-4">
            The Future is Not Inevitable
          </h3>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            These scenarios are not predictions but provocations. By questioning what might be,
            we can shape what should be. The choices we make today about consciousness technology
            will determine tomorrow's reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Interface Speculation Section: Phone mockup with privacy-first design concepts
const InterfaceSpeculationSection = () => {
  const [activeScreen, setActiveScreen] = useState("privacy");
  const [isPhoneRotated, setIsPhoneRotated] = useState(false);

  const screens = [
    {
      id: "privacy",
      title: "Privacy Shield",
      description: "What if privacy was the default?",
      content: {
        header: "Mental Sovereignty",
        features: [
          "Zero data retention",
          "Local processing only",
          "Revocable permissions",
          "Consciousness encryption"
        ],
        warning: "Your dreams remain yours"
      }
    },
    {
      id: "consent",
      title: "Dynamic Consent",
      description: "How would unconscious consent work?",
      content: {
        header: "Sleep Permissions",
        features: [
          "Pre-sleep authorization",
          "Wake interruption protocols",
          "Memory formation controls",
          "Emergency override options"
        ],
        warning: "Consciousness boundaries respected"
      }
    },
    {
      id: "interface",
      title: "Minimal Interface",
      description: "What if complexity was hidden?",
      content: {
        header: "Dream Navigator",
        features: [
          "Question-based guidance",
          "Narrative preservation",
          "Context-aware prompts",
          "Mystery maintenance"
        ],
        warning: "Technology serves consciousness"
      }
    },
    {
      id: "ethics",
      title: "Ethical Framework",
      description: "How do we preserve human dignity?",
      content: {
        header: "Human-Centered",
        features: [
          "Dignity preservation",
          "Autonomy protection",
          "Wonder conservation",
          "Choice empowerment"
        ],
        warning: "Humanity first, technology second"
      }
    }
  ];

  const currentScreen = screens.find(s => s.id === activeScreen) || screens[0];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-cyan-950/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-xs font-extralight tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Interface Speculation
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extralight text-[var(--text-primary)] mb-6">
            How do we interface with consciousness ethically?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            A speculative mobile interface prioritizing privacy, consent, and human dignity
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Interface Controls */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-6">
                Privacy-First Design Principles
              </h3>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                Unlike current data-hungry platforms, this speculative interface asks:
                What if technology served consciousness rather than exploiting it?
              </p>
            </div>

            {/* Screen Selection */}
            <div className="space-y-4">
              {screens.map((screen, index) => (
                <motion.button
                  key={screen.id}
                  onClick={() => setActiveScreen(screen.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "w-full text-left p-6 rounded-2xl transition-all duration-300 border group",
                    activeScreen === screen.id
                      ? "bg-white/[0.03] border-white/20"
                      : "bg-white/[0.01] border-white/8 hover:bg-white/[0.02] hover:border-white/15"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-extralight text-[var(--text-primary)]">{screen.title}</h4>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 text-[var(--text-muted)] transition-transform duration-300",
                        activeScreen === screen.id ? "rotate-90" : ""
                      )}
                    />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] italic">"{screen.description}"</p>
                </motion.button>
              ))}
            </div>

            {/* Phone Rotation Control */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-white/[0.01] border border-white/8"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">3D Phone View</span>
                <button
                  onClick={() => setIsPhoneRotated(!isPhoneRotated)}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/20 text-[var(--text-secondary)] hover:bg-white/10 transition-all duration-300 text-sm"
                >
                  {isPhoneRotated ? "Front View" : "3D View"}
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{
                rotateY: isPhoneRotated ? 25 : 0,
                rotateX: isPhoneRotated ? -10 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative"
              style={{ perspective: 1000 }}
            >
              {/* Phone Frame */}
              <div className="relative w-72 h-[600px] rounded-[3rem] bg-gradient-to-b from-white/10 via-white/5 to-white/10 border border-white/20 p-4 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full rounded-[2.5rem] bg-black border border-white/10 overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-between px-6 md:px-8 lg:px-12 z-10">
                    <span className="text-xs text-[var(--text-secondary)]">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-white/60 rounded-full" />
                      <div className="w-1 h-1 bg-white/60 rounded-full" />
                      <div className="w-1 h-1 bg-white/40 rounded-full" />
                    </div>
                  </div>

                  {/* Screen Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 pt-16 pb-8 px-6 md:px-8 lg:px-12 flex flex-col"
                    >
                      {/* Header */}
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-extralight text-[var(--text-primary)] mb-2">
                          {currentScreen.content.header}
                        </h3>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
                      </div>

                      {/* Features List */}
                      <div className="flex-1 space-y-6">
                        {currentScreen.content.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10"
                          >
                            <div className="w-2 h-2 bg-green-400 rounded-full opacity-80" />
                            <span className="text-sm text-[var(--text-secondary)] font-extralight">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer Warning */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 p-4 rounded-2xl bg-white/[0.01] border border-white/5 text-center"
                      >
                        <Shield className="w-5 h-5 text-[var(--text-muted)] mx-auto mb-2" />
                        <p className="text-xs text-[var(--text-secondary)] italic">
                          {currentScreen.content.warning}
                        </p>
                      </motion.div>

                      {/* Floating Particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/20 rounded-full"
                          animate={{
                            x: [0, Math.sin(i * 60 * Math.PI / 180) * 30, 0],
                            y: [0, Math.cos(i * 60 * Math.PI / 180) * 30, 0],
                            opacity: [0.2, 0.8, 0.2]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                          }}
                          style={{
                            left: `${30 + i * 20}%`,
                            top: `${40 + i * 10}%`
                          }}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Phone Reflection */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 pointer-events-none" />
              </div>

              {/* Phone Shadow */}
              <div className="absolute inset-0 rounded-[3rem] bg-black/20 blur-xl transform translate-y-8 -z-10" />
            </motion.div>
          </motion.div>
        </div>

        {/* Critical Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {[
            {
              question: "Should consciousness interfaces look like current apps?",
              thought: "Perhaps the familiar smartphone paradigm is wrong for consciousness technology."
            },
            {
              question: "How do we design for unconscious users?",
              thought: "Traditional UX assumptions break down when the user is asleep."
            },
            {
              question: "What if privacy was beautiful, not burdensome?",
              thought: "Privacy-first design could create more elegant, trust-worthy interfaces."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.8 }}
              className="p-6 rounded-2xl bg-white/[0.01] border border-white/8"
            >
              <h4 className="text-sm font-extralight text-[var(--text-primary)] mb-3">
                {item.question}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed">
                {item.thought}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Team Perspectives Section: Archetypal questioners exploring implications
const TeamPerspectivesSection = () => {
  const [activePersona, setActivePersona] = useState<number | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const personas = [
    {
      name: "The Ethicist",
      role: "Moral Philosophy",
      avatar: "🤔",
      concern: "Human dignity in technological advancement",
      perspective: "As we venture into consciousness technology, we must ask: What fundamental human rights are at stake? How do we preserve the sanctity of mental privacy while enabling beneficial applications?",
      questions: [
        {
          category: "Consent",
          question: "How do we obtain meaningful consent for unconscious processes?",
          implication: "Traditional consent models assume awareness and agency - assumptions that break down during sleep."
        },
        {
          category: "Autonomy",
          question: "Should consciousness enhancement be a personal choice or regulated?",
          implication: "Individual freedom versus societal protection creates complex ethical tensions."
        },
        {
          category: "Dignity",
          question: "What happens to human dignity when thoughts become commodities?",
          implication: "The commercialization of consciousness could fundamentally alter human worth."
        },
        {
          category: "Justice",
          question: "How do we prevent consciousness technology from increasing inequality?",
          implication: "Cognitive enhancement could create new forms of social stratification."
        }
      ],
      icon: Heart,
      gradient: "from-pink-500/20 to-red-500/20"
    },
    {
      name: "The Technologist",
      role: "System Architecture",
      avatar: "⚡",
      concern: "Technical feasibility and implementation challenges",
      perspective: "The engineering questions are as complex as the ethical ones. How do we build systems that respect human consciousness while delivering meaningful functionality?",
      questions: [
        {
          category: "Privacy",
          question: "How do we process consciousness data without storing it?",
          implication: "Technical privacy requires fundamentally different architectures than current systems."
        },
        {
          category: "Security",
          question: "How do we protect mental data from breaches or attacks?",
          implication: "Consciousness security failures could have unprecedented personal consequences."
        },
        {
          category: "Accuracy",
          question: "How do we validate the accuracy of consciousness interpretations?",
          implication: "Misinterpretation of mental states could lead to harmful decisions or treatments."
        },
        {
          category: "Interoperability",
          question: "Should consciousness interfaces be standardized across platforms?",
          implication: "Standardization versus innovation creates technical and ethical trade-offs."
        }
      ],
      icon: Zap,
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      name: "The Psychologist",
      role: "Human Behavior",
      avatar: "🧠",
      concern: "Psychological impact on human development and wellbeing",
      perspective: "Dreams and unconscious processing serve crucial psychological functions. What unintended consequences might arise from technological intervention in these natural processes?",
      questions: [
        {
          category: "Development",
          question: "How might dream monitoring affect psychological development?",
          implication: "Conscious awareness of dreams could alter the unconscious processing essential for growth."
        },
        {
          category: "Authenticity",
          question: "What happens to spontaneous creativity when dreams become data?",
          implication: "Measuring creativity might paradoxically diminish its spontaneous nature."
        },
        {
          category: "Mental Health",
          question: "Could consciousness monitoring create new forms of anxiety?",
          implication: "Self-monitoring of mental states often increases psychological distress."
        },
        {
          category: "Identity",
          question: "How do external interpretations of consciousness affect self-perception?",
          implication: "Algorithmic insights into personality could shape identity in unexpected ways."
        }
      ],
      icon: Brain,
      gradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      name: "The Futurist",
      role: "Long-term Implications",
      avatar: "🔮",
      concern: "Societal transformation and unintended consequences",
      perspective: "We're not just building technology - we're potentially reshaping human consciousness itself. What world are we creating for future generations?",
      questions: [
        {
          category: "Evolution",
          question: "How might consciousness technology affect human evolution?",
          implication: "Technological augmentation could fundamentally alter the trajectory of human development."
        },
        {
          category: "Society",
          question: "What new social structures emerge around consciousness data?",
          implication: "Mental privacy could become a luxury good, creating unprecedented forms of inequality."
        },
        {
          category: "Control",
          question: "Who will control the future of human consciousness?",
          implication: "The entities that shape consciousness technology will wield unprecedented influence."
        },
        {
          category: "Reversibility",
          question: "Can we reverse course if consciousness technology proves harmful?",
          implication: "Some technological changes to human nature might be irreversible."
        }
      ],
      icon: Eye,
      gradient: "from-green-500/20 to-teal-500/20"
    }
  ];

  const toggleQuestionExpansion = (personaIndex: number, questionIndex: number) => {
    const key = personaIndex * 100 + questionIndex;
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedQuestions(newExpanded);
  };

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-xs font-extralight tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Critical Perspectives
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extralight text-[var(--text-primary)] mb-6">
            Who should shape the future of consciousness?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Four archetypal voices exploring the implications of consciousness technology
          </motion.p>
        </motion.div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {personas.map((persona, personaIndex) => (
            <motion.div
              key={personaIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: personaIndex * 0.15 }}
              className="group"
            >
              <div
                onClick={() => setActivePersona(activePersona === personaIndex ? null : personaIndex)}
                className={cn(
                  "relative p-8 rounded-3xl cursor-pointer transition-all duration-500 border",
                  activePersona === personaIndex
                    ? "bg-white/[0.03] border-white/15"
                    : "bg-white/[0.01] border-white/8 hover:bg-white/[0.02] hover:border-white/12"
                )}
              >
                {/* Gradient overlay */}
                <div className={cn(
                  "absolute inset-0 rounded-3xl opacity-20",
                  `bg-gradient-to-br ${persona.gradient}`
                )} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{persona.avatar}</div>
                      <div>
                        <h3 className="text-xl font-extralight text-[var(--text-primary)]">{persona.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">{persona.role}</p>
                      </div>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 text-[var(--text-muted)] transition-transform duration-300",
                        activePersona === personaIndex ? "rotate-90" : ""
                      )}
                    />
                  </div>

                  {/* Concern */}
                  <div className="mb-4">
                    <span className="text-xs font-extralight text-[var(--text-muted)] uppercase tracking-wider">Primary Concern</span>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{persona.concern}</p>
                  </div>

                  {/* Perspective */}
                  <p className="text-[var(--text-secondary)] leading-relaxed italic">
                    "{persona.perspective}"
                  </p>

                  {/* Expanded Questions */}
                  <AnimatePresence>
                    {activePersona === personaIndex && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-8 pt-6 border-t border-[var(--border-primary)]"
                      >
                        <h4 className="text-sm font-extralight text-[var(--text-muted)] mb-4 tracking-wide uppercase">
                          Critical Questions
                        </h4>
                        <div className="space-y-4">
                          {persona.questions.map((q, questionIndex) => (
                            <motion.div
                              key={questionIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: questionIndex * 0.1 }}
                              className="group/question"
                            >
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleQuestionExpansion(personaIndex, questionIndex);
                                }}
                                className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] cursor-pointer transition-all duration-300"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                                        {q.category}
                                      </span>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)]">"{q.question}"</p>
                                  </div>
                                  <ChevronDown
                                    className={cn(
                                      "w-4 h-4 text-[var(--text-muted)] transition-transform duration-300",
                                      expandedQuestions.has(personaIndex * 100 + questionIndex) ? "rotate-180" : ""
                                    )}
                                  />
                                </div>

                                <AnimatePresence>
                                  {expandedQuestions.has(personaIndex * 100 + questionIndex) && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="mt-3 pt-3 border-t border-white/5"
                                    >
                                      <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed">
                                        {q.implication}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Synthesis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="p-10 rounded-3xl bg-white/[0.01] border border-white/8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extralight text-[var(--text-primary)] mb-4">
              The Conversation We Need
            </h3>
            <p className="text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              These perspectives represent different facets of the same fundamental question:
              How do we develop consciousness technology that enhances rather than diminishes human flourishing?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                principle: "Ethical Foundation",
                description: "Every technical decision must be grounded in human dignity and respect for consciousness."
              },
              {
                principle: "Technical Responsibility",
                description: "Privacy, security, and accuracy must be built into the architecture, not added as an afterthought."
              },
              {
                principle: "Psychological Safety",
                description: "Mental wellbeing and natural development processes must be protected and preserved."
              },
              {
                principle: "Future Awareness",
                description: "Long-term consequences and societal impacts must guide present-day decisions."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.9 }}
                className="p-6 rounded-2xl bg-white/[0.005] border border-white/5 text-center"
              >
                <h4 className="text-sm font-extralight text-[var(--text-primary)] mb-3">
                  {item.principle}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="mt-8 pt-8 border-t border-white/5 text-center"
          >
            <p className="text-sm text-[var(--text-muted)] italic">
              "The future of consciousness technology depends not just on what we can build,
              but on whether we choose to build it wisely."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};