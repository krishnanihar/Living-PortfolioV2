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
}

interface TimelineProps {
  artworks: Artwork[];
  onArtworkSelect: (artwork: Artwork) => void;
}

export function Timeline({ artworks, onArtworkSelect }: TimelineProps) {
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
  const centuries = Array.from(
    { length: endCentury - startCentury + 1 },
    (_, i) => startCentury + i
  );

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
          The Chronos Timeline
        </h2>
        <p
          style={{
            marginTop: '0.5rem',
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
          }}
        >
          Journey through the centuries of creation.
        </p>
      </div>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <div
          className="timeline-container"
          style={{
            overflowX: 'auto',
            padding: '2.5rem',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: `${centuries.length * 400}px`,
              height: '300px',
            }}
          >
            {/* Main timeline bar */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            ></div>

            {/* Century Markers */}
            {centuries.map((century, index) => (
              <div
                key={century}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${index * 400}px`,
                }}
              >
                <div
                  style={{
                    transform: 'translate(-50%, calc(-100% - 20px))',
                    width: '6rem',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {century + 1}th
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    Century
                  </span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    transform: 'translateY(-50%)',
                    width: '2px',
                    height: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                ></div>
              </div>
            ))}

            {/* Artworks */}
            {sortedArtworks.map((artwork, index) => {
              const yearPosition =
                ((artwork.year - startCentury * 100) /
                  (totalSpan + (100 - (maxYear % 100)))) *
                100;
              const isUpper = index % 2 === 0;

              return (
                <div
                  key={artwork.id}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `calc(${yearPosition}% - 24px)`,
                    cursor: 'pointer',
                  }}
                  onClick={() => onArtworkSelect(artwork)}
                  className="group"
                >
                  <div
                    style={{
                      position: 'absolute',
                      transform: 'translateX(-50%)',
                      transition: 'transform 0.3s var(--ease-premium)',
                      ...(isUpper ? { bottom: '1rem' } : { top: '1rem' }),
                    }}
                    className="group-hover:scale-110"
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '10rem',
                        textAlign: 'center',
                        padding: '0.5rem',
                        backgroundColor: '#101018',
                        border: '1px solid var(--border-secondary)',
                        borderRadius: '4px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        pointerEvents: 'none',
                      }}
                      className="group-hover:opacity-100"
                    >
                      <h4
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#FFFFFF',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {artwork.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        {artwork.artist}
                      </p>
                      <div
                        style={{
                          position: 'absolute',
                          left: '50%',
                          transform: 'translateX(-50%) rotate(45deg)',
                          width: '0.5rem',
                          height: '0.5rem',
                          backgroundColor: '#101018',
                          borderBottom: '1px solid var(--border-secondary)',
                          borderRight: '1px solid var(--border-secondary)',
                          ...(isUpper
                            ? { top: '100%', marginTop: '-0.25rem' }
                            : { bottom: '100%', marginBottom: '-0.25rem' }),
                        }}
                      ></div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '0.75rem',
                      height: '0.75rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: 0,
                      transform: 'translateY(-50%)',
                      transition: 'background-color 0.2s',
                    }}
                    className="group-hover:bg-brand-red"
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
