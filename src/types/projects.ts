/**
 * Project and Work Portfolio Types
 */

export type ProjectStatus = 'live' | 'shipped' | 'concept' | 'winner' | 'development';

export type ProjectCategory = 'system' | 'mobile' | 'ife' | 'hackathons' | 'web' | 'research';

export interface ProjectTag {
  id: string;
  label: string;
  color?: string;
}

export interface ProjectMeta {
  year: string;
  duration?: string;
  team?: string;
  role?: string;
}

export interface ProjectMetrics {
  users?: string;
  improvement?: string;
  impact?: string;
  timeline?: string;
}

export interface ProjectLink {
  type: 'live' | 'github' | 'figma' | 'prototype' | 'case-study' | 'demo';
  url: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tags: ProjectTag[];
  meta: ProjectMeta;
  metrics?: ProjectMetrics;
  links?: ProjectLink[];
  image?: string;
  gallery?: string[];
  featured?: boolean;
  order?: number;
}

export interface WorkSection {
  title: string;
  subtitle: string;
  projects: Project[];
}

// Filter types
export type FilterCategory = 'all' | ProjectCategory;

export interface FilterTab {
  id: FilterCategory;
  label: string;
  count?: number;
  color?: string;
}

// Component prop types
export interface ProjectCardProps {
  project: Project;
  className?: string;
  onClick?: (project: Project) => void;
  variant?: 'default' | 'featured' | 'compact';
}

export interface FilterTabsProps {
  tabs: FilterTab[];
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
  className?: string;
}

export interface WorkGridProps {
  projects: Project[];
  activeFilter: FilterCategory;
  className?: string;
}