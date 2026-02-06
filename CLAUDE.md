# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.



## Development Commands
> **Skill Reference**: Use `nextjs` skill for Next.js App Router patterns and best practices

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
- **Fonts**: Space Grotesk (headings), DM Sans (body)
- **Animation**: Framer Motion (dev dependency), Anime.js
- **Additional Libraries**: clsx, tailwind-merge for utility class management

### Installed Agent Skills

Skills are installed in `.agents/skills/` and provide specialized knowledge for AI coding agents.

| Skill | Source | Use When |
|-------|--------|----------|
| **nextjs** | `jezweb/claude-skills` | Creating/modifying Next.js App Router pages, layouts, API routes, server components |
| **react-19** | `noklip-io/agent-skills` | Using React 19 features (use, actions, form handling, server components) |
| **react-performance** | `thebushidocollective/han` | Optimizing React renders, memo, useMemo, useCallback, profiling |
| **tailwind4-expert** | `yuniorglez/gemini-elite-core` | Tailwind CSS 4 syntax, new features, configuration |
| **tailwind-responsive-design** | `thebushidocollective/han` | Responsive breakpoints, clamp(), container queries |
| **threejs** | `mrgoonie/claudekit-skills` | Three.js scenes, WebGL, GPGPU, shaders, particle systems |
| **framer-motion-animator** | `patricio0312rev/skills` | Framer Motion animations, variants, gestures, scroll-triggered |
| **typescript** | `lobehub/lobehub` | TypeScript patterns, strict mode, generics, utility types |
| **accessibility** | `jezweb/claude-skills` | WCAG compliance, ARIA, keyboard navigation, screen readers |

**Skill Usage Guidelines:**
- Skills are automatically loaded by compatible agents (Claude Code, Cursor, Codex, etc.)
- Reference skills when working on related features (e.g., use `threejs` skill for particle system work)
- Skills complement but don't replace project-specific patterns in this CLAUDE.md

**Install Additional Skills:**
```bash
npx skills search <keyword>      # Search for skills
npx skills add <owner/repo@skill> --yes  # Install a skill
npx skills list                  # List installed skills
```

### Available MCP Servers

| Server | Use When |
|--------|----------|
| **context7** | Need up-to-date docs for Next.js 15, Framer Motion, Three.js, Tailwind CSS 4 |
| **figma-dev-mode-mcp-server** | Converting Figma designs to code, extracting design tokens |
| **chrome-devtools** | Debugging, taking screenshots, performance traces |

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home/Hero page
│   ├── about/page.tsx     # About page
│   ├── contact/page.tsx   # Contact page
│   ├── journey/page.tsx   # Journey timeline page
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
│   │   ├── GPGPUPatternParticles.tsx   # Hero GPGPU particle system
│   │   ├── HeroParticleSystem.tsx      # Dual-layer particle wrapper
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
│   │   ├── PortfolioNavigation.tsx  # Primary navigation with floating effect
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
│   │   └── Map.tsx
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

**Enhanced CSS Variables** (108 theme-aware variables):
- **Text opacity scale**: `--text-100` through `--text-01` (27 variants)
  - Use for: `color`, `borderColor`, text-related properties
  - Auto-switches: Dark mode = white with opacity, Light mode = black with opacity
  - Example: `color: 'var(--text-95)'` (95% opacity text in current theme)

- **Glass surface scale**: `--glass-100` through `--glass-01` (27 variants)
  - Use for: `backgroundColor`, `background`, surface-related properties
  - Auto-switches: Dark mode = white with opacity, Light mode = black with opacity
  - Example: `backgroundColor: 'var(--glass-05)'` (5% opacity surface in current theme)

- **Semantic colors**: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-muted`
- **Surface colors**: `--surface-primary`, `--surface-secondary`, `--surface-hover`, `--surface-active`
- **Border colors**: `--border-primary`, `--border-secondary`, `--border-hover`, `--border-focus`

**Color System**:
- OLED black canvas (`#0A0A0A`) as primary background
- Brand red (`#DA0E29`) for primary actions
- Sophisticated opacity-based surface hierarchy (4-6% opacity)
- Theme-aware glass surfaces with proper blur and saturation
- **All theme colors automatically adapt via CSS variables** (no JavaScript theme conditionals)

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

