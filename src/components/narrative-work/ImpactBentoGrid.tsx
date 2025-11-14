'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ImpactCard {
  id: number;
  label: string;
  title: string;
  description: string;
  metric: string;
  color: string; // RGB format
}

interface ImpactBentoGridProps {
  cards: ImpactCard[];
  inView: boolean;
}

/**
 * Bento-style grid showing impact areas
 * Extracted from AirIndiaWork for reuse
 */
export function ImpactBentoGrid({ cards, inView }: ImpactBentoGridProps) {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
  const [ripplePosition, setRipplePosition] = React.useState<{ x: number; y: number } | null>(null);

  return (
    <>
      <style jsx>{`
        @media (min-width: 768px) {
          .impact-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .impact-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
      <div className="impact-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
        gap: '1.5rem',
      }}>
        {cards.map((card, index) => {
          const isHovered = hoveredCard === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => {
                setHoveredCard(null);
                setRipplePosition(null);
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setRipplePosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              style={{
                position: 'relative',
                padding: '2rem',
                borderRadius: '1rem',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 500ms ease',
                background: isHovered
                  ? `linear-gradient(135deg, rgba(${card.color}, 0.08), rgba(255, 255, 255, 0.02))`
                  : 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(40px) saturate(120%)',
                WebkitBackdropFilter: 'blur(40px) saturate(120%)',
                border: `1px solid ${isHovered ? `rgba(${card.color}, 0.3)` : 'rgba(255, 255, 255, 0.06)'}`,
                transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: isHovered
                  ? `0 20px 40px rgba(${card.color}, 0.15)`
                  : '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Shimmer border on hover */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    borderRadius: '1rem',
                    pointerEvents: 'none',
                    padding: '1px',
                    background: `linear-gradient(135deg, rgba(${card.color}, 0.6), rgba(${card.color}, 0.2), rgba(${card.color}, 0.6))`,
                    backgroundSize: '200% 200%',
                    animation: 'borderShimmer 3s ease-in-out infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
              )}

              {/* Ripple effect */}
              {ripplePosition && hoveredCard === card.id && (
                <div
                  style={{
                    position: 'absolute',
                    borderRadius: '9999px',
                    pointerEvents: 'none',
                    left: ripplePosition.x,
                    top: ripplePosition.y,
                    width: '0px',
                    height: '0px',
                    background: `radial-gradient(circle, rgba(${card.color}, 0.4), transparent)`,
                    animation: 'ripple 0.6s ease-out',
                  }}
                />
              )}

              {/* Card label */}
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '300',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  color: `rgb(${card.color})`,
                }}
              >
                {card.label}
              </div>

              {/* Card title */}
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '500',
                  marginBottom: '0.75rem',
                  lineHeight: '1.25',
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                {card.title}
              </h3>

              {/* Card description */}
              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: '1.625',
                  marginBottom: '1rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                {card.description}
              </p>

              {/* Metric */}
              <div
                style={{
                  display: 'inline-block',
                  paddingLeft: '0.75rem',
                  paddingRight: '0.75rem',
                  paddingTop: '0.375rem',
                  paddingBottom: '0.375rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  background: `rgba(${card.color}, 0.1)`,
                  color: `rgb(${card.color})`,
                  border: `1px solid rgba(${card.color}, 0.2)`,
                }}
              >
                {card.metric}
              </div>

              {/* Hover glow effect */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    borderRadius: '1rem',
                    opacity: 0.5,
                    pointerEvents: 'none',
                    transition: 'opacity 500ms ease',
                    background: `radial-gradient(circle at 50% 50%, rgba(${card.color}, 0.1) 0%, transparent 70%)`,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
