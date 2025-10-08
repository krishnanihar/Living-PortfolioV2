export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: number;
  museum: string;
  imageUrl: string;
  motifs: string[];
  century: number;
  mood: string;
  themes: string[];
  location: { lat: number; lon: number; };
  isCapstone?: boolean;
}

export interface Exhibition {
  title: string;
  subtitle: string;
  statement: string;
  criteria: {
    motifs: string[];
    centuries: number[];
    mood: string;
    themes: string[];
  }
  reasoning: string;
}

export interface IdentifiedObject {
    label: string;
    boundingBox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface AIAnalysis {
    visualAnalysis: string;
    symbolism: { element: string; meaning:string; }[];
    historicalContext: string;
    culturalSignificance: string;
    personalConnection: string;
    mood: string;
    relatedThemes: string[];
    identifiedObjects: IdentifiedObject[];
    worldlyEchoes?: {
        summary: string;
        sources: { title: string; uri: string; }[];
    };
}