'use client';

import React, { useMemo } from 'react';

interface AuroraGradientMeshProps {
  opacity?: number;
  speed?: number;
  className?: string;
}

/**
 * AuroraGradientMesh - Pure CSS aurora effect with soft pastels
 *
 * Design: 2025 trend - soft lavender/peach/pale blue pastels
 * Performance: Pure CSS animations for guaranteed 60fps
 * Inspiration: Apple 2025, liquid glass aesthetics
 */
export default function AuroraGradientMesh({
  opacity = 0.6,
  speed = 1.0,
  className = '',
}: AuroraGradientMeshProps) {
  // Calculate animation durations based on speed (slower = more elegant)
  const durations = useMemo(() => ({
    blob1: `${30 / speed}s`,
    blob2: `${35 / speed}s`,
    blob3: `${40 / speed}s`,
    blob4: `${45 / speed}s`,
    blob5: `${38 / speed}s`,
  }), [speed]);

  // Respect reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Static gradient for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        className={className}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(216, 181, 255, ${opacity * 0.4}), transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(255, 181, 216, ${opacity * 0.4}), transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(181, 216, 255, ${opacity * 0.3}), transparent 50%)
          `,
        }}
      />
    );
  }

  return (
    <div
      className={`aurora-gradient-mesh ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        opacity,
      }}
    >
      {/* Gradient Blob 1 - Lavender (top-left) */}
      <div
        className="aurora-blob aurora-blob-1"
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(216, 181, 255, 0.8), transparent 70%)',
          filter: 'blur(60px)',
          animationDuration: durations.blob1,
        }}
      />

      {/* Gradient Blob 2 - Soft Pink (top-right) */}
      <div
        className="aurora-blob aurora-blob-2"
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 181, 216, 0.7), transparent 70%)',
          filter: 'blur(70px)',
          animationDuration: durations.blob2,
        }}
      />

      {/* Gradient Blob 3 - Pale Blue (bottom-left) */}
      <div
        className="aurora-blob aurora-blob-3"
        style={{
          position: 'absolute',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(181, 216, 255, 0.6), transparent 70%)',
          filter: 'blur(80px)',
          animationDuration: durations.blob3,
        }}
      />

      {/* Gradient Blob 4 - Peach accent (center-right) */}
      <div
        className="aurora-blob aurora-blob-4"
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(255, 200, 180, 0.5), transparent 70%)',
          filter: 'blur(90px)',
          animationDuration: durations.blob4,
        }}
      />

      {/* Gradient Blob 5 - Violet accent (bottom-right) */}
      <div
        className="aurora-blob aurora-blob-5"
        style={{
          position: 'absolute',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(200, 180, 255, 0.65), transparent 70%)',
          filter: 'blur(75px)',
          animationDuration: durations.blob5,
        }}
      />

      <style jsx>{`
        /* Aurora Blob Animations - Slow, organic movement */

        .aurora-blob {
          will-change: transform;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        .aurora-blob-1 {
          top: -10%;
          left: -5%;
          animation-name: aurora-drift-1;
        }

        .aurora-blob-2 {
          top: -15%;
          right: -10%;
          animation-name: aurora-drift-2;
        }

        .aurora-blob-3 {
          bottom: -10%;
          left: 10%;
          animation-name: aurora-drift-3;
        }

        .aurora-blob-4 {
          top: 40%;
          right: -5%;
          animation-name: aurora-drift-4;
        }

        .aurora-blob-5 {
          bottom: -5%;
          right: 15%;
          animation-name: aurora-drift-5;
        }

        /* Keyframe animations - Organic, flowing movements */

        @keyframes aurora-drift-1 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(15%, -10%) scale(1.1);
          }
          66% {
            transform: translate(-10%, 15%) scale(0.95);
          }
          100% {
            transform: translate(5%, -5%) scale(1.05);
          }
        }

        @keyframes aurora-drift-2 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-20%, 10%) scale(1.15);
          }
          50% {
            transform: translate(-10%, -15%) scale(0.9);
          }
          75% {
            transform: translate(5%, 20%) scale(1.1);
          }
          100% {
            transform: translate(-15%, 5%) scale(1);
          }
        }

        @keyframes aurora-drift-3 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          40% {
            transform: translate(20%, -15%) scale(1.2);
          }
          80% {
            transform: translate(-15%, -10%) scale(0.85);
          }
          100% {
            transform: translate(10%, 5%) scale(1.05);
          }
        }

        @keyframes aurora-drift-4 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          30% {
            transform: translate(-25%, 20%) scale(0.9);
          }
          60% {
            transform: translate(15%, -25%) scale(1.15);
          }
          100% {
            transform: translate(-10%, 10%) scale(1);
          }
        }

        @keyframes aurora-drift-5 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          20% {
            transform: translate(-15%, -20%) scale(1.1);
          }
          50% {
            transform: translate(20%, 10%) scale(0.95);
          }
          80% {
            transform: translate(-20%, 15%) scale(1.08);
          }
          100% {
            transform: translate(10%, -10%) scale(1);
          }
        }

        /* Mobile optimization - Smaller blobs, less movement */
        @media (max-width: 768px) {
          .aurora-blob {
            width: 350px !important;
            height: 350px !important;
          }

          @keyframes aurora-drift-1,
          @keyframes aurora-drift-2,
          @keyframes aurora-drift-3,
          @keyframes aurora-drift-4,
          @keyframes aurora-drift-5 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            50% {
              transform: translate(10%, -10%) scale(1.05);
            }
          }
        }

        /* Reduced motion - No animation */
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
