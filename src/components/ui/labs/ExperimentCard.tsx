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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(experiment)}
      className={cn(
        'relative group cursor-pointer',
        'min-h-[320px] p-10 rounded-3xl',
        'bg-white/[0.08] border border-white/[0.20]',
        '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]',
        'hover:bg-white/[0.10] hover:border-white/[0.30]',
        '[data-theme="light"] &:hover:bg-black/[0.10] [data-theme="light"] &:hover:border-black/[0.30]',
        'shadow-xl hover:shadow-2xl',
        'transition-all duration-300',
        className
      )}
      style={{
        backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'text-xl font-semibold mb-2 truncate',
              'text-white',
              '[data-theme="light"] &:text-black',
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
              <span className="text-xs text-white/60 [data-theme='light'] &:text-black/60">
                {experiment.status}
              </span>
            </div>

            {/* TRL Badge */}
            <div
              className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                'bg-white/10 border border-white/20',
                '[data-theme="light"] &:bg-black/10 [data-theme="light"] &:border-black/20',
                'text-white/70',
                '[data-theme="light"] &:text-black/70'
              )}
            >
              TRL {experiment.trl}
            </div>

            {/* Access Icon */}
            {AccessIcon && (
              <AccessIcon
                size={12}
                className="text-white/50 [data-theme='light'] &:text-black/50"
              />
            )}
          </div>
        </div>
      </div>

      {/* One-liner */}
      <p
        className={cn(
          'text-base mb-6 line-clamp-2 leading-relaxed',
          'text-white/85',
          '[data-theme="light"] &:text-black/85'
        )}
      >
        {experiment.oneLiner}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {experiment.domain.slice(0, 2).map((domain) => (
          <span
            key={domain}
            className={cn(
              'px-2 py-1 rounded-md text-xs',
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
              'px-2 py-1 rounded-md text-xs',
              'bg-white/5 text-white/60 border border-white/10',
              '[data-theme="light"] &:bg-black/5 [data-theme="light"] &:text-black/60 [data-theme="light"] &:border-black/10'
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer with quick actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10 [data-theme='light'] &:border-black/10">
        <span className="text-xs text-white/50 [data-theme='light'] &:text-black/50">
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
                'p-1.5 rounded-lg',
                'text-white/60 hover:text-[var(--brand-red)]',
                '[data-theme="light"] &:text-black/60',
                'hover:bg-white/10',
                '[data-theme="light"] &:hover:bg-black/10',
                'transition-colors duration-200'
              )}
              aria-label="View demo"
            >
              <Play size={14} />
            </button>
          )}
          {experiment.links.repo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(experiment.links.repo, '_blank');
              }}
              className={cn(
                'p-1.5 rounded-lg',
                'text-white/60 hover:text-[var(--brand-red)]',
                '[data-theme="light"] &:text-black/60',
                'hover:bg-white/10',
                '[data-theme="light"] &:hover:bg-black/10',
                'transition-colors duration-200'
              )}
              aria-label="View code"
            >
              <Github size={14} />
            </button>
          )}
          <button
            className={cn(
              'p-1.5 rounded-lg',
              'text-white/60 hover:text-[var(--brand-red)]',
              '[data-theme="light"] &:text-black/60',
              'hover:bg-white/10',
              '[data-theme="light"] &:hover:bg-black/10',
              'transition-colors duration-200'
            )}
            aria-label="View details"
          >
            <ExternalLink size={14} />
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
