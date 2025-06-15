import { TopicData } from '@/domain/entities/calendar/TopicData';

const API_URL = 'https://openeu-backend-1.onrender.com/topics';

export const topicRepository = {
  async getTopics(): Promise<TopicData[]> {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
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
