'use client';

import { Globe } from 'lucide-react';

import FeatureCard from '@/components/home/features/FeatureCard';
import Map from '@/components/Map/Map';

export default function MapFeature() {
  return (
    <FeatureCard
      icon={Globe}
      title="EU Regulation Map"
      description="Visualize activity across EU member states"
    >
      <div className="w-full h-50 ">
        <Map />
      </div>
    </FeatureCard>
  );
}
