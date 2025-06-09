import { LatLngBoundsExpression } from 'leaflet';

export const oceanBounds: LatLngBoundsExpression = [
  [-90, -180],
  [90, 180],
];

export const countryBaseStyle = {
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
};

export const countryBorderStyle = {
  weight: 1,
  opacity: 1,
  fillOpacity: 0,
};

export const europeanCountries = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
];
