import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

const EXHIBITION_CURATOR_CONTEXT = `
You are an AI art curator for mythOS, a digital art discovery platform. Your role is to interpret user desires and create meaningful art exhibitions.

When a user describes what they want to see, you must:
1. Extract visual motifs, themes, emotional qualities, and time periods
2. Generate a compelling exhibition title
3. Write a brief curatorial statement (2-3 sentences)
4. Specify selection criteria for filtering artworks

Available motifs include: Eyes, Hands, Feet, Face, Hair, Angel, Saint, Madonna, Christ, Cupid, Venus, Apollo, Dog, Cat, Horse, Lion, Eagle, Tree, Forest, Mountain, River, Sea, Ocean, Sky, Cloud, Sun, Moon, Star, Water, Fire, Rose, Lily, Flower, Church, Cathedral, Temple, Palace, Castle, Tower, Book, Sword, Shield, Crown, Mirror, Candle, and many more related to anatomy, mythology, nature, architecture, objects, emotions, and activities.

Available time periods: 12th-21st century (specify as numbers: 12, 13, 14, 15, 16, 17, 18, 19, 20, 21)

IMPORTANT: You must respond with valid JSON only. No additional text.

Response format:
{
  "title": "Exhibition Title (Creative and Evocative)",
  "subtitle": "One-line description",
  "statement": "2-3 sentence curatorial statement explaining the exhibition's theme and significance",
  "criteria": {
    "motifs": ["motif1", "motif2", "motif3"],
    "centuries": [15, 16, 17],
    "mood": "melancholic|ethereal|triumphant|contemplative|unsettling|serene",
    "themes": ["theme1", "theme2"]
  },
  "reasoning": "Brief explanation of how you interpreted the user's request"
}
`;

interface ExhibitionResponse {
  title: string;
  subtitle: string;
  statement: string;
  criteria: {
    motifs: string[];
    centuries: number[];
    mood: string;
    themes: string[];
  };
  reasoning: string;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log('[Exhibition Generator] Environment check:', {
      hasKey: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyPreview: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : 'undefined',
    });

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('[Exhibition Generator] API key not configured');
      return NextResponse.json(
        {
          error: 'API_KEY_NOT_CONFIGURED',
          message: 'The AI curator is still learning. Try again soon...',
          help: 'Developers: Check GEMINI_API_KEY in environment variables.'
        },
        { status: 200 }
      );
    }

    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
      return NextResponse.json(
        {
          error: 'INVALID_INPUT',
          message: 'Please describe what kind of art you want to explore (at least 5 characters).'
        },
        { status: 400 }
      );
    }

    const userPrompt = `A user wants to explore art with this description:
"${prompt}"

Create an exhibition based on their request. Be creative and insightful. If they mention emotions, translate them to visual characteristics. If they mention abstract concepts, find concrete motifs that represent them.

Provide your response in the specified JSON format.`;

    const fullPrompt = `${EXHIBITION_CURATOR_CONTEXT}\n\n${userPrompt}`;

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.9,  // Higher creativity for curatorial decisions
        topK: 40,
        topP: 0.95,
      },
    });

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    let text = response.text();

    // Clean up response
    text = text.replace(/^```json\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();

    // Parse JSON response
    let exhibitionData: ExhibitionResponse;
    try {
      exhibitionData = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw response:', text);

      return NextResponse.json(
        {
          error: 'PARSE_ERROR',
          message: 'The AI curator produced an unclear response. Try rephrasing your request.',
          rawResponse: text.substring(0, 500),
        },
        { status: 200 }
      );
    }

    // Validate response structure
    if (!exhibitionData.title || !exhibitionData.criteria || !Array.isArray(exhibitionData.criteria.motifs)) {
      throw new Error('Invalid exhibition structure from AI');
    }

    return NextResponse.json({
      exhibition: exhibitionData,
      timestamp: Date.now(),
    });

  } catch (error: any) {
    console.error('[Exhibition Generator] Error:', {
      message: error?.message,
      status: error?.status,
      stack: error?.stack?.substring(0, 500)
    });

    if (error?.message?.includes('API key') || error?.status === 400) {
      return NextResponse.json(
        {
          error: 'API_KEY_INVALID',
          message: 'The AI curator is misconfigured. Try again later...',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 200 }
      );
    }

    if (error?.message?.includes('quota') || error?.message?.includes('rate limit') || error?.status === 429) {
      return NextResponse.json(
        {
          error: 'RATE_LIMIT',
          message: 'Too many curators working at once. Wait a moment and try again...'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        error: 'UNKNOWN_ERROR',
        message: 'The exhibition curation encountered an issue. Try simplifying your request...',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 200 }
    );
  }
}
