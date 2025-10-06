import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Health check endpoint to verify environment configuration
 * Safe to expose - doesn't reveal actual API key value
 */
export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;

  const health = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    geminiApi: {
      configured: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyPrefix: apiKey ? apiKey.slice(0, 4) : 'none',
      keySuffix: apiKey ? apiKey.slice(-4) : 'none',
      // Safe preview that doesn't expose actual key
      preview: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : 'NOT_CONFIGURED',
    },
    apis: {
      chat: '/api/chat',
      dreamGenerate: '/api/dream-generate',
      patternAnalyze: '/api/pattern-analyze',
    },
    status: apiKey ? 'healthy' : 'missing_api_key',
  };

  return NextResponse.json(health, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
