import { Badge } from '../ui/badge';

interface SelectedFilterBadgePops {
  value: string;
}

export default function SelectedFilterBadge({
  value,
}: SelectedFilterBadgePops) {
  return (
    <Badge
      variant="secondary"
      className="text-xs py-1 px-2 z-10 outline-1 outline-gray"
    >
      {value}
    </Badge>
  );
}
