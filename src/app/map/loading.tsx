import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="fixed inset-0 pt-12 w-full h-full bg-gray-50">
      {/* Map skeleton - big box */}
      <Skeleton className="w-full h-full" />

      {/* Toolbar skeleton - top right */}
      <div className="absolute right-4 top-16 z-10">
        <div className="flex flex-row gap-2 bg-white rounded-lg p-2 shadow-sm">
          <Skeleton className="w-48 h-10" />
          <Skeleton className="w-10 h-10" />
        </div>
      </div>

      {/* Zoom controls skeleton - bottom right */}
      <div className="absolute right-4 bottom-8 z-10">
        <div className="flex flex-col gap-1 bg-white rounded-lg p-1 shadow-sm">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
