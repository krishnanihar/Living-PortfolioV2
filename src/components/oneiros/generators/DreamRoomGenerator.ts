/**
 * Dream Room Generator
 *
 * Generates personalized gallery rooms based on dream analysis.
 * Maps dream themes to room configurations and selects matching artworks.
 */

import type { PatternAnalysisResponse, GeneratedRoom, DreamTheme } from '@/types/oneiros';
import type { OneirosArtwork } from '@/data/oneiros/artworks-expanded';
import type { DreamRoom } from '@/data/oneiros/artwork-mappings';
import { ONEIROS_ARTWORKS, getArtworksByThemes } from '@/data/oneiros/artworks-expanded';
import { DREAM_ROOMS, matchPatternsToRooms } from '@/data/oneiros/artwork-mappings';

/**
 * Generate rooms from pattern analysis
 *
 * @param analysis - The pattern analysis response from the API
 * @param maxRooms - Maximum number of rooms to generate (default: 2)
 * @returns Array of generated rooms with artworks
 */
export function generateRoomsFromAnalysis(
  analysis: PatternAnalysisResponse,
  maxRooms: number = 2
): GeneratedRoom[] {
  // 1. Extract theme names with frequencies
  const themeData = analysis.themes.map((t) => ({
    name: t.name,
    frequency: t.frequency,
  }));

  // 2. Match patterns to predefined rooms
  const matchedRooms = matchPatternsToRooms(themeData);

  // 3. If no matches, use default rooms based on emotional signature
  let selectedRooms: DreamRoom[];
  if (matchedRooms.length === 0) {
    selectedRooms = getDefaultRooms(analysis.emotionalSignature.primary, maxRooms);
  } else {
    selectedRooms = matchedRooms.slice(0, maxRooms);
  }

  // 4. Generate room configurations with artworks
  const usedArtworkIds = new Set<string>();

  return selectedRooms.map((room, index) => {
    const artworks = selectArtworksForRoom(room, ONEIROS_ARTWORKS, 6, usedArtworkIds);
    artworks.forEach((a) => usedArtworkIds.add(a.id));

    return {
      roomConfig: room,
      artworks,
      position: calculateRoomPosition(index),
    };
  });
}

/**
 * Select artworks that match a room's themes
 *
 * @param room - The dream room configuration
 * @param allArtworks - All available artworks
 * @param count - Number of artworks to select
 * @param usedIds - Set of already used artwork IDs (to avoid duplicates)
 * @returns Array of selected artworks
 */
export function selectArtworksForRoom(
  room: DreamRoom,
  allArtworks: OneirosArtwork[],
  count: number = 6,
  usedIds: Set<string> = new Set()
): OneirosArtwork[] {
  // Get artworks matching the room's themes
  const matchedArtworks = getArtworksByThemes(room.themes);

  // Filter out already used artworks
  const availableArtworks = matchedArtworks.filter((a) => !usedIds.has(a.id));

  // If we have enough, return them
  if (availableArtworks.length >= count) {
    return availableArtworks.slice(0, count);
  }

  // Otherwise, supplement with random artworks not yet used
  const remaining = count - availableArtworks.length;
  const unusedArtworks = allArtworks.filter(
    (a) => !usedIds.has(a.id) && !availableArtworks.some((m) => m.id === a.id)
  );

  // Shuffle and take remaining
  const shuffled = [...unusedArtworks].sort(() => Math.random() - 0.5);
  const supplemental = shuffled.slice(0, remaining);

  return [...availableArtworks, ...supplemental];
}

/**
 * Calculate room position in world space
 *
 * @param roomIndex - Index of the room (0 = entrance)
 * @returns Position coordinates
 */
export function calculateRoomPosition(roomIndex: number): { x: number; z: number } {
  // Entrance room at origin
  if (roomIndex === 0) {
    return { x: 0, z: 0 };
  }

  // Subsequent rooms offset along Z axis (deeper into palace)
  // Each room is 30 units deep + 10 unit gap
  return {
    x: 0,
    z: -roomIndex * 40,
  };
}

/**
 * Get default rooms based on emotional signature
 *
 * @param primaryEmotion - The primary emotion from analysis
 * @param count - Number of rooms to return
 * @returns Array of default dream rooms
 */
function getDefaultRooms(primaryEmotion: string, count: number): DreamRoom[] {
  const emotionLower = primaryEmotion.toLowerCase();

  // Map emotions to room preferences
  const emotionRoomMap: Record<string, string[]> = {
    anxiety: ['labyrinth', 'twilight'],
    fear: ['labyrinth', 'threshold'],
    joy: ['hearth', 'garden'],
    happiness: ['hearth', 'ascent'],
    nostalgia: ['twilight', 'depths'],
    wonder: ['ascent', 'garden'],
    curiosity: ['threshold', 'gaze'],
    love: ['hearth', 'garden'],
    sadness: ['depths', 'twilight'],
    confusion: ['labyrinth', 'gaze'],
  };

  // Find matching room IDs
  const preferredIds = Object.entries(emotionRoomMap).find(([emotion]) =>
    emotionLower.includes(emotion)
  )?.[1] || ['ascent', 'depths']; // Default to ascent and depths

  // Get the actual room configs
  const rooms = preferredIds
    .map((id) => DREAM_ROOMS.find((r) => r.id === id))
    .filter((r): r is DreamRoom => r !== undefined)
    .slice(0, count);

  // Fallback if no rooms found
  if (rooms.length === 0) {
    return DREAM_ROOMS.slice(0, count);
  }

  return rooms;
}

/**
 * Get a room by ID
 */
export function getRoomById(id: string): DreamRoom | undefined {
  return DREAM_ROOMS.find((r) => r.id === id);
}

/**
 * Get default entrance room
 */
export function getDefaultEntranceRoom(): GeneratedRoom {
  const entranceRoom = DREAM_ROOMS.find((r) => r.id === 'ascent') || DREAM_ROOMS[0];

  return {
    roomConfig: entranceRoom,
    artworks: ONEIROS_ARTWORKS.slice(0, 6),
    position: { x: 0, z: 0 },
  };
}
