import { Project, FilterTab } from '@/types/projects';

/**
 * Project Data - Extracted from Living Portfolio v1
 * All projects with complete metadata and categorization
 */

export const projects: Project[] = [
  // Meta Design Projects
  {
    id: 'living-organism',
    title: 'Living Organism',
    company: 'Personal Portfolio',
    description: 'This portfolio website itself - architected to feel like a living organism. Features breathing animations, consciousness-aware interactions, and adaptive micro-behaviors that respond to user presence and intent. Built with Next.js 15, Framer Motion, and a sophisticated glassmorphism design system.',
    category: 'web',
    status: 'live',
    tags: [
      { id: 'nextjs', label: 'Next.js' },
      { id: 'framer-motion', label: 'Framer Motion' },
      { id: 'consciousness-ui', label: 'Consciousness UI' },
      { id: 'glassmorphism', label: 'Glassmorphism' },
      { id: 'typescript', label: 'TypeScript' },
    ],
    meta: {
      year: '2024',
      role: 'Designer & Developer',
      team: 'Solo Project',
    },
    metrics: {
      impact: 'Living & breathing digital experience',
      improvement: 'Adaptive behaviors & micro-interactions',
    },
    links: [
      { type: 'live', url: '/', label: 'Live Portfolio' },
      { type: 'github', url: 'https://github.com/krishnanihar/Living-PortfolioV2', label: 'View Source' },
    ],
    featured: true,
    order: 1,
  },
  // System Design Projects
  {
    id: 'pixel-radar',
    title: 'Pixel Radar',
    company: 'Air India DesignLAB',
    description: 'Figma plugin that audits design components against token systems. Reduced review time from hours to minutes, ensuring design system compliance across 50+ components.',
    category: 'system',
    status: 'live',
    tags: [
      { id: 'figma-plugin', label: 'Figma Plugin' },
      { id: 'design-tokens', label: 'Design Tokens' },
      { id: 'qa-automation', label: 'QA Automation' },
      { id: 'javascript', label: 'JavaScript' },
    ],
    meta: {
      year: '2024',
      role: 'Lead Developer',
      team: 'DesignLAB Team',
    },
    metrics: {
      improvement: '90% reduction in review time',
      impact: '50+ components audited',
    },
    links: [
      { type: 'case-study', url: '/work/air-india', label: 'View Air India Case Study' },
    ],
    featured: true,
    order: 1,
  },
  {
    id: 'aviation-analytics',
    title: 'Aviation Analytics',
    company: 'Air India Operations',
    description: 'Real-time ops dashboard that reduced decision-making time from minutes to seconds. Serves 450+ daily active users with flight data, crew management, and performance metrics.',
    category: 'system',
    status: 'live',
    tags: [
      { id: 'data-viz', label: 'Data Visualization' },
      { id: 'real-time', label: 'Real-time' },
      { id: 'operations', label: 'Operations' },
      { id: 'react', label: 'React' },
    ],
    meta: {
      year: '2024',
      role: 'Product Designer',
      team: 'Operations Team',
    },
    metrics: {
      users: '450+ daily users',
      improvement: 'Minutes to seconds decision time',
      impact: 'Flight operations optimization',
    },
    links: [
      { type: 'case-study', url: '/work/air-india', label: 'View Air India Case Study' },
    ],
    featured: true,
    order: 2,
  },
  {
    id: 'token-architecture',
    title: 'Token Architecture',
    company: 'Air India DesignLAB',
    description: 'Comprehensive design token system spanning colors, typography, spacing, and motion. Enables consistent theming across 12+ applications and 50+ components.',
    category: 'system',
    status: 'live',
    tags: [
      { id: 'design-tokens', label: 'Design Tokens' },
      { id: 'theming', label: 'Theming' },
      { id: 'scalability', label: 'Scalability' },
      { id: 'multi-platform', label: 'Multi-platform' },
    ],
    meta: {
      year: '2023-2024',
      role: 'Design Systems Lead',
      duration: '8 months',
    },
    metrics: {
      impact: '12+ applications, 50+ components',
      improvement: 'Consistent theming system',
    },
    order: 6,
  },

  // Mobile Projects
  {
    id: 'mobile-ux-patterns',
    title: 'Mobile UX Patterns',
    company: 'Air India Mobile',
    description: 'Comprehensive mobile design system with 40+ patterns. Standardized iOS/Android experiences across check-in, booking, and loyalty programs.',
    category: 'mobile',
    status: 'shipped',
    tags: [
      { id: 'mobile-design', label: 'Mobile Design' },
      { id: 'design-system', label: 'Design System' },
      { id: 'ios', label: 'iOS' },
      { id: 'android', label: 'Android' },
    ],
    meta: {
      year: '2023',
      role: 'Mobile Design Lead',
      team: 'Mobile Team',
    },
    metrics: {
      impact: '40+ patterns across iOS/Android',
      improvement: 'Standardized mobile experience',
    },
    featured: true,
    order: 3,
  },
  {
    id: 'crew-mobile-app',
    title: 'Crew Mobile App',
    company: 'Air India Crew Operations',
    description: 'Mission-critical mobile interface for airline crew. Handles scheduling, duty management, and emergency protocols for 5000+ crew members.',
    category: 'mobile',
    status: 'live',
    tags: [
      { id: 'crew-operations', label: 'Crew Operations' },
      { id: 'critical-systems', label: 'Critical Systems' },
      { id: 'mobile-first', label: 'Mobile First' },
      { id: 'enterprise', label: 'Enterprise' },
    ],
    meta: {
      year: '2024',
      role: 'UX Lead',
      team: 'Crew Operations',
    },
    metrics: {
      users: '5000+ crew members',
      impact: 'Mission-critical operations',
    },
    order: 4,
  },
  {
    id: 'ground-ops-pwa',
    title: 'Ground Ops PWA',
    company: 'Air India Ground Operations',
    description: 'Offline-capable PWA for ground crew operations. Handles baggage tracking, aircraft servicing, and turnaround management across 50+ airports.',
    category: 'mobile',
    status: 'live',
    tags: [
      { id: 'pwa', label: 'PWA' },
      { id: 'offline-first', label: 'Offline First' },
      { id: 'ground-operations', label: 'Ground Operations' },
      { id: 'service-workers', label: 'Service Workers' },
    ],
    meta: {
      year: '2024',
      role: 'Technical Lead',
      team: 'Ground Operations',
    },
    metrics: {
      impact: '50+ airports coverage',
      improvement: 'Offline-capable operations',
    },
    order: 7,
  },

  // Research Projects
  {
    id: 'latent-space',
    title: 'Latent Space',
    company: 'MIT Media Lab',
    description: 'A speculative exploration of dream technology through critical design. What if we could navigate our dreams while preserving the mystery of consciousness? An interactive experience exploring ethical frameworks for brain-computer interfaces and the implications of consciousness data.',
    category: 'research',
    status: 'concept',
    tags: [
      { id: 'speculative-design', label: 'Speculative Design' },
      { id: 'neuroscience', label: 'Neuroscience' },
      { id: 'brain-computer-interface', label: 'Brain-Computer Interface' },
      { id: 'ethical-ai', label: 'Ethical AI' },
      { id: 'consciousness-tech', label: 'Consciousness Tech' },
      { id: 'interactive-prototype', label: 'Interactive Prototype' },
      { id: 'framer-motion', label: 'Framer Motion' },
      { id: 'critical-design', label: 'Critical Design' },
    ],
    meta: {
      year: '2024',
      role: 'Designer & Researcher',
      team: 'MIT Media Lab',
      duration: 'Four months',
    },
    metrics: {
      impact: '24+ design provocations, 16 ethical considerations',
      improvement: 'Privacy-first approach to consciousness technology',
    },
    links: [
      { type: 'case-study', url: '/work/latent-space', label: 'Explore the Speculation' },
    ],
    featured: true,
    order: 9,
  },
  {
    id: 'metamorphic-fractal-reflections',
    title: 'Metamorphic Fractal Reflections',
    company: 'National Institute of Design',
    description: 'Psychedelic journey installation exploring consciousness through ego dissolution. An immersive bathroom mirror portal experience that takes participants through a trippy multiverse of liquid color, pattern-creatures, and structureless music guided by a fading companion.',
    category: 'research',
    status: 'shipped',
    tags: [
      { id: 'immersive-installation', label: 'Immersive Installation' },
      { id: 'touchdesigner', label: 'TouchDesigner' },
      { id: 'arduino', label: 'Arduino' },
      { id: 'psychedelic-design', label: 'Psychedelic Design' },
      { id: 'consciousness-ui', label: 'Consciousness UI' },
      { id: 'vr-previz', label: 'VR Previz' },
      { id: 'stable-diffusion', label: 'Stable Diffusion' },
    ],
    meta: {
      year: '2023',
      role: 'Designer & Developer',
      team: 'Solo Project',
      duration: 'Two months',
    },
    metrics: {
      impact: 'Safe, accessible ego-dissolution themes',
      improvement: 'Timothy Leary\'s Psychedelic Experience framework',
    },
    links: [
      { type: 'case-study', url: '/work/metamorphic-fractal-reflections', label: 'View Case Study' },
    ],
    featured: true,
    order: 10,
  },

  // IFE Projects
  {
    id: 'ife-experience-concepts',
    title: 'IFE Experience Concepts',
    company: 'Air India Passenger Experience',
    description: 'Next-generation in-flight entertainment concepts focusing on personalization and accessibility. Explored voice control, gesture navigation, and adaptive interfaces.',
    category: 'ife',
    status: 'concept',
    tags: [
      { id: 'ife-systems', label: 'IFE Systems' },
      { id: 'accessibility', label: 'Accessibility' },
      { id: 'voice-ui', label: 'Voice UI' },
      { id: 'prototyping', label: 'Prototyping' },
    ],
    meta: {
      year: '2023',
      role: 'Concept Designer',
      team: 'Passenger Experience',
    },
    metrics: {
      impact: 'Next-gen IFE concepts',
      improvement: 'Enhanced accessibility',
    },
    order: 5,
  },

  // Hackathon Projects
  {
    id: 'internal-innovation-sprint',
    title: 'Internal Innovation Sprint',
    company: 'Air India Hackathon',
    description: '48-hour hackathon winner that became production feature. Created AI-powered maintenance prediction system that reduces aircraft downtime by 15%.',
    category: 'hackathons',
    status: 'winner',
    tags: [
      { id: '48h-sprint', label: '48h Sprint' },
      { id: 'ai-ml', label: 'AI/ML' },
      { id: 'maintenance', label: 'Maintenance' },
      { id: 'production', label: 'Production' },
    ],
    meta: {
      year: '2024',
      role: 'Team Lead',
      duration: '48 hours',
    },
    metrics: {
      improvement: '15% reduction in downtime',
      impact: 'Now in production',
    },
    featured: true,
    order: 8,
  },
  {
    id: 'microsoft-air-india',
    title: 'Microsoft × Air India',
    company: 'Joint Hackathon',
    description: 'Cross-company hackathon exploring Azure AI services for aviation. Built passenger sentiment analysis tool now integrated into customer service workflows.',
    category: 'hackathons',
    status: 'live',
    tags: [
      { id: 'microsoft-azure', label: 'Microsoft Azure' },
      { id: 'sentiment-analysis', label: 'Sentiment Analysis' },
      { id: 'customer-service', label: 'Customer Service' },
      { id: 'cross-team', label: 'Cross-team' },
    ],
    meta: {
      year: '2024',
      role: 'Design Lead',
      team: 'Microsoft + Air India',
    },
    metrics: {
      impact: 'Integrated into customer service',
      improvement: 'Sentiment analysis automation',
    },
    order: 9,
  },
];

// Filter tabs configuration
export const filterTabs: FilterTab[] = [
  {
    id: 'all',
    label: 'All Work',
    color: '#DA0E29',
  },
  {
    id: 'system',
    label: 'Systems',
    color: '#3B82F6',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    color: '#10B981',
  },
  {
    id: 'ife',
    label: 'IFE',
    color: '#8B5CF6',
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    color: '#F59E0B',
  },
  {
    id: 'research',
    label: 'Research',
    color: '#E879F9',
  },
];

// Helper functions
export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id);
};