'use client';

import { motion } from 'framer-motion';
import { Beaker } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LabsHeroProps } from '@/types/labs';

export function LabsHero({ onBrowse, onRandom, onSubmit, onGetCode }: LabsHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full min-h-[60vh] flex items-center justify-center px-8"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(218, 14, 41, 0.08) 0%, transparent 50%)',
      }}
    >
      <div className="max-w-[900px] mx-auto text-center">
        {/* Beaker icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 150 }}
          className="flex justify-center mb-8"
        >
          <div
            className={cn(
              'w-20 h-20 rounded-3xl',
              'flex items-center justify-center',
              'bg-gradient-to-br from-[var(--brand-red)]/20 to-[var(--brand-red)]/10',
              'border border-[var(--brand-red)]/30',
              'shadow-2xl shadow-[var(--brand-red)]/20'
            )}
          >
            <Beaker className="w-10 h-10 text-[var(--brand-red)]" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={cn(
            'text-6xl md:text-7xl font-light mb-6',
            'bg-gradient-to-br from-white via-white/95 to-white/80 bg-clip-text text-transparent',
            '[data-theme="light"] &:from-black [data-theme="light"] &:via-black/95 [data-theme="light"] &:to-black/80'
          )}
        >
          Nihar Labs
        </motion.h1>

        {/* One-liner */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={cn(
            'text-xl md:text-2xl max-w-[700px] mx-auto leading-relaxed',
            'text-white/70',
            '[data-theme="light"] &:text-black/70'
          )}
        >
          Rapid experiments in AI, mobility, and new media.
          <br />
          <span className="text-white/90 [data-theme='light'] &:text-black/90">
            Shipping prototypes weekly.
          </span>
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16"
        >
          <button
            onClick={onBrowse}
            className="group flex flex-col items-center gap-2 text-white/40 hover:text-[var(--brand-red)] transition-colors duration-300"
          >
            <span className="text-sm font-medium tracking-wide">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
