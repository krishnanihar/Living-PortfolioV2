'use client';

import React, { useRef, useEffect, useMemo, useState, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Ripple distortion shader material with depth blur
const RippleImageMaterialImpl = shaderMaterial(
  {
    uTexture: null,
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uMouseVelocity: 0,
    uOpacity: 1,
    uRippleStrength: 0.015,
    uRippleFrequency: 8.0,
    uDepthBlur: 0, // Blur based on distance from camera (0-1)
  },
  // Vertex shader
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - water ripple distortion + depth blur
  `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseVelocity;
    uniform float uOpacity;
    uniform float uRippleStrength;
    uniform float uRippleFrequency;
    uniform float uDepthBlur;

    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Distance from mouse position (normalized 0-1)
      float dist = distance(uv, uMouse);

      // Create ripple waves emanating from mouse
      // Multiple wave frequencies for organic feel
      float wave1 = sin(dist * uRippleFrequency * 3.14159 - uTime * 2.0);
      float wave2 = sin(dist * uRippleFrequency * 2.0 * 3.14159 - uTime * 1.5) * 0.5;
      float wave3 = sin(dist * uRippleFrequency * 0.5 * 3.14159 - uTime * 3.0) * 0.25;

      float combinedWave = wave1 + wave2 + wave3;

      // Falloff - ripples are stronger near mouse, fade with distance
      float falloff = 1.0 - smoothstep(0.0, 0.6, dist);
      falloff = falloff * falloff; // Quadratic falloff for smoother edges

      // Add velocity-based intensity boost
      float intensity = uRippleStrength * (1.0 + uMouseVelocity * 2.0);

      // Calculate UV displacement
      vec2 direction = normalize(uv - uMouse + 0.0001);
      vec2 displacement = direction * combinedWave * intensity * falloff;

      // Apply displacement to UVs
      vec2 distortedUv = uv + displacement;

      // ===== DEPTH BLUR EFFECT =====
      // 9-sample blur for distant fragments (performance optimized)
      float blur = uDepthBlur * 0.006;
      vec4 color = vec4(0.0);
      float total = 0.0;

      if (blur > 0.0001) {
        // Optimized 9-sample blur kernel
        for (float x = -1.0; x <= 1.0; x += 1.0) {
          for (float y = -1.0; y <= 1.0; y += 1.0) {
            float weight = 1.0 - length(vec2(x, y)) * 0.2;
            color += texture2D(uTexture, distortedUv + vec2(x, y) * blur) * weight;
            total += weight;
          }
        }
        color /= total;
      } else {
        // No blur - direct sample for performance
        color = texture2D(uTexture, distortedUv);
      }

      // Apply opacity
      color.a *= uOpacity;

      gl_FragColor = color;
    }
  `
);

extend({ RippleImageMaterial: RippleImageMaterialImpl });

// Type for the custom shader material
type RippleImageMaterialType = THREE.ShaderMaterial & {
  uTexture: THREE.Texture | null;
  uTime: number;
  uMouse: THREE.Vector2;
  uMouseVelocity: number;
  uOpacity: number;
  uRippleStrength: number;
  uRippleFrequency: number;
  uDepthBlur: number;
};

// TypeScript declaration for JSX - using Object3DNode pattern
declare module '@react-three/fiber' {
  interface ThreeElements {
    rippleImageMaterial: {
      ref?: React.Ref<RippleImageMaterialType>;
      uTexture?: THREE.Texture | null;
      uTime?: number;
      uMouse?: THREE.Vector2;
      uMouseVelocity?: number;
      uOpacity?: number;
      uRippleStrength?: number;
      uRippleFrequency?: number;
      uDepthBlur?: number;
      transparent?: boolean;
      side?: THREE.Side;
      depthWrite?: boolean;
      attach?: string;
    };
  }
}

// Error boundary for individual fragments - prevents one broken image from crashing everything
class FragmentErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Fragment failed to load:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

/**
 * David Whyte-inspired Parallax Scene
 *
 * Features:
 * - Orthographic camera for true parallax (no perspective distortion)
 * - Scroll-driven camera Z movement through 3D space
 * - Floating image fragments at different Z depths
 * - Mouse parallax offset for interactivity
 * - Poetic text integration points
 */

// Fragment data structure
export interface FragmentData {
  id: string;
  imageSrc: string;
  position: [number, number, number]; // x, y, z
  size: [number, number]; // width, height in scene units
  scrollRange: [number, number]; // When visible (0-1 scroll progress)
  parallaxSpeed: number; // Depth multiplier (1 = normal, <1 = slower/farther, >1 = faster/closer)
  rotation?: number; // Subtle rotation in degrees
  opacity?: number;
}

// Poetic text data structure
export interface PoeticTextData {
  id: string;
  lines: string[];
  position: [number, number, number];
  scrollRange: [number, number];
  align: 'left' | 'center' | 'right';
  size: 'display' | 'heading' | 'body';
}

interface FloatingFragmentProps {
  data: FragmentData;
  scrollProgress: number;
  mouseOffset: { x: number; y: number };
  mouseScreenPos: { x: number; y: number }; // Raw screen position for ripple
}

function FloatingFragment({ data, scrollProgress, mouseOffset, mouseScreenPos }: FloatingFragmentProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const { camera, size } = useThree();

  // Load texture
  const texture = useTexture(data.imageSrc);

  // Track mouse velocity for ripple intensity
  const lastMousePos = useRef({ x: 0.5, y: 0.5 });
  const mouseVelocity = useRef(0);

  // Calculate visibility and opacity based on scroll range
  const { visible, opacity } = useMemo(() => {
    const [start, end] = data.scrollRange;
    const fadeIn = 0.05; // 5% fade in
    const fadeOut = 0.05; // 5% fade out

    if (scrollProgress < start - fadeIn || scrollProgress > end + fadeOut) {
      return { visible: false, opacity: 0 };
    }

    let alpha = data.opacity ?? 1;

    // Fade in
    if (scrollProgress < start) {
      alpha *= (scrollProgress - (start - fadeIn)) / fadeIn;
    }
    // Fade out
    else if (scrollProgress > end) {
      alpha *= 1 - (scrollProgress - end) / fadeOut;
    }

    return { visible: true, opacity: Math.max(0, Math.min(1, alpha)) };
  }, [scrollProgress, data.scrollRange, data.opacity]);

  // Parallax effect and ripple updates on frame
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const cam = camera as THREE.OrthographicCamera;

    // ===== 1. DEPTH-BASED SCALE (closer = larger, farther = smaller) =====
    const distToCamera = Math.abs(cam.position.z - data.position[2]);
    // Scale inversely with distance: base scale 1.0 at distance 80, larger when closer
    const dynamicScale = Math.max(0.4, Math.min(1.8, 80 / Math.max(distToCamera, 20)));
    meshRef.current.scale.setScalar(dynamicScale);

    // ===== 2. Z-VELOCITY FLY-THROUGH (fragments rush past as camera approaches) =====
    const relativeZ = data.position[2] - cam.position.z;
    // Fragments ahead of camera accelerate toward camera, fragments behind recede
    const zOffset = relativeZ > 0
      ? relativeZ * (1 + data.parallaxSpeed * 0.5)  // Ahead: speed up
      : relativeZ * (1 - data.parallaxSpeed * 0.3); // Behind: slow down
    const targetZ = cam.position.z + zOffset;
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.04;

    // ===== 3. DEPTH-BASED OPACITY (atmospheric fade with distance) =====
    // Reduced aggressiveness: max fade 30% instead of 60%, wider range
    const depthOpacity = 1 - Math.min(0.3, distToCamera / 500);
    const finalOpacity = opacity * Math.max(0.2, depthOpacity);

    // ===== 4. DEPTH BLUR (distant fragments become blurry) =====
    // Much gentler blur: starts at distance 200, very subtle max 0.25
    const depthBlur = Math.min(0.25, Math.max(0, (distToCamera - 200) / 600));
    materialRef.current.uDepthBlur = depthBlur;

    // REVERSE parallax: Deeper fragments (lower parallaxSpeed) move MORE with mouse
    const depthFactor = (1.3 - data.parallaxSpeed) * 2.5;

    // Calculate target positions - adjusted for zoom 4.5
    const targetX = data.position[0] + mouseOffset.x * depthFactor * 40;
    const targetY = data.position[1] + mouseOffset.y * depthFactor * 40;

    // Smooth lerp for fluid movement
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.06;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.06;

    // Update shader uniforms
    materialRef.current.uTime = state.clock.elapsedTime;
    materialRef.current.uOpacity = finalOpacity;

    // Convert mouse screen position to UV coordinates relative to this fragment
    // Project fragment position to screen space
    const fragmentPos = new THREE.Vector3(
      meshRef.current.position.x,
      meshRef.current.position.y,
      data.position[2]
    );
    fragmentPos.project(camera);

    // Convert to screen coordinates
    const fragmentScreenX = (fragmentPos.x + 1) / 2;
    const fragmentScreenY = (fragmentPos.y + 1) / 2;

    // Calculate relative mouse position (0-1 UV space relative to fragment)
    // Map mouse position relative to fragment bounds
    const fragmentSizeScreen = {
      width: (data.size[0] / size.width) * (camera as THREE.OrthographicCamera).zoom * 2,
      height: (data.size[1] / size.height) * (camera as THREE.OrthographicCamera).zoom * 2,
    };

    const relMouseX = 0.5 + (mouseScreenPos.x - fragmentScreenX) / Math.max(fragmentSizeScreen.width, 0.1);
    const relMouseY = 0.5 + (mouseScreenPos.y - fragmentScreenY) / Math.max(fragmentSizeScreen.height, 0.1);

    // Clamp to reasonable range
    const clampedMouseX = Math.max(-0.5, Math.min(1.5, relMouseX));
    const clampedMouseY = Math.max(-0.5, Math.min(1.5, relMouseY));

    // Calculate mouse velocity
    const dx = clampedMouseX - lastMousePos.current.x;
    const dy = clampedMouseY - lastMousePos.current.y;
    const newVelocity = Math.sqrt(dx * dx + dy * dy);
    mouseVelocity.current = mouseVelocity.current * 0.9 + newVelocity * 0.1; // Smooth

    lastMousePos.current = { x: clampedMouseX, y: clampedMouseY };

    // Update mouse uniforms
    materialRef.current.uMouse.set(clampedMouseX, clampedMouseY);
    materialRef.current.uMouseVelocity = Math.min(mouseVelocity.current * 50, 1.0);
  });

  if (!visible) return null;

  return (
    <mesh
      ref={meshRef}
      position={[data.position[0], data.position[1], data.position[2]]}
      rotation={[0, 0, (data.rotation ?? 0) * (Math.PI / 180)]}
    >
      <planeGeometry args={data.size} />
      <rippleImageMaterial
        ref={materialRef}
        uTexture={texture}
        uTime={0}
        uMouse={new THREE.Vector2(0.5, 0.5)}
        uMouseVelocity={0}
        uOpacity={opacity}
        uRippleStrength={0.012}
        uRippleFrequency={6.0}
        uDepthBlur={0}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

interface ParallaxCameraProps {
  scrollProgress: number;
  mouseOffset: { x: number; y: number };
  depthRange: [number, number]; // [near, far] in scene units
}

function ParallaxCamera({ scrollProgress, mouseOffset, depthRange }: ParallaxCameraProps) {
  const { camera, clock, scene } = useThree();

  useFrame(() => {
    // Get delta time for frame-rate independent movement
    const delta = clock.getDelta();

    // Camera Z position based on scroll
    const [near, far] = depthRange;
    const targetZ = near + (far - near) * scrollProgress;

    // Smooth camera movement with delta time (key David Whyte technique)
    // Using multiplier of 5 for responsive but smooth feel
    camera.position.z += (targetZ - camera.position.z) * Math.min(5 * delta, 0.15);

    // ===== DYNAMIC ZOOM (creates fly-through effect) =====
    // Orthographic cameras don't zoom by position - must animate zoom property!
    const baseZoom = 1.5;
    const zoomRange = 0.8; // Zoom from 1.5 → 2.3 as you scroll
    const targetZoom = baseZoom + scrollProgress * zoomRange;
    const cam = camera as THREE.OrthographicCamera;
    cam.zoom += (targetZoom - cam.zoom) * 0.08; // Smooth lerp
    cam.updateProjectionMatrix(); // REQUIRED after zoom change!

    // Mouse parallax - adjusted for new zoom range
    const targetX = mouseOffset.x * 35;
    const targetY = mouseOffset.y * 35;
    camera.position.x += (targetX - camera.position.x) * Math.min(4 * delta, 0.12);
    camera.position.y += (targetY - camera.position.y) * Math.min(4 * delta, 0.12);

    // ===== DYNAMIC FOG - thickens as you scroll deeper =====
    if (scene.fog) {
      const fog = scene.fog as THREE.Fog;
      // Fog closes in as scroll progresses (creates atmospheric depth)
      fog.near = 100 + scrollProgress * 50;   // 100 → 150
      fog.far = 600 - scrollProgress * 100;   // 600 → 500
    }
  });

  return null;
}

interface ClearaParallaxSceneProps {
  fragments: FragmentData[];
  scrollProgress: number;
  depthRange?: [number, number];
  className?: string;
}

export function ClearaParallaxScene({
  fragments,
  scrollProgress,
  depthRange = [200, -600], // Extended range for more dramatic fly-through effect
  className,
}: ClearaParallaxSceneProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [mouseScreenPos, setMouseScreenPos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Check if touch device
      if ('ontouchstart' in window) return;

      // Normalized mouse position (-0.5 to 0.5) for parallax
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = -((e.clientY / window.innerHeight) - 0.5);
      setMouseOffset({ x, y });

      // Screen position (0-1) for ripple effect
      const screenX = e.clientX / window.innerWidth;
      const screenY = 1 - (e.clientY / window.innerHeight); // Flip Y for WebGL
      setMouseScreenPos({ x: screenX, y: screenY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reduced motion check
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 200], // Start at near depth (matches depthRange[0])
          zoom: 1.5, // Lower zoom = fragments appear larger (dynamic zoom animates 1.5 → 2.3)
          near: 0.1,
          far: 1200, // Extended for new depth range
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      >
        {/* Fog for depth perception - cream color matching canvas, dynamic in ParallaxCamera */}
        <fog attach="fog" args={['#FAF8F5', 120, 600]} />

        {/* Camera controller */}
        <ParallaxCamera
          scrollProgress={prefersReducedMotion ? 0 : scrollProgress}
          mouseOffset={prefersReducedMotion ? { x: 0, y: 0 } : mouseOffset}
          depthRange={depthRange}
        />

        {/* Ambient light for visibility */}
        <ambientLight intensity={1} />

        {/* Render all fragments - each wrapped in error boundary for resilience */}
        <React.Suspense fallback={null}>
          {fragments.map((fragment) => (
            <FragmentErrorBoundary key={fragment.id}>
              <FloatingFragment
                data={fragment}
                scrollProgress={scrollProgress}
                mouseOffset={prefersReducedMotion ? { x: 0, y: 0 } : mouseOffset}
                mouseScreenPos={prefersReducedMotion ? { x: 0.5, y: 0.5 } : mouseScreenPos}
              />
            </FragmentErrorBoundary>
          ))}
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default ClearaParallaxScene;
