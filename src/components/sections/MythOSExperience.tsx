'use client';

import { useState, useMemo } from 'react';
import { Shuffle } from 'lucide-react';
import Image from 'next/image';

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

// Comprehensive motif library (300+ items like Digital Curator)
const MOTIFS = [
  // Anatomy & Body Parts
  'Eyes', 'Hands', 'Feet', 'Face', 'Hair', 'Beard', 'Nose', 'Mouth', 'Ears', 'Body', 'Head',
  'Arms', 'Legs', 'Fingers', 'Skull', 'Skeleton', 'Heart', 'Brain',

  // Human Activities
  'Dancing', 'Reading', 'Writing', 'Eating', 'Drinking', 'Sleeping', 'Walking', 'Running',
  'Fighting', 'Praying', 'Music Making', 'Singing', 'Working', 'Hunting', 'Fishing',

  // Emotions & Gestures
  'Smiling', 'Crying', 'Laughing', 'Pointing', 'Embracing', 'Kneeling', 'Standing', 'Sitting',
  'Lying', 'Looking', 'Touching', 'Holding', 'Blessing', 'Gesturing',

  // Religious & Mythological
  'Angel', 'Saint', 'Madonna', 'Christ', 'Crucifix', 'Cross', 'Halo', 'Devil', 'Demon',
  'God', 'Prophet', 'Apostle', 'Virgin Mary', 'Holy Spirit', 'Trinity', 'Resurrection',
  'Crucifixion', 'Annunciation', 'Nativity', 'Last Supper', 'Baptism',

  // Mythology
  'Cupid', 'Venus', 'Apollo', 'Diana', 'Jupiter', 'Mercury', 'Neptune', 'Mars', 'Minerva',
  'Hercules', 'Zeus', 'Athena', 'Aphrodite', 'Prometheus', 'Medusa', 'Centaur', 'Satyr',
  'Nymph', 'Muse', 'Pegasus', 'Sphinx', 'Griffin',

  // Animals
  'Dog', 'Cat', 'Horse', 'Lion', 'Eagle', 'Sheep', 'Cow', 'Ox', 'Donkey', 'Goat', 'Pig',
  'Deer', 'Rabbit', 'Bear', 'Wolf', 'Fox', 'Bird', 'Dove', 'Owl', 'Raven', 'Peacock',
  'Rooster', 'Hen', 'Swan', 'Duck', 'Fish', 'Dolphin', 'Whale', 'Snake', 'Serpent',
  'Dragon', 'Elephant', 'Camel', 'Monkey', 'Lamb', 'Bull', 'Stag', 'Butterfly', 'Bee',

  // Nature & Landscape
  'Tree', 'Forest', 'Mountain', 'River', 'Sea', 'Ocean', 'Lake', 'Sky', 'Cloud', 'Sun',
  'Moon', 'Star', 'Rainbow', 'Storm', 'Lightning', 'Wind', 'Rain', 'Snow', 'Ice', 'Fire',
  'Flame', 'Water', 'Earth', 'Stone', 'Rock', 'Cliff', 'Cave', 'Valley', 'Hill', 'Island',

  // Plants & Flowers
  'Rose', 'Lily', 'Flower', 'Bouquet', 'Wreath', 'Garland', 'Vine', 'Leaf', 'Branch',
  'Fruit', 'Apple', 'Grape', 'Orange', 'Pomegranate', 'Fig', 'Olive', 'Wheat', 'Corn',
  'Garden', 'Meadow', 'Field',

  // Architecture & Buildings
  'Church', 'Cathedral', 'Temple', 'Palace', 'Castle', 'Tower', 'Bridge', 'Arch', 'Column',
  'Dome', 'Window', 'Door', 'Gate', 'Wall', 'Ruin', 'Building', 'House', 'Fountain',
  'Well', 'Stairs', 'Balcony', 'Terrace', 'Courtyard', 'Cloister', 'Altar', 'Throne',

  // Objects & Items
  'Book', 'Scroll', 'Pen', 'Sword', 'Shield', 'Armor', 'Crown', 'Scepter', 'Ring', 'Jewel',
  'Mirror', 'Candle', 'Lamp', 'Torch', 'Key', 'Chain', 'Rope', 'Net', 'Basket', 'Vessel',
  'Vase', 'Jar', 'Cup', 'Goblet', 'Plate', 'Dish', 'Pitcher', 'Bottle', 'Bowl',

  // Musical Instruments
  'Lute', 'Harp', 'Violin', 'Flute', 'Drum', 'Trumpet', 'Organ', 'Lyre', 'Horn',

  // Tools & Weapons
  'Hammer', 'Axe', 'Knife', 'Spear', 'Arrow', 'Bow', 'Dagger', 'Lance', 'Staff', 'Club',

  // Textiles & Clothing
  'Robe', 'Cloak', 'Veil', 'Cloth', 'Drapery', 'Curtain', 'Banner', 'Flag', 'Tent', 'Canopy',

  // Time & Seasons
  'Dawn', 'Sunset', 'Night', 'Day', 'Spring', 'Summer', 'Autumn', 'Winter', 'Season',

  // Celestial
  'Constellation', 'Comet', 'Eclipse', 'Zodiac', 'Planet', 'Cosmos', 'Heaven', 'Celestial',

  // Abstract Concepts
  'Light', 'Shadow', 'Darkness', 'Reflection', 'Silence', 'Music', 'Sound', 'Movement',
  'Rest', 'Peace', 'War', 'Love', 'Death', 'Life', 'Time', 'Eternity', 'Vanity', 'Virtue',

  // Colors
  'Gold', 'Silver', 'Blue', 'Red', 'Green', 'White', 'Black', 'Purple',

  // Social & Scenes
  'Feast', 'Banquet', 'Procession', 'Ceremony', 'Marriage', 'Funeral', 'Battle', 'Court',
  'Market', 'Street Scene', 'Interior', 'Landscape', 'Seascape', 'Portrait', 'Self-Portrait',
  'Group Portrait', 'Still Life', 'Allegory', 'Genre Scene',
];

