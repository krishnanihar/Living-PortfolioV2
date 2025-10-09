'use client';

import { useState, useCallback, useMemo } from 'react';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { Hero } from '@/components/ui/mythos-Hero';
import { ExhibitionBuilder } from '@/components/ui/mythos-ExhibitionBuilder';
import { ExhibitionHeader } from '@/components/ui/mythos-ExhibitionHeader';
import { Gallery } from '@/components/ui/mythos-Gallery';
// import { ArtworkModal } from '@/components/ui/mythos-ArtworkModal';
import { ImmersiveGallery } from '@/components/ui/mythos-ImmersiveGallery';
import { Timeline } from '@/components/ui/mythos-Timeline';
import { WorldMap } from '@/components/ui/mythos-Map';
import { About } from '@/components/ui/mythos-About';
import { ARTWORKS } from '@/data/mythos-artworks';
import type { Exhibition, Artwork } from '@/types/mythos';

export default function MythOSPage() {
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isImmersive, setIsImmersive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummon = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/exhibition-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.exhibition) {
        setExhibition(data.exhibition);
      } else {
        setError(data.message || 'Failed to generate exhibition');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Failed to generate exhibition:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleArtworkSelect = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
  }, []);

  const handleEnterImmersive = useCallback(() => {
    setIsImmersive(true);
  }, []);

  const handleExitImmersive = useCallback(() => {
    setIsImmersive(false);
  }, []);

  const [isGeneratingCapstone, setIsGeneratingCapstone] = useState(false);
  const [isGeneratingDream, setIsGeneratingDream] = useState(false);

  const handleCreateCapstone = useCallback(() => {
    setIsGeneratingCapstone(true);
    // TODO: Implement capstone generation
    console.log('Capstone generation not implemented yet');
    setTimeout(() => setIsGeneratingCapstone(false), 1000);
  }, []);

  const handleGenerateDream = useCallback(() => {
    setIsGeneratingDream(true);
    // TODO: Implement dream video generation
    console.log('Dream video generation not implemented yet');
    setTimeout(() => setIsGeneratingDream(false), 1000);
  }, []);

  const handleClearExhibition = useCallback(() => {
    setExhibition(null);
  }, []);

  const filteredArtworks = useMemo(() => {
    if (!exhibition) return ARTWORKS;

    const { criteria } = exhibition;

    const scoredArtworks = ARTWORKS.map(art => {
      let score = 0;

      if (criteria.centuries.includes(art.century)) {
        score += 1;
      }

      if (art.mood.toLowerCase() === criteria.mood.toLowerCase()) {
        score += 2;
      }

      const matchingMotifs = art.motifs.filter(m =>
        criteria.motifs.some(cm => cm.toLowerCase() === m.toLowerCase())
      );
      score += matchingMotifs.length;

      const matchingThemes = art.themes.filter(t =>
        criteria.themes.some(ct => ct.toLowerCase() === t.toLowerCase())
      );
      score += matchingThemes.length * 1.5;

      return { ...art, score };
    });

    return scoredArtworks
      .filter(art => art.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [exhibition]);

  if (isImmersive && exhibition) {
    return (
      <ImmersiveGallery
        artworks={filteredArtworks}
        exhibition={exhibition}
        onExit={handleExitImmersive}
        onArtworkSelect={handleArtworkSelect}
      />
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: '#FFFFFF',
    }}>
      <PortfolioNavigation />
      <Hero />

      <div id="exhibition-builder" style={{
        padding: '0 clamp(var(--space-16), 8vw, 120px)',
        marginTop: 'calc(var(--space-16) + var(--space-8))',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <ExhibitionBuilder
            onSummon={handleSummon}
            isLoading={isLoading}
            error={error}
            isSticky={false}
          />

          {exhibition && (
            <div style={{ marginTop: 'var(--space-16)' }}>
              <ExhibitionHeader
                exhibition={exhibition}
                onEnterImmersive={handleEnterImmersive}
                onClearExhibition={handleClearExhibition}
                onCreateCapstone={handleCreateCapstone}
                isGeneratingCapstone={isGeneratingCapstone}
                onGenerateDream={handleGenerateDream}
                isGeneratingDream={isGeneratingDream}
              />

              <Gallery
                artworks={filteredArtworks}
                onArtworkClick={handleArtworkSelect}
              />

              <Timeline
                artworks={filteredArtworks}
                onArtworkSelect={handleArtworkSelect}
              />

              <WorldMap artworks={filteredArtworks} />
            </div>
          )}

          <About />
        </div>
      </div>

      {/* Artwork modal temporarily disabled - analysis feature not implemented */}
      {/* {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          ...
        />
      )} */}
    </div>
  );
}
