import * as turf from '@turf/turf';
import { parseISO } from 'date-fns';
import * as geojson from 'geojson';
import { useMemo } from 'react';

import { europeanCountries } from '@/components/map/constants';
import { Meeting } from '@/domain/entities/calendar/generated-types';
import { meetingsPerCountry } from '@/domain/entities/MapIndicator/MeetingCountByCountry';

const COUNTRY_MAPPINGS = {
  'European Union': 'Belgium',
} as const;

export interface CountryData {
  totalCount: number;
  meetings: Meeting[];
  meetingTypeMap: Record<string, number>;
}

export function useCountryMeetingMap(
  meetings: Meeting[],
): Map<string, CountryData> {
  return useMemo(() => {
    const countryMap = new Map<string, CountryData>();

    // Initialize all European countries
    meetingsPerCountry.forEach((_, country) => {
      countryMap.set(country, {
        totalCount: 0,
        meetings: [],
        meetingTypeMap: {},
      });
    });

    // Process meetings in single pass
    meetings.forEach((meeting) => {
      const country =
        COUNTRY_MAPPINGS[meeting.location as keyof typeof COUNTRY_MAPPINGS] ??
        meeting.location;

      if (countryMap.has(country)) {
        const data = countryMap.get(country)!;
        data.totalCount++;
        data.meetings.push(meeting);
        data.meetingTypeMap[meeting.source_table] =
          (data.meetingTypeMap[meeting.source_table] || 0) + 1;
      }
    });

    // Sort meetings by date for each country
    countryMap.forEach((data) => {
      data.meetings.sort(
        (a, b) =>
          parseISO(a.meeting_start_datetime).getTime() -
          parseISO(b.meeting_start_datetime).getTime(),
      );
    });

    return countryMap;
  }, [meetings]);
}

export const filterNonEUCountries = (feature: geojson.Feature): boolean =>
  !!feature.properties && europeanCountries.includes(feature.properties.name);

export const getCapitalCoordinates = (
  countryName: string,
): [number, number] | null => {
  const capitals: { [key: string]: [number, number] } = {
    Germany: [51.1657, 10.4515],
    France: [48.8566, 2.3522],
    // Add more countries and their capitals as needed
  };

  return capitals[countryName] || null;
};

export const getLargestPolygon = (feature: geojson.Feature) => {
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

export default class MapOperations {
  static topicsToFilterBadge(topics: string[]) {
    const [first, ...rest] = topics;
    const label = rest.length > 0 ? `${first} +${rest.length}` : first;
    return label;
  }
}
