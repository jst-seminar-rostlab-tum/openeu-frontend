/**
 * Auto-generated calendar types extracted from OpenAPI specification
 * Run `npm run api:update` to regenerate
 */

// Import the auto-generated types
import type { components, operations } from '@/lib/api-types';

// === API TYPES (truly generated) ===
export type Meeting = components['schemas']['Meeting'];
export type GetMeetingsParams =
  operations['get_meetings_meetings_get']['parameters']['query'];

// === FRONTEND TYPES ===
export type TCalendarView = 'day' | 'week' | 'month' | 'year' | 'agenda';

export type TMeetingColor =
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'orange';

export interface CalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
