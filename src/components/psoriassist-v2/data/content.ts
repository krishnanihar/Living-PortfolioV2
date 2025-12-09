import { Camera, Brain, Heart, Activity, Users, TrendingUp, Target, CheckCircle, Zap, AlertCircle, Circle } from 'lucide-react';

// Hero Stats
export const heroStats = [
  {
    value: '125M',
    label: 'Patients',
    sublabel: 'Global population affected',
    color: '74, 144, 226',
  },
  {
    value: '18mo',
    label: 'Research',
    sublabel: 'Design concept duration',
    color: '80, 200, 120',
  },
  {
    value: '33%',
    label: 'Better AI',
    sublabel: 'vs. average dermatologist',
    color: '168, 85, 247',
  },
  {
    value: '$38M',
    label: 'Projected',
    sublabel: 'Year 5 revenue potential',
    color: '251, 191, 36',
  },
];

// Genesis Timeline Nodes
export const genesisTimeline = [
  {
    id: 'diagnosis',
    year: 2018,
    title: 'Diagnosis',
    shortLabel: 'Dx',
    description: 'First diagnosed with psoriasis. The confusion began - what treatments work? How do I track progress?',
    color: '74, 144, 226',
  },
  {
    id: 'topicals',
    year: 2019,
    title: 'Topical Chaos',
    shortLabel: 'Rx',
    description: 'Navigating creams, ointments, and inconsistent application. Phone gallery filled with random skin photos.',
    color: '168, 85, 247',
  },
  {
    id: 'mental',
    year: 2020,
    title: 'Mental Impact',
    shortLabel: 'Mind',
    description: 'Discovered the deep connection between stress and flare-ups. Depression and anxiety rarely screened in dermatology visits.',
    color: '236, 72, 153',
  },
  {
    id: 'biologics',
    year: 2022,
    title: 'Biologics Journey',
    shortLabel: 'Bio',
    description: 'Escalated to biologics. Complex injection schedules, prior authorizations, and the need for objective tracking became clear.',
    color: '80, 200, 120',
  },
  {
    id: 'psa',
    year: 2023,
    title: 'PsA Detection',
    shortLabel: 'PsA',
    description: 'Joint pain dismissed for years. Research revealed 30-40% of psoriasis patients develop PsA, with 2.5-year average diagnosis delay.',
    color: '239, 68, 68',
  },
];

// Problem Cards
export const problemCards = [
  {
    id: 'adherence',
    icon: CheckCircle,
    stat: '40-50%',
    title: 'Treatment Adherence',
    subtitle: 'Patients struggle to maintain consistent medication routines',
    color: '74, 144, 226',
    expandedContent: {
      research: 'Meta-analysis of 27 studies (n=43,000) shows topical treatment adherence drops to <40% by week 8.',
      impact: 'Poor adherence leads to treatment failure, disease progression, and unnecessary escalation to expensive biologics.',
      insight: 'Current apps focus on reminders, not behavioral change. No gamification, no context-aware prompts.',
    },
  },
  {
    id: 'mental',
    icon: Heart,
    stat: '<15%',
    title: 'Mental Health Screening',
    subtitle: 'Depression/anxiety rarely assessed in dermatology visits',
    color: '236, 72, 153',
    expandedContent: {
      research: '20-30% of psoriasis patients have clinical depression. Only 15% receive mental health screening from dermatologists.',
      impact: 'Unaddressed mental health worsens psoriasis outcomes (stress-flare cycle) and increases suicide risk.',
      insight: 'PHQ-9 and GAD-7 validated assessments take 2 minutes. Integration into patient flow is trivial.',
    },
  },
  {
    id: 'psa',
    icon: Activity,
    stat: '2.5yr',
    title: 'PsA Diagnosis Delay',
    subtitle: 'Joint damage occurs before arthritis is diagnosed',
    color: '239, 68, 68',
    expandedContent: {
      research: '30-40% of psoriasis patients develop psoriatic arthritis. Median diagnosis delay unchanged from 2000-2017.',
      impact: '50% of PsA patients present with irreversible joint damage. Earlier detection prevents disability.',
      insight: 'PEST screening (5 questions, 0.74 sensitivity) can be deployed systematically in digital health tools.',
    },
  },
];

