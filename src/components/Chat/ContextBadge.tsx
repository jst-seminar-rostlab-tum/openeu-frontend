'use client';

import { X } from 'lucide-react';

import { useChatContext } from '@/app/chat/ChatContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ContextBadgeProps {
  id: string;
  title?: string;
}

export function ContextBadge({ id, title }: ContextBadgeProps) {
  const { clearContext } = useChatContext();

  const handleRemove = () => {
    clearContext();
  };

  return (
    <Badge variant="secondary" className="text-xs">
      {title || id}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="h-3 w-3 p-0 hover:bg-muted flex-shrink-0"
      >
        <X />
      </Button>
    </Badge>
  );
}
