'use client';

import { useLayoutEffect, useRef } from 'react';

import { useChatContext } from '@/app/chat/ChatContext';

import { ChatMessage } from './ChatMessage';
import { useScrollToBottomButton } from './ChatScrollContainer';

export default function ChatInterface() {
  const { messages, streamingMessage } = useChatContext();
  const { scrollToBottomAfterRender } = useScrollToBottomButton();
  const prevMessageCountRef = useRef(messages.length);
  const isInitialLoadRef = useRef(true);

  useLayoutEffect(() => {
    const currentMessageCount = messages.length;
    const hasNewMessages = currentMessageCount > prevMessageCountRef.current;

    if (isInitialLoadRef.current || hasNewMessages) {
      scrollToBottomAfterRender();
      isInitialLoadRef.current = false;
    }

    prevMessageCountRef.current = currentMessageCount;
  }, [messages, scrollToBottomAfterRender]);

  return (
    <div className="flex flex-col gap-10 w-full pb-8">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {streamingMessage && (
        <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-70 break-words overflow-wrap-anywhere">
          {streamingMessage}
        </p>
      )}
    </div>
  );
}
