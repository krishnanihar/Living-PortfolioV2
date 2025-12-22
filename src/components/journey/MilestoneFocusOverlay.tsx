'use client';

import { useEffect, useRef, useCallback } from 'react';
import { TimelineMilestone } from '@/data/timeline';
import { X, ExternalLink, Award, TrendingUp } from 'lucide-react';
import { animate } from 'animejs';

interface MilestoneFocusOverlayProps {
  milestone: TimelineMilestone;
  onClose: () => void;
}

/**
 * Milestone Focus Overlay
 * Expanded view with full milestone details
 */
export default function MilestoneFocusOverlay({
  milestone,
  onClose,
}: MilestoneFocusOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate in on mount
  useEffect(() => {
    if (overlayRef.current && contentRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 300,
        ease: 'outQuad',
      });

      animate(contentRef.current, {
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 400,
        delay: 100,
        ease: 'outCubic',
      });
    }
  }, []);

  // Handle close with animation
  const handleClose = useCallback(() => {
    if (overlayRef.current && contentRef.current) {
      animate(contentRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 200,
        ease: 'inQuad',
      });

      animate(overlayRef.current, {
        opacity: 0,
        duration: 250,
        delay: 50,
        ease: 'inQuad',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  // Prevent scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '640px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          background: 'var(--glass-06)',
          backdropFilter: 'blur(60px) saturate(180%)',
          WebkitBackdropFilter: 'blur(60px) saturate(180%)',
          borderRadius: '28px',
          border: `1px solid ${milestone.brandColor}30`,
          boxShadow: `0 0 80px ${milestone.brandColor}20, 0 40px 80px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Header with gradient */}
        <div
          style={{
            height: '180px',
            background: milestone.coverGradient
              ? `linear-gradient(135deg, ${milestone.coverGradient[0]}, ${milestone.coverGradient[1]})`
              : `linear-gradient(135deg, ${milestone.brandColor}, ${milestone.brandColor}cc)`,
            position: 'relative',
            borderRadius: '28px 28px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
            }}
          >
            <X size={18} />
          </button>

          {/* Year badge */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              padding: '6px 14px',
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              color: 'white',
              fontFamily: 'var(--font-space-grotesk)',
            }}
          >
            {milestone.year}
          </div>

          {/* Logo */}
          {milestone.logoFile ? (
            <img
              src={`/logos/${milestone.logoFile}`}
              alt={milestone.organization || milestone.title}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: 0.95,
              }}
            />
          ) : (
            <div
              style={{
                width: '70px',
                height: '70px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
              }}
            >
              {milestone.icon === 'Sparkles' && '✨'}
              {milestone.icon === 'Code2' && '💻'}
              {milestone.icon === 'GraduationCap' && '🎓'}
              {milestone.icon === 'Briefcase' && '💼'}
              {milestone.icon === 'Brain' && '🧠'}
              {milestone.icon === 'Palette' && '🎨'}
              {milestone.icon === 'Zap' && '⚡'}
              {milestone.icon === 'MessageSquarePlus' && '💬'}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '28px' }}>
          {/* Title & Subtitle */}
          <h2
            style={{
              margin: '0 0 6px 0',
              fontSize: '26px',
              fontWeight: '600',
              color: 'var(--text-95)',
              fontFamily: 'var(--font-space-grotesk)',
            }}
          >
            {milestone.title}
          </h2>
          <p
            style={{
              margin: '0 0 20px 0',
              fontSize: '14px',
              color: 'var(--text-50)',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            {milestone.subtitle}
          </p>

          {/* Hook/Lesson */}
          {(milestone.hook || milestone.lesson) && (
            <blockquote
              style={{
                margin: '0 0 24px 0',
                padding: '16px 20px',
                background: `${milestone.brandColor}15`,
                borderLeft: `3px solid ${milestone.brandColor}`,
                borderRadius: '0 12px 12px 0',
                fontSize: '15px',
                fontStyle: 'italic',
                color: 'var(--text-80)',
                lineHeight: 1.6,
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              {milestone.hook || milestone.lesson}
            </blockquote>
          )}

          {/* Description */}
          <p
            style={{
              margin: '0 0 24px 0',
              fontSize: '15px',
              color: 'var(--text-70)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            {milestone.details || milestone.description}
          </p>

          {/* Metrics */}
          {milestone.metrics && milestone.metrics.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              {milestone.metrics.map((metric, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px',
                    background: 'var(--glass-08)',
                    borderRadius: '14px',
                    border: '1px solid var(--glass-10)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '6px',
                    }}
                  >
                    <TrendingUp size={14} style={{ color: milestone.brandColor }} />
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-50)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontFamily: 'var(--font-dm-sans)',
                      }}
                    >
                      {metric.label}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '22px',
                      fontWeight: '600',
                      color: 'var(--text-90)',
                      fontFamily: 'var(--font-space-grotesk)',
                    }}
                  >
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {milestone.achievements && milestone.achievements.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text-60)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: 'var(--font-space-grotesk)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Award size={14} />
                Key Achievements
              </h4>
              <ul
                style={{
                  margin: 0,
                  padding: '0 0 0 20px',
                  listStyle: 'none',
                }}
              >
                {milestone.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    style={{
                      position: 'relative',
                      marginBottom: '10px',
                      fontSize: '14px',
                      color: 'var(--text-70)',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-dm-sans)',
                      paddingLeft: '16px',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: milestone.brandColor,
                      }}
                    />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '24px',
            }}
          >
            {milestone.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'var(--text-70)',
                  background: 'var(--glass-10)',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Related work link */}
          {milestone.relatedWork && (
            <a
              href={milestone.relatedWork}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                background: `linear-gradient(135deg, ${milestone.brandColor}, ${milestone.brandColor}cc)`,
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'var(--font-dm-sans)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 10px 30px ${milestone.brandColor}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              View Case Study
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
