import { MeetingData } from '@/domain/entities/MeetingData';

const API_URL = '/api/meetings'; // Supabase REST endpoint

export const meetingRepository = {
  async getMeetings(): Promise<MeetingData[]> {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error('Failed to fetch meetings');
    }

    return res.json();
  },
};
