/**
 * Metamorphic Fractal Reflections - Component Exports
 *
 * Modular components for the immersive case study experience.
 */

// Context & State
export { MetamorphicProvider, useMetamorphic, COLORS, ACT_THRESHOLDS } from './MetamorphicContext';
export type { RGB, AtmosphereColor, MetamorphicState } from './MetamorphicContext';

// Atmospheric Effects
export { AtmosphericBackground } from './AtmosphericBackground';
export { ConsciousnessParticles } from './ConsciousnessParticles';

// Main Sections
export { MetamorphicHero } from './MetamorphicHero';
export { EgoArcNarrative } from './EgoArcNarrative';
export { MirrorPortalSimulator } from './MirrorPortalSimulator';
export { FractalGenerator } from './FractalGenerator';

// Navigation
export { NarrativeProgressIndicator, NarrativeProgressBar } from './NarrativeProgressIndicator';

// Gallery
export { ProcessGallery } from './ProcessGallery';
export type { GalleryImage } from './ProcessGallery';

// Related Content
export { RelatedProjects } from './RelatedProjects';
