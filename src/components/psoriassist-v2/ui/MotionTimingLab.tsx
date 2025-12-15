'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Easing presets from globals.css
const easingPresets = [
  {
    id: 'linear',
    name: 'Linear',
    token: '--ease-linear',
    value: 'linear',
    bezier: [0, 0, 1, 1],
    useCase: 'Progress bars, loading indicators',
    healthcareExample: 'Treatment progress',
  },
  {
    id: 'ease-in',
    name: 'Ease In',
    token: '--ease-in',
    value: 'cubic-bezier(0.4, 0, 1, 1)',
    bezier: [0.4, 0, 1, 1],
    useCase: 'Exit animations',
    healthcareExample: 'Dismissing alerts',
  },
  {
    id: 'ease-out',
    name: 'Ease Out',
    token: '--ease-out',
    value: 'cubic-bezier(0, 0, 0.2, 1)',
    bezier: [0, 0, 0.2, 1],
    useCase: 'Entry animations',
    healthcareExample: 'Cards appearing',
  },
  {
    id: 'ease-in-out',
    name: 'Ease In-Out',
    token: '--ease-in-out',
    value: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bezier: [0.4, 0, 0.2, 1],
    useCase: 'State transitions',
    healthcareExample: 'Tab switching',
  },
  {
    id: 'premium',
    name: 'Premium',
    token: '--ease-premium',
    value: 'cubic-bezier(0.22, 1, 0.36, 1)',
    bezier: [0.22, 1, 0.36, 1],
    useCase: 'High-impact moments',
    healthcareExample: 'Streak celebrations',
  },
  {
    id: 'bounce',
    name: 'Bounce',
    token: '--ease-bounce',
    value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bezier: [0.68, -0.55, 0.265, 1.55],
    useCase: 'Playful feedback',
    healthcareExample: 'Achievement badges',
  },
];

// Duration presets
const durationPresets = [
  { id: 'fast', name: 'Fast', value: 150, token: '--duration-fast' },
  { id: 'base', name: 'Base', value: 200, token: '--duration-base' },
  { id: 'slow', name: 'Slow', value: 300, token: '--duration-slow' },
  { id: 'slower', name: 'Slower', value: 500, token: '--duration-slower' },
];

// Generate SVG path for bezier curve
function generateBezierPath(bezier: number[]): string {
  const width = 200;
  const height = 150;
  const padding = 20;

  const x1 = padding + bezier[0] * (width - 2 * padding);
  const y1 = height - padding - bezier[1] * (height - 2 * padding);
  const x2 = padding + bezier[2] * (width - 2 * padding);
  const y2 = height - padding - bezier[3] * (height - 2 * padding);

  return `M ${padding} ${height - padding} C ${x1} ${y1}, ${x2} ${y2}, ${width - padding} ${padding}`;
}

