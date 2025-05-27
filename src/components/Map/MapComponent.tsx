import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

import { GeoJsonObject } from 'geojson';
import { LatLngExpression } from 'leaflet';
import { useTheme } from 'next-themes';
import { GeoJSON, MapContainer, Pane, SVGOverlay } from 'react-leaflet';

import {
  countryBaseStyle,
  countryBorderStyle,
  oceanBounds,
} from '@/components/Map/constants';

interface MapProps {
  mapData: GeoJsonObject;
  center?: LatLngExpression;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
}

export default function MapComponent({
  mapData,
  center,
  zoom,
  minZoom,
  maxZoom,
}: MapProps) {
  const { theme } = useTheme();

  const countryFill = theme === 'dark' ? '#1E293B' : '#FFFFFF';
  const countryBorder = theme === 'dark' ? '#334155' : '#E2E8F0';

  return (
    <MapContainer
      className="w-full h-full"
      center={center}
      zoom={zoom}
      maxBounds={[
        [20, -30],
        [80, 80],
      ]}
      maxBoundsViscosity={1.0}
      minZoom={minZoom}
      maxZoom={maxZoom}
      style={{ zIndex: 0 }}
    >
      <Pane name="ocean" style={{ zIndex: 1 }}>
        <SVGOverlay bounds={oceanBounds}>
          <rect height="100%" width="100%" fill="#004494" />
        </SVGOverlay>
      </Pane>
      <GeoJSON
        interactive={false}
        data={mapData}
        style={{
          ...countryBaseStyle,
          fillColor: countryFill,
        }}
      />
      <GeoJSON
        interactive={false}
        data={mapData}
        style={{
          ...countryBorderStyle,
          color: countryBorder,
        }}
      />
    </MapContainer>
  );
}
