import { Meeting } from '@/domain/entities/MeetingData';

const API_URL = 'https://openeu-backend.onrender.com/meetings';

export const meetingRepository = {
  getMeetings: async (start?: Date, end?: Date): Promise<Meeting[]> => {
    const params = new URLSearchParams();
    const startDate = start?.toString() || '';
    const endDate = end?.toString() || '';

    if (startDate) params.append('meeting_start_datetime', startDate);
    if (endDate) params.append('meeting_end_datetime', endDate);

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
