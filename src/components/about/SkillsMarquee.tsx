'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

const skills = [
  'Aviation UX',
  'Systems Thinking',
  'Creative Coding',
  'Generative Art',
  'AI/ML',
  'Design Systems',
  'React & Next.js',
  'TypeScript',
  'Figma',
  'Framer',
  'Data Visualization',
  'User Research',
];

export function SkillsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        padding: '1.5rem 2rem',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredSkill(null);
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: '500',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Skills & Expertise
      </div>

      {/* Marquee container */}
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
        <motion.div
          animate={{
            x: isPaused ? undefined : [0, -50 + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
          style={{
            display: 'flex',
            gap: '0.75rem',
            width: 'fit-content',
          }}
        >
          {duplicatedSkills.map((skill, index) => {
            const isHovered = hoveredSkill === skill;

            return (
              <Link
                key={`${skill}-${index}`}
                href={`/work?skill=${encodeURIComponent(skill.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-'))}`}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '12px',
                  background: isHovered
                    ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1))'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isHovered
                    ? '1px solid rgba(251, 191, 36, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  color: isHovered ? 'rgba(251, 191, 36, 1)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  cursor: 'pointer',
                  display: 'inline-block',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                {skill}
              </Link>
            );
          })}
        </motion.div>
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            fontSize: '0.688rem',
            fontWeight: '400',
            color: 'var(--text-muted)',
            opacity: 0.6,
          }}
        >
          Paused
        </div>
      )}
    </motion.div>
  );
}
