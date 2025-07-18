'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createChatSession } from '@/domain/actions/chat-actions';
import {
  type CreateSessionRequest,
  type Message,
  type SendMessageRequest,
} from '@/domain/entities/chat/generated-types';
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
    }: {
      request: SendMessageRequest;
      onStreamUpdate?: (content: string) => void;
    }) => chatRepository.sendStreamingMessage(request, onStreamUpdate),

    onMutate: async ({ request }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: chatQueryKeys.messages(request.session_id),
      });

      // Snapshot the previous value
      const previousMessages =
        queryClient.getQueryData<Message[]>(
          chatQueryKeys.messages(request.session_id),
        ) || [];

      // Optimistically update to the new value
      const optimisticUserMessage: Message = {
        id: `temp-${Date.now()}`,
        content: request.message,
        chat_session: request.session_id,
        author: 'user',
        date: new Date().toISOString(),
      };

      queryClient.setQueryData(chatQueryKeys.messages(request.session_id), [
        ...previousMessages,
        optimisticUserMessage,
      ]);

      // Return context object with the snapshotted value
      return { previousMessages, optimisticUserMessage };
    },

    onSuccess: (aiResponse, variables) => {
      // Get current messages from cache
      const currentMessages =
        queryClient.getQueryData<Message[]>(
          chatQueryKeys.messages(variables.request.session_id),
        ) || [];

      // Add AI response to the conversation
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        chat_session: variables.request.session_id,
        author: 'assistant',
        date: new Date().toISOString(),
      };

      queryClient.setQueryData(
        chatQueryKeys.messages(variables.request.session_id),
        [...currentMessages, aiMessage],
      );
    },

    onError: (error, variables, context) => {
      // If the mutation fails, use the context to roll back
      if (context?.previousMessages) {
        queryClient.setQueryData(
          chatQueryKeys.messages(variables.request.session_id),
          context.previousMessages,
        );
      }

      ToastOperations.showError({
        title: 'Message Failed',
        message: 'Failed to send your message. Please try again.',
      });
    },

    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: chatQueryKeys.messages(variables.request.session_id),
      });
    },
  });
}
