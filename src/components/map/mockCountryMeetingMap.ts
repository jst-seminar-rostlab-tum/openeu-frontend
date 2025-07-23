import { CountryData } from '@/domain/entities/map/LocationData';

const MOCK_COUNTRY_MEETING_MAP = new Map<string, CountryData>([
  [
    'Austria',
    {
      country: 'Austria',
      cities: {
        Vienna: {
          city: 'Vienna',
          lat: 48.2082,
          lng: 16.3738,
          totalCount: 7,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Belgium',
    {
      country: 'Belgium',
      cities: {
        Brussels: {
          city: 'Brussels',
          lat: 50.8503,
          lng: 4.3517,
          totalCount: 2,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Bulgaria',
    {
      country: 'Bulgaria',
      cities: {
        Sofia: {
          city: 'Sofia',
          lat: 42.6977,
          lng: 23.3219,
          totalCount: 6,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Croatia',
    {
      country: 'Croatia',
      cities: {
        Zagreb: {
          city: 'Zagreb',
          lat: 45.815,
          lng: 15.9819,
          totalCount: 4,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Cyprus',
    {
      country: 'Cyprus',
      cities: {
        Nicosia: {
          city: 'Nicosia',
          lat: 35.1856,
          lng: 33.3823,
          totalCount: 3,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Czech Republic',
    {
      country: 'Czech Republic',
      cities: {
        Prague: {
          city: 'Prague',
          lat: 50.0755,
          lng: 14.4378,
          totalCount: 8,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Denmark',
    {
      country: 'Denmark',
      cities: {
        Copenhagen: {
          city: 'Copenhagen',
          lat: 55.6761,
          lng: 12.5683,
          totalCount: 2,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Estonia',
    {
      country: 'Estonia',
      cities: {
        Tallinn: {
          city: 'Tallinn',
          lat: 59.437,
          lng: 24.7536,
          totalCount: 5,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Finland',
    {
      country: 'Finland',
      cities: {
        Helsinki: {
          city: 'Helsinki',
          lat: 60.1695,
          lng: 24.9354,
          totalCount: 6,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'France',
    {
      country: 'France',
      cities: {
        Paris: {
          city: 'Paris',
          lat: 48.8566,
          lng: 2.3522,
          totalCount: 9,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Germany',
    {
      country: 'Germany',
      cities: {
        Berlin: {
          city: 'Berlin',
          lat: 52.52,
          lng: 13.405,
          totalCount: 5,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Greece',
    {
      country: 'Greece',
      cities: {
        Athens: {
          city: 'Athens',
          lat: 37.9838,
          lng: 23.7275,
          totalCount: 4,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Hungary',
    {
      country: 'Hungary',
      cities: {
        Budapest: {
          city: 'Budapest',
          lat: 47.4979,
          lng: 19.0402,
          totalCount: 3,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Ireland',
    {
      country: 'Ireland',
      cities: {
        Dublin: {
          city: 'Dublin',
          lat: 53.3498,
          lng: -6.2603,
          totalCount: 2,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Italy',
    {
      country: 'Italy',
      cities: {
        Rome: {
          city: 'Rome',
          lat: 41.9028,
          lng: 12.4964,
          totalCount: 3,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Latvia',
    {
      country: 'Latvia',
      cities: {
        Riga: {
          city: 'Riga',
          lat: 56.9496,
          lng: 24.1052,
          totalCount: 6,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Lithuania',
    {
      country: 'Lithuania',
      cities: {
        Vilnius: {
          city: 'Vilnius',
          lat: 54.6872,
          lng: 25.2797,
          totalCount: 4,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Luxembourg',
    {
      country: 'Luxembourg',
      cities: {
        'Luxembourg City': {
          city: 'Luxembourg City',
          lat: 49.6117,
          lng: 6.1319,
          totalCount: 1,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Malta',
    {
      country: 'Malta',
      cities: {
        Valletta: {
          city: 'Valletta',
          lat: 35.8997,
          lng: 14.5146,
          totalCount: 3,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Netherlands',
    {
      country: 'Netherlands',
      cities: {
        Amsterdam: {
          city: 'Amsterdam',
          lat: 52.3676,
          lng: 4.9041,
          totalCount: 8,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Poland',
    {
      country: 'Poland',
      cities: {
        Warsaw: {
          city: 'Warsaw',
          lat: 52.2297,
          lng: 21.0122,
          totalCount: 6,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Portugal',
    {
      country: 'Portugal',
      cities: {
        Lisbon: {
          city: 'Lisbon',
          lat: 38.7169,
          lng: -9.1399,
          totalCount: 4,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Romania',
    {
      country: 'Romania',
      cities: {
        Bucharest: {
          city: 'Bucharest',
          lat: 44.4268,
          lng: 26.1025,
          totalCount: 7,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Slovakia',
    {
      country: 'Slovakia',
      cities: {
        Bratislava: {
          city: 'Bratislava',
          lat: 48.1486,
          lng: 17.1077,
          totalCount: 5,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Slovenia',
    {
      country: 'Slovenia',
      cities: {
        Ljubljana: {
          city: 'Ljubljana',
          lat: 46.0569,
          lng: 14.5058,
          totalCount: 2,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Spain',
    {
      country: 'Spain',
      cities: {
        Madrid: {
          city: 'Madrid',
          lat: 40.4168,
          lng: -3.7038,
          totalCount: 9,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
  [
    'Sweden',
    {
      country: 'Sweden',
      cities: {
        Stockholm: {
          city: 'Stockholm',
          lat: 59.3293,
          lng: 18.0686,
          totalCount: 3,
          meetings: [],
        },
      },
      meetingCount: 1,
    },
  ],
]);

export default MOCK_COUNTRY_MEETING_MAP;