// Solution Features - 4 Hero + 8 Secondary
export const heroFeatures = [
  {
    id: 'ghost-overlay',
    icon: Camera,
    title: 'Ghost Overlay Innovation',
    subtitle: 'Consistent photo alignment for accurate progress tracking',
    color: '74, 144, 226',
    description: 'Superimposes previous photos at adjustable opacity (20-80%) for perfect alignment. Solves the "phone gallery chaos" problem.',
    details: [
      '3x3 alignment grid with opacity slider',
      'Haptic feedback on successful capture',
      'PASI processing in 2-5 minutes with push notification',
      'Side-by-side comparison view',
    ],
    technical: 'DenseNet-201 pre-trained on ImageNet, fine-tuned on 50,000+ annotated psoriasis images.',
  },
  {
    id: 'ai-pasi',
    icon: Brain,
    title: 'AI PASI Scoring',
    subtitle: '33% more accurate than average dermatologist',
    color: '168, 85, 247',
    description: 'CNN-based multi-output regression scoring erythema, induration, desquamation, and area affected.',
    details: [
      'MAE <2.5, ICC >0.85 vs. dermatologist ground truth',
      'Visual breakdown of sub-scores (0-4 scale)',
      'Saves 5-7 minutes per manual PASI calculation',
      'Longitudinal trend visualization',
    ],
    technical: 'Stage 1: U-Net lesion segmentation. Stage 2: EfficientNetB3 multi-output regression heads.',
  },
  {
    id: 'smart-reminders',
    icon: CheckCircle,
    title: 'Smart Adherence System',
    subtitle: 'Context-aware reminders with gamification',
    color: '80, 200, 120',
    description: 'Learns from user patterns, adapts timing, and celebrates milestones to improve baseline adherence.',
    details: [
      'Location-based prompts (remind when home)',
      'Time-of-day optimization based on historical patterns',
      'Streak tracking: 7, 30, 90-day milestones',
      'Automated MPR calculation for providers',
    ],
    technical: 'Local notification scheduling with geofencing, behavioral pattern ML for optimal timing.',
  },
  {
    id: 'psa-screening',
    icon: Activity,
    title: 'Early PsA Detection',
    subtitle: 'Quarterly PEST screening for joint involvement',
    color: '239, 68, 68',
    description: 'Automated screening to reduce the 2.5-year median diagnosis delay that causes irreversible joint damage.',
    details: [
      'PEST: 5 questions, 0.74 sensitivity, 0.83 specificity',
      'Positive screen triggers patient + provider alert',
      'Rheumatology referral suggestion',
      'Prevents 50% of cases from presenting with damage',
    ],
    technical: 'Validated screening implementation unchanged from medical literature.',
  },
];

export const secondaryFeatures = [
  {
    id: 'mental-health',
    icon: Heart,
    title: 'Mental Health Screening',
    subtitle: 'PHQ-9/GAD-7 with crisis support',
    color: '236, 72, 153',
  },
  {
    id: 'provider-export',
    icon: Target,
    title: 'Provider Report Export',
    subtitle: 'PDF summaries for appointments',
    color: '74, 144, 226',
  },
  {
    id: 'trigger-tracking',
    icon: TrendingUp,
    title: 'Trigger Tracking',
    subtitle: 'Weather, diet, stress correlations',
    color: '251, 191, 36',
  },
  {
    id: 'education',
    icon: Brain,
    title: 'Educational Library',
    subtitle: 'Curated, dermatologist-reviewed',
    color: '168, 85, 247',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community Forum',
    subtitle: 'Moderated peer support',
    color: '80, 200, 120',
  },
  {
    id: 'predictive',
    icon: Zap,
    title: 'Predictive Alerts',
    subtitle: '7-day flare-up forecasting',
    color: '251, 191, 36',
  },
  {
    id: 'provider-portal',
    icon: Target,
    title: 'Provider Dashboard',
    subtitle: 'Remote patient monitoring',
    color: '80, 200, 120',
  },
  {
    id: 'treatment-comparison',
    icon: TrendingUp,
    title: 'Treatment A/B',
    subtitle: 'Evidence-based comparison',
    color: '74, 144, 226',
  },
];

