import { Skeleton } from '@/components/ui/skeleton';

export function WeekViewSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-8 border-b">
        <div className="w-18"></div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-2"
          >
            <Skeleton className="h-6 w-10 rounded-full" />
            <Skeleton className="mt-1 h-4 w-6" />
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-y-auto">
        <div className="w-18 flex-shrink-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="relative h-12 border-b pr-2 text-right">
              <Skeleton className="absolute -top-3 right-2 h-4 w-10" />
            </div>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-7 divide-x">
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div key={dayIndex} className="relative">
              {Array.from({ length: 12 }).map((_, hourIndex) => (
                <div key={hourIndex} className="h-12 border-b"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
