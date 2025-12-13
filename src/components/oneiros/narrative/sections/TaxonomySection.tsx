'use client';

/**
 * Taxonomy Section - Dream-to-Art Mapping
 *
 * Interactive visualization showing how dream themes connect
 * to artwork motifs and actual artworks in the collection.
 */

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { OneirosNarrativeState } from '@/hooks/useOneirosNarrativeProgress';
import { MOTIF_TAXONOMY } from '@/data/oneiros/artwork-mappings';
import { ONEIROS_ARTWORKS } from '@/data/oneiros/artworks-expanded';

interface TaxonomySectionProps {
  narrativeState: OneirosNarrativeState;
}

// Theme metadata with colors
const THEME_COLORS: Record<string, string> = {
  water: '#06B6D4',
  flight: '#8B5CF6',
  faces: '#EC4899',
  pursuit: '#EF4444',
  light: '#F59E0B',
  darkness: '#6366F1',
  nature: '#10B981',
  transformation: '#78716C',
  love: '#F472B6',
  time: '#3B82F6',
  creatures: '#F97316',
  spaces: '#A855F7',
};

const THEME_ICONS: Record<string, string> = {
  water: '~',
  flight: '^',
  faces: '@',
  pursuit: '>',
  light: '*',
  darkness: '#',
  nature: '%',
  transformation: '&',
  love: '<3',
  time: '@',
  creatures: '!',
  spaces: '[]',
};

// Get artworks that match a theme
function getArtworksForTheme(theme: string): typeof ONEIROS_ARTWORKS {
  return ONEIROS_ARTWORKS.filter((artwork) =>
    artwork.dreamThemes?.includes(theme)
  ).slice(0, 4);
}

function ThemeCard({
  theme,
  keywords,
  isSelected,
  onSelect,
  color,
  index,
}: {
  theme: string;
  keywords: string[];
  isSelected: boolean;
  onSelect: () => void;
  color: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onClick={onSelect}
      style={{
        padding: '1rem 1.25rem',
        background: isSelected ? `${color}15` : 'var(--glass-03)',
        border: `1px solid ${isSelected ? color : 'var(--text-06)'}`,
        borderRadius: '12px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          layoutId="theme-indicator"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            background: color,
            borderRadius: '0 2px 2px 0',
          }}
        />
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem',
        }}
      >
        <span
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: color,
          }}
        >
          {THEME_ICONS[theme] || theme[0].toUpperCase()}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: isSelected ? 'var(--text-95)' : 'var(--text-80)',
            textTransform: 'capitalize',
          }}
        >
          {theme}
        </span>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.75rem',
          color: 'var(--text-40)',
          lineHeight: 1.5,
        }}
      >
        {keywords.slice(0, 4).join(' · ')}
      </p>
    </motion.button>
  );
}

function ArtworkPreview({
  artwork,
  index,
  color,
}: {
  artwork: typeof ONEIROS_ARTWORKS[0];
  index: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{
        background: 'var(--glass-03)',
        border: '1px solid var(--text-06)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Image placeholder with gradient */}
      <div
        style={{
          aspectRatio: '4/3',
          background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {artwork.imageUrl ? (
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '2rem',
              color: `${color}50`,
            }}
          >
            {artwork.title[0]}
          </span>
        )}
      </div>
      <div style={{ padding: '0.875rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: 'var(--text-85)',
            marginBottom: '0.25rem',
            lineHeight: 1.3,
          }}
        >
          {artwork.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.6875rem',
            color: 'var(--text-45)',
          }}
        >
          {artwork.artist}, {artwork.year}
        </p>
      </div>
    </motion.div>
  );
}

export function TaxonomySection({ narrativeState }: TaxonomySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedTheme, setSelectedTheme] = useState<string>('water');

  const themes = Object.entries(MOTIF_TAXONOMY);
  const selectedArtworks = getArtworksForTheme(selectedTheme);
  const themeColor = THEME_COLORS[selectedTheme] || narrativeState.color.primary;

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '6rem 2rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: narrativeState.color.primary,
              marginBottom: '1rem',
            }}
          >
            Dream Taxonomy
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              color: 'var(--text-90)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Your dreams have signatures
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-60)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            The Archive recognizes {themes.length} primary dream themes—patterns
            that connect your unconscious to masterworks across five centuries.
          </p>
        </motion.div>

        {/* Interactive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 400px) 1fr',
            gap: '3rem',
          }}
        >
          {/* Theme Selector */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              alignContent: 'start',
            }}
          >
            {themes.map(([theme, keywords], index) => (
              <ThemeCard
                key={theme}
                theme={theme}
                keywords={keywords}
                isSelected={selectedTheme === theme}
                onSelect={() => setSelectedTheme(theme)}
                color={THEME_COLORS[theme] || narrativeState.color.primary}
                index={index}
              />
            ))}
          </div>

          {/* Artwork Preview Grid */}
          <div>
            <motion.div
              key={selectedTheme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: themeColor,
                  textTransform: 'capitalize',
                  marginBottom: '0.5rem',
                }}
              >
                {selectedTheme} Dreams
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--text-50)',
                }}
              >
                {selectedArtworks.length} masterworks await in this theme
              </p>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '1rem',
              }}
            >
              <AnimatePresence mode="wait">
                {selectedArtworks.map((artwork, index) => (
                  <ArtworkPreview
                    key={`${selectedTheme}-${artwork.id}`}
                    artwork={artwork}
                    index={index}
                    color={themeColor}
                  />
                ))}
              </AnimatePresence>

              {selectedArtworks.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    gridColumn: '1 / -1',
                    padding: '3rem',
                    textAlign: 'center',
                    background: 'var(--glass-03)',
                    borderRadius: '16px',
                    border: '1px solid var(--text-06)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      color: 'var(--text-40)',
                    }}
                  >
                    Artworks for this theme will be revealed in the palace
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaxonomySection;
