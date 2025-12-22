'use client';

/**
 * GlobalChatbot - Context-aware chatbot wrapper
 *
 * This component makes the chatbot available on ALL pages and provides
 * rich context about the user's current location and browsing behavior.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { FloatingChatButton } from './FloatingChatButton';
import { Chatbot } from './Chatbot';
import { usePersonalization } from '@/hooks/usePersonalization';
import type { PersonalizationSchema } from '@/lib/personalization/types';

// ============================================
// Types
// ============================================

export interface ChatContext {
  intent: string;
  currentPage: string;
  currentSection: string | null;
  currentProject: string | null;
  projectTitle: string | null;
  caseStudiesViewed: string[];
  engagementScore: number;
  visitCount: number;
  sectionInterest: Record<string, { dwellTime: number; viewCount: number }>;
}

// ============================================
// Constants
// ============================================

const PROJECT_TITLES: Record<string, string> = {
  'air-india': 'Air India DesignLAB',
  'latent-space': 'Latent Space',
  'metamorphic-fractal-reflections': 'Metamorphic Fractal Reflections',
  'mythos': 'Mythos',
  'cleara': 'Cleara',
  'psoriassist': 'PsoriAssist',
  'oneiros-palace': 'Oneiros Palace',
};

// ============================================
// Utilities
// ============================================

/**
 * Extract project slug from pathname
 * e.g., "/work/air-india" -> "air-india"
 */
function extractProject(pathname: string): string | null {
  const match = pathname.match(/^\/work\/([^/]+)/);
  return match ? match[1] : null;
}

// ============================================
// Personalization Helpers
// ============================================

const TOTAL_PROJECTS = Object.keys(PROJECT_TITLES).length;

/**
 * Get time-of-day greeting
 */
function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'Good morning!';
  if (hour >= 12 && hour < 17) return 'Good afternoon!';
  if (hour >= 17 && hour < 21) return 'Good evening!';
  return 'Burning the midnight oil?';
}

/**
 * Get visitor status greeting based on visit count
 */
function getVisitorGreeting(visitCount: number): string {
  if (visitCount <= 1) return 'Welcome to my portfolio.';
  if (visitCount <= 5) return 'Welcome back!';
  return 'Great to see you again!';
}

/**
 * Get session gap message based on last visit
 */
function getSessionGapMessage(lastVisit: string | null): string | null {
  if (!lastVisit) return null;

  const lastDate = new Date(lastVisit);
  const now = new Date();
  const hoursSince = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);

  if (hoursSince < 1) return 'Back so soon? I like your curiosity.';
  if (hoursSince < 24) return null; // Same day, no special message
  if (hoursSince < 72) return null; // Few days, keep it simple
  if (hoursSince < 168) return "It's been a few days—";
  return "Long time no see!";
}

/**
 * Get progress message based on case studies viewed
 */
function getProgressMessage(viewed: string[], currentProject: string | null): string | null {
  const viewedCount = viewed.length;

  // Don't show progress if viewing a project (focus on that project)
  if (currentProject) return null;

  if (viewedCount === 0) return null;
  if (viewedCount === 1) return `You've started exploring—**${PROJECT_TITLES[viewed[0]] || viewed[0]}** was a great choice.`;
  if (viewedCount < TOTAL_PROJECTS - 1) return `You've explored ${viewedCount} projects so far.`;
  if (viewedCount === TOTAL_PROJECTS - 1) return `Just one more project to complete the tour!`;
  return `You've seen all ${TOTAL_PROJECTS} projects!`;
}

/**
 * Get referrer-specific message
 */
function getReferrerMessage(referrer: string): string | null {
  switch (referrer) {
    case 'linkedin':
      return 'Coming from LinkedIn—I can share more about my professional background.';
    case 'dribbble':
    case 'behance':
      return 'Hello, fellow designer!';
    case 'github':
      return 'From GitHub? Happy to discuss the technical side.';
    default:
      return null;
  }
}

/**
 * Get page-specific context message
 */
