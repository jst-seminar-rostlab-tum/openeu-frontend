import cities from './euCities.json';

export type CityInfo = {
  city: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
  altNames: string[];
};

export const euCities: CityInfo[] = cities;
