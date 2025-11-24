# New Portfolio Website - Gemini 3 + Incremental Build Plan

**Project:** Fresh portfolio rebuild using Gemini 3 for UI design
**Start Date:** January 2025
**Target:** 10-day incremental build & deploy
**Philosophy:** Design in Gemini 3 → Code together → Deploy immediately

---

## 🎯 Project Vision

### The Problem We're Solving
- Current portfolio: 53,000+ lines, 45+ minute build times on Vercel
- Massive component files (4,000+ lines each) causing build timeouts
- Technical debt from rapid iteration

### The Solution
- **Start fresh** with clean architecture
- **Gemini 3 for design**: Generate beautiful UI designs using AI
- **Incremental deployment**: Ship pages as we build them
- **Keep it lean**: Max 500 lines per component
- **Modern stack**: Next.js 15, TypeScript, Tailwind CSS
- **Better platform**: Cloudflare Pages (faster builds, better free tier)

### Success Metrics
- ✅ Build time <5 minutes per deploy
- ✅ PageSpeed score >95
- ✅ Zero build timeouts
- ✅ All case studies showcased
- ✅ Mobile-first responsive design

---

## 🛠️ Technical Architecture

### Tech Stack

**Framework & Language**
```
- Next.js 15.5+ (App Router)
- TypeScript 5.9+ (strict mode)
- React 19+
```

**Styling & UI**
```
- Tailwind CSS 4.0+ (utility-first)
- Radix UI (accessible primitives)
- Framer Motion (animations, but sparingly)
- Lucide Icons
```

**Deployment & Hosting**
```
- Cloudflare Pages (primary)
- Custom domain: [your-domain.com]
- Auto-deploy from main branch
```

**Development Tools**
```
- ESLint + Prettier
- TypeScript strict mode
- Git conventional commits
- VS Code + recommended extensions
```

### Project Structure
```
portfolio-v3/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── work/
│   │   │   ├── page.tsx       # Work overview
│   │   │   ├── air-india/
│   │   │   ├── mythos/
│   │   │   ├── latent-space/
│   │   │   └── psoriassist/
│   │   ├── about/page.tsx
│   │   ├── journey/page.tsx
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── sections/          # Page sections (max 500 lines each)
│   │   └── layout/            # Layout components
│   ├── lib/
│   │   ├── utils.ts          # Utility functions
│   │   └── constants.ts      # Constants & config
│   ├── data/
│   │   └── projects.ts       # Project metadata
│   └── styles/
│       └── globals.css       # Global styles + Tailwind
├── public/
│   ├── images/
│   ├── projects/
│   └── favicon.ico
├── .github/
│   └── workflows/            # CI/CD (optional)
└── package.json
```

### Component Architecture Rules

**Maximum Complexity Limits**
- ❌ No component >500 lines
- ❌ No single file >1,000 lines
- ✅ Break into smaller modules
- ✅ Use composition over complexity

**Example: Case Study Page**
```tsx
// ❌ BAD: 4,000-line monolith
export default function PsoriAssistPage() {
  // 4,000 lines of everything
}

// ✅ GOOD: Composed from smaller pieces
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Solution } from './sections/Solution'
import { Impact } from './sections/Impact'

export default function PsoriAssistPage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Impact />
    </>
  )
}
```

---

## 📅 Incremental Build Plan

### Phase 1: Foundation (Day 1) - DEPLOY IMMEDIATELY
**Goal:** Live portfolio with home page

**Tasks:**
1. Create new repo: `portfolio-v3`
2. Initialize Next.js 15 + TypeScript
3. Configure Tailwind CSS 4.0
4. Setup Cloudflare Pages deployment

**Gemini 3 Design:**
- Prompt: "Design a modern portfolio home page with hero section, 3 featured projects grid, and minimalist footer"
- Export design as reference

**Implementation:**
- Home page (`/`)
  - Hero section with name, role, CTA
  - Featured projects (Air India, Mythos, Latent Space)
  - Simple navigation
  - Footer with links

**Deploy:**
- Push to GitHub
- Cloudflare Pages auto-deploy
- **Goal: Live site in <24 hours**

---

### Phase 2: Work Overview (Day 2)
**Goal:** Portfolio grid page

**Gemini 3 Design:**
- Prompt: "Design a portfolio work page with filterable project grid, category tabs, and project cards with hover states"

**Implementation:**
- Work overview page (`/work`)
  - Filter tabs (All, System, Mobile, Research, Web)
  - Project cards grid
  - Smooth transitions

**Deploy:** Immediate

---

### Phase 3: Case Study #1 - Air India (Day 3)
**Goal:** First full case study

**Gemini 3 Design:**
- Prompt: "Design a case study page for Air India design system work, include hero, problem statement, solution showcase, and impact metrics"

**Implementation:**
- `/work/air-india/page.tsx`
- Sections (each <300 lines):
  - Hero with cover image
  - Problem statement
  - Solution: Pixel Radar, Aviation Analytics, Token Architecture
  - Metrics & impact
  - Next project CTA

**Deploy:** Immediate

---

### Phase 4: Case Study #2 - Mythos (Day 4)
**Gemini 3 Design:**
- Prompt: "Design a case study for an AI art curator app, emphasize AI capabilities and visual exhibitions"

**Implementation:**
- `/work/mythos/page.tsx`
- Gallery-focused design
- AI feature highlights

**Deploy:** Immediate

---

### Phase 5: Case Study #3 - Latent Space (Day 5)
**Gemini 3 Design:**
- Prompt: "Design a speculative design case study about dream technology, use dark, mysterious aesthetics with ethical considerations"

