'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMagneticEffect, springConfigs } from '@/lib/animations';
import { prefersReducedMotion, cn } from '@/lib/utils';

interface MagneticTextProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  letterSpacing?: number;
  splitByLetters?: boolean;
  splitByWords?: boolean;
  staggerDelay?: number;
  animateOnHover?: boolean;
  glowEffect?: boolean;
}

interface MagneticLetterProps {
  char: string;
  index: number;
  strength: number;
  staggerDelay: number;
  glowEffect: boolean;
}

function MagneticLetter({ char, index, strength, staggerDelay, glowEffect }: MagneticLetterProps) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const { x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect(strength);
  const [isHovered, setIsHovered] = useState(false);

  // Variable font weight animation
  const fontWeight = useMotionValue(400);
  const springFontWeight = useSpring(fontWeight, springConfigs.premium);

  // Glow intensity
  const glowIntensity = useMotionValue(0);
  const springGlow = useSpring(glowIntensity, springConfigs.smooth);

  // Transform values for interactive effects
  const scale = useTransform(glowIntensity, [0, 1], [1, 1.02]);
  const textShadow = useTransform(
    springGlow,
    [0, 1],
    [
      '0px 0px 0px rgba(255, 255, 255, 0)',
      '0px 0px 20px rgba(255, 255, 255, 0.3), 0px 0px 40px rgba(218, 14, 41, 0.2)'
    ]
  );

  useEffect(() => {
    const letter = letterRef.current;
    if (!letter || prefersReducedMotion()) return;

    const handleMouseEnter = (event: MouseEvent) => {
      setIsHovered(true);
      fontWeight.set(600);
      if (glowEffect) glowIntensity.set(1);
    };

    const handleMouseLeaveInternal = () => {
      setIsHovered(false);
      fontWeight.set(400);
      glowIntensity.set(0);
      handleMouseLeave();
    };

    const handleMouseMoveInternal = (event: MouseEvent) => {
      handleMouseMove(event, letter);
    };

    letter.addEventListener('mouseenter', handleMouseEnter);
    letter.addEventListener('mouseleave', handleMouseLeaveInternal);
    letter.addEventListener('mousemove', handleMouseMoveInternal);

    return () => {
      letter.removeEventListener('mouseenter', handleMouseEnter);
      letter.removeEventListener('mouseleave', handleMouseLeaveInternal);
      letter.removeEventListener('mousemove', handleMouseMoveInternal);
    };
  }, [handleMouseMove, handleMouseLeave, fontWeight, glowIntensity, glowEffect]);

  if (char === ' ') {
    return <span>&nbsp;</span>;
  }

  return (
    <motion.span
      ref={letterRef}
      style={{
        x,
        y,
        fontWeight: springFontWeight,
        scale,
        textShadow: glowEffect ? textShadow : undefined,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * staggerDelay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-block will-change-transform cursor-pointer relative"
    >
      {char}
    </motion.span>
  );
}

interface MagneticWordProps {
  word: string;
  wordIndex: number;
  strength: number;
  staggerDelay: number;
  glowEffect: boolean;
}

function MagneticWord({ word, wordIndex, strength, staggerDelay, glowEffect }: MagneticWordProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const { x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect(strength);

  useEffect(() => {
    const wordElement = wordRef.current;
    if (!wordElement || prefersReducedMotion()) return;

    const handleMouseMoveInternal = (event: MouseEvent) => {
      handleMouseMove(event, wordElement);
    };

    wordElement.addEventListener('mousemove', handleMouseMoveInternal);
    wordElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      wordElement.removeEventListener('mousemove', handleMouseMoveInternal);
      wordElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <motion.span
      ref={wordRef}
      style={{ x, y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: wordIndex * staggerDelay * 3, // Slower stagger for words
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-block will-change-transform mr-2"
    >
      {word.split('').map((char, charIndex) => (
        <MagneticLetter
          key={`${wordIndex}-${charIndex}`}
          char={char}
          index={wordIndex * 10 + charIndex} // Ensure unique indices
          strength={strength * 0.7} // Reduced strength for letters within words
          staggerDelay={staggerDelay * 0.5}
          glowEffect={glowEffect}
        />
      ))}
    </motion.span>
  );
}

export function MagneticText({
  children,
  className = '',
  strength = 0.3,
  letterSpacing = 0,
  splitByLetters = true,
  splitByWords = false,
  staggerDelay = 0.03,
  animateOnHover = false,
  glowEffect = false,
}: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);

  const text = typeof children === 'string' ? children : children?.toString() || '';

  // Container-level magnetic effect
  const { x: containerX, y: containerY, handleMouseMove: handleContainerMouseMove, handleMouseLeave: handleContainerMouseLeave } =
    useMagneticEffect(strength * 0.5);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const handleMouseEnter = () => setIsContainerHovered(true);
    const handleMouseLeave = () => {
      setIsContainerHovered(false);
      handleContainerMouseLeave();
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (animateOnHover) {
        handleContainerMouseMove(event, container);
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animateOnHover, handleContainerMouseMove, handleContainerMouseLeave]);

  // For reduced motion, render plain text
  if (prefersReducedMotion()) {
    return (
      <div className={cn('', className)} style={{ letterSpacing }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      style={{
        x: animateOnHover ? containerX : 0,
        y: animateOnHover ? containerY : 0,
        letterSpacing,
      }}
      className={cn('inline-block will-change-transform', className)}
      whileHover={animateOnHover ? { scale: 1.02 } : undefined}
      transition={springConfigs.premium}
    >
      {splitByWords ? (
        // Split by words, each word gets individual magnetic effect
        text.split(' ').map((word, wordIndex) => (
          <MagneticWord
            key={wordIndex}
            word={word}
            wordIndex={wordIndex}
            strength={strength}
            staggerDelay={staggerDelay}
            glowEffect={glowEffect && isContainerHovered}
          />
        ))
      ) : splitByLetters ? (
        // Split by individual letters
        text.split('').map((char, index) => (
          <MagneticLetter
            key={index}
            char={char}
            index={index}
            strength={strength}
            staggerDelay={staggerDelay}
            glowEffect={glowEffect && isContainerHovered}
          />
        ))
      ) : (
        // No splitting, just container-level effect
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.span>
      )}
    </motion.div>
  );
}