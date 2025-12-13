'use client';

/**
 * Oneiros Reflection Section
 *
 * The return UI after exiting the 3D Oneiros Palace experience.
 * Bridges back to the philosophical discussion with reflection prompts.
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, ArrowDown } from 'lucide-react';

const REFLECTION_QUESTIONS = [
  'What felt familiar? What felt strange?',
  'Did the art feel like it was chosen for you?',
  'Would you trust a system that knows your dreams?',
  'What boundaries would you set?',
];

export function OneirosReflectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  return (
    <section
      ref={sectionRef}
      id="oneiros-reflection"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '6rem 2rem',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

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
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 300,
            fontFamily: 'var(--font-space-grotesk)',
            color: 'var(--text-90)',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            marginBottom: '1.5rem',
          }}
        >
          You&apos;ve walked through a dream made visible.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            color: 'var(--text-50)',
            fontFamily: 'var(--font-dm-sans)',
            fontStyle: 'italic',
            lineHeight: 1.7,
            marginBottom: '4rem',
          }}
        >
          The archive watched. It learned. It curated.
          <br />
          Now we return to the questions that matter.
        </motion.p>

        {/* Reflection Questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          {REFLECTION_QUESTIONS.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              style={{
                padding: '1.5rem',
                background: 'var(--glass-03)',
                border: '1px solid var(--text-06)',
                borderRadius: '12px',
                textAlign: 'left',
              }}
            >
              <MessageSquare
                size={18}
                style={{
                  color: '#0EA5E9',
                  marginBottom: '0.75rem',
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.9375rem',
                  color: 'var(--text-70)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {question}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Transition to next section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '0.8125rem',
              color: 'var(--text-40)',
              letterSpacing: '0.05em',
            }}
          >
            Let&apos;s explore the principles that should guide this technology
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={20} style={{ color: 'var(--text-30)' }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--text-20), transparent)',
        }}
      />
    </section>
  );
}

export default OneirosReflectionSection;
