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
            background: 'rgba(10, 10, 20, 0.95)',
            backdropFilter: 'blur(120px) saturate(200%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(120px) saturate(200%) brightness(0.9)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.03),
              inset 0 -1px 0 rgba(0, 0, 0, 0.5),
              0 16px 48px rgba(0, 0, 0, 0.8),
              0 0 40px rgba(124, 58, 237, 0.15)
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
              borderLeft: '6px solid rgba(10, 10, 20, 0.95)',
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
          background: 'rgba(10, 10, 20, 0.95)',
          backdropFilter: 'blur(120px) saturate(200%)',
          WebkitBackdropFilter: 'blur(120px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.03),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5),
            0 16px 48px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(124, 58, 237, 0.25)
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
            0 20px 60px rgba(0, 0, 0, 0.9),
            0 0 60px rgba(124, 58, 237, 0.4)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `
            inset 0 1px 0 rgba(255, 255, 255, 0.03),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5),
            0 16px 48px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(124, 58, 237, 0.25)
          `;
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
      >
        {/* Icon - static and elegant */}
        <Sparkles
          size={24}
          strokeWidth={2}
          style={{
            color: 'rgba(124, 58, 237, 1)',
            filter: 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.5))',
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
              0 16px 48px rgba(0, 0, 0, 0.8),
              0 0 40px rgba(124, 58, 237, 0.25),
              0 0 0 0 rgba(124, 58, 237, 0.4);
          }
          50% {
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.03),
              inset 0 -1px 0 rgba(0, 0, 0, 0.5),
              0 16px 48px rgba(0, 0, 0, 0.8),
              0 0 40px rgba(124, 58, 237, 0.25),
              0 0 0 16px rgba(124, 58, 237, 0);
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
