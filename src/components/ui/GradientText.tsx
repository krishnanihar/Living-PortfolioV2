'use client';

import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string[];
  animationDuration?: number;
  splitByLetters?: boolean;
  staggerDelay?: number;
}

/**
 * GradientText - Premium animated gradient text
 * Features:
 * - Smooth flowing gradient animation
 * - Split-text stagger reveal animation
 * - Elegant, sophisticated aesthetic
 */
export function GradientText({
  text,
  className = '',
  gradient = ['#DA0E29', '#FF6B9D', '#FFA07A', '#DA0E29'], // Brand red palette
  animationDuration = 4,
  splitByLetters = true,
  staggerDelay = 0.03,
}: GradientTextProps) {
  // Generate gradient CSS
  const gradientStyle = {
    background: `linear-gradient(90deg, ${gradient.join(', ')})`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: `gradient-shift ${animationDuration}s ease infinite`,
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  // Letter animation variants
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Premium easing
      },
    },
  };

  if (splitByLetters) {
    return (
      <motion.span
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'inline-block',
        }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={letterVariants}
            style={{
              display: 'inline-block',
              ...gradientStyle,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Non-split version (simpler, more performant)
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: 'inline-block',
        ...gradientStyle,
      }}
    >
      {text}
    </motion.span>
  );
}

export default GradientText;
