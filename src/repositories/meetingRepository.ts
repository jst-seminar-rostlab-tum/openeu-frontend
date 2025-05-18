import { MeetingData } from '@/domain/entities/MeetingData';

const API_URL = 'https://openeu-backend.onrender.com/meetings';

// const API_URL = 'http://127.0.0.1:8000/meetings';
const DUMMY_MEETINGS: MeetingData[] = [
  {
    date: 'today',
    name: 'Team Sync',
    tags: ['Weekly2'],
  },
  {
    date: 'tmr',
    name: 'Team Sync 2',
    tags: ['Weekly 1'],
  },
];

export const meetingRepository = {
  async getMeetings(): Promise<MeetingData[]> {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error('Failed to fetch meetings');
      }
      return await res.json();
    } catch {
      // console.warn('Returning dummy data as fallback.');
      return DUMMY_MEETINGS; // Return dummy data as a fallback
    }
  },
};
