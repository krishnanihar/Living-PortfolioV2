'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader, Sparkles, Eye, Calendar, MapPin, Tag } from 'lucide-react';
import Image from 'next/image';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  museum: string;
  imageUrl: string;
  motifs: string[];
}

interface ArtworkStory {
  visualAnalysis: string;
  symbolism: Array<{
    element: string;
    meaning: string;
  }>;
  historicalContext: string;
  culturalSignificance: string;
  personalConnection: string;
  mood: string;
  relatedThemes: string[];
}

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const [story, setStory] = useState<ArtworkStory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (artwork) {
      fetchArtworkStory();
    } else {
      setStory(null);
      setError('');
    }
  }, [artwork]);

  const fetchArtworkStory = async () => {
    if (!artwork) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/artwork-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: artwork.title,
          artist: artwork.artist,
          year: artwork.year,
          museum: artwork.museum,
          motifs: artwork.motifs,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || 'Failed to analyze artwork');
      }

      if (!data.story) {
        throw new Error('No analysis data received');
      }

      setStory(data.story);
      setIsLoading(false);

    } catch (error: any) {
      console.error('Artwork story error:', error);
      setError(error.message || 'Failed to load artwork analysis');
      setIsLoading(false);
    }
  };

  if (!artwork) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          maxWidth: '1200px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #DADADA',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <X size={20} color="#2C2C2C" />
        </button>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          padding: '2rem',
        }}>
          {/* Left: Image */}
          <div>
            <div style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '133%',
              backgroundColor: '#F5F5F5',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1200px) 50vw, 600px"
              />
            </div>

            {/* Metadata */}
            <div style={{ marginTop: '1.5rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#2C2C2C',
              }}>
                {artwork.title}
              </h2>
              <div style={{ fontSize: '1rem', color: '#666666', marginBottom: '1rem' }}>
                {artwork.artist}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#999999' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={14} />
                  {artwork.year}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={14} />
                  {artwork.museum}
                </div>
                {artwork.motifs && artwork.motifs.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Tag size={14} style={{ marginTop: '2px' }} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {artwork.motifs.map((motif, i) => (
                        <span key={i} style={{
                          padding: '0.125rem 0.5rem',
                          backgroundColor: '#F5F5F5',
                          borderRadius: '2px',
                          fontSize: '0.75rem',
                        }}>
                          {motif}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: AI Analysis */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}>
              <Sparkles size={18} color="#2C2C2C" />
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#2C2C2C',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                AI Art Analysis
              </h3>
            </div>

            {isLoading && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '2rem',
                justifyContent: 'center',
                color: '#999999',
              }}>
                <Loader size={20} className="animate-spin" />
                Analyzing artwork...
              </div>
            )}

            {error && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#FEE',
                border: '1px solid #FCC',
                borderRadius: '4px',
                fontSize: '0.875rem',
                color: '#C00',
              }}>
                {error}
              </div>
            )}

            {story && !isLoading && !error && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Visual Analysis */}
                <div>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#2C2C2C',
                    marginBottom: '0.5rem',
                  }}>
                    Visual Analysis
                  </h4>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: '#666666',
                    lineHeight: '1.6',
                  }}>
                    {story.visualAnalysis}
                  </p>
                </div>

                {/* Symbolism */}
                {story.symbolism && story.symbolism.length > 0 && (
                  <div>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#2C2C2C',
                      marginBottom: '0.5rem',
                    }}>
                      Symbolism
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {story.symbolism.map((symbol, i) => (
                        <div key={i} style={{
                          padding: '0.75rem',
                          backgroundColor: '#F9F9F9',
                          borderRadius: '4px',
                        }}>
                          <div style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#2C2C2C',
                            marginBottom: '0.25rem',
                          }}>
                            {symbol.element}
                          </div>
                          <div style={{
                            fontSize: '0.875rem',
                            color: '#666666',
                            lineHeight: '1.5',
                          }}>
                            {symbol.meaning}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Historical Context */}
                <div>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#2C2C2C',
                    marginBottom: '0.5rem',
                  }}>
                    Historical Context
                  </h4>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: '#666666',
                    lineHeight: '1.6',
                  }}>
                    {story.historicalContext}
                  </p>
                </div>

                {/* Cultural Significance */}
                <div>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#2C2C2C',
                    marginBottom: '0.5rem',
                  }}>
                    Cultural Significance
                  </h4>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: '#666666',
                    lineHeight: '1.6',
                  }}>
                    {story.culturalSignificance}
                  </p>
                </div>

                {/* Personal Connection */}
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F0F9FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '4px',
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#1E40AF',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Reflect
                  </div>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: '#1E3A8A',
                    fontStyle: 'italic',
                    lineHeight: '1.5',
                  }}>
                    {story.personalConnection}
                  </p>
                </div>

                {/* Mood & Themes */}
                {(story.mood || (story.relatedThemes && story.relatedThemes.length > 0)) && (
                  <div>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#2C2C2C',
                      marginBottom: '0.5rem',
                    }}>
                      Emotional Quality
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {story.mood && (
                        <span style={{
                          padding: '0.375rem 0.75rem',
                          backgroundColor: '#2C2C2C',
                          color: '#FFFFFF',
                          borderRadius: '4px',
                          fontSize: '0.8125rem',
                          fontWeight: '500',
                        }}>
                          {story.mood}
                        </span>
                      )}
                      {story.relatedThemes && story.relatedThemes.map((theme, i) => (
                        <span key={i} style={{
                          padding: '0.375rem 0.75rem',
                          backgroundColor: '#F5F5F5',
                          color: '#666666',
                          borderRadius: '4px',
                          fontSize: '0.8125rem',
                        }}>
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
