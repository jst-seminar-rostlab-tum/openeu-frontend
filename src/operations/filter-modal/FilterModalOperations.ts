import { FilterModalState } from '@/domain/entities/FilterModalState';

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
      startDate: new Date(),
      endDate: new Date(),
      country: '',
      topics: [],
    };
  }

  static validateDateRange(startDate: Date, endDate: Date): boolean {
    return endDate > startDate;
  }

  static initDateRange(): { startDate: Date; endDate: Date } {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);

    start.setHours(0, 0, 0, 0);

    end.setHours(23, 59, 0, 0);

    return { startDate: start, endDate: end };
  }
}
