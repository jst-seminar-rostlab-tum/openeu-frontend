import { getCurrentMonthRange } from '@/app/dateRange';
import { FilterModalState } from '@/domain/entities/FilterModalState';
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

  static getDefaultState(): FilterModalState {
    return {
      startDate: now,
      endDate: now,
      country: '',
      topics: [],
    };
  }

  static validateDateRange(startDate: Date, endDate: Date): boolean {
    return endDate > startDate;
  }
}
