'use client';

import React from 'react';

interface NoiseTextureOverlayProps {
  opacity?: number;
  blendMode?: 'normal' | 'overlay' | 'soft-light' | 'screen';
  tintColor?: string;
}

/**
 * Subtle noise/grain texture overlay
 * Adds premium, tactile quality to backgrounds (Apple/Vogue aesthetic)
 * Zero performance cost (SVG-based, static)
 */
export function NoiseTextureOverlay({
  opacity = 0.04,
  blendMode = 'overlay',
  tintColor,
}: NoiseTextureOverlayProps) {
  // SVG noise filter as data URI
  const noiseDataUri = `data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E`;

  return (
    <>
      {/* Primary noise texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity,
          mixBlendMode: blendMode,
          backgroundImage: `url("${noiseDataUri}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
        aria-hidden="true"
      />

      {/* Optional color tint for narrative integration */}
      {tintColor && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            opacity: opacity * 0.5,
            mixBlendMode: 'screen',
            backgroundColor: tintColor,
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
