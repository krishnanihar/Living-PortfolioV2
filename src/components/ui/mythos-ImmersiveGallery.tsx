'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Artwork, Exhibition } from '@/types/mythos';
import { Icons } from '@/components/ui/mythos-Icons';

const ARTWORK_SPACING = 1000;
const WALL_OFFSET = 600; 
const NUM_PARTICLES = 50;

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

interface ImmersiveGalleryProps {
    artworks: Artwork[];
    exhibition: Exhibition;
    onArtworkSelect: (artwork: Artwork) => void;
    onExit: () => void;
}

export const ImmersiveGallery = ({ artworks, exhibition, onArtworkSelect, onExit }: ImmersiveGalleryProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cameraZ = useRef(1000);
    const targetZ = useRef(1000);
    const sceneRotation = useRef({ x: 0, y: 0 });
    const targetSceneRotation = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number | null>(null);
    
    const maxZ = (artworks.length + 1) * ARTWORK_SPACING;

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        targetZ.current += e.deltaY * 1.5;
        targetZ.current = Math.max(800, Math.min(targetZ.current, maxZ));
    }, [maxZ]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;
        const x = (e.clientX / clientWidth) - 0.5;
        const y = (e.clientY / clientHeight) - 0.5;
        targetSceneRotation.current = { x: -y * 5, y: x * 10 };
    }, []);

    useEffect(() => {
        const animate = () => {
            cameraZ.current = lerp(cameraZ.current, targetZ.current, 0.075);
            sceneRotation.current.x = lerp(sceneRotation.current.x, targetSceneRotation.current.x, 0.05);
            sceneRotation.current.y = lerp(sceneRotation.current.y, targetSceneRotation.current.y, 0.05);

            if (containerRef.current) {
                const scene = containerRef.current.querySelector('.immersive-scene') as HTMLDivElement;
                if(scene) {
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
    
    const particles = useMemo(() => 
        Array.from({ length: NUM_PARTICLES }).map((_, i) => ({
            x: (Math.random() - 0.5) * 4000,
            y: (Math.random() - 0.5) * 2000,
            z: Math.random() * -maxZ * 1.5,
            delay: Math.random() * -20,
        }))
    , [maxZ]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-40 overflow-hidden bg-black immersive-container animate-fade-in-up" style={{ animationDuration: '0.8s' }}>
             <button onClick={onExit} className="fixed top-4 right-4 z-[60] px-4 py-2 bg-[#DA0E29]/80 text-white font-semibold rounded-lg hover:bg-red-500 backdrop-blur-sm border border-transparent hover:border-white/20 transition-all duration-300 flex items-center gap-2">
                <Icons.close className="w-5 h-5"/> Exit Gallery
            </button>

            <div className="immersive-hud fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] text-sm">
                Scroll to Journey Through Mythos's Vision
            </div>

            <div className="immersive-scene">
                <div className="immersive-floor"></div>
                <div className="immersive-ceiling"></div>

                {particles.map((p, i) => (
                    <div key={i} className="immersive-particle" style={{ transform: `translateX(${p.x}px) translateY(${p.y}px) translateZ(${p.z}px)`, animationDelay: `${p.delay}s`}}></div>
                ))}
                
                {artworks.length > 0 ? (
                    <>
                        <div className="immersive-title" style={{ transform: `translate(-50%, -50%) translateZ(500px)` }}>
                            <h2 className="text-5xl md:text-6xl font-bold text-white text-center">{exhibition.title}</h2>
                            <p className="mt-4 text-xl md:text-2xl text-white/70 text-center italic">{exhibition.subtitle}</p>
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
                                    style={{ transform: `translateZ(${zPos}px) translateX(${xPos}px) rotateY(${yRot}deg)` }}
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

                        <div className="immersive-end-portal" style={{ transform: `translate(-50%, -50%) translateZ(${-artworks.length * ARTWORK_SPACING}px)`}}>
                             <Icons.oracle className="w-24 h-24 text-[#DA0E29] mx-auto mb-4"/>
                             <h3 className="text-3xl font-bold">The Vision Fades</h3>
                             <p className="text-lg text-white/70 mt-2">Mythos has shown all it can for this desire. Exit to whisper anew.</p>
                        </div>
                    </>
                ) : (
                    <div className="immersive-empty-state" style={{ transform: `translate(-50%, -50%) translateZ(0px)` }}>
                        <Icons.alert className="w-24 h-24 text-[#DA0E29] mx-auto mb-4"/>
                        <h3 className="text-3xl font-bold">The Archives Are Silent</h3>
                        <p className="text-lg text-white/70 mt-2">Mythos's vision is clear, yet no artworks match this specific desire.</p>
                        <p className="text-white/50">Try a different summoning.</p>
                    </div>
                )}
            </div>
        </div>
    );
};