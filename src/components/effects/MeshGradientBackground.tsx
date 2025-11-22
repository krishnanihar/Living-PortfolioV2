'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MeshGradientBackgroundProps {
  colors?: string[];
  opacity?: number;
  speed?: number;
  meshDensity?: number;
  className?: string;
}

// Vertex shader with Perlin noise displacement
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uDisplacementStrength;

  // 3D Perlin noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;

    // Create organic displacement using multiple octaves of noise
    vec3 p = position;
    float noiseScale = 0.5;
    float timeScale = uTime * 0.1;

    // Multi-octave noise for organic movement
    float noise = snoise(vec3(p.x * noiseScale, p.y * noiseScale, timeScale));
    noise += snoise(vec3(p.x * noiseScale * 2.0, p.y * noiseScale * 2.0, timeScale * 1.5)) * 0.5;
    noise += snoise(vec3(p.x * noiseScale * 4.0, p.y * noiseScale * 4.0, timeScale * 2.0)) * 0.25;

    // Displace position
    p.z = noise * uDisplacementStrength;

    vPosition = p;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

// Fragment shader for 4-color gradient blending
const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform float uOpacity;

  void main() {
    // Create flowing gradient based on position and time
    vec2 uv = vUv;

    // Animated blend factors
    float blend1 = smoothstep(0.0, 0.5, uv.x + sin(uTime * 0.2) * 0.3);
    float blend2 = smoothstep(0.0, 0.5, uv.y + cos(uTime * 0.15) * 0.3);

    // Mix colors in a flowing pattern
    vec3 color = mix(
      mix(uColor1, uColor2, blend1),
      mix(uColor3, uColor4, blend1),
      blend2
    );

    // Add subtle pulsing luminosity
    float pulse = sin(uTime * 0.5 + uv.x * 2.0 + uv.y * 2.0) * 0.1 + 0.9;
    color *= pulse;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

function AnimatedMesh({
  colors,
  opacity = 0.1,
  speed = 1.0,
  meshDensity = 24,
}: MeshGradientBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Create geometry and material
  const { geometry, material } = useMemo(() => {
    // Create plane geometry with high subdivision for smooth morphing
    const geom = new THREE.PlaneGeometry(
      viewport.width * 1.2,
      viewport.height * 1.2,
      meshDensity,
      meshDensity
    );

    // Parse colors or use defaults (purple/pink/blue spectrum)
    const colorArray = colors || ['#8B5CF6', '#EC4899', '#3B82F6', '#6366F1'];

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDisplacementStrength: { value: 2.0 },
        uColor1: { value: new THREE.Color(colorArray[0]) },
        uColor2: { value: new THREE.Color(colorArray[1]) },
        uColor3: { value: new THREE.Color(colorArray[2]) },
        uColor4: { value: new THREE.Color(colorArray[3]) },
        uOpacity: { value: opacity },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    return { geometry: geom, material: mat };
  }, [viewport, colors, opacity, meshDensity]);

  // Animation loop
  useFrame(({ clock }) => {
    if (!material.uniforms) return;

    material.uniforms.uTime.value = clock.getElapsedTime() * speed;
    material.uniforms.uOpacity.value = opacity;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

// Fallback CSS gradient for reduced motion preference
function CSSGradientFallback({
  colors,
  opacity,
}: {
  colors?: string[];
  opacity: number;
}) {
  const colorArray = colors || ['#8B5CF6', '#EC4899', '#3B82F6', '#6366F1'];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        background: `radial-gradient(ellipse at 20% 30%, ${colorArray[0]}40, transparent 50%),
                     radial-gradient(ellipse at 80% 70%, ${colorArray[1]}40, transparent 50%),
                     radial-gradient(ellipse at 50% 50%, ${colorArray[2]}30, transparent 50%)`,
        opacity,
        filter: 'blur(60px)',
      }}
    />
  );
}

export default function MeshGradientBackground({
  colors,
  opacity = 0.1,
  speed = 1.0,
  meshDensity = 24,
  className = '',
}: MeshGradientBackgroundProps) {
  // Adaptive mesh density based on device
  const adaptiveMeshDensity = useMemo(() => {
    if (typeof window === 'undefined') return meshDensity;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    if (isMobile && isLowEnd) return 12; // Low density for low-end mobile
    if (isMobile) return 16; // Medium density for mobile
    if (isLowEnd) return 20; // Medium-high for low-end desktop
    return Math.min(meshDensity, 40); // Cap at 40 for high-end desktop
  }, [meshDensity]);

  // Respect reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Use CSS fallback for reduced motion
  if (prefersReducedMotion) {
    return <CSSGradientFallback colors={colors} opacity={opacity} />;
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
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: false, // Disable for better performance
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      >
        <AnimatedMesh
          colors={colors}
          opacity={opacity}
          speed={speed}
          meshDensity={adaptiveMeshDensity}
        />
      </Canvas>
    </div>
  );
}
