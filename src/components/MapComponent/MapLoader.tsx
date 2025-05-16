'use client';

import { GeoJsonObject } from 'geojson';
import dynamic from 'next/dynamic';

import MapData from '../../../public/map.geo.json';

export default function MapLoader() {
  const MapComponent = dynamic(() => import('@/components/MapComponent/Map'), {
    ssr: false,
  });

  return (
    <MapComponent
      mapData={MapData as GeoJsonObject}
      zoom={4.25}
      minZoom={4}
      center={[54.5452, 25.11912]}
    />
  );
}
