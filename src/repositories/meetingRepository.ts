import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { GetMeetingsQueryParams } from '@/domain/hooks/meetingHooks';

const API_URL = 'https://openeu-backend.onrender.com/meetings';

export const meetingRepository = {
  async getMeetings(params: GetMeetingsQueryParams): Promise<MeetingData[]> {
    const query = params
      ? Object.entries(params)
          .filter((entry) => !!entry[1])
          .map((entry) => `${entry[0]}=${entry[1]}`)
          .join('&')
      : undefined;
    try {
      const res = await fetch(`${API_URL}${query ? `?${query}` : ''}`);
      if (!res.ok) {
        throw new Error('Failed to fetch meetings');
      }
      return (await res.json()).data as MeetingData[];
    } catch {
      return [];
    }
  },
};
