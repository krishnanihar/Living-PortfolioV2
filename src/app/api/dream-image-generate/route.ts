import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retryWithBackoff } from '@/lib/gemini-retry';
import { handleGeminiError } from '@/lib/gemini-errors';

export const runtime = 'nodejs';
export const maxDuration = 30; // Vercel function timeout

const DREAM_IMAGE_CONTEXT = `
You are creating a visual dream for a speculative consciousness interface. Generate surreal, dreamlike imagery based on user input.

Visual Style Guidelines:
- Surreal and otherworldly atmospheres
- Rich, vivid colors or ethereal monochromes
- Impossible geometries and dream logic
- Blend familiar elements with the fantastic
- Evoke wonder, mystery, and subconscious imagery
- Use soft focus, light leaks, and dreamlike qualities
- Reference liminal spaces, consciousness, and perception

Create a single cohesive dream image that feels like a memory from another reality.
`;

interface DreamImageRequest {
  dreamInput?: string;
  aspectRatio?: string;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Debug logging
    console.log('[Dream Image Generator] Environment check:', {
      hasKey: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyPreview: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : 'undefined',
      env: process.env.NODE_ENV
    });

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('[Dream Image Generator] API key not configured or invalid');
      return NextResponse.json({
        error: 'API_KEY_NOT_CONFIGURED',
        message: 'The dream visualizer is still awakening. Try again soon...',
        help: 'Developers: Check GEMINI_API_KEY in environment variables.'
      }, { status: 200 });
    }

    const body: DreamImageRequest = await request.json();
    const { dreamInput, aspectRatio = '1:1' } = body;

    if (!dreamInput || !dreamInput.trim()) {
      return NextResponse.json({
        error: 'MISSING_INPUT',
        message: 'Please describe your dream to generate'
      }, { status: 400 });
    }

    // Build improved image prompt with structured guidance (based on Gemini 2.5 best practices)
    const userPrompt = `Create a dreamlike photograph with these elements:

**Subject & Scene:**
${dreamInput}

**Composition:**
- Cinematic framing with depth of field
- ${aspectRatio} aspect ratio composition
- Balanced negative space and visual flow
- Rule of thirds or dynamic symmetry

**Lighting & Atmosphere:**
- Soft, ethereal lighting with subtle light leaks
- Surreal color grading (vivid yet dreamlike)
- Time: twilight hours or liminal moments
- Mood: mysterious, contemplative, otherworldly

**Visual Style:**
- Surreal photography aesthetic
- Impossible geometries and dream logic
- Memory-like softness with selective blur
- Subconscious visual language
- Rich, saturated colors or ethereal monochromes

Create a single cohesive image that feels like a fleeting memory from another reality.`;

    console.log('[Dream Image Generator] Generating with prompt length:', userPrompt.length);

    // Initialize Gemini with optimized image generation configuration
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-image',
      generationConfig: {
        temperature: 0.85, // Balanced creativity for image generation
        topK: 40,         // Standard for image generation
        topP: 0.95,       // High probability mass
      },
    });

    // Track generation time
    const startTime = Date.now();

    // Use retry logic for rate limit handling
    const result = await retryWithBackoff(
      () => model.generateContent(userPrompt),
      {
        maxRetries: 3,
        onRetry: (attempt, error) => {
          console.log(`[Dream Image Generator] Retry attempt ${attempt}:`, error?.status);
        },
      }
    );

    console.log('[Dream Image Generator] Generation time:', Date.now() - startTime, 'ms');
    const response = result.response;

    // Extract image data from response
    const parts = response.candidates?.[0]?.content?.parts;

    if (!parts || parts.length === 0) {
      throw new Error('No content generated');
    }

    // Find the image part
    let imageData: string | null = null;
    let mimeType: string = 'image/png';

    for (const part of parts) {
      if (part.inlineData) {
        imageData = part.inlineData.data;
        mimeType = part.inlineData.mimeType || 'image/png';
        break;
      }
    }

    if (!imageData) {
      console.error('[Dream Image Generator] No image data in response');
      return NextResponse.json({
        error: 'NO_IMAGE_DATA',
        message: 'The dream could not be visualized. Try adjusting your inputs...',
      }, { status: 200 });
    }

    console.log('[Dream Image Generator] Image generated successfully:', {
      mimeType,
      dataLength: imageData.length,
    });

    return NextResponse.json({
      success: true,
      image: {
        data: imageData,
        mimeType: mimeType,
        aspectRatio: aspectRatio,
      },
      prompt: {
        dreamInput,
      },
    });

  } catch (error: any) {
    const errorResponse = handleGeminiError(error, 'Dream Image Generator');
    return NextResponse.json(errorResponse, { status: 200 });
  }
}
