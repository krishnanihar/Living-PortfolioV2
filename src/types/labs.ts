/**
 * Labs Experiment Types
 * Type definitions for Nihar Labs - rapid experiments in AI, mobility, and new media
 */

// Domain categories
export type LabDomain =
  | 'AI/Agents'
  | 'Design-Systems'
  | 'Aviation'
  | 'Mobility'
  | 'Data-Art'
  | 'AR/ARG'
  | 'Wellness'
  | 'Infra/Tooling'
  | 'New-Media';

// Modality types
export type LabModality =
  | 'Prototype'
  | 'Plugin'
  | 'Dataset'
  | 'Library'
  | 'Spec'
  | 'UX-Pattern'
  | 'Playground'
  | 'Evaluation';

// Status levels
export type LabStatus =
  | 'Incubating'  // Concept art, notes, no demo yet
  | 'Playable'    // Live demo + README + reproducible steps
  | 'Field-Tested' // Used in real workflow with metrics
  | 'Archived';    // Replaced or sunset

// Access levels
export type LabAccess =
  | 'Open'        // Public, fully accessible
  | 'Invite'      // Request access required
  | 'Internal';   // Private/internal only

// Risk classification
export type LabRisk =
  | 'Low'         // UI/UX experiments
  | 'Medium'      // Data handling
  | 'High';       // OPSEC/security concerns

// Tech Readiness Level (1-9 NASA scale)
export type TRL = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// Technology tags
export type LabTech =
  | 'TypeScript'
  | 'React'
  | 'Tailwind'
  | 'Three.js'
  | 'WebGL'
  | 'n8n'
  | 'Python'
  | 'Node'
  | 'Figma-Plugin'
  | 'OpenCV'
  | 'LLM'
  | 'WebAudio'
  | 'GPS'
  | 'TouchDesigner'
  | 'Arduino'
  | 'Next.js'
  | 'Framer-Motion';

// License types
export type LabLicense =
  | 'MIT'
  | 'Apache-2.0'
  | 'Source-Available'
  | 'Internal-Use';

// Achievement badges
export type LabBadge =
  | 'A/B-Win'
  | 'Prod-Impact'
  | 'Open-Source'
  | 'Privacy-Preserving'
  | 'Award-Nominee'
  | 'Field-Tested';

// Link types
export interface LabLink {
  demo?: string;
  repo?: string;
  figma?: string;
  spec?: string;
  whitepaper?: string;
  dataset?: string;
  promptPack?: string;
}

// KPI metrics
export interface LabKPIs {
  timeSavedMinutes?: number;
  adoption?: number;
  qualityDelta?: string;
  experienceWins?: string;
  performanceImprovement?: string;
  reliability?: string;
  issuesAutofixedPct?: number;
  playtimeMedianSec?: number;
  completionRate?: number;
  [key: string]: string | number | undefined;
}

// Dates
export interface LabDates {
  created: string;  // ISO date string
  updated: string;  // ISO date string
}

// Log entry for changelog
export interface LabLogEntry {
  date: string;   // ISO date string
  note: string;
}

// Roadmap sections
export interface LabRoadmap {
  now: string[];
  next: string[];
  later: string[];
}

// Main experiment interface
export interface LabExperiment {
  id: string;
  title: string;
  oneLiner: string;

  // Taxonomy
  domain: LabDomain[];
  modality: LabModality[];
  tech: LabTech[];
  status: LabStatus;
  trl: TRL;
  access: LabAccess;
  risk: LabRisk;

  // Content sections
  problem: string;
  approach: string;
  outcome: string;
  buildNotes?: string;
  risksEthics?: string;

  // Links & media
  links: LabLink;
  demoEmbed?: {
    type: 'iframe' | 'video' | 'image';
    url: string;
  };

  // Metadata
  owner: string;
  dates: LabDates;
  kpis?: LabKPIs;
  log: LabLogEntry[];
  roadmap: LabRoadmap;

  // Governance
  license?: LabLicense;
  badges?: LabBadge[];

  // Display
  featured?: boolean;
  order?: number;
}

// Filter state interface
export interface LabFilters {
  domain: LabDomain[];
  modality: LabModality[];
  status: LabStatus[];
  access: LabAccess[];
  trl: TRL[];
  timeRange: 'all' | '7d' | '30d' | '90d';
  search: string;
}

// Stats interface
export interface LabStats {
  totalExperiments: number;
  activeExperiments: number;
  weeklyStreak: number;
  totalViews?: number;
  totalForks?: number;
  totalAdoptions?: number;
}

// Notebook entry (for lab notebook stream)
export interface LabNotebookEntry {
  id: string;
  experimentId: string;
  experimentTitle: string;
  date: string;
  note: string;
  tags?: string[];
}

// Component prop types
export interface LabsHeroProps {
  onBrowse?: () => void;
  onRandom?: () => void;
  onSubmit?: () => void;
  onGetCode?: () => void;
}

export interface LabsFiltersProps {
  filters: LabFilters;
  onFilterChange: (filters: LabFilters) => void;
  experimentCount: number;
}

export interface ExperimentCardProps {
  experiment: LabExperiment;
  onClick?: (experiment: LabExperiment) => void;
  className?: string;
}

export interface ExperimentDetailProps {
  experiment: LabExperiment | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface LabNotebookProps {
  entries: LabNotebookEntry[];
  className?: string;
}

export interface LabsKPIWidgetProps {
  stats: LabStats;
  className?: string;
}
