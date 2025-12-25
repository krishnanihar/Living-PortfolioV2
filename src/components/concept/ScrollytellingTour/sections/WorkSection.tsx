'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_CONFIG = { type: 'spring' as const, stiffness: 400, damping: 25 };

interface Project {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    id: 'cleara',
    name: 'Cleara',
    role: 'AI + Health',
    description: '18 months of research into AI-powered psoriasis care',
    color: '#10B981',
  },
  {
    id: 'air-india',
    name: 'Air India',
    role: 'Design System',
    description: 'Unified design system serving 450+ daily users',
    color: '#DA0E29',
  },
];

interface WorkSectionProps {
  isActive: boolean;
}

export function WorkSection({ isActive }: WorkSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

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
        Selected Work
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
          margin: 0,
        }}
      >
        Projects that push boundaries
      </motion.p>

      {/* Project cards */}
      <motion.div
        custom={0.3}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{
          display: 'flex',
          gap: '1.25rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        {FEATURED_PROJECTS.map((project, index) => {
          const isHovered = hoveredProject === project.id;

          return (
            <motion.div
              key={project.id}
              custom={0.3 + index * 0.1}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <Link href={`/work/${project.id}`} style={{ textDecoration: 'none' }}>
                <motion.div
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -6 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  transition={SPRING_CONFIG}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.75rem 2rem',
                    background: isHovered ? 'var(--glass-06)' : 'var(--glass-03)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    borderRadius: '20px',
                    border: `1px solid ${isHovered ? `${project.color}25` : 'var(--text-08)'}`,
                    boxShadow: isHovered
                      ? `0 12px 40px rgba(0,0,0,0.15), 0 0 0 1px ${project.color}15`
                      : '0 8px 32px rgba(0,0,0,0.10)',
                    cursor: 'pointer',
                    minWidth: '260px',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Project icon/thumbnail */}
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}10 100%)`,
                      marginBottom: '1rem',
                      boxShadow: `0 4px 16px ${project.color}15`,
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s ease',
                    }}
                  />

                  {/* Project name */}
                  <span
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      color: 'var(--text-95)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {project.name}
                  </span>

                  {/* Role */}
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      color: project.color,
                      fontWeight: 500,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {project.role}
                  </span>

                  {/* Description */}
                  <span
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-45)',
                      lineHeight: 1.5,
                    }}
                  >
                    {project.description}
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
