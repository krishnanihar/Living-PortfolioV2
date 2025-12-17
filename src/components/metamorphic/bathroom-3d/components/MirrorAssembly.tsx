'use client';

import React, { MutableRefObject, useMemo } from 'react';
import * as THREE from 'three';
import { useExplodeAnimation, ExplodeDirections, shouldShowLabel, getLabelDelay } from '../hooks/useExplodeAnimation';
import { WireframeMaterial, EdgeLines } from '../materials/WireframeMaterial';
import { FloatingLabel } from '../annotations/FloatingLabel';

interface MirrorAssemblyProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * MirrorAssembly - Two-way mirror with hidden TV display
 *
 * The centerpiece of the installation. A two-way mirror positioned
 * above the sink that conceals a TV display behind it.
 */
export function MirrorAssembly({ scrollProgress }: MirrorAssemblyProps) {
  // Dimensions
  const mirrorWidth = 2;
  const mirrorHeight = 2.5;
  const mirrorDepth = 0.05;
  const tvWidth = 1.8;
  const tvHeight = 2.2;
  const tvDepth = 0.1;
  const gapBehindMirror = 0.15;

  // Explosion animation - third to explode (0.24-0.38)
  const { groupRef, progress } = useExplodeAnimation(scrollProgress, {
    direction: ExplodeDirections.backward,
    distance: 2.5,
    startAt: 0.24,
    endAt: 0.38,
    easing: 'smoothstep',
  });

  const mirrorGeometry = useMemo(() => new THREE.BoxGeometry(mirrorWidth, mirrorHeight, mirrorDepth), []);
  const tvGeometry = useMemo(() => new THREE.BoxGeometry(tvWidth, tvHeight, tvDepth), []);
  const tvScreenGeometry = useMemo(() => new THREE.PlaneGeometry(tvWidth - 0.1, tvHeight - 0.1), []);
  const frameGeometry = useMemo(() => {
    // Create a frame around the mirror
    const shape = new THREE.Shape();
    const frameWidth = 0.1;
    const w = mirrorWidth / 2 + frameWidth;
    const h = mirrorHeight / 2 + frameWidth;
    shape.moveTo(-w, -h);
    shape.lineTo(w, -h);
    shape.lineTo(w, h);
    shape.lineTo(-w, h);
    shape.lineTo(-w, -h);

    // Inner cutout
    const hole = new THREE.Path();
    const iw = mirrorWidth / 2;
    const ih = mirrorHeight / 2;
    hole.moveTo(-iw, -ih);
    hole.lineTo(iw, -ih);
    hole.lineTo(iw, ih);
    hole.lineTo(-iw, ih);
    hole.lineTo(-iw, -ih);
    shape.holes.push(hole);

    return new THREE.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: false });
  }, [mirrorWidth, mirrorHeight]);

  const mirrorColor = '#c084fc'; // Light purple
  const tvColor = '#1e1e1e'; // Dark for TV
  const screenColor = '#9333ea'; // Purple glow for screen

  return (
    <group ref={groupRef} position={[0, 1.2, 1]}>
      {/* Two-way mirror surface */}
      <group position={[0, 0, 0]}>
        {/* Mirror frame */}
        <mesh geometry={frameGeometry} rotation={[0, 0, 0]} position={[0, 0, mirrorDepth / 2]}>
          <meshStandardMaterial
            color="#4a4a4a"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Mirror glass */}
        <mesh geometry={mirrorGeometry}>
          <meshStandardMaterial
            color={mirrorColor}
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={0.4}
            envMapIntensity={1.5}
          />
        </mesh>
        <EdgeLines geometry={mirrorGeometry} color={mirrorColor} opacity={0.8} />
      </group>

      {/* Hidden TV display behind mirror */}
      <group position={[0, 0, -gapBehindMirror - tvDepth / 2]}>
        {/* TV housing */}
        <mesh geometry={tvGeometry}>
          <WireframeMaterial color={tvColor} opacity={0.15} />
        </mesh>
        <EdgeLines geometry={tvGeometry} color="#666" opacity={0.6} />

        {/* TV screen (glowing) */}
        <mesh geometry={tvScreenGeometry} position={[0, 0, tvDepth / 2 + 0.01]}>
          <meshBasicMaterial
            color={screenColor}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Screen glow effect */}
        <pointLight
          position={[0, 0, tvDepth / 2 + 0.1]}
          color={screenColor}
          intensity={0.5}
          distance={2}
          decay={2}
        />
      </group>

      {/* Floating labels */}
      <FloatingLabel
        text="Two-Way Mirror"
        subtext="Reflective Surface"
        position={[mirrorWidth / 2 + 1.2, mirrorHeight / 4, 0]}
        side="right"
        visible={shouldShowLabel(progress.current, 0.3)}
        delay={getLabelDelay(2)}
      />

      <FloatingLabel
        text="Hidden Display"
        subtext="32&quot; TV Screen"
        position={[-mirrorWidth / 2 - 1.2, 0, -gapBehindMirror]}
        side="left"
        visible={shouldShowLabel(progress.current, 0.35)}
        delay={getLabelDelay(3)}
      />
    </group>
  );
}

export default MirrorAssembly;
