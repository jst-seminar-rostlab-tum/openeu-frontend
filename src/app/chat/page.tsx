'use client';

import Image from 'next/image';
import { useState } from 'react';

import ChatInputCard from '@/components/Chat/ChatInputCard';
import { ChatMessage } from '@/components/Chat/ChatMessage';
import ChatOperations, { type Message } from '@/operations/chat/ChatOperations';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [streamingMessage, setStreamingMessage] = useState('');

  const handleSendMessage = async (content: string) => {
    await ChatOperations.handleSendMessage(
      content,
      currentSessionId,
      setCurrentSessionId,
      setMessages,
      setStreamingMessage,
    );
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1">
        {messages.length === 0 ? (
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
            {streamingMessage && (
              <p className="whitespace-pre-wrap text-sm leading-relaxed opacity-70">
                {streamingMessage}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-background rounded-t-xl">
        <ChatInputCard
          onSendMessage={handleSendMessage}
          onAddFile={ChatOperations.handleAddFile}
          onSettings={ChatOperations.handleSettings}
        />
        <p className="text-xs text-muted-foreground text-center py-2">
          OpenEU may occasionally provide incomplete or outdated information.
          Always verify critical details with official EU or national sources.
        </p>
      </div>
    </div>
  );
}
