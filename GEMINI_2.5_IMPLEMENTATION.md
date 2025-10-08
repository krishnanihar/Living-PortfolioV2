# Gemini 2.5 Flash Implementation - Complete Guide

## ✅ Completed Updates

### Core Utilities (DONE)
- ✅ `src/lib/gemini-retry.ts` - Exponential backoff retry logic
- ✅ `src/lib/gemini-errors.ts` - Standardized error handling

### API Routes (DONE)
- ✅ `src/app/api/pattern-analyze/route.ts` - Updated with optimized config
- ✅ `src/app/api/exhibition-generate/route.ts` - Upgraded to 2.5-flash

## 🔄 Remaining Updates

The following API routes need manual updates due to file watching/auto-save conflicts:

### 1. artwork-story/route.ts
- Model: `gemini-2.0-flash-exp` → `gemini-2.5-flash`
- Temperature: 0.8 → 0.2
- Add retry logic and error handling

### 2. dream-generate/route.ts
- Keep: `gemini-2.5-flash` (already correct)
- Optimize temperature to 1.0
- Add retry logic for streaming

### 3. dream-image-generate/route.ts
- Keep: `gemini-2.5-flash-image` (already correct)
- Improve prompt structure
- Add retry logic

### 4. chat/route.ts
- Keep: `gemini-2.5-flash` (already correct)
- Optimize temperature to 1.0
- Add retry logic

## Quick Reference

### Import Pattern
```typescript
import { retryWithBackoff } from '@/lib/gemini-retry';
import { handleGeminiError } from '@/lib/gemini-errors';

export const maxDuration = 30; // Add this
```

### Config for JSON Output
```typescript
generationConfig: {
  temperature: 0.2,
  topK: 20,
  topP: 0.9,
  maxOutputTokens: 2048,
}
```

### Config for Creative Text
```typescript
generationConfig: {
  temperature: 1.0,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
}
```

### Retry Wrapper
```typescript
const result = await retryWithBackoff(
  () => model.generateContent(fullPrompt),
  { maxRetries: 3 }
);
```

### Error Handling
```typescript
catch (error: any) {
  const errorResponse = handleGeminiError(error, 'API Name');
  return NextResponse.json(errorResponse, { status: 200 });
}
```

## Status
- Committed: Core utilities + pattern-analyze + exhibition-generate
- Pushed to main: ✅
- Remaining: 4 API files need updates
