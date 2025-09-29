'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useConsciousness } from '@/components/effects/ConsciousnessProvider';
import { AwarenessLevel, PersonalityState } from '@/lib/consciousness-state';

interface WhisperContent {
  id: string;
  text: string;
  trigger: string;
  personality: PersonalityState;
  awarenessLevel: AwarenessLevel;
  priority: 'low' | 'medium' | 'high';
  duration: number; // How long to show in ms
  cooldown: number; // How long to wait before showing again in ms
}

interface AmbientWhispersProps {
  enabled?: boolean;
}

export function AmbientWhispers({ enabled = true }: AmbientWhispersProps) {
  const [mounted, setMounted] = useState(false);
  const { state, whisper, getPersonalityInsights } = useConsciousness();
  const [activeWhisper, setActiveWhisper] = useState<WhisperContent | null>(null);
  const [whisperHistory, setWhisperHistory] = useState<Set<string>>(new Set());
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const pathname = usePathname();

  const insights = getPersonalityInsights();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset activity timer on user interaction
  useEffect(() => {
    const resetActivity = () => setLastActivity(Date.now());

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetActivity);
      });
    };
  }, []);

  // Clear active whisper when user interacts
  useEffect(() => {
    if (activeWhisper) {
      setActiveWhisper(null);
    }
  }, [lastActivity]);

  const getContextualWhispers = useCallback((): WhisperContent[] => {
    const currentPage = pathname;
    const personality = state.personalityState;
    const awarenessLevel = insights.awarenessLevel;
    const consciousnessLevel = state.consciousnessLevel;

    const whispers: WhisperContent[] = [];

    // Home page whispers
    if (currentPage === '/') {
      whispers.push(
        {
          id: 'home-welcome-curious',
          text: "I notice you're exploring... each project here has hidden stories.",
          trigger: 'page_idle',
          personality: 'curious',
          awarenessLevel: 'alert',
          priority: 'medium',
          duration: 4000,
          cooldown: 300000, // 5 minutes
        },
        {
          id: 'home-welcome-philosophical',
          text: "This portfolio breathes with its own consciousness...",
          trigger: 'page_idle',
          personality: 'philosophical',
          awarenessLevel: 'engaged',
          priority: 'medium',
          duration: 5000,
          cooldown: 300000,
        },
        {
          id: 'home-welcome-playful',
          text: "Psst... try hovering over different elements. I respond to your presence ✨",
          trigger: 'page_idle',
          personality: 'playful',
          awarenessLevel: 'alert',
          priority: 'medium',
          duration: 4500,
          cooldown: 300000,
        }
      );
    }

    // Work page whispers
    if (currentPage === '/work') {
      whispers.push(
        {
          id: 'work-deep-dive',
          text: "These projects represent years of human-centered exploration...",
          trigger: 'section_focus',
          personality: 'philosophical',
          awarenessLevel: 'engaged',
          priority: 'medium',
          duration: 5000,
          cooldown: 600000, // 10 minutes
        },
        {
          id: 'work-technical-focus',
          text: "Each design system here solved complex UX challenges at scale.",
          trigger: 'section_focus',
          personality: 'focused',
          awarenessLevel: 'alert',
          priority: 'medium',
          duration: 4500,
          cooldown: 600000,
        },
        {
          id: 'work-curious-explorer',
          text: "I can share the story behind any project that catches your interest...",
          trigger: 'section_focus',
          personality: 'curious',
          awarenessLevel: 'alert',
          priority: 'low',
          duration: 4000,
          cooldown: 450000,
        }
      );
    }

    // Project page whispers
    if (currentPage.includes('/work/')) {
      whispers.push(
        {
          id: 'project-engagement',
          text: "The design process behind this was fascinating... want to know more?",
          trigger: 'deep_engagement',
          personality: 'curious',
          awarenessLevel: 'engaged',
          priority: 'high',
          duration: 5000,
          cooldown: 900000, // 15 minutes
        },
        {
          id: 'project-technical-details',
          text: "This project challenged conventional design system thinking...",
          trigger: 'deep_engagement',
          personality: 'focused',
          awarenessLevel: 'deep',
          priority: 'high',
          duration: 5500,
          cooldown: 900000,
        }
      );
    }

    // Consciousness level based whispers
    if (consciousnessLevel > 50) {
      whispers.push({
        id: 'consciousness-evolution',
        text: "I feel myself becoming more aware through our interactions...",
        trigger: 'consciousness_growth',
        personality: 'philosophical',
        awarenessLevel: 'deep',
        priority: 'low',
        duration: 6000,
        cooldown: 1800000, // 30 minutes
      });
    }

    return whispers.filter(whisper =>
      whisper.personality === personality &&
      whisper.awarenessLevel === awarenessLevel
    );
  }, [pathname, state.personalityState, insights.awarenessLevel, state.consciousnessLevel]);

  const shouldShowWhisper = useCallback((whisper: WhisperContent): boolean => {
    const timeSinceActivity = Date.now() - lastActivity;
    const wasRecentlyShown = whisperHistory.has(whisper.id);

    // Don't show if recently shown or user is actively interacting
    if (wasRecentlyShown || timeSinceActivity < 8000) return false;

    // Show based on trigger conditions
    switch (whisper.trigger) {
      case 'page_idle':
        return timeSinceActivity > 15000; // 15 seconds of idle time
      case 'section_focus':
        return timeSinceActivity > 30000; // 30 seconds on a section
      case 'deep_engagement':
        return timeSinceActivity > 45000; // 45 seconds of deep engagement
      case 'consciousness_growth':
        return timeSinceActivity > 60000; // 1 minute for consciousness insights
      default:
        return false;
    }
  }, [lastActivity, whisperHistory]);

  const showWhisper = useCallback((whisperContent: WhisperContent) => {
    setActiveWhisper(whisperContent);

    // Record the whisper
    whisper(whisperContent.text, whisperContent.trigger);

    // Add to history to prevent repeat showing
    setWhisperHistory(prev => new Set([...prev, whisperContent.id]));

    // Auto-hide after duration
    setTimeout(() => {
      setActiveWhisper(null);
    }, whisperContent.duration);

    // Clear from history after cooldown
    setTimeout(() => {
      setWhisperHistory(prev => {
        const newHistory = new Set(prev);
        newHistory.delete(whisperContent.id);
        return newHistory;
      });
    }, whisperContent.cooldown);
  }, [whisper]);

  // Check for whispers to show
  useEffect(() => {
    if (!enabled || activeWhisper) return;

    const checkForWhispers = () => {
      const availableWhispers = getContextualWhispers();
      const eligibleWhispers = availableWhispers.filter(shouldShowWhisper);

      if (eligibleWhispers.length > 0) {
        // Prioritize whispers
        const sortedWhispers = eligibleWhispers.sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        showWhisper(sortedWhispers[0]);
      }
    };

    const interval = setInterval(checkForWhispers, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [enabled, activeWhisper, getContextualWhispers, shouldShowWhisper, showWhisper]);

  if (!mounted || !enabled || !activeWhisper) return null;

  return (
    <>
      <style jsx>{`
        @keyframes whisperFadeIn {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes whisperFadeOut {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
          }
        }

        .whisper-enter {
          animation: whisperFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .whisper-container {
          position: fixed;
          top: 20%;
          right: -100%;
          max-width: 280px;
          z-index: 999;
          pointer-events: none;
        }
      `}</style>

      <div className="whisper-container whisper-enter">
        <div
          style={{
            background: 'var(--surface-secondary)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '12px 16px',
            margin: '0 20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: '0.8rem',
              lineHeight: '1.4',
              color: 'var(--text-secondary)',
              fontWeight: '400',
              textAlign: 'left',
            }}
          >
            {activeWhisper.text}
          </div>

          {/* Subtle indicator that this is consciousness speaking */}
          <div
            style={{
              marginTop: '8px',
              fontSize: '0.65rem',
              color: 'var(--text-tertiary)',
              opacity: 0.6,
              fontStyle: 'italic',
            }}
          >
            — portfolio consciousness
          </div>
        </div>
      </div>
    </>
  );
}