import type { LabExperiment, LabFilters, LabDomain, LabModality, LabStatus, LabAccess, TRL } from '@/types/labs';

/**
 * Labs Filter Utilities
 * Filter logic, search, and URL param management for Labs experiments
 */

// Default filter state
export const defaultFilters: LabFilters = {
  domain: [],
  modality: [],
  status: [],
  access: [],
  trl: [],
  timeRange: 'all',
  search: '',
};

// Filter experiments based on filter state
export function filterExperiments(experiments: LabExperiment[], filters: LabFilters): LabExperiment[] {
  let filtered = [...experiments];

  // Domain filter
  if (filters.domain.length > 0) {
    filtered = filtered.filter((exp) =>
      filters.domain.some((domain) => exp.domain.includes(domain))
    );
  }

  // Modality filter
  if (filters.modality.length > 0) {
    filtered = filtered.filter((exp) =>
      filters.modality.some((modality) => exp.modality.includes(modality))
    );
  }

  // Status filter
  if (filters.status.length > 0) {
    filtered = filtered.filter((exp) => filters.status.includes(exp.status));
  }

  // Access filter
  if (filters.access.length > 0) {
    filtered = filtered.filter((exp) => filters.access.includes(exp.access));
  }

  // TRL filter
  if (filters.trl.length > 0) {
    filtered = filtered.filter((exp) => filters.trl.includes(exp.trl));
  }

  // Time range filter
  if (filters.timeRange !== 'all') {
    const now = new Date();
    const daysMap: Record<string, number> = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
    };
    const days = daysMap[filters.timeRange] || 0;
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    filtered = filtered.filter((exp) => {
      const updatedDate = new Date(exp.dates.updated);
      return updatedDate >= cutoffDate;
    });
  }

  // Search filter (fuzzy search over title, oneLiner, tags)
  if (filters.search.trim().length > 0) {
    const searchLower = filters.search.toLowerCase().trim();
    filtered = filtered.filter((exp) => {
      const titleMatch = exp.title.toLowerCase().includes(searchLower);
      const oneLinerMatch = exp.oneLiner.toLowerCase().includes(searchLower);
      const techMatch = exp.tech.some((t) => t.toLowerCase().includes(searchLower));
      const domainMatch = exp.domain.some((d) => d.toLowerCase().includes(searchLower));
      const modalityMatch = exp.modality.some((m) => m.toLowerCase().includes(searchLower));

      return titleMatch || oneLinerMatch || techMatch || domainMatch || modalityMatch;
    });
  }

  return filtered;
}

// Sort experiments
export type SortOption = 'newest' | 'oldest' | 'trl-high' | 'trl-low' | 'name-asc' | 'name-desc';

export function sortExperiments(experiments: LabExperiment[], sortBy: SortOption): LabExperiment[] {
  const sorted = [...experiments];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.dates.updated).getTime() - new Date(a.dates.updated).getTime());
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.dates.updated).getTime() - new Date(b.dates.updated).getTime());
    case 'trl-high':
      return sorted.sort((a, b) => b.trl - a.trl);
    case 'trl-low':
      return sorted.sort((a, b) => a.trl - b.trl);
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

// URL param serialization
export function filtersToURLParams(filters: LabFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.domain.length > 0) params.set('domain', filters.domain.join(','));
  if (filters.modality.length > 0) params.set('modality', filters.modality.join(','));
  if (filters.status.length > 0) params.set('status', filters.status.join(','));
  if (filters.access.length > 0) params.set('access', filters.access.join(','));
  if (filters.trl.length > 0) params.set('trl', filters.trl.join(','));
  if (filters.timeRange !== 'all') params.set('time', filters.timeRange);
  if (filters.search.trim().length > 0) params.set('q', filters.search.trim());

  return params;
}

// URL param deserialization
export function urlParamsToFilters(params: URLSearchParams): LabFilters {
  const filters: LabFilters = { ...defaultFilters };

  const domainParam = params.get('domain');
  if (domainParam) filters.domain = domainParam.split(',') as LabDomain[];

  const modalityParam = params.get('modality');
  if (modalityParam) filters.modality = modalityParam.split(',') as LabModality[];

  const statusParam = params.get('status');
  if (statusParam) filters.status = statusParam.split(',') as LabStatus[];

  const accessParam = params.get('access');
  if (accessParam) filters.access = accessParam.split(',') as LabAccess[];

  const trlParam = params.get('trl');
  if (trlParam) filters.trl = trlParam.split(',').map(Number) as TRL[];

  const timeParam = params.get('time');
  if (timeParam && ['all', '7d', '30d', '90d'].includes(timeParam)) {
    filters.timeRange = timeParam as LabFilters['timeRange'];
  }

  const searchParam = params.get('q');
  if (searchParam) filters.search = searchParam;

  return filters;
}

// Get all unique values for filter options
export function getFilterOptions(experiments: LabExperiment[]) {
  const domains = new Set<LabDomain>();
  const modalities = new Set<LabModality>();
  const statuses = new Set<LabStatus>();
  const accesses = new Set<LabAccess>();
  const trls = new Set<TRL>();

  experiments.forEach((exp) => {
    exp.domain.forEach((d) => domains.add(d));
    exp.modality.forEach((m) => modalities.add(m));
    statuses.add(exp.status);
    accesses.add(exp.access);
    trls.add(exp.trl);
  });

  return {
    domains: Array.from(domains).sort(),
    modalities: Array.from(modalities).sort(),
    statuses: Array.from(statuses).sort(),
    accesses: Array.from(accesses).sort(),
    trls: Array.from(trls).sort((a, b) => a - b),
  };
}

// Check if any filters are active
export function hasActiveFilters(filters: LabFilters): boolean {
  return (
    filters.domain.length > 0 ||
    filters.modality.length > 0 ||
    filters.status.length > 0 ||
    filters.access.length > 0 ||
    filters.trl.length > 0 ||
    filters.timeRange !== 'all' ||
    filters.search.trim().length > 0
  );
}

// Get count of active filters
export function getActiveFilterCount(filters: LabFilters): number {
  let count = 0;
  if (filters.domain.length > 0) count++;
  if (filters.modality.length > 0) count++;
  if (filters.status.length > 0) count++;
  if (filters.access.length > 0) count++;
  if (filters.trl.length > 0) count++;
  if (filters.timeRange !== 'all') count++;
  if (filters.search.trim().length > 0) count++;
  return count;
}
