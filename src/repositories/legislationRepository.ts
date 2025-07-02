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

    try {
      const res = await fetch(
        `${API_URL}/suggestions?query=${encodeURIComponent(query)}`,
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
