'use client';

import React, { useEffect } from 'react';
import { WorkNarrativeProgressIndicator, WorkNarrativeProgressBar } from './WorkNarrativeProgressIndicator';
import { useWorkNarrativeProgress } from '@/hooks/useWorkNarrativeProgress';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkPageLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout wrapper for narrative work page
 * Provides scroll tracking and renders progress indicators
 */
export function WorkPageLayout({ children }: WorkPageLayoutProps) {
  const narrativeState = useWorkNarrativeProgress();

  // ScrollTrigger cleanup on unmount (matches ConceptPage pattern)
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      // Clean up all ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Apply atmospheric color to body background
  useEffect(() => {
    document.body.style.setProperty('--narrative-atmosphere', narrativeState.color.atmosphere);
  }, [narrativeState.color.atmosphere]);

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <PortfolioNavigation />

      {/* Progress indicators */}
      {/* <WorkNarrativeProgressIndicator /> */}
      <WorkNarrativeProgressBar />

      {/* Main content */}
      <main className="relative z-[2]">
        {children}
      </main>

      {/* Atmospheric overlay (subtle) */}
      <div
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${narrativeState.color.atmosphere} 0%, transparent 70%)`,
          zIndex: 1,
        }}
      />
    </div>
  );
}
