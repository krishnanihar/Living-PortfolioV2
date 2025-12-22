'use client';

import { useState, useCallback } from 'react';
import { TimelineMilestone } from '@/data/timeline';
import { animate } from 'animejs';

interface JourneyNavigatorProps {
  milestones: TimelineMilestone[];
  activeMilestone: number;
  onJumpToMilestone: (index: number) => void;
}

/**
 * Journey Navigator Component
 * Mini-map showing all milestones with jump-to functionality
 */
export default function JourneyNavigator({
  milestones,
  activeMilestone,
  onJumpToMilestone,
}: JourneyNavigatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDotClick = useCallback(
    (index: number) => {
      onJumpToMilestone(index);

      // Animate the clicked dot
      const dot = document.getElementById(`nav-dot-${index}`);
      if (dot) {
        animate(dot, {
          scale: [1.5, 1],
          duration: 400,
          ease: 'outElastic(1, 0.5)',
        });
      }
    },
    [onJumpToMilestone]
  );

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
      }}
    >
      {/* Toggle button */}
      <button
        onClick={toggleExpanded}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'var(--glass-08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-60)',
          fontSize: '14px',
          transition: 'all 0.3s ease',
          marginBottom: '8px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--glass-15)';
          e.currentTarget.style.color = 'var(--text-90)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--glass-08)';
          e.currentTarget.style.color = 'var(--text-60)';
        }}
        aria-label={isExpanded ? 'Collapse navigator' : 'Expand navigator'}
      >
        {isExpanded ? '✕' : '⊞'}
      </button>

      {/* Navigator dots */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          padding: '12px',
          background: 'var(--glass-06)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '16px',
          border: '1px solid var(--glass-10)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: 1,
        }}
      >
        {milestones.map((milestone, index) => {
          const isActive = index === activeMilestone;
          const isHovered = index === hoveredIndex;

          return (
            <div
              key={milestone.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexDirection: 'row-reverse',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Label (shows on hover or when expanded) */}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '500',
                  color: isActive ? 'var(--text-90)' : 'var(--text-50)',
                  fontFamily: 'var(--font-dm-sans)',
                  whiteSpace: 'nowrap',
                  opacity: isExpanded || isHovered ? 1 : 0,
                  transform: isExpanded || isHovered ? 'translateX(0)' : 'translateX(10px)',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none',
                  maxWidth: isExpanded || isHovered ? '120px' : '0',
                  overflow: 'hidden',
                }}
              >
                {milestone.title}
              </span>

              {/* Dot */}
              <button
                id={`nav-dot-${index}`}
                onClick={() => handleDotClick(index)}
                style={{
                  width: isActive ? '12px' : '8px',
                  height: isActive ? '12px' : '8px',
                  borderRadius: '50%',
                  background: isActive
                    ? milestone.brandColor
                    : isHovered
                    ? 'var(--text-50)'
                    : 'var(--text-25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? `0 0 12px ${milestone.brandColor}80` : 'none',
                  flexShrink: 0,
                }}
                aria-label={`Jump to ${milestone.title}`}
              />
            </div>
          );
        })}

        {/* Progress indicator */}
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '12px',
            bottom: '12px',
            width: '2px',
            background: 'var(--glass-10)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${((activeMilestone + 1) / milestones.length) * 100}%`,
              background: `linear-gradient(to bottom, ${milestones[0]?.brandColor || '#fff'}, ${
                milestones[activeMilestone]?.brandColor || '#fff'
              })`,
              transition: 'height 0.5s ease',
              borderRadius: '1px',
            }}
          />
        </div>
      </div>

      {/* Current milestone indicator */}
      <div
        style={{
          padding: '8px 14px',
          background: 'var(--glass-08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '10px',
          border: `1px solid ${milestones[activeMilestone]?.brandColor}40`,
          marginTop: '8px',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: '600',
            color: milestones[activeMilestone]?.brandColor,
            fontFamily: 'var(--font-space-grotesk)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {milestones[activeMilestone]?.year}
        </span>
      </div>
    </div>
  );
}
