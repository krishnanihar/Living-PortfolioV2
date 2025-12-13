'use client';

/**
 * Promise Section - "What if art could find you?"
 *
 * Introduces the core concept with stats about the collection
 * and the personalization vision.
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { OneirosNarrativeState } from '@/hooks/useOneirosNarrativeProgress';
import { ONEIROS_ARTWORKS } from '@/data/oneiros/artworks-expanded';
import { DREAM_ROOMS, MOTIF_TAXONOMY } from '@/data/oneiros/artwork-mappings';

interface PromiseSectionProps {
  narrativeState: OneirosNarrativeState;
}

// Stats derived from actual data
const STATS = [
  {
    value: ONEIROS_ARTWORKS.length.toString(),
    label: 'Masterworks',
    description: 'In the Archive',
  },
  {
    value: Object.keys(MOTIF_TAXONOMY).length.toString(),
    label: 'Dream Themes',
    description: 'Pattern recognition',
  },
  {
    value: DREAM_ROOMS.length.toString(),
    label: 'Dream Rooms',
    description: 'Curated galleries',
  },
  {
    value: '5',
    label: 'Sleep Stages',
    description: 'Depth levels',
  },
];

function StatCard({
  stat,
  index,
  color,
}: {
  stat: typeof STATS[0];
  index: number;
  color: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{
        padding: '1.5rem',
        background: 'var(--glass-03)',
        border: '1px solid var(--text-06)',
        borderRadius: '16px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${color}08 0%, transparent 50%)`,
          pointerEvents: 'none',
        }}
      />

      <motion.p
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : { scale: 0.5 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 300,
          color,
          marginBottom: '0.25rem',
          position: 'relative',
        }}
      >
        {stat.value}
      </motion.p>
      <p
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--text-80)',
          marginBottom: '0.25rem',
          position: 'relative',
        }}
      >
        {stat.label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.75rem',
          color: 'var(--text-40)',
          position: 'relative',
        }}
      >
        {stat.description}
      </p>
    </motion.div>
  );
}

export function PromiseSection({ narrativeState }: PromiseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1000px', width: '100%' }}>
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
            The Promise
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
            What if art could find you?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-60)',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            For centuries, we've visited museums. We walk through galleries,
            choosing what to see. But what if a museum could visit you—reading
            the patterns of your dreams to curate masterworks that resonate
            with your unconscious?
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              color={narrativeState.color.primary}
            />
          ))}
        </div>

        {/* Core Concept */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Concept Card 1 */}
          <div
            style={{
              padding: '2rem',
              background: 'var(--glass-03)',
              border: '1px solid var(--text-06)',
              borderRadius: '20px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${narrativeState.color.primary}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={narrativeState.color.primary}
                strokeWidth="1.5"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '1.125rem',
                fontWeight: 500,
                color: 'var(--text-90)',
                marginBottom: '0.75rem',
              }}
            >
              Sleep-Stage Navigation
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.875rem',
                color: 'var(--text-50)',
                lineHeight: 1.6,
              }}
            >
              Descend through Wake, N1, N2, N3, and REM stages. Each depth
              reveals different galleries, different artworks, different
              questions.
            </p>
          </div>

          {/* Concept Card 2 */}
          <div
            style={{
              padding: '2rem',
              background: 'var(--glass-03)',
              border: '1px solid var(--text-06)',
              borderRadius: '20px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${narrativeState.color.secondary}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={narrativeState.color.secondary}
                strokeWidth="1.5"
              >
                <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                <path d="M4 9h16M9 4v16" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '1.125rem',
                fontWeight: 500,
                color: 'var(--text-90)',
                marginBottom: '0.75rem',
              }}
            >
              Dream-Curated Art
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.875rem',
                color: 'var(--text-50)',
                lineHeight: 1.6,
              }}
            >
              Tell us your dreams. Our pattern recognition maps your themes to
              masterworks spanning five centuries—art that speaks to your
              unconscious.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PromiseSection;
