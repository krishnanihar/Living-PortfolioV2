/**
 * Gemini API Retry Utility
 * Implements exponential backoff with jitter for handling rate limits and transient errors
 * Based on Google Cloud best practices (2025)
 */

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  onRetry?: (attempt: number, error: any) => void;
}

/**
 * Retry an async operation with exponential backoff
 * @param operation - The async function to retry
 * @param options - Retry configuration options
 * @returns Promise resolving to operation result
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    onRetry,
  } = options;

  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;

      // Check if error is retryable
      const isRetryable =
        error?.status === 429 ||  // Rate limit exceeded
        error?.status === 503 ||  // Service unavailable
        error?.status === 500;    // Internal server error

      // Don't retry if not retryable or max retries reached
      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const exponentialDelay = baseDelay * Math.pow(2, attempt);
      const jitter = Math.random() * 1000; // 0-1000ms random jitter
      const delay = Math.min(exponentialDelay + jitter, maxDelay);

      // Call retry callback if provided
      if (onRetry) {
        onRetry(attempt + 1, error);
      }

      // Log retry attempt
      console.log(`[Gemini Retry] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${Math.round(delay)}ms...`, {
        status: error?.status,
        message: error?.message?.substring(0, 100),
      });

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Check if an error is retryable
 * @param error - The error to check
 * @returns Boolean indicating if error should be retried
 */
export function isRetryableError(error: any): boolean {
  return (
    error?.status === 429 ||  // Rate limit
    error?.status === 503 ||  // Service unavailable
    error?.status === 500     // Server error
  );
}

/**
 * Create a retry wrapper with custom options
 * @param options - Default retry options
 * @returns Function that wraps operations with retry logic
 */
export function createRetryWrapper(options: RetryOptions) {
  return <T>(operation: () => Promise<T>) =>
    retryWithBackoff(operation, options);
}
