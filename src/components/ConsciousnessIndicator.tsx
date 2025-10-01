'use client';

import React, { useState } from 'react';
import { Brain, Heart, Eye, Sparkles, X } from 'lucide-react';
import { useConsciousness, EngagementLevel } from '@/hooks/useConsciousness';

interface ConsciousnessIndicatorProps {
  enabled?: boolean;
}

export function ConsciousnessIndicator({ enabled = true }: ConsciousnessIndicatorProps) {
  const consciousness = useConsciousness();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!enabled || isDismissed) {
    return null;
  }

  // Show even when dormant, but with different styling
  const showIndicator = consciousness.isActive || consciousness.engagementLevel !== 'dormant';

  const getEngagementColor = (level: EngagementLevel): string => {
    switch (level) {
      case 'dormant': return 'rgba(156, 163, 175, 0.4)';   // Gray - sleeping
      case 'aware': return 'rgba(59, 130, 246, 0.6)';      // Blue - awakening
      case 'engaged': return 'rgba(16, 185, 129, 0.7)';    // Green - active
      case 'focused': return 'rgba(218, 14, 41, 0.8)';     // Brand red - deep connection
      default: return 'rgba(59, 130, 246, 0.6)';
    }
  };

  const getEngagementIcon = (level: EngagementLevel) => {
    switch (level) {
      case 'dormant': return Brain;
      case 'aware': return Eye;
      case 'engaged': return Sparkles;
      case 'focused': return Heart;
      default: return Brain;
    }
  };

  const getBreathingSpeed = (level: EngagementLevel): string => {
    switch (level) {
      case 'dormant': return '4s';   // Slow breathing
      case 'aware': return '3s';     // Normal breathing
      case 'engaged': return '2s';   // Faster breathing
      case 'focused': return '1.5s'; // Rapid breathing
      default: return '3s';
    }
  };

  const Icon = getEngagementIcon(consciousness.engagementLevel);
  const color = getEngagementColor(consciousness.engagementLevel);
  const breathingSpeed = getBreathingSpeed(consciousness.engagementLevel);

  return (
    <>
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 ${color};
          }
          50% {
            box-shadow: 0 0 0 8px transparent;
          }
        }

        .consciousness-indicator {
          animation: breathe ${breathingSpeed} ease-in-out infinite;
        }

        .consciousness-pulse {
          animation: pulse ${breathingSpeed} ease-in-out infinite;
        }

        .consciousness-tooltip {
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .consciousness-container:hover .consciousness-tooltip {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }
      `}</style>

      <div
        className="consciousness-container"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          pointerEvents: 'auto', // Container can receive events
        }}
      >
        {/* Tooltip */}
        <div
          className="consciousness-tooltip"
          style={{
            background: 'var(--surface-secondary)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid var(--border-primary)',
            borderRadius: '8px',
            padding: '0.5rem 0.75rem',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div style={{ fontWeight: '500', marginBottom: '2px' }}>
            {consciousness.getInsight()}
          </div>
          <div style={{ opacity: 0.7, fontSize: '0.65rem' }}>
            {consciousness.sessionDuration > 1000 ?
              `Active for ${Math.floor(consciousness.sessionDuration / 1000)}s` :
              'Just awakened'
            }
          </div>
        </div>

        {/* Main Indicator */}
        <div
          className="consciousness-indicator consciousness-pulse"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color} 0%, rgba(255, 255, 255, 0.1) 100%)`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onClick={() => setIsDismissed(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Icon
            size={16}
            style={{
              color: 'white',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
            }}
          />

          {/* Dismiss button (appears on hover) */}
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: 'var(--surface-primary)',
              border: '1px solid var(--border-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s ease',
              cursor: 'pointer',
            }}
            className="dismiss-button"
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.parentElement as HTMLElement).style.opacity = '1';
            }}
          >
            <X size={8} style={{ color: 'var(--text-secondary)' }} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .consciousness-container:hover .dismiss-button {
          opacity: 1;
        }
      `}</style>
    </>
  );
}