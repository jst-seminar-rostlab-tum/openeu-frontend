import { Archive, ArchiveRestore, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface DataTableBulkActionsProps {
  selectedCount: number;
  onActivate: () => void;
  onDelete: () => void;
  activationLabel?: string;
}

export function DataTableBulkActions({
  selectedCount,
  onActivate,
  onDelete,
  activationLabel = 'Deactivate',
}: DataTableBulkActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">
        {selectedCount} row{selectedCount === 1 ? '' : 's'} selected
      </span>
      <Separator orientation="vertical" />
      <Button variant="outline" size="sm" onClick={onActivate}>
        {activationLabel == 'Deactivate' ? (
          <Archive className="mr-2 h-4 w-4" />
        ) : (
          <ArchiveRestore className="mr-2 h-4 w-4" />
        )}
        {activationLabel}
      </Button>
      <Button variant="destructive" size="sm" onClick={onDelete}>
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}
