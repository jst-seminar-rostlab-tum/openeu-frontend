import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-4 pt-3">
      <Skeleton className="h-[20rem]" />
      <Skeleton className="h-[10rem]" />
      <Skeleton className="self-end h-[2rem] w-[8rem]" />
    </div>
  );
}
