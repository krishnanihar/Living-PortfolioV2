/**
 * Greeting History Tracking
 *
 * Tracks which greetings have been shown to avoid repetition.
 * Uses localStorage with automatic cleanup.
 */

import type { GreetingHistory } from '../types';

const STORAGE_KEY = 'greeting_history';
const ONE_HOUR = 60 * 60 * 1000;
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * Get IDs of recently shown greetings (within the last hour)
 */
export function getRecentlyShown(category: string): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const history: GreetingHistory = JSON.parse(stored);
    const now = Date.now();
    const oneHourAgo = now - ONE_HOUR;

    // Return IDs shown in the last hour that match the category
    return Object.entries(history.shown)
      .filter(([id, timestamps]) =>
        id.startsWith(category) &&
        timestamps.some(t => t > oneHourAgo)
      )
      .map(([id]) => id);
  } catch {
    return [];
  }
}

/**
 * Track that a greeting was shown
 */
export function trackShownGreeting(greetingId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const history: GreetingHistory = stored
      ? JSON.parse(stored)
      : { shown: {}, lastUpdated: Date.now() };

    const timestamps = history.shown[greetingId] || [];
    timestamps.push(Date.now());

    // Keep only last 3 timestamps per greeting
    history.shown[greetingId] = timestamps.slice(-3);
    history.lastUpdated = Date.now();

    // Prune old entries (older than a week)
    const oneWeekAgo = Date.now() - ONE_WEEK;
    Object.keys(history.shown).forEach(id => {
      history.shown[id] = history.shown[id].filter(t => t > oneWeekAgo);
      if (history.shown[id].length === 0) {
        delete history.shown[id];
      }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Track multiple greetings at once
 */
export function trackShownGreetings(greetingIds: string[]): void {
  greetingIds.forEach(id => trackShownGreeting(id));
}

/**
 * Clear all greeting history (for testing)
 */
export function clearGreetingHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
