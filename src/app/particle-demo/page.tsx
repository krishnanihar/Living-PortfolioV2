'use client';

import React, { useState, useEffect } from 'react';
import GPGPUFlowFieldEnhanced from '@/components/effects/GPGPUFlowFieldEnhanced';

type Preset = 'minimal' | 'balanced' | 'cinematic' | 'chaotic' | 'zen' | 'custom';
type NarrativeAct = 'seduction' | 'complication' | 'resolution' | null;
type ColorMode = 'velocity' | 'narrative' | 'static';
type MouseMode = 'attraction' | 'repulsion' | 'both';

interface PresetConfig {
  particleCount: number;
  layerCount: number;
  opacity: number;
  speed: number;
  flowIntensity: number;
  bloomIntensity: number;
  bloomThreshold: number;
  turbulenceIntensity: number;
  showTrails: boolean;
  showConnections: boolean;
}

const PRESETS: Record<Preset, PresetConfig | null> = {
  minimal: {
    particleCount: 8000,
    layerCount: 1,
    opacity: 0.04,
    speed: 0.3,
    flowIntensity: 0.5,
    bloomIntensity: 0.2,
    bloomThreshold: 0.9,
    turbulenceIntensity: 0.3,
    showTrails: false,
    showConnections: false,
  },
  balanced: {
    particleCount: 30000,
    layerCount: 3,
    opacity: 0.08,
    speed: 0.5,
    flowIntensity: 1.0,
    bloomIntensity: 0.5,
    bloomThreshold: 0.7,
    turbulenceIntensity: 1.0,
    showTrails: false,
    showConnections: true,
  },
  cinematic: {
    particleCount: 60000,
    layerCount: 4,
    opacity: 0.12,
    speed: 0.7,
    flowIntensity: 1.5,
    bloomIntensity: 0.8,
    bloomThreshold: 0.5,
    turbulenceIntensity: 1.2,
    showTrails: true,
    showConnections: true,
  },
  chaotic: {
    particleCount: 50000,
    layerCount: 3,
    opacity: 0.15,
    speed: 1.2,
    flowIntensity: 2.5,
    bloomIntensity: 1.0,
    bloomThreshold: 0.4,
    turbulenceIntensity: 2.0,
    showTrails: true,
    showConnections: false,
  },
  zen: {
    particleCount: 15000,
    layerCount: 2,
    opacity: 0.05,
    speed: 0.2,
    flowIntensity: 0.4,
    bloomIntensity: 0.3,
    bloomThreshold: 0.8,
    turbulenceIntensity: 0.2,
    showTrails: false,
    showConnections: true,
  },
  custom: null,
};

