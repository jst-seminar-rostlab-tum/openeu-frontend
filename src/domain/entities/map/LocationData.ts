// import { Meeting } from '../calendar/generated-types';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';

export interface CityData {
  city: string;
  lat: number;
  lng: number;
  totalCount: number;
  meetings: Meeting[];
}

export interface CountryData {
  country: string;
  cities: Record<string, CityData>;
  meetingCount: number;
}
