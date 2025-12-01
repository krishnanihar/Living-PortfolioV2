/**
 * Computed Personalization Functions
 *
 * Pure functions for deriving personalization values from raw data.
 * No side effects - these just compute based on input.
 */

import {
  type PersonalizationSchema,
  type VisitorData,
  type BehavioralData,
  type ContextData,
  type PersonalizedGreeting,
  type ScrollMemory,
  type ProjectTrail,
  type CTAConfig,
  type ProjectRecommendation,
  type GreetingIcon,
  type InferredIntent,
  type VisitorIntent,
  CASE_STUDIES,
  DAY_MESSAGES,
  INTENT_CATEGORY_WEIGHTS,
} from './types';

// ============================================
// Greeting Computation
// ============================================

function getTimeGreeting(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 22) return 'Good evening';
  return 'Burning the midnight oil';
}

function getGreetingIcon(visitCount: number, hour: number): GreetingIcon {
  // First visit always gets Hand (wave)
  if (visitCount <= 1) return 'hand';

  // Returning visitors get time-based icon
  if (hour >= 5 && hour < 17) return 'sun';
  return 'moon';
}

function getGreetingSecondary(visitCount: number): string | null {
  if (visitCount <= 1) return 'Welcome.';
  if (visitCount <= 3) return 'Good to see you again.';
  if (visitCount <= 7) return 'Welcome back.';
  return null; // 8+ visits - no secondary message
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

  // Same day return (< 12 hours)
  if (diffMins < 60 * 12) {
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

function getDayOfWeekMessage(): string | null {
  const day = new Date().getDay();
  return DAY_MESSAGES[day] || null;
}

export function computeGreeting(visitor: VisitorData): PersonalizedGreeting {
  const { visitCount, lastVisit } = visitor;
  const hour = new Date().getHours();
  const timeGreeting = getTimeGreeting(hour);

  // Get contextual messages (priority: session gap > day-of-week)
  const sessionGap = getSessionGapMessage(lastVisit);
  const dayMessage = visitCount > 1 && !sessionGap ? getDayOfWeekMessage() : null;

  // Build opener: time greeting + contextual message (if any)
  let opener = timeGreeting + '.';
  if (sessionGap) {
    opener = timeGreeting + '. ' + sessionGap;
  } else if (dayMessage) {
    opener = timeGreeting + '. ' + dayMessage;
  }

  return {
    opener,
    icon: getGreetingIcon(visitCount, hour),
    message: "I'm Nihar.",
    secondary: getGreetingSecondary(visitCount),
  };
}

// ============================================
// Scroll Memory Computation
// ============================================

export function computeScrollMemory(visitor: VisitorData): ScrollMemory {
  const { lastCaseStudy, caseStudiesViewed } = visitor;

  // Find the project name for lastCaseStudy
  const lastProjectData = CASE_STUDIES.find((p) => p.slug === lastCaseStudy);

  // Find next unviewed project
  const unviewed = CASE_STUDIES.filter((p) => !caseStudiesViewed.includes(p.slug));
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
// Project Trail Computation
// ============================================

export function computeProjectTrail(visitor: VisitorData): ProjectTrail {
  const viewed = visitor.caseStudiesViewed.length;
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
// Engagement Score Computation
// ============================================

export function computeEngagementScore(
  visitor: VisitorData,
  behavior: BehavioralData
): number {
  // Component weights
  const weights = {
    depth: 0.25,      // Scroll depth
    breadth: 0.20,    // Content diversity
    frequency: 0.20,  // Visit frequency
    interaction: 0.20, // Click/interaction density
    dwell: 0.15,      // Time spent
  };

  // Depth score (0-100): How deep they scroll
  const depthScore = Math.min(100, behavior.maxScrollDepth);

  // Breadth score (0-100): Diversity of content explored
  const casesViewed = visitor.caseStudiesViewed.length;
  const totalCases = CASE_STUDIES.length;
  const sectionsExplored = Object.keys(behavior.sectionInterest).length;
  const breadthScore = Math.min(
    100,
    (casesViewed / totalCases) * 60 + Math.min(sectionsExplored, 10) / 10 * 40
  );

  // Frequency score (0-100): Visit recency/frequency
  const visitCount = visitor.visitCount;
  const frequencyScore = Math.min(100, visitCount * 10);

  // Interaction score (0-100): Click/interaction density
  const clickCount = behavior.interactions.filter((i) => i.type === 'click').length;
  const hoverCount = behavior.interactions.filter((i) => i.type === 'hover').length;
  const interactionScore = Math.min(
    100,
    clickCount * 5 + hoverCount * 2
  );

  // Dwell score (0-100): Time spent
  const totalMinutes = behavior.totalDwellTime / 60;
  const dwellScore = Math.min(100, totalMinutes * 10);

  // Weighted combination
  const overallScore = Math.round(
    depthScore * weights.depth +
    breadthScore * weights.breadth +
    frequencyScore * weights.frequency +
    interactionScore * weights.interaction +
    dwellScore * weights.dwell
  );

  return Math.min(100, Math.max(0, overallScore));
}

// ============================================
// Intent Inference
// ============================================

interface IntentSignal {
  type: string;
  weight: number;
  evidence: string;
}

function collectIntentSignals(
  visitor: VisitorData,
  behavior: BehavioralData,
  context: ContextData
): IntentSignal[] {
  const signals: IntentSignal[] = [];

  // Referrer signals
  if (context.referrerSource === 'linkedin') {
    signals.push({
      type: 'referrer_linkedin',
      weight: 0.4,
      evidence: 'Arrived from LinkedIn',
    });
  }

  if (context.referrerSource === 'dribbble' || context.referrerSource === 'behance') {
    signals.push({
      type: 'referrer_design_platform',
      weight: 0.3,
      evidence: 'Arrived from design platform',
    });
  }

  if (context.referrerSource === 'github') {
    signals.push({
      type: 'referrer_github',
      weight: 0.3,
      evidence: 'Arrived from GitHub',
    });
  }

  // Time context signals
  if (context.isBusinessHours) {
    signals.push({
      type: 'business_hours_visit',
      weight: 0.2,
      evidence: 'Visiting during business hours',
    });
  }

  // Behavioral signals
  const caseStudyDwellTime = Object.entries(behavior.sectionInterest)
    .filter(([key]) => key.startsWith('case-study-'))
    .reduce((sum, [, data]) => sum + data.dwellTime, 0);

  if (caseStudyDwellTime > 120) {
    signals.push({
      type: 'deep_case_study_engagement',
      weight: 0.5,
      evidence: 'Spent significant time on case studies',
    });
  }

  // Contact/resume interest
  const contactClicks = behavior.interactions.filter(
    (i) => i.type === 'click' && (i.target.includes('contact') || i.target.includes('resume'))
  );

  if (contactClicks.length > 0) {
    signals.push({
      type: 'contact_interest',
      weight: 0.6,
      evidence: 'Clicked contact/resume buttons',
    });
  }

  // Reading behavior
  if (behavior.readingStyle === 'thorough') {
    signals.push({
      type: 'thorough_reader',
      weight: 0.3,
      evidence: 'Slow, methodical reading pattern',
    });
  }

  // Entry point signals
  if (context.lastEntryPoint.includes('/work/')) {
    signals.push({
      type: 'direct_to_case_study',
      weight: 0.4,
      evidence: 'Landed directly on case study',
    });
  }

  return signals;
}

export function inferIntent(
  visitor: VisitorData,
  behavior: BehavioralData,
  context: ContextData
): { intent: InferredIntent; confidence: number } {
  // If user explicitly set intent, use that
  if (visitor.intent) {
    const intentMap: Record<NonNullable<VisitorIntent>, InferredIntent> = {
      hiring: 'hiring_evaluation',
      inspiration: 'peer_exploration',
      learning: 'learning_research',
      collaboration: 'collaboration_seeking',
    };
    return { intent: intentMap[visitor.intent], confidence: 1.0 };
  }

  const signals = collectIntentSignals(visitor, behavior, context);

  // Initialize scores
  const scores: Record<InferredIntent, number> = {
    hiring_evaluation: 0,
    peer_exploration: 0,
    collaboration_seeking: 0,
    learning_research: 0,
    casual_browsing: 0.2, // Base score for casual
  };

  // Apply signal weights
  signals.forEach((signal) => {
    switch (signal.type) {
      case 'referrer_linkedin':
        scores.hiring_evaluation += signal.weight * 0.6;
        scores.collaboration_seeking += signal.weight * 0.3;
        break;
      case 'referrer_design_platform':
        scores.peer_exploration += signal.weight * 0.7;
        scores.learning_research += signal.weight * 0.3;
        break;
      case 'referrer_github':
        scores.peer_exploration += signal.weight * 0.4;
        scores.collaboration_seeking += signal.weight * 0.4;
        break;
      case 'deep_case_study_engagement':
        scores.hiring_evaluation += signal.weight * 0.4;
        scores.peer_exploration += signal.weight * 0.3;
        scores.learning_research += signal.weight * 0.3;
        break;
      case 'contact_interest':
        scores.hiring_evaluation += signal.weight * 0.5;
        scores.collaboration_seeking += signal.weight * 0.4;
        break;
      case 'thorough_reader':
        scores.hiring_evaluation += signal.weight * 0.4;
        scores.learning_research += signal.weight * 0.4;
        break;
      case 'business_hours_visit':
        scores.hiring_evaluation += signal.weight * 0.3;
        break;
      case 'direct_to_case_study':
        scores.hiring_evaluation += signal.weight * 0.3;
        scores.peer_exploration += signal.weight * 0.3;
        break;
    }
  });

  // Find primary intent
  const entries = Object.entries(scores) as [InferredIntent, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const [primaryIntent, primaryScore] = entries[0];
  const totalScore = entries.reduce((sum, [, score]) => sum + score, 0);
  const confidence = totalScore > 0 ? Math.min(primaryScore / totalScore, 0.95) : 0;

  return { intent: primaryIntent, confidence };
}

// ============================================
// CTA Configuration
// ============================================

export function computeCTAConfig(
  visitor: VisitorData,
  engagementScore: number
): CTAConfig {
  const { intent, caseStudiesViewed } = visitor;

  // High engagement override
  if (engagementScore >= 70 || caseStudiesViewed.length >= 4) {
    return {
      primary: {
        text: "You've explored a lot! Let's talk",
        href: '/contact',
        variant: 'accent',
      },
      secondary: {
        text: 'Contact me',
        href: '/contact',
        variant: 'default',
      },
    };
  }

  // Intent-based CTAs
  switch (intent) {
    case 'hiring':
      return {
        primary: {
          text: 'View case studies',
          href: '/work',
          variant: 'default',
        },
        secondary: {
          text: 'Download resume',
          href: '/resume.pdf',
          variant: 'ghost',
        },
      };
    case 'inspiration':
      return {
        primary: {
          text: 'Dive into experiments',
          href: '/work',
          variant: 'default',
        },
        secondary: {
          text: 'See the process',
          href: '/work/latent-space',
          variant: 'ghost',
        },
      };
    case 'learning':
      return {
        primary: {
          text: 'Read the deep dives',
          href: '/work',
          variant: 'default',
        },
        secondary: {
          text: 'View documentation',
          href: '/work/air-india',
          variant: 'ghost',
        },
      };
    case 'collaboration':
      return {
        primary: {
          text: "Let's build together",
          href: '/contact',
          variant: 'accent',
        },
        secondary: {
          text: 'View my GitHub',
          href: 'https://github.com/niharsunkara',
          variant: 'ghost',
        },
      };
    default:
      // Default CTAs for first visit / no intent
      return {
        primary: {
          text: 'Explore my work',
          href: '/work',
          variant: 'default',
        },
        secondary: {
          text: 'Contact',
          href: '/contact',
          variant: 'ghost',
        },
      };
  }
}

// ============================================
// Recommendations
// ============================================

export function computeRecommendations(
  visitor: VisitorData,
  behavior: BehavioralData
): ProjectRecommendation[] {
  const { intent, caseStudiesViewed } = visitor;

  // Get unviewed projects
  const unviewed = CASE_STUDIES.filter((p) => !caseStudiesViewed.includes(p.slug));

  if (unviewed.length === 0) {
    // All viewed - recommend based on engagement
    const sortedByInterest = CASE_STUDIES.map((project) => {
      const interest = behavior.sectionInterest[`case-study-${project.slug}`];
      return {
        ...project,
        score: interest?.dwellTime || 0,
      };
    }).sort((a, b) => b.score - a.score);

    return sortedByInterest.slice(0, 3).map((p) => ({
      slug: p.slug,
      name: p.name,
      reason: 'One of your favorites',
      score: p.score / 100,
    }));
  }

  // Score unviewed projects by intent alignment
  const scored = unviewed.map((project) => {
    let score = 0.5; // Base score

    if (intent && INTENT_CATEGORY_WEIGHTS[intent]) {
      const categoryWeight = INTENT_CATEGORY_WEIGHTS[intent][project.category] || 0.5;
      score = categoryWeight;
    }

    // Boost if related to viewed projects
    const viewedCategories = caseStudiesViewed
      .map((slug) => CASE_STUDIES.find((p) => p.slug === slug)?.category)
      .filter(Boolean);

    if (viewedCategories.includes(project.category)) {
      score += 0.2;
    }

    return {
      slug: project.slug,
      name: project.name,
      category: project.category,
      score: Math.min(1, score),
    };
  });

  // Sort by score and take top 3
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((p) => {
    let reason = 'Recommended for you';
    if (intent === 'hiring') reason = 'Demonstrates professional work';
    if (intent === 'inspiration') reason = 'Creative exploration';
    if (intent === 'learning') reason = 'In-depth documentation';
    if (intent === 'collaboration') reason = 'Collaborative project';

    return {
      slug: p.slug,
      name: p.name,
      reason,
      score: p.score,
    };
  });
}

// ============================================
// Full Computed State
// ============================================

export function computePersonalizationState(schema: PersonalizationSchema) {
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
