import { Skeleton } from '@/components/ui/skeleton';

export function KanbanSkeleton() {
  return (
    <div className="flex gap-4 flex-1 overflow-x-auto">
      {Array.from({ length: 5 }).map((_, columnIndex) => (
        <Skeleton key={columnIndex} className="flex-shrink-0 w-xs flex-1" />
      ))}
    </div>
  );
}
