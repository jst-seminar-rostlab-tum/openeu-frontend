import { Send } from 'lucide-react';

import { ManageChatContextDialog } from '@/components/Chat/ManageChatContextDialog';
import { Button } from '@/components/ui/button';

interface ChatToolbarProps {
  onSubmit: () => void;
  disabled: boolean;
}

export function ChatToolbar({ onSubmit, disabled }: ChatToolbarProps) {
  return (
    <div className="flex justify-between items-center pt-2">
      {/* Left side - Action buttons */}
      <ManageChatContextDialog />

      {/* Right side - Send button */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onSubmit}
        disabled={disabled}
        className="h-8 w-8 p-0"
        title="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
