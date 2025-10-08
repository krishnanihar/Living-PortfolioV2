import { LabNotebookEntry } from '@/types/labs';

/**
 * Labs Notebook - Chronological changelog stream
 * Recent updates across all experiments
 */

export const labNotebook: LabNotebookEntry[] = [
  {
    id: 'note-001',
    experimentId: 'arcane-pursuit',
    experimentTitle: 'Arcane Pursuit',
    date: '2025-10-09',
    note: 'Geofence drift reduced from ±7m to ±3m',
    tags: ['GPS', 'Performance'],
  },
  {
    id: 'note-002',
    experimentId: 'astra',
    experimentTitle: 'Astra',
    date: '2025-10-09',
    note: 'Added prompt versioning system',
    tags: ['Feature', 'LLM'],
  },
  {
    id: 'note-003',
    experimentId: 'pixel-radar',
    experimentTitle: 'Pixel Radar',
    date: '2025-10-08',
    note: 'Autofix mode for common violations',
    tags: ['Feature', 'Automation'],
  },
  {
    id: 'note-004',
    experimentId: 'latent-space',
    experimentTitle: 'Latent Space',
    date: '2025-10-08',
    note: 'Breath input sensitivity tuning',
    tags: ['UX', 'WebAudio'],
  },
  {
    id: 'note-005',
    experimentId: 'arcane-pursuit',
    experimentTitle: 'Arcane Pursuit',
    date: '2025-10-08',
    note: 'Spectrogram hints clearer, mobile fix',
    tags: ['UX', 'Mobile'],
  },
  {
    id: 'note-006',
    experimentId: 'aviation-analytics',
    experimentTitle: 'Aviation Analytics',
    date: '2025-10-07',
    note: 'Added fleet health metrics',
    tags: ['Feature', 'Data-Viz'],
  },
  {
    id: 'note-007',
    experimentId: 'arcane-pursuit',
    experimentTitle: 'Arcane Pursuit',
    date: '2025-10-07',
    note: 'Anti-spoof checks; basic device binding',
    tags: ['Security', 'OPSEC'],
  },
  {
    id: 'note-008',
    experimentId: 'pixel-radar',
    experimentTitle: 'Pixel Radar',
    date: '2025-10-07',
    note: 'CLI export to CSV for weekly audits',
    tags: ['Feature', 'Automation'],
  },
  {
    id: 'note-009',
    experimentId: 'pixel-radar',
    experimentTitle: 'Pixel Radar',
    date: '2025-10-05',
    note: 'Added semantic color groups',
    tags: ['Feature', 'Design-Tokens'],
  },
  {
    id: 'note-010',
    experimentId: 'n8n-agent-kit',
    experimentTitle: 'n8n Agent Kit',
    date: '2025-10-05',
    note: 'Job resume on failure added',
    tags: ['Reliability', 'Automation'],
  },
  {
    id: 'note-011',
    experimentId: 'kerala-kingdoms',
    experimentTitle: 'Kerala Kingdoms',
    date: '2025-10-01',
    note: 'Added print export feature',
    tags: ['Feature', 'Export'],
  },
  {
    id: 'note-012',
    experimentId: 'ultraviolette-flight-manual',
    experimentTitle: 'Ultraviolette Flight Manual',
    date: '2025-09-30',
    note: 'Print-friendly fallback added',
    tags: ['Accessibility', 'Print'],
  },
  {
    id: 'note-013',
    experimentId: 'astra',
    experimentTitle: 'Astra',
    date: '2025-09-22',
    note: 'Glassmorphic redesign complete',
    tags: ['Design', 'UI'],
  },
  {
    id: 'note-014',
    experimentId: 'kerala-kingdoms',
    experimentTitle: 'Kerala Kingdoms',
    date: '2025-09-20',
    note: 'Scroll performance optimization',
    tags: ['Performance', 'Optimization'],
  },
  {
    id: 'note-015',
    experimentId: 'n8n-agent-kit',
    experimentTitle: 'n8n Agent Kit',
    date: '2025-09-18',
    note: 'Rate-limit guards for LLM APIs',
    tags: ['Reliability', 'API'],
  },
  {
    id: 'note-016',
    experimentId: 'aviation-analytics',
    experimentTitle: 'Aviation Analytics',
    date: '2025-09-15',
    note: 'Anomaly detection live',
    tags: ['Feature', 'ML'],
  },
  {
    id: 'note-017',
    experimentId: 'latent-space',
    experimentTitle: 'Latent Space',
    date: '2025-09-15',
    note: 'Narrative acts refactor complete',
    tags: ['Refactor', 'Architecture'],
  },
  {
    id: 'note-018',
    experimentId: 'ultraviolette-flight-manual',
    experimentTitle: 'Ultraviolette Flight Manual',
    date: '2025-08-12',
    note: 'Timeline card system complete',
    tags: ['Feature', 'UI'],
  },
  {
    id: 'note-019',
    experimentId: 'n8n-agent-kit',
    experimentTitle: 'n8n Agent Kit',
    date: '2025-08-10',
    note: 'Secrets vault integration',
    tags: ['Security', 'Infrastructure'],
  },
  {
    id: 'note-020',
    experimentId: 'latent-space',
    experimentTitle: 'Latent Space',
    date: '2025-08-01',
    note: 'Particle aurora system live',
    tags: ['Feature', 'Visual'],
  },
];

// Helper functions
export const getRecentNotebookEntries = (limit: number = 10) => {
  return labNotebook.slice(0, limit);
};

export const getNotebookEntriesByExperiment = (experimentId: string) => {
  return labNotebook.filter((entry) => entry.experimentId === experimentId);
};

export const getNotebookEntriesByTag = (tag: string) => {
  return labNotebook.filter((entry) => entry.tags?.includes(tag));
};

export const getNotebookEntriesByDateRange = (startDate: string, endDate: string) => {
  return labNotebook.filter((entry) => entry.date >= startDate && entry.date <= endDate);
};
