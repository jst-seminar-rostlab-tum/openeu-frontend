'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useCountryMeetingMap } from '@/operations/map/MapOperations';

import MapData from '../../../public/map.geo.json';

const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
  ssr: false,
});

function MapInner({
  countryClickDisabled = false,
}: {
  countryClickDisabled?: boolean;
}) {
  const { meetings } = useMeetingContext();

  const countryMeetingMap = useCountryMeetingMap(meetings);

  return (
    <MapComponent
      mapData={MapData as GeoJSON.FeatureCollection}
      zoom={5}
      minZoom={4}
      center={[53.067626642387374, 7.316894531250001]}
      countryMeetingMap={countryMeetingMap}
      countryClickDisabled={countryClickDisabled}
    />
  );
}

export default React.memo(MapInner);
