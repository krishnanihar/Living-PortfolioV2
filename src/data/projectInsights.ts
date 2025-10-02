/**
 * Project Insights - Contextual information shown when hovering over project cards
 * Pre-loaded data for instant display (no API calls)
 */

export const projectInsights: Record<string, string> = {
  // Meta Design
  'living-organism': "You're experiencing it now | Living interface",

  // System Design
  'pixel-radar': '90% faster reviews | 50+ components audited',
  'aviation-analytics': '450+ daily users | Real-time ops dashboard',
  'flight-planning': 'Route optimization | 60k+ calculations/hour',
  'air-india-design-system': '200+ components | 18 months | Team of 6',

  // Mobile
  'airvistara-app': '40+ screens | 1M+ downloads | iOS + Android',
  'lounge-access': 'Digital passes | QR integration | Real-time sync',
  'crew-companion': 'Crew management | Flight schedules | Offline-first',

  // IFE (In-Flight Entertainment)
  'moving-map': '3D globe | Flight tracking | Real-time data',
  'ife-entertainment': 'Content library | 1000+ titles | Touchscreen UI',
  'flight-info': 'Live updates | Weather | Arrival times',

  // Hackathons
  'crew-rostering': 'Smart scheduling | ML-powered | Team collaboration',

  // Web
  'portfolio-v2': 'Living organism | Consciousness-aware | You are here',
  'air-india-website': 'Booking flow | Responsive | Accessibility-first',

  // Research & Speculative
  'latent-space': 'Speculative design | Dream ethics | Philosophy',
  'metamorphic-fractal': 'Ego dissolution | Multiverse | TouchDesigner + Arduino',
  'consciousness-ui': 'Adaptive interfaces | Behavior tracking | Ethical AI',

  // Default fallback
  'default': 'Hover to explore | Click for details',
};

/**
 * Get insight for a project
 */
export function getProjectInsight(projectId: string | null): string {
  if (!projectId) return projectInsights.default;
  return projectInsights[projectId] || projectInsights.default;
}
