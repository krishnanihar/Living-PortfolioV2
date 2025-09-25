'use client';

import { useEffect } from 'react';
import { initializeMicroInteractions } from '@/lib/micro-interactions';

export function MicroInteractionProvider() {
  useEffect(() => {
    // Initialize global micro-interactions
    initializeMicroInteractions();

    // Cleanup function
    return () => {
      // Cleanup is handled by individual effects
    };
  }, []);

  return null;
}