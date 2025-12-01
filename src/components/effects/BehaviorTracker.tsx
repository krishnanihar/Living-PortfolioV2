'use client';

/**
 * BehaviorTracker Component
 *
 * Invisible component that runs behavioral tracking.
 * Place inside PersonalizationProvider in the layout.
 *
 * Usage:
 * <PersonalizationProvider>
 *   <BehaviorTracker />
 *   {children}
 * </PersonalizationProvider>
 */

import { useBehaviorTracking } from '@/hooks/useBehaviorTracking';

export function BehaviorTracker() {
  useBehaviorTracking();
  return null; // Renders nothing
}
