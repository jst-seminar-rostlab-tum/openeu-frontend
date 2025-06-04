'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Message } from '@/domain/entities/chat/generated-types';
import {
  useChatMessages,
  useCreateChatSession,
  useSendMessage,
} from '@/domain/hooks/chat-hooks';
import { useAuth } from '@/domain/hooks/useAuth';

interface ChatContextType {
  // State
  messages: Message[];
  streamingMessage: string;
  isLoading: boolean;
  currentSessionId: string | null;

  // Actions
  sendMessage: (content: string) => Promise<void>;
  sendTemplate: (message: string) => void;
  switchToSession: (sessionId: string) => void;
  createNewChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();

  const currentSessionId = (params?.sessionId as string) || null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessage, setStreamingMessage] = useState('');

  // Load messages for current session
  const { data: sessionMessages } = useChatMessages(currentSessionId);

  const sendMessageMutation = useSendMessage();
  const createSession = useCreateChatSession();

  // Update messages when session data changes
  useEffect(() => {
    if (sessionMessages) {
      setMessages(sessionMessages);
    } else if (!currentSessionId) {
      setMessages([]);
    }
  }, [sessionMessages, currentSessionId]);

  const sendMessage = async (content: string) => {
    if (!user) return;

    try {
      let targetSessionId = currentSessionId;

      // Create session if none exists
      if (!targetSessionId) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        const session = await createSession.mutateAsync({ title });
        targetSessionId = session.session_id;

        // Navigate to new session
        router.push(`/chat/${targetSessionId}`);
      }

      // Ensure we have a valid session ID
      if (!targetSessionId) {
        throw new Error('Failed to create or get session ID');
      }

      // Optimistic update
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        chat_session: targetSessionId,
        author: 'user',
        date: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Send message with streaming
      setStreamingMessage('');
      const aiResponse = await sendMessageMutation.mutateAsync({
        request: {
          session_id: targetSessionId,
          message: content,
        },
        onStreamUpdate: setStreamingMessage,
      });

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        chat_session: targetSessionId,
        author: 'assistant',
        date: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove optimistic update on error
      setMessages((prev) => prev.slice(0, -1));
      setStreamingMessage('');
    }
  };

  const sendTemplate = (message: string) => {
    sendMessage(message);
  };

  const switchToSession = (sessionId: string) => {
    router.push(`/chat/${sessionId}`);
  };

  const createNewChat = () => {
    router.push('/chat');
  };

  const value: ChatContextType = {
    messages,
    streamingMessage,
    isLoading: sendMessageMutation.isPending || createSession.isPending,
    currentSessionId,
    sendMessage,
    sendTemplate,
    switchToSession,
    createNewChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
