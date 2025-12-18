'use client';

import React, { MutableRefObject, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useExplodeAnimation, ExplodeDirections, shouldShowLabel, getLabelDelay } from '../hooks/useExplodeAnimation';
import { WireframeMaterial, EdgeLines } from '../materials/WireframeMaterial';
import { FloatingLabel } from '../annotations/FloatingLabel';

interface TapWithEncoderProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * TapWithEncoder - Water tap with embedded rotary encoder
 *
 * The interaction point of the installation. When users turn the tap,
 * a rotary encoder sends signals to trigger the visual experience.
 */
export function TapWithEncoder({ scrollProgress }: TapWithEncoderProps) {
  const knobRef = useRef<THREE.Group>(null);

  // Explosion animation - fifth to explode (0.48-0.62)
  const { groupRef, progress } = useExplodeAnimation(scrollProgress, {
    direction: ExplodeDirections.right,
    distance: 2.5,
    startAt: 0.48,
    endAt: 0.62,
    easing: 'smoothstep',
  });

  // Animate the tap knob rotation when exploding
  useFrame((_, delta) => {
    if (!knobRef.current) return;
    const t = progress.current;
    // Rotate knob as it explodes to show the encoder mechanism
    knobRef.current.rotation.z = t * Math.PI * 2;
  });

  // Tap body (vertical pipe)
  const bodyGeometry = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 0.5, 16), []);

  // Tap spout (curved pipe - simplified as angled cylinder)
  const spoutGeometry = useMemo(() => new THREE.CylinderGeometry(0.035, 0.035, 0.35, 12), []);

  // Tap base (mounting plate)
  const baseGeometry = useMemo(() => new THREE.CylinderGeometry(0.1, 0.12, 0.08, 16), []);

  // Knob geometry
  const knobGeometry = useMemo(() => new THREE.CylinderGeometry(0.08, 0.08, 0.06, 6), []);
  const knobCapGeometry = useMemo(() => new THREE.SphereGeometry(0.04, 12, 8), []);

  // Encoder (internal component)
  const encoderBodyGeometry = useMemo(() => new THREE.CylinderGeometry(0.04, 0.04, 0.08, 16), []);
  const encoderDiscGeometry = useMemo(() => new THREE.CylinderGeometry(0.035, 0.035, 0.01, 32), []);

  // Wire from encoder
  const wireGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.15, 0),
      new THREE.Vector3(-0.1, -0.25, 0.05),
      new THREE.Vector3(-0.2, -0.3, 0.1),
      new THREE.Vector3(-0.4, -0.3, 0.15),
    ]);
    return new THREE.TubeGeometry(curve, 16, 0.008, 8, false);
  }, []);

  const metalColor = '#a1a1aa'; // Zinc/chrome
  const encoderColor = '#22c55e'; // Green for electronics
  const wireColor = '#ef4444'; // Red wire

  return (
    <group ref={groupRef} position={[0.5, -1.3, 0.95]}>
      {/* Tap base/mounting plate */}
      <group position={[0, 0, 0]}>
        <mesh geometry={baseGeometry}>
          <WireframeMaterial color={metalColor} opacity={0.12} />
        </mesh>
        <EdgeLines geometry={baseGeometry} color={metalColor} opacity={0.7} />
      </group>

      {/* Tap body (vertical) */}
      <group position={[0, 0.29, 0]}>
        <mesh geometry={bodyGeometry}>
          <WireframeMaterial color={metalColor} opacity={0.12} />
        </mesh>
        <EdgeLines geometry={bodyGeometry} color={metalColor} opacity={0.7} />
      </group>

      {/* Tap spout (angled) */}
      <group position={[0.08, 0.48, 0.12]} rotation={[Math.PI / 4, 0, 0]}>
        <mesh geometry={spoutGeometry}>
          <WireframeMaterial color={metalColor} opacity={0.12} />
        </mesh>
        <EdgeLines geometry={spoutGeometry} color={metalColor} opacity={0.7} />
      </group>

      {/* Tap knob with encoder */}
      <group ref={knobRef} position={[0, 0.35, 0.12]}>
        {/* Knob exterior */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={knobGeometry}>
            <WireframeMaterial color={metalColor} opacity={0.1} />
          </mesh>
          <EdgeLines geometry={knobGeometry} color={metalColor} opacity={0.6} />
        </group>

        {/* Knob cap */}
        <mesh geometry={knobCapGeometry} position={[0, 0, 0.05]}>
          <meshStandardMaterial color={metalColor} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Rotary encoder (internal - visible when exploded) */}
        <group position={[0, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Encoder body */}
          <mesh geometry={encoderBodyGeometry}>
            <WireframeMaterial color={encoderColor} opacity={0.2} glowIntensity={0.5} />
          </mesh>
          <EdgeLines geometry={encoderBodyGeometry} color={encoderColor} opacity={0.9} />

          {/* Encoder disc with markings */}
          <mesh geometry={encoderDiscGeometry} position={[0, 0.045, 0]}>
            <meshBasicMaterial color={encoderColor} transparent opacity={0.8} />
          </mesh>
        </group>

        {/* Wire coming out of encoder */}
        <mesh geometry={wireGeometry} position={[0, 0, -0.12]}>
          <meshBasicMaterial color={wireColor} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Floating labels - spread vertically to prevent overlap */}
      <FloatingLabel
        text="Water Tap"
        subtext="Chrome Finish"
        position={[0.5, 0.6, 0]}
        side="right"
        visible={shouldShowLabel(progress.current, 0.35)}
        delay={getLabelDelay(5)}
      />

      <FloatingLabel
        text="Rotary Encoder"
        subtext="Position Sensor"
        position={[0.5, -0.1, -0.2]}
        side="right"
        visible={shouldShowLabel(progress.current, 0.45)}
        delay={getLabelDelay(6)}
      />
    </group>
  );
}

export default TapWithEncoder;
