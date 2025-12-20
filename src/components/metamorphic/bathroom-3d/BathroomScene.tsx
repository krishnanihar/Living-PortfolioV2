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
 * Orbits around the bathroom model as user scrolls,
 * pulling back to reveal the full exploded view.
 *
 * Active during 0-1.40 progress range (EXPLODE, PAUSE, IMPLODE phases)
 * CameraEntryController takes over at 1.40
 *
 * FIXED: LookAt value at handoff (0.8) matches CameraEntryController start
 */
function CameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  // Initialize to match CameraEntryController's expected start lookAt
  const targetLookAt = useRef(new THREE.Vector3(0, 0.8, 0));

  useFrame(() => {
    const rawProgress = scrollProgress.current;

    // Only active during 0-1.40 range
    // After 1.40, CameraEntryController takes over
    if (rawProgress >= 1.40) return;

    // Clamp progress to 0-1 for orbit calculations (0-1.40 maps to orbit)
    // Progress 0-1 = explosion, 1-1.40 = hold at end position
    const t = Math.min(rawProgress, 1);

    // Camera orbit parameters - dramatic 168° rotation sweep
    const startAngle = Math.PI / 6; // 30 degrees
    const endAngle = Math.PI * 1.1; // 198 degrees (168° rotation)
    const angle = startAngle + (endAngle - startAngle) * t;

    // Pull back as we explode - more dramatic
    const startRadius = 10;
    const endRadius = 18; // Further back for full view
    const radius = startRadius + (endRadius - startRadius) * t;

    // Camera height increases more for better vantage point
    const startHeight = 3;
    const endHeight = 8; // Higher vantage
    const height = startHeight + (endHeight - startHeight) * t;

    // Calculate camera position
    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;
    const targetY = height;

    // Smooth camera movement with consistent lerp factor
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    // Look at center - at t=1, this equals 0.8 to match CameraEntryController start
    targetLookAt.current.y = 0.3 + t * 0.5;
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
 * Extended to support 0-2 progress range:
 * - 0.00-0.86: EXPLODE - Components explode outward
 * - 0.86-1.00: PAUSE - Hold exploded view
 * - 1.00-1.40: IMPLODE - Components return to base
 * - 1.40-1.70: CAMERA_ENTRY - Dolly into bathroom
 * - 1.70-1.90: LIGHTS_FADE - Fade to darkness
 * - 1.90-2.00: INSTALLATION - Mirror glows, transition
 */
export function BathroomScene({ scrollProgress }: BathroomSceneProps) {
  return (
    <group>
      {/* Camera controller - orbit phase (0-1.40) */}
      <CameraRig scrollProgress={scrollProgress} />

      {/* Camera entry controller - dolly into bathroom (1.40-1.70) */}
      <CameraEntryController scrollProgress={scrollProgress} />

      {/* Light fade controller - fade to darkness (1.70-1.90) */}
      <LightFadeController scrollProgress={scrollProgress} />

      {/* Scene lighting */}
      <SceneLighting />

      {/* Ground reference */}
      <GroundPlane />

      {/* Mirror activation effect - glow at the end (1.90-2.00) */}
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
