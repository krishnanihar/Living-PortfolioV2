'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { createMorphingTextVariants, springConfigs, easings } from '@/lib/animations';
import { prefersReducedMotion, cn } from '@/lib/utils';

interface MorphingTextProps {
  texts: string[];
  className?: string;
  duration?: number;
  pauseDuration?: number;
  direction?: 'up' | 'down' | 'fade' | 'scale';
  loop?: boolean;
  trigger?: 'auto' | 'hover' | 'manual';
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  morphingEffect?: 'smooth' | 'elastic' | 'liquid';
  staggerLetters?: boolean;
}

interface MorphingLetterProps {
  letter: string;
  index: number;
  isVisible: boolean;
  delay: number;
}

function MorphingLetter({ letter, index, isVisible, delay }: MorphingLetterProps) {
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: easings.premium,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      rotateX: 90,
      transition: {
        duration: 0.3,
        ease: easings.premium,
      },
    },
  };

  return (
    <motion.span
      variants={letterVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      exit="exit"
      className="inline-block will-change-transform"
      style={{
        transformOrigin: 'center bottom',
        perspective: '1000px',
      }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  );
}

export function MorphingText({
  texts,
  className = '',
  duration = 3000,
  pauseDuration = 1000,
  direction = 'up',
  loop = true,
  trigger = 'auto',
  currentIndex: controlledIndex,
  onIndexChange,
  morphingEffect = 'smooth',
  staggerLetters = false,
}: MorphingTextProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const isControlled = controlledIndex !== undefined;
  const currentText = texts[currentIndex] || '';

  // Motion values for morphing effects
  const morphProgress = useMotionValue(0);
  const skewX = useTransform(morphProgress, [0, 0.5, 1], [0, 2, 0]);
  const scaleX = useTransform(morphProgress, [0, 0.5, 1], [1, 1.02, 1]);

  // Variants for different morphing effects
  const variants = useMemo(() => {
    const baseVariants = createMorphingTextVariants(texts);

    switch (morphingEffect) {
      case 'elastic':
        return {
          ...baseVariants,
          animate: {
            ...baseVariants[`state${currentIndex}`],
            transition: {
              ...baseVariants[`state${currentIndex}`].transition,
              type: 'spring',
              stiffness: 200,
              damping: 12,
            },
          },
        };

      case 'liquid':
        return {
          ...baseVariants,
          animate: {
            ...baseVariants[`state${currentIndex}`],
            transition: {
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            },
          },
        };

      default:
        return baseVariants;
    }
  }, [texts, currentIndex, morphingEffect]);

  // Direction-specific animation variants
  const directionVariants = useMemo(() => {
    switch (direction) {
      case 'down':
        return {
          initial: { opacity: 0, y: -30 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 30 },
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.2 },
        };
      default: // 'up'
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -30 },
        };
    }
  }, [direction]);

  // Auto-advance logic
  useEffect(() => {
    if (trigger !== 'auto' || !loop || isControlled || prefersReducedMotion()) return;

    const advance = () => {
      setInternalIndex((prev) => {
        const next = (prev + 1) % texts.length;
        onIndexChange?.(next);
        return next;
      });
    };

    const startInterval = () => {
      intervalRef.current = setInterval(advance, duration + pauseDuration);
    };

    // Start with initial delay
    const timeoutId = setTimeout(startInterval, duration);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [texts.length, duration, pauseDuration, trigger, loop, isControlled, onIndexChange]);

  // Hover control
  useEffect(() => {
    if (trigger !== 'hover') return;

    const advance = () => {
      if (isHovered) {
        setInternalIndex((prev) => {
          const next = (prev + 1) % texts.length;
          onIndexChange?.(next);
          return next;
        });
      }
    };

    if (isHovered) {
      const timeoutId = setTimeout(advance, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isHovered, texts.length, trigger, onIndexChange]);

  // Handle hover events
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (morphingEffect === 'liquid') {
      morphProgress.set(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    morphProgress.set(0);
  };

  // For reduced motion, show static text
  if (prefersReducedMotion()) {
    return <div className={cn('', className)}>{currentText}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        {staggerLetters ? (
          // Letter-by-letter staggered animation
          <motion.div
            key={currentIndex}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex"
            style={{
              skewX: morphingEffect === 'liquid' ? skewX : 0,
              scaleX: morphingEffect === 'liquid' ? scaleX : 1,
            }}
          >
            {currentText.split('').map((letter, letterIndex) => (
              <MorphingLetter
                key={`${currentIndex}-${letterIndex}`}
                letter={letter}
                index={letterIndex}
                isVisible={true}
                delay={letterIndex * 0.05}
              />
            ))}
          </motion.div>
        ) : (
          // Standard text morphing
          <motion.div
            key={currentIndex}
            variants={directionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.6,
              ease: easings.premium,
            }}
            className="whitespace-nowrap"
            style={{
              skewX: morphingEffect === 'liquid' ? skewX : 0,
              scaleX: morphingEffect === 'liquid' ? scaleX : 1,
            }}
          >
            {currentText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional indicator dots */}
      {texts.length > 1 && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {texts.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-white/80 scale-110'
                  : 'bg-white/20 hover:bg-white/40'
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const MorphingTextPresets = {
  heroTagline: {
    duration: 3000,
    pauseDuration: 1000,
    direction: 'up' as const,
    morphingEffect: 'smooth' as const,
    staggerLetters: false,
  },
  skillHighlight: {
    duration: 2000,
    pauseDuration: 500,
    direction: 'fade' as const,
    morphingEffect: 'elastic' as const,
    staggerLetters: true,
  },
  dynamicTitle: {
    duration: 4000,
    pauseDuration: 1500,
    direction: 'scale' as const,
    morphingEffect: 'liquid' as const,
    staggerLetters: false,
    trigger: 'hover' as const,
  },
} as const;