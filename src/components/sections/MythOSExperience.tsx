'use client';

import { useState } from 'react';
import { Brain, Sparkles, Grid3x3, Shuffle, Search, Palette, Eye, Zap } from 'lucide-react';

interface ExhibitionMotif {
  id: string;
  name: string;
  description: string;
  artworkCount: number;
  color: string;
}

const SAMPLE_MOTIFS: ExhibitionMotif[] = [
  { id: 'celestial', name: 'Celestial Bodies', description: 'Moons, stars, and cosmic imagery across movements', artworkCount: 247, color: '#3B82F6' },
  { id: 'hands', name: 'Gestures & Hands', description: 'The language of touch and movement', artworkCount: 432, color: '#EC4899' },
  { id: 'water', name: 'Water & Fluidity', description: 'Oceans, rivers, and liquid forms', artworkCount: 389, color: '#06B6D4' },
  { id: 'architecture', name: 'Sacred Architecture', description: 'Temples, churches, and spiritual spaces', artworkCount: 156, color: '#8B5CF6' },
  { id: 'nature', name: 'Natural Forms', description: 'Organic patterns and botanical studies', artworkCount: 521, color: '#10B981' },
  { id: 'portraits', name: 'Human Gaze', description: 'Eyes, faces, and identity across time', artworkCount: 678, color: '#F59E0B' },
];

export default function MythOSExperience() {
  const [selectedMotif, setSelectedMotif] = useState<ExhibitionMotif | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomExhibition = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomMotif = SAMPLE_MOTIFS[Math.floor(Math.random() * SAMPLE_MOTIFS.length)];
      setSelectedMotif(randomMotif);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface-primary)] pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            myth<span style={{ color: 'var(--color-brand-primary)' }}>OS</span>
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: 'var(--color-text-secondary)' }}>
            An AI that sees patterns humans might miss
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Computer Vision</h3>
            <p style={{ color: 'var(--color-text-tertiary)' }}>
              Deep learning models analyze visual motifs, compositions, and artistic techniques
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Pattern Discovery</h3>
            <p style={{ color: 'var(--color-text-tertiary)' }}>
              Uncover hidden connections across centuries of art history
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center mb-4">
              <Grid3x3 className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Generative Exhibitions</h3>
            <p style={{ color: 'var(--color-text-tertiary)' }}>
              Algorithmic curation creates unique thematic journeys
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Exhibition Generator */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="glass-card p-8 md:p-12 rounded-[36px]">
          <div className="flex items-center gap-3 mb-8">
            <Palette className="w-7 h-7" style={{ color: 'var(--color-brand-primary)' }} />
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Generate Exhibition
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block mb-3 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Select Motif
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/50"
                  value={selectedMotif?.id || ''}
                  onChange={(e) => {
                    const motif = SAMPLE_MOTIFS.find(m => m.id === e.target.value);
                    setSelectedMotif(motif || null);
                  }}
                >
                  <option value="">Choose a visual motif...</option>
                  {SAMPLE_MOTIFS.map((motif) => (
                    <option key={motif.id} value={motif.id}>
                      {motif.name} ({motif.artworkCount} works)
                    </option>
                  ))}
                </select>
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: 'var(--color-text-tertiary)' }} />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={generateRandomExhibition}
                disabled={isGenerating}
                className="w-full px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                style={{
                  background: 'var(--color-brand-primary)',
                  color: 'white',
                }}
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-5 h-5 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Shuffle className="w-5 h-5" />
                    Random Exhibition
                  </>
                )}
              </button>
            </div>
          </div>

          {selectedMotif && (
            <div className="p-6 rounded-2xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)] animate-fadeIn">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-3 h-3 rounded-full mt-2"
                  style={{ backgroundColor: selectedMotif.color }}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    {selectedMotif.name}
                  </h3>
                  <p className="mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    {selectedMotif.description}
                  </p>
                  <div className="flex items-center gap-2" style={{ color: 'var(--color-text-tertiary)' }}>
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{selectedMotif.artworkCount} artworks analyzed</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
          How It Works
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-8 rounded-3xl">
            <div className="text-4xl font-bold mb-4 opacity-20">01</div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Visual Analysis
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Computer vision models process thousands of artworks, extracting features like composition, color palette, subject matter, and artistic techniques. Each piece becomes a vector in a high-dimensional space.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <div className="text-4xl font-bold mb-4 opacity-20">02</div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Pattern Recognition
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Machine learning algorithms identify recurring motifs across different periods, artists, and movements. The system discovers visual echoes that span centuries.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <div className="text-4xl font-bold mb-4 opacity-20">03</div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Thematic Clustering
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Artworks are grouped by visual themes rather than traditional categories. A Renaissance painting and a modern photograph might share more in common than you'd think.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <div className="text-4xl font-bold mb-4 opacity-20">04</div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Exhibition Generation
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              The curator algorithm assembles exhibitions that tell visual stories, creating narrative flows that feel curated by a human but discover connections only AI can see.
            </p>
          </div>
        </div>
      </section>

      {/* Project Context */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-12 rounded-[36px]">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
            Project Context
          </h2>

          <div className="prose prose-invert max-w-none">
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              Inspired by projects like Digital Curator, mythOS explores what happens when we give AI curatorial agency.
              Rather than simply organizing art by artist or period, the system sees connections based on visual DNA.
            </p>

            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              The goal isn't to replace human curators but to augment them—revealing patterns and connections that might
              take years of study to notice. It's about democratizing art discovery and making the vast ocean of art history
              more navigable.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text-tertiary)' }}>Tech Stack</div>
                <p style={{ color: 'var(--color-text-secondary)' }}>Next.js, TensorFlow.js, OpenAI Vision API, Pinecone Vector DB</p>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text-tertiary)' }}>Status</div>
                <p style={{ color: 'var(--color-text-secondary)' }}>Active Development • Research Phase</p>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text-tertiary)' }}>Timeline</div>
                <p style={{ color: 'var(--color-text-secondary)' }}>2024 – Ongoing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
