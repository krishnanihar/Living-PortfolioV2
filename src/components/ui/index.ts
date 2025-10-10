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

export { ProjectCard } from './ProjectCard';
export { FilterTabs, FilterTabsAccessible } from './FilterTabs';
export { WorkGrid, GridDebugger } from './WorkGrid';

// Premium Typography Components
export { MagneticText } from './MagneticText';
export { MorphingText, MorphingTextPresets } from './MorphingText';
export { AnimatedHeading, AnimatedHeadingPresets } from './AnimatedHeading';

// Re-export everything for convenience
export * from './Button';
export * from './Card';
export * from './ProjectCard';
export * from './FilterTabs';
export * from './WorkGrid';
export * from './MagneticText';
export * from './MorphingText';
export * from './AnimatedHeading';