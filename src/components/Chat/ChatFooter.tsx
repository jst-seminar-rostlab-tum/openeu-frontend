'use client';

import { ArrowDown } from 'lucide-react';

import ChatInputCard from '@/components/Chat/ChatInputCard';

import { Button } from '../ui/button';
import { useScrollToBottomButton } from './ChatScrollContainer';

export default function ChatFooter() {
  const { showScrollButton, scrollToBottom } = useScrollToBottomButton();

  return (
    <div className="sticky bottom-0">
      {showScrollButton && (
        <div className="flex justify-center mb-4">
          <Button
            className="rounded-full"
            variant="secondary"
            size="icon"
            onClick={scrollToBottom}
            title="Scroll to bottom"
          >
            <ArrowDown />
          </Button>
        </div>
      )}
      <div className="bg-background rounded-t-xl">
        <ChatInputCard />
        <p className="text-xs text-muted-foreground text-center py-2">
          OpenEU may occasionally provide incomplete or outdated information.
          Always verify critical details with official EU or national sources.
        </p>
      </div>
    </div>
  );
}
