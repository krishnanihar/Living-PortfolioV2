/**
 * Oneiros Palace - Artwork Motif Mappings
 *
 * Maps dream themes/patterns to artwork motifs for personalized room generation.
 * When users describe their dreams, the PatternAnalyzer identifies themes,
 * which then map to specific artworks through this taxonomy.
 */

/**
 * Motif taxonomy mapping dream themes to visual search terms
 */
export const MOTIF_TAXONOMY: Record<string, string[]> = {
  // Water & Fluidity
  water: ['sea', 'ocean', 'river', 'rain', 'waves', 'water', 'lake', 'reflection', 'flood', 'swimming'],

  // Flight & Heights
  flight: ['sky', 'clouds', 'birds', 'angels', 'wings', 'flying', 'falling', 'ascending', 'heaven'],

  // Faces & Identity
  faces: ['portrait', 'eyes', 'gaze', 'expression', 'face', 'mask', 'mirror', 'self'],

  // Pursuit & Movement
  pursuit: ['movement', 'running', 'chase', 'escape', 'journey', 'path', 'road', 'walking'],

  // Light & Fire
  light: ['sun', 'fire', 'candle', 'glow', 'radiance', 'light', 'flame', 'warmth', 'gold'],

  // Night & Darkness
  darkness: ['night', 'moon', 'star', 'shadow', 'darkness', 'dream', 'sleep', 'nocturnal'],

  // Nature & Growth
  nature: ['tree', 'flower', 'garden', 'forest', 'plant', 'leaf', 'landscape', 'mountain'],

  // Death & Transformation
  transformation: ['death', 'skull', 'skeleton', 'metamorphosis', 'change', 'rebirth', 'cycle'],

  // Love & Connection
  love: ['embrace', 'kiss', 'lovers', 'heart', 'couple', 'love', 'passion', 'romance'],

  // Time & Memory
  time: ['clock', 'time', 'memory', 'past', 'future', 'age', 'history', 'ancient'],

  // Animals & Creatures
  creatures: ['animal', 'horse', 'bird', 'fish', 'creature', 'beast', 'dragon', 'serpent'],

  // Architecture & Spaces
  spaces: ['building', 'house', 'room', 'door', 'window', 'stairs', 'tower', 'castle', 'temple'],
};

/**
 * Room definitions based on dream themes
 */
export interface DreamRoom {
  id: string;
  name: string;
  description: string;
  themes: string[];
  atmosphere: {
    primaryColor: string;
    secondaryColor: string;
    ambientIntensity: number;
    particleDensity: number;
  };
  sleepStage: 'N1' | 'N2' | 'N3' | 'REM';
}

