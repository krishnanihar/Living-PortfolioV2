# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with Next.js configuration
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
- **Animation**: Framer Motion (dev dependency), Anime.js
- **Additional Libraries**: clsx, tailwind-merge for utility class management

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home/Hero page
│   ├── about/page.tsx     # About page
│   ├── contact/page.tsx   # Contact page
│   ├── journey/page.tsx   # Journey timeline page
│   ├── labs/page.tsx      # Labs experiments page
│   └── work/              # Work case studies
│       ├── page.tsx       # Work portfolio page
│       ├── air-india/page.tsx
│       ├── latent-space/page.tsx
│       ├── metamorphic-fractal-reflections/page.tsx
│       ├── mythos/page.tsx
│       └── psoriassist/page.tsx
├── components/
│   ├── effects/           # Theme and effects, micro-interactions
│   │   ├── ThemeProvider.tsx
│   │   ├── MicroInteractionProvider.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── FocusManager.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ConsciousnessParticles.tsx  # Narrative particle effects
│   │   ├── NarrativeAudio.tsx          # Binaural audio system
│   │   ├── ParallaxSection.tsx
│   │   └── ScrollReveal.tsx
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── Work.tsx
│   │   ├── WorkSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SimpleAboutSection.tsx
│   │   ├── JourneyTimeline.tsx
│   │   ├── JourneyPreview.tsx
│   │   ├── AirIndiaWork.tsx
│   │   ├── MetamorphicFractalWork.tsx
│   │   ├── LatentSpaceWork.tsx
│   │   ├── LatentSpaceComponents.tsx   # Narrative storytelling system
│   │   ├── LatentSpaceSpeculative.tsx  # Speculative design fiction
│   │   ├── FirstPersonMoments.tsx      # Immersive narrative overlays
│   │   ├── DreamRecorderPrototype.tsx  # Design fiction prototype
│   │   ├── PsoriAssistWork.tsx
│   │   ├── PsoriAssistPhoneMockup.tsx  # Interactive iOS prototype
│   │   ├── PsoriAssistFirstPersonMoments.tsx
│   │   ├── PsoriAssistBreathingMoment.tsx
│   │   └── PsoriAssistInteractivePrototypes.tsx
│   ├── mythos/            # Mythos case study components
│   │   ├── sections/      # Hero, Problem, Innovation, Impact, CTA, Gallery
│   │   └── ui/            # ScrollReveal, AnimatedCounter
│   ├── ui/                # Reusable UI components
│   │   ├── index.ts       # Barrel exports
│   │   ├── Navigation.tsx
│   │   ├── PortfolioNavigation.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── FilterTabs.tsx
│   │   ├── WorkGrid.tsx
│   │   ├── AnimatedHeading.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── MagneticText.tsx
│   │   ├── MorphingText.tsx
│   │   ├── FlipCard.tsx
│   │   ├── Timeline.tsx
│   │   ├── TimelineVisualization.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── BreathingMoment.tsx         # Narrative pacing
│   │   ├── NarrativeProgressIndicator.tsx
│   │   ├── ProgressiveDataReveal.tsx   # Scroll-driven data viz
│   │   ├── LiminalDivider.tsx
│   │   ├── ImmersiveGallery.tsx
│   │   ├── ExhibitionBuilder.tsx
│   │   ├── ArtworkModal.tsx
│   │   ├── Map.tsx
│   │   └── labs/          # Labs page components
│   │       ├── LabsHero.tsx
│   │       ├── ExperimentCard.tsx
│   │       ├── FeaturedExperimentCard.tsx
│   │       ├── AnimatedStatCard.tsx
│   │       ├── LabTimelineView.tsx
│   │       └── ContributeCTA.tsx
│   ├── Portfolio.tsx      # Main portfolio wrapper with consciousness system
│   ├── HeroCard.tsx
│   ├── HeroScene3D.tsx
│   ├── ContactChat.tsx
│   ├── ConversationStarter.tsx
│   ├── Chatbot.tsx
│   └── QuickTour.tsx
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

## Critical Implementation Notes

### Hero Card Centering
**⚠️ IMPORTANT: Transform Conflicts**
- **Problem**: Multiple transform properties in parent/child hierarchy don't combine correctly
- **Solution**: Combine all transforms in single property
```jsx
// ❌ WRONG - Causes centering issues
<div style={{ transform: 'translate(-50%, -50%)' }}>
  <div style={{ transform: 'rotateX(5deg) rotateY(5deg)' }}>

// ✅ CORRECT - Perfect centering with 3D effects
<div style={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) rotateX(5deg) rotateY(5deg)'
}}>
```

### Navigation Fade-In System
**Scroll-Based Visibility Implementation:**
- Uses `pastHero` state with 80% viewport threshold (`window.innerHeight * 0.8`)
- **Navigation opacity**: `40%` during hero (clickable), `100%` after scroll
- **Critical**: Never use `pointerEvents: 'none'` - breaks navigation between pages
- **Consciousness system**: Fades with navigation using same `pastHero` state

### CSS Specificity Issues
**When Tailwind Classes Don't Work:**
- CSS-in-JS and component styles can override Tailwind
- **Solution**: Use inline styles for critical positioning elements
- **Example**: Hero section requires inline styles to override `.portfolio-container` CSS

## Common Build Issues & Solutions

### JSX Compilation Errors
1. **Missing commas in style objects**
   ```jsx
   // ❌ Syntax error
   style={{
     width: '100%',
     padding: '3rem'  // Missing comma
     borderRadius: '36px'
   }}
   ```

2. **Unbalanced div tags**
   - Always match opening/closing divs when restructuring components
   - Use editor bracket matching to verify structure

3. **Transform property syntax**
   - Template literals require backticks: `transform: \`translate(-50%, -50%)\``
   - Combine multiple transforms with spaces: `translate() rotateX() rotateY()`

### Production Build Fixes
- **@next/font deprecation**: Remove from package.json, use built-in `next/font`
- **Clear caches**: Delete `.next` and `node_modules` when encountering persistent warnings
- **Vercel deployment**: Local `npm run build` must pass before pushing

### Consciousness System Architecture
- **Location**: ConsciousnessIndicator and AmbientWhispers moved to Portfolio.tsx
- **Reason**: Enables scroll-based visibility control with `pastHero` state
- **Context**: ConsciousnessProvider remains in layout.tsx for global state management

### 14-inch Screen Optimizations
**Responsive Design for 1280-1440px screens** (e.g., 14" laptops)
- **Typography**: Reduced clamp ranges for better scaling between breakpoints
  - Hero heading: `clamp(2.25rem, 4.5vw, 3.5rem)` (was 2.5rem → 3.5rem)
  - Main statement: `clamp(1.0625rem, 2.25vw, 1.375rem)` (was 1.125rem → 1.375rem)
- **Spacing**: Responsive spacing using clamp() instead of fixed values
  - Hero card padding: `clamp(2rem, 3vw, 2.5rem)` instead of fixed 2.5rem
  - Button gaps: `clamp(0.75rem, 1.5vw, 1rem)`
  - Section margins: `clamp(1.75rem, 3vw, 2.5rem)`
- **Container widths**:
  - Navigation: `clamp(1200px, 90vw, 1400px)` for better margins
  - Hero card: `clamp(640px, 85vw, 720px)` for breathing room
- **Navigation height**: 52px on 14" screens (instead of 56px) via CSS media query
- **CSS utilities**: Added `@media (min-width: 1280px) and (max-width: 1440px)` block in globals.css
  - Custom properties for optimized spacing
  - Typography overrides for smoother scaling
  - Glass effect padding adjustments

## Major Features & Case Studies

### Narrative Storytelling System (Latent Space)
**Advanced scroll-driven narrative architecture** - 2,500+ lines of code
- **Three-act structure**: Seduction → Complication → Resolution
- **Dynamic theming**: Purple → Red → Blue across narrative acts
- **Components**:
  - ConsciousnessParticles, FirstPersonMoments, NarrativeProgressIndicator
  - ProgressiveDataReveal (bar charts, radial charts, counters, stats grids)
  - BreathingMoment, NarrativeAudio (binaural tones)
  - DreamRecorderPrototype (speculative design fiction)
- **Research foundation**: NYT "Snow Fall", The Pudding, Dunne & Raby
- **Documentation**: NARRATIVE_ENHANCEMENTS.md, NARRATIVE_COMPONENTS_GUIDE.md

### Interactive iOS Prototypes (PsoriAssist)
**Portfolio-grade iOS 17 light mode design system**
- **8 fully interactive screens**: Home, Journal, Photo, Scan, PASI, Tracking, Medication, Profile
- **Authentic iOS design**:
  - iOS 17 glassmorphism with backdrop-filter and saturation
  - SF Pro Display/Text typography (fallback to system-ui)
  - Native iOS gestures, navigation patterns, haptic feedback
  - Dynamic Island integration, status bar styling
- **No screen overflow**: Proper viewport containment (scale 0.85 on mobile)
- **Interactive features**: Camera functionality, PASI calculator, medication tracker
- **Documentation**: PHASE_A_COMPLETE.md, PHASE_B_C_COMPLETE.md, iOS_LIGHT_MODE_TRANSFORMATION.md

### Labs Experiments Page
**Rapid prototyping showcase** - /labs route
- **8 seed experiments**: Pixel Radar, Astra, Aviation Analytics, etc.
- **Multi-dimensional filtering**: By type, status, theme, impact
- **Features**: Stats dashboard with streak tracking, lab notebook, timeline view
- **Design**: Glassmorphic OLED-optimized interface
- **Navigation**: Beaker icon in main nav between Work and Journey

### Case Study Pages
1. **Air India** - System design for airline operations
2. **Latent Space** - Immersive narrative experience with speculative design
3. **Metamorphic Fractal Reflections** - Generative art exhibition
4. **Mythos** - Gaming platform with clean architecture
5. **PsoriAssist** - AI-powered health management with iOS prototypes

## Key Navigation Routes
- `/` - Hero page with 3D scene and conversation starters
- `/work` - Portfolio grid with filtering
- `/work/[project]` - Individual case studies
- `/journey` - Timeline of professional journey
- `/labs` - Experimental prototypes
- `/about` - About page with knowledge graph
- `/contact` - Contact chat interface