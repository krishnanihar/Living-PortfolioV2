'use client';

import { motion } from 'framer-motion';

export interface ValuePillsProps {
  skills?: string[];
  className?: string;
  delay?: number;
}

const defaultSkills = [
  'Design Systems',
  'Full-Stack Design',
  'Team Leadership',
  'Research',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const pillVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export function ValuePills({
  skills = defaultSkills,
  className = '',
  delay = 0,
}: ValuePillsProps) {
  return (
    <motion.div
      className={`flex flex-wrap gap-2 justify-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {skills.map((skill) => (
        <motion.span
          key={skill}
          variants={pillVariants}
          whileHover={{
            scale: 1.05,
            backgroundColor: 'var(--glass-08)',
          }}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--glass-04)',
            border: '1px solid var(--text-06)',
            borderRadius: '20px',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: 'var(--text-60)',
            cursor: 'default',
            transition: 'background 0.2s ease, border-color 0.2s ease',
          }}
        >
          {skill}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default ValuePills;
