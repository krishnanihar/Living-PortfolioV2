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

  // Should auto-rotate?
  const shouldAutoRotate = autoRotate && !isInteracting && !prefersReducedMotion;

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

        {/* Graph scene */}
        <Suspense fallback={<LoadingFallback />}>
          <GraphScene onNodeHover={onNodeHover} onNodeClick={onNodeClick} />
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
