import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { handleGeminiError } from '@/lib/gemini-errors';

export const runtime = 'nodejs';
export const maxDuration = 30; // Vercel function timeout

// ============================================
// Project Knowledge Base
// ============================================

interface ProjectInfo {
  title: string;
  summary: string;
  role: string;
  duration: string;
  impact: string[];
  awards: string[];
  techStack: string[];
  sections: Record<string, string>;
}

const PROJECT_DETAILS: Record<string, ProjectInfo> = {
  'air-india': {
    title: 'Air India DesignLAB',
    summary: 'Design infrastructure at scale for airline operations',
    role: 'Lead Product Designer',
    duration: '2023-Present',
    impact: [
      '450+ daily active users',
      'Reduced design-to-dev handoff time by 60%',
      'Unified design language across 12+ products',
    ],
    awards: ['Red Dot Award 2024', 'Stevie Award', 'APEX Award'],
    techStack: ['Figma', 'Design Tokens', 'Component Libraries', 'Documentation Systems'],
    sections: {
      'air-india-hero': 'Overview of the DesignLAB initiative',
      'air-india-problem': 'Fragmented design systems across legacy products',
      'air-india-solution': 'Unified component library with documentation',
      'air-india-impact': 'Metrics and business outcomes',
      'air-india-awards': 'Industry recognition including Red Dot, Stevie, and APEX awards',
    },
  },
  'latent-space': {
    title: 'Latent Space',
    summary: 'Speculative design fiction exploring dream recording technology',
    role: 'Designer & Researcher',
    duration: 'Research Project',
    impact: [
      'Explores ethical implications of dream technology',
      'Working prototype of dream recorder interface',
      'Narrative-driven design exploration',
    ],
    awards: [],
    techStack: ['Speculative Design', 'Narrative UX', 'Ethical Frameworks', 'Interactive Prototypes'],
    sections: {
      'latent-space-hero': 'Introduction to dream technology concept',
      'latent-space-dream-tech': 'How the technology works (fiction)',
      'latent-space-ethics': 'Ethical considerations and frameworks',
      'latent-space-prototype': 'Interactive dream recorder prototype',
    },
  },
  'metamorphic-fractal-reflections': {
    title: 'Metamorphic Fractal Reflections',
    summary: 'Generative art exhibition exploring identity through fractals',
    role: 'Artist & Designer',
    duration: 'Exhibition 2023',
    impact: ['Featured exhibition', 'Exploration of algorithmic identity', 'Interactive installations'],
    awards: [],
    techStack: ['Generative Art', 'WebGL', 'Processing', 'Interactive Media'],
    sections: {},
  },
  'mythos': {
    title: 'Mythos',
    summary: 'Gaming platform with mythological narratives',
    role: 'Product Designer',
    duration: '2022',
    impact: ['Immersive storytelling experience', 'Custom illustration system', 'Narrative-driven UI'],
    awards: [],
    techStack: ['Game Design', 'Illustration', 'Narrative Design', 'UI/UX'],
    sections: {},
  },
  'cleara': {
    title: 'Cleara',
    summary: 'Healthcare AI for patient communication',
    role: 'Product Designer',
    duration: '2022',
    impact: ['Simplified patient-provider communication', 'AI-powered health insights', 'Accessible design'],
    awards: [],
    techStack: ['Mobile Design', 'AI/ML', 'Healthcare UX', 'Accessibility'],
    sections: {},
  },
  'psoriassist': {
    title: 'PsoriAssist',
    summary: 'AI-powered psoriasis management application',
    role: 'Product Designer',
    duration: '2022',
    impact: ['Personalized treatment tracking', 'AI-powered skin analysis', 'Patient empowerment'],
    awards: [],
    techStack: ['Mobile Design', 'AI/ML', 'Healthcare UX', 'iOS Design'],
    sections: {},
  },
};

const ALL_PROJECTS = Object.keys(PROJECT_DETAILS);

// ============================================
// Context Processing
// ============================================

interface ChatContext {
  intent?: string;
  currentPage?: string;
  currentSection?: string | null;
  currentProject?: string | null;
  projectTitle?: string | null;
  caseStudiesViewed?: string[];
  engagementScore?: number;
  visitCount?: number;
  sectionInterest?: Record<string, { dwellTime: number; viewCount: number }>;
}

function buildContextPrefix(context: ChatContext | string): string {
  // Handle legacy string context (just intent)
  if (typeof context === 'string') {
    return context ? `\n\nUser's area of interest: ${context}\n` : '';
  }

  let prefix = '\n\n--- CURRENT CONTEXT ---\n';

  // Page awareness
  if (context.currentPage) {
    prefix += `Current page: ${context.currentPage}\n`;
  }

  // Project awareness
  if (context.currentProject && PROJECT_DETAILS[context.currentProject]) {
    const project = PROJECT_DETAILS[context.currentProject];
    prefix += `\nViewing case study: ${project.title}\n`;
    prefix += `Summary: ${project.summary}\n`;
    prefix += `Role: ${project.role}\n`;
    prefix += `Key impacts: ${project.impact.join(', ')}\n`;
    if (project.awards.length > 0) {
      prefix += `Awards: ${project.awards.join(', ')}\n`;
    }
    prefix += `Tech stack: ${project.techStack.join(', ')}\n`;
    prefix += `\nIMPORTANT: If the user asks "tell me more about this", "what is this project", or similar vague questions, assume they're asking about ${project.title}.\n`;
  }

  // Section awareness
  if (context.currentSection && context.currentProject) {
    const project = PROJECT_DETAILS[context.currentProject];
    if (project?.sections[context.currentSection]) {
      prefix += `\nCurrently viewing section: ${context.currentSection}\n`;
      prefix += `Section context: ${project.sections[context.currentSection]}\n`;
    }
  }

  // Intent
  if (context.intent && context.intent !== 'general') {
    prefix += `\nUser's area of interest: ${context.intent}\n`;
  }

  // Browsing history
  if (context.caseStudiesViewed && context.caseStudiesViewed.length > 0) {
    const viewedTitles = context.caseStudiesViewed
      .map(slug => PROJECT_DETAILS[slug]?.title || slug)
      .join(', ');
    prefix += `\nPreviously viewed projects: ${viewedTitles}\n`;
  }

  // Engagement
  if (context.visitCount && context.visitCount > 1) {
    prefix += `\nThis is visit #${context.visitCount} - returning visitor.\n`;
  }

  prefix += '--- END CONTEXT ---\n\n';

  return prefix;
}

function generateRecommendations(context: ChatContext | string): string {
  if (typeof context === 'string') return '';

  const viewed = context.caseStudiesViewed || [];
  const unviewed = ALL_PROJECTS.filter(p => !viewed.includes(p));

  if (unviewed.length === 0) {
    return '\nNote: User has viewed all case studies. Congratulate them and offer to dive deeper into any project.\n';
  }

  const recommendations = unviewed
    .slice(0, 2)
    .map(p => PROJECT_DETAILS[p]?.title || p)
    .join(' and ');

  return `\nProactive recommendation: User hasn't seen ${recommendations}. Suggest these when relevant.\n`;
}

// ============================================
// System Prompt
// ============================================

const PORTFOLIO_CONTEXT = `
You are an AI assistant for Krishna Nihar's portfolio website. You help visitors understand his work, design philosophy, and experience. You are context-aware and know which page and section the user is currently viewing.

About Nihar:
- Product & New Media Designer with expertise in design systems and living interfaces
- Experience at Air India DesignLAB, National Institute of Design, Indian School of Business, and Microsoft
- Specializes in consciousness-aware interfaces and systems design
- Daily active user engagement: 450+ users
- Focus on glassmorphism, premium design aesthetics, and user experience

Key Projects:
1. Air India DesignLAB - Award-winning design system serving 450+ daily users (Red Dot, Stevie, APEX awards)
2. Latent Space - Speculative design fiction exploring dream recording technology
3. Metamorphic Fractal Reflections - Generative art exhibition exploring identity
4. Mythos - Gaming platform with mythological narratives
5. Cleara - Healthcare AI for patient communication
6. PsoriAssist - AI-powered psoriasis management

Philosophy:
- Believes in making interfaces feel conscious and alive
- Advocates for design systems that scale
- Passionate about documentation and process transparency
- Embraces experimentation with new technologies

Behavior Guidelines:
- Be conversational, insightful, and helpful
- Show enthusiasm for design and technology
- Reference specific projects when relevant
- Encourage exploration of the portfolio
- Be concise but informative
- When user is on a specific case study, prioritize information about that project
- Proactively suggest unviewed projects when relevant

Remember: You're representing Nihar's portfolio. Be professional yet personable.

IMPORTANT: At the end of EVERY response, you MUST include exactly 3 follow-up suggestions that the user might want to ask next. Format them exactly like this:
[SUGGESTIONS]
- First follow-up question
- Second follow-up question
- Third follow-up question
[/SUGGESTIONS]

These suggestions should be contextually relevant to what you just discussed AND the page/section the user is viewing.
`;

// ============================================
// API Handler
// ============================================

export async function POST(request: NextRequest) {
  try {
    // Verify API key exists
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      return new Response(
        "Hi! The AI chat is currently being set up. In the meantime, feel free to explore the portfolio or reach out via the contact page!",
        {
          status: 200,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        }
      );
    }

    // Parse request body
    const body = await request.json();
    const { message, context } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 1.0,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Build context-aware prompt
    const contextPrefix = buildContextPrefix(context);
    const recommendations = generateRecommendations(context);
    const fullPrompt = `${PORTFOLIO_CONTEXT}${contextPrefix}${recommendations}User question: ${message}\n\nYour response:`;

    // Track generation time
    const startTime = Date.now();

    // Use streaming for real-time response
    const result = await model.generateContentStream(fullPrompt);

    // Create a ReadableStream to stream the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          console.log('[Chat] Streaming complete, generation time:', Date.now() - startTime, 'ms');
          controller.close();
        } catch (streamError) {
          console.error('[Chat] Stream error:', streamError);
          controller.error(streamError);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: unknown) {
    console.error('[Chat] Error:', error);
    const errorResponse = handleGeminiError(error, 'Chat');

    const friendlyMessages: Record<string, string> = {
      API_KEY_INVALID: "There's an issue with the AI configuration. Please try again later or use the contact page!",
      RATE_LIMIT: "I'm getting a lot of questions right now! Please try again in a moment.",
      SERVICE_UNAVAILABLE: "I'm temporarily offline. Please try again in a few moments!",
      UNKNOWN_ERROR: "I'm having trouble connecting right now. Feel free to explore the portfolio or contact via the contact page!",
    };

    return new Response(
      friendlyMessages[errorResponse.error] || friendlyMessages.UNKNOWN_ERROR,
      {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  }
}