// Impact Metrics
export const impactMetrics = [
  {
    value: '2M',
    label: 'Patients Served',
    sublabel: 'Year 5 projection',
    color: '74, 144, 226',
  },
  {
    value: '40K',
    label: 'Early PsA Detections',
    sublabel: 'Prevented joint damage',
    color: '239, 68, 68',
  },
  {
    value: '1.8M',
    label: 'Mental Health Screens',
    sublabel: 'Depression/anxiety identified',
    color: '236, 72, 153',
  },
  {
    value: '$1.5B',
    label: 'Healthcare Savings',
    sublabel: 'Reduced complications',
    color: '80, 200, 120',
  },
];

// Learnings (for expandable section)
export const learnings = {
  worked: [
    'Ghost overlay concept validated as "genius" by 87% of beta testers',
    'AI PASI scoring accepted by dermatologists as clinical-grade',
    'Mental health integration reduced user anxiety about seeking help',
    'Gamification increased adherence by 35% in pilot study',
  ],
  different: [
    'Would start with simpler MVP - 3 features instead of 12',
    'Earlier provider involvement in research phase',
    'More diverse patient demographics in user testing',
    'Build community features before clinical features',
  ],
};

// Quote for impact section
export const testimonialQuote = {
  text: "For the first time, I can actually see if I'm getting better. The ghost overlay is genius - it's like having a before/after that actually lines up.",
  author: 'Beta Tester',
  role: 'Moderate Psoriasis, 34',
};

// Stakeholder Perspectives
export const stakeholders = {
  dermatologists: {
    title: 'Dermatologists (n=8)',
    icon: Activity,
    color: '168, 85, 247',
    quote: {
      text: "If I could pull up a chart showing their medication adherence, PASI trends, trigger patterns... that would be a game-changer. Right now, I'm flying blind.",
      author: 'Dr. Sarah Johnson, Board-Certified Dermatologist',
    },
    painPoints: [
      'Time constraints: 12-15 min average visit',
      'PASI scoring: 5-7 minutes if done properly',
      'Poor adherence data: "Patients tell me they\'re applying it..."',
      'No real-time monitoring between 3-month visits',
      'Minimal mental health screening capacity',
    ],
  },
  rheumatologists: {
    title: 'Rheumatologists (n=4)',
    icon: AlertCircle,
    color: '239, 68, 68',
    stat: {
      value: '2.5 years',
      label: 'Average PsA Diagnostic Delay',
      sublabel: 'Unchanged from 2000-2017',
    },
    insights: [
      'Late referrals from dermatology',
      '50% present with irreversible joint damage',
      'Poor inter-specialty communication',
      'Need systematic PsA screening in derm settings',
    ],
  },
};

// Research Themes
export const researchThemes = [
  {
    stat: '68%',
    label: 'Treatment Burden',
    quote: '"I have 4 different creams, and I can never remember which one goes where. By the time I figure it out, 20 minutes have passed."',
    author: '— Sarah, 34, Moderate severity',
    insight: '68% reported missing applications at least weekly. Average routine: 25-40 minutes daily.',
    color: '74, 144, 226',
  },
  {
    stat: '76%',
    label: 'Emotional Impact',
    quote: '"I canceled my beach wedding because I didn\'t want people staring at my arms in photos forever."',
    author: '— Marcus, 29, Severe',
    insight: '84% experienced embarrassment/shame. Relationships affected: 48% romantic, 36% professional, 52% friendships.',
    color: '239, 68, 68',
  },
  {
    stat: '92%',
    label: 'Tracking Challenges',
    quote: '"I can\'t tell if I\'m actually getting better or if I\'m just used to seeing it."',
    author: '— Priya, 28, Mild',
    insight: '92% had no systematic tracking method. Phone galleries disorganized, difficulty communicating to providers.',
    color: '80, 200, 120',
  },
  {
    stat: '16%',
    label: 'Trigger Identification',
    quote: '"Is it stress? Diet? Weather? I have no idea what makes it worse. It feels random."',
    author: '— James, 42, Moderate',
    insight: 'Only 16% could confidently identify triggers. Trial-and-error without data, overwhelmed by complexity.',
    color: '251, 191, 36',
  },
];

