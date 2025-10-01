'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export type EngagementLevel = 'dormant' | 'aware' | 'engaged' | 'focused';

interface PageVisit {
  path: string;
  timestamp: number;
  duration?: number;
  visits: number;
}

interface NavigationIntelligence {
  visitHistory: PageVisit[];
  favoritePages: string[];
  currentPath: string;
  sessionPaths: string[];
}

interface ConsciousnessState {
  engagementLevel: EngagementLevel;
  isActive: boolean;
  lastActivity: number;
  sessionDuration: number;
  interactionCount: number;
  navigation: NavigationIntelligence;
}

interface ConsciousnessActions {
  registerInteraction: () => void;
  setEngagementLevel: (level: EngagementLevel) => void;
  getInsight: () => string;
  trackPageVisit: (path: string) => void;
  getPageVisitCount: (path: string) => number;
  getRecentlyVisited: () => PageVisit[];
  isFrequentlyVisited: (path: string) => boolean;
  getNavigationInsights: (path: string) => string;
}

const ENGAGEMENT_THRESHOLDS = {
  DORMANT_TIMEOUT: 60000,    // 60 seconds idle = dormant (was 10s)
  AWARE_TIMEOUT: 15000,      // 15 seconds idle = aware (was 5s)
  ENGAGED_INTERACTIONS: 2,   // 2+ interactions = engaged (was 3)
  FOCUSED_DURATION: 20000,   // 20+ seconds = focused (was 30s)
};

/**
 * Simple consciousness hook that tracks user engagement without interfering with events
 * Learned from previous mistakes: NO providers, NO event hijacking, NO overlays
 */
export function useConsciousness(): ConsciousnessState & ConsciousnessActions {
  const [state, setState] = useState<ConsciousnessState>({
    engagementLevel: 'dormant',
    isActive: false,
    lastActivity: Date.now(),
    sessionDuration: 0,
    interactionCount: 0,
    navigation: {
      visitHistory: [],
      favoritePages: [],
      currentPath: '/',
      sessionPaths: [],
    },
  });

  const sessionStartRef = useRef(Date.now());
  const engagementTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Track engagement level based on activity
  const updateEngagementLevel = useCallback(() => {
    const now = Date.now();
    const timeSinceActivity = now - state.lastActivity;
    const sessionDuration = now - sessionStartRef.current;

    let newLevel: EngagementLevel = 'dormant';

    if (timeSinceActivity < ENGAGEMENT_THRESHOLDS.AWARE_TIMEOUT) {
      newLevel = 'aware';
    }

    if (state.interactionCount >= ENGAGEMENT_THRESHOLDS.ENGAGED_INTERACTIONS) {
      newLevel = 'engaged';
    }

    if (sessionDuration > ENGAGEMENT_THRESHOLDS.FOCUSED_DURATION &&
        timeSinceActivity < ENGAGEMENT_THRESHOLDS.AWARE_TIMEOUT) {
      newLevel = 'focused';
    }

    if (timeSinceActivity > ENGAGEMENT_THRESHOLDS.DORMANT_TIMEOUT) {
      newLevel = 'dormant';
    }

    setState(prev => ({
      ...prev,
      engagementLevel: newLevel,
      isActive: newLevel !== 'dormant',
      sessionDuration,
    }));
  }, [state.lastActivity, state.interactionCount]);

  // Register user interaction (to be called by components)
  const registerInteraction = useCallback(() => {
    const now = Date.now();
    setState(prev => ({
      ...prev,
      lastActivity: now,
      interactionCount: prev.interactionCount + 1,
    }));
  }, []);

  // Manual engagement level override
  const setEngagementLevel = useCallback((level: EngagementLevel) => {
    setState(prev => ({
      ...prev,
      engagementLevel: level,
      isActive: level !== 'dormant',
    }));
  }, []);

  // Track page visits for navigation intelligence
  const trackPageVisit = useCallback((path: string) => {
    setState(prev => {
      const now = Date.now();
      const existingVisit = prev.navigation.visitHistory.find(v => v.path === path);

      let updatedHistory: PageVisit[];
      if (existingVisit) {
        // Update existing visit
        updatedHistory = prev.navigation.visitHistory.map(v =>
          v.path === path
            ? { ...v, timestamp: now, visits: v.visits + 1 }
            : v
        );
      } else {
        // Add new visit
        const newVisit: PageVisit = { path, timestamp: now, visits: 1 };
        updatedHistory = [...prev.navigation.visitHistory, newVisit];
      }

      // Keep only last 20 visits to avoid memory bloat
      if (updatedHistory.length > 20) {
        updatedHistory = updatedHistory.sort((a, b) => b.timestamp - a.timestamp).slice(0, 20);
      }

      // Update session paths
      const sessionPaths = prev.navigation.sessionPaths.includes(path)
        ? prev.navigation.sessionPaths
        : [...prev.navigation.sessionPaths, path];

      // Calculate favorite pages (visited 3+ times)
      const favoritePages = updatedHistory
        .filter(v => v.visits >= 3)
        .map(v => v.path);

      return {
        ...prev,
        navigation: {
          ...prev.navigation,
          visitHistory: updatedHistory,
          favoritePages,
          currentPath: path,
          sessionPaths,
        }
      };
    });

    registerInteraction(); // Navigation counts as interaction
  }, [registerInteraction]);

  // Get visit count for a specific page
  const getPageVisitCount = useCallback((path: string): number => {
    const visit = state.navigation.visitHistory.find(v => v.path === path);
    return visit ? visit.visits : 0;
  }, [state.navigation.visitHistory]);

  // Get recently visited pages (last 5)
  const getRecentlyVisited = useCallback((): PageVisit[] => {
    return state.navigation.visitHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);
  }, [state.navigation.visitHistory]);

  // Check if a page is frequently visited
  const isFrequentlyVisited = useCallback((path: string): boolean => {
    return state.navigation.favoritePages.includes(path);
  }, [state.navigation.favoritePages]);

  // Get navigation-specific insights
  const getNavigationInsights = useCallback((path: string): string => {
    const visitCount = getPageVisitCount(path);
    const isRecent = state.navigation.sessionPaths.includes(path);
    const isFavorite = isFrequentlyVisited(path);

    if (isFavorite) {
      return `You've explored this ${visitCount} times`;
    } else if (isRecent) {
      return "Recently visited this session";
    } else if (visitCount > 1) {
      return `Visited ${visitCount} times`;
    } else {
      return "New section to explore";
    }
  }, [getPageVisitCount, state.navigation.sessionPaths, isFrequentlyVisited]);

  // Get contextual insight based on engagement
  const getInsight = useCallback((): string => {
    const insights = {
      dormant: "Portfolio resting...",
      aware: "Sensing your presence",
      engaged: "Learning from your interactions",
      focused: "Deeply connected with your exploration",
    };
    return insights[state.engagementLevel];
  }, [state.engagementLevel]);

  // Update engagement level periodically
  useEffect(() => {
    const interval = setInterval(updateEngagementLevel, 2000); // Check every 2 seconds
    return () => clearInterval(interval);
  }, [updateEngagementLevel]);

  // Auto-register activity on mount (user loaded the page)
  useEffect(() => {
    registerInteraction();
  }, [registerInteraction]);

  return {
    ...state,
    registerInteraction,
    setEngagementLevel,
    getInsight,
    trackPageVisit,
    getPageVisitCount,
    getRecentlyVisited,
    isFrequentlyVisited,
    getNavigationInsights,
  };
}