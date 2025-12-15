'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMetamorphic } from './MetamorphicContext';

/**
 * ProcessGallery - Building Process Image Gallery
 *
 * Displays construction/building images in a responsive grid with:
 * - Lightbox modal for full-size viewing
 * - Navigation between images
 * - Captions
 * - Theme-matched styling
 */

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

// Default placeholder images - replace with actual building process images
const DEFAULT_IMAGES: GalleryImage[] = [
  { src: '/images/metamorphic/build-01.jpg', alt: 'Metal frame construction', caption: 'Welding the metal skeleton' },
  { src: '/images/metamorphic/build-02.jpg', alt: 'Bathroom structure', caption: 'Building the bathroom shell' },
  { src: '/images/metamorphic/build-03.jpg', alt: 'Mirror installation', caption: 'Installing the mirror portal' },
  { src: '/images/metamorphic/build-04.jpg', alt: 'Electronics setup', caption: 'TouchDesigner + Arduino integration' },
  { src: '/images/metamorphic/build-05.jpg', alt: 'Lighting test', caption: 'Testing the lighting system' },
  { src: '/images/metamorphic/build-06.jpg', alt: 'Final assembly', caption: 'Final assembly and testing' },
];

interface ProcessGalleryProps {
  /** Custom images to display (uses defaults if not provided) */
  images?: GalleryImage[];
  /** Section title */
  title?: string;
}

export function ProcessGallery({
  images = DEFAULT_IMAGES,
  title = 'Building the Installation',
}: ProcessGalleryProps) {
  const { atmosphereColor, isMobile, prefersReducedMotion } = useMetamorphic();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const brandRgb = '147, 51, 234';

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev !== null && prev < images.length - 1 ? prev + 1 : prev
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, images.length]);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : prev
    );
  }, [images.length]);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set([...prev, index]));
  };

  // Filter out images that failed to load
  const validImages = images.filter((_, index) => !imageErrors.has(index));

  if (validImages.length === 0) {
    return null; // Don't render if no valid images
  }

  return (
    <section
      id="process-gallery"
      style={{
        padding: isMobile ? '3rem 1.5rem' : '5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : 'clamp(1.75rem, 3vw, 2.25rem)',
            fontWeight: '200',
            letterSpacing: '-0.02em',
            color: 'var(--text-95)',
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: 'var(--text-60)',
            fontSize: isMobile ? '0.875rem' : '0.9375rem',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          Behind-the-scenes of constructing the immersive experience
        </p>
      </div>

      {/* Image Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(3, 1fr)',
          gap: isMobile ? '0.75rem' : '1.25rem',
        }}
      >
        {images.map((image, index) => {
          if (imageErrors.has(index)) return null;
          const isHovered = hoveredIndex === index;

          return (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                aspectRatio: '4 / 3',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--glass-05)',
                border: isHovered
                  ? `1px solid rgba(${brandRgb}, 0.4)`
                  : '1px solid var(--glass-10)',
                cursor: 'pointer',
                padding: 0,
                transition: prefersReducedMotion
                  ? 'none'
                  : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered && !prefersReducedMotion ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isHovered
                  ? `0 20px 40px rgba(${brandRgb}, 0.15)`
                  : 'none',
              }}
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={isMobile ? '50vw' : '33vw'}
                style={{
                  objectFit: 'cover',
                  transition: prefersReducedMotion ? 'none' : 'transform 0.5s ease',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
                onError={() => handleImageError(index)}
              />

              {/* Hover overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.7) 100%)`,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />

              {/* Caption on hover */}
              {image.caption && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem',
                    color: 'white',
                    fontSize: '0.8125rem',
                    fontWeight: '400',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                    transition: prefersReducedMotion
                      ? 'opacity 0.3s ease'
                      : 'all 0.3s ease',
                  }}
                >
                  {image.caption}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
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
              transition: 'background 0.2s ease',
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
                transition: 'background 0.2s ease',
                zIndex: 101,
              }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Next button */}
          {selectedIndex < images.length - 1 && (
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
                transition: 'background 0.2s ease',
                zIndex: 101,
              }}
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Image container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '80vh',
              width: 'auto',
              height: 'auto',
            }}
          >
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              width={1200}
              height={900}
              style={{
                maxWidth: '90vw',
                maxHeight: '75vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '12px',
              }}
              priority
            />

            {/* Caption */}
            {images[selectedIndex].caption && (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '1rem',
                  color: 'var(--text-70)',
                  fontSize: '0.9375rem',
                }}
              >
                {images[selectedIndex].caption}
              </div>
            )}

            {/* Image counter */}
            <div
              style={{
                textAlign: 'center',
                marginTop: '0.5rem',
                color: 'var(--text-40)',
                fontSize: '0.8125rem',
              }}
            >
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

export default ProcessGallery;
