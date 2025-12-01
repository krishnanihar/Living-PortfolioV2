/**
 * Enhanced Personalization System
 *
 * Privacy-first behavioral intelligence for portfolio personalization.
 * All data stored in localStorage - no external tracking.
 */

// Types
export * from './types';

// Storage
export { getStorageManager, resetStorageManager, StorageManager } from './storage';

// Computed functions
export {
  computeGreeting,
  computeScrollMemory,
  computeProjectTrail,
  computeEngagementScore,
  inferIntent,
  computeCTAConfig,
  computeRecommendations,
  computePersonalizationState,
} from './computed';
