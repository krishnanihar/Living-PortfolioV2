'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { InteractiveGridBackground } from './InteractiveGridBackground';

/**
 * MetamorphicHeroV2 - Anime.js-Inspired Hero Section
 *
 * Full-viewport hero with:
 * - Interactive dot grid background (like animejs.com)
 * - Stagger-animated title and subtitle
 * - Scroll indicator with pulse animation
 * - Dark purple gradient overlay
 */

interface MetamorphicHeroV2Props {
  /** Callback when CTA is clicked */
  onEnterPortal?: () => void;
}

export function MetamorphicHeroV2({ onEnterPortal }: MetamorphicHeroV2Props) {
  const [isClient, setIsClient] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollDown = () => {
    if (onEnterPortal) {
      onEnterPortal();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  // Title text for character animation
  const title = 'Metamorphic Fractal Reflections';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.3,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (!isClient) {
    return (
      <section
        style={{
          minHeight: '100vh',
          background: 'var(--metamorphic-bg-primary)',
        }}
      />
    );
  }

  return (
    <section
      id="metamorphic-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: `linear-gradient(180deg,
          var(--metamorphic-bg-primary) 0%,
          var(--metamorphic-bg-secondary) 50%,
          var(--metamorphic-bg-primary) 100%)`,
      }}
    >
      {/* Interactive grid background */}
      <InteractiveGridBackground
        cols={isMobile ? 15 : 25}
        rows={isMobile ? 12 : 15}
        highlightRadius={isMobile ? 100 : 150}
        zIndex={1}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: `radial-gradient(ellipse at center,
            rgba(147, 51, 234, 0.08) 0%,
            transparent 50%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: isMobile ? '0 1.5rem' : '0 2rem',
          maxWidth: '900px',
          pointerEvents: 'none',
        }}
      >
        {/* Category label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-50)',
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              background: 'var(--glass-05)',
              border: '1px solid var(--glass-10)',
            }}
          >
            Immersive Installation • NID 2023
          </span>
        </motion.div>

        {/* Title with character stagger */}
        <motion.h1
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: isMobile
              ? 'clamp(2rem, 8vw, 3rem)'
              : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text-95)',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-space-grotesk)',
          }}
        >
          {prefersReducedMotion
            ? title
            : title.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontSize: isMobile ? '1.125rem' : '1.375rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--text-60)',
            marginBottom: '2.5rem',
          }}
        >
          A Journey Towards Ego Death
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          onClick={handleScrollDown}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: 'var(--text-95)',
            background: 'rgba(147, 51, 234, 0.15)',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            borderRadius: '100px',
            cursor: 'pointer',
            transition: 'background 0.3s, border-color 0.3s',
            pointerEvents: 'auto',
          }}
        >
          Enter the Portal
          <ChevronDown size={18} />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        onClick={handleScrollDown}
        style={{
          position: 'absolute',
          bottom: isMobile ? '2rem' : '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          pointerEvents: 'auto',
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-40)',
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'var(--glass-05)',
            border: '1px solid var(--glass-10)',
          }}
        >
          <ChevronDown size={16} style={{ color: 'var(--text-50)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default MetamorphicHeroV2;
