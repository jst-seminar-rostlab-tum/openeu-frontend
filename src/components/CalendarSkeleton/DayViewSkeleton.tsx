import { Skeleton } from '@/components/ui/skeleton';

export function DayViewSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-2 border-b">
        <div className="w-18"></div>
        <div className="flex flex-col items-center justify-center py-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="mt-1 h-4 w-16" />
        </div>
      </div>

      <div className="flex flex-1 overflow-y-auto">
        <div className="w-18 flex-shrink-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="relative h-12 border-b pr-2 text-right">
              <Skeleton className="absolute -top-3 right-2 h-4 w-10" />
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="relative">
            {Array.from({ length: 12 }).map((_, hourIndex) => (
              <div key={hourIndex} className="h-12 border-b"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
