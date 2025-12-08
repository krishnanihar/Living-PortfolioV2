---
name: glassmorphism-design
description: Build production-grade frontend interfaces using the project's advanced CSS variable system with glassmorphism, OLED black background, opacity-based surfaces, and typography system. Use when creating components, pages, building UI, or designing interfaces.
---

# Glassmorphism Design System

This Skill implements a sophisticated design system with CSS variables, glassmorphism effects, and iOS-inspired aesthetics.

## Design System Overview

### CSS Variables Architecture (108 theme-aware variables)

**Text opacity scale** (`--text-{opacity}`):
- Use for: `color`, `borderColor`, text-related properties
- Available opacities: 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 18, 15, 12, 10, 08, 06, 05, 04, 03, 02, 01
- Example: `color: 'var(--text-95)'` (95% opacity text)
- Auto-switches based on theme: Dark mode = white with opacity, Light mode = black with opacity

**Glass surface scale** (`--glass-{opacity}`):
- Use for: `backgroundColor`, `background`, surface-related properties
- Same opacity scale as text
- Example: `backgroundColor: 'var(--glass-05)'` (5% opacity surface)
- Creates sophisticated transparency layers

**Semantic colors**:
- `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-muted`
- `--surface-primary`, `--surface-secondary`, `--surface-hover`, `--surface-active`
- `--border-primary`, `--border-secondary`, `--border-hover`, `--border-focus`

### Color System
- **Base**: OLED black canvas (`#0A0A0A`) as primary background
- **Accent**: Brand red (`#DA0E29`) for primary actions
- **Surfaces**: Opacity-based hierarchy (4-6% opacity for surfaces)
- **All colors automatically adapt via CSS variables** (no JavaScript theme conditionals)

### Typography System

Font pairing: Space Grotesk (headings) + DM Sans (body)

| Font | Role | Weights | Use Cases |
|------|------|---------|-----------|
| **Space Grotesk** | Headings | 300, 500, 600, 700 | Display text, headings, subheadings, labels |
| **DM Sans** | Body | 400, 500, 600 | Body text, paragraphs, UI elements, buttons |

**Tailwind classes**:
- `font-sans` → DM Sans (body text)
- `font-heading` → Space Grotesk (headings)

**Typography utilities** (from globals.css):
- `.text-display` - Hero titles (Space Grotesk + SS03 stylistic alternate)
- `.text-heading` - Section headings (Space Grotesk)
- `.text-subheading` - Subheadings (Space Grotesk)
- `.text-body` - Body text (DM Sans)
- `.text-small` - Small text (DM Sans)
- `.text-micro` - Labels/captions (Space Grotesk, uppercase)

### Navigation Component Architecture

The navigation system is highly optimized for responsive displays:

**Responsive Heights** (normal / scrolled):
- 13" vertical constraint: 48px / 44px
- 13" laptops: 48px / 44px
- 14" laptops: 52px / 48px
- 16" scaled: 54px / 50px
- 16" native: 58px / 54px
- 15" laptops: 56px / 52px
- Mobile & default: 60px / 54px

**Floating effect** (activates at 50px scroll):
- Lifts to 12px from top
- Narrows by 48px
- Adds 16px border radius
- Glassmorphism enhancement: 20px → 80px blur, 120% → 200% saturation
- Max width: `clamp(1200px, 90vw, 1400px)`

**Features**:
- Multi-layer glassmorphism (5-layer system)
- Active route highlighting with glassmorphic pill
- Logo gradient with theme-aware text
- Full keyboard accessibility

## Critical Rules - Build Performance

**⚠️ NEVER use inline theme conditionals:**
```tsx
// ❌ WRONG - Causes 45+ minute build timeouts
color: resolvedTheme === 'light' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'

// ✅ CORRECT - Instant builds
color: 'var(--text-95)'
```

**Migration Pattern**:
1. Remove `import { useTheme } from 'next-themes'` if only used for styling
2. Replace ALL inline conditionals with CSS variables
3. Use `useTheme` ONLY for dynamic runtime logic (not styling)

