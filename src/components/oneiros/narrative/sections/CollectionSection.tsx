'use client';

/**
 * Collection Section - Progressive Artwork Reveal
 *
 * Shows the breadth of the collection with progressive reveal
 * and century distribution visualization.
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { OneirosNarrativeState } from '@/hooks/useOneirosNarrativeProgress';
import { ONEIROS_ARTWORKS } from '@/data/oneiros/artworks-expanded';
import { ProgressiveBarChart } from '@/components/ui/ProgressiveDataReveal';

interface CollectionSectionProps {
  narrativeState: OneirosNarrativeState;
}

// Calculate century distribution from artworks
function getCenturyDistribution() {
  const distribution: Record<string, number> = {};

  ONEIROS_ARTWORKS.forEach((artwork) => {
    // Use century field directly (year can be string like "c. 1500")
    const century = artwork.century;
    const centuryLabel = `${century}th Century`;
    distribution[centuryLabel] = (distribution[centuryLabel] || 0) + 1;
  });

  return Object.entries(distribution)
    .sort(([a], [b]) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      return aNum - bNum;
    })
    .map(([label, value]) => ({
      label,
      value,
      color: 'rgba(139, 92, 246, 0.8)',
    }));
}

// Featured artworks for the grid
const FEATURED_ARTWORKS = ONEIROS_ARTWORKS.slice(0, 12);

export function CollectionSection({ narrativeState }: CollectionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const centuryData = getCenturyDistribution();

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
              fontFamily: 'var(--font-newsreader)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: narrativeState.color.primary,
              marginBottom: '1rem',
            }}
          >
            The Collection
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              color: 'var(--text-90)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            {ONEIROS_ARTWORKS.length} masterworks, waiting for your patterns
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-urbanist)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-60)',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            From Renaissance to Contemporary. Each artwork tagged with dream
            motifs, ready to find their way to your unconscious.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Century Distribution Chart */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                padding: '2rem',
                background: 'var(--glass-03)',
                border: '1px solid var(--text-06)',
                borderRadius: '20px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--text-70)',
                  marginBottom: '2rem',
                }}
              >
                Artworks by Century
              </h3>
              <ProgressiveBarChart
                data={centuryData}
                maxValue={Math.max(...centuryData.map((d) => d.value)) + 5}
              />
            </motion.div>

            {/* Transition Hook */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: '0.875rem',
                fontStyle: 'italic',
                color: 'var(--text-50)',
                textAlign: 'center',
                marginTop: '2rem',
                padding: '0 1rem',
              }}
            >
              But who gave permission to read these patterns?
            </motion.p>
          </div>

          {/* Artwork Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.5rem',
              }}
            >
              {FEATURED_ARTWORKS.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  style={{
                    aspectRatio: '1',
                    background: `linear-gradient(135deg, ${narrativeState.color.primary}20 0%, ${narrativeState.color.secondary}10 100%)`,
                    borderRadius: '8px',
                    overflow: 'hidden',
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
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-newsreader)',
                          fontSize: '1.5rem',
                          color: narrativeState.color.primary,
                          opacity: 0.5,
                        }}
                      >
                        {artwork.title[0]}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* More count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              style={{
                textAlign: 'center',
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'var(--glass-03)',
                borderRadius: '8px',
                border: '1px solid var(--text-06)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-50)',
                }}
              >
                +{ONEIROS_ARTWORKS.length - FEATURED_ARTWORKS.length} more in the Archive
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CollectionSection;