**Implementation:**
- `/work/latent-space/page.tsx`
- Narrative-driven layout
- Design provocations showcase
- **Keep it MUCH simpler than v2 (no 7,325-line monster)**

**Deploy:** Immediate

---

### Phase 6: Case Study #4 - PsoriAssist (Day 6)
**Gemini 3 Design:**
- Prompt: "Design a digital health case study with medical app screenshots, patient journey visualization, and clinical validation metrics"

**Implementation:**
- `/work/psoriassist/page.tsx`
- Health-focused design
- Feature showcase
- **Simpler iOS mockups (not 8 full prototypes)**

**Deploy:** Immediate

---

### Phase 7: Case Study #5 - Metamorphic Fractal (Day 7)
**Gemini 3 Design:**
- Prompt: "Design a generative art exhibition case study, emphasize visual art and creative coding"

**Implementation:**
- `/work/metamorphic-fractal-reflections/page.tsx`
- Art-focused layout
- Exhibition showcase

**Deploy:** Immediate

---

### Phase 8: About Page (Day 8)
**Gemini 3 Design:**
- Prompt: "Design an about page for a product designer, include photo, skills, experience, and personal story"

**Implementation:**
- `/about/page.tsx`
- Bio section
- Skills & expertise
- Design philosophy

**Deploy:** Immediate

---

### Phase 9: Journey Timeline (Day 9)
**Gemini 3 Design:**
- Prompt: "Design a professional journey timeline with companies, roles, and key achievements"

**Implementation:**
- `/journey/page.tsx`
- Interactive timeline
- Milestone highlights

**Deploy:** Immediate

---

### Phase 10: Contact & Polish (Day 10)
**Gemini 3 Design:**
- Prompt: "Design a contact page with email form, social links, and availability status"

**Implementation:**
- `/contact/page.tsx`
- Contact form (with Formspree/similar)
- Social links
- Availability indicator

**Final Polish:**
- SEO metadata
- Open Graph images
- Performance audit
- Mobile responsiveness check
- Accessibility audit

**Deploy:** Final production deployment

---

## 🎨 Gemini 3 Workflow

### Step-by-Step Process

**1. Design Generation**
```
Open Gemini 3 → Start conversation

Prompt template:
"I'm building a portfolio website using Next.js and Tailwind CSS.

Page: [Page name]
Purpose: [What this page achieves]
Style: [Modern, minimalist, glassmorphism, etc.]
Key sections: [List sections]

Generate a detailed UI design with:
- Layout structure
- Color palette
- Typography scale
- Component hierarchy
- Spacing system
- Interactive states

Provide design in descriptive format that a developer can implement."
```

**2. Design Export Options**

**Option A: Text Description**
- Gemini provides detailed component breakdown
- Copy to reference document
- Implement based on description

**Option B: Image Generation**
- Ask Gemini to visualize the design
- Generate mockup image
- Use as visual reference

**Option C: Code Scaffold**
- Ask Gemini for component structure
- Get React/TypeScript boilerplate
- Refine during implementation

**3. Implementation Workflow**

```
For each page:

1. Generate design in Gemini 3
2. Review together in chat
3. Refine design if needed
4. I implement in code
5. You review in browser
6. Iterate 1-2 times
7. Deploy to Cloudflare Pages
8. Move to next page
```

**4. Example Prompts**

**Hero Section:**
```
Design a hero section for a product designer's portfolio.

Include:
- Large heading with name "Nihar Sunkara"
- Subtitle "Product Designer & Researcher"
- Short 2-sentence description
- Two CTA buttons: "View Work" and "Contact"
- Minimalist, glassmorphism aesthetic
- Dark mode optimized (#0A0A0A background)

Provide CSS utility classes and layout structure.
```

**Project Card:**
```
Design a project card component for portfolio grid.

Requirements:
- Thumbnail image (16:9 aspect ratio)
- Project title
- 1-sentence description
- Category tag
- Hover effect with lift animation
- Glassmorphic glass effect
- Click leads to case study

Provide Tailwind CSS classes.
```

---

## 📦 Content Migration Strategy

### What to Keep from Current Site

**✅ Keep (Copy Exact Text):**
- Project descriptions (already well-written)
- Case study content (research, metrics, impact)
- About page bio
- Journey timeline data
- Contact information

**✅ Keep (Reuse Assets):**
- Project cover images
- Case study screenshots
- Logos and icons
- Brand colors

**❌ Don't Keep (Rebuild Fresh):**
- All component code (too complex)
- Animation systems (start simpler)
- Massive prototypes (simplify)
- Heavy dependencies

### Content Extraction Guide

**Step 1: Export Text Content**
```bash
# Copy from current site's data/projects.ts
# Save project descriptions, metrics, tags

# Export case study text from page components
# Save markdown versions of content
```

**Step 2: Export Assets**
```bash
# Copy from current site's public/ folder
cp -r /path/to/old-site/public/images new-site/public/images
cp -r /path/to/old-site/public/projects new-site/public/projects
```

**Step 3: Organize in New Structure**
```
new-site/
├── content/
│   ├── projects/
│   │   ├── air-india.md
│   │   ├── mythos.md
│   │   └── ...
│   └── pages/
│       ├── about.md
│       └── journey.md
└── public/
    └── [assets from old site]
```

---

## 🚀 Deployment & DevOps

### Cloudflare Pages Setup

