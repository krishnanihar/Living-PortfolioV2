'use client';

import React from 'react';
import { useMetamorphic } from './MetamorphicContext';

/**
 * NarrativeProgressIndicator - Scroll Position UI
 *
 * Fixed right-side indicator showing:
 * - Current act (1, 2, 3)
 * - Visual progress through narrative
 * - Click-to-scroll navigation
 */

const ACTS = [
  { id: 1, label: 'The Approach', section: 'act-one' },
  { id: 2, label: 'The Dissolution', section: 'act-two' },
  { id: 3, label: 'The Integration', section: 'act-three' },
] as const;

export function NarrativeProgressIndicator() {
  const { currentAct, scrollProgress, atmosphereColor, scrollToSection, isMobile, prefersReducedMotion } = useMetamorphic();

  // Hide on mobile
  if (isMobile) {
    return null;
  }

  return (
    <nav
      aria-label="Narrative progress"
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {/* Progress line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '12px',
          bottom: '12px',
          width: '2px',
          background: 'var(--glass-10)',
          transform: 'translateX(-50%)',
          borderRadius: '1px',
        }}
      >
        {/* Active progress */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: `${scrollProgress * 100}%`,
            background: `rgb(${atmosphereColor.primary})`,
            borderRadius: '1px',
            transition: prefersReducedMotion ? 'none' : 'height 0.3s ease, background 1s ease',
          }}
        />
      </div>

      {/* Act markers */}
      {ACTS.map((act) => {
        const isActive = currentAct === act.id;
        const isPast = currentAct > act.id;

        return (
          <button
            key={act.id}
            onClick={() => scrollToSection(act.section)}
            aria-label={`Navigate to ${act.label}`}
            aria-current={isActive ? 'step' : undefined}
            style={{
              position: 'relative',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: isActive
                ? `rgba(${atmosphereColor.primary}, 0.2)`
                : isPast
                  ? 'var(--glass-10)'
                  : 'var(--glass-05)',
              border: isActive
                ? `2px solid rgb(${atmosphereColor.primary})`
                : '1px solid var(--glass-15)',
              cursor: 'pointer',
              transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: act.id === 1 ? 0 : '2rem',
            }}
          >
            {/* Inner dot */}
            <div
              style={{
                width: isActive ? '8px' : '4px',
                height: isActive ? '8px' : '4px',
                borderRadius: '50%',
                background: isActive
                  ? `rgb(${atmosphereColor.primary})`
                  : isPast
                    ? 'var(--text-40)'
                    : 'var(--text-20)',
                transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
              }}
            />

            {/* Tooltip on hover */}
            <span
              style={{
                position: 'absolute',
                right: '100%',
                marginRight: '12px',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                background: 'var(--glass-10)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-15)',
                color: 'var(--text-70)',
                fontSize: '0.75rem',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.2s ease',
              }}
              className="act-tooltip"
            >
              {act.label}
            </span>
          </button>
        );
      })}

      {/* Tooltip hover styles */}
      <style jsx>{`
        button:hover .act-tooltip {
          opacity: 1;
        }
      `}</style>
    </nav>
  );
}

/**
 * NarrativeProgressBar - Mobile Bottom Progress
 *
 * Simple horizontal progress bar for mobile devices
 */
export function NarrativeProgressBar() {
  const { scrollProgress, atmosphereColor, isMobile, prefersReducedMotion } = useMetamorphic();

  // Only show on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <div
      aria-label="Reading progress"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'var(--glass-05)',
        zIndex: 40,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress * 100}%`,
          background: `rgb(${atmosphereColor.primary})`,
          transition: prefersReducedMotion ? 'none' : 'width 0.1s linear, background 1s ease',
        }}
      />
    </div>
  );
}

export default NarrativeProgressIndicator;
