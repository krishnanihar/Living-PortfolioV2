'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface ImpactMetricProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export function ImpactMetric({
  value,
  suffix = '+',
  label,
  duration = 2000,
  className = '',
}: ImpactMetricProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out quart for satisfying deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * value);

      setCount(current);

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [hasStarted, value, duration]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
      }}
    >
      <span
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          fontWeight: 600,
          fontFamily: 'var(--font-space-grotesk)',
          color: 'var(--text-90)',
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </span>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: 'var(--text-45)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default ImpactMetric;
