export interface MeetingData {
  date: string; // ISO date string from Supabase, might need some conversion
  name: string;
  tags: string[];
  country: string;
}

export interface Meeting {
  meeding_id: string;
  title: string;
  status?: string;
  meeting_url: string;
  meeting_start_datetime: string;
  meeting_end_datetime?: string;
  location: string;
  description?: string;
  tags?: string[];
  similarity?: number;
  exact_location?: string;
}

export const meetingsPerCountry: Map<string, number> = new Map<string, number>([
  ['Austria', 0],
  ['Belgium', 0],
  ['Bulgaria', 0],
  ['Croatia', 0],
  ['Cyprus', 0],
  ['Czech Republic', 0],
  ['Denmark', 0],
  ['Estonia', 0],
  ['Finland', 0],
  ['France', 0],
  ['Germany', 0],
  ['Greece', 0],
  ['Hungary', 0],
  ['Ireland', 0],
  ['Italy', 0],
  ['Latvia', 0],
  ['Lithuania', 0],
  ['Luxembourg', 0],
  ['Malta', 0],
  ['Netherlands', 0],
  ['Poland', 0],
  ['Portugal', 0],
  ['Romania', 0],
  ['Slovakia', 0],
  ['Slovenia', 0],
  ['Spain', 0],
  ['Sweden', 0],
]);