**Navigation Component**:
- **PortfolioNavigation.tsx** is the primary (and only) navigation component
- Features: Floating effect, responsive heights, multi-layer glassmorphism, active route detection
- Used across all pages (home, work, about, journey, case studies)
- Fully optimized with CSS variables (no theme conditionals in styling)

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
> **Skill References**: Use `tailwind4-expert` for Tailwind CSS 4 patterns, `tailwind-responsive-design` for responsive layouts

- Use Tailwind classes exclusively
- Reference design tokens for consistency
- Prefer custom utility classes for complex effects
- Use opacity-based colors for surfaces and text hierarchy

**⚠️ CRITICAL: Theme-Dependent Styling**
- **NEVER** use inline theme conditionals: `resolvedTheme === 'light' ? ... : ...`
- **ALWAYS** use CSS variables from globals.css
- This prevents build timeouts and improves performance

```tsx
// ❌ WRONG - Causes 45+ minute build timeouts
color: resolvedTheme === 'light' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'

// ✅ CORRECT - Instant builds, better performance
color: 'var(--text-95)'
```

**CSS Variable Selection Guide:**
- For text/borders: Use `--text-{opacity}` (e.g., `--text-95`, `--text-60`)
- For backgrounds/surfaces: Use `--glass-{opacity}` (e.g., `--glass-05`, `--glass-15`)
- Opacity values: 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 18, 15, 12, 10, 08, 06, 05, 04, 03, 02, 01

### TypeScript
> **Skill Reference**: Use `typescript` skill for advanced patterns

- Strict mode enabled
- Export types alongside components
- Use `as const` for immutable data structures
- Prefer type definitions over interfaces for data types

### Components
> **Skill References**: Use `react-19` for React 19 patterns, `react-performance` for optimization, `accessibility` for a11y

- Use functional components with TypeScript
- Export component and props type from same file
- Follow naming convention: PascalCase for components
- Use barrel exports in `index.ts` files

### Performance Optimizations
> **Skill Reference**: Use `react-performance` for React-specific optimizations, `nextjs` for Next.js build optimizations

- Image optimization configured (WebP, AVIF)
- Font preloading in layout
- DNS prefetch for external resources
- Remove console logs in production
- Typed routes enabled for better performance

### Typography System

**Font Pairing**: Space Grotesk + DM Sans

| Font | Role | Weights | Use Cases |
|------|------|---------|-----------|
| **Space Grotesk** | Headings | 300, 500, 600, 700 | Display text, headings, subheadings, labels |
| **DM Sans** | Body | 400, 500, 600 | Body text, paragraphs, UI elements, buttons |

**CSS Variables**:
- `--font-space-grotesk` - Heading font
- `--font-dm-sans` - Body font

**Tailwind Classes**:
- `font-sans` → DM Sans (body text)
- `font-heading` → Space Grotesk (headings)

**Typography Utilities** (in `globals.css`):
- `.text-display` - Hero titles (Space Grotesk + SS03 stylistic alternate)
- `.text-heading` - Section headings (Space Grotesk)
- `.text-subheading` - Subheadings (Space Grotesk)
- `.text-body` - Body text (DM Sans)
- `.text-small` - Small text (DM Sans)
- `.text-micro` - Labels/captions (Space Grotesk, uppercase)

**SS03 Stylistic Alternate**:
Space Grotesk includes SS03 (`font-feature-settings: 'ss03'`) which removes connecting strokes on letters A, M, N, V, W for a more geometric, modern look. This is enabled only on `.text-display` for hero titles.

## Important Notes

### Navigation
- **Responsive heights**: 44-60px depending on screen size (13"-16" laptop optimizations)
  - 13" laptops: 48px normal, 44px scrolled
  - 14" laptops: 52px normal, 48px scrolled
  - 16" laptops: 54-58px normal, 50-54px scrolled
  - Mobile: 60px normal, 54px scrolled
