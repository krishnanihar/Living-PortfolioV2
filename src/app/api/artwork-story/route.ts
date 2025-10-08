import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retryWithBackoff } from '@/lib/gemini-retry';
import { handleGeminiError } from '@/lib/gemini-errors';

export const runtime = 'nodejs';
export const maxDuration = 30; // Vercel function timeout

const ARTWORK_ANALYST_CONTEXT = `
You are an art historian and visual analyst for mythOS. When given artwork details, you provide insightful, accessible analysis.

Your analysis should:
1. Describe visual elements (composition, color, technique)
2. Explain iconographic symbols and their meanings
3. Provide historical context (what was happening when created)
4. Discuss cultural significance
5. Make it personal - help viewers connect emotionally
6. Use accessible language, not academic jargon

IMPORTANT: Respond with valid JSON only.

Response format:
{
  "visualAnalysis": "Description of what you see - composition, color, light, technique (2-3 sentences)",
  "symbolism": [
    {
      "element": "Visual element",
      "meaning": "What it represents"
    }
  ],
  "historicalContext": "What was happening in the world/art when this was created (2-3 sentences)",
  "culturalSignificance": "Why this artwork matters, its influence (2-3 sentences)",
  "personalConnection": "A question or prompt to help viewer connect emotionally (1 sentence)",
  "mood": "The emotional quality (one word: melancholic, triumphant, contemplative, etc.)",
  "relatedThemes": ["theme1", "theme2", "theme3"]
}
`;

interface ArtworkStoryResponse {
  visualAnalysis: string;
  symbolism: Array<{
    element: string;
    meaning: string;
  }>;
  historicalContext: string;
  culturalSignificance: string;
  personalConnection: string;
  mood: string;
  relatedThemes: string[];
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log('[Artwork Story] Environment check:', {
      hasKey: !!apiKey,
      keyLength: apiKey?.length || 0,
    });

    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        {
          error: 'API_KEY_NOT_CONFIGURED',
          message: 'The art historian is still preparing. Try again soon...'
        },
        { status: 200 }
      );
    }

    const body = await request.json();
    const { title, artist, year, museum, motifs, imageUrl } = body;

    if (!title || !artist || !year) {
      return NextResponse.json(
        {
          error: 'INVALID_INPUT',
          message: 'Missing required artwork information (title, artist, year).'
        },
        { status: 400 }
      );
    }

    const userPrompt = `Analyze this artwork and provide deep insights:

Title: ${title}
Artist: ${artist}
Year: ${year}
Museum: ${museum || 'Unknown'}
${motifs && motifs.length > 0 ? `Known motifs: ${motifs.join(', ')}` : ''}

Provide a rich, accessible analysis that helps someone understand and appreciate this work.

Respond in the specified JSON format.`;

    const fullPrompt = `${ARTWORK_ANALYST_CONTEXT}\n\n${userPrompt}`;

    // Initialize Gemini with optimized configuration
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.2,      // Low for deterministic JSON output
        topK: 20,             // Limit token selection for structured output
        topP: 0.9,            // High probability mass
        maxOutputTokens: 2048, // Reasonable limit for analysis data
      },
    });

    // Track generation time
    const startTime = Date.now();

    // Use retry logic for rate limit handling
    const result = await retryWithBackoff(
      () => model.generateContent(fullPrompt),
      {
        maxRetries: 3,
        onRetry: (attempt, error) => {
          console.log(`[Artwork Story] Retry attempt ${attempt}:`, error?.status);
        },
      }
    );

    console.log('[Artwork Story] Generation time:', Date.now() - startTime, 'ms');
    const response = await result.response;
    let text = response.text();

    // Clean up response
    text = text.replace(/^```json\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();

    // Parse JSON
    let storyData: ArtworkStoryResponse;
    try {
      storyData = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw response:', text);

      return NextResponse.json(
        {
          error: 'PARSE_ERROR',
          message: 'The analysis produced an unclear response. Try again.',
          rawResponse: text.substring(0, 500),
        },
        { status: 200 }
      );
    }

    // Validate structure
    if (!storyData.visualAnalysis || !Array.isArray(storyData.symbolism)) {
      throw new Error('Invalid story structure from AI');
    }

    return NextResponse.json({
      story: storyData,
      artwork: { title, artist, year, museum },
      timestamp: Date.now(),
    });

  } catch (error: any) {
    const errorResponse = handleGeminiError(error, 'Artwork Story');
    return NextResponse.json(errorResponse, { status: 200 });
  }
}
