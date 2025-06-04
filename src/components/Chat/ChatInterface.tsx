'use client';

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
  return (
    <div className="flex flex-col gap-10 w-full pb-8">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {/* Show streaming message */}
      {streamingMessage && (
        <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-70">
          {streamingMessage}
        </p>
      )}
    </div>
  );
}