- **Floating effect**: Activates at 50px scroll, lifts to 12px from top with rounded corners
- **Multi-layer glassmorphism**: 5-layer system (base gradient, 80px backdrop blur, shadows, shimmer, liquid glass)
- **Active route highlighting**: Glassmorphic pill background on current page
- **Logo gradient**: Blue accent (180, 210, 240) with theme-aware text using CSS variables

### SEO & Metadata
- Comprehensive metadata in root layout
- OpenGraph and Twitter card support
- Proper robots configuration
- Manifest and favicon setup

### Development Workflow
1. Always check TypeScript errors before committing
2. **Use CSS variables for ALL theme-dependent styling** (never inline `resolvedTheme` conditionals)
3. Use CSS variables rather than hardcoded values
4. Test components in both light and dark themes
5. Ensure accessibility for interactive components
6. Follow the existing project data structure for new portfolio items
7. Consider performance impact of animations and effects
8. Run `npm run build` locally before pushing to verify build succeeds

## Performance & Build Optimization

### ⚠️ Critical Build Performance Issue

**Problem**: Inline theme conditionals cause 45+ minute build timeouts on Vercel

**Symptoms**:
- Local builds taking 10+ minutes (should be <1 minute)
- Vercel deployments timing out at 45 minutes
- Build succeeds on one commit, fails on next with same code
- Error: "Build exceeded maximum duration"

**Root Cause**:
Excessive inline theme conditionals (`resolvedTheme === 'light' ? ... : ...`) across large components (2,000-4,000 lines) overwhelm Next.js 15 build optimizer. The combination of:
1. **Massive component files** (4,000+ lines each)
2. **1,000+ conditional expressions** across codebase
3. **Heavy animation libraries** (Framer Motion with scroll hooks)
4. **Next.js static optimization** attempting to resolve all conditional paths at build time

Results in exponential build complexity that exceeds Vercel's 45-minute timeout on free tier.

### Solution: CSS Variables Architecture

Replace ALL inline theme conditionals with centralized CSS variables defined once in `globals.css`.

**Migration Pattern**:
```tsx
// ❌ BEFORE (Build Killer Pattern)
const { resolvedTheme } = useTheme();

// In component styles - repeated 100+ times per component
color: resolvedTheme === 'light' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'
backgroundColor: resolvedTheme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'
borderColor: resolvedTheme === 'light' ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.10)'

// Helper functions that generate conditionals
const getTextColor = (opacity: number) =>
  resolvedTheme === 'light' ? `rgba(0,0,0,${opacity})` : `rgba(255,255,255,${opacity})`;

// ✅ AFTER (Fast Build Pattern)
// NO useTheme import needed for styling
// NO helper functions needed

// In component styles - uses CSS variables
color: 'var(--text-95)'
backgroundColor: 'var(--glass-05)'
borderColor: 'var(--text-10)'
```

**CSS Variables System** (in `globals.css`):
```css
/* Dark theme (default) */
:root {
  --text-95: rgba(255, 255, 255, 0.95);
  --glass-05: rgba(255, 255, 255, 0.05);
  /* ... 108 variables total */
}

/* Light theme - automatic switching */
[data-theme="light"] {
  --text-95: rgba(0, 0, 0, 0.95);
  --glass-05: rgba(0, 0, 0, 0.05);
  /* ... same variables, inverted colors */
}
```

### Performance Metrics

**Build Time Comparison**:
- **Before refactor**: 45+ minutes (timeout/failure)
- **After refactor**: 18.5 seconds ✅
- **Improvement**: 99.3% faster

**Components Refactored** (534 conditionals eliminated):
1. `LatentSpaceSpeculative.tsx` - 4,142 lines, 167 conditionals removed
2. `AboutSectionV2.tsx` - 2,419 lines, 213 conditionals removed
3. `LatentSpaceWork.tsx` - 3,216 lines, 32 conditionals removed
4. `AboutSection.tsx` - 2,049 lines, 99 conditionals removed
5. `AirIndiaWork.tsx` - 4 conditionals removed
6. `MetamorphicFractalWork.tsx` - 19 conditionals removed

