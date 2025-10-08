'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNarrativeProgress } from '@/hooks/useNarrativeProgress';

interface BreathingMomentProps {
  quote?: string;
  author?: string;
  type?: 'reflection' | 'question' | 'pause' | 'transition';
  minHeight?: string;
}

/**
 * Breathing Moments
 * Intentional pauses in the narrative that give users space to reflect
 * Essential for narrative pacing - prevents information overload
 */
export function BreathingMoment({
  quote,
  author,
  type = 'pause',
  minHeight = '60vh',
}: BreathingMomentProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { margin: '-20%' });
  const narrativeState = useNarrativeProgress();

  const getContent = () => {
    if (quote) return { text: quote, attribution: author };

    // Default content based on type
    switch (type) {
      case 'reflection':
        return {
          text: '...',
          attribution: null,
        };
      case 'question':
        return {
          text: 'What questions should we ask?',
          attribution: null,
        };
      case 'transition':
        return {
          text: '•',
          attribution: null,
        };
      default:
        return {
          text: '',
          attribution: null,
        };
    }
  };

  const content = getContent();

  return (
    <div
      ref={ref}
      style={{
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        position: 'relative',
      }}
    >
      {/* Breathing indicator */}
      {type === 'pause' && (
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: `2px solid ${narrativeState.color.primary.replace('0.8', '0.3')}`,
            pointerEvents: 'none',
          }}
        />
      )}

      {content.text && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          <p
            style={{
              fontSize: type === 'transition' ? '3rem' : 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '200',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.4',
              fontStyle: type === 'question' ? 'italic' : 'normal',
              marginBottom: content.attribution ? '1.5rem' : '0',
            }}
          >
            {content.text}
          </p>

          {content.attribution && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              — {content.attribution}
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
}

/**
 * Narrative Hook
 * Cliffhanger or question that pulls users to continue scrolling
 */
export function NarrativeHook({ question }: { question: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { margin: '-30%' });
  const narrativeState = useNarrativeProgress();

  return (
    <div
      ref={ref}
      style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '3rem 2rem',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: `1px solid ${narrativeState.color.primary.replace('0.8', '0.2')}`,
          position: 'relative',
        }}
      >
        {/* Pulsing border */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: '24px',
            background: `linear-gradient(135deg, ${narrativeState.color.primary}, ${narrativeState.color.secondary})`,
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: -1,
            filter: 'blur(10px)',
          }}
        />

        <p
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.4',
            fontStyle: 'italic',
          }}
        >
          {question}
        </p>

        {/* Scroll indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            marginTop: '2rem',
            color: narrativeState.color.primary,
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          Continue
          <span>↓</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Act Transition
 * Marks the shift between narrative acts with visual clarity
 */
export function ActTransition({
  fromAct,
  toAct,
  title,
}: {
  fromAct: string;
  toAct: string;
  title: string;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { margin: '-20%' });

  const getActColor = (act: string) => {
    switch (act) {
      case 'seduction':
        return 'rgba(147, 51, 234, 0.8)';
      case 'complication':
        return 'rgba(218, 14, 41, 0.8)';
      case 'resolution':
        return 'rgba(14, 165, 233, 0.8)';
      default:
        return 'rgba(255, 255, 255, 0.8)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient transition background */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${getActColor(fromAct)} 0%, ${getActColor(toAct)} 100%)`,
          opacity: 0.1,
          transformOrigin: 'left',
        }}
      />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Act label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontSize: '0.75rem',
            fontWeight: '500',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '2rem',
          }}
        >
          Act Transition
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '200',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1',
            marginBottom: '1.5rem',
            background: `linear-gradient(135deg, ${getActColor(fromAct)}, ${getActColor(toAct)})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {title}
        </motion.h2>

        {/* Ornamental line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '1px',
            width: '200px',
            margin: '0 auto',
            background: `linear-gradient(90deg, ${getActColor(fromAct)}, ${getActColor(toAct)})`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Contemplative Space
 * Empty space for reflection with subtle visual interest
 */
export function ContemplativeSpace({ height = '40vh' }: { height?: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { margin: '-10%' });
  const narrativeState = useNarrativeProgress();

  return (
    <div
      ref={ref}
      style={{
        height,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Single breathing orb */}
      <motion.div
        animate={
          isInView
            ? {
                scale: [0.8, 1.2, 0.8],
                opacity: [0.2, 0.4, 0.2],
              }
            : { scale: 0.8, opacity: 0 }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${narrativeState.color.primary.replace('0.8', '0.3')}, transparent)`,
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
