'use client';

import { useState } from 'react';
import { Shuffle, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface ExhibitionMotif {
  id: string;
  name: string;
  artworkCount: number;
}

interface ArtworkItem {
  id: string;
  title: string;
  artist: string;
  year: string;
  museum: string;
  imageUrl: string;
}

const SAMPLE_MOTIFS: ExhibitionMotif[] = [
  { id: 'celestial', name: 'Celestial Bodies', artworkCount: 247 },
  { id: 'hands', name: 'Gestures & Hands', artworkCount: 432 },
  { id: 'water', name: 'Water & Fluidity', artworkCount: 389 },
  { id: 'architecture', name: 'Sacred Architecture', artworkCount: 156 },
  { id: 'nature', name: 'Natural Forms', artworkCount: 521 },
  { id: 'portraits', name: 'Human Gaze', artworkCount: 678 },
  { id: 'geometric', name: 'Geometric Patterns', artworkCount: 312 },
  { id: 'animals', name: 'Animal Forms', artworkCount: 445 },
];

// Sample artwork data
const SAMPLE_ARTWORKS: ArtworkItem[] = [
  { id: '1', title: 'Starry Night', artist: 'Vincent van Gogh', year: '1889', museum: 'MoMA', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80' },
  { id: '2', title: 'The Great Wave', artist: 'Katsushika Hokusai', year: '1831', museum: 'Various', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&q=80' },
  { id: '3', title: 'Composition VIII', artist: 'Wassily Kandinsky', year: '1923', museum: 'Guggenheim', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80' },
  { id: '4', title: 'Water Lilies', artist: 'Claude Monet', year: '1906', museum: 'Musée de l\'Orangerie', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80' },
  { id: '5', title: 'The Kiss', artist: 'Gustav Klimt', year: '1908', museum: 'Belvedere', imageUrl: 'https://images.unsplash.com/photo-1578926078716-e9a044a5a0d6?w=800&q=80' },
  { id: '6', title: 'Girl with Pearl', artist: 'Johannes Vermeer', year: '1665', museum: 'Mauritshuis', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&q=80' },
  { id: '7', title: 'The Scream', artist: 'Edvard Munch', year: '1893', museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800&q=80' },
  { id: '8', title: 'Birth of Venus', artist: 'Sandro Botticelli', year: '1485', museum: 'Uffizi Gallery', imageUrl: 'https://images.unsplash.com/photo-1580116219976-82b82c7b6625?w=800&q=80' },
  { id: '9', title: 'Las Meninas', artist: 'Diego Velázquez', year: '1656', museum: 'Museo del Prado', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800&q=80' },
];

export default function MythOSExperience() {
  const [selectedMotif, setSelectedMotif] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const generateRandomExhibition = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomMotif = SAMPLE_MOTIFS[Math.floor(Math.random() * SAMPLE_MOTIFS.length)];
      setSelectedMotif(randomMotif.id);
      setShowGallery(true);
      setIsGenerating(false);
    }, 800);
  };

  const handleMotifSelect = (motifId: string) => {
    setSelectedMotif(motifId);
    setShowGallery(motifId !== '');
  };

  const selectedMotifData = SAMPLE_MOTIFS.find(m => m.id === selectedMotif);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    }}>
      {/* Simple Header */}
      <header style={{
        borderBottom: '1px solid #E5E5E5',
        padding: '2rem 1.5rem',
        position: 'sticky',
        top: '56px',
        backgroundColor: '#FFFFFF',
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#1A1A1A',
          }}>
            mythOS
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#666666',
            fontWeight: '400',
          }}>
            AI-powered art curator exploring visual motifs across art history
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Controls Section */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '1rem',
            maxWidth: '800px',
            alignItems: 'end',
          }}>
            {/* Motif Selector */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#666666',
              }}>
                Select Visual Motif
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={selectedMotif}
                  onChange={(e) => handleMotifSelect(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem 0.75rem 1rem',
                    fontSize: '1rem',
                    border: '1px solid #D1D1D1',
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    color: '#1A1A1A',
                    cursor: 'pointer',
                    appearance: 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  <option value="">Choose a motif...</option>
                  {SAMPLE_MOTIFS.map((motif) => (
                    <option key={motif.id} value={motif.id}>
                      {motif.name} ({motif.artworkCount} works)
                    </option>
                  ))}
                </select>
                <ChevronDown style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#666666',
                  width: '20px',
                  height: '20px',
                }} />
              </div>
            </div>

            {/* Random Button */}
            <button
              onClick={generateRandomExhibition}
              disabled={isGenerating}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '500',
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                opacity: isGenerating ? 0.6 : 1,
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                if (!isGenerating) e.currentTarget.style.backgroundColor = '#333333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1A1A1A';
              }}
            >
              <Shuffle size={18} />
              {isGenerating ? 'Generating...' : 'Random Exhibition'}
            </button>
          </div>

          {/* Selected Motif Info */}
          {selectedMotifData && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#F9F9F9',
              borderLeft: '3px solid #1A1A1A',
              maxWidth: '800px',
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                {selectedMotifData.name}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#666666' }}>
                {selectedMotifData.artworkCount} artworks in collection
              </p>
            </div>
          )}
        </section>

        {/* Gallery Grid */}
        {showGallery && (
          <section>
            <hr style={{ border: 'none', borderTop: '1px solid #E5E5E5', marginBottom: '3rem' }} />

            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '2rem',
              color: '#1A1A1A',
            }}>
              Exhibition: {selectedMotifData?.name}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {SAMPLE_ARTWORKS.map((artwork) => (
                <article
                  key={artwork.id}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '75%',
                    backgroundColor: '#F5F5F5',
                    marginBottom: '1rem',
                    overflow: 'hidden',
                  }}>
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '0.25rem',
                    color: '#1A1A1A',
                  }}>
                    {artwork.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#666666',
                    marginBottom: '0.125rem',
                  }}>
                    {artwork.artist}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#999999',
                  }}>
                    {artwork.year} • {artwork.museum}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* About Section */}
        <section style={{ marginTop: '6rem' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #E5E5E5', marginBottom: '3rem' }} />

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#1A1A1A',
          }}>
            About the Project
          </h2>

          <div style={{
            maxWidth: '800px',
            lineHeight: '1.6',
            color: '#666666',
          }}>
            <p style={{ marginBottom: '1rem' }}>
              mythOS uses computer vision and machine learning to analyze visual patterns across thousands
              of artworks. Rather than organizing art by traditional categories like period or artist,
              it discovers connections based on visual DNA.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Inspired by <a href="https://digitalcurator.art/" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1A1A', textDecoration: 'underline' }}>Digital Curator</a>,
              this project explores what happens when we give AI curatorial agency—revealing patterns
              that might take human curators years to notice.
            </p>
            <p>
              Status: <strong>Research & Development</strong> • Built with Next.js, TensorFlow.js, and OpenAI Vision API
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
