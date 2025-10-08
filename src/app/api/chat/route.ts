import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retryWithBackoff } from '@/lib/gemini-retry';
import { handleGeminiError } from '@/lib/gemini-errors';

export const runtime = 'nodejs';
export const maxDuration = 30; // Vercel function timeout

const PORTFOLIO_CONTEXT = `
You are an AI assistant for Nihar Sunkara's portfolio website. You help visitors understand his work, design philosophy, and experience.

About Nihar:
- Product & New Media Designer with expertise in design systems and living interfaces
- Experience at Air India DesignLAB, National Institute of Design, Indian School of Business, and Microsoft
- Specializes in consciousness-aware interfaces and systems design
- Daily active user engagement: 450+ users
- Focus on glassmorphism, premium design aesthetics, and user experience

Key Projects:
1. Air India DesignLAB - System design at scale for airline operations
2. Metamorphic Fractal Reflections - Innovative design exploration
3. Living Portfolio - This very portfolio, designed to feel alive and responsive

Philosophy:
- Believes in making interfaces feel conscious and alive
- Advocates for design systems that scale
- Passionate about documentation and process transparency
- Embraces experimentation with new technologies

Personality:
- Be conversational, insightful, and helpful
- Show enthusiasm for design and technology
- Reference specific projects when relevant
- Encourage exploration of the portfolio
- Be concise but informative

Remember: You're representing Nihar's portfolio. Be professional yet personable.
`;

export async function POST(request: NextRequest) {
  try {
    // Verify API key exists
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        {
          message: "Hi! The AI chat is currently being set up. In the meantime, feel free to explore the portfolio or reach out via the contact page!",
          error: 'API_KEY_NOT_CONFIGURED'
        },
        { status: 200 }
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

    // Initialize Gemini with optimized configuration for conversational text
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 1.0,      // Balanced creativity for natural conversation
        topK: 40,             // Diverse token selection
        topP: 0.95,           // High probability mass
        maxOutputTokens: 1024, // Sufficient for chat responses
      },
    });

    // Build context-aware prompt
    const contextPrefix = context ? `\n\nUser's area of interest: ${context}\n\n` : '';
    const fullPrompt = `${PORTFOLIO_CONTEXT}${contextPrefix}User question: ${message}\n\nYour response:`;

    // Track generation time
    const startTime = Date.now();

    // Use retry logic for rate limit handling
    const result = await retryWithBackoff(
      () => model.generateContent(fullPrompt),
      {
        maxRetries: 3,
        onRetry: (attempt, error) => {
          console.log(`[Chat] Retry attempt ${attempt}:`, error?.status);
        },
      }
    );

    console.log('[Chat] Generation time:', Date.now() - startTime, 'ms');
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      message: text,
      timestamp: Date.now(),
    });

  } catch (error: any) {
    const errorResponse = handleGeminiError(error, 'Chat');

    // Return user-friendly messages for chat context
    const friendlyMessages: Record<string, string> = {
      API_KEY_INVALID: "There's an issue with the AI configuration. Please try again later or use the contact page!",
      RATE_LIMIT: "I'm getting a lot of questions right now! Please try again in a moment.",
      SERVICE_UNAVAILABLE: "I'm temporarily offline. Please try again in a few moments!",
      UNKNOWN_ERROR: "I'm having trouble connecting right now. Feel free to explore the portfolio or contact via the contact page!",
    };

    return NextResponse.json(
      {
        message: friendlyMessages[errorResponse.error] || friendlyMessages.UNKNOWN_ERROR,
        error: errorResponse.error,
      },
      { status: 200 }
    );
  }
}
