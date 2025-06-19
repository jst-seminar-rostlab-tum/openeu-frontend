import { Topic } from '@/domain/entities/calendar/generated-types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/topics`;

export const topicRepository = {
  async getTopics(): Promise<Topic[]> {
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
