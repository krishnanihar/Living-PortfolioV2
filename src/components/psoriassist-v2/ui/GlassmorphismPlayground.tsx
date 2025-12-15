'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Glass presets
const glassPresets = [
  {
    id: 'subtle',
    name: 'Subtle',
    blur: 8,
    opacity: 2,
    saturation: 120,
    useCase: 'Subtle overlays on photos',
  },
  {
    id: 'card',
    name: 'Card',
    blur: 16,
    opacity: 5,
    saturation: 150,
    useCase: 'Content cards, panels',
  },
  {
    id: 'navigation',
    name: 'Navigation',
    blur: 20,
    opacity: 8,
    saturation: 180,
    useCase: 'Nav bars, toolbars',
  },
  {
    id: 'modal',
    name: 'Modal',
    blur: 24,
    opacity: 10,
    saturation: 150,
    useCase: 'Modal backgrounds',
  },
  {
    id: 'hero',
    name: 'Hero',
    blur: 40,
    opacity: 15,
    saturation: 200,
    useCase: 'Hero sections, overlays',
  },
];

// Background options
const backgrounds = [
  {
    id: 'gradient',
    name: 'Gradient',
    style: 'linear-gradient(135deg, #4A90E2 0%, #9B8BB8 50%, #E74C3C 100%)',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    style: 'linear-gradient(135deg, #4A90E2 0%, #50C878 50%, #2DD4BF 100%)',
  },
  {
    id: 'warm',
    name: 'Warm',
    style: 'linear-gradient(135deg, #FFB84D 0%, #E74C3C 50%, #9B8BB8 100%)',
  },
  {
    id: 'dark',
    name: 'Dark',
    style: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #3D3D5C 100%)',
  },
];

export function GlassmorphismPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Remove once: true so it can re-check when parent becomes visible
  const isInView = useInView(containerRef, { amount: 0.2 });

  // Glass settings
  const [blur, setBlur] = useState(20);
  const [opacity, setOpacity] = useState(8);
  const [saturation, setSaturation] = useState(150);
  const [backgroundId, setBackgroundId] = useState('gradient');
  const [copied, setCopied] = useState(false);

  const currentBackground = backgrounds.find(b => b.id === backgroundId) || backgrounds[0];

  const applyPreset = (preset: typeof glassPresets[0]) => {
    setBlur(preset.blur);
    setOpacity(preset.opacity);
    setSaturation(preset.saturation);
  };

  const handleCopyCSS = async () => {
    const css = `backdrop-filter: blur(${blur}px) saturate(${saturation}%);
background: rgba(255, 255, 255, ${opacity / 100});
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);`;

    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
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
        Adjust sliders to customize glass effect · Click presets for quick configs
      </div>

      {/* Main container */}
      <div style={{
        background: 'var(--glass-03)',
        borderRadius: 16,
        padding: '1.5rem',
        border: '1px solid var(--border-primary)',
      }}>
        {/* Preview area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{}}
          transition={{ duration: 0.4 }}
          style={{
            position: 'relative',
            height: 220,
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: '1.5rem',
          }}
        >
          {/* Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: currentBackground.style,
          }}>
            {/* Decorative shapes */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '15%',
              right: '15%',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '25%',
              width: 40,
              height: 40,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.25)',
              transform: 'rotate(45deg)',
            }} />
          </div>

          {/* Glass card */}
          <motion.div
            layout
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 280,
              padding: '1.5rem',
              borderRadius: 16,
              background: `rgba(255, 255, 255, ${opacity / 100})`,
              backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
              WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.8)',
              marginBottom: '0.5rem',
            }}>
              Glass Card Preview
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: 'rgba(0, 0, 0, 0.6)',
              lineHeight: 1.5,
              marginBottom: '0.75rem',
            }}>
              Adjust the sliders below to customize blur, opacity, and saturation in real-time.
            </div>
            <div style={{
              fontSize: '0.65rem',
              fontFamily: 'monospace',
              color: 'rgba(0, 0, 0, 0.5)',
            }}>
              blur: {blur}px · opacity: {opacity}% · saturation: {saturation}%
            </div>
          </motion.div>
        </motion.div>

        {/* Background selector */}
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'var(--text-50)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Background
        </div>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.25rem',
        }}>
          {backgrounds.map((bg) => (
            <motion.button
              key={bg.id}
              onClick={() => setBackgroundId(bg.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: bg.style,
                border: backgroundId === bg.id ? '2px solid var(--text-60)' : '1px solid var(--border-primary)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Sliders */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}>
          {/* Blur slider */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.35rem',
            }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-60)' }}>Blur</span>
              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--text-50)' }}>{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              style={{
                width: '100%',
                height: 6,
                borderRadius: 3,
                background: 'var(--glass-15)',
                appearance: 'none',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Opacity slider */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.35rem',
            }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-60)' }}>Opacity</span>
              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--text-50)' }}>{opacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              style={{
                width: '100%',
                height: 6,
                borderRadius: 3,
                background: 'var(--glass-15)',
                appearance: 'none',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Saturation slider */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.35rem',
            }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-60)' }}>Saturation</span>
              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--text-50)' }}>{saturation}%</span>
            </div>
            <input
              type="range"
              min="100"
              max="250"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              style={{
                width: '100%',
                height: 6,
                borderRadius: 3,
                background: 'var(--glass-15)',
                appearance: 'none',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        {/* Presets */}
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'var(--text-50)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Presets
        </div>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
        }}>
          {glassPresets.map((preset) => {
            const isActive = blur === preset.blur && opacity === preset.opacity && saturation === preset.saturation;

            return (
              <motion.button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: 8,
                  border: isActive ? '1px solid var(--text-40)' : '1px solid var(--border-primary)',
                  background: isActive ? 'var(--glass-15)' : 'var(--glass-05)',
                  fontSize: '0.7rem',
                  color: isActive ? 'var(--text-80)' : 'var(--text-50)',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {preset.name}
              </motion.button>
            );
          })}
        </div>

        {/* CSS output */}
        <div style={{
          background: 'var(--glass-08)',
          borderRadius: 8,
          padding: '0.75rem 1rem',
          position: 'relative',
        }}>
          <div style={{
            fontSize: '0.65rem',
            fontFamily: 'monospace',
            color: 'var(--text-50)',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}>
{`backdrop-filter: blur(${blur}px) saturate(${saturation}%);
background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);`}
          </div>

          {/* Copy button */}
          <motion.button
            onClick={handleCopyCSS}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              padding: '0.3rem 0.6rem',
              borderRadius: 4,
              border: '1px solid var(--border-primary)',
              background: 'var(--glass-10)',
              fontSize: '0.6rem',
              color: 'var(--text-60)',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {copied ? 'Copied!' : 'Copy CSS'}
          </motion.button>
        </div>

        {/* Healthcare note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: 8,
            background: 'rgba(74, 144, 226, 0.08)',
            border: '1px solid rgba(74, 144, 226, 0.2)',
          }}
        >
          <div style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#4A90E2',
            marginBottom: '0.25rem',
          }}>
            Accessibility Note
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--text-60)',
            lineHeight: 1.5,
          }}>
            When using glass effects over variable backgrounds, ensure text maintains WCAG AA contrast (4.5:1).
            PsoriAssist uses higher opacity values (8-15%) for critical UI elements.
          </div>
        </motion.div>
      </div>

      {/* Custom slider styles */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #4A90E2;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #4A90E2;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
