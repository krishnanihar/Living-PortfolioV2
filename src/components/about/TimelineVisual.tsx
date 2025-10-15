'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

const milestones = [
  { year: '2005', label: 'The Spark', color: 'rgba(251, 191, 36, 0.6)', id: 'hyderabad-roots' },
  { year: '2018', label: 'BFA Journey', color: 'rgba(59, 130, 246, 0.6)', id: 'undergrad-2018' },
  { year: '2021', label: 'NID Masters', color: 'rgba(139, 92, 246, 0.6)', id: 'nid-2021' },
  { year: '2024', label: 'Air India', color: 'rgba(218, 14, 41, 0.8)', id: 'air-india-2024' },
];

export function TimelineVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        padding: '2rem',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Journey
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Animated vertical line */}
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: '100%' } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: '2px',
            background: 'linear-gradient(180deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.6), rgba(218, 14, 41, 0.2))',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Milestones */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          {milestones.map((milestone, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={milestone.year}
                href={`/journey#${milestone.id}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: isHovered ? '20px' : '14px',
                    height: isHovered ? '20px' : '14px',
                    borderRadius: '50%',
                    background: milestone.color,
                    boxShadow: isHovered
                      ? `0 0 20px ${milestone.color}, 0 0 40px ${milestone.color}`
                      : `0 0 10px ${milestone.color}`,
                    border: '2px solid rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 2,
                  }}
                />

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  style={{
                    marginTop: '0.75rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                      marginBottom: '0.25rem',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {milestone.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {milestone.year}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
