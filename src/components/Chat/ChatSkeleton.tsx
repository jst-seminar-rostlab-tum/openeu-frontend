import { Skeleton } from '@/components/ui/skeleton';

export default function ChatSkeleton() {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 space-y-10 p-4">
        {/* Message skeletons */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      {/* Input skeleton */}
      <div className="p-4">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
