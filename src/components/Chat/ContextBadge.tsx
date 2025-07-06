'use client';

import { X } from 'lucide-react';

import { useChatContext } from '@/app/chat/ChatContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SupportedContextType } from '@/domain/entities/monitor/types';

interface ContextBadgeProps {
  type: SupportedContextType;
  id: string;
}

const getContextLabel = (type: SupportedContextType) =>
  type.charAt(0).toUpperCase() + type.slice(1);

export function ContextBadge({ type, id }: ContextBadgeProps) {
  const { removeContext } = useChatContext();
  const label = getContextLabel(type);

  const handleRemove = () => {
    removeContext(type);
  };

  return (
    <Badge variant="secondary" className="text-xs">
      {label}: {id}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="h-3 w-3 p-0 hover:bg-muted flex-shrink-0"
        aria-label={`Remove ${label} context`}
      >
        <X />
      </Button>
    </Badge>
  );
}