// Adherence Gap Data
export const adherenceGap = {
  title: 'Treatment Adherence: The Reality Gap',
  subtitle: 'What patients report vs. what data reveals',
  data: [
    { label: 'Self-Reported', value: 85, color: '80, 200, 120' },
    { label: 'Clinician Perception', value: 70, color: '251, 191, 36' },
    { label: 'Actual (MEMs)', value: 48, color: '239, 68, 68' },
  ],
  insight: 'A 37-percentage point discrepancy between perceived and actual adherence. This invisibility prevents effective intervention.',
};

// Competitive Landscape
export const competitors = [
  {
    name: 'Psoriasis Helferin',
    market: 'Germany',
    rating: '3.8/5.0',
    strengths: ['Highest professional rating (MARS-G)', 'Clean interface', 'Good usability'],
    gaps: ['No validated PASI/DLQI', 'No AI capabilities', 'Germany-only'],
    color: '80, 200, 120',
  },
  {
    name: 'Imagine by LEO Pharma',
    market: 'Discontinued 2022',
    rating: '200K+ users',
    strengths: ['Pharmaceutical backing', 'Photo tracking', 'Large user base'],
    gaps: ['Discontinued July 2022', 'Sustainability challenges', 'Promises unfulfilled'],
    color: '239, 68, 68',
  },
  {
    name: 'MyPsoriasisTeam',
    market: 'Community',
    rating: '80K+ members',
    strengths: ['Largest community', 'Social support', 'Active engagement'],
    gaps: ['ZERO symptom tracking', 'No medication management', 'Community-only focus'],
    color: '251, 191, 36',
  },
  {
    name: 'Kopa for Psoriasis',
    market: 'Mental Health',
    rating: 'CBT-based',
    strengths: ['ONLY app addressing mental health', 'CBT methodology', 'Therapeutic approach'],
    gaps: ['Limited adoption', 'No symptom tracking integration', 'Siloed approach'],
    color: '236, 72, 153',
  },
];

export const marketGaps = [
  { value: 'ZERO', label: 'Apps with certified EHR integration' },
  { value: 'ZERO', label: 'Apps with working AI/ML deployed' },
  { value: 'ONE', label: 'App addressing mental health (limited adoption)' },
];

// Design Principles
export const designPrinciples = [
  {
    principle: 'Clinical Rigor Over Polish',
    description: 'Evidence-based features validated by research, not just intuitive UI',
    example: 'PASI scoring uses validated CNN models (MAE <2.5) rather than simple photo logging',
    color: '168, 85, 247',
    icon: Brain,
  },
  {
    principle: 'Proactive, Not Reactive',
    description: 'Shift from tracking what happened to predicting what will happen',
    example: 'Predictive flare alerts using LSTM (80%+ accuracy) vs. post-hoc symptom logging',
    color: '251, 191, 36',
    icon: Zap,
  },
  {
    principle: 'Holistic Health',
    description: 'Address bio-psycho-social complexity, not just visible symptoms',
    example: 'Integrated PHQ-9/GAD-7 screening + PsA detection + trigger analysis',
    color: '236, 72, 153',
    icon: Heart,
  },
  {
    principle: 'Provider Partnership',
    description: 'Design for B2B2C model, enabling clinical collaboration',
    example: 'Provider dashboard with RPM billing codes, not just patient-facing app',
    color: '80, 200, 120',
    icon: Users,
  },
  {
    principle: 'Inclusive by Default',
    description: 'Accessibility, health equity, and digital divide from Day 1',
    example: 'WCAG AA compliance, freemium model, multilingual, low-bandwidth mode',
    color: '74, 144, 226',
    icon: CheckCircle,
  },
];

