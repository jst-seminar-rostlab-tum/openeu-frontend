import { Skeleton } from '@/components/ui/skeleton';

export function MonthViewSkeleton() {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-7 border-b py-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex justify-center">
            <Skeleton className="h-6 w-12" />
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-7 grid-rows-6">
        {Array.from({ length: 42 }).map((_, i) => (
          <div key={i} className="border-b border-r p-1">
            <Skeleton className="mb-1 h-6 w-6 rounded-full" />
            <div className="mt-1 space-y-1">
              {Array.from({ length: Math.floor(seededRandom(i) * 3) }).map(
                (_, j) => (
                  <Skeleton key={j} className="h-5 w-full" />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
