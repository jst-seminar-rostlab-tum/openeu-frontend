import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[2rem]" />
      <Skeleton className="h-[17rem]" />
      <Skeleton className="h-[10rem]" />
      <Skeleton className="self-end h-[2rem] w-[8rem]" />
    </>
  );
}
