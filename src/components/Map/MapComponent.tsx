import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

import { GeoJsonObject } from 'geojson';
import * as geojson from 'geojson';
import { LatLngExpression, Layer } from 'leaflet';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { GeoJSON, MapContainer, Pane, SVGOverlay } from 'react-leaflet';

import {
  countryBaseStyle,
  countryBorderStyle,
  europeanCountries,
  oceanBounds,
} from '@/components/Map/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
  const isDarkMode = theme === 'dark';
  const countryFill = isDarkMode ? '#1E293B' : '#E2E8F0';
  const countryBorder = isDarkMode ? '#334155' : '#64748B';

  const [hoveredFeature, setHoveredFeature] = useState<geojson.Feature | null>(
    null,
  );
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const onEachFeature = (feature: geojson.Feature, layer: Layer) => {
    if (
      !feature.properties ||
      !europeanCountries.includes(feature.properties.name)
    ) {
      return;
    }
    layer.on({
      mouseover: (e) => {
        setHoveredFeature(feature);
        setTooltipPosition({
          x: e.originalEvent.clientX,
          y: e.originalEvent.clientY,
        });
      },
      mouseout: () => {
        setHoveredFeature(null);
      },
      mousemove: (e) => {
        setTooltipPosition({
          x: e.originalEvent.clientX,
          y: e.originalEvent.clientY,
        });
      },
    });
  };

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
      <GeoJSON data={mapData} onEachFeature={onEachFeature} />
      <GeoJSON
        interactive={false}
        data={mapData}
        style={{
          ...countryBorderStyle,
          color: countryBorder,
        }}
      />
      {hoveredFeature && (
        <TooltipProvider>
          <Tooltip open>
            <TooltipTrigger asChild />
            <TooltipContent
              className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} p-2 rounded shadow min-w-fit`}
              style={{
                position: 'fixed',
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y - 30,
                pointerEvents: 'none',
              }}
            >
              <p>{hoveredFeature.properties?.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </MapContainer>
  );
}
