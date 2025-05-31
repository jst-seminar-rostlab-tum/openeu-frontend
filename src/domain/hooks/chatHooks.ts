'use client';

import { useQuery } from '@tanstack/react-query';

import {
  type ChatMessage,
  chatRepository,
  type ChatSession,
} from '@/repositories/chatRepository';

export const useUserSessions = (userId: string, enabled = true) =>
  useQuery<ChatSession[]>({
    queryKey: ['user-sessions', userId],
    queryFn: () => chatRepository.getUserSessions(userId),
    enabled: enabled && !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

export const useSessionMessages = (sessionId: string, enabled = true) =>
  useQuery<ChatMessage[]>({
    queryKey: ['session-messages', sessionId],
    queryFn: () => chatRepository.getSessionMessages(sessionId),
    enabled: enabled && !!sessionId,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
