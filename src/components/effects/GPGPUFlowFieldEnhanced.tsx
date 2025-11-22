'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

interface GPGPUFlowFieldEnhancedProps {
  particleCount?: number;
  layerCount?: number;
  opacity?: number;
  speed?: number;
  flowIntensity?: number;
  mouseMode?: 'attraction' | 'repulsion' | 'both';
  mouseInfluence?: number;
  bloomIntensity?: number;
  bloomThreshold?: number;
  showTrails?: boolean;
  showConnections?: boolean;
  connectionDistance?: number;
  turbulenceIntensity?: number;
  colorMode?: 'velocity' | 'narrative' | 'static';
  staticColor?: string;
  narrativeAct?: 'seduction' | 'complication' | 'resolution' | null;
  contentType?: 'transition' | 'content';
  enableScrollFlow?: boolean;
  enableClickExplosions?: boolean;
  enableAudioReactive?: boolean;
  className?: string;
}

// Cosine palette for smooth color transitions based on velocity
function cosinePalette(t: number, a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, d: THREE.Vector3) {
  const result = new THREE.Vector3();
  result.x = a.x + b.x * Math.cos(2 * Math.PI * (c.x * t + d.x));
  result.y = a.y + b.y * Math.cos(2 * Math.PI * (c.y * t + d.y));
  result.z = a.z + b.z * Math.cos(2 * Math.PI * (c.z * t + d.z));
  return result;
}

// Vertex shader for enhanced particles
const enhancedParticleVertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform float uOpacity;
  uniform float uBloomStrength;

  attribute vec3 velocity;
  attribute float lifetime;
  attribute float layer;
  attribute vec3 color;

  varying float vLifetime;
  varying vec3 vVelocity;
  varying float vLayer;
  varying vec3 vColor;
  varying float vSpeed;

  void main() {
    vLifetime = lifetime;
    vVelocity = velocity;
    vLayer = layer;
    vColor = color;

    // Calculate speed for size and bloom
    float speed = length(velocity);
    vSpeed = speed;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Size attenuation based on distance and depth layer
    float distanceScale = 300.0 / -mvPosition.z;
    float layerScale = 1.0 + (layer * 0.3); // Foreground layers larger

    // Size increases with velocity
    float velocityScale = 1.0 + (speed * 2.0);

    gl_PointSize = uSize * distanceScale * layerScale * velocityScale;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader for enhanced particles
const enhancedParticleFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  uniform bool uVelocityColors;
  uniform float uBloomStrength;

  varying float vLifetime;
  varying vec3 vVelocity;
  varying float vLayer;
  varying vec3 vColor;
  varying float vSpeed;

  void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) discard;

    // Soft edge falloff with glow
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = pow(alpha, 1.5);

    // Enhanced glow for fast particles
    float glowFactor = smoothstep(0.3, 0.5, dist);
    float bloom = vSpeed * uBloomStrength * glowFactor;

    // Twinkle effect based on lifetime
    float twinkle = sin(vLifetime * 3.14159 + uTime * 2.0) * 0.2 + 0.8;

    // Use velocity-based color or static color
    vec3 finalColor = uVelocityColors ? vColor : uColor;

    // Brightness based on speed and layer depth
    float brightness = 0.6 + vSpeed * 3.0 + (vLayer * 0.2);
    brightness = clamp(brightness, 0.5, 2.5);

    finalColor *= brightness * twinkle;

    // Add bloom glow
    finalColor += vec3(bloom);

    float finalAlpha = alpha * uOpacity * vLifetime;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

// Connection lines shader
const connectionVertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const connectionFragmentShader = `
  uniform float uOpacity;
  uniform vec3 uColor;

  void main() {
    gl_FragColor = vec4(uColor, uOpacity * 0.15);
  }
`;

interface ParticleLayer {
  positions: Float32Array;
  velocities: Float32Array;
  colors: Float32Array;
  lifetimes: Float32Array;
  layers: Float32Array;
  bounds: { x: number; y: number; z: number };
}

