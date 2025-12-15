'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useMetamorphic } from './MetamorphicContext';

/**
 * MirrorPortalSimulator - Interactive Video Experience
 *
 * Immersive video player for the installation experience film:
 * - Full YouTube embed with custom controls overlay
 * - Hover distortion effect on thumbnail
 * - Atmospheric glow matching narrative color
 * - Caption and call-to-action
 */

export function MirrorPortalSimulator() {
  const { atmosphereColor, isMobile, prefersReducedMotion, setIsInteracting } = useMetamorphic();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const brandRgb = '147, 51, 234';

  const handlePlay = () => {
    setShowVideo(true);
    setIsPlaying(true);
    setIsInteracting(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section
      id="experience"
      style={{
        padding: isMobile ? '3rem 1.5rem' : '5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: '200',
            letterSpacing: '-0.02em',
            color: 'var(--text-95)',
            marginBottom: '1rem',
          }}
        >
          Experience Film
        </h2>
        <p
          style={{
            color: 'var(--text-60)',
            fontSize: isMobile ? '0.9375rem' : '1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7',
          }}
        >
          A short capture of the installation and the mirror-portal moment.
        </p>
      </div>

      {/* Video container */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          aspectRatio: '16 / 9',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          boxShadow: isHovered
            ? `0 30px 60px rgba(${atmosphereColor.primary}, 0.15), 0 0 0 1px rgba(${atmosphereColor.primary}, 0.1)`
            : 'var(--shadow-lg)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered && !prefersReducedMotion ? 'scale(1.01)' : 'scale(1)',
        }}
      >
        {showVideo ? (
          /* YouTube embed */
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
              background: '#000',
            }}
          />
        ) : (
          /* Thumbnail with play button */
          <>
            {/* Gradient placeholder background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `
                  radial-gradient(ellipse at 50% 50%, rgba(${brandRgb}, 0.15) 0%, transparent 60%),
                  linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)
                `,
              }}
            />

            {/* Mirror frame illustration */}
            <div
              style={{
                position: 'absolute',
                inset: '15%',
                border: `2px solid rgba(${brandRgb}, 0.2)`,
                borderRadius: '8px',
                background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)`,
                boxShadow: `inset 0 0 60px rgba(${brandRgb}, 0.1)`,
              }}
            />

            {/* Shimmer effect on hover */}
            {isHovered && !prefersReducedMotion && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)`,
                  animation: 'shimmer 2s ease-in-out infinite',
                }}
              />
            )}

            {/* Distortion overlay on hover */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backdropFilter: isHovered ? 'blur(2px) saturate(120%)' : 'none',
                transition: 'backdrop-filter 0.5s ease',
              }}
            />

            {/* Play button */}
            <button
              onClick={handlePlay}
              aria-label="Play experience film"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: isHovered ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%) scale(1)',
                width: isMobile ? '80px' : '100px',
                height: isMobile ? '80px' : '100px',
                borderRadius: '50%',
                background: `rgba(${brandRgb}, 0.9)`,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 40px rgba(${brandRgb}, 0.4), 0 0 80px rgba(${brandRgb}, 0.2)`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Play
                size={isMobile ? 32 : 40}
                fill="white"
                style={{
                  color: 'white',
                  marginLeft: '4px', // Visual centering for play icon
                }}
              />
            </button>

            {/* "Tap to dissolve" caption */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '0.75rem 1.5rem',
                borderRadius: '100px',
                background: 'var(--glass-08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-15)',
                color: 'var(--text-70)',
                fontSize: '0.8125rem',
                fontWeight: '400',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                opacity: isHovered ? 1 : 0.7,
                transition: 'opacity 0.3s ease',
              }}
            >
              Tap the mirror to dissolve
            </div>
          </>
        )}

        {/* Atmospheric glow border */}
        <div
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '24px',
            padding: '1px',
            background: isHovered
              ? `linear-gradient(135deg, rgba(${atmosphereColor.primary}, 0.4), rgba(${atmosphereColor.secondary}, 0.2), rgba(${atmosphereColor.primary}, 0.4))`
              : 'transparent',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            transition: 'background 0.5s ease',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Caption */}
      <p
        style={{
          textAlign: 'center',
          color: 'var(--text-50)',
          fontSize: '0.8125rem',
          marginTop: '1.25rem',
          fontWeight: '300',
        }}
      >
        Experience film showing the installation and mirror-portal interaction.
      </p>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}

export default MirrorPortalSimulator;
