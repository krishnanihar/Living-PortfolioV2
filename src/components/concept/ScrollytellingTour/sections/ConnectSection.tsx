'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_CONFIG = { type: 'spring' as const, stiffness: 400, damping: 25 };

interface ConnectSectionProps {
  isActive: boolean;
  onClose: () => void;
  onContact: () => void;
}

export function ConnectSection({ isActive, onClose, onContact }: ConnectSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const contentVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: PREMIUM_EASE,
      },
    }),
  };

  const buttonStyle = (isHovered: boolean, isPrimary: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.625rem',
    padding: isPrimary ? '1rem 2rem' : '0.875rem 1.5rem',
    background: isPrimary
      ? isHovered
        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.10))'
        : 'linear-gradient(135deg, rgba(139, 92, 246, 0.10), rgba(236, 72, 153, 0.06))'
      : isHovered
        ? 'var(--glass-06)'
        : 'var(--glass-03)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: `1px solid ${isPrimary
      ? isHovered ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.15)'
      : isHovered ? 'var(--text-12)' : 'var(--text-08)'
    }`,
    borderRadius: '16px',
    color: 'var(--text-95)',
    fontSize: isPrimary ? '1rem' : '0.9375rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: isHovered
      ? '0 8px 32px rgba(0, 0, 0, 0.12)'
      : '0 4px 16px rgba(0, 0, 0, 0.08)',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      {/* Heading */}
      <motion.h2
        custom={0.1}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 300,
          color: 'var(--text-95)',
          fontFamily: 'var(--font-space-grotesk)',
          margin: 0,
        }}
      >
        Let's build something together
      </motion.h2>

      {/* Subtext */}
      <motion.p
        custom={0.2}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
          color: 'var(--text-50)',
          maxWidth: '400px',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Ready to create something meaningful? I'd love to hear about your project.
      </motion.p>

      {/* Primary CTA */}
      <motion.button
        custom={0.3}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        onClick={onContact}
        onMouseEnter={() => setHoveredButton('contact')}
        onMouseLeave={() => setHoveredButton(null)}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -2 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        transition={SPRING_CONFIG}
        style={buttonStyle(hoveredButton === 'contact', true)}
      >
        <Mail size={18} />
        Start a conversation
        <ArrowRight size={16} />
      </motion.button>

      {/* Secondary CTAs */}
      <motion.div
        custom={0.4}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <motion.a
          href="https://linkedin.com/in/krishnanihar"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredButton('linkedin')}
          onMouseLeave={() => setHoveredButton(null)}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -2 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          transition={SPRING_CONFIG}
          style={{
            ...buttonStyle(hoveredButton === 'linkedin', false),
            textDecoration: 'none',
          }}
        >
          <Linkedin size={16} />
          LinkedIn
        </motion.a>

        <motion.a
          href="mailto:hello@nihar.design"
          onMouseEnter={() => setHoveredButton('email')}
          onMouseLeave={() => setHoveredButton(null)}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -2 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          transition={SPRING_CONFIG}
          style={{
            ...buttonStyle(hoveredButton === 'email', false),
            textDecoration: 'none',
          }}
        >
          <Mail size={16} />
          Email
        </motion.a>
      </motion.div>

      {/* Exit option */}
      <motion.button
        custom={0.5}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        onClick={onClose}
        onMouseEnter={() => setHoveredButton('exit')}
        onMouseLeave={() => setHoveredButton(null)}
        style={{
          background: 'none',
          border: 'none',
          color: hoveredButton === 'exit' ? 'var(--text-60)' : 'var(--text-40)',
          fontSize: '0.875rem',
          cursor: 'pointer',
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          transition: 'color 0.2s ease',
        }}
      >
        Or continue exploring →
      </motion.button>
    </div>
  );
}
