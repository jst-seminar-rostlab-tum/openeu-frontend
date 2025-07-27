import { Skeleton } from '@/components/ui/skeleton';

export function AIResponseSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <Skeleton className="h-4 w-3/5" />
      <Skeleton className="h-4 w-2/5" />
    </div>
  );
}
