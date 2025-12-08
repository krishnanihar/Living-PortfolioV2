# CSS Variables Quick Reference

## Text Colors (Foreground)
Use `var(--text-{opacity})` for text, borders, strokes

```css
var(--text-100)  /* Maximum opacity (near opaque) */
var(--text-95)   /* Primary text */
var(--text-80)   /* Secondary text */
var(--text-60)   /* Tertiary text */
var(--text-30)   /* Muted text */
var(--text-10)   /* Very faint text */
```

## Glass Colors (Background/Surface)
Use `var(--glass-{opacity})` for backgrounds, surfaces

```css
var(--glass-15)  /* Dark surfaces (cards, containers) */
var(--glass-10)  /* Medium surfaces */
var(--glass-08)  /* Light surfaces */
var(--glass-05)  /* Very light surfaces */
var(--glass-03)  /* Barely visible surfaces */
```

## Semantic Colors
```css
var(--text-primary)      /* Main text color */
var(--text-secondary)    /* Secondary text */
var(--text-tertiary)     /* Tertiary text */
var(--text-muted)        /* Disabled/muted text */
var(--surface-primary)   /* Main surface */
var(--surface-secondary) /* Secondary surface */
var(--surface-hover)     /* Hover state */
var(--surface-active)    /* Active state */
var(--border-primary)    /* Main border */
var(--border-secondary)  /* Secondary border */
var(--border-hover)      /* Hover border */
var(--border-focus)      /* Focus border */
```

## Brand Colors
```css
/* Primary red */
#DA0E29

/* OLED black */
#0A0A0A
```

## Tailwind Classes
```
font-sans      // DM Sans (body)
font-heading   // Space Grotesk (headings)
text-display   // Hero titles (with SS03 stylistic alternate)
text-heading   // Section headings
text-subheading // Subheadings
text-body      // Body text
text-small     // Small text
text-micro     // Labels (uppercase)
```

## Responsive Clamp Examples

### Typography
```css
/* Hero heading */
clamp(2.25rem, 4.5vw, 3.5rem)

/* Main statement */
clamp(1.0625rem, 2.25vw, 1.375rem)

/* Section heading */
clamp(1.5rem, 3vw, 2rem)

/* Body text */
clamp(0.875rem, 1.5vw, 1rem)
```

### Spacing
```css
/* Padding */
clamp(1.75rem, 3vw, 2.5rem)

/* Gap */
clamp(0.75rem, 1.5vw, 1rem)

/* Margin */
clamp(2rem, 4vw, 3rem)
```

### Layout
```css
/* Navigation width */
clamp(1200px, 90vw, 1400px)

/* Hero card width */
clamp(640px, 85vw, 720px)

/* Container max width */
clamp(1200px, 95vw, 1600px)
```

## Common Component Patterns

### Card with Glass Effect
```tsx
<div
  style={{
    backgroundColor: 'var(--glass-05)',
    borderColor: 'var(--border-primary)',
    color: 'var(--text-95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
  }}
  className="border"
>
  {/* Content */}
</div>
```

### Button Variants
```tsx
// Primary button
<button
  style={{
    backgroundColor: '#DA0E29',
    color: '#FFFFFF',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
  }}
  className="font-sans font-medium"
>
  Click me
</button>

// Secondary button
<button
  style={{
    backgroundColor: 'var(--glass-10)',
    color: 'var(--text-95)',
    borderColor: 'var(--border-primary)',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    border: '1px solid',
  }}
  className="font-sans font-medium"
>
  Click me
</button>
```

### Heading Hierarchy
```tsx
// Display heading (hero)
<h1 className="text-display" style={{ color: 'var(--text-95)' }}>
  Portfolio
</h1>

// Section heading
<h2 className="text-heading" style={{ color: 'var(--text-95)' }}>
  Featured Work
</h2>

// Subheading
<h3 className="text-subheading" style={{ color: 'var(--text-80)' }}>
  Recent Projects
</h3>

// Body text
<p className="text-body" style={{ color: 'var(--text-70)' }}>
  Description text
</p>
```

### Surface Hierarchy
```tsx
// Background (darkest)
style={{ backgroundColor: '#0A0A0A' }}

// Primary surface
style={{ backgroundColor: 'var(--glass-15)' }}

// Secondary surface
style={{ backgroundColor: 'var(--glass-08)' }}

// Tertiary surface
style={{ backgroundColor: 'var(--glass-05)' }}

// Subtle surface
style={{ backgroundColor: 'var(--glass-03)' }}
```

## Navigation Heights by Screen Size

```tsx
// 13" vertical constraint (height ≤ 850px)
48px normal, 44px scrolled

// 13" laptops (1280-1439px)
48px normal, 44px scrolled

// 14" laptops (1440-1679px)
52px normal, 48px scrolled

// 16" scaled (1536-1727px)
54px normal, 50px scrolled

// 16" native (1728-2879px)
58px normal, 54px scrolled

// 15" laptops (1920-2559px)
56px normal, 52px scrolled

// Mobile & default
60px normal, 54px scrolled
```

## Opacity Mapping Guide

When migrating from inline conditionals to CSS variables:

```tsx
// rgba(X, X, X, 0.95) → var(--text-95)
// rgba(X, X, X, 0.80) → var(--text-80)
// rgba(X, X, X, 0.60) → var(--text-60)
// rgba(X, X, X, 0.30) → var(--text-30)
// rgba(X, X, X, 0.10) → var(--text-10)
// rgba(X, X, X, 0.05) → var(--glass-05)
```

## Animation & Interaction Patterns

### Hover transitions
```tsx
style={{
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}}

// On hover
onMouseEnter={() => {
  // Increase surface opacity
  setBackgroundColor('var(--glass-10)');
}}
```

### Scroll reveal
```tsx
// Use intersection observer
const [isVisible, setIsVisible] = useState(false);

style={{
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  transition: 'opacity 0.6s ease, transform 0.6s ease',
}}
```

### Magnetic effect
```tsx
// Mouse follow
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

style={{
  transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}}
```