export default function ParticleDemoPage() {
  // Preset selection
  const [selectedPreset, setSelectedPreset] = useState<Preset>('balanced');

  // Core settings
  const [particleCount, setParticleCount] = useState(30000);
  const [layerCount, setLayerCount] = useState(3);
  const [opacity, setOpacity] = useState(0.08);
  const [speed, setSpeed] = useState(0.5);
  const [flowIntensity, setFlowIntensity] = useState(1.0);

  // Visual effects
  const [bloomIntensity, setBloomIntensity] = useState(0.5);
  const [bloomThreshold, setBloomThreshold] = useState(0.7);
  const [showTrails, setShowTrails] = useState(false);
  const [showConnections, setShowConnections] = useState(true);
  const [connectionDistance, setConnectionDistance] = useState(100);

  // Interaction settings
  const [mouseMode, setMouseMode] = useState<MouseMode>('both');
  const [mouseInfluence, setMouseInfluence] = useState(200);
  const [turbulenceIntensity, setTurbulenceIntensity] = useState(1.0);
  const [enableScrollFlow, setEnableScrollFlow] = useState(true);
  const [enableClickExplosions, setEnableClickExplosions] = useState(true);

  // Color & narrative
  const [colorMode, setColorMode] = useState<ColorMode>('velocity');
  const [staticColor, setStaticColor] = useState('#ffffff');
  const [narrativeAct, setNarrativeAct] = useState<NarrativeAct>(null);
  const [contentType, setContentType] = useState<'transition' | 'content'>('transition');

  // Performance monitoring
  const [fps, setFps] = useState(60);

  // Apply preset
  const applyPreset = (preset: Preset) => {
    const config = PRESETS[preset];
    if (config) {
      setParticleCount(config.particleCount);
      setLayerCount(config.layerCount);
      setOpacity(config.opacity);
      setSpeed(config.speed);
      setFlowIntensity(config.flowIntensity);
      setBloomIntensity(config.bloomIntensity);
      setBloomThreshold(config.bloomThreshold);
      setTurbulenceIntensity(config.turbulenceIntensity);
      setShowTrails(config.showTrails);
      setShowConnections(config.showConnections);
    }
    setSelectedPreset(preset);
  };

  // Mark as custom when manually adjusting
  const markAsCustom = () => {
    if (selectedPreset !== 'custom') {
      setSelectedPreset('custom');
    }
  };

  // FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const rafId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Enhanced GPGPU Flow Field */}
      <GPGPUFlowFieldEnhanced
        particleCount={particleCount}
        layerCount={layerCount}
        opacity={opacity}
        speed={speed}
        flowIntensity={flowIntensity}
        mouseMode={mouseMode}
        mouseInfluence={mouseInfluence}
        bloomIntensity={bloomIntensity}
        bloomThreshold={bloomThreshold}
        showTrails={showTrails}
        showConnections={showConnections}
        connectionDistance={connectionDistance}
        turbulenceIntensity={turbulenceIntensity}
        colorMode={colorMode}
        staticColor={staticColor}
        narrativeAct={narrativeAct}
        contentType={contentType}
        enableScrollFlow={enableScrollFlow}
        enableClickExplosions={enableClickExplosions}
      />

      {/* Control Panel */}
      <div className="relative z-10 p-4 md:p-8 max-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Ultimate GPGPU Flow Field</h1>
            <p className="text-white/60 text-sm md:text-base">
              Cutting-edge particle system with premium effects and interactions
            </p>
          </div>

          {/* Performance Stats */}
          <div className="mb-6 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/80 text-sm">Performance</span>
                <div className="text-xs text-white/50 mt-1">
                  {particleCount.toLocaleString()} particles × {layerCount} layers
                </div>
              </div>
              <span
                className={`text-2xl font-mono font-bold ${
                  fps >= 55 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'
                }`}
              >
                {fps} FPS
              </span>
            </div>
          </div>

          {/* Preset Selection */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Visual Presets</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {(['minimal', 'balanced', 'cinematic', 'chaotic', 'zen', 'custom'] as Preset[]).map((preset) => (
                <button
                  key={preset}
                  onClick={() => applyPreset(preset)}
                  disabled={preset === 'custom'}
                  className={`p-4 rounded-xl border-2 transition-all text-sm ${
                    selectedPreset === preset
                      ? 'bg-white/10 border-[#DA0E29]'
                      : preset === 'custom'
                      ? 'bg-white/5 border-white/10 opacity-50 cursor-default'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="font-semibold capitalize">{preset}</div>
                  <div className="text-xs text-white/50 mt-1">
                    {preset === 'minimal' && 'Subtle & light'}
                    {preset === 'balanced' && 'Recommended'}
                    {preset === 'cinematic' && 'Maximum impact'}
                    {preset === 'chaotic' && 'Intense energy'}
                    {preset === 'zen' && 'Calm & peaceful'}
                    {preset === 'custom' && 'Your settings'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Core Settings */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Core Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Particle Count: {particleCount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={particleCount}
                    onChange={(e) => {
                      setParticleCount(Number(e.target.value));
                      markAsCustom();
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">Depth Layers: {layerCount}</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={layerCount}
                    onChange={(e) => {
                      setLayerCount(Number(e.target.value));
                      markAsCustom();
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Opacity: {(opacity * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.01"
                    max="0.3"
                    step="0.01"
                    value={opacity}
                    onChange={(e) => {
                      setOpacity(Number(e.target.value));
                      markAsCustom();
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">Speed: {speed.toFixed(1)}x</label>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => {
                      setSpeed(Number(e.target.value));
                      markAsCustom();
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Flow Intensity: {flowIntensity.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={flowIntensity}
                    onChange={(e) => {
                      setFlowIntensity(Number(e.target.value));
                      markAsCustom();
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Visual Effects */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Visual Effects</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Bloom Intensity: {bloomIntensity.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2.0"
                    step="0.1"
                    value={bloomIntensity}
                    onChange={(e) => {
                      setBloomIntensity(Number(e.target.value));
                      markAsCustom();
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Bloom Threshold: {bloomThreshold.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1.0"
                    step="0.1"
                    value={bloomThreshold}
                    onChange={(e) => {
                      setBloomThreshold(Number(e.target.value));
                      markAsCustom();
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Turbulence: {turbulenceIntensity.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3.0"
                    step="0.1"
                    value={turbulenceIntensity}
                    onChange={(e) => {
                      setTurbulenceIntensity(Number(e.target.value));
                      markAsCustom();
                    }}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Particle Trails</span>
                  <button
                    onClick={() => {
                      setShowTrails(!showTrails);
                      markAsCustom();
                    }}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      showTrails
                        ? 'bg-[#DA0E29] text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {showTrails ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Connection Lines</span>
                  <button
                    onClick={() => {
                      setShowConnections(!showConnections);
                      markAsCustom();
                    }}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      showConnections
                        ? 'bg-[#DA0E29] text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {showConnections ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>

            {/* Interaction Settings */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Interaction</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Mouse Behavior</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['attraction', 'repulsion', 'both'] as MouseMode[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setMouseMode(mode)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          mouseMode === mode
                            ? 'bg-white/20 border-2 border-white/40'
                            : 'bg-white/5 border-2 border-white/10'
                        }`}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Mouse Influence: {mouseInfluence}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="400"
                    step="10"
                    value={mouseInfluence}
                    onChange={(e) => setMouseInfluence(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Scroll-Driven Flow</span>
                  <button
                    onClick={() => setEnableScrollFlow(!enableScrollFlow)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      enableScrollFlow
                        ? 'bg-[#DA0E29] text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {enableScrollFlow ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Click Explosions</span>
                  <button
                    onClick={() => setEnableClickExplosions(!enableClickExplosions)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      enableClickExplosions
                        ? 'bg-[#DA0E29] text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {enableClickExplosions ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>

            {/* Color & Narrative */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Color & Narrative</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Color Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['velocity', 'narrative', 'static'] as ColorMode[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setColorMode(mode)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          colorMode === mode
                            ? 'bg-white/20 border-2 border-white/40'
                            : 'bg-white/5 border-2 border-white/10'
                        }`}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {colorMode === 'static' && (
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Static Color</label>
                    <input
                      type="color"
                      value={staticColor}
                      onChange={(e) => setStaticColor(e.target.value)}
                      className="w-full h-12 rounded-lg"
                    />
                  </div>
                )}

                {colorMode === 'narrative' && (
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Narrative Act</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setNarrativeAct(null)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          narrativeAct === null
                            ? 'bg-white/20 border-2 border-white/40'
                            : 'bg-white/5 border-2 border-white/10'
                        }`}
                      >
                        Default
                      </button>
                      <button
                        onClick={() => setNarrativeAct('seduction')}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          narrativeAct === 'seduction'
                            ? 'bg-purple-500/20 border-2 border-purple-500/60'
                            : 'bg-white/5 border-2 border-white/10'
                        }`}
                      >
                        Seduction
                      </button>
                      <button
                        onClick={() => setNarrativeAct('complication')}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          narrativeAct === 'complication'
                            ? 'bg-red-500/20 border-2 border-red-500/60'
                            : 'bg-white/5 border-2 border-white/10'
                        }`}
                      >
                        Complication
                      </button>
                      <button
                        onClick={() => setNarrativeAct('resolution')}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          narrativeAct === 'resolution'
                            ? 'bg-blue-500/20 border-2 border-blue-500/60'
                            : 'bg-white/5 border-2 border-white/10'
                        }`}
                      >
                        Resolution
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-white/80 mb-2">Content Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setContentType('transition')}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        contentType === 'transition'
                          ? 'bg-white/20 border-2 border-white/40'
                          : 'bg-white/5 border-2 border-white/10'
                      }`}
                    >
                      Transition (100%)
                    </button>
                    <button
                      onClick={() => setContentType('content')}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        contentType === 'content'
                          ? 'bg-white/20 border-2 border-white/40'
                          : 'bg-white/5 border-2 border-white/10'
                      }`}
                    >
                      Content (30%)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature List */}
          <div className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-semibold mb-3">Premium Features Active</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span>Multi-layer depth ({layerCount}x)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${bloomIntensity > 0 ? 'bg-green-400' : 'bg-white/20'}`} />
                <span>Post-processing bloom</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${colorMode === 'velocity' ? 'bg-green-400' : 'bg-white/20'}`} />
                <span>Velocity colors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${showTrails ? 'bg-green-400' : 'bg-white/20'}`} />
                <span>Particle trails</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${showConnections ? 'bg-green-400' : 'bg-white/20'}`} />
                <span>Connection lines</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${turbulenceIntensity > 0 ? 'bg-green-400' : 'bg-white/20'}`} />
                <span>Turbulence vortices</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${mouseMode ? 'bg-green-400' : 'bg-white/20'}`} />
                <span>Dual mouse behavior</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${enableScrollFlow ? 'bg-green-400' : 'bg-white/20'}`} />
                <span>Scroll-driven flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${enableClickExplosions ? 'bg-green-400' : 'bg-white/20'}`} />
                <span>Click explosions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${colorMode === 'narrative' ? 'bg-green-400' : 'bg-white/20'}`} />
                <span>Narrative integration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span>Content-aware opacity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span>Adaptive performance</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-semibold mb-3">Interaction Guide</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-[#DA0E29] mt-1">•</span>
                <span><strong>Move mouse</strong> to see attraction/repulsion effects on particles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DA0E29] mt-1">•</span>
                <span><strong>Click anywhere</strong> to create particle explosions (if enabled)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DA0E29] mt-1">•</span>
                <span><strong>Scroll page</strong> to see flow direction change (if enabled)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DA0E29] mt-1">•</span>
                <span><strong>Try presets</strong> for instant visual transformations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DA0E29] mt-1">•</span>
                <span><strong>Velocity color mode</strong>: Slow particles = blue/cool, Fast = pink/warm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
