'use client';

import { useState, useCallback, useMemo } from 'react';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { HeroNew } from '@/components/ui/mythos-HeroNew';
import { ActIIProblem } from '@/components/ui/mythos-ActII-Problem';
import { ActIIIInnovation } from '@/components/ui/mythos-ActIII-Innovation';
import { ActIVExperience } from '@/components/ui/mythos-ActIV-Experience';
import { ActVImpact } from '@/components/ui/mythos-ActV-Impact';
import { ActVITechnical } from '@/components/ui/mythos-ActVI-Technical';
import { ActVIICTA } from '@/components/ui/mythos-ActVII-CTA';
import { ImmersiveGallery } from '@/components/ui/mythos-ImmersiveGallery';
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

      {/* Act I: Awakening */}
      <HeroNew onSummon={handleSummon} isLoading={isLoading} />

      {/* Acts II-VII: Narrative Flow - Wrapped for consistent centering */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Act II: The Problem */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            paddingLeft: 'clamp(1rem, 5vw, 3rem)',
            paddingRight: 'clamp(1rem, 5vw, 3rem)',
            marginBottom: '10rem',
          }}
        >
          <ActIIProblem />
        </div>

        {/* Act III: The Innovation */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            paddingLeft: 'clamp(1rem, 5vw, 3rem)',
            paddingRight: 'clamp(1rem, 5vw, 3rem)',
            marginBottom: '10rem',
          }}
        >
          <ActIIIInnovation />
        </div>

        {/* Act IV: The Experience */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            paddingLeft: 'clamp(1rem, 5vw, 3rem)',
            paddingRight: 'clamp(1rem, 5vw, 3rem)',
            marginBottom: '10rem',
          }}
        >
          <ActIVExperience
            onSummon={handleSummon}
            isLoading={isLoading}
            error={error}
            exhibition={exhibition}
            filteredArtworks={filteredArtworks}
            onArtworkClick={handleArtworkSelect}
          />
        </div>

        {/* Act V: Global Impact */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            paddingLeft: 'clamp(1rem, 5vw, 3rem)',
            paddingRight: 'clamp(1rem, 5vw, 3rem)',
            marginBottom: '10rem',
          }}
        >
          <ActVImpact artworks={filteredArtworks} />
        </div>

        {/* Act VI: Technical Depth */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            paddingLeft: 'clamp(1rem, 5vw, 3rem)',
            paddingRight: 'clamp(1rem, 5vw, 3rem)',
            marginBottom: '10rem',
          }}
        >
          <ActVITechnical />
        </div>

        {/* Act VII: Final CTA */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            paddingLeft: 'clamp(1rem, 5vw, 3rem)',
            paddingRight: 'clamp(1rem, 5vw, 3rem)',
            marginBottom: '5rem',
          }}
        >
          <ActVIICTA onSummon={handleSummon} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
