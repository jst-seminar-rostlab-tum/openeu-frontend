'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { toast } from 'sonner';

import ChatInputCard from '@/components/Chat/ChatInputCard';
import { ChatMessage } from '@/components/Chat/ChatMessage';
import { createChatSession } from '@/domain/action/chatActions';
import { Message } from '@/domain/entities/chat/Message';
import { useSessionMessages } from '@/domain/hooks/chatHooks';
import { useStreamingChat } from '@/domain/hooks/useStreamingChat';
import { type ChatMessage as BackendChatMessage } from '@/repositories/chatRepository';

// TODO: Replace with actual user ID from auth
const USER_ID = 'user-123';

export default function Chat() {
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [_, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionFromUrl = searchParams.get('session');

  // Fetch session messages when session changes
  const {
    data: backendMessages = [],
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useSessionMessages(sessionFromUrl || '', !!sessionFromUrl);

  // Stable callback functions to prevent infinite re-renders
  const handleStreamUpdate = useCallback((_: string) => {
    // Stream update handled by the hook itself
  }, []);

  const handleStreamComplete = useCallback(() => {
    // Complete handled by the hook itself
  }, []);

  const handleStreamError = useCallback((error: Error) => {
    toast.error('Failed to send message');
    console.error('Streaming error:', error);
  }, []);

  // Streaming chat hook with stable callbacks
  const {
    sendMessage: sendStreamingMessage,
    isStreaming,
    streamingContent,
  } = useStreamingChat({
    sessionId: sessionFromUrl ? parseInt(sessionFromUrl) : 0,
    onStreamUpdate: handleStreamUpdate,
    onComplete: handleStreamComplete,
    onError: handleStreamError,
  });

  // Convert backend messages to frontend format using useMemo to prevent infinite loops
  const convertedMessages = useMemo(() => {
    if (!backendMessages || backendMessages.length === 0) {
      return [];
    }

    return backendMessages.map((msg: BackendChatMessage) => ({
      id: msg.id.toString(),
      content: msg.content,
      isUser: msg.author === 'user',
      timestamp: msg.date ? new Date(msg.date) : new Date(),
    }));
  }, [backendMessages]);

  // Use converted messages, but prefer local messages when user is actively chatting
  const messages = localMessages.length > 0 ? localMessages : convertedMessages;

  const handleSendMessage = async (content: string) => {
    if (isStreaming) return;

    try {
      // Create new session if none exists
      if (!sessionFromUrl) {
        startTransition(async () => {
          try {
            const title =
              content.slice(0, 50) + (content.length > 50 ? '...' : '');
            const result = await createChatSession(title, USER_ID);
            const newSessionId = result.session_id.toString();

            // Update URL to include session
            router.push(`/chat?session=${newSessionId}`);

            // Add user message to local state immediately
            const userMessage: Message = {
              id: Date.now().toString(),
              content,
              isUser: true,
              timestamp: new Date(),
            };
            setLocalMessages((prev) => [...prev, userMessage]);

            // Send the message via streaming
            await sendStreamingMessage(content);
          } catch (error) {
            toast.error('Failed to create chat session');
            console.error('Error creating session:', error);
          }
        });
      } else {
        // Add user message to local state immediately
        const userMessage: Message = {
          id: Date.now().toString(),
          content,
          isUser: true,
          timestamp: new Date(),
        };
        setLocalMessages((prev) => [...prev, userMessage]);

        // Send the message via streaming
        await sendStreamingMessage(content);
      }
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Error sending message:', error);
    }
  };

  if (messagesError) {
    console.error('Error loading messages:', messagesError);
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1">
        {isLoadingMessages ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading chat session...</p>
          </div>
        ) : messages.length === 0 && !streamingContent ? (
          <div className="h-full flex flex-col items-center justify-center gap-6">
            <Image
              src="/project-europe-no-bg.png"
              alt="Project Europe"
              width={200}
              height={200}
              priority
              className="dark:invert"
            />
            <p className="max-w-xl text-center text-muted-foreground">
              OpenEU helps companies track and understand upcoming EU laws and
              national implementations. Ask anything about regulations,
              directives, or compliance, from sustainability reporting to AI
              governance.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10 w-full pb-8">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {/* Show streaming message */}
            {streamingContent && (
              <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-70">
                {streamingContent}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-background rounded-t-xl">
        <ChatInputCard
          onSendMessage={handleSendMessage}
          onAddFile={() =>
            console.log('Add file functionality - to be implemented')
          }
          onSettings={() =>
            console.log('Settings functionality - to be implemented')
          }
        />
        <p className="text-xs text-muted-foreground text-center py-2">
          OpenEU may occasionally provide incomplete or outdated information.
          Always verify critical details with official EU or national sources.
        </p>
      </div>
    </div>
  );
}
