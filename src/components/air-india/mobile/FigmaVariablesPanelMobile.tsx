'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TouchHighlight } from './shared';

interface FigmaVariablesPanelMobileProps {
  brandColor: string;
}

// Figma-style colors
const FIGMA = {
  bg: '#2C2C2C',
  bgSecondary: '#383838',
  bgInput: '#1E1E1E',
  border: 'rgba(255, 255, 255, 0.1)',
  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  textPrimary: 'rgba(255, 255, 255, 0.9)',
  textSecondary: 'rgba(255, 255, 255, 0.66)',
  textMuted: 'rgba(255, 255, 255, 0.4)',
  brand: '#A259FF',
  success: '#30D158',
};

type CascadePhase = 'idle' | 'playing' | 'complete';

// Simplified token data for mobile
const tokenCategories = [
  {
    id: 'colors',
    name: 'Colors',
    icon: '●',
    tokens: [
      { name: 'brand/primary', light: '#DA0E29', dark: '#FF4D6A' },
      { name: 'brand/secondary', light: '#0D99FF', dark: '#3DB4FF' },
      { name: 'text/primary', light: '#1A1A1A', dark: '#FFFFFF' },
      { name: 'text/secondary', light: '#666666', dark: '#A0A0A0' },
      { name: 'surface/primary', light: '#FFFFFF', dark: '#1A1A1A' },
    ],
  },
  {
    id: 'spacing',
    name: 'Spacing',
    icon: '⊞',
    tokens: [
      { name: 'spacing/xs', light: '4px', dark: '4px' },
      { name: 'spacing/sm', light: '8px', dark: '8px' },
      { name: 'spacing/md', light: '16px', dark: '16px' },
      { name: 'spacing/lg', light: '24px', dark: '24px' },
      { name: 'spacing/xl', light: '32px', dark: '32px' },
    ],
  },
  {
    id: 'typography',
    name: 'Typography',
    icon: 'Aa',
    tokens: [
      { name: 'font/size/xs', light: '12px', dark: '12px' },
      { name: 'font/size/sm', light: '14px', dark: '14px' },
      { name: 'font/size/md', light: '16px', dark: '16px' },
      { name: 'font/size/lg', light: '20px', dark: '20px' },
      { name: 'font/weight/bold', light: '700', dark: '700' },
    ],
  },
  {
    id: 'effects',
    name: 'Effects',
    icon: '◐',
    tokens: [
      { name: 'radius/sm', light: '4px', dark: '4px' },
      { name: 'radius/md', light: '8px', dark: '8px' },
      { name: 'radius/lg', light: '16px', dark: '16px' },
      { name: 'shadow/sm', light: '0 1px 2px', dark: '0 1px 2px' },
      { name: 'shadow/md', light: '0 4px 12px', dark: '0 4px 12px' },
    ],
  },
];

const collections = [
  { id: 'primitives', name: 'Primitives', count: 45 },
  { id: 'semantic', name: 'Semantic', count: 32 },
  { id: 'components', name: 'Components', count: 18 },
];

/**
 * FigmaVariablesPanelMobile - Mobile-optimized Figma Variables panel
 * Features dropdown collection selector, horizontal tabs, and tap interactions
 */