### CSS Variable Usage Guide

**When to use each type**:

**`--text-{opacity}`** - For foreground elements:
- `color` property
- `borderColor` property
- `stroke` in SVGs
- Text shadows
- Any element where you need the "opposite" of background

**`--glass-{opacity}`** - For background elements:
- `backgroundColor` property
- `background` property
- `fill` in SVGs
- Box shadows (background color)
- Surface overlays

**Available opacity values**:
`100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 18, 15, 12, 10, 08, 06, 05, 04, 03, 02, 01`

**Mapping guide**:
```tsx
// If you were using:
rgba(0,0,0,0.95) or rgba(255,255,255,0.95) → var(--text-95)
rgba(0,0,0,0.80) or rgba(255,255,255,0.80) → var(--text-80)
rgba(0,0,0,0.60) or rgba(255,255,255,0.60) → var(--text-60)
rgba(0,0,0,0.05) or rgba(255,255,255,0.05) → var(--glass-05)
rgba(0,0,0,0.10) or rgba(255,255,255,0.10) → var(--glass-10)
```

### Refactoring Checklist

When refactoring components with theme conditionals:

1. **Remove theme imports**:
   - Remove `import { useTheme } from 'next-themes'` if unused elsewhere
   - Remove `const { resolvedTheme } = useTheme()`
   - Remove any theme helper functions (`getTextColor`, `getSurfaceColor`, etc.)

2. **Replace conditionals**:
   - Find all instances of `resolvedTheme === 'light' ? ... : ...`
   - Identify the opacity value in the rgba
   - Replace with appropriate `var(--text-XX)` or `var(--glass-XX)`

3. **Quote CSS variables**:
   - In JSX props: `color={'var(--text-95)'}`
   - In inline styles: `color: 'var(--text-95)'`
   - In template literals: `` color: `var(--text-95)` ``

4. **Test**:
   - Run `npm run type-check` (should pass)
   - Run `npm run build` (should complete in <1 minute)
   - Test theme switching in browser (both modes should work)

### Exception: Dynamic Brand Colors

Keep `useTheme` ONLY when you need dynamic colors that can't be CSS variables:

```tsx
// ✅ Acceptable use of useTheme - dynamic project brand colors
const getProjectColor = (projectId: string, opacity: number) => {
  const brandColors = { airIndia: '#DA0E29', psoriassist: '#10B981' };
  const color = brandColors[projectId];
  return resolvedTheme === 'light'
    ? `rgba(${hexToRgb(color)}, ${opacity})`
    : `rgba(${hexToRgb(color)}, ${opacity})`;
};
```

**Rule**: If the color value is computed at runtime from data (project colors, user preferences, API responses), you can use theme conditionals. If it's a static UI color, use CSS variables.

### Benefits

**Build Performance**:
- ✅ 99.3% faster builds (18.5s vs 45+ min)
- ✅ Works on Vercel free tier
- ✅ Eliminates build timeouts
- ✅ Consistent build times regardless of component size

**Runtime Performance**:
- ✅ No JavaScript theme calculations
- ✅ Smaller bundle size (less code)
- ✅ Instant theme switching (CSS only)
- ✅ Better browser caching

**Maintainability**:
- ✅ Single source of truth for theme colors (globals.css)
- ✅ Easier to update theme colors globally
- ✅ Cleaner component code (no helper functions)
- ✅ Type-safe with CSS variable autocomplete

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

### Navigation Floating Effect
**Scroll-Based Transformation Implementation:**
- **Scroll threshold**: 50px - provides immediate feedback without being too sensitive
- **Floating effect**: Navigation lifts 12px from top, narrows by 48px, adds 16px border radius
- **Glassmorphism enhancement**: 20px → 80px blur, 120% → 200% saturation when scrolled
- **Max width when floating**: `clamp(1200px, 90vw, 1400px)` for breathing room on wide screens
- **Critical**: Always use `pointerEvents: 'auto'` - navigation must be clickable at all times
- **Performance**: Passive event listeners (`{ passive: true }`) for 60fps scroll performance

### Responsive Navigation Heights
**Screen-Size-Specific Height Adjustments:**

