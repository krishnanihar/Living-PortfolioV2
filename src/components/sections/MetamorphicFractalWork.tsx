'use client';

import React from 'react';
import {
  MetamorphicHeroV2,
  JourneyNarrative,
  BathroomExplodedView,
  ProcessGalleryV2,
  ExperienceFilm,
  RelatedProjectsV2,
} from '@/components/metamorphic';

/**
 * MetamorphicFractalWork - Anime.js-Powered Case Study
 *
 * Complete redesign inspired by animejs.com featuring:
 * - Interactive dot grid hero with cursor-reactive waves
 * - Stagger-animated content reveals
 * - Wave hover effects across galleries
 * - Dark purple aesthetic
 *
 * Sections:
 * 1. Hero - Interactive grid background with stagger title
 * 2. Experience Film - Video showcase
 * 3. Journey - Three-phase narrative (Approach, Dissolution, Integration)
 * 4. Technical - Animated system flow diagram
 * 5. Process - Stagger reveal gallery
 * 6. Related - Other projects with wave hover
 */
export function MetamorphicFractalWork() {
  const handleEnterPortal = () => {
    // Scroll to experience section
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="metamorphic-fractal-work"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Hero section with interactive grid */}
      <MetamorphicHeroV2 onEnterPortal={handleEnterPortal} />

      {/* Experience film video */}
      <ExperienceFilm />

      {/* Three-phase journey narrative */}
      <JourneyNarrative />

      {/* Technical system - 3D Exploded View */}
      <BathroomExplodedView />

      {/* Building process gallery */}
      <ProcessGalleryV2 />

      {/* Related projects */}
      <RelatedProjectsV2 />

      {/* Footer */}
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
    </div>
  );
}

export default MetamorphicFractalWork;
