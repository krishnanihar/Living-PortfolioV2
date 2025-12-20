'use client';

import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';

/**
 * ExperienceFilm - Full-Screen Cinematic Video Section
 *
 * Minimal, edge-to-edge video experience with:
 * - Full viewport height
 * - Clean centered play button
 * - Smooth fade transition to video
 *
 * Note: Play button is always visible (no IntersectionObserver delay)
 * because the cinematic overlay from BathroomExplodedView handles
 * the reveal timing - it fades out only after scroll completes.
 */

export function ExperienceFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  const handlePlay = () => {
    setShowVideo(true);
  };

  return (
    <section
      ref={sectionRef}
      id="experience-film"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Full-screen video container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        {showVideo ? (
          /* YouTube embed - full screen */
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/0U_BLJTcsDU?si=FmbBoowxVPrfZYkx&autoplay=1"
            title="Metamorphic Fractal Reflections - Experience Film"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              background: '#000',
            }}
          />
        ) : (
          /* Thumbnail state - minimal */
          <>
            {/* Cinematic gradient background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `
                  radial-gradient(ellipse at 50% 50%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
                  #000
                `,
              }}
            />

            {/* Subtle vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Minimal centered play button */}
            <button
              onClick={handlePlay}
              aria-label="Play experience film"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(147, 51, 234, 0.85)',
                border: '1px solid rgba(147, 51, 234, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 60px rgba(147, 51, 234, 0.3)',
                transition: 'all 0.3s ease',
                opacity: 1, // Always visible - overlay handles reveal timing
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 0 80px rgba(147, 51, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 60px rgba(147, 51, 234, 0.3)';
              }}
            >
              <Play
                size={28}
                fill="white"
                style={{
                  color: 'white',
                  marginLeft: '3px',
                }}
              />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default ExperienceFilm;
