import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

import { GeoJsonObject } from '@types/geojson';
import { LatLngExpression } from 'leaflet';
import { GeoJSON, MapContainer, Pane, SVGOverlay } from 'react-leaflet';

import {
  countryBaseStyle,
  countryBorderStyle,
  oceanBounds,
} from '@/components/MapComponent/constants';

interface MapProps {
  mapData: GeoJsonObject;
  center?: LatLngExpression;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
}

export default function Map({
  mapData,
  center,
  zoom,
  minZoom,
  maxZoom,
}: MapProps) {
  return (
    <MapContainer
      className="w-full h-full"
      center={center}
      zoom={zoom}
      maxBounds={[
        [35, -10],
        [71, 60],
      ]}
      minZoom={minZoom}
      maxZoom={maxZoom}
    >
      <Pane name="ocean" style={{ zIndex: -1 }}>
        <SVGOverlay bounds={oceanBounds}>
          <rect height="100%" width="100%" fill="#004494" />
        </SVGOverlay>
      </Pane>

      <GeoJSON interactive={false} data={mapData} style={countryBaseStyle} />
      <GeoJSON interactive={false} data={mapData} style={countryBorderStyle} />
    </MapContainer>
  );
}
