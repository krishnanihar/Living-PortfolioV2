'use client';

/**
 * usePersonalization Hook
 *
 * Main hook for accessing personalization state and actions.
 * Uses React Context + useReducer for predictable state management.
 */

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
  type Dispatch,
} from 'react';

import {
  type PersonalizationSchema,
  type VisitorData,
  type BehavioralData,
  type ContextData,
  type ComputedData,
  type PersonalizedGreeting,
  type ScrollMemory,
  type ProjectTrail,
  type CTAConfig,
  type ProjectRecommendation,
  type InferredIntent,
  type VisitorIntent,
  type ReferrerSource,
  type DeviceType,
  createDefaultSchema,
  generateSessionId,
} from '@/lib/personalization/types';

import { getStorageManager } from '@/lib/personalization/storage';

import {
  computeGreeting,
  computeScrollMemory,
  computeProjectTrail,
  computeEngagementScore,
  inferIntent,
  computeCTAConfig,
  computeRecommendations,
} from '@/lib/personalization/computed';

// ============================================
// State Types
// ============================================

export interface PersonalizationState {
  isReady: boolean;
  isHydrated: boolean;
  schema: PersonalizationSchema;
  // Computed values (derived from schema)
  greeting: PersonalizedGreeting;
  scrollMemory: ScrollMemory;
  projectTrail: ProjectTrail;
  engagementScore: number;
  inferredIntent: InferredIntent;
  intentConfidence: number;
  ctaConfig: CTAConfig;
  recommendations: ProjectRecommendation[];
}

// ============================================
// Actions
// ============================================

export type PersonalizationAction =
  | { type: 'INITIALIZE'; payload: PersonalizationSchema }
  | { type: 'UPDATE_VISITOR'; payload: Partial<VisitorData> }
  | { type: 'UPDATE_BEHAVIOR'; payload: Partial<BehavioralData> }
  | { type: 'UPDATE_CONTEXT'; payload: Partial<ContextData> }
  | { type: 'SET_INTENT'; payload: VisitorIntent }
  | { type: 'DECLINE_INTENT' }
  | { type: 'TRACK_CASE_STUDY'; payload: string }
  | { type: 'UPDATE_SCROLL_DEPTH'; payload: number }
  | { type: 'UPDATE_DWELL_TIME'; payload: number }
  | { type: 'ADD_INTERACTION'; payload: BehavioralData['interactions'][0] }
  | { type: 'UPDATE_SECTION_INTEREST'; payload: { sectionId: string; dwellTime: number } };

// ============================================
// Reducer
// ============================================

function computeDerivedState(schema: PersonalizationSchema) {
  const { visitor, behavior, context } = schema;
  const greeting = computeGreeting(visitor);
  const scrollMemory = computeScrollMemory(visitor);
  const projectTrail = computeProjectTrail(visitor);
  const engagementScore = computeEngagementScore(visitor, behavior);
  const { intent: inferredIntent, confidence: intentConfidence } = inferIntent(
    visitor,
    behavior,
    context
  );
  const ctaConfig = computeCTAConfig(visitor, engagementScore);
  const recommendations = computeRecommendations(visitor, behavior);

  return {
    greeting,
    scrollMemory,
    projectTrail,
    engagementScore,
    inferredIntent,
    intentConfidence,
    ctaConfig,
    recommendations,
  };
}

