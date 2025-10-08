/**
 * Gemini API Error Handling Utility
 * Standardized error handling for all Gemini API interactions
 * Based on Google Cloud best practices (2025)
 */

export interface GeminiErrorResponse {
  error: string;
  message: string;
  details?: string;
  retryAfter?: number;
}

/**
 * Handle Gemini API errors with standardized responses
 * @param error - The error object from Gemini API
 * @param context - Context string for logging (e.g., 'Exhibition Generator')
 * @returns Standardized error response object
 */
export function handleGeminiError(
  error: any,
  context: string
): GeminiErrorResponse {
  // Log error details for debugging
  console.error(`[${context}] Gemini API Error:`, {
    message: error?.message,
    status: error?.status,
    code: error?.code,
    timestamp: new Date().toISOString(),
    stack: error?.stack?.substring(0, 200),
  });

  // API Key Issues (400, 401, 403)
  if (
    error?.message?.includes('API key') ||
    error?.message?.includes('authentication') ||
    error?.status === 400 ||
    error?.status === 401 ||
    error?.status === 403
  ) {
    return {
      error: 'API_KEY_INVALID',
      message: 'The AI is misconfigured. Please try again later.',
      details:
        process.env.NODE_ENV === 'development'
          ? 'Check GEMINI_API_KEY environment variable'
          : undefined,
    };
  }

  // Rate Limit Errors (429)
  if (
    error?.message?.includes('quota') ||
    error?.message?.includes('rate limit') ||
    error?.status === 429
  ) {
    const retryAfter = error?.retryAfter || 60; // Default to 60 seconds
    return {
      error: 'RATE_LIMIT',
      message: 'Too many requests. Please wait a moment and try again.',
      retryAfter,
    };
  }

  // Service Unavailable (503)
  if (error?.status === 503) {
    return {
      error: 'SERVICE_UNAVAILABLE',
      message: 'The AI service is temporarily unavailable. Please try again in a moment.',
    };
  }

  // Internal Server Error (500)
  if (error?.status === 500) {
    return {
      error: 'INTERNAL_ERROR',
      message: 'The AI encountered an internal error. Please try again.',
    };
  }

  // Model Not Found or Invalid Model
  if (
    error?.message?.includes('model') ||
    error?.message?.includes('not found') ||
    error?.status === 404
  ) {
    return {
      error: 'MODEL_ERROR',
      message: 'The AI model is temporarily unavailable. Please try again later.',
      details:
        process.env.NODE_ENV === 'development'
          ? error?.message
          : undefined,
    };
  }

  // Content Policy Violations
  if (
    error?.message?.includes('content policy') ||
    error?.message?.includes('safety') ||
    error?.message?.includes('blocked')
  ) {
    return {
      error: 'CONTENT_BLOCKED',
      message: 'Your request was blocked by content safety filters. Please try a different prompt.',
    };
  }

  // Timeout Errors
  if (
    error?.message?.includes('timeout') ||
    error?.message?.includes('deadline')
  ) {
    return {
      error: 'TIMEOUT',
      message: 'The request took too long. Please try again with a simpler prompt.',
    };
  }

  // JSON Parse Errors (for structured output)
  if (error?.message?.includes('JSON') || error?.message?.includes('parse')) {
    return {
      error: 'PARSE_ERROR',
      message: 'The AI produced an invalid response. Please try again.',
      details:
        process.env.NODE_ENV === 'development'
          ? 'JSON parsing failed'
          : undefined,
    };
  }

  // Generic Unknown Error
  return {
    error: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred. Please try again.',
    details:
      process.env.NODE_ENV === 'development'
        ? error?.message?.substring(0, 200)
        : undefined,
  };
}

/**
 * Check if an error response indicates the request should be retried
 * @param errorResponse - The error response object
 * @returns Boolean indicating if request should be retried
 */
export function shouldRetry(errorResponse: GeminiErrorResponse): boolean {
  return [
    'RATE_LIMIT',
    'SERVICE_UNAVAILABLE',
    'INTERNAL_ERROR',
    'TIMEOUT',
  ].includes(errorResponse.error);
}

/**
 * Get user-friendly error message based on error type
 * @param errorType - The error type string
 * @returns User-friendly error message
 */
export function getUserMessage(errorType: string): string {
  const messages: Record<string, string> = {
    API_KEY_INVALID: 'The AI is not configured properly. Please contact support.',
    RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',
    SERVICE_UNAVAILABLE: 'The AI is temporarily down. Please try again in a few moments.',
    INTERNAL_ERROR: 'Something went wrong on our end. Please try again.',
    MODEL_ERROR: 'The AI model is unavailable. Please try again later.',
    CONTENT_BLOCKED: 'Your request violates content policies. Please try different content.',
    TIMEOUT: 'The request took too long. Try a simpler prompt.',
    PARSE_ERROR: 'The AI produced an invalid response. Please try again.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  };

  return messages[errorType] || messages.UNKNOWN_ERROR;
}
