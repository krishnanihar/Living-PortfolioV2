'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, Lock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LabExperiment } from '@/types/labs';

interface FeaturedExperimentCardProps {
  experiment: LabExperiment;
  onClick?: (experiment: LabExperiment) => void;
  className?: string;
}

export function FeaturedExperimentCard({ experiment, onClick, className }: FeaturedExperimentCardProps) {
  const statusColors = {
    Incubating: '#F59E0B',
    Playable: '#10B981',
    'Field-Tested': '#3B82F6',
    Archived: '#6B7280',
  };

  const accessIcons = {
    Open: null,
    Invite: Lock,
    Internal: Lock,
  };

  const AccessIcon = accessIcons[experiment.access];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick?.(experiment)}
      className={cn(
        'relative group cursor-pointer',
        'md:col-span-2', // Takes 2 columns on desktop for featured effect
        'min-h-[400px] p-12 rounded-3xl',
        'bg-white/[0.08] border-2 border-white/[0.20]',
        '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]',
        'hover:bg-white/[0.10] hover:border-[var(--brand-red)]/40',
        '[data-theme="light"] &:hover:bg-black/[0.10]',
        'shadow-2xl hover:shadow-[0_20px_70px_rgba(218,14,41,0.2)]',
        'transition-all duration-300',
        'overflow-hidden',
        className
      )}
      style={{
        backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
      }}
    >
      {/* Featured badge */}
      <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-red)]/20 border border-[var(--brand-red)]/30">
        <Star size={12} className="text-[var(--brand-red)] fill-[var(--brand-red)]" />
        <span className="text-xs font-medium text-[var(--brand-red)]">Featured</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3
              className={cn(
                'text-3xl font-semibold mb-3',
                'text-white',
                '[data-theme="light"] &:text-black',
                'group-hover:text-[var(--brand-red)] transition-colors duration-300'
              )}
            >
              {experiment.title}
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Status dot */}
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: statusColors[experiment.status] }}
                />
                <span className="text-sm font-medium text-white/70 [data-theme='light'] &:text-black/70">
                  {experiment.status}
                </span>
              </div>

              {/* TRL Badge */}
              <div
                className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  'bg-white/15 border border-white/25',
                  '[data-theme="light"] &:bg-black/15 [data-theme="light"] &:border-black/25',
                  'text-white/80',
                  '[data-theme="light"] &:text-black/80'
                )}
              >
                TRL {experiment.trl}
              </div>

              {/* Access Icon */}
              {AccessIcon && (
                <AccessIcon
                  size={14}
                  className="text-white/50 [data-theme='light'] &:text-black/50"
                />
              )}
            </div>
          </div>
        </div>

        {/* One-liner */}
        <p
          className={cn(
            'text-lg leading-relaxed',
            'text-white/85',
            '[data-theme="light"] &:text-black/85'
          )}
        >
          {experiment.oneLiner}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {experiment.domain.map((domain) => (
          <span
            key={domain}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium',
              'bg-[var(--brand-red)]/15 text-[var(--brand-red)]',
              'border border-[var(--brand-red)]/25'
            )}
          >
            {domain}
          </span>
        ))}
        {experiment.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm',
              'bg-white/10 text-white/70 border border-white/15',
              '[data-theme="light"] &:bg-black/10 [data-theme="light"] &:text-black/70 [data-theme="light"] &:border-black/15'
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer with quick actions */}
      <div className="flex items-center justify-between pt-6 border-t border-white/15 [data-theme='light'] &:border-black/15">
        <span className="text-sm font-medium text-white/60 [data-theme='light'] &:text-black/60">
          Updated {new Date(experiment.dates.updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>

        <div className="flex items-center gap-3">
          {experiment.links.demo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(experiment.links.demo, '_blank');
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl',
                'text-white/80 hover:text-white',
                '[data-theme="light"] &:text-black/80 [data-theme="light"] &:hover:text-black',
                'bg-white/10 hover:bg-[var(--brand-red)] hover:text-white',
                '[data-theme="light"] &:bg-black/10',
                'border border-white/20 hover:border-[var(--brand-red)]',
                'transition-all duration-200'
              )}
              aria-label="View demo"
            >
              <Play size={14} />
              <span className="text-sm font-medium">Demo</span>
            </button>
          )}
          {experiment.links.repo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(experiment.links.repo, '_blank');
              }}
              className={cn(
                'p-2.5 rounded-xl',
                'text-white/70 hover:text-[var(--brand-red)]',
                '[data-theme="light"] &:text-black/70',
                'bg-white/10 hover:bg-white/15',
                '[data-theme="light"] &:hover:bg-black/15',
                'border border-white/20',
                'transition-all duration-200'
              )}
              aria-label="View code"
            >
              <Github size={16} />
            </button>
          )}
          <button
            className={cn(
              'p-2.5 rounded-xl',
              'text-white/70 hover:text-[var(--brand-red)]',
              '[data-theme="light"] &:text-black/70',
              'bg-white/10 hover:bg-white/15',
              '[data-theme="light"] &:hover:bg-black/15',
              'border border-white/20',
              'transition-all duration-200'
            )}
            aria-label="View details"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(218, 14, 41, 0.1) 0%, transparent 70%)',
          mixBlendMode: 'soft-light',
        }}
      />
    </motion.article>
  );
}
