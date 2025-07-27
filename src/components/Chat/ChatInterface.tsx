'use client';

import { useLayoutEffect, useRef } from 'react';

import { useChatContext } from '@/app/chat/ChatContext';

import { AIResponseSkeleton } from './AIResponseSkeleton';
import { ChatMessage } from './ChatMessage';
import { useScrollToBottomButton } from './ChatScrollContainer';
import { StreamingMarkdown } from './StreamingMarkdown';

export default function ChatInterface() {
  const { messages, streamingMessage, isLoading = false } = useChatContext();
  const { scrollToBottomAfterRender } = useScrollToBottomButton();
  const prevMessageCountRef = useRef(messages.length);
  const isInitialLoadRef = useRef(true);

  useLayoutEffect(() => {
    const currentMessageCount = messages.length;
    const hasNewMessages = currentMessageCount > prevMessageCountRef.current;

    if (isInitialLoadRef.current || hasNewMessages || isLoading) {
      scrollToBottomAfterRender();
      isInitialLoadRef.current = false;
    }

    prevMessageCountRef.current = currentMessageCount;
  }, [messages, scrollToBottomAfterRender, isLoading]);

  return (
    <div className="flex flex-col gap-10 w-full pb-8">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {/* Show skeleton when loading but no streaming message yet */}
      {isLoading && !streamingMessage && (
        <div className="max-w-none bg-muted/30 rounded-lg p-3 opacity-70">
          <AIResponseSkeleton />
        </div>
      )}

      {/* Show streaming message when it exists */}
      {streamingMessage && (
        <div className="max-w-none bg-muted/30 rounded-lg p-3 opacity-70">
          <StreamingMarkdown content={streamingMessage} isStreaming={true} />
        </div>
      )}
    </div>
  );
}
