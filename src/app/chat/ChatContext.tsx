'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Message } from '@/domain/entities/chat/generated-types';
import { SupportedContextType } from '@/domain/entities/monitor/types';
import {
  useChatMessages,
  useCreateChatSession,
  useSendMessage,
} from '@/domain/hooks/chat-hooks';
import { useAuth } from '@/domain/hooks/useAuth';
import { SUPPORTED_CONTEXT_TYPES } from '@/operations/chat/ChatOperations';
import { ToastOperations } from '@/operations/toast/toastOperations';

interface ChatContext {
  type: SupportedContextType;
  id: string;
  title: string;
}

interface ChatContextType {
  // State
  messages: Message[];
  streamingMessage: string;
  isLoading: boolean;
  currentSessionId: string | null;
  contexts: ChatContext[];

  // Actions
  sendMessage: (content: string) => Promise<void>;
  sendTemplate: (message: string) => void;
  switchToSession: (sessionId: string) => void;
  createNewChat: () => void;
  addContext: (context: ChatContext) => void;
  removeContext: (type: SupportedContextType) => void;
  clearAllContexts: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const currentSessionId = (params?.sessionId as string) || null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [contexts, setContexts] = useState<ChatContext[]>([]);

  useEffect(() => {
    const urlContexts: ChatContext[] = SUPPORTED_CONTEXT_TYPES.map((type) => {
      const id = searchParams.get(`${type}_id`);
      const title = searchParams.get(`${type}_title`);
      return id ? { type, id, title: title || id } : null;
    }).filter(Boolean) as ChatContext[];

    if (urlContexts.length > 0) {
      setContexts(urlContexts);
    }
  }, [searchParams]);

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

      // Build context parameters for the API call
      const contextParams: Partial<Record<SupportedContextType, string>> = {};
      contexts.forEach((context) => {
        contextParams[context.type] = context.id;
      });

      // Send message with streaming
      setStreamingMessage('');
      const aiResponse = await sendMessageMutation.mutateAsync({
        request: {
          session_id: targetSessionId,
          message: content,
        },
        onStreamUpdate: setStreamingMessage,
        contextParams,
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
    } catch {
      ToastOperations.showError({
        title: 'Message Failed',
        message: 'Failed to send your message. Please try again.',
      });
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

  const addContext = useCallback((context: ChatContext) => {
    setContexts((prev) => {
      // Check if context already exists
      const exists = prev.some(
        (c) => c.type === context.type && c.id === context.id,
      );
      if (exists) return prev;

      return [...prev, context];
    });
  }, []);

  const removeContext = useCallback((type: SupportedContextType) => {
    setContexts((prev) => prev.filter((context) => context.type !== type));
  }, []);

  const clearAllContexts = useCallback(() => {
    setContexts([]);
  }, []);

  const value: ChatContextType = {
    messages,
    streamingMessage,
    isLoading: sendMessageMutation.isPending || createSession.isPending,
    currentSessionId,
    contexts,
    sendMessage,
    sendTemplate,
    switchToSession,
    createNewChat,
    addContext,
    removeContext,
    clearAllContexts,
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
