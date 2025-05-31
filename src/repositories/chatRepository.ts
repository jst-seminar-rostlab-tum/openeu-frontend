const API_BASE_URL = 'https://openeu-backend.onrender.com';

export interface ChatSession {
  id: number;
  title: string;
  user_id: string;
}

export interface ChatMessage {
  id: number;
  chat_session: number;
  content: string;
  author: 'user' | 'assistant';
  date: string;
}

export const chatRepository = {
  async getUserSessions(userId: string): Promise<ChatSession[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/chat/sessions?user_id=${userId}`,
        {
          next: { tags: ['user-sessions'] }, // For cache invalidation
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user sessions');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user sessions:', error);
      return [];
    }
  },

  async getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/chat/sessions/${sessionId}`,
        {
          next: { tags: [`session-messages-${sessionId}`] }, // For cache invalidation
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch session messages');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching session messages:', error);
      return [];
    }
  },
};
