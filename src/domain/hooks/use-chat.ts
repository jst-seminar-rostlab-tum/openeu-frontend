'use client';

import { useState } from 'react';

import { Message } from '../entities/chat/Message';
import { useCreateChatSession, useSendMessage } from './chat-hooks';

// TODO: Replace with actual user ID from auth
const USER_ID = 'user-123';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [streamingMessage, setStreamingMessage] = useState('');

  const createSession = useCreateChatSession();
  const sendMessage = useSendMessage();

  const handleSendMessage = async (content: string) => {
    try {
      let sessionId = currentSessionId;

      // Create session if none exists
      if (!sessionId) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        const session = await createSession.mutateAsync({
          title,
          user_id: USER_ID,
        });
        sessionId = session.id;
        setCurrentSessionId(sessionId);
      }

      // Add user message to UI immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        isUser: true,
        timestamp: new Date(),
        session_id: sessionId,
        author: 'user',
      };
      setMessages((prev) => [...prev, userMessage]);

      // Send message and handle streaming response
      setStreamingMessage('');
      const aiResponse = await sendMessage.mutateAsync({
        request: {
          session_id: sessionId,
          message: content,
        },
        onStreamUpdate: setStreamingMessage,
      });

      // Add AI response to messages
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        session_id: sessionId,
        author: 'assistant',
      };
      setMessages((prev) => [...prev, aiMessage]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setStreamingMessage('');
      // Error handling is managed by TanStack Query
    }
  };

  return {
    // State
    messages,
    streamingMessage,
    currentSessionId,

    // Actions
    handleSendMessage,

    // Loading states from TanStack Query
    isCreatingSession: createSession.isPending,
    isSendingMessage: sendMessage.isPending,

    // Error states from TanStack Query
    sessionError: createSession.error,
    messageError: sendMessage.error,

    // Helper computed states
    isLoading: createSession.isPending || sendMessage.isPending,
    hasError: !!createSession.error || !!sendMessage.error,
  };
}
