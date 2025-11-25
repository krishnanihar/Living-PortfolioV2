/**
 * Personalization System
 *
 * Provides subtle, journey-aware personalization for the portfolio.
 * All data stored in localStorage - no external tracking.
 */

// ============================================
// Types
// ============================================

export interface VisitorData {
  visitCount: number;
  lastVisit: string | null; // ISO timestamp
  hasVisited: boolean;
  lastScrollDepth: number; // 0-100
  lastCaseStudy: string | null; // slug
  caseStudiesViewed: string[]; // array of slugs
}

export interface PersonalizedGreeting {
  opener: string; // "Hey" / "Good morning" / etc.
  message: string; // "Welcome" / "Back so soon?" / etc.
  contextual: string | null; // Day-of-week or session gap message
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
// Constants
// ============================================

const STORAGE_KEYS = {
  visitCount: 'portfolio_visit_count',
  lastVisit: 'portfolio_last_visit',
  hasVisited: 'portfolio_has_visited',
  lastScrollDepth: 'portfolio_last_scroll_depth',
  lastCaseStudy: 'portfolio_last_case_study',
  caseStudiesViewed: 'portfolio_case_studies_viewed',
} as const;

// All available case studies (slugs)
export const CASE_STUDIES = [
  { slug: 'air-india', name: 'Air India' },
  { slug: 'psoriassist', name: 'PsoriAssist' },
  { slug: 'latent-space', name: 'Latent Space' },
  { slug: 'metamorphic-fractal-reflections', name: 'Metamorphic Fractal' },
  { slug: 'mythos', name: 'Mythos' },
] as const;

const DAY_MESSAGES: Record<number, string> = {
  0: 'Sunday session',
  1: 'Fresh start to the week',
  2: "Let's make progress",
  3: 'Midweek momentum',
  4: 'Almost there',
  5: 'Ending the week strong',
  6: 'Weekend explorer',
};

// ============================================
// Storage Utilities
// ============================================

export function getVisitorData(): VisitorData {
  if (typeof window === 'undefined') {
    return {
      visitCount: 0,
      lastVisit: null,
      hasVisited: false,
      lastScrollDepth: 0,
      lastCaseStudy: null,
      caseStudiesViewed: [],
    };
  }

  try {
    const visitCount = parseInt(localStorage.getItem(STORAGE_KEYS.visitCount) || '0', 10);
    const lastVisit = localStorage.getItem(STORAGE_KEYS.lastVisit);
    const hasVisited = localStorage.getItem(STORAGE_KEYS.hasVisited) === 'true';
    const lastScrollDepth = parseInt(localStorage.getItem(STORAGE_KEYS.lastScrollDepth) || '0', 10);
    const lastCaseStudy = localStorage.getItem(STORAGE_KEYS.lastCaseStudy);
    const caseStudiesViewed = JSON.parse(localStorage.getItem(STORAGE_KEYS.caseStudiesViewed) || '[]');

    return {
      visitCount,
      lastVisit,
      hasVisited,
      lastScrollDepth,
      lastCaseStudy,
      caseStudiesViewed: Array.isArray(caseStudiesViewed) ? caseStudiesViewed : [],
    };
  } catch {
    return {
      visitCount: 0,
      lastVisit: null,
      hasVisited: false,
      lastScrollDepth: 0,
      lastCaseStudy: null,
      caseStudiesViewed: [],
    };
  }
}

export function incrementVisitCount(): number {
  if (typeof window === 'undefined') return 1;

  const current = parseInt(localStorage.getItem(STORAGE_KEYS.visitCount) || '0', 10);
  const newCount = current + 1;
  localStorage.setItem(STORAGE_KEYS.visitCount, newCount.toString());
  localStorage.setItem(STORAGE_KEYS.hasVisited, 'true');
  return newCount;
}

export function updateLastVisit(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.lastVisit, new Date().toISOString());
}

export function saveScrollDepth(depth: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.lastScrollDepth, Math.round(depth).toString());
}

export function saveLastCaseStudy(slug: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.lastCaseStudy, slug);
}

export function markCaseStudyViewed(slug: string): void {
  if (typeof window === 'undefined') return;

  try {
    const viewed = JSON.parse(localStorage.getItem(STORAGE_KEYS.caseStudiesViewed) || '[]');
    if (!viewed.includes(slug)) {
      viewed.push(slug);
      localStorage.setItem(STORAGE_KEYS.caseStudiesViewed, JSON.stringify(viewed));
    }
  } catch {
    localStorage.setItem(STORAGE_KEYS.caseStudiesViewed, JSON.stringify([slug]));
  }
}

export function clearScrollMemory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.lastScrollDepth);
  localStorage.removeItem(STORAGE_KEYS.lastCaseStudy);
}

