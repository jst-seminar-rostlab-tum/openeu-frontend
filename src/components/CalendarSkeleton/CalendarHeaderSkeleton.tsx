import { Skeleton } from '@/components/ui/skeleton';

export function CalendarHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-24" />
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}
