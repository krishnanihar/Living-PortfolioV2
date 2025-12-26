'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

// Orb positions for visual variety
const ORB_POSITIONS = [
  { top: '15%', left: '10%', size: '25%' },
  { bottom: '20%', right: '8%', size: '20%' },
  { top: '60%', left: '5%', size: '15%' },
];

interface TourSectionProps {
  children: React.ReactNode;
  accentColor: string;
  index: number;
  isActive: boolean;
}

export function TourSection({ children, accentColor, index, isActive }: TourSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Get orb position based on index for variety
  const primaryOrb = ORB_POSITIONS[index % ORB_POSITIONS.length];
  const secondaryOrb = ORB_POSITIONS[(index + 1) % ORB_POSITIONS.length];

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
      {/* Background gradient base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 100% 80% at 50% 20%, ${accentColor}06 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 80% 80%, ${accentColor}04 0%, transparent 40%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Primary ambient orb */}
      {!prefersReducedMotion && isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.12, 0.2, 0.12],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: primaryOrb.top,
            left: primaryOrb.left,
            bottom: primaryOrb.bottom,
            right: primaryOrb.right,
            width: primaryOrb.size,
            height: primaryOrb.size,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${accentColor}25 0%, transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Secondary floating orb */}
      {!prefersReducedMotion && isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.08, 0.15, 0.08],
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          style={{
            position: 'absolute',
            top: secondaryOrb.top,
            left: secondaryOrb.left,
            bottom: secondaryOrb.bottom,
            right: secondaryOrb.right,
            width: secondaryOrb.size,
            height: secondaryOrb.size,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${accentColor}18 0%, transparent 60%)`,
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Center glow */}
      {!prefersReducedMotion && isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.18, 0.1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: '50%',
            height: '50%',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${accentColor}15 0%, transparent 70%)`,
            filter: 'blur(100px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Subtle noise texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content container */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={isActive ? {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        } : {
          opacity: 0,
          y: 40,
          filter: 'blur(8px)',
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: PREMIUM_EASE,
          delay: isActive ? 0.1 : 0,
        }}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '900px',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          textAlign: 'center',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
