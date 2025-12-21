# Cleara AI Prototype Generation Prompt

Use this comprehensive prompt with advanced AI systems (Claude, GPT-4, Cursor, v0.dev, Lovable, Bolt.new) to generate a functional iOS prototype for Cleara.

---

## SYSTEM CONTEXT

You are an expert iOS app designer and React Native developer creating a production-ready health app prototype. Generate complete, functional code with authentic iOS 17+ design patterns and a unique healing-focused watercolor aesthetic.

---

## PROJECT BRIEF

**App Name**: Cleara
**Tagline**: "Clarity Through Care"
**Platform**: iOS 17+ (React Native or Swift)
**Design Language**: Watercolor-Inspired Glassmorphism with healing aesthetic
**Theme**: Light cream canvas (#FAF8F5) as primary, with soft lavender, sage, and blush accents

### Core Value Proposition
Transform psoriasis management from clinical burden to healing journey through:
- AI-powered skin analysis with ghost overlay photo alignment
- Predictive flare-up forecasting using ML time-series
- Holistic mental health integration (PHQ-9/GAD-7)
- Psoriatic Arthritis early detection (PEST screening)
- Beautiful, calming interface that reduces health anxiety

### Design Philosophy
Unlike clinical health apps, Cleara embraces a **healing-first aesthetic**:
- Watercolor textures and soft gradients
- Poetic typography with serif accents
- Gentle animations with spring physics
- Supportive, non-clinical language
- Visual hierarchy that calms rather than alarms

### Target Users
1. **Sarah (34)**: Overwhelmed professional seeking simplicity and emotional support
2. **Marcus (52)**: Skeptical veteran wanting objective progress without clinical coldness
3. **Priya (28)**: Health optimizer seeking beautiful tools that integrate with her lifestyle

---

## DESIGN SYSTEM SPECIFICATIONS

### Color Palette - "Healing Watercolor"

```javascript
const CLEARA_COLORS = {
  // Canvas & Background
  canvas: '#FAF8F5',           // Warm cream (primary background)
  canvasSecondary: '#F5F2ED',  // Slightly darker cream

  // Primary Palette - Watercolor inspired
  lavender: '#8B9DC3',         // Dusty lavender (primary accent)
  periwinkle: '#B8C5E2',       // Soft periwinkle (secondary)
  blush: '#D4A5A5',            // Warm blush (empathy/warmth)
  sage: '#A8C5B5',             // Soft sage (healing/growth)

  // Semantic Colors
  healing: '#A8C5B5',          // Sage green - improvement
  stable: '#B8C5E2',           // Periwinkle - maintenance
  attention: '#D4A5A5',        // Blush - gentle alert
  caution: '#E8C4A0',          // Warm amber - mild warning

  // Text (on cream background)
  text: {
    primary: 'rgba(45, 45, 55, 0.95)',    // Warm charcoal
    secondary: 'rgba(45, 45, 55, 0.70)',
    tertiary: 'rgba(45, 45, 55, 0.50)',
    muted: 'rgba(45, 45, 55, 0.30)',
  },

  // Glass Surfaces (light mode)
  glass: {
    primary: 'rgba(255, 255, 255, 0.70)',
    secondary: 'rgba(255, 255, 255, 0.50)',
    elevated: 'rgba(255, 255, 255, 0.85)',
    lavender: 'rgba(139, 157, 195, 0.12)',
    sage: 'rgba(168, 197, 181, 0.15)',
    blush: 'rgba(212, 165, 165, 0.10)',
  },

  // Gradients
  gradients: {
    empathy: 'linear-gradient(135deg, #D4A5A5 0%, #8B9DC3 100%)',
    discovery: 'linear-gradient(135deg, #8B9DC3 0%, #B8C5E2 100%)',
    impact: 'linear-gradient(135deg, #B8C5E2 0%, #A8C5B5 100%)',
    healing: 'linear-gradient(135deg, #A8C5B5 0%, #D4A5A5 100%)',
  }
};
```

### Typography Scale - Dual Font System

```javascript
const TYPOGRAPHY = {
  // Display & Poetic (Cormorant Garamond / Georgia fallback)
  displayLarge: {
    family: 'Cormorant Garamond, Georgia, serif',
    size: 36,
    weight: '500',
    tracking: -0.5,
    lineHeight: 1.2,
  },
  displayMedium: {
    family: 'Cormorant Garamond, Georgia, serif',
    size: 28,
    weight: '500',
    tracking: -0.3,
  },
  displaySmall: {
    family: 'Cormorant Garamond, Georgia, serif',
    size: 22,
    weight: '500',
    tracking: -0.2,
  },

  // Interface (Space Grotesk / DM Sans fallback)
  title1: { family: 'Space Grotesk, system-ui', size: 24, weight: '600' },
  title2: { family: 'Space Grotesk, system-ui', size: 20, weight: '600' },
  title3: { family: 'Space Grotesk, system-ui', size: 18, weight: '500' },
  headline: { family: 'DM Sans, system-ui', size: 17, weight: '600' },
  body: { family: 'DM Sans, system-ui', size: 16, weight: '400' },
  callout: { family: 'DM Sans, system-ui', size: 15, weight: '400' },
  subheadline: { family: 'DM Sans, system-ui', size: 14, weight: '500' },
  footnote: { family: 'DM Sans, system-ui', size: 13, weight: '400' },
  caption: { family: 'Space Grotesk, system-ui', size: 11, weight: '500', tracking: 0.5 },
};
```

### Glassmorphism Components - Watercolor Style

```javascript
const CLEARA_GLASS = {
  // Primary card with cream warmth
  card: {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(250,248,245,0.65) 100%)',
    backdropFilter: 'blur(40px) saturate(150%)',
    borderRadius: 28,
    border: '1px solid rgba(139, 157, 195, 0.15)',
    boxShadow: `
      0 8px 32px rgba(139, 157, 195, 0.12),
      0 4px 16px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `,
  },

  // Subtle card for nested content
  cardSubtle: {
    background: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(24px) saturate(120%)',
    borderRadius: 20,
    border: '1px solid rgba(139, 157, 195, 0.10)',
    boxShadow: '0 4px 16px rgba(139, 157, 195, 0.08)',
  },

  // Floating elements (modals, popovers)
  floating: {
    background: 'linear-gradient(145deg, rgba(255,255,255,0.90) 0%, rgba(250,248,245,0.85) 100%)',
    backdropFilter: 'blur(50px) saturate(180%)',
    borderRadius: 32,
    border: '1px solid rgba(139, 157, 195, 0.12)',
    boxShadow: `
      0 24px 48px rgba(139, 157, 195, 0.18),
      0 12px 24px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.9)
    `,
  },

  // Accent cards with color tints
  lavenderCard: {
    background: 'linear-gradient(135deg, rgba(139,157,195,0.15) 0%, rgba(184,197,226,0.10) 100%)',
    backdropFilter: 'blur(30px)',
    borderRadius: 24,
    border: '1px solid rgba(139, 157, 195, 0.20)',
  },

  sageCard: {
    background: 'linear-gradient(135deg, rgba(168,197,181,0.18) 0%, rgba(168,197,181,0.08) 100%)',
    backdropFilter: 'blur(30px)',
    borderRadius: 24,
    border: '1px solid rgba(168, 197, 181, 0.25)',
  },

  blushCard: {
    background: 'linear-gradient(135deg, rgba(212,165,165,0.15) 0%, rgba(212,165,165,0.05) 100%)',
    backdropFilter: 'blur(30px)',
    borderRadius: 24,
    border: '1px solid rgba(212, 165, 165, 0.20)',
  },

  // Input fields
  input: {
    background: 'rgba(255, 255, 255, 0.60)',
    borderRadius: 16,
    border: '1px solid rgba(139, 157, 195, 0.15)',
    padding: 16,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    focusBorder: 'rgba(139, 157, 195, 0.40)',
    focusShadow: '0 0 0 4px rgba(139, 157, 195, 0.10)',
  },

  // Pills and badges
  pill: {
    background: 'rgba(255, 255, 255, 0.70)',
    backdropFilter: 'blur(16px)',
    borderRadius: 100,
    border: '1px solid rgba(139, 157, 195, 0.12)',
    padding: '8px 16px',
  }
};
```

