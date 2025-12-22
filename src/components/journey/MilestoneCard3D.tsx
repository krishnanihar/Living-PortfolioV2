'use client';

import { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { TimelineMilestone } from '@/data/timeline';
import { cardGlowVertexShader, cardGlowFragmentShader } from '@/shaders/journey';
import { animate } from 'animejs';

interface MilestoneCard3DProps {
  milestone: TimelineMilestone;
  position: THREE.Vector3;
  isActive: boolean;
  isFocused: boolean;
  distance: number;
  onFocus: () => void;
  onHover: (hovering: boolean) => void;
}

/**
 * 3D Milestone Card Component
 * Combines Three.js glow mesh with HTML content via drei
 */
export default function MilestoneCard3D({
  milestone,
  position,
  isActive,
  isFocused,
  distance,
  onFocus,
  onHover,
}: MilestoneCard3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate visibility based on distance
  const visibility = useMemo(() => {
    const maxDistance = 200;
    const minDistance = 25;

    if (distance < minDistance) {
      return { opacity: 1, scale: 1.05 };
    }
    if (distance > maxDistance) {
      return { opacity: 0.4, scale: 0.85 };
    }

    const t = (distance - minDistance) / (maxDistance - minDistance);
    const eased = 1 - Math.pow(t, 0.5);

    return {
      opacity: 0.4 + eased * 0.6,
      scale: 0.85 + eased * 0.2,
    };
  }, [distance]);

  // Glow shader uniforms
  const glowUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(milestone.brandColor) },
      uIntensity: { value: 0.4 },
      uTime: { value: 0 },
      uActive: { value: 0 },
    }),
    [milestone.brandColor]
  );

  // Update glow animation
  useFrame(({ clock }) => {
    if (glowMeshRef.current) {
      const material = glowMeshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.elapsedTime;
      material.uniforms.uActive.value = isActive ? 1 : 0;
      material.uniforms.uIntensity.value = THREE.MathUtils.lerp(
        material.uniforms.uIntensity.value,
        isActive ? 0.7 : isHovered ? 0.5 : 0.3,
        0.1
      );
    }

    // Billboard effect - card faces camera on Y axis
    if (groupRef.current) {
      groupRef.current.lookAt(
        groupRef.current.position.x,
        groupRef.current.position.y,
        1000
      );
    }
  });

  // Hover animation with anime.js
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHover(true);

    if (cardRef.current) {
      animate(cardRef.current, {
        scale: 1.03,
        rotateY: 3,
        duration: 400,
        ease: 'outExpo',
      });
    }
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHover(false);

    if (cardRef.current) {
      animate(cardRef.current, {
        scale: 1,
        rotateY: 0,
        duration: 400,
        ease: 'outExpo',
      });
    }
  }, [onHover]);

  // Handle click
  const handleClick = useCallback(() => {
    if (isActive) {
      onFocus();
    }
  }, [isActive, onFocus]);

  return (
    <group ref={groupRef} position={position}>
      {/* Glow plane behind card */}
      <mesh ref={glowMeshRef} position={[0, 0, -0.5]}>
        <planeGeometry args={[6, 8]} />
        <shaderMaterial
          uniforms={glowUniforms}
          vertexShader={cardGlowVertexShader}
          fragmentShader={cardGlowFragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* HTML Card Content */}
      <Html
        center
        distanceFactor={8}
        occlude={false}
        transform
        style={{
          pointerEvents: isActive ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
          opacity: visibility.opacity,
        }}
      >
        <div
          ref={cardRef}
          className="journey-card-3d"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: '380px',
            padding: '0',
            background: 'var(--glass-06)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: `1px solid ${isActive ? milestone.brandColor + '50' : 'var(--glass-10)'}`,
            borderRadius: '24px',
            boxShadow: isActive
              ? `0 0 60px ${milestone.brandColor}30, 0 25px 50px rgba(0,0,0,0.4)`
              : '0 25px 50px rgba(0,0,0,0.25)',
            transform: `scale(${isFocused ? 1.15 : visibility.scale})`,
            cursor: isActive ? 'pointer' : 'default',
            overflow: 'hidden',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
          }}
        >
          {/* Cover gradient area */}
          <div
            style={{
              height: '120px',
              background: milestone.coverGradient
                ? `linear-gradient(135deg, ${milestone.coverGradient[0]}, ${milestone.coverGradient[1]})`
                : `linear-gradient(135deg, ${milestone.brandColor}, ${milestone.brandColor}cc)`,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Year badge */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                padding: '4px 10px',
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '600',
                color: 'white',
                letterSpacing: '0.5px',
              }}
            >
              {milestone.year}
            </div>

            {/* Logo or icon */}
            {milestone.logoFile ? (
              <img
                src={`/logos/${milestone.logoFile}`}
                alt={milestone.organization || milestone.title}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.9,
                }}
              />
            ) : (
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '24px', opacity: 0.9 }}>
                  {milestone.icon === 'Sparkles' && '✨'}
                  {milestone.icon === 'Code2' && '💻'}
                  {milestone.icon === 'GraduationCap' && '🎓'}
                  {milestone.icon === 'Briefcase' && '💼'}
                  {milestone.icon === 'Brain' && '🧠'}
                  {milestone.icon === 'Palette' && '🎨'}
                  {milestone.icon === 'Zap' && '⚡'}
                  {milestone.icon === 'MessageSquarePlus' && '💬'}
                </span>
              </div>
            )}
          </div>

          {/* Card body */}
          <div style={{ padding: '20px' }}>
            {/* Title */}
            <h3
              style={{
                margin: '0 0 4px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--text-95)',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              {milestone.title}
            </h3>

            {/* Subtitle */}
            <p
              style={{
                margin: '0 0 12px 0',
                fontSize: '12px',
                color: 'var(--text-50)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              {milestone.subtitle}
            </p>

            {/* Hook/lesson highlight */}
            {(milestone.hook || milestone.lesson) && (
              <p
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '13px',
                  color: milestone.brandColor,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                {milestone.hook || milestone.lesson}
              </p>
            )}

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              {milestone.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: '3px 8px',
                    fontSize: '10px',
                    fontWeight: '500',
                    color: 'var(--text-70)',
                    background: 'var(--glass-08)',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View details indicator for active cards */}
            {isActive && (
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--glass-10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: 'var(--text-50)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                <span>Click to explore</span>
                <span style={{ opacity: 0.6 }}>→</span>
              </div>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}
