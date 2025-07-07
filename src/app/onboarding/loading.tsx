import React from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 mx-auto">
          <LoadingSpinner />
        </div>
        <p className="mt-4 text-muted-foreground">Loading onboarding step...</p>
      </div>
    </div>
  );
}
