'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, PointerLockControls, useTexture, Text } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { PalaceRoom } from './PalaceRoom';
import { ArtworkFrame } from './ArtworkFrame';
import { ARTWORKS } from '@/data/mythos/artworks';

// WASD movement speed
const MOVE_SPEED = 5;
const SPRINT_MULTIPLIER = 1.8;

/**
 * First-person camera controller with WASD movement
 */
function FirstPersonController() {
  const { camera } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const sprint = useRef(false);

  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveForward.current = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveBackward.current = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveLeft.current = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveRight.current = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          sprint.current = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveForward.current = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveBackward.current = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveLeft.current = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveRight.current = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          sprint.current = false;
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const speed = sprint.current ? MOVE_SPEED * SPRINT_MULTIPLIER : MOVE_SPEED;

    // Apply damping
    velocity.current.x -= velocity.current.x * 8.0 * delta;
    velocity.current.z -= velocity.current.z * 8.0 * delta;

    // Calculate movement direction
    direction.current.z = Number(moveForward.current) - Number(moveBackward.current);
    direction.current.x = Number(moveRight.current) - Number(moveLeft.current);
    direction.current.normalize();

    // Apply velocity
    if (moveForward.current || moveBackward.current) {
      velocity.current.z -= direction.current.z * speed * delta;
    }
    if (moveLeft.current || moveRight.current) {
      velocity.current.x -= direction.current.x * speed * delta;
    }

    // Move camera
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(camera.up, forward).normalize();

    camera.position.addScaledVector(forward, -velocity.current.z);
    camera.position.addScaledVector(right, -velocity.current.x);

    // Keep at eye level
    camera.position.y = 1.6;

    // Room boundaries (stay within the gallery)
    camera.position.x = Math.max(-14, Math.min(14, camera.position.x));
    camera.position.z = Math.max(-14, Math.min(14, camera.position.z));
  });

  return null;
}

/**
 * Atmospheric particles floating in the palace
 */
function AtmosphericParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    const time = clock.getElapsedTime();

    particlesRef.current.rotation.y = time * 0.02;
    particlesRef.current.position.y = Math.sin(time * 0.3) * 0.2;
  });

  // Create geometry with buffer attribute
  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Loading screen with dream-like messaging
 */
function LoadingScreen() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '2px solid rgba(139, 92, 246, 0.2)',
          borderTopColor: '#8B5CF6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p
        style={{
          color: 'var(--text-60)',
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: '0.875rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Entering the palace...
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/**
 * Instructions overlay
 */
function InstructionsOverlay({ isLocked }: { isLocked: boolean }) {
  if (isLocked) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
        backdropFilter: 'blur(20px)',
        zIndex: 50,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 2rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 500,
            color: 'var(--text-95)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}
        >
          Welcome to Oneiros Palace
        </h2>
        <p
          style={{
            color: 'var(--text-60)',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          A dream museum where art finds you. Navigate the galleries to discover
          masterworks that resonate with your unconscious.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <kbd style={kbdStyle}>W A S D</kbd>
            <span style={{ color: 'var(--text-50)', fontSize: '0.875rem' }}>Move</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <kbd style={kbdStyle}>Mouse</kbd>
            <span style={{ color: 'var(--text-50)', fontSize: '0.875rem' }}>Look around</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <kbd style={kbdStyle}>Shift</kbd>
            <span style={{ color: 'var(--text-50)', fontSize: '0.875rem' }}>Sprint</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <kbd style={kbdStyle}>Esc</kbd>
            <span style={{ color: 'var(--text-50)', fontSize: '0.875rem' }}>Exit</span>
          </div>
        </div>

        <button
          id="enter-palace-button"
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: 500,
            color: '#fff',
            backgroundColor: '#8B5CF6',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-space-grotesk)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7C3AED';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#8B5CF6';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Enter the Palace
        </button>
      </div>
    </div>
  );
}

const kbdStyle: React.CSSProperties = {
  padding: '0.375rem 0.75rem',
  backgroundColor: 'var(--glass-10)',
  border: '1px solid var(--glass-15)',
  borderRadius: '6px',
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  color: 'var(--text-70)',
};

/**
 * Depth indicator showing current location in the palace
 */
function DepthIndicator({ depth }: { depth: string }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        padding: '0.75rem 1.25rem',
        backgroundColor: 'var(--glass-08)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-10)',
        borderRadius: '12px',
        zIndex: 40,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: '0.75rem',
          color: 'var(--text-40)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.25rem',
        }}
      >
        Current Depth
      </p>
      <p
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: '1rem',
          color: '#8B5CF6',
          fontWeight: 500,
        }}
      >
        {depth}
      </p>
    </div>
  );
}

