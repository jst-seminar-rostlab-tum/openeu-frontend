import { getCookie } from 'cookies-next';
import { addHours } from 'date-fns';

import {
  Meeting,
  MeetingSuggestion,
  MeetingSuggestionResponse,
} from '@/domain/entities/calendar/generated-types';
import { GetMeetingsQueryParams } from '@/domain/hooks/meetingHooks';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/meetings`;

export const meetingRepository = {
  async getMeetingSuggestions(query: string): Promise<MeetingSuggestion[]> {
    const token = getCookie('token');

    if (!query || query.length < 2) return [];

    try {
      const res = await fetch(
        `${API_URL}/suggestions?query=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch meeting suggestions: ${res.status}`);
      }
      const response: MeetingSuggestionResponse = await res.json();
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      ToastOperations.showError({
        title: 'Error fetching meeting suggestions',
        message: 'Failed to fetch meeting suggestions. Please try again later.',
      });
      throw new Error('Failed to fetch meetings suggestions', { cause: err });
    }
  },

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
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
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
