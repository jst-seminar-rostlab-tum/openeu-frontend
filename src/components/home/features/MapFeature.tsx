'use client';

import { Globe } from 'lucide-react';

import { MeetingProvider } from '@/components/calendar/MeetingContext';
import FeatureCard from '@/components/home/features/FeatureCard';
import Map from '@/components/map/Map';

export default function MapFeature() {
  return (
    <FeatureCard
      icon={Globe}
      title="EU Regulation Map"
      description="Visualize activity across EU member states"
    >
      <div className="w-full h-50 ">
        <MeetingProvider updateUrl={false}>
          <Map />
        </MeetingProvider>
      </div>
    </FeatureCard>
  );
}
