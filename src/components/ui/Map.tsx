'use client';

import { useMemo } from 'react';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  century: number;
  museum: string;
  imageUrl: string;
  motifs: string[];
  location?: { lat: number; lon: number };
}

interface MapProps {
  artworks: Artwork[];
  onArtworkSelect: (artwork: Artwork) => void;
}

export function WorldMap({ artworks, onArtworkSelect }: MapProps) {
  // Group artworks by location
  const locationGroups = useMemo(() => {
    const groups = new Map<string, Artwork[]>();

    artworks.forEach((artwork) => {
      if (artwork.location) {
        const key = `${artwork.location.lat},${artwork.location.lon}`;
        if (!groups.has(key)) {
          groups.set(key, []);
        }
        groups.get(key)!.push(artwork);
      }
    });

    return Array.from(groups.entries()).map(([key, arts]) => ({
      location: arts[0].location!,
      museum: arts[0].museum || 'Unknown',
      artworks: arts,
    }));
  }, [artworks]);

  if (artworks.length === 0 || locationGroups.length === 0) return null;

  // Convert lat/lon to SVG coordinates (simplified projection)
  const latLonToXY = (lat: number, lon: number) => {
    const x = ((lon + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <section style={{ paddingTop: '4rem', borderTop: '1px solid var(--border-secondary)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: 'clamp(1.875rem, 4vw, 2.25rem)',
            fontWeight: '700',
            color: '#FFFFFF',
          }}
        >
          The World Map
        </h2>
        <p
          style={{
            marginTop: '0.5rem',
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
          }}
        >
          Discover where these artworks reside across the globe.
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          aspectRatio: '2 / 1',
          backgroundColor: 'rgba(10, 10, 18, 0.5)',
          border: '1px solid var(--border-secondary)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {/* Simplified world map background */}
        <svg
          viewBox="0 0 100 50"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.2,
          }}
        >
          {/* Simplified continents outlines */}
          <rect x="0" y="0" width="100" height="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1" />
          {/* Grid lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={(i + 1) * 10}
              y1="0"
              x2={(i + 1) * 10}
              y2="50"
              stroke="rgba(218, 14, 41, 0.05)"
              strokeWidth="0.1"
            />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={(i + 1) * 10}
              x2="100"
              y2={(i + 1) * 10}
              stroke="rgba(218, 14, 41, 0.05)"
              strokeWidth="0.1"
            />
          ))}
        </svg>

        {/* Location pins */}
        {locationGroups.map((group, index) => {
          const { x, y } = latLonToXY(group.location.lat, group.location.lon);

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -100%)',
              }}
              className="group"
            >
              {/* Pin */}
              <div
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'transform 0.3s var(--ease-premium)',
                }}
                className="group-hover:scale-125"
                onClick={() => onArtworkSelect(group.artworks[0])}
              >
                <div
                  style={{
                    width: '1rem',
                    height: '1rem',
                    backgroundColor: 'var(--brand-red)',
                    borderRadius: '50% 50% 50% 0',
                    transform: 'rotate(-45deg)',
                    boxShadow: '0 0 20px rgba(218, 14, 41, 0.6)',
                    border: '2px solid white',
                  }}
                  className="mystical-breathe"
                ></div>

                {/* Tooltip */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '125%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(10, 10, 18, 0.95)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  }}
                  className="group-hover:opacity-100"
                >
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {group.museum}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {group.artworks.length} artwork{group.artworks.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
