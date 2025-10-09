'use client';

import { Suspense, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter as FilterIcon, TrendingUp, Calendar, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { LabsHero } from '@/components/ui/labs/LabsHero';
import { ExperimentCard } from '@/components/ui/labs/ExperimentCard';
import { labExperiments } from '@/data/labs-experiments';
import { labNotebook } from '@/data/labs-notebook';
import { useLabsFilters } from '@/hooks/useLabsFilters';
import { useLabsStats } from '@/hooks/useLabsStats';
import { getFilterOptions } from '@/lib/labs-filters';
import type { LabExperiment, LabDomain, LabModality, LabStatus, LabAccess } from '@/types/labs';

function LabsContent() {
  const [selectedExperiment, setSelectedExperiment] = useState<LabExperiment | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const {
    filters,
    filteredExperiments,
    hasActiveFilters,
    activeFilterCount,
    totalResults,
    totalExperiments,
    toggleDomain,
    toggleModality,
    toggleStatus,
    toggleAccess,
    setSearch,
    setTimeRange,
    clearFilters,
    clearSearch,
  } = useLabsFilters(labExperiments);

  const { stats, badgeCounts, statusBreakdown } = useLabsStats(labExperiments);
  const filterOptions = useMemo(() => getFilterOptions(labExperiments), []);

  // CTA Handlers
  const handleBrowse = () => {
    const gridElement = document.getElementById('experiments-grid');
    gridElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRandom = () => {
    const randomExp = filteredExperiments[Math.floor(Math.random() * filteredExperiments.length)];
    if (randomExp) {
      setSelectedExperiment(randomExp);
    }
  };

  const handleSubmit = () => {
    window.open('mailto:nihar@example.com?subject=Labs%20Idea%20Submission', '_blank');
  };

  const handleGetCode = () => {
    window.open('https://github.com/krishnanihar', '_blank');
  };

  return (
    <>
      <PortfolioNavigation />
      <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-16">
        {/* Hero */}
        <LabsHero
        onBrowse={handleBrowse}
        onRandom={handleRandom}
        onSubmit={handleSubmit}
        onGetCode={handleGetCode}
      />

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-6 mb-8"
      >
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 gap-4',
            'p-6 rounded-2xl',
            'bg-white/[0.06] border border-white/[0.15]',
            '[data-theme="light"] &:bg-black/[0.06] [data-theme="light"] &:border-black/[0.15]'
          )}
          style={{
            backdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
          }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white [data-theme='light'] &:text-black mb-1">
              {stats.totalExperiments}
            </div>
            <div className="text-sm text-white/60 [data-theme='light'] &:text-black/60">
              Total Experiments
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--brand-red)] mb-1">
              {stats.activeExperiments}
            </div>
            <div className="text-sm text-white/60 [data-theme='light'] &:text-black/60">
              Active
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white [data-theme='light'] &:text-black mb-1">
              {stats.weeklyStreak}
            </div>
            <div className="text-sm text-white/60 [data-theme='light'] &:text-black/60">
              Week Streak
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white [data-theme='light'] &:text-black mb-1">
              {badgeCounts['Open-Source']}
            </div>
            <div className="text-sm text-white/60 [data-theme='light'] &:text-black/60">
              Open Source
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters & Search Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 [data-theme='light'] &:text-black/40"
            />
            <input
              type="text"
              placeholder="Search experiments..."
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                'w-full pl-12 pr-10 py-3 rounded-xl',
                'bg-white/[0.06] border border-white/[0.15]',
                '[data-theme="light"] &:bg-black/[0.06] [data-theme="light"] &:border-black/[0.15]',
                'text-white placeholder:text-white/40',
                '[data-theme="light"] &:text-black [data-theme="light"] &:placeholder:text-black/40',
                'focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]/50',
                'transition-all duration-200'
              )}
              style={{
                backdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
              }}
            />
            {filters.search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white [data-theme='light'] &:text-black/60 [data-theme='light'] &:hover:text-black"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl',
              'bg-white/[0.06] border border-white/[0.15]',
              '[data-theme="light"] &:bg-black/[0.06] [data-theme="light"] &:border-black/[0.15]',
              'text-white hover:text-[var(--brand-red)]',
              '[data-theme="light"] &:text-black',
              'transition-colors duration-200',
              hasActiveFilters && 'ring-2 ring-[var(--brand-red)]/30'
            )}
            style={{
              backdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
            }}
          >
            <FilterIcon size={18} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[var(--brand-red)] text-white text-xs font-medium">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  'mt-4 p-6 rounded-2xl',
                  'bg-white/[0.06] border border-white/[0.15]',
                  '[data-theme="light"] &:bg-black/[0.06] [data-theme="light"] &:border-black/[0.15]'
                )}
                style={{
                  backdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
                }}
              >
                {/* Domain */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-white/80 [data-theme='light'] &:text-black/80 mb-3">
                    Domain
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.domains.map((domain) => (
                      <button
                        key={domain}
                        onClick={() => toggleDomain(domain as LabDomain)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm',
                          'border transition-all duration-200',
                          filters.domain.includes(domain as LabDomain)
                            ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 [data-theme="light"] &:bg-black/5 [data-theme="light"] &:border-black/10 [data-theme="light"] &:text-black/70'
                        )}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modality */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-white/80 [data-theme='light'] &:text-black/80 mb-3">
                    Modality
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.modalities.map((modality) => (
                      <button
                        key={modality}
                        onClick={() => toggleModality(modality as LabModality)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm',
                          'border transition-all duration-200',
                          filters.modality.includes(modality as LabModality)
                            ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 [data-theme="light"] &:bg-black/5 [data-theme="light"] &:border-black/10 [data-theme="light"] &:text-black/70'
                        )}
                      >
                        {modality}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-white/80 [data-theme='light'] &:text-black/80 mb-3">
                    Status
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => toggleStatus(status as LabStatus)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm',
                          'border transition-all duration-200',
                          filters.status.includes(status as LabStatus)
                            ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 [data-theme="light"] &:bg-black/5 [data-theme="light"] &:border-black/10 [data-theme="light"] &:text-black/70'
                        )}
                      >
                        {status} ({statusBreakdown[status] || 0})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Access */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-white/80 [data-theme='light'] &:text-black/80 mb-3">
                    Access
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.accesses.map((access) => (
                      <button
                        key={access}
                        onClick={() => toggleAccess(access as LabAccess)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm',
                          'border transition-all duration-200',
                          filters.access.includes(access as LabAccess)
                            ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 [data-theme="light"] &:bg-black/5 [data-theme="light"] &:border-black/10 [data-theme="light"] &:text-black/70'
                        )}
                      >
                        {access}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Range */}
                <div>
                  <h3 className="text-sm font-medium text-white/80 [data-theme='light'] &:text-black/80 mb-3">
                    Time Range
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(['all', '7d', '30d', '90d'] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm',
                          'border transition-all duration-200',
                          filters.timeRange === range
                            ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 [data-theme="light"] &:bg-black/5 [data-theme="light"] &:border-black/10 [data-theme="light"] &:text-black/70'
                        )}
                      >
                        {range === 'all' ? 'All Time' : `Last ${range}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-6 text-sm text-[var(--brand-red)] hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-sm text-white/60 [data-theme='light'] &:text-black/60">
          Showing {totalResults} of {totalExperiments} experiments
        </p>
      </div>

      {/* Experiments Grid */}
      <div id="experiments-grid" className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <ExperimentCard
                experiment={experiment}
                onClick={setSelectedExperiment}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredExperiments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔬</div>
            <h3 className="text-xl font-medium text-white [data-theme='light'] &:text-black mb-2">
              No experiments found
            </h3>
            <p className="text-white/70 [data-theme='light'] &:text-black/70 mb-6">
              Try adjusting your filters or search query
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 rounded-xl bg-[var(--brand-red)] text-white hover:bg-[var(--brand-red)]/90 transition-colors"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Lab Notebook Sidebar - Recent Updates */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-bold text-white [data-theme='light'] &:text-black mb-6">
          Lab Notebook
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labNotebook.slice(0, 6).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'p-4 rounded-xl',
                'bg-white/[0.06] border border-white/[0.15]',
                '[data-theme="light"] &:bg-black/[0.06] [data-theme="light"] &:border-black/[0.15]'
              )}
              style={{
                backdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
              }}
            >
              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-[var(--brand-red)] mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/60 [data-theme='light'] &:text-black/60 mb-1">
                    {new Date(entry.date).toLocaleDateString()} · {entry.experimentTitle}
                  </div>
                  <p className="text-sm text-white/90 [data-theme='light'] &:text-black/90">
                    {entry.note}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default function LabsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-16 flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    }>
      <LabsContent />
    </Suspense>
  );
}
