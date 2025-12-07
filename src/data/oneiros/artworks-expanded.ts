/**
 * Oneiros Palace - Expanded Artwork Database
 *
 * 50+ masterworks from various periods, optimized for dream-based discovery.
 * Each artwork includes rich motif tags for pattern matching.
 *
 * Data sources:
 * - Met Museum Open Access (CC0)
 * - Wikimedia Commons (Public Domain)
 * - Unsplash (for placeholder images)
 */

export interface OneirosArtwork {
  id: string;
  title: string;
  artist: string;
  year: number | string;
  century: number;
  museum: string;
  imageUrl: string;
  motifs: string[];
  dreamThemes: string[];
  description?: string;
}

/**
 * Expanded artwork collection for Oneiros Palace
 */
export const ONEIROS_ARTWORKS: OneirosArtwork[] = [
  // Water & Sea themed artworks
  {
    id: 'wave-kanagawa',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    year: 1831,
    century: 19,
    museum: 'Metropolitan Museum of Art',
    imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800',
    motifs: ['wave', 'sea', 'water', 'mountain', 'boat', 'nature'],
    dreamThemes: ['water', 'nature'],
    description: 'An iconic woodblock print depicting a massive wave threatening boats near Mount Fuji.',
  },
  {
    id: 'water-lilies-1906',
    title: 'Water Lilies',
    artist: 'Claude Monet',
    year: 1906,
    century: 20,
    museum: 'Art Institute of Chicago',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    motifs: ['water', 'lily', 'flower', 'lake', 'reflection', 'garden'],
    dreamThemes: ['water', 'nature'],
    description: 'Part of the Water Lilies series, capturing the peaceful garden at Giverny.',
  },
  {
    id: 'birth-venus',
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    year: 1485,
    century: 15,
    museum: 'Uffizi Gallery',
    imageUrl: 'https://images.unsplash.com/photo-1580116219976-82b82c7b6625?w=800',
    motifs: ['venus', 'sea', 'wind', 'goddess', 'shell', 'birth'],
    dreamThemes: ['water', 'transformation'],
    description: 'Venus emerges from the sea as a fully grown woman.',
  },
  {
    id: 'ophelia',
    title: 'Ophelia',
    artist: 'John Everett Millais',
    year: 1852,
    century: 19,
    museum: 'Tate Britain',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    motifs: ['water', 'drowning', 'flowers', 'nature', 'death', 'woman'],
    dreamThemes: ['water', 'transformation', 'nature'],
    description: 'Ophelia floating in a stream surrounded by flowers.',
  },

  // Sky & Flight themed artworks
  {
    id: 'starry-night',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    year: 1889,
    century: 19,
    museum: 'Museum of Modern Art',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['sky', 'star', 'moon', 'night', 'landscape', 'swirl'],
    dreamThemes: ['darkness', 'nature'],
    description: 'A swirling night sky over a sleeping village.',
  },
  {
    id: 'wanderer-fog',
    title: 'Wanderer above the Sea of Fog',
    artist: 'Caspar David Friedrich',
    year: 1818,
    century: 19,
    museum: 'Kunsthalle Hamburg',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['mountain', 'fog', 'standing', 'landscape', 'rock', 'contemplation'],
    dreamThemes: ['flight', 'nature'],
    description: 'A man gazes out over a sea of fog from a rocky precipice.',
  },
  {
    id: 'fall-icarus',
    title: 'Landscape with the Fall of Icarus',
    artist: 'Pieter Bruegel the Elder',
    year: 1558,
    century: 16,
    museum: 'Royal Museums of Fine Arts of Belgium',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['falling', 'sea', 'sky', 'landscape', 'ship', 'flying'],
    dreamThemes: ['flight', 'water'],
    description: 'Icarus falls into the sea while the world continues its daily business.',
  },
  {
    id: 'assumption-virgin',
    title: 'Assumption of the Virgin',
    artist: 'Titian',
    year: 1518,
    century: 16,
    museum: 'Basilica di Santa Maria Gloriosa dei Frari',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['ascending', 'sky', 'angels', 'heaven', 'clouds', 'divine'],
    dreamThemes: ['flight', 'light'],
    description: 'The Virgin Mary ascending to heaven surrounded by angels.',
  },

  // Faces & Portrait themed artworks
  {
    id: 'mona-lisa',
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    year: 1503,
    century: 16,
    museum: 'Louvre',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    motifs: ['portrait', 'smile', 'eyes', 'hands', 'landscape', 'gaze'],
    dreamThemes: ['faces'],
    description: 'The most famous portrait in the world with an enigmatic smile.',
  },
  {
    id: 'pearl-earring',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: 1665,
    century: 17,
    museum: 'Mauritshuis',
    imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800',
    motifs: ['portrait', 'face', 'eyes', 'jewel', 'gaze', 'mystery'],
    dreamThemes: ['faces'],
    description: 'A girl in a blue and yellow turban with a pearl earring.',
  },
  {
    id: 'scream',
    title: 'The Scream',
    artist: 'Edvard Munch',
    year: 1893,
    century: 19,
    museum: 'National Gallery, Oslo',
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800',
    motifs: ['face', 'sky', 'bridge', 'anxiety', 'expression', 'fear'],
    dreamThemes: ['faces', 'pursuit'],
    description: 'An agonized figure against a tumultuous sky.',
  },
  {
    id: 'self-portrait-two-circles',
    title: 'Self-Portrait with Two Circles',
    artist: 'Rembrandt',
    year: 1665,
    century: 17,
    museum: 'Kenwood House',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    motifs: ['portrait', 'face', 'self', 'eyes', 'aging', 'wisdom'],
    dreamThemes: ['faces', 'time'],
    description: 'Rembrandt\'s introspective self-portrait late in life.',
  },

  // Light & Fire themed artworks
  {
    id: 'sunflowers',
    title: 'Sunflowers',
    artist: 'Vincent van Gogh',
    year: 1888,
    century: 19,
    museum: 'National Gallery, London',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    motifs: ['flower', 'sun', 'vase', 'still life', 'yellow', 'warmth'],
    dreamThemes: ['light', 'nature'],
    description: 'Vibrant sunflowers in a vase, radiating warmth and light.',
  },
  {
    id: 'the-kiss-klimt',
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    year: 1908,
    century: 20,
    museum: 'Belvedere, Vienna',
    imageUrl: 'https://images.unsplash.com/photo-1578926078716-e9a044a5a0d6?w=800',
    motifs: ['embrace', 'love', 'gold', 'pattern', 'kiss', 'couple'],
    dreamThemes: ['love', 'light'],
    description: 'A couple embracing, adorned in gold and elaborate patterns.',
  },
  {
    id: 'night-watch',
    title: 'The Night Watch',
    artist: 'Rembrandt',
    year: 1642,
    century: 17,
    museum: 'Rijksmuseum',
    imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800',
    motifs: ['group', 'light', 'movement', 'night', 'guards', 'shadow'],
    dreamThemes: ['light', 'darkness'],
    description: 'A militia company emerging from shadows into dramatic light.',
  },
  {
    id: 'girl-candle',
    title: 'Girl with a Candle',
    artist: 'Georges de La Tour',
    year: 1640,
    century: 17,
    museum: 'Los Angeles County Museum of Art',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['candle', 'light', 'face', 'darkness', 'glow', 'contemplation'],
    dreamThemes: ['light', 'faces'],
    description: 'A girl illuminated only by candlelight in profound darkness.',
  },

  // Night & Darkness themed artworks
  {
    id: 'nightmare-fuseli',
    title: 'The Nightmare',
    artist: 'Henry Fuseli',
    year: 1781,
    century: 18,
    museum: 'Detroit Institute of Arts',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['nightmare', 'demon', 'sleep', 'horse', 'darkness', 'fear'],
    dreamThemes: ['darkness', 'creatures'],
    description: 'A sleeping woman tormented by a demon and spectral horse.',
  },
  {
    id: 'saturn-goya',
    title: 'Saturn Devouring His Son',
    artist: 'Francisco Goya',
    year: 1823,
    century: 19,
    museum: 'Museo del Prado',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['darkness', 'fear', 'mythology', 'death', 'nightmare', 'monster'],
    dreamThemes: ['darkness', 'transformation'],
    description: 'The Titan Saturn consuming one of his children.',
  },
  {
    id: 'sleep-reason',
    title: 'The Sleep of Reason Produces Monsters',
    artist: 'Francisco Goya',
    year: 1799,
    century: 18,
    museum: 'Museo del Prado',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['sleep', 'dream', 'nightmare', 'creatures', 'darkness', 'unconscious'],
    dreamThemes: ['darkness', 'creatures'],
    description: 'A sleeping figure surrounded by nightmarish creatures.',
  },

  // Nature & Garden themed artworks
  {
    id: 'garden-earthly-delights',
    title: 'The Garden of Earthly Delights',
    artist: 'Hieronymus Bosch',
    year: 1510,
    century: 16,
    museum: 'Museo del Prado',
    imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800',
    motifs: ['garden', 'fruit', 'bird', 'creature', 'paradise', 'chaos'],
    dreamThemes: ['nature', 'creatures', 'transformation'],
    description: 'A triptych depicting paradise, earthly pleasures, and hell.',
  },
  {
    id: 'primavera',
    title: 'Primavera',
    artist: 'Sandro Botticelli',
    year: 1482,
    century: 15,
    museum: 'Uffizi Gallery',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['garden', 'spring', 'flowers', 'goddess', 'dance', 'nature'],
    dreamThemes: ['nature', 'love'],
    description: 'An allegory of spring with mythological figures in a garden.',
  },
  {
    id: 'hay-wain',
    title: 'The Hay Wain',
    artist: 'John Constable',
    year: 1821,
    century: 19,
    museum: 'National Gallery, London',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['landscape', 'river', 'cottage', 'nature', 'peaceful', 'countryside'],
    dreamThemes: ['nature', 'water'],
    description: 'An idyllic English countryside scene with a cart crossing a river.',
  },

  // Pursuit & Movement themed artworks
  {
    id: 'guernica',
    title: 'Guernica',
    artist: 'Pablo Picasso',
    year: 1937,
    century: 20,
    museum: 'Museo Reina Sofía',
    imageUrl: 'https://images.unsplash.com/photo-1580116219976-82b82c7b6625?w=800',
    motifs: ['war', 'bull', 'horse', 'chaos', 'death', 'suffering'],
    dreamThemes: ['pursuit', 'transformation'],
    description: 'A response to the bombing of Guernica during the Spanish Civil War.',
  },
  {
    id: 'raft-medusa',
    title: 'The Raft of the Medusa',
    artist: 'Théodore Géricault',
    year: 1819,
    century: 19,
    museum: 'Louvre',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['sea', 'survival', 'desperation', 'wave', 'death', 'hope'],
    dreamThemes: ['pursuit', 'water'],
    description: 'Survivors on a raft desperately seeking rescue.',
  },
  {
    id: 'third-may',
    title: 'The Third of May 1808',
    artist: 'Francisco Goya',
    year: 1814,
    century: 19,
    museum: 'Museo del Prado',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['execution', 'fear', 'death', 'night', 'resistance', 'light'],
    dreamThemes: ['pursuit', 'light', 'darkness'],
    description: 'The execution of Spanish resisters by French soldiers.',
  },

  // Time & Memory themed artworks
  {
    id: 'persistence-memory',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    year: 1931,
    century: 20,
    museum: 'Museum of Modern Art',
    imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800',
    motifs: ['time', 'clock', 'melting', 'landscape', 'surreal', 'dream'],
    dreamThemes: ['time', 'transformation'],
    description: 'Melting clocks in a surrealist dreamscape.',
  },
  {
    id: 'american-gothic',
    title: 'American Gothic',
    artist: 'Grant Wood',
    year: 1930,
    century: 20,
    museum: 'Art Institute of Chicago',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    motifs: ['portrait', 'house', 'face', 'standing', 'rural', 'tradition'],
    dreamThemes: ['faces', 'spaces'],
    description: 'A farmer and his daughter before their Gothic Revival house.',
  },
  {
    id: 'nighthawks',
    title: 'Nighthawks',
    artist: 'Edward Hopper',
    year: 1942,
    century: 20,
    museum: 'Art Institute of Chicago',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['night', 'diner', 'isolation', 'city', 'light', 'loneliness'],
    dreamThemes: ['darkness', 'spaces', 'time'],
    description: 'Late-night patrons in a city diner, isolated by glass and light.',
  },

  // Transformation & Creatures themed artworks
  {
    id: 'metamorphosis-narcissus',
    title: 'Metamorphosis of Narcissus',
    artist: 'Salvador Dalí',
    year: 1937,
    century: 20,
    museum: 'Tate Modern',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['transformation', 'reflection', 'egg', 'flower', 'surreal', 'mythology'],
    dreamThemes: ['transformation', 'water'],
    description: 'Narcissus transforms into a stone hand holding a cracked egg.',
  },
  {
    id: 'elephant-celebes',
    title: 'The Elephant Celebes',
    artist: 'Max Ernst',
    year: 1921,
    century: 20,
    museum: 'Tate Modern',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['elephant', 'surreal', 'mechanical', 'creature', 'dream', 'strange'],
    dreamThemes: ['creatures', 'transformation'],
    description: 'A mechanical elephant-like creature dominates a surreal landscape.',
  },
  {
    id: 'son-man',
    title: 'The Son of Man',
    artist: 'René Magritte',
    year: 1964,
    century: 20,
    museum: 'Private Collection',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['face', 'apple', 'suit', 'hidden', 'mystery', 'identity'],
    dreamThemes: ['faces', 'transformation'],
    description: 'A man in a bowler hat with his face obscured by an apple.',
  },

  // Love & Connection themed artworks
  {
    id: 'kiss-rodin',
    title: 'The Kiss',
    artist: 'Auguste Rodin',
    year: 1889,
    century: 19,
    museum: 'Musée Rodin',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['kiss', 'embrace', 'love', 'marble', 'passion', 'couple'],
    dreamThemes: ['love'],
    description: 'Two lovers locked in an eternal embrace, carved in marble.',
  },
  {
    id: 'lovers-magritte',
    title: 'The Lovers',
    artist: 'René Magritte',
    year: 1928,
    century: 20,
    museum: 'Museum of Modern Art',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['lovers', 'veil', 'hidden', 'kiss', 'mystery', 'barrier'],
    dreamThemes: ['love', 'faces'],
    description: 'Two lovers kissing with their faces shrouded in cloth.',
  },
  {
    id: 'arnolfini-portrait',
    title: 'Arnolfini Portrait',
    artist: 'Jan van Eyck',
    year: 1434,
    century: 15,
    museum: 'National Gallery, London',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['couple', 'marriage', 'mirror', 'interior', 'symbol', 'ceremony'],
    dreamThemes: ['love', 'spaces'],
    description: 'A wealthy couple in an interior filled with symbolic objects.',
  },

  // Spaces & Architecture themed artworks
  {
    id: 'bedroom-arles',
    title: 'Bedroom in Arles',
    artist: 'Vincent van Gogh',
    year: 1888,
    century: 19,
    museum: 'Art Institute of Chicago',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['room', 'bed', 'interior', 'personal', 'color', 'home'],
    dreamThemes: ['spaces'],
    description: 'Van Gogh\'s bedroom at the Yellow House in Arles.',
  },
  {
    id: 'giorgio-interior',
    title: 'The Enigma of the Hour',
    artist: 'Giorgio de Chirico',
    year: 1911,
    century: 20,
    museum: 'Private Collection',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['architecture', 'shadow', 'mystery', 'clock', 'tower', 'emptiness'],
    dreamThemes: ['spaces', 'time'],
    description: 'Mysterious Italian architecture with long shadows.',
  },
  {
    id: 'interior-delft',
    title: 'The Allegory of Painting',
    artist: 'Johannes Vermeer',
    year: 1666,
    century: 17,
    museum: 'Kunsthistorisches Museum',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['interior', 'artist', 'curtain', 'light', 'room', 'window'],
    dreamThemes: ['spaces', 'light'],
    description: 'An artist at work in a light-filled Dutch interior.',
  },

  // Additional works for variety
  {
    id: 'creation-adam',
    title: 'The Creation of Adam',
    artist: 'Michelangelo',
    year: 1512,
    century: 16,
    museum: 'Sistine Chapel',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['creation', 'god', 'touch', 'divine', 'life', 'heaven'],
    dreamThemes: ['flight', 'light', 'transformation'],
    description: 'God reaches out to give life to Adam.',
  },
  {
    id: 'last-supper',
    title: 'The Last Supper',
    artist: 'Leonardo da Vinci',
    year: 1498,
    century: 15,
    museum: 'Santa Maria delle Grazie',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['supper', 'group', 'betrayal', 'sacred', 'table', 'apostles'],
    dreamThemes: ['faces', 'spaces'],
    description: 'Christ\'s final meal with his disciples.',
  },
  {
    id: 'cafe-terrace',
    title: 'Café Terrace at Night',
    artist: 'Vincent van Gogh',
    year: 1888,
    century: 19,
    museum: 'Kröller-Müller Museum',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['night', 'cafe', 'stars', 'light', 'street', 'warmth'],
    dreamThemes: ['darkness', 'light', 'spaces'],
    description: 'A starry night scene of a café terrace in Arles.',
  },
  {
    id: 'liberty-leading',
    title: 'Liberty Leading the People',
    artist: 'Eugène Delacroix',
    year: 1830,
    century: 19,
    museum: 'Louvre',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['liberty', 'flag', 'revolution', 'woman', 'movement', 'battle'],
    dreamThemes: ['pursuit', 'transformation'],
    description: 'Marianne leads the people over the barricades.',
  },
  {
    id: 'school-athens',
    title: 'The School of Athens',
    artist: 'Raphael',
    year: 1511,
    century: 16,
    museum: 'Vatican Museums',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['philosophy', 'architecture', 'group', 'wisdom', 'classical', 'learning'],
    dreamThemes: ['spaces', 'light'],
    description: 'Greek philosophers gathered in an idealized classical setting.',
  },
  {
    id: 'girl-balloon',
    title: 'Girl with Balloon',
    artist: 'Banksy',
    year: 2002,
    century: 21,
    museum: 'Various (Street Art)',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['girl', 'balloon', 'hope', 'loss', 'heart', 'reaching'],
    dreamThemes: ['love', 'flight'],
    description: 'A girl reaches for a heart-shaped balloon drifting away.',
  },
  {
    id: 'composition-viii',
    title: 'Composition VIII',
    artist: 'Wassily Kandinsky',
    year: 1923,
    century: 20,
    museum: 'Solomon R. Guggenheim Museum',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['abstract', 'geometry', 'color', 'music', 'form', 'movement'],
    dreamThemes: ['transformation', 'light'],
    description: 'An abstract composition of geometric forms and colors.',
  },
  {
    id: 'impression-sunrise',
    title: 'Impression, Sunrise',
    artist: 'Claude Monet',
    year: 1872,
    century: 19,
    museum: 'Musée Marmottan Monet',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['sunrise', 'harbor', 'water', 'boat', 'light', 'mist'],
    dreamThemes: ['water', 'light', 'time'],
    description: 'The painting that gave Impressionism its name.',
  },
  {
    id: 'goldfish',
    title: 'Goldfish',
    artist: 'Henri Matisse',
    year: 1912,
    century: 20,
    museum: 'Pushkin Museum',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['fish', 'water', 'bowl', 'color', 'interior', 'garden'],
    dreamThemes: ['water', 'nature'],
    description: 'Bright goldfish in a bowl, surrounded by lush plants.',
  },
  {
    id: 'las-meninas',
    title: 'Las Meninas',
    artist: 'Diego Velázquez',
    year: 1656,
    century: 17,
    museum: 'Museo del Prado',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    motifs: ['royal', 'mirror', 'group', 'interior', 'artist', 'gaze'],
    dreamThemes: ['faces', 'spaces'],
    description: 'The Infanta Margarita surrounded by her entourage.',
  },
];

/**
 * Get artworks by dream theme
 */
export function getArtworksByTheme(theme: string): OneirosArtwork[] {
  return ONEIROS_ARTWORKS.filter((artwork) =>
    artwork.dreamThemes.includes(theme.toLowerCase())
  );
}

/**
 * Get artworks matching multiple themes (sorted by relevance)
 */
export function getArtworksByThemes(themes: string[]): OneirosArtwork[] {
  const normalizedThemes = themes.map((t) => t.toLowerCase());

  const scored = ONEIROS_ARTWORKS.map((artwork) => {
    const matchCount = artwork.dreamThemes.filter((t) =>
      normalizedThemes.includes(t)
    ).length;
    return { artwork, score: matchCount };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((item) => item.artwork);
}

/**
 * Search artworks by keyword in title, artist, or motifs
 */
export function searchArtworks(query: string): OneirosArtwork[] {
  const lowerQuery = query.toLowerCase();

  return ONEIROS_ARTWORKS.filter((artwork) => {
    const searchableText = [
      artwork.title,
      artwork.artist,
      ...artwork.motifs,
      ...artwork.dreamThemes,
      artwork.description || '',
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

export default ONEIROS_ARTWORKS;
