'use client';

/**
 * Oneiros Transition Section
 *
 * The "From Concept to Experience" portal that bridges the scroll narrative
 * to the 3D Oneiros Palace experience. Appears after Interface Speculation
 * in Act III (Resolution).
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Eye, ChevronDown } from 'lucide-react';
import { useUnifiedNarrative } from '@/hooks/useUnifiedNarrativeContext';

export function OneirosTransitionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  const { transitionTo3D, state } = useUnifiedNarrative();

  return (
    <section
      ref={sectionRef}
      id="oneiros-transition"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '6rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0.1, 0.4, 0.1],
            y: [0, -50, 0],
            x: [0, Math.sin(i * 0.5) * 30, 0],
          } : { opacity: 0 }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          style={{
            position: 'absolute',
            width: 3 + Math.random() * 6,
            height: 3 + Math.random() * 6,
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.6)',
            filter: 'blur(1px)',
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1 }}
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          maxWidth: '700px',
        }}
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--glass-05)',
            border: '1px solid var(--text-10)',
            borderRadius: '9999px',
            marginBottom: '2rem',
          }}
        >
          <Sparkles size={16} style={{ color: '#8B5CF6' }} />
          <span
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-60)',
              fontFamily: 'var(--font-space-grotesk)',
            }}
          >
            Act III: Resolution
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 300,
            fontFamily: 'var(--font-space-grotesk)',
            color: 'var(--text-95)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}
        >
          From Concept to{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Experience
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            color: 'var(--text-60)',
            fontFamily: 'var(--font-dm-sans)',
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}
        >
          You&apos;ve explored the questions. You&apos;ve seen the concept sketches.
          Now, experience what a personalized dream archive might feel like.
        </motion.p>

        {/* Enter Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={transitionTo3D}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.25rem 2.5rem',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            border: 'none',
            borderRadius: '16px',
            color: '#fff',
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.3)';
          }}
        >
          <Eye size={20} />
          Enter the Oneiros Palace
        </motion.button>

        {/* Skip Option */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: '2rem',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.875rem',
            color: 'var(--text-40)',
          }}
        >
          or{' '}
          <a
            href="#six-pillars"
            style={{
              color: 'var(--text-60)',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            continue reading
          </a>
        </motion.p>

        {/* What to expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            marginTop: '4rem',
            padding: '2rem',
            background: 'var(--glass-03)',
            border: '1px solid var(--text-06)',
            borderRadius: '16px',
            textAlign: 'left',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-70)',
              marginBottom: '1rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            What to expect
          </h3>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {[
              'Describe your dreams — the AI will analyze patterns',
              'Walk through a personalized gallery of masterworks',
              'Each artwork chosen based on your dream themes',
              'First-person exploration with WASD controls',
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.9375rem',
                  color: 'var(--text-60)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#8B5CF6',
                    marginTop: '0.5rem',
                    flexShrink: 0,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} style={{ color: 'var(--text-30)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default OneirosTransitionSection;
