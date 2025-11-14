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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="relative p-8 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500"
            style={{
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
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
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
                className="absolute rounded-full pointer-events-none"
                style={{
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
              className="text-xs font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: `rgb(${card.color})` }}
            >
              {card.label}
            </div>

            {/* Card title */}
            <h3
              className="text-2xl font-medium mb-3 leading-tight"
              style={{ color: 'rgba(255, 255, 255, 0.95)' }}
            >
              {card.title}
            </h3>

            {/* Card description */}
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              {card.description}
            </p>

            {/* Metric */}
            <div
              className="inline-block px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
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
                className="absolute inset-0 rounded-2xl opacity-50 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(${card.color}, 0.1) 0%, transparent 70%)`,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
