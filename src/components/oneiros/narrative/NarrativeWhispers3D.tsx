'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { NarrativeAct } from '@/hooks/useDepthProgress';

/**
 * Ambient whispers that float through the palace
 * Subtle narrative hints based on current act
 */

const WHISPERS_BY_ACT: Record<NarrativeAct, string[]> = {
  seduction: [
    'unprecedented insight',
    'perfect recall',
    'lucid control',
    'shared dreams',
    'creative enhancement',
    'infinite memory',
    'dream architecture',
  ],
  complication: [
    'who owns this data?',
    'neural privacy',
    'algorithmic bias',
    'commodification',
    'loss of mystery',
    'surveillance dreams',
    'consent withdrawn',
  ],
  resolution: [
    'what boundaries?',
    'whose consent?',
    'preserve the ineffable',
    'human dignity',
    'technological restraint',
    'dream sovereignty',
    'wake gently',
  ],
};

interface WhisperParticle {
  id: number;
  text: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  opacity: number;
  scale: number;
  phase: number;
}

interface NarrativeWhispers3DProps {
  act?: NarrativeAct;
  primaryColor?: string;
  intensity?: number;
  count?: number;
}

/**
 * 3D Narrative Whispers Component
 * Floating ambient text that drifts through the space
 */
export function NarrativeWhispers3D({
  act = 'seduction',
  primaryColor = '#8B5CF6',
  intensity = 0.5,
  count = 8,
}: NarrativeWhispers3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<WhisperParticle[]>([]);

  // Initialize whisper particles
  const particles = useMemo(() => {
    const whispers = WHISPERS_BY_ACT[act];
    const newParticles: WhisperParticle[] = [];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        text: whispers[i % whispers.length],
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 25,
          Math.random() * 6 + 1,
          (Math.random() - 0.5) * 25
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          Math.random() * 0.2 + 0.1,
          (Math.random() - 0.5) * 0.3
        ),
        opacity: 0,
        scale: 0.8 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = newParticles;
    return newParticles;
  }, [act, count]);

  // Animate whispers
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    particlesRef.current.forEach((particle, i) => {
      // Move upward and drift
      particle.position.add(particle.velocity.clone().multiplyScalar(delta));

      // Wrap around when too high or far
      if (particle.position.y > 8) {
        particle.position.y = -1;
        particle.position.x = (Math.random() - 0.5) * 25;
        particle.position.z = (Math.random() - 0.5) * 25;
        particle.opacity = 0;
      }

      // Fade in/out based on height
      const heightFade = particle.position.y > 0
        ? Math.min(particle.position.y / 2, 1) * (1 - particle.position.y / 8)
        : 0;
      particle.opacity = heightFade * intensity * 0.3;

      // Gentle sway
      const sway = Math.sin(time + particle.phase) * 0.5;
      particle.position.x += sway * delta;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle) => (
        <Text
          key={particle.id}
          position={particle.position}
          fontSize={0.15 * particle.scale}
          color={primaryColor}
          anchorX="center"
          anchorY="middle"
          fillOpacity={particle.opacity}
          letterSpacing={0.1}
          font="/fonts/SpaceGrotesk-Regular.ttf"
        >
          {particle.text}
        </Text>
      ))}
    </group>
  );
}

export default NarrativeWhispers3D;
