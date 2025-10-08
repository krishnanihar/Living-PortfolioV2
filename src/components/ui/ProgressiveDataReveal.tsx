'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
  description?: string;
}

interface ProgressiveDataRevealProps {
  data: DataPoint[];
  title?: string;
  maxValue?: number;
  animationDuration?: number;
  staggerDelay?: number;
}

/**
 * Progressive Data Visualization with Scroll-Linked Reveals
 * Data builds as user scrolls through, creating a sense of discovery
 */
export function ProgressiveBarChart({
  data,
  title,
  maxValue,
  animationDuration = 1.2,
  staggerDelay = 0.1,
}: ProgressiveDataRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '1.25rem',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem',
          }}
        >
          {title}
        </motion.h3>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {data.map((point, index) => (
          <motion.div
            key={point.label}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{
              duration: 0.8,
              delay: index * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {point.label}
              </span>
              <span
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '300',
                  color: point.color || 'rgba(147, 51, 234, 0.9)',
                }}
              >
                {point.value}%
              </span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${(point.value / max) * 100}%` } : { width: 0 }}
                transition={{
                  duration: animationDuration,
                  delay: index * staggerDelay + 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${point.color || 'rgba(147, 51, 234, 0.8)'}, ${(point.color || 'rgba(147, 51, 234, 0.8)').replace('0.8', '0.5')})`,
                  borderRadius: '4px',
                  position: 'relative',
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: index * staggerDelay + 0.5,
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
                    width: '50%',
                  }}
                />
              </motion.div>
            </div>

            {point.description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * staggerDelay + 0.8,
                }}
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: '0.5rem',
                  fontStyle: 'italic',
                }}
              >
                {point.description}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Radial/Circular Progress Reveal
 * Perfect for showing sleep stage distributions or cycle percentages
 */
export function ProgressiveRadialChart({
  data,
  title,
  size = 200,
}: {
  data: DataPoint[];
  title?: string;
  size?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((sum, point) => sum + point.value, 0);
  const radius = size / 2;
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  let accumulatedValue = 0;

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '1.25rem',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem',
          }}
        >
          {title}
        </motion.h3>
      )}

      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {data.map((point, index) => {
          const percentage = (point.value / total) * 100;
          const segmentLength = (percentage / 100) * circumference;
          const offset = -((accumulatedValue / total) * circumference);
          accumulatedValue += point.value;

          return (
            <motion.circle
              key={point.label}
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              fill="transparent"
              stroke={point.color || 'rgba(147, 51, 234, 0.8)'}
              strokeWidth={hoveredIndex === index ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={offset}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={
                isInView
                  ? { strokeDasharray: `${segmentLength} ${circumference - segmentLength}` }
                  : { strokeDasharray: `0 ${circumference}` }
              }
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transition: 'stroke-width 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        {data.map((point, index) => (
          <motion.div
            key={point.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.5,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: point.color || 'rgba(147, 51, 234, 0.8)',
              }}
            />
            <span
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {point.label}
            </span>
            <span
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              {point.value}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Numeric Counter with Progressive Reveal
 * Animates from 0 to target value as it enters viewport
 */
export function ProgressiveCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animate();
  }, [isInView, value, duration]);

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '200',
          color: 'rgba(147, 51, 234, 0.9)',
          lineHeight: '1',
          marginBottom: '0.5rem',
        }}
      >
        {prefix}
        {displayValue.toFixed(decimals)}
        {suffix}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </motion.div>
    </div>
  );
}

/**
 * Grid of stats with staggered reveal
 */
export function ProgressiveStatsGrid({
  stats,
}: {
  stats: Array<{ value: string | number; label: string; description?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '200',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '0.5rem',
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: stat.description ? '0.5rem' : '0',
            }}
          >
            {stat.label}
          </div>
          {stat.description && (
            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                fontStyle: 'italic',
                lineHeight: '1.4',
              }}
            >
              {stat.description}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
