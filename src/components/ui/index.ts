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
export { ViewToggle } from './ViewToggle';
export type { ViewToggleProps, ViewMode } from './ViewToggle';

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
export * from './ViewToggle';
export * from './MagneticText';
export * from './MorphingText';
export * from './AnimatedHeading';
// Typography Effects Components
export { ScrambleText } from './ScrambleText';
export { GradientText } from './GradientText';
export { ClipRevealText } from './ClipRevealText';
export * from './ScrambleText';
export * from './GradientText';
export * from './ClipRevealText';

// Narrative Storytelling Components
export { JourneyBadge } from './JourneyBadge';
export type { JourneyBadgeProps } from './JourneyBadge';
export { RoleBadge } from './RoleBadge';
export type { RoleBadgeProps } from './RoleBadge';
export { ImpactBadge } from './ImpactBadge';
export type { ImpactBadgeProps } from './ImpactBadge';
