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
      const response = await res.json();
      const data = Array.isArray(response.data) ? response.data : [];

      // Handle null end datetime
      data.forEach((element: MeetingData) => {
        if (element.meeting_end_datetime === null) {
          element.meeting_end_datetime = element.meeting_start_datetime;
        }
      });

      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },
};
