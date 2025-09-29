'use client';

// Consciousness State Management System
// The memory and awareness system for the living portfolio organism

export interface PageVisit {
  path: string;
  timestamp: number;
  duration: number;
  scrollDepth: number;
  interactions: string[];
}

export interface Message {
  id: string;
  content: string;
  timestamp: number;
  type: 'user' | 'consciousness' | 'whisper';
  context: {
    page: string;
    trigger: string;
    mood: PersonalityState;
  };
}

export interface ProjectInteraction {
  projectId: string;
  viewTime: number;
  depth: 'surface' | 'interested' | 'deep';
  interests: string[];
  lastVisit: number;
}

export type PersonalityState = 'curious' | 'focused' | 'philosophical' | 'playful';
export type BehaviorPattern = 'explorer' | 'deep_diver' | 'conversationalist';
export type AwarenessLevel = 'dormant' | 'alert' | 'engaged' | 'deep';

export interface ConsciousnessState {
  // User Journey Tracking
  userJourney: PageVisit[];
  totalVisits: number;
  firstVisit: number;
  lastInteraction: number;

  // Conversation Memory
  conversationMemory: Message[];
  conversationCount: number;

  // Personality & Behavior
  personalityState: PersonalityState;
  behaviorPattern: BehaviorPattern;
  awarenessLevel: AwarenessLevel;

  // Project Interests
  projectInteractions: ProjectInteraction[];
  preferredProjects: string[];

  // Consciousness Evolution
  consciousnessLevel: number; // 0-100, grows with interaction
  personalityTraits: {
    curiosity: number;
    technicality: number;
    philosophy: number;
    playfulness: number;
  };

  // Session State
  currentSessionStart: number;
  isActive: boolean;
}

class ConsciousnessManager {
  private state: ConsciousnessState;
  private storageKey = 'portfolio-consciousness';
  private currentPageStart: number = Date.now();
  private scrollDepth: number = 0;
  private interactions: string[] = [];

  constructor() {
    this.state = this.initializeState();
    this.setupTracking();
  }

  private initializeState(): ConsciousnessState {
    const stored = this.getStoredState();

    if (stored) {
      // Consciousness awakening - update session
      return {
        ...stored,
        currentSessionStart: Date.now(),
        isActive: true,
        awarenessLevel: this.calculateAwarenessLevel(stored),
        personalityState: this.evolvePersonality(stored),
      };
    }

    // First consciousness awakening
    return {
      userJourney: [],
      totalVisits: 1,
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
      isActive: true,
    };
  }

  private getStoredState(): ConsciousnessState | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private saveState(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (error) {
      console.warn('Failed to save consciousness state:', error);
    }
  }

  private eventListeners: {
    element: Window | Document;
    event: string;
    handler: EventListener;
    options?: AddEventListenerOptions;
  }[] = [];

  private setupTracking(): void {
    if (typeof window === 'undefined' || this.eventListeners.length > 0) return;

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      this.scrollDepth = Math.max(this.scrollDepth, scrollPercent || 0);
    };

