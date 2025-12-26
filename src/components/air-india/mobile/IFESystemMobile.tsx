'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TouchHighlight } from './shared';

interface IFESystemMobileProps {
  brandColor: string;
  blurDataURL: string;
}

const badges = [
  { icon: '🎯', value: '44px', label: 'Touch Target', description: 'Minimum touch target size for accessibility' },
  { icon: '🔆', value: 'Auto', label: 'Brightness', description: 'Automatic brightness adjustment for cabin lighting' },
  { icon: '♿', value: 'WCAG AA', label: 'Accessible', description: 'Meets WCAG AA accessibility standards' },
  { icon: '🌍', value: '12', label: 'Languages', description: 'Supports 12 international languages' },
];

/**
 * IFESystemMobile - Mobile-optimized IFE System showcase
 * Features pinch-zoom image and tap-to-reveal badge details
 */
export function IFESystemMobile({ brandColor, blurDataURL }: IFESystemMobileProps) {
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

  return (
    <div style={{ width: '100%' }}>
      {/* IFE Image with rounded corners */}
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--glass-15)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        marginBottom: '16px',
        position: 'relative',
      }}>
        <Image
          src="/images/air-india/IFE.png"
          alt="Passenger using Air India In-Flight Entertainment system"
          width={900}
          height={600}
          placeholder="blur"
          blurDataURL={blurDataURL}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            touchAction: 'manipulation',
          }}
        />
      </div>

      {/* Design Constraint Badges - Tappable */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        marginBottom: '16px',
      }}>
        {badges.map((badge, index) => (
          <TouchHighlight
            key={badge.label}
            onTap={() => setSelectedBadge(selectedBadge === index ? null : index)}
            style={{
              padding: '14px 12px',
              borderRadius: '12px',
              background: selectedBadge === index ? `rgba(${brandColor}, 0.12)` : 'var(--glass-06)',
              border: selectedBadge === index
                ? `1px solid rgba(${brandColor}, 0.4)`
                : '1px solid var(--glass-15)',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ fontSize: '20px', marginBottom: '6px' }}>{badge.icon}</div>
            <div style={{
              fontSize: '15px',
              fontWeight: '700',
              color: `rgb(${brandColor})`,
              marginBottom: '2px',
            }}>
              {badge.value}
            </div>
            <div style={{
              fontSize: '10px',
              color: 'var(--text-50)',
              fontWeight: '500',
            }}>
              {badge.label}
            </div>
          </TouchHighlight>
        ))}
      </div>

      {/* Badge Description Tooltip */}
      <AnimatePresence>
        {selectedBadge !== null && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'var(--glass-08)',
              border: '1px solid var(--glass-15)',
              marginBottom: '16px',
            }}
          >
            <div style={{
              fontSize: '12px',
              color: 'var(--text-80)',
              lineHeight: 1.5,
            }}>
              <span style={{
                fontWeight: '600',
                color: `rgb(${brandColor})`,
                marginRight: '6px',
              }}>
                {badges[selectedBadge].label}:
              </span>
              {badges[selectedBadge].description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learn More Link */}
      <div style={{ textAlign: 'center' }}>
        <a
          href="https://www.airindia.com/in/en/experience/in-air/whats-on-my-ai/inflight-entertainment.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: `rgb(${brandColor})`,
            textDecoration: 'none',
            padding: '12px 20px',
            borderRadius: '24px',
            background: `rgba(${brandColor}, 0.1)`,
            border: `1px solid rgba(${brandColor}, 0.25)`,
            fontWeight: '500',
            minHeight: '44px',
          }}
        >
          Learn more about Air India IFE
          <span style={{ fontSize: '14px' }}>→</span>
        </a>
      </div>
    </div>
  );
}

export default IFESystemMobile;
