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
import { getPersonalizedGreeting } from '@/lib/greetings';

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

  // Get dynamic personalized greeting
  const contextualGreeting = useMemo(
    () => getPersonalizedGreeting(pathname, currentProject, state.schema),
    [pathname, currentProject, state.schema]
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
