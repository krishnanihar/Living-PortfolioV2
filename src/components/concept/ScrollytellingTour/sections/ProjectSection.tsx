'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_CONFIG = { type: 'spring' as const, stiffness: 400, damping: 25 };

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  metrics: string[];
  accentColor: string;
  images: {
    hero: string;
    secondary?: string;
  };
  logo?: string;
}

interface ProjectSectionProps {
  project: ProjectData;
  isActive: boolean;
}

export function ProjectSection({ project, isActive }: ProjectSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: PREMIUM_EASE,
      },
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 1.5rem',
      }}
    >
      {/* Project Name */}
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
          letterSpacing: '-0.02em',
        }}
      >
        {project.name}
      </motion.h2>

      {/* Tagline */}
      <motion.p
        custom={0.15}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          fontWeight: 500,
          color: project.accentColor,
          fontFamily: 'var(--font-space-grotesk)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: 0,
        }}
      >
        {project.tagline}
      </motion.p>

      {/* Hero Image with Glass Frame */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          aspectRatio: '16/10',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'var(--glass-03)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: '1px solid var(--text-06)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.15),
            0 0 0 1px ${project.accentColor}10,
            inset 0 1px 0 var(--text-08)
          `,
        }}
      >
        {/* Accent glow behind image */}
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${project.accentColor}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <Image
          src={project.images.hero}
          alt={project.name}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />

        {/* Subtle overlay for depth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3) 100%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Secondary floating image (if exists) */}
      {project.images.secondary && (
        <motion.div
          custom={0.4}
          variants={contentVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          style={{
            position: 'absolute',
            right: '5%',
            top: '15%',
            width: '120px',
            height: '120px',
            borderRadius: '16px',
            overflow: 'hidden',
            opacity: 0.6,
            filter: 'blur(1px)',
            transform: 'rotate(6deg)',
            pointerEvents: 'none',
          }}
        >
          <Image
            src={project.images.secondary}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            sizes="120px"
          />
        </motion.div>
      )}

      {/* Description */}
      <motion.p
        custom={0.3}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
          color: 'var(--text-60)',
          maxWidth: '500px',
          lineHeight: 1.7,
          margin: 0,
          textAlign: 'center',
        }}
      >
        {project.description}
      </motion.p>

      {/* Metrics */}
      <motion.div
        custom={0.4}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {project.metrics.map((metric, index) => (
          <React.Fragment key={metric}>
            <span
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-45)',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              {metric}
            </span>
            {index < project.metrics.length - 1 && (
              <span style={{ color: 'var(--text-20)' }}>·</span>
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        custom={0.5}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <Link href={`/work/${project.id}`} style={{ textDecoration: 'none' }}>
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            transition={SPRING_CONFIG}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: isHovered ? 'var(--glass-08)' : 'var(--glass-04)',
              backdropFilter: 'blur(40px) saturate(150%)',
              WebkitBackdropFilter: 'blur(40px) saturate(150%)',
              border: `1px solid ${isHovered ? `${project.accentColor}30` : 'var(--text-08)'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-90)',
              }}
            >
              View Project
            </span>
            <ArrowRight
              size={14}
              style={{
                color: project.accentColor,
                transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'transform 0.2s ease',
              }}
            />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}

// Project data for the tour
export const TOUR_PROJECTS: ProjectData[] = [
  {
    id: 'cleara',
    name: 'Cleara',
    tagline: 'AI-Powered Psoriasis Care',
    description: '18 months of deep research into chronic condition management, resulting in an AI companion that understands the unpredictable nature of skin conditions.',
    metrics: ['18 months research', '3 user personas', 'AI-driven insights'],
    accentColor: '#10B981',
    images: {
      hero: '/images/cleara/cleara_phone.png',
      secondary: '/images/cleara/watercolor/hero-fragment-1.png',
    },
  },
  {
    id: 'air-india',
    name: 'Air India',
    tagline: 'Design System at 40,000 Feet',
    description: 'Unified design language serving 450+ daily users across in-flight entertainment, crew tools, and passenger touchpoints.',
    metrics: ['450+ daily users', 'System-wide unification', 'Enterprise scale'],
    accentColor: '#DA0E29',
    images: {
      hero: '/images/air-india/IFE.png',
    },
    logo: '/logos/air-india.svg',
  },
  {
    id: 'mythos',
    name: 'Mythos',
    tagline: 'Gaming Platform Experience',
    description: 'Crafting immersive gaming experiences with attention to micro-interactions and player engagement.',
    metrics: ['Immersive UX', 'Micro-interactions', 'Player-first design'],
    accentColor: '#8B5CF6',
    images: {
      hero: '/projects/mythoscover1.png',
    },
  },
];
