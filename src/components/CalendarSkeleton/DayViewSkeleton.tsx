import { Skeleton } from '@/components/ui/skeleton';

export function DayViewSkeleton() {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col">
        {/* Day header skeleton */}
        <div className="relative z-20 flex border-b">
          <div className="w-18"></div>
          <div className="flex-1 border-l py-2 text-center">
            <Skeleton className="mx-auto h-5 w-20" />
          </div>
        </div>

        {/* Calendar grid skeleton */}
        <div className="flex h-[800px]">
          {/* Hours column */}
          <div className="relative w-18">
            {hours.map((hour) => (
              <div key={hour} className="relative" style={{ height: '96px' }}>
                <div className="absolute -top-3 right-2 flex h-6 items-center">
                  {hour !== 0 && <Skeleton className="h-4 w-12" />}
                </div>
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="relative flex-1 border-l">
            <div className="relative">
              {hours.map((hour) => (
                <div key={hour} className="relative" style={{ height: '96px' }}>
                  <div className="pointer-events-none absolute inset-x-0 top-0 border-b"></div>
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary"></div>

                  {/* Random event skeletons */}
                  {hour % 3 === 0 && (
                    <div className="absolute inset-x-2 top-2 h-20">
                      <Skeleton className="h-full w-full rounded-md" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simplified right sidebar skeleton */}
      <div className="hidden w-72 divide-y border-l md:block">
        {/* Date picker skeleton - single box */}
        <div className="p-4">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        {/* Current events skeleton - single box */}
        <div className="p-4">
          <Skeleton className="h-[50px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
