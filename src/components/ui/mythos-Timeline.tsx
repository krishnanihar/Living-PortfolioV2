'use client';

import React, { useMemo } from 'react';
import { Artwork } from '@/types/mythos';

interface TimelineProps {
    artworks: Artwork[];
    onArtworkSelect: (artwork: Artwork) => void;
}

export const Timeline = ({ artworks, onArtworkSelect }: TimelineProps) => {
    const sortedArtworks = useMemo(() => {
        return [...artworks].sort((a, b) => a.year - b.year);
    }, [artworks]);

    if (artworks.length === 0) return null;

    const minYear = sortedArtworks[0].year;
    const maxYear = sortedArtworks[sortedArtworks.length - 1].year;
    const totalSpan = maxYear - minYear;
    
    // Calculate centuries to display
    const startCentury = Math.floor(minYear / 100);
    const endCentury = Math.ceil(maxYear / 100);
    const centuries = Array.from({ length: endCentury - startCentury + 1 }, (_, i) => startCentury + i);

    return (
        <section className="pt-16 border-t border-white/10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white">The Chronos Timeline</h2>
                <p className="mt-2 text-lg text-white/70">Journey through the centuries of creation.</p>
            </div>
            <div className="relative w-full overflow-hidden">
                 <div className="timeline-container overflow-x-auto p-10">
                    <div className="relative" style={{ width: `${centuries.length * 400}px`, height: '300px' }}>
                        {/* Main timeline bar */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10"></div>
                        
                        {/* Century Markers */}
                        {centuries.map((century, index) => (
                             <div key={century} className="absolute top-1/2" style={{ left: `${index * 400}px`}}>
                                <div className="-translate-y-[calc(100%+20px)] -translate-x-1/2 w-24 text-center">
                                    <span className="text-xl font-bold text-white/80">{century + 1}th</span>
                                    <span className="block text-sm text-white/50">Century</span>
                                </div>
                                <div className="absolute top-0 -translate-y-1/2 w-0.5 h-4 bg-white/30"></div>
                            </div>
                        ))}
                        
                        {/* Artworks */}
                        {sortedArtworks.map((artwork, index) => {
                            const yearPosition = (artwork.year - (startCentury * 100)) / (totalSpan + (100 - (maxYear % 100))) * 100;
                            const isUpper = index % 2 === 0;

                            return (
                                <div
                                    key={artwork.id}
                                    className="absolute top-1/2 group cursor-pointer"
                                    style={{ left: `calc(${yearPosition}% - 24px)` }}
                                    onClick={() => onArtworkSelect(artwork)}
                                >
                                    <div className={`absolute -translate-x-1/2 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-110 ${isUpper ? 'bottom-4' : 'top-4'}`}>
                                        <div className="relative w-40 text-center p-2 bg-[#101018] border border-white/10 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            <h4 className="text-sm font-semibold text-white truncate">{artwork.title}</h4>
                                            <p className="text-xs text-white/60">{artwork.artist}</p>
                                            <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#101018] border-b border-r border-white/10 rotate-45 ${isUpper ? 'top-full -mt-1' : 'bottom-full -mb-1'}`}></div>
                                        </div>
                                    </div>
                                    <div className={`w-3 h-3 bg-white/30 rounded-full group-hover:bg-[#DA0E29] transition-colors absolute top-0 -translate-y-1/2`}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};