import { Briefcase, GraduationCap, Code2, Sparkles, Brain, Palette, Zap } from 'lucide-react';

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: string; // Icon name as string
  side: 'left' | 'right';
  media?: string;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 'air-india-2024',
    year: '2024',
    title: 'Designing at 40,000 Feet',
    subtitle: 'Product Designer at Air India',
    description: 'Leading design transformation for India\'s flag carrier. Building scalable design systems and reimagining digital experiences for 450+ daily users across operations, inflight systems, and passenger touchpoints.',
    tags: ['Design Systems', 'Aviation UX', 'Digital Transformation', 'Scale'],
    icon: 'Briefcase',
    side: 'right'
  },
  {
    id: 'microsoft-2023',
    year: '2023',
    title: 'Building for Billions',
    subtitle: 'Design Contributions at Microsoft',
    description: 'Contributing to systems and tools used globally. Focused on accessibility, performance optimization, and creating inclusive design patterns that work across cultures and contexts.',
    tags: ['HCI', 'Accessibility', 'Global Systems', 'Prototyping'],
    icon: 'Code2',
    side: 'left'
  },
  {
    id: 'isb-2022',
    year: '2022',
    title: 'Business Meets Design',
    subtitle: 'Indian School of Business',
    description: 'Understanding product strategy, business impact of design decisions, and how to build products that scale. Learning to bridge the gap between design thinking and business outcomes.',
    tags: ['Product Strategy', 'Business Design', 'Strategic Thinking'],
    icon: 'Brain',
    side: 'right'
  },
  {
    id: 'nid-2021',
    year: '2021',
    title: 'The Foundation',
    subtitle: 'National Institute of Design',
    description: 'Learning design fundamentals, HCI principles, and systems thinking. Building first major projects and discovering passion for consciousness-aware interfaces and living design systems.',
    tags: ['Design Education', 'HCI', 'Research', 'Systems Thinking'],
    icon: 'GraduationCap',
    side: 'left'
  },
  {
    id: 'early-work-2020',
    year: '2020',
    title: 'Where It All Began',
    subtitle: 'First Projects & Experiments',
    description: 'Early experiments with creative coding, interface design, and speculative futures. Building projects that explored the boundaries between digital and consciousness, learning by making.',
    tags: ['Creative Coding', 'Experimentation', 'Speculative Design'],
    icon: 'Sparkles',
    side: 'right'
  },
  {
    id: 'philosophy',
    year: 'Now',
    title: 'What I Believe',
    subtitle: 'Design Philosophy & Principles',
    description: 'Interfaces should feel alive. Systems must scale without losing humanity. Documentation and process transparency matter. Conversations are more valuable than portfolios. Design is about creating experiences that breathe and adapt.',
    tags: ['Living Interfaces', 'Consciousness Design', 'Human-Centered', 'Transparency'],
    icon: 'Palette',
    side: 'left'
  }
];

// Icon map for component rendering
export const iconMap: Record<string, typeof Briefcase> = {
  Briefcase,
  Code2,
  Brain,
  GraduationCap,
  Sparkles,
  Palette,
  Zap
};
