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
        'min-h-[120px] p-6 rounded-2xl',
        'bg-white/[0.02] border border-white/[0.04]',
        '[data-theme="light"] &:bg-black/[0.02] [data-theme="light"] &:border-black/[0.04]',
        'hover:bg-white/[0.04] hover:border-white/[0.08]',
        '[data-theme="light"] &:hover:bg-black/[0.04] [data-theme="light"] &:hover:border-black/[0.08]',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-300',
        highlight && 'ring-1 ring-[var(--brand-red)]/15 bg-white/[0.03]',
        className
      )}
      style={{
        backdropFilter: 'blur(40px) saturate(170%) brightness(1.18)',
        WebkitBackdropFilter: 'blur(40px) saturate(170%) brightness(1.18)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Stat value */}
      <div className="flex items-baseline gap-2 mb-2">
        <div
          className={cn(
            'text-4xl font-bold tabular-nums',
            highlight ? 'text-[var(--brand-red)]' : 'text-[var(--text-primary)]'
          )}
        >
          {count}
        </div>

        {/* Trend indicator */}
        {trend && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
            <TrendingUp size={10} className="text-green-400" />
            <span className="text-[10px] font-medium text-green-400">
              +{trend.value}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="text-sm font-medium text-[var(--text-tertiary)]">
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
