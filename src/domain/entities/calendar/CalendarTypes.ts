// Import the auto-generated types
import { MeetingData } from './generated-types';

// === EXTENDED API TYPES ===
export type Meeting = MeetingData & {
  color: string;
  meeting_end_datetime: string;
};

// === FRONTEND-ONLY TYPES ===
export type TCalendarView = 'day' | 'week' | 'month' | 'year' | 'agenda';

export type TMeetingColor = string;

export interface CalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}

export type Member = {
  id: string;
  type: string;
  label: string;
  family_name: string;
  given_name: string;
  sort_label: string;
  country: string;
};
