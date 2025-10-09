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
      whileHover={{ y: -16, scale: 1.01 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick?.(experiment)}
      className={cn(
        'relative group cursor-pointer overflow-hidden',
        'min-h-[600px] p-16 md:p-20 rounded-[2.5rem]',
        'transition-all duration-500',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.35) 0%, rgba(239, 68, 68, 0.25) 50%, rgba(251, 146, 60, 0.15) 100%)',
        backdropFilter: 'blur(80px) saturate(200%) brightness(1.25)',
        WebkitBackdropFilter: 'blur(80px) saturate(200%) brightness(1.25)',
        border: '2px solid rgba(255, 255, 255, 0.25)',
        boxShadow: 'inset 0 4px 0 rgba(255, 255, 255, 0.2), 0 40px 80px rgba(218, 14, 41, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15)',
      }}
    >
      {/* Featured badge */}
      <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-red)]/20 border border-[var(--brand-red)]/30">
        <Star size={12} className="text-[var(--brand-red)] fill-[var(--brand-red)]" />
        <span className="text-xs font-medium text-[var(--brand-red)]">Featured</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-5 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3
              className={cn(
                'text-4xl md:text-7xl font-extralight mb-6 tracking-tight',
                'text-[var(--text-primary)]',
                'group-hover:text-white transition-colors duration-300'
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
                <span className="text-sm font-medium text-[var(--text-tertiary)]">
                  {experiment.status}
                </span>
              </div>

              {/* TRL Badge */}
              <div
                className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  'bg-white/[0.08] border border-white/[0.12]',
                  '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.12]',
                  'text-[var(--text-tertiary)]'
                )}
              >
                TRL {experiment.trl}
              </div>

              {/* Access Icon */}
              {AccessIcon && (
                <AccessIcon
                  size={14}
                  className="text-[var(--text-muted)]"
                />
              )}
            </div>
          </div>
        </div>

        {/* One-liner */}
        <p className="text-2xl md:text-3xl leading-relaxed text-[var(--text-secondary)] font-light">
          {experiment.oneLiner}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {experiment.domain.map((domain) => (
          <span
            key={domain}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium',
              'bg-[var(--brand-red)]/12 text-[var(--brand-red)]',
              'border border-[var(--brand-red)]/20'
            )}
          >
            {domain}
          </span>
        ))}
        {experiment.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium',
              'bg-white/[0.05] text-[var(--text-tertiary)] border border-white/[0.10]',
              '[data-theme="light"] &:bg-black/[0.05] [data-theme="light"] &:border-black/[0.10]'
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer with quick actions */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--border-primary)]">
        <span className="text-sm font-medium text-[var(--text-tertiary)]">
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
                'text-[var(--text-primary)] hover:text-white',
                'bg-white/[0.08] hover:bg-[var(--brand-red)]',
                '[data-theme="light"] &:bg-black/[0.08]',
                'border border-white/[0.12] hover:border-[var(--brand-red)]',
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
                'text-[var(--text-tertiary)] hover:text-[var(--brand-red)]',
                'bg-white/[0.05] hover:bg-white/[0.08]',
                '[data-theme="light"] &:bg-black/[0.05] [data-theme="light"] &:hover:bg-black/[0.08]',
                'border border-white/[0.10]',
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
              'text-[var(--text-tertiary)] hover:text-[var(--brand-red)]',
              'bg-white/[0.05] hover:bg-white/[0.08]',
              '[data-theme="light"] &:bg-black/[0.05] [data-theme="light"] &:hover:bg-black/[0.08]',
              'border border-white/[0.10]',
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