### Animation System - Gentle & Healing

```javascript
const ANIMATIONS = {
  // Spring configurations
  springs: {
    gentle: { damping: 20, mass: 1, stiffness: 80 },     // Soft, calming
    natural: { damping: 15, mass: 0.8, stiffness: 120 }, // Natural feel
    responsive: { damping: 18, mass: 0.6, stiffness: 200 }, // Quick feedback
  },

  // Easing curves
  easing: {
    soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
    gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Durations
  duration: {
    instant: 150,
    quick: 250,
    normal: 400,
    slow: 600,
    gentle: 800,
  },

  // Haptic patterns
  haptics: {
    selection: 'selectionChanged',
    light: 'impactLight',
    medium: 'impactMedium',
    success: 'notificationSuccess',
    gentle: 'impactLight', // Preferred for Cleara's calming feel
  }
};

// Signature animations
const CLEARA_ANIMATIONS = {
  // Card entrance - soft fade up
  cardEntrance: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, ease: 'gentle' },
  },

  // Pulse glow for active states
  pulseGlow: {
    animate: {
      boxShadow: [
        '0 0 0 0 rgba(139, 157, 195, 0)',
        '0 0 0 8px rgba(139, 157, 195, 0.15)',
        '0 0 0 0 rgba(139, 157, 195, 0)',
      ],
    },
    transition: { duration: 2, repeat: Infinity },
  },

  // Gentle celebration (not confetti - more subtle)
  celebration: {
    type: 'sparkle', // Soft sparkles instead of confetti
    particleCount: 20,
    colors: ['#8B9DC3', '#B8C5E2', '#A8C5B5', '#D4A5A5'],
    duration: 1500,
  },

  // Breathing animation for loading states
  breathing: {
    animate: { scale: [1, 1.02, 1] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  }
};
```

