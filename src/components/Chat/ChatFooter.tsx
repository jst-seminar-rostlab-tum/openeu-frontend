import ChatOperations from '@/operations/chat/ToolbarOperations';

import ChatInputCard from './ChatInputCard';

interface ChatFooterProps {
  onSendMessage: (content: string) => Promise<void>;
}

export default function ChatFooter({ onSendMessage }: ChatFooterProps) {
  return (
    <div className="sticky bottom-0 bg-background rounded-t-xl">
      <ChatInputCard
        onSendMessage={onSendMessage}
        onAddFile={ChatOperations.handleAddFile}
        onSettings={ChatOperations.handleSettings}
      />
      <p className="text-xs text-muted-foreground text-center py-2">
        OpenEU may occasionally provide incomplete or outdated information.
        Always verify critical details with official EU or national sources.
      </p>
    </div>
  );
}
