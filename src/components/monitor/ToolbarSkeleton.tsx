import { Skeleton } from '@/components/ui/skeleton';

export function ToolbarSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-end">
      <Skeleton className="h-10 w-3xs" />
      <Skeleton className="h-10 w-2xl" />
    </div>
  );
}
