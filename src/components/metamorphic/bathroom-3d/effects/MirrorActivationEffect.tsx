'use client';

import { MutableRefObject, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MirrorActivationEffectProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * MirrorActivationEffect - Purple glow emanating from the mirror
 *
 * Active during progress 2.70-2.85
 * Creates an ethereal purple glow that pulses from the mirror,
 * signaling the activation of the Metamorphic installation.
 * Brief glow leads into video reveal at 2.8.
 */

function smoothstep(x: number): number {
  return x * x * (3 - 2 * x);
}

export function MirrorActivationEffect({ scrollProgress }: MirrorActivationEffectProps) {
  const glowRef = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const timeRef = useRef(0);

  // Glow plane geometry - positioned where the mirror is
  const glowGeometry = useMemo(() => new THREE.PlaneGeometry(2.5, 3), []);

  useFrame((_, delta) => {
    const progress = scrollProgress.current;

    // Only active during 2.70-2.85 range (brief glow before video)
    if (progress < 2.70 || progress >= 2.85) {
      // Hide glow when not in range
      if (glowRef.current) glowRef.current.visible = false;
      if (pointLightRef.current) pointLightRef.current.intensity = 0;
      return;
    }

    // Show glow
    if (glowRef.current) glowRef.current.visible = true;

    // Calculate local progress (0-1 within this phase)
    const localProgress = Math.min((progress - 2.70) / 0.15, 1);
    const easedProgress = smoothstep(localProgress);

    // Update time for pulse animation
    timeRef.current += delta;

    // Pulse effect - gentle sine wave
    const pulseIntensity = 0.3 + Math.sin(timeRef.current * 3) * 0.1;

    // Update glow plane opacity
    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = easedProgress * pulseIntensity;
    }

    // Update point light intensity
    if (pointLightRef.current) {
      pointLightRef.current.intensity = easedProgress * 2 * (1 + Math.sin(timeRef.current * 3) * 0.3);
    }
  });

  return (
    <group position={[0, 1.2, 0.9]}>
      {/* Glow plane behind/at mirror position */}
      <mesh
        ref={glowRef}
        geometry={glowGeometry}
        visible={false}
      >
        <meshBasicMaterial
          color="#9333ea"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer glow layer (larger, more diffuse) */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[3.5, 4]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Point light for volumetric feel */}
      <pointLight
        ref={pointLightRef}
        color="#9333ea"
        intensity={0}
        distance={5}
        decay={2}
        position={[0, 0, 0.5]}
      />

      {/* Secondary rim light */}
      <pointLight
        color="#c084fc"
        intensity={0}
        distance={3}
        decay={2}
        position={[0, 1, 0.3]}
      />
    </group>
  );
}

export default MirrorActivationEffect;
