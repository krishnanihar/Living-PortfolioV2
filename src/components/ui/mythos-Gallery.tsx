'use client';

import React from 'react';
import { Artwork, Exhibition } from '@/types/mythos';
import { ArtworkCard } from '@/components/ui/mythos-ArtworkCard';
import { ExhibitionHeader } from '@/components/ui/mythos-ExhibitionHeader';

interface GalleryProps {
    artworks: Artwork[];
    onArtworkClick: (artwork: Artwork) => void;
}

export const Gallery = ({
    artworks,
    onArtworkClick,
}: GalleryProps) => {

    return (
        <section className="pt-16 border-t border-white/10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white">The Archive</h2>
                <p className="mt-2 text-lg text-white/70">Curated artworks from across the centuries.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {artworks.map(artwork => (
                    <ArtworkCard
                        key={artwork.id}
                        artwork={artwork}
                        onSelect={() => onArtworkClick(artwork)}
                    />
                ))}
            </div>
        </section>
    );
};