function personalizationReducer(
  state: PersonalizationState,
  action: PersonalizationAction
): PersonalizationState {
  switch (action.type) {
    case 'INITIALIZE': {
      const schema = action.payload;
      return {
        ...state,
        isReady: true,
        isHydrated: true,
        schema,
        ...computeDerivedState(schema),
      };
    }

    case 'UPDATE_VISITOR': {
      const newSchema = {
        ...state.schema,
        visitor: { ...state.schema.visitor, ...action.payload },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    case 'UPDATE_BEHAVIOR': {
      const newSchema = {
        ...state.schema,
        behavior: { ...state.schema.behavior, ...action.payload },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    case 'UPDATE_CONTEXT': {
      const newSchema = {
        ...state.schema,
        context: { ...state.schema.context, ...action.payload },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    case 'SET_INTENT': {
      const newSchema = {
        ...state.schema,
        visitor: { ...state.schema.visitor, intent: action.payload },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    case 'DECLINE_INTENT': {
      const newSchema = {
        ...state.schema,
        visitor: { ...state.schema.visitor, intentDeclined: true },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    case 'TRACK_CASE_STUDY': {
      const slug = action.payload;
      const currentViewed = state.schema.visitor.caseStudiesViewed;
      const alreadyViewed = currentViewed.includes(slug);

      const newSchema = {
        ...state.schema,
        visitor: {
          ...state.schema.visitor,
          lastCaseStudy: slug,
          caseStudiesViewed: alreadyViewed
            ? currentViewed
            : [...currentViewed, slug],
        },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    case 'UPDATE_SCROLL_DEPTH': {
      const depth = action.payload;
      const newSchema = {
        ...state.schema,
        behavior: {
          ...state.schema.behavior,
          maxScrollDepth: Math.max(state.schema.behavior.maxScrollDepth, depth),
        },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    case 'UPDATE_DWELL_TIME': {
      const seconds = action.payload;
      const newSchema = {
        ...state.schema,
        behavior: {
          ...state.schema.behavior,
          sessionDwellTime: state.schema.behavior.sessionDwellTime + seconds,
          totalDwellTime: state.schema.behavior.totalDwellTime + seconds,
        },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    case 'ADD_INTERACTION': {
      const interactions = [...state.schema.behavior.interactions, action.payload];
      // Keep only last 100
      if (interactions.length > 100) {
        interactions.shift();
      }
      const newSchema = {
        ...state.schema,
        behavior: {
          ...state.schema.behavior,
          interactions,
        },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    case 'UPDATE_SECTION_INTEREST': {
      const { sectionId, dwellTime } = action.payload;
      const existing = state.schema.behavior.sectionInterest[sectionId] || {
        dwellTime: 0,
        viewCount: 0,
        lastViewed: new Date().toISOString(),
      };
      const newSchema = {
        ...state.schema,
        behavior: {
          ...state.schema.behavior,
          sectionInterest: {
            ...state.schema.behavior.sectionInterest,
            [sectionId]: {
              dwellTime: existing.dwellTime + dwellTime,
              viewCount: existing.viewCount + 1,
              lastViewed: new Date().toISOString(),
            },
          },
        },
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...state,
        schema: newSchema,
        ...computeDerivedState(newSchema),
      };
    }

    default:
      return state;
  }
}

// ============================================
// Initial State
// ============================================

function createInitialState(): PersonalizationState {
  const schema = createDefaultSchema();
  return {
    isReady: false,
    isHydrated: false,
    schema,
    ...computeDerivedState(schema),
  };
}

// ============================================
// Context
// ============================================

interface PersonalizationContextValue {
  state: PersonalizationState;
  dispatch: Dispatch<PersonalizationAction>;
  // Convenience actions
  setIntent: (intent: VisitorIntent) => void;
  declineIntent: () => void;
  trackCaseStudy: (slug: string) => void;
  updateScrollDepth: (depth: number) => void;
  updateDwellTime: (seconds: number) => void;
  addInteraction: (interaction: Omit<BehavioralData['interactions'][0], 'timestamp'>) => void;
  updateSectionInterest: (sectionId: string, dwellTime: number) => void;
  // Computed shortcuts
  shouldShowIntentPrompt: boolean;
  isHighEngagement: boolean;
}

const PersonalizationContext = createContext<PersonalizationContextValue | null>(null);

// ============================================
// Provider Component
// ============================================

interface PersonalizationProviderProps {
  children: ReactNode;
}

export function PersonalizationProvider({ children }: PersonalizationProviderProps) {
  const [state, dispatch] = useReducer(personalizationReducer, null, createInitialState);

  // Initialize from storage on mount
  useEffect(() => {
    const storage = getStorageManager();
    const schema = storage.read();

    // Detect referrer and device
    const referrerSource = detectReferrer();
    const deviceType = detectDevice();
    const isBusinessHours = checkBusinessHours();

    // Start new session
    const now = new Date().toISOString();
    const updatedSchema: PersonalizationSchema = {
      ...schema,
      visitor: {
        ...schema.visitor,
        sessionId: generateSessionId(),
        visitCount: schema.visitor.visitCount + 1,
        lastVisit: now,
        firstVisit: schema.visitor.firstVisit || now,
      },
      context: {
        ...schema.context,
        referrerSource,
        rawReferrer: typeof document !== 'undefined' ? document.referrer : null,
        deviceType,
        lastEntryPoint: typeof window !== 'undefined' ? window.location.pathname : '/',
        isBusinessHours,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      behavior: {
        ...schema.behavior,
        sessionDwellTime: 0,
      },
    };

    // Save to storage
    storage.write(updatedSchema);

    // Initialize state
    dispatch({ type: 'INITIALIZE', payload: updatedSchema });
  }, []);

  // Persist state changes to storage
  useEffect(() => {
    if (state.isReady) {
      const storage = getStorageManager();
      storage.write(state.schema);
    }
  }, [state.schema, state.isReady]);

  // Flush on page unload
  useEffect(() => {
    const handleUnload = () => {
      const storage = getStorageManager();
      storage.flush();
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  // Convenience actions
  const setIntent = useCallback((intent: VisitorIntent) => {
    dispatch({ type: 'SET_INTENT', payload: intent });
  }, []);

  const declineIntent = useCallback(() => {
    dispatch({ type: 'DECLINE_INTENT' });
  }, []);

  const trackCaseStudy = useCallback((slug: string) => {
    dispatch({ type: 'TRACK_CASE_STUDY', payload: slug });
  }, []);

  const updateScrollDepth = useCallback((depth: number) => {
    dispatch({ type: 'UPDATE_SCROLL_DEPTH', payload: depth });
  }, []);

  const updateDwellTime = useCallback((seconds: number) => {
    dispatch({ type: 'UPDATE_DWELL_TIME', payload: seconds });
  }, []);

  const addInteraction = useCallback(
    (interaction: Omit<BehavioralData['interactions'][0], 'timestamp'>) => {
      dispatch({
        type: 'ADD_INTERACTION',
        payload: { ...interaction, timestamp: Date.now() },
      });
    },
    []
  );

  const updateSectionInterest = useCallback((sectionId: string, dwellTime: number) => {
    dispatch({ type: 'UPDATE_SECTION_INTEREST', payload: { sectionId, dwellTime } });
  }, []);

  // Computed shortcuts
  const shouldShowIntentPrompt = useMemo(() => {
    const { visitor } = state.schema;
    // Show if: no intent set, not declined, and either 2nd+ visit or viewed 2+ case studies
    return (
      !visitor.intent &&
      !visitor.intentDeclined &&
      (visitor.visitCount >= 2 || visitor.caseStudiesViewed.length >= 2)
    );
  }, [state.schema]);

  const isHighEngagement = useMemo(() => {
    return state.engagementScore >= 70;
  }, [state.engagementScore]);

  const contextValue = useMemo<PersonalizationContextValue>(
    () => ({
      state,
      dispatch,
      setIntent,
      declineIntent,
      trackCaseStudy,
      updateScrollDepth,
      updateDwellTime,
      addInteraction,
      updateSectionInterest,
      shouldShowIntentPrompt,
      isHighEngagement,
    }),
    [
      state,
      setIntent,
      declineIntent,
      trackCaseStudy,
      updateScrollDepth,
      updateDwellTime,
      addInteraction,
      updateSectionInterest,
      shouldShowIntentPrompt,
      isHighEngagement,
    ]
  );

  return (
    <PersonalizationContext.Provider value={contextValue}>
      {children}
    </PersonalizationContext.Provider>
  );
}

// ============================================
// Consumer Hook
// ============================================

export function usePersonalization(): PersonalizationContextValue {
  const context = useContext(PersonalizationContext);

  if (!context) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }

  return context;
}

// ============================================
// Selector Hook (for performance)
// ============================================

export function usePersonalizationSelector<T>(
  selector: (state: PersonalizationState) => T
): T {
  const { state } = usePersonalization();
  return useMemo(() => selector(state), [state, selector]);
}

// ============================================
// Utilities
// ============================================

function detectReferrer(): ReferrerSource {
  if (typeof document === 'undefined') return 'direct';

  const referrer = document.referrer;
  if (!referrer) return 'direct';

  try {
    const host = new URL(referrer).hostname.toLowerCase();

    if (host.includes('linkedin')) return 'linkedin';
    if (host.includes('dribbble')) return 'dribbble';
    if (host.includes('behance')) return 'behance';
    if (host.includes('github')) return 'github';
    if (host.includes('twitter') || host.includes('x.com')) return 'twitter';
    if (host.includes('google') || host.includes('bing') || host.includes('duckduckgo')) {
      return 'search';
    }

    return 'unknown';
  } catch {
    return 'unknown';
  }
}

function detectDevice(): DeviceType {
  if (typeof window === 'undefined') return 'desktop';

  const ua = navigator.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);

  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';
  return 'desktop';
}

function checkBusinessHours(): boolean {
  const hour = new Date().getHours();
  const day = new Date().getDay();

  // Business hours: 9am-6pm, Monday-Friday
  const isWeekday = day >= 1 && day <= 5;
  const isBusinessTime = hour >= 9 && hour < 18;

  return isWeekday && isBusinessTime;
}
