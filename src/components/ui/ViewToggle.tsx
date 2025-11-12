'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export type ViewMode = 'grid' | 'fullscreen';

export interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ viewMode, onViewModeChange, className }: ViewToggleProps) {
  const [hoveredMode, setHoveredMode] = useState<ViewMode | null>(null);

  return (
    <div
      className={cn(
        'fixed top-32 left-1/2 -translate-x-1/2 z-40',
        'hidden md:block', // Hide on mobile, show on tablet+
        className
      )}
      role="radiogroup"
      aria-label="View mode selection"
    >
      <div className={cn(
        'relative flex gap-1 p-1 rounded-full',
        'bg-white/5 backdrop-blur-xl border border-white/10',
        '[data-theme="light"] &:bg-black/5 [data-theme="light"] &:border-black/10',
        'shadow-lg shadow-black/20'
      )}>
        {/* Grid View Button */}
        <button
          onClick={() => onViewModeChange('grid')}
          onMouseEnter={() => setHoveredMode('grid')}
          onMouseLeave={() => setHoveredMode(null)}
          className={cn(
            'relative p-2.5 rounded-full',
            'transition-all duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-black',
            'min-h-[44px] min-w-[44px]',
            'flex items-center justify-center',
            // Default state
            viewMode !== 'grid' && [
              'text-white/60 hover:text-white/90',
              '[data-theme="light"] &:text-black/60 [data-theme="light"] &:hover:text-black/90',
              'hover:bg-white/5',
              '[data-theme="light"] &:hover:bg-black/5',
            ],
            // Active state
            viewMode === 'grid' && [
              'text-white',
              '[data-theme="light"] &:text-black',
            ]
          )}
          aria-label="Grid view"
          aria-checked={viewMode === 'grid'}
          role="radio"
          title="Grid view (G)"
        >
          {/* Active background */}
          {viewMode === 'grid' && (
            <motion.div
              layoutId="view-toggle-active-bg"
              className={cn(
                'absolute inset-0 rounded-full',
                'bg-brand-red border border-brand-red/40',
                'shadow-lg shadow-brand-red/20'
              )}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}

          {/* Icon */}
          <motion.div
            className="relative z-10"
            animate={{
              scale: viewMode === 'grid' ? 1 : 0.9,
              rotate: viewMode === 'grid' ? 0 : -5,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <LayoutGrid size={20} strokeWidth={2} />
          </motion.div>

          {/* Hover glow */}
          <AnimatePresence>
            {hoveredMode === 'grid' && viewMode !== 'grid' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  'absolute inset-0 rounded-full',
                  'bg-gradient-to-r from-transparent via-white/5 to-transparent',
                  '[data-theme="light"] &:via-black/5'
                )}
              />
            )}
          </AnimatePresence>
        </button>

        {/* Fullscreen View Button */}
        <button
          onClick={() => onViewModeChange('fullscreen')}
          onMouseEnter={() => setHoveredMode('fullscreen')}
          onMouseLeave={() => setHoveredMode(null)}
          className={cn(
            'relative p-2.5 rounded-full',
            'transition-all duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-black',
            'min-h-[44px] min-w-[44px]',
            'flex items-center justify-center',
            // Default state
            viewMode !== 'fullscreen' && [
              'text-white/60 hover:text-white/90',
              '[data-theme="light"] &:text-black/60 [data-theme="light"] &:hover:text-black/90',
              'hover:bg-white/5',
              '[data-theme="light"] &:hover:bg-black/5',
            ],
            // Active state
            viewMode === 'fullscreen' && [
              'text-white',
              '[data-theme="light"] &:text-black',
            ]
          )}
          aria-label="Fullscreen view"
          aria-checked={viewMode === 'fullscreen'}
          role="radio"
          title="Fullscreen view (F)"
        >
          {/* Active background */}
          {viewMode === 'fullscreen' && (
            <motion.div
              layoutId="view-toggle-active-bg"
              className={cn(
                'absolute inset-0 rounded-full',
                'bg-brand-red border border-brand-red/40',
                'shadow-lg shadow-brand-red/20'
              )}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}

          {/* Icon */}
          <motion.div
            className="relative z-10"
            animate={{
              scale: viewMode === 'fullscreen' ? 1 : 0.9,
              rotate: viewMode === 'fullscreen' ? 0 : 5,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <Maximize2 size={20} strokeWidth={2} />
          </motion.div>

          {/* Hover glow */}
          <AnimatePresence>
            {hoveredMode === 'fullscreen' && viewMode !== 'fullscreen' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  'absolute inset-0 rounded-full',
                  'bg-gradient-to-r from-transparent via-white/5 to-transparent',
                  '[data-theme="light"] &:via-black/5'
                )}
              />
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredMode && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute top-full mt-2 left-1/2 -translate-x-1/2',
              'px-3 py-1.5 rounded-lg',
              'bg-black/90 backdrop-blur-md border border-white/10',
              '[data-theme="light"] &:bg-white/90 [data-theme="light"] &:border-black/10',
              'text-xs text-white/90',
              '[data-theme="light"] &:text-black/90',
              'whitespace-nowrap pointer-events-none',
              'shadow-lg'
            )}
          >
            {hoveredMode === 'grid' ? 'Grid View (G)' : 'Fullscreen View (F)'}
            <div className={cn(
              'absolute -top-1 left-1/2 -translate-x-1/2',
              'w-2 h-2 rotate-45',
              'bg-black/90 border-l border-t border-white/10',
              '[data-theme="light"] &:bg-white/90 [data-theme="light"] &:border-black/10'
            )} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
