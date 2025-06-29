import { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { getColor } from '@/lib/utils';

interface TagBadgeProps {
  children: ReactNode;
  className?: string;
  colorHash?: string | null;
}

export function TagBadge({
  children,
  className = '',
  colorHash,
}: TagBadgeProps) {
  const tagString = typeof children === 'string' ? children : '';
  const colorClass = getColor(colorHash || tagString);

  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium border ${colorClass} ${className}`}
    >
      {children}
    </Badge>
  );
}
