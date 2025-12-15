'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useCycle } from 'framer-motion';

// Radius scale from globals.css
const radiusScale = [
  { id: 'none', token: '--radius-none', value: '0', px: 0, label: 'Sharp', spectrum: 'Clinical' },
  { id: 'sm', token: '--radius-sm', value: '0.125rem', px: 2, label: 'Subtle', spectrum: 'Clinical' },
  { id: 'base', token: '--radius-base', value: '0.25rem', px: 4, label: 'Default', spectrum: 'Balanced' },
  { id: 'md', token: '--radius-md', value: '0.375rem', px: 6, label: 'Medium', spectrum: 'Balanced' },
  { id: 'lg', token: '--radius-lg', value: '0.5rem', px: 8, label: 'Large', spectrum: 'Friendly' },
  { id: 'xl', token: '--radius-xl', value: '0.75rem', px: 12, label: 'X-Large', spectrum: 'Friendly' },
  { id: '2xl', token: '--radius-2xl', value: '1rem', px: 16, label: '2X-Large', spectrum: 'Calming' },
  { id: '3xl', token: '--radius-3xl', value: '1.5rem', px: 24, label: '3X-Large', spectrum: 'Calming' },
  { id: 'full', token: '--radius-full', value: '9999px', px: 9999, label: 'Full', spectrum: 'Human' },
];

// Component examples for each radius
const componentExamples = [
  { radius: 'none', component: 'Data Table', icon: '▤' },
  { radius: 'sm', component: 'Form Input', icon: '▭' },
  { radius: 'md', component: 'Badge', icon: '◖◗' },
  { radius: 'lg', component: 'Button', icon: '▢' },
  { radius: 'xl', component: 'Card', icon: '▣' },
  { radius: '2xl', component: 'Modal', icon: '◰' },
  { radius: 'full', component: 'Avatar', icon: '●' },
];

