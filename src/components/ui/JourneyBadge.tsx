'use client';

import { Calendar, Users } from 'lucide-react';

export interface JourneyBadgeProps {
  duration?: string;
  team?: string;
  className?: string;
}

export function JourneyBadge({ duration, team, className }: JourneyBadgeProps) {
  if (!duration && !team) return null;

  return (
    <div className={`flex gap-2 flex-wrap ${className || ''}`}>
      {duration && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.25rem 0.625rem',
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '6px',
            fontSize: '0.688rem',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s ease',
          }}
        >
          <Calendar size={12} strokeWidth={2} />
          <span>{duration}</span>
        </div>
      )}
      {team && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.25rem 0.625rem',
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '6px',
            fontSize: '0.688rem',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s ease',
          }}
        >
          <Users size={12} strokeWidth={2} />
          <span>{team}</span>
        </div>
      )}
    </div>
  );
}
