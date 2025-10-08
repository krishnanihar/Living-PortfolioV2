'use client';

import React, { useRef } from 'react';
import { Artwork, Exhibition } from '@/types/mythos';
import { Icons } from '@/components/ui/mythos-Icons';

interface ArtworkCardProps {
    artwork: Artwork;
    onSelect: () => void;
    exhibitionCriteria?: Exhibition['criteria'];
}

export const ArtworkCard = ({ artwork, onSelect, exhibitionCriteria }: ArtworkCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateX = ((y / height) - 0.5) * -10;
        const rotateY = ((x / width) - 0.5) * 10;
        cardRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
        cardRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.setProperty('--rotate-x', '0deg');
            cardRef.current.style.setProperty('--rotate-y', '0deg');
        }
    };
    
    const matchingMotif = exhibitionCriteria?.motifs.find(m => artwork.motifs.map(am => am.toLowerCase()).includes(m.toLowerCase()));

    return (
        <div 
            ref={cardRef}
            onClick={onSelect}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative rounded-lg overflow-hidden transition-transform duration-300 cursor-pointer"
            style={{ 
                transformStyle: 'preserve-3d', 
                transform: 'perspective(1000px) rotateX(var(--rotate-x, 0)) rotateY(var(--rotate-y, 0))' 
            }}
        >
            <div className="relative w-full bg-[#111]" style={{ paddingBottom: '133.33%' }}> {/* 3:4 Aspect Ratio */}
                <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-105 animate-fade-in-up"
                    style={{animationDuration: '0.5s'}}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <h3 className="font-medium text-white/90">{artwork.title}</h3>
                <p className="text-sm text-white/60">{artwork.artist} · {artwork.year}</p>
            </div>
            
            <div className={`absolute inset-0 border rounded-lg transition-all duration-300 ease-[var(--ease-premium)] group-hover:shadow-[0_8px_24px_rgba(218,14,41,0.15),0_0_40px_rgba(218,14,41,0.08)] ${artwork.isCapstone ? 'border-[#DA0E29]' : 'border-transparent group-hover:border-[#DA0E29]/50'}`}></div>
            
            <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
                {artwork.isCapstone && (
                     <div className="px-2 py-1 bg-[#DA0E29]/80 backdrop-blur-md border border-white/10 rounded-full text-xs flex items-center gap-1 text-white">
                        <Icons.wand className="w-3 h-3"/> Capstone
                    </div>
                )}
                {matchingMotif && !artwork.isCapstone && (
                    <div className="px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs flex items-center gap-1 text-white/80">
                        <Icons.sparkles className="w-3 h-3 text-[#DA0E29]"/> {matchingMotif}
                    </div>
                )}
            </div>
        </div>
    );
};