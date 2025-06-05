'use client';

import { GeoJSON } from 'geojson';
import dynamic from 'next/dynamic';

import { meetingsPerCountry } from '@/domain/entities/MeetingData';

import MapData from '../../../public/map.geo.json';

type MeetingCountByCountry = typeof meetingsPerCountry;

interface MapProps {
  meetingCountByCountry: MeetingCountByCountry;
}

export default function Map({ meetingCountByCountry }: MapProps) {
  const MapComponent = dynamic(() => import('@/components/Map/MapComponent'), {
    ssr: false,
  });

  return (
    <MapComponent
      mapData={MapData as GeoJSON.FeatureCollection}
      zoom={4.25}
      minZoom={4}
      center={[54.5452, 25.11912]}
      meetingCountByCountry={meetingCountByCountry}
    />
  );
}
