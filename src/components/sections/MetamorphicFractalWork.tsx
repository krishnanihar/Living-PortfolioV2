'use client';

import React from 'react';
import {
  MetamorphicProvider,
  AtmosphericBackground,
  MetamorphicHero,
  MirrorPortalSimulator,
  EgoArcNarrative,
  ProcessGallery,
  NarrativeProgressIndicator,
  NarrativeProgressBar,
  RelatedProjects,
} from '@/components/metamorphic';

/**
 * MetamorphicFractalWork - Immersive Narrative Case Study
 *
 * A psychedelic journey towards ego death, now with:
 * - 3-act scroll-driven narrative (Approach → Dissolution → Integration)
 * - Mirror portal video experience
 * - Dynamic atmospheric color transitions
 * - Narrative progress indicator
 *
 * Architecture:
 * - MetamorphicProvider: Central state management for scroll, colors, and interactions
 * - AtmosphericBackground: Fixed gradient backdrop with floating particles
 * - MetamorphicHero: Immersive entrance with Atropos 3D parallax
 * - MirrorPortalSimulator: Interactive video experience
 * - EgoArcNarrative: 3-act content structure (Concept, Process, Ethics)
 * - RelatedProjects: Grid of other case studies
 */
export function MetamorphicFractalWork() {
  return (
    <MetamorphicProvider>
      {/* Fixed atmospheric background */}
      <AtmosphericBackground zIndex={0} />

      {/* Progress indicators */}
      <NarrativeProgressIndicator />
      <NarrativeProgressBar />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          background: 'var(--bg-primary)',
        }}
      >
        {/* Hero section */}
        <MetamorphicHero />

        {/* Divider */}
        <SectionDivider />

        {/* Experience video */}
        <MirrorPortalSimulator />

        {/* Divider */}
        <SectionDivider />

        {/* 3-act narrative content */}
        <EgoArcNarrative />

        {/* Divider */}
        <SectionDivider />

        {/* Building process gallery */}
        <ProcessGallery />

        {/* Divider */}
        <SectionDivider />

        {/* Related projects */}
        <RelatedProjects />

        {/* Footer */}
        <MetamorphicFooter />
      </div>
    </MetamorphicProvider>
  );
}

/**
 * Section divider with gradient line
 */
function SectionDivider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--glass-15), transparent)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Simple footer with copyright
 */
function MetamorphicFooter() {
  return (
    <footer
      style={{
        padding: '2rem',
        borderTop: '1px solid var(--glass-08)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          color: 'var(--text-40)',
          fontSize: '0.8125rem',
          fontWeight: '300',
        }}
      >
        Metamorphic Fractal Reflections · NID 2023
      </div>
    </footer>
  );
}

export default MetamorphicFractalWork;
