import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

import * as turf from '@turf/turf';
import * as geojson from 'geojson';
import L, { LatLngExpression, Layer } from 'leaflet';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import {
  GeoJSON,
  MapContainer,
  Pane,
  SVGOverlay,
  useMapEvents,
} from 'react-leaflet';

import { EventListDialog } from '@/components/calendar/MonthViewCalendar/EventListDialog';
import {
  countryBaseStyle,
  countryBorderStyle,
  europeanCountries,
  oceanBounds,
} from '@/components/map/constants';
import { MapIndicator } from '@/components/map/MapIndicator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CountryData } from '@/domain/entities/map/LocationData';
import {
  filterNonEUCountries,
  getCapitalCoordinates,
  getCountryMeetings,
  getCountryTotalCount,
  getCountryTypeMap,
  getLargestPolygon,
} from '@/operations/map/MapOperations';
import { getMeetingType } from '@/operations/meeting/CalendarHelpers';
// import { ToastOperations } from '@/operations/toast/toastOperations';

interface MapProps {
  mapData: geojson.FeatureCollection;
  center?: LatLngExpression;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  countryMeetingMap: Map<string, CountryData>;
  countryClickDisabled?: boolean;
}

export default function MapComponent({
  mapData,
  center,
  zoom,
  minZoom,
  maxZoom,
  countryMeetingMap,
  countryClickDisabled = false,
}: MapProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const countryFill = isDarkMode ? '#1E293B' : '#E2E8F0';
  const countryBorder = isDarkMode ? '#334155' : '#64748B';
  const [hoveredFeature, setHoveredFeature] = useState<geojson.Feature | null>(
    null,
  );
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(zoom ?? 4);

  const shouldShowCities = zoomLevel >= 6;

  const ZoomTracker = () => {
    useMapEvents({
      zoomend: (e) => {
        setZoomLevel(e.target.getZoom());
      },
    });
    return null;
  };

  const selectedCountryMeetings = selectedCountry
    ? (getCountryMeetings(countryMeetingMap.get(selectedCountry)) ?? [])
    : [];
  const handleCountryClick = (countryName: string) => {
    if (countryClickDisabled) return;

    setSelectedCountry(countryName);
    setDialogOpen(true);
  };

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
      click: () => {
        const countryName = feature.properties?.name;
        if (countryName && europeanCountries.includes(countryName)) {
          handleCountryClick(countryName);
        }
      },
    });
  };

  const styleFeatures = (feature?: geojson.Feature) => ({
    opacity: 0,
    fillOpacity:
      feature?.properties?.name === hoveredFeature?.properties?.name ? 1 : 0.2,
  });

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
      <ZoomTracker />
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
              const countryData = countryMeetingMap.get(countryName);

              if (!countryData) return null;

              const meetingCount = getCountryTotalCount(countryData);
              const typeMap = getCountryTypeMap(countryData);

              return (
                <>
                  <p className="text-sm font-semibold">{countryName}</p>
                  {meetingCount > 0 && (
                    <>
                      <p className="text-xs text-muted-foreground mt-1">
                        Total: {meetingCount}
                      </p>

                      {Object.keys(typeMap).length > 0 && (
                        <ul className="mt-1 text-xs space-y-0.5">
                          {Object.entries(typeMap).map(([type, count]) => (
                            <li key={type}>
                              {getMeetingType(type)}: {count}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </>
              );
            })()}
          </TooltipContent>
        </Tooltip>
      )}

      {/* MapIndicators */}
      {shouldShowCities
        ? Array.from(countryMeetingMap.entries()).flatMap(
            ([countryName, data]) =>
              Object.values(data.cities).map((city, idx) => (
                <MapIndicator
                  key={`${countryName}-${city.city}-${idx}`}
                  position={[city.lat, city.lng]}
                  count={city.totalCount}
                  baseZoom={zoom}
                  isHighlighted={false}
                  label={city.city}
                  isCity={true}
                  onClick={() => {
                    setSelectedCountry(countryName);
                    setDialogOpen(true);
                  }}
                />
              )),
          )
        : mapData.features
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
              const countryData = countryMeetingMap.get(countryName);
              const countForThisCountry =
                getCountryTotalCount(countryData) ?? 0;

              return (
                <MapIndicator
                  key={countryName || idx}
                  position={centerLatLng}
                  count={countForThisCountry}
                  baseZoom={zoom}
                  isHighlighted={isHighlighted}
                  onClick={
                    countForThisCountry > 0
                      ? () => handleCountryClick(countryName)
                      : undefined
                  }
                />
              );
            })}

      {/* Country click dialog */}
      {selectedCountry && selectedCountryMeetings.length > 0 && (
        <EventListDialog
          date={new Date()}
          events={selectedCountryMeetings}
          title={`Meetings in ${selectedCountry} (${selectedCountryMeetings.length} events)`}
          selectedCountry={selectedCountry}
          open={dialogOpen}
          isInCalendar={false}
          onOpenChange={setDialogOpen}
        />
      )}
    </MapContainer>
  );
}