// Extended artwork dataset (50 items)
const ARTWORKS: Artwork[] = [
  { id: '1', title: 'The Starry Night', artist: 'Vincent van Gogh', year: 1889, century: 19, museum: 'MoMA', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', motifs: ['Sky', 'Star', 'Moon', 'Night', 'Landscape'] },
  { id: '2', title: 'The Great Wave off Kanagawa', artist: 'Katsushika Hokusai', year: 1831, century: 19, museum: 'Multiple', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Wave', 'Water', 'Mountain', 'Boat'] },
  { id: '3', title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: 1665, century: 17, museum: 'Mauritshuis', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', motifs: ['Portrait', 'Face', 'Eyes', 'Jewel', 'Veil'] },
  { id: '4', title: 'The Birth of Venus', artist: 'Sandro Botticelli', year: 1485, century: 15, museum: 'Uffizi', imageUrl: 'https://images.unsplash.com/photo-1580116219976-82b82c7b6625?w=800', motifs: ['Venus', 'Sea', 'Shell', 'Wind', 'Angel'] },
  { id: '5', title: 'The Kiss', artist: 'Gustav Klimt', year: 1908, century: 20, museum: 'Belvedere', imageUrl: 'https://images.unsplash.com/photo-1578926078716-e9a044a5a0d6?w=800', motifs: ['Embracing', 'Love', 'Gold', 'Pattern', 'Robe'] },
  { id: '6', title: 'The Garden of Earthly Delights', artist: 'Hieronymus Bosch', year: 1510, century: 16, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Garden', 'Fruit', 'Bird', 'Animals', 'Fantasy'] },
  { id: '7', title: 'The Last Supper', artist: 'Leonardo da Vinci', year: 1498, century: 15, museum: 'Santa Maria', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Christ', 'Apostle', 'Last Supper', 'Table', 'Bread'] },
  { id: '8', title: 'Water Lilies', artist: 'Claude Monet', year: 1906, century: 20, museum: 'Orangerie', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['Water', 'Lily', 'Flower', 'Lake', 'Reflection'] },
  { id: '9', title: 'The Scream', artist: 'Edvard Munch', year: 1893, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Face', 'Sky', 'Bridge', 'Anguish', 'Sunset'] },
  { id: '10', title: 'Mona Lisa', artist: 'Leonardo da Vinci', year: 1503, century: 16, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Portrait', 'Smile', 'Eyes', 'Hands', 'Landscape'] },
  { id: '11', title: 'The Night Watch', artist: 'Rembrandt', year: 1642, century: 17, museum: 'Rijksmuseum', imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800', motifs: ['Group Portrait', 'Sword', 'Shield', 'Flag', 'Light'] },
  { id: '12', title: 'Las Meninas', artist: 'Diego Velázquez', year: 1656, century: 17, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Portrait', 'Mirror', 'Dog', 'Interior', 'Light'] },
  { id: '13', title: 'The Creation of Adam', artist: 'Michelangelo', year: 1512, century: 16, museum: 'Sistine Chapel', imageUrl: 'https://images.unsplash.com/photo-1578926078751-61a0db8ac9e0?w=800', motifs: ['God', 'Adam', 'Hands', 'Touching', 'Heaven'] },
  { id: '14', title: 'Guernica', artist: 'Pablo Picasso', year: 1937, century: 20, museum: 'Reina Sofia', imageUrl: 'https://images.unsplash.com/photo-1580116219976-82b82c7b6625?w=800', motifs: ['War', 'Bull', 'Horse', 'Light', 'Death'] },
  { id: '15', title: 'American Gothic', artist: 'Grant Wood', year: 1930, century: 20, museum: 'Art Institute Chicago', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Portrait', 'House', 'Pitchfork', 'Face', 'Standing'] },
  { id: '16', title: 'The Arnolfini Portrait', artist: 'Jan van Eyck', year: 1434, century: 15, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800', motifs: ['Portrait', 'Mirror', 'Dog', 'Interior', 'Hands'] },
  { id: '17', title: 'Composition VIII', artist: 'Wassily Kandinsky', year: 1923, century: 20, museum: 'Guggenheim', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Abstract', 'Circle', 'Triangle', 'Color', 'Pattern'] },
  { id: '18', title: 'The Persistence of Memory', artist: 'Salvador Dalí', year: 1931, century: 20, museum: 'MoMA', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Clock', 'Time', 'Landscape', 'Dream', 'Surreal'] },
  { id: '19', title: 'The School of Athens', artist: 'Raphael', year: 1511, century: 16, museum: 'Vatican', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Philosophy', 'Arch', 'Book', 'Gesturing', 'Group'] },
  { id: '20', title: 'Sunflowers', artist: 'Vincent van Gogh', year: 1888, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['Flower', 'Vase', 'Still Life', 'Yellow', 'Bouquet'] },
  { id: '21', title: 'The Swing', artist: 'Jean-Honoré Fragonard', year: 1767, century: 18, museum: 'Wallace Collection', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Garden', 'Tree', 'Dress', 'Love', 'Playful'] },
  { id: '22', title: 'Wanderer above the Sea of Fog', artist: 'Caspar David Friedrich', year: 1818, century: 19, museum: 'Kunsthalle Hamburg', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', motifs: ['Mountain', 'Fog', 'Standing', 'Landscape', 'Rock'] },
  { id: '23', title: 'The Hay Wain', artist: 'John Constable', year: 1821, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['River', 'Cart', 'Horse', 'Landscape', 'Tree'] },
  { id: '24', title: 'Impression, Sunrise', artist: 'Claude Monet', year: 1872, century: 19, museum: 'Marmottan Monet', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Sun', 'Boat', 'Dawn', 'Water'] },
  { id: '25', title: 'Saturn Devouring His Son', artist: 'Francisco Goya', year: 1823, century: 19, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Saturn', 'Body', 'Darkness', 'Horror', 'Eating'] },
  { id: '26', title: 'Olympia', artist: 'Édouard Manet', year: 1863, century: 19, museum: 'Orsay', imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800', motifs: ['Portrait', 'Lying', 'Cat', 'Flower', 'Interior'] },
  { id: '27', title: 'The Raft of the Medusa', artist: 'Théodore Géricault', year: 1819, century: 19, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Raft', 'Body', 'Storm', 'Death'] },
  { id: '28', title: 'Liberty Leading the People', artist: 'Eugène Delacroix', year: 1830, century: 19, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Flag', 'Battle', 'Allegory', 'Liberty', 'Revolution'] },
  { id: '29', title: 'The Fighting Temeraire', artist: 'J.M.W. Turner', year: 1839, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Ship', 'Sea', 'Sunset', 'Sky', 'Steam'] },
  { id: '30', title: 'Whistler\'s Mother', artist: 'James McNeill Whistler', year: 1871, century: 19, museum: 'Orsay', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', motifs: ['Portrait', 'Sitting', 'Interior', 'Black', 'Mother'] },
  { id: '31', title: 'The Third of May 1808', artist: 'Francisco Goya', year: 1814, century: 19, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['War', 'Death', 'Night', 'Soldier', 'Light'] },
  { id: '32', title: 'The Sistine Madonna', artist: 'Raphael', year: 1512, century: 16, museum: 'Gemäldegalerie', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', motifs: ['Madonna', 'Angel', 'Cloud', 'Christ Child', 'Halo'] },
  { id: '33', title: 'The Tower of Babel', artist: 'Pieter Bruegel', year: 1563, century: 16, museum: 'Kunsthistorisches', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Tower', 'Building', 'Landscape', 'Sky', 'Architecture'] },
  { id: '34', title: 'The Hunters in the Snow', artist: 'Pieter Bruegel', year: 1565, century: 16, museum: 'Kunsthistorisches', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', motifs: ['Snow', 'Winter', 'Hunting', 'Landscape', 'Dog'] },
  { id: '35', title: 'The Storm on the Sea of Galilee', artist: 'Rembrandt', year: 1633, century: 17, museum: 'Stolen', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Storm', 'Boat', 'Christ', 'Wave'] },
  { id: '36', title: 'Self-Portrait with Two Circles', artist: 'Rembrandt', year: 1665, century: 17, museum: 'Kenwood House', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', motifs: ['Self-Portrait', 'Circle', 'Face', 'Eyes', 'Beard'] },
  { id: '37', title: 'The Anatomy Lesson', artist: 'Rembrandt', year: 1632, century: 17, museum: 'Mauritshuis', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Group Portrait', 'Body', 'Book', 'Interior', 'Science'] },
  { id: '38', title: 'The Milkmaid', artist: 'Johannes Vermeer', year: 1658, century: 17, museum: 'Rijksmuseum', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['Interior', 'Pitcher', 'Bread', 'Window', 'Light'] },
  { id: '39', title: 'The Laughing Cavalier', artist: 'Frans Hals', year: 1624, century: 17, museum: 'Wallace Collection', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Portrait', 'Smiling', 'Beard', 'Robe', 'Face'] },
  { id: '40', title: 'The Ambassadors', artist: 'Hans Holbein', year: 1533, century: 16, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Portrait', 'Book', 'Skull', 'Globe', 'Standing'] },
  { id: '41', title: 'Primavera', artist: 'Sandro Botticelli', year: 1482, century: 15, museum: 'Uffizi', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Spring', 'Venus', 'Flower', 'Garden', 'Cupid'] },
  { id: '42', title: 'The Adoration of the Magi', artist: 'Leonardo da Vinci', year: 1482, century: 15, museum: 'Uffizi', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Christ', 'Madonna', 'Kings', 'Adoration', 'Star'] },
  { id: '43', title: 'The Ghent Altarpiece', artist: 'Jan van Eyck', year: 1432, century: 15, museum: 'St Bavo Cathedral', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Altar', 'Lamb', 'Angel', 'God', 'Fountain'] },
  { id: '44', title: 'The Annunciation', artist: 'Fra Angelico', year: 1440, century: 15, museum: 'San Marco', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Angel', 'Madonna', 'Annunciation', 'Dove', 'Arch'] },
  { id: '45', title: 'The Triumph of Death', artist: 'Pieter Bruegel', year: 1562, century: 16, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Death', 'Skeleton', 'Army', 'Landscape', 'Battle'] },
  { id: '46', title: 'Bacchus and Ariadne', artist: 'Titian', year: 1523, century: 16, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Bacchus', 'Ariadne', 'Wine', 'Leopard', 'Sky'] },
  { id: '47', title: 'Venus of Urbino', artist: 'Titian', year: 1538, century: 16, museum: 'Uffizi', imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800', motifs: ['Venus', 'Lying', 'Interior', 'Dog', 'Curtain'] },
  { id: '48', title: 'The Coronation of Napoleon', artist: 'Jacques-Louis David', year: 1807, century: 19, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Crown', 'Ceremony', 'Church', 'Napoleon', 'Pope'] },
  { id: '49', title: 'The Death of Marat', artist: 'Jacques-Louis David', year: 1793, century: 18, museum: 'Royal Museums', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Death', 'Bath', 'Letter', 'Revolution', 'Body'] },
  { id: '50', title: 'The Oath of the Horatii', artist: 'Jacques-Louis David', year: 1785, century: 18, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Oath', 'Sword', 'Arch', 'Allegory', 'Rome'] },
];

export default function MythOSExperience() {
  const [selectedMotifs, setSelectedMotifs] = useState<string[]>([]);
  const [centuryRange, setCenturyRange] = useState<[number, number]>([15, 20]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter artworks based on selected motifs and century
  const filteredArtworks = useMemo(() => {
    let filtered = ARTWORKS;

    // Filter by motifs
    if (selectedMotifs.length > 0) {
      filtered = filtered.filter(artwork =>
        selectedMotifs.some(motif => artwork.motifs.includes(motif))
      );
    }

    // Filter by century
    filtered = filtered.filter(artwork =>
      artwork.century >= centuryRange[0] && artwork.century <= centuryRange[1]
    );

    return filtered;
  }, [selectedMotifs, centuryRange]);

  // Generate exhibition title
  const exhibitionTitle = useMemo(() => {
    if (selectedMotifs.length === 0) return 'Browse All Artworks';

    const motifStr = selectedMotifs.slice(0, 3).join(' and ');
    const century1 = centuryRange[0];
    const century2 = centuryRange[1];

    if (century1 === century2) {
      return `${motifStr} in ${century1}th Century Art`;
    } else {
      return `${motifStr} across ${century1}th–${century2}th Century`;
    }
  }, [selectedMotifs, centuryRange]);

  const handleMotifChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selectedMotifs.includes(value)) {
      setSelectedMotifs([...selectedMotifs, value]);
    }
  };

  const removeMotif = (motif: string) => {
    setSelectedMotifs(selectedMotifs.filter(m => m !== motif));
  };

  const generateRandom = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomMotif = MOTIFS[Math.floor(Math.random() * MOTIFS.length)];
      setSelectedMotifs([randomMotif]);
      const randomCentury = Math.floor(Math.random() * 6) + 15;
      setCenturyRange([randomCentury, randomCentury]);
      setIsGenerating(false);
    }, 600);
  };

  // Calculate motif counts
  const motifCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MOTIFS.forEach(motif => {
      counts[motif] = ARTWORKS.filter(a => a.motifs.includes(motif)).length;
    });
    return counts;
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAFA',
      color: '#2C2C2C',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    }}>
      {/* Top Navigation */}
      <nav style={{
        borderBottom: '1px solid #DADADA',
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
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            margin: 0,
          }}>
            mythOS
          </h1>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9375rem' }}>
            <a href="#browse" style={{ color: '#2C2C2C', textDecoration: 'none' }}>Browse</a>
            <a href="#about" style={{ color: '#666666', textDecoration: 'none' }}>About</a>
          </div>
        </div>
      </nav>

      {/* Controls Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #DADADA',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: '116px',
        zIndex: 99,
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr auto',
            gap: '1rem',
            alignItems: 'end',
          }}>
            {/* Motif Selector */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.8125rem',
                fontWeight: '500',
                color: '#666666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Visual Motif
              </label>
              <select
                onChange={handleMotifChange}
                value=""
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9375rem',
                  border: '1px solid #CACACA',
                  borderRadius: '2px',
                  backgroundColor: '#FFFFFF',
                  color: '#2C2C2C',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <option value="">Select motif...</option>
                {MOTIFS.sort().map(motif => (
                  <option key={motif} value={motif}>
                    {motif} ({motifCounts[motif] || 0})
                  </option>
                ))}
              </select>

              {/* Selected Motifs */}
              {selectedMotifs.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  {selectedMotifs.map(motif => (
                    <span
                      key={motif}
                      style={{
                        padding: '0.25rem 0.625rem',
                        backgroundColor: '#2C2C2C',
                        color: '#FFFFFF',
                        fontSize: '0.8125rem',
                        borderRadius: '2px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      {motif}
                      <button
                        onClick={() => removeMotif(motif)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          padding: 0,
                          fontSize: '1rem',
                          lineHeight: 1,
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Century Range */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.8125rem',
                fontWeight: '500',
                color: '#666666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Period
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="number"
                  min="12"
                  max="21"
                  value={centuryRange[0]}
                  onChange={(e) => setCenturyRange([parseInt(e.target.value), centuryRange[1]])}
                  style={{
                    width: '4.5rem',
                    padding: '0.625rem 0.5rem',
                    fontSize: '0.9375rem',
                    border: '1px solid #CACACA',
                    borderRadius: '2px',
                    fontFamily: 'inherit',
                  }}
                />
                <span style={{ color: '#999999' }}>—</span>
                <input
                  type="number"
                  min="12"
                  max="21"
                  value={centuryRange[1]}
                  onChange={(e) => setCenturyRange([centuryRange[0], parseInt(e.target.value)])}
                  style={{
                    width: '4.5rem',
                    padding: '0.625rem 0.5rem',
                    fontSize: '0.9375rem',
                    border: '1px solid #CACACA',
                    borderRadius: '2px',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            {/* Random Button */}
            <button
              onClick={generateRandom}
              disabled={isGenerating}
              style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.9375rem',
                fontWeight: '500',
                backgroundColor: '#2C2C2C',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                opacity: isGenerating ? 0.6 : 1,
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Shuffle size={16} />
              Random
            </button>
          </div>
        </div>
      </div>

      {/* Main Gallery */}
      <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem' }}>
        {/* Exhibition Title */}
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          color: '#2C2C2C',
        }}>
          {exhibitionTitle}
        </h2>
        <p style={{
          fontSize: '0.9375rem',
          color: '#666666',
          marginBottom: '2rem',
        }}>
          {filteredArtworks.length} artworks
        </p>

        {/* Dense Masonry Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredArtworks.map((artwork) => (
            <article
              key={artwork.id}
              style={{
                cursor: 'pointer',
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '133%',
                backgroundColor: '#E8E8E8',
                marginBottom: '0.75rem',
                overflow: 'hidden',
              }}>
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 240px"
                />
              </div>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.25rem',
                color: '#2C2C2C',
                lineHeight: '1.3',
              }}>
                {artwork.title}
              </h3>
              <p style={{
                fontSize: '0.8125rem',
                color: '#666666',
                marginBottom: '0.125rem',
              }}>
                {artwork.artist}
              </p>
              <p style={{
                fontSize: '0.8125rem',
                color: '#999999',
              }}>
                {artwork.year} • {artwork.museum}
              </p>
            </article>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#999999',
          }}>
            <p>No artworks found matching your criteria.</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Try adjusting the motif selection or time period.
            </p>
          </div>
        )}
      </main>

      {/* About Section */}
      <section id="about" style={{
        borderTop: '1px solid #DADADA',
        backgroundColor: '#FFFFFF',
        padding: '4rem 2rem',
        marginTop: '4rem',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
          }}>
            About mythOS
          </h2>
          <div style={{
            lineHeight: '1.7',
            color: '#666666',
            fontSize: '0.9375rem',
          }}>
            <p style={{ marginBottom: '1rem' }}>
              mythOS uses computer vision and machine learning to explore visual patterns across art history.
              By analyzing compositional elements, iconographic motifs, and stylistic features, it reveals
              connections that transcend traditional categorization by period or artist.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Inspired by <a href="https://digitalcurator.art/" target="_blank" rel="noopener noreferrer"
              style={{ color: '#2C2C2C', textDecoration: 'underline' }}>Digital Curator</a>, this project
              explores algorithmic curation—letting AI discover patterns that might take human curators years to notice.
            </p>
            <p>
              <strong>Status:</strong> Research & Development<br />
              <strong>Technology:</strong> Next.js, TensorFlow.js, Computer Vision APIs
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
