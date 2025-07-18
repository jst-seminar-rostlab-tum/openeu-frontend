'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createChatSession } from '@/domain/actions/chat-actions';
import {
  type CreateSessionRequest,
  type SendMessageRequest,
} from '@/domain/entities/chat/generated-types';
import { TContext } from '@/domain/entities/monitor/types';
import { useAuth } from '@/domain/hooks/useAuth';
import { ToastOperations } from '@/operations/toast/toastOperations';
import { chatRepository } from '@/repositories/chatRepository';

// Query Keys
export const chatQueryKeys = {
  sessions: (userId: string) => ['chat-sessions', userId] as const,
  messages: (sessionId: string) => ['chat-messages', sessionId] as const,
} as const;

// Query Hooks
export function useChatSessions() {
  const { user } = useAuth();

  return useQuery({
    queryKey: chatQueryKeys.sessions(user?.id || ''),
    queryFn: () => chatRepository.getChatSessions(user!.id),
    enabled: !!user, // Only fetch if user is authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useChatMessages(sessionId: string | null) {
  return useQuery({
    queryKey: chatQueryKeys.messages(sessionId!),
    queryFn: () => chatRepository.getChatMessages(sessionId!),
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
      contextParams,
    }: {
      request: SendMessageRequest;
      onStreamUpdate?: (content: string) => void;
      contextParams?: Partial<Record<TContext, string>>;
    }) =>
      chatRepository.sendStreamingMessage(
        request,
        onStreamUpdate,
        contextParams,
      ),
    onSuccess: (_, variables) => {
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
