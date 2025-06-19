import {
  type ChatSession,
  type Message,
  type SendMessageRequest,
} from '@/domain/entities/chat/generated-types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://openeu-backend.onrender.com';

export const chatRepository = {
  /**
   * Fetch all chat sessions for a specific user
   */
  async getChatSessions(userId: string): Promise<ChatSession[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/chat/sessions?user_id=${userId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error(
        'Error fetching chat sessions: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  },

  /**
   * Fetch all messages for a specific chat session
   */
  async getChatMessages(sessionId: string): Promise<Message[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/chat/sessions/${sessionId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error(
        'Error fetching chat messages: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  },

  /**
   * Send a message with streaming response support
   */
  async sendStreamingMessage(
    request: SendMessageRequest,
    onStreamUpdate?: (content: string) => void,
  ): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body reader available');
      }

      const decoder = new TextDecoder();
      let accumulated = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                return accumulated;
              }

              if (data.trim()) {
                accumulated += data;
                onStreamUpdate?.(accumulated);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      return accumulated;
    } catch (error) {
      throw new Error(
        'Error sending streaming message: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  },
};
