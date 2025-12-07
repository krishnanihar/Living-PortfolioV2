/**
 * Met Museum API Integration for Oneiros Palace
 *
 * Fetches public domain artworks from the Metropolitan Museum of Art.
 * API Documentation: https://metmuseum.github.io/
 *
 * Features:
 * - Search artworks by keyword
 * - Filter by department (paintings, sculptures, etc.)
 * - Returns high-quality public domain images (CC0)
 */

import { NextRequest, NextResponse } from 'next/server';

const MET_API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

// Art-relevant departments at the Met
const ART_DEPARTMENTS = [
  11, // European Paintings
  21, // Modern Art
  6, // Asian Art
  13, // Greek and Roman Art
  14, // Islamic Art
  15, // European Decorative Arts
  19, // Photographs
];

interface MetArtwork {
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  primaryImage: string;
  primaryImageSmall: string;
  department: string;
  medium: string;
  dimensions: string;
  country: string;
  tags: Array<{ term: string }> | null;
}

interface ArtworkResult {
  id: string;
  title: string;
  artist: string;
  year: string;
  imageUrl: string;
  thumbnailUrl: string;
  museum: string;
  motifs: string[];
  dreamThemes: string[];
}

/**
 * Map Met Museum tags to dream themes
 */
function mapTagsToDreamThemes(tags: Array<{ term: string }> | null): string[] {
  if (!tags) return [];

  const themeMapping: Record<string, string[]> = {
    // Water
    water: ['water'],
    sea: ['water'],
    ocean: ['water'],
    river: ['water'],
    lake: ['water'],
    waves: ['water'],
    swimming: ['water'],

    // Flight
    sky: ['flight'],
    clouds: ['flight'],
    birds: ['flight'],
    angels: ['flight'],
    wings: ['flight'],
    flying: ['flight'],

    // Faces
    portrait: ['faces'],
    face: ['faces'],
    eyes: ['faces'],
    self: ['faces'],
    woman: ['faces'],
    man: ['faces'],

    // Light
    sun: ['light'],
    fire: ['light'],
    candle: ['light'],
    light: ['light'],
    gold: ['light'],

    // Darkness
    night: ['darkness'],
    moon: ['darkness'],
    stars: ['darkness'],
    shadow: ['darkness'],

    // Nature
    tree: ['nature'],
    flower: ['nature'],
    garden: ['nature'],
    landscape: ['nature'],
    mountain: ['nature'],

    // Transformation
    death: ['transformation'],
    mythology: ['transformation'],
    metamorphosis: ['transformation'],

    // Love
    love: ['love'],
    embrace: ['love'],
    kiss: ['love'],
    couple: ['love'],

    // Time
    clock: ['time'],
    time: ['time'],
    ancient: ['time'],

    // Creatures
    animal: ['creatures'],
    horse: ['creatures'],
    dragon: ['creatures'],

    // Spaces
    building: ['spaces'],
    architecture: ['spaces'],
    interior: ['spaces'],
    room: ['spaces'],

    // Pursuit
    war: ['pursuit'],
    battle: ['pursuit'],
    running: ['pursuit'],
  };

  const themes = new Set<string>();

  for (const tag of tags) {
    const term = tag.term.toLowerCase();
    for (const [keyword, mappedThemes] of Object.entries(themeMapping)) {
      if (term.includes(keyword)) {
        mappedThemes.forEach((t) => themes.add(t));
      }
    }
  }

  return Array.from(themes);
}

/**
 * GET /api/artworks
 *
 * Query params:
 * - q: Search query (optional)
 * - limit: Max results (default 20, max 50)
 * - theme: Filter by dream theme (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'painting';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const theme = searchParams.get('theme');

    // Search Met Museum
    const searchUrl = `${MET_API_BASE}/search?q=${encodeURIComponent(query)}&hasImages=true&isPublicDomain=true`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
      return NextResponse.json({ artworks: [], total: 0 });
    }

    // Fetch details for top results
    const objectIDs = searchData.objectIDs.slice(0, limit * 2); // Fetch extra in case some fail
    const artworkPromises = objectIDs.map(async (id: number): Promise<ArtworkResult | null> => {
      try {
        const objectUrl = `${MET_API_BASE}/objects/${id}`;
        const objectResponse = await fetch(objectUrl);
        const artwork: MetArtwork = await objectResponse.json();

        // Skip if no image
        if (!artwork.primaryImage) return null;

        const dreamThemes = mapTagsToDreamThemes(artwork.tags);

        // Filter by theme if specified
        if (theme && !dreamThemes.includes(theme)) return null;

        return {
          id: `met-${artwork.objectID}`,
          title: artwork.title || 'Untitled',
          artist: artwork.artistDisplayName || 'Unknown Artist',
          year: artwork.objectDate || 'Unknown',
          imageUrl: artwork.primaryImage,
          thumbnailUrl: artwork.primaryImageSmall || artwork.primaryImage,
          museum: 'Metropolitan Museum of Art',
          motifs: artwork.tags?.map((t) => t.term.toLowerCase()) || [],
          dreamThemes,
        };
      } catch {
        return null;
      }
    });

    const results = await Promise.all(artworkPromises);
    const artworks = results.filter((a): a is ArtworkResult => a !== null).slice(0, limit);

    return NextResponse.json({
      artworks,
      total: searchData.total,
      source: 'Metropolitan Museum of Art',
    });
  } catch (error) {
    console.error('Met Museum API error:', error);
    return NextResponse.json({ error: 'Failed to fetch artworks' }, { status: 500 });
  }
}
