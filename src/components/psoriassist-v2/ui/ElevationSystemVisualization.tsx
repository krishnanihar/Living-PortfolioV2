'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Elevation levels with healthcare context
const elevationLevels = [
  {
    id: 'none',
    name: 'Flat',
    token: '--shadow-none',
    shadow: 'none',
    zOffset: 0,
    useCase: 'Base surface',
    healthcareExample: 'Background panels',
  },
  {
    id: 'sm',
    name: 'Subtle',
    token: '--shadow-sm',
    shadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    zOffset: 4,
    useCase: 'Input fields',
    healthcareExample: 'PASI score input',
  },
  {
    id: 'base',
    name: 'Default',
    token: '--shadow-base',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    zOffset: 8,
    useCase: 'Cards, buttons',
    healthcareExample: 'Medication cards',
  },
  {
    id: 'md',
    name: 'Elevated',
    token: '--shadow-md',
    shadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    zOffset: 12,
    useCase: 'Dropdown menus',
    healthcareExample: 'Treatment options',
  },
  {
    id: 'lg',
    name: 'High',
    token: '--shadow-lg',
    shadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    zOffset: 20,
    useCase: 'Modals, popovers',
    healthcareExample: 'Photo capture modal',
  },
  {
    id: 'xl',
    name: 'Highest',
    token: '--shadow-xl',
    shadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    zOffset: 28,
    useCase: 'Critical dialogs',
    healthcareExample: 'Flare-up alert',
  },
  {
    id: '2xl',
    name: 'Epic',
    token: '--shadow-2xl',
    shadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    zOffset: 36,
    useCase: 'Full overlays',
    healthcareExample: 'Onboarding wizard',
  },
];

export function ElevationSystemVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Remove once: true so it can re-check when parent becomes visible
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>('base');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = async (token: string) => {
    try {
      await navigator.clipboard.writeText(`var(${token})`);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const selectedLevel = elevationLevels.find(l => l.id === selectedId) || elevationLevels[2];

  return (
    <div ref={containerRef}>
      {/* Hint */}
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--text-40)',
        marginBottom: '0.75rem',
      }}>
        Hover cards to see elevation lift · Click to select
      </div>

      {/* Main container */}
      <div style={{
        background: 'var(--glass-03)',
        borderRadius: 16,
        padding: '1.5rem',
        border: '1px solid var(--border-primary)',
      }}>
        {/* Stacked cards visualization */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: 280,
          position: 'relative',
          marginBottom: '1.5rem',
        }}>
          {/* Background surface indicator */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '10%',
            right: '10%',
            height: 8,
            background: 'var(--glass-10)',
            borderRadius: '4px 4px 0 0',
          }} />

          {/* Elevation cards */}
          {elevationLevels.map((level, index) => {
            const isHovered = hoveredId === level.id;
            const isSelected = selectedId === level.id;
            const cardWidth = 100 - index * 8;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: isHovered ? -level.zOffset - 10 : -level.zOffset,
                  scale: isSelected ? 1.02 : 1,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  y: { duration: 0.2 },
                }}
                onMouseEnter={() => setHoveredId(level.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  setSelectedId(level.id);
                  handleCopy(level.token);
                }}
                style={{
                  position: 'absolute',
                  bottom: 40 + level.zOffset,
                  width: `${cardWidth}%`,
                  height: 60,
                  background: 'var(--glass-95)',
                  borderRadius: 12,
                  boxShadow: level.shadow,
                  border: isSelected ? '2px solid var(--text-40)' : '1px solid var(--border-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 1rem',
                  transition: 'border 0.2s ease',
                }}
              >
                {/* Level name */}
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-80)',
                }}>
                  {level.name}
                </span>

                {/* Token badge */}
                <span style={{
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  color: 'var(--text-50)',
                  background: 'var(--glass-10)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 4,
                }}>
                  {level.token}
                </span>

                {/* Copied indicator */}
                <AnimatePresence>
                  {copiedToken === level.token && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        position: 'absolute',
                        right: -8,
                        top: -8,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        color: 'var(--text-90)',
                        background: 'var(--glass-80)',
                        padding: '0.15rem 0.4rem',
                        borderRadius: 4,
                      }}
                    >
                      COPIED
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Selected level details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLevel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'var(--glass-05)',
              borderRadius: 12,
              padding: '1rem 1.25rem',
              border: '1px solid var(--border-primary)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              {/* Left: Token info */}
              <div>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-80)',
                  marginBottom: '0.25rem',
                }}>
                  {selectedLevel.name} Elevation
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  color: 'var(--text-50)',
                  marginBottom: '0.5rem',
                }}>
                  {selectedLevel.token}
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-40)',
                  maxWidth: 220,
                }}>
                  Use case: {selectedLevel.useCase}
                </div>
              </div>

              {/* Right: Healthcare example */}
              <div style={{
                background: 'rgba(80, 200, 120, 0.08)',
                border: '1px solid rgba(80, 200, 120, 0.2)',
                borderRadius: 8,
                padding: '0.75rem 1rem',
              }}>
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: '#50C878',
                  marginBottom: '0.25rem',
                }}>
                  In PsoriAssist
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-60)',
                }}>
                  {selectedLevel.healthcareExample}
                </div>
              </div>
            </div>

            {/* CSS value */}
            <div style={{
              marginTop: '0.75rem',
              padding: '0.5rem 0.75rem',
              background: 'var(--glass-08)',
              borderRadius: 6,
              fontSize: '0.65rem',
              fontFamily: 'monospace',
              color: 'var(--text-50)',
              overflowX: 'auto',
            }}>
              box-shadow: {selectedLevel.shadow || 'none'};
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick select buttons */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem',
          flexWrap: 'wrap',
        }}>
          {elevationLevels.map((level) => (
            <motion.button
              key={level.id}
              onClick={() => setSelectedId(level.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 6,
                border: selectedId === level.id ? '1px solid var(--text-40)' : '1px solid var(--border-primary)',
                background: selectedId === level.id ? 'var(--glass-15)' : 'var(--glass-03)',
                fontSize: '0.65rem',
                color: selectedId === level.id ? 'var(--text-80)' : 'var(--text-50)',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              {level.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