// ============================================
// Greeting Logic
// ============================================

function getTimeGreeting(hour: number): string {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getGreetingEvolution(visitCount: number): { opener: string; message: string } {
  if (visitCount <= 1) {
    return { opener: 'Hi', message: "I'm Nihar. Welcome." };
  }
  if (visitCount <= 3) {
    return { opener: getTimeGreeting(new Date().getHours()), message: 'Good to see you again.' };
  }
  if (visitCount <= 7) {
    return { opener: 'Hey', message: 'Welcome back.' };
  }
  if (visitCount <= 15) {
    return { opener: 'Hey again', message: '' };
  }
  return { opener: 'Hey', message: '' };
}

function getSessionGapMessage(lastVisit: string | null): string | null {
  if (!lastVisit) return null;

  const last = new Date(lastVisit);
  const now = new Date();
  const diffMs = now.getTime() - last.getTime();
  const diffMins = diffMs / (1000 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // Same session (< 30 min) - no message
  if (diffMins < 30) return null;

  // Same day return
  if (last.toDateString() === now.toDateString() || diffMins < 60 * 12) {
    return 'Back so soon? I like it.';
  }

  // 1-7 days - no special message
  if (diffDays < 8) return null;

  // 8-30 days
  if (diffDays < 30) return "It's been a little while.";

  // 30-90 days
  if (diffDays < 90) return "It's been a while—good to see you.";

  // 90+ days
  return 'Long time no see. Welcome back.';
}

function getDayOfWeekMessage(): string {
  const day = new Date().getDay();
  return DAY_MESSAGES[day] || '';
}

export function getPersonalizedGreeting(visitorData: VisitorData): PersonalizedGreeting {
  const { visitCount, lastVisit } = visitorData;
  const evolution = getGreetingEvolution(visitCount);

  // Priority: Session gap > Day-of-week
  const sessionGap = getSessionGapMessage(lastVisit);
  const contextual = sessionGap || (visitCount > 1 ? getDayOfWeekMessage() : null);

  return {
    opener: evolution.opener,
    message: evolution.message,
    contextual,
  };
}

// ============================================
// Scroll Memory Logic
// ============================================

export function getScrollMemory(visitorData: VisitorData): ScrollMemory {
  const { lastCaseStudy, caseStudiesViewed } = visitorData;

  // Find the project name for lastCaseStudy
  const lastProjectData = CASE_STUDIES.find(p => p.slug === lastCaseStudy);

  // Find next unviewed project
  const unviewed = CASE_STUDIES.filter(p => !caseStudiesViewed.includes(p.slug));
  const suggestedNext = unviewed.length > 0 ? unviewed[0] : null;

  return {
    hasHistory: !!lastCaseStudy || caseStudiesViewed.length > 0,
    lastProject: lastCaseStudy,
    lastProjectName: lastProjectData?.name || null,
    suggestedNext: suggestedNext?.slug || null,
    suggestedNextName: suggestedNext?.name || null,
  };
}

// ============================================
// Project Trail Logic
// ============================================

export function getProjectTrail(visitorData: VisitorData): ProjectTrail {
  const viewed = visitorData.caseStudiesViewed.length;
  const total = CASE_STUDIES.length;

  if (viewed === 0) {
    return { viewed: 0, total, message: null };
  }

  if (viewed === total) {
    return { viewed, total, message: "You've seen it all—thanks for exploring" };
  }

  if (viewed === total - 1) {
    return { viewed, total, message: 'One more to go' };
  }

  return { viewed, total, message: `${viewed} of ${total} explored` };
}

// ============================================
// Combined Personalization Hook Data
// ============================================

export interface PersonalizationData {
  greeting: PersonalizedGreeting;
  scrollMemory: ScrollMemory;
  projectTrail: ProjectTrail;
  visitorData: VisitorData;
}

export function getPersonalizationData(): PersonalizationData {
  const visitorData = getVisitorData();

  return {
    greeting: getPersonalizedGreeting(visitorData),
    scrollMemory: getScrollMemory(visitorData),
    projectTrail: getProjectTrail(visitorData),
    visitorData,
  };
}

// ============================================
// Initialization (call on page load)
// ============================================

export function initializeVisit(): PersonalizationData {
  // Get data before incrementing (so we see their history)
  const data = getPersonalizationData();

  // Then update for next visit
  incrementVisitCount();
  updateLastVisit();

  return data;
}

// ============================================
// React Hook for Case Study Tracking
// ============================================

/**
 * Call this function in useEffect when a case study page loads
 * to track which case studies the user has viewed.
 */
export function trackCaseStudyView(slug: string): void {
  markCaseStudyViewed(slug);
  saveLastCaseStudy(slug);
}
