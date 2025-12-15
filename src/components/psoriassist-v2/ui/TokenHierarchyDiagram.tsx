'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Token data for healthcare context
const globalTokens = [
  { id: 'calm-blue', name: 'calm-blue-500', hex: '#4A90E2', label: 'COLOR' },
  { id: 'healing-green', name: 'healing-green-400', hex: '#50C878', label: 'COLOR' },
];

const semanticToken = {
  id: 'text-emphasis',
  name: 'text-emphasis-high',
  reference: '{calm-blue-500}',
  hex: '#4A90E2',
};

const componentToken = {
  id: 'button-bg',
  name: 'button-primary-bg-default',
  reference: '{healing-green}',
  hex: '#50C878',
};

// Pill-shaped node component
function TokenNode({
  name,
  value,
  hex,
  label,
  tier,
  isHighlighted,
  onClick,
}: {
  name: string;
  value?: string;
  hex?: string;
  label?: string;
  tier: 'global' | 'semantic' | 'component';
  isHighlighted?: boolean;
  onClick?: () => void;
}) {
  // Use CSS variables for theme-aware colors
  const bgColor = tier === 'global'
    ? 'var(--glass-08)'
    : 'var(--glass-95)';
  const textColor = tier === 'global' ? 'var(--text-80)' : 'var(--text-90)';
  const subtextColor = tier === 'global' ? 'var(--text-50)' : 'var(--text-50)';

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      style={{
        background: bgColor,
        borderRadius: 12,
        padding: '0.75rem 1rem',
        cursor: onClick ? 'pointer' : 'default',
        border: isHighlighted ? '2px solid #4A90E2' : '1px solid var(--border-primary)',
        boxShadow: isHighlighted
          ? '0 0 20px rgba(74, 144, 226, 0.3)'
          : '0 2px 8px var(--glass-10)',
        transition: 'all 0.2s ease',
        minWidth: 140,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        {hex && (
          <span style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: hex,
            border: '1px solid rgba(0,0,0,0.1)',
            flexShrink: 0,
          }} />
        )}
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: textColor,
          fontFamily: 'monospace',
        }}>
          {name}
        </span>
      </div>
      {value && (
        <div style={{
          fontSize: '0.65rem',
          color: subtextColor,
          fontFamily: 'monospace',
        }}>
          {value}
        </div>
      )}
      {label && (
        <div style={{
          fontSize: '0.6rem',
          color: subtextColor,
          marginTop: '0.25rem',
          textAlign: 'right',
        }}>
          ({label})
        </div>
      )}
    </motion.div>
  );
}

// Sample UI component
function SampleUICard() {
  return (
    <div style={{
      background: 'var(--glass-95)',
      borderRadius: 12,
      padding: '1rem',
      width: 180,
      border: '1px solid var(--border-primary)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem',
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-90)' }}>
          PASI Score
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-40)' }}>⋮</span>
      </div>
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--text-50)',
        marginBottom: '0.75rem',
      }}>
        Track your skin condition
      </div>
      <button style={{
        background: '#50C878',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        padding: '0.5rem 1rem',
        fontSize: '0.7rem',
        fontWeight: 600,
        cursor: 'pointer',
        width: '100%',
      }}>
        Start Scan
      </button>
    </div>
  );
}

export function TokenHierarchyDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Remove once: true so it can re-check when parent becomes visible
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [highlightedPath, setHighlightedPath] = useState<string | null>(null);

  return (
    <div ref={containerRef}>
      {/* Hint */}
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--text-40)',
        marginBottom: '0.75rem',
      }}>
        Hover nodes to trace token references
      </div>

      {/* Main diagram container */}
      <div style={{
        background: 'var(--glass-15)',
        borderRadius: 16,
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 380,
        border: '1px solid var(--border-primary)',
      }}>
        {/* Dotted grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--text-15) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }} />

        {/* SVG for connecting lines */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {/* Line from UI Card to Semantic Token */}
          <motion.path
            d="M 195 120 C 280 120, 280 80, 380 80"
            stroke={highlightedPath === 'semantic' ? '#4A90E2' : 'var(--text-20)'}
            strokeWidth={highlightedPath === 'semantic' ? 2 : 1}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Line from Semantic to Global (calm-blue) */}
          <motion.path
            d="M 560 80 L 680 80"
            stroke={highlightedPath === 'semantic' ? '#4A90E2' : 'var(--text-20)'}
            strokeWidth={highlightedPath === 'semantic' ? 2 : 1}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />

          {/* Arrow head for semantic */}
          <motion.polygon
            points="675,76 685,80 675,84"
            fill={highlightedPath === 'semantic' ? '#4A90E2' : 'var(--text-20)'}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2, delay: 1 }}
          />

          {/* Line from UI Card to Component Token */}
          <motion.path
            d="M 195 180 C 280 180, 280 220, 380 220"
            stroke={highlightedPath === 'component' ? '#50C878' : 'var(--text-20)'}
            strokeWidth={highlightedPath === 'component' ? 2 : 1}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* Line from Component to Global (healing-green) */}
          <motion.path
            d="M 595 220 L 680 180"
            stroke={highlightedPath === 'component' ? '#50C878' : 'var(--text-20)'}
            strokeWidth={highlightedPath === 'component' ? 2 : 1}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />

          {/* Arrow head for component */}
          <motion.polygon
            points="675,176 685,180 675,184"
            fill={highlightedPath === 'component' ? '#50C878' : 'var(--text-20)'}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2, delay: 1.2 }}
          />
        </svg>

        {/* Content layer */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '2rem',
          }}>
            {/* Left: Sample UI */}
            <div>
              <SampleUICard />
            </div>

            {/* Middle: Semantic & Component Tokens */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingTop: '0.5rem' }}>
              {/* Semantic Token */}
              <div
                onMouseEnter={() => setHighlightedPath('semantic')}
                onMouseLeave={() => setHighlightedPath(null)}
              >
                <div style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-50)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}>
                  <span style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1px solid var(--text-30)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6rem',
                  }}>2</span>
                  SEMANTIC TOKENS
                </div>
                <TokenNode
                  name={semanticToken.name}
                  value={semanticToken.reference}
                  hex={semanticToken.hex}
                  tier="semantic"
                  isHighlighted={highlightedPath === 'semantic'}
                />
              </div>

              {/* Component Token */}
              <div
                onMouseEnter={() => setHighlightedPath('component')}
                onMouseLeave={() => setHighlightedPath(null)}
              >
                <div style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-50)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}>
                  <span style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1px solid var(--text-30)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6rem',
                  }}>3</span>
                  COMPONENT SPECIFIC TOKEN
                </div>
                <TokenNode
                  name={componentToken.name}
                  value={componentToken.reference}
                  hex={componentToken.hex}
                  tier="component"
                  isHighlighted={highlightedPath === 'component'}
                />
              </div>
            </div>

            {/* Right: Global Tokens */}
            <div>
              <div style={{
                fontSize: '0.65rem',
                color: 'var(--text-50)',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}>
                <span style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: '1px solid var(--text-30)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                }}>1</span>
                GLOBAL TOKENS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {globalTokens.map((token) => (
                  <TokenNode
                    key={token.id}
                    name={token.name}
                    value={token.hex}
                    hex={token.hex}
                    label={token.label}
                    tier="global"
                    isHighlighted={
                      (highlightedPath === 'semantic' && token.id === 'calm-blue') ||
                      (highlightedPath === 'component' && token.id === 'healing-green')
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
