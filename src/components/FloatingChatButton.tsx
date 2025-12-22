'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { animate } from '@/lib/anime-utils';

interface FloatingChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

export function FloatingChatButton({ onClick, unreadCount }: FloatingChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showOnboardingHint, setShowOnboardingHint] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onboardingHintRef = useRef<HTMLDivElement>(null);
  const { shouldShowHint, markHintSeen } = useOnboarding();

  // Hero orb position (matches CosmicBackground.tsx)
  const spherePosition = { x: 65, y: 45 };

  // Calculate chatbot position relative to viewport (bottom-right)
  // Approximate: ~95% x, ~92% y for bottom-right positioning
  const chatbotPosition = { x: 95, y: 92 };

  // Color reflection from hero orb (same logic as background stars)
  const getReflectedColor = () => {
    const dx = chatbotPosition.x - spherePosition.x;
    const dy = chatbotPosition.y - spherePosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const influenceRadius = 80; // % of viewport - increased for wider color reflection

    // Calculate influence strength
    const influence = distance < influenceRadius ? 1 - (distance / influenceRadius) : 0;

    // Get angle to determine color zone
    const angle = Math.atan2(dy, dx);
    const normalizedAngle = ((angle + Math.PI) / (Math.PI * 2) + 1) % 1;

    // Select base color based on angle (same as particle sphere)
    let baseColor;
    if (normalizedAngle < 0.33) {
      baseColor = { r: 33, g: 150, b: 243 }; // Electric Blue
    } else if (normalizedAngle < 0.66) {
      baseColor = { r: 124, g: 58, b: 237 }; // Deep Purple
    } else {
      baseColor = { r: 6, g: 182, b: 212 }; // Cyan
    }

    // Mix with lighter base for vibrant colors (not pure black)
    const mixStrength = influence * 1.0; // Full strength for maximum color visibility
    const r = Math.round(40 * (1 - mixStrength) + baseColor.r * mixStrength);
    const g = Math.round(40 * (1 - mixStrength) + baseColor.g * mixStrength);
    const b = Math.round(60 * (1 - mixStrength) + baseColor.b * mixStrength);

    return { r, g, b, influence };
  };

  const reflectedColor = getReflectedColor();

  const handleMouseEnter = () => {
    // Clear any pending leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    // Show tooltip after 200ms delay
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    // Clear any pending hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Hide tooltip after 150ms delay
    leaveTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  // Show onboarding hint after 10 seconds for first-time visitors
  useEffect(() => {
    if (!shouldShowHint('chat-discover')) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Show hint after 10 seconds
    const showTimer = setTimeout(() => {
      setShowOnboardingHint(true);

      // Animate entrance
      if (!prefersReducedMotion && onboardingHintRef.current) {
        animate(onboardingHintRef.current, {
          opacity: [0, 1],
          translateX: [20, 0],
          scale: [0.9, 1],
          duration: 400,
          ease: 'outExpo',
        });

        // Gentle pulse after entrance
        setTimeout(() => {
          if (onboardingHintRef.current) {
            animate(onboardingHintRef.current, {
              scale: [1, 1.02, 1],
              duration: 2000,
              loop: 3,
              ease: 'inOutSine',
            });
          }
        }, 400);
      }
    }, 10000);

    // Auto-dismiss after 15 seconds (10s delay + 5s visible)
    const dismissTimer = setTimeout(() => {
      dismissOnboardingHint();
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [shouldShowHint]);

  // Dismiss onboarding hint with animation
  const dismissOnboardingHint = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && onboardingHintRef.current) {
      animate(onboardingHintRef.current, {
        opacity: [1, 0],
        translateX: [0, 10],
        duration: 300,
        ease: 'inQuad',
        complete: () => {
          setShowOnboardingHint(false);
          markHintSeen('chat-discover');
        },
      });
    } else {
      setShowOnboardingHint(false);
      markHintSeen('chat-discover');
    }
  };

  // Handle click - also dismiss onboarding hint
  const handleClick = () => {
    if (showOnboardingHint) {
      dismissOnboardingHint();
    }
    onClick();
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(1rem, 3vw, 2rem)',
        right: 'clamp(1rem, 3vw, 2rem)',
        zIndex: 9997,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tooltip Card */}
      {isHovered && (
        <div
          role="tooltip"
          aria-label="Click to chat tooltip"
          className="floating-chat-tooltip"
          style={{
            position: 'absolute',
            right: 'calc(100% + 12px)',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '180px',
            padding: '12px 16px',
            background: 'var(--solid-95)',
            backdropFilter: 'blur(100px) saturate(180%)',
            WebkitBackdropFilter: 'blur(100px) saturate(180%)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            boxShadow: `inset 0 1px 0 var(--glass-05),
               inset 0 -1px 0 var(--text-10),
               0 8px 24px rgba(0, 0, 0, 0.4)`,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            Click to Chat
          </span>

          {/* Arrow pointer */}
          <div
            className="tooltip-arrow"
            style={{
              position: 'absolute',
              right: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '6px solid var(--solid-95)',
            }}
          />
        </div>
      )}

      {/* Pulsing rings - attention grabber */}
      <div
        className="pulse-ring pulse-ring-1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(48px, 10vw, 56px)',
          height: 'clamp(48px, 10vw, 56px)',
          borderRadius: '50%',
          border: '2px solid rgba(218, 14, 41, 0.4)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="pulse-ring pulse-ring-2"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(48px, 10vw, 56px)',
          height: 'clamp(48px, 10vw, 56px)',
          borderRadius: '50%',
          border: '2px solid rgba(218, 14, 41, 0.3)',
          pointerEvents: 'none',
        }}
      />

      {/* Onboarding Hint - First-time visitor prompt */}
      {showOnboardingHint && (
        <div
          ref={onboardingHintRef}
          onClick={dismissOnboardingHint}
          style={{
            position: 'absolute',
            right: 'calc(100% + 12px)',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '200px',
            padding: '12px 16px',
            background: 'rgba(139, 92, 246, 0.12)',
            backdropFilter: 'blur(80px) saturate(180%)',
            WebkitBackdropFilter: 'blur(80px) saturate(180%)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '14px',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.3),
              0 2px 8px rgba(139, 92, 246, 0.15),
              inset 0 1px 1px rgba(255, 255, 255, 0.1)
            `,
            cursor: 'pointer',
            opacity: 0, // Animated by anime.js
          }}
        >
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: '400',
              color: 'var(--text-90)',
              letterSpacing: '0.01em',
              display: 'block',
            }}
          >
            Have questions? I&apos;m here
          </span>

          {/* Arrow pointer */}
          <div
            style={{
              position: 'absolute',
              right: '-6px',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
              width: '10px',
              height: '10px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderLeft: 'none',
              borderBottom: 'none',
            }}
          />
        </div>
      )}

      {/* Orb Button */}
      <button
        onClick={handleClick}
        aria-label="Open chat"
        className="floating-chat-button"
        style={{
          position: 'relative',
          width: 'clamp(48px, 10vw, 56px)',
          height: 'clamp(48px, 10vw, 56px)',
          borderRadius: '50%',
          background: 'var(--solid-60)',
          backdropFilter: 'blur(100px) saturate(180%)',
          WebkitBackdropFilter: 'blur(100px) saturate(180%)',
          border: '1px solid var(--border-primary)',
          boxShadow: `inset 0 1px 0 var(--glass-05),
             inset 0 -1px 0 var(--text-10),
             0 8px 24px rgba(0, 0, 0, 0.4)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = `inset 0 1px 0 var(--glass-05),
             inset 0 -1px 0 var(--text-10),
             0 12px 32px rgba(0, 0, 0, 0.5)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `inset 0 1px 0 var(--glass-05),
             inset 0 -1px 0 var(--text-10),
             0 8px 24px rgba(0, 0, 0, 0.4)`;
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
      >
        {/* Top-left color reflection gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle at 20% 20%, rgba(${reflectedColor.r}, ${reflectedColor.g}, ${reflectedColor.b}, 0.3) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Icon - theme-aware for minimal aesthetic */}
        <Sparkles
          size={24}
          strokeWidth={2}
          style={{
            color: 'var(--text-primary)',
            position: 'relative',
            zIndex: 1,
          }}
        />

        {/* Unread count badge */}
        {unreadCount && unreadCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              minWidth: '20px',
              height: '20px',
              borderRadius: '10px',
              background: 'rgba(218, 14, 41, 1)',
              color: 'white',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 6px',
              boxShadow: '0 2px 8px rgba(218, 14, 41, 0.6)',
              border: '2px solid var(--solid-90)',
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </button>

      {/* Animations */}
      <style jsx>{`
        .floating-chat-tooltip {
          animation: tooltipSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes tooltipSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        /* Pulsing ring animations */
        .pulse-ring {
          animation: pulseRing 2.5s ease-out infinite;
          transition: opacity 0.3s ease;
        }

        .pulse-ring-2 {
          animation-delay: 1.25s;
        }

        @keyframes pulseRing {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }

        /* Pause animation on hover - user has noticed the button */
        div:hover > .pulse-ring {
          animation-play-state: paused;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-chat-button {
            animation: none !important;
          }
          .floating-chat-button * {
            animation: none !important;
          }
          .floating-chat-tooltip {
            animation: none !important;
          }
          .pulse-ring {
            animation: none !important;
            opacity: 0 !important;
          }
        }

        /* Hide tooltip on touch devices */
        @media (hover: none) {
          .floating-chat-tooltip {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
