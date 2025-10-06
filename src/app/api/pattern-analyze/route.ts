import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

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

    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        {
          error: 'API_KEY_NOT_CONFIGURED',
          message: 'The pattern analyzer is still calibrating. Try again soon...'
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

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    const result = await model.generateContent(fullPrompt);
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
    console.error('Pattern analysis error:', error);

    if (error?.message?.includes('API key')) {
      return NextResponse.json(
        {
          error: 'API_KEY_INVALID',
          message: 'The pattern matrix is misconfigured. Try again later...'
        },
        { status: 200 }
      );
    }

    if (error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
      return NextResponse.json(
        {
          error: 'RATE_LIMIT',
          message: 'Too many analyses running. Wait a moment and try again...'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        error: 'UNKNOWN_ERROR',
        message: 'The analysis fragmented unexpectedly. Try again...',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
