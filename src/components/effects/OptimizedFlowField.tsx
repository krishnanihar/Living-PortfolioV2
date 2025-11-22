'use client';

import React, { useState, useEffect, useMemo } from 'react';
import GPGPUFlowFieldEnhanced from './GPGPUFlowFieldEnhanced';

type Preset = 'immersive' | 'elegant' | 'performance';

interface OptimizedFlowFieldProps {
  preset?: Preset;
  enableFPSMonitoring?: boolean;
  className?: string;
}

export default function OptimizedFlowField({
  preset = 'immersive',
  enableFPSMonitoring = true,
  className = '',
}: OptimizedFlowFieldProps) {
  const [fps, setFps] = useState(60);
  const [adaptiveQuality, setAdaptiveQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [isVisible, setIsVisible] = useState(false);

  // Device detection
  const deviceCapabilities = useMemo(() => {
    if (typeof window === 'undefined') return { tier: 'high', isMobile: false };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    const isHighDPI = window.devicePixelRatio > 2;
    const memory = (navigator as any).deviceMemory || 8;

    // Determine device tier
    let tier: 'high' | 'medium' | 'low' = 'high';

    if (isMobile) {
      if (cores <= 4 || memory < 4) tier = 'low';
      else if (cores <= 6 || !isHighDPI) tier = 'medium';
    } else {
      if (cores < 4 || memory < 4) tier = 'medium';
      if (cores < 2) tier = 'low';
    }

    return { tier, isMobile };
  }, []);

  // FPS monitoring
  useEffect(() => {
    if (!enableFPSMonitoring) return;

    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const measuredFPS = frameCount;
        setFps(measuredFPS);

        // Adaptive quality based on FPS
        if (measuredFPS < 30) {
          setAdaptiveQuality('low');
        } else if (measuredFPS < 45) {
          setAdaptiveQuality('medium');
        } else {
          setAdaptiveQuality('high');
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const rafId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(rafId);
  }, [enableFPSMonitoring]);

  // Fade-in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Preset configurations
  const presetConfigs = useMemo(() => {
    const base = {
      immersive: {
        particleCount: 35000,
        layerCount: 3,
        opacity: 0.09,
        speed: 0.6,
        flowIntensity: 1.2,
        bloomIntensity: 0.6,
        bloomThreshold: 0.65,
        turbulenceIntensity: 1.1,
        colorMode: 'velocity' as const,
        staticColor: undefined,
        mouseMode: 'both' as const,
        mouseInfluence: 220,
        showConnections: true,
        enableScrollFlow: true,
        enableClickExplosions: true,
      },
      elegant: {
        particleCount: 20000,
        layerCount: 3,
        opacity: 0.06,
        speed: 0.4,
        flowIntensity: 0.8,
        bloomIntensity: 0.4,
        bloomThreshold: 0.75,
        turbulenceIntensity: 0.6,
        colorMode: 'static' as const,
        staticColor: '#E0E7FF',
        mouseMode: 'repulsion' as const,
        mouseInfluence: 180,
        showConnections: false,
        enableScrollFlow: true,
        enableClickExplosions: false,
      },
      performance: {
        particleCount: 15000,
        layerCount: 2,
        opacity: 0.05,
        speed: 0.5,
        flowIntensity: 1.0,
        bloomIntensity: 0.3,
        bloomThreshold: 0.8,
        turbulenceIntensity: 0.8,
        colorMode: 'velocity' as const,
        staticColor: undefined,
        mouseMode: 'both' as const,
        mouseInfluence: 200,
        showConnections: false,
        enableScrollFlow: true,
        enableClickExplosions: true,
      },
    };

    return base;
  }, []);

  // Adaptive particle count based on device tier and adaptive quality
  const adaptiveParticleCount = useMemo(() => {
    const config = presetConfigs[preset];
    let count = config.particleCount;

    // Adjust for device tier
    if (deviceCapabilities.tier === 'medium') {
      count = Math.floor(count * 0.6);
    } else if (deviceCapabilities.tier === 'low') {
      count = Math.floor(count * 0.3);
    }

    // Further adjust for runtime quality
    if (adaptiveQuality === 'medium') {
      count = Math.floor(count * 0.8);
    } else if (adaptiveQuality === 'low') {
      count = Math.floor(count * 0.5);
    }

    // Mobile optimization
    if (deviceCapabilities.isMobile) {
      count = Math.floor(count * 0.4);
    }

    return Math.max(count, 3000); // Minimum 3k particles
  }, [preset, deviceCapabilities, adaptiveQuality, presetConfigs]);

  // Adaptive layer count
  const adaptiveLayerCount = useMemo(() => {
    const config = presetConfigs[preset];
    let layers = config.layerCount;

    if (adaptiveQuality === 'low' || deviceCapabilities.tier === 'low') {
      layers = 1;
    } else if (adaptiveQuality === 'medium' || deviceCapabilities.tier === 'medium') {
      layers = Math.min(layers, 2);
    }

    return layers;
  }, [preset, adaptiveQuality, deviceCapabilities, presetConfigs]);

  // Adaptive bloom
  const adaptiveBloom = useMemo(() => {
    const config = presetConfigs[preset];

    if (adaptiveQuality === 'low' || deviceCapabilities.tier === 'low') {
      return { intensity: 0, threshold: 1.0 };
    }

    if (adaptiveQuality === 'medium') {
      return {
        intensity: config.bloomIntensity * 0.7,
        threshold: config.bloomThreshold * 1.1,
      };
    }

    return {
      intensity: config.bloomIntensity,
      threshold: config.bloomThreshold,
    };
  }, [preset, adaptiveQuality, deviceCapabilities, presetConfigs]);

  const config = presetConfigs[preset];

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
      }}
    >
      <GPGPUFlowFieldEnhanced
        particleCount={adaptiveParticleCount}
        layerCount={adaptiveLayerCount}
        opacity={config.opacity}
        speed={config.speed}
        flowIntensity={config.flowIntensity}
        mouseMode={config.mouseMode}
        mouseInfluence={config.mouseInfluence}
        bloomIntensity={adaptiveBloom.intensity}
        bloomThreshold={adaptiveBloom.threshold}
        showTrails={false}
        showConnections={config.showConnections}
        connectionDistance={100}
        turbulenceIntensity={config.turbulenceIntensity}
        colorMode={config.colorMode}
        staticColor={config.staticColor || '#ffffff'}
        narrativeAct={null}
        contentType="transition"
        enableScrollFlow={config.enableScrollFlow}
        enableClickExplosions={config.enableClickExplosions}
      />

      {/* FPS Debug Display (optional - remove for production) */}
      {enableFPSMonitoring && process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            zIndex: 9999,
            padding: '0.5rem 1rem',
            background: 'rgba(0,0,0,0.8)',
            color: fps >= 55 ? '#4ade80' : fps >= 30 ? '#fbbf24' : '#ef4444',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            pointerEvents: 'none',
          }}
        >
          {fps} FPS | {adaptiveParticleCount.toLocaleString()} particles | Quality: {adaptiveQuality}
        </div>
      )}
    </div>
  );
}

// Export preset options for easy access
export { type Preset };
