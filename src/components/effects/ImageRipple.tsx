'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface RippleSceneProps {
  imageSrc: string;
  isHovered: boolean;
}

// Custom ripple shader
const rippleShaderMaterial = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uRipple: { value: new THREE.Vector3(0, 0, 0) },
    uRippleStrength: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uRipple;
    uniform float uRippleStrength;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Calculate distance from ripple center
      float dist = distance(uv, uRipple.xy);

      // Create ripple wave
      float wave = sin(dist * 20.0 - uTime * 3.0) * exp(-dist * 5.0);

      // Apply ripple displacement
      pos.z += wave * uRippleStrength * 0.15;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec3 uRipple;
    uniform float uRippleStrength;
    varying vec2 vUv;

    void main() {
      // Calculate distance from ripple center
      float dist = distance(vUv, uRipple.xy);

      // Create ripple distortion
      vec2 distortion = vec2(
        sin(dist * 20.0 - uTime * 3.0),
        cos(dist * 20.0 - uTime * 3.0)
      ) * exp(-dist * 5.0) * uRippleStrength * 0.02;

      // Sample texture with distortion
      vec2 uv = vUv + distortion;
      vec4 color = texture2D(uTexture, uv);

      // Apply circular mask for round profile image
      float circularMask = smoothstep(0.5, 0.48, distance(vUv, vec2(0.5)));
      color.a *= circularMask;

      gl_FragColor = color;
    }
  `,
};

function RippleScene({ imageSrc, isHovered }: RippleSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Load textures (brush texture optional - ripple works without it)
  const imageTexture = useTexture(imageSrc);

  const [rippleCenter, setRippleCenter] = useState(new THREE.Vector3(0.5, 0.5, 0));
  const [rippleStrength, setRippleStrength] = useState(0);

  // Trigger ripple on hover
  useEffect(() => {
    if (isHovered) {
      // Random ripple center
      setRippleCenter(new THREE.Vector3(
        0.3 + Math.random() * 0.4,
        0.3 + Math.random() * 0.4,
        0
      ));
      setRippleStrength(1);

      // Fade out ripple
      const timeout = setTimeout(() => {
        setRippleStrength(0);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isHovered]);

  // Animate ripple
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uRipple.value = rippleCenter;

      // Smooth fade out
      materialRef.current.uniforms.uRippleStrength.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uRippleStrength.value,
        rippleStrength,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTexture: { value: imageTexture },
          uTime: { value: 0 },
          uRipple: { value: rippleCenter },
          uRippleStrength: { value: rippleStrength },
        }}
        vertexShader={rippleShaderMaterial.vertexShader}
        fragmentShader={rippleShaderMaterial.fragmentShader}
        transparent
      />
    </mesh>
  );
}

interface ImageRippleProps {
  imageSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ImageRipple({ imageSrc, alt, width, height, className, style }: ImageRippleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  if (!isMounted || prefersReducedMotion) {
    // Fallback to regular image
    return (
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ ...style, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        ...style,
      }}
      className={className}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
        }}
      >
        <RippleScene imageSrc={imageSrc} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
