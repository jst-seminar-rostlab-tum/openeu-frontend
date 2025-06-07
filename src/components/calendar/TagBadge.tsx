import { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { getTagColor } from '@/lib/utils';

interface TagBadgeProps {
  children: ReactNode;
  className?: string;
}

export function TagBadge({ children, className = '' }: TagBadgeProps) {
  const tagString = typeof children === 'string' ? children : '';
  const colorClass = getTagColor(tagString);

  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium border ${colorClass} ${className}`}
    >
      {children}
    </Badge>
  );
}