/**
 * The 3D scene content
 */
function SceneContent() {
  // Select 6 artworks for the gallery walls
  const galleryArtworks = ARTWORKS.slice(0, 6);

  return (
    <>
      {/* Lighting - increased for visibility */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#8B5CF6" />
      <pointLight position={[0, 3, 5]} intensity={1} color="#FFFFFF" />
      <pointLight position={[0, 3, -5]} intensity={1} color="#FFFFFF" />

      {/* Environment for reflections and ambient lighting */}
      <Environment preset="night" background={false} />

      {/* The palace room */}
      <PalaceRoom />

      {/* Artwork frames on walls */}
      {/* Left wall artworks */}
      <ArtworkFrame
        position={[-14.9, 2.5, -8]}
        rotation={[0, Math.PI / 2, 0]}
        artwork={galleryArtworks[0]}
        size={[3, 2]}
      />
      <ArtworkFrame
        position={[-14.9, 2.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        artwork={galleryArtworks[1]}
        size={[3, 2]}
      />
      <ArtworkFrame
        position={[-14.9, 2.5, 8]}
        rotation={[0, Math.PI / 2, 0]}
        artwork={galleryArtworks[2]}
        size={[3, 2]}
      />

      {/* Right wall artworks */}
      <ArtworkFrame
        position={[14.9, 2.5, -8]}
        rotation={[0, -Math.PI / 2, 0]}
        artwork={galleryArtworks[3]}
        size={[3, 2]}
      />
      <ArtworkFrame
        position={[14.9, 2.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        artwork={galleryArtworks[4]}
        size={[3, 2]}
      />
      <ArtworkFrame
        position={[14.9, 2.5, 8]}
        rotation={[0, -Math.PI / 2, 0]}
        artwork={galleryArtworks[5]}
        size={[3, 2]}
      />

      {/* Atmospheric particles */}
      <AtmosphericParticles />

      {/* First-person controller */}
      <FirstPersonController />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette darkness={0.5} offset={0.3} />
      </EffectComposer>
    </>
  );
}

/**
 * OneirosScene - Main 3D palace experience
 *
 * A first-person navigable 3D gallery featuring masterworks from
 * the Mythos database. Part of the Oneiros Palace dream museum concept.
 *
 * Features:
 * - First-person WASD + mouse navigation
 * - Gallery room with artwork frames
 * - Atmospheric particles and lighting
 * - Post-processing (bloom, vignette)
 * - Instructions overlay
 */
export function OneirosScene() {
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Listen for pointer lock changes
  useEffect(() => {
    const handleLockChange = () => {
      setIsLocked(document.pointerLockElement !== null);
    };

    document.addEventListener('pointerlockchange', handleLockChange);
    return () => document.removeEventListener('pointerlockchange', handleLockChange);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: '#0A0A0A' }}>
      <Canvas
        camera={{
          position: [0, 1.6, 10],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      >
        {/* PointerLockControls outside Suspense for immediate mounting */}
        <PointerLockControls selector="#enter-palace-button" />
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <InstructionsOverlay isLocked={isLocked} />
      {isLocked && <DepthIndicator depth="N1 — Entrance Gallery" />}

      {/* Crosshair when locked */}
      {isLocked && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 30,
          }}
        />
      )}
    </div>
  );
}

export default OneirosScene;
