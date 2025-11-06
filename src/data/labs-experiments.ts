import { LabExperiment } from '@/types/labs';

/**
 * Labs Experiments Data
 * Seed experiments from Nihar's existing work
 */

export const labExperiments: LabExperiment[] = [
  // 1. Pixel Radar - Design Token Auditor
  {
    id: 'pixel-radar',
    title: 'Pixel Radar',
    oneLiner: 'Audit any screen against Air India tokens.json in 30 seconds.',

    domain: ['Design-Systems'],
    modality: ['Plugin', 'Evaluation'],
    tech: ['TypeScript', 'Figma-Plugin'],
    status: 'Playable',
    trl: 5,
    access: 'Internal',
    risk: 'Medium',

    problem:
      'Design drift across teams = inconsistent tokens and UX debt. Manual reviews took hours per component, blocking design velocity.',

    approach:
      'Static + runtime checks against `tokens.json`, with element-level diffs and autofix suggestions. Built as Figma plugin for in-context auditing.',

    outcome:
      'Reduced review time by **35%**. Flagged **220+** mismatched tokens in pilot squads. Now standard QA tool in Air India DesignLAB workflow.',

    buildNotes:
      '- 2025-10-05: Added semantic color groups\n- 2025-10-07: CLI export to CSV for weekly audits\n- 2025-10-08: Autofix mode for common violations',

    risksEthics:
      'Internal tokens; anonymize file names. No user data collected. Risk: token leak via screenshots.',

    links: {
      repo: 'https://github.com/airindia/pixel-radar',
      figma: 'https://www.figma.com/community/plugin/pixel-radar',
    },

    owner: 'Krishna Nihar',
    dates: {
      created: '2025-03-26',
      updated: '2025-10-08',
    },

    kpis: {
      timeSavedMinutes: 18,
      issuesAutofixedPct: 35,
      adoption: 12,
    },

    log: [
      {
        date: '2025-10-08',
        note: 'Autofix mode for common violations',
      },
      {
        date: '2025-10-07',
        note: 'CLI export to CSV for weekly audits',
      },
      {
        date: '2025-10-05',
        note: 'Added semantic color groups',
      },
    ],

    roadmap: {
      now: ['Accessibility checks', 'Typography linting'],
      next: ['Zeroheight sync', 'PR comment automation', 'Slack alerts'],
      later: ['Multi-brand token mapping', 'A/B test variant checks'],
    },

    license: 'Internal-Use',
    badges: ['Field-Tested', 'Prod-Impact'],
    featured: true,
    order: 1,
  },

  // 2. Astra - AI Chat Shell
  {
    id: 'astra',
    title: 'Astra',
    oneLiner: 'AI design assistant with reproducible prompts + Awwwards-grade UI patterns.',

    domain: ['AI/Agents', 'Design-Systems'],
    modality: ['Prototype', 'UX-Pattern'],
    tech: ['React', 'TypeScript', 'Tailwind', 'LLM'],
    status: 'Playable',
    trl: 4,
    access: 'Open',
    risk: 'Low',

    problem:
      'Designers need AI assistants that understand design constraints, not just code. Generic chat UIs do not match design tool aesthetics.',

    approach:
      'Glassmorphic chat shell with drop-in slots for tools. Reproducible prompt library + UI patterns inspired by Linear/Vercel. Constraints-aware responses.',

    outcome:
      'Open-source prototype with **1.2k+ stars**. Featured in Tailwind showcase. Used internally at 3 design teams for prompt engineering.',

    buildNotes:
      '- Built on Vercel AI SDK\n- Custom glassmorphic components\n- Markdown rendering with syntax highlighting\n- Prompt versioning system',

    risksEthics:
      'Low risk. No PII. Prompt history stored locally. Open source under MIT.',

    links: {
      demo: 'https://astra-chat.vercel.app',
      repo: 'https://github.com/krishnanihar/astra',
    },

    demoEmbed: {
      type: 'iframe',
      url: 'https://astra-chat.vercel.app',
    },

    owner: 'Krishna Nihar',
    dates: {
      created: '2025-02-14',
      updated: '2025-10-09',
    },

    kpis: {
      adoption: 3,
      experienceWins: '1.2k+ GitHub stars, Tailwind showcase feature',
    },

    log: [
      {
        date: '2025-10-09',
        note: 'Added prompt versioning system',
      },
      {
        date: '2025-09-22',
        note: 'Glassmorphic redesign complete',
      },
      {
        date: '2025-08-15',
        note: 'Initial prototype launch',
      },
    ],

    roadmap: {
      now: ['Polish glassmorphic chat shell', 'Add voice input'],
      next: ['Constraints-aware layout agent', 'Figma integration', 'Multi-model support'],
      later: ['Design system auto-generation', 'Real-time collaboration'],
    },

    license: 'MIT',
    badges: ['Open-Source'],
    featured: true,
    order: 2,
  },

  // 3. Aviation Analytics Platform
  {
    id: 'aviation-analytics',
    title: 'Aviation Analytics',
    oneLiner: 'Unified metrics for ops, fleet health, and delay causality.',

    domain: ['Aviation', 'Data-Art'],
    modality: ['Prototype', 'Evaluation'],
    tech: ['React', 'TypeScript', 'Next.js'],
    status: 'Playable',
    trl: 6,
    access: 'Internal',
    risk: 'Medium',

    problem:
      'Flight ops teams had no single source of truth. Data scattered across 12+ legacy systems. Decision-making took minutes instead of seconds.',

    approach:
      'Real-time ops dashboard with anomaly detection. Dashboard cards + synthetic log replayer for testing. Unified API layer over legacy systems.',

    outcome:
      'First pilot team found **3 operational policy bugs**. Now serves **450+ daily users**. Reduced decision time from minutes to seconds.',

    buildNotes:
      '- Built with Next.js + Server Components\n- Real-time WebSocket updates\n- Anomaly detection via simple heuristics\n- Synthetic data generator for testing',

    risksEthics:
      'High risk: flight ops data. No PII exposed. Audit logs for all access. Role-based permissions.',

    links: {
      demo: '/work/air-india#aviation-analytics',
    },

    owner: 'Krishna Nihar',
    dates: {
      created: '2024-06-10',
      updated: '2025-10-07',
    },

    kpis: {
      adoption: 450,
      improvement: 'Minutes → seconds decision time',
      qualityDelta: '3 policy bugs discovered',
    },

    log: [
      {
        date: '2025-10-07',
        note: 'Added fleet health metrics',
      },
      {
        date: '2025-09-15',
        note: 'Anomaly detection live',
      },
      {
        date: '2024-11-20',
        note: 'Pilot launch with ops team',
      },
    ],

    roadmap: {
      now: ['Line-maintenance integration', 'Cost-per-delay minute calculator'],
      next: ['Predictive delay alerts', 'Crew availability optimizer'],
      later: ['AI-powered scheduling assistant', 'Cross-airline benchmarks'],
    },

    license: 'Internal-Use',
    badges: ['Field-Tested', 'Prod-Impact'],
    featured: true,
    order: 3,
  },

  // 4. Arcane Pursuit - ARG Scene 01
  {
    id: 'arcane-pursuit',
    title: 'Arcane Pursuit',
    oneLiner: 'Phone-first geofenced clue with audio-spectrogram cipher.',

    domain: ['AR/ARG', 'New-Media'],
    modality: ['Prototype', 'Playground'],
    tech: ['TypeScript', 'React', 'WebAudio', 'GPS'],
    status: 'Playable',
    trl: 4,
    access: 'Invite',
    risk: 'Medium',

    problem:
      'ARGs (alternate reality games) need phone-first puzzles that blend digital/physical. Existing tools do not handle geofencing + audio ciphers.',

    approach:
      'Geofenced clue discovery + audio spectrogram puzzle. Anti-spoofing checks via device fingerprinting. Progressive hint system.',

    outcome:
      'Playable prototype with **41% completion rate**. Median playtime: **126 seconds**. Testing with 50+ beta players.',

    buildNotes:
      '- Web Audio API for spectrogram generation\n- Geolocation with ±3m accuracy\n- Device binding to prevent sharing\n- Progressive hint system after 2 minutes',

    risksEthics:
      'Medium risk: location tracking. Players opt-in explicitly. No data retention after game ends. Anti-spoofing to prevent cheating.',

    links: {
      demo: 'https://arcane-pursuit.vercel.app/scene01',
      repo: 'https://github.com/krishnanihar/arcane-pursuit',
    },

    demoEmbed: {
      type: 'video',
      url: 'https://arcane-pursuit.vercel.app/demo.mp4',
    },

    owner: 'Krishna Nihar',
    dates: {
      created: '2025-04-05',
      updated: '2025-10-09',
    },

    kpis: {
      playtimeMedianSec: 126,
      completionRate: 0.41,
    },

    log: [
      {
        date: '2025-10-09',
        note: 'Geofence drift reduced from ±7m to ±3m',
      },
      {
        date: '2025-10-08',
        note: 'Spectrogram hints clearer, mobile fix',
      },
      {
        date: '2025-10-07',
        note: 'Anti-spoof checks; basic device binding',
      },
    ],

    roadmap: {
      now: ['Scene 02 riddle', 'Server-side hints'],
      next: ['Referral trees', 'Multi-city expansion', 'Leaderboards'],
      later: ['AI-generated puzzles', 'Cross-platform (iOS/Android apps)'],
    },

    license: 'Source-Available',
    badges: ['Privacy-Preserving'],
    featured: true,
    order: 4,
  },

  // 5. Kerala Kingdoms - Data Art
  {
    id: 'kerala-kingdoms',
    title: 'Kerala Kingdoms',
    oneLiner: 'Merge historical datasets with AI art on OLED black canvas.',

    domain: ['Data-Art', 'New-Media'],
    modality: ['Prototype'],
    tech: ['React', 'Next.js', 'Three.js'],
    status: 'Playable',
    trl: 3,
    access: 'Open',
    risk: 'Low',

    problem:
      'Historical data visualizations are dry. How do we make dynasty timelines + territorial maps feel alive and shareable?',

    approach:
      'Scroll-tied choropleths, dynasty timelines, AI-generated dynasty portraits. OLED black canvas with aurora gradients. Exportable as prints.',

    outcome:
      'Prototype live at kerala-kingdoms.vercel.app. Featured on Awwwards FWA. **2k+ unique visitors** in first week.',

    buildNotes:
      '- Three.js for choropleth maps\n- Framer Motion for scroll animations\n- AI portraits via Stable Diffusion\n- Print export via canvas → PNG',

    risksEthics:
      'Low risk. Historical data is public domain. AI portraits labeled as synthetic.',

    links: {
      demo: 'https://kerala-kingdoms.vercel.app',
      repo: 'https://github.com/krishnanihar/kerala-kingdoms',
    },

    demoEmbed: {
      type: 'iframe',
      url: 'https://kerala-kingdoms.vercel.app',
    },

    owner: 'Krishna Nihar',
    dates: {
      created: '2025-05-12',
      updated: '2025-10-01',
    },

    kpis: {
      experienceWins: '2k+ visitors week 1, Awwwards FWA',
    },

    log: [
      {
        date: '2025-10-01',
        note: 'Added print export feature',
      },
      {
        date: '2025-09-20',
        note: 'Scroll performance optimization',
      },
      {
        date: '2025-08-15',
        note: 'AI portrait generation integrated',
      },
    ],

    roadmap: {
      now: ['"What-if" simulator (alternate timelines)', 'Sound design'],
      next: ['Exportable prints marketplace', 'Mobile app'],
      later: ['Expand to other regions', 'Community-submitted data'],
    },

    license: 'MIT',
    badges: ['Open-Source', 'Award-Nominee'],
    featured: true,
    order: 5,
  },

  // 6. Latent Space - Cultural Archive
  {
    id: 'latent-space',
    title: 'Latent Space',
    oneLiner: 'Breath-controlled archive + colonial vs contemporary narratives.',

    domain: ['New-Media', 'AI/Agents'],
    modality: ['Prototype', 'Spec'],
    tech: ['React', 'WebAudio', 'Framer-Motion'],
    status: 'Playable',
    trl: 3,
    access: 'Open',
    risk: 'Low',

    problem:
      'How do we design ethical interfaces for dream/consciousness data? What if BCIs existed today—how should they respect autonomy?',

    approach:
      'Speculative design fiction. Breath input → particle aurora morph. Content reflow based on narrative acts. Critical design provocations embedded.',

    outcome:
      'Interactive prototype at latent-space.vercel.app. **24+ design provocations**, **16 ethical considerations**. Featured in ACM DIS 2025 (under review).',

    buildNotes:
      '- Web Audio API for mic input\n- Particle systems via Canvas API\n- Scroll-driven narrative acts\n- Privacy-first design principles',

    risksEthics:
      'Low risk. No data collected. Speculative—not real BCI. Focus: ethics of hypothetical consciousness tech.',

    links: {
      demo: 'https://latent-space.vercel.app',
      repo: 'https://github.com/krishnanihar/latent-space',
      spec: '/work/latent-space',
    },

    demoEmbed: {
      type: 'iframe',
      url: 'https://latent-space.vercel.app',
    },

    owner: 'Krishna Nihar',
    dates: {
      created: '2024-12-10',
      updated: '2025-10-08',
    },

    kpis: {
      impact: '24+ design provocations, 16 ethical considerations',
      experienceWins: 'ACM DIS 2025 submission (under review)',
    },

    log: [
      {
        date: '2025-10-08',
        note: 'Breath input sensitivity tuning',
      },
      {
        date: '2025-09-15',
        note: 'Narrative acts refactor complete',
      },
      {
        date: '2025-08-01',
        note: 'Particle aurora system live',
      },
    ],

    roadmap: {
      now: ['In-browser fine-tuned embeddings', 'Timeline scrubbing'],
      next: ['Multi-language support', 'Accessibility enhancements'],
      later: ['VR version', 'Collaborative dream journals'],
    },

    license: 'MIT',
    badges: ['Open-Source', 'Privacy-Preserving'],
    featured: true,
    order: 6,
  },

  // 7. Ultraviolette Flight Manual
  {
    id: 'ultraviolette-flight-manual',
    title: 'Ultraviolette Flight Manual',
    oneLiner: 'F77 "flight-deck" service UX; mission-brief pages.',

    domain: ['Mobility', 'Design-Systems'],
    modality: ['UX-Pattern', 'Spec'],
    tech: ['React', 'Tailwind', 'Framer-Motion'],
    status: 'Playable',
    trl: 5,
    access: 'Open',
    risk: 'Low',

    problem:
      'Electric motorcycle service manuals are boring PDFs. How do we make them feel like a fighter jet briefing?',

    approach:
      'OLED sections, chromatic aberration accents, timeline cards. Aviation-inspired UI patterns. Designed for shop-floor tablets.',

    outcome:
      'Design system live at ultraviolette.com/manual. **15k+ monthly views**. Adopted for F77 service training.',

    buildNotes:
      '- Chromatic aberration via CSS filters\n- Dark mode optimized for OLED\n- Print-friendly fallback\n- Timeline cards with step-by-step flows',

    risksEthics:
      'Low risk. Public service manual. No user data.',

    links: {
      demo: 'https://ultraviolette.com/manual',
      figma: 'https://www.figma.com/file/ultraviolette-flight-manual',
    },

    demoEmbed: {
      type: 'image',
      url: 'https://ultraviolette.com/manual/preview.png',
    },

    owner: 'Krishna Nihar',
    dates: {
      created: '2024-08-20',
      updated: '2025-09-30',
    },

    kpis: {
      experienceWins: '15k+ monthly views, adopted for training',
    },

    log: [
      {
        date: '2025-09-30',
        note: 'Print-friendly fallback added',
      },
      {
        date: '2025-08-12',
        note: 'Timeline card system complete',
      },
      {
        date: '2024-11-05',
        note: 'Initial design system launch',
      },
    ],

    roadmap: {
      now: ['Telemetry overlay', 'Shop-floor training mode'],
      next: ['AR instructions via QR codes', 'Video embeds'],
      later: ['Multi-language support', 'Interactive 3D parts viewer'],
    },

    license: 'Source-Available',
    featured: false,
    order: 7,
  },

  // 8. n8n Agent Kit - Autopipelines
  {
    id: 'n8n-agent-kit',
    title: 'n8n Agent Kit',
    oneLiner: 'One-click pipelines for data cleaning, prompt evals, asset export.',

    domain: ['Infra/Tooling', 'AI/Agents'],
    modality: ['Library', 'Playground'],
    tech: ['n8n', 'Node', 'TypeScript'],
    status: 'Playable',
    trl: 4,
    access: 'Open',
    risk: 'Medium',

    problem:
      'n8n workflows for AI tasks are repetitive. How do we package reusable agent recipes for common tasks?',

    approach:
      'Recipe cards → run → results dashboard. Pre-built workflows for: data cleaning, prompt evaluation, asset export, LLM chaining.',

    outcome:
      'Open-source library with **800+ installs**. Featured in n8n community showcase. Used internally at Air India for ops automation.',

    buildNotes:
      '- n8n custom nodes for LLM chains\n- Rate-limit guards built-in\n- Secrets vault integration\n- Job resume on failure',

    risksEthics:
      'Medium risk: API key handling. Best practices: use n8n credentials store, never log secrets.',

    links: {
      demo: 'https://n8n-agent-kit.vercel.app',
      repo: 'https://github.com/krishnanihar/n8n-agent-kit',
    },

    owner: 'Krishna Nihar',
    dates: {
      created: '2025-03-01',
      updated: '2025-10-05',
    },

    kpis: {
      adoption: 800,
      experienceWins: 'n8n community showcase feature',
    },

    log: [
      {
        date: '2025-10-05',
        note: 'Job resume on failure added',
      },
      {
        date: '2025-09-18',
        note: 'Rate-limit guards for LLM APIs',
      },
      {
        date: '2025-08-10',
        note: 'Secrets vault integration',
      },
    ],

    roadmap: {
      now: ['Rate-limit guards', 'Secrets vault', 'Job resumes'],
      next: ['Visual recipe builder', 'Cost estimator', 'Slack alerts'],
      later: ['Multi-cloud support', 'Auto-retry strategies', 'Cost optimization advisor'],
    },

    license: 'MIT',
    badges: ['Open-Source'],
    featured: false,
    order: 8,
  },
];

// Helper functions
export const getLabExperimentById = (id: string) => {
  return labExperiments.find((exp) => exp.id === id);
};

export const getFeaturedExperiments = () => {
  return labExperiments.filter((exp) => exp.featured).sort((a, b) => (a.order || 99) - (b.order || 99));
};

export const getExperimentsByStatus = (status: string) => {
  return labExperiments.filter((exp) => exp.status === status);
};

export const getExperimentsByDomain = (domain: string) => {
  return labExperiments.filter((exp) => exp.domain.includes(domain as any));
};

export const getExperimentsByAccess = (access: string) => {
  return labExperiments.filter((exp) => exp.access === access);
};
