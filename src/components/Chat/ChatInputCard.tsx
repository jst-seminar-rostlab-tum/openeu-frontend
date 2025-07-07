'use client';

import { KeyboardEvent, useState } from 'react';

import { useChatContext } from '@/app/chat/ChatContext';
import { ChatToolbar } from '@/components/Chat/ChatToolbar';
import { ContextBadge } from '@/components/Chat/ContextBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import ChatOperations from '@/operations/chat/ToolbarOperations';

export default function ChatInputCard() {
  const [input, setInput] = useState('');

  const { sendMessage, context } = useChatContext();

  const handleSubmit = () => {
    const trimmedValue = input.trim();
    if (!trimmedValue) return;

    sendMessage(trimmedValue);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="p-3 pb-1 w-full shadow-md">
      <CardContent className="flex flex-col p-0">
        {context && (
          <div className="mb-2">
            <ContextBadge id={context.id} />
          </div>
        )}
        <Textarea
          placeholder="Ask a question"
          className="max-h-[200px] resize-none border-0 bg-transparent dark:bg-transparent p-0 focus-visible:ring-0 shadow-none min-h-0 px-2 !text-base scrollbar-custom"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ChatToolbar
          onSubmit={handleSubmit}
          disabled={!input.trim()}
          onSettings={ChatOperations.handleSettings}
        />
      </CardContent>
    </Card>
  );
}
