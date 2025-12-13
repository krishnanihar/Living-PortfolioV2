'use client';

/**
 * Oneiros Narrative Layer
 *
 * The pre-game narrative experience that establishes context before
 * entering the 3D dream palace. Mirrors Latent Space's structure with
 * a three-act scroll-driven narrative.
 *
 * Act I: Seduction (0-30%) — "The Archive Welcomes You"
 * Act II: Complication (30-70%) — "Who Catalogued Your Unconscious?"
 * Act III: Resolution (70-100%) — "Descend Knowing"
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOneirosNarrativeProgress, getActDisplayName } from '@/hooks/useOneirosNarrativeProgress';
import { useDreamAnalysis } from '../context/DreamAnalysisContext';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';

// Section Components (to be created)
import { HeroSection } from './sections/HeroSection';
import { PromiseSection } from './sections/PromiseSection';
import { TaxonomySection } from './sections/TaxonomySection';
import { CollectionSection } from './sections/CollectionSection';
import { ArchiveSection } from './sections/ArchiveSection';
import { ResearchSection } from './sections/ResearchSection';
import { EthicsSection } from './sections/EthicsSection';
import { SleepStagesSection } from './sections/SleepStagesSection';
import { RoomsPreviewSection } from './sections/RoomsPreviewSection';

// Reusable components
import { BreathingMoment } from '@/components/ui/BreathingMoment';
import { LiminalDivider } from '@/components/ui/LiminalDivider';
import { NarrativeProgressIndicator } from '@/components/ui/NarrativeProgressIndicator';

// First-person narrative moments
const FIRST_PERSON_MOMENTS = {
  seduction: [
    { trigger: 0.02, text: "It's 22:47. You close your eyes. The Archive opens..." },
    { trigger: 0.12, text: "For centuries, you've visited museums. Tonight, one visits you." },
    { trigger: 0.22, text: "Your dreams have signatures. The Archive reads them." },
  ],
  complication: [
    { trigger: 0.32, text: "But wait— Who catalogued your unconscious?" },
    { trigger: 0.45, text: "Your dreams become data. Analyzed. Categorized. Stored." },
    { trigger: 0.58, text: "Can you still dream freely when you know you're being watched?" },
  ],
  resolution: [
    { trigger: 0.72, text: "Yet here you are. Choosing to descend." },
    { trigger: 0.85, text: "The Archive has shown you its nature. Will you still share your dreams?" },
    { trigger: 0.95, text: "You descend knowing..." },
  ],
};

// Ambient whispers by act
const AMBIENT_WHISPERS = {
  seduction: [
    'unprecedented insight',
    'perfect curation',
    'personalized art',
    'the archive knows',
    'dream signatures',
    'unconscious patterns',
  ],
  complication: [
    'who owns this data?',
    'neural privacy',
    'surveillance dreams',
    'commodified unconscious',
    'algorithmic bias',
    'loss of mystery',
  ],
  resolution: [
    'informed descent',
    'choose to share',
    'preserve the ineffable',
    'dream freely',
    'the palace awaits',
    'your patterns, your choice',
  ],
};

/**
 * Floating Consciousness Orb
 */
function ConsciousnessOrb({
  color,
  size,
  position,
  duration,
}: {
  color: string;
  size: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  duration: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.15, 0.25, 0.15],
        scale: [0.9, 1.1, 0.9],
        x: [0, 20, -20, 0],
        y: [0, -30, 30, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'fixed',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 1,
        ...position,
      }}
    />
  );
}

/**
 * Ambient Whisper Component
 */
function AmbientWhisper({
  text,
  isVisible,
  position,
  color,
}: {
  text: string;
  isVisible: boolean;
  position: { x: string; y: string };
  color: string;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 2 }}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.75rem',
            fontStyle: 'italic',
            color,
            letterSpacing: '0.1em',
            textTransform: 'lowercase',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * First-Person Moment Overlay
 */
function FirstPersonMoment({
  text,
  isVisible,
  color,
}: {
  text: string;
  isVisible: boolean;
  color: string;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 100,
          }}
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              fontStyle: 'italic',
              color,
              textAlign: 'center',
              maxWidth: '600px',
              padding: '0 2rem',
              lineHeight: 1.6,
            }}
          >
            {text}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Skip Narrative Button
 */
function SkipButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '0.75rem 1.5rem',
        background: 'var(--glass-05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--text-10)',
        borderRadius: '8px',
        color: 'var(--text-50)',
        fontFamily: 'var(--font-space-grotesk)',
        fontSize: '0.75rem',
        letterSpacing: '0.05em',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        zIndex: 50,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--glass-10)';
        e.currentTarget.style.color = 'var(--text-70)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--glass-05)';
        e.currentTarget.style.color = 'var(--text-50)';
      }}
    >
      Skip to Palace
    </motion.button>
  );
}

/**
 * Act Transition Component
 */
function ActTransition({
  act,
  title,
  color,
}: {
  act: 'I' | 'II' | 'III';
  title: string;
  color: string;
}) {
  return (
    <section
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.2 }}
        style={{ textAlign: 'center' }}
      >
        <motion.p
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-40)',
            marginBottom: '1rem',
          }}
        >
          Act {act}
        </motion.p>
        <motion.h2
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 300,
            color,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </motion.h2>
      </motion.div>
    </section>
  );
}

/**
 * Main Narrative Layer Component
 */
