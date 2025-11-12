import { Briefcase, GraduationCap, Code2, Sparkles, Brain, Palette, Zap, MessageSquarePlus } from 'lucide-react';

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  hook?: string; // Compelling one-liner
  description: string;
  details?: string; // Expandable detailed story
  achievements?: string[]; // Key bullet points
  metrics?: { label: string; value: string }[]; // Impact metrics
  media?: string; // Main hero image/video
  artifacts?: {
    type: 'image' | 'video' | 'link';
    url: string;
    thumbnail?: string;
    caption?: string;
  }[]; // Additional media gallery
  relatedWork?: string; // Link to full case study
  lesson?: string; // Key takeaway
  tags: string[];
  icon: string; // Icon name as string
  logoFile?: string; // Organization logo filename (e.g., 'air-india.svg')
  organization?: string; // Organization name for alt text
  side: 'left' | 'right';
  isCollaboration?: boolean; // Special flag for collaboration milestone
}

export const timelineMilestones: TimelineMilestone[] = [
  // Phase 1: Hyderabad Roots
  {
    id: 'hyderabad-roots',
    year: '2005-2015',
    title: 'The Spark',
    subtitle: 'Hyderabad · Childhood-Early Teens',
    hook: 'Born and brought up in Hyderabad; curiosity, wires, and wonder.',
    description: 'Pulled apart toys and PCs, flashed ROMs, built tiny scripts. First "clients" were family and friends asking for help with computers.',
    details: 'I grew up taking things apart—remote controls, old phones, desktop towers. My parents thought I was destroying things, but I was learning how they worked. By 10, I was the neighborhood tech kid. By 14, I\'d flashed my first custom Android ROM and felt like I\'d unlocked a superpower. Every problem became a puzzle, every device a lesson.',
    achievements: [
      'Fixed first computer at age 10',
      'Flashed custom Android ROMs for 20+ devices',
      'Built automation scripts for school projects',
      'Became the go-to tech person for family and friends'
    ],
    media: '/images/journey/hyderabad-desk.jpg',
    artifacts: [
      {
        type: 'image',
        url: '/images/journey/circuits-notebook.jpg',
        thumbnail: '/images/journey/circuits-notebook-thumb.jpg',
        caption: 'Circuit doodles from childhood'
      },
      {
        type: 'video',
        url: '/images/journey/led-blink.mp4',
        thumbnail: '/images/journey/led-blink-thumb.jpg',
        caption: 'First LED project'
      }
    ],
    lesson: 'Curiosity compounds before credentials.',
    tags: ['Tinkering', 'Hardware', 'Problem Solving'],
    icon: 'Sparkles',
    side: 'left'
  },

  // Phase 2: Kid Technologist
  {
    id: 'kid-tech',
    year: '2013-2018',
    title: 'Making Over Reading',
    subtitle: 'Self-Taught · Teen Years',
    hook: 'Computer technologist since a kid.',
    description: 'First HTML/CSS site; AutoHotkey/Batch automations; early Python; modding games; repairing school lab machines. Tools became superpowers.',
    details: 'While my friends played games, I was modding them. I built my first website at 14 using HTML and CSS copied from view-source. I wrote AutoHotkey scripts to automate my homework setup. Python felt like magic—suddenly I could make the computer do anything. I wasn\'t reading about technology; I was making with it.',
    achievements: [
      'Built first website at age 14',
      'Created 10+ automation scripts for daily tasks',
      'Repaired 50+ computers for school and community',
      'Learned Python, JavaScript, Batch scripting through projects'
    ],
    media: '/images/journey/first-website.jpg',
    artifacts: [
      {
        type: 'image',
        url: '/images/journey/first-automation.gif',
        thumbnail: '/images/journey/first-automation-thumb.jpg',
        caption: 'Automation script in action'
      },
      {
        type: 'image',
        url: '/images/journey/early-code.png',
        thumbnail: '/images/journey/early-code-thumb.png',
        caption: 'Earliest code with timestamp'
      }
    ],
    lesson: 'Tools are superpowers; learn to forge them.',
    tags: ['Web Development', 'Automation', 'Self-Taught'],
    icon: 'Code2',
    side: 'right'
  },

  // Phase 3: BFA @ JNAFAU
  {
    id: 'bfa-jnafau',
    year: '2018-2022',
    title: 'Design as Discipline',
    subtitle: 'JNAFAU · BFA in Visual Communication',
    hook: 'From pixels to practice: visual foundations, critique culture, and form.',
    description: 'Studio rigor; color theory, typography, composition, storyboards. This is where taste got trained through critique and iteration.',
    details: 'BFA taught me that design isn\'t just making things look good—it\'s systematic thinking. I learned to defend my choices, take criticism without taking it personally, and iterate relentlessly. Color theory, typography, composition—these became my design vocabulary. Every project was a conversation between form and function.',
    achievements: [
      'Graduated BFA with focus on visual systems',
      'Completed 20+ studio projects in typography and layout',
      'Developed critique mindset through peer reviews',
      'Built foundation in color theory and composition'
    ],
    media: '/images/journey/bfa-poster.jpg',
    artifacts: [
      {
        type: 'image',
        url: '/images/journey/bfa-storyboard.jpg',
        thumbnail: '/images/journey/bfa-storyboard-thumb.jpg',
        caption: 'Storyboard from final project'
      },
      {
        type: 'image',
        url: '/images/journey/bfa-typography.jpg',
        thumbnail: '/images/journey/bfa-typography-thumb.jpg',
        caption: 'Typography exploration'
      },
      {
        type: 'image',
        url: '/images/journey/bfa-installation.jpg',
        thumbnail: '/images/journey/bfa-installation-thumb.jpg',
        caption: 'Installation shot'
      }
    ],
    lesson: 'Taste is trained.',
    tags: ['Visual Design', 'Typography', 'Composition'],
    icon: 'Palette',
    logoFile: 'bfa.jpeg',
    organization: 'JNAFAU',
    side: 'left'
  },

  // Phase 4: Infosys
  {
    id: 'infosys-2020',
    year: '2020-2021',
    title: 'Enterprise Immersion',
    subtitle: 'Infosys · UX Designer',
    hook: 'First industry tour—in the deep end of enterprise UX.',
    description: 'Information architecture, design reviews, dev handoffs, design tokens 101. Learned constraints, processes, velocity at scale.',
    details: 'Infosys was a crash course in how design works at enterprise scale. I learned the language of stakeholders, the discipline of design systems, and the reality of technical constraints. Every feature touched thousands of users. Every decision needed documentation. This is where I learned that shipping beats perfection.',
    achievements: [
      'Shipped 5+ features for enterprise clients',
      'Created first design system components',
      'Learned Agile/Sprint workflows',
      'Collaborated with 15+ developers'
    ],
    metrics: [
      { label: 'Features Shipped', value: '5+' },
      { label: 'Components Built', value: '12' },
      { label: 'Dev Collaborators', value: '15+' }
    ],
    media: '/images/journey/infosys-redline.jpg',
    artifacts: [
      {
        type: 'image',
        url: '/images/journey/infosys-components.jpg',
        thumbnail: '/images/journey/infosys-components-thumb.jpg',
        caption: 'Component library'
      },
      {
        type: 'image',
        url: '/images/journey/infosys-flow.jpg',
        thumbnail: '/images/journey/infosys-flow-thumb.jpg',
        caption: 'User flow diagram'
      }
    ],
    lesson: 'Constraints are design\'s training weights.',
    tags: ['Enterprise UX', 'Design Systems', 'Agile'],
    icon: 'Briefcase',
    logoFile: 'infosys.svg',
    organization: 'Infosys',
    side: 'right'
  },

  // Phase 5: NID (New Media)
  {
    id: 'nid-2021',
    year: '2021-2023',
    title: 'Systems, Not Screens',
    subtitle: 'National Institute of Design · New Media',
    hook: 'New Media re-wired how I think: interaction, narrative systems, installation.',
    description: 'Prototyped immersive/interactive projects; critique-driven iteration; research-through-making. This is where HCI became second nature.',
    details: 'NID taught me to think in systems. Every project was a question: how do people interact with information? How do we design for behavior change? I built installations that responded to movement, interfaces that adapted to context, and systems that felt alive. HCI wasn\'t just a subject—it was a lens for understanding human experience.',
    achievements: [
      'Built 8+ interactive installations',
      'Developed systems thinking approach to design',
      'Published research on living interfaces',
      'Collaborated on multi-sensory design projects'
    ],
    media: '/images/journey/nid-installation.jpg',
    artifacts: [
      {
        type: 'video',
        url: '/images/journey/nid-installation-loop.mp4',
        thumbnail: '/images/journey/nid-installation-loop-thumb.jpg',
        caption: '10-sec installation loop'
      },
      {
        type: 'image',
        url: '/images/journey/nid-storyboard.jpg',
        thumbnail: '/images/journey/nid-storyboard-thumb.jpg',
        caption: 'Storyboard frames'
      },
      {
        type: 'image',
        url: '/images/journey/nid-diagram.jpg',
        thumbnail: '/images/journey/nid-diagram-thumb.jpg',
        caption: 'Interaction logic diagram'
      }
    ],
    lesson: 'Design the system that designs the screen.',
    tags: ['HCI', 'Interactive Design', 'Systems Thinking'],
    icon: 'GraduationCap',
    logoFile: 'nid.svg',
    organization: 'National Institute of Design',
    side: 'left'
  },

  // Phase 6: ISB
  {
    id: 'isb-2022',
    year: '2022',
    title: 'Craft Meets Commerce',
    subtitle: 'Indian School of Business · Product Strategy',
    hook: 'Translating design craft into business leverage.',
    description: 'Framed UX in business terms; experimentation, metrics, and ROI; stakeholder narratives that move roadmaps.',
    details: 'ISB taught me to speak the language of business. I learned to frame design decisions as hypotheses, measure impact with metrics, and build narratives that get executive buy-in. Great design isn\'t just beautiful—it drives outcomes. And if you can\'t articulate the value, you can\'t ship it.',
    achievements: [
      'Completed product strategy coursework',
      'Learned North Star metrics framework',
      'Developed business case presentations for design decisions',
      'Connected design impact to revenue and growth'
    ],
    media: '/images/journey/isb-metric-card.jpg',
    artifacts: [
      {
        type: 'image',
        url: '/images/journey/isb-onepager.jpg',
        thumbnail: '/images/journey/isb-onepager-thumb.jpg',
        caption: 'Problem → Hypothesis → Metric'
      },
      {
        type: 'image',
        url: '/images/journey/isb-framework.jpg',
        thumbnail: '/images/journey/isb-framework-thumb.jpg',
        caption: 'North Star metric framework'
      }
    ],
    lesson: 'Great UX is a business strategy in disguise.',
    tags: ['Product Strategy', 'Business Design', 'Metrics'],
    icon: 'Brain',
    logoFile: 'isb.png',
    organization: 'Indian School of Business',
    side: 'right'
  },

  // Phase 7: Air India
  {
    id: 'air-india-2024',
    year: '2024-Present',
    title: 'Designing at 40,000 Feet',
    subtitle: 'Air India DesignLAB · Lead Designer',
    hook: 'Designing how an airline thinks in data, scale, and reliability.',
    description: 'Aviation analytics dashboards; mobile ops flows; service rituals in UI; design system enforcement at enterprise scale.',
    details: 'Working at Air India taught me what it means to design at enterprise scale. I\'m building a design system that serves over 450 daily users—pilots, crew, ground staff, and engineers. Every component needs to work in the cockpit at 40,000 feet, on tablets during boarding, and in operations centers managing flight schedules. The challenge isn\'t just technical—it\'s human. I spend as much time understanding aviation regulations and crew workflows as I do designing interfaces. This is where theory meets reality, where a poorly designed alert system could impact safety, where accessibility isn\'t a checkbox but a necessity for staff working across shifts and conditions.',
    achievements: [
      '450+ daily active users across pilot, crew, and operations teams',
      'Built unified design system serving 3 platforms (Web, iOS, Android)',
      'Reduced design-to-dev handoff time by 60% through systematic documentation',
      'Created 120+ reusable components with accessibility built-in'
    ],
    metrics: [
      { label: 'Daily Users', value: '450+' },
      { label: 'Components', value: '120+' },
      { label: 'Teams Served', value: '24' },
      { label: 'Time Saved', value: '60%' }
    ],
    media: '/images/journey/air-india-hero.jpg',
    artifacts: [
      {
        type: 'image',
        url: '/images/journey/air-india-components.jpg',
        thumbnail: '/images/journey/air-india-components-thumb.jpg',
        caption: 'Component Library Overview'
      },
      {
        type: 'image',
        url: '/images/journey/air-india-ife.jpg',
        thumbnail: '/images/journey/air-india-ife-thumb.jpg',
        caption: 'In-Flight Entertainment System'
      },
      {
        type: 'image',
        url: '/images/journey/air-india-docs.jpg',
        thumbnail: '/images/journey/air-india-docs-thumb.jpg',
        caption: 'Design Documentation'
      }
    ],
    relatedWork: '/work/air-india',
    lesson: 'In high-stakes contexts, clarity beats novelty.',
    tags: ['Design Systems', 'Aviation', 'Enterprise UX'],
    icon: 'Briefcase',
    logoFile: 'air-india.svg',
    organization: 'Air India',
    side: 'left'
  },

  // Phase 8: Pixel Radar
  {
    id: 'pixel-radar-2024',
    year: '2024',
    title: 'Building the Builder\'s Tools',
    subtitle: 'Pixel Radar (Inside Air India) · Figma Plugin',
    hook: 'A Figma plugin to audit design-system consistency—tokens → elements.',
    description: 'Token JSON parsing; variable coverage; lint rule engine; report UX. When the system needs a system.',
    details: 'I built Pixel Radar because manual design system audits were killing our velocity. The plugin scans Figma files, checks token usage against our system, runs lint rules, and generates compliance reports. It\'s now used by 12 teams and saved 80% of our audit time. Consistency isn\'t something you achieve once—it\'s a product you maintain.',
    achievements: [
      'Shipped Figma plugin with 1000+ internal installs',
      'Automated token consistency checks across all files',
      'Reduced manual audits by 80%',
      'Real-time design system compliance monitoring'
    ],
    metrics: [
      { label: 'Tokens Tracked', value: '500+' },
      { label: 'Lint Rules', value: '25+' },
      { label: 'Time Saved', value: '80%' },
      { label: 'Teams Using', value: '12' }
    ],
    media: '/images/journey/pixel-radar-scan.jpg',
    artifacts: [
      {
        type: 'video',
        url: '/images/journey/pixel-radar-demo.mp4',
        thumbnail: '/images/journey/pixel-radar-demo-thumb.jpg',
        caption: 'Scan demo (6-8 sec)'
      },
      {
        type: 'image',
        url: '/images/journey/pixel-radar-report.jpg',
        thumbnail: '/images/journey/pixel-radar-report-thumb.jpg',
        caption: 'Lint report view'
      },
      {
        type: 'image',
        url: '/images/journey/pixel-radar-ui.jpg',
        thumbnail: '/images/journey/pixel-radar-ui-thumb.jpg',
        caption: 'Plugin UI walkthrough'
      }
    ],
    lesson: 'Consistency is a product, not a deck.',
    tags: ['Tooling', 'Automation', 'Design Systems'],
    icon: 'Zap',
    side: 'right'
  },

  // Phase 9: Throughline
  {
    id: 'throughline-now',
    year: 'Now',
    title: 'The Throughline',
    subtitle: 'Design Philosophy · Now',
    hook: 'From Hyderabad tinkerer → enterprise designer → systems thinker.',
    description: 'Every phase reinforced shipping, teaching tools, and measurable outcomes. Make. Measure. Mature.',
    details: 'Looking back, there\'s a clear thread: I\'ve always been a maker who ships. From childhood circuits to enterprise systems, from automation scripts to Figma plugins, I build tools that help people work better. Design isn\'t just what it looks like—it\'s whether it works, whether it scales, and whether it makes someone\'s life easier. That\'s the standard I hold myself to.',
    media: '/images/journey/throughline-timeline.jpg',
    artifacts: [
      {
        type: 'image',
        url: '/images/journey/throughline-arc.svg',
        thumbnail: '/images/journey/throughline-arc-thumb.svg',
        caption: 'Journey arc visualization'
      }
    ],
    lesson: 'Make. Measure. Mature.',
    tags: ['Philosophy', 'Systems Thinking', 'Impact'],
    icon: 'Palette',
    side: 'left'
  },

  // Phase 10: Collaboration
  {
    id: 'lets-collaborate',
    year: 'Next',
    title: 'Let\'s build something together',
    subtitle: 'Your Project · Future Collaboration',
    description: 'Tell me about your project, and let\'s explore how we can collaborate',
    tags: ['Collaboration', 'Future', 'Projects'],
    icon: 'MessageSquarePlus',
    side: 'right',
    isCollaboration: true
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
  Zap,
  MessageSquarePlus
};