The navigation dynamically adjusts its height based on screen size and scroll state for optimal spacing:

```typescript
// Height configurations (normal / scrolled)
13" vertical constraint (height ≤ 850px): 48px / 44px
13" laptops (1280-1439px width):          48px / 44px
14" laptops (1440-1679px width):          52px / 48px
16" scaled (1536-1727px width):           54px / 50px
16" native (1728-2879px width):           58px / 54px
15" laptops (1920-2559px width):          56px / 52px
Mobile & default:                         60px / 54px
```

**Why responsive heights?**
- Larger screens have more vertical space → taller navigation improves visual balance
- Smaller screens benefit from compact navigation → maximizes content area
- Scrolled state always slightly shorter → subtle feedback that page has scrolled

**Implementation:**
- Uses `window.innerWidth` and `window.innerHeight` detection
- Updates on resize with passive listeners
- Constants defined at component level for maintainability

### CSS Specificity Issues
**When Tailwind Classes Don't Work:**
- CSS-in-JS and component styles can override Tailwind
- **Solution**: Use inline styles for critical positioning elements
- **Example**: Hero section requires inline styles to override `.portfolio-container` CSS

## Common Build Issues & Solutions

### Theme Conditional Build Timeout

**Issue**: Build times out after 45 minutes on Vercel or takes 10+ minutes locally

**Symptoms**:
- Error: "Build exceeded maximum duration"
- Build hangs during "Creating an optimized production build..."
- Works on commit A (55s), fails on commit B (45+ min timeout)
- TypeScript check passes but build fails

**Cause**:
Inline theme conditionals (`resolvedTheme === 'light' ? ... : ...`) across large components create exponential build complexity. Next.js 15 build optimizer attempts to statically analyze all conditional paths, overwhelming the build process.

**Solution**:
Replace ALL inline theme conditionals with CSS variables:

```tsx
// ❌ Remove this pattern
color: resolvedTheme === 'light' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'

// ✅ Replace with this
color: 'var(--text-95)'
```

**Prevention**:
- Never use `resolvedTheme === 'light' ? ... : ...` for styling
- Always use CSS variables from `globals.css`
- Keep `useTheme` only for dynamic runtime logic (not styling)
- Run `npm run build` locally before pushing (should complete in <1 min)

