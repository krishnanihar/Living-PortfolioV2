/**
 * Dynamic Greeting System
 *
 * Generates personalized, varied greetings based on user context.
 * Uses message pools with weighted randomization to avoid repetition.
 */

import type { GreetingContext, GeneratedGreeting, TimeOfDay } from './types';
import type { PersonalizationSchema } from '@/lib/personalization/types';
import {
  timeGreetings,
  newVisitorGreetings,
  returningVisitorGreetings,
  projectGreetings,
  pageGreetings,
  referrerGreetings,
  followUpQuestions,
} from './pools';
import { selectWeightedRandom } from './selectors/random';
import { getRecentlyShown, trackShownGreetings } from './selectors/history';
import {
  getEngagementTier,
  adaptVariations,
  getIntentSuffix,
} from './adapters';

// ============================================
// Time of Day Helper
// ============================================

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

// ============================================
// Page Context Helper
// ============================================

function getPageContext(page: string): string {
  if (page.startsWith('/work/')) return 'project';
  if (page === '/work') return 'work';
  if (page === '/about') return 'about';
  if (page === '/journey') return 'journey';
  if (page === '/contact') return 'contact';
  return 'home';
}

// ============================================
// Main Greeting Generator
// ============================================

export function generateGreeting(context: GreetingContext): GeneratedGreeting {
  const parts: string[] = [];
  const shownIds: string[] = [];

  // Get engagement tier for tone adaptation
  const engagementTier = getEngagementTier(context.engagementScore);

  // 1. Time greeting (always include, short)
  let timePool = timeGreetings[context.timeOfDay] || timeGreetings.afternoon;
  timePool = adaptVariations(timePool, engagementTier, context.deviceType);
  const timeGreeting = selectWeightedRandom(timePool, getRecentlyShown('time'));
  parts.push(timeGreeting.text);
  shownIds.push(timeGreeting.id);

  // 2. Context-specific greeting
  if (context.project) {
    // Project page: Use project-specific greeting
    let pool = projectGreetings[context.project];
    if (pool && pool.length > 0) {
      pool = adaptVariations(pool, engagementTier, context.deviceType);
      const greeting = selectWeightedRandom(pool, getRecentlyShown('proj'));
      parts.push(greeting.text);
      shownIds.push(greeting.id);
    }
  } else if (context.visitCount <= 1) {
    // First-time visitor
    // Check for referrer-specific greeting first
    const refPool = referrerGreetings[context.referrerSource];
    if (refPool && refPool.length > 0) {
      const refGreeting = selectWeightedRandom(refPool, getRecentlyShown('ref'));
      parts.push(refGreeting.text);
      shownIds.push(refGreeting.id);
    } else {
      // Generic new visitor greeting
      let pool = adaptVariations(newVisitorGreetings, engagementTier, context.deviceType);
      const greeting = selectWeightedRandom(pool, getRecentlyShown('new'));
      parts.push(greeting.text);
      shownIds.push(greeting.id);
    }
  } else {
    // Returning visitor
    let pool = returningVisitorGreetings[engagementTier] || returningVisitorGreetings.exploring;
    pool = adaptVariations(pool, engagementTier, context.deviceType);
    const greeting = selectWeightedRandom(pool, getRecentlyShown('ret'));
    parts.push(greeting.text);
    shownIds.push(greeting.id);

    // Add page-specific context for returning visitors (if not on project)
    const pageContext = getPageContext(context.page);
    if (pageContext !== 'home' && pageContext !== 'project') {
      const pgPool = pageGreetings[pageContext];
      if (pgPool && pgPool.length > 0) {
        const adapted = adaptVariations(pgPool, engagementTier, context.deviceType);
        const pgGreeting = selectWeightedRandom(adapted, getRecentlyShown('page'));
        parts.push(pgGreeting.text);
        shownIds.push(pgGreeting.id);
      }
    }
  }

  // 3. Select follow-up question
  const pageContext = context.project ? 'project' : getPageContext(context.page);
  const relevantFollowUps = followUpQuestions.filter(q =>
    q.contexts.includes(pageContext) ||
    q.contexts.includes('any')
  ).filter(q =>
    !q.intents || q.intents.includes(context.inferredIntent)
  );

  let followUp: string | undefined;
  if (relevantFollowUps.length > 0) {
    const selectedFollowUp = selectWeightedRandom(relevantFollowUps, getRecentlyShown('fu'));
    followUp = selectedFollowUp.text;
    shownIds.push(selectedFollowUp.id);
  }

  // 4. Track shown greetings
  trackShownGreetings(shownIds);

  // 5. Construct final greeting
  // Limit to 2 parts for main greeting (keep it short)
  const main = parts.slice(0, 2).join(' ');

  return {
    main,
    followUp,
    greetingIds: shownIds,
  };
}

// ============================================
// Build Context from Schema
// ============================================

export function buildGreetingContext(
  page: string,
  project: string | null,
  schema: PersonalizationSchema
): GreetingContext {
  return {
    page,
    project,
    section: null,
    visitCount: schema.visitor.visitCount,
    engagementScore: schema.computed.engagementScore,
    inferredIntent: schema.computed.inferredIntent,
    deviceType: schema.context.deviceType,
    readingStyle: schema.behavior.readingStyle,
    referrerSource: schema.context.referrerSource,
    isBusinessHours: schema.context.isBusinessHours,
    timeOfDay: getTimeOfDay(),
    caseStudiesViewed: schema.visitor.caseStudiesViewed,
    lastCaseStudy: schema.visitor.lastCaseStudy,
    lastVisit: schema.visitor.lastVisit,
  };
}

// ============================================
// Convenience Function for GlobalChatbot
// ============================================

export function getPersonalizedGreeting(
  page: string,
  project: string | null,
  schema?: PersonalizationSchema
): string {
  // Fallback for no schema
  if (!schema) {
    return "Hey! I'm here to help you explore Nihar's work. What would you like to know?";
  }

  const context = buildGreetingContext(page, project, schema);
  const greeting = generateGreeting(context);

  // Combine main greeting with follow-up
  if (greeting.followUp) {
    return `${greeting.main} ${greeting.followUp}`;
  }

  return greeting.main;
}

// Re-export types
export type { GreetingContext, GeneratedGreeting, TimeOfDay, EngagementTier } from './types';
