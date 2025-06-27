import { getCookie } from 'cookies-next';
import { addHours } from 'date-fns';

import { Meeting } from '@/domain/entities/calendar/generated-types';
import { GetMeetingsQueryParams } from '@/domain/hooks/meetingHooks';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/meetings`;

export const meetingRepository = {
  async getMeetings(params: GetMeetingsQueryParams): Promise<Meeting[]> {
    const token = getCookie('token');
    const query = params
      ? Object.entries(params)
          .filter((entry) => !!entry[1])
          .map((entry) => {
            const [key, value] = entry;
            const paramValue = Array.isArray(value) ? value.join(',') : value;
            return `${key}=${paramValue}`;
          })
          .join('&')
      : undefined;
    try {
      const res = await fetch(`${API_URL}${query ? `?${query}` : ''}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        ToastOperations.showError({
          title: 'Error fetching meetings',
          message: 'Failed to fetch meetings. Please try again later.',
        });
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
