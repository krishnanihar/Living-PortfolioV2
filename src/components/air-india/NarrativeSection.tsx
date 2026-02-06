'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Reuse the SAME animation patterns and easing curves from the existing codebase.
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

interface SectionLabelProps {
  children: React.ReactNode;
  color?: string;
}

/**
 * Mono-styled section label (e.g., "01 — Context")
 * Uses brand accent color and existing mono font variable.
 */
export function SectionLabel({ children, color = '218, 14, 41' }: SectionLabelProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      style={{
        fontFamily: 'SF Mono, Monaco, Consolas, monospace',
        fontSize: '11px',
        letterSpacing: '3px',
        textTransform: 'uppercase' as const,
        color: `rgb(${color})`,
        marginBottom: '20px',
        fontWeight: 500,
      }}
    >
      {children}
    </motion.div>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
}

/**
 * Large section heading.
 * Uses the same display font as existing page headings.
 */
export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <motion.h2
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      style={{
        fontFamily: 'var(--font-heading), Space Grotesk, sans-serif',
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: 300,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        marginBottom: '32px',
        color: 'var(--text-95)',
      }}
    >
      {children}
    </motion.h2>
  );
}

interface NarrativeBlockProps {
  label: string; // e.g. "THE SITUATION", "MY APPROACH", "THE DECISION & WHY"
  children: React.ReactNode;
  delay?: number;
}

/**
 * A labeled narrative text block.
 * Label appears as small monospace uppercase, content as body text.
 */
export function NarrativeBlock({ label, children, delay = 0 }: NarrativeBlockProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, margin: '-10%' }}
      style={{ marginBottom: '32px' }}
    >
      <div
        style={{
          fontFamily: 'SF Mono, Monaco, Consolas, monospace',
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: 'var(--text-40)',
          marginBottom: '10px',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 'clamp(15px, 1.6vw, 17px)',
          lineHeight: 1.8,
          color: 'var(--text-70)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

interface InteractiveDemoWrapperProps {
  label: string; // e.g. "Interactive — try the demo"
  accentColor?: string;
  children: React.ReactNode;
}

/**
 * Wraps an interactive demo with a pulsing dot + label.
 * Signals to the user that the embedded component is interactive.
 */
export function InteractiveDemoWrapper({
  label,
  accentColor = 'rgb(218, 14, 41)',
  children,
}: InteractiveDemoWrapperProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      style={{ margin: '48px 0' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '14px',
        }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: accentColor,
          }}
        />
        <span
          style={{
            fontFamily: 'SF Mono, Monaco, Consolas, monospace',
            fontSize: '10px',
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: 'var(--text-50)',
          }}
        >
          {label}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

/**
 * Principle card for the "How I Work" section.
 * Title + body text, separated by subtle dividers.
 */
interface PrincipleProps {
  title: string;
  children: React.ReactNode;
  showDivider?: boolean;
  delay?: number;
}

export function Principle({ title, children, showDivider = true, delay = 0 }: PrincipleProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, margin: '-10%' }}
      style={{
        marginBottom: '48px',
        paddingBottom: showDivider ? '48px' : '0',
        borderBottom: showDivider ? '1px solid var(--glass-10)' : 'none',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-heading), Space Grotesk, sans-serif',
          fontSize: 'clamp(20px, 2.5vw, 24px)',
          fontWeight: 400,
          marginBottom: '14px',
          color: 'var(--text-90)',
        }}
      >
        {title}
      </h3>
      <div
        style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          lineHeight: 1.8,
          color: 'var(--text-60)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Stats grid for outcomes section
 */
interface StatItemProps {
  value: string;
  label: string;
  subLabel?: string;
  color?: string;
  delay?: number;
}

export function StatItem({ value, label, subLabel, color = '218, 14, 41', delay = 0 }: StatItemProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, margin: '-10%' }}
      style={{
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        borderRadius: '20px',
        background: 'var(--glass-04)',
        border: '1px solid var(--glass-08)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 600,
          color: `rgb(${color})`,
          lineHeight: 1,
          marginBottom: '0.5rem',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          marginBottom: subLabel ? '0.25rem' : 0,
        }}
      >
        {label}
      </div>
      {subLabel && (
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          {subLabel}
        </div>
      )}
    </motion.div>
  );
}

/**
 * Team recognition callout card
 */
interface RecognitionCalloutProps {
  children: React.ReactNode;
  accentColor?: string;
}

export function RecognitionCallout({ children, accentColor = '218, 14, 41' }: RecognitionCalloutProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      style={{
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        borderRadius: '20px',
        background: 'var(--glass-04)',
        border: `1px solid rgba(${accentColor}, 0.2)`,
        borderLeft: `3px solid rgb(${accentColor})`,
      }}
    >
      <div
        style={{
          fontFamily: 'SF Mono, Monaco, Consolas, monospace',
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: `rgb(${accentColor})`,
          marginBottom: '12px',
          fontWeight: 500,
        }}
      >
        Team Recognition During My Tenure
      </div>
      <div
        style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          lineHeight: 1.8,
          color: 'var(--text-60)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Section container with consistent max-width and padding
 */
interface NarrativeSectionContainerProps {
  id: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function NarrativeSectionContainer({
  id,
  children,
  maxWidth = 'min(800px, 85vw)',
}: NarrativeSectionContainerProps) {
  return (
    <section
      id={id}
      data-section-id={`air-india-${id}`}
      style={{
        maxWidth,
        margin: '0 auto',
        padding: 'clamp(3rem, 5vh, 4rem) 2rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {children}
    </section>
  );
}

/**
 * Role cards for IC with lead scope display
 */
interface RoleCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export function RoleCard({ title, children, delay = 0 }: RoleCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, margin: '-10%' }}
      style={{
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        borderRadius: '20px',
        background: 'var(--glass-04)',
        border: '1px solid var(--glass-08)',
      }}
    >
      <div
        style={{
          fontFamily: 'SF Mono, Monaco, Consolas, monospace',
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase' as const,
          color: 'var(--text-50)',
          marginBottom: '12px',
          fontWeight: 500,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          lineHeight: 1.7,
          color: 'var(--text-70)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Section divider
 */
export function SectionDivider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'var(--glass-08)',
        margin: 'clamp(60px, 8vw, 100px) auto',
        maxWidth: 'min(800px, 85vw)',
      }}
    />
  );
}
