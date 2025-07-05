'use client';

import { Globe } from 'lucide-react';

import FeatureCard from '@/components/home/features/FeatureCard';
import MapComponent from '@/components/map/MapComponent';
import MOCK_COUNTRY_MEETING_MAP from '@/components/map/mockCountryMeetingMap';

import MapData from '../../../../public/map.geo.json';

export default function MapFeature() {
  return (
    <FeatureCard
      icon={Globe}
      title="EU Regulation Map"
      description="Visualize activity across EU member states"
    >
      <div className="w-full h-50 ">
        <MapComponent
          mapData={MapData as GeoJSON.FeatureCollection}
          zoom={4.25}
          minZoom={4}
          center={[54.5452, 25.11912]}
          countryMeetingMap={MOCK_COUNTRY_MEETING_MAP}
        />
      </div>
    </FeatureCard>
  );
}
