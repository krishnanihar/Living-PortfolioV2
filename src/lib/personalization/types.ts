/**
 * Enhanced Personalization System - Type Definitions
 *
 * All TypeScript interfaces for the behavioral intelligence and personalization system.
 * Privacy-first: All data stored in localStorage, no external tracking.
 */

// ============================================
// Schema Version
// ============================================

export const SCHEMA_VERSION = 2;

// ============================================
// Intent & Role Types
// ============================================

export type VisitorIntent = 'hiring' | 'inspiration' | 'learning' | 'collaboration' | null;

export type InferredIntent =
  | 'hiring_evaluation'
  | 'peer_exploration'
  | 'collaboration_seeking'
  | 'learning_research'
  | 'casual_browsing';

export type ReferrerSource =
  | 'linkedin'
  | 'dribbble'
  | 'behance'
  | 'github'
  | 'twitter'
  | 'search'
  | 'direct'
  | 'email'
  | 'unknown';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type ReadingStyle = 'thorough' | 'scanner' | 'explorer' | 'unknown';

export type GreetingIcon = 'sun' | 'moon' | 'hand' | 'sparkles';

// ============================================
// Visitor Data (Core Identity)
// ============================================

export interface VisitorData {
  visitCount: number;
  firstVisit: string | null;      // ISO timestamp
  lastVisit: string | null;       // ISO timestamp
  sessionId: string;              // UUID for current session
  caseStudiesViewed: string[];    // Array of slugs
  lastCaseStudy: string | null;   // Most recent slug
  intent: VisitorIntent;          // User-selected intent
  intentDeclined: boolean;        // User dismissed intent prompt
}

// ============================================
// Behavioral Data (Tracking)
// ============================================

export interface BehavioralData {
  // Scroll behavior
  maxScrollDepth: number;         // 0-100, highest ever reached
  scrollVelocityAvg: number;      // Average pixels/second
  readingStyle: ReadingStyle;     // Inferred from scroll patterns

  // Engagement metrics
  totalDwellTime: number;         // Total seconds across all visits
  sessionDwellTime: number;       // Current session seconds

  // Section-level interest
  sectionInterest: Record<string, SectionInterest>;

  // Interaction log (rolling, max 100)
  interactions: InteractionEvent[];
}

export interface SectionInterest {
  dwellTime: number;              // Seconds spent in section
  viewCount: number;              // Number of times viewed
  lastViewed: string;             // ISO timestamp
}

export interface InteractionEvent {
  type: 'click' | 'hover' | 'focus';
  target: string;                 // Element identifier (data-track or id)
  timestamp: number;              // Unix timestamp
  duration?: number;              // For hover events (ms)
}

// ============================================
// Context Data (Session Environment)
// ============================================

export interface ContextData {
  referrerSource: ReferrerSource;
  rawReferrer: string | null;     // Original document.referrer
  deviceType: DeviceType;
  lastEntryPoint: string;         // Path of session start
  isBusinessHours: boolean;       // 9am-6pm local time
  timezone: string;               // User's timezone
}

// ============================================
// Computed Data (Derived Insights)
// ============================================

export interface ComputedData {
  engagementScore: number;        // 0-100
  inferredIntent: InferredIntent;
  intentConfidence: number;       // 0-1
  recommendedProjects: string[];  // Ordered list of slugs
}

// ============================================
// Onboarding Data (Tour & Hints)
// ============================================

export interface OnboardingState {
  tourCompleted: boolean;         // User finished the tour
  tourDismissed: boolean;         // User dismissed the tour pill
  tourStep: number;               // Current step if in progress (0-3)
  hintsShown: Record<string, boolean>;  // { 'chat-discover': true, ... }
}

// ============================================
// Main Schema (Unified Storage)
// ============================================

export interface PersonalizationSchema {
  version: number;
  visitor: VisitorData;
  behavior: BehavioralData;
  context: ContextData;
  computed: ComputedData;
  onboarding: OnboardingState;
  lastUpdated: string;            // ISO timestamp
}

// ============================================
// Greeting & UI Types
// ============================================

