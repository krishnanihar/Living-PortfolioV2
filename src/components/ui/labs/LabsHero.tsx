'use client';

import { motion } from 'framer-motion';
import { Beaker, Shuffle, Lightbulb, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LabsHeroProps } from '@/types/labs';

export function LabsHero({ onBrowse, onRandom, onSubmit, onGetCode }: LabsHeroProps) {
  const ctaButtons = [
    {
      label: 'Browse',
      icon: Beaker,
      onClick: onBrowse,
      variant: 'primary' as const,
    },
    {
      label: 'Random',
      icon: Shuffle,
      onClick: onRandom,
      variant: 'secondary' as const,
    },
    {
      label: 'Submit Idea',
      icon: Lightbulb,
      onClick: onSubmit,
      variant: 'secondary' as const,
    },
    {
      label: 'Get Code',
      icon: Github,
      onClick: onGetCode,
      variant: 'secondary' as const,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full py-16 px-6"
    >
      {/* Glassmorphic container */}
      <div
        className={cn(
          'max-w-5xl mx-auto',
          'p-8 md:p-12',
          'rounded-3xl',
          'border border-white/10',
          'bg-white/[0.04]',
          '[data-theme="light"] &:bg-black/[0.04] [data-theme="light"] &:border-black/10',
          'shadow-2xl'
        )}
        style={{
          backdropFilter: 'blur(60px) saturate(180%) brightness(0.9)',
          WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(0.9)',
        }}
      >
        {/* Beaker icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div
            className={cn(
              'w-16 h-16 rounded-2xl',
              'flex items-center justify-center',
              'bg-gradient-to-br from-[var(--brand-red)]/20 to-[var(--brand-red)]/10',
              'border border-[var(--brand-red)]/20',
              'shadow-lg shadow-[var(--brand-red)]/10'
            )}
          >
            <Beaker className="w-8 h-8 text-[var(--brand-red)]" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={cn(
            'text-4xl md:text-5xl font-light text-center mb-4',
            'bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent',
            '[data-theme="light"] &:from-black [data-theme="light"] &:via-black/90 [data-theme="light"] &:to-black/70'
          )}
        >
          Nihar Labs
        </motion.h1>

        {/* One-liner */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={cn(
            'text-lg md:text-xl text-center mb-8 max-w-3xl mx-auto',
            'text-white/70',
            '[data-theme="light"] &:text-black/70'
          )}
        >
          Rapid experiments in AI, mobility, and new media. Shipping prototypes weekly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {ctaButtons.map((button, index) => {
            const Icon = button.icon;
            const isPrimary = button.variant === 'primary';

            return (
              <motion.button
                key={button.label}
                onClick={button.onClick}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-full',
                  'text-sm font-medium',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                  isPrimary
                    ? [
                        'bg-[var(--brand-red)] text-white',
                        'hover:bg-[var(--brand-red)]/90',
                        'shadow-lg shadow-[var(--brand-red)]/20',
                        'border border-[var(--brand-red)]/30',
                      ]
                    : [
                        'bg-white/10 text-white/90 border border-white/20',
                        '[data-theme="light"] &:bg-black/10 [data-theme="light"] &:text-black/90 [data-theme="light"] &:border-black/20',
                        'hover:bg-white/15 hover:border-white/30',
                        '[data-theme="light"] &:hover:bg-black/15 [data-theme="light"] &:hover:border-black/30',
                        'backdrop-blur-sm',
                      ]
                )}
              >
                <Icon size={16} />
                <span>{button.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
