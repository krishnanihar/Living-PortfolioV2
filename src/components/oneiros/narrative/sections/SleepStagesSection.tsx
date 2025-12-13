'use client';

/**
 * Sleep Stages Section - Vertical Depth Visualization
 *
 * Interactive visualization of the five sleep stages as a
 * vertical descent, preparing users for the palace navigation.
 */

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { OneirosNarrativeState } from '@/hooks/useOneirosNarrativeProgress';
import { SLEEP_STAGES } from '@/data/oneiros/artwork-mappings';

interface SleepStagesSectionProps {
  narrativeState: OneirosNarrativeState;
}

// Extended sleep stage data for visualization
const SLEEP_STAGE_DATA = [
  {
    key: 'wake',
    label: 'Wake',
    shortLabel: 'W',
    color: '#8B5CF6',
    percentage: 5,
    description: 'The threshold of sleep. Familiar forms begin to dissolve.',
    brainwaves: 'Alpha waves (8-13 Hz)',
    duration: '~5 minutes',
  },
  {
    key: 'n1',
    label: 'N1 - Light Sleep',
    shortLabel: 'N1',
    color: '#7C3AED',
    percentage: 5,
    description: 'Drifting between consciousness. The Archive opens its doors.',
    brainwaves: 'Theta waves (4-8 Hz)',
    duration: '~5 minutes',
  },
  {
    key: 'n2',
    label: 'N2 - True Sleep',
    shortLabel: 'N2',
    color: '#3B82F6',
    percentage: 45,
    description: 'Sleep spindles emerge. The palace reveals its architecture.',
    brainwaves: 'Sleep spindles, K-complexes',
    duration: '~45% of sleep',
  },
  {
    key: 'n3',
    label: 'N3 - Deep Sleep',
    shortLabel: 'N3',
    color: '#1E40AF',
    percentage: 25,
    description: 'Slow-wave sleep. The shadows speak. Questions emerge.',
    brainwaves: 'Delta waves (0.5-4 Hz)',
    duration: '~25% of sleep',
  },
  {
    key: 'rem',
    label: 'REM - The Dreaming',
    shortLabel: 'REM',
    color: '#EC4899',
    percentage: 20,
    description: 'Rapid eye movement. Where creation happens. Dreams become vivid.',
    brainwaves: 'Mixed frequency (similar to wake)',
    duration: '~20% of sleep',
  },
];

function StageCard({
  stage,
  index,
  isSelected,
  onSelect,
}: {
  stage: typeof SLEEP_STAGE_DATA[0];
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1.25rem 1.5rem',
        background: isSelected ? `${stage.color}10` : 'transparent',
        border: `1px solid ${isSelected ? stage.color + '40' : 'transparent'}`,
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Depth indicator */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {/* Line above (except first) */}
        {index > 0 && (
          <div
            style={{
              width: '2px',
              height: '20px',
              background: `linear-gradient(to bottom, ${SLEEP_STAGE_DATA[index - 1].color}, ${stage.color})`,
              opacity: 0.3,
            }}
          />
        )}
        {/* Circle */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: `${stage.color}20`,
            border: `2px solid ${stage.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: stage.color,
          }}
        >
          {stage.shortLabel}
        </div>
        {/* Line below (except last) */}
        {index < SLEEP_STAGE_DATA.length - 1 && (
          <div
            style={{
              width: '2px',
              height: '20px',
              background: `linear-gradient(to bottom, ${stage.color}, ${SLEEP_STAGE_DATA[index + 1].color})`,
              opacity: 0.3,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '1rem',
            fontWeight: 500,
            color: isSelected ? 'var(--text-95)' : 'var(--text-75)',
            marginBottom: '0.25rem',
          }}
        >
          {stage.label}
        </h4>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.8125rem',
            color: 'var(--text-45)',
            lineHeight: 1.5,
          }}
        >
          {stage.description}
        </p>
      </div>

      {/* Percentage bar */}
      <div style={{ width: '80px' }}>
        <div
          style={{
            height: '4px',
            background: 'var(--glass-08)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${stage.percentage}%` } : { width: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            style={{
              height: '100%',
              background: stage.color,
              borderRadius: '2px',
            }}
          />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.625rem',
            color: 'var(--text-35)',
            marginTop: '0.25rem',
            textAlign: 'right',
          }}
        >
          {stage.percentage}%
        </p>
      </div>
    </motion.div>
  );
}

export function SleepStagesSection({ narrativeState }: SleepStagesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const selected = SLEEP_STAGE_DATA[selectedStage];

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '6rem 2rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: narrativeState.color.primary,
              marginBottom: '1rem',
            }}
          >
            Sleep Stages
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              color: 'var(--text-90)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Your descent through the palace
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-60)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            As you explore deeper, the palace shifts through sleep stages—each
            revealing different galleries, different moods, different questions.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1fr) 1fr',
            gap: '3rem',
          }}
        >
          {/* Stages List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {SLEEP_STAGE_DATA.map((stage, index) => (
              <StageCard
                key={stage.key}
                stage={stage}
                index={index}
                isSelected={selectedStage === index}
                onSelect={() => setSelectedStage(index)}
              />
            ))}
          </div>

          {/* Selected Stage Detail */}
          <motion.div
            key={selectedStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '2rem',
              background: `linear-gradient(135deg, ${selected.color}08 0%, transparent 100%)`,
              border: `1px solid ${selected.color}20`,
              borderRadius: '20px',
              alignSelf: 'start',
              position: 'sticky',
              top: '100px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: `${selected.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: selected.color,
                }}
              >
                {selected.shortLabel}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '1.5rem',
                fontWeight: 500,
                color: 'var(--text-90)',
                marginBottom: '0.75rem',
              }}
            >
              {selected.label}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '1rem',
                color: 'var(--text-60)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {selected.description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '0.6875rem',
                    color: 'var(--text-35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}
                >
                  Brain Activity
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-70)',
                  }}
                >
                  {selected.brainwaves}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '0.6875rem',
                    color: 'var(--text-35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}
                >
                  Duration
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-70)',
                  }}
                >
                  {selected.duration}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SleepStagesSection;
