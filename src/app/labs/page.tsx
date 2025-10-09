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
      <style jsx>{`
        #hero-section {
          padding-top: 10rem !important;
          padding-bottom: 10rem !important;
        }
        #stats-section {
          padding-top: 8rem !important;
          padding-bottom: 8rem !important;
        }
        #search-section {
          padding-top: 8rem !important;
          padding-bottom: 8rem !important;
        }
        #experiments-section {
          padding-top: 10rem !important;
          padding-bottom: 10rem !important;
        }
        #lab-notebook-section {
          padding-top: 10rem !important;
          padding-bottom: 10rem !important;
        }
        #cta-section {
          padding-top: 10rem !important;
          padding-bottom: 10rem !important;
        }
      `}</style>
      <PortfolioNavigation />

      {/* Main Container */}
      <main className="relative min-h-screen overflow-hidden">
        <section className="relative px-4" style={{ minHeight: 'auto' }}>

            {/* Atmospheric Particle Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(218, 14, 41, 0.4) 100%)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(218, 14, 41, 0.3)',
                  }}
                  animate={{
                    y: [0, -60 - Math.random() * 40, 0],
                    opacity: [0.3, 0.9, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 12 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Hero Section */}
            <div id="hero-section" className="relative px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-center max-w-6xl mx-auto relative"
              >
                  {/* Background gradient glow */}
                  <div className="absolute inset-0 -inset-x-40 -z-10 opacity-30">
                    <div
                      className="absolute inset-0 blur-[120px]"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(218, 14, 41, 0.4) 0%, transparent 60%)'
                      }}
                    />
                  </div>

                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 150 }}
                    className="inline-flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-[3rem] bg-[var(--brand-red)]/20 border-2 border-[var(--brand-red)]/40 mb-16 md:mb-24"
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
                      <Beaker className="w-20 h-20 md:w-32 md:h-32 text-[var(--brand-red)]" strokeWidth={1} />
                    </motion.div>
                  </motion.div>

                  <h1 className="text-7xl md:text-9xl font-extralight text-[var(--text-primary)] mb-12 md:mb-16 tracking-tight">
                    Nihar Labs
                  </h1>

                  <p className="text-2xl md:text-4xl font-light text-[var(--text-secondary)] max-w-4xl mx-auto leading-relaxed">
                    Rapid experiments in AI, mobility, and new media.
                    <br className="hidden md:block" />
                    Shipping prototypes weekly.
                  </p>
              </motion.div>
            </div>

            {/* Stats Section */}
            <div id="stats-section" className="relative px-4">
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <div className="text-6xl md:text-7xl font-extralight text-[var(--text-primary)] mb-2">{stats.totalExperiments}</div>
                    <div className="text-sm md:text-base text-[var(--text-muted)] uppercase tracking-wider">Experiments</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <div className="text-6xl md:text-7xl font-extralight text-[var(--brand-red)] mb-2">{stats.activeExperiments}</div>
                    <div className="text-sm md:text-base text-[var(--text-muted)] uppercase tracking-wider">Active</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <div className="text-6xl md:text-7xl font-extralight text-[var(--text-primary)] mb-2">{stats.weeklyStreak}</div>
                    <div className="text-sm md:text-base text-[var(--text-muted)] uppercase tracking-wider">Week Streak</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <div className="text-6xl md:text-7xl font-extralight text-[var(--text-primary)] mb-2">{badgeCounts['Open-Source'] || 0}</div>
                    <div className="text-sm md:text-base text-[var(--text-muted)] uppercase tracking-wider">Open Source</div>
                  </motion.div>
              </div>
            </div>

            {/* Search Section */}
            <div id="search-section" className="relative px-4">
              <div className="max-w-3xl mx-auto">
                  <div className="relative">
                    <Search
                      size={24}
                      className="absolute left-8 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      type="text"
                      placeholder="Search experiments..."
                      value={filters.search}
                      onChange={(e) => setSearch(e.target.value)}
                      className={cn(
                        'w-full pl-20 pr-16 py-6 md:py-8 rounded-full',
                        'text-xl md:text-2xl font-light',
                        'bg-white/[0.08] border-2 border-white/[0.15]',
                        'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                        'focus:outline-none focus:ring-4 focus:ring-[var(--brand-red)]/30 focus:border-[var(--brand-red)]/50',
                        'transition-all duration-300',
                        'backdrop-blur-xl'
                      )}
                    />
                    {filters.search && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <X size={24} />
                      </button>
                    )}
                  </div>
              </div>
            </div>

            {/* Experiments Section */}
            <div id="experiments-section" className="relative px-4">
              <div className="max-w-7xl mx-auto">
                {/* Results Count */}
                <p className="text-base font-medium text-[var(--text-tertiary)] mb-10">
                  Showing {totalResults} of {totalExperiments} experiments
                </p>

                {/* Experiments Grid */}
                <div id="experiments-grid" className="space-y-20 md:space-y-32">
                  {filteredExperiments.map((experiment, index) => {
                    const isFeatured = experiment.trl >= 6 || experiment.status === 'Playable' || experiment.status === 'Field-Tested';

                    return (
                      <motion.div
                        key={experiment.id}
                        initial={{ opacity: 0, scale: 0.9, y: 60 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: '-150px' }}
                        transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {isFeatured ? (
                          <FeaturedExperimentCard
                            experiment={experiment}
                            onClick={setSelectedExperiment}
                          />
                        ) : (
                          <ExperimentCard
                            experiment={experiment}
                            onClick={setSelectedExperiment}
                          />
                        )}
                      </motion.div>
                    );
                  })}
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
              </div>
            </div>

            {/* Lab Notebook Section */}
            <div id="lab-notebook-section" className="relative px-4 border-t border-[var(--border-primary)]">
              <div className="max-w-6xl mx-auto">
                  <h2 className="text-heading text-[var(--text-primary)] mb-16">Lab Notebook</h2>
                  <LabTimelineView entries={labNotebook.slice(0, 6)} />
              </div>
            </div>

            {/* CTA Section */}
            <div id="cta-section" className="relative px-4">
              <div className="max-w-5xl mx-auto">
                <ContributeCTA />
              </div>
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
