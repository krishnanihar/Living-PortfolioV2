'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNarrativeProgress } from '@/hooks/useNarrativeProgress';
import { useTheme } from '@/components/effects/ThemeProvider';

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
  minHeight = '40vh',
}: BreathingMomentProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { margin: '-20%' });
  const narrativeState = useNarrativeProgress();
  const { resolvedTheme } = useTheme();

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
        padding: '2rem 1.5rem',
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
              color: resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
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
                color: resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
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
  const { resolvedTheme } = useTheme();

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
          background: resolvedTheme === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.02)',
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
            color: resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
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
 * Immersive portal between narrative acts with sophisticated glassmorphism
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
  const { resolvedTheme } = useTheme();

  const getActColor = (act: string) => {
    switch (act) {
      // Latent Space acts
      case 'seduction':
        return 'rgba(147, 51, 234, 0.8)';
      case 'complication':
        return 'rgba(218, 14, 41, 0.8)';
      case 'resolution':
        return 'rgba(14, 165, 233, 0.8)';
      // Home page acts
      case 'arrival':
        return 'rgba(147, 51, 234, 0.8)'; // Purple - curiosity
      case 'philosophy':
        return 'rgba(218, 14, 41, 0.8)'; // Red - conviction
      case 'catalog':
        return 'rgba(14, 165, 233, 0.8)'; // Blue - invitation
      default:
        return 'rgba(255, 255, 255, 0.8)';
    }
  };

  const fromColor = getActColor(fromAct);
  const toColor = getActColor(toAct);

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
      {/* Atmospheric radial fog background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          inset: '-20%',
          background: `radial-gradient(ellipse at 50% 50%,
            ${fromColor.replace('0.8', '0.04')} 0%,
            ${toColor.replace('0.8', '0.03')} 40%,
            ${toColor.replace('0.8', '0.02')} 70%,
            transparent 100%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Pulsing ambient glow */}
      <motion.div
        animate={
          isInView
            ? {
                opacity: [0.15, 0.35, 0.15],
                scale: [0.9, 1.1, 0.9],
              }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${fromColor.replace('0.8', '0.2')}, ${toColor.replace('0.8', '0.1')}, transparent)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating particles */}
      {isInView &&
        [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              y: [Math.random() * -30, Math.random() * 30, Math.random() * -30],
              x: [Math.random() * -20, Math.random() * 20, Math.random() * -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: i % 3 === 0 ? '6px' : '4px',
              height: i % 3 === 0 ? '6px' : '4px',
              background: i % 2 === 0 ? fromColor : toColor,
              borderRadius: '50%',
              filter: 'blur(1px)',
              boxShadow: `0 0 ${i % 3 === 0 ? '20px' : '12px'} ${i % 2 === 0 ? fromColor.replace('0.8', '0.6') : toColor.replace('0.8', '0.6')}`,
              left: `${15 + i * 10}%`,
              top: `${30 + (i % 4) * 15}%`,
              pointerEvents: 'none',
            }}
          />
        ))}

      {/* Glass container card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          background: resolvedTheme === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(10, 10, 10, 0.75)',
          backdropFilter: 'blur(60px) saturate(180%) brightness(0.95)',
          WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(0.95)',
          borderRadius: '32px',
          border: resolvedTheme === 'light' ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.06)',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)',
          boxShadow: resolvedTheme === 'light'
            ? `
              0 30px 60px rgba(0, 0, 0, 0.1),
              0 0 1px rgba(0, 0, 0, 0.1) inset,
              0 -2px 4px rgba(0, 0, 0, 0.06) inset,
              0 0 60px ${fromColor.replace('0.8', '0.15')},
              0 0 80px ${toColor.replace('0.8', '0.1')}
            `
            : `
              0 30px 60px rgba(0, 0, 0, 0.5),
              0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 -2px 4px rgba(255, 255, 255, 0.06) inset,
              0 0 60px ${fromColor.replace('0.8', '0.15')},
              0 0 80px ${toColor.replace('0.8', '0.1')}
            `,
          maxWidth: '900px',
          textAlign: 'center',
        }}
      >
        {/* Act label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontSize: '0.6875rem',
            fontWeight: '400',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
            marginBottom: '1.5rem',
          }}
        >
          Act Transition
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '100',
            color: resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            lineHeight: '1.1',
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
            background: `linear-gradient(135deg, ${fromColor}, ${toColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: `0 20px 40px ${fromColor.replace('0.8', '0.3')}`,
          }}
        >
          {title}
        </motion.h2>

        {/* Layered ornamental divider system */}
        <div style={{ position: 'relative', height: '20px', margin: '0 auto', maxWidth: '300px' }}>
          {/* Top glowing line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: '8px',
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg,
                transparent 0%,
                ${fromColor.replace('0.8', '0.6')} 30%,
                ${toColor.replace('0.8', '0.6')} 70%,
                transparent 100%)`,
              filter: 'blur(1px)',
              transformOrigin: 'center',
            }}
          />

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: '11px',
              left: '20%',
              right: '20%',
              height: '1px',
              background: `linear-gradient(90deg,
                transparent,
                ${fromColor.replace('0.8', '0.4')},
                ${toColor.replace('0.8', '0.4')},
                transparent)`,
              transformOrigin: 'center',
            }}
          />

          {/* Left particle endpoint */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: 'backOut' }}
            style={{
              position: 'absolute',
              left: 0,
              top: '5px',
              width: '8px',
              height: '8px',
              background: fromColor,
              borderRadius: '50%',
              boxShadow: `0 0 20px ${fromColor.replace('0.8', '0.8')}, 0 0 40px ${fromColor.replace('0.8', '0.4')}`,
              filter: 'blur(1px)',
            }}
          />

          {/* Right particle endpoint */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: 'backOut' }}
            style={{
              position: 'absolute',
              right: 0,
              top: '5px',
              width: '8px',
              height: '8px',
              background: toColor,
              borderRadius: '50%',
              boxShadow: `0 0 20px ${toColor.replace('0.8', '0.8')}, 0 0 40px ${toColor.replace('0.8', '0.4')}`,
              filter: 'blur(1px)',
            }}
          />
        </div>
      </motion.div>
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
  const { resolvedTheme } = useTheme();

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
