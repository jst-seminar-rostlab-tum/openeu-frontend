import React from 'react';

import { Section } from '@/components/section';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Section className="flex flex-col gap-4">
      {/* Progress bar skeleton */}
      <Skeleton className="h-10 w-full" />
      {/* Main card skeleton */}
      <Skeleton className="h-96 w-full" />
      {/* Navigation buttons skeleton */}
      <div className="flex justify-between">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </Section>
  );
}
