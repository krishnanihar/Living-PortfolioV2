'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Hammer, Wrench, Zap, Palette, TestTube, Box } from 'lucide-react';
import { animate, stagger } from 'animejs';

/**
 * ProcessGalleryV2 - Stagger Reveal Image Gallery
 *
 * Displays the building process with:
 * - Scroll-triggered stagger reveal animation
 * - Wave hover effect across grid items
 * - Placeholder images with icons (no actual images needed)
 * - Lightbox modal with keyboard navigation
 */

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  gradient: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'frame',
    title: 'Metal Frame',
    description: 'Welding the structural skeleton',
    icon: Wrench,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 'structure',
    title: 'Bathroom Shell',
    description: 'Building the enclosed space',
    icon: Box,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #1a1a2e 100%)',
  },
  {
    id: 'mirror',
    title: 'Mirror Installation',
    description: 'Two-way mirror with hidden display',
    icon: Palette,
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 50%, #2a1a3e 100%)',
  },
  {
    id: 'electronics',
    title: 'Electronics Setup',
    description: 'Arduino & TouchDesigner integration',
    icon: Zap,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f2847 50%, #0a3d62 100%)',
  },
  {
    id: 'testing',
    title: 'System Testing',
    description: 'Calibrating sensors and timing',
    icon: TestTube,
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2a1a4e 50%, #1a1a2e 100%)',
  },
  {
    id: 'final',
    title: 'Final Assembly',
    description: 'Complete installation ready',
    icon: Hammer,
    gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)',
  },
];

export function ProcessGalleryV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLButtonElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  // Scroll-triggered stagger reveal with anime.js v4
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          if (!prefersReducedMotion) {
            animate(itemsRef.current, {
              opacity: [0, 1],
              scale: [0.85, 1],
              translateY: [40, 0],
              delay: stagger(80, { grid: [3, 2], from: 'first' }),
              duration: 600,
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

  // Wave hover effect with anime.js v4
  const handleHover = useCallback(
    (index: number | null) => {
      setHoveredIndex(index);

      if (prefersReducedMotion || index === null) {
        // Reset all items
        animate(itemsRef.current, {
          scale: 1,
          opacity: 1,
          duration: 200,
          ease: 'outSine',
        });
        return;
      }

      // Wave effect from hovered item
      animate(itemsRef.current, {
        scale: ((_target: unknown, i: number) => (i === index ? 1.03 : 0.97)) as unknown as number,
        opacity: ((_target: unknown, i: number) => (i === index ? 1 : 0.7)) as unknown as number,
        delay: stagger(30, { from: index }),
        duration: 250,
        ease: 'outSine',
      });
    },
    [prefersReducedMotion]
  );

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : prev
    );
  }, []);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < GALLERY_ITEMS.length - 1 ? prev + 1 : prev
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, goToPrevious, goToNext]);

  return (
    <section
      ref={sectionRef}
      id="process-gallery"
      style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        background: 'var(--bg-primary)',
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
            marginBottom: isMobile ? '2.5rem' : '3.5rem',
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
            Behind the Scenes
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
            Building the Installation
          </h2>
        </div>

        {/* Gallery grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? '1rem' : '1.5rem',
          }}
        >
          {GALLERY_ITEMS.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                onClick={() => openLightbox(index)}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 3',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: item.gradient,
                  border: '1px solid var(--glass-10)',
                  cursor: 'pointer',
                  padding: 0,
                  opacity: prefersReducedMotion ? 1 : 0,
                  transition: 'border-color 0.3s ease',
                }}
                aria-label={`View ${item.title}`}
              >
                {/* Icon centered */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    size={isMobile ? 40 : 56}
                    style={{
                      color: 'rgba(var(--metamorphic-accent-rgb), 0.3)',
                      transition: 'all 0.3s ease',
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                </div>

                {/* Overlay with title */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.8) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: isMobile ? '1rem' : '1.25rem',
                    opacity: hoveredIndex === index ? 1 : 0.8,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      fontWeight: 500,
                      color: 'var(--text-95)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? '0.75rem' : '0.8125rem',
                      color: 'var(--text-60)',
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1rem' : '2rem',
            animation: prefersReducedMotion ? 'none' : 'fadeIn 0.2s ease',
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            style={{
              position: 'absolute',
              top: isMobile ? '1rem' : '2rem',
              right: isMobile ? '1rem' : '2rem',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--glass-10)',
              border: '1px solid var(--glass-20)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 101,
            }}
          >
            <X size={24} />
          </button>

          {/* Previous button */}
          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                left: isMobile ? '0.5rem' : '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--glass-10)',
                border: '1px solid var(--glass-20)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 101,
              }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Next button */}
          {selectedIndex < GALLERY_ITEMS.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
              style={{
                position: 'absolute',
                right: isMobile ? '0.5rem' : '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--glass-10)',
                border: '1px solid var(--glass-20)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 101,
              }}
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              maxWidth: '600px',
            }}
          >
            {/* Large icon placeholder */}
            <div
              style={{
                width: isMobile ? '200px' : '300px',
                aspectRatio: '4 / 3',
                borderRadius: '20px',
                background: GALLERY_ITEMS[selectedIndex].gradient,
                border: '1px solid var(--glass-15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {React.createElement(GALLERY_ITEMS[selectedIndex].icon, {
                size: isMobile ? 80 : 120,
                style: { color: 'rgba(var(--metamorphic-accent-rgb), 0.4)' },
              })}
            </div>

            {/* Title and description */}
            <div style={{ textAlign: 'center' }}>
              <h3
                style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 500,
                  color: 'var(--text-95)',
                  marginBottom: '0.5rem',
                }}
              >
                {GALLERY_ITEMS[selectedIndex].title}
              </h3>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-60)',
                }}
              >
                {GALLERY_ITEMS[selectedIndex].description}
              </p>
            </div>

            {/* Counter */}
            <div
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-40)',
              }}
            >
              {selectedIndex + 1} / {GALLERY_ITEMS.length}
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

export default ProcessGalleryV2;
