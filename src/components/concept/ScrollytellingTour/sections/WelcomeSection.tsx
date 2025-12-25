'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

interface WelcomeSectionProps {
  isActive: boolean;
}

export function WelcomeSection({ isActive }: WelcomeSectionProps) {
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
        gap: '2rem',
      }}
    >
      {/* Main heading */}
      <motion.h1
        custom={0.1}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 300,
          color: 'var(--text-95)',
          fontFamily: 'var(--font-space-grotesk)',
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        Welcome to my world
      </motion.h1>

      {/* Subtext */}
      <motion.p
        custom={0.2}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-50)',
          maxWidth: '500px',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        A journey from curious tinkerer to systems thinker
      </motion.p>

      {/* Philosophy tagline */}
      <motion.div
        custom={0.3}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          marginTop: '1rem',
        }}
      >
        <span
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-40)',
            fontFamily: 'var(--font-space-grotesk)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Make
        </span>
        <span style={{ color: 'var(--text-20)' }}>·</span>
        <span
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-40)',
            fontFamily: 'var(--font-space-grotesk)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Measure
        </span>
        <span style={{ color: 'var(--text-20)' }}>·</span>
        <span
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-40)',
            fontFamily: 'var(--font-space-grotesk)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Mature
        </span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        custom={0.5}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '3rem',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-35)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={!prefersReducedMotion && isActive ? {
            y: [0, 6, 0],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={20} style={{ color: 'var(--text-35)' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
