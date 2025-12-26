'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface TouchHighlightProps extends Omit<HTMLMotionProps<'div'>, 'onTap'> {
  children: React.ReactNode;
  onTap?: () => void;
  highlightColor?: string;
  scaleAmount?: number;
  disabled?: boolean;
}

/**
 * TouchHighlight - Provides visual feedback for touch interactions
 * Replaces hover effects with tap animations on mobile
 */
export function TouchHighlight({
  children,
  onTap,
  highlightColor = 'var(--glass-15)',
  scaleAmount = 0.98,
  disabled = false,
  style,
  ...props
}: TouchHighlightProps) {
  return (
    <motion.div
      whileTap={disabled ? undefined : {
        scale: scaleAmount,
        backgroundColor: highlightColor,
      }}
      transition={{ duration: 0.1 }}
      onTap={disabled ? undefined : onTap}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        WebkitTapHighlightColor: 'transparent',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default TouchHighlight;
