'use client';

import { usePersonalization } from './usePersonalization';

/**
 * useOnboarding Hook
 *
 * Simple wrapper around usePersonalization for onboarding-specific logic.
 * Handles tour visibility, hint system, and tour progression.
 */
export function useOnboarding() {
  const { state, dispatch } = usePersonalization();

  const isFirstVisit = state.schema.visitor.visitCount === 1;
  const onboarding = state.schema.onboarding;

  return {
    // Tour pill visibility - only show on first visit if not completed/dismissed
    shouldShowTourPill: isFirstVisit && !onboarding.tourCompleted && !onboarding.tourDismissed,

    // Tour state
    tourStep: onboarding.tourStep,
    tourCompleted: onboarding.tourCompleted,
    tourDismissed: onboarding.tourDismissed,

    // Tour actions
    dismissTour: () => dispatch({ type: 'DISMISS_TOUR' }),
    completeTour: () => dispatch({ type: 'COMPLETE_TOUR' }),
    setTourStep: (step: number) => dispatch({ type: 'SET_TOUR_STEP', payload: step }),

    // Hint system - check if a hint should be shown
    shouldShowHint: (hintId: string) => !onboarding.hintsShown[hintId],
    markHintSeen: (hintId: string) => dispatch({ type: 'MARK_HINT_SHOWN', payload: hintId }),

    // Utility - get all shown hints
    hintsShown: onboarding.hintsShown,

    // First visit detection (useful for other components)
    isFirstVisit,
  };
}

export default useOnboarding;
