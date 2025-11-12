'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useHomeNarrative, HomeNarrativeState } from '@/hooks/useHomeNarrative';

// Create context for narrative state
export const HomeNarrativeContext = createContext<HomeNarrativeState | null>(null);

// Hook to use narrative context
export function useHomeNarrativeContext() {
  const context = useContext(HomeNarrativeContext);
  if (!context) {
    throw new Error('useHomeNarrativeContext must be used within HomeNarrativeWrapper');
  }
  return context;
}

interface HomeNarrativeWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper component that provides narrative state to all child components
 * Manages scroll-driven narrative progression for home page
 */
export function HomeNarrativeWrapper({ children }: HomeNarrativeWrapperProps) {
  const narrativeState = useHomeNarrative();

  return (
    <HomeNarrativeContext.Provider value={narrativeState}>
      {children}
    </HomeNarrativeContext.Provider>
  );
}
