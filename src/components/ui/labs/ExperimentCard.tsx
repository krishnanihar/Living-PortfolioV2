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
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick?.(experiment)}
      className={cn(
        'relative group cursor-pointer',
        'min-h-[320px] p-8 rounded-3xl',
        'bg-white/[0.02] border border-white/[0.04]',
        '[data-theme="light"] &:bg-black/[0.02] [data-theme="light"] &:border-black/[0.04]',
        'hover:bg-white/[0.04] hover:border-white/[0.08]',
        '[data-theme="light"] &:hover:bg-black/[0.04] [data-theme="light"] &:hover:border-black/[0.08]',
        'shadow-xl',
        'transition-all duration-300',
        className
      )}
      style={{
        backdropFilter: 'blur(40px) saturate(170%) brightness(1.18)',
        WebkitBackdropFilter: 'blur(40px) saturate(170%) brightness(1.18)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 20px 40px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'text-xl font-semibold mb-3 truncate',
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
      <p className="text-base mb-8 line-clamp-2 leading-relaxed text-[var(--text-secondary)]">
        {experiment.oneLiner}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
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
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-primary)]">
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
