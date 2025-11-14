'use client';

import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export interface StatCardData {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string; // RGB format: '99, 102, 241'
  target?: number;
}

interface StatCardProps {
  stat: StatCardData;
  index: number;
  inView: boolean;
}

/**
 * Animated stat card with hover effects
 * Extracted from AirIndiaWork for reuse
 */
export function StatCard({ stat, index, inView }: StatCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '2rem',
        borderRadius: '1rem',
        transition: 'all 500ms ease',
        cursor: 'default',
        background: isHovered
          ? `linear-gradient(135deg, rgba(${stat.color}, 0.08), rgba(255, 255, 255, 0.02))`
          : 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(40px) saturate(120%)',
        WebkitBackdropFilter: 'blur(40px) saturate(120%)',
        border: `1px solid ${isHovered ? `rgba(${stat.color}, 0.3)` : 'rgba(255, 255, 255, 0.06)'}`,
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? `0 20px 40px rgba(${stat.color}, 0.15)`
          : '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Shimmer Line on hover */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, rgba(${stat.color}, 0.8), transparent)`,
            animation: 'shimmerLine 2s ease-in-out infinite',
          }}
        />
      )}

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        <div
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 500ms ease',
            background: `rgba(${stat.color}, 0.1)`,
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <Icon size={20} style={{ color: `rgb(${stat.color})` }} />
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '2.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              lineHeight: '1',
              color: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: '300',
              letterSpacing: '0.025em',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Grid of stat cards
 */
interface StatCardGridProps {
  stats: StatCardData[];
  inView: boolean;
}

export function StatCardGrid({ stats, inView }: StatCardGridProps) {
  return (
    <>
      <style jsx>{`
        @media (min-width: 768px) {
          .stat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .stat-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      `}</style>
      <div className="stat-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
        gap: '1.5rem',
      }}>
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} inView={inView} />
        ))}
      </div>
    </>
  );
}
