'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import { useCalendar } from '@/domain/hooks/meetingHooks';
import { useMeetingCountByCountry } from '@/operations/map/MapOperations';

import MapData from '../../../public/map.geo.json';

const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
  ssr: false,
});

function MapInner() {
  const { meetings } = useCalendar();
  const meetingCountByCountry = useMeetingCountByCountry(meetings);

  return (
    <MapComponent
      mapData={MapData as GeoJSON.FeatureCollection}
      zoom={4.25}
      minZoom={4}
      center={[54.5452, 25.11912]}
      meetingCountByCountry={meetingCountByCountry}
      meetings={meetings}
    />
  );
}

export default React.memo(MapInner);
