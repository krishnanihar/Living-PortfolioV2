'use client';

import { motion, useInView } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const isInView = useInView(countRef as any, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={countRef as any}>{count}</span>;
}

export function CurrentRoleCard() {
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
          ? 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.04))'
          : 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isHovered
          ? '1px solid rgba(218, 14, 41, 0.4)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 40px rgba(218, 14, 41, 0.15)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.3), rgba(218, 14, 41, 0.15))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Building2 size={28} color="rgb(218, 14, 41)" />
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
          Currently
        </div>
        <div
          style={{
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}
        >
          Leading Design at Air India DesignLAB
        </div>

        {/* Stat */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem',
          }}
        >
          <div
            style={{
              fontSize: '2.5rem',
              fontWeight: '300',
              color: 'var(--brand-red)',
              lineHeight: '1',
            }}
          >
            <AnimatedCounter end={450} duration={2000} />
            <span style={{ fontSize: '1.5rem' }}>+</span>
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: '400',
              color: 'var(--text-secondary)',
              lineHeight: '1.3',
            }}
          >
            Daily<br />Operations
          </div>
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
          background: 'linear-gradient(90deg, rgba(218, 14, 41, 0.8), transparent)',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Background glow */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(218, 14, 41, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}
