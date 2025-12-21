export enum Screen {
  Home = 'Home',
  Photo = 'Photo',
  Insights = 'Insights',
  Rituals = 'Rituals',
  Wellness = 'Wellness',
}

export interface Ritual {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  time: string;
  category: 'morning' | 'evening';
}

export interface PasiLog {
  id: string;
  date: string;
  score: number;
  redness: number;
  thickness: number;
  scaling: number;
  summary: string;
}

export interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
}