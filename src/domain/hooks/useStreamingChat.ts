'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

const API_BASE_URL = 'https://openeu-backend.onrender.com';

export interface UseStreamingChatOptions {
  sessionId: number;
  onStreamUpdate?: (content: string) => void;
  onComplete?: (finalContent: string) => void;
  onError?: (error: Error) => void;
}

export function useStreamingChat({
  sessionId,
  onStreamUpdate,
  onComplete,
  onError,
}: UseStreamingChatOptions) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const queryClient = useQueryClient();

  const sendMessage = useCallback(
    async (message: string) => {
      if (isStreaming) return;

      setIsStreaming(true);
      setStreamingContent('');

      try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionId,
            message,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to send message: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Response body is not readable');
        }

        let accumulated = '';
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: ') {
              const content = line.slice(6); // Remove 'data: ' prefix
              accumulated += content;
              setStreamingContent(accumulated);
              onStreamUpdate?.(accumulated);
            }
          }
        }

        onComplete?.(accumulated);

        // Invalidate relevant queries to refresh the UI
        await queryClient.invalidateQueries({
          queryKey: ['session-messages', sessionId.toString()],
        });
        await queryClient.invalidateQueries({
          queryKey: ['user-sessions'],
        });
      } catch (error) {
        console.error('Error sending message:', error);
        onError?.(error as Error);
      } finally {
        setIsStreaming(false);
        setStreamingContent('');
      }
    },
    [sessionId, isStreaming, onStreamUpdate, onComplete, onError, queryClient],
  );

  const clearStreamingContent = useCallback(() => {
    setStreamingContent('');
  }, []);

  return {
    sendMessage,
    isStreaming,
    streamingContent,
    clearStreamingContent,
  };
}
