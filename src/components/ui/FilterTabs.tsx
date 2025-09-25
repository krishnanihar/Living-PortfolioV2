'use client';

import { motion } from 'framer-motion';
import { FilterTabsProps, FilterCategory } from '@/types/projects';
import { cn } from '@/lib/utils';

export function FilterTabs({
  tabs,
  activeFilter,
  onFilterChange,
  className,
}: FilterTabsProps) {
  return (
    <div className={cn('flex justify-center p-6', className)}>
      <div className={cn(
        'relative flex gap-1 p-1 rounded-full',
        'bg-white/5 backdrop-blur-md border border-white/10',
        '[data-theme="light"] &:bg-black/5 [data-theme="light"] &:border-black/10',
        'shadow-lg'
      )}>
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={cn(
                'relative px-4 py-2 rounded-full text-sm font-medium',
                'transition-all duration-200 ease-premium',
                'hover:scale-105 focus:scale-105',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                'min-h-[40px] min-w-[80px]',
                // Default state
                !isActive && [
                  'text-white/70 hover:text-white/90',
                  '[data-theme="light"] &:text-black/70 [data-theme="light"] &:hover:text-black/90',
                  'hover:bg-white/5',
                  '[data-theme="light"] &:hover:bg-black/5',
                ],
                // Active state
                isActive && [
                  'text-white relative z-10',
                  '[data-theme="light"] &:text-black',
                ]
              )}
              aria-pressed={isActive}
              role="tab"
              tabIndex={isActive ? 0 : -1}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="filter-active-bg"
                  className={cn(
                    'absolute inset-0 rounded-full',
                    'bg-white/15 border border-white/20',
                    '[data-theme="light"] &:bg-black/15 [data-theme="light"] &:border-black/20',
                    'shadow-sm'
                  )}
                  style={{
                    backgroundColor: tab.color ? `${tab.color}20` : undefined,
                    borderColor: tab.color ? `${tab.color}40` : undefined,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Tab content */}
              <span className="relative z-10 flex items-center gap-2">
                {/* Category color dot */}
                {tab.color && tab.id !== 'all' && (
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-200',
                      isActive ? 'opacity-100' : 'opacity-60'
                    )}
                    style={{ backgroundColor: tab.color }}
                  />
                )}

                {tab.label}

                {/* Count badge */}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    'bg-white/10 border border-white/20',
                    '[data-theme="light"] &:bg-black/10 [data-theme="light"] &:border-black/20',
                    'transition-all duration-200',
                    isActive && 'bg-white/20 border-white/30',
                    '[data-theme="light"] isActive:bg-black/20 [data-theme="light"] isActive:border-black/30'
                  )}>
                    {tab.count}
                  </span>
                )}
              </span>

              {/* Hover glow effect */}
              <div
                className={cn(
                  'absolute inset-0 rounded-full opacity-0',
                  'transition-opacity duration-300',
                  'hover:opacity-100',
                  'bg-gradient-to-r from-transparent via-white/5 to-transparent',
                  '[data-theme="light"] &:via-black/5'
                )}
                style={{
                  background: tab.color && isActive
                    ? `radial-gradient(circle, ${tab.color}15, transparent 70%)`
                    : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Keyboard navigation component wrapper
export function FilterTabsAccessible(props: FilterTabsProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { tabs, activeFilter, onFilterChange } = props;
    const currentIndex = tabs.findIndex(tab => tab.id === activeFilter);

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        onFilterChange(tabs[prevIndex].id);
        break;
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        onFilterChange(tabs[nextIndex].id);
        break;
      case 'Home':
        e.preventDefault();
        onFilterChange(tabs[0].id);
        break;
      case 'End':
        e.preventDefault();
        onFilterChange(tabs[tabs.length - 1].id);
        break;
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      onKeyDown={handleKeyDown}
      className="focus-within:outline-none"
    >
      <FilterTabs {...props} />
    </div>
  );
}