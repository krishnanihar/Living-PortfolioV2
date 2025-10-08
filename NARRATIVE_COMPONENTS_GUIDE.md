# Narrative Components Usage Guide

## Quick Start Integration

This guide shows you how to integrate the advanced narrative components into your Latent Space project or apply them to new pages.

## Component Overview

### 🎭 Core Narrative System
- **useNarrativeProgress** - Hook that tracks scroll position and provides narrative state
- **ConsciousnessOrbs** - Environmental particle effects that respond to narrative
- **FirstPersonMoments** - Immersive text overlays at key scroll points
- **NarrativeProgressIndicator** - Visual wayfinding for the journey

### 📊 Data Visualization
- **ProgressiveBarChart** - Animated bar charts with scroll reveals
- **ProgressiveRadialChart** - Circular/donut charts for percentages
- **ProgressiveCounter** - Animated number counting
- **ProgressiveStatsGrid** - Grid of statistics with staggered animation

### 🌊 Pacing & Breathing
- **BreathingMoment** - Reflective pauses in content
- **NarrativeHook** - Cliffhangers that pull users forward
- **ActTransition** - Visual markers for narrative act changes
- **ContemplativeSpace** - Empty space with subtle visual interest

### 🎵 Audio (Optional)
- **NarrativeAudio** - Binaural tones that shift with narrative acts
- **AudioOnboardingTooltip** - First-time visitor guidance

---

## Integration Examples

### Example 1: Full Narrative Experience

```typescript
// pages/my-project/page.tsx
'use client';

import { ConsciousnessOrbs } from '@/components/effects/ConsciousnessParticles';
import { NarrativeProgressIndicator } from '@/components/ui/NarrativeProgressIndicator';
import { FirstPersonMoments, NarrativeWhispers } from '@/components/sections/FirstPersonMoments';
import { NarrativeAudio, AudioOnboardingTooltip } from '@/components/effects/NarrativeAudio';
import { useNarrativeProgress } from '@/hooks/useNarrativeProgress';

export default function MyProjectPage() {
  const narrativeState = useNarrativeProgress();

  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Environmental Layers */}
      <ConsciousnessOrbs count={6} />
      <NarrativeWhispers />
      <FirstPersonMoments />

      {/* Navigation */}
      <NarrativeProgressIndicator position="right" />

      {/* Optional Audio */}
      <NarrativeAudio />
      <AudioOnboardingTooltip />

      {/* Dynamic Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: narrativeState.color.atmosphere,
          transition: 'background 2s ease',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* Your Content */}
      <YourContent />
    </main>
  );
}
```

---

### Example 2: Adding Data Visualizations

```typescript
import { ProgressiveBarChart, ProgressiveRadialChart } from '@/components/ui/ProgressiveDataReveal';

function ScienceSection() {
  const sleepData = [
    { label: 'Wake', value: 10, color: 'rgba(34, 197, 94, 0.8)' },
    { label: 'N1', value: 5, color: 'rgba(59, 130, 246, 0.8)' },
    { label: 'N2', value: 45, color: 'rgba(99, 102, 241, 0.8)' },
    { label: 'N3', value: 25, color: 'rgba(236, 72, 153, 0.8)' },
    { label: 'REM', value: 20, color: 'rgba(251, 146, 60, 0.8)' },
  ];

  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Sleep Stage Distribution</h2>

      {/* Bar chart that reveals on scroll */}
      <ProgressiveBarChart
        data={sleepData}
        title="Typical Night (8 hours)"
        animationDuration={1.5}
        staggerDelay={0.15}
      />

      {/* Radial chart alternative */}
      <ProgressiveRadialChart
        data={sleepData}
        title="Sleep Cycle Breakdown"
        size={300}
      />
    </section>
  );
}
```

---

### Example 3: Adding Breathing Moments & Pacing

```typescript
import { BreathingMoment, NarrativeHook, ActTransition } from '@/components/ui/BreathingMoment';

function StoryWithPacing() {
  return (
    <>
      {/* Your intense content section */}
      <IntenseContentSection />

      {/* Give users space to breathe */}
      <BreathingMoment
        quote="The most private space of human experience becomes potentially observable."
        type="reflection"
        minHeight="50vh"
      />

      {/* Hook to pull them forward */}
      <NarrativeHook question="But who grants permission to enter this space?" />

      {/* More content */}
      <MoreContent />

      {/* Major act transition */}
      <ActTransition
        fromAct="seduction"
        toAct="complication"
        title="What Do We Lose?"
      />

      {/* Contemplative empty space */}
      <ContemplativeSpace height="40vh" />
    </>
  );
}
```

---

### Example 4: Stats & Counters

```typescript
import { ProgressiveCounter, ProgressiveStatsGrid } from '@/components/ui/ProgressiveDataReveal';

function ImpactMetrics() {
  return (
    <section style={{ padding: '4rem 2rem' }}>
      {/* Single big number */}
      <ProgressiveCounter
        value={92}
        suffix="%"
        label="Detection Accuracy"
        duration={2.5}
        decimals={1}
      />

      {/* Grid of stats */}
      <ProgressiveStatsGrid
        stats={[
          { value: '450+', label: 'Daily Users', description: 'Operations team' },
          { value: '50+', label: 'Components', description: 'Audited automatically' },
          { value: '90%', label: 'Time Saved', description: 'In review process' },
        ]}
      />
    </section>
  );
}
```

---

### Example 5: Customizing First-Person Moments

Edit `src/components/sections/FirstPersonMoments.tsx`:

```typescript
const moments: FirstPersonMoment[] = [
  {
    trigger: 0.10, // 10% scroll progress
    act: 'seduction',
    text: 'Your custom narrative moment',
    subtext: 'Supporting detail or atmosphere',
    icon: <YourIcon className="w-8 h-8" />,
    duration: 5000, // 5 seconds visible
  },
  {
    trigger: 0.45,
    act: 'complication',
    text: 'A critical turning point...',
    duration: 6000,
  },
  // Add more moments...
];
```

---

### Example 6: Adding Audio to Existing Page

```typescript
import { NarrativeAudio, AudioOnboardingTooltip } from '@/components/effects/NarrativeAudio';

export default function ExistingPage() {
  return (
    <main>
      {/* Your existing content */}
      <YourContent />

      {/* Add audio button (bottom-right corner) */}
      <NarrativeAudio />
      <AudioOnboardingTooltip />
    </main>
  );
}
```

---

## Customization Guide

### Changing Narrative Act Structure

Edit `src/hooks/useNarrativeProgress.ts`:

```typescript
// Change act boundaries
if (scrollProgress < 0.4) { // Changed from 0.3 (now 40% instead of 30%)
  act = 'seduction';
  // ...
}
else if (scrollProgress < 0.75) { // Changed from 0.7
  act = 'complication';
  // ...
}

// Adjust colors
color = {
  primary: 'rgba(255, 100, 100, 0.8)', // Your custom color
  secondary: 'rgba(100, 150, 255, 0.8)',
  atmosphere: 'rgba(255, 100, 100, 0.02)',
};

// Change intensity curve
intensity = 0.2 + actProgress * 0.5; // Different intensity progression
```

### Creating Custom Whispers

Edit `NarrativeWhispers` in `FirstPersonMoments.tsx`:

```typescript
const whispersByAct = {
  seduction: [
    'possibility',
    'innovation',
    'breakthrough',
    'future',
  ],
  complication: [
    'uncertainty',
    'questions',
    'consequences',
    'trade-offs',
  ],
  resolution: [
    'reflection',
    'wisdom',
    'balance',
    'responsibility',
  ],
};
```

### Adjusting Audio Frequencies

Edit `getFrequencies` in `NarrativeAudio.tsx`:

```typescript
const getFrequencies = (act: string) => {
  switch (act) {
    case 'seduction':
      return { left: 200, right: 210 }; // 10 Hz binaural beat
    case 'complication':
      return { left: 200, right: 220 }; // 20 Hz binaural beat
    case 'resolution':
      return { left: 200, right: 204 }; // 4 Hz binaural beat
  }
};
```

---

## Performance Tips

### For Best Performance

1. **Use CSS-based particles** instead of Canvas:
   ```typescript
   <ConsciousnessOrbs count={3} /> // Lighter than ConsciousnessParticles
   ```

2. **Reduce particle count** on mobile:
   ```typescript
   const isMobile = window.innerWidth < 768;
   <ConsciousnessOrbs count={isMobile ? 3 : 6} />
   ```

3. **Disable audio** by default (let users opt-in)

4. **Lazy load heavy components**:
   ```typescript
   const DreamRecorder = dynamic(() => import('./DreamRecorderPrototype'), {
     ssr: false,
   });
   ```

### For Maximum Impact

1. Use all environmental layers
2. Enable audio
3. Add first-person moments at key points
4. Use act transitions for major shifts
5. Include breathing moments between intense sections

---

## Accessibility Considerations

### Visual
- All text meets WCAA AA contrast ratios
- Animations respect `prefers-reduced-motion`
- Progress indicators provide clear wayfinding
- Color is not the only indicator of state

### Audio
- Audio is opt-in (disabled by default)
- Clear toggle button with aria-labels
- Visual indicators when audio is active
- Tooltip explains audio purpose

### Navigation
- First-person moments don't trap focus
- All interactive elements keyboard accessible
- Progress indicator shows journey position
- Breathing moments don't block content

---

## Testing Checklist

- [ ] Scroll through entire experience at normal speed
- [ ] Test slow scrolling (all animations complete)
- [ ] Test fast scrolling (no jank)
- [ ] Verify first-person moments appear at correct triggers
- [ ] Check act transitions (30% and 70% scroll)
- [ ] Test on mobile (NarrativeProgressBar appears)
- [ ] Verify audio toggle works
- [ ] Check audio frequency shifts between acts
- [ ] Test with reduced motion preference
- [ ] Verify all data visualizations reveal on scroll
- [ ] Check breathing moments provide adequate pacing

---

## Common Patterns

### Pattern 1: Introduction → Tension → Resolution
```typescript
<IntroSection />
<BreathingMoment type="pause" />
<TensionBuilding />
<NarrativeHook question="What happens next?" />
<Climax />
<ActTransition fromAct="complication" toAct="resolution" title="Reflection" />
<Resolution />
<ContemplativeSpace />
```

### Pattern 2: Data Story with Progressive Reveal
```typescript
<h2>The Science Behind Dreams</h2>
<ProgressiveBarChart data={sleepStages} />
<BreathingMoment quote="Each stage serves a purpose..." />
<ProgressiveRadialChart data={brainwaves} />
<NarrativeHook question="But can we truly measure consciousness?" />
```

### Pattern 3: Ethical Dilemma Structure
```typescript
<PromiseSection /> {/* Act I */}
<BreathingMoment type="reflection" />
<ActTransition fromAct="seduction" toAct="complication" title="The Cost" />
<EthicalDilemmas /> {/* Act II */}
<SpeculativePrototype /> {/* Show, don't tell */}
<NarrativeHook question="What questions should we ask first?" />
<ActTransition fromAct="complication" toAct="resolution" title="The Path Forward" />
<OpenEndedQuestions /> {/* Act III */}
```

---

## Troubleshooting

**First-person moments not appearing:**
- Check trigger values (0-1 range)
- Verify scroll progress calculation
- Ensure component is mounted before scroll

**Audio not working:**
- User must interact with page first (Web Audio API requirement)
- Check browser console for AudioContext errors
- Verify frequencies are valid (positive numbers)

**Particles causing performance issues:**
- Reduce particle count
- Switch to ConsciousnessOrbs (CSS-based)
- Disable on mobile devices

**Data visualizations not animating:**
- Check viewport intersection margin
- Verify data format matches expected props
- Ensure parent has proper height

---

## Examples in the Wild

See these files for complete implementations:

1. **Full Experience**: `src/components/sections/LatentSpaceSpeculative.tsx`
2. **Data Viz**: Science sections in Latent Space
3. **Pacing**: Breathing moments throughout journey
4. **Audio**: Bottom-right audio toggle
5. **Prototypes**: Dream Recorder in Interactive Prototypes section

---

## Next Steps

After integrating these components:

1. **Measure engagement**: Track scroll depth and time spent
2. **A/B test**: Try with/without audio, different act timings
3. **Gather feedback**: Do users understand the narrative structure?
4. **Iterate**: Adjust timing, colors, and intensity based on data
5. **Expand**: Add more first-person moments, custom visualizations

---

*For detailed API documentation, see `NARRATIVE_ENHANCEMENTS.md`*
