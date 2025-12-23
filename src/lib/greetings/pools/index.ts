/**
 * Message Pools
 *
 * Greeting variations organized by context.
 * Each pool contains 3-5 variations with weighted randomization.
 */

import type { GreetingVariation, FollowUpQuestion, EngagementTier, TimeOfDay } from '../types';

// ============================================
// Time of Day Greetings
// ============================================

export const timeGreetings: Record<TimeOfDay, GreetingVariation[]> = {
  morning: [
    { id: 'time-m1', text: 'Morning!', weight: 10, tone: 'casual', length: 'short' },
    { id: 'time-m2', text: 'Good morning.', weight: 8, tone: 'professional', length: 'short' },
    { id: 'time-m3', text: 'Hey, early start?', weight: 5, tone: 'casual', length: 'short' },
    { id: 'time-m4', text: 'Coffee in hand?', weight: 4, tone: 'warm', length: 'short' },
  ],
  afternoon: [
    { id: 'time-a1', text: 'Hey there.', weight: 10, tone: 'casual', length: 'short' },
    { id: 'time-a2', text: 'Good afternoon.', weight: 7, tone: 'professional', length: 'short' },
    { id: 'time-a3', text: 'Hello!', weight: 8, tone: 'warm', length: 'short' },
    { id: 'time-a4', text: 'Hi!', weight: 6, tone: 'casual', length: 'short' },
  ],
  evening: [
    { id: 'time-e1', text: 'Evening.', weight: 10, tone: 'casual', length: 'short' },
    { id: 'time-e2', text: 'Good evening.', weight: 8, tone: 'professional', length: 'short' },
    { id: 'time-e3', text: 'Hey, winding down?', weight: 4, tone: 'warm', length: 'short' },
  ],
  night: [
    { id: 'time-n1', text: 'Burning the midnight oil?', weight: 10, tone: 'warm', length: 'short' },
    { id: 'time-n2', text: 'Late night exploration?', weight: 7, tone: 'curious', length: 'short' },
    { id: 'time-n3', text: 'Night owl, I see.', weight: 5, tone: 'casual', length: 'short' },
    { id: 'time-n4', text: 'Still at it?', weight: 4, tone: 'casual', length: 'short' },
  ],
};

// ============================================
// Visitor Status Greetings
// ============================================

export const newVisitorGreetings: GreetingVariation[] = [
  { id: 'new-1', text: "I'm Nihar's portfolio assistant.", weight: 10, tone: 'professional', length: 'short' },
  { id: 'new-2', text: "Welcome! I'm here to help you explore.", weight: 8, tone: 'warm', length: 'medium' },
  { id: 'new-3', text: "First time? Let me show you around.", weight: 6, tone: 'casual', length: 'short' },
  { id: 'new-4', text: "Nice to meet you!", weight: 5, tone: 'warm', length: 'short' },
];

export const returningVisitorGreetings: Record<EngagementTier, GreetingVariation[]> = {
  new: [
    { id: 'ret-n1', text: 'Welcome back.', weight: 10, tone: 'warm', length: 'short' },
  ],
  exploring: [
    { id: 'ret-e1', text: 'Welcome back!', weight: 10, tone: 'warm', length: 'short' },
    { id: 'ret-e2', text: 'Back for more?', weight: 7, tone: 'casual', length: 'short' },
    { id: 'ret-e3', text: 'Good to see you again.', weight: 8, tone: 'warm', length: 'short' },
  ],
  engaged: [
    { id: 'ret-g1', text: 'Good to see you again.', weight: 10, tone: 'warm', length: 'short' },
    { id: 'ret-g2', text: "You're back!", weight: 8, tone: 'casual', length: 'short' },
    { id: 'ret-g3', text: 'Hey, welcome back.', weight: 7, tone: 'casual', length: 'short' },
  ],
  power: [
    { id: 'ret-p1', text: 'Hey again!', weight: 10, tone: 'casual', length: 'short' },
    { id: 'ret-p2', text: 'The usual spot.', weight: 6, tone: 'casual', length: 'short' },
    { id: 'ret-p3', text: 'Back at it!', weight: 7, tone: 'casual', length: 'short' },
  ],
};

