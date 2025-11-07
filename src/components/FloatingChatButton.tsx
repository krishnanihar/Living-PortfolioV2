'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

export function FloatingChatButton({ onClick, unreadCount }: FloatingChatButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open chat"
      className="floating-chat-button"
      style={{
        position: 'fixed',
        bottom: 'clamp(1rem, 3vw, 2rem)',
        right: 'clamp(1rem, 3vw, 2rem)',
        width: 'clamp(48px, 10vw, 56px)',
        height: 'clamp(48px, 10vw, 56px)',
        borderRadius: '50%',
        background: 'rgba(8, 8, 8, 0.9)',
        backdropFilter: 'blur(80px) saturate(180%)',
        WebkitBackdropFilter: 'blur(80px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          inset 0 -1px 0 rgba(0, 0, 0, 0.3),
          0 8px 24px rgba(0, 0, 0, 0.5),
          0 0 20px rgba(218, 14, 41, 0.15)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 9997,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = `
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          inset 0 -1px 0 rgba(0, 0, 0, 0.3),
          0 12px 32px rgba(0, 0, 0, 0.6),
          0 0 32px rgba(218, 14, 41, 0.25)
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = `
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          inset 0 -1px 0 rgba(0, 0, 0, 0.3),
          0 8px 24px rgba(0, 0, 0, 0.5),
          0 0 20px rgba(218, 14, 41, 0.15)
        `;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
    >
      {/* Icon with subtle rotation animation */}
      <Sparkles
        size={24}
        strokeWidth={2}
        style={{
          color: 'rgba(218, 14, 41, 1)',
          filter: 'drop-shadow(0 0 8px rgba(218, 14, 41, 0.4))',
          animation: 'rotate-sparkle 4s linear infinite',
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

      {/* Pulse ring animation */}
      <style jsx>{`
        @keyframes pulse-ring {
          0%, 100% {
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.08),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3),
              0 8px 24px rgba(0, 0, 0, 0.5),
              0 0 20px rgba(218, 14, 41, 0.15),
              0 0 0 0 rgba(218, 14, 41, 0.4);
          }
          50% {
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.08),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3),
              0 8px 24px rgba(0, 0, 0, 0.5),
              0 0 20px rgba(218, 14, 41, 0.15),
              0 0 0 12px rgba(218, 14, 41, 0);
          }
        }

        @keyframes rotate-sparkle {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-chat-button {
            animation: none !important;
          }
          .floating-chat-button * {
            animation: none !important;
          }
        }
      `}</style>
    </button>
  );
}
