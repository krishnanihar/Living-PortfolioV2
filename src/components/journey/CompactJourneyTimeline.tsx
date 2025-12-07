'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Compact Journey Timeline Component
 *
 * Mobile-optimized timeline showing organization milestones
 * - Infosys, NID, Air India, ISB, Future Research
 *
 * Features:
 * - SVG timeline with clickable dots
 * - 44×44px tap targets (WCAG AA)
 * - Color-coded organization dots
 * - Click-to-scroll navigation
 * - ~20vh height (compact)
 */

interface TimelineItem {
  organization: string;
  timeframe: string;
  actId: string;
  color: string;
  logo?: string;
}

interface CompactJourneyTimelineProps {
  items: TimelineItem[];
  onClick: (actId: string) => void;
}

export function CompactJourneyTimeline({ items, onClick }: CompactJourneyTimelineProps) {
  const [activeDot, setActiveDot] = React.useState<number | null>(null);

  // Timeline positions (centered on viewport)
  const positions = [25, 50, 75]; // Percentage positions

  return (
    <div
      style={{
        padding: 'clamp(1.5rem, 4vw, 2rem)',
        minHeight: '20vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      {/* SVG Timeline */}
      <svg
        width="100%"
        height="60"
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid meet"
        style={{
          overflow: 'visible',
        }}
      >
        {/* Horizontal connector line */}
        <line
          x1="10"
          y1="30"
          x2="90"
          y2="30"
          stroke="var(--border-primary)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />

        {/* Timeline dots */}
        {items.map((item, index) => {
          const x = positions[index];
          const isActive = activeDot === index;

          return (
            <g key={index}>
              {/* Tap target (invisible, larger area for accessibility) */}
              <circle
                cx={x}
                cy="30"
                r="8"
                fill="transparent"
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveDot(index);
                  onClick(item.actId);
                }}
                onMouseEnter={() => setActiveDot(index)}
                onMouseLeave={() => setActiveDot(null)}
              />

              {/* Outer glow ring (on hover/active) */}
              {isActive && (
                <circle
                  cx={x}
                  cy="30"
                  r="5"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="0.5"
                  opacity="0.3"
                  style={{
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
              )}

              {/* Main dot */}
              <circle
                cx={x}
                cy="30"
                r="3"
                fill={item.color}
                opacity={isActive ? '1' : '0.8'}
                style={{
                  transition: 'all 0.3s ease',
                  filter: isActive ? `drop-shadow(0 0 4px ${item.color})` : 'none',
                }}
              />

              {/* Center dot (for active state) */}
              {isActive && (
                <circle
                  cx={x}
                  cy="30"
                  r="1.5"
                  fill="var(--bg-primary)"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Labels container */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '10%',
          paddingRight: '10%',
          gap: '0.5rem',
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => onClick(item.actId)}
            whileTap={{ scale: 0.95 }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              cursor: 'pointer',
              textAlign: 'center',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              background: activeDot === index ? 'var(--glass-05)' : 'transparent',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={() => setActiveDot(index)}
            onMouseLeave={() => setActiveDot(null)}
          >
            {/* Organization name */}
            <div
              style={{
                fontSize: 'clamp(0.6875rem, 1.5vw, 0.75rem)',
                fontWeight: '500',
                color: 'var(--text-90)',
                letterSpacing: '-0.01em',
              }}
            >
              {item.organization.split(' ')[0]} {/* First word only for space */}
            </div>

            {/* Timeframe */}
            <div
              style={{
                fontSize: 'clamp(0.625rem, 1.2vw, 0.6875rem)',
                color: 'var(--text-60)',
              }}
            >
              {item.timeframe}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pulse animation for glow rings */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
