'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MobileStepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  onStepTap?: (step: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { dot: 6, gap: 6 },
  md: { dot: 8, gap: 8 },
  lg: { dot: 10, gap: 10 },
};

/**
 * MobileStepIndicator - Dot-based progress indicator for carousels/steps
 */
export function MobileStepIndicator({
  totalSteps,
  currentStep,
  onStepTap,
  activeColor = 'var(--text-95)',
  inactiveColor = 'var(--glass-20)',
  size = 'md',
}: MobileStepIndicatorProps) {
  const { dot, gap } = sizeMap[size];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${gap}px`,
        padding: '12px 0',
      }}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onStepTap?.(index)}
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: currentStep === index ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: `${dot}px`,
            height: `${dot}px`,
            borderRadius: '50%',
            border: 'none',
            padding: 0,
            cursor: onStepTap ? 'pointer' : 'default',
            WebkitTapHighlightColor: 'transparent',
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
          }}
          aria-label={`Step ${index + 1} of ${totalSteps}`}
          aria-current={currentStep === index ? 'step' : undefined}
        >
          <span
            style={{
              width: `${dot}px`,
              height: `${dot}px`,
              borderRadius: '50%',
              backgroundColor: currentStep === index ? activeColor : inactiveColor,
              transition: 'background-color 0.2s',
            }}
          />
        </motion.button>
      ))}
    </div>
  );
}

export default MobileStepIndicator;
