'use client';

import { useMemo } from 'react';
import type { LabExperiment, LabStats, LabBadge } from '@/types/labs';

/**
 * useLabsStats Hook
 * Calculate aggregate stats, streak, and badge counts for Labs
 */

export function useLabsStats(experiments: LabExperiment[]) {
  const stats = useMemo<LabStats>(() => {
    const totalExperiments = experiments.length;
    const activeExperiments = experiments.filter(
      (exp) => exp.status === 'Playable' || exp.status === 'Field-Tested'
    ).length;

    // Calculate weekly streak (consecutive weeks with updates)
    const weeklyStreak = calculateWeeklyStreak(experiments);

    // Aggregate KPIs
    const totalViews = experiments.reduce((sum, exp) => sum + (exp.kpis?.adoption || 0), 0);
    const totalAdoptions = experiments.filter((exp) => exp.kpis?.adoption).length;

    return {
      totalExperiments,
      activeExperiments,
      weeklyStreak,
      totalViews,
      totalAdoptions,
    };
  }, [experiments]);

  // Badge counts
  const badgeCounts = useMemo(() => {
    const counts: Record<LabBadge, number> = {
      'A/B-Win': 0,
      'Prod-Impact': 0,
      'Open-Source': 0,
      'Privacy-Preserving': 0,
      'Award-Nominee': 0,
      'Field-Tested': 0,
    };

    experiments.forEach((exp) => {
      exp.badges?.forEach((badge) => {
        counts[badge] = (counts[badge] || 0) + 1;
      });
    });

    return counts;
  }, [experiments]);

  // Status breakdown
  const statusBreakdown = useMemo(() => {
    return {
      Incubating: experiments.filter((exp) => exp.status === 'Incubating').length,
      Playable: experiments.filter((exp) => exp.status === 'Playable').length,
      'Field-Tested': experiments.filter((exp) => exp.status === 'Field-Tested').length,
      Archived: experiments.filter((exp) => exp.status === 'Archived').length,
    };
  }, [experiments]);

  // Access breakdown
  const accessBreakdown = useMemo(() => {
    return {
      Open: experiments.filter((exp) => exp.access === 'Open').length,
      Invite: experiments.filter((exp) => exp.access === 'Invite').length,
      Internal: experiments.filter((exp) => exp.access === 'Internal').length,
    };
  }, [experiments]);

  // Average TRL
  const averageTRL = useMemo(() => {
    const sum = experiments.reduce((acc, exp) => acc + exp.trl, 0);
    return experiments.length > 0 ? (sum / experiments.length).toFixed(1) : '0';
  }, [experiments]);

  // Most used tech
  const topTech = useMemo(() => {
    const techCounts: Record<string, number> = {};
    experiments.forEach((exp) => {
      exp.tech.forEach((t) => {
        techCounts[t] = (techCounts[t] || 0) + 1;
      });
    });

    return Object.entries(techCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tech, count]) => ({ tech, count }));
  }, [experiments]);

  return {
    stats,
    badgeCounts,
    statusBreakdown,
    accessBreakdown,
    averageTRL,
    topTech,
  };
}

// Helper: Calculate weekly streak
function calculateWeeklyStreak(experiments: LabExperiment[]): number {
  if (experiments.length === 0) return 0;

  // Get all update dates
  const updateDates = experiments
    .map((exp) => new Date(exp.dates.updated))
    .sort((a, b) => b.getTime() - a.getTime()); // Most recent first

  if (updateDates.length === 0) return 0;

  // Get week number for a date
  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Get unique weeks with updates
  const weeksWithUpdates = new Set<string>();
  updateDates.forEach((date) => {
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    weeksWithUpdates.add(`${year}-W${week}`);
  });

  // Calculate streak from current week backwards
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentWeek = getWeekNumber(now);

  let streak = 0;
  let checkYear = currentYear;
  let checkWeek = currentWeek;

  while (weeksWithUpdates.has(`${checkYear}-W${checkWeek}`)) {
    streak++;
    checkWeek--;

    // Handle year boundary
    if (checkWeek < 1) {
      checkYear--;
      checkWeek = 52; // Approximate weeks in a year
    }

    // Safeguard: max 52 weeks
    if (streak >= 52) break;
  }

  return streak;
}