**See**: [Performance & Build Optimization](#performance--build-optimization) section for complete refactoring guide.

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
> **Skill Reference**: Use `framer-motion-animator` for scroll-driven animations

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
> **Skill Reference**: Use `accessibility` skill for iOS accessibility patterns

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

### Case Study Pages
1. **Air India** - System design for airline operations
2. **Latent Space** - Immersive narrative experience with speculative design
3. **Metamorphic Fractal Reflections** - Generative art exhibition
4. **Mythos** - Gaming platform with clean architecture
5. **PsoriAssist** - AI-powered health management with iOS prototypes

### GPGPU Pattern Particle System (Hero Page)
> **Skill Reference**: Use `threejs` skill for Three.js, WebGL, shaders, and particle system modifications

**GPU-accelerated dual-layer particle system** - Instant visual impact on page load

#### Architecture Overview

**Dual-Layer System**:
1. **Layer 1 (z-index: 2)**: White star particles - Subtle background tunnel with zoom scroll
2. **Layer 2 (z-index: 3)**: GPGPU pattern particles - Interactive foreground formations

**Key Design Decision - Direct Ring Formation**:
- **No intro animation**: Particles start directly in ring formation around hero text
- **Instant visual impact**: Ring appears immediately on page load (no chaos/convergence phases)
- **Why**: Provides immediate professional impression without forcing users to wait for animation

#### GPGPUPatternParticles.tsx - Core Particle System

**Initialization**:
- Particles initialize in circular ring around hero text (radius: 51-59 units, depth: Z=-150)
- Initial velocity: Gentle orbital motion for subtle movement
- Adaptive particle count: 5,000 (mobile) to 25,000 (high-end desktop)

**Pattern Morphing** (scroll-reactive):
```typescript
// Scroll ranges for pattern transitions
0-25%:  Pattern.CLOUD  - Ring formation (initial state)
25-40%: Pattern.SPHERE - Fibonacci sphere distribution
40-60%: Pattern.TORUS  - Donut shape with major/minor radius
60-80%: Pattern.HELIX  - Spiral formation
80-100%: Pattern.CLOUD - Return to ring
```

**Forces & Movement**:
1. **Flow field**: Simplex noise-based 3D force (optimized: every 3rd particle)
2. **Pattern attraction**: Particles morph toward scroll-defined pattern (0.02 strength)
3. **Mouse attraction**: Interactive force within 150-unit radius (0.03 strength)
4. **Damping**: 0.97 velocity damping for smooth, fluid motion
5. **Particle recycling**: Infinite tunnel effect (particles reset when behind/ahead of camera)

**Visual Effects**:
- **Velocity-based colors**: Blue (slow) → Purple (medium) → Pink (fast)
- **Bloom effect**: Static 0.4 intensity with additive blending
- **Depth attenuation**: Size and opacity reduce with distance
- **Lifetime pulsing**: Gentle sine wave brightness variation

**Performance Optimizations**:
- Adaptive particle counts based on device (mobile/desktop/DPI)
- Responsive particle sizing (0.85-1.8 scale)
- Flow field calculated for every 3rd particle only
- `frustumCulled={false}` for consistent performance
- Reduced motion support (`prefers-reduced-motion: reduce`)

#### HeroParticleSystem.tsx - Dual-Layer Wrapper

**White Star Particles** (Layer 1):
- Fibonacci sphere distribution for even coverage
- Extended depth tunnel (-450 units) for parallax
- Scroll-driven zoom: Camera accelerates from 1x → 3x speed
- Mouse parallax: Subtle 3-unit offset (disabled on touch devices)
- White color (`#FFFFFF`) for star-like appearance
- 35% opacity to maintain subtlety

**Integration**:
- `userScrolled` prop: Tracks when user has scrolled >50px (future use)
- Fixed positioning with `pointer-events: none`
- Separate Canvas instances for isolation and performance

#### Shader System (src/shaders/gpgpu/index.ts)

**Vertex Shader** (44 lines):
- Size attenuation: `180.0 / max(vDepth, 75.0)` for depth-based sizing
- Speed-based size boost: `0.8 + vSpeed * 0.4` (energetic particles larger)
- Pulse effect: Sine wave modulation with randomSeed offset
- Point size clamped: 0.5-5.0 pixels for consistency

**Fragment Shader** (98 lines):
- Circular particle shape with radial gradient
- Velocity-based color mixing: 3-color gradient (blue/purple/pink)
- Outer glow: `exp(-dist * 4.0) * 0.4` for luminosity
- Alpha blending: Lifetime fade + depth fade for smooth appearance

#### Critical Implementation Notes

**No Phase Management**:
- Previous versions had 3-phase intro (CHAOS → CONVERGE → SCROLL)
- **Current**: Simplified to direct ring initialization
- **Removed**: `IntroPhase` enum, phase state, convergence/chaos forces, helper functions
- **Result**: ~150 lines removed, instant visual impact

**Camera Movement**:
- Continuous zoom throughout page (0 → 900 units)
- Accelerating speed: `1 + scrollProgress * 2`
- Smooth easing: 0.08 for Z-axis, 0.05 for X/Y parallax

**Pattern Calculations** (camera-relative):
- All pattern positions calculated relative to `camera.position.z`
- Ensures patterns stay in view during zoom scroll
- Ring initialization at Z=-150 (hero text depth)

**Common Issues**:
1. **White ball moving on load**: Fixed by initializing in ring formation (not tight cluster)
2. **Runtime errors with `introPhase`**: Ensure all phase references removed (particle recycling, bloom intensity)
3. **Performance on mobile**: Reduce particle count, disable mouse parallax on touch devices

## Key Navigation Routes
- `/` - Hero page with 3D scene and conversation starters
- `/work` - Portfolio grid with filtering
- `/work/[project]` - Individual case studies
- `/journey` - Timeline of professional journey
- `/about` - About page with knowledge graph
- `/contact` - Contact chat interface

## SEO Configuration

### Implemented
- **robots.txt**: `public/robots.txt` - Crawler guidance and sitemap reference
- **sitemap.xml**: `src/app/sitemap.ts` - Dynamic sitemap with all pages
- **JSON-LD schemas**: Person and WebSite structured data in layout.tsx
- **metadataBase**: Set to `https://knihar.io` for proper URL resolution
- **Page metadata**: All case study pages have proper title/description/OpenGraph

### TODO: OpenGraph Image
Create a branded OG image for better social media previews:
1. Create `public/og-image.jpg` (1200x630px)
2. Update `src/app/layout.tsx` openGraph config:
   ```ts
   openGraph: {
     images: [{
       url: '/og-image.jpg',
       width: 1200,
       height: 630,
       alt: 'Krishna Nihar - Product & New Media Designer'
     }]
   }
   ```
3. Test with https://www.opengraph.xyz/

### Verification
After deployment, verify SEO setup:
- Sitemap: `knihar.io/sitemap.xml`
- Robots: `knihar.io/robots.txt`
- Rich Results: https://search.google.com/test/rich-results
- Submit sitemap to Google Search Console

## Agent Skills & MCP Usage Guide

### When to Use Specific Skills

| Task | Primary Skill | Secondary Skills |
|------|---------------|------------------|
| Creating new pages/routes | `nextjs` | `react-19`, `typescript` |
| Building UI components | `react-19` | `tailwind4-expert`, `accessibility` |
| Responsive layouts | `tailwind-responsive-design` | `tailwind4-expert` |
| Animation work | `framer-motion-animator` | `react-performance` |
| Particle system / 3D | `threejs` | - |
| Performance optimization | `react-performance` | `nextjs` |
| Type safety improvements | `typescript` | - |
| Accessibility audit | `accessibility` | - |

### MCP Server Usage

**context7** - Use for up-to-date documentation:
```
Query context7 when:
- Next.js 15 App Router patterns are unclear
- Framer Motion API has changed
- Three.js/React Three Fiber syntax needed
- Tailwind CSS 4 new features
```

**figma-dev-mode-mcp-server** - Use for design implementation:
```
Use when:
- Converting Figma designs to React components
- Extracting design tokens (colors, spacing, typography)
- Getting screenshot references for components
```

**chrome-devtools** - Use for debugging:
```
Use when:
- Testing responsive layouts in browser
- Debugging console errors
- Performance profiling
- Taking screenshots for documentation
```

### Skill Interaction with Project Conventions

Skills provide general best practices, but **this CLAUDE.md takes precedence** for project-specific patterns:

| Topic | Skill Says | This Project Says | **Follow** |
|-------|------------|-------------------|------------|
| Theme styling | Use CSS-in-JS / Tailwind | Use CSS variables (`--text-XX`, `--glass-XX`) | **CLAUDE.md** |
| Fonts | System fonts | Space Grotesk + DM Sans | **CLAUDE.md** |
| Navigation | Generic patterns | PortfolioNavigation with specific heights | **CLAUDE.md** |
| Build optimization | General tips | NO inline theme conditionals | **CLAUDE.md** |

### Managing Skills

```bash
# List all installed skills
ls -la .agents/skills/

# Search for new skills
npx skills search <keyword>

# Install a new skill
npx skills add <owner/repo@skill> --yes

# Skills are automatically loaded by compatible agents
# No manual activation needed
```

### Skills Directory Structure

```
.agents/
└── skills/
    ├── nextjs/              # Next.js 15 App Router patterns
    ├── react-19/            # React 19 features (use, actions, etc.)
    ├── react-performance/   # React optimization techniques
    ├── tailwind4-expert/    # Tailwind CSS 4 syntax & features
    ├── tailwind-responsive-design/  # Responsive design patterns
    ├── threejs/             # Three.js & WebGL patterns
    ├── framer-motion-animator/  # Framer Motion animations
    ├── typescript/          # TypeScript strict patterns
    └── accessibility/       # WCAG & a11y best practices
```