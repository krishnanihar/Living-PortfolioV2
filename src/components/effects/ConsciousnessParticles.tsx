'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNarrativeProgress } from '@/hooks/useNarrativeProgress';

/**
 * CSS-based particle orbs for environmental storytelling
 * Lightweight alternative to canvas-based particle system
 * Responds to narrative progression with color and animation changes
 */
export function ConsciousnessOrbs({ count = 5 }: { count?: number }) {
  const narrativeState = useNarrativeProgress();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${(i * 25 + 10) % 100}%`,
            left: `${(i * 37 + 15) % 100}%`,
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${narrativeState.color.primary.replace('0.8', '0.3')}, transparent)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, Math.sin(i * 0.5) * 100, 0],
            y: [0, Math.cos(i * 0.7) * 80, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
