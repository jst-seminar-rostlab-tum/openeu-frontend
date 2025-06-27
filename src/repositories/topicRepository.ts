import { Topic } from '@/domain/entities/calendar/generated-types';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/topics`;

export const topicRepository = {
  async getTopics(): Promise<Topic[]> {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        ToastOperations.showError({
          title: 'Error fetching topic',
          message: 'Failed to fetch topic. Please try again later.',
        });
        throw new Error('Failed to fetch topics');
      }

      const response = await res.json();
      const data = Array.isArray(response.data) ? response.data : [];
      return data;
    } catch {
      return [];
    }
  },
};
