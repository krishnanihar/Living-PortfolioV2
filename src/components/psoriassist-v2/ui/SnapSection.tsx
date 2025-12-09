'use client';

import { ReactNode, forwardRef } from 'react';
import { motion, Variants } from 'framer-motion';

interface SnapSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  background?: 'default' | 'subtle' | 'accent';
  fullHeight?: boolean;
}

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const SnapSection = forwardRef<HTMLElement, SnapSectionProps>(
  ({ id, children, className = '', background = 'default', fullHeight = true }, ref) => {
    const bgStyles = {
      default: {},
      subtle: {
        background: 'var(--glass-02)',
      },
      accent: {
        background: 'linear-gradient(180deg, var(--glass-03) 0%, transparent 100%)',
      },
    };

    return (
      <motion.section
        ref={ref}
        id={id}
        className={`snap-section ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        style={{
          minHeight: fullHeight ? '100vh' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '6rem 2rem',
          ...bgStyles[background],
        }}
      >
        {children}
      </motion.section>
    );
  }
);

SnapSection.displayName = 'SnapSection';

// Export child variants for use in section content
export { childVariants };