export function MotionTimingLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Remove once: true so it can re-check when parent becomes visible
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [selectedEasing, setSelectedEasing] = useState<string>('premium');
  const [selectedDuration, setSelectedDuration] = useState<number>(300);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const currentEasing = easingPresets.find(e => e.id === selectedEasing) || easingPresets[4];

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), selectedDuration + 100);
  };

  const handleCopy = async (token: string) => {
    try {
      await navigator.clipboard.writeText(`var(${token})`);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div ref={containerRef}>
      {/* Hint */}
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--text-40)',
        marginBottom: '0.75rem',
      }}>
        Click &quot;Play&quot; to see animation · Select easing and duration
      </div>

      {/* Main container */}
      <div style={{
        background: 'var(--glass-03)',
        borderRadius: 16,
        padding: '1.5rem',
        border: '1px solid var(--border-primary)',
      }}>
        {/* Top section: Curve + Ball animation */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}>
          {/* Bezier curve visualization */}
          <div style={{
            flex: '0 0 auto',
          }}>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--text-50)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Easing Curve
            </div>
            <motion.svg
              width={200}
              height={150}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'var(--glass-05)',
                borderRadius: 12,
                border: '1px solid var(--border-primary)',
              }}
            >
              {/* Grid lines */}
              <line x1="20" y1="130" x2="180" y2="130" stroke="var(--text-15)" strokeWidth="1" />
              <line x1="20" y1="20" x2="20" y2="130" stroke="var(--text-15)" strokeWidth="1" />

              {/* Bezier curve */}
              <motion.path
                d={generateBezierPath(currentEasing.bezier)}
                stroke="#4A90E2"
                strokeWidth={2}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
                key={currentEasing.id}
              />

              {/* Control points */}
              <circle cx={20 + currentEasing.bezier[0] * 160} cy={130 - currentEasing.bezier[1] * 110} r="4" fill="#50C878" />
              <circle cx={20 + currentEasing.bezier[2] * 160} cy={130 - currentEasing.bezier[3] * 110} r="4" fill="#E74C3C" />

              {/* Labels */}
              <text x="20" y="145" fontSize="8" fill="var(--text-40)">0</text>
              <text x="175" y="145" fontSize="8" fill="var(--text-40)">1</text>
              <text x="5" y="135" fontSize="8" fill="var(--text-40)">0</text>
              <text x="5" y="25" fontSize="8" fill="var(--text-40)">1</text>
            </motion.svg>
          </div>

          {/* Ball animation track */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--text-50)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Live Preview
            </div>
            <div style={{
              background: 'var(--glass-05)',
              borderRadius: 12,
              padding: '1rem',
              border: '1px solid var(--border-primary)',
              height: 150,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              {/* Track */}
              <div style={{
                position: 'relative',
                height: 40,
                background: 'var(--glass-08)',
                borderRadius: 20,
                marginBottom: '1rem',
              }}>
                {/* Ball */}
                <motion.div
                  animate={{
                    x: isPlaying ? 'calc(100% - 32px)' : 0,
                  }}
                  transition={{
                    duration: selectedDuration / 1000,
                    ease: currentEasing.bezier as [number, number, number, number],
                  }}
                  style={{
                    position: 'absolute',
                    left: 4,
                    top: 4,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4A90E2, #2DD4BF)',
                    boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
                  }}
                />
              </div>

              {/* Play button */}
              <motion.button
                onClick={handlePlay}
                disabled={isPlaying}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: isPlaying ? 'var(--glass-10)' : 'linear-gradient(135deg, #4A90E2, #2DD4BF)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.5rem 1.5rem',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: isPlaying ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{isPlaying ? '●' : '▶'}</span>
                {isPlaying ? 'Playing...' : 'Play Animation'}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Easing presets */}
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'var(--text-50)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Easing Presets
        </div>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
        }}>
          {easingPresets.map((easing) => (
            <motion.button
              key={easing.id}
              onClick={() => setSelectedEasing(easing.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 8,
                border: selectedEasing === easing.id ? '1px solid var(--text-40)' : '1px solid var(--border-primary)',
                background: selectedEasing === easing.id ? 'var(--glass-15)' : 'var(--glass-05)',
                fontSize: '0.7rem',
                color: selectedEasing === easing.id ? 'var(--text-80)' : 'var(--text-50)',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              {easing.name}
            </motion.button>
          ))}
        </div>

        {/* Duration slider */}
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'var(--text-50)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Duration: {selectedDuration}ms
        </div>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
        }}>
          {durationPresets.map((duration) => (
            <motion.button
              key={duration.id}
              onClick={() => setSelectedDuration(duration.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.35rem 0.6rem',
                borderRadius: 6,
                border: selectedDuration === duration.value ? '1px solid var(--text-40)' : '1px solid var(--border-primary)',
                background: selectedDuration === duration.value ? 'var(--glass-15)' : 'var(--glass-03)',
                fontSize: '0.65rem',
                color: selectedDuration === duration.value ? 'var(--text-80)' : 'var(--text-50)',
                cursor: 'pointer',
              }}
            >
              {duration.name} ({duration.value}ms)
            </motion.button>
          ))}
        </div>

        {/* Selected easing details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEasing.id}
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
              {/* Token info */}
              <div>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-80)',
                  marginBottom: '0.25rem',
                }}>
                  {currentEasing.name}
                </div>
                <div
                  onClick={() => handleCopy(currentEasing.token)}
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    color: 'var(--text-50)',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {currentEasing.token}
                  <AnimatePresence>
                    {copiedToken === currentEasing.token && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                          fontSize: '0.6rem',
                          fontWeight: 600,
                          color: 'var(--text-90)',
                          background: 'var(--glass-20)',
                          padding: '0.1rem 0.3rem',
                          borderRadius: 3,
                        }}
                      >
                        COPIED
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-40)',
                }}>
                  {currentEasing.useCase}
                </div>
              </div>

              {/* Healthcare example */}
              <div style={{
                background: 'rgba(74, 144, 226, 0.08)',
                border: '1px solid rgba(74, 144, 226, 0.2)',
                borderRadius: 8,
                padding: '0.75rem 1rem',
              }}>
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: '#4A90E2',
                  marginBottom: '0.25rem',
                }}>
                  In PsoriAssist
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-60)',
                }}>
                  {currentEasing.healthcareExample}
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
            }}>
              transition-timing-function: {currentEasing.value};
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
