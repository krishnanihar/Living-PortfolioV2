'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SECTION_LABELS = [
  'Welcome',
  'Cleara',
  'Air India',
  'Mythos',
  'Connect',
];

const SECTION_COLORS = [
  '#8B5CF6', // Welcome - Purple
  '#10B981', // Cleara - Green
  '#DA0E29', // Air India - Red
  '#8B5CF6', // Mythos - Purple
  '#EC4899', // Connect - Pink
];

interface TourProgressProps {
  currentIndex: number;
  progress: number;
  onGoToSection: (index: number) => void;
}

export function TourProgress({ currentIndex, progress, onGoToSection }: TourProgressProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      style={{
        position: 'fixed',
        left: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {/* Progress track */}
      <div
        style={{
          position: 'relative',
          width: '3px',
          height: '200px',
          background: 'var(--glass-10)',
          borderRadius: '2px',
        }}
      >
        {/* Progress fill */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${progress * 100}%`,
            background: `linear-gradient(180deg, ${SECTION_COLORS[0]}, ${SECTION_COLORS[Math.min(currentIndex, SECTION_COLORS.length - 1)]})`,
            borderRadius: '2px',
            boxShadow: `0 0 10px ${SECTION_COLORS[currentIndex]}`,
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        />

        {/* Section markers */}
        {SECTION_LABELS.map((label, index) => {
          const isActive = currentIndex === index;
          const isPast = currentIndex > index;
          const markerPosition = (index / (SECTION_LABELS.length - 1)) * 100;

          return (
            <motion.button
              key={label}
              onClick={() => onGoToSection(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                top: `${markerPosition}%`,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isActive ? '14px' : '10px',
                height: isActive ? '14px' : '10px',
                borderRadius: '50%',
                background: isActive || isPast
                  ? SECTION_COLORS[index]
                  : 'var(--glass-20)',
                border: `2px solid ${isActive ? '#ffffff' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? `0 0 12px ${SECTION_COLORS[index]}` : 'none',
                padding: 0,
              }}
              title={label}
            />
          );
        })}

        {/* Current position indicator (glowing dot) */}
        <motion.div
          style={{
            position: 'absolute',
            top: `${progress * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: `0 0 12px ${SECTION_COLORS[currentIndex]}, 0 0 24px ${SECTION_COLORS[currentIndex]}50`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Current section label */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          marginTop: '1rem',
          padding: '0.375rem 0.75rem',
          background: 'var(--glass-05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--text-08)',
          borderRadius: '8px',
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            color: SECTION_COLORS[currentIndex],
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 500,
          }}
        >
          {SECTION_LABELS[currentIndex]}
        </span>
      </motion.div>
    </motion.div>
  );
}
