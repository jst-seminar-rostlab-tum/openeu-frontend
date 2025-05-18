import { LatLngBoundsExpression } from 'leaflet';

export const oceanBounds: LatLngBoundsExpression = [
  [-90, -180],
  [90, 180],
];

export const countryBaseStyle = {
  fillColor: '#333333',
  fillOpacity: 1,
  weight: 0,
};

export const countryBorderStyle = {
  color: '#868686',
  weight: 1,
  fillOpacity: 0,
};
