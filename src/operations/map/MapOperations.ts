import * as turf from '@turf/turf';
import * as geojson from 'geojson';
import { useMemo } from 'react';

import { europeanCountries } from '@/components/map/constants';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { CountryData } from '@/domain/entities/map/LocationData';
import { meetingsPerCountry } from '@/domain/entities/MapIndicator/MeetingCountByCountry';

import { resolveCity } from './resolveCities';

const COUNTRY_MAPPINGS = {
  'European Union': 'Belgium',
} as const;

export function useCountryMeetingMap(
  meetings: Meeting[],
): Map<string, CountryData> {
  return useMemo(() => {
    const map = new Map<string, CountryData>();

    // Initialize countries with empty city maps
    meetingsPerCountry.forEach((_, country) => {
      map.set(country, {
        country,
        cities: {},
      });
    });

    // Populate cities with meetings
    meetings.forEach((meeting) => {
      const cityInfo = resolveCity(meeting);

      const country =
        cityInfo?.country ??
        COUNTRY_MAPPINGS[meeting.location as keyof typeof COUNTRY_MAPPINGS] ??
        meeting.location;

      if (!map.has(country)) {
        map.set(country, {
          country,
          cities: {},
        });
      }

      if (cityInfo) {
        const countryEntry = map.get(country)!;
        const cityKey = cityInfo.city;

        if (!countryEntry.cities[cityKey]) {
          countryEntry.cities[cityKey] = {
            city: cityInfo.city,
            lat: cityInfo.lat,
            lng: cityInfo.lng,
            totalCount: 0,
            meetings: [],
          };
        }

        const cityEntry = countryEntry.cities[cityKey];
        cityEntry.totalCount++;
        cityEntry.meetings.push(meeting);
      }
    });

    return map;
  }, [meetings]);
}

export function getCountryTotalCount(data?: CountryData): number {
  return data
    ? Object.values(data.cities).reduce((acc, c) => acc + c.totalCount, 0)
    : 0;
}

export function getDeepClonedCountryData(
  map: Map<string, CountryData>,
  countryName: string,
): CountryData | undefined {
  const original = map.get(countryName);
  if (!original) return undefined;

  return {
    country: original.country,
    cities: Object.fromEntries(
      Object.entries(original.cities).map(([cityKey, city]) => [
        cityKey,
        {
          city: city.city,
          lat: city.lat,
          lng: city.lng,
          totalCount: city.totalCount,
          meetings: city.meetings.map((m) => ({ ...m })),
        },
      ]),
    ),
  };
}

export function getCountryMeetings(data?: CountryData): Meeting[] {
  return data ? Object.values(data.cities).flatMap((c) => c.meetings) : [];
}

export function getCountryTypeMap(data: CountryData): Record<string, number> {
  const map: Record<string, number> = {};

  Object.values(data.cities).forEach((city) => {
    city.meetings.forEach((meeting) => {
      map[meeting.source_table] = (map[meeting.source_table] || 0) + 1;
    });
  });

  return map;
}

export const filterNonEUCountries = (feature: geojson.Feature): boolean =>
  !!feature.properties && europeanCountries.includes(feature.properties.name);

export const getCapitalCoordinates = (
  countryName: string,
): [number, number] | null => {
  const capitals: { [key: string]: [number, number] } = {
    Germany: [51.1657, 10.4515],
    France: [48.8566, 2.3522],
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
