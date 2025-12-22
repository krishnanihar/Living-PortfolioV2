'use client';

import { useContext, useRef, ReactNode } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSelectedLayoutSegment } from 'next/navigation';
import { usePreviousValue } from './hooks/usePreviousValue';

interface FrozenRouterProps {
  children: ReactNode;
}

/**
 * FrozenRouter preserves the Next.js router context during exit animations
 *
 * Problem: Next.js App Router updates context immediately on navigation,
 * which interrupts Framer Motion's AnimatePresence exit animations.
 *
 * Solution: Freeze the router context when segment changes, allowing
 * the previous page to complete its exit animation before updating.
 */
export function FrozenRouter({ children }: FrozenRouterProps) {
  const context = useContext(LayoutRouterContext);
  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);

  // Store the context reference
  const frozenContext = useRef(context);

  // Detect if we're in the middle of a transition
  // Only update context when segment hasn't changed (not during exit animation)
  const isTransitioning = segment !== prevSegment && prevSegment !== undefined;

  if (!isTransitioning) {
    frozenContext.current = context;
  }

  return (
    <LayoutRouterContext.Provider value={frozenContext.current}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