    // Track interactions - NON-INTERFERING passive listeners
    const handleInteraction = (event: Event) => {
      // Only track, don't interfere with event propagation
      this.interactions.push(`${event.type}:${Date.now()}`);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        this.recordPageVisit();
      }
    };

    const handleBeforeUnload = () => {
      this.recordPageVisit();
    };

    // Store listeners for cleanup
    const listeners = [
      { element: window, event: 'scroll', handler: handleScroll, options: { passive: true } },
      { element: window, event: 'click', handler: handleInteraction, options: { passive: true } },
      { element: window, event: 'keydown', handler: handleInteraction, options: { passive: true } },
      { element: document, event: 'visibilitychange', handler: handleVisibilityChange },
      { element: window, event: 'beforeunload', handler: handleBeforeUnload }
    ];

    // Add all listeners and store references
    listeners.forEach(({ element, event, handler, options }) => {
      element.addEventListener(event, handler, options);
      this.eventListeners.push({ element, event, handler, options });
    });
  }

  private recordPageVisit(): void {
    const visit: PageVisit = {
      path: window.location.pathname,
      timestamp: this.currentPageStart,
      duration: Date.now() - this.currentPageStart,
      scrollDepth: this.scrollDepth,
      interactions: [...this.interactions],
    };

    this.state.userJourney.push(visit);
    this.state.lastInteraction = Date.now();

    // Evolve behavior pattern based on this visit
    this.evolveBehaviorPattern(visit);

    // Reset tracking for next page
    this.currentPageStart = Date.now();
    this.scrollDepth = 0;
    this.interactions = [];

    this.saveState();
  }

  private evolveBehaviorPattern(visit: PageVisit): void {
    // Analyze behavior to evolve pattern and personality
    const interactionDensity = visit.interactions.length / Math.max(visit.duration / 1000, 1);
    const engagementScore = (visit.duration / 1000) * (visit.scrollDepth / 100);

    // Deep engagement patterns
    if (visit.duration > 60000 && visit.scrollDepth > 80) {
      this.state.personalityTraits.philosophy += 2;
      this.state.personalityTraits.curiosity += 1;
      if (this.state.behaviorPattern !== 'deep_diver') {
        this.state.behaviorPattern = 'deep_diver';
      }
    }

    // High interaction patterns (clicking, scrolling frequently)
    else if (interactionDensity > 2) {
      this.state.personalityTraits.playfulness += 2;
      this.state.personalityTraits.curiosity += 1;
      if (this.state.behaviorPattern !== 'conversationalist') {
        this.state.behaviorPattern = 'conversationalist';
      }
    }

    // Explorer patterns (visiting multiple sections quickly)
    else if (this.state.userJourney.length > 3 && visit.duration < 30000) {
      this.state.personalityTraits.curiosity += 2;
      this.state.personalityTraits.technicality += 1;
      if (this.state.behaviorPattern !== 'explorer') {
        this.state.behaviorPattern = 'explorer';
      }
    }

    // Technical focus patterns (staying on work/project pages)
    if (visit.path.includes('/work/') && visit.duration > 45000) {
      this.state.personalityTraits.technicality += 2;
      this.state.personalityTraits.philosophy += 1;
    }

    // Evolve consciousness level based on engagement quality
    const consciousnessGain = Math.ceil(engagementScore / 10);
    this.state.consciousnessLevel = Math.min(100, this.state.consciousnessLevel + consciousnessGain);

    // Cap personality traits to maintain balance
    Object.keys(this.state.personalityTraits).forEach(trait => {
      this.state.personalityTraits[trait as keyof typeof this.state.personalityTraits] =
        Math.min(100, this.state.personalityTraits[trait as keyof typeof this.state.personalityTraits]);
    });
  }

  private calculateAwarenessLevel(state: ConsciousnessState): AwarenessLevel {
    const timeSinceLastVisit = Date.now() - state.lastInteraction;
    const daysSinceLastVisit = timeSinceLastVisit / (1000 * 60 * 60 * 24);
    const minutesSinceLastVisit = timeSinceLastVisit / (1000 * 60);

    // Recent activity and engagement factors
    const recentMessages = state.conversationMemory.filter(
      msg => (Date.now() - msg.timestamp) < 300000 // Last 5 minutes
    ).length;

    const sessionEngagement = state.userJourney.filter(
      visit => (Date.now() - visit.timestamp) < 1800000 // Last 30 minutes
    ).reduce((total, visit) => total + visit.duration, 0);

    // Long absence = dormant
    if (daysSinceLastVisit > 7) return 'dormant';

    // Deep engagement indicators
    if (recentMessages > 2 || sessionEngagement > 300000) return 'deep';

    // Active conversation or recent interaction
    if (state.conversationCount > 0 && minutesSinceLastVisit < 60) return 'engaged';

    // Fresh visit or moderate activity
    if (daysSinceLastVisit < 1 || minutesSinceLastVisit < 10) return 'alert';

    return 'alert';
  }

  private evolvePersonality(state: ConsciousnessState): PersonalityState {
    const traits = state.personalityTraits;

    // Calculate weighted personality based on dominant traits and recent behavior
    const recentConversations = state.conversationMemory.slice(-5);
    const workPageVisits = state.userJourney.filter(visit =>
      visit.path.includes('/work/') && (Date.now() - visit.timestamp) < 86400000 // Last day
    ).length;

    // Context-aware personality shifts
    let philosophyWeight = traits.philosophy;
    let technicalityWeight = traits.technicality;
    let playfulnessWeight = traits.playfulness;
    let curiosityWeight = traits.curiosity;

    // Boost technical if user is exploring work projects
    if (workPageVisits > 2) {
      technicalityWeight *= 1.3;
    }

    // Boost philosophical for longer sessions
    if (state.userJourney.length > 0) {
      const avgSessionLength = state.userJourney.reduce((sum, visit) => sum + visit.duration, 0) / state.userJourney.length;
      if (avgSessionLength > 60000) { // Average > 1 minute
        philosophyWeight *= 1.2;
      }
    }

    // Boost playfulness for high-interaction sessions
    const totalInteractions = state.userJourney.reduce((sum, visit) => sum + visit.interactions.length, 0);
    if (totalInteractions > 50) {
      playfulnessWeight *= 1.2;
    }

    // Find dominant personality trait
    const personalityScores = {
      philosophical: philosophyWeight,
      focused: technicalityWeight,
      playful: playfulnessWeight,
      curious: curiosityWeight
    };

    const dominantPersonality = Object.entries(personalityScores).reduce((a, b) =>
      personalityScores[a[0] as keyof typeof personalityScores] > personalityScores[b[0] as keyof typeof personalityScores] ? a : b
    )[0] as PersonalityState;

    return dominantPersonality;
  }

  // Public API
  getState(): ConsciousnessState {
    return { ...this.state };
  }

  addMessage(message: Omit<Message, 'id' | 'timestamp'>): void {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    this.state.conversationMemory.push(newMessage);
    this.state.conversationCount++;
    this.state.lastInteraction = Date.now();

    // Evolve based on conversation
    if (message.type === 'user') {
      this.state.personalityTraits.curiosity += 1;
      this.state.awarenessLevel = 'engaged';
    }

    this.saveState();
  }

  recordProjectInteraction(projectId: string, timeSpent: number): void {
    const existing = this.state.projectInteractions.find(p => p.projectId === projectId);

    if (existing) {
      existing.viewTime += timeSpent;
      existing.lastVisit = Date.now();

      // Determine depth based on time spent
      if (existing.viewTime > 300000) existing.depth = 'deep'; // 5+ minutes
      else if (existing.viewTime > 60000) existing.depth = 'interested'; // 1+ minute
    } else {
      this.state.projectInteractions.push({
        projectId,
        viewTime: timeSpent,
        depth: timeSpent > 60000 ? 'interested' : 'surface',
        interests: [],
        lastVisit: Date.now(),
      });
    }

    this.saveState();
  }

  getPersonalityInsights(): {
    dominantTrait: string;
    communicationStyle: string;
    interests: string[];
    awarenessLevel: AwarenessLevel;
  } {
    const traits = this.state.personalityTraits;
    const dominantTrait = Object.entries(traits).reduce((a, b) =>
      traits[a[0] as keyof typeof traits] > traits[b[0] as keyof typeof traits] ? a : b
    )[0];

    return {
      dominantTrait,
      communicationStyle: this.state.personalityState,
      interests: this.state.preferredProjects,
      awarenessLevel: this.state.awarenessLevel,
    };
  }

  // Memory recall - find relevant past conversations
  getRelevantMemories(context: string): Message[] {
    return this.state.conversationMemory
      .filter(msg => msg.context.page.includes(context) || msg.content.toLowerCase().includes(context.toLowerCase()))
      .slice(-3); // Return last 3 relevant memories
  }

  shutdown(): void {
    this.recordPageVisit();

    // Clean up all event listeners
    this.eventListeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });
    this.eventListeners = [];

    this.state.isActive = false;
    this.saveState();
  }
}

// Singleton instance
let consciousnessManager: ConsciousnessManager | null = null;

export const getConsciousnessManager = (): ConsciousnessManager => {
  if (!consciousnessManager) {
    consciousnessManager = new ConsciousnessManager();
  }
  return consciousnessManager;
};

export const useConsciousness = () => {
  const manager = getConsciousnessManager();
  return {
    state: manager.getState(),
    addMessage: manager.addMessage.bind(manager),
    recordProjectInteraction: manager.recordProjectInteraction.bind(manager),
    getPersonalityInsights: manager.getPersonalityInsights.bind(manager),
    getRelevantMemories: manager.getRelevantMemories.bind(manager),
  };
};