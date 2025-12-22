'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  starVertexShader,
  starFragmentShader,
  nebulaVertexShader,
  nebulaFragmentShader,
  dustVertexShader,
  dustFragmentShader,
} from '@/shaders/journey';

interface DeepSpaceEnvironmentProps {
  starCount?: number;
  dustCount?: number;
  nebulaEnabled?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Star Field Component
 * Creates a spherical distribution of twinkling stars
 */
function StarField({ count = 8000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 500 + Math.random() * 1200;

      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.cos(phi) * radius;

      // Random sizes (smaller = more distant feel)
      sizes[i] = 0.5 + Math.random() * 2.5;

      // Color temperature variation (warm white to cool white)
      const temp = 0.85 + Math.random() * 0.3;
      colors[i * 3] = temp;
      colors[i * 3 + 1] = temp * 0.95;
      colors[i * 3 + 2] = temp * 1.1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
    };
  }, [count]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Nebula Volume Component
 * Creates volumetric fog effects with brand colors
 */
function NebulaVolume({
  position,
  color,
  scale = 1,
  density = 0.3,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  density?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
      uDensity: { value: density },
      uOpacity: { value: 0.15 },
    }),
    [color, density]
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[120, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Ambient Dust Particles
 * Small floating motes near the camera path
 */
function DustParticles({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute along the helix path area
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 2] = Math.random() * -1500 + 200; // Along Z path

      sizes[i] = 0.3 + Math.random() * 0.7;
      speeds[i] = 0.3 + Math.random() * 0.7;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
    };
  }, [count]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={dustVertexShader}
        fragmentShader={dustFragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Deep Space Environment
 * Combines stars, nebulae, and dust for immersive atmosphere
 */
export default function DeepSpaceEnvironment({
  starCount = 8000,
  dustCount = 2000,
  nebulaEnabled = true,
  quality = 'high',
}: DeepSpaceEnvironmentProps) {
  // Adjust counts based on quality
  const adjustedStarCount = quality === 'low' ? 3000 : quality === 'medium' ? 5000 : starCount;
  const adjustedDustCount = quality === 'low' ? 500 : quality === 'medium' ? 1000 : dustCount;

  // Nebula positions and colors (matching brand colors from milestones)
  const nebulae = [
    { position: [-200, 100, -300] as [number, number, number], color: '#6366F1', scale: 1.2 }, // Indigo
    { position: [150, -80, -600] as [number, number, number], color: '#DA0E29', scale: 1.0 }, // Red
    { position: [-100, 50, -900] as [number, number, number], color: '#8B5CF6', scale: 0.8 }, // Purple
  ];

  return (
    <group>
      {/* Star field - always visible */}
      <StarField count={adjustedStarCount} />

      {/* Nebula volumes - optional based on performance */}
      {nebulaEnabled &&
        nebulae.map((nebula, index) => (
          <NebulaVolume
            key={index}
            position={nebula.position}
            color={nebula.color}
            scale={nebula.scale}
            density={0.25}
          />
        ))}

      {/* Dust particles - near camera path */}
      <DustParticles count={adjustedDustCount} />

      {/* Ambient light for overall scene visibility */}
      <ambientLight intensity={0.12} color="#ffffff" />
    </group>
  );
}
