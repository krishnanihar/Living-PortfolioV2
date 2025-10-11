'use client';

import React, { useEffect, useState } from 'react';
import { Heart, Users, Sparkles, AlertCircle, TrendingUp, Globe, type LucideIcon } from 'lucide-react';
import { usePsoriAssistNarrative } from '@/hooks/usePsoriAssistNarrative';

interface FirstPersonMoment {
  trigger: number; // Scroll progress 0-1
  icon?: LucideIcon;
  headline: string;
  subtext?: string;
  duration?: number; // milliseconds
  color: string;
}

const moments: FirstPersonMoment[] = [
  {
    trigger: 0.05,
    icon: Heart,
    headline: "It starts with a single patch. Then another. You stop wearing shorts.",
    subtext: "This is where the journey begins",
    duration: 5000,
    color: '239, 68, 68' // Red
  },
  {
    trigger: 0.15,
    icon: Users,
    headline: "You're not alone. 125 million people know this feeling.",
    subtext: "Every frustration, every missed application, every moment of hope",
    duration: 5000,
    color: '236, 72, 153' // Pink
  },
  {
    trigger: 0.30,
    headline: "Meet Sarah. She's you. Or maybe you're Marcus.",
    subtext: "Different stories, same struggle",
    duration: 4500,
    color: '74, 144, 226' // Blue
  },
  {
    trigger: 0.45,
    icon: Sparkles,
    headline: "What if your phone could see what dermatologists miss?",
    subtext: "AI-powered insights in 2 minutes, not 3 months",
    duration: 5000,
    color: '168, 85, 247' // Purple
  },
  {
    trigger: 0.58,
    icon: AlertCircle,
    headline: "2.5 years to diagnose PsA. 50% present with irreversible damage.",
    subtext: "This app changes that timeline",
    duration: 5500,
    color: '239, 68, 68' // Red
  },
  {
    trigger: 0.65,
    headline: '"Finally, someone built something that gets it."',
    subtext: "— Beta tester with severe psoriasis, 15 years",
    duration: 5000,
    color: '80, 200, 120' // Green
  },
  {
    trigger: 0.80,
    icon: TrendingUp,
    headline: "2 million lives changed. Could yours be next?",
    subtext: "From concept to impact in 5 years",
    duration: 5000,
    color: '168, 85, 247' // Purple
  },
  {
    trigger: 0.92,
    icon: Globe,
    headline: "The future isn't just better apps. It's better lives.",
    subtext: "Thank you for reading this far",
    duration: 6000,
    color: '80, 200, 120' // Green
  }
];

export function PsoriAssistFirstPersonMoments() {
  const narrativeState = usePsoriAssistNarrative();
  const [activeMoment, setActiveMoment] = useState<FirstPersonMoment | null>(null);
  const [shownMoments, setShownMoments] = useState<Set<number>>(new Set());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we should trigger a moment
    const moment = moments.find(
      (m) =>
        narrativeState.progress >= m.trigger &&
        narrativeState.progress < m.trigger + 0.05 &&
        !shownMoments.has(m.trigger)
    );

    if (moment) {
      setActiveMoment(moment);
      setIsVisible(true);
      setShownMoments((prev) => new Set(prev).add(moment.trigger));

      // Auto-dismiss after duration
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setActiveMoment(null), 500); // Wait for fade-out
      }, moment.duration || 5000);

      return () => clearTimeout(timeout);
    }
  }, [narrativeState.progress, shownMoments]);

  if (!activeMoment) return null;

  const Icon = activeMoment.icon;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        maxWidth: '420px',
        zIndex: 100,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '20px',
          backgroundColor: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(60px) saturate(180%) brightness(0.9)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            0 8px 32px rgba(${activeMoment.color}, 0.2),
            0 2px 8px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, rgb(${activeMoment.color}), transparent)`,
          }}
        />

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          {Icon && (
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: `rgba(${activeMoment.color}, 0.15)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={22} color={`rgb(${activeMoment.color})`} />
            </div>
          )}

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '1rem',
                lineHeight: '1.5',
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: '500',
                marginBottom: activeMoment.subtext ? '0.5rem' : 0,
              }}
            >
              {activeMoment.headline}
            </div>
            {activeMoment.subtext && (
              <div
                style={{
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontStyle: 'italic',
                }}
              >
                {activeMoment.subtext}
              </div>
            )}
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => setActiveMoment(null), 500);
            }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M1 11L11 1"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
