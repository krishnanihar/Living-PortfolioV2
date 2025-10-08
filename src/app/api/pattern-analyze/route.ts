import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retryWithBackoff } from '@/lib/gemini-retry';
import { handleGeminiError } from '@/lib/gemini-errors';

export const runtime = 'nodejs';
export const maxDuration = 30; // Vercel function timeout

const PATTERN_ANALYSIS_CONTEXT = `
You are a dream pattern analyzer for a speculative consciousness interface. Analyze user-provided dream descriptions and identify recurring patterns, themes, symbols, and emotional signatures.

Analysis Guidelines:
- Identify 3-5 recurring themes or patterns
- Note symbolic elements and their potential meanings
- Detect emotional patterns (anxiety, joy, nostalgia, etc.)
- Suggest possible psychological interpretations
- Be insightful but not overly clinical
- Use poetic language while remaining analytical

IMPORTANT: You must respond with valid JSON only. No additional text before or after the JSON object.

Response format:
{
  "themes": [
    {
      "name": "Theme name",
      "frequency": 85,
      "description": "Brief description",
      "examples": ["example 1", "example 2"]
    }
  ],
  "symbols": [
    {
      "symbol": "Symbol name",
      "occurrences": 3,
      "interpretation": "Possible meaning"
    }
  ],
  "emotionalSignature": {
    "primary": "Primary emotion",
    "secondary": ["emotion1", "emotion2"],
    "intensity": 75
  },
  "insights": [
    "Insight 1 about patterns",
    "Insight 2 about connections",
    "Insight 3 about meaning"
  ]
}
`;

interface PatternAnalysisResponse {
  themes: Array<{
    name: string;
    frequency: number;
    description: string;
    examples: string[];
  }>;
  symbols: Array<{
    symbol: string;
    occurrences: number;
    interpretation: string;
  }>;
  emotionalSignature: {
    primary: string;
    secondary: string[];
    intensity: number;
  };
  insights: string[];
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Debug logging (safe - only logs existence and masked key)
    console.log('[Pattern Analyzer] Environment check:', {
      hasKey: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyPreview: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : 'undefined',
      env: process.env.NODE_ENV
    });

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('[Pattern Analyzer] API key not configured or invalid');
      return NextResponse.json(
        {
          error: 'API_KEY_NOT_CONFIGURED',
          message: 'The pattern analyzer is still calibrating. Try again soon...',
          help: 'Developers: Check GEMINI_API_KEY in environment variables. On Vercel, redeploy after adding the key.'
        },
        { status: 200 }
      );
    }

    const body = await request.json();
    const { dreams } = body;

    if (!dreams || typeof dreams !== 'string' || dreams.trim().length < 20) {
      return NextResponse.json(
        {
          error: 'INVALID_INPUT',
          message: 'Please provide at least 20 characters of dream descriptions to analyze.'
        },
        { status: 400 }
      );
    }

    const userPrompt = `Analyze these dream descriptions and identify patterns:\n\n${dreams}\n\nProvide your analysis in the specified JSON format.`;
    const fullPrompt = `${PATTERN_ANALYSIS_CONTEXT}\n\n${userPrompt}`;

    // Initialize Gemini with optimized configuration for analytical JSON output
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.2,      // Low for deterministic analytical output
        topK: 20,             // Limit token selection for structured output
        topP: 0.9,            // High probability mass
        maxOutputTokens: 2048, // Sufficient for pattern analysis
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
          console.log(`[Pattern Analyzer] Retry attempt ${attempt}:`, error?.status);
        },
      }
    );

    console.log('[Pattern Analyzer] Generation time:', Date.now() - startTime, 'ms');
    const response = await result.response;
    let text = response.text();

    // Clean up response - remove markdown code blocks if present
    text = text.replace(/^```json\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();

    // Parse JSON response
    let analysisData: PatternAnalysisResponse;
    try {
      analysisData = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw response:', text);

      // Return a fallback response if JSON parsing fails
      return NextResponse.json(
        {
          error: 'PARSE_ERROR',
          message: 'The analyzer produced an invalid response. Try rephrasing your dreams.',
          rawResponse: text.substring(0, 500), // First 500 chars for debugging
        },
        { status: 200 }
      );
    }

    // Validate response structure
    if (!analysisData.themes || !Array.isArray(analysisData.themes)) {
      throw new Error('Invalid response structure: missing themes array');
    }

    return NextResponse.json({
      analysis: analysisData,
      timestamp: Date.now(),
    });

  } catch (error: any) {
    const errorResponse = handleGeminiError(error, 'Pattern Analyzer');
    return NextResponse.json(errorResponse, { status: 200 });
  }
}
