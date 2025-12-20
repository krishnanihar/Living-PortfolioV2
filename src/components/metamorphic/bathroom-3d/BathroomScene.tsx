'use client';

import React, { useRef, MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Import bathroom components
import { OuterShell } from './components/OuterShell';
import { MetalFrame } from './components/MetalFrame';
import { MirrorAssembly } from './components/MirrorAssembly';
import { SinkBasin } from './components/SinkBasin';
import { TapWithEncoder } from './components/TapWithEncoder';
import { Electronics } from './components/Electronics';
import { Lighting } from './components/Lighting';

// Import controllers for continuation sequence (1.40-2.00)
import { CameraEntryController } from './controllers/CameraEntryController';
import { LightFadeController } from './controllers/LightFadeController';
import { MirrorActivationEffect } from './effects/MirrorActivationEffect';

interface CameraRigProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * CameraRig - Controls camera position based on scroll
 *
 * Phase 1 (0-1.0): Full 360° orbit during explosion
 * Phase 2 (1.0-1.5): Additional 180° orbit during implosion
 *
 * After 1.5, CameraZoomController takes over for dolly into mirror
 *
 * Total rotation: 540° (360° + 180°)
 */
function CameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 0.8, 0));

  useFrame(() => {
    const progress = scrollProgress.current;

    // Only active during 0-1.5 range
    // After 1.5, CameraZoomController takes over
    if (progress >= 1.5) return;

    let angle: number;
    let radius: number;
    let height: number;
    let lookAtY: number;

    if (progress <= 1.0) {
      // PHASE 1: EXPLODE - Full 360° orbit (0-1.0)
      const t = progress;
      const startAngle = Math.PI / 6;           // 30°
      const endAngle = startAngle + Math.PI * 2; // 30° + 360° = 390°
      angle = startAngle + (endAngle - startAngle) * t;

      // Pull back as we explode
      const startRadius = 10;
      const endRadius = 18;
      radius = startRadius + (endRadius - startRadius) * t;

      // Camera rises for better vantage
      const startHeight = 3;
      const endHeight = 8;
      height = startHeight + (endHeight - startHeight) * t;

      // Look at center rises slightly
      lookAtY = 0.3 + t * 0.5;
    } else {
      // PHASE 2: IMPLODE - Additional 180° orbit (1.0-1.5)
      const t = (progress - 1.0) / 0.5; // 0 → 1 within this phase
      const startAngle = Math.PI / 6 + Math.PI * 2; // 390° (end of explode)
      const endAngle = startAngle + Math.PI;         // 390° + 180° = 570°
      angle = startAngle + (endAngle - startAngle) * t;

      // Ease back to comfortable viewing distance
      const startRadius = 18;
      const endRadius = 14;
      radius = startRadius + (endRadius - startRadius) * t;

      // Lower height as we settle
      const startHeight = 8;
      const endHeight = 6;
      height = startHeight + (endHeight - startHeight) * t;

      // Look at center stabilizes
      lookAtY = 0.8;
    }

    // Calculate camera position
    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;

    // Smooth camera movement with consistent lerp factor
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, height, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    // Update look-at target
    targetLookAt.current.y = lookAtY;
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

/**
 * SceneLighting - Ambient and accent lighting for the scene
 */
function SceneLighting() {
  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={0.3} />

      {/* Main key light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow={false}
      />

      {/* Fill light (opposite side) */}
      <directionalLight
        position={[-5, 4, -3]}
        intensity={0.4}
        color="#9333ea"
      />

      {/* Accent rim light */}
      <pointLight
        position={[0, 5, -5]}
        intensity={0.6}
        color="#06b6d4"
        distance={15}
        decay={2}
      />

      {/* Ground bounce */}
      <pointLight
        position={[0, -3, 0]}
        intensity={0.2}
        color="#1e1b4b"
        distance={10}
        decay={2}
      />
    </>
  );
}

/**
 * GroundPlane - Subtle grid floor for spatial reference
 */
function GroundPlane() {
  return (
    <group position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Grid lines */}
      <gridHelper
        args={[20, 20, '#9333ea', '#9333ea']}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      />

      {/* Subtle glow plane */}
      <mesh>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial
          color="#9333ea"
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

interface BathroomSceneProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * BathroomScene - Main scene orchestrator
 *
 * Combines all bathroom components and manages the scroll-driven
 * explosion/implosion animation through shared scroll progress state.
 *
 * Extended to support 0-3 progress range:
 * - 0.00-1.00: EXPLODE - Components explode + 360° camera orbit
 * - 1.00-1.50: IMPLODE - Components return + 180° camera orbit
 * - 1.50-2.00: HOLD - Assembled view, orbit ends
 * - 2.00-2.50: ZOOM_ENTRY - Camera dollies into bathroom toward mirror
 * - 2.50-2.80: LIGHTS_FADE - Fade to complete darkness
 * - 2.80-3.00: VIDEO_PLAY - Video texture activates on mirror
 */
export function BathroomScene({ scrollProgress }: BathroomSceneProps) {
  return (
    <group>
      {/* Camera controller - orbit phase (0-1.5) */}
      <CameraRig scrollProgress={scrollProgress} />

      {/* Camera zoom controller - dolly into bathroom (1.5-2.8) */}
      <CameraEntryController scrollProgress={scrollProgress} />

      {/* Light fade controller - fade to darkness (2.5-2.8) */}
      <LightFadeController scrollProgress={scrollProgress} />

      {/* Scene lighting */}
      <SceneLighting />

      {/* Ground reference */}
      <GroundPlane />

      {/* Mirror activation effect - glow before video (2.70-2.85) */}
      <MirrorActivationEffect scrollProgress={scrollProgress} />

      {/* Bathroom assembly */}
      <group position={[0, 0, 0]}>
        {/* Components are rendered in explosion order (first to last) */}
        <OuterShell scrollProgress={scrollProgress} />
        <MetalFrame scrollProgress={scrollProgress} />
        <MirrorAssembly scrollProgress={scrollProgress} />
        <SinkBasin scrollProgress={scrollProgress} />
        <TapWithEncoder scrollProgress={scrollProgress} />
        <Electronics scrollProgress={scrollProgress} />
        <Lighting scrollProgress={scrollProgress} />
      </group>
    </group>
  );
}

export default BathroomScene;