function getPageContext(page: string, project: string | null, intent: string | null): string {
  // Project-specific greetings
  if (project === 'air-india') {
    return "I see you're exploring **Air India DesignLAB**—my flagship work serving 450+ daily users. What would you like to know?";
  }
  if (project === 'latent-space') {
    return "You're viewing **Latent Space**—a speculative design fiction exploring dream technology. What intrigues you?";
  }
  if (project === 'metamorphic-fractal-reflections') {
    return "You're viewing **Metamorphic Fractal Reflections**—an exploration of identity through generative art. What catches your eye?";
  }
  if (project === 'mythos') {
    return "You're exploring **Mythos**—where mythology meets modern gaming design. What would you like to explore?";
  }
  if (project === 'cleara') {
    return "You're exploring **Cleara**—healthcare AI for patient communication. What interests you?";
  }
  if (project === 'psoriassist') {
    return "You're viewing **PsoriAssist**—an AI-powered health management experience. What would you like to know?";
  }
  if (project) {
    return `You're viewing **${PROJECT_TITLES[project] || project}**. What would you like to know?`;
  }

  // Page-specific greetings
  if (page === '/work') {
    return "Browsing the case studies? I can help you find what matches your interests.";
  }
  if (page === '/about') {
    return "Curious about my journey? I can share stories from Hyderabad to Air India DesignLAB.";
  }
  if (page === '/journey') {
    return "Exploring my timeline? Each milestone has a story.";
  }
  if (page === '/contact') {
    return "Ready to connect? I can help you craft the perfect message.";
  }

  // Intent-based fallback
  switch (intent) {
    case 'hiring':
      return "I'd love to share insights about my **design systems** work.";
    case 'inspiration':
      return "I'm full of *stories and secrets* about these projects.";
    case 'learning':
      return "What questions about **design** or **technology** can we explore?";
    case 'collaboration':
      return "Excited to discuss potential collaborations!";
    default:
      return "I'm here to help you explore my work.";
  }
}

/**
 * Build fully personalized greeting
 */
export function getPageGreeting(
  page: string,
  project: string | null,
  intent: string | null,
  schema?: PersonalizationSchema
): string {
  // Fallback to simple greeting if no schema provided
  if (!schema) {
    return getPageContext(page, project, intent);
  }

  const { visitor, context } = schema;
  const parts: string[] = [];

  // Layer 1: Time of day
  parts.push(getTimeGreeting());

  // Layer 2: Visitor status (new/returning)
  parts.push(getVisitorGreeting(visitor.visitCount));

  // Layer 3: Session gap (if returning after a while)
  const sessionGap = getSessionGapMessage(visitor.lastVisit);
  if (sessionGap && visitor.visitCount > 1) {
    parts[1] = sessionGap; // Replace generic "Welcome back" with specific gap message
  }

  // Layer 4: Referrer context (first visit only)
  if (visitor.visitCount <= 1) {
    const referrerMsg = getReferrerMessage(context.referrerSource);
    if (referrerMsg) {
      parts.push(referrerMsg);
    }
  }

  // Layer 5: Page/project context
  parts.push(getPageContext(page, project, intent));

  // Layer 6: Progress hint (if not on a project page)
  const progress = getProgressMessage(visitor.caseStudiesViewed, project);
  if (progress && visitor.visitCount > 1) {
    parts.push(progress);
  }

  // Combine parts intelligently (max 3 sentences)
  const combined = parts.slice(0, 4).join(' ');
  return combined;
}

// ============================================
// Main Component
// ============================================

export function GlobalChatbot() {
  const pathname = usePathname();
  const { state } = usePersonalization();

  // Chat state
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Derived values
  const currentProject = extractProject(pathname);
  const projectTitle = currentProject ? PROJECT_TITLES[currentProject] || null : null;
  const storedIntent = state.schema.visitor.intent;

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section - track section ID directly to avoid type issues
        let visibleSectionId: string | null = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            const sectionId = entry.target.getAttribute('data-section-id');
            if (sectionId) {
              maxRatio = entry.intersectionRatio;
              visibleSectionId = sectionId;
            }
          }
        });

        if (visibleSectionId) {
          setActiveSection(visibleSectionId);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    // Observe all sections with data-section-id
    const sections = document.querySelectorAll('[data-section-id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]); // Re-observe when page changes

  // Build chat context
  const buildChatContext = useCallback((): ChatContext => {
    return {
      intent: storedIntent || 'general',
      currentPage: pathname,
      currentSection: activeSection,
      currentProject,
      projectTitle,
      caseStudiesViewed: state.schema.visitor.caseStudiesViewed,
      engagementScore: state.engagementScore,
      visitCount: state.schema.visitor.visitCount,
      sectionInterest: state.schema.behavior.sectionInterest,
    };
  }, [pathname, activeSection, currentProject, projectTitle, storedIntent, state]);

  // Get contextual greeting with full personalization
  const contextualGreeting = useMemo(
    () => getPageGreeting(pathname, currentProject, storedIntent, state.schema),
    [pathname, currentProject, storedIntent, state.schema]
  );

  // Handlers
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <FloatingChatButton onClick={handleOpen} />

      <Chatbot
        isOpen={isOpen}
        onClose={handleClose}
        intentContext={storedIntent || undefined}
        chatContext={buildChatContext()}
        contextualGreeting={contextualGreeting}
      />
    </>
  );
}

export default GlobalChatbot;