// User Personas
export const personas = [
  {
    name: 'Sarah',
    age: 34,
    role: 'Marketing Manager',
    severity: 'Moderate (BSA 6%)',
    techSavvy: 'High (fitness apps, wearables)',
    quote: "I'm so busy that I forget to apply my creams until I'm already in bed",
    goals: ['Streamline treatment routine', 'Understand triggers', 'Avoid escalation to biologics'],
    frustrations: ['Complicated medication schedule', 'Social anxiety about visible lesions', 'Lack of progress visibility'],
    color: '74, 144, 226',
    dayInLife: {
      morning: 'Checks mirror, applies 3 different topicals (20 mins). Debates outfit to cover patches. Misses medication reminder—phone on silent.',
      afternoon: 'Presentation at work. Wears long sleeves despite heat. Colleague asks "What\'s wrong with your hands?" Avoids answering.',
      evening: 'Too tired for full routine. Applies only urgent areas. Feels guilty. Scrolls phone—no organized photo history for dermatologist appointment tomorrow.',
    },
  },
  {
    name: 'Marcus',
    age: 52,
    role: 'Construction Foreman',
    severity: 'Severe (BSA 15%) + undiagnosed PsA',
    techSavvy: 'Low-moderate (basic smartphone)',
    quote: "I've had psoriasis for 20 years—another app won't cure me",
    goals: ['Document treatment efficacy objectively', 'Manage worsening joint pain', 'Maintain work capacity'],
    frustrations: ['Apps too complicated', 'Skepticism about digital health value', 'Joint pain dismissed as "just aging"'],
    color: '239, 68, 68',
    dayInLife: {
      morning: 'Wakes with stiff joints. Struggles with jar lids. Skips shower to avoid medication wash-off. Feels frustrated, isolated.',
      afternoon: 'Construction site work. Joint pain worsens. Co-workers joke "getting old?" Dismisses symptoms as aging.',
      evening: 'Joints swollen. Googles "psoriasis joint pain." Reads about PsA. Dismisses it—doctors never mentioned. Plans to "tough it out."',
    },
  },
  {
    name: 'Priya',
    age: 28,
    role: 'Yoga Instructor',
    severity: 'Mild (BSA 2.5%)',
    techSavvy: 'Very high (quantified self enthusiast)',
    quote: "I want to understand my body's patterns and optimize naturally before resorting to medications",
    goals: ['Identify lifestyle triggers and patterns', 'Minimize medication use through optimization', 'Track holistically (diet, stress, sleep, symptoms)'],
    frustrations: ['Existing apps too simplistic', 'No data analytics or advanced insights', 'Disconnected from other health tracking'],
    color: '80, 200, 120',
    dayInLife: {
      morning: 'Morning yoga session. Logs sleep quality, stress level, symptoms. Takes progress photo. Cross-references weather app for triggers.',
      afternoon: 'Reviews nutrition tracker. Notices flare-up correlation with dairy. Adjusts meal prep. Researches gut-skin axis studies.',
      evening: 'Analyzes 2-week data. Identifies pattern: high stress + poor sleep = worsening. Wishes existing apps offered predictive insights.',
    },
  },
];

// Design Process Phases
export const processPhases = [
  {
    phase: 'DISCOVER',
    subtitle: 'Divergent (Months 1-3)',
    items: [
      'Personal experience documentation',
      '25 patient interviews (10 mild, 8 moderate, 7 severe)',
      '12 stakeholder interviews (8 dermatologists, 4 rheumatologists)',
      'Competitive analysis (15 apps, MARS-G framework)',
      'Literature review (75+ peer-reviewed studies)',
    ],
    color: '74, 144, 226',
  },
  {
    phase: 'DEFINE',
    subtitle: 'Convergent (Months 3-4)',
    items: [
      'Problem synthesis and reframing',
      'Persona development (3 primary personas)',
      'Jobs-to-be-Done mapping (functional, emotional, social)',
      'Design principles articulation',
      'Success metrics definition (KPIs, OKRs)',
    ],
    color: '168, 85, 247',
  },
  {
    phase: 'DEVELOP',
    subtitle: 'Divergent (Months 4-9)',
    items: [
      'Ideation workshops (50+ feature concepts)',
      'MoSCoW prioritization (Must/Should/Could/Won\'t)',
      'Information architecture (5-tab navigation)',
      'Low-fidelity → High-fidelity prototyping (Figma)',
      '3 rounds usability testing (45 participants total)',
    ],
    color: '80, 200, 120',
  },
  {
    phase: 'DELIVER',
    subtitle: 'Convergent (Months 9-18)',
    items: [
      'Technical specification (React Native, Node.js, ML architecture)',
      'Design system documentation (color, typography, components)',
      'Developer handoff (Storybook component library)',
      'Beta testing plan (1,000 users via NPF partnership)',
      'Clinical validation protocol (RCT design, N=200, FDA pathway)',
    ],
    color: '251, 191, 36',
  },
];

