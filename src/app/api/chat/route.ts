import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

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

    // Initialize Gemini AI (lazy-loaded to avoid build issues)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build context-aware prompt
    const contextPrefix = context ? `\n\nUser's area of interest: ${context}\n\n` : '';
    const fullPrompt = `${PORTFOLIO_CONTEXT}${contextPrefix}User question: ${message}\n\nYour response:`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      message: text,
      timestamp: Date.now(),
    });

  } catch (error: any) {
    console.error('Gemini AI Error:', error);

    // Handle specific error types
    if (error?.message?.includes('API key')) {
      return NextResponse.json(
        {
          message: "There's an issue with the AI configuration. Please try again later or use the contact page to reach out directly!",
          error: 'API_KEY_INVALID'
        },
        { status: 200 }
      );
    }

    if (error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
      return NextResponse.json(
        {
          message: "I'm getting a lot of questions right now! Please try again in a moment, or feel free to explore the portfolio while you wait.",
          error: 'RATE_LIMIT'
        },
        { status: 200 }
      );
    }

    // Generic fallback
    return NextResponse.json(
      {
        message: "I'm having trouble connecting right now. While I work on that, feel free to explore the projects or reach out via the contact page!",
        error: 'UNKNOWN_ERROR'
      },
      { status: 200 }
    );
  }
}
