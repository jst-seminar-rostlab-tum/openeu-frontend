import { FilterModalState } from '@/domain/entities/FilterModalState';
import {
  getCurrentMonthRange,
  MEETING_TYPE_MAPPING,
} from '@/operations/meeting/CalendarHelpers';
const { now } = getCurrentMonthRange();

export default class FilterModalOperations {
  static getCountries(): string[] {
    return [
      'Austria',
      'Belgium',
      'Bulgaria',
      'Croatia',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Estonia',
      'European Union',
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
  }

  static getInstitutions(): { label: string; value: string }[] {
    return Object.values(MEETING_TYPE_MAPPING).map((institution) => ({
      label: institution,
      value: institution,
    }));
  }

  static getDefaultState(): FilterModalState {
    return {
      startDate: now,
      endDate: now,
      country: '',
      topics: [],
      institutions: [],
    };
  }

  static validateDateRange(startDate: Date, endDate: Date): boolean {
    return endDate > startDate;
  }
}