interface RadiusShowcaseProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function RadiusShowcase({
  autoPlay = true,
  autoPlayInterval = 2500,
}: RadiusShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Remove once: true so it can re-check when parent becomes visible
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [selectedId, setSelectedId] = useState<string>('lg');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [autoPlayIndex, setAutoPlayIndex] = useState(4); // Start at 'lg'

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || hasInteracted || !isInView) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setAutoPlayIndex((prev) => {
          const next = (prev + 1) % radiusScale.length;
          setSelectedId(radiusScale[next].id);
          return next;
        });
      }, autoPlayInterval);
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, hasInteracted, autoPlayInterval, isInView]);

  const handleSelect = (id: string) => {
    setHasInteracted(true);
    setSelectedId(id);
  };

  const handleCopy = async (token: string) => {
    setHasInteracted(true);
    try {
      await navigator.clipboard.writeText(`var(${token})`);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const selectedRadius = radiusScale.find(r => r.id === selectedId) || radiusScale[4];
  const borderRadiusValue = selectedRadius.id === 'full' ? '50%' : `${selectedRadius.px}px`;

  return (
    <div ref={containerRef}>
      {/* Hint */}
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--text-40)',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: hasInteracted ? 'var(--text-30)' : '#50C878',
          animation: hasInteracted ? 'none' : 'pulse 2s infinite',
        }} />
        {hasInteracted ? 'Click swatches to morph shape' : 'Auto-morphing · Click to control'}
      </div>

      {/* Main container */}
      <div style={{
        background: 'var(--glass-03)',
        borderRadius: 16,
        padding: '1.5rem',
        border: '1px solid var(--border-primary)',
      }}>
        {/* Radius swatches */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {radiusScale.map((radius, index) => {
            const isSelected = selectedId === radius.id;
            const swatchRadius = radius.id === 'full' ? '50%' : Math.min(radius.px, 16);

            return (
              <motion.button
                key={radius.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{}}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                onClick={() => handleSelect(radius.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: swatchRadius,
                  border: isSelected ? '2px solid var(--text-60)' : '1px solid var(--border-primary)',
                  background: isSelected ? 'var(--glass-20)' : 'var(--glass-08)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  fontFamily: 'monospace',
                  color: isSelected ? 'var(--text-80)' : 'var(--text-50)',
                  position: 'relative',
                }}
              >
                {radius.px === 9999 ? '∞' : radius.px}

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="radius-indicator"
                    style={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: typeof swatchRadius === 'string' ? swatchRadius : swatchRadius + 4,
                      border: '2px solid var(--text-30)',
                      pointerEvents: 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Morphing shape preview */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}>
          <motion.div
            layout
            onClick={() => handleCopy(selectedRadius.token)}
            style={{
              width: 180,
              height: 120,
              background: 'var(--glass-15)',
              border: '1px solid var(--border-primary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            animate={{ borderRadius: borderRadiusValue }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-70)',
              marginBottom: '0.25rem',
            }}>
              {selectedRadius.label}
            </span>
            <span style={{
              fontSize: '0.65rem',
              fontFamily: 'monospace',
              color: 'var(--text-40)',
            }}>
              {selectedRadius.token}
            </span>
            <span style={{
              fontSize: '0.6rem',
              color: 'var(--text-30)',
              marginTop: '0.25rem',
            }}>
              Click to copy
            </span>

            {/* Copied indicator */}
            <AnimatePresence>
              {copiedToken === selectedRadius.token && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    color: 'var(--text-90)',
                    background: 'var(--glass-30)',
                    padding: '0.15rem 0.4rem',
                    borderRadius: 4,
                  }}
                >
                  COPIED
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Spectrum indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}>
          <div style={{
            background: 'var(--glass-05)',
            borderRadius: 8,
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <span style={{
              fontSize: '0.65rem',
              color: 'var(--text-40)',
            }}>
              Spectrum:
            </span>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: selectedRadius.spectrum === 'Clinical' ? '#E74C3C' :
                     selectedRadius.spectrum === 'Balanced' ? '#FFB84D' :
                     selectedRadius.spectrum === 'Friendly' ? '#4A90E2' :
                     selectedRadius.spectrum === 'Calming' ? '#9B8BB8' : '#50C878',
              background: selectedRadius.spectrum === 'Clinical' ? 'rgba(231, 76, 60, 0.1)' :
                         selectedRadius.spectrum === 'Balanced' ? 'rgba(255, 184, 77, 0.1)' :
                         selectedRadius.spectrum === 'Friendly' ? 'rgba(74, 144, 226, 0.1)' :
                         selectedRadius.spectrum === 'Calming' ? 'rgba(155, 139, 184, 0.1)' : 'rgba(80, 200, 120, 0.1)',
              padding: '0.2rem 0.5rem',
              borderRadius: 4,
            }}>
              {selectedRadius.spectrum}
            </span>
          </div>
        </div>

        {/* Component examples */}
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'var(--text-50)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Real Examples
        </div>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}>
          {componentExamples.map((example) => {
            const radius = radiusScale.find(r => r.id === example.radius);
            const exampleRadius = radius?.id === 'full' ? '50%' : `${Math.min(radius?.px || 0, 12)}px`;
            const isActive = example.radius === selectedId;

            return (
              <motion.div
                key={example.radius}
                onClick={() => handleSelect(example.radius)}
                whileHover={{ scale: 1.05 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: isActive ? 'var(--glass-15)' : 'var(--glass-05)',
                  borderRadius: exampleRadius,
                  border: isActive ? '1px solid var(--text-30)' : '1px solid var(--border-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: '0.85rem' }}>{example.icon}</span>
                <span style={{
                  fontSize: '0.7rem',
                  color: isActive ? 'var(--text-80)' : 'var(--text-60)',
                }}>
                  {example.component}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Healthcare context */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
          transition={{ duration: 0.4, delay: 0.6 }}
          style={{
            marginTop: '1.25rem',
            padding: '0.75rem 1rem',
            borderRadius: 8,
            background: 'rgba(155, 139, 184, 0.08)',
            border: '1px solid rgba(155, 139, 184, 0.2)',
          }}
        >
          <div style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#9B8BB8',
            marginBottom: '0.25rem',
          }}>
            Healthcare Design Psychology
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--text-60)',
            lineHeight: 1.5,
          }}>
            PsoriAssist uses softer radii (lg-2xl) for patient-facing elements to reduce clinical anxiety,
            while sharper corners are reserved for data-heavy screens like PASI score tables.
          </div>
        </motion.div>
      </div>

      {/* Pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
