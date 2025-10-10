'use client';

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ARTWORKS, type Artwork } from '@/data/mythos/artworks';
import styles from '../styles/mythos.module.css';

const examplePrompts = [
  'Art that feels like loneliness',
  'Water and transformation',
  'Dramatic light in the 17th century',
];

export const GallerySection = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(ARTWORKS);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const handleSummon = async (searchPrompt: string) => {
    if (!searchPrompt.trim()) return;

    setIsLoading(true);
    setPrompt(searchPrompt);

    // Simulate AI filtering (in real app, call API)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple client-side filtering for demo
    const keywords = searchPrompt.toLowerCase().split(' ');
    const filtered = ARTWORKS.filter(artwork => {
      const searchText = `${artwork.title} ${artwork.artist} ${artwork.motifs.join(' ')}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword));
    });

    setFilteredArtworks(filtered.length > 0 ? filtered : ARTWORKS);
    setIsLoading(false);
  };

  const handleExampleClick = (examplePrompt: string) => {
    handleSummon(examplePrompt);
  };

  return (
    <section id="the-gallery" className={styles.gallerySection}>
      <div className={styles.galleryContent}>
        {/* Section heading */}
        <ScrollReveal animation="fade-up" threshold={0.3}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>
              Summon Your Exhibition
            </h2>
            <div className={styles.divider} />
          </div>
        </ScrollReveal>

        {/* Exhibition Builder */}
        <ScrollReveal animation="fade-up" delay={200} threshold={0.3}>
          <div className={styles.exhibitionBuilder}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSummon(prompt)}
                placeholder="Describe the art you wish to discover..."
                className={styles.exhibitionInput}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSummon(prompt)}
                disabled={isLoading || !prompt.trim()}
                className={styles.summonButton}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Summoning...
                  </>
                ) : (
                  <>
                    <Sparkles className="inline w-5 h-5 mr-2" />
                    Summon
                  </>
                )}
              </button>
            </div>

            {/* Example Prompts */}
            <div className={styles.examplePrompts}>
              {examplePrompts.map((example) => (
                <button
                  key={example}
                  onClick={() => handleExampleClick(example)}
                  className={styles.examplePrompt}
                  disabled={isLoading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Artwork Grid */}
        {filteredArtworks.length > 0 ? (
          <div className={styles.artworkGrid}>
            {filteredArtworks.map((artwork, index) => (
              <ScrollReveal
                key={artwork.id}
                animation="fade-up"
                delay={index * 50}
                threshold={0.1}
              >
                <div
                  className={styles.artworkCard}
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className={styles.artworkImage}>
                    <div
                      className={styles.artworkImageInner}
                      style={{ backgroundImage: `url(${artwork.imageUrl})` }}
                    />
                  </div>
                  <h3 className={styles.artworkTitle}>{artwork.title}</h3>
                  <p className={styles.artworkArtist}>{artwork.artist}</p>
                  <p className={styles.artworkMeta}>
                    {artwork.year} • {artwork.museum}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyStateTitle}>No artworks found</h3>
            <p>Try a different search or browse all artworks</p>
          </div>
        )}

        {/* Artwork Modal */}
        {selectedArtwork && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedArtwork(null)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.modalClose}
                onClick={() => setSelectedArtwork(null)}
              >
                <X size={20} />
              </button>

              <div
                className={styles.modalImage}
                style={{ backgroundImage: `url(${selectedArtwork.imageUrl})` }}
              />

              <div className={styles.modalInfo}>
                <h2 className={styles.modalTitle}>{selectedArtwork.title}</h2>
                <p className={styles.modalArtist}>{selectedArtwork.artist}</p>

                <div className={styles.modalMeta}>
                  <div className={styles.modalMetaItem}>
                    <div className={styles.modalMetaLabel}>Year</div>
                    <div className={styles.modalMetaValue}>{selectedArtwork.year}</div>
                  </div>
                  <div className={styles.modalMetaItem}>
                    <div className={styles.modalMetaLabel}>Century</div>
                    <div className={styles.modalMetaValue}>{selectedArtwork.century}th</div>
                  </div>
                  <div className={styles.modalMetaItem}>
                    <div className={styles.modalMetaLabel}>Museum</div>
                    <div className={styles.modalMetaValue}>{selectedArtwork.museum}</div>
                  </div>
                </div>

                <div className={styles.modalMetaLabel} style={{ marginBottom: '0.75rem' }}>
                  Motifs & Themes
                </div>
                <div className={styles.modalMotifs}>
                  {selectedArtwork.motifs.map((motif) => (
                    <span key={motif} className={styles.motifTag}>
                      {motif}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
