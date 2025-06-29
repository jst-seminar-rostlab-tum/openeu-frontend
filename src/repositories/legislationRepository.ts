import { getCookie } from 'cookies-next';

import {
  LegislativeFileSuggestion,
  LegislativeFileSuggestionResponse,
} from '@/domain/entities/monitor/generated-types';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/legislative-files`;

export const legislationRepository = {
  async getLegislationSuggestions(
    query: string,
  ): Promise<LegislativeFileSuggestion[]> {
    if (!query || query.length < 2) return [];

    const token = getCookie('token');

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
        throw new Error(
          `Failed to fetch legislation suggestions: ${res.status}`,
        );
      }
      const response: LegislativeFileSuggestionResponse = await res.json();
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      ToastOperations.showError({
        title: 'Error fetching legislation suggestions',
        message:
          'Failed to fetch legislation suggestions. Please try again later.',
      });
      throw new Error('Failed to fetch legislation suggestions', {
        cause: err,
      });
    }
  },

  async getLegislations() {
    try {
      const res = await fetch(API_URL);

      const parsedRes = await res.json();
      const data = Array.isArray(parsedRes.data) ? parsedRes.data : [];

      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },
};
