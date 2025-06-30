/**
 * Auto-generated calendar types extracted from OpenAPI specification
 * Run `npm run api:update` to regenerate
 *
 * These are pure API types without frontend extensions
 */
import type { components, operations } from '@/lib/api-types';

export type Topic = components['schemas']['Topic'];
export type MeetingSuggestion = components['schemas']['MeetingSuggestion'];
export type MeetingSuggestionResponse =
  components['schemas']['MeetingSuggestionResponse'];
export type GetMeetingsParams =
  operations['get_meetings_meetings_get']['parameters']['query'];
export type MeetingData = components['schemas']['Meeting'];
