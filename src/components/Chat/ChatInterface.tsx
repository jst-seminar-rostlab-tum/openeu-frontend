'use client';

import { useEffect, useRef } from 'react';

import { Message } from '@/domain/entities/chat/generated-types';

import { ChatMessage } from './ChatMessage';

interface ChatInterfaceProps {
  messages: Message[];
  streamingMessage?: string;
}

export default function ChatInterface({
  messages,
  streamingMessage,
}: ChatInterfaceProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: isFirstRender.current ? 'auto' : 'smooth',
      });
      isFirstRender.current = false;
    }
  }, [messages, streamingMessage]);

  return (
    <div className="flex flex-col gap-10 w-full pb-8">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {/* Show streaming message */}
      {streamingMessage && (
        <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-70 break-words overflow-wrap-anywhere">
          {streamingMessage}
        </p>
      )}

      {/* Invisible div to scroll to */}
      <div ref={bottomRef} />
    </div>
  );
}
