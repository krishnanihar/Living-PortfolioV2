'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

interface DreamyGPGPUParticlesProps {
  particleCount?: number;
  opacity?: number;
  speed?: number;
  bloomIntensity?: number;
  mouseInfluence?: number;
  className?: string;
}

// Vertex shader for dreamy particle rendering
const dreamyVertexShader = `
  uniform float uTime;
  uniform float uSize;

  attribute vec3 velocity;
  attribute float lifetime;
  attribute float randomOffset;

  varying float vLifetime;
  varying vec3 vVelocity;
  varying float vRandomOffset;

  void main() {
    vLifetime = lifetime;
    vVelocity = velocity;
    vRandomOffset = randomOffset;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Depth-based size attenuation
    float distanceScale = 400.0 / -mvPosition.z;

    // Dreamy shimmer based on velocity and lifetime
    float speed = length(velocity);
    float shimmer = sin(uTime * 2.0 + randomOffset * 6.28) * 0.3 + 0.7;
    float sizeMultiplier = 1.0 + speed * 0.8 + shimmer * 0.4;

    gl_PointSize = uSize * distanceScale * sizeMultiplier * (0.5 + lifetime * 0.5);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader for golden glow particles
const dreamyFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;

  varying float vLifetime;
  varying vec3 vVelocity;
  varying float vRandomOffset;

  void main() {
    // Circular particle shape with soft edge
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) discard;

    // Ultra-soft edge falloff for dreamy effect
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = pow(alpha, 3.0); // Cubic falloff for extra softness

    // Golden color palette with velocity-based variation
    // Base: Warm gold RGB(206, 165, 61) #CDA53D
    float speed = length(vVelocity);

    // Color shifts from pale gold to rich gold based on speed
    vec3 paleGold = vec3(0.95, 0.88, 0.65);   // Slow particles
    vec3 richGold = vec3(0.81, 0.65, 0.24);   // Fast particles
    vec3 warmAccent = vec3(1.0, 0.78, 0.50);  // Very fast particles

    vec3 baseColor;
    if (speed > 0.15) {
      baseColor = mix(richGold, warmAccent, (speed - 0.15) * 3.0);
    } else {
      baseColor = mix(paleGold, richGold, speed * 6.66);
    }

    // Dreamy twinkle effect
    float twinkle = sin(vLifetime * 3.14159 * 2.0 + uTime * 1.5 + vRandomOffset * 6.28) * 0.25 + 0.75;

    // Brightness boost for bloom effect
    float brightness = 1.2 + speed * 1.5 + twinkle * 0.3;
    brightness = clamp(brightness, 0.8, 2.5);

    vec3 finalColor = baseColor * brightness;
    float finalAlpha = alpha * uOpacity * vLifetime * twinkle;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

function DreamyParticleCloud({
  particleCount = 12000,
  opacity = 0.08,
  speed = 0.4,
  bloomIntensity = 0.5,
  mouseInfluence = 120,
}: DreamyGPGPUParticlesProps) {
  const { size, viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const noise3D = useMemo(() => createNoise3D(), []);

  // Particle system state
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);
    const randomOffsets = new Float32Array(particleCount);

    // Dreamy cloud-like distribution
    const bounds = { x: 120, y: 120, z: 80 };

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Gaussian-like distribution for cloud effect
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.6) * 50; // Concentrated center
      const height = (Math.random() - 0.5) * bounds.z;

      positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 20;
      positions[i3 + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * 20;
      positions[i3 + 2] = height;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      lifetimes[i] = Math.random();
      randomOffsets[i] = Math.random();
    }

    return { positions, velocities, lifetimes, randomOffsets, bounds };
  }, [particleCount]);

  // Geometry and material
  const { geometry, material } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    geom.setAttribute('velocity', new THREE.BufferAttribute(particles.velocities, 3));
    geom.setAttribute('lifetime', new THREE.BufferAttribute(particles.lifetimes, 1));
    geom.setAttribute('randomOffset', new THREE.BufferAttribute(particles.randomOffsets, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 3.0 },
        uOpacity: { value: opacity },
      },
      vertexShader: dreamyVertexShader,
      fragmentShader: dreamyFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { geometry: geom, material: mat };
  }, [particles, opacity]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  // Animation loop with dreamy flow field
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime();
    const positions = geometry.attributes.position.array as Float32Array;
    const velocities = geometry.attributes.velocity.array as Float32Array;
    const lifetimes = geometry.attributes.lifetime.array as Float32Array;

    // Mouse position in world space
    const mouse3D = new THREE.Vector3(
      mouseRef.current.x * viewport.width / 2,
      mouseRef.current.y * viewport.height / 2,
      0
    );

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const px = positions[i3];
      const py = positions[i3 + 1];
      const pz = positions[i3 + 2];

      // Dreamy flow field with slower, more organic movement
      const noiseScale = 0.015; // Larger patterns
      const timeScale = time * speed * 0.08; // Slower evolution

      const noiseX = noise3D(
        px * noiseScale,
        py * noiseScale,
        pz * noiseScale + timeScale
      );
      const noiseY = noise3D(
        px * noiseScale + 100,
        py * noiseScale + 100,
        pz * noiseScale + timeScale
      );
      const noiseZ = noise3D(
        px * noiseScale + 200,
        py * noiseScale + 200,
        pz * noiseScale + timeScale
      );

      // Gentle flow force
      const flowForce = 0.03;
      let fx = noiseX * flowForce;
      let fy = noiseY * flowForce;
      let fz = noiseZ * flowForce * 0.5; // Less z-movement for cloud-like behavior

      // Soft upward drift for dreamy float effect
      fy += 0.005;

      // Gentle mouse repulsion (attraction for some particles)
      const particlePos = new THREE.Vector3(px, py, pz);
      const toMouse = particlePos.clone().sub(mouse3D);
      const distToMouse = toMouse.length();

      if (distToMouse < mouseInfluence) {
        const influence = (1 - distToMouse / mouseInfluence) * 0.3;
        // Some particles attracted, some repelled based on randomOffset
        const direction = particles.randomOffsets[i] > 0.5 ? 1 : -1;
        toMouse.normalize().multiplyScalar(influence * direction);
        fx += toMouse.x;
        fy += toMouse.y;
        fz += toMouse.z;
      }

      // Update velocity with gentle damping
      velocities[i3] += fx;
      velocities[i3 + 1] += fy;
      velocities[i3 + 2] += fz;

      velocities[i3] *= 0.97;
      velocities[i3 + 1] *= 0.97;
      velocities[i3 + 2] *= 0.97;

      // Update position
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Soft boundary wrapping for continuous cloud
      const bounds = particles.bounds;
      if (Math.abs(positions[i3]) > bounds.x / 2) {
        positions[i3] = -Math.sign(positions[i3]) * bounds.x / 2;
      }
      if (Math.abs(positions[i3 + 1]) > bounds.y / 2) {
        positions[i3 + 1] = -Math.sign(positions[i3 + 1]) * bounds.y / 2;
      }
      if (Math.abs(positions[i3 + 2]) > bounds.z / 2) {
        positions[i3 + 2] = -Math.sign(positions[i3 + 2]) * bounds.z / 2;
      }

      // Slow lifetime cycling for gentle twinkle
      lifetimes[i] = (lifetimes[i] + 0.005) % 1.0;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.velocity.needsUpdate = true;
    geometry.attributes.lifetime.needsUpdate = true;

    if (material.uniforms) {
      material.uniforms.uTime.value = time;
      material.uniforms.uOpacity.value = opacity;
    }
  });

  return (
    <>
      <points ref={pointsRef} geometry={geometry} material={material} />

      {/* Bloom post-processing for dreamy glow */}
      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// Camera setup
function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

export default function DreamyGPGPUParticles({
  particleCount = 12000,
  opacity = 0.08,
  speed = 0.4,
  bloomIntensity = 0.5,
  mouseInfluence = 120,
  className = '',
}: DreamyGPGPUParticlesProps) {
  // Adaptive particle count for performance
  const adaptiveParticleCount = useMemo(() => {
    if (typeof window === 'undefined') return particleCount;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    if (isMobile && isLowEnd) return Math.floor(particleCount * 0.25); // 3,000
    if (isMobile) return Math.floor(particleCount * 0.5); // 6,000
    if (isLowEnd) return Math.floor(particleCount * 0.6); // 7,200
    return particleCount; // 12,000
  }, [particleCount]);

  // Respect reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 100], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      >
        <CameraController />
        <DreamyParticleCloud
          particleCount={adaptiveParticleCount}
          opacity={opacity}
          speed={speed}
          bloomIntensity={bloomIntensity}
          mouseInfluence={mouseInfluence}
        />
      </Canvas>
    </div>
  );
}
