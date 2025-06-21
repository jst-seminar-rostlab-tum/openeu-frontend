import { addHours } from 'date-fns';

import { Meeting } from '@/domain/entities/calendar/generated-types';
import { GetMeetingsQueryParams } from '@/domain/hooks/meetingHooks';

const API_URL = 'https://openeu-backend-1.onrender.com/meetings';

export const meetingRepository = {
  async getMeetings(params: GetMeetingsQueryParams): Promise<Meeting[]> {
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
      data.forEach((element: Meeting) => {
        if (element.meeting_end_datetime === null) {
          element.meeting_end_datetime = addHours(
            new Date(element.meeting_start_datetime),
            1.5,
          ).toISOString();
        }
      });

      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },
};