**Why Cloudflare Pages?**
- ✅ Faster builds than Vercel free tier
- ✅ 500 builds/month (vs Vercel's time limits)
- ✅ Unlimited bandwidth
- ✅ Global CDN
- ✅ Free SSL
- ✅ Git integration

**Setup Steps:**

1. **Create Cloudflare Account**
   - Go to pages.cloudflare.com
   - Sign up (free)

2. **Connect GitHub Repo**
   - Click "Create a project"
   - Connect GitHub
   - Select `portfolio-v3` repo

3. **Configure Build Settings**
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   Environment variables: (add if needed)
   ```

4. **Set Custom Domain**
   - Add custom domain
   - Update DNS records
   - Enable HTTPS

5. **Auto-Deploy on Push**
   - Every push to `main` = auto deploy
   - Preview deployments for PRs

### Performance Optimization

**Build Time Targets:**
- Home page: <2 minutes
- Each case study: <3 minutes
- Full site: <10 minutes total

**Optimization Checklist:**
- [x] Use Next.js Image component
- [x] Lazy load images below fold
- [x] Code split by route
- [x] Minimize JavaScript bundle
- [x] Preload critical fonts
- [x] Optimize images (WebP, AVIF)
- [x] Use static generation where possible
- [x] Minimize CSS bundle

### Monitoring

**PageSpeed Insights:**
- Run after each major deploy
- Target: >95 mobile, >98 desktop

**Lighthouse CI:**
- Optional: Add GitHub Actions
- Auto-audit on every PR

---

## 📊 Timeline & Milestones

### Week 1: Foundation + Core Pages

| Day | Phase | Goal | Deploy |
|-----|-------|------|--------|
| 1 | Setup + Home | Live portfolio with hero | ✅ Deploy |
| 2 | Work Overview | Portfolio grid | ✅ Deploy |
| 3 | Air India | First case study | ✅ Deploy |
| 4 | Mythos | Second case study | ✅ Deploy |
| 5 | Latent Space | Third case study | ✅ Deploy |
| 6 | PsoriAssist | Fourth case study | ✅ Deploy |
| 7 | Metamorphic | Fifth case study | ✅ Deploy |

### Week 2: Polish + Launch

| Day | Phase | Goal | Deploy |
|-----|-------|------|--------|
| 8 | About | Personal page | ✅ Deploy |
| 9 | Journey | Timeline | ✅ Deploy |
| 10 | Contact + Polish | Final touches | 🚀 LAUNCH |

### Post-Launch (Week 3+)

**Optional Enhancements:**
- [ ] Blog/writing section
- [ ] Dark/light theme toggle
- [ ] Search functionality
- [ ] Analytics integration
- [ ] Contact form backend
- [ ] Newsletter signup
- [ ] Case study deep dives

---

## 🎯 Success Criteria

### Technical Success
- ✅ All builds complete in <5 minutes
- ✅ Zero build timeouts
- ✅ PageSpeed >95
- ✅ Mobile-first responsive
- ✅ TypeScript strict mode, zero errors
- ✅ Accessibility score >90

### Content Success
- ✅ All 5 case studies showcased
- ✅ Clear project descriptions
- ✅ Metrics & impact visible
- ✅ Contact information accessible

### Design Success
- ✅ Consistent visual language
- ✅ Smooth animations
- ✅ Professional aesthetic
- ✅ Gemini 3-generated designs implemented

---

## 🔄 Iterative Workflow

### Daily Cycle

**Morning:**
1. Design next page in Gemini 3
2. Review design together
3. Refine if needed

**Afternoon:**
4. I implement the design
5. Commit to GitHub
6. Auto-deploy to Cloudflare Pages

**Evening:**
7. You review live preview
8. We iterate on feedback
9. Finalize and move to next page

### Communication Protocol

**During Build:**
- Share Gemini 3 designs in chat
- I provide implementation updates
- You review live preview URLs
- We iterate in real-time

**Code Reviews:**
- Keep components small (<500 lines)
- Use descriptive commit messages
- Deploy frequently (every page)

---

## 📝 Next Steps

### Immediate Actions (Today)

1. **Create new repository:**
   ```bash
   mkdir portfolio-v3
   cd portfolio-v3
   npx create-next-app@latest . --typescript --tailwind --app
   ```

2. **Initialize with clean structure**
   - Setup folders
   - Configure TypeScript
   - Add Tailwind config
   - Create first components

3. **Connect to Cloudflare Pages**
   - Push to GitHub
   - Link to Cloudflare
   - Configure build settings

4. **Design home page in Gemini 3**
   - Generate hero section
   - Design project cards
   - Create navigation

5. **Implement & deploy**
   - Code home page
   - Push to GitHub
   - **First deploy: Live portfolio!**

---

## 💡 Tips for Success

### Do's ✅
- Keep components small and focused
- Deploy after every page
- Use Gemini 3 for design inspiration
- Iterate quickly
- Celebrate small wins

### Don'ts ❌
- Don't build massive components
- Don't wait to deploy
- Don't over-engineer
- Don't add complexity too early
- Don't skip mobile testing

---

## 🎉 Vision: 10 Days to Launch

**Day 1:** "We have a live portfolio!"
**Day 5:** "Half the case studies are live!"
**Day 10:** "Full portfolio deployed, optimized, and shipped!"

Let's build something amazing together. 🚀

---

**Ready to start?** Reply "yes" and we'll create the new repo and design the home page in Gemini 3!

---

## 🤖 Claude's Role: Prompt Engineer & Code Integrator

### Workflow Definition

**My Responsibilities:**
1. ✅ **Create detailed prompts for Gemini 3**
   - Component specifications
   - Design system constraints
   - Performance requirements
   - Accessibility standards

2. ✅ **Review Gemini's output**
   - Check code quality
   - Verify best practices
   - Ensure theme consistency
   - Validate performance

3. ✅ **Integrate & optimize**
   - Add TypeScript types
   - Implement responsive design
   - Optimize for performance
   - Ensure accessibility

4. ✅ **Deploy & monitor**
   - Push to GitHub
   - Verify Cloudflare build
   - Check PageSpeed scores
   - Fix any issues

**Your Responsibilities:**
1. Run prompts in Gemini 3
2. Share generated code/designs
3. Review integrated components
4. Approve before next step

---

## 📝 Gemini 3 Prompt Library

### Universal Prompt Template

```
You are designing components for a modern portfolio website using Next.js 15, TypeScript, and Tailwind CSS 4.

DESIGN SYSTEM CONSTRAINTS:
- Colors: OLED black (#0A0A0A), brand red (#DA0E29), glass surfaces (white 4-6% opacity)
- Typography: Inter font, fluid type scale using clamp()
- Spacing: 4px base unit, consistent rem-based system
- Animation: 60fps, subtle micro-interactions
- Glassmorphism: backdrop-blur-xl, subtle borders, layered depth

TECHNICAL REQUIREMENTS:
- TypeScript strict mode
- Fully responsive (mobile-first)
- WCAG AA accessibility
- <500 lines per component
- Performance-optimized (lazy loading, code splitting)

COMPONENT: [Component Name]
PURPOSE: [What it does]
REQUIREMENTS:
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]

Generate React TypeScript component with:
1. Full type definitions
2. Tailwind CSS classes
3. Responsive breakpoints
4. Accessibility attributes
5. Performance optimizations
```

---

### Prompt 1: Hero Section

```
You are designing a Hero section for a product designer's portfolio.

DESIGN SYSTEM:
- Background: OLED black (#0A0A0A)
- Text: White with opacity hierarchy (100%, 70%, 50%)
- Accent: Brand red (#DA0E29) for CTAs
- Glass effect: backdrop-blur-xl, white 4% opacity
- Font: Inter variable

LAYOUT:
- Centered content, max-width 720px
- Vertical padding: clamp(4rem, 10vh, 8rem)
- Responsive spacing

CONTENT:
- Main heading: "Nihar Sunkara" (clamp(2.5rem, 5vw, 4rem))
- Subtitle: "Product Designer & Researcher" (clamp(1.125rem, 2.5vw, 1.5rem))
- Description: 2 sentences about design philosophy (70% opacity)
- Two CTAs: "View Work" (primary red button) + "Contact" (ghost button)

REQUIREMENTS:
- TypeScript component
- Fully responsive
- Subtle fade-in animation on mount
- Keyboard accessible
- Semantic HTML (header, h1, p)

Generate complete Next.js component with Tailwind CSS.
```

**Expected Output:** React component with proper structure, TypeScript types, responsive design.

---

### Prompt 2: Project Card

```
You are designing a Project Card component for a portfolio grid.

DESIGN SYSTEM:
- Card background: Glass effect (backdrop-blur-xl, white 4% opacity)
- Border: 1px white at 8% opacity
- Hover: Lift effect (translateY(-4px)), border glow
- Image: 16:9 aspect ratio, rounded corners
- Text hierarchy: Title (100%), description (70%), category (50%)

STRUCTURE:
- Thumbnail image (Next.js Image component)
- Category badge (top-right, glassmorphic pill)
- Project title (clamp(1.25rem, 2vw, 1.5rem))
- Short description (1 sentence, 2-line clamp)
- Metrics row (year, role, status)

INTERACTIONS:
- Hover: Card lifts 4px, border brightens
- Click: Navigate to case study
- Focus: Visible outline for keyboard navigation
- Smooth transitions (200ms ease)

REQUIREMENTS:
- TypeScript with proper props interface
- Next.js Link for navigation
- Next.js Image for optimization
- Responsive (stacks on mobile)
- ARIA labels

Generate component + TypeScript interface.
```

---

### Prompt 3: Navigation

```
You are designing a sticky navigation bar for a portfolio website.

DESIGN SYSTEM:
- Height: 56px (desktop), 48px (mobile)
- Background: Glassmorphic (backdrop-blur-xl, black 85% opacity)
- Border bottom: 1px white 8% opacity
- Logo/name: Left-aligned
- Nav links: Right-aligned (desktop), hamburger menu (mobile)
- Active state: Brand red (#DA0E29) underline

NAVIGATION ITEMS:
- Work
- About
- Journey
- Contact

BEHAVIOR:
- Sticky position (top: 0)
- Fade in after scrolling past hero (80vh)
- Smooth scroll to sections
- Mobile: Hamburger menu with slide-in panel
- Active link highlighting based on scroll position

REQUIREMENTS:
- TypeScript
- Framer Motion for animations (optional)
- usePathname for active state
- Keyboard navigation (Tab, Enter)
- Focus visible states

Generate navigation component with mobile menu.
```

---

### Prompt 4: Case Study Hero

```
You are designing a Case Study hero section.

DESIGN SYSTEM:
- Full-width cover image with gradient overlay
- Text overlay: bottom-left positioning
- Glassmorphic metadata cards
- Breadcrumb navigation

CONTENT:
- Breadcrumb: Work / [Project Name]
- Project title (clamp(2rem, 4vw, 3.5rem))
- Company name + year
- Tags (glassmorphic pills)
- Metadata cards: Role, Duration, Team, Status

LAYOUT:
- Cover image: Full viewport width, aspect ratio 21:9
- Dark gradient overlay for text readability
- Content container: max-width 1200px
- Metadata grid: 2x2 on desktop, stack on mobile

REQUIREMENTS:
- Next.js Image with priority loading
- Responsive typography
- Glass effect cards with hover states
- TypeScript props for project data

Generate hero component with data props.
```

---

### Prompt 5: Section Container

```
You are designing a reusable Section container component.

DESIGN SYSTEM:
- Vertical padding: clamp(3rem, 8vw, 6rem)
- Max width: clamp(1200px, 90vw, 1400px)
- Horizontal centering
- Optional background (glass, solid, gradient)

VARIANTS:
- Default: No background
- Glass: Glassmorphic panel with border
- Dark: Darker section for contrast
- Accent: Subtle brand color tint

PROPS:
- children: React.ReactNode
- variant?: 'default' | 'glass' | 'dark' | 'accent'
- className?: string (for custom overrides)
- id?: string (for scroll anchors)

REQUIREMENTS:
- TypeScript with proper prop types
- Responsive padding/width
- Composable (accepts any children)
- Semantic HTML (section or article)

Generate flexible section component.
```

---

## 🎨 Design System Specification

### Color Palette

**Primary Colors**
```css
--color-background: #0A0A0A;        /* OLED black */
--color-brand-primary: #DA0E29;     /* Brand red */
--color-text-primary: #FFFFFF;       /* Pure white */
--color-text-secondary: rgba(255, 255, 255, 0.70);  /* 70% white */
--color-text-tertiary: rgba(255, 255, 255, 0.50);   /* 50% white */
```

**Glass/Surface Colors**
```css
--surface-glass: rgba(255, 255, 255, 0.04);          /* 4% white */
--surface-glass-hover: rgba(255, 255, 255, 0.06);    /* 6% white */
--border-subtle: rgba(255, 255, 255, 0.08);          /* 8% white border */
--border-emphasis: rgba(255, 255, 255, 0.12);        /* 12% white border */
```

**Semantic Colors**
```css
--color-success: #10B981;   /* Green */
--color-warning: #F59E0B;   /* Amber */
--color-error: #EF4444;     /* Red */
--color-info: #3B82F6;      /* Blue */
```

### Typography Scale

**Font Family**
```css
--font-sans: 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Type Scale (Fluid)**
```css
--text-xs: clamp(0.75rem, 1.5vw, 0.875rem);
--text-sm: clamp(0.875rem, 1.75vw, 1rem);
--text-base: clamp(1rem, 2vw, 1.125rem);
--text-lg: clamp(1.125rem, 2.25vw, 1.25rem);
--text-xl: clamp(1.25rem, 2.5vw, 1.5rem);
--text-2xl: clamp(1.5rem, 3vw, 1.875rem);
--text-3xl: clamp(1.875rem, 3.75vw, 2.25rem);
--text-4xl: clamp(2.25rem, 4.5vw, 3rem);
--text-5xl: clamp(3rem, 6vw, 4rem);
```

**Line Heights**
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Spacing System

**Base Unit: 4px**
```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-24: 6rem;     /* 96px */
```

**Responsive Spacing (Fluid)**
```css
--section-padding-y: clamp(3rem, 8vw, 6rem);
--section-padding-x: clamp(1rem, 5vw, 2rem);
--container-padding: clamp(1rem, 3vw, 2rem);
```

### Border Radius

```css
--radius-sm: 0.5rem;    /* 8px */
--radius-md: 0.75rem;   /* 12px */
--radius-lg: 1rem;      /* 16px */
--radius-xl: 1.5rem;    /* 24px */
--radius-2xl: 2rem;     /* 32px */
--radius-full: 9999px;  /* Pill shape */
```

### Shadows & Glassmorphism

**Glass Effect Standard**
```css
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

**Elevation Shadows**
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Animation Guidelines

**Timing Functions**
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Durations**
```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

**Animation Principles**
- ✅ 60fps target (GPU-accelerated properties only)
- ✅ Subtle, not distracting
- ✅ Respect `prefers-reduced-motion`
- ✅ Fade-in on mount (opacity + translateY)
- ✅ Hover lift effects (translateY + shadow)

---

## ✅ Integration Standards & Best Practices

### Performance Benchmarks

**Build Time**
- ✅ Each page: <3 minutes
- ✅ Full site: <10 minutes
- ✅ No timeouts

**Runtime Performance**
- ✅ PageSpeed Insights: >95 (mobile), >98 (desktop)
- ✅ First Contentful Paint: <1.5s
- ✅ Largest Contentful Paint: <2.5s
- ✅ Cumulative Layout Shift: <0.1
- ✅ Total Blocking Time: <200ms

**Bundle Size**
- ✅ Initial JS: <50KB per page
- ✅ CSS: <20KB total
- ✅ Images: WebP/AVIF, lazy loaded
- ✅ Code splitting: per route

### Code Quality Checklist

**TypeScript**
- [ ] Strict mode enabled
- [ ] No `any` types
- [ ] Proper prop interfaces
- [ ] Return types on functions
- [ ] No TypeScript errors

**Component Structure**
- [ ] Max 500 lines per file
- [ ] Single responsibility
- [ ] Proper composition
- [ ] Reusable patterns
- [ ] Clean imports

**Styling**
- [ ] Tailwind utility classes only
- [ ] No inline styles (except dynamic)
- [ ] Responsive breakpoints
- [ ] Dark mode support
- [ ] CSS variables for theme

**Accessibility**
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Focus visible states
- [ ] Screen reader tested

**Performance**
- [ ] Next.js Image component
- [ ] Lazy loading below fold
- [ ] Code splitting
- [ ] Memoization where needed
- [ ] No unnecessary re-renders

### Theme Consistency Rules

**1. Color Usage**
- ✅ Always use CSS variables (never hex codes directly)
- ✅ Text: 100%, 70%, 50% opacity hierarchy
- ✅ Backgrounds: Glass effect for all surfaces
- ✅ Borders: 8% white for subtle, 12% for emphasis
- ✅ Brand red: Only for CTAs and accents

**2. Typography**
- ✅ Use clamp() for all font sizes
- ✅ Inter variable font throughout
- ✅ Line height: tight (headings), normal (body)
- ✅ Letter spacing: -0.025em for large headings

**3. Spacing**
- ✅ Use spacing scale (multiples of 4px)
- ✅ clamp() for responsive spacing
- ✅ Consistent padding within components
- ✅ Vertical rhythm: margin-bottom on elements

**4. Component Patterns**
- ✅ All cards: glass effect + subtle border
- ✅ All buttons: consistent padding, radius, hover state
- ✅ All inputs: glass background, focus ring
- ✅ All sections: consistent vertical padding

### Responsive Design Rules

**Breakpoints**
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

**Mobile-First Approach**
```tsx
// ✅ GOOD: Mobile default, desktop override
<div className="grid grid-cols-1 lg:grid-cols-3">

// ❌ BAD: Desktop default
<div className="grid grid-cols-3 sm:grid-cols-1">
```

**Touch Targets**
- Minimum 44x44px for interactive elements
- Adequate spacing between tap targets
- No hover-only interactions

---

## 🔄 Example Integration Workflow

### Step-by-Step: Hero Component

**Step 1: Claude Creates Prompt**
```
[I provide the Gemini 3 prompt from library above]
"Copy this prompt and run it in Gemini 3"
```

**Step 2: You Run in Gemini 3**
```
[You paste prompt in Gemini 3]
[Gemini generates React component code]
[You share the output in chat]
```

**Step 3: Claude Reviews Output**
```
[I analyze Gemini's code]
[Check against standards]
[Note any improvements needed]
```

**Step 4: Claude Integrates**
```tsx
// src/components/sections/Hero.tsx

import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

export function Hero() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight tracking-tight">
          Nihar Sunkara
        </h1>

        <p className="mt-4 text-[clamp(1.125rem,2.5vw,1.5rem)] text-white/70">
          Product Designer & Researcher
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-white/50">
          Creating human-centered experiences through deep research, systems thinking, and speculative design. Currently exploring consciousness technology and ethical AI.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 font-medium text-white transition-all hover:bg-red-600 hover:shadow-lg"
          >
            View Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </div>
      </div>
    </motion.header>
  )
}
```

**Step 5: Quality Checks**
- [ ] TypeScript compiles (no errors)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations smooth (60fps)
- [ ] Accessible (keyboard nav, screen reader)
- [ ] Matches design system (colors, spacing, typography)

**Step 6: You Review**
```
[I share screenshot/link]
"Does this match your vision?"
[You provide feedback]
[I iterate if needed]
```

**Step 7: Deploy**
```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: Add hero section with glassmorphic design"
git push
# Cloudflare Pages auto-deploys
```

**Step 8: Verify**
- Check live site
- Run PageSpeed Insights
- Test on mobile
- Confirm no build errors

---

## 🚀 Ready to Start?

**First Component: Hero Section**

1. **I'll provide the Gemini 3 prompt** (from library above)
2. **You run it in Gemini 3** and share the output
3. **I'll integrate the code** with best practices
4. **We review together** and iterate
5. **Deploy immediately** to see it live

Let's build your new portfolio! 🎨

---

## 🌓 Light/Dark Mode Implementation

### Dual Theme Strategy

**Philosophy:** Provide both dark (primary) and light modes with seamless switching, respecting user system preferences while allowing manual override.

### Color Palettes

#### Dark Mode (Primary Theme)

```css
:root {
  /* Background */
  --color-background: #0A0A0A;              /* OLED black */
  --color-background-secondary: #141414;    /* Slightly lighter black */

  /* Text */
  --color-text-primary: #FFFFFF;            /* Pure white */
  --color-text-secondary: rgba(255, 255, 255, 0.70);
  --color-text-tertiary: rgba(255, 255, 255, 0.50);

  /* Brand */
  --color-brand-primary: #DA0E29;           /* Brand red */
  --color-brand-hover: #B00B22;             /* Darker red */

  /* Glass Surfaces */
  --surface-glass: rgba(255, 255, 255, 0.04);
  --surface-glass-hover: rgba(255, 255, 255, 0.06);
  --surface-glass-active: rgba(255, 255, 255, 0.08);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-emphasis: rgba(255, 255, 255, 0.12);

  /* Shadows */
  --shadow-color: rgba(0, 0, 0, 0.3);

  /* Blur & Effects */
  --blur-amount: 40px;
  --saturation: 180%;
}
```

#### Light Mode

```css
[data-theme="light"] {
  /* Background */
  --color-background: #FFFFFF;              /* Pure white */
  --color-background-secondary: #F5F5F5;    /* Light gray */

  /* Text */
  --color-text-primary: #0A0A0A;            /* Dark gray/black */
  --color-text-secondary: rgba(10, 10, 10, 0.70);
  --color-text-tertiary: rgba(10, 10, 10, 0.50);

  /* Brand */
  --color-brand-primary: #DA0E29;           /* Same red (works in both) */
  --color-brand-hover: #B00B22;

  /* Glass Surfaces */
  --surface-glass: rgba(10, 10, 10, 0.04);  /* Dark glass on light bg */
  --surface-glass-hover: rgba(10, 10, 10, 0.06);
  --surface-glass-active: rgba(10, 10, 10, 0.08);

  /* Borders */
  --border-subtle: rgba(10, 10, 10, 0.08);
  --border-emphasis: rgba(10, 10, 10, 0.12);

  /* Shadows */
  --shadow-color: rgba(0, 0, 0, 0.1);

  /* Blur & Effects */
  --blur-amount: 60px;                      /* Stronger blur for light mode */
  --saturation: 150%;
}
```

### CSS Variable Architecture

**Global Styles (src/styles/globals.css)**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================================
   THEME SYSTEM - Dark Mode (Default)
   ============================================ */

:root {
  /* Colors defined above */

  /* Typography */
  --font-sans: 'Inter Variable', system-ui, -apple-system, sans-serif;

  /* Spacing (theme-independent) */
  --spacing-unit: 0.25rem;

  /* Animation */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Light mode overrides */
[data-theme="light"] {
  /* Colors defined above */
}

/* System preference detection */
@media (prefers-color-scheme: light) {
  :root:not([data-theme]) {
    /* Apply light mode colors when no theme is set and system prefers light */
    --color-background: #FFFFFF;
    --color-text-primary: #0A0A0A;
    /* ... all light mode variables */
  }
}

/* Base styles */
body {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  transition: background-color var(--transition-normal), color var(--transition-normal);
}

/* Glassmorphism utility class */
.glass-effect {
  background: var(--surface-glass);
  backdrop-filter: blur(var(--blur-amount)) saturate(var(--saturation));
  border: 1px solid var(--border-subtle);
  transition: all var(--transition-normal);
}

.glass-effect:hover {
  background: var(--surface-glass-hover);
  border-color: var(--border-emphasis);
}
```

### Tailwind CSS Configuration

**tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-secondary': 'var(--color-background-secondary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'brand-primary': 'var(--color-brand-primary)',
        'brand-hover': 'var(--color-brand-hover)',
      },
      backgroundColor: {
        'glass': 'var(--surface-glass)',
        'glass-hover': 'var(--surface-glass-hover)',
      },
      borderColor: {
        'subtle': 'var(--border-subtle)',
        'emphasis': 'var(--border-emphasis)',
      },
      backdropBlur: {
        'glass': 'var(--blur-amount)',
      },
    },
  },
  plugins: [],
}
```

### ThemeProvider Implementation

**src/contexts/ThemeContext.tsx**

```tsx
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark')

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const initial = stored || 'system'
    setTheme(initial)
  }, [])

  // Resolve theme based on system preference if theme is 'system'
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const getResolvedTheme = (): ResolvedTheme => {
      if (theme === 'system') {
        return mediaQuery.matches ? 'dark' : 'light'
      }
      return theme as ResolvedTheme
    }

    const updateResolvedTheme = () => {
      const resolved = getResolvedTheme()
      setResolvedTheme(resolved)

      // Update DOM
      document.documentElement.setAttribute('data-theme', resolved)

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          resolved === 'dark' ? '#0A0A0A' : '#FFFFFF'
        )
      }
    }

    updateResolvedTheme()

    // Listen for system theme changes
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

### Theme Toggle Component

**src/components/ui/ThemeToggle.tsx**

```tsx
'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ]

  return (
    <div className="glass-effect inline-flex rounded-full p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            relative rounded-full px-3 py-2 text-sm font-medium transition-all
            ${theme === value
              ? 'bg-brand-primary text-white'
              : 'text-text-secondary hover:text-text-primary'
            }
          `}
          aria-label={`Switch to ${label} theme`}
          aria-pressed={theme === value}
        >
          <Icon className="h-4 w-4" />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  )
}
```

### Gemini 3 Prompt: Theme Toggle

```
You are designing a theme toggle component for a portfolio website with dark/light mode support.

DESIGN SYSTEM:
- Background: Glassmorphic pill (backdrop-blur-xl, surface-glass)
- Active state: Brand red (#DA0E29) background
- Inactive state: Transparent with text-secondary color
- Icons: Sun (light), Moon (dark), Monitor (system)
- Size: Compact, suitable for navigation bar

LAYOUT:
- Horizontal pill container with 3 buttons
- Each button: 32px height, 36px width
- Rounded-full container and buttons
- 4px padding around buttons
- Icons: 16x16px (h-4 w-4)

BEHAVIOR:
- Toggle between 3 states: Light, Dark, System
- Active button: Red background, white icon
- Inactive buttons: Transparent, secondary text color
- Hover: Text brightens to primary color
- Smooth transitions: 200ms
- Click: Updates theme, saves to localStorage

REQUIREMENTS:
- TypeScript with proper types
- Use lucide-react icons (Sun, Moon, Monitor)
- ARIA labels for accessibility
- aria-pressed for active state
- Keyboard navigation support
- Screen reader announcements

Generate complete component with theme context integration.
```

### Integration in Root Layout

**src/app/layout.tsx**

```tsx
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  title: 'Nihar Sunkara - Product Designer',
  description: 'Product designer & researcher creating human-centered experiences',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Component Usage Examples

#### Using CSS Variables in Components

```tsx
// ✅ GOOD: Uses CSS variables (theme-aware)
export function ProjectCard({ title, description }: Props) {
  return (
    <div className="glass-effect rounded-xl p-6 transition-all hover:scale-[1.02]">
      <h3 className="text-text-primary text-xl font-bold">{title}</h3>
      <p className="text-text-secondary mt-2">{description}</p>
    </div>
  )
}

// ❌ BAD: Hardcoded colors (not theme-aware)
export function ProjectCard({ title, description }: Props) {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <h3 className="text-white text-xl font-bold">{title}</h3>
      <p className="text-white/70 mt-2">{description}</p>
    </div>
  )
}
```

#### Theme-Aware Glassmorphism

```tsx
// Card component with theme support
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      glass-effect
      rounded-2xl
      p-8
      border
      border-subtle
      hover:border-emphasis
      transition-all
      duration-200
    ">
      {children}
    </div>
  )
}
```

### Testing Checklist

#### Visual Testing

**Dark Mode:**
- [ ] Background is OLED black (#0A0A0A)
- [ ] Text is white with proper opacity hierarchy
- [ ] Glass surfaces visible (4% white opacity)
- [ ] Brand red CTAs stand out clearly
- [ ] Borders subtle but visible (8% white)
- [ ] No pure white backgrounds (except images)

**Light Mode:**
- [ ] Background is pure white (#FFFFFF)
- [ ] Text is dark gray/black with proper opacity
- [ ] Glass surfaces visible (4% dark opacity)
- [ ] Brand red CTAs work well on light background
- [ ] Borders subtle but visible (8% dark)
- [ ] Sufficient contrast for accessibility

#### Functional Testing

- [ ] Theme toggle switches between all 3 states
- [ ] System theme detection works correctly
- [ ] Theme persists after page reload (localStorage)
- [ ] Theme applies immediately (no flash)
- [ ] Meta theme-color updates for mobile browsers
- [ ] Smooth transitions between themes (200ms)

#### Accessibility Testing

- [ ] WCAG AA contrast ratios met in both themes
- [ ] Theme toggle keyboard accessible (Tab, Enter)
- [ ] Screen reader announces current theme
- [ ] aria-pressed indicates active theme
- [ ] Focus states visible in both themes
- [ ] `prefers-reduced-motion` respected

#### Performance Testing

- [ ] No layout shift when theme changes
- [ ] Theme change completes in <100ms
- [ ] No unnecessary re-renders
- [ ] CSS variables update efficiently
- [ ] No FOUC (Flash of Unstyled Content)

### Responsive Design Considerations

**Mobile (< 768px):**
- Theme toggle in hamburger menu
- Larger touch targets (44x44px minimum)
- Simplified labels (icons only)

**Tablet (768px - 1024px):**
- Theme toggle in navigation bar
- Icon + text labels on hover

**Desktop (> 1024px):**
- Theme toggle in top-right navigation
- Full icon + text labels
- Keyboard shortcuts (optional enhancement)

### Advanced Features (Post-Launch)

**Optional Enhancements:**

1. **Auto Theme Switching**
   ```tsx
   // Switch to dark mode at sunset
   const hour = new Date().getHours()
   if (hour >= 19 || hour <= 6) {
     setTheme('dark')
   }
   ```

2. **Per-Page Theme Override**
   ```tsx
   // Force dark mode for specific case studies
   <ThemeProvider forcedTheme="dark">
     <LatentSpacePage />
   </ThemeProvider>
   ```

3. **Theme Transition Animation**
   ```css
   @keyframes theme-transition {
     0% { opacity: 1; }
     50% { opacity: 0.8; }
     100% { opacity: 1; }
   }

   [data-theme-transitioning] {
     animation: theme-transition 300ms ease-in-out;
   }
   ```

4. **Keyboard Shortcut**
   ```tsx
   // Cmd/Ctrl + Shift + L to toggle theme
   useEffect(() => {
     const handleKeyPress = (e: KeyboardEvent) => {
       if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'l') {
         toggleTheme()
       }
     }
     window.addEventListener('keydown', handleKeyPress)
     return () => window.removeEventListener('keydown', handleKeyPress)
   }, [])
   ```

### Migration Strategy

**Day 1: Foundation**
- [ ] Add CSS variables to globals.css
- [ ] Update Tailwind config
- [ ] Test color system in both themes

**Day 2: Provider & Context**
- [ ] Create ThemeContext
- [ ] Implement ThemeProvider
- [ ] Add to root layout
- [ ] Test system preference detection

**Day 3: Components**
- [ ] Create ThemeToggle component
- [ ] Update existing components to use CSS variables
- [ ] Test all components in both themes

**Day 4: Polish & Testing**
- [ ] Run visual regression tests
- [ ] Test accessibility in both themes
- [ ] Fix any contrast issues
- [ ] Deploy and verify

---

## 📊 Success Metrics: Light/Dark Mode

**Technical Success:**
- ✅ Theme switch completes in <100ms
- ✅ No FOUC or layout shifts
- ✅ localStorage persistence works
- ✅ System preference detection accurate

**Design Success:**
- ✅ Both themes maintain visual hierarchy
- ✅ Glassmorphism effect works in both themes
- ✅ Brand identity consistent across themes
- ✅ Professional aesthetic in light and dark

**Accessibility Success:**
- ✅ WCAG AA contrast ratios in both themes
- ✅ Theme toggle keyboard accessible
- ✅ Screen reader support complete
- ✅ User preference respected

---

**Theme system complete!** Both light and dark modes fully supported with system preference detection, manual override, and persistent storage. 🎨✨

