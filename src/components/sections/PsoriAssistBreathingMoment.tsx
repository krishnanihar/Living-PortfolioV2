'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface BreathingMomentProps {
  text: string;
  color?: string;
  duration?: number;
}

export function PsoriAssistBreathingMoment({
  text,
  color = '168, 85, 247',
  duration = 3000
}: BreathingMomentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });
  const [breatheIn, setBreatheIn] = useState(true);

  // Breathing animation cycle
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setBreatheIn((prev) => !prev);
    }, duration);

    return () => clearInterval(interval);
  }, [isInView, duration]);

  return (
    <div
      ref={ref}
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView
            ? {
                opacity: breatheIn ? 0.15 : 0.05,
                scale: breatheIn ? 1.2 : 0.8,
              }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: duration / 1000,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${color}, 0.3) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: '300',
            lineHeight: '1.7',
            color: 'rgba(255, 255, 255, 0.9)',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}
        >
          {text}
        </div>

        {/* Breathing indicator dot */}
        <motion.div
          animate={{
            scale: breatheIn ? [1, 1.2, 1] : [1, 0.8, 1],
            opacity: breatheIn ? [0.5, 1, 0.5] : [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: duration / 1000,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: `rgb(${color})`,
            margin: '2rem auto 0',
            boxShadow: `0 0 20px rgba(${color}, 0.6)`,
          }}
        />
      </motion.div>
    </div>
  );
}
