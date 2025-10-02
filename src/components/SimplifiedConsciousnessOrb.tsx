'use client';

import React, { useState } from 'react';
import { Brain, Eye, Sparkles, Heart } from 'lucide-react';
import { useConsciousness, EngagementLevel } from '@/hooks/useConsciousness';

interface SimplifiedConsciousnessOrbProps {
  onChatOpen?: () => void;
}

export function SimplifiedConsciousnessOrb({ onChatOpen }: SimplifiedConsciousnessOrbProps) {
  const consciousness = useConsciousness();
  const [isHovered, setIsHovered] = useState(false);

  const getEngagementColor = (level: EngagementLevel): string => {
    switch (level) {
      case 'dormant': return 'rgba(156, 163, 175, 0.5)';   // Gray
      case 'aware': return 'rgba(59, 130, 246, 0.7)';      // Blue
      case 'engaged': return 'rgba(16, 185, 129, 0.8)';    // Green
      case 'focused': return 'rgba(218, 14, 41, 0.9)';     // Brand red
      default: return 'rgba(59, 130, 246, 0.7)';
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
      case 'dormant': return '4s';
      case 'aware': return '3s';
      case 'engaged': return '2s';
      case 'focused': return '1.5s';
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
            opacity: 0.8;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 ${color};
          }
          70% {
            box-shadow: 0 0 0 12px transparent;
          }
          100% {
            box-shadow: 0 0 0 0 transparent;
          }
        }

        .orb-container {
          animation: breathe ${breathingSpeed} ease-in-out infinite;
        }

        .orb-pulse {
          animation: pulse-ring ${breathingSpeed} ease-out infinite;
        }

        .tooltip {
          opacity: 0;
          transform: translate(-50%, 10px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .orb-wrapper:hover .tooltip {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      `}</style>

      <div
        className="orb-wrapper"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
          pointerEvents: 'none', // Container doesn't block clicks
        }}
      >
        {/* Tooltip */}
        <div
          className="tooltip"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            marginBottom: '0.75rem',
            background: 'var(--surface-secondary)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '0.625rem 1rem',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div style={{ fontWeight: '500', marginBottom: '4px', color: 'var(--text-primary)' }}>
            {consciousness.getInsight()}
          </div>
          <div style={{ opacity: 0.7, fontSize: '0.7rem' }}>
            {consciousness.sessionDuration > 1000
              ? `Active ${Math.floor(consciousness.sessionDuration / 1000)}s`
              : 'Just awakened'}
          </div>
        </div>

        {/* Orb */}
        <div
          className="orb-container orb-pulse"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color} 0%, rgba(255, 255, 255, 0.15) 100%)`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1.5px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'auto', // Only orb receives clicks
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
          onClick={() => {
            consciousness.registerInteraction();
            onChatOpen?.();
          }}
          onMouseEnter={() => {
            consciousness.registerInteraction();
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon
            size={20}
            style={{
              color: 'white',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
            }}
          />
        </div>
      </div>
    </>
  );
}
