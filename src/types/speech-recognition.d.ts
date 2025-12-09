/**
 * Web Speech API Type Declarations
 * These types are needed for the SpeechRecognition API used in the Chatbot component.
 * Note: ExhibitionBuilder.tsx has its own local types that take precedence.
 */

// SpeechRecognition event types used by Chatbot.tsx
interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

export { SpeechRecognitionEvent, SpeechRecognitionResult, SpeechRecognitionResultItem, SpeechRecognitionResultList };
