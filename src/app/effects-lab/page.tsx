'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Settings, Waves, Droplets, Split, CircleDot, Move } from 'lucide-react';

// Dynamically import all effect components
const FlowFieldParticles = dynamic(
  () => import('@/components/effects-lab/FlowFieldParticles'),
  { ssr: false, loading: () => <div style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</div> }
);

const FluidSimulation = dynamic(
  () => import('@/components/effects-lab/FluidSimulation'),
  { ssr: false, loading: () => <div style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</div> }
);

const ChromaticAberration = dynamic(
  () => import('@/components/effects-lab/ChromaticAberration'),
  { ssr: false, loading: () => <div style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</div> }
);

const Metaballs = dynamic(
  () => import('@/components/effects-lab/Metaballs'),
  { ssr: false, loading: () => <div style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</div> }
);

const NoiseDistortion = dynamic(
  () => import('@/components/effects-lab/NoiseDistortion'),
  { ssr: false, loading: () => <div style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</div> }
);

type EffectType = 'none' | 'flowfield' | 'fluid' | 'chromatic' | 'metaballs' | 'noise';

const effects = [
  {
    id: 'none' as EffectType,
    name: 'None',
    description: 'Clean canvas',
    icon: Settings,
    color: '#6366F1'
  },
  {
    id: 'flowfield' as EffectType,
    name: 'Flow Field Particles',
    description: '8,000 particles · Perlin noise',
    icon: Waves,
    color: '#8B5CF6'
  },
  {
    id: 'fluid' as EffectType,
    name: 'WebGL Fluid',
    description: 'Physics-accurate simulation',
    icon: Droplets,
    color: '#3B82F6'
  },
  {
    id: 'chromatic' as EffectType,
    name: 'RGB Aberration',
    description: 'Channel split shader',
    icon: Split,
    color: '#EC4899'
  },
  {
    id: 'metaballs' as EffectType,
    name: 'Liquid Blobs',
    description: '12 morphing metaballs',
    icon: CircleDot,
    color: '#F59E0B'
  },
  {
    id: 'noise' as EffectType,
    name: 'Noise Distortion',
    description: 'Simplex noise waves',
    icon: Move,
    color: '#10B981'
  }
];

export default function EffectsLabPage() {
  const [activeEffect, setActiveEffect] = useState<EffectType>('flowfield');
  const [showControls, setShowControls] = useState(true);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0A',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Navigation Header */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.5rem 2rem',
        background: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'color 0.2s ease'
            }}
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.95)',
            letterSpacing: '-0.02em'
          }}>
            Effects Lab · 2024-2025 Collection
          </h1>

          <button
            onClick={() => setShowControls(!showControls)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: showControls ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Settings size={16} />
            {showControls ? 'Hide' : 'Show'} Controls
          </button>
        </div>
      </nav>

      {/* Main Canvas Area */}
      <main style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }}>
        {activeEffect === 'none' && (
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 2rem'
          }}>
            <div style={{
              textAlign: 'center',
              maxWidth: '600px'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 2rem',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Settings size={48} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
              </div>

              <h2 style={{
                fontSize: '2rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                Effects Laboratory
              </h2>

              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                5 cutting-edge visual effects from Awwwards 2024-2025 winners.
                <br />
                Select an effect from the control panel →
              </p>
            </div>
          </div>
        )}

        {activeEffect === 'flowfield' && <FlowFieldParticles />}
        {activeEffect === 'fluid' && <FluidSimulation />}
        {activeEffect === 'chromatic' && <ChromaticAberration />}
        {activeEffect === 'metaballs' && <Metaballs />}
        {activeEffect === 'noise' && <NoiseDistortion />}
      </main>

      {/* Control Panel */}
      {showControls && (
        <aside style={{
          position: 'fixed',
          top: '6rem',
          right: '2rem',
          width: '340px',
          maxHeight: 'calc(100vh - 8rem)',
          overflowY: 'auto',
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          zIndex: 10
        }}>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Select Effect
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {effects.map((effect) => {
              const Icon = effect.icon;
              const isActive = activeEffect === effect.id;

              return (
                <button
                  key={effect.id}
                  onClick={() => setActiveEffect(effect.id)}
                  style={{
                    padding: '1rem',
                    background: isActive
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isActive
                      ? `1px solid ${effect.color}40`
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.875rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: isActive ? `${effect.color}20` : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: `1px solid ${effect.color}30`
                  }}>
                    <Icon size={18} style={{ color: effect.color }} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: '0.125rem' }}>
                      {effect.name}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      {effect.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            <div style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.5
            }}>
              💡 <strong>Research-based:</strong> All effects inspired by Awwwards 2024-2025 winners,
              Codrops tutorials, and Three.js examples. Optimized for 60fps performance.
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
