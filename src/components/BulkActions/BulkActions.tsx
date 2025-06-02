import { Archive, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type BulkActionsProps = {
  selectedCount: number;
  onBulkArchive: () => void;
  onBulkDelete: () => void;
};

export default function BulkActions({
  selectedCount,
  onBulkArchive,
  onBulkDelete,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-4 flex gap-2">
      <Button variant="outline" size="sm" onClick={onBulkArchive}>
        <Archive className="h-4 w-4 mr-2" />
        Archive Selected ({selectedCount})
      </Button>
      <Button variant="destructive" size="sm" onClick={onBulkDelete}>
        <Trash2 className="h-4 w-4 mr-2" />
        Delete Selected ({selectedCount})
      </Button>
    </div>
  );
}
