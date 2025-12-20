'use client';

import React, { MutableRefObject, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useExplodeAnimation, ExplodeDirections, shouldShowLabel, getLabelDelay } from '../hooks/useExplodeAnimation';
import { WireframeMaterial, EdgeLines } from '../materials/WireframeMaterial';
import { FloatingLabel } from '../annotations/FloatingLabel';

interface LightingProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * Lighting - Ambient light fixtures
 *
 * The lighting system that creates the warm bathroom ambiance
 * and flickers during the transformation phase.
 */
export function Lighting({ scrollProgress }: LightingProps) {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const timeRef = useRef(0);

  // Explosion animation - last to explode (0.72-0.86), first to implode (1.00-1.08)
  const { groupRef, progress } = useExplodeAnimation(scrollProgress, {
    direction: new THREE.Vector3(0, 1, 0.3).normalize(),
    distance: 2,
    startAt: 0.72,
    endAt: 0.86,
    easing: 'smoothstep',
    implodeStartAt: 1.00,
    implodeEndAt: 1.08,
  });

  // Subtle light flicker animation
  useFrame((_, delta) => {
    timeRef.current += delta;
    const flicker = Math.sin(timeRef.current * 10) * 0.1 + Math.sin(timeRef.current * 15) * 0.05;

    if (light1Ref.current) {
      light1Ref.current.intensity = 0.8 + flicker;
    }
    if (light2Ref.current) {
      light2Ref.current.intensity = 0.6 + flicker * 0.8;
    }
  });

  // Light fixture housing
  const housingGeometry = useMemo(() => new THREE.CylinderGeometry(0.15, 0.18, 0.08, 16), []);

  // Bulb geometry
  const bulbGeometry = useMemo(() => new THREE.SphereGeometry(0.08, 16, 12), []);

  // Mounting bracket
  const bracketGeometry = useMemo(() => new THREE.BoxGeometry(0.04, 0.15, 0.04), []);

  // Wire to ceiling
  const wireGeometry = useMemo(() => new THREE.CylinderGeometry(0.01, 0.01, 0.4, 8), []);

  const housingColor = '#71717a'; // Gray housing
  const bulbColor = '#fef3c7'; // Warm white/amber bulb

  // Light fixture positions
  const positions: [number, number, number][] = [
    [-0.8, 2.8, 0.5],
    [0.8, 2.8, 0.5],
  ];

  return (
    <group ref={groupRef}>
      {positions.map((pos, index) => (
        <group key={index} position={pos}>
          {/* Wire from ceiling */}
          <group position={[0, 0.2, 0]}>
            <mesh geometry={wireGeometry}>
              <meshBasicMaterial color="#1e1e1e" />
            </mesh>
          </group>

          {/* Mounting bracket */}
          <group position={[0, 0.07, 0]}>
            <mesh geometry={bracketGeometry}>
              <WireframeMaterial color={housingColor} opacity={0.15} />
            </mesh>
            <EdgeLines geometry={bracketGeometry} color={housingColor} opacity={0.6} />
          </group>

          {/* Light housing */}
          <group position={[0, 0, 0]}>
            <mesh geometry={housingGeometry}>
              <WireframeMaterial color={housingColor} opacity={0.12} />
            </mesh>
            <EdgeLines geometry={housingGeometry} color={housingColor} opacity={0.6} />
          </group>

          {/* Bulb */}
          <group position={[0, -0.06, 0]}>
            <mesh geometry={bulbGeometry}>
              <meshBasicMaterial
                color={bulbColor}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* Bulb glow */}
            <mesh geometry={bulbGeometry} scale={1.3}>
              <meshBasicMaterial
                color={bulbColor}
                transparent
                opacity={0.2}
              />
            </mesh>

            {/* Actual light source */}
            <pointLight
              ref={index === 0 ? light1Ref : light2Ref}
              color="#fef3c7"
              intensity={0.8}
              distance={5}
              decay={2}
            />
          </group>
        </group>
      ))}

      {/* Single floating label for lighting system */}
      <FloatingLabel
        text="Ambient Lighting"
        subtext="Relay-Controlled Flicker"
        position={[1.5, 2.8, 0.5]}
        side="right"
        visible={shouldShowLabel(progress.current, 0.45)}
        delay={getLabelDelay(10)}
      />
    </group>
  );
}

export default Lighting;
