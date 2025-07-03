import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-[17rem] w-full" />
        <Skeleton className="h-[10rem] w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-10 w-full sm:w-32" />
        </div>
      </div>
    </div>
  );
}
