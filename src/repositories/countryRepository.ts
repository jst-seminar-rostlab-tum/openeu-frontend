import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/countries`;

export const countryRepository = {
  async getCountries(): Promise<string[]> {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        ToastOperations.showError({
          title: 'Error fetching countries',
          message: 'Failed to fetch countries. Please try again later.',
        });
        throw new Error('Failed to fetch countries');
      }

      const response = await res.json();
      return Array.isArray(response.data) ? response.data : [];
    } catch {
      return [];
    }
  },
};
