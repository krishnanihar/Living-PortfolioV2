# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (Note: `next lint` is deprecated, consider migrating to ESLint CLI)
- `npm run type-check` - Run TypeScript type checking (no emit)

### Quality Assurance
Always run these commands before committing:
```bash
npm run type-check
npm run lint
npm run build
```

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS 4.1.13 with custom design system
- **UI Components**: Custom components using glassmorphism design
- **Icons**: Lucide React
- **Font**: Inter (variable font)
- **Animation**: Framer Motion (dev dependency)

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home/Hero page
│   ├── about/page.tsx     # About page
│   ├── contact/page.tsx   # Contact page
│   └── work/page.tsx      # Work portfolio page
├── components/
│   ├── effects/           # Theme and effects
│   │   └── ThemeProvider.tsx
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   └── Work.tsx
│   └── ui/                # Reusable UI components
│       ├── index.ts       # Barrel exports
│       ├── Navigation.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ProjectCard.tsx
│       ├── FilterTabs.tsx
│       └── WorkGrid.tsx
├── data/
│   └── projects.ts        # Project portfolio data
├── lib/
│   ├── animations.ts      # Animation utilities
│   ├── micro-interactions.ts  # Advanced interaction system
│   └── utils.ts           # Utility functions
└── types/
    └── projects.ts        # TypeScript type definitions
```

### Design System Architecture

**CSS Variables System**: Located in `src/app/globals.css`
- Comprehensive design token system with CSS variables
- Theme-aware colors, spacing, and typography
- Advanced glassmorphism with iOS Control Center-level sophistication
- Clean OLED black background with sophisticated glass surfaces

**Color System**:
- OLED black canvas (`#0A0A0A`) as primary background
- Brand red (`#DA0E29`) for primary actions
- Sophisticated opacity-based surface hierarchy (4-6% opacity)
- Theme-aware glass surfaces with proper blur and saturation

**Micro-Interactions**:
- Magnetic hover effects with performance monitoring
- Device capability detection (touch/hover/high DPI)
- Custom cursor with state-aware interactions
- Scroll reveal animations with intersection observers

### Component Architecture

**UI Components** (`src/components/ui/`):
- Follow consistent prop interfaces with TypeScript
- Use CSS variables for theme-aware styling
- Support both light and dark themes
- Export types and components from `index.ts`

**Project System**:
- Typed project data in `src/data/projects.ts`
- Project categories: system, mobile, ife, hackathons, web, research
- Project statuses: live, shipped, concept, winner, development
- Filtering system with accessibility considerations

### Path Aliases
TypeScript path mapping configured:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/types/*` → `./src/types/*`

### Theme System
- Default dark theme with OLED optimizations
- ThemeProvider supports both light/dark modes
- Theme switching via `data-theme` attribute
- Glassmorphism effects adapt to theme

## Code Conventions

### Styling
- Use Tailwind classes exclusively
- Reference design tokens for consistency
- Prefer custom utility classes for complex effects
- Use opacity-based colors for surfaces and text hierarchy

### TypeScript
- Strict mode enabled
- Export types alongside components
- Use `as const` for immutable data structures
- Prefer type definitions over interfaces for data types

### Components
- Use functional components with TypeScript
- Export component and props type from same file
- Follow naming convention: PascalCase for components
- Use barrel exports in `index.ts` files

### Performance Optimizations
- Image optimization configured (WebP, AVIF)
- Font preloading in layout
- DNS prefetch for external resources
- Remove console logs in production
- Typed routes enabled for better performance

## Important Notes

### Navigation
- Fixed 56px height on desktop, 48px on mobile
- Glassmorphism backdrop with blur effects
- Uses brand red for active states

### SEO & Metadata
- Comprehensive metadata in root layout
- OpenGraph and Twitter card support
- Proper robots configuration
- Manifest and favicon setup

### Development Workflow
1. Always check TypeScript errors before committing
2. Use CSS variables rather than hardcoded values
3. Test components in both light and dark themes
4. Ensure accessibility for interactive components
5. Follow the existing project data structure for new portfolio items
6. Consider performance impact of animations and effects