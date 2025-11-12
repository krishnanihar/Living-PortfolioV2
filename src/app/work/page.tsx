'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { ViewToggle, ViewMode } from '@/components/ui/ViewToggle';
import { Work } from '@/components/sections/Work';
import WorkSection from '@/components/sections/WorkSection';
import { projects, getProjectsByCategory } from '@/data/projects';
import { FilterCategory } from '@/types/projects';

export default function WorkPage() {
  // View mode state with localStorage persistence - default to fullscreen
  const [viewMode, setViewMode] = useState<ViewMode>('fullscreen');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Load view preference from localStorage on mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem('workViewPreference') as ViewMode;
    if (savedViewMode === 'grid' || savedViewMode === 'fullscreen') {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view preference to localStorage
  const handleViewModeChange = (mode: ViewMode) => {
    setIsLoading(true);
    setViewMode(mode);
    localStorage.setItem('workViewPreference', mode);

    // Brief loading state for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  };

  // Keyboard shortcuts: G for grid, F for fullscreen
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key.toLowerCase() === 'g') {
        handleViewModeChange('grid');
      } else if (e.key.toLowerCase() === 'f') {
        handleViewModeChange('fullscreen');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all'
    ? projects
    : getProjectsByCategory(activeFilter);

  return (
    <>
      <PortfolioNavigation />

      {/* View Toggle Control */}
      <ViewToggle
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {/* View Content with Transitions */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen flex items-center justify-center"
          >
            <div className="text-white/60 text-lg">
              Switching view...
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {viewMode === 'grid' ? (
              <WorkSection />
            ) : (
              <Work />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ARIA live region for accessibility */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {viewMode === 'grid' ? 'Grid view active' : 'Fullscreen view active'}
      </div>
    </>
  );
}