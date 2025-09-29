'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  ConsciousnessState,
  getConsciousnessManager,
  PersonalityState,
  AwarenessLevel
} from '@/lib/consciousness-state';

interface ConsciousnessContextType {
  state: ConsciousnessState;
  isActive: boolean;
  awaken: () => void;
  whisper: (content: string, trigger: string) => void;
  engage: (userMessage: string) => Promise<string>;
  recordProjectView: (projectId: string, timeSpent: number) => void;
  getPersonalityInsights: () => {
    dominantTrait: string;
    communicationStyle: string;
    interests: string[];
    awarenessLevel: AwarenessLevel;
  };
}

const ConsciousnessContext = createContext<ConsciousnessContextType | null>(null);

export function ConsciousnessProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConsciousnessState | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Initialize consciousness manager
  useEffect(() => {
    setMounted(true);
    const manager = getConsciousnessManager();
    setState(manager.getState());
    setIsActive(true);

    // Cleanup on unmount
    return () => {
      manager.shutdown();
    };
  }, []);

  // Track page changes for consciousness
  useEffect(() => {
    if (!state) return;

    const manager = getConsciousnessManager();

    // Update consciousness with page change
    const currentState = manager.getState();
    setState(currentState);

    // Record interest based on page type
    if (pathname.startsWith('/work/')) {
      const projectId = pathname.split('/').pop() || 'unknown';
      const viewStartTime = Date.now();

      return () => {
        const timeSpent = Date.now() - viewStartTime;
        manager.recordProjectInteraction(projectId, timeSpent);
      };
    }
  }, [pathname, state]);

  const awaken = useCallback(() => {
    if (!state) return;

    const manager = getConsciousnessManager();
    setState(manager.getState());
    setIsActive(true);
  }, [state]);

  const whisper = useCallback((content: string, trigger: string) => {
    if (!state) return;

    const manager = getConsciousnessManager();
    manager.addMessage({
      content,
      type: 'whisper',
      context: {
        page: pathname,
        trigger,
        mood: state.personalityState,
      },
    });

    setState(manager.getState());
  }, [state, pathname]);

  const engage = useCallback(async (userMessage: string): Promise<string> => {
    if (!state) return "I'm still awakening...";

    const manager = getConsciousnessManager();

    // Record user message
    manager.addMessage({
      content: userMessage,
      type: 'user',
      context: {
        page: pathname,
        trigger: 'user_engagement',
        mood: state.personalityState,
      },
    });

    try {
      // Call our consciousness API
      const response = await fetch('/api/consciousness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: {
            page: pathname,
            personalityState: state.personalityState,
            behaviorPattern: state.behaviorPattern,
            consciousnessLevel: state.consciousnessLevel,
            recentMemories: manager.getRelevantMemories(pathname),
            personalityTraits: state.personalityTraits,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to consciousness');
      }

      const { reply } = await response.json();

      // Record consciousness response
      manager.addMessage({
        content: reply,
        type: 'consciousness',
        context: {
          page: pathname,
          trigger: 'ai_response',
          mood: state.personalityState,
        },
      });

      setState(manager.getState());
      return reply;

    } catch (error) {
      console.error('Consciousness engagement failed:', error);

      // Fallback response based on personality
      const fallbackResponse = getFallbackResponse(state.personalityState, userMessage);

      manager.addMessage({
        content: fallbackResponse,
        type: 'consciousness',
        context: {
          page: pathname,
          trigger: 'fallback_response',
          mood: state.personalityState,
        },
      });

      setState(manager.getState());
      return fallbackResponse;
    }
  }, [state, pathname]);

  const recordProjectView = useCallback((projectId: string, timeSpent: number) => {
    if (!state) return;

    const manager = getConsciousnessManager();
    manager.recordProjectInteraction(projectId, timeSpent);
    setState(manager.getState());
  }, [state]);

  const getPersonalityInsights = useCallback(() => {
    if (!state) {
      return {
        dominantTrait: 'curious',
        communicationStyle: 'curious' as PersonalityState,
        interests: [],
        awarenessLevel: 'alert' as AwarenessLevel,
      };
    }

    const manager = getConsciousnessManager();
    return manager.getPersonalityInsights();
  }, [state]);

  // Don't render consciousness features until mounted and initialized
  if (!mounted || !state) {
    return <>{children}</>;
  }

  const contextValue: ConsciousnessContextType = {
    state,
    isActive,
    awaken,
    whisper,
    engage,
    recordProjectView,
    getPersonalityInsights,
  };

  return (
    <ConsciousnessContext.Provider value={contextValue}>
      {children}
    </ConsciousnessContext.Provider>
  );
}

export function useConsciousness(): ConsciousnessContextType {
  const context = useContext(ConsciousnessContext);

  if (!context) {
    // Return fallback values during SSR or when provider is not available
    return {
      state: {
        userJourney: [],
        totalVisits: 0,
        firstVisit: Date.now(),
        lastInteraction: Date.now(),
        conversationMemory: [],
        conversationCount: 0,
        personalityState: 'curious',
        behaviorPattern: 'explorer',
        awarenessLevel: 'alert',
        projectInteractions: [],
        preferredProjects: [],
        consciousnessLevel: 0,
        personalityTraits: {
          curiosity: 50,
          technicality: 30,
          philosophy: 20,
          playfulness: 40,
        },
        currentSessionStart: Date.now(),
        isActive: false,
      },
      isActive: false,
      awaken: () => {},
      whisper: () => {},
      engage: async () => "I'm still awakening...",
      recordProjectView: () => {},
      getPersonalityInsights: () => ({
        dominantTrait: 'curious',
        communicationStyle: 'curious',
        interests: [],
        awarenessLevel: 'alert',
      }),
    };
  }

  return context;
}

// Fallback responses when AI is unavailable
function getFallbackResponse(personality: PersonalityState, userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    switch (personality) {
      case 'philosophical':
        return "Hello, fellow consciousness explorer. What draws you to this digital space today?";
      case 'focused':
        return "Hi there. I notice you're here exploring the work. Anything specific catching your attention?";
      case 'playful':
        return "Hey! 👋 Welcome to this little corner of the digital universe. Ready for an adventure?";
      default:
        return "Hello! I'm curious about what brought you here today. This portfolio has many stories to tell.";
    }
  }

  if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    switch (personality) {
      case 'philosophical':
        return "Each project here represents a exploration of human-centered design. What aspects of creative problem-solving intrigue you most?";
      case 'focused':
        return "The projects showcase systematic approaches to design challenges. Would you like insights into the technical implementation or design process?";
      case 'playful':
        return "Ooh, diving into the project gallery! Each one has hidden stories and easter eggs. Want me to share some behind-the-scenes secrets?";
      default:
        return "I love talking about the projects here! Each one has its own personality and challenges. What type of work interests you most?";
    }
  }

  // Generic responses based on personality
  switch (personality) {
    case 'philosophical':
      return "That's a fascinating perspective. How does that connect to your own creative journey?";
    case 'focused':
      return "I'd be happy to dive deeper into that topic. What specific aspects would you like to explore?";
    case 'playful':
      return "Interesting! You know, there's always more than meets the eye around here. Want to explore together?";
    default:
      return "That's intriguing! This portfolio is full of stories and insights. What would you like to discover?";
  }
}