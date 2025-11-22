'use client';

import React, { useMemo } from 'react';
import GPGPUFlowField from './GPGPUFlowField';
import MeshGradientBackground from './MeshGradientBackground';
import { useNarrativeProgress, type NarrativeAct } from '@/hooks/useNarrativeProgress';

interface HybridParticleSystemProps {
  enableNarrative?: boolean;
  defaultColors?: string[];
  defaultOpacity?: number;
  className?: string;
}

// Act-specific configurations
const narrativeConfig = {
  seduction: {
    colors: ['#8B5CF6', '#A78BFA', '#3B82F6', '#60A5FA'], // Purple → Light Purple → Blue
    particleColor: '#A78BFA',
    particleOpacity: 0.06,
    particleSpeed: 0.4,
    flowIntensity: 0.8,
    meshOpacity: 0.10,
    meshSpeed: 0.8,
    description: 'Gentle wonder and possibility',
  },
  complication: {
    colors: ['#DC2626', '#EF4444', '#F59E0B', '#FB923C'], // Red → Light Red → Orange
    particleColor: '#F87171',
    particleOpacity: 0.08,
    particleSpeed: 0.8,
    flowIntensity: 1.4,
    meshOpacity: 0.12,
    meshSpeed: 1.2,
    description: 'Chaotic tension and ethical dilemmas',
  },
  resolution: {
    colors: ['#0EA5E9', '#38BDF8', '#6366F1', '#818CF8'], // Sky Blue → Light Blue → Indigo
    particleColor: '#60A5FA',
    particleOpacity: 0.05,
    particleSpeed: 0.3,
    flowIntensity: 0.6,
    meshOpacity: 0.08,
    meshSpeed: 0.6,
    description: 'Calm contemplation and open questions',
  },
};

// Default configuration (when narrative is disabled)
const defaultConfig = {
  colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#6366F1'], // Purple → Pink → Blue → Indigo
  particleColor: '#E0E7FF',
  particleOpacity: 0.05,
  particleSpeed: 0.5,
  flowIntensity: 1.0,
  meshOpacity: 0.10,
  meshSpeed: 1.0,
};

export default function HybridParticleSystem({
  enableNarrative = false,
  defaultColors,
  defaultOpacity = 0.10,
  className = '',
}: HybridParticleSystemProps) {
  // Get narrative state (only if enabled)
  const narrativeState = enableNarrative ? useNarrativeProgress() : null;

  // Determine current configuration based on narrative state or defaults
  const currentConfig = useMemo(() => {
    if (!enableNarrative || !narrativeState) {
      // Use defaults when narrative is disabled
      return {
        ...defaultConfig,
        colors: defaultColors || defaultConfig.colors,
        meshOpacity: defaultOpacity,
      };
    }

    // Use narrative-driven configuration
    const actConfig = narrativeConfig[narrativeState.act as NarrativeAct];

    // Content-aware opacity: higher during transitions (high intensity), lower during reading
    // Transitions have intensity 0.6-0.9, reading sections have lower intensity
    const baseOpacity = narrativeState.intensity > 0.7 ? 1.0 : 0.3;

    return {
      colors: actConfig.colors,
      particleColor: actConfig.particleColor,
      particleOpacity: actConfig.particleOpacity * baseOpacity,
      particleSpeed: actConfig.particleSpeed,
      flowIntensity: actConfig.flowIntensity,
      meshOpacity: actConfig.meshOpacity * baseOpacity,
      meshSpeed: actConfig.meshSpeed,
    };
  }, [enableNarrative, narrativeState, defaultColors, defaultOpacity]);

  return (
    <div className={className}>
      {/* Layer 1: Mesh Gradient Background (bottom layer) */}
      <MeshGradientBackground
        colors={currentConfig.colors}
        opacity={currentConfig.meshOpacity}
        speed={currentConfig.meshSpeed}
        meshDensity={24}
        className="hybrid-mesh-layer"
      />

      {/* Layer 2: Flow Field Particles (top layer) */}
      <GPGPUFlowField
        particleCount={15000}
        opacity={currentConfig.particleOpacity}
        speed={currentConfig.particleSpeed}
        flowIntensity={currentConfig.flowIntensity}
        mouseInfluence={150}
        color={currentConfig.particleColor}
        className="hybrid-particle-layer"
      />

      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === 'development' && enableNarrative && narrativeState && (
        <div
          style={{
            position: 'fixed',
            bottom: '1rem',
            left: '1rem',
            zIndex: 9999,
            padding: '0.75rem 1rem',
            background: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            pointerEvents: 'none',
          }}
        >
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: currentConfig.particleColor }}>
            Narrative System Active
          </div>
          <div>Act: <strong>{narrativeState.act}</strong> ({Math.round(narrativeState.actProgress * 100)}%)</div>
          <div>Progress: {Math.round(narrativeState.progress * 100)}%</div>
          <div>Intensity: {narrativeState.intensity.toFixed(2)}</div>
          <div>Section: {narrativeState.section}</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', opacity: 0.7 }}>
            {narrativeConfig[narrativeState.act as NarrativeAct].description}
          </div>
        </div>
      )}

      <style jsx>{`
        .hybrid-mesh-layer {
          z-index: 1;
        }
        .hybrid-particle-layer {
          z-index: 2;
        }
      `}</style>
    </div>
  );
}

// Export narrative configuration for external use
export { narrativeConfig };
