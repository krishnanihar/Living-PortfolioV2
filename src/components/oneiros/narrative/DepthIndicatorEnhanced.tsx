'use client';

import React from 'react';
import type { SleepStage, NarrativeAct } from '@/hooks/useDepthProgress';

interface DepthIndicatorEnhancedProps {
  sleepStage: SleepStage;
  act: NarrativeAct;
  progress: number;
  roomName?: string;
  primaryColor?: string;
}

// Sleep stage display info
const STAGE_INFO: Record<SleepStage, { name: string; shortName: string; icon: string }> = {
  wake: { name: 'Waking', shortName: 'W', icon: '○' },
  n1: { name: 'Light Sleep', shortName: 'N1', icon: '◐' },
  n2: { name: 'Sleep Spindles', shortName: 'N2', icon: '◑' },
  n3: { name: 'Deep Sleep', shortName: 'N3', icon: '●' },
  rem: { name: 'REM Dreams', shortName: 'REM', icon: '◉' },
};

// Progress through stages for visualization
const STAGE_ORDER: SleepStage[] = ['wake', 'n1', 'n2', 'n3', 'rem'];

/**
 * Enhanced Depth Indicator
 * Shows current sleep stage with visual progression
 */
export function DepthIndicatorEnhanced({
  sleepStage,
  act,
  progress,
  roomName,
  primaryColor = '#8B5CF6',
}: DepthIndicatorEnhancedProps) {
  const stageInfo = STAGE_INFO[sleepStage];
  const currentStageIndex = STAGE_ORDER.indexOf(sleepStage);

  return (
    <div
      style={{
        position: 'fixed',
        left: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        pointerEvents: 'none',
      }}
    >
      {/* Vertical stage progression */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '1rem 0.75rem',
          background: 'rgba(10, 10, 10, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
        }}
      >
        {STAGE_ORDER.map((stage, index) => {
          const info = STAGE_INFO[stage];
          const isActive = stage === sleepStage;
          const isPast = index < currentStageIndex;
          const isFuture = index > currentStageIndex;

          return (
            <div
              key={stage}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              {/* Stage dot */}
              <div
                style={{
                  width: isActive ? '14px' : '10px',
                  height: isActive ? '14px' : '10px',
                  borderRadius: '50%',
                  background: isActive
                    ? primaryColor
                    : isPast
                    ? `${primaryColor}60`
                    : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: isActive
                    ? `0 0 12px ${primaryColor}80`
                    : 'none',
                  transition: 'all 0.3s ease',
                }}
              />

              {/* Stage label (only for active) */}
              {isActive && (
                <span
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: '500',
                    color: primaryColor,
                    fontFamily: 'var(--font-space-grotesk)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {info.shortName}
                </span>
              )}

              {/* Connecting line (except last) */}
              {index < STAGE_ORDER.length - 1 && (
                <div
                  style={{
                    width: '2px',
                    height: '16px',
                    background: isPast
                      ? `${primaryColor}40`
                      : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current stage info */}
      <div
        style={{
          padding: '0.75rem 1rem',
          background: 'rgba(10, 10, 10, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '120px',
        }}
      >
        {/* Stage name */}
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: '600',
            color: primaryColor,
            fontFamily: 'var(--font-space-grotesk)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.25rem',
          }}
        >
          {stageInfo.name}
        </div>

        {/* Room name if provided */}
        {roomName && (
          <div
            style={{
              fontSize: '0.65rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'var(--font-dm-sans)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {roomName}
          </div>
        )}

        {/* Progress bar */}
        <div
          style={{
            marginTop: '0.5rem',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)`,
              borderRadius: '2px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DepthIndicatorEnhanced;
