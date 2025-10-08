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

// Premium Typography Components
export { MagneticText } from './MagneticText';
export { MorphingText, MorphingTextPresets } from './MorphingText';
export { AnimatedHeading, AnimatedHeadingPresets } from './AnimatedHeading';

// mythOS Components
export { MythOSHero } from './MythOSHero';
export { ExhibitionBuilder } from './ExhibitionBuilder';
export { ExhibitionHeader } from './ExhibitionHeader';
export { ImmersiveGallery } from './ImmersiveGallery';
export { Timeline } from './Timeline';
export { WorldMap } from './Map';

// Re-export everything for convenience
export * from './Button';
export * from './Card';
export * from './Navigation';
export * from './ProjectCard';
export * from './FilterTabs';
export * from './WorkGrid';
export * from './MagneticText';
export * from './MorphingText';
export * from './AnimatedHeading';
export * from './MythOSHero';
export * from './ExhibitionBuilder';
export * from './ExhibitionHeader';
export * from './ImmersiveGallery';
export * from './Timeline';
export * from './Map';