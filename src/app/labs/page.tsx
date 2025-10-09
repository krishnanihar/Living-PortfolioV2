'use client';

import { Suspense, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter as FilterIcon, Beaker } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
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

  const featuredExperiments = useMemo(() => {
    return filteredExperiments.filter(exp =>
      exp.trl >= 6 || exp.status === 'Playable' || exp.status === 'Field-Tested'
    ).slice(0, 2);
  }, [filteredExperiments]);

  const regularExperiments = useMemo(() => {
    return filteredExperiments.filter(exp =>
      !featuredExperiments.find(featured => featured.id === exp.id)
    );
  }, [filteredExperiments, featuredExperiments]);

  const handleBrowse = () => {
    const gridElement = document.getElementById('experiments-grid');
    gridElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PortfolioNavigation />

      {/* Main Container - MATCHES HOME PAGE */}
      <main className="relative min-h-screen overflow-hidden">
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
          <div className="relative w-full max-w-7xl mx-auto">

            {/* Atmospheric Particle Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -40 - Math.random() * 20, 0],
                    opacity: [0.1, 0.4, 0.1],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 8,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Main Glass Card - MATCHES HOME PAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="glass-hero rounded-3xl p-12 md:p-16 lg:p-20"
            >
              <div className="max-w-5xl mx-auto">

                {/* Hero Content */}
                <div className="text-center mb-24 relative">
                  {/* Background gradient glow */}
                  <div className="absolute inset-0 -z-10 opacity-20">
                    <div
                      className="absolute inset-0 blur-3xl"
                      style={{
                        background: 'radial-gradient(circle at 50% 30%, rgba(218, 14, 41, 0.15) 0%, transparent 50%)'
                      }}
                    />
                  </div>

                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 150 }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-[var(--brand-red)]/15 border border-[var(--brand-red)]/25 mb-12"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Beaker className="w-14 h-14 text-[var(--brand-red)]" strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>

                  <h1
                    className="text-display text-[var(--text-primary)] mb-8"
                    style={{
                      background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                      WebkitBackdropFilter: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Nihar Labs
                  </h1>

                  <p className="text-subheading text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                    Rapid experiments in AI, mobility, and new media. Shipping prototypes weekly.
                  </p>
                </div>

                {/* Stats Dashboard - Compact 4-col layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
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
                </div>

                {/* Search & Filters */}
                <div className="mb-16">
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                      <Search
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                      />
                      <input
                        type="text"
                        placeholder="Search experiments..."
                        value={filters.search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={cn(
                          'w-full pl-14 pr-12 py-4 rounded-full',
                          'bg-[var(--surface-primary)] border border-[var(--border-primary)]',
                          'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                          'focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]/50',
                          'transition-all duration-200'
                        )}
                      />
                      {filters.search && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={cn(
                        'flex items-center justify-center gap-3 px-8 py-4 rounded-full',
                        'bg-[var(--surface-primary)] border border-[var(--border-primary)]',
                        'text-[var(--text-primary)] hover:text-[var(--brand-red)]',
                        'transition-colors duration-200',
                        hasActiveFilters && 'ring-2 ring-[var(--brand-red)]/30'
                      )}
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

                  {/* Filter Panel */}
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="glass-card rounded-2xl p-8">
                          {/* Domain */}
                          <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Domain</h3>
                            <div className="flex flex-wrap gap-2">
                              {filterOptions.domains.map((domain) => (
                                <button
                                  key={domain}
                                  onClick={() => toggleDomain(domain as LabDomain)}
                                  className={cn(
                                    'px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
                                    filters.domain.includes(domain as LabDomain)
                                      ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                                      : 'bg-[var(--surface-secondary)] border-[var(--border-primary)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)]'
                                  )}
                                >
                                  {domain}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Modality */}
                          <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Modality</h3>
                            <div className="flex flex-wrap gap-2">
                              {filterOptions.modalities.map((modality) => (
                                <button
                                  key={modality}
                                  onClick={() => toggleModality(modality as LabModality)}
                                  className={cn(
                                    'px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
                                    filters.modality.includes(modality as LabModality)
                                      ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                                      : 'bg-[var(--surface-secondary)] border-[var(--border-primary)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)]'
                                  )}
                                >
                                  {modality}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Status */}
                          <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Status</h3>
                            <div className="flex flex-wrap gap-2">
                              {filterOptions.statuses.map((status) => (
                                <button
                                  key={status}
                                  onClick={() => toggleStatus(status as LabStatus)}
                                  className={cn(
                                    'px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
                                    filters.status.includes(status as LabStatus)
                                      ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                                      : 'bg-[var(--surface-secondary)] border-[var(--border-primary)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)]'
                                  )}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Access */}
                          <div className="mb-6">
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Access</h3>
                            <div className="flex flex-wrap gap-2">
                              {filterOptions.accesses.map((access) => (
                                <button
                                  key={access}
                                  onClick={() => toggleAccess(access as LabAccess)}
                                  className={cn(
                                    'px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
                                    filters.access.includes(access as LabAccess)
                                      ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                                      : 'bg-[var(--surface-secondary)] border-[var(--border-primary)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)]'
                                  )}
                                >
                                  {access}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time Range */}
                          <div>
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Time Range</h3>
                            <div className="flex flex-wrap gap-2">
                              {(['all', '7d', '30d', '90d'] as const).map((range) => (
                                <button
                                  key={range}
                                  onClick={() => setTimeRange(range)}
                                  className={cn(
                                    'px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
                                    filters.timeRange === range
                                      ? 'bg-[var(--brand-red)]/20 border-[var(--brand-red)] text-[var(--brand-red)]'
                                      : 'bg-[var(--surface-secondary)] border-[var(--border-primary)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)]'
                                  )}
                                >
                                  {range === 'all' ? 'All Time' : `Last ${range}`}
                                </button>
                              ))}
                            </div>
                          </div>

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

                {/* Results Count */}
                <p className="text-base font-medium text-[var(--text-tertiary)] mb-10">
                  Showing {totalResults} of {totalExperiments} experiments
                </p>

                {/* Experiments Grid - Spacious 2-col Bento Layout */}
                <div id="experiments-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-32">
                  {featuredExperiments.map((experiment, index) => (
                    <motion.div
                      key={experiment.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="md:col-span-2"
                    >
                      <FeaturedExperimentCard
                        experiment={experiment}
                        onClick={setSelectedExperiment}
                      />
                    </motion.div>
                  ))}
                  {regularExperiments.map((experiment, index) => (
                    <motion.div
                      key={experiment.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ExperimentCard
                        experiment={experiment}
                        onClick={setSelectedExperiment}
                      />
                    </motion.div>
                  ))}
                </div>

                {filteredExperiments.length === 0 && (
                  <div className="text-center py-20">
                    <div className="text-8xl mb-6">🔬</div>
                    <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">No experiments found</h3>
                    <p className="text-lg text-[var(--text-secondary)] mb-8">Try adjusting your filters</p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="btn-primary"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                )}

                {/* Lab Notebook */}
                <div className="pt-20 border-t border-[var(--border-primary)] mb-24">
                  <h2 className="text-heading text-[var(--text-primary)] mb-16">Lab Notebook</h2>
                  <LabTimelineView entries={labNotebook.slice(0, 6)} />
                </div>

                {/* Contribute CTA */}
                <div className="pt-4">
                  <ContributeCTA />
                </div>

              </div>
            </motion.div>

          </div>
        </section>
      </main>
    </>
  );
}

export default function LabsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--text-muted)] text-lg">Loading...</div>
      </div>
    }>
      <LabsContent />
    </Suspense>
  );
}