---

## SCREENS TO IMPLEMENT

### 1. HOME SCREEN (Sanctuary Dashboard)

**Purpose**: Daily wellness overview with calming visual hierarchy

**Language**: Supportive, not clinical. "Your healing journey" not "Treatment tracking"

**Layout**:
```
┌─────────────────────────────────┐
│  9:41          ●●● ■■■ 100%    │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│ ← Watercolor fragment
│  │ ~~ soft watercolor accent   ││    (decorative, parallax)
│  └─────────────────────────────┘│
│                                 │
│  Good morning, Sarah            │ ← Serif display font
│  Your skin is healing           │ ← Encouraging subtext
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🌿 Today's Gentle Rituals   ││ ← Glass card (lavender tint)
│  │                              ││
│  │ ○ Morning care routine       ││ ← Soft checkboxes
│  │ ● Weekly photo (done!)       ││ ← Sage green when done
│  │ ○ Evening moisturizer        ││
│  │                              ││
│  │ 2 of 3 complete              ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Your Progress                ││ ← Glass card (sage tint)
│  │                              ││
│  │      PASI 12.4               ││ ← Large, friendly number
│  │   ↓ 32% healing              ││ ← Positive framing
│  │                              ││
│  │ [Gentle line chart]          ││ ← Soft, rounded lines
│  │ ~~~~~~~~~~~~                 ││    Lavender → Sage gradient
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 💜 7 days of consistency     ││ ← Blush card
│  │ You're building something    ││
│  │ beautiful.                   ││ ← Poetic encouragement
│  └─────────────────────────────┘│
│                                 │
├─────────────────────────────────┤
│  🏠   📸   🌿   💜   ⚙️         │ ← Soft icons, lavender active
└─────────────────────────────────┘
```

**Interactions**:
- Pull-to-refresh with gentle spring
- Checkboxes have soft bloom animation on complete
- Cards have subtle parallax on scroll
- Tap streak → share with watercolor frame

---

### 2. PHOTO CAPTURE SCREEN (Mirror)

**Purpose**: Gentle, aligned progress photos with ghost overlay

**Language**: "Align with your previous self" not "Match previous image"