export interface PersonalizedGreeting {
  opener: string;                 // "Good afternoon. Fresh start."
  icon: GreetingIcon;             // Contextual Lucide icon
  message: string;                // Always "I'm Nihar."
  secondary: string | null;       // "Welcome." / "Good to see you again." / null
}

export interface ScrollMemory {
  hasHistory: boolean;
  lastProject: string | null;
  lastProjectName: string | null;
  suggestedNext: string | null;
  suggestedNextName: string | null;
}

export interface ProjectTrail {
  viewed: number;
  total: number;
  message: string | null;
}

// ============================================
// CTA Types
// ============================================

export interface CTAConfig {
  primary: {
    text: string;
    href: string;
    variant: 'default' | 'accent';
  };
  secondary: {
    text: string;
    href: string;
    variant: 'default' | 'ghost';
  };
}

// ============================================
// Recommendation Types
// ============================================

export interface ProjectRecommendation {
  slug: string;
  name: string;
  reason: string;                 // "Based on your interest in..."
  score: number;                  // 0-1 relevance score
}

// ============================================
// Constants
// ============================================

export const CASE_STUDIES = [
  { slug: 'air-india', name: 'Air India', category: 'system' },
  { slug: 'psoriassist', name: 'PsoriAssist', category: 'mobile' },
  { slug: 'latent-space', name: 'Latent Space', category: 'research' },
  { slug: 'metamorphic-fractal-reflections', name: 'Metamorphic Fractal', category: 'research' },
  { slug: 'mythos', name: 'Mythos', category: 'web' },
] as const;

export type CaseStudySlug = typeof CASE_STUDIES[number]['slug'];

// Intent → Project category mapping
export const INTENT_CATEGORY_WEIGHTS: Record<NonNullable<VisitorIntent>, Record<string, number>> = {
  hiring: { system: 1.0, mobile: 0.8, web: 0.6, research: 0.4 },
  inspiration: { research: 1.0, web: 0.7, mobile: 0.5, system: 0.3 },
  learning: { research: 0.9, system: 0.8, mobile: 0.7, web: 0.6 },
  collaboration: { web: 0.9, system: 0.8, research: 0.7, mobile: 0.6 },
};

// Day messages (Monday + Weekend)
export const DAY_MESSAGES: Record<number, string> = {
  0: 'Sunday mode.',
  1: 'Fresh start to the week.',
  6: 'Weekend mode.',
};

// ============================================
// Default/Initial Values
// ============================================

export function createDefaultVisitor(): VisitorData {
  return {
    visitCount: 0,
    firstVisit: null,
    lastVisit: null,
    sessionId: generateSessionId(),
    caseStudiesViewed: [],
    lastCaseStudy: null,
    intent: null,
    intentDeclined: false,
  };
}

export function createDefaultBehavior(): BehavioralData {
  return {
    maxScrollDepth: 0,
    scrollVelocityAvg: 0,
    readingStyle: 'unknown',
    totalDwellTime: 0,
    sessionDwellTime: 0,
    sectionInterest: {},
    interactions: [],
  };
}

export function createDefaultContext(): ContextData {
  return {
    referrerSource: 'direct',
    rawReferrer: null,
    deviceType: 'desktop',
    lastEntryPoint: '/',
    isBusinessHours: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function createDefaultComputed(): ComputedData {
  return {
    engagementScore: 0,
    inferredIntent: 'casual_browsing',
    intentConfidence: 0,
    recommendedProjects: [],
  };
}

export function createDefaultOnboarding(): OnboardingState {
  return {
    tourCompleted: false,
    tourDismissed: false,
    tourStep: 0,
    hintsShown: {},
  };
}

export function createDefaultSchema(): PersonalizationSchema {
  return {
    version: SCHEMA_VERSION,
    visitor: createDefaultVisitor(),
    behavior: createDefaultBehavior(),
    context: createDefaultContext(),
    computed: createDefaultComputed(),
    onboarding: createDefaultOnboarding(),
    lastUpdated: new Date().toISOString(),
  };
}

// ============================================
// Utilities
// ============================================

export function generateSessionId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
