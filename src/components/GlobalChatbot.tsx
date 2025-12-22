'use client';

/**
 * GlobalChatbot - Context-aware chatbot wrapper
 *
 * This component makes the chatbot available on ALL pages and provides
 * rich context about the user's current location and browsing behavior.
 */

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { FloatingChatButton } from './FloatingChatButton';
import { Chatbot } from './Chatbot';
import { usePersonalization } from '@/hooks/usePersonalization';

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

/**
 * Get page-specific greeting based on current location
 */
export function getPageGreeting(page: string, project: string | null, intent: string | null): string {
  // Project-specific greetings
  if (project === 'air-india') {
    return "I see you're exploring the **Air India DesignLAB** project! This is Nihar's flagship work—serving 450+ daily users. What would you like to know?";
  }
  if (project === 'latent-space') {
    return "Welcome to **Latent Space**—a speculative design fiction exploring dream technology. It's quite a journey. What intrigues you?";
  }
  if (project === 'metamorphic-fractal-reflections') {
    return "You're viewing **Metamorphic Fractal Reflections**—an exploration of identity through generative art. What catches your eye?";
  }
  if (project === 'mythos') {
    return "Welcome to **Mythos**—where mythology meets modern gaming design. What would you like to explore?";
  }
  if (project === 'cleara') {
    return "You're exploring **Cleara**—healthcare AI for patient communication. What interests you about this project?";
  }
  if (project === 'psoriassist') {
    return "Welcome to **PsoriAssist**—an AI-powered health management experience. What would you like to know?";
  }
  if (project) {
    return `You're viewing the **${PROJECT_TITLES[project] || project}** case study. What would you like to know?`;
  }

  // Page-specific greetings
  if (page === '/work') {
    return "Browsing the case studies? Each project tells a different story. I can help you find what matches your interests.";
  }
  if (page === '/about') {
    return "Curious about Nihar's journey? I can share stories from his path—from Hyderabad to Air India DesignLAB.";
  }
  if (page === '/journey') {
    return "Exploring Nihar's timeline? Each milestone has a story. What would you like to know more about?";
  }
  if (page === '/contact') {
    return "Ready to connect? I can help you craft the perfect message or answer any last questions.";
  }

  // Intent-based fallback greetings
  switch (intent) {
    case 'hiring':
      return "Hello! I'd love to share insights about the **design systems** and methodologies behind these projects. What interests you most?";
    case 'inspiration':
      return "Hey! Welcome to a conversation with the portfolio itself! I'm full of *stories and secrets* about these projects. What would you like to discover?";
    case 'learning':
      return "Hello, fellow learner. What questions about **design**, **technology**, or the creative process can we explore together?";
    case 'collaboration':
      return "Hi there! Excited to discuss potential collaborations. What kind of project do you have in mind?";
    default:
      return "Hello! I'm your guide to this portfolio. What would you like to explore?";
  }
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

  // Get contextual greeting
  const contextualGreeting = getPageGreeting(pathname, currentProject, storedIntent);

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
