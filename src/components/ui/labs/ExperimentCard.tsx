'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ExperimentCardProps } from '@/types/labs';

export function ExperimentCard({ experiment, onClick, className }: ExperimentCardProps) {
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
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick?.(experiment)}
      className={cn(
        'relative group cursor-pointer overflow-hidden',
        'min-h-[500px] p-12 md:p-16 rounded-[2rem]',
        'transition-all duration-500',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.15) 100%)',
        backdropFilter: 'blur(60px) saturate(180%) brightness(1.2)',
        WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(1.2)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: 'inset 0 2px 0 rgba(255, 255, 255, 0.15), 0 30px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-12">
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'text-3xl md:text-5xl font-light mb-8 tracking-tight',
              'text-[var(--text-primary)]',
              'group-hover:text-[var(--brand-red)] transition-colors duration-300'
            )}
          >
            {experiment.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status dot */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: statusColors[experiment.status] }}
              />
              <span className="text-xs text-[var(--text-tertiary)]">
                {experiment.status}
              </span>
            </div>

            {/* TRL Badge */}
            <div
              className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                'bg-white/[0.05] border border-white/[0.10]',
                '[data-theme="light"] &:bg-black/[0.05] [data-theme="light"] &:border-black/[0.10]',
                'text-[var(--text-tertiary)]'
              )}
            >
              TRL {experiment.trl}
            </div>

            {/* Access Icon */}
            {AccessIcon && (
              <AccessIcon
                size={12}
                className="text-[var(--text-muted)]"
              />
            )}
          </div>
        </div>
      </div>

      {/* One-liner */}
      <p className="text-xl md:text-2xl mb-20 line-clamp-3 leading-relaxed text-[var(--text-secondary)] font-light">
        {experiment.oneLiner}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-16">
        {experiment.domain.slice(0, 2).map((domain) => (
          <span
            key={domain}
            className={cn(
              'px-2.5 py-1 rounded-lg text-xs font-medium',
              'bg-[var(--brand-red)]/10 text-[var(--brand-red)]',
              'border border-[var(--brand-red)]/20'
            )}
          >
            {domain}
          </span>
        ))}
        {experiment.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className={cn(
              'px-2.5 py-1 rounded-lg text-xs font-medium',
              'bg-white/[0.04] text-[var(--text-tertiary)] border border-white/[0.08]',
              '[data-theme="light"] &:bg-black/[0.04] [data-theme="light"] &:border-black/[0.08]'
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer with quick actions */}
      <div className="flex items-center justify-between pt-12 border-t border-[var(--border-primary)]">
        <span className="text-xs text-[var(--text-muted)]">
          Updated {new Date(experiment.dates.updated).toLocaleDateString()}
        </span>

        <div className="flex items-center gap-2">
          {experiment.links.demo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(experiment.links.demo, '_blank');
              }}
              className={cn(
                'p-2 rounded-lg',
                'text-[var(--text-tertiary)] hover:text-[var(--brand-red)]',
                'hover:bg-white/[0.05]',
                '[data-theme="light"] &:hover:bg-black/[0.05]',
                'transition-colors duration-200'
              )}
              aria-label="View demo"
            >
              <Play size={16} />
            </button>
          )}
          {experiment.links.repo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(experiment.links.repo, '_blank');
              }}
              className={cn(
                'p-2 rounded-lg',
                'text-[var(--text-tertiary)] hover:text-[var(--brand-red)]',
                'hover:bg-white/[0.05]',
                '[data-theme="light"] &:hover:bg-black/[0.05]',
                'transition-colors duration-200'
              )}
              aria-label="View code"
            >
              <Github size={16} />
            </button>
          )}
          <button
            className={cn(
              'p-2 rounded-lg',
              'text-[var(--text-tertiary)] hover:text-[var(--brand-red)]',
              'hover:bg-white/[0.05]',
              '[data-theme="light"] &:hover:bg-black/[0.05]',
              'transition-colors duration-200'
            )}
            aria-label="View details"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, var(--brand-red) 0%, transparent 70%)',
          mixBlendMode: 'soft-light',
        }}
      />
    </motion.article>
  );
}
