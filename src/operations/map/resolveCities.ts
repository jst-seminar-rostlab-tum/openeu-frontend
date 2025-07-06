import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { CityInfo, euCities } from '@/domain/entities/map/euCities';

const cityIndex: Record<string, CityInfo> = {};
const perCountryCities: Record<string, CityInfo[]> = {};
const capitalCityMap: Record<string, CityInfo> = {};

for (const city of euCities) {
  const countryKey = city.country.trim().toLowerCase();

  if (!perCountryCities[countryKey]) {
    perCountryCities[countryKey] = [];
  }
  perCountryCities[countryKey].push(city);

  if (
    !capitalCityMap[countryKey] ||
    (city.population ?? 0) > (capitalCityMap[countryKey].population ?? 0)
  ) {
    capitalCityMap[countryKey] = city;
  }

  const key = `${countryKey}_${city.city.toLowerCase()}`;
  cityIndex[key] = city;
}

function getCapitalCity(country: string): CityInfo | null {
  return capitalCityMap[country.trim().toLowerCase()] ?? null;
}

export function resolveCity(meeting: Meeting): CityInfo | null {
  const country = meeting.location;
  const raw = meeting.exact_location ?? '';

  if (!country || !raw) return null;

  const countryLower = country.toLowerCase();
  const text = raw
    .toLowerCase()
    .replace(/[|:,/\\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const firstWord = text.split(' ')[0];
  const directKey = `${countryLower}_${firstWord}`;
  if (cityIndex[directKey]) return cityIndex[directKey];

  const candidates = perCountryCities[countryLower] ?? [];
  for (const city of candidates) {
    const allNames = [
      city.city.toLowerCase(),
      ...(city.altNames ?? []).map((n) => n.toLowerCase()),
    ];
    if (allNames.some((name) => text.includes(name))) {
      return city;
    }
  }

  return getCapitalCity(country);
}
