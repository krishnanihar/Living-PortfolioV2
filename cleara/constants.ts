import { Ritual } from './types';

export const INITIAL_RITUALS: Ritual[] = [
  {
    id: '1',
    title: 'Morning care routine',
    subtitle: 'Gentle cleanser',
    completed: false,
    time: '8:30 AM',
    category: 'morning',
  },
  {
    id: '2',
    title: 'Weekly photo',
    subtitle: 'Left arm check',
    completed: true,
    time: '9:00 AM',
    category: 'morning',
  },
  {
    id: '3',
    title: 'Evening moisturizer',
    subtitle: 'Full body hydration',
    completed: false,
    time: '9:00 PM',
    category: 'evening',
  },
];

export const PASI_HISTORY = [
  { date: 'Mar 1', score: 18.2 },
  { date: 'Mar 15', score: 16.5 },
  { date: 'Apr 1', score: 14.8 },
  { date: 'Apr 15', score: 13.1 },
  { date: 'May 1', score: 12.4 },
];

export const COLORS = {
  lavender: '#8B9DC3',
  sage: '#A8C5B5',
  blush: '#D4A5A5',
  periwinkle: '#B8C5E2',
};
