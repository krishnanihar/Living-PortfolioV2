'use client';

import { useRef, useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineMilestones } from '@/data/timeline';
import {
  calculateCardPosition,
  generateCameraPath,
  getActiveMilestone,
  getDistanceToMilestone,
  DEFAULT_HELIX_CONFIG,
} from '@/lib/helixMath';
import DeepSpaceEnvironment from './DeepSpaceEnvironment';
import MilestoneCard3D from './MilestoneCard3D';
import JourneyNavigator from './JourneyNavigator';
import MilestoneFocusOverlay from './MilestoneFocusOverlay';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CameraControllerProps {
  scrollProgress: number;
  cameraPath: THREE.CatmullRomCurve3;
}

/**
 * Camera Controller Component
 * Moves camera along spline based on scroll progress
 */
function CameraController({ scrollProgress, cameraPath }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    // Get position along spline
    const t = Math.min(Math.max(scrollProgress, 0), 1);
    targetPosition.current.copy(cameraPath.getPointAt(t));
    targetLookAt.current.copy(cameraPath.getPointAt(Math.min(t + 0.05, 1)));

    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.08);

    // Smooth look-at
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.add(camera.position);

    currentLookAt.lerp(targetLookAt.current, 0.05);
    camera.lookAt(currentLookAt);
  });

  return null;
}

/**
 * Helix Timeline Component
 * Renders all milestone cards positioned on the helix path
 */
function HelixTimeline({
  cameraZ,
  activeMilestone,
  focusedMilestone,
  onFocusMilestone,
  onHoverMilestone,
}: {
  cameraZ: number;
  activeMilestone: number;
  focusedMilestone: number | null;
  onFocusMilestone: (index: number) => void;
  onHoverMilestone: (index: number | null) => void;
}) {
  // Pre-calculate all card positions
  const cardPositions = useMemo(
    () => timelineMilestones.map((_, index) => calculateCardPosition(index, DEFAULT_HELIX_CONFIG)),
    []
  );

  return (
    <group>
      {timelineMilestones.map((milestone, index) => {
        const position = cardPositions[index];
        const distance = getDistanceToMilestone(cameraZ, index, DEFAULT_HELIX_CONFIG);
        const isActive = index === activeMilestone;
        const isFocused = index === focusedMilestone;

        // Only render cards within reasonable distance
        if (distance > 600) return null;

        return (
          <MilestoneCard3D
            key={milestone.id}
            milestone={milestone}
            position={position}
            isActive={isActive}
            isFocused={isFocused}
            distance={distance}
            onFocus={() => onFocusMilestone(index)}
            onHover={(hovering) => onHoverMilestone(hovering ? index : null)}
          />
        );
      })}
    </group>
  );
}

/**
 * Scene Content Component
 * Contains all 3D elements and camera logic
 */
function SceneContent({
  scrollProgress,
  quality,
  onActiveMilestoneChange,
  onCameraZChange,
  focusedMilestone,
  onFocusMilestone,
}: {
  scrollProgress: number;
  quality: 'low' | 'medium' | 'high';
  onActiveMilestoneChange: (index: number) => void;
  onCameraZChange: (z: number) => void;
  focusedMilestone: number | null;
  onFocusMilestone: (index: number) => void;
}) {
  const [cameraZ, setCameraZ] = useState(DEFAULT_HELIX_CONFIG.startZ + 150);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);

  // Generate camera path
  const cameraPath = useMemo(
    () => generateCameraPath(timelineMilestones.length, DEFAULT_HELIX_CONFIG),
    []
  );

  // Update active milestone based on scroll
  useEffect(() => {
    const newActive = getActiveMilestone(scrollProgress, timelineMilestones.length);
    if (newActive !== activeMilestone) {
      setActiveMilestone(newActive);
      onActiveMilestoneChange(newActive);
    }

    // Estimate camera Z from progress
    const pathPoint = cameraPath.getPointAt(scrollProgress);
    setCameraZ(pathPoint.z);
    onCameraZChange(pathPoint.z);
  }, [scrollProgress, activeMilestone, cameraPath, onActiveMilestoneChange, onCameraZChange]);

  return (
    <>
      {/* Camera controller */}
      <CameraController scrollProgress={scrollProgress} cameraPath={cameraPath} />

      {/* Deep space environment */}
      <DeepSpaceEnvironment
        quality={quality}
        nebulaEnabled={quality !== 'low'}
        starCount={quality === 'low' ? 3000 : quality === 'medium' ? 5000 : 8000}
        dustCount={quality === 'low' ? 500 : quality === 'medium' ? 1000 : 2000}
      />

      {/* Helix timeline with cards */}
      <HelixTimeline
        cameraZ={cameraZ}
        activeMilestone={activeMilestone}
        focusedMilestone={focusedMilestone}
        onFocusMilestone={onFocusMilestone}
        onHoverMilestone={setHoveredMilestone}
      />

      {/* Camera-following point light */}
      <pointLight
        position={[0, 0, cameraZ + 50]}
        intensity={0.6}
        color="#ffffff"
        distance={300}
      />
    </>
  );
}

interface SpatialJourneySceneProps {
  className?: string;
}

/**
 * Main Spatial Journey Scene Component
 * Orchestrates the 3D experience with scroll binding
 */
export default function SpatialJourneyScene({ className }: SpatialJourneySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [focusedMilestone, setFocusedMilestone] = useState<number | null>(null);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');

  // Detect device capabilities and set quality
  useEffect(() => {
    const detectQuality = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as { deviceMemory?: number }).deviceMemory || 4;

      if (isMobile || cores <= 2 || memory <= 2) {
        setQuality('low');
      } else if (cores <= 4 || memory <= 4) {
        setQuality('medium');
      } else {
        setQuality('high');
      }
    };

    detectQuality();
  }, []);

  // Set up scroll trigger
  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Handle milestone focus
  const handleFocusMilestone = useCallback((index: number) => {
    setFocusedMilestone(index);
  }, []);

  // Handle closing focus overlay
  const handleCloseFocus = useCallback(() => {
    setFocusedMilestone(null);
  }, []);

  // Jump to milestone via navigator
  const handleJumpToMilestone = useCallback((index: number) => {
    if (!containerRef.current) return;

    const targetProgress = (index + 0.5) / timelineMilestones.length;
    const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = targetProgress * scrollHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        height: `${timelineMilestones.length * 100}vh`,
        position: 'relative',
      }}
    >
      {/* Fixed 3D Canvas */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 1,
        }}
      >
        <Canvas
          camera={{
            fov: 50,
            near: 0.1,
            far: 2000,
            position: [0, 0, DEFAULT_HELIX_CONFIG.startZ + 150],
          }}
          dpr={Math.min(window.devicePixelRatio, quality === 'low' ? 1 : 2)}
          gl={{
            antialias: quality !== 'low',
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: '#0A0A0A' }}
        >
          <Suspense fallback={null}>
            <SceneContent
              scrollProgress={scrollProgress}
              quality={quality}
              onActiveMilestoneChange={setActiveMilestone}
              onCameraZChange={() => {}}
              focusedMilestone={focusedMilestone}
              onFocusMilestone={handleFocusMilestone}
            />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Journey Navigator (mini-map) */}
      <JourneyNavigator
        milestones={timelineMilestones}
        activeMilestone={activeMilestone}
        onJumpToMilestone={handleJumpToMilestone}
      />

      {/* Focus overlay for expanded milestone view */}
      {focusedMilestone !== null && (
        <MilestoneFocusOverlay
          milestone={timelineMilestones[focusedMilestone]}
          onClose={handleCloseFocus}
        />
      )}
    </div>
  );
}
