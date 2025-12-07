'use client';

/**
 * useArtworks Hook - Data fetching and caching for Oneiros Palace
 *
 * Features:
 * - Fetches artworks from Met Museum API
 * - Falls back to local expanded artworks database
 * - Caches data in localStorage with TTL
 * - Supports filtering by dream themes
 */

import { useState, useEffect, useCallback } from 'react';
import {
  ONEIROS_ARTWORKS,
  getArtworksByTheme,
  getArtworksByThemes,
  searchArtworks,
  type OneirosArtwork,
} from '@/data/oneiros/artworks-expanded';

// Cache configuration
const CACHE_KEY = 'oneiros-artworks-cache';
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

interface CacheEntry {
  artworks: OneirosArtwork[];
  timestamp: number;
  source: 'local' | 'api';
}

interface UseArtworksOptions {
  themes?: string[];
  query?: string;
  limit?: number;
  useApi?: boolean;
}

interface UseArtworksResult {
  artworks: OneirosArtwork[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  source: 'local' | 'api' | 'cache';
}

/**
 * Get cached artworks from localStorage
 */
function getCachedArtworks(): CacheEntry | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const entry: CacheEntry = JSON.parse(cached);

    // Check if cache is still valid
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return entry;
  } catch {
    return null;
  }
}

/**
 * Save artworks to localStorage cache
 */
function setCachedArtworks(artworks: OneirosArtwork[], source: 'local' | 'api'): void {
  if (typeof window === 'undefined') return;

  try {
    const entry: CacheEntry = {
      artworks,
      timestamp: Date.now(),
      source,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Silently fail if localStorage is full or unavailable
  }
}

/**
 * Fetch artworks from Met Museum API
 */
async function fetchFromApi(
  query: string = 'painting',
  limit: number = 20,
  theme?: string
): Promise<OneirosArtwork[]> {
  const params = new URLSearchParams({
    q: query,
    limit: limit.toString(),
  });

  if (theme) {
    params.set('theme', theme);
  }

  const response = await fetch(`/api/artworks?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch from API');
  }

  const data = await response.json();

  // Convert API response to OneirosArtwork format
  return data.artworks.map(
    (artwork: {
      id: string;
      title: string;
      artist: string;
      year: string | number;
      imageUrl: string;
      thumbnailUrl: string;
      museum: string;
      motifs: string[];
      dreamThemes: string[];
    }) => ({
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      year: artwork.year,
      century: Math.floor(parseInt(String(artwork.year)) / 100) + 1 || 20,
      museum: artwork.museum,
      imageUrl: artwork.thumbnailUrl || artwork.imageUrl,
      motifs: artwork.motifs,
      dreamThemes: artwork.dreamThemes,
    })
  );
}

/**
 * useArtworks Hook
 *
 * @param options - Configuration options
 * @returns Artworks data, loading state, and refetch function
 *
 * @example
 * // Get all artworks
 * const { artworks, loading } = useArtworks();
 *
 * @example
 * // Get artworks by dream themes
 * const { artworks } = useArtworks({ themes: ['water', 'flight'] });
 *
 * @example
 * // Search artworks
 * const { artworks } = useArtworks({ query: 'starry night' });
 */
export function useArtworks(options: UseArtworksOptions = {}): UseArtworksResult {
  const { themes, query, limit = 50, useApi = false } = options;

  const [artworks, setArtworks] = useState<OneirosArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'local' | 'api' | 'cache'>('local');

  const fetchArtworks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check cache first
      const cached = getCachedArtworks();
      if (cached && !query && !themes) {
        setArtworks(cached.artworks.slice(0, limit));
        setSource('cache');
        setLoading(false);
        return;
      }

      // Try API if enabled
      if (useApi) {
        try {
          const apiArtworks = await fetchFromApi(
            query || 'masterpiece',
            limit,
            themes?.[0]
          );

          if (apiArtworks.length > 0) {
            setArtworks(apiArtworks);
            setSource('api');
            setCachedArtworks(apiArtworks, 'api');
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.warn('API fetch failed, falling back to local:', apiError);
        }
      }

      // Fall back to local database
      let localArtworks: OneirosArtwork[];

      if (query) {
        localArtworks = searchArtworks(query);
      } else if (themes && themes.length > 0) {
        if (themes.length === 1) {
          localArtworks = getArtworksByTheme(themes[0]);
        } else {
          localArtworks = getArtworksByThemes(themes);
        }
      } else {
        localArtworks = [...ONEIROS_ARTWORKS];
      }

      setArtworks(localArtworks.slice(0, limit));
      setSource('local');
      setCachedArtworks(localArtworks, 'local');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch artworks');
      // Return local artworks on error
      setArtworks(ONEIROS_ARTWORKS.slice(0, limit));
      setSource('local');
    } finally {
      setLoading(false);
    }
  }, [themes, query, limit, useApi]);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  return {
    artworks,
    loading,
    error,
    refetch: fetchArtworks,
    source,
  };
}

/**
 * Get artworks for a specific dream room
 */
export function useRoomArtworks(roomThemes: string[], count: number = 6) {
  const { artworks, loading } = useArtworks({
    themes: roomThemes,
    limit: count,
  });

  return { artworks, loading };
}

/**
 * Get random artworks for variety
 */
export function useRandomArtworks(count: number = 6) {
  const [randomized, setRandomized] = useState<OneirosArtwork[]>([]);

  useEffect(() => {
    const shuffled = [...ONEIROS_ARTWORKS].sort(() => Math.random() - 0.5);
    setRandomized(shuffled.slice(0, count));
  }, [count]);

  return randomized;
}

export default useArtworks;
