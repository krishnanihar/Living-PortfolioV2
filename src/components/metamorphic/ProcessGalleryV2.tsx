'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

/**
 * ProcessGalleryV2 - Bento-Style Image Gallery with Shared Element Transitions
 *
 * Modern portfolio gallery featuring:
 * - Real images with bento-style varied grid layout
 * - Framer Motion layoutId for smooth lightbox transitions
 * - Grayscale-to-color hover effects
 * - Minimal design (no section header)
 */

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  gridArea?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'meta1',
    src: '/images/metamorphic/meta1.jpg',
    title: 'Metal Frame',
    description: 'Welding the structural skeleton',
    gridArea: '1 / 1 / 3 / 3', // 2x2 top-left
  },
  {
    id: 'meta2',
    src: '/images/metamorphic/meta2.jpg',
    title: 'Bathroom Shell',
    description: 'Building the enclosed space',
    gridArea: '1 / 3 / 2 / 4',
  },
  {
    id: 'meta3',
    src: '/images/metamorphic/meta3.jpg',
    title: 'Mirror Installation',
    description: 'Two-way mirror with hidden display',
    gridArea: '1 / 4 / 2 / 5',
  },
  {
    id: 'meta4',
    src: '/images/metamorphic/meta4.jpg',
    title: 'Electronics Setup',
    description: 'Arduino & TouchDesigner integration',
    gridArea: '2 / 3 / 3 / 5', // 2-column span
  },
  {
    id: 'meta5',
    src: '/images/metamorphic/meta5.jpg',
    title: 'System Testing',
    description: 'Calibrating sensors and timing',
    gridArea: '3 / 1 / 4 / 3', // 2-column span
  },
  {
    id: 'meta6',
    src: '/images/metamorphic/meta6.jpg',
    title: 'Final Assembly',
    description: 'Complete installation ready',
    gridArea: '3 / 3 / 4 / 4',
  },
  {
    id: 'meta7',
    src: '/images/metamorphic/meta7.jpg',
    title: 'Experience',
    description: 'The mirror-portal moment',
    gridArea: '3 / 4 / 4 / 5',
  },
];

// Mobile grid areas (2 columns)
const MOBILE_GRID_AREAS: Record<string, string> = {
  meta1: '1 / 1 / 3 / 3', // 2x2
  meta2: '3 / 1 / 4 / 2',
  meta3: '3 / 2 / 4 / 3',
  meta4: '4 / 1 / 5 / 3', // full width
  meta5: '5 / 1 / 6 / 3', // full width
  meta6: '6 / 1 / 7 / 2',
  meta7: '6 / 2 / 7 / 3',
};

export function ProcessGalleryV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize
  useEffect(() => {
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
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  // Lightbox handlers
  const openLightbox = (id: string) => {
    setSelectedId(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedId(null);
    document.body.style.overflow = '';
  }, []);

  const selectedIndex = selectedId
    ? GALLERY_ITEMS.findIndex((item) => item.id === selectedId)
    : -1;

  const goToPrevious = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedId(GALLERY_ITEMS[selectedIndex - 1].id);
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex < GALLERY_ITEMS.length - 1) {
      setSelectedId(GALLERY_ITEMS[selectedIndex + 1].id);
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedId === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, closeLightbox, goToPrevious, goToNext]);

  const selectedItem = selectedId
    ? GALLERY_ITEMS.find((item) => item.id === selectedId)
    : null;

  return (
    <LayoutGroup>
      <section
        ref={sectionRef}
        id="process-gallery"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: isMobile ? '4rem 1rem' : '6rem 2rem',
          background: 'var(--bg-primary)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Bento-style grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gridTemplateRows: isMobile
                ? 'repeat(6, minmax(140px, 1fr))'
                : 'repeat(3, minmax(180px, 220px))',
              gap: isMobile ? '0.75rem' : '1rem',
            }}
          >
            {GALLERY_ITEMS.map((item, index) => (
              <motion.button
                key={item.id}
                layoutId={`image-container-${item.id}`}
                onClick={() => openLightbox(item.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isVisible
                    ? {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.08,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }
                    : {}
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  gridArea: isMobile ? MOBILE_GRID_AREAS[item.id] : item.gridArea,
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--glass-10)',
                  padding: 0,
                  background: 'transparent',
                }}
                aria-label={`View ${item.title}`}
              >
                {/* Image */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    filter: 'grayscale(30%)',
                  }}
                  whileHover={{ filter: 'grayscale(0%)' }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes={isMobile ? '50vw' : '25vw'}
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </motion.div>

                {/* Gradient overlay */}
                <motion.div
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, transparent 30%, rgba(0, 0, 0, 0.8) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: isMobile ? '1rem' : '1.25rem',
                  }}
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      style={{
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        fontWeight: 500,
                        color: 'var(--text-95)',
                        marginBottom: '0.25rem',
                        textAlign: 'left',
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? '0.75rem' : '0.8125rem',
                        color: 'var(--text-60)',
                        textAlign: 'left',
                      }}
                    >
                      {item.description}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lightbox Modal with Shared Element Transition */}
        <AnimatePresence>
          {selectedId && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-label="Gallery lightbox"
              onClick={closeLightbox}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '1rem' : '2rem',
              }}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
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
              </motion.button>

              {/* Previous button */}
              {selectedIndex > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 }}
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
                </motion.button>
              )}

              {/* Next button */}
              {selectedIndex < GALLERY_ITEMS.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2 }}
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
                </motion.button>
              )}

              {/* Main image with shared element transition */}
              <motion.div
                layoutId={`image-container-${selectedId}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  width: isMobile ? '95vw' : '80vw',
                  height: isMobile ? '60vh' : '75vh',
                  maxWidth: '1400px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  sizes="90vw"
                  style={{
                    objectFit: 'contain',
                  }}
                  priority
                />
              </motion.div>

              {/* Title and description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '1.5rem' : '3rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  maxWidth: '600px',
                  padding: '0 1rem',
                }}
              >
                <h3
                  style={{
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    fontWeight: 500,
                    color: 'var(--text-95)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {selectedItem.title}
                </h3>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-60)',
                    marginBottom: '1rem',
                  }}
                >
                  {selectedItem.description}
                </p>
                {/* Counter */}
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-40)',
                  }}
                >
                  {selectedIndex + 1} / {GALLERY_ITEMS.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}

export default ProcessGalleryV2;
