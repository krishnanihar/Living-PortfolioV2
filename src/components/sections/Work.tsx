'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FilterTabsAccessible } from '@/components/ui/FilterTabs';
import { WorkGrid } from '@/components/ui/WorkGrid';
import { projects, filterTabs, getProjectsByCategory } from '@/data/projects';
import { FilterCategory } from '@/types/projects';
import { cn } from '@/lib/utils';

interface WorkProps {
  className?: string;
  initialFilter?: FilterCategory;
}

export function Work({ className, initialFilter = 'all' }: WorkProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(initialFilter);
  const [isVisible, setIsVisible] = useState(false);

  // Add project counts to filter tabs
  const tabsWithCounts = filterTabs.map(tab => ({
    ...tab,
    count: tab.id === 'all' ? projects.length : getProjectsByCategory(tab.id).length,
  }));

  // Reveal animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filter: FilterCategory) => {
    setActiveFilter(filter);

    // Update URL without page reload (for shareable filtered views)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (filter === 'all') {
        url.searchParams.delete('filter');
      } else {
        url.searchParams.set('filter', filter);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  if (!isVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={cn(
          'animate-pulse text-white/60 [data-theme="light"]:text-black/60'
        )}>
          Loading work...
        </div>
      </div>
    );
  }

  return (
    <section
      className={cn(
        'min-h-screen py-20',
        className
      )}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-4xl mx-auto px-6 mb-16"
      >
        <h1 className={cn(
          'text-4xl md:text-5xl lg:text-6xl font-extralight mb-6',
          'text-white/95 [data-theme="light"]:text-black/95',
          'tracking-tight leading-tight'
        )}>
          Selected Work
        </h1>
        <p className={cn(
          'text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto',
          'text-white/80 [data-theme="light"]:text-black/80'
        )}>
          Design systems, mobile experiences, and aviation interfaces that serve{' '}
          <span className="text-emerald-400 font-medium">450+ daily users</span>{' '}
          at Air India. From Figma plugins to hackathon prototypes in production.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-20 z-40 bg-dark-bg-primary/80 backdrop-blur-md py-4 [data-theme='light']:bg-light-bg-primary/80"
      >
        <FilterTabsAccessible
          tabs={tabsWithCounts}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <WorkGrid
          projects={projects}
          activeFilter={activeFilter}
        />
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto px-6 mt-20"
      >
        <div className={cn(
          'p-8 rounded-2xl',
          'bg-white/5 backdrop-blur-md border border-white/10',
          '[data-theme="light"]:bg-black/5 [data-theme="light"]:border-black/10'
        )}>
          <h2 className={cn(
            'text-2xl font-light mb-4',
            'text-white/90 [data-theme="light"]:text-black/90'
          )}>
            Interested in working together?
          </h2>
          <p className={cn(
            'text-sm mb-6 leading-relaxed',
            'text-white/70 [data-theme="light"]:text-black/70'
          )}>
            I'm always excited to discuss new projects, design systems, and consciousness-aware interfaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'px-6 py-3 rounded-full font-medium text-sm',
                'bg-brand-red text-white',
                'hover:bg-red-600 hover:scale-105',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.a>
            <motion.a
              href="mailto:nihar@example.com"
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'px-6 py-3 rounded-full font-medium text-sm',
                'bg-white/10 text-white border border-white/20',
                '[data-theme="light"]:bg-black/10 [data-theme="light"]:text-black [data-theme="light"]:border-black/20',
                'hover:bg-white/20 hover:scale-105',
                '[data-theme="light"]:hover:bg-black/20',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Email
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}