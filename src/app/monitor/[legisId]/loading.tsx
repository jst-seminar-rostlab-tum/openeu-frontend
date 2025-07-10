import { Section } from '@/components/section';
import { Skeleton } from '@/components/ui/skeleton';

export default function LegislationSkeleton() {
  return (
    <Section className="space-y-4">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-3xs" />
        <Skeleton className="h-10 w-xl" />
      </div>
      <div className="columns-1 md:columns-2 space-y-4">
        <Skeleton className="flex-1 break-inside-avoid h-44" />
        <Skeleton className="flex-1 break-inside-avoid h-30" />
        <Skeleton className="flex-1 break-inside-avoid h-30" />
        <Skeleton className="flex-1 break-inside-avoid h-30" />
      </div>
    </Section>
  );
}