export function OneirosNarrativeLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const narrativeState = useOneirosNarrativeProgress(containerRef);
  const { setNarrativeProgress, skipNarrative, completeNarrative } = useDreamAnalysis();

  // Track active first-person moment
  const [activeFirstPerson, setActiveFirstPerson] = useState<string | null>(null);
  const [activeWhispers, setActiveWhispers] = useState<string[]>([]);

  // Sync narrative progress with context
  useEffect(() => {
    setNarrativeProgress(narrativeState.progress);

    // Complete narrative when reaching end
    if (narrativeState.progress >= 0.98) {
      completeNarrative();
    }
  }, [narrativeState.progress, setNarrativeProgress, completeNarrative]);

  // Handle first-person moments
  useEffect(() => {
    const allMoments = [
      ...FIRST_PERSON_MOMENTS.seduction,
      ...FIRST_PERSON_MOMENTS.complication,
      ...FIRST_PERSON_MOMENTS.resolution,
    ];

    // Find moment that should be active
    let currentMoment: string | null = null;
    for (const moment of allMoments) {
      if (
        narrativeState.progress >= moment.trigger &&
        narrativeState.progress < moment.trigger + 0.03
      ) {
        currentMoment = moment.text;
        break;
      }
    }

    setActiveFirstPerson(currentMoment);
  }, [narrativeState.progress]);

  // Handle ambient whispers
  useEffect(() => {
    const whispers = AMBIENT_WHISPERS[narrativeState.act];
    const whisperCount = Math.floor(narrativeState.actProgress * whispers.length);
    setActiveWhispers(whispers.slice(0, whisperCount + 1));
  }, [narrativeState.act, narrativeState.actProgress]);

  // Generate whisper positions
  const whisperPositions = [
    { x: '10%', y: '20%' },
    { x: '85%', y: '30%' },
    { x: '15%', y: '60%' },
    { x: '80%', y: '70%' },
    { x: '25%', y: '85%' },
    { x: '70%', y: '15%' },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
      }}
    >
      {/* Navigation */}
      <PortfolioNavigation />

      {/* Background Orbs */}
      <ConsciousnessOrb
        color={narrativeState.color.primary}
        size={400}
        position={{ top: '10%', left: '5%' }}
        duration={20}
      />
      <ConsciousnessOrb
        color={narrativeState.color.secondary}
        size={300}
        position={{ top: '60%', right: '10%' }}
        duration={25}
      />
      <ConsciousnessOrb
        color={narrativeState.color.primary}
        size={350}
        position={{ bottom: '20%', left: '50%' }}
        duration={18}
      />

      {/* Ambient Whispers */}
      {activeWhispers.map((whisper, index) => (
        <AmbientWhisper
          key={whisper}
          text={whisper}
          isVisible={true}
          position={whisperPositions[index % whisperPositions.length]}
          color={narrativeState.color.primary}
        />
      ))}

      {/* First-Person Moment Overlay */}
      <FirstPersonMoment
        text={activeFirstPerson || ''}
        isVisible={!!activeFirstPerson}
        color={narrativeState.color.primary}
      />

      {/* Narrative Progress Indicator (Desktop) */}
      <div
        style={{
          position: 'fixed',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          display: 'none', // Hidden on mobile
        }}
        className="hidden lg:block"
      >
        <NarrativeProgressIndicator />
      </div>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* ============================================ */}
        {/* ACT I: SEDUCTION - "The Archive Welcomes You" */}
        {/* ============================================ */}

        {/* 1. Hero Section */}
        <HeroSection narrativeState={narrativeState} />

        <LiminalDivider type="fog" />

        {/* 2. The Promise */}
        <PromiseSection narrativeState={narrativeState} />

        <LiminalDivider type="shimmer" />

        {/* 3. Dream Taxonomy */}
        <TaxonomySection narrativeState={narrativeState} />

        <LiminalDivider type="fog" />

        {/* 4. The Collection */}
        <CollectionSection narrativeState={narrativeState} />

        {/* ================================================ */}
        {/* ACT II: COMPLICATION - "Who Catalogued Your Unconscious?" */}
        {/* ================================================ */}

        {/* Act Transition */}
        <ActTransition
          act="II"
          title="Who Catalogued Your Unconscious?"
          color={narrativeState.color.primary}
        />

        {/* 5. The Archive Revealed */}
        <ArchiveSection narrativeState={narrativeState} />

        <LiminalDivider type="void" />

        {/* 6. Surveillance Dreams (Research) */}
        <ResearchSection narrativeState={narrativeState} />

        <LiminalDivider type="shimmer" />

        {/* 7. Ethical Framework */}
        <EthicsSection narrativeState={narrativeState} />

        <LiminalDivider type="void" />

        {/* 8. The Question */}
        <BreathingMoment
          quote="Can you still dream freely when you know you're being watched?"
          type="question"
          minHeight="50vh"
        />

        {/* ============================================ */}
        {/* ACT III: RESOLUTION - "Descend Knowing" */}
        {/* ============================================ */}

        {/* Act Transition */}
        <ActTransition
          act="III"
          title="Descend Knowing"
          color={narrativeState.color.primary}
        />

        {/* 9. Sleep Stages */}
        <SleepStagesSection narrativeState={narrativeState} />

        <LiminalDivider type="shimmer" />

        {/* 10. The Nine Rooms */}
        <RoomsPreviewSection narrativeState={narrativeState} />

        {/* Dream Input will be embedded here in the scroll */}
        {/* This triggers transition to 3D experience */}
      </main>

      {/* Skip Button */}
      <SkipButton onClick={skipNarrative} />
    </div>
  );
}

export default OneirosNarrativeLayer;
