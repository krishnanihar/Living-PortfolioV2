'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

interface GPGPUFlowFieldProps {
  particleCount?: number;
  opacity?: number;
  speed?: number;
  flowIntensity?: number;
  mouseInfluence?: number;
  color?: string;
  className?: string;
}

// Vertex shader for particle rendering
const particleVertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform float uOpacity;

  attribute vec3 velocity;
  attribute float lifetime;

  varying float vLifetime;
  varying vec3 vVelocity;

  void main() {
    vLifetime = lifetime;
    vVelocity = velocity;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Size attenuation based on distance
    float distanceScale = 300.0 / -mvPosition.z;
    gl_PointSize = uSize * distanceScale;

    // Shimmer effect based on velocity
    float speed = length(velocity);
    gl_PointSize *= 1.0 + speed * 0.5;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader for particle rendering
const particleFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;

  varying float vLifetime;
  varying vec3 vVelocity;

  void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) discard;

    // Soft edge falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = pow(alpha, 2.0);

    // Velocity-based brightness
    float speed = length(vVelocity);
    float brightness = 0.6 + speed * 2.0;
    brightness = clamp(brightness, 0.5, 1.5);

    // Twinkle effect
    float twinkle = sin(vLifetime * 3.14159 + uTime * 2.0) * 0.3 + 0.7;

    vec3 finalColor = uColor * brightness * twinkle;
    float finalAlpha = alpha * uOpacity * vLifetime;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

function FlowFieldParticles({
  particleCount = 15000,
  opacity = 0.05,
  speed = 0.5,
  flowIntensity = 1.0,
  mouseInfluence = 150,
  color = '#ffffff',
}: GPGPUFlowFieldProps) {
  const { size, viewport, camera } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const noise3D = useMemo(() => createNoise3D(), []);

  // Particle system state
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);

    // Initialize particles in 3D space
    const bounds = { x: 100, y: 100, z: 100 };

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Random position in 3D space
      positions[i3] = (Math.random() - 0.5) * bounds.x;
      positions[i3 + 1] = (Math.random() - 0.5) * bounds.y;
      positions[i3 + 2] = (Math.random() - 0.5) * bounds.z;

      // Initial velocity
      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      // Random lifetime phase
      lifetimes[i] = Math.random();
    }

    return { positions, velocities, lifetimes, bounds };
  }, [particleCount]);

  // Create geometry and material
  const { geometry, material } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    geom.setAttribute('velocity', new THREE.BufferAttribute(particles.velocities, 3));
    geom.setAttribute('lifetime', new THREE.BufferAttribute(particles.lifetimes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 2.0 },
        uOpacity: { value: opacity },
        uColor: { value: new THREE.Color(color) },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { geometry: geom, material: mat };
  }, [particles, opacity, color]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  // Animation loop with flow field physics
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

      // Sample 3D noise for flow field direction
      const noiseScale = 0.02;
      const timeScale = time * speed * 0.1;

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

      // Flow field force
      const flowForce = flowIntensity * 0.05;
      let fx = noiseX * flowForce;
      let fy = noiseY * flowForce;
      let fz = noiseZ * flowForce;

      // Mouse repulsion force
      const particlePos = new THREE.Vector3(px, py, pz);
      const toMouse = particlePos.clone().sub(mouse3D);
      const distToMouse = toMouse.length();

      if (distToMouse < mouseInfluence) {
        const repulsionStrength = (1 - distToMouse / mouseInfluence) * 0.5;
        toMouse.normalize().multiplyScalar(repulsionStrength);
        fx += toMouse.x;
        fy += toMouse.y;
        fz += toMouse.z;
      }

      // Update velocity with forces
      velocities[i3] += fx;
      velocities[i3 + 1] += fy;
      velocities[i3 + 2] += fz;

      // Damping
      velocities[i3] *= 0.95;
      velocities[i3 + 1] *= 0.95;
      velocities[i3 + 2] *= 0.95;

      // Update position
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Boundary wrapping
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

      // Update lifetime for twinkle effect
      lifetimes[i] = (lifetimes[i] + 0.01) % 1.0;
    }

    // Mark attributes as needing update
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.velocity.needsUpdate = true;
    geometry.attributes.lifetime.needsUpdate = true;

    // Update shader uniforms
    if (material.uniforms) {
      material.uniforms.uTime.value = time;
      material.uniforms.uOpacity.value = opacity;
      material.uniforms.uColor.value = new THREE.Color(color);
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// Camera setup for optimal viewing
function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 80);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

export default function GPGPUFlowField({
  particleCount = 15000,
  opacity = 0.05,
  speed = 0.5,
  flowIntensity = 1.0,
  mouseInfluence = 150,
  color = '#ffffff',
  className = '',
}: GPGPUFlowFieldProps) {
  // Device detection for adaptive particle count
  const adaptiveParticleCount = useMemo(() => {
    if (typeof window === 'undefined') return particleCount;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isHighDPI = window.devicePixelRatio > 2;
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    if (isMobile && isLowEnd) return Math.floor(particleCount * 0.2); // 20%
    if (isMobile) return Math.floor(particleCount * 0.4); // 40%
    if (isHighDPI && isLowEnd) return Math.floor(particleCount * 0.5); // 50%
    return particleCount;
  }, [particleCount]);

  // Respect reduced motion preference
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
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 80], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      >
        <CameraController />
        <FlowFieldParticles
          particleCount={adaptiveParticleCount}
          opacity={opacity}
          speed={speed}
          flowIntensity={flowIntensity}
          mouseInfluence={mouseInfluence}
          color={color}
        />
      </Canvas>
    </div>
  );
}
