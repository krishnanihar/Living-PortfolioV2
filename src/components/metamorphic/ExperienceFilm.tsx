'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { animate } from 'animejs';

/**
 * ExperienceFilm - Video Showcase Section
 *
 * Displays the installation experience video with:
 * - Scroll-triggered reveal animation
 * - Custom play button with glow effect
 * - YouTube embed on play
 */

export function ExperienceFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll-triggered reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          if (!prefersReducedMotion && containerRef.current) {
            // anime.js v4 API
            animate(containerRef.current, {
              opacity: [0, 1],
              translateY: [40, 0],
              scale: [0.95, 1],
              duration: 800,
              ease: 'outExpo',
            });
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, prefersReducedMotion]);

  const handlePlay = () => {
    setShowVideo(true);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        background: `linear-gradient(180deg,
          var(--bg-primary) 0%,
          var(--metamorphic-bg-primary) 50%,
          var(--bg-primary) 100%)`,
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Section header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '3rem',
            opacity: isVisible || prefersReducedMotion ? 1 : 0,
            transform:
              isVisible || prefersReducedMotion
                ? 'translateY(0)'
                : 'translateY(30px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(var(--metamorphic-accent-rgb), 0.8)',
            }}
          >
            Watch
          </span>
          <h2
            style={{
              fontSize: isMobile
                ? 'clamp(1.75rem, 6vw, 2.25rem)'
                : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              color: 'var(--text-95)',
              marginTop: '0.75rem',
            }}
          >
            Experience Film
          </h2>
          <p
            style={{
              fontSize: isMobile ? '1rem' : '1.0625rem',
              color: 'var(--text-60)',
              maxWidth: '500px',
              margin: '1rem auto 0',
            }}
          >
            A short capture of the installation and the mirror-portal moment.
          </p>
        </div>

        {/* Video container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'var(--metamorphic-bg-secondary)',
            border: '1px solid var(--glass-10)',
            boxShadow: isHovered
              ? '0 30px 60px rgba(var(--metamorphic-accent-rgb), 0.15)'
              : '0 20px 40px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered && !prefersReducedMotion ? 'scale(1.01)' : 'scale(1)',
            opacity: prefersReducedMotion ? 1 : 0,
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
              {/* Gradient background */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    radial-gradient(ellipse at 50% 50%, rgba(var(--metamorphic-accent-rgb), 0.15) 0%, transparent 60%),
                    linear-gradient(180deg, var(--metamorphic-bg-primary) 0%, var(--metamorphic-bg-secondary) 100%)
                  `,
                }}
              />

              {/* Mirror frame illustration */}
              <div
                style={{
                  position: 'absolute',
                  inset: '15%',
                  border: '2px solid rgba(var(--metamorphic-accent-rgb), 0.2)',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
                  boxShadow: 'inset 0 0 60px rgba(var(--metamorphic-accent-rgb), 0.1)',
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
                  transform: isHovered
                    ? 'translate(-50%, -50%) scale(1.1)'
                    : 'translate(-50%, -50%) scale(1)',
                  width: isMobile ? '80px' : '100px',
                  height: isMobile ? '80px' : '100px',
                  borderRadius: '50%',
                  background: 'rgba(var(--metamorphic-accent-rgb), 0.9)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 40px rgba(var(--metamorphic-accent-rgb), 0.4), 0 0 80px rgba(var(--metamorphic-accent-rgb), 0.2)`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Play
                  size={isMobile ? 32 : 40}
                  fill="white"
                  style={{
                    color: 'white',
                    marginLeft: '4px',
                  }}
                />
              </button>

              {/* Caption */}
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
                  whiteSpace: 'nowrap',
                  opacity: isHovered ? 1 : 0.7,
                  transition: 'opacity 0.3s ease',
                }}
              >
                Tap the mirror to dissolve
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ExperienceFilm;
