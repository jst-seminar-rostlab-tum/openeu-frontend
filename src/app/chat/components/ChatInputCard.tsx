'use client';

import { KeyboardEvent, useState } from 'react';

import { ChatToolbar } from '@/app/chat/components/ChatToolbar';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputCardProps {
  onSendMessage: (message: string) => void;
  onAddFile?: () => void;
  onSettings?: () => void;
}

export default function ChatInputCard({
  onSendMessage,
  onAddFile,
  onSettings,
}: ChatInputCardProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmedValue = input.trim();
      if (!trimmedValue) return;

      onSendMessage(trimmedValue);
      setInput('');
    }
  };

  const handleSubmit = () => {
    const trimmedValue = input.trim();
    if (!trimmedValue) return;

    onSendMessage(trimmedValue);
    setInput('');
  };

  return (
    <Card className="p-3 pb-1 w-full shadow-md">
      <CardContent className="flex flex-col p-0">
        <Textarea
          placeholder="Ask a question"
          className="max-h-[200px] resize-none border-0 bg-transparent dark:bg-transparent p-0 focus-visible:ring-0 shadow-none min-h-0 px-2 !text-base"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ChatToolbar
          onSubmit={handleSubmit}
          disabled={!input.trim()}
          onAddFile={onAddFile}
          onSettings={onSettings}
        />
      </CardContent>
    </Card>
  );
}
