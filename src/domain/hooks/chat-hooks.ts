'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createChatSession } from '@/domain/actions/chat-actions';
import {
  type ChatSession,
  type CreateSessionRequest,
  type Message,
  type SendMessageRequest,
} from '@/domain/entities/chat/generated-types';
import { useAuth } from '@/domain/hooks/useAuth';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://openeu-backend-1.onrender.com';

// Query Keys
export const chatQueryKeys = {
  sessions: (userId: string) => ['chat-sessions', userId] as const,
  messages: (sessionId: string) => ['chat-messages', sessionId] as const,
} as const;

// Fetch functions using generated types directly
async function fetchChatSessions(userId: string): Promise<ChatSession[]> {
  const response = await fetch(
    `${API_BASE_URL}/chat/sessions?user_id=${userId}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch chat sessions');
  }
  return response.json();
}

async function fetchChatMessages(sessionId: string): Promise<Message[]> {
  const response = await fetch(`${API_BASE_URL}/chat/sessions/${sessionId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch chat messages');
  }
  return response.json();
}

// Streaming function (can't be server action due to streaming nature)
async function sendStreamingMessage(
  request: SendMessageRequest,
  onStreamUpdate?: (content: string) => void,
): Promise<string> {
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
}

// Query Hooks
export function useChatSessions() {
  const { user } = useAuth();

  return useQuery({
    queryKey: chatQueryKeys.sessions(user?.id || ''),
    queryFn: () => fetchChatSessions(user!.id),
    enabled: !!user, // Only fetch if user is authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useChatMessages(sessionId: string | null) {
  return useQuery({
    queryKey: chatQueryKeys.messages(sessionId!),
    queryFn: () => fetchChatMessages(sessionId!),
    enabled: sessionId !== null,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Mutation Hooks using Server Actions + TanStack Query
export function useCreateChatSession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: Omit<CreateSessionRequest, 'user_id'>) =>
      createChatSession(data),
    onSuccess: (_) => {
      // Invalidate and refetch sessions
      if (user) {
        queryClient.invalidateQueries({
          queryKey: chatQueryKeys.sessions(user.id),
        });
      }
    },
    onError: () =>
      ToastOperations.showError({
        title: 'Session Creation Failed',
        message: 'Failed to create a new chat session. Please try again.',
      }),
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      request,
      onStreamUpdate,
    }: {
      request: SendMessageRequest;
      onStreamUpdate?: (content: string) => void;
    }) => sendStreamingMessage(request, onStreamUpdate),
    onSuccess: (_, variables) => {
      // Invalidate messages cache for this session
      queryClient.invalidateQueries({
        queryKey: chatQueryKeys.messages(variables.request.session_id),
      });
    },
    onError: () =>
      ToastOperations.showError({
        title: 'Message Failed',
        message: 'Failed to send your message. Please try again.',
      }),
  });
}
