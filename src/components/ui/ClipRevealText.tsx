'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ClipRevealTextProps {
  text: string;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  duration?: number;
  delay?: number;
  enableMagneticWords?: boolean;
}

/**
 * ClipRevealText - Elegant curtain reveal animation using clip-path
 * Features:
 * - Smooth directional wipe reveal (left, right, top, bottom)
 * - GPU-accelerated clip-path animation
 * - Optional magnetic word interaction on hover
 * - Intersection observer trigger for scroll-based reveals
 */
export function ClipRevealText({
  text,
  className = '',
  direction = 'left',
  duration = 0.8,
  delay = 0,
  enableMagneticWords = true,
}: ClipRevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  // Generate clip-path values based on direction
  const getClipPath = (progress: number) => {
    switch (direction) {
      case 'left':
        return `inset(0 ${100 - progress * 100}% 0 0)`;
      case 'right':
        return `inset(0 0 0 ${100 - progress * 100}%)`;
      case 'top':
        return `inset(${100 - progress * 100}% 0 0 0)`;
      case 'bottom':
        return `inset(0 0 ${100 - progress * 100}% 0)`;
      default:
        return `inset(0 ${100 - progress * 100}% 0 0)`;
    }
  };

  const words = text.split(' ');

  if (enableMagneticWords) {
    return (
      <motion.span
        ref={containerRef}
        className={className}
        style={{
          display: 'inline-block',
        }}
        initial={{ clipPath: getClipPath(0) }}
        animate={isInView ? { clipPath: getClipPath(1) } : {}}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1], // Premium easing
        }}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            style={{
              display: 'inline-block',
              marginRight: '0.25em',
            }}
            onMouseEnter={() => setHoveredWordIndex(index)}
            onMouseLeave={() => setHoveredWordIndex(null)}
            animate={
              hoveredWordIndex === index
                ? {
                    y: -3,
                    color: 'rgba(255, 255, 255, 1)',
                    transition: { duration: 0.2 },
                  }
                : {
                    y: 0,
                    color: 'rgba(255, 255, 255, 0.8)',
                    transition: { duration: 0.2 },
                  }
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Simple version without magnetic words
  return (
    <motion.span
      ref={containerRef}
      className={className}
      style={{
        display: 'inline-block',
      }}
      initial={{ clipPath: getClipPath(0) }}
      animate={isInView ? { clipPath: getClipPath(1) } : {}}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {text}
    </motion.span>
  );
}

export default ClipRevealText;
