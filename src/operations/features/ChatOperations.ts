interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default class ChatOperations {
  static getChatMessages(): ChatMessage[] {
    return [
      {
        id: 1,
        text: 'What are the key changes in the Digital Services Act?',
        isUser: true,
        timestamp: '10:31 AM',
      },
      {
        id: 2,
        text: 'DSA introduces content moderation, algorithm transparency, and new platform rules.',
        isUser: false,
        timestamp: '10:31 AM',
      },
    ];
  }

  static generateMockAIResponse(): string {
    return 'I can help with that regulation. Let me provide details for your situation.';
  }

  static createChatMessage(
    id: number,
    text: string,
    isUser: boolean,
  ): ChatMessage {
    return {
      id,
      text,
      isUser,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }
}

export type { ChatMessage };
