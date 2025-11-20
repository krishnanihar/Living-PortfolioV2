# Restoring Disabled Case Studies

**Status:** Temporarily disabled for Vercel build optimization (45-minute timeout on free tier)

## What Was Disabled

Two heavy case study pages were temporarily disabled to reduce build time:

### 1. Latent Space (7,325 lines)
- **Route:** `/work/latent-space`
- **Component files:**
  - `LatentSpaceWork.tsx` (3,216 lines)
  - `LatentSpaceSpeculative.tsx` (4,109 lines)
  - Narrative storytelling system (2,500+ lines)

### 2. PsoriAssist (6,940 lines)
- **Route:** `/work/psoriassist`
- **Component files:**
  - `PsoriAssistWork.tsx` (4,468 lines)
  - `PsoriAssistPhoneMockup.tsx` (2,472 lines)
  - Interactive iOS prototypes (8 screens)

**Total reduction:** ~14,265 lines (27% of codebase)

---

## How to Re-enable

### Step 1: Restore Route Files

Rename the disabled page files back to active:

```bash
# Restore Latent Space
mv src/app/work/latent-space/page.tsx.disabled src/app/work/latent-space/page.tsx

# Restore PsoriAssist
mv src/app/work/psoriassist/page.tsx.disabled src/app/work/psoriassist/page.tsx
```

### Step 2: Uncomment Projects Data

Edit `src/data/projects.ts` and uncomment both blocks:

1. Find the comment block starting with:
   ```
   /* ==================================================
    * TEMPORARILY DISABLED FOR VERCEL BUILD OPTIMIZATION
    * Route: /work/psoriassist (6,940 lines)
   ```
   Remove the `/*` and `*/` markers

2. Find the comment block starting with:
   ```
   /* ==================================================
    * TEMPORARILY DISABLED FOR VERCEL BUILD OPTIMIZATION
    * Route: /work/latent-space (7,325 lines)
   ```
   Remove the `/*` and `*/` markers

### Step 3: Verify & Deploy

```bash
# Run type check
npm run type-check

# Commit changes
git add .
git commit -m "feat: Re-enable Latent Space and PsoriAssist case studies"

# Push to deploy
git push
```

---

## Why Were They Disabled?

The Vercel free tier has a 45-minute build timeout. The portfolio's full codebase (53,000+ lines) was exceeding this limit, even with aggressive build optimizations:

- TypeScript type-checking disabled during build
- ESLint skipped during build
- Source maps disabled
- typedRoutes disabled

These two case studies represented the largest single components in the codebase. Disabling them brought build time under the free tier limit.

---

## Permanent Solutions

If you encounter build timeouts again after re-enabling:

### Option 1: Upgrade Vercel (Recommended)
- **Vercel Pro:** $20/month
- Enhanced Builds: Larger machines, faster compilation
- No build time limits

### Option 2: Alternative Platforms
- **Cloudflare Pages:** Better free tier (500 builds/month)
- **Netlify:** 300 build minutes/month
- **Self-host:** DigitalOcean, AWS, Railway

### Option 3: Code Refactoring
- Split large components into smaller modules
- Implement lazy loading with `next/dynamic`
- Remove unused dependencies (lottie-react, swiper if not needed)

---

## Current Build Configuration

The following optimizations are active in `next.config.js`:

```javascript
typescript: {
  ignoreBuildErrors: true  // Run `npm run type-check` separately
},
eslint: {
  ignoreDuringBuilds: true
},
productionBrowserSourceMaps: false,
// typedRoutes: true  // Disabled for faster builds
```

These should remain enabled even after restoring case studies, as they provide meaningful build time improvements with minimal downsides.

---

**Last updated:** 2025-01-20
**Disabled by:** Claude Code (nuclear build optimization)
**Git commit:** See latest commit message
