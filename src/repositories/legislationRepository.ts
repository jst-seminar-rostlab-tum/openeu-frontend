import { getCookie } from 'cookies-next';

import {
  LegislativeFile,
  LegislativeFilesParams,
  LegislativeFilesResponse,
  LegislativeFileSuggestion,
  LegislativeFileSuggestionResponse,
  LegislativeSuggestionsParams,
  LegislativeUniqueValues,
} from '@/domain/entities/monitor/generated-types';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/legislative-files`;

export const legislationRepository = {
  async getLegislationSuggestions(
    params: LegislativeSuggestionsParams,
  ): Promise<LegislativeFileSuggestion[]> {
    if (!params.query || params.query.length < 2) return [];

    const token = getCookie('token');

    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      );

      const searchParams = new URLSearchParams(cleanParams);
      const res = await fetch(`${API_URL}/suggestions?${searchParams}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

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

  async getLegislativeFiles(
    params?: LegislativeFilesParams,
  ): Promise<LegislativeFile[]> {
    const token = getCookie('token');

    try {
      let url = API_URL;

      if (params) {
        const cleanParams = Object.fromEntries(
          Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => [key, String(value)]),
        );

        if (Object.keys(cleanParams).length > 0) {
          const searchParams = new URLSearchParams(cleanParams);
          url = `${API_URL}?${searchParams}`;
        }
      }

      const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch legislative files: ${res.status}`);
      }

      const response: LegislativeFilesResponse | { data: LegislativeFile[] } =
        await res.json();
      // Handle both possible response structures
      if ('data' in response && Array.isArray(response.data)) {
        return response.data;
      }
      if (
        'legislative_files' in response &&
        Array.isArray(response.legislative_files)
      ) {
        return response.legislative_files;
      }
      return [];
    } catch (err) {
      console.warn('Failed to fetch from API, returning empty array:', err);
      return [];
    }
  },

  async getLegislativeUniqueValues(): Promise<LegislativeUniqueValues> {
    const token = getCookie('token');

    try {
      const res = await fetch(`${API_URL}/unique-values`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch unique values: ${res.status}`);
      }

      const response: LegislativeUniqueValues = await res.json();
      return response;
    } catch (err) {
      ToastOperations.showError({
        title: 'Error fetching unique values',
        message: 'Failed to fetch unique values. Please try again later.',
      });
      throw new Error('Failed to fetch unique values', {
        cause: err,
      });
    }
  },
};
