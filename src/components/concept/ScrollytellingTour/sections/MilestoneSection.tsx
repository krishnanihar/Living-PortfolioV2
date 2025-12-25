'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export interface MilestoneData {
  year: string;
  title: string;
  quote: string;
  description: string;
  accentColor: string;
}

interface MilestoneSectionProps {
  milestone: MilestoneData;
  isActive: boolean;
}

export function MilestoneSection({ milestone, isActive }: MilestoneSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const contentVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: PREMIUM_EASE,
      },
    }),
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      {/* Year badge */}
      <motion.div
        custom={0.1}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          padding: '0.5rem 1.25rem',
          background: `${milestone.accentColor}15`,
          border: `1px solid ${milestone.accentColor}30`,
          borderRadius: '100px',
        }}
      >
        <span
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: milestone.accentColor,
            fontFamily: 'var(--font-space-grotesk)',
            letterSpacing: '0.05em',
          }}
        >
          {milestone.year}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        custom={0.2}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 300,
          color: 'var(--text-95)',
          fontFamily: 'var(--font-space-grotesk)',
          margin: 0,
        }}
      >
        {milestone.title}
      </motion.h2>

      {/* Quote - Glass panel */}
      <motion.div
        custom={0.3}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          background: 'var(--glass-03)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid var(--text-08)',
          borderRadius: '20px',
          maxWidth: '600px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 var(--glass-10),
            0 0 0 1px ${milestone.accentColor}08
          `,
        }}
      >
        <p
          style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
            fontStyle: 'italic',
            color: 'var(--text-80)',
            lineHeight: 1.6,
            margin: 0,
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: '-0.5rem',
              top: '-0.25rem',
              fontSize: '2rem',
              color: milestone.accentColor,
              opacity: 0.4,
              fontFamily: 'Georgia, serif',
            }}
          >
            "
          </span>
          {milestone.quote}
          <span
            style={{
              fontSize: '2rem',
              color: milestone.accentColor,
              opacity: 0.4,
              fontFamily: 'Georgia, serif',
              marginLeft: '0.25rem',
            }}
          >
            "
          </span>
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        custom={0.4}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
          color: 'var(--text-50)',
          maxWidth: '500px',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {milestone.description}
      </motion.p>
    </div>
  );
}

// Pre-defined milestone data
export const MILESTONES: MilestoneData[] = [
  {
    year: '2019',
    title: 'Where it began',
    quote: 'Taste is trained, not inherited',
    description: 'BFA at JNAFAU — Traditional art education as the foundation for systematic design thinking',
    accentColor: '#3B82F6',
  },
  {
    year: '2022-23',
    title: 'Systems thinking',
    quote: 'Design the system that designs the screen',
    description: 'NID Masters in New Media — Moving from pixels to patterns, from screens to systems',
    accentColor: '#EC4899',
  },
  {
    year: '2024',
    title: 'Scale and stakes',
    quote: 'In high-stakes contexts, clarity beats novelty',
    description: 'Air India DesignLAB — Designing for millions at 40,000 feet, where every decision matters',
    accentColor: '#DA0E29',
  },
];
