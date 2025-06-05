'use client';

import { Globe } from 'lucide-react';

import FeatureCard from '@/components/home/features/FeatureCard';
import Map from '@/components/Map/Map';

export default function MapFeature() {
  return (
    <FeatureCard
      icon={Globe}
      title="EU Regulation Map"
      description="Visualize regulatory activity across EU member states"
    >
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
        <Map />
      </div>
    </FeatureCard>
  );
}
