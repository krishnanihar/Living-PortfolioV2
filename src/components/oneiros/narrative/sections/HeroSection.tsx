'use client';

/**
 * Hero Section - Oneiros Palace Narrative
 *
 * Opening section with mystical introduction, floating art fragments,
 * and gradient text. Sets the tone for the dream museum experience.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { OneirosNarrativeState } from '@/hooks/useOneirosNarrativeProgress';

interface HeroSectionProps {
  narrativeState: OneirosNarrativeState;
}

export function HeroSection({ narrativeState }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

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
        overflow: 'hidden',
      }}
    >
      {/* Background Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${narrativeState.color.atmosphere} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <motion.div
        style={{ opacity, y, scale }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'var(--glass-05)',
              border: '1px solid var(--text-10)',
              borderRadius: '9999px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: narrativeState.color.primary,
                boxShadow: `0 0 12px ${narrativeState.color.primary}`,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-60)',
              }}
            >
              Case Study
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 300,
            textAlign: 'center',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: '1.5rem',
            background: `linear-gradient(135deg, ${narrativeState.color.primary}, ${narrativeState.color.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Oneiros Palace
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: 'var(--font-urbanist)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-60)',
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: 1.6,
            marginBottom: '3rem',
          }}
        >
          A 3D dream museum where art finds you.
          <br />
          Navigate galleries curated from your unconscious.
        </motion.p>

        {/* Core Question */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            padding: '1.5rem 2rem',
            background: 'var(--glass-03)',
            border: '1px solid var(--text-08)',
            borderRadius: '16px',
            maxWidth: '640px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
              fontStyle: 'italic',
              color: 'var(--text-70)',
              lineHeight: 1.7,
            }}
          >
            "What if a museum could read your dreams and curate masterworks
            that resonate with patterns in your unconscious—while you sleep?"
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: '0.625rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-30)',
            }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '24px',
              height: '40px',
              border: '2px solid var(--text-20)',
              borderRadius: '12px',
              position: 'relative',
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                background: narrativeState.color.primary,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
