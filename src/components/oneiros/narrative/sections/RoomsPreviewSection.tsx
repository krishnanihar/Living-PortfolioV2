'use client';

/**
 * Rooms Preview Section - The Nine Rooms
 *
 * Showcases all nine dream rooms with their atmospheres,
 * themes, and artwork counts before entering the palace.
 */

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { OneirosNarrativeState } from '@/hooks/useOneirosNarrativeProgress';
import { DREAM_ROOMS } from '@/data/oneiros/artwork-mappings';
import { ONEIROS_ARTWORKS } from '@/data/oneiros/artworks-expanded';
import { useDreamAnalysis } from '../../context/DreamAnalysisContext';
import { DreamInput } from '../../ui/DreamInput';

interface RoomsPreviewSectionProps {
  narrativeState: OneirosNarrativeState;
}

// Get artwork count for a room theme
function getArtworkCountForTheme(themes: string[]): number {
  return ONEIROS_ARTWORKS.filter((artwork) =>
    artwork.dreamThemes?.some((t) => themes.includes(t))
  ).length;
}

function RoomCard({
  room,
  index,
  isSelected,
  onSelect,
}: {
  room: typeof DREAM_ROOMS[0];
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const artworkCount = getArtworkCountForTheme(room.themes);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onSelect}
      style={{
        padding: '1.25rem',
        background: isSelected
          ? `linear-gradient(135deg, ${room.atmosphere.primaryColor}15 0%, ${room.atmosphere.secondaryColor}10 100%)`
          : 'var(--glass-03)',
        border: `1px solid ${isSelected ? room.atmosphere.primaryColor + '40' : 'var(--text-06)'}`,
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Color indicator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${room.atmosphere.primaryColor}, ${room.atmosphere.secondaryColor})`,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
        }}
      >
        <h4
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '1rem',
            fontWeight: 500,
            color: isSelected ? 'var(--text-95)' : 'var(--text-80)',
          }}
        >
          {room.name}
        </h4>
        <span
          style={{
            padding: '0.25rem 0.5rem',
            background: `${room.atmosphere.primaryColor}15`,
            borderRadius: '4px',
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.625rem',
            fontWeight: 600,
            color: room.atmosphere.primaryColor,
            textTransform: 'uppercase',
          }}
        >
          {room.sleepStage}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.8125rem',
          color: 'var(--text-50)',
          lineHeight: 1.5,
          marginBottom: '0.75rem',
        }}
      >
        {room.description}
      </p>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Themes */}
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {room.themes.map((theme) => (
            <span
              key={theme}
              style={{
                padding: '0.25rem 0.5rem',
                background: 'var(--glass-05)',
                borderRadius: '4px',
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '0.625rem',
                color: 'var(--text-50)',
                textTransform: 'capitalize',
              }}
            >
              {theme}
            </span>
          ))}
        </div>

        {/* Artwork count */}
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: '0.6875rem',
            color: 'var(--text-40)',
          }}
        >
          {artworkCount} works
        </span>
      </div>
    </motion.div>
  );
}

export function RoomsPreviewSection({ narrativeState }: RoomsPreviewSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedRoom, setSelectedRoom] = useState<number>(0);
  const { state } = useDreamAnalysis();

  const selected = DREAM_ROOMS[selectedRoom];

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
            The Nine Rooms
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
            Dream galleries await your patterns
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-60)',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Each room responds to different dream themes. Share your dreams to
            unlock personalized galleries—or explore the default collection.
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          {DREAM_ROOMS.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              isSelected={selectedRoom === index}
              onSelect={() => setSelectedRoom(index)}
            />
          ))}
        </div>

        {/* Selected Room Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRoom}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '2.5rem',
              background: `linear-gradient(135deg, ${selected.atmosphere.primaryColor}08 0%, ${selected.atmosphere.secondaryColor}05 100%)`,
              border: `1px solid ${selected.atmosphere.primaryColor}25`,
              borderRadius: '24px',
              marginBottom: '4rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 400,
                    color: selected.atmosphere.primaryColor,
                    marginBottom: '0.75rem',
                  }}
                >
                  {selected.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '1rem',
                    color: 'var(--text-65)',
                    lineHeight: 1.7,
                    maxWidth: '500px',
                  }}
                >
                  {selected.description}
                </p>
              </div>

              {/* Atmosphere preview */}
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${selected.atmosphere.primaryColor}30 0%, ${selected.atmosphere.secondaryColor}20 100%)`,
                  boxShadow: `0 0 40px ${selected.atmosphere.primaryColor}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '2.5rem',
                    fontWeight: 300,
                    color: selected.atmosphere.primaryColor,
                    opacity: 0.8,
                  }}
                >
                  {selected.sleepStage}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dream Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            background: 'var(--glass-03)',
            border: '1px solid var(--text-08)',
            borderRadius: '24px',
            padding: '3rem',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: 400,
                color: 'var(--text-90)',
                marginBottom: '0.75rem',
              }}
            >
              Ready to descend?
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '1rem',
                color: 'var(--text-55)',
                lineHeight: 1.6,
              }}
            >
              The Archive has shown you its nature. Will you share your dreams?
            </p>
          </div>

          {/* Embedded Dream Input */}
          <DreamInput embedded />
        </motion.div>
      </div>
    </section>
  );
}

export default RoomsPreviewSection;