// ============================================
// Project Greetings
// ============================================

export const projectGreetings: Record<string, GreetingVariation[]> = {
  'air-india': [
    { id: 'proj-ai1', text: 'Checking out Air India DesignLAB?', weight: 10, tone: 'curious', length: 'short' },
    { id: 'proj-ai2', text: '450+ daily users and counting.', weight: 7, tone: 'professional', length: 'short' },
    { id: 'proj-ai3', text: "This one's my flagship work.", weight: 5, tone: 'warm', length: 'short' },
    { id: 'proj-ai4', text: 'The big one.', weight: 4, tone: 'casual', length: 'short' },
  ],
  'cleara': [
    { id: 'proj-cl1', text: 'Exploring healthcare design?', weight: 10, tone: 'curious', length: 'short' },
    { id: 'proj-cl2', text: 'Born from lived experience.', weight: 6, tone: 'warm', length: 'short' },
    { id: 'proj-cl3', text: 'AI meets empathy.', weight: 7, tone: 'curious', length: 'short' },
  ],
  'psoriassist': [
    { id: 'proj-ps1', text: 'Checking out PsoriAssist?', weight: 10, tone: 'curious', length: 'short' },
    { id: 'proj-ps2', text: 'Health management, reimagined.', weight: 7, tone: 'professional', length: 'short' },
    { id: 'proj-ps3', text: 'Where design meets care.', weight: 6, tone: 'warm', length: 'short' },
  ],
  'mythos': [
    { id: 'proj-my1', text: 'AI meets art history.', weight: 10, tone: 'curious', length: 'short' },
    { id: 'proj-my2', text: 'Tell it what you want to see.', weight: 7, tone: 'casual', length: 'short' },
    { id: 'proj-my3', text: 'Myth-making, literally.', weight: 5, tone: 'casual', length: 'short' },
  ],
  'metamorphic-fractal-reflections': [
    { id: 'proj-mf1', text: 'Ready for a trip?', weight: 10, tone: 'curious', length: 'short' },
    { id: 'proj-mf2', text: 'Psychedelic design territory.', weight: 7, tone: 'casual', length: 'short' },
    { id: 'proj-mf3', text: 'Identity through fractals.', weight: 6, tone: 'curious', length: 'short' },
  ],
  'latent-space': [
    { id: 'proj-ls1', text: 'Speculative futures ahead.', weight: 10, tone: 'curious', length: 'short' },
    { id: 'proj-ls2', text: 'What if we could navigate dreams?', weight: 7, tone: 'curious', length: 'short' },
    { id: 'proj-ls3', text: 'Design fiction at its finest.', weight: 6, tone: 'professional', length: 'short' },
  ],
  'oneiros-palace': [
    { id: 'proj-op1', text: 'Entering the dream palace?', weight: 10, tone: 'curious', length: 'short' },
    { id: 'proj-op2', text: 'Where imagination takes form.', weight: 7, tone: 'warm', length: 'short' },
  ],
};

// ============================================
// Page Greetings
// ============================================

export const pageGreetings: Record<string, GreetingVariation[]> = {
  work: [
    { id: 'page-w1', text: 'Browsing the case studies?', weight: 10, tone: 'curious', length: 'short' },
    { id: 'page-w2', text: 'Each project tells a story.', weight: 7, tone: 'warm', length: 'short' },
    { id: 'page-w3', text: 'Looking for something specific?', weight: 6, tone: 'casual', length: 'short' },
  ],
  about: [
    { id: 'page-a1', text: 'Curious about my journey?', weight: 10, tone: 'curious', length: 'short' },
    { id: 'page-a2', text: 'The story behind the work.', weight: 7, tone: 'warm', length: 'short' },
  ],
  journey: [
    { id: 'page-j1', text: 'Exploring the timeline?', weight: 10, tone: 'curious', length: 'short' },
    { id: 'page-j2', text: 'Each milestone has a story.', weight: 7, tone: 'warm', length: 'short' },
  ],
  contact: [
    { id: 'page-c1', text: 'Ready to connect?', weight: 10, tone: 'warm', length: 'short' },
    { id: 'page-c2', text: "Let's chat.", weight: 8, tone: 'casual', length: 'short' },
  ],
  home: [
    { id: 'page-h1', text: "I'm here to help you explore.", weight: 10, tone: 'warm', length: 'short' },
    { id: 'page-h2', text: 'Ready to dive in?', weight: 7, tone: 'casual', length: 'short' },
  ],
};