export function FigmaVariablesPanelMobile({ brandColor }: FigmaVariablesPanelMobileProps) {
  const [selectedCollection, setSelectedCollection] = useState(collections[0]);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(tokenCategories[0].id);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [cascadePhase, setCascadePhase] = useState<CascadePhase>('idle');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const playCascadeAnimation = useCallback(() => {
    if (cascadePhase === 'playing') return;

    setCascadePhase('playing');

    // Highlight tokens one by one
    const tokens = tokenCategories.find((c) => c.id === activeCategory)?.tokens || [];
    tokens.forEach((_, index) => {
      setTimeout(() => {
        setHighlightedIndex(index);
      }, index * 300);
    });

    // Complete animation
    setTimeout(() => {
      setHighlightedIndex(null);
      setCascadePhase('complete');
      setHasPlayed(true);
    }, tokens.length * 300 + 500);

    // Reset to idle
    setTimeout(() => {
      setCascadePhase('idle');
    }, tokens.length * 300 + 2000);
  }, [cascadePhase, activeCategory]);

  const currentCategory = tokenCategories.find((c) => c.id === activeCategory);
  const isColorToken = (value: string) => value.startsWith('#') || value.startsWith('rgb');

  return (
    <div style={{
      width: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      background: FIGMA.bg,
      border: `1px solid ${FIGMA.border}`,
    }}>
      {/* Header */}
      <div style={{
        background: FIGMA.bgInput,
        padding: '12px 14px',
        borderBottom: `1px solid ${FIGMA.border}`,
      }}>
        {/* Title Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              background: FIGMA.brand,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '12px', color: 'white', fontWeight: 700 }}>V</span>
            </div>
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: FIGMA.textPrimary,
            }}>
              Local Variables
            </span>
            {cascadePhase === 'complete' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ fontSize: '12px', color: FIGMA.success }}
              >
                ✓
              </motion.span>
            )}
          </div>

          {/* Play Demo Button */}
          <TouchHighlight
            onTap={playCascadeAnimation}
            disabled={cascadePhase === 'playing'}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              background: cascadePhase === 'playing' ? FIGMA.bgSecondary : 'rgba(99,102,241,0.9)',
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {cascadePhase === 'playing' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderTopColor: 'white',
                }}
              />
            ) : (
              <span style={{ fontSize: '10px', color: 'white' }}>▶</span>
            )}
            <span style={{ fontSize: '11px', color: 'white', fontWeight: 500 }}>
              {cascadePhase === 'playing' ? 'Playing' : hasPlayed ? 'Replay' : 'Demo'}
            </span>
          </TouchHighlight>
        </div>

        {/* Collection Dropdown */}
        <div style={{ position: 'relative' }}>
          <TouchHighlight
            onTap={() => setIsCollectionOpen(!isCollectionOpen)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              background: FIGMA.bgSecondary,
              border: `1px solid ${FIGMA.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: '44px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: FIGMA.textMuted }}>Collection:</span>
              <span style={{ fontSize: '12px', color: FIGMA.textPrimary, fontWeight: 500 }}>
                {selectedCollection.name}
              </span>
              <span style={{
                fontSize: '10px',
                color: FIGMA.textMuted,
                background: FIGMA.bgInput,
                padding: '2px 6px',
                borderRadius: '4px',
              }}>
                {selectedCollection.count}
              </span>
            </div>
            <motion.span
              animate={{ rotate: isCollectionOpen ? 180 : 0 }}
              style={{ fontSize: '10px', color: FIGMA.textMuted }}
            >
              ▼
            </motion.span>
          </TouchHighlight>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isCollectionOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  background: FIGMA.bgSecondary,
                  border: `1px solid ${FIGMA.border}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  zIndex: 10,
                }}
              >
                {collections.map((collection) => (
                  <TouchHighlight
                    key={collection.id}
                    onTap={() => {
                      setSelectedCollection(collection);
                      setIsCollectionOpen(false);
                    }}
                    highlightColor={FIGMA.brand + '20'}
                    style={{
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: `1px solid ${FIGMA.borderSubtle}`,
                      background: selectedCollection.id === collection.id ? FIGMA.brand + '15' : 'transparent',
                      minHeight: '44px',
                    }}
                  >
                    <span style={{
                      fontSize: '12px',
                      color: selectedCollection.id === collection.id ? FIGMA.brand : FIGMA.textPrimary,
                      fontWeight: selectedCollection.id === collection.id ? 600 : 400,
                    }}>
                      {collection.name}
                    </span>
                    <span style={{ fontSize: '10px', color: FIGMA.textMuted }}>
                      {collection.count}
                    </span>
                  </TouchHighlight>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Tabs - Horizontal Scroll */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '12px 14px',
        borderBottom: `1px solid ${FIGMA.border}`,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        {tokenCategories.map((category) => (
          <TouchHighlight
            key={category.id}
            onTap={() => setActiveCategory(category.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: activeCategory === category.id ? FIGMA.brand + '20' : FIGMA.bgSecondary,
              border: `1px solid ${activeCategory === category.id ? FIGMA.brand + '50' : FIGMA.border}`,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{
              fontSize: category.icon.length > 1 ? '10px' : '12px',
              color: activeCategory === category.id ? FIGMA.brand : FIGMA.textMuted,
            }}>
              {category.icon}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              color: activeCategory === category.id ? FIGMA.brand : FIGMA.textSecondary,
            }}>
              {category.name}
            </span>
          </TouchHighlight>
        ))}
      </div>

      {/* Token List */}
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 70px 70px',
          padding: '10px 14px',
          borderBottom: `1px solid ${FIGMA.border}`,
          background: FIGMA.bgInput,
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}>
          <span style={{ fontSize: '10px', fontWeight: 500, color: FIGMA.textMuted }}>Name</span>
          <span style={{ fontSize: '10px', fontWeight: 500, color: FIGMA.textMuted, textAlign: 'center' }}>Light</span>
          <span style={{ fontSize: '10px', fontWeight: 500, color: FIGMA.textMuted, textAlign: 'center' }}>Dark</span>
        </div>

        {/* Token Rows */}
        {currentCategory?.tokens.map((token, index) => (
          <TouchHighlight
            key={token.name}
            onTap={() => setSelectedToken(selectedToken === token.name ? null : token.name)}
            highlightColor={FIGMA.brand + '15'}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 70px 70px',
              padding: '12px 14px',
              borderBottom: `1px solid ${FIGMA.borderSubtle}`,
              background: highlightedIndex === index
                ? FIGMA.brand + '20'
                : selectedToken === token.name
                ? FIGMA.bgSecondary
                : 'transparent',
              minHeight: '52px',
              alignItems: 'center',
              transition: 'background 0.15s ease',
            }}
          >
            {/* Token Name */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                fontSize: '11px',
                color: FIGMA.textSecondary,
                fontFamily: 'SF Mono, Monaco, monospace',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {token.name}
              </div>
              {selectedToken === token.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    fontSize: '9px',
                    color: FIGMA.textMuted,
                    marginTop: '4px',
                  }}
                >
                  Tap to copy path
                </motion.div>
              )}
            </div>

            {/* Light Value */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isColorToken(token.light) ? (
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: token.light,
                  border: '1px solid rgba(0,0,0,0.15)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }} />
              ) : (
                <span style={{
                  fontSize: '11px',
                  color: FIGMA.textSecondary,
                  fontFamily: 'SF Mono, Monaco, monospace',
                }}>
                  {token.light}
                </span>
              )}
            </div>

            {/* Dark Value */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isColorToken(token.dark) ? (
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: token.dark,
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
              ) : (
                <span style={{
                  fontSize: '11px',
                  color: FIGMA.textSecondary,
                  fontFamily: 'SF Mono, Monaco, monospace',
                }}>
                  {token.dark}
                </span>
              )}
            </div>
          </TouchHighlight>
        ))}
      </div>

      {/* Footer Stats */}
      <div style={{
        padding: '12px 14px',
        borderTop: `1px solid ${FIGMA.border}`,
        background: FIGMA.bgInput,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '10px', color: FIGMA.textMuted }}>
            {currentCategory?.tokens.length || 0} tokens
          </span>
          <span style={{
            fontSize: '10px',
            color: `rgb(${brandColor})`,
            fontWeight: 500,
          }}>
            4 Airlines • 100+ Screens
          </span>
        </div>
        {cascadePhase === 'complete' && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: '10px',
              color: FIGMA.success,
              fontWeight: 500,
            }}
          >
            ✓ System Synced
          </motion.span>
        )}
      </div>
    </div>
  );
}

export default FigmaVariablesPanelMobile;
