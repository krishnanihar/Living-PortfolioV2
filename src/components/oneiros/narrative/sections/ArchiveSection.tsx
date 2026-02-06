'use client';

/**
 * Archive Section - "Dreams as Data"
 *
 * Reveals the surveillance angle - what does it mean when
 * dreams become data that can be analyzed and stored?
 */

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { OneirosNarrativeState } from '@/hooks/useOneirosNarrativeProgress';

interface ArchiveSectionProps {
  narrativeState: OneirosNarrativeState;
}

// Data points about dream analysis
const DATA_METRICS = [
  {
    metric: '6-8 hours',
    description: 'of neural data per night',
    detail: 'Every sleep cycle generates patterns',
  },
  {
    metric: '4-6 dreams',
    description: 'remembered per night',
    detail: 'Most are forgotten by morning',
  },
  {
    metric: '~2,000',
    description: 'dream fragments annually',
    detail: 'A lifetime of unconscious material',
  },
  {
    metric: '100%',
    description: 'of people dream',
    detail: 'Whether they remember or not',
  },
];

// What analysis reveals
const ANALYSIS_REVEALS = [
  {
    title: 'Recurring Themes',
    description: 'Patterns that emerge across multiple dreams',
    icon: '○',
  },
  {
    title: 'Emotional Signatures',
    description: 'The feeling-tone that underlies your dreams',
    icon: '◇',
  },
  {
    title: 'Symbolic Language',
    description: 'Personal symbols and their frequencies',
    icon: '△',
  },
  {
    title: 'Temporal Patterns',
    description: 'When certain themes appear in your cycle',
    icon: '□',
  },
];

function MetricCard({
  metric,
  description,
  detail,
  index,
  color,
}: {
  metric: string;
  description: string;
  detail: string;
  index: number;
  color: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        padding: '1.5rem',
        background: 'var(--glass-03)',
        border: '1px solid var(--text-06)',
        borderRadius: '12px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-newsreader)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 300,
          color,
          marginBottom: '0.25rem',
        }}
      >
        {metric}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-urbanist)',
          fontSize: '0.875rem',
          color: 'var(--text-70)',
          marginBottom: '0.5rem',
        }}
      >
        {description}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-urbanist)',
          fontSize: '0.75rem',
          color: 'var(--text-40)',
          fontStyle: 'italic',
        }}
      >
        {detail}
      </p>
    </motion.div>
  );
}

function AnalysisCard({
  title,
  description,
  icon,
  index,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
  color: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1.25rem',
        background: isHovered ? 'var(--glass-05)' : 'var(--glass-02)',
        border: `1px solid ${isHovered ? color + '30' : 'var(--text-05)'}`,
        borderRadius: '12px',
        cursor: 'default',
        transition: 'all 0.3s ease',
      }}
    >
      <span
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-newsreader)',
          fontSize: '1rem',
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <h4
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: 'var(--text-85)',
            marginBottom: '0.25rem',
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontFamily: 'var(--font-urbanist)',
            fontSize: '0.8125rem',
            color: 'var(--text-50)',
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function ArchiveSection({ narrativeState }: ArchiveSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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
              fontFamily: 'var(--font-newsreader)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: narrativeState.color.primary,
              marginBottom: '1rem',
            }}
          >
            The Archive Revealed
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              color: 'var(--text-90)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Your dreams become data
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-urbanist)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-60)',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Analyzed. Categorized. Stored. The Archive reads patterns in your
            unconscious material—but what does this mean for mental privacy?
          </p>
        </motion.div>

        {/* Data Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          {DATA_METRICS.map((item, index) => (
            <MetricCard
              key={item.metric}
              {...item}
              index={index}
              color={narrativeState.color.primary}
            />
          ))}
        </div>

        {/* What Analysis Reveals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginBottom: '3rem' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: '1.125rem',
              fontWeight: 400,
              color: 'var(--text-70)',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            What the Archive sees:
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {ANALYSIS_REVEALS.map((item, index) => (
              <AnalysisCard
                key={item.title}
                {...item}
                index={index}
                color={narrativeState.color.primary}
              />
            ))}
          </div>
        </motion.div>

        {/* Warning/Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            padding: '2rem',
            background: `linear-gradient(135deg, ${narrativeState.color.primary}08 0%, transparent 100%)`,
            border: `1px solid ${narrativeState.color.primary}20`,
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: '1.125rem',
              fontStyle: 'italic',
              color: narrativeState.color.primary,
              lineHeight: 1.7,
            }}
          >
            "If a company could see your dreams, what would they sell you?"
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ArchiveSection;
