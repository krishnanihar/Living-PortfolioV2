'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

export function FloatingChatButton({ onClick, unreadCount }: FloatingChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    const influenceRadius = 45; // % of viewport

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

    // Mix with base dark glass based on influence
    const mixStrength = influence * 0.6; // Moderate influence
    const r = Math.round(10 * (1 - mixStrength) + baseColor.r * mixStrength);
    const g = Math.round(10 * (1 - mixStrength) + baseColor.g * mixStrength);
    const b = Math.round(20 * (1 - mixStrength) + baseColor.b * mixStrength);

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
            background: `rgba(${reflectedColor.r}, ${reflectedColor.g}, ${reflectedColor.b}, 0.15)`,
            backdropFilter: 'blur(120px) saturate(200%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(120px) saturate(200%) brightness(0.9)',
            border: `1px solid rgba(${reflectedColor.r}, ${reflectedColor.g}, ${reflectedColor.b}, 0.2)`,
            borderRadius: '12px',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.03),
              inset 0 -1px 0 rgba(0, 0, 0, 0.5),
              0 16px 48px rgba(0, 0, 0, 0.8)
            `,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.95)',
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
              borderLeft: `6px solid rgba(${reflectedColor.r}, ${reflectedColor.g}, ${reflectedColor.b}, 0.95)`,
            }}
          />
        </div>
      )}

      {/* Orb Button */}
      <button
        onClick={onClick}
        aria-label="Open chat"
        className="floating-chat-button"
        style={{
          position: 'relative',
          width: 'clamp(48px, 10vw, 56px)',
          height: 'clamp(48px, 10vw, 56px)',
          borderRadius: '50%',
          background: `rgba(${reflectedColor.r}, ${reflectedColor.g}, ${reflectedColor.b}, 0.15)`,
          backdropFilter: 'blur(120px) saturate(200%)',
          WebkitBackdropFilter: 'blur(120px) saturate(200%)',
          border: `1px solid rgba(${reflectedColor.r}, ${reflectedColor.g}, ${reflectedColor.b}, 0.25)`,
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.03),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5),
            0 16px 48px rgba(0, 0, 0, 0.8)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = `
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5),
            0 20px 60px rgba(0, 0, 0, 0.9)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `
            inset 0 1px 0 rgba(255, 255, 255, 0.03),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5),
            0 16px 48px rgba(0, 0, 0, 0.8)
          `;
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
      >
        {/* Icon - static and elegant with reflected color */}
        <Sparkles
          size={24}
          strokeWidth={2}
          style={{
            color: `rgba(${reflectedColor.r}, ${reflectedColor.g}, ${reflectedColor.b}, 1)`,
            filter: `drop-shadow(0 0 4px rgba(${reflectedColor.r}, ${reflectedColor.g}, ${reflectedColor.b}, 0.6))`,
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
              border: '2px solid rgba(0, 0, 0, 0.9)',
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

        @keyframes pulse-ring {
          0%, 100% {
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.03),
              inset 0 -1px 0 rgba(0, 0, 0, 0.5),
              0 16px 48px rgba(0, 0, 0, 0.8);
          }
          50% {
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.03),
              inset 0 -1px 0 rgba(0, 0, 0, 0.5),
              0 16px 48px rgba(0, 0, 0, 0.8);
          }
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
