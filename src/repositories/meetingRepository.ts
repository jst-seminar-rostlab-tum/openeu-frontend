import { MeetingData } from '@/domain/entities/calendar/MeetingData';

const API_URL = 'https://openeu-backend.onrender.com/meetings';

export const meetingRepository = {
  async getMeetings(): Promise<MeetingData[]> {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error('Failed to fetch meetings');
      }
      return await res.json();
    } catch {
      return [];
    }
  },
};
