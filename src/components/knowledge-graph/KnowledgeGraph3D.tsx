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

// Camera focus controller - smooth time-based animation to focus on node
interface CameraFocusProps {
  targetPosition: THREE.Vector3 | null;
  connectedPositions?: THREE.Vector3[];
  onFocusComplete?: () => void;
}

const FOCUS_DURATION = 400; // ms - snappy animation

// Calculate camera distance to frame all nodes in view
function calculateFocusDistance(
  centerPos: THREE.Vector3,
  connectedPositions: THREE.Vector3[],
  fov: number
): number {
  if (connectedPositions.length === 0) {
    return 35; // Close distance for single node - makes it prominent
  }

  const box = new THREE.Box3();
  box.expandByPoint(centerPos);
  connectedPositions.forEach(p => box.expandByPoint(p));

  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const padding = 1.3; // 30% padding for tighter framing

  // Calculate distance to fit bounding box in view
  const distance = (maxDim * padding) / (2 * Math.tan((fov * Math.PI) / 360));
  return Math.max(35, Math.min(distance, 75)); // Clamp between 35-75 for closer zoom
}

function CameraFocus({ targetPosition, connectedPositions = [], onFocusComplete }: CameraFocusProps) {
  const { camera } = useThree();
  const startTime = useRef<number | null>(null);
  const startPosition = useRef(new THREE.Vector3());
  const startLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCameraPosition = useRef(new THREE.Vector3());
  const lastTargetPosition = useRef<THREE.Vector3 | null>(null);

  useFrame(() => {
    if (!targetPosition) {
      // Smoothly return to center when no target (slower return)
      currentLookAt.current.lerp(new THREE.Vector3(0, 0, 0), 0.02);
      camera.lookAt(currentLookAt.current);
      startTime.current = null;
      lastTargetPosition.current = null;
      return;
    }

    // Detect new target (start new animation)
    if (!lastTargetPosition.current || !lastTargetPosition.current.equals(targetPosition)) {
      startTime.current = Date.now();
      startPosition.current.copy(camera.position);
      startLookAt.current.copy(currentLookAt.current);
      targetLookAt.current.copy(targetPosition);
      lastTargetPosition.current = targetPosition.clone();

      // Calculate ideal camera position to frame node + connected nodes
      const fov = (camera as THREE.PerspectiveCamera).fov || 50;
      const focusDistance = calculateFocusDistance(targetPosition, connectedPositions, fov);

      // Keep camera roughly in same direction but at new distance
      const direction = new THREE.Vector3().subVectors(camera.position, targetPosition).normalize();
      targetCameraPosition.current.copy(targetPosition).add(direction.multiplyScalar(focusDistance));
    }

    if (startTime.current === null) return;

    // Time-based animation progress
    const elapsed = Date.now() - startTime.current;
    const t = Math.min(elapsed / FOCUS_DURATION, 1);
    const eased = 1 - Math.pow(1 - t, 3); // Ease-out cubic

    // Interpolate camera position and look-at
    camera.position.lerpVectors(startPosition.current, targetCameraPosition.current, eased);
    currentLookAt.current.lerpVectors(startLookAt.current, targetLookAt.current, eased);
    camera.lookAt(currentLookAt.current);

    if (t >= 1) {
      startTime.current = null;
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
  const [isHovering, setIsHovering] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [focusedPosition, setFocusedPosition] = useState<THREE.Vector3 | null>(null);
  const [connectedPositions, setConnectedPositions] = useState<THREE.Vector3[]>([]);
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

  // Handle node hover state change
  const handleNodeHoverChange = (node: KnowledgeNode | null) => {
    setIsHovering(node !== null);
    onNodeHover?.(node);
  };

  // Handle node focus (camera moves to look at node)
  const handleNodeFocus = (node: KnowledgeNode, position: THREE.Vector3, connected: THREE.Vector3[]) => {
    setFocusedPosition(position.clone());
    setConnectedPositions(connected.map(p => p.clone()));
    setIsInteracting(true);
    onNodeClick?.(node);
  };

  // Clear focus (double-click on canvas or click empty space)
  const handleClearFocus = () => {
    setFocusedPosition(null);
  };

  // Should auto-rotate? (pause on hover, interaction, or focus)
  const shouldAutoRotate = autoRotate && !isInteracting && !isHovering && !prefersReducedMotion && !focusedPosition;

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

        {/* Controls - disable during camera focus animation to prevent fighting */}
        <OrbitControls
          enabled={!focusedPosition}
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

        {/* Auto rotation - slower speed for less jarring movement */}
        <AutoRotate enabled={shouldAutoRotate} speed={0.08} />

        {/* Camera focus controller */}
        <CameraFocus targetPosition={focusedPosition} connectedPositions={connectedPositions} />

        {/* Graph scene */}
        <Suspense fallback={<LoadingFallback />}>
          <GraphScene
            onNodeHover={handleNodeHoverChange}
            onNodeClick={onNodeClick}
            onNodeFocus={handleNodeFocus}
            pausePhysics={isHovering || !!focusedPosition}
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
