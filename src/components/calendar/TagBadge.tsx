import { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn, COLOR_SCHEMES, getColorKeyByHash } from '@/lib/utils';

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
  const colorKey = getColorKeyByHash(colorHash || tagString);

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-medium border',
        className,
        COLOR_SCHEMES[colorKey].bg,
        COLOR_SCHEMES[colorKey].text,
        COLOR_SCHEMES[colorKey].outline,
      )}
    >
      {children}
    </Badge>
  );
}
