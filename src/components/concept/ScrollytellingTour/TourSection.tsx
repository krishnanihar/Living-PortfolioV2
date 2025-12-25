'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

interface TourSectionProps {
  children: React.ReactNode;
  accentColor: string;
  index: number;
  isActive: boolean;
}

export function TourSection({ children, accentColor, index, isActive }: TourSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      style={{
        height: '100dvh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle accent glow */}
      {!prefersReducedMotion && isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${accentColor}20 0%, transparent 70%)`,
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Content container */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={isActive ? {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)'
        } : {
          opacity: 0,
          y: 40,
          filter: 'blur(8px)'
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: PREMIUM_EASE,
          delay: isActive ? 0.1 : 0
        }}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '800px',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          textAlign: 'center',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
