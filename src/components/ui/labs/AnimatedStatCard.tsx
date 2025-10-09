'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedStatCardProps {
  value: number;
  label: string;
  trend?: {
    direction: 'up' | 'down';
    value: number;
    period: string;
  };
  highlight?: boolean;
  className?: string;
}

export function AnimatedStatCard({ value, label, trend, highlight = false, className }: AnimatedStatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth count-up
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative group',
        'min-h-[160px] p-12 rounded-3xl',
        'bg-white/[0.08] border border-white/[0.20]',
        '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]',
        'hover:bg-white/[0.10] hover:border-white/[0.30]',
        '[data-theme="light"] &:hover:bg-black/[0.10] [data-theme="light"] &:hover:border-black/[0.30]',
        'shadow-xl hover:shadow-2xl',
        'transition-all duration-300',
        highlight && 'ring-2 ring-[var(--brand-red)]/30',
        className
      )}
      style={{
        backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
      }}
    >
      {/* Stat value */}
      <div className="flex items-baseline gap-3 mb-3">
        <div
          className={cn(
            'text-5xl font-bold tabular-nums',
            highlight ? 'text-[var(--brand-red)]' : 'text-white [data-theme="light"] &:text-black'
          )}
        >
          {count}
        </div>

        {/* Trend indicator */}
        {trend && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30">
            <TrendingUp size={12} className="text-green-400" />
            <span className="text-xs font-medium text-green-400">
              +{trend.value} {trend.period}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      <div
        className={cn(
          'text-base font-medium',
          'text-white/70',
          '[data-theme="light"] &:text-black/70'
        )}
      >
        {label}
      </div>

      {/* Hover glow effect */}
      {highlight && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at center, rgba(218, 14, 41, 0.15) 0%, transparent 70%)',
            mixBlendMode: 'soft-light',
          }}
        />
      )}
    </motion.div>
  );
}
