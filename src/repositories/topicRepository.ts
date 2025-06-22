import { Topic } from '@/domain/entities/calendar/generated-types';
import { ToastOperations } from '@/operations/toast/toastOperations';
const API_URL = 'https://openeu-backend-1.onrender.com/topics';

export const topicRepository = {
  async getTopics(): Promise<Topic[]> {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        ToastOperations.showError({
          title: 'Error fetching topic',
          message: `HTTP error! status: ${res.status}`,
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