// ============================================
// Referrer Greetings
// ============================================

export const referrerGreetings: Record<string, GreetingVariation[]> = {
  linkedin: [
    { id: 'ref-li1', text: 'Coming from LinkedIn?', weight: 10, tone: 'professional', length: 'short' },
    { id: 'ref-li2', text: 'Saw my profile?', weight: 7, tone: 'casual', length: 'short' },
  ],
  dribbble: [
    { id: 'ref-dr1', text: 'Fellow designer!', weight: 10, tone: 'warm', length: 'short' },
  ],
  behance: [
    { id: 'ref-be1', text: 'From Behance? Nice.', weight: 10, tone: 'casual', length: 'short' },
  ],
  github: [
    { id: 'ref-gh1', text: 'From GitHub?', weight: 10, tone: 'casual', length: 'short' },
    { id: 'ref-gh2', text: 'Happy to talk technical.', weight: 7, tone: 'professional', length: 'short' },
  ],
};

// ============================================
// Follow-up Questions
// ============================================

export const followUpQuestions: FollowUpQuestion[] = [
  // Project pages
  { id: 'fu-proj1', text: 'What drew you to this one?', weight: 10, contexts: ['project'] },
  { id: 'fu-proj2', text: 'Want the behind-the-scenes story?', weight: 8, contexts: ['project'] },
  { id: 'fu-proj3', text: 'Curious about the process?', weight: 7, contexts: ['project'] },
  { id: 'fu-proj4', text: 'Any questions so far?', weight: 6, contexts: ['project'] },

  // Home page
  { id: 'fu-home1', text: 'What brings you here today?', weight: 10, contexts: ['home'] },
  { id: 'fu-home2', text: 'Looking for something specific?', weight: 8, contexts: ['home'] },
  { id: 'fu-home3', text: 'Want recommendations?', weight: 6, contexts: ['home'] },

  // Work page
  { id: 'fu-work1', text: 'Any project catch your eye?', weight: 10, contexts: ['work'] },
  { id: 'fu-work2', text: 'Want me to recommend one?', weight: 7, contexts: ['work'] },

  // About page
  { id: 'fu-about1', text: 'Questions about my path?', weight: 10, contexts: ['about'] },
  { id: 'fu-about2', text: 'Curious about anything specific?', weight: 8, contexts: ['about'] },

  // Journey page
  { id: 'fu-jour1', text: 'Any milestone stand out?', weight: 10, contexts: ['journey'] },

  // Contact page
  { id: 'fu-cont1', text: 'How can I help?', weight: 10, contexts: ['contact'] },

  // Intent-specific
  { id: 'fu-hire1', text: 'Evaluating for a role?', weight: 10, contexts: ['any'], intents: ['hiring_evaluation'] },
  { id: 'fu-hire2', text: 'Happy to walk through any project.', weight: 8, contexts: ['any'], intents: ['hiring_evaluation'] },
  { id: 'fu-coll1', text: 'Have a project in mind?', weight: 10, contexts: ['any'], intents: ['collaboration_seeking'] },
  { id: 'fu-peer1', text: 'Fellow designer?', weight: 10, contexts: ['any'], intents: ['peer_exploration'] },
];

// ============================================
// Intent Suffixes (short additions)
// ============================================

export const intentSuffixes: Record<string, string[]> = {
  hiring_evaluation: [
    'Happy to discuss any project in detail.',
    'I can share the thinking behind each decision.',
  ],
  peer_exploration: [
    'Always happy to talk shop.',
  ],
  collaboration_seeking: [
    'Open to interesting projects.',
  ],
  learning_research: [
    'I can explain the methodology.',
  ],
};
