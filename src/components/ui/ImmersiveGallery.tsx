'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';

const ARTWORK_SPACING = 1000;
const WALL_OFFSET = 600;
const NUM_PARTICLES = 50;

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  century: number;
  museum: string;
  imageUrl: string;
  motifs: string[];
}

interface Exhibition {
  title: string;
  subtitle: string;
}

interface ImmersiveGalleryProps {
  artworks: Artwork[];
  exhibition: Exhibition;
  onArtworkSelect: (artwork: Artwork) => void;
  onExit: () => void;
}

export function ImmersiveGallery({
  artworks,
  exhibition,
  onArtworkSelect,
  onExit,
}: ImmersiveGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraZ = useRef(1000);
  const targetZ = useRef(1000);
  const sceneRotation = useRef({ x: 0, y: 0 });
  const targetSceneRotation = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  const maxZ = (artworks.length + 1) * ARTWORK_SPACING;

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      targetZ.current += e.deltaY * 1.5;
      targetZ.current = Math.max(800, Math.min(targetZ.current, maxZ));
    },
    [maxZ]
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const x = e.clientX / clientWidth - 0.5;
    const y = e.clientY / clientHeight - 0.5;
    targetSceneRotation.current = { x: -y * 5, y: x * 10 };
  }, []);

  useEffect(() => {
    const animate = () => {
      cameraZ.current = lerp(cameraZ.current, targetZ.current, 0.075);
      sceneRotation.current.x = lerp(
        sceneRotation.current.x,
        targetSceneRotation.current.x,
        0.05
      );
      sceneRotation.current.y = lerp(
        sceneRotation.current.y,
        targetSceneRotation.current.y,
        0.05
      );

      if (containerRef.current) {
        const scene = containerRef.current.querySelector(
          '.immersive-scene'
        ) as HTMLDivElement;
        if (scene) {
          scene.style.transform = `rotateX(${sceneRotation.current.x}deg) rotateY(${sceneRotation.current.y}deg) translateZ(${cameraZ.current}px)`;
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('wheel', handleWheel, { passive: false });
      currentContainer.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('wheel', handleWheel);
        currentContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [handleWheel, handleMouseMove]);

  const particles = useMemo(
    () =>
      Array.from({ length: NUM_PARTICLES }).map((_, i) => ({
        x: (Math.random() - 0.5) * 4000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * -maxZ * 1.5,
        delay: Math.random() * -20,
      })),
    [maxZ]
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        overflow: 'hidden',
        backgroundColor: '#000000',
        animationDuration: '0.8s',
      }}
      className="immersive-container animate-fade-in-up"
    >
      <button
        onClick={onExit}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 60,
          padding: '0.5rem 1rem',
          backgroundColor: 'rgba(218, 14, 41, 0.8)',
          color: '#FFFFFF',
          fontWeight: '600',
          borderRadius: '8px',
          border: '1px solid transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#B80C23';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(218, 14, 41, 0.8)';
          e.currentTarget.style.borderColor = 'transparent';
        }}
      >
        <X size={20} /> Exit Gallery
      </button>

      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 60,
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.7)',
        }}
        className="immersive-hud"
      >
        Scroll to Journey Through Mythos's Vision
      </div>

      <div className="immersive-scene">
        <div className="immersive-floor"></div>
        <div className="immersive-ceiling"></div>

        {particles.map((p, i) => (
          <div
            key={i}
            className="immersive-particle"
            style={{
              transform: `translateX(${p.x}px) translateY(${p.y}px) translateZ(${p.z}px)`,
              animationDelay: `${p.delay}s`,
            }}
          ></div>
        ))}

        {artworks.length > 0 ? (
          <>
            <div
              className="immersive-title"
              style={{ transform: `translate(-50%, -50%) translateZ(500px)` }}
            >
              <h2
                style={{
                  fontSize: 'clamp(3rem, 6vw, 3.75rem)',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
              >
                {exhibition.title}
              </h2>
              <p
                style={{
                  marginTop: '1rem',
                  fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}
              >
                {exhibition.subtitle}
              </p>
            </div>

            {artworks.map((artwork, index) => {
              const isLeftWall = index % 2 === 0;
              const zPos = -index * ARTWORK_SPACING;
              const xPos = isLeftWall ? -WALL_OFFSET : WALL_OFFSET;
              const yRot = isLeftWall ? 65 : -65;

              return (
                <div
                  key={artwork.id}
                  className="immersive-artwork-wrapper"
                  onClick={() => onArtworkSelect(artwork)}
                  style={{
                    transform: `translateZ(${zPos}px) translateX(${xPos}px) rotateY(${yRot}deg)`,
                  }}
                >
                  <div className="immersive-artwork-hover-target">
                    <div className="immersive-artwork">
                      <img src={artwork.imageUrl} alt={artwork.title} />
                    </div>
                    <div className="immersive-artwork-info">
                      <h3>{artwork.title}</h3>
                      <p>{artwork.artist}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div
              className="immersive-end-portal"
              style={{
                transform: `translate(-50%, -50%) translateZ(${
                  -artworks.length * ARTWORK_SPACING
                }px)`,
              }}
            >
              <div
                style={{
                  width: '6rem',
                  height: '6rem',
                  margin: '0 auto 1rem',
                  color: 'var(--brand-red)',
                }}
              >
                ✦
              </div>
              <h3
                style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}
              >
                The Vision Fades
              </h3>
              <p
                style={{
                  fontSize: '1.125rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '0.5rem',
                }}
              >
                Mythos has shown all it can for this desire. Exit to whisper anew.
              </p>
            </div>
          </>
        ) : (
          <div
            className="immersive-empty-state"
            style={{ transform: `translate(-50%, -50%) translateZ(0px)` }}
          >
            <div
              style={{
                width: '6rem',
                height: '6rem',
                margin: '0 auto 1rem',
                color: 'var(--brand-red)',
              }}
            >
              ⚠
            </div>
            <h3
              style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                color: '#FFFFFF',
              }}
            >
              The Archives Are Silent
            </h3>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: '0.5rem',
              }}
            >
              Mythos's vision is clear, yet no artworks match this specific desire.
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Try a different summoning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
