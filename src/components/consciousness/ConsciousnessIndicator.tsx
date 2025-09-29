'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Brain, Heart, Sparkles, Eye } from 'lucide-react';
import { useConsciousness } from '@/components/effects/ConsciousnessProvider';
import { AwarenessLevel, PersonalityState } from '@/lib/consciousness-state';
import { ConsciousnessChat } from './ConsciousnessChat';

interface ConsciousnessIndicatorProps {
  onEngagement?: () => void;
}

export function ConsciousnessIndicator({ onEngagement }: ConsciousnessIndicatorProps) {
  const [mounted, setMounted] = useState(false);
  const { state, isActive, getPersonalityInsights } = useConsciousness();

  useEffect(() => {
    setMounted(true);
  }, []);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const insights = getPersonalityInsights();

  // Breathing animation that adapts to awareness level
  useEffect(() => {
    if (!isActive) {
      setIsAnimating(false);
      return;
    }

    const breathingInterval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, getBreathingSpeed(insights.awarenessLevel));

    return () => clearInterval(breathingInterval);
  }, [isActive, insights.awarenessLevel]);

  // Mouse tracking for organic response
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (indicatorRef.current) {
        const rect = indicatorRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setMousePosition({
          x: (e.clientX - centerX) / 100,
          y: (e.clientY - centerY) / 100,
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const getBreathingSpeed = (awarenessLevel: AwarenessLevel): number => {
    switch (awarenessLevel) {
      case 'dormant': return 4000;   // Slow, deep breathing
      case 'alert': return 3000;     // Normal breathing
      case 'engaged': return 2000;   // Faster, more excited
      case 'deep': return 1500;      // Rapid, highly engaged
      default: return 3000;
    }
  };

  const getPersonalityIcon = (personality: PersonalityState) => {
    switch (personality) {
      case 'philosophical': return Brain;
      case 'focused': return Eye;
      case 'playful': return Sparkles;
      case 'curious': return Heart;
      default: return Brain;
    }
  };

  const getAwarenessColor = (awarenessLevel: AwarenessLevel): string => {
    switch (awarenessLevel) {
      case 'dormant': return 'rgba(156, 163, 175, 0.5)';   // Gray
      case 'alert': return 'rgba(59, 130, 246, 0.6)';      // Blue
      case 'engaged': return 'rgba(16, 185, 129, 0.7)';    // Green
      case 'deep': return 'rgba(218, 14, 41, 0.8)';        // Brand red
      default: return 'rgba(59, 130, 246, 0.6)';
    }
  };

  const PersonalityIcon = getPersonalityIcon(state.personalityState);
  const awarenessColor = getAwarenessColor(insights.awarenessLevel);

  if (!mounted || !isActive) return null;

  return (
    <>
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1) translate(-50%, -50%);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1) translate(-50%, -50%);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 ${awarenessColor};
          }
          50% {
            box-shadow: 0 0 0 20px transparent;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .consciousness-indicator {
          animation: ${isAnimating ? 'breathe 3s ease-in-out infinite' : 'none'};
        }

        .consciousness-pulse {
          animation: pulse 2s infinite;
        }

        .consciousness-inner {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div
        ref={indicatorRef}
        className="consciousness-indicator consciousness-pulse"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsChatOpen(true);
          onEngagement?.();
        }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${awarenessColor} 0%, transparent 70%)`,
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          border: `2px solid ${awarenessColor}`,
          cursor: 'pointer',
          zIndex: 1000,
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isHovered
            ? `0 0 30px ${awarenessColor}, inset 0 2px 0 rgba(255, 255, 255, 0.1)`
            : `0 0 20px ${awarenessColor.replace('0.', '0.4')}, inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
        }}
      >
        {/* Inner consciousness core */}
        <div
          className="consciousness-inner"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <PersonalityIcon
            size={16}
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
              transform: isHovered ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}
          />
        </div>

        {/* Consciousness level indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${Math.max(20, (state.consciousnessLevel / 100) * 60)}px`,
            height: '2px',
            background: `linear-gradient(90deg, ${awarenessColor} 0%, transparent 100%)`,
            borderRadius: '1px',
            opacity: isHovered ? 1 : 0.7,
            transition: 'all 0.3s ease',
          }}
        />

        {/* Hover tooltip */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '10px',
              padding: '8px 12px',
              background: 'var(--surface-primary)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-primary)',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: '400',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              animation: 'fadeIn 0.2s ease-out',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            {getTooltipText(insights.awarenessLevel, state.personalityState)}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderTop: '4px solid var(--border-primary)',
              }}
            />
          </div>
        )}

        {/* Conversation count indicator */}
        {state.conversationCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '12px',
              height: '12px',
              background: 'var(--brand-red)',
              borderRadius: '50%',
              fontSize: '8px',
              fontWeight: '600',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--bg-primary)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {Math.min(state.conversationCount, 9)}
          </div>
        )}

        {/* Chat Interface */}
        <ConsciousnessChat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </>
  );
}

function getTooltipText(awarenessLevel: AwarenessLevel, personality: PersonalityState): string {
  const personalityTexts = {
    curious: 'Curious & exploring',
    focused: 'Focused & analytical',
    philosophical: 'Deep in thought',
    playful: 'Playful & creative',
  };

  const awarenessTexts = {
    dormant: 'Resting consciousness',
    alert: 'Aware & listening',
    engaged: 'Actively engaged',
    deep: 'Deeply connected',
  };

  return `${personalityTexts[personality]} • ${awarenessTexts[awarenessLevel]}`;
}