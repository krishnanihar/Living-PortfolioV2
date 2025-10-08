import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retryWithBackoff } from '@/lib/gemini-retry';
import { handleGeminiError } from '@/lib/gemini-errors';

export const runtime = 'nodejs';
export const maxDuration = 30; // Vercel function timeout

const DREAM_CONTEXT = `
You are a dream fragment generator for a speculative consciousness interface. Generate vivid, surreal dream fragments based on user input.

Style Guidelines:
- Use poetic, evocative language
- Blend reality with impossibility
- Include sensory details (visual, tactile, auditory)
- Keep fragments between 100-200 words
- Create a sense of wonder and mystery
- Reference consciousness, perception, and liminal spaces

Format: Generate a single cohesive dream fragment, not a list. Write in present tense as if experiencing it now.
`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Debug logging (safe - only logs existence and masked key)
    console.log('[Dream Generator] Environment check:', {
      hasKey: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyPreview: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : 'undefined',
      env: process.env.NODE_ENV
    });

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('[Dream Generator] API key not configured or invalid');
      return new Response(
        JSON.stringify({
          error: 'API_KEY_NOT_CONFIGURED',
          message: 'The dream generator is still waking up. Try again soon...',
          help: 'Developers: Check GEMINI_API_KEY in environment variables. On Vercel, redeploy after adding the key.'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { dreamInput } = body;

    if (!dreamInput || !dreamInput.trim()) {
      return new Response(
        JSON.stringify({
          error: 'MISSING_INPUT',
          message: 'Please describe your dream to generate'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build user prompt
    const userPrompt = `Generate a dream fragment based on this description:

${dreamInput}

Create a vivid, surreal dream experience.`;

    const fullPrompt = `${DREAM_CONTEXT}\n\n${userPrompt}`;

    // Initialize Gemini with optimized configuration for creative text
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 1.0,      // Balanced creativity for dream fragments
        topK: 40,             // More diverse token selection
        topP: 0.95,           // High probability mass for creative flow
        maxOutputTokens: 1024, // Sufficient for dream fragments
      },
    });

    // Track generation time
    const startTime = Date.now();

    // Use retry logic for streaming with exponential backoff
    const result = await retryWithBackoff(
      () => model.generateContentStream(fullPrompt),
      {
        maxRetries: 3,
        onRetry: (attempt, error) => {
          console.log(`[Dream Generator] Retry attempt ${attempt}:`, error?.status);
        },
      }
    );

    console.log('[Dream Generator] Stream started, time:', Date.now() - startTime, 'ms');

    // Create readable stream for SSE
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            const data = `data: ${JSON.stringify({ text })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error: any) {
          console.error('Stream error:', error);
          const errorData = `data: ${JSON.stringify({ error: error.message })}\n\n`;
          controller.enqueue(encoder.encode(errorData));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    const errorResponse = handleGeminiError(error, 'Dream Generator');
    return new Response(
      JSON.stringify(errorResponse),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
