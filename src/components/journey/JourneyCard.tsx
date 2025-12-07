'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface JourneyCardProps {
  organization: string;
  role: string;
  timeframe: string;
  status: 'Education' | 'Current' | 'Future';
  logo?: string; // SVG logo path
  icon?: React.ReactNode; // Fallback icon if no logo
  description: string;
  highlights: Array<{ label: string; value: string }>;
  projects?: string[];
  actId: string;
  color: string; // Brand accent color
  size: { width: number; minHeight: number };
  onClick?: () => void;
}

/**
 * JourneyCard Component
 *
 * Premium logo-first card for professional journey milestones
 * - 5-layer glassmorphism matching portfolio standard
 * - Large featured logos (96px-128px)
 * - Status badges with color coding
 * - Magnetic hover effects
 * - Click-to-scroll navigation
 */
export function JourneyCard({
  organization,
  role,
  timeframe,
  status,
  logo,
  icon,
  description,
  highlights,
  actId,
  color,
  size,
  onClick,
}: JourneyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Status badge configuration
  const statusConfig = {
    Education: {
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.08))',
      border: 'rgba(251, 191, 36, 0.4)',
      color: '#FCD34D',
      boxShadow: '0 0 16px rgba(251, 191, 36, 0.2)',
      text: 'Education',
    },
    Current: {
      background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(52, 211, 153, 0.08))',
      border: 'rgba(52, 211, 153, 0.4)',
      color: '#6EE7B7',
      boxShadow: '0 0 16px rgba(52, 211, 153, 0.2)',
      text: 'Current',
    },
    Future: {
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.08))',
      border: 'rgba(139, 92, 246, 0.4)',
      color: '#A78BFA',
      boxShadow: '0 0 16px rgba(139, 92, 246, 0.2)',
      text: 'Future',
    },
  };

  const badge = statusConfig[status];

  // Logo size based on card size (50-60% larger for prominence)
  const logoSize = size.width === 320 ? 168 : size.width === 360 ? 192 : 200;

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`${organization} - ${role}. Click to explore related work.`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: size.width === 280 ? 0 : size.width === 320 ? 0.15 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5
        }
      }}
      style={{
        position: 'relative',
        width: `${size.width}px`,
        minHeight: `${size.minHeight}px`,
        height: 'auto',
        padding: '1.5rem',
        borderRadius: '32px',
        cursor: 'pointer',

        // 7-Layer Apple Liquid Glass System
        // Layer 1: Depth gradient
        background: `
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.02) 50%,
            rgba(255, 255, 255, 0.05) 100%
          )
        `,
        // Layer 2: Noise texture (frosted glass realism)
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")
        `,
        // Layer 3: Ultra blur backdrop (80px = Apple-level)
        backdropFilter: 'blur(80px) saturate(200%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(80px) saturate(200%) brightness(1.1)',
        // Layer 4: Liquid border with subtle color hint
        border: `1px solid ${isHovered ? `${color}20` : 'rgba(255, 255, 255, 0.12)'}`,
        boxShadow: isHovered
          ? `
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.05),
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 8px 32px ${color}08,
            0 2px 8px rgba(0, 0, 0, 0.15)
          `
          : `
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.05),
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 2px 8px rgba(0, 0, 0, 0.15)
          `,

        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'visible',
      }}
    >
      {/* Status Badge - Top Right */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        padding: '0.375rem 0.75rem',
        borderRadius: '6px',
        background: badge.background,
        border: `1px solid ${badge.border}`,
        boxShadow: badge.boxShadow,
        fontSize: '0.75rem',
        fontWeight: '600',
        fontFamily: 'var(--font-manrope)',
        color: badge.color,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        animation: status === 'Current' ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
      }}>
        {badge.text}
      </div>

      {/* Logo - Direct Display (No Container) */}
      {logo ? (
        <motion.img
          whileHover={{
            scale: 1.08,
            rotate: [0, -2, 2, 0],
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          src={`/logos/${logo}`}
          alt={`${organization} logo`}
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
            objectFit: 'contain',
            marginBottom: '1.25rem',
            filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.15))',
          }}
        />
      ) : (
        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: [0, -2, 2, 0],
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-60)',
            filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.15))',
          }}
        >
          {icon}
        </motion.div>
      )}

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
      }}>
        {/* Organization Title */}
        <h3 style={{
          fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
          fontWeight: '400',
          fontFamily: 'var(--font-fraunces)',
          fontOpticalSizing: 'auto',
          color: 'var(--text-95)',
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem',
          lineHeight: 1.2,
        }}>
          {organization}
        </h3>

        {/* Role */}
        <p style={{
          fontSize: '0.9375rem',
          fontWeight: '500',
          fontFamily: 'var(--font-manrope)',
          color: 'var(--text-70)',
          marginBottom: '0.25rem',
        }}>
          {role}
        </p>

        {/* Timeline */}
        <p style={{
          fontSize: '0.8125rem',
          fontWeight: '400',
          fontFamily: 'var(--font-manrope)',
          color: 'var(--text-50)',
          marginBottom: '0.75rem',
        }}>
          {timeframe}
        </p>

        {/* Description */}
        <p style={{
          fontSize: '0.875rem',
          fontWeight: '400',
          fontFamily: 'var(--font-manrope)',
          color: 'var(--text-60)',
          lineHeight: 1.5,
          marginBottom: '0.75rem',
        }}>
          {description}
        </p>

        {/* Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          width: '100%',
          marginTop: 'auto',
        }}>
          {highlights.map((highlight, index) => (
            <div
              key={index}
              style={{
                padding: '0.75rem',
                borderRadius: '12px',
                background: 'var(--glass-04)',
                border: '1px solid var(--glass-08)',
              }}
            >
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '300',
                fontFamily: 'var(--font-fraunces)',
                fontOpticalSizing: 'auto',
                color: 'var(--text-95)',
                marginBottom: '0.25rem',
              }}>
                {highlight.value}
              </div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '500',
                fontFamily: 'var(--font-manrope)',
                color: 'var(--text-50)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {highlight.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Arrow Indicator - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -8
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          fontFamily: 'var(--font-dm-sans)',
          color: color,
        }}
      >
        Explore
        <ArrowRight size={16} />
      </motion.div>

      {/* Pulse animation for Current badge */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </motion.div>
  );
}
