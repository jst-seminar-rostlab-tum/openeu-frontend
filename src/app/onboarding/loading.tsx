import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress indicator skeleton */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>

        {/* Step content skeleton */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            {/* Header skeleton */}
            <div className="p-6 text-center">
              <Skeleton className="h-8 w-64 mx-auto mb-2" />
              <Skeleton className="h-5 w-80 mx-auto" />
            </div>

            {/* Content skeleton */}
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </div>

            {/* Button skeleton */}
            <div className="flex justify-end p-6">
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