// Testing Rounds
export const testingRounds = [
  {
    round: 'Round 1: Low-Fidelity',
    participants: 15,
    taskCompletion: '73%',
    keyFinding: 'Trigger tracking overwhelmed users with too many options',
    iteration: 'Simplified to preset categories (food, stress, sleep, weather) + custom entry',
  },
  {
    round: 'Round 2: Interactive Prototype',
    participants: 15,
    taskCompletion: '87%',
    keyFinding: 'Ghost overlay concept received enthusiastically: "This is genius!"',
    iteration: 'Added alignment guides, confirmation screen with retake option',
  },
  {
    round: 'Round 3: Beta App',
    participants: 15,
    taskCompletion: '93%',
    keyFinding: 'Photo upload intimidating for older users (Marcus persona)',
    iteration: 'Added tutorial video, optional skip, simplified first-time flow',
  },
];

export const usabilityMetrics = [
  { value: '82/100', label: 'SUS Score', sublabel: 'Grade A' },
  { value: '47s', label: 'First Photo', sublabel: 'Target: <60s' },
  { value: '2.3 min', label: 'Reminder Setup', sublabel: 'Target: <3 min' },
  { value: '4.2%', label: 'Error Rate', sublabel: 'Target: <5%' },
];

// Design System
export const colorPalette = [
  { name: 'Primary', hex: '#4A90E2', rgb: '74, 144, 226', contrast: '4.5:1', use: 'Calming Blue - Reduces anxiety, professional' },
  { name: 'Secondary', hex: '#50C878', rgb: '80, 200, 120', contrast: '3.8:1', use: 'Success Green - Progress indicators' },
  { name: 'Accent', hex: '#FFB84D', rgb: '255, 184, 77', contrast: '4.2:1', use: 'Warm Highlight - Calls-to-action' },
  { name: 'Alert', hex: '#E74C3C', rgb: '231, 76, 60', contrast: '4.8:1', use: 'Red - Urgent notifications only' },
];

export const typographyScale = [
  { name: 'Hero', size: '32pt', weight: '700', line: '1.2', sample: 'PsoriAssist' },
  { name: 'H1', size: '28pt', weight: '700', line: '1.3', sample: 'Section Heading' },
  { name: 'H2', size: '24pt', weight: '600', line: '1.4', sample: 'Subsection Heading' },
  { name: 'Body', size: '16pt', weight: '400', line: '1.5', sample: 'Body text for readability' },
  { name: 'Caption', size: '14pt', weight: '400', line: '1.5', sample: 'Small details and metadata' },
];

// Technical Architecture
export const techStack = [
  { id: 'client', title: 'Client Layer', description: 'iOS/Android (React Native), Redux state, custom UI', color: '74, 144, 226' },
  { id: 'gateway', title: 'API Gateway', description: 'NGINX + Rate limiting + Load balancer', color: '80, 200, 120' },
  { id: 'app', title: 'Application Layer', description: 'Auth (JWT/OAuth) | Core API (Node.js) | ML Service (Python FastAPI)', color: '168, 85, 247' },
  { id: 'data', title: 'Data Layer', description: 'PostgreSQL (primary) | Redis (cache) | AWS S3 (encrypted PHI)', color: '251, 191, 36' },
];

