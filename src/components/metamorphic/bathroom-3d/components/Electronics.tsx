'use client';

import React, { MutableRefObject, useMemo } from 'react';
import * as THREE from 'three';
import { useExplodeAnimation, ExplodeDirections, shouldShowLabel, getLabelDelay } from '../hooks/useExplodeAnimation';
import { WireframeMaterial, EdgeLines } from '../materials/WireframeMaterial';
import { FloatingLabel } from '../annotations/FloatingLabel';

interface ElectronicsProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * Electronics - Arduino, relay module, and cable routing
 *
 * The brain of the installation. Arduino Uno receives encoder input
 * and controls the relay switch for lighting effects.
 */
export function Electronics({ scrollProgress }: ElectronicsProps) {
  // Explosion animation - sixth to explode (0.60-0.74)
  const { groupRef, progress } = useExplodeAnimation(scrollProgress, {
    direction: ExplodeDirections.left,
    distance: 3,
    startAt: 0.60,
    endAt: 0.74,
    easing: 'smoothstep',
    rotation: new THREE.Euler(0, -0.2, 0),
  });

  // Arduino Uno dimensions (scaled)
  const arduinoGeometry = useMemo(() => new THREE.BoxGeometry(0.7, 0.05, 0.55), []);
  const arduinoChipGeometry = useMemo(() => new THREE.BoxGeometry(0.15, 0.03, 0.15), []);
  const usbPortGeometry = useMemo(() => new THREE.BoxGeometry(0.12, 0.06, 0.1), []);

  // Relay module
  const relayBoardGeometry = useMemo(() => new THREE.BoxGeometry(0.5, 0.04, 0.4), []);
  const relayGeometry = useMemo(() => new THREE.BoxGeometry(0.15, 0.12, 0.12), []);

  // Power supply
  const psuGeometry = useMemo(() => new THREE.BoxGeometry(0.4, 0.15, 0.25), []);

  // Cables
  const createCable = (points: THREE.Vector3[]) => {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 20, 0.012, 8, false);
  };

  const cable1 = useMemo(() => createCable([
    new THREE.Vector3(0, 0, 0.2),
    new THREE.Vector3(0.2, 0.1, 0.3),
    new THREE.Vector3(0.4, 0.05, 0.2),
    new THREE.Vector3(0.5, 0, 0),
  ]), []);

  const cable2 = useMemo(() => createCable([
    new THREE.Vector3(0.5, -0.1, 0),
    new THREE.Vector3(0.4, -0.2, -0.1),
    new THREE.Vector3(0.2, -0.25, -0.15),
    new THREE.Vector3(0, -0.2, -0.1),
  ]), []);

  const cable3 = useMemo(() => createCable([
    new THREE.Vector3(-0.35, 0, 0),
    new THREE.Vector3(-0.5, 0.1, 0.1),
    new THREE.Vector3(-0.7, 0.15, 0.2),
    new THREE.Vector3(-0.9, 0.1, 0.25),
  ]), []);

  const arduinoColor = '#0ea5e9'; // Blue for Arduino
  const relayColor = '#f97316'; // Orange for relay
  const psuColor = '#64748b'; // Slate for PSU
  const cableColors = ['#ef4444', '#22c55e', '#eab308']; // Red, green, yellow

  return (
    <group ref={groupRef} position={[-1.2, -0.5, 0]}>
      {/* Arduino Uno */}
      <group position={[0, 0, 0]}>
        {/* Board */}
        <mesh geometry={arduinoGeometry}>
          <WireframeMaterial color={arduinoColor} opacity={0.15} />
        </mesh>
        <EdgeLines geometry={arduinoGeometry} color={arduinoColor} opacity={0.8} />

        {/* Main chip */}
        <mesh geometry={arduinoChipGeometry} position={[0, 0.04, 0]}>
          <meshBasicMaterial color="#1e1e1e" />
        </mesh>

        {/* USB port */}
        <mesh geometry={usbPortGeometry} position={[-0.35, 0.03, 0]}>
          <meshStandardMaterial color="#a1a1aa" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Pin headers (represented as lines) */}
        {[-0.2, -0.1, 0, 0.1, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0.04, 0.22]}>
            <boxGeometry args={[0.02, 0.06, 0.02]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        ))}

        {/* LED indicators */}
        <mesh position={[0.25, 0.035, -0.15]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <mesh position={[0.2, 0.035, -0.15]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Relay Module */}
      <group position={[0.5, -0.2, 0]}>
        {/* Board */}
        <mesh geometry={relayBoardGeometry}>
          <WireframeMaterial color={relayColor} opacity={0.12} />
        </mesh>
        <EdgeLines geometry={relayBoardGeometry} color={relayColor} opacity={0.7} />

        {/* Relay component */}
        <mesh geometry={relayGeometry} position={[0, 0.08, 0]}>
          <WireframeMaterial color="#2563eb" opacity={0.2} />
        </mesh>
        <EdgeLines geometry={relayGeometry} color="#2563eb" opacity={0.8} />

        {/* Screw terminals */}
        {[-0.15, 0, 0.15].map((x, i) => (
          <mesh key={i} position={[x, 0.04, 0.15]}>
            <boxGeometry args={[0.04, 0.04, 0.03]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        ))}
      </group>

      {/* Power Supply */}
      <group position={[0, -0.35, -0.2]}>
        <mesh geometry={psuGeometry}>
          <WireframeMaterial color={psuColor} opacity={0.1} />
        </mesh>
        <EdgeLines geometry={psuGeometry} color={psuColor} opacity={0.6} />

        {/* Vent holes (decorative lines) */}
        {[0.13, 0.08, 0.03, -0.02].map((z, i) => (
          <line key={i}>
            <bufferGeometry>
              <float32BufferAttribute
                attach="attributes-position"
                args={[new Float32Array([-0.15, 0.08, z, 0.15, 0.08, z]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#475569" />
          </line>
        ))}
      </group>

      {/* Cables */}
      <mesh geometry={cable1}>
        <meshBasicMaterial color={cableColors[0]} transparent opacity={0.8} />
      </mesh>
      <mesh geometry={cable2}>
        <meshBasicMaterial color={cableColors[1]} transparent opacity={0.8} />
      </mesh>
      <mesh geometry={cable3}>
        <meshBasicMaterial color={cableColors[2]} transparent opacity={0.8} />
      </mesh>

      {/* Floating labels */}
      <FloatingLabel
        text="Arduino Uno"
        subtext="Microcontroller"
        position={[-0.8, 0.2, 0]}
        side="left"
        visible={shouldShowLabel(progress.current, 0.4)}
        delay={getLabelDelay(7)}
      />

      <FloatingLabel
        text="Relay Module"
        subtext="Lighting Control"
        position={[0.9, -0.1, 0]}
        side="right"
        visible={shouldShowLabel(progress.current, 0.45)}
        delay={getLabelDelay(8)}
      />

      <FloatingLabel
        text="Power Supply"
        subtext="12V DC"
        position={[-0.6, -0.35, -0.2]}
        side="left"
        visible={shouldShowLabel(progress.current, 0.5)}
        delay={getLabelDelay(9)}
      />
    </group>
  );
}

export default Electronics;
