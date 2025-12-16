/**
 * Metamorphic Fractal Reflections - Component Exports
 *
 * Anime.js-powered case study with interactive grid animations.
 */

// ========== NEW COMPONENTS (V2 - Anime.js) ==========

// Hero with interactive dot grid
export { MetamorphicHeroV2 } from './MetamorphicHeroV2';
export { InteractiveGridBackground } from './InteractiveGridBackground';

// Content sections
export { JourneyNarrative } from './JourneyNarrative';
export { TechnicalFlowDiagram } from './TechnicalFlowDiagram';
export { ExperienceFilm } from './ExperienceFilm';

// Gallery with stagger effects
export { ProcessGalleryV2 } from './ProcessGalleryV2';

// Related projects with wave hover
export { RelatedProjectsV2 } from './RelatedProjectsV2';

// ========== LEGACY COMPONENTS (for backwards compatibility) ==========

// Context & State (still used by some legacy components)
export { MetamorphicProvider, useMetamorphic, COLORS, ACT_THRESHOLDS } from './MetamorphicContext';
export type { RGB, AtmosphereColor, MetamorphicState } from './MetamorphicContext';

// Legacy sections (can be removed after full migration)
export { MetamorphicHero } from './MetamorphicHero';
export { MirrorPortalSimulator } from './MirrorPortalSimulator';
export { RelatedProjects } from './RelatedProjects';
