import { MeetingData } from '@/domain/entities/calendar/MeetingData';

const API_URL = 'https://openeu-backend.onrender.com/meetings';

export const meetingRepository = {
  getMeetings: async (
    start?: string,
    end?: string,
    query?: string,
  ): Promise<MeetingData[]> => {
    const params = new URLSearchParams();

    if (start) params.append('start', start);
    if (end) params.append('end', end);
    if (query) params.append('query', query);

    const url = API_URL + `?${params.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch meetings: ${res.statusText}`);
    }

    const response = await res.json();
    const data = Array.isArray(response.data) ? response.data : [];
    data.forEach((element: MeetingData) => {
      if (element.meeting_end_datetime === null) {
        element.meeting_end_datetime = element.meeting_start_datetime;
      }
    });
    return Array.isArray(data) ? data : [];
  },
};
