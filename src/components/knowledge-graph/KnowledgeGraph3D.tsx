'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { GraphScene } from './GraphScene';
import { KnowledgeNode } from '@/types/knowledge-graph';

// Auto-rotation controller
function AutoRotate({ enabled, speed = 0.002 }: { enabled: boolean; speed?: number }) {
  const { camera } = useThree();
  const angleRef = useRef(0);
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (!enabled) return;

    angleRef.current += delta * speed;
    const radius = 70;
    const height = 20;

    camera.position.x = Math.sin(angleRef.current) * radius;
    camera.position.z = Math.cos(angleRef.current) * radius;
    camera.position.y = height + Math.sin(angleRef.current * 0.5) * 8;

    camera.lookAt(targetRef.current);
  });

  return null;
}

// Camera focus controller - smooth animation to focus on node
interface CameraFocusProps {
  targetPosition: THREE.Vector3 | null;
  onFocusComplete?: () => void;
}

function CameraFocus({ targetPosition, onFocusComplete }: CameraFocusProps) {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimating = useRef(false);
  const animationProgress = useRef(0);

  useFrame((_, delta) => {
    if (!targetPosition) {
      // Smoothly return to center when no target
      currentLookAt.current.lerp(new THREE.Vector3(0, 0, 0), delta * 2);
      return;
    }

    // Start animation to target
    if (!isAnimating.current) {
      isAnimating.current = true;
      animationProgress.current = 0;
      targetLookAt.current.copy(targetPosition);
    }

    // Animate camera look-at
    animationProgress.current = Math.min(animationProgress.current + delta * 2, 1);
    const t = 1 - Math.pow(1 - animationProgress.current, 3); // Ease out cubic

    currentLookAt.current.lerp(targetLookAt.current, t * 0.1);

    // Calculate camera position offset to orbit around target
    const direction = new THREE.Vector3().subVectors(camera.position, currentLookAt.current).normalize();
    const targetDistance = 50; // Zoom in a bit
    const idealPosition = new THREE.Vector3()
      .copy(currentLookAt.current)
      .add(direction.multiplyScalar(targetDistance));

    camera.position.lerp(idealPosition, t * 0.05);
    camera.lookAt(currentLookAt.current);

    if (animationProgress.current >= 1) {
      isAnimating.current = false;
      onFocusComplete?.();
    }
  });

  return null;
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[2, 16, 16]} />
      <meshBasicMaterial color="#DA0E29" wireframe />
    </mesh>
  );
}

interface KnowledgeGraph3DProps {
  onNodeHover?: (node: KnowledgeNode | null) => void;
  onNodeClick?: (node: KnowledgeNode) => void;
  autoRotate?: boolean;
  className?: string;
}

export function KnowledgeGraph3D({
  onNodeHover,
  onNodeClick,
  autoRotate = true,
  className,
}: KnowledgeGraph3DProps) {
  const [isInteracting, setIsInteracting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [focusedPosition, setFocusedPosition] = useState<THREE.Vector3 | null>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Mark as ready after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle interaction state for auto-rotation pause
  const handleInteractionStart = () => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    // Resume auto-rotation after 3 seconds of no interaction
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3000);
  };

  // Handle node focus (camera moves to look at node)
  const handleNodeFocus = (node: KnowledgeNode, position: THREE.Vector3) => {
    setFocusedPosition(position.clone());
    setIsInteracting(true);
    onNodeClick?.(node);
  };

  // Clear focus (double-click on canvas or click empty space)
  const handleClearFocus = () => {
    setFocusedPosition(null);
  };

  // Should auto-rotate?
  const shouldAutoRotate = autoRotate && !isInteracting && !prefersReducedMotion && !focusedPosition;

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        onPointerDown={handleInteractionStart}
        onPointerUp={handleInteractionEnd}
        onWheel={handleInteractionStart}
      >
        {/* Camera - positioned closer for better visibility */}
        <PerspectiveCamera
          makeDefault
          position={[0, 20, 70]}
          fov={50}
          near={0.1}
          far={1000}
        />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[100, 100, 100]} intensity={1} />
        <pointLight position={[-100, -100, -100]} intensity={0.5} color="#DA0E29" />

        {/* Environment for reflections */}
        <Environment preset="night" />

        {/* Controls - closer zoom range for better interaction */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={30}
          maxDistance={150}
          dampingFactor={0.05}
          enableDamping={true}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          onStart={handleInteractionStart}
          onEnd={handleInteractionEnd}
        />

        {/* Auto rotation */}
        <AutoRotate enabled={shouldAutoRotate} speed={0.15} />

        {/* Camera focus controller */}
        <CameraFocus targetPosition={focusedPosition} />

        {/* Graph scene */}
        <Suspense fallback={<LoadingFallback />}>
          <GraphScene
            onNodeHover={onNodeHover}
            onNodeClick={onNodeClick}
            onNodeFocus={handleNodeFocus}
          />
        </Suspense>

        {/* Post-processing effects - refined for subtle glow */}
        <EffectComposer>
          <Bloom
            intensity={0.35}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.95}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default KnowledgeGraph3D;
