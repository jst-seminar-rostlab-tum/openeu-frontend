import { Badge } from '@/components/ui/badge';
import { getTagColor } from '@/operations/meeting/CalendarHelpers';

interface TagBadgeProps {
  tag: string;
  className?: string;
  variant?: 'colored' | 'default' | 'outline';
}

export function TagBadge({
  tag,
  className = '',
  variant = 'colored',
}: TagBadgeProps) {
  if (variant !== 'colored') {
    return (
      <Badge variant={variant} className={`text-xs font-medium ${className}`}>
        {tag}
      </Badge>
    );
  }

  const colorClass = getTagColor(tag);

  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium border ${colorClass} ${className}`}
    >
      {tag}
    </Badge>
  );
}