function EnhancedFlowFieldParticles({
  particleCount = 30000,
  layerCount = 3,
  opacity = 0.08,
  speed = 0.5,
  flowIntensity = 1.0,
  mouseMode = 'both',
  mouseInfluence = 200,
  bloomIntensity = 0.5,
  bloomThreshold = 0.7,
  showTrails = false,
  showConnections = true,
  connectionDistance = 100,
  turbulenceIntensity = 1.0,
  colorMode = 'velocity',
  staticColor = '#ffffff',
  narrativeAct = null,
  contentType = 'transition',
  enableScrollFlow = true,
  enableClickExplosions = true,
}: Omit<GPGPUFlowFieldEnhancedProps, 'className' | 'enableAudioReactive'>) {
  const { size, viewport, camera } = useThree();
  const pointsRefs = useRef<(THREE.Points<any> | null)[]>([]);
  const connectionLinesRef = useRef<THREE.LineSegments | null>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const scrollVelocityRef = useRef(0);
  const explosionsRef = useRef<Array<{ center: THREE.Vector3; strength: number; time: number }>>([]);
  const noise3D = useMemo(() => createNoise3D(), []);

  // Vortex/turbulence zones
  const vorticesRef = useRef<Array<{ center: THREE.Vector3; strength: number }>>([]);

  // Initialize vortices
  useEffect(() => {
    const vortices = [];
    for (let i = 0; i < 3; i++) {
      vortices.push({
        center: new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80
        ),
        strength: 0.5 + Math.random() * 0.5,
      });
    }
    vorticesRef.current = vortices;
  }, []);

  // Particle layers setup
  const particleLayers = useMemo(() => {
    const layers: ParticleLayer[] = [];
    const particlesPerLayer = Math.floor(particleCount / layerCount);

    for (let layerIndex = 0; layerIndex < layerCount; layerIndex++) {
      const positions = new Float32Array(particlesPerLayer * 3);
      const velocities = new Float32Array(particlesPerLayer * 3);
      const colors = new Float32Array(particlesPerLayer * 3);
      const lifetimes = new Float32Array(particlesPerLayer);
      const layerValues = new Float32Array(particlesPerLayer);

      // Z-depth distribution (foreground to background)
      const zDepth = layerIndex / (layerCount - 1); // 0 to 1
      const zRange = { min: -40 + zDepth * 30, max: -20 + zDepth * 30 };
      const bounds = { x: 100, y: 100, z: 20 };

      for (let i = 0; i < particlesPerLayer; i++) {
        const i3 = i * 3;

        // Random position in 3D space
        positions[i3] = (Math.random() - 0.5) * bounds.x;
        positions[i3 + 1] = (Math.random() - 0.5) * bounds.y;
        positions[i3 + 2] = zRange.min + Math.random() * (zRange.max - zRange.min);

        // Initial velocity
        velocities[i3] = 0;
        velocities[i3 + 1] = 0;
        velocities[i3 + 2] = 0;

        // Initial color (white)
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;

        // Random lifetime phase
        lifetimes[i] = Math.random();

        // Layer index
        layerValues[i] = layerIndex / layerCount;
      }

      layers.push({ positions, velocities, colors, lifetimes, layers: layerValues, bounds });
    }

    return layers;
  }, [particleCount, layerCount]);

  // Create geometries and materials for each layer
  const layerMeshes = useMemo(() => {
    return particleLayers.map((layer, layerIndex) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(layer.positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(layer.velocities, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(layer.colors, 3));
      geometry.setAttribute('lifetime', new THREE.BufferAttribute(layer.lifetimes, 1));
      geometry.setAttribute('layer', new THREE.BufferAttribute(layer.layers, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 2.0 + layerIndex * 0.5 },
          uOpacity: { value: opacity },
          uColor: { value: new THREE.Color(staticColor) },
          uVelocityColors: { value: colorMode === 'velocity' },
          uBloomStrength: { value: bloomIntensity },
        },
        vertexShader: enhancedParticleVertexShader,
        fragmentShader: enhancedParticleFragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      return { geometry, material };
    });
  }, [particleLayers, opacity, staticColor, colorMode, bloomIntensity]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    const handleClick = (event: MouseEvent) => {
      if (!enableClickExplosions) return;

      const mouse3D = new THREE.Vector3(
        (event.clientX / size.width) * 2 - 1,
        -(event.clientY / size.height) * 2 + 1,
        0
      ).unproject(camera);

      explosionsRef.current.push({
        center: mouse3D.clone(),
        strength: 5.0,
        time: 0,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [size, camera, enableClickExplosions]);

  // Scroll velocity tracking
  useEffect(() => {
    if (!enableScrollFlow) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          scrollVelocityRef.current = (currentScrollY - lastScrollY) * 0.1;
          lastScrollY = currentScrollY;

          // Decay scroll velocity
          setTimeout(() => {
            scrollVelocityRef.current *= 0.9;
          }, 100);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableScrollFlow]);

  // Get narrative color based on act
  const getNarrativeColor = (speed: number) => {
    if (colorMode !== 'narrative' || !narrativeAct) {
      return new THREE.Vector3(1, 1, 1);
    }

    const baseColors = {
      seduction: new THREE.Color('#A855F7'), // Purple
      complication: new THREE.Color('#EF4444'), // Red
      resolution: new THREE.Color('#06B6D4'), // Cyan
    };

    const color = baseColors[narrativeAct];
    return new THREE.Vector3(color.r, color.g, color.b);
  };

  // Animation loop with all physics
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const deltaTime = Math.min(clock.getDelta(), 0.05); // Cap for performance

    // Update vortices (slowly drift)
    vorticesRef.current.forEach((vortex) => {
      vortex.center.x += Math.sin(time * 0.1) * 0.1;
      vortex.center.y += Math.cos(time * 0.15) * 0.1;
    });

    // Update explosions
    explosionsRef.current = explosionsRef.current.filter((explosion) => {
      explosion.time += deltaTime;
      explosion.strength *= 0.95; // Decay
      return explosion.time < 2.0 && explosion.strength > 0.1;
    });

    // Mouse position in world space
    const mouse3D = new THREE.Vector3(
      mouseRef.current.x * viewport.width / 2,
      mouseRef.current.y * viewport.height / 2,
      0
    );

    // Update each particle layer
    particleLayers.forEach((layer, layerIndex) => {
      const geometry = layerMeshes[layerIndex].geometry;
      const material = layerMeshes[layerIndex].material;
      const positions = geometry.attributes.position.array as Float32Array;
      const velocities = geometry.attributes.velocity.array as Float32Array;
      const colors = geometry.attributes.color.array as Float32Array;
      const lifetimes = geometry.attributes.lifetime.array as Float32Array;

      const particlesPerLayer = positions.length / 3;

      for (let i = 0; i < particlesPerLayer; i++) {
        const i3 = i * 3;

        const px = positions[i3];
        const py = positions[i3 + 1];
        const pz = positions[i3 + 2];

        // Sample 3D noise for flow field direction
        const noiseScale = 0.015;
        const timeScale = time * speed * 0.1;

        const noiseX = noise3D(px * noiseScale, py * noiseScale, pz * noiseScale + timeScale);
        const noiseY = noise3D(px * noiseScale + 100, py * noiseScale + 100, pz * noiseScale + timeScale);
        const noiseZ = noise3D(px * noiseScale + 200, py * noiseScale + 200, pz * noiseScale + timeScale);

        // Flow field force
        const flowForce = flowIntensity * 0.05;
        let fx = noiseX * flowForce;
        let fy = noiseY * flowForce;
        let fz = noiseZ * flowForce;

        // Scroll-driven flow
        if (enableScrollFlow && Math.abs(scrollVelocityRef.current) > 0.01) {
          fy += scrollVelocityRef.current * 0.5;
        }

        // Vortex/turbulence forces
        vorticesRef.current.forEach((vortex) => {
          const toVortex = new THREE.Vector3(px, py, pz).sub(vortex.center);
          const dist = toVortex.length();

          if (dist < 50) {
            const vortexStrength = (1 - dist / 50) * vortex.strength * turbulenceIntensity;
            // Tangential force (creates spiral)
            const tangent = new THREE.Vector3(-toVortex.y, toVortex.x, 0).normalize();
            fx += tangent.x * vortexStrength * 0.3;
            fy += tangent.y * vortexStrength * 0.3;
            // Inward force
            toVortex.normalize().multiplyScalar(-vortexStrength * 0.1);
            fx += toVortex.x;
            fy += toVortex.y;
          }
        });

        // Mouse interaction
        const particlePos = new THREE.Vector3(px, py, pz);
        const toMouse = particlePos.clone().sub(mouse3D);
        const distToMouse = toMouse.length();

        if (mouseMode === 'both' || mouseMode === 'attraction') {
          // Attraction zone (close to mouse)
          if (distToMouse < mouseInfluence * 0.5) {
            const attractionStrength = (1 - distToMouse / (mouseInfluence * 0.5)) * 0.3;
            toMouse.normalize().multiplyScalar(-attractionStrength); // Negative = attract
            fx += toMouse.x;
            fy += toMouse.y;
            fz += toMouse.z;
          }
        }

        if (mouseMode === 'both' || mouseMode === 'repulsion') {
          // Repulsion zone (mid-range)
          if (distToMouse >= mouseInfluence * 0.5 && distToMouse < mouseInfluence) {
            const repulsionStrength = (1 - (distToMouse - mouseInfluence * 0.5) / (mouseInfluence * 0.5)) * 0.2;
            toMouse.normalize().multiplyScalar(repulsionStrength); // Positive = repel
            fx += toMouse.x;
            fy += toMouse.y;
            fz += toMouse.z;
          }
        }

        // Click explosion forces
        explosionsRef.current.forEach((explosion) => {
          const toExplosion = particlePos.clone().sub(explosion.center);
          const distToExplosion = toExplosion.length();

          if (distToExplosion < 30) {
            const explosionForce = (1 - distToExplosion / 30) * explosion.strength;
            toExplosion.normalize().multiplyScalar(explosionForce);
            fx += toExplosion.x;
            fy += toExplosion.y;
            fz += toExplosion.z;
          }
        });

        // Update velocity with forces
        velocities[i3] += fx;
        velocities[i3 + 1] += fy;
        velocities[i3 + 2] += fz;

        // Damping (different per act for narrative integration)
        let dampingFactor = 0.94;
        if (narrativeAct === 'complication') {
          dampingFactor = 0.90; // More chaotic
        } else if (narrativeAct === 'resolution') {
          dampingFactor = 0.97; // More calm
        }

        velocities[i3] *= dampingFactor;
        velocities[i3 + 1] *= dampingFactor;
        velocities[i3 + 2] *= dampingFactor;

        // Update position
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Boundary wrapping
        const bounds = layer.bounds;
        if (Math.abs(positions[i3]) > bounds.x / 2) {
          positions[i3] = -Math.sign(positions[i3]) * bounds.x / 2;
        }
        if (Math.abs(positions[i3 + 1]) > bounds.y / 2) {
          positions[i3 + 1] = -Math.sign(positions[i3 + 1]) * bounds.y / 2;
        }

        // Update lifetime for twinkle effect
        lifetimes[i] = (lifetimes[i] + 0.01) % 1.0;

        // Velocity-based color
        if (colorMode === 'velocity') {
          const speed = Math.sqrt(
            velocities[i3] ** 2 + velocities[i3 + 1] ** 2 + velocities[i3 + 2] ** 2
          );
          const normalizedSpeed = Math.min(speed / 2.0, 1.0);

          // Cosine palette for smooth color transitions
          // Slow = cool (blue), Fast = warm (pink/orange)
          const a = new THREE.Vector3(0.5, 0.5, 0.5);
          const b = new THREE.Vector3(0.5, 0.5, 0.5);
          const c = new THREE.Vector3(1.0, 1.0, 1.0);
          const d = new THREE.Vector3(0.0, 0.33, 0.67);

          const colorVec = cosinePalette(normalizedSpeed, a, b, c, d);

          colors[i3] = colorVec.x;
          colors[i3 + 1] = colorVec.y;
          colors[i3 + 2] = colorVec.z;
        } else if (colorMode === 'narrative' && narrativeAct) {
          const speed = Math.sqrt(
            velocities[i3] ** 2 + velocities[i3 + 1] ** 2 + velocities[i3 + 2] ** 2
          );
          const narrativeColor = getNarrativeColor(speed);
          colors[i3] = narrativeColor.x;
          colors[i3 + 1] = narrativeColor.y;
          colors[i3 + 2] = narrativeColor.z;
        }
      }

      // Mark attributes as needing update
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.velocity.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      geometry.attributes.lifetime.needsUpdate = true;

      // Update shader uniforms
      material.uniforms.uTime.value = time;
      material.uniforms.uOpacity.value = contentType === 'content' ? opacity * 0.3 : opacity;
    });

    // Update connection lines
    if (showConnections && connectionLinesRef.current) {
      updateConnectionLines();
    }
  });

  // Create connection lines between nearby particles
  const updateConnectionLines = () => {
    // Implementation simplified for performance - would create lines between particles within distance
    // For now, placeholder
  };

  return (
    <>
      {layerMeshes.map((mesh, index) => (
        <points
          key={index}
          ref={(el) => (pointsRefs.current[index] = el)}
          geometry={mesh.geometry}
          material={mesh.material}
        />
      ))}

      {/* Connection lines would go here if enabled */}
    </>
  );
}

// Camera setup
function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 80);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

export default function GPGPUFlowFieldEnhanced(props: GPGPUFlowFieldEnhancedProps) {
  const {
    particleCount = 30000,
    layerCount = 3,
    bloomIntensity = 0.5,
    bloomThreshold = 0.7,
    className = '',
    enableAudioReactive = false,
  } = props;

  // Device detection for adaptive particle count
  const adaptiveParticleCount = useMemo(() => {
    if (typeof window === 'undefined') return particleCount;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isHighDPI = window.devicePixelRatio > 2;
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    if (isMobile && isLowEnd) return Math.floor(particleCount * 0.15); // 15%
    if (isMobile) return Math.floor(particleCount * 0.3); // 30%
    if (isLowEnd) return Math.floor(particleCount * 0.5); // 50%
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
        <EnhancedFlowFieldParticles
          {...props}
          particleCount={adaptiveParticleCount}
          layerCount={layerCount}
        />
        <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={bloomThreshold}
            luminanceSmoothing={0.9}
            radius={0.6}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
