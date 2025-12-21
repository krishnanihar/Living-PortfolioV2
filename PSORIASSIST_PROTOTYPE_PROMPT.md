# PsoriAssist AI Prototype Generation Prompt

Use this comprehensive prompt with advanced AI systems (Claude, GPT-4, Cursor, v0.dev, etc.) to generate a functional iOS prototype for PsoriAssist.

---

## SYSTEM CONTEXT

You are an expert iOS app designer and React Native developer creating a production-ready health app prototype. Generate complete, functional code with authentic iOS 17+ design patterns.

---

## PROJECT BRIEF

**App Name**: PsoriAssist
**Tagline**: "AI-Powered Psoriasis Management"
**Platform**: iOS 17+ (React Native or Swift)
**Design Language**: iOS 17 Liquid Glass / Glassmorphism
**Theme**: Light mode primary (cream background #FAF8F5), dark mode support

### Core Value Proposition
Transform psoriasis management from reactive treatment tracking to proactive, predictive health optimization through:
- AI-powered skin analysis with 33% better accuracy than dermatologists
- Ghost overlay photo comparison for perfect before/after alignment
- 7-day flare-up prediction using ML time-series forecasting
- Integrated mental health screening (PHQ-9/GAD-7)
- Psoriatic Arthritis early detection (PEST screening)

### Target Users
1. **Sarah (34)**: Overwhelmed professional, moderate severity, needs streamlined routines
2. **Marcus (52)**: Skeptical veteran, severe case, wants objective progress tracking
3. **Priya (28)**: Health optimizer, mild case, seeks trigger analytics

---

## DESIGN SYSTEM SPECIFICATIONS

### Color Palette

```javascript
const COLORS = {
  // Primary Actions
  primary: '#007AFF',        // System Blue
  primaryDark: '#0A84FF',    // Dark mode blue

  // Status Colors
  success: '#34C759',        // Healing/improvement
  successDark: '#30D158',
  warning: '#FF9500',        // Caution
  warningDark: '#FF9F0A',
  error: '#FF3B30',          // Flare-up/alert
  errorDark: '#FF453A',

  // Health Status
  healing: '#30D158',        // Green - progress
  improving: '#BF5AF2',      // Purple - change
  stable: '#0A84FF',         // Blue - maintenance
  flareUp: '#FF453A',        // Red - alert
  moderate: '#FFD60A',       // Yellow - caution

  // Backgrounds
  background: '#FAF8F5',     // Cream canvas (light)
  backgroundDark: '#000000', // True OLED black

  // Glass Surfaces (light mode)
  glass: {
    primary: 'rgba(0, 0, 0, 0.05)',
    secondary: 'rgba(0, 0, 0, 0.03)',
    elevated: 'rgba(0, 0, 0, 0.08)',
    border: 'rgba(0, 0, 0, 0.08)',
  },

  // Text (light mode)
  text: {
    primary: 'rgba(0, 0, 0, 0.95)',
    secondary: 'rgba(0, 0, 0, 0.70)',
    tertiary: 'rgba(0, 0, 0, 0.50)',
    muted: 'rgba(0, 0, 0, 0.30)',
  }
};
```

### Typography Scale

```javascript
const TYPOGRAPHY = {
  largeTitle: { size: 34, weight: '700', tracking: -0.8 },
  title1: { size: 28, weight: '700', tracking: -0.6 },
  title2: { size: 22, weight: '600', tracking: -0.4 },
  title3: { size: 20, weight: '600', tracking: -0.3 },
  headline: { size: 17, weight: '600', tracking: -0.2 },
  body: { size: 17, weight: '400', tracking: 0 },
  callout: { size: 16, weight: '400', tracking: 0 },
  subheadline: { size: 15, weight: '500', tracking: 0.1 },
  footnote: { size: 13, weight: '500', tracking: 0.1 },
  caption1: { size: 12, weight: '500', tracking: 0.2 },
  caption2: { size: 11, weight: '600', tracking: 0.3 },
};
```

### Glassmorphism Components

```javascript
const GLASS_STYLES = {
  card: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(40px) saturate(180%)',
    borderRadius: 24,
    border: '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
  },

  cardSubtle: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(30px) saturate(150%)',
    borderRadius: 20,
    border: '1px solid rgba(0, 0, 0, 0.04)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
  },

  floating: {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(50px) saturate(200%)',
    borderRadius: 28,
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12), 0 12px 24px rgba(0, 0, 0, 0.08)',
  },

  pill: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px)',
    borderRadius: 100,
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },

  input: {
    background: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
    border: '1px solid rgba(0, 0, 0, 0.06)',
    padding: 16,
  }
};
```

### Animation Springs

```javascript
const SPRINGS = {
  bouncy: { damping: 8, mass: 0.5, stiffness: 100 },
  snappy: { damping: 15, mass: 0.5, stiffness: 300 },
  smooth: { damping: 20, mass: 1, stiffness: 100 },
};

const HAPTICS = {
  light: 'selection',
  medium: 'impactMedium',
  success: 'notificationSuccess',
  warning: 'notificationWarning',
};
```

---

## SCREENS TO IMPLEMENT

### 1. HOME SCREEN (Dashboard)

**Purpose**: Daily overview and quick actions

**Layout**:
```
┌─────────────────────────────────┐
│  9:41          ●●● ■■■ 100%    │ ← Status bar
├─────────────────────────────────┤
│                                 │
│  Good morning, Sarah            │ ← Greeting
│  Here's your daily checklist    │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🎯 Today's Tasks      3/5   ││ ← Glass card
│  │ ☐ Morning cream (arms)      ││
│  │ ☐ Evening cream (trunk)     ││
│  │ ☑ Take weekly photo         ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📊 PASI Score         12.4  ││ ← Progress card
│  │ ↓32% from 3 months ago      ││
│  │ [═══════════░░░░] Moderate  ││
│  │ [Line chart: 90-day trend]  ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🔥 7-Day Streak!            ││ ← Streak badge
│  │ Keep it up - 3 more for     ││
│  │ your next milestone!        ││
│  └─────────────────────────────┘│
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │ 📸   │ │ 💊   │ │ 📋   │    │ ← Quick actions
│  │Photo │ │ Meds │ │Report│    │
│  └──────┘ └──────┘ └──────┘    │
│                                 │
├─────────────────────────────────┤
│  🏠   📸   📊   ⚙️              │ ← Tab bar
└─────────────────────────────────┘
```

**Interactions**:
- Pull-to-refresh with spring bounce
- Tap task → checkmark animation + haptic
- Tap PASI card → expand to full history
- Long-press streak → share achievement

---

### 2. PHOTO CAPTURE SCREEN (Ghost Overlay)

**Purpose**: Consistent, aligned progress photos

**States**: Selection → Camera → Ghost Overlay → Capture → Notes → Upload

**Ghost Overlay View**:
```
┌─────────────────────────────────┐
│  ✕                    ⚙️        │ ← Close / Settings
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │    ┌───┬───┬───┐            ││ ← 3x3 grid overlay
│  │    │   │   │   │            ││
│  │    ├───┼───┼───┤            ││
│  │    │ 👻│   │   │ ← Ghost    ││ ← Previous photo at 50%
│  │    ├───┼───┼───┤            ││
│  │    │   │   │   │            ││
│  │    └───┴───┴───┘            ││
│  │                             ││
│  │  Live camera feed behind    ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  Ghost Opacity                  │
│  [○─────────●─────────○] 50%   │ ← Slider 20-80%
│                                 │
│  ┌─────────────────────────────┐│
│  │         ◉ Capture           ││ ← Shutter button
│  └─────────────────────────────┘│
│                                 │
│  Left Arm  ▾                    │ ← Body part selector
│                                 │
└─────────────────────────────────┘
```

**Key Features**:
- Ghost image: Previous photo superimposed at adjustable opacity
- Alignment grid: 3x3 rule-of-thirds overlay
- Opacity slider: 20-80% range with haptic feedback at extremes
- Body part picker: Scalp, Face, Left Arm, Right Arm, Trunk, Legs
- Flash animation on capture
- Notes screen: "After beach weekend", "Started new treatment"

**Technical**:
```javascript
// Ghost overlay implementation
const GhostOverlay = ({ previousImage, opacity }) => (
  <View style={styles.overlayContainer}>
    <Image
      source={{ uri: previousImage }}
      style={[styles.ghostImage, { opacity: opacity / 100 }]}
    />
    <View style={styles.alignmentGrid}>
      {/* 3x3 grid lines */}
    </View>
  </View>
);
```

---

### 3. PASI RESULT SCREEN

**Purpose**: Display AI-generated severity score

**Layout**:
```
┌─────────────────────────────────┐
│  ← Back            Share 📤     │
├─────────────────────────────────┤
│                                 │
│         PASI Score              │
│           12.4                  │ ← Large display
│         Moderate                │
│                                 │
│  ┌─────────────────────────────┐│
│  │ Component Breakdown          ││
│  │                              ││
│  │ Erythema    ████░░  3.2/4   ││
│  │ Induration  ███░░░  2.8/4   ││
│  │ Scaling     ████░░  3.1/4   ││
│  │ Area        ███░░░  3.3/6   ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Before ←───●───→ After      ││ ← Comparison slider
│  │ ┌─────────┐ ┌─────────┐     ││
│  │ │ Mar 15  │ │ Jun 20  │     ││
│  │ │  18.2   │ │  12.4   │     ││
│  │ └─────────┘ └─────────┘     ││
│  │         ↓32% improvement    ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 90-Day Trend                 ││
│  │ [Line chart with data pts]  ││
│  └─────────────────────────────┘│
│                                 │
│  AI Confidence: 94%             │
│                                 │
└─────────────────────────────────┘
```

**Color Coding**:
- 0-5: Mild → Green (#30D158)
- 5-12: Moderate → Yellow (#FFD60A)
- 12-20: Severe → Orange (#FF9F0A)
- 20+: Very Severe → Red (#FF453A)

---

### 4. MEDICATION SCREEN

**Purpose**: Adherence tracking with gamification

**Layout**:
```
┌─────────────────────────────────┐
│  Medications           Today    │
├─────────────────────────────────┤
│                                 │
│  🔥 7-Day Streak                │
│  ████████████████░░░░ 70%      │ ← Progress to milestone
│  3 more days to Bronze Badge!   │
│                                 │
│  ┌─────────────────────────────┐│
│  │ Morning Routine     8:30 AM ││
│  │                              ││
│  │ ☑ Clobetasol - Scalp        ││ ← Checked = green
│  │ ☐ Calcipotriene - Arms      ││ ← Unchecked = outline
│  │ ☐ Moisturizer - Full body   ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ Evening Routine     9:00 PM ││
│  │                              ││
│  │ ☐ Tacrolimus - Face         ││
│  │ ☐ Coal tar - Trunk          ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🏆 Achievements              ││
│  │ 🥉 7-day  🥈 14-day  🔒 30  ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

**Interactions**:
1. Tap checkbox →
2. Checkmark scales up (1.0 → 1.3 → 1.0)
3. Color transitions gray → green
4. Confetti burst (50 particles)
5. Streak counter updates
6. Success haptic

**Confetti Physics**:
```javascript
const Confetti = ({ count = 50 }) => {
  const particles = Array(count).fill(0).map((_, i) => ({
    id: i,
    x: Math.random() * width,
    y: -20,
    angle: Math.random() * 360,
    velocity: 300 + Math.random() * 200,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 720,
    color: ['#FF453A', '#30D158', '#0A84FF', '#FFD60A', '#BF5AF2'][i % 5],
    size: 8 + Math.random() * 8,
  }));

  // Physics: gravity 800, air resistance 0.98
};
```

---

### 5. MENTAL HEALTH SCREENING (PHQ-9)

**Purpose**: Depression/anxiety assessment

**Question Screen**:
```
┌─────────────────────────────────┐
│  ✕              Question 3/9    │
├─────────────────────────────────┤
│                                 │
│  Over the last 2 weeks, how     │
│  often have you been bothered   │
│  by the following?              │
│                                 │
│  ┌─────────────────────────────┐│
│  │                              ││
│  │  "Feeling tired or having   ││
│  │   little energy"            ││
│  │                              ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ○ Not at all          (0)   ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │ ○ Several days        (1)   ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │ ○ More than half      (2)   ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │ ● Nearly every day    (3)   ││ ← Selected
│  └─────────────────────────────┘│
│                                 │
│  [●●●○○○○○○] Progress           │
│                                 │
│  ┌─────────────────────────────┐│
│  │         Next →              ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

**Results Screen** (Score 10-14: Moderate):
```
┌─────────────────────────────────┐
│  Your Wellness Check            │
├─────────────────────────────────┤
│                                 │
│         PHQ-9 Score             │
│            12                   │
│       Moderate Symptoms         │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 💙 You're not alone          ││
│  │                              ││
│  │ 1 in 5 people with psoriasis││
│  │ experience similar feelings. ││
│  │                              ││
│  │ Consider sharing these       ││
│  │ results with your provider.  ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📞 Crisis Resources          ││
│  │ 988 Suicide & Crisis Lifeline││
│  │ Available 24/7               ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │    Share with Provider      ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │    View Coping Strategies   ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

### 6. FLARE-UP ALERT SCREEN

**Purpose**: Predictive risk warning

**Alert State**:
```
┌─────────────────────────────────┐
│  ← Back                         │
├─────────────────────────────────┤
│                                 │
│  ⚠️ Flare-Up Risk Detected      │
│                                 │
│  ┌─────────────────────────────┐│
│  │                              ││
│  │      🌡️ Risk Level          ││
│  │                              ││
│  │        ┌───────┐             ││
│  │        │  70%  │ HIGH        ││ ← Thermometer
│  │        │ █████ │             ││
│  │        │ █████ │             ││
│  │        │ █████ │             ││
│  │        │ ░░░░░ │             ││
│  │        │ ░░░░░ │             ││
│  │        └───────┘             ││
│  │                              ││
│  │  Next 7 days: High risk      ││
│  │                              ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📊 Contributing Factors      ││
│  │                              ││
│  │ 🌧️ Cold weather forecast     ││
│  │ 💊 Missed 3 applications     ││
│  │ 😰 Elevated stress (5 days)  ││
│  │ 😴 Poor sleep quality        ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 💡 Recommendations           ││
│  │                              ││
│  │ • Increase topical to 2x/day││
│  │ • Use indoor humidifier      ││
│  │ • Schedule stress management ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │    Share with Provider      ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

### 7. TRIGGERS SCREEN

**Purpose**: Multi-modal trigger correlation

**Layout**:
```
┌─────────────────────────────────┐
│  Triggers & Patterns            │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📊 Your Top Triggers         ││
│  │                              ││
│  │ Cold Weather    ████████ 85%││
│  │ Stress         ███████░ 72% ││
│  │ Alcohol        ██████░░ 58% ││
│  │ Poor Sleep     █████░░░ 51% ││
│  │ Dairy          ████░░░░ 43% ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📝 Log Today                 ││
│  │                              ││
│  │ Stress Level                 ││
│  │ [1][2][3][4][●][6][7][8][9] ││
│  │                              ││
│  │ Sleep Hours     ┌───────┐   ││
│  │                 │  7.5  │   ││
│  │                 └───────┘   ││
│  │                              ││
│  │ + Add Food Entry             ││
│  │ + Add Custom Trigger         ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🔗 Connected Sources         ││
│  │ ☑ Weather API    ☑ Apple    ││
│  │ ☐ Calendar       Health     ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

### 8. SMART REMINDERS SCREEN

**Purpose**: ML-optimized notification timing

**Layout**:
```
┌─────────────────────────────────┐
│  Smart Reminders                │
├─────────────────────────────────┤
│                                 │
│  Based on your 30-day patterns, │
│  here are your optimal times:   │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🌅 Morning                   ││
│  │                              ││
│  │ 8:30 AM                      ││
│  │ After your morning shower    ││
│  │                              ││
│  │ Confidence: ████████░░ 94%  ││
│  │                              ││
│  │        [ Enable ]            ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🌙 Evening                   ││
│  │                              ││
│  │ 9:45 PM                      ││
│  │ Highest adherence window     ││
│  │                              ││
│  │ Confidence: ███████░░░ 87%  ││
│  │                              ││
│  │        [ Enable ]            ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📱 Preview Notification      ││
│  │ ┌───────────────────────┐   ││
│  │ │ 🧴 PsoriAssist        │   ││
│  │ │ Time for your evening │   ││
│  │ │ treatment routine!    │   ││
│  │ └───────────────────────┘   ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

## NAVIGATION STRUCTURE

```
Tab Bar (5 items):
├── 🏠 Home (Dashboard)
├── 📸 Photo (Capture)
├── 📊 Insights (Triggers/Trends)
├── 💊 Medications
└── ⚙️ Settings

Settings Menu:
├── Profile & Treatment Plan
├── Notifications & Reminders
├── Provider Connections
├── Screening History
│   ├── Mental Health (PHQ-9/GAD-7)
│   └── PsA Screening (PEST)
├── Data & Privacy
└── Help & About
```

---

## INTERACTIONS & ANIMATIONS

### Pull-to-Refresh
```javascript
const pullToRefresh = {
  threshold: 80,
  animation: {
    type: 'spring',
    damping: 8,
    stiffness: 100,
  },
  haptic: 'impactMedium',
  states: ['pull', 'release', 'refreshing', 'complete'],
};
```

### Swipe Navigation
```javascript
const swipeGesture = {
  direction: 'horizontal',
  threshold: 50,
  animation: { duration: 300, easing: 'easeOut' },
  haptic: 'selectionChanged',
};
```

### Checkbox Animation
```javascript
const checkboxAnimation = {
  unchecked: { scale: 1, backgroundColor: 'transparent' },
  checking: { scale: 1.3, backgroundColor: '#30D158' },
  checked: { scale: 1, backgroundColor: '#30D158' },
  duration: 400,
  confetti: true,
  haptic: 'notificationSuccess',
};
```

### Card Press
```javascript
const cardPress = {
  onPressIn: { scale: 0.98, opacity: 0.9 },
  onPressOut: { scale: 1, opacity: 1 },
  duration: 150,
};
```

---

## DATA MODELS

```typescript
interface User {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  treatmentPlan: Treatment[];
  providers: Provider[];
}

interface Treatment {
  id: string;
  name: string;
  type: 'topical' | 'systemic' | 'biologic';
  frequency: 'daily' | 'weekly' | 'biweekly';
  bodyParts: string[];
  times: string[];
}

interface PhotoEntry {
  id: string;
  timestamp: Date;
  bodyPart: string;
  imageUri: string;
  notes?: string;
  pasiScore?: PasiScore;
}

interface PasiScore {
  total: number;
  erythema: number;
  induration: number;
  desquamation: number;
  area: number;
  confidence: number;
  trend: 'improving' | 'stable' | 'worsening';
}

interface FlareAlert {
  riskLevel: number; // 0-100
  factors: {
    name: string;
    icon: string;
    impact: number;
  }[];
  recommendations: string[];
  timestamp: Date;
}

interface MentalHealthScore {
  type: 'PHQ9' | 'GAD7';
  score: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  timestamp: Date;
  responses: number[];
}
```

---

## IMPLEMENTATION NOTES

### Performance Requirements
- Cold start: <2 seconds
- Photo capture: <500ms shutter
- PASI processing: <30 seconds
- 60fps animations
- Offline-first with sync

### Accessibility
- VoiceOver/TalkBack support
- Dynamic Type (iOS) / Large Text (Android)
- High contrast mode
- Reduced motion support
- Minimum touch targets: 44x44pt

### Privacy & Security
- Local-first photo storage option
- End-to-end encryption for sync
- Biometric authentication
- HIPAA compliance ready
- User-controlled data sharing

---

## SAMPLE CODE STRUCTURE

```
/src
├── /components
│   ├── /common
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── GlassCard.tsx
│   │   ├── Checkbox.tsx
│   │   └── ProgressBar.tsx
│   ├── /screens
│   │   ├── HomeScreen.tsx
│   │   ├── PhotoScreen.tsx
│   │   ├── PasiResultScreen.tsx
│   │   ├── MedicationScreen.tsx
│   │   ├── MentalHealthScreen.tsx
│   │   ├── FlareAlertScreen.tsx
│   │   ├── TriggersScreen.tsx
│   │   └── SettingsScreen.tsx
│   └── /animations
│       ├── Confetti.tsx
│       ├── PullToRefresh.tsx
│       └── CheckmarkAnimation.tsx
├── /hooks
│   ├── useHaptics.ts
│   ├── useGhostOverlay.ts
│   └── useAnimatedValue.ts
├── /theme
│   ├── colors.ts
│   ├── typography.ts
│   ├── glass.ts
│   └── animations.ts
├── /services
│   ├── pasiAnalysis.ts
│   ├── flarePredictor.ts
│   └── storage.ts
└── /utils
    └── calculations.ts
```

---

## OUTPUT REQUIREMENTS

Generate a complete, production-ready React Native prototype with:

1. **All 8 core screens** fully implemented
2. **Glassmorphism design system** with blur effects
3. **Authentic iOS interactions** (swipe, haptics, springs)
4. **Ghost overlay** for photo comparison
5. **Confetti celebrations** for medication adherence
6. **Chart visualizations** for PASI trends
7. **Form flows** for PHQ-9 screening
8. **Alert system** for flare predictions

The prototype should be immediately runnable and demonstrate portfolio-quality design execution.

---

## REFERENCE MATERIALS

**Research**: 25 patient interviews, 12 clinician interviews, 75+ peer-reviewed studies
**Competitors Analyzed**: 15 psoriasis apps (MARS-G evaluated)
**Design Inspiration**: Apple Health, Oura Ring, Headspace, Calm
**Clinical Validation**: PASI, PHQ-9, GAD-7, PEST instruments

---

*This prompt encapsulates 18 months of research and design work for PsoriAssist, ready for AI-assisted prototype generation.*
