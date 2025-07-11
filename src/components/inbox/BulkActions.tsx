import { Archive, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface DataTableBulkActionsProps {
  selectedCount: number;
  onArchive: () => void;
  onDelete: () => void;
  archiveLabel?: string;
}

export function DataTableBulkActions({
  selectedCount,
  onArchive,
  onDelete,
  archiveLabel = 'Archive',
}: DataTableBulkActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">
        {selectedCount} row{selectedCount === 1 ? '' : 's'} selected
      </span>
      <Separator orientation="vertical" />
      <Button variant="outline" size="sm" onClick={onArchive}>
        <Archive className="mr-2 h-4 w-4" />
        {archiveLabel}
      </Button>
      <Button variant="destructive" size="sm" onClick={onDelete}>
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}
