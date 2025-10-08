'use client';

import React from 'react';
import { Artwork } from '@/types/mythos';

interface WorldMapProps {
    artworks: Artwork[];
}

export const WorldMap = ({ artworks }: WorldMapProps) => {
    return (
        <section className="pt-16 border-t border-white/10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Geographic Origins</h2>
                <p className="mt-2 text-lg text-white/70">
                    Artworks from {new Set(artworks.map(a => a.museum)).size} museums across the world.
                </p>
            </div>

            <div className="relative aspect-video w-full max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white/50 text-center">
                        Map visualization coming soon
                    </p>
                </div>
            </div>
        </section>
    );
};
