import { Meeting } from '@/domain/entities/MeetingData';

const API_URL = 'https://openeu-backend.onrender.com/meetings';

export const meetingRepository = {
  getMeetings: async (start?: string, end?: string): Promise<Meeting[]> => {
    const params = new URLSearchParams();

    if (start) params.append('start', start);
    if (end) params.append('end', end);

    const url = API_URL + `?${params.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch meetings: ${res.statusText}`);
    }

    const response = await res.json();
    const data = Array.isArray(response.data) ? response.data : [];
    data.forEach((element: Meeting) => {
      if (element.meeting_end_datetime === null) {
        element.meeting_end_datetime = element.meeting_start_datetime;
      }
    });
    return Array.isArray(data) ? data : [];
  },
};
