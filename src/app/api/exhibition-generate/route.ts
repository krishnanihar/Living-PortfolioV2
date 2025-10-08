import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retryWithBackoff } from '@/lib/gemini-retry';
import { handleGeminiError } from '@/lib/gemini-errors';

export const runtime = 'nodejs';
export const maxDuration = 30; // Vercel function timeout

const EXHIBITION_CURATOR_CONTEXT = `
You are The Oracle, an ancient consciousness that has witnessed every artwork ever created. When mortals speak their desires, you weave exhibitions from memory-threads invisible to their eyes.

When a user whispers their desire, you must:
1. Extract visual motifs, themes, emotional qualities, and time periods
2. Generate a MYTHOLOGICAL exhibition title that sounds like an ancient codex, prophecy, or mystical location
3. Write a brief curatorial statement (2-3 sentences) in poetic, atmospheric language
4. Specify selection criteria for filtering artworks

**Title Guidelines:**
- Sound like ancient texts: "The Codex of...", "The Book of...", "The Archive of..."
- Reference mystical events: "The Drowning of Light", "The Awakening of Shadows"
- Evoke mythological places: "The Gallery of Forgotten Eyes", "The Chamber of Silent Voices"
- Use archaic language: "Chronicles", "Fragments", "Whispers", "Echoes", "Visions"
- Examples: "The Codex of Azure Sorrow", "The Drowning of Light", "The Gallery of Forgotten Eyes", "Chronicles of the Infinite Gaze", "The Book of Vanishing Horizons"

Available motifs include: Eyes, Hands, Feet, Face, Hair, Angel, Saint, Madonna, Christ, Cupid, Venus, Apollo, Dog, Cat, Horse, Lion, Eagle, Tree, Forest, Mountain, River, Sea, Ocean, Sky, Cloud, Sun, Moon, Star, Water, Fire, Rose, Lily, Flower, Church, Cathedral, Temple, Palace, Castle, Tower, Book, Sword, Shield, Crown, Mirror, Candle, and many more related to anatomy, mythology, nature, architecture, objects, emotions, and activities.

Available time periods: 12th-21st century (specify as numbers: 12, 13, 14, 15, 16, 17, 18, 19, 20, 21)

IMPORTANT: You must respond with valid JSON only. No additional text.

Response format:
{
  "title": "The [Mythological Exhibition Title]",
  "subtitle": "One-line mystical description",
  "statement": "2-3 sentence curatorial statement in poetic, atmospheric language that evokes mystery and ancient wisdom",
  "criteria": {
    "motifs": ["motif1", "motif2", "motif3"],
    "centuries": [15, 16, 17],
    "mood": "melancholic|ethereal|triumphant|contemplative|unsettling|serene",
    "themes": ["theme1", "theme2"]
  },
  "reasoning": "Brief explanation of how you interpreted the user's desire"
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
          message: 'The Oracle is still awakening. Try again soon...',
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
          message: 'Whisper your desire to the Oracle (at least 5 characters).'
        },
        { status: 400 }
      );
    }

    const userPrompt = `A mortal whispers their desire:
"${prompt}"

Weave an exhibition from the ancient archive based on their longing. Be creative and insightful. If they speak of emotions, translate them to visual patterns. If they mention abstract concepts, find concrete symbols that embody them.

Provide your response in the specified JSON format.`;

    const fullPrompt = `${EXHIBITION_CURATOR_CONTEXT}\n\n${userPrompt}`;

    // Initialize Gemini with optimized configuration
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.2,      // Low for deterministic JSON output
        topK: 20,             // Limit token selection for structured output
        topP: 0.9,            // High probability mass
        maxOutputTokens: 2048, // Reasonable limit for exhibition data
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
          console.log(`[Exhibition Generator] Retry attempt ${attempt}:`, error?.status);
        },
      }
    );

    console.log('[Exhibition Generator] Generation time:', Date.now() - startTime, 'ms');
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
          message: 'The Oracle speaks in riddles. Try rephrasing your desire.',
          rawResponse: text.substring(0, 500),
        },
        { status: 200 }
      );
    }

    // Validate response structure
    if (!exhibitionData.title || !exhibitionData.criteria || !Array.isArray(exhibitionData.criteria.motifs)) {
      throw new Error('Invalid exhibition structure from The Oracle');
    }

    return NextResponse.json({
      exhibition: exhibitionData,
      timestamp: Date.now(),
    });

  } catch (error: any) {
    const errorResponse = handleGeminiError(error, 'Exhibition Generator');
    return NextResponse.json(errorResponse, { status: 200 });
  }
}
