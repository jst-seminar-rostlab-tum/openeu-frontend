/**
 * Auto-generated chat types extracted from OpenAPI specification
 * Run `npm run api:update` to regenerate
 */

// Import the auto-generated types
import type { components } from '@/lib/api-types';

// === API TYPES (truly generated) ===
export type Message = components['schemas']['MessagesResponseModel'];
export type ChatSession = components['schemas']['SessionsResponseModel'];
export type CreateSessionRequest = components['schemas']['NewSessionItem'];
export type SendMessageRequest = components['schemas']['ChatMessageItem'];
export type CreateSessionResponse =
  components['schemas']['NewChatResponseModel'];
