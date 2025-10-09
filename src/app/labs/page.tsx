'use client';

import { Suspense, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter as FilterIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { LabsHero } from '@/components/ui/labs/LabsHero';
import { AnimatedStatCard } from '@/components/ui/labs/AnimatedStatCard';
import { FeaturedExperimentCard } from '@/components/ui/labs/FeaturedExperimentCard';
import { ExperimentCard } from '@/components/ui/labs/ExperimentCard';
import { LabTimelineView } from '@/components/ui/labs/LabTimelineView';
import { ContributeCTA } from '@/components/ui/labs/ContributeCTA';
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

  const { stats, badgeCounts } = useLabsStats(labExperiments);
  const filterOptions = useMemo(() => getFilterOptions(labExperiments), []);

  // Separate featured and regular experiments
  const featuredExperiments = useMemo(() => {
    return filteredExperiments.filter(exp =>
      exp.trl >= 6 || exp.status === 'Playable' || exp.status === 'Field-Tested'
    ).slice(0, 2); // Max 2 featured
  }, [filteredExperiments]);

  const regularExperiments = useMemo(() => {
    return filteredExperiments.filter(exp =>
      !featuredExperiments.find(featured => featured.id === exp.id)
    );
  }, [filteredExperiments, featuredExperiments]);

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
    const ctaElement = document.getElementById('contribute-cta');
    ctaElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetCode = () => {
    window.open('https://github.com/krishnanihar', '_blank');
  };

  return (
    <>
      <PortfolioNavigation />

      <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-32">
        {/* Hero */}
        <LabsHero
          onBrowse={handleBrowse}
          onRandom={handleRandom}
          onSubmit={handleSubmit}
          onGetCode={handleGetCode}
        />

        {/* Stats Dashboard - 2x2 Grid */}
        <section className="max-w-[1200px] mx-auto px-8 mt-20 mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatedStatCard
              value={stats.totalExperiments}
              label="Total Experiments"
              trend={{ direction: 'up', value: 2, period: 'this month' }}
            />
            <AnimatedStatCard
              value={stats.activeExperiments}
              label="Active"
              highlight
            />
            <AnimatedStatCard
              value={stats.weeklyStreak}
              label="Week Streak"
            />
            <AnimatedStatCard
              value={badgeCounts['Open-Source'] || 0}
              label="Open Source"
            />
          </motion.div>
        </section>

        {/* Search & Filters - Sticky */}
        <div className="sticky top-[72px] z-30 backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-white/[0.10] py-6 mb-12">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 [data-theme='light'] &:text-black/40"
                />
                <input
                  type="text"
                  placeholder="Search experiments..."
                  value={filters.search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={cn(
                    'w-full pl-14 pr-12 py-4 rounded-2xl',
                    'bg-white/[0.08] border border-white/[0.20]',
                    '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]',
                    'text-white placeholder:text-white/40',
                    '[data-theme="light"] &:text-black [data-theme="light"] &:placeholder:text-black/40',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]/50',
                    'transition-all duration-200'
                  )}
                  style={{
                    backdropFilter: 'blur(60px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(60px) saturate(200%)',
                  }}
                />
                {filters.search && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white [data-theme='light'] &:text-black/60 [data-theme='light'] &:hover:text-black"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'flex items-center justify-center gap-3 px-8 py-4 rounded-2xl',
                  'bg-white/[0.08] border border-white/[0.20]',
                  '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]',
                  'text-white hover:text-[var(--brand-red)]',
                  '[data-theme="light"] &:text-black',
                  'transition-colors duration-200',
                  hasActiveFilters && 'ring-2 ring-[var(--brand-red)]/30'
                )}
                style={{
                  backdropFilter: 'blur(60px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(60px) saturate(200%)',
                }}
              >
                <FilterIcon size={20} />
                <span className="font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-[var(--brand-red)] text-white text-xs font-bold">
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
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      'mt-6 p-8 rounded-2xl',
                      'bg-white/[0.08] border border-white/[0.20]',
                      '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]'
                    )}
                    style={{
                      backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                      WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                    }}
                  >
                    {/* Domain */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-white/90 [data-theme='light'] &:text-black/90 mb-3">
                        Domain
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.domains.map((domain) => (
                          <button
                            key={domain}
                            onClick={() => toggleDomain(domain as LabDomain)}
                            className={cn(
                              'px-4 py-2 rounded-xl text-sm font-medium',
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
                      <h3 className="text-sm font-semibold text-white/90 [data-theme='light'] &:text-black/90 mb-3">
                        Modality
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.modalities.map((modality) => (
                          <button
                            key={modality}
                            onClick={() => toggleModality(modality as LabModality)}
                            className={cn(
                              'px-4 py-2 rounded-xl text-sm font-medium',
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
                      <h3 className="text-sm font-semibold text-white/90 [data-theme='light'] &:text-black/90 mb-3">
                        Status
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => toggleStatus(status as LabStatus)}
                            className={cn(
                              'px-4 py-2 rounded-xl text-sm font-medium',
                              'border transition-all duration-200',
                              filters.status.includes(status as LabStatus)
                                ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                                : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 [data-theme="light"] &:bg-black/5 [data-theme="light"] &:border-black/10 [data-theme="light"] &:text-black/70'
                            )}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Access */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-white/90 [data-theme='light'] &:text-black/90 mb-3">
                        Access
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.accesses.map((access) => (
                          <button
                            key={access}
                            onClick={() => toggleAccess(access as LabAccess)}
                            className={cn(
                              'px-4 py-2 rounded-xl text-sm font-medium',
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
                      <h3 className="text-sm font-semibold text-white/90 [data-theme='light'] &:text-black/90 mb-3">
                        Time Range
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(['all', '7d', '30d', '90d'] as const).map((range) => (
                          <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={cn(
                              'px-4 py-2 rounded-xl text-sm font-medium',
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
                        className="mt-6 text-sm font-medium text-[var(--brand-red)] hover:underline"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results count */}
        <div className="max-w-[1200px] mx-auto px-8 mb-10">
          <p className="text-base font-medium text-white/70 [data-theme='light'] &:text-black/70">
            Showing {totalResults} of {totalExperiments} experiments
          </p>
        </div>

        {/* Experiments Grid - Bento Layout */}
        <div id="experiments-grid" className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured experiments (2-column span) */}
            {featuredExperiments.map((experiment) => (
              <FeaturedExperimentCard
                key={experiment.id}
                experiment={experiment}
                onClick={setSelectedExperiment}
              />
            ))}

            {/* Regular experiments */}
            {regularExperiments.map((experiment) => (
              <ExperimentCard
                key={experiment.id}
                experiment={experiment}
                onClick={setSelectedExperiment}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredExperiments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="text-8xl mb-6">🔬</div>
              <h3 className="text-2xl font-semibold text-white [data-theme='light'] &:text-black mb-3">
                No experiments found
              </h3>
              <p className="text-lg text-white/70 [data-theme='light'] &:text-black/70 mb-8">
                Try adjusting your filters or search query
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-8 py-4 rounded-2xl bg-[var(--brand-red)] text-white font-medium hover:bg-[var(--brand-red)]/90 transition-colors shadow-xl shadow-[var(--brand-red)]/30"
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Lab Notebook - Timeline */}
        <section className="max-w-[1200px] mx-auto px-8 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white [data-theme='light'] &:text-black mb-12">
              Lab Notebook
            </h2>
            <LabTimelineView entries={labNotebook} />
          </motion.div>
        </section>

        {/* Contribute CTA */}
        <div id="contribute-cta" className="max-w-[1200px] mx-auto px-8 mt-32">
          <ContributeCTA />
        </div>
      </div>
    </>
  );
}

export default function LabsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-16 flex items-center justify-center">
        <div className="text-white/60 text-lg">Loading...</div>
      </div>
    }>
      <LabsContent />
    </Suspense>
  );
}
