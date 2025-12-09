'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  contrast: string;
  use: string;
}

interface InteractiveSwatchPickerProps {
  colors: ColorSwatch[];
  defaultSelectedId?: string;
}

export function InteractiveSwatchPicker({
  colors,
  defaultSelectedId,
}: InteractiveSwatchPickerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    defaultSelectedId || (colors.length > 0 ? colors[0].id : null)
  );

  const selectedColor = colors.find((c) => c.id === selectedId);

  return (
    <div>
      {/* Swatch Row */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {colors.map((color) => {
          const isSelected = color.id === selectedId;
          return (
            <motion.button
              key={color.id}
              onClick={() => setSelectedId(color.id)}
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                backgroundColor: color.hex,
                border: isSelected
                  ? '3px solid var(--text-90)'
                  : '2px solid var(--border-primary)',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: isSelected
                  ? `0 4px 20px rgba(${color.rgb}, 0.4)`
                  : `0 2px 10px rgba(${color.rgb}, 0.2)`,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 6px 24px rgba(${color.rgb}, 0.5)`,
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isSelected ? 1.05 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
            >
              {isSelected && (
                <motion.div
                  layoutId="swatch-indicator"
                  style={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: 18,
                    border: '2px solid var(--text-30)',
                    pointerEvents: 'none',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Color Details */}
      <AnimatePresence mode="wait">
        {selectedColor && (
          <motion.div
            key={selectedColor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 14,
              background: 'var(--glass-03)',
              border: '1px solid var(--border-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Color Preview */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: selectedColor.hex,
                boxShadow: `0 4px 16px rgba(${selectedColor.rgb}, 0.3)`,
                flexShrink: 0,
              }}
            />

            {/* Color Info */}
            <div style={{ flex: 1, minWidth: 150 }}>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: selectedColor.hex,
                  margin: 0,
                  marginBottom: '0.25rem',
                }}
              >
                {selectedColor.name}
              </h4>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  fontSize: '0.8rem',
                  color: 'var(--text-50)',
                }}
              >
                <span style={{ fontFamily: 'monospace' }}>{selectedColor.hex}</span>
                <span>WCAG: {selectedColor.contrast}</span>
              </div>
            </div>

            {/* Use Case */}
            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-60)',
                maxWidth: 280,
                lineHeight: 1.5,
              }}
            >
              {selectedColor.use}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Typography item with hover-to-reveal specs
interface TypographyItemProps {
  name: string;
  sample: string;
  size: string;
  weight: number;
}

export function InteractiveTypography({ items }: { items: TypographyItemProps[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: 14,
        background: 'var(--glass-03)',
        border: '1px solid var(--border-primary)',
      }}
    >
      {items.map((type, i) => (
        <motion.div
          key={i}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            padding: '0.6rem 0.5rem',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            cursor: 'default',
            background: hoveredIndex === i ? 'var(--glass-05)' : 'transparent',
            transition: 'background 0.2s ease',
            marginBottom: i < items.length - 1 ? '0.25rem' : 0,
          }}
        >
          <span
            style={{
              fontSize: type.size,
              fontWeight: type.weight,
              color: 'var(--text-90)',
            }}
          >
            {type.sample}
          </span>

          <AnimatePresence>
            {hoveredIndex === i && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-40)',
                  fontFamily: 'monospace',
                  padding: '0.25rem 0.5rem',
                  background: 'var(--glass-08)',
                  borderRadius: 6,
                }}
              >
                {type.name}: {type.size}, {type.weight}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
