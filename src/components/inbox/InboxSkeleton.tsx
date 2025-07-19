import { Section } from '@/components/section';
import { Skeleton } from '@/components/ui/skeleton';

export default function InboxSkeleton() {
  return (
    <Section>
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </Section>
  );
}
