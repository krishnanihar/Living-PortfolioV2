'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { LabExperiment, LabFilters, LabDomain, LabModality, LabStatus, LabAccess, TRL } from '@/types/labs';
import {
  defaultFilters,
  filterExperiments,
  sortExperiments,
  filtersToURLParams,
  urlParamsToFilters,
  hasActiveFilters,
  getActiveFilterCount,
  type SortOption,
} from '@/lib/labs-filters';

export function useLabsFilters(experiments: LabExperiment[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filters from URL params
  const [filters, setFilters] = useState<LabFilters>(() => {
    if (typeof window !== 'undefined') {
      return urlParamsToFilters(searchParams);
    }
    return defaultFilters;
  });

  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchDebounced, setSearchDebounced] = useState(filters.search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(filters.search);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Update URL params when filters change
  useEffect(() => {
    const params = filtersToURLParams(filters);
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl as never, { scroll: false });
  }, [filters, pathname, router]);

  // Memoized filtered results
  const filteredExperiments = useMemo(() => {
    const filtersWithDebounced = { ...filters, search: searchDebounced };
    const filtered = filterExperiments(experiments, filtersWithDebounced);
    return sortExperiments(filtered, sortBy);
  }, [experiments, filters, searchDebounced, sortBy]);

  // Filter update functions
  const updateFilters = useCallback((newFilters: Partial<LabFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const toggleDomain = useCallback((domain: LabDomain) => {
    setFilters((prev) => {
      const domains = prev.domain.includes(domain)
        ? prev.domain.filter((d) => d !== domain)
        : [...prev.domain, domain];
      return { ...prev, domain: domains };
    });
  }, []);

  const toggleModality = useCallback((modality: LabModality) => {
    setFilters((prev) => {
      const modalities = prev.modality.includes(modality)
        ? prev.modality.filter((m) => m !== modality)
        : [...prev.modality, modality];
      return { ...prev, modality: modalities };
    });
  }, []);

  const toggleStatus = useCallback((status: LabStatus) => {
    setFilters((prev) => {
      const statuses = prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status];
      return { ...prev, status: statuses };
    });
  }, []);

  const toggleAccess = useCallback((access: LabAccess) => {
    setFilters((prev) => {
      const accesses = prev.access.includes(access)
        ? prev.access.filter((a) => a !== access)
        : [...prev.access, access];
      return { ...prev, access: accesses };
    });
  }, []);

  const toggleTRL = useCallback((trl: TRL) => {
    setFilters((prev) => {
      const trls = prev.trl.includes(trl) ? prev.trl.filter((t) => t !== trl) : [...prev.trl, trl];
      return { ...prev, trl: trls };
    });
  }, []);

  const setTimeRange = useCallback((timeRange: LabFilters['timeRange']) => {
    setFilters((prev) => ({ ...prev, timeRange }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setSortBy('newest');
  }, []);

  const clearSearch = useCallback(() => {
    setFilters((prev) => ({ ...prev, search: '' }));
  }, []);

  return {
    // State
    filters,
    sortBy,
    filteredExperiments,

    // Computed
    hasActiveFilters: hasActiveFilters(filters),
    activeFilterCount: getActiveFilterCount(filters),
    totalResults: filteredExperiments.length,
    totalExperiments: experiments.length,

    // Actions
    updateFilters,
    toggleDomain,
    toggleModality,
    toggleStatus,
    toggleAccess,
    toggleTRL,
    setTimeRange,
    setSearch,
    setSortBy,
    clearFilters,
    clearSearch,
  };
}
