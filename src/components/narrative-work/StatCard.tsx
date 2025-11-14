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
      className="relative p-8 rounded-2xl transition-all duration-500 cursor-default"
      style={{
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
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${stat.color}, 0.8), transparent)`,
            animation: 'shimmerLine 2s ease-in-out infinite',
          }}
        />
      )}

      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
          style={{
            background: `rgba(${stat.color}, 0.1)`,
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <Icon size={20} style={{ color: `rgb(${stat.color})` }} />
        </div>

        <div className="flex-1">
          <div
            className="text-4xl font-semibold mb-2 leading-none"
            style={{ color: 'rgba(255, 255, 255, 0.95)' }}
          >
            {stat.value}
          </div>
          <div
            className="text-sm font-light tracking-wide"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} inView={inView} />
      ))}
    </div>
  );
}