**Ghost Overlay View**:
```
┌─────────────────────────────────┐
│  ← Back              Guide ✨   │
├─────────────────────────────────┤
│                                 │
│  Align with your previous self  │ ← Poetic instruction
│                                 │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │    ┌───┬───┬───┐            ││ ← Soft lavender grid
│  │    │   │   │   │            ││
│  │    ├───┼───┼───┤            ││
│  │    │ 👻│   │   │            ││ ← Ghost at 50% opacity
│  │    ├───┼───┼───┤            ││
│  │    │   │   │   │            ││
│  │    └───┴───┴───┘            ││
│  │                             ││
│  │  [Live camera viewfinder]   ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Blend                        ││ ← Glass slider card
│  │ [○────────●────────○] 50%   ││ ← Lavender track
│  │ subtle         clear        ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │         ◉ Capture           ││ ← Lavender ring, white center
│  │                             ││
│  │    Left Arm  ▾              ││ ← Body part selector
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

**Key Features**:
- Ghost overlay with adjustable blend (20-80%)
- Soft grid lines in lavender (#8B9DC3 at 30% opacity)
- Gentle haptic on capture (not jarring)
- Capture animation: soft bloom outward, not flash
- Notes prompt: "Add context for your future self"

**Technical**:
```javascript
const GhostOverlay = ({ previousImage, blend }) => (
  <View style={styles.overlayContainer}>
    {/* Previous photo with soft edges */}
    <Image
      source={{ uri: previousImage }}
      style={[
        styles.ghostImage,
        {
          opacity: blend / 100,
          // Soft feathered edges
          maskImage: 'radial-gradient(ellipse, black 70%, transparent 100%)',
        }
      ]}
    />
    {/* Lavender alignment grid */}
    <View style={styles.alignmentGrid}>
      {[0, 1, 2].map(row => (
        <View key={row} style={styles.gridRow}>
          {[0, 1, 2].map(col => (
            <View
              key={col}
              style={[
                styles.gridCell,
                { borderColor: 'rgba(139, 157, 195, 0.3)' }
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  </View>
);
```

---

### 3. PASI INSIGHTS SCREEN (Your Healing Story)

**Purpose**: Display AI analysis with encouraging narrative

**Language**: Frame results as chapters in a healing journey

**Layout**:
```
┌─────────────────────────────────┐
│  ← Back            Share 💜     │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│ ← Watercolor header
│  │ ~~ lavender watercolor wash ││
│  │                             ││
│  │     Your Healing Story      ││ ← Serif display
│  │        Chapter 12           ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │                              ││ ← Main score card
│  │       PASI Score             ││
│  │                              ││
│  │          12.4                ││ ← Large, friendly
│  │                              ││
│  │   ┌──────────────────────┐  ││
│  │   │████████████░░░░░░░░░░│  ││ ← Gradient bar
│  │   └──────────────────────┘  ││    Blush → Lavender → Sage
│  │                              ││
│  │   You're in the healing zone ││ ← Encouraging interpretation
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ The Details                  ││ ← Component breakdown
│  │                              ││
│  │ Redness      ███░░  Better  ││ ← Named, not clinical
│  │ Thickness    ████░  Stable  ││
│  │ Scaling      ██░░░  Healing ││
│  │ Coverage     ███░░  Reduced ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Before & After               ││
│  │ ┌─────────┐ ┌─────────┐     ││
│  │ │ March   │ │ Today   │     ││
│  │ │  18.2   │ │  12.4   │     ││
│  │ └─────────┘ └─────────┘     ││
│  │      ←────●────→             ││ ← Comparison slider
│  │                              ││
│  │   32% closer to your goal    ││
│  └─────────────────────────────┘│
│                                 │
│  AI Confidence: 94%             │ ← Subtle, small text
│                                 │
└─────────────────────────────────┘
```

**Color Interpretation**:
- 0-5: "Clear skin days ahead" → Sage dominant
- 5-12: "You're in the healing zone" → Lavender/Periwinkle
- 12-20: "Keep nurturing yourself" → Blush/Lavender
- 20+: "Your skin needs extra care" → Blush (never red/alarming)

---

### 4. RITUALS SCREEN (Gentle Reminders)

**Purpose**: Medication/care tracking without clinical pressure

**Language**: "Rituals" not "Medications", "Nurture" not "Apply"

**Layout**:
```
┌─────────────────────────────────┐
│  Your Healing Rituals    Today  │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🌸 7 days of consistency     ││ ← Blush card, celebratory
│  │                              ││
│  │ [░░░░░░░███████] 70%        ││ ← Soft progress to next
│  │                              ││
│  │ 3 more days for your         ││
│  │ first milestone 🌿           ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Morning Ritual      ○ 8:30  ││ ← Lavender card
│  │                              ││
│  │ ○ Gentle cleanser            ││ ← Soft circle checkbox
│  │   Face, neck                 ││
│  │                              ││
│  │ ● Healing cream ✓            ││ ← Filled = sage green
│  │   Arms (done at 8:42)        ││
│  │                              ││
│  │ ○ Moisturize                 ││
│  │   Full body                  ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Evening Ritual      ○ 9:00  ││
│  │                              ││
│  │ ○ Calming treatment          ││
│  │   Face, scalp                ││
│  │                              ││
│  │ ○ Night moisturizer          ││
│  │   Affected areas             ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🌟 Milestones                 ││
│  │                              ││
│  │ 🌱 7 days   🌿 14 days       ││ ← Earned = filled
│  │ 🌸 30 days  💜 60 days       ││ ← Locked = outline
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

**Interactions**:
1. Tap checkbox →
2. Soft bloom animation (scale 1 → 1.1 → 1)
3. Color transitions: outline → sage fill
4. Gentle sparkle effect (not confetti)
5. Streak counter updates with breathing animation
6. Light haptic (impactLight, not medium)

**Sparkle Animation** (instead of confetti):
```javascript
const SparkleEffect = ({ trigger }) => {
  const sparkles = Array(15).fill(0).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 0.3,
    color: ['#8B9DC3', '#B8C5E2', '#A8C5B5', '#D4A5A5'][i % 4],
  }));

  return (
    <View style={styles.sparkleContainer}>
      {sparkles.map(s => (
        <Animated.View
          key={s.id}
          style={[
            styles.sparkle,
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              borderRadius: s.size / 2,
            }
          ]}
          entering={FadeIn.delay(s.delay * 1000).duration(400)}
          exiting={FadeOut.duration(600)}
        />
      ))}
    </View>
  );
};
```

---

### 5. WELLNESS CHECK-IN (Mental Health)

**Purpose**: PHQ-9/GAD-7 with supportive, non-clinical framing

**Language**: "Check-in with yourself" not "Depression screening"

**Question Screen**:
```
┌─────────────────────────────────┐
│  ✕              3 of 9          │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │ ~~ soft lavender wash       ││
│  └─────────────────────────────┘│
│                                 │
│  Taking a moment for yourself   │ ← Serif display
│  is an act of healing.          │
│                                 │
│  ┌─────────────────────────────┐│
│  │                              ││
│  │  Over the last two weeks,   ││
│  │  have you felt...            ││
│  │                              ││
│  │  "Tired or low on energy"   ││ ← Friendly phrasing
│  │                              ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ○ Not really                 ││ ← Soft language
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │ ○ Sometimes                  ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │ ○ Often                      ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │ ● Most days                  ││ ← Selected = lavender fill
│  └─────────────────────────────┘│
│                                 │
│  [○○●○○○○○○] Gentle progress    │
│                                 │
│  ┌─────────────────────────────┐│
│  │         Continue →           ││ ← Lavender button
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

**Results Screen** (Moderate Symptoms):
```
┌─────────────────────────────────┐
│  Your Wellness Reflection       │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │ ~~ blush watercolor wash    ││
│  │                             ││
│  │   💜 You're not alone       ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  Your check-in suggests you     │
│  might benefit from some        │
│  extra support right now.       │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🌸 This is common            ││
│  │                              ││
│  │ 1 in 5 people living with   ││
│  │ psoriasis experience these  ││
│  │ feelings. Your skin and     ││
│  │ emotions are connected.      ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 💜 Ways to nurture yourself  ││
│  │                              ││
│  │ • Talk to someone you trust ││
│  │ • Gentle movement helps     ││
│  │ • Consider speaking with    ││
│  │   a professional            ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📞 If you need support now   ││ ← Subtle, not alarming
│  │ 988 Lifeline • Available 24/7││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │    Share with my provider   ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │    View coping strategies   ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

### 6. GENTLE ALERTS (Flare Awareness)

**Purpose**: Predictive alerts without causing anxiety

**Language**: "Awareness" not "Warning", "Care opportunity" not "Risk"

**Alert View**:
```
┌─────────────────────────────────┐
│  ← Back                         │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │ ~~ soft blush gradient      ││
│  │                             ││
│  │   🌸 A Gentle Heads Up      ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  Your patterns suggest your     │
│  skin might need extra care     │
│  this week.                     │
│                                 │
│  ┌─────────────────────────────┐│
│  │                              ││
│  │   Care Opportunity           ││
│  │                              ││
│  │       ┌─────────┐            ││
│  │       │ Elevated │           ││ ← Soft visual, not thermometer
│  │       │ ████████ │           ││    Gradient bar, not alarming
│  │       │ ████████ │           ││
│  │       │ ░░░░░░░░ │           ││
│  │       │ ░░░░░░░░ │           ││
│  │       └─────────┘            ││
│  │                              ││
│  │   Based on the last 7 days   ││
│  │                              ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🌿 What's contributing       ││
│  │                              ││
│  │ ❄️ Cooler weather ahead      ││
│  │ 💤 Sleep has been lighter    ││
│  │ 💊 A few rituals were missed ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 💜 Ways to nurture your skin ││
│  │                              ││
│  │ • Extra moisturizer helps   ││
│  │ • Consider a humidifier     ││
│  │ • Prioritize rest this week ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │    Share with my provider   ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

### 7. PATTERNS SCREEN (Trigger Insights)

**Purpose**: Help identify what affects skin without blame

**Language**: "Patterns" not "Triggers", "Noticed" not "Caused by"

**Layout**:
```
┌─────────────────────────────────┐
│  Your Patterns                  │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🔮 What we've noticed        ││ ← Lavender card
│  │                              ││
│  │ Weather Changes              ││
│  │ ████████████████░░░ 85%     ││ ← Lavender bar
│  │                              ││
│  │ Stress Levels                ││
│  │ █████████████░░░░░░ 72%     ││
│  │                              ││
│  │ Sleep Quality                ││
│  │ ██████████░░░░░░░░░ 58%     ││
│  │                              ││
│  │ These often appear before   ││
│  │ your skin needs extra care.  ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📝 Today's Check-in          ││
│  │                              ││
│  │ How's your stress today?    ││
│  │ [1][2][3][4][●][6][7][8]    ││
│  │                              ││
│  │ Sleep last night            ││
│  │ ┌───────────────────┐       ││
│  │ │  7.5 hours        │       ││
│  │ └───────────────────┘       ││
│  │                              ││
│  │ + Add a note about today    ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🔗 Connected                  ││
│  │                              ││
│  │ ☑ Weather   ☑ Apple Health  ││
│  │ ○ Calendar                   ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

### 8. PROVIDER REPORT (Sharing Your Story)

**Purpose**: Generate clinical summary with patient-friendly format

**Language**: "Your story for [Provider]" not "Clinical report"

**Layout**:
```
┌─────────────────────────────────┐
│  Share Your Story               │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │                              ││
│  │   📋 Report for              ││
│  │   Dr. Johnson                ││
│  │                              ││
│  │   March 1 - June 15, 2024    ││
│  │                              ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Include in report:           ││
│  │                              ││
│  │ ☑ Progress photos           ││
│  │ ☑ PASI trend chart          ││
│  │ ☑ Ritual consistency        ││
│  │ ☑ Wellness check-ins        ││
│  │ ○ Pattern analysis           ││
│  │ ○ Joint health screening     ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Preview                       ││
│  │ ┌─────────────────────────┐ ││
│  │ │ [Report preview image]  │ ││
│  │ │                         │ ││
│  │ │ Sarah's Healing Journey │ ││
│  │ │ March - June 2024       │ ││
│  │ └─────────────────────────┘ ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │    Generate PDF              ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │    Send to Provider          ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

## NAVIGATION STRUCTURE

```
Tab Bar (5 items) - Soft icons, lavender active state:
├── 🏠 Home (Sanctuary)
├── 📸 Photo (Mirror)
├── 🌿 Insights (Patterns & PASI)
├── 💜 Rituals (Care tracking)
└── ⚙️ Settings

Settings Menu:
├── Your Profile
├── Care Plan
├── Notification Preferences
│   └── "Gentle reminders" toggle
├── Provider Connections
├── Wellness History
│   ├── Check-ins (PHQ-9/GAD-7)
│   └── Joint Health (PEST)
├── Privacy & Data
│   └── "Your data stays with you" emphasis
└── About Cleara
```

---

## UNIQUE CLEARA ELEMENTS

### 1. Watercolor Decorative Fragments
Subtle watercolor shapes that float in backgrounds:
```javascript
const WatercolorFragment = ({ color, position, size, opacity }) => (
  <Image
    source={require(`./watercolors/${color}-wash.png`)}
    style={{
      position: 'absolute',
      ...position,
      width: size[0],
      height: size[1],
      opacity,
      transform: [{ rotate: `${Math.random() * 10 - 5}deg` }],
    }}
    blurRadius={0.5}
  />
);
```

### 2. Breathing Progress Indicators
Instead of static bars, gentle pulsing:
```javascript
const BreathingProgress = ({ value, max }) => (
  <Animated.View
    style={[styles.progressBar, { width: `${(value/max) * 100}%` }]}
    entering={FadeIn.duration(800)}
  >
    <Animated.View
      style={styles.progressGlow}
      {...CLEARA_ANIMATIONS.breathing}
    />
  </Animated.View>
);
```

### 3. Poetic Transitions
Screen transitions use gentle fades with slight vertical movement:
```javascript
const poeticTransition = {
  gestureEnabled: true,
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      opacity: current.progress,
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
    },
  }),
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 400 } },
    close: { animation: 'timing', config: { duration: 300 } },
  },
};
```

### 4. Encouraging Microcopy
Every interaction has supportive text:
```javascript
const CLEARA_MICROCOPY = {
  photoCapture: "Capturing your healing journey",
  processing: "Understanding your skin...",
  checkboxComplete: "Beautiful progress",
  streakMilestone: "You're building something wonderful",
  emptyState: "Every journey starts with a single step",
  error: "Let's try that again, gently",
};
```

---

## DATA MODELS

```typescript
interface ClearaUser {
  id: string;
  name: string;
  preferredName?: string;
  healingJourneyStart: Date;
  carePlan: CarePlan;
}

interface CarePlan {
  rituals: Ritual[];
  checkInFrequency: 'daily' | 'weekly';
  wellnessReminders: boolean;
}

interface Ritual {
  id: string;
  name: string; // "Gentle cleanser", not "Medication"
  bodyAreas: string[];
  timeOfDay: 'morning' | 'evening' | 'any';
  reminderTime?: string;
}

interface PhotoEntry {
  id: string;
  timestamp: Date;
  bodyArea: string;
  imageUri: string;
  notes?: string;
  insights?: PasiInsights;
}

interface PasiInsights {
  score: number;
  interpretation: string; // "You're in the healing zone"
  components: {
    redness: { value: number; trend: string };
    thickness: { value: number; trend: string };
    scaling: { value: number; trend: string };
    coverage: { value: number; trend: string };
  };
  confidence: number;
}

interface WellnessCheckIn {
  type: 'PHQ9' | 'GAD7';
  score: number;
  interpretation: string;
  suggestions: string[];
  timestamp: Date;
}

interface Pattern {
  name: string;
  correlation: number; // 0-100
  icon: string;
  description: string;
}
```

---

## ACCESSIBILITY & INCLUSION

### Visual Accessibility
- All text meets WCAG AAA contrast (7:1+) on cream background
- Color is never the only indicator (icons + text)
- Reduced motion option removes all animations
- Supports Dynamic Type (iOS) scaling

### Emotional Accessibility
- No fear-based language or alarming colors
- Always offer an "I'd rather not" option
- Crisis resources available but not prominent by default
- Celebration without pressure

### Inclusive Design
- Body-neutral language for photo areas
- No before/after framing that implies "bad" → "good"
- Acknowledges that healing isn't linear
- Respects that some days are harder

---

## OUTPUT REQUIREMENTS

Generate a complete React Native / Expo prototype with:

1. **All 8 screens** with Cleara's unique aesthetic
2. **Watercolor glassmorphism** with blur effects
3. **Dual typography** (serif display + sans interface)
4. **Gentle animations** (springs, not bounces)
5. **Ghost overlay** for photo alignment
6. **Sparkle celebrations** (not confetti)
7. **Supportive microcopy** throughout
8. **Lavender/sage/blush color system**

The prototype should feel like a **healing companion**, not a clinical tool.

---

## VISUAL REFERENCES

**Color Palette Origin**: Watercolor paintings, healing crystals, morning mist
**Typography Inspiration**: Poetry books, wellness journals, botanical illustrations
**Interaction Model**: Calm app, Headspace, gentle journaling apps
**Animation Style**: Slow breathing, gentle floating, soft blooming

---

## KEY DIFFERENTIATORS FROM PSORIASSIST

| Aspect | PsoriAssist | Cleara |
|--------|-------------|--------|
| Aesthetic | iOS clinical blue | Watercolor healing |
| Language | Medical terms | Poetic, supportive |
| Alerts | Red warnings | Blush awareness |
| Celebrations | Confetti bursts | Gentle sparkles |
| Typography | System sans | Serif + sans |
| Tone | Informative | Nurturing |
| Background | White/dark | Cream canvas |
| Progress | Charts | Healing story |

---

*This prompt encapsulates Cleara's unique healing-focused design philosophy, ready for AI-assisted prototype generation.*
