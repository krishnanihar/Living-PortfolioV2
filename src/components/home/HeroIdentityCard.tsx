'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { ValuePills } from './ValuePills';
import { CredentialBar } from './CredentialBar';

export interface HeroIdentityCardProps {
  className?: string;
  showCredentials?: boolean;
  variant?: 'full' | 'compact';
  onContactClick?: () => void;
}

// Ultra-Liquid Glass Style - iOS 26 Inspired (from ConceptHero)
const CARD_GLASS = {
  background: 'var(--glass-03)',
  backdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  border: '1px solid var(--text-10)',
  boxShadow: `
    0 12px 48px rgba(0, 0, 0, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.10),
    inset 0 1px 2px var(--glass-25),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15)
  `,
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

const skills = [
  'Design Systems',
  'Full-Stack Design',
  'Team Leadership',
  'Research',
];

export function HeroIdentityCard({
  className = '',
  showCredentials = true,
  variant = 'full',
  onContactClick,
}: HeroIdentityCardProps) {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      className={className}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{
        ...CARD_GLASS,
        borderRadius: isCompact ? '24px' : '32px',
        padding: isCompact ? 'clamp(1.5rem, 4vw, 2rem)' : 'clamp(2rem, 5vw, 3rem)',
        maxWidth: isCompact ? '480px' : '580px',
        width: '100%',
        textAlign: 'center',
      }}
    >
      {/* Name */}
      <motion.h1
        variants={itemVariants}
        className="text-display"
        style={{
          fontSize: isCompact ? 'clamp(2rem, 5vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 3.5rem)',
          fontWeight: 600,
          color: 'var(--text-95)',
          marginBottom: '0.5rem',
          lineHeight: 1.1,
        }}
      >
        Krishna Nihar
      </motion.h1>

      {/* Role */}
      <motion.p
        variants={itemVariants}
        className="text-subheading"
        style={{
          fontSize: isCompact ? '1rem' : 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: 400,
          color: 'var(--text-65)',
          marginBottom: isCompact ? '1rem' : '1.25rem',
        }}
      >
        Product Designer at{' '}
        <span style={{ color: '#d97757', fontWeight: 500 }}>Air India</span>
      </motion.p>

      {/* Impact Statement */}
      <motion.p
        variants={itemVariants}
        className="text-body"
        style={{
          fontSize: isCompact ? '0.875rem' : 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
          color: 'var(--text-50)',
          lineHeight: 1.6,
          maxWidth: '420px',
          margin: '0 auto',
          marginBottom: isCompact ? '1.25rem' : '1.75rem',
        }}
      >
        Building systems for{' '}
        <span style={{ color: 'var(--text-75)', fontWeight: 500 }}>450+ daily users</span>
        {' '}across aviation operations, mobile, and in-flight experiences.
      </motion.p>

      {/* Value Pills */}
      {!isCompact && (
        <motion.div variants={itemVariants} style={{ marginBottom: '1.75rem' }}>
          <ValuePills skills={skills} />
        </motion.div>
      )}

      {/* CTAs */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Primary CTA - View Work */}
        <Link
          href="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: isCompact ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
            background: '#d97757',
            color: '#FFFFFF',
            borderRadius: '12px',
            fontSize: isCompact ? '0.875rem' : '0.9375rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 87, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          View Work
          <ArrowRight size={16} strokeWidth={2.5} />
        </Link>

        {/* Secondary CTA - Get in Touch */}
        <button
          onClick={onContactClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: isCompact ? '0.625rem 1.25rem' : '0.75rem 1.5rem',
            background: 'var(--glass-06)',
            color: 'var(--text-70)',
            border: '1px solid var(--text-08)',
            borderRadius: '12px',
            fontSize: isCompact ? '0.875rem' : '0.9375rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--glass-10)';
            e.currentTarget.style.borderColor = 'var(--text-12)';
            e.currentTarget.style.color = 'var(--text-85)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--glass-06)';
            e.currentTarget.style.borderColor = 'var(--text-08)';
            e.currentTarget.style.color = 'var(--text-70)';
          }}
        >
          <Mail size={16} strokeWidth={2} />
          Get in Touch
        </button>
      </motion.div>

      {/* Credential Bar */}
      {showCredentials && !isCompact && (
        <motion.div variants={itemVariants}>
          <CredentialBar />
        </motion.div>
      )}
    </motion.div>
  );
}

export default HeroIdentityCard;
