'use client';

import React from 'react';
import { WorkNarrativeProgressIndicator, WorkNarrativeProgressBar } from './WorkNarrativeProgressIndicator';
import { useWorkNarrativeProgress } from '@/hooks/useWorkNarrativeProgress';

interface WorkPageLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout wrapper for narrative work page
 * Provides scroll tracking and renders progress indicators
 */
export function WorkPageLayout({ children }: WorkPageLayoutProps) {
  const narrativeState = useWorkNarrativeProgress();

  // Apply atmospheric color to body background
  React.useEffect(() => {
    document.body.style.setProperty('--narrative-atmosphere', narrativeState.color.atmosphere);
  }, [narrativeState.color.atmosphere]);

  return (
    <div className="relative min-h-screen">
      {/* Progress indicators */}
      <WorkNarrativeProgressIndicator />
      <WorkNarrativeProgressBar />

      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Atmospheric overlay (subtle) */}
      <div
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${narrativeState.color.atmosphere} 0%, transparent 70%)`,
          zIndex: -1,
        }}
      />
    </div>
  );
}
