import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

import * as turf from '@turf/turf';
import * as geojson from 'geojson';
import L, { LatLngExpression, Layer } from 'leaflet';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { GeoJSON, MapContainer, Pane, SVGOverlay } from 'react-leaflet';

import {
  countryBaseStyle,
  countryBorderStyle,
  europeanCountries,
  oceanBounds,
} from '@/components/Map/constants';
import { MapIndicator } from '@/components/Map/MapIndicator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { meetingsPerCountry } from '@/domain/entities/MapIndicator/MeetingCountByCountry';
import { useMeetings } from '@/domain/hooks/meetingHooks';

type MeetingCountByCountry = typeof meetingsPerCountry;

interface MapProps {
  mapData: geojson.FeatureCollection;
  center?: LatLngExpression;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  meetingCountByCountry: MeetingCountByCountry;
}

function getMeetingStats(countryName: string, meetings?: MeetingData[]) {
  if (!meetings || !countryName) return { total: 0, counts: {} };

  // Special case: meetings with location "European Union" are matched to Belgium
  const filtered = meetings.filter(
    (m) =>
      m.location === countryName ||
      (m.location === 'European Union' && countryName === 'Belgium'),
  );

  const counts: Record<string, number> = {};
  for (const meeting of filtered) {
    counts[meeting.source_table] = (counts[meeting.source_table] || 0) + 1;
  }

  return { total: filtered.length, counts };
}

export default function MapComponent({
  mapData,
  center,
  zoom,
  minZoom,
  maxZoom,
  meetingCountByCountry,
}: MapProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const countryFill = isDarkMode ? '#1E293B' : '#E2E8F0';
  const countryBorder = isDarkMode ? '#334155' : '#64748B';
  const { data: meetings } = useMeetings();
  const [hoveredFeature, setHoveredFeature] = useState<geojson.Feature | null>(
    null,
  );
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const onEachFeature = (feature: geojson.Feature, layer: Layer) => {
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

  const filterNonEUCountries = (feature: geojson.Feature): boolean =>
    !!feature.properties && europeanCountries.includes(feature.properties.name);
  const styleFeatures = (feature?: geojson.Feature) => ({
    opacity: 0,
    fillOpacity:
      feature?.properties?.name === hoveredFeature?.properties?.name ? 1 : 0.2,
  });

  const getCapitalCoordinates = (
    countryName: string,
  ): [number, number] | null => {
    const capitals: { [key: string]: [number, number] } = {
      Germany: [51.1657, 10.4515], // Example for Germany
      France: [48.8566, 2.3522], // Example for France
      // Add more countries and their capitals as needed
    };

    return capitals[countryName] || null;
  };

  const getLargestPolygon = (feature: geojson.Feature) => {
    let largestArea = 0;
    let largestPolygon = null;

    // Check if the geometry is MultiPolygon or Polygon
    if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates.forEach((polygonCoords) => {
        const polygon = turf.polygon(polygonCoords);
        const area = turf.area(polygon);
        if (area > largestArea) {
          largestArea = area;
          largestPolygon = polygon;
        }
      });
    } else if (feature.geometry.type === 'Polygon') {
      const polygon = turf.polygon(feature.geometry.coordinates);
      const area = turf.area(polygon);
      if (area > largestArea) {
        largestArea = area;
        largestPolygon = polygon;
      }
    }

    return largestPolygon;
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
      {/* Ocean */}
      <Pane name="ocean" style={{ zIndex: 1 }}>
        <SVGOverlay bounds={oceanBounds}>
          <rect height="100%" width="100%" fill="#004494" />
        </SVGOverlay>
      </Pane>

      {/* Country Area */}
      <GeoJSON
        interactive={false}
        data={mapData}
        style={{
          ...countryBaseStyle,
          fillColor: countryFill,
        }}
      />

      {/* Country Borders */}
      <GeoJSON
        interactive={false}
        data={mapData}
        style={{
          ...countryBorderStyle,
          color: countryBorder,
        }}
      />

      {/* Tooltip */}
      <GeoJSON
        data={mapData}
        onEachFeature={onEachFeature}
        filter={filterNonEUCountries}
        style={styleFeatures}
      />
      {hoveredFeature && (
        <TooltipProvider>
          <Tooltip open>
            <TooltipTrigger asChild />
            <TooltipContent
              className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} p-2 rounded shadow min-w-fit whitespace-nowrap`}
              style={{
                position: 'fixed',
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y - 30,
                pointerEvents: 'none',
              }}
            >
              {(() => {
                const countryName = hoveredFeature.properties?.name;
                const { total, counts } = getMeetingStats(
                  countryName,
                  meetings,
                );

                return (
                  <>
                    <p className="text-sm font-semibold">{countryName}</p>
                    <p className="text-sm">Total meetings: {total}</p>
                    {total > 0 && (
                      <ul className="mt-2 text-sm">
                        {Object.entries(counts).map(([type, count]) => (
                          <li key={type}>
                            {type}: {count}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                );
              })()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* MapIndicators */}
      {mapData.features
        .filter(
          (f: geojson.Feature) =>
            f.properties && europeanCountries.includes(f.properties.name),
        )
        .map((feature: geojson.Feature, idx: number) => {
          const capitalCoords = getCapitalCoordinates(
            feature.properties?.name || '',
          );
          let centerLatLng: LatLngExpression;

          if (capitalCoords) {
            centerLatLng = L.latLng(capitalCoords[0], capitalCoords[1]);
          } else {
            const largestPolygon = getLargestPolygon(feature);
            if (largestPolygon) {
              const center = turf.centerOfMass(largestPolygon);
              centerLatLng = L.latLng(
                center.geometry.coordinates[1],
                center.geometry.coordinates[0],
              );
            } else {
              centerLatLng = L.latLng(0, 0);
            }
          }

          const countryName = feature.properties?.name ?? '';

          const isHighlighted =
            hoveredFeature?.properties?.name === countryName;

          const countForThisCountry =
            meetingCountByCountry.get(countryName) ?? 0;

          return (
            <MapIndicator
              key={countryName || idx}
              position={centerLatLng}
              count={countForThisCountry}
              baseZoom={zoom}
              isHighlighted={isHighlighted}
            />
          );
        })}
    </MapContainer>
  );
}
