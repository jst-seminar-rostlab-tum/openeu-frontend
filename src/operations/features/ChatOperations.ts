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
        text: "Hello! I'm OpenEU AI. How can I help you with EU regulations today?",
        isUser: false,
        timestamp: '10:30 AM',
      },
      {
        id: 2,
        text: 'What are the key changes in the Digital Services Act?',
        isUser: true,
        timestamp: '10:31 AM',
      },
      {
        id: 3,
        text: 'The DSA introduces enhanced content moderation, algorithm transparency, stricter rules for large platforms, and new risk assessments. Need details on any aspect?',
        isUser: false,
        timestamp: '10:31 AM',
      },
    ];
  }

  static generateMockAIResponse(): string {
    return "I'd be happy to help you understand that regulation. Let me provide you with the most up-to-date information and relevant implementation details for your specific situation.";
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
