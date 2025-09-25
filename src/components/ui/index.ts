// UI Components - Single source of truth exports
export { Button } from './Button';
export type { ButtonProps } from './Button';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
export type { CardProps } from './Card';

export { Navigation } from './Navigation';
export type { NavigationProps } from './Navigation';

export { ProjectCard } from './ProjectCard';
export { FilterTabs, FilterTabsAccessible } from './FilterTabs';
export { WorkGrid, GridDebugger } from './WorkGrid';

// Re-export everything for convenience
export * from './Button';
export * from './Card';
export * from './Navigation';
export * from './ProjectCard';
export * from './FilterTabs';
export * from './WorkGrid';