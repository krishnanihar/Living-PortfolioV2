'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useState } from 'react';

export function EducationCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        padding: '2rem',
        borderRadius: '24px',
        background: isHovered
          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(255, 255, 255, 0.03))'
          : 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isHovered
          ? '1px solid rgba(99, 102, 241, 0.3)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 40px rgba(99, 102, 241, 0.1)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.1))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <GraduationCap size={28} color="rgb(99, 102, 241)" />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: '500',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}
        >
          Education
        </div>
        <div
          style={{
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>NID Masters in Design</div>
          <div style={{ opacity: 0.8 }}>BFA Visual Arts</div>
        </div>
      </div>

      {/* Hover accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.6), transparent)',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </motion.div>
  );
}
