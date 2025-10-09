'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { LabNotebookEntry } from '@/types/labs';

interface LabTimelineViewProps {
  entries: LabNotebookEntry[];
  className?: string;
}

export function LabTimelineView({ entries, className }: LabTimelineViewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className={cn('relative', className)}>
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--brand-red)]/50 via-[var(--brand-red)]/20 to-transparent" />

      {/* Entries */}
      <div className="space-y-8">
        {entries.map((entry, index) => {
          const isExpanded = expandedId === entry.id;

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-[var(--brand-red)] border-4 border-[var(--bg-primary)] shadow-lg shadow-[var(--brand-red)]/50" />

              {/* Entry card */}
              <motion.button
                onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                className={cn(
                  'w-full text-left group',
                  'p-8 rounded-2xl',
                  'bg-white/[0.08] border border-white/[0.20]',
                  '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]',
                  'hover:bg-white/[0.10] hover:border-white/[0.30]',
                  '[data-theme="light"] &:hover:bg-black/[0.10] [data-theme="light"] &:hover:border-black/[0.30]',
                  'shadow-lg hover:shadow-xl',
                  'transition-all duration-300'
                )}
                style={{
                  backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                  WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                }}
              >
                <div className="flex items-start gap-4">
                  <Calendar size={18} className="text-[var(--brand-red)] mt-1 flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    {/* Date and experiment */}
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-sm font-medium text-white/60 [data-theme='light'] &:text-black/60">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="text-sm text-white/40 [data-theme='light'] &:text-black/40">•</span>
                      <span className="text-sm font-medium text-[var(--brand-red)]">
                        {entry.experimentTitle}
                      </span>
                    </div>

                    {/* Note */}
                    <p className={cn(
                      'text-base leading-relaxed',
                      'text-white/90',
                      '[data-theme="light"] &:text-black/90',
                      !isExpanded && 'line-clamp-2'
                    )}>
                      {entry.note}
                    </p>

                    {/* Expand indicator */}
                    {entry.note.length > 100 && (
                      <div className="flex items-center gap-2 mt-3 text-sm text-white/50 group-hover:text-[var(--brand-red)] transition-colors">
                        <span>{isExpanded ? 'Show less' : 'Read more'}</span>
                        <ChevronDown
                          size={14}
                          className={cn(
                            'transition-transform duration-300',
                            isExpanded && 'rotate-180'
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