export const DREAM_ROOMS: DreamRoom[] = [
  {
    id: 'depths',
    name: 'The Depths',
    description: 'Where water flows through memory and consciousness dissolves into waves.',
    themes: ['water'],
    atmosphere: {
      primaryColor: '#06B6D4', // Cyan
      secondaryColor: '#0284C7', // Sky blue
      ambientIntensity: 0.4,
      particleDensity: 0.6,
    },
    sleepStage: 'N2',
  },
  {
    id: 'ascent',
    name: 'The Ascent',
    description: 'Rising through clouds, defying gravity in the realm of possibility.',
    themes: ['flight'],
    atmosphere: {
      primaryColor: '#8B5CF6', // Purple
      secondaryColor: '#A78BFA', // Light purple
      ambientIntensity: 0.5,
      particleDensity: 0.4,
    },
    sleepStage: 'N2',
  },
  {
    id: 'gaze',
    name: 'The Gaze',
    description: 'Eyes that follow, faces that shift. Who watches when you dream?',
    themes: ['faces'],
    atmosphere: {
      primaryColor: '#EC4899', // Pink
      secondaryColor: '#F472B6', // Light pink
      ambientIntensity: 0.35,
      particleDensity: 0.3,
    },
    sleepStage: 'N3',
  },
  {
    id: 'labyrinth',
    name: 'The Labyrinth',
    description: 'Endless corridors of pursuit. Running through the architecture of anxiety.',
    themes: ['pursuit', 'spaces'],
    atmosphere: {
      primaryColor: '#EF4444', // Red
      secondaryColor: '#DC2626', // Dark red
      ambientIntensity: 0.25,
      particleDensity: 0.7,
    },
    sleepStage: 'N3',
  },
  {
    id: 'hearth',
    name: 'The Hearth',
    description: 'Golden light and warmth. The comfort of illumination.',
    themes: ['light', 'love'],
    atmosphere: {
      primaryColor: '#F59E0B', // Amber
      secondaryColor: '#FBBF24', // Yellow
      ambientIntensity: 0.6,
      particleDensity: 0.3,
    },
    sleepStage: 'N1',
  },
  {
    id: 'twilight',
    name: 'The Twilight',
    description: 'Between sleeping and waking, where stars whisper secrets.',
    themes: ['darkness', 'time'],
    atmosphere: {
      primaryColor: '#6366F1', // Indigo
      secondaryColor: '#4F46E5', // Dark indigo
      ambientIntensity: 0.2,
      particleDensity: 0.8,
    },
    sleepStage: 'REM',
  },
  {
    id: 'garden',
    name: 'The Garden',
    description: 'Where growth is eternal and nature speaks in color.',
    themes: ['nature'],
    atmosphere: {
      primaryColor: '#10B981', // Emerald
      secondaryColor: '#34D399', // Light emerald
      ambientIntensity: 0.5,
      particleDensity: 0.5,
    },
    sleepStage: 'N2',
  },
  {
    id: 'threshold',
    name: 'The Threshold',
    description: 'The edge between states. Transformation is inevitable.',
    themes: ['transformation', 'creatures'],
    atmosphere: {
      primaryColor: '#78716C', // Stone
      secondaryColor: '#A8A29E', // Light stone
      ambientIntensity: 0.3,
      particleDensity: 0.6,
    },
    sleepStage: 'N3',
  },
];

/**
 * Maps analyzed dream patterns to appropriate rooms
 */
export function matchPatternsToRooms(
  themes: Array<{ name: string; frequency: number }>
): DreamRoom[] {
  const matchedRooms: Map<string, { room: DreamRoom; score: number }> = new Map();

  for (const theme of themes) {
    const themeLower = theme.name.toLowerCase();

    // Check each room for matching themes
    for (const room of DREAM_ROOMS) {
      let score = 0;

      // Check direct theme matches
      for (const roomTheme of room.themes) {
        // Check if theme name matches room theme directly
        if (themeLower.includes(roomTheme) || roomTheme.includes(themeLower)) {
          score += theme.frequency * 2;
          continue;
        }

        // Check taxonomy keywords
        const keywords = MOTIF_TAXONOMY[roomTheme] || [];
        for (const keyword of keywords) {
          if (themeLower.includes(keyword)) {
            score += theme.frequency;
            break;
          }
        }
      }

      if (score > 0) {
        const existing = matchedRooms.get(room.id);
        if (!existing || existing.score < score) {
          matchedRooms.set(room.id, { room, score });
        }
      }
    }
  }

  // Sort by score and return rooms
  return Array.from(matchedRooms.values())
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.room);
}

/**
 * Maps artwork motifs to dream room themes
 */
export function matchArtworkToRoom(
  artworkMotifs: string[],
  roomThemes: string[]
): number {
  let score = 0;

  for (const motif of artworkMotifs) {
    const motifLower = motif.toLowerCase();

    for (const theme of roomThemes) {
      const keywords = MOTIF_TAXONOMY[theme] || [];

      if (keywords.some((k) => motifLower.includes(k) || k.includes(motifLower))) {
        score += 10;
      }
    }
  }

  return score;
}

/**
 * Sleep stage metadata for narrative progression
 */
export const SLEEP_STAGES = {
  N1: {
    name: 'Light Sleep',
    depth: 0,
    description: 'The threshold of sleep. Familiar forms begin to dissolve.',
    narrativeAct: 'seduction' as const,
  },
  N2: {
    name: 'True Sleep',
    depth: 1,
    description: 'Deeper now. The palace reveals its architecture.',
    narrativeAct: 'seduction' as const,
  },
  N3: {
    name: 'Deep Sleep',
    depth: 2,
    description: 'The shadows speak. Questions emerge from darkness.',
    narrativeAct: 'complication' as const,
  },
  REM: {
    name: 'The Dreaming',
    depth: 3,
    description: 'Where creation happens. Your dreams become art.',
    narrativeAct: 'resolution' as const,
  },
};
