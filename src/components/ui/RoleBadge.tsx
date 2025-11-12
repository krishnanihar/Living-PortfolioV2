'use client';

import { Briefcase } from 'lucide-react';

export interface RoleBadgeProps {
  role: string;
  firstPersonContext?: string;
  className?: string;
}

export function RoleBadge({ role, firstPersonContext, className }: RoleBadgeProps) {
  return (
    <div
      className={`group relative ${className || ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.375rem 0.75rem',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: 500,
        color: 'rgba(255, 255, 255, 0.8)',
        transition: 'all 0.3s ease',
      }}
    >
      <Briefcase size={14} strokeWidth={2} />
      <span>{role}</span>

      {/* First-person context tooltip on hover */}
      {firstPersonContext && (
        <div
          className="pointer-events-none group-hover:opacity-100 group-hover:visible"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            minWidth: '200px',
            maxWidth: '300px',
            padding: '0.75rem 1rem',
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            fontSize: '0.813rem',
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease',
            zIndex: 100,
          }}
        >
          {firstPersonContext}
          {/* Arrow pointer */}
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '8px',
              height: '8px',
              background: 'rgba(10, 10, 10, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRight: 'none',
              borderBottom: 'none',
            }}
          />
        </div>
      )}
    </div>
  );
}
