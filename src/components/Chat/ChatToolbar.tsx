import { Send, Settings } from 'lucide-react';

import { ManageChatContextDialog } from '@/components/Chat/ManageChatContextDialog';
import { Button } from '@/components/ui/button';

interface ChatToolbarProps {
  onSubmit: () => void;
  disabled: boolean;
  onSettings?: () => void;
}

export function ChatToolbar({
  onSubmit,
  disabled,
  onSettings,
}: ChatToolbarProps) {
  return (
    <div className="flex justify-between items-center pt-2">
      {/* Left side - Action buttons */}
      <div className="flex items-center gap-1">
        <ManageChatContextDialog />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSettings?.()}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

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
