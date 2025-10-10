export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  century: number;
  museum: string;
  imageUrl: string;
  motifs: string[];
}

export const ARTWORKS: Artwork[] = [
  { id: '1', title: 'The Starry Night', artist: 'Vincent van Gogh', year: 1889, century: 19, museum: 'MoMA', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', motifs: ['Sky', 'Star', 'Moon', 'Night', 'Landscape'] },
  { id: '2', title: 'The Great Wave off Kanagawa', artist: 'Katsushika Hokusai', year: 1831, century: 19, museum: 'Multiple', imageUrl: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800', motifs: ['Sea', 'Wave', 'Water', 'Mountain'] },
  { id: '3', title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: 1665, century: 17, museum: 'Mauritshuis', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', motifs: ['Portrait', 'Face', 'Eyes', 'Jewel'] },
  { id: '4', title: 'The Birth of Venus', artist: 'Sandro Botticelli', year: 1485, century: 15, museum: 'Uffizi', imageUrl: 'https://images.unsplash.com/photo-1580116219976-82b82c7b6625?w=800', motifs: ['Venus', 'Sea', 'Wind', 'Angel'] },
  { id: '5', title: 'The Kiss', artist: 'Gustav Klimt', year: 1908, century: 20, museum: 'Belvedere', imageUrl: 'https://images.unsplash.com/photo-1578926078716-e9a044a5a0d6?w=800', motifs: ['Embracing', 'Love', 'Gold', 'Pattern'] },
  { id: '6', title: 'The Garden of Earthly Delights', artist: 'Hieronymus Bosch', year: 1510, century: 16, museum: 'Prado', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Garden', 'Fruit', 'Bird'] },
  { id: '7', title: 'Water Lilies', artist: 'Claude Monet', year: 1906, century: 20, museum: 'Orangerie', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['Water', 'Lily', 'Flower', 'Lake', 'Reflection'] },
  { id: '8', title: 'The Scream', artist: 'Edvard Munch', year: 1893, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f89f6ceb0?w=800', motifs: ['Face', 'Sky', 'Bridge', 'Sunset'] },
  { id: '9', title: 'Mona Lisa', artist: 'Leonardo da Vinci', year: 1503, century: 16, museum: 'Louvre', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Portrait', 'Smile', 'Eyes', 'Hands', 'Landscape'] },
  { id: '10', title: 'The Night Watch', artist: 'Rembrandt', year: 1642, century: 17, museum: 'Rijksmuseum', imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800', motifs: ['Group Portrait', 'Sword', 'Shield', 'Flag', 'Light'] },
  { id: '11', title: 'Guernica', artist: 'Pablo Picasso', year: 1937, century: 20, museum: 'Reina Sofia', imageUrl: 'https://images.unsplash.com/photo-1580116219976-82b82c7b6625?w=800', motifs: ['War', 'Bull', 'Horse', 'Light', 'Death'] },
  { id: '12', title: 'American Gothic', artist: 'Grant Wood', year: 1930, century: 20, museum: 'Art Institute Chicago', imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', motifs: ['Portrait', 'House', 'Face', 'Standing'] },
  { id: '13', title: 'The Persistence of Memory', artist: 'Salvador Dalí', year: 1931, century: 20, museum: 'MoMA', imageUrl: 'https://images.unsplash.com/photo-1579783928621-09d1cda62eab?w=800', motifs: ['Time', 'Landscape'] },
  { id: '14', title: 'Sunflowers', artist: 'Vincent van Gogh', year: 1888, century: 19, museum: 'National Gallery', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', motifs: ['Flower', 'Vase', 'Still Life'] },
  { id: '15', title: 'Wanderer above the Sea of Fog', artist: 'Caspar David Friedrich', year: 1818, century: 19, museum: 'Kunsthalle Hamburg', imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', motifs: ['Mountain', 'Standing', 'Landscape', 'Rock'] },
];
