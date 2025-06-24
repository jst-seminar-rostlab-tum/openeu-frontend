import { Skeleton } from '@/components/ui/skeleton';

export default function MonitorLoading() {
  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col gap-3 p-4">
      <div className="flex justify-between items-end">
        <Skeleton className="h-10 w-3xs" />
        <Skeleton className="h-10 w-2xl" />
      </div>

      <div className="flex gap-4 flex-1 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, columnIndex) => (
          <Skeleton key={columnIndex} className="flex-shrink-0 w-xs flex-1" />
        ))}
      </div>
    </div>
  );
}
