/**
 * Dynamic Greeting System - Type Definitions
 *
 * Message pools with weighted randomization for natural, varied greetings.
 */

import type { InferredIntent, DeviceType, ReadingStyle, ReferrerSource } from '@/lib/personalization/types';

// ============================================
// Greeting Variation Types
// ============================================

export type GreetingTone = 'warm' | 'professional' | 'casual' | 'curious';
export type GreetingLength = 'short' | 'medium';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type EngagementTier = 'new' | 'exploring' | 'engaged' | 'power';

export interface GreetingVariation {
  id: string;                    // Unique identifier for tracking
  text: string;                  // The greeting text
  weight: number;                // Selection probability (1-10)
  tone: GreetingTone;
  length: GreetingLength;
}

export interface FollowUpQuestion {
  id: string;
  text: string;
  weight: number;
  contexts: string[];            // When this question is relevant
  intents?: InferredIntent[];    // Optional: limit to specific intents
}

// ============================================
// Greeting Context (Input)
// ============================================

export interface GreetingContext {
  // Current location
  page: string;
  project: string | null;
  section: string | null;

  // Visitor profile
  visitCount: number;
  engagementScore: number;
  inferredIntent: InferredIntent;
  deviceType: DeviceType;
  readingStyle: ReadingStyle;

  // Session context
  referrerSource: ReferrerSource;
  isBusinessHours: boolean;
  timeOfDay: TimeOfDay;

  // History
  caseStudiesViewed: string[];
  lastCaseStudy: string | null;
  lastVisit: string | null;
}

// ============================================
// Generated Greeting (Output)
// ============================================

export interface GeneratedGreeting {
  main: string;                  // Primary greeting (1-2 sentences)
  followUp?: string;             // Optional follow-up question
  greetingIds: string[];         // For tracking shown greetings
}

// ============================================
// History Tracking
// ============================================

export interface GreetingHistory {
  shown: Record<string, number[]>;  // greetingId -> timestamps
  lastUpdated: number;
}
