'use client';

import { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { ExhibitionBuilder } from '@/components/ui/ExhibitionBuilder';
import { ArtworkModal } from '@/components/ui/ArtworkModal';
import { MythOSHero } from '@/components/ui/MythOSHero';

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

interface Exhibition {
  title: string;
  subtitle: string;
  statement: string;
  criteria: {
    motifs: string[];
    centuries: number[];
    mood: string;
    themes: string[];
  };
  reasoning: string;
}

// Extended artwork dataset (50 items)
const ARTWORKS: Artwork[] = [
  { id: '1', title: 'The Starry Night', artist: 'Vincent van Gogh', year: 1889, century: 19, museum: 'MoMA', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', motifs: ['Sky', 'Star', 'Moon', 'Night', 'Landscape'] },
  { id: '2', title: 'The Great Wave off Kanagawa', artist: 'Katsushika Hokusai', year: 1831, century: 19, museum: 'Multiple', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Wave', 'Water', 'Mountain'] },
  { id: '3', title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: 1665, century: 17, museum: 'Mauritshuis', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', motifs: ['Portrait', 'Face', 'Eyes', 'Jewel', 'Veil'] },
  { id: '4', title: 'The Birth of Venus', artist: 'Sandro Botticelli', year: 1485, century: 15, museum: 'Uffizi', imageUrl: 'https://images.unsplash.com/photo-1580116219976-82b82c7b6625?w=800', motifs: ['Venus', 'Sea', 'Wind', 'Angel'] },
  { id: '5', title: 'The Kiss', artist: 'Gustav Klimt', year: 1908, century: 20, museum: 'Belvedere', imageUrl: 'https://images.unsplash.com/photo-1578926078716-e9a044a5a0d6?w=800', motifs: ['Embracing', 'Love', 'Gold', 'Pattern', 'Robe'] },
  { id: '6', title: 'The Garden of Earthly Delights', artist: 'Hieronymus Bosch', year: 1510, century: 16, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Garden', 'Fruit', 'Bird'] },
  { id: '7', title: 'The Last Supper', artist: 'Leonardo da Vinci', year: 1498, century: 15, museum: 'Santa Maria', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Christ', 'Apostle', 'Last Supper'] },
  { id: '8', title: 'Water Lilies', artist: 'Claude Monet', year: 1906, century: 20, museum: 'Orangerie', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['Water', 'Lily', 'Flower', 'Lake', 'Reflection'] },
  { id: '9', title: 'The Scream', artist: 'Edvard Munch', year: 1893, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Face', 'Sky', 'Bridge', 'Sunset'] },
  { id: '10', title: 'Mona Lisa', artist: 'Leonardo da Vinci', year: 1503, century: 16, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Portrait', 'Smile', 'Eyes', 'Hands', 'Landscape'] },
  { id: '11', title: 'The Night Watch', artist: 'Rembrandt', year: 1642, century: 17, museum: 'Rijksmuseum', imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800', motifs: ['Group Portrait', 'Sword', 'Shield', 'Flag', 'Light'] },
  { id: '12', title: 'Las Meninas', artist: 'Diego Velázquez', year: 1656, century: 17, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Portrait', 'Mirror', 'Dog', 'Interior', 'Light'] },
  { id: '13', title: 'The Creation of Adam', artist: 'Michelangelo', year: 1512, century: 16, museum: 'Sistine Chapel', imageUrl: 'https://images.unsplash.com/photo-1578926078751-61a0db8ac9e0?w=800', motifs: ['God', 'Hands', 'Touching', 'Heaven'] },
  { id: '14', title: 'Guernica', artist: 'Pablo Picasso', year: 1937, century: 20, museum: 'Reina Sofia', imageUrl: 'https://images.unsplash.com/photo-1580116219976-82b82c7b6625?w=800', motifs: ['War', 'Bull', 'Horse', 'Light', 'Death'] },
  { id: '15', title: 'American Gothic', artist: 'Grant Wood', year: 1930, century: 20, museum: 'Art Institute Chicago', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Portrait', 'House', 'Face', 'Standing'] },
  { id: '16', title: 'The Arnolfini Portrait', artist: 'Jan van Eyck', year: 1434, century: 15, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800', motifs: ['Portrait', 'Mirror', 'Dog', 'Interior', 'Hands'] },
  { id: '17', title: 'Composition VIII', artist: 'Wassily Kandinsky', year: 1923, century: 20, museum: 'Guggenheim', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Pattern'] },
  { id: '18', title: 'The Persistence of Memory', artist: 'Salvador Dalí', year: 1931, century: 20, museum: 'MoMA', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Time', 'Landscape'] },
  { id: '19', title: 'The School of Athens', artist: 'Raphael', year: 1511, century: 16, museum: 'Vatican', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Arch', 'Book', 'Gesturing'] },
  { id: '20', title: 'Sunflowers', artist: 'Vincent van Gogh', year: 1888, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['Flower', 'Vase', 'Still Life'] },
  { id: '21', title: 'The Swing', artist: 'Jean-Honoré Fragonard', year: 1767, century: 18, museum: 'Wallace Collection', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Garden', 'Tree', 'Love'] },
  { id: '22', title: 'Wanderer above the Sea of Fog', artist: 'Caspar David Friedrich', year: 1818, century: 19, museum: 'Kunsthalle Hamburg', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', motifs: ['Mountain', 'Standing', 'Landscape', 'Rock'] },
  { id: '23', title: 'The Hay Wain', artist: 'John Constable', year: 1821, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['River', 'Horse', 'Landscape', 'Tree'] },
  { id: '24', title: 'Impression, Sunrise', artist: 'Claude Monet', year: 1872, century: 19, museum: 'Marmottan Monet', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Sun', 'Dawn', 'Water'] },
  { id: '25', title: 'Saturn Devouring His Son', artist: 'Francisco Goya', year: 1823, century: 19, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Body', 'Darkness', 'Death'] },
  { id: '26', title: 'Olympia', artist: 'Édouard Manet', year: 1863, century: 19, museum: 'Orsay', imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800', motifs: ['Portrait', 'Lying', 'Cat', 'Flower', 'Interior'] },
  { id: '27', title: 'The Raft of the Medusa', artist: 'Théodore Géricault', year: 1819, century: 19, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Body', 'Storm', 'Death'] },
  { id: '28', title: 'Liberty Leading the People', artist: 'Eugène Delacroix', year: 1830, century: 19, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Flag', 'Battle', 'Allegory'] },
  { id: '29', title: 'The Fighting Temeraire', artist: 'J.M.W. Turner', year: 1839, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Sunset', 'Sky'] },
  { id: '30', title: 'Whistler\'s Mother', artist: 'James McNeill Whistler', year: 1871, century: 19, museum: 'Orsay', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', motifs: ['Portrait', 'Sitting', 'Interior', 'Black'] },
  { id: '31', title: 'The Third of May 1808', artist: 'Francisco Goya', year: 1814, century: 19, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['War', 'Death', 'Night', 'Light'] },
  { id: '32', title: 'The Sistine Madonna', artist: 'Raphael', year: 1512, century: 16, museum: 'Gemäldegalerie', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', motifs: ['Madonna', 'Angel', 'Cloud', 'Halo'] },
  { id: '33', title: 'The Tower of Babel', artist: 'Pieter Bruegel', year: 1563, century: 16, museum: 'Kunsthistorisches', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Tower', 'Building', 'Landscape', 'Sky'] },
  { id: '34', title: 'The Hunters in the Snow', artist: 'Pieter Bruegel', year: 1565, century: 16, museum: 'Kunsthistorisches', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', motifs: ['Snow', 'Winter', 'Hunting', 'Landscape', 'Dog'] },
  { id: '35', title: 'The Storm on the Sea of Galilee', artist: 'Rembrandt', year: 1633, century: 17, museum: 'Stolen', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Storm', 'Christ', 'Wave'] },
  { id: '36', title: 'Self-Portrait with Two Circles', artist: 'Rembrandt', year: 1665, century: 17, museum: 'Kenwood House', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', motifs: ['Self-Portrait', 'Face', 'Eyes', 'Beard'] },
  { id: '37', title: 'The Anatomy Lesson', artist: 'Rembrandt', year: 1632, century: 17, museum: 'Mauritshuis', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Group Portrait', 'Body', 'Book', 'Interior'] },
  { id: '38', title: 'The Milkmaid', artist: 'Johannes Vermeer', year: 1658, century: 17, museum: 'Rijksmuseum', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['Interior', 'Light'] },
  { id: '39', title: 'The Laughing Cavalier', artist: 'Frans Hals', year: 1624, century: 17, museum: 'Wallace Collection', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Portrait', 'Smiling', 'Beard', 'Robe', 'Face'] },
  { id: '40', title: 'The Ambassadors', artist: 'Hans Holbein', year: 1533, century: 16, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Portrait', 'Book', 'Skull', 'Standing'] },
  { id: '41', title: 'Primavera', artist: 'Sandro Botticelli', year: 1482, century: 15, museum: 'Uffizi', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Spring', 'Venus', 'Flower', 'Garden', 'Cupid'] },
  { id: '42', title: 'The Adoration of the Magi', artist: 'Leonardo da Vinci', year: 1482, century: 15, museum: 'Uffizi', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Christ', 'Madonna', 'Star'] },
  { id: '43', title: 'The Ghent Altarpiece', artist: 'Jan van Eyck', year: 1432, century: 15, museum: 'St Bavo Cathedral', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Altar', 'Lamb', 'Angel', 'God'] },
  { id: '44', title: 'The Annunciation', artist: 'Fra Angelico', year: 1440, century: 15, museum: 'San Marco', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Angel', 'Madonna', 'Annunciation', 'Arch'] },
  { id: '45', title: 'The Triumph of Death', artist: 'Pieter Bruegel', year: 1562, century: 16, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Death', 'Skeleton', 'Landscape', 'Battle'] },
  { id: '46', title: 'Bacchus and Ariadne', artist: 'Titian', year: 1523, century: 16, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Wine', 'Sky'] },
  { id: '47', title: 'Venus of Urbino', artist: 'Titian', year: 1538, century: 16, museum: 'Uffizi', imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800', motifs: ['Venus', 'Lying', 'Interior', 'Dog', 'Curtain'] },
  { id: '48', title: 'The Coronation of Napoleon', artist: 'Jacques-Louis David', year: 1807, century: 19, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Crown', 'Ceremony', 'Church'] },
  { id: '49', title: 'The Death of Marat', artist: 'Jacques-Louis David', year: 1793, century: 18, museum: 'Royal Museums', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Death', 'Body'] },
  { id: '50', title: 'The Oath of the Horatii', artist: 'Jacques-Louis David', year: 1785, century: 18, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Sword', 'Arch', 'Allegory'] },
];

export default function MythOSExperience() {
  const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);

  // Filter artworks based on AI-generated exhibition criteria
  const filteredArtworks = useMemo(() => {
    if (!currentExhibition) {
      return ARTWORKS; // Show all if no exhibition
    }

    const { motifs, centuries } = currentExhibition.criteria;

    return ARTWORKS.filter(artwork => {
      // Check if artwork has any of the AI-selected motifs
      const hasMotif = motifs.length === 0 ||
        motifs.some(motif =>
          artwork.motifs.some(artMotif =>
            artMotif.toLowerCase().includes(motif.toLowerCase()) ||
            motif.toLowerCase().includes(artMotif.toLowerCase())
          )
        );

      // Check if artwork is from the AI-selected centuries
      const inCentury = centuries.length === 0 ||
        centuries.includes(artwork.century);

      return hasMotif && inCentury;
    });
  }, [currentExhibition]);

  const handleExhibitionGenerated = (exhibition: Exhibition) => {
    setCurrentExhibition(exhibition);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAFA',
      color: '#1A1A1A',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    }}>
      {/* Hero Section */}
      <MythOSHero />

      {/* Top Navigation */}
      <nav style={{
        borderBottom: '1px solid #E0E0E0',
        transition: 'border-color 0.2s ease',
        backgroundColor: '#FFFFFF',
        position: 'sticky',
        top: '56px',
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px',
        }}>
          <div>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              letterSpacing: '-0.01em',
            }}>
              mythOS
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#606060',
                backgroundColor: '#F0F4FF',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid #C3D4F5',
              }}>
                <Sparkles size={10} style={{ display: 'inline', marginRight: '0.25rem' }} />
                AI Curator
              </span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9375rem', letterSpacing: '0.005em' }}>
            <a href="#browse" style={{ color: '#1A1A1A', textDecoration: 'none' }}>Browse</a>
            <a href="#about" style={{ color: '#606060', textDecoration: 'none' }}>About</a>
          </div>
        </div>
      </nav>

      {/* Exhibition Builder */}
      <div id="exhibition-builder" style={{ position: 'sticky', top: '116px', zIndex: 99 }}>
        <ExhibitionBuilder onExhibitionGenerated={handleExhibitionGenerated} />
      </div>

      {/* Main Gallery */}
      <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '3rem 2rem' }}>$
        {/* Exhibition Title (AI-Generated) */}
        {currentExhibition ? (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ paddingLeft: '0.75rem', borderLeft: '2px solid #E0E0E0', marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}>
                <Sparkles size={14} color="#606060" />
                <span style={{
                  fontSize: '0.75rem',
                  color: '#606060',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: '500',
                }}>
                  AI-Curated Exhibition
                </span>
              </div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#1A1A1A',
              }}>
                {currentExhibition.title}
              </h2>
              {currentExhibition.subtitle && (
                <p style={{
                  fontSize: '1rem',
                  color: '#606060',
                  marginBottom: '0.75rem',
                }}>
                  {currentExhibition.subtitle}
                </p>
              )}
              <p style={{
                fontSize: '0.9375rem',
                color: '#9E9E9E',
                lineHeight: '1.6',
                marginBottom: '0.5rem',
              }}>
                {currentExhibition.statement}
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: '#606060',
              }}>
                {filteredArtworks.length} artworks
              </p>
            </div>

            {/* Curator's Reasoning - Expandable */}
            <div style={{
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setShowReasoning(!showReasoning)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#1A1A1A',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} color="#606060" />
                  How did AI choose these artworks?
                </span>
                <span style={{
                  transform: showReasoning ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}>
                  ▼
                </span>
              </button>

              {showReasoning && (
                <div style={{
                  padding: '0 1.25rem 1.25rem',
                  borderTop: '1px solid #E5E7EB',
                }}>
                  <div style={{
                    fontSize: '0.9375rem',
                    color: '#606060',
                    lineHeight: '1.6',
                    marginTop: '1rem',
                  }}>
                    {currentExhibition.reasoning}
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#9E9E9E',
                      marginBottom: '0.75rem',
                    }}>
                      Visual Patterns Detected
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {currentExhibition.criteria.motifs.map((motif, i) => (
                        <span key={i} style={{
                          padding: '0.375rem 0.75rem',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E0E0E0',
                          borderRadius: '4px',
                          fontSize: '0.8125rem',
                          color: '#1A1A1A',
                        }}>
                          {motif}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#9E9E9E',
                      marginBottom: '0.75rem',
                    }}>
                      Time Periods Explored
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {currentExhibition.criteria.centuries.map((century, i) => (
                        <span key={i} style={{
                          padding: '0.375rem 0.75rem',
                          backgroundColor: '#F0F4FF',
                          border: '1px solid #C3D4F5',
                          borderRadius: '4px',
                          fontSize: '0.8125rem',
                          color: '#1A1A1A',
                        }}>
                          {century}th Century
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#9E9E9E',
                      marginBottom: '0.75rem',
                    }}>
                      Emotional Quality
                    </div>
                    <div style={{
                      padding: '0.75rem 1rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E0E0E0',
                      borderRadius: '4px',
                      fontSize: '0.9375rem',
                      color: '#1A1A1A',
                      fontStyle: 'italic',
                    }}>
                      {currentExhibition.criteria.mood}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '3rem', paddingLeft: '0.75rem', borderLeft: '2px solid #E0E0E0' }}>$
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1A1A1A',
              letterSpacing: '-0.01em',
            }}>
              Browse All Artworks
            </h2>
            <p style={{
              fontSize: '0.9375rem',
              color: '#606060',
            }}>
              {ARTWORKS.length} artworks • Use the AI curator above to generate thematic exhibitions
            </p>
          </div>
        )}

        {/* Dense Masonry Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {filteredArtworks.map((artwork) => {
            // Find matching motifs if exhibition exists
            const matchingMotifs = currentExhibition
              ? artwork.motifs.filter(artMotif =>
                  currentExhibition.criteria.motifs.some(exMotif =>
                    artMotif.toLowerCase().includes(exMotif.toLowerCase()) ||
                    exMotif.toLowerCase().includes(artMotif.toLowerCase())
                  )
                )
              : [];

            return (
              <article
                key={artwork.id}
                onClick={() => setSelectedArtwork(artwork)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  const imgContainer = e.currentTarget.querySelector('div') as HTMLElement;
                  if (imgContainer) {
                    imgContainer.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  const imgContainer = e.currentTarget.querySelector('div') as HTMLElement;
                  if (imgContainer) {
                    imgContainer.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '133%',
                  backgroundColor: '#E8E8E8',
                  marginBottom: '0.75rem',
                  overflow: 'hidden',
                  borderRadius: '3px',
                  transition: 'box-shadow 0.2s ease',
                }}>
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 240px"
                  />
                  {/* Thematic Connection Badge */}
                  {matchingMotifs.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '3px',
                      fontSize: '0.75rem',
                      color: '#1A1A1A',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}>
                      <Sparkles size={10} color="#606060" />
                      {matchingMotifs[0]}
                    </div>
                  )}
                </div>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem',
                  color: '#1A1A1A',
                  lineHeight: '1.3',
                  letterSpacing: '-0.005em',
                }}>
                  {artwork.title}
                </h3>
                <p style={{
                  fontSize: '0.8125rem',
                  color: '#606060',
                  marginBottom: '0.125rem',
                }}>
                  {artwork.artist}
                </p>
                <p style={{
                  fontSize: '0.8125rem',
                  color: '#9E9E9E',
                }}>
                  {artwork.year} • {artwork.museum}
                </p>
              </article>
            );
          })}
        </div>

        {filteredArtworks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#9E9E9E',
          }}>
            <p>No artworks found matching the AI's criteria.</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Try a different exhibition description above.
            </p>
          </div>
        )}
      </main>

      {/* About Section - Enhanced */}
      <section id="about" style={{
        borderTop: '1px solid #E0E0E0',
        backgroundColor: '#FFFFFF',
        padding: '5rem 2rem',
        marginTop: '4rem',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Main Story */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
              color: '#1A1A1A',
            }}>
              Why mythOS Exists
            </h2>
            <div style={{
              lineHeight: '1.7',
              letterSpacing: '0.005em',
              color: '#606060',
              fontSize: '1.0625rem',
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Art museums are intimidating. You walk through galleries feeling like you're missing something—wall text written for scholars, references to movements you've never studied, centuries of context you don't have.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: '#1A1A1A' }}>What if art history spoke your language?</strong>
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                mythOS uses Gemini AI to bridge that gap. Tell it how you feel, what you're curious about, or what visual ideas intrigue you. The AI translates your words into visual patterns, discovers artworks across centuries that share those qualities, and explains why they matter—in language anyone can understand.
              </p>
            </div>
          </div>

          {/* Key Innovation */}
          <div style={{
            backgroundColor: '#F0F4FF',
            border: '1px solid #C3D4F5',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '4rem',
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#606060',
              marginBottom: '1rem',
            }}>
              The Breakthrough
            </div>
            <div style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: '#1A1A1A' }}>
              <p style={{ marginBottom: '1rem' }}>
                Traditional art search requires knowing <em>what to search for</em>: artist names, movement labels, specific artworks. mythOS lets you search by <strong>feeling</strong>, <strong>concept</strong>, or <strong>visual quality</strong>.
              </p>
              <p style={{ marginBottom: 0 }}>
                The AI sees patterns human curators might take years to notice—connecting artworks across centuries through shared emotional resonance, compositional similarities, or thematic threads.
              </p>
            </div>
          </div>

          {/* Use Cases Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '4rem',
          }}>
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: '#1A1A1A',
              }}>
                For Curious Minds
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: '1.6',
                color: '#606060',
              }}>
                Explore art through your own questions and curiosities. No need to know the "right" terminology or historical periods.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: '#1A1A1A',
              }}>
                For Visual Thinkers
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: '1.6',
                color: '#606060',
              }}>
                Discover artworks based on how they look and feel, not just who made them or when they were created.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: '#1A1A1A',
              }}>
                For Lifelong Learners
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: '1.6',
                color: '#606060',
              }}>
                Get expert-level analysis and context for every artwork—symbolism, history, cultural impact—without academic jargon.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: '#1A1A1A',
              }}>
                For Creative Projects
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: '1.6',
                color: '#606060',
              }}>
                Generate thematic art collections for mood boards, creative research, or discovering visual inspiration.
              </p>
            </div>
          </div>

          {/* Inspiration Credit */}
          <div style={{
            borderTop: '1px solid #E0E0E0',
            paddingTop: '2rem',
            marginBottom: '2rem',
          }}>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              color: '#606060',
              marginBottom: '1rem',
            }}>
              Inspired by{' '}
              <a
                href="https://digitalcurator.art/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#1A1A1A',
                  textDecoration: 'underline',
                  transition: 'color 0.15s ease',
                }}
              >
                Digital Curator
              </a>
              , mythOS explores what happens when AI becomes a co-curator—not replacing human insight, but making art history accessible to everyone.
            </p>
          </div>

          {/* Technical Details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            padding: '1.5rem',
            backgroundColor: '#FAFAFA',
            borderRadius: '6px',
            border: '1px solid #E8E8E8',
          }}>
            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#9E9E9E',
                marginBottom: '0.5rem',
              }}>
                Status
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#1A1A1A' }}>
                Research & Development
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#9E9E9E',
                marginBottom: '0.5rem',
              }}>
                Technology
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#1A1A1A' }}>
                Next.js, Gemini AI
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#9E9E9E',
                marginBottom: '0.5rem',
              }}>
                Mission
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#1A1A1A' }}>
                Democratize art curation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artwork Modal */}
      <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </div>
  );
}
