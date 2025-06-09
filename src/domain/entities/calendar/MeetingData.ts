export interface MeetingData {
  meeting_id: string;
  title: string;
  meeting_url: string;
  meeting_start_datetime: string;
  meeting_end_datetime: string;
  location: string;
  description: string;
  tags: string[];
  color?: string;
  similarity?: number;
  exact_location?: string;
  source_table?: string;
}
