'use client';

import { useChatContext } from '@/app/chat/ChatContext';

import { ChatMessage } from './ChatMessage';

export default function ChatInterface() {
  const { messages, streamingMessage } = useChatContext();

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
