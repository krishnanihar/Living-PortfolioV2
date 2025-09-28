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

// Placeholder components for the other sections
interface ComponentProps {
  onInteract: () => void;
}

const DetailedStorySection = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="Narrative Arc" title="The Journey from Dreams to Data" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        A speculative design exploration of consciousness, technology, and the ethical implications
        of brain-computer interfaces for dream analysis.
      </p>
    </div>
  </Section>
);

const ComprehensiveScienceSection = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="Neuroscience" title="The Science of Sleep & Dreams" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        Understanding the neurological foundations that would enable dream technology.
      </p>
    </div>
  </Section>
);

const InteractiveConceptsSection = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="Core Concepts" title="Six Pillars of Dream Technology" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        The fundamental principles that guide ethical consciousness technology design.
      </p>
    </div>
  </Section>
);

const TechnicalArchitecture = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="System Architecture" title="Interactive Data Flow" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        A speculative technical architecture for privacy-first dream analysis.
      </p>
    </div>
  </Section>
);

const LivePrototypes = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="Interactive Demos" title="Experience the Interface" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        Interactive prototypes exploring different aspects of dream technology interfaces.
      </p>
    </div>
  </Section>
);

const ImmersiveVision = () => (
  <Section>
    <SectionTitle eyebrow="Speculative Futures" title="Imagining Dream Technology" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        What if we could interface with our dreams? This design fiction explores possible
        futures, ethical dilemmas, and the implications of consciousness technology.
      </p>
    </div>
  </Section>
);

const DetailedAppExperience = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="Interface Speculation" title="Imagining the Dream App" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        If dream technology existed, how would we interact with it? This conceptual interface
        explores privacy-first design principles for consciousness data.
      </p>
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
    </div>
  </Section>
);

const DreamExplorer = ({ onInteract }: ComponentProps) => (
  <Section>
    <SectionTitle eyebrow="Final Experience" title="Your Personal Dreamscape" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        An interactive experience that allows you to explore the concept of mapping dreams.
      </p>
    </div>
  </Section>
);

const TeamSection = () => (
  <Section>
    <SectionTitle eyebrow="Design Perspectives" title="Questions We're Asking" />
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-white/40 mb-12">
        This speculative project brings together different perspectives to explore
        the implications of dream technology through critical design.
      </p>
    </div>
  </Section>
);

interface FooterSectionProps {
  interactions: number;
}

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
    </div>
  </section>
);