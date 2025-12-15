'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useCycle } from 'framer-motion';

// Primary colors - always visible, full height
const primaryColors = [
  { id: '01', name: 'CALM BLUE', hex: '#4A90E2', darkText: false },
  { id: '02', name: 'PURE WHITE', hex: '#FFFFFF', darkText: true },
  { id: '03', name: 'DEEP NIGHT', hex: '#1A1A2E', darkText: false },
];

// Accent colors - revealed on expand
const accentColors = [
  { id: '04', name: 'SUCCESS GREEN', hex: '#50C878', darkText: true },
  { id: '05', name: 'HEALING LAVENDER', hex: '#9B8BB8', darkText: false },
  { id: '06', name: 'WARNING AMBER', hex: '#FFB84D', darkText: true },
  { id: '07', name: 'ALERT RED', hex: '#E74C3C', darkText: false },
  { id: '08', name: 'TRUST TEAL', hex: '#2DD4BF', darkText: true },
  { id: '09', name: 'SOFT CORAL', hex: '#FF8A80', darkText: true },
];

interface TransformingColorPaletteProps {
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function TransformingColorPalette({
  className,
  autoPlay = true,
  autoPlayInterval = 3000,
}: TransformingColorPaletteProps) {
  // Use Framer Motion's useCycle for toggling states
  const [isExpanded, cycleExpanded] = useCycle(false, true);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Store cycle function in ref to avoid stale closures
  const cycleRef = useRef(cycleExpanded);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Always keep cycleRef updated
  useEffect(() => {
    cycleRef.current = cycleExpanded;
  });

  // Auto-transform effect
  useEffect(() => {
    if (!autoPlay || hasInteracted) {
      // Cleanup if conditions change
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Delay before starting auto-play
    timeoutRef.current = setTimeout(() => {
      // First cycle
      cycleRef.current();

      // Then continue cycling
      intervalRef.current = setInterval(() => {
        cycleRef.current();
      }, autoPlayInterval);
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, hasInteracted, autoPlayInterval]);

  const handleCopy = useCallback(async (hex: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHasInteracted(true);
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const toggleExpand = () => {
    setHasInteracted(true);
    cycleExpanded();
  };

  return (
    <div className={className} ref={containerRef}>
      {/* Instruction hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-40)',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: hasInteracted ? 'var(--text-30)' : '#50C878',
          animation: hasInteracted ? 'none' : 'pulse 2s infinite',
        }} />
        {hasInteracted
          ? (isExpanded ? 'Click to collapse' : 'Click to expand')
          : 'Auto-playing · Click to take control'
        }
      </motion.div>

      {/* Main container */}
      <motion.div
        layout
        onClick={toggleExpand}
        style={{
          display: 'flex',
          borderRadius: 16,
          overflow: 'hidden',
          cursor: 'pointer',
          height: isExpanded ? 420 : 320,
          background: 'var(--glass-03)',
          border: '1px solid var(--border-primary)',
        }}
        transition={{
          layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        {/* Accent colors column - only visible when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '30%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {accentColors.map((color, index) => (
                <motion.div
                  key={color.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={(e) => handleCopy(color.hex, e)}
                  style={{
                    flex: 1,
                    background: color.hex,
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  whileHover={{
                    filter: 'brightness(1.1)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: color.darkText ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
                    marginBottom: '0.15rem',
                  }}>
                    {color.id}
                  </span>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    color: color.darkText ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)',
                  }}>
                    {color.name}
                  </span>
                  <span style={{
                    fontSize: '0.6rem',
                    fontFamily: 'monospace',
                    color: color.darkText ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
                    marginTop: '0.1rem',
                  }}>
                    {color.hex}
                  </span>

                  {/* Copied indicator */}
                  <AnimatePresence>
                    {copiedHex === color.hex && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '0.6rem',
                          fontWeight: 600,
                          color: color.darkText ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
                          background: color.darkText ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                          padding: '0.2rem 0.4rem',
                          borderRadius: 4,
                        }}
                      >
                        COPIED
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary colors - always visible */}
        {primaryColors.map((color, index) => (
          <motion.div
            key={color.id}
            layout
            onClick={(e) => handleCopy(color.hex, e)}
            style={{
              flex: 1,
              background: color.hex,
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              cursor: 'pointer',
            }}
            whileHover={{
              filter: 'brightness(1.05)',
              transition: { duration: 0.2 }
            }}
            transition={{
              layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: color.darkText ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
              marginBottom: '0.25rem',
            }}>
              {color.id}
            </span>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: color.darkText ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)',
            }}>
              {color.name}
            </span>
            <span style={{
              fontSize: '0.7rem',
              fontFamily: 'monospace',
              color: color.darkText ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
              marginTop: '0.25rem',
            }}>
              {color.hex}
            </span>

            {/* Copied indicator */}
            <AnimatePresence>
              {copiedHex === color.hex && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: color.darkText ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
                    background: color.darkText ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 4,
                  }}
                >
                  COPIED
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand indicator on first card */}
            {index === 0 && !isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
                +6 more
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Color meaning legend - appears when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              marginTop: '1rem',
              padding: '1rem',
              borderRadius: 12,
              background: 'var(--glass-03)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--text-50)',
              marginBottom: '0.75rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Healthcare Color Psychology
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-60)',
            }}>
              <div><strong style={{ color: '#4A90E2' }}>Calm Blue</strong> — Reduces anxiety, builds trust</div>
              <div><strong style={{ color: '#50C878' }}>Success Green</strong> — Progress, healing, growth</div>
              <div><strong style={{ color: '#9B8BB8' }}>Healing Lavender</strong> — Soothing, restful</div>
              <div><strong style={{ color: '#FFB84D' }}>Warning Amber</strong> — Attention without alarm</div>
              <div><strong style={{ color: '#E74C3C' }}>Alert Red</strong> — Urgent actions only</div>
              <div><strong style={{ color: '#2DD4BF' }}>Trust Teal</strong> — Medical credibility</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
