import React from 'react';

import { Message } from '@/domain/entities/chat/Message';

export default class ChatOperations {
  // TODO: Replace with actual user ID from auth
  private static readonly userId = 'user-123';

  static async createSession(title: string): Promise<string> {
    // TODO: Replace with actual API call to POST /chat/start
    console.log('Creating session:', { userId: this.userId, title });
    const mockSessionId = `session-${Date.now()}`;
    return mockSessionId;
  }

  static async sendMessageToAPI(
    sessionId: string,
    message: string,
    onStreamUpdate?: (accumulated: string) => void,
  ): Promise<string> {
    // TODO: Replace with actual API call to POST /chat with streaming
    console.log('Sending message:', { sessionId, message });

    // Mock streaming response
    const mockResponse =
      "I'm OpenEU, your AI assistant for EU regulations and compliance. How can I help you understand upcoming EU laws, directives, or compliance requirements?";

    // Simulate streaming using array methods and Promise.all
    const words = mockResponse.split(' ');
    let accumulated = '';

    await Promise.all(
      words.map(
        (word, index) =>
          new Promise<void>((resolve) => {
            setTimeout(() => {
              accumulated += `${word} `;
              onStreamUpdate?.(accumulated);
              resolve();
            }, index * 100);
          }),
      ),
    );

    return accumulated.trim();
  }

  static handleAddFile(): void {
    console.log('Add file functionality - to be implemented');
  }

  static handleSettings(): void {
    console.log('Settings functionality - to be implemented');
  }

  static async handleSendMessage(
    content: string,
    currentSessionId: string | null,
    setCurrentSessionId: (id: string) => void,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setStreamingMessage: (message: string) => void,
  ): Promise<void> {
    try {
      let sessionId = currentSessionId;
      if (!sessionId) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        sessionId = await this.createSession(title);
        setCurrentSessionId(sessionId);
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      setStreamingMessage('');
      const aiResponse = await this.sendMessageToAPI(
        sessionId,
        content,
        setStreamingMessage,
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}

export type { Message };
