'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Load view preference from localStorage on mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem('workViewPreference') as ViewMode;
    if (savedViewMode === 'grid' || savedViewMode === 'fullscreen') {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view preference to localStorage
  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);

    try {
      localStorage.setItem('workViewPreference', mode);
    } catch (error) {
      console.error('Failed to save view preference:', error);
    }
  }, []);

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
  }, [handleViewModeChange]);

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
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {viewMode === 'grid' ? (
            <WorkSection />
          ) : (
            <Work />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ARIA live region for accessibility */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {viewMode === 'grid' ? 'Grid view active' : 'Fullscreen view active'}
      </div>
    </>
  );
}