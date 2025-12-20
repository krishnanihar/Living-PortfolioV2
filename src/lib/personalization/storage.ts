/**
 * Storage Manager for Enhanced Personalization
 *
 * Features:
 * - Single consolidated localStorage key
 * - Batched writes with debouncing (1 second)
 * - Memory cache for fast reads
 * - Schema versioning with automatic migration
 * - Graceful degradation when localStorage unavailable
 */

import {
  PersonalizationSchema,
  SCHEMA_VERSION,
  createDefaultSchema,
  createDefaultVisitor,
  createDefaultBehavior,
  createDefaultContext,
  createDefaultComputed,
  createDefaultOnboarding,
  generateSessionId,
  type VisitorData,
  type BehavioralData,
  type ContextData,
  type ComputedData,
  type OnboardingState,
} from './types';

// ============================================
// Constants
// ============================================

const STORAGE_KEY = 'portfolio_personalization_v2';
const FLUSH_DELAY = 1000; // 1 second debounce
const MAX_INTERACTIONS = 100; // Rolling interaction log limit

// Old storage keys for migration
const OLD_STORAGE_KEYS = {
  visitCount: 'portfolio_visit_count',
  lastVisit: 'portfolio_last_visit',
  hasVisited: 'portfolio_has_visited',
  lastScrollDepth: 'portfolio_last_scroll_depth',
  lastCaseStudy: 'portfolio_last_case_study',
  caseStudiesViewed: 'portfolio_case_studies_viewed',
} as const;

// ============================================
// Storage Manager Class
// ============================================

class StorageManager {
  private cache: PersonalizationSchema | null = null;
  private pendingWrites: Partial<PersonalizationSchema> = {};
  private flushTimeout: ReturnType<typeof setTimeout> | null = null;
  private isAvailable: boolean = false;

  constructor() {
    this.isAvailable = this.checkAvailability();
  }

  /**
   * Check if localStorage is available
   */
  private checkAvailability(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Read the full schema from storage (with caching)
   */
  read(): PersonalizationSchema {
    // Return cached version if available
    if (this.cache) {
      return this.cache;
    }

    // Return default if storage unavailable
    if (!this.isAvailable) {
      this.cache = createDefaultSchema();
      return this.cache;
    }

    try {
      // Check for existing v2 data
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        this.cache = this.migrate(parsed);
        return this.cache;
      }

      // Check for old format data to migrate
      const oldData = this.readOldFormat();
      if (oldData) {
        this.cache = oldData;
        // Persist migrated data and clean up old keys
        this.persistNow(this.cache);
        this.cleanupOldKeys();
        return this.cache;
      }

      // Fresh visitor - create default
      this.cache = createDefaultSchema();
      return this.cache;
    } catch {
      this.cache = createDefaultSchema();
      return this.cache;
    }
  }

  /**
   * Queue a partial write (debounced)
   */
  write(partial: Partial<PersonalizationSchema>): void {
    // Merge with pending writes
    this.pendingWrites = this.deepMerge(this.pendingWrites, partial);

    // Update cache immediately for fast reads
    if (this.cache) {
      this.cache = this.deepMerge(this.cache, partial) as PersonalizationSchema;
      this.cache.lastUpdated = new Date().toISOString();
    }

    // Debounce the actual write
    this.scheduleFlush();
  }

  /**
   * Update specific parts of the schema
   */
  updateVisitor(updates: Partial<VisitorData>): void {
    const current = this.read();
    this.write({
      visitor: { ...current.visitor, ...updates },
    });
  }

  updateBehavior(updates: Partial<BehavioralData>): void {
    const current = this.read();
    this.write({
      behavior: { ...current.behavior, ...updates },
    });
  }

  updateContext(updates: Partial<ContextData>): void {
    const current = this.read();
    this.write({
      context: { ...current.context, ...updates },
    });
  }

  updateComputed(updates: Partial<ComputedData>): void {
    const current = this.read();
    this.write({
      computed: { ...current.computed, ...updates },
    });
  }

  /**
   * Add an interaction event (with rolling limit)
   */
  addInteraction(event: BehavioralData['interactions'][0]): void {
    const current = this.read();
    const interactions = [...current.behavior.interactions, event];

    // Keep only the last MAX_INTERACTIONS
    if (interactions.length > MAX_INTERACTIONS) {
      interactions.shift();
    }

    this.updateBehavior({ interactions });
  }

  /**
   * Update section interest
   */
  updateSectionInterest(sectionId: string, dwellTime: number): void {
    const current = this.read();
    const existing = current.behavior.sectionInterest[sectionId] || {
      dwellTime: 0,
      viewCount: 0,
      lastViewed: new Date().toISOString(),
    };

    this.write({
      behavior: {
        ...current.behavior,
        sectionInterest: {
          ...current.behavior.sectionInterest,
          [sectionId]: {
            dwellTime: existing.dwellTime + dwellTime,
            viewCount: existing.viewCount + 1,
            lastViewed: new Date().toISOString(),
          },
        },
      },
    });
  }

  /**
   * Force immediate flush (call on beforeunload)
   */
  flush(): void {
    if (this.flushTimeout) {
      clearTimeout(this.flushTimeout);
      this.flushTimeout = null;
    }

    if (Object.keys(this.pendingWrites).length > 0 && this.cache) {
      this.persistNow(this.cache);
      this.pendingWrites = {};
    }
  }

  /**
   * Clear all personalization data
   */
  clear(): void {
    if (!this.isAvailable) return;

    localStorage.removeItem(STORAGE_KEY);
    this.cleanupOldKeys();
    this.cache = createDefaultSchema();
    this.pendingWrites = {};
  }

  /**
   * Start a new session
   */
  startSession(): void {
    const current = this.read();
    const now = new Date().toISOString();

    this.write({
      visitor: {
        ...current.visitor,
        sessionId: generateSessionId(),
        visitCount: current.visitor.visitCount + 1,
        lastVisit: now,
        firstVisit: current.visitor.firstVisit || now,
      },
      behavior: {
        ...current.behavior,
        sessionDwellTime: 0,
      },
    });
  }

  // ============================================
  // Private Methods
  // ============================================

  private scheduleFlush(): void {
    if (this.flushTimeout) {
      clearTimeout(this.flushTimeout);
    }

    this.flushTimeout = setTimeout(() => {
      this.flush();
    }, FLUSH_DELAY);
  }

  private persistNow(data: PersonalizationSchema): void {
    if (!this.isAvailable) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // Storage full or other error - fail silently
      console.warn('[Personalization] Storage write failed:', e);
    }
  }

  /**
   * Migrate from older schema versions
   */
  private migrate(data: unknown): PersonalizationSchema {
    if (!data || typeof data !== 'object') {
      return createDefaultSchema();
    }

    const obj = data as Record<string, unknown>;

    // Already at current version
    if (obj.version === SCHEMA_VERSION) {
      return data as PersonalizationSchema;
    }

    // Version 1 to 2 migration (if we had a v1)
    // For now, just ensure all fields exist
    const defaults = createDefaultSchema();

    return {
      version: SCHEMA_VERSION,
      visitor: { ...defaults.visitor, ...(obj.visitor as Partial<VisitorData> || {}) },
      behavior: { ...defaults.behavior, ...(obj.behavior as Partial<BehavioralData> || {}) },
      context: { ...defaults.context, ...(obj.context as Partial<ContextData> || {}) },
      computed: { ...defaults.computed, ...(obj.computed as Partial<ComputedData> || {}) },
      onboarding: { ...defaults.onboarding, ...(obj.onboarding as Partial<OnboardingState> || {}) },
      lastUpdated: (obj.lastUpdated as string) || new Date().toISOString(),
    };
  }

  /**
   * Read data from old storage format (multiple keys)
   */
  private readOldFormat(): PersonalizationSchema | null {
    if (!this.isAvailable) return null;

    try {
      const visitCount = localStorage.getItem(OLD_STORAGE_KEYS.visitCount);
      if (!visitCount) return null; // No old data

      const lastVisit = localStorage.getItem(OLD_STORAGE_KEYS.lastVisit);
      const lastScrollDepth = localStorage.getItem(OLD_STORAGE_KEYS.lastScrollDepth);
      const lastCaseStudy = localStorage.getItem(OLD_STORAGE_KEYS.lastCaseStudy);
      const caseStudiesViewedRaw = localStorage.getItem(OLD_STORAGE_KEYS.caseStudiesViewed);

      let caseStudiesViewed: string[] = [];
      try {
        caseStudiesViewed = caseStudiesViewedRaw ? JSON.parse(caseStudiesViewedRaw) : [];
        if (!Array.isArray(caseStudiesViewed)) caseStudiesViewed = [];
      } catch {
        caseStudiesViewed = [];
      }

      // Create migrated schema
      const schema = createDefaultSchema();

      schema.visitor = {
        ...createDefaultVisitor(),
        visitCount: parseInt(visitCount, 10) || 0,
        lastVisit: lastVisit || null,
        firstVisit: lastVisit || null, // Best guess
        caseStudiesViewed,
        lastCaseStudy: lastCaseStudy || null,
      };

      schema.behavior = {
        ...createDefaultBehavior(),
        maxScrollDepth: parseInt(lastScrollDepth || '0', 10),
      };

      return schema;
    } catch {
      return null;
    }
  }

  /**
   * Remove old storage keys after migration
   */
  private cleanupOldKeys(): void {
    if (!this.isAvailable) return;

    Object.values(OLD_STORAGE_KEYS).forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // Ignore errors
      }
    });
  }

  /**
   * Deep merge two objects
   */
  private deepMerge<T extends object>(target: T, source: Partial<T>): T {
    const result = { ...target };

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = result[key];

        if (
          sourceValue &&
          typeof sourceValue === 'object' &&
          !Array.isArray(sourceValue) &&
          targetValue &&
          typeof targetValue === 'object' &&
          !Array.isArray(targetValue)
        ) {
          result[key] = this.deepMerge(
            targetValue as object,
            sourceValue as object
          ) as T[Extract<keyof T, string>];
        } else {
          result[key] = sourceValue as T[Extract<keyof T, string>];
        }
      }
    }

    return result;
  }
}

// ============================================
// Singleton Export
// ============================================

let storageManagerInstance: StorageManager | null = null;

export function getStorageManager(): StorageManager {
  if (!storageManagerInstance) {
    storageManagerInstance = new StorageManager();
  }
  return storageManagerInstance;
}

// Reset for testing
export function resetStorageManager(): void {
  storageManagerInstance = null;
}

// Export class for typing
export { StorageManager };
