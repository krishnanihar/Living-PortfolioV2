'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MagneticText } from './MagneticText';
import { MorphingText } from './MorphingText';
import { useScrollTrigger, springConfigs } from '@/lib/animations';
import { prefersReducedMotion, cn } from '@/lib/utils';

interface AnimatedHeadingProps {
  children?: React.ReactNode;
  texts?: string[];
  variant?: 'magnetic' | 'morphing' | 'combined';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  style?: React.CSSProperties;

  // Magnetic properties
  magneticStrength?: number;
  splitByLetters?: boolean;
  splitByWords?: boolean;
  glowEffect?: boolean;

  // Morphing properties
  morphingDuration?: number;
  morphingDirection?: 'up' | 'down' | 'fade' | 'scale';
  morphingEffect?: 'smooth' | 'elastic' | 'liquid';

  // Enhanced effects
  shimmerEffect?: boolean;
  breathingAnimation?: boolean;
  scrollReveal?: boolean;
  variableFont?: boolean;
  chromaticAberration?: boolean;

  // Interaction
  onHover?: () => void;
  onClick?: () => void;
}

export function AnimatedHeading({
  children,
  texts,
  variant = 'magnetic',
  level = 1,
  className = '',
  style,

  // Magnetic props
  magneticStrength = 0.4,
  splitByLetters = true,
  splitByWords = false,
  glowEffect = true,

  // Morphing props
  morphingDuration = 3000,
  morphingDirection = 'up',
  morphingEffect = 'smooth',

  // Enhanced effects
  shimmerEffect = false,
  breathingAnimation = false,
  scrollReveal = true,
  variableFont = true,
  chromaticAberration = false,

  // Interaction
  onHover,
  onClick,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Scroll reveal
  useEffect(() => {
    if (!scrollReveal || !containerRef.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [scrollReveal]);

  // Enhanced motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Variable font weight
  const fontWeight = useMotionValue(400);
  const springFontWeight = useSpring(fontWeight, springConfigs.premium);

  // Transform values
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Scale and glow effects
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, springConfigs.premium);
  const glowIntensity = useMotionValue(0);
  const springGlow = useSpring(glowIntensity, springConfigs.smooth);

  // Text shadow for glow effect
  const textShadow = useTransform(
    springGlow,
    [0, 1],
    [
      '0px 0px 0px rgba(255, 255, 255, 0)',
      '0px 0px 30px rgba(255, 255, 255, 0.4), 0px 0px 60px rgba(218, 14, 41, 0.3), 0px 0px 90px rgba(218, 14, 41, 0.1)'
    ]
  );

  // Chromatic aberration effect
  const chromaticShadow = useTransform(
    springGlow,
    [0, 1],
    [
      '0px 0px 0px rgba(255, 0, 0, 0), 0px 0px 0px rgba(0, 0, 255, 0)',
      '2px 0px 0px rgba(255, 0, 0, 0.3), -2px 0px 0px rgba(0, 0, 255, 0.3)'
    ]
  );

  // Mouse tracking
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!headingRef.current || prefersReducedMotion()) return;

    const rect = headingRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (variableFont) fontWeight.set(600);
    scale.set(1.02);
    glowIntensity.set(1);
    onHover?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (variableFont) fontWeight.set(400);
    scale.set(1);
    glowIntensity.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    setIsClicked(true);
    scale.set(0.98);
    setTimeout(() => {
      setIsClicked(false);
      scale.set(isHovered ? 1.02 : 1);
    }, 150);
    onClick?.();
  };

  // Determine content based on variant
  const content = (() => {
    if (variant === 'morphing' && texts) {
      return (
        <MorphingText
          texts={texts}
          duration={morphingDuration}
          direction={morphingDirection}
          morphingEffect={morphingEffect}
          staggerLetters={splitByLetters}
        />
      );
    }

    if (variant === 'combined' && texts) {
      return (
        <MorphingText
          texts={texts}
          duration={morphingDuration}
          direction={morphingDirection}
          morphingEffect={morphingEffect}
          staggerLetters={false}
        />
      );
    }

    if (variant === 'magnetic' || variant === 'combined') {
      return (
        <MagneticText
          strength={magneticStrength}
          splitByLetters={splitByLetters}
          splitByWords={splitByWords}
          glowEffect={glowEffect}
          animateOnHover
        >
          {children}
        </MagneticText>
      );
    }

    return children;
  })();

  // Base styles
  const baseStyles = cn(
    'relative inline-block will-change-transform',
    shimmerEffect && 'text-shimmer',
    className
  );

  // For reduced motion, render simplified version
  if (prefersReducedMotion()) {
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
    return React.createElement(
      Tag,
      { className: baseStyles, style },
      variant === 'morphing' && texts ? texts[0] : children
    );
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={scrollReveal ? (isVisible ? { opacity: 1, y: 0 } : {}) : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      }}
      className="relative"
    >
      <div
        ref={headingRef}
        className={baseStyles}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick ? handleClick : undefined}
        style={{
          cursor: onClick ? 'pointer' : 'default',
          ...style,
        }}
        role={`heading`}
        aria-level={level}
      >
        <motion.div
          style={{
            fontWeight: variableFont ? springFontWeight : undefined,
            scale: springScale,
            rotateX: !prefersReducedMotion() ? rotateX : 0,
            rotateY: !prefersReducedMotion() ? rotateY : 0,
            textShadow: glowEffect ? textShadow : undefined,
            filter: chromaticAberration ? chromaticShadow : undefined,
            transformOrigin: 'center',
            perspective: '1000px',
          }}
          animate={
            breathingAnimation
              ? {
                  scale: [1, 1.01, 1],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
              : undefined
          }
          className="inline-block"
        >
          {content}
        </motion.div>

        {/* Enhanced glow background */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background: `radial-gradient(circle at center, rgba(218, 14, 41, ${
                isHovered ? 0.2 : 0
              }), transparent 70%)`,
              opacity: springGlow,
            }}
            animate={{
              scale: isHovered ? 1.2 : 1,
            }}
            transition={springConfigs.smooth}
          />
        )}

        {/* Shimmer overlay */}
        {shimmerEffect && isHovered && (
          <motion.div
            className="absolute inset-0 -z-5"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

// Preset configurations for common use cases
export const AnimatedHeadingPresets = {
  heroTitle: {
    level: 1,
    variant: 'magnetic',
    magneticStrength: 0.5,
    splitByLetters: true,
    glowEffect: true,
    variableFont: true,
    shimmerEffect: true,
  },
  sectionHeading: {
    level: 2,
    variant: 'combined',
    magneticStrength: 0.3,
    splitByWords: true,
    glowEffect: false,
    scrollReveal: true,
  },
  dynamicTagline: {
    level: 2,
    variant: 'morphing',
    morphingDuration: 3000,
    morphingDirection: 'up',
    morphingEffect: 'smooth',
    breathingAnimation: true,
  },
  interactiveTitle: {
    level: 1,
    variant: 'magnetic',
    magneticStrength: 0.4,
    splitByLetters: true,
    glowEffect: true,
    chromaticAberration: true,
    variableFont: true,
  },
} as const;