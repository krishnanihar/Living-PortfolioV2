import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

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

    // Build image prompt with hyper-specific details
    const userPrompt = `${DREAM_IMAGE_CONTEXT}

Create a dreamlike photograph based on this description:

${dreamInput}

Use cinematic composition, surreal lighting, and dream logic. Make it feel like a memory from the subconscious.`;

    console.log('[Dream Image Generator] Generating with prompt length:', userPrompt.length);

    // Initialize Gemini with image generation model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-image',
      generationConfig: {
        temperature: 0.85, // Higher temperature for more creative images
        topK: 40,
        topP: 0.95,
      },
    });

    const result = await model.generateContent(userPrompt);
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
    console.error('[Dream Image Generator] Error details:', {
      message: error?.message,
      status: error?.status,
      response: error?.response?.data,
      stack: error?.stack?.substring(0, 500)
    });

    if (error?.message?.includes('API key') || error?.status === 400) {
      return NextResponse.json({
        error: 'API_KEY_INVALID',
        message: 'The dream gateway is misconfigured. Try again later...',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, { status: 200 });
    }

    if (error?.message?.includes('quota') || error?.message?.includes('rate limit') || error?.status === 429) {
      return NextResponse.json({
        error: 'RATE_LIMIT',
        message: 'Too many dreamers at once. Wait a moment and try again...'
      }, { status: 200 });
    }

    if (error?.message?.includes('model') || error?.message?.includes('not found')) {
      return NextResponse.json({
        error: 'MODEL_ERROR',
        message: 'The AI model is temporarily unavailable. Try again in a moment...',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, { status: 200 });
    }

    return NextResponse.json({
      error: 'UNKNOWN_ERROR',
      message: 'The dream visualization failed unexpectedly. Try again...',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 200 });
  }
}