**Example refactoring**:
```tsx
// ❌ BEFORE
const { resolvedTheme } = useTheme();
const textColor = resolvedTheme === 'light' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)';
return <div style={{ color: textColor }}>Text</div>;

// ✅ AFTER - No useTheme import needed for styling
return <div style={{ color: 'var(--text-95)' }}>Text</div>;
```

## Component Styling Examples

### Creating a card component
```tsx
export function Card({ children, variant = 'primary' }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--glass-05)',
        borderColor: 'var(--border-primary)',
        color: 'var(--text-95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '1.5rem',
      }}
      className="border"
    >
      {children}
    </div>
  );
}
```

### Creating a button
```tsx
export function Button({ children, variant = 'primary' }: ButtonProps) {
  return (
    <button
      style={{
        backgroundColor: variant === 'primary' ? '#DA0E29' : 'var(--glass-10)',
        color: variant === 'primary' ? '#FFFFFF' : 'var(--text-95)',
        borderColor: 'var(--border-primary)',
        padding: '0.75rem 1.5rem',
        borderRadius: '12px',
        border: `1px solid`,
        transition: 'all 0.3s ease',
      }}
      className="font-sans font-medium"
    >
      {children}
    </button>
  );
}
```

### Creating surface hierarchies
```tsx
// Primary surface (darkest)
backgroundColor: 'var(--glass-15)'

// Secondary surface (lighter)
backgroundColor: 'var(--glass-08)'

// Tertiary surface (lightest)
backgroundColor: 'var(--glass-03)'

// Hover states
onMouseEnter={() => setHoverState('var(--glass-10)')}
```

## Micro-Interactions & Advanced Features

**Magnetic hover effects**:
- Device capability detection (touch/hover/high DPI)
- Performance monitoring
- Custom cursor with state-aware interactions
- Scroll reveal animations with intersection observers

**Particle systems**:
- GPGPU Pattern Particles (hero page)
- Consciousness Particles (narrative)
- Scroll-driven animations
- Reduced motion support

## Project Structure Notes

**Component organization**:
- `/src/components/ui/` - Reusable UI components
- `/src/components/sections/` - Page sections
- `/src/components/effects/` - Theme and effects
- `/src/lib/` - Animation and interaction utilities

**Always verify**:
- Run `npm run type-check` before committing
- Run `npm run build` locally (should complete in <1 minute)
- Test in both light and dark themes
- No inline `resolvedTheme` conditionals in styles

## Performance & Build Optimization

Build performance impact of inline conditionals:
- **Before refactor**: 45+ minutes (timeout)
- **After refactor**: 18.5 seconds
- **Improvement**: 99.3% faster

Always use CSS variables for consistent, fast builds.

## Common Patterns

### Responsive spacing
```tsx
style={{
  padding: 'clamp(1.75rem, 3vw, 2.5rem)',
  gap: 'clamp(0.75rem, 1.5vw, 1rem)',
}}
```

### Responsive typography
```tsx
style={{
  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', // Hero heading
  fontSize: 'clamp(1.0625rem, 2.25vw, 1.375rem)', // Main statement
}}
```

### Transform combinations (critical)
```tsx
// ✅ CORRECT - All transforms in single property
style={{
  transform: 'translate(-50%, -50%) rotateX(5deg) rotateY(5deg)',
}}

// ❌ WRONG - Separate transforms don't combine
style={{
  transform: 'translate(-50%, -50%)',
  // ... later ...
  transform: 'rotateX(5deg)',
}}
```

## When to Use This Skill

Claude will automatically use this Skill when you:
- Ask to build web components or pages
- Request UI design improvements
- Need styling guidance following the design system
- Want to ensure glassmorphism consistency
- Work on responsive design
- Create new interfaces or pages

## Resources

- **Design tokens**: `src/app/globals.css` (108 CSS variables)
- **Components**: `src/components/ui/` (reusable component library)
- **Utilities**: `src/lib/animations.ts`, `src/lib/micro-interactions.ts`
- **Full documentation**: `CLAUDE.md` in project root
