export interface MeetingData {
  date: string; // ISO date string from Supabase, might need some conversion
  name: string;
  tags: string[];
}
