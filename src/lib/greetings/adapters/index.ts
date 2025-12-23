/**
 * Greeting Adapters
 *
 * Modify greeting weights based on user context (engagement, device, intent).
 */

import type { GreetingVariation, EngagementTier, GreetingTone } from '../types';
import type { DeviceType, InferredIntent } from '@/lib/personalization/types';
import { intentSuffixes } from '../pools';

// ============================================
// Engagement Tier Calculation
// ============================================

export function getEngagementTier(score: number): EngagementTier {
  if (score >= 70) return 'power';
  if (score >= 40) return 'engaged';
  if (score >= 15) return 'exploring';
  return 'new';
}

// ============================================
// Tone Adaptation
// ============================================

const tonePreferences: Record<EngagementTier, GreetingTone[]> = {
  new: ['professional', 'warm'],      // Welcoming but professional
  exploring: ['warm', 'curious'],     // Encouraging exploration
  engaged: ['casual', 'warm'],        // More familiar
  power: ['casual'],                  // Most familiar
};

export function adaptToneForEngagement(
  variations: GreetingVariation[],
  tier: EngagementTier
): GreetingVariation[] {
  const preferredTones = tonePreferences[tier];

  return variations.map(v => ({
    ...v,
    weight: preferredTones.includes(v.tone) ? v.weight * 1.5 : v.weight * 0.7,
  }));
}

// ============================================
// Device Adaptation
// ============================================

export function adaptForDevice(
  variations: GreetingVariation[],
  deviceType: DeviceType
): GreetingVariation[] {
  if (deviceType === 'mobile') {
    // Strongly prefer short greetings on mobile
    return variations.map(v => ({
      ...v,
      weight: v.length === 'short' ? v.weight * 2 : v.weight * 0.3,
    }));
  }
  return variations;
}

// ============================================
// Intent Suffix
// ============================================

export function getIntentSuffix(intent: InferredIntent): string | null {
  const suffixes = intentSuffixes[intent];
  if (!suffixes || suffixes.length === 0) return null;
  return suffixes[Math.floor(Math.random() * suffixes.length)];
}

// ============================================
// Combined Adaptation
// ============================================

export function adaptVariations(
  variations: GreetingVariation[],
  engagementTier: EngagementTier,
  deviceType: DeviceType
): GreetingVariation[] {
  let adapted = adaptToneForEngagement(variations, engagementTier);
  adapted = adaptForDevice(adapted, deviceType);
  return adapted;
}
