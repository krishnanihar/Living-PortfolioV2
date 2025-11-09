'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string[];
  animationDuration?: number;
  enableVariableFont?: boolean;
  splitByLetters?: boolean;
  staggerDelay?: number;
}

/**
 * GradientText - Premium animated gradient text with variable font support
 * Features:
 * - Smooth flowing gradient animation
 * - Kinetic variable font weight on hover (Inter font)
 * - Split-text stagger reveal animation
 * - Elegant, sophisticated aesthetic
 */
export function GradientText({
  text,
  className = '',
  gradient = ['#DA0E29', '#FF6B9D', '#FFA07A', '#DA0E29'], // Brand red palette
  animationDuration = 4,
  enableVariableFont = true,
  splitByLetters = true,
  staggerDelay = 0.03,
}: GradientTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking for variable font
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position to font weight (200-400 range for elegance)
  const fontWeight = useTransform(mouseX, [0, 1], [200, 400]);
  const smoothFontWeight = useSpring(fontWeight, { stiffness: 100, damping: 15 });

  useEffect(() => {
    if (!enableVariableFont || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouseX.set(x);
      mouseY.set(y);
    };

    const element = containerRef.current;
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enableVariableFont, mouseX, mouseY]);

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
        ref={containerRef}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'inline-block',
          ...(enableVariableFont && isHovered
            ? { fontVariationSettings: `'wght' ${smoothFontWeight.get()}` }
            : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={letterVariants}
            style={{
              display: 'inline-block',
              ...gradientStyle,
              fontVariationSettings: enableVariableFont && isHovered
                ? `'wght' ${smoothFontWeight}`
                : undefined,
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
      ref={containerRef}
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
        fontVariationSettings: enableVariableFont && isHovered
          ? `'wght' ${smoothFontWeight}`
          : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </motion.span>
  );
}

export default GradientText;