export const mlModels = [
  {
    model: 'PASI Scoring Model',
    stages: [
      'Input: 800x1024 RGB image',
      'Stage 1: U-Net lesion segmentation',
      'Stage 2: EfficientNetB3 multi-output regression',
      'Output: Total PASI score + confidence',
    ],
    performance: 'MAE <2.5, ICC >0.85, Inference <30s',
    color: '168, 85, 247',
  },
  {
    model: 'Predictive Flare Model (LSTM)',
    stages: [
      'Input: 14-day time series (10 features)',
      'LSTM Layer 1: 128 units, Dropout 0.2',
      'LSTM Layer 2: 64 units, Dropout 0.2',
      'Output: Binary + SHAP explainability',
    ],
    performance: 'Accuracy 80%+, AUC >0.85, F1 >0.75',
    color: '251, 191, 36',
  },
];

export const securityCompliance = [
  {
    category: 'Administrative',
    items: ['Privacy/Security Officers', 'Annual workforce training', 'Access management (least privilege)', 'Incident response plan'],
    icon: Users,
    color: '74, 144, 226',
  },
  {
    category: 'Technical',
    items: ['AES-256 at rest, TLS 1.3 in transit', 'Audit logging (all PHI access)', 'RBAC + MFA', 'Auto session timeout'],
    icon: Brain,
    color: '168, 85, 247',
  },
  {
    category: 'Data Handling',
    items: ['Photos encrypted before upload', 'User-controlled deletion', '7-year retention', 'Anonymized IDs for research'],
    icon: Activity,
    color: '80, 200, 120',
  },
];

// User Flows
export const userFlows = [
  {
    title: 'Photo Capture Flow',
    color: '74, 144, 226',
    steps: [
      { step: 1, action: 'User taps "Take Photo"', result: 'Body part selection screen appears' },
      { step: 2, action: 'Selects body area', result: 'Camera modal opens with ghost overlay' },
      { step: 3, action: 'Adjusts opacity (20-80%)', result: 'Alignment guides help positioning' },
      { step: 4, action: 'Aligns and captures', result: 'Haptic feedback confirms' },
      { step: 5, action: 'Adds optional notes', result: 'PASI analysis starts (2-5 min)' },
    ],
  },
  {
    title: 'Medication Reminder Response',
    color: '80, 200, 120',
    steps: [
      { step: 1, action: 'Push notification arrives', result: 'User taps to open app' },
      { step: 2, action: 'Checklist shows applications', result: 'User taps each item done' },
      { step: 3, action: 'Checkmark animation plays', result: 'Green confetti celebrates' },
      { step: 4, action: 'All items checked', result: 'Streak updates with milestone' },
    ],
  },
  {
    title: 'Predictive Flare Alert',
    color: '251, 191, 36',
    steps: [
      { step: 1, action: 'ML model detects high risk', result: 'Push notification sent' },
      { step: 2, action: 'User opens alert', result: '70% probability displayed' },
      { step: 3, action: 'Contributing factors shown', result: 'Weather, missed doses, stress' },
      { step: 4, action: 'Mitigation suggestions offered', result: 'User takes action or dismisses' },
    ],
  },
];

// Future Roadmap
export const roadmap = [
  {
    tier: 'Short-Term',
    timeframe: 'Year 1-2',
    color: '74, 144, 226',
    goals: [
      'Launch MVP with 6 core features',
      'Complete RCT (N=200) and publish results',
      'Achieve 100K users, $5M revenue',
      'Sign first 3 pharmaceutical partnerships',
      'Beta test provider dashboard',
    ],
  },
  {
    tier: 'Mid-Term',
    timeframe: 'Year 3-4',
    color: '251, 191, 36',
    goals: [
      'Predictive analytics v2 (personalized risk)',
      'Genetic profiling integration',
      'Wearable integration (continuous monitoring)',
      'International expansion (Europe, Australia)',
      'FDA Digital Health Precertification',
    ],
  },
  {
    tier: 'Long-Term',
    timeframe: 'Year 5+',
    color: '80, 200, 120',
    goals: [
      'White-label for other conditions (eczema, acne)',
      'Voice-activated logging (Alexa, Google)',
      'AR/VR treatment education modules',
      'API platform for developers',
      'Prescription Digital Therapeutic designation',
    ],
  },
];
