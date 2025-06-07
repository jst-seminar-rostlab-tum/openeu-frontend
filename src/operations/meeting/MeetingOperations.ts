import { getCurrentMonthRange } from '@/app/dateRange';
import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
const { now } = getCurrentMonthRange();

const startRange = new Date(now);
startRange.setDate(now.getDate() - 30);
const endRange = new Date(now);
endRange.setDate(now.getDate() + 30);

export const COLORS = ['blue', 'green', 'red', 'orange', 'purple', 'yellow'];

export const dummyMeetings: MeetingData[] = [
  {
    meeting_id: '1',
    title: 'Nordic Digital Payments & FinTech Policy Roundtable',
    meeting_url: '',
    meeting_start_datetime: '2025-06-02T14:30:00.000Z',
    meeting_end_datetime: '2025-06-06T15:30:00.000Z',
    location: 'Swedish Parliament, Stockholm',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'Stakeholders debate interoperable payment systems and regulatory sandboxes across Nordic economies.',
    tags: ['FinTech', 'DigitalPayments', 'NordicPolicy'],
    source_table: 'ep_meetings',
  },
  {
    meeting_id: '2',
    title: 'European Digital Markets & AI Regulation Forum',
    meeting_url: '',
    meeting_start_datetime: '2025-06-03T14:30:00.000Z',
    meeting_end_datetime: '2025-06-03T15:30:00.000Z',
    location: 'Bundestag Conference Center, Berlin',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'MEPs and tech leaders align on antitrust and ethical AI development within the EU.',
    tags: [
      'ArtificialIntelligence',
      'DigitalMarket',
      'TechRegulation',
      'EU Policy',
    ],
    source_table: 'mep_meetings',
  },
  {
    meeting_id: '3',
    title: 'Circular Economy & Packaging Reform Conference',
    meeting_url: '',
    meeting_start_datetime: '2025-06-03T14:30:00.000Z',
    meeting_end_datetime: '2025-06-03T15:30:00.000Z',
    location: 'RAI Amsterdam Convention Centre, Amsterdam, Netherlands',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'Legislators review proposals to cut single-use plastics and improve recyclability in consumer goods.',
    tags: ['CircularEconomy', 'Sustainability', 'WasteManagement', 'Packaging'],
    source_table: 'austrian_parliament_meetings',
  },
  {
    meeting_id: '4',
    title: 'Southern Europe Green Hydrogen Investment Dialogue',
    meeting_url: '',
    meeting_start_datetime: '2025-06-04T16:00:00.000Z',
    meeting_end_datetime: '2025-06-04T17:00:00.000Z',
    location: 'Palacio de Congresos, Madrid, Spain',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'National energy ministers discuss cross-border funding for hydrogen infrastructure in the Mediterranean.',
    tags: [
      'CleanEnergy',
      'SouthernEurope',
      'EnergyTransition',
      'GreenHydrogen',
    ],
    source_table: 'spanish_commission_meetings',
  },
  {
    meeting_id: '5',
    title: 'Packaging Innovation & Waste Reduction Workshop',
    meeting_url: 'https://zoom.us/j/987654321',
    meeting_start_datetime: '2025-06-04T10:00:00.000Z',
    meeting_end_datetime: '2025-06-04T11:00:00.000Z',
    location: 'Spain',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'Startups and policymakers explore smart labeling and compostable materials under new EU waste directives.',
    tags: ['Innovation', 'Sustainability', 'Packaging', 'WasteReduction'],
    source_table: 'ipex_events',
  },
  {
    meeting_id: '6',
    title: 'European Fashion & Sustainability Dialogue',
    meeting_url: '',
    meeting_start_datetime: '2025-06-05T09:00:00.000Z',
    meeting_end_datetime: '2025-06-06T10:30:00.000Z',
    location: 'Palazzo delle Stelline, Milan, Italy',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'Lawmakers and fashion executives debate eco-labelling, labor ethics, and textile recycling standards.',
    tags: ['Sustainability', 'Fashion', 'EthicalProduction', 'Recycling'],
    source_table: 'belgian_parliament_meetings',
  },
  {
    meeting_id: '7',
    title: 'Eastern European Energy Security & Grid Modernization Summit',
    meeting_url: 'https://meet.google.com/xyz-abc-def',
    meeting_start_datetime: '2025-06-05T13:00:00.000Z',
    meeting_end_datetime: '2025-06-05T14:00:00.000Z',
    location: 'Google Meet',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'Regional leaders strategize on diversifying supply chains and upgrading post-Soviet electrical grids.',
    tags: [
      'EnergySecurity',
      'Infrastructure',
      'EasternEurope',
      'GridModernization',
    ],
    source_table: 'polish_presidency_meeting',
  },
  {
    meeting_id: '8',
    title: 'Arctic Energy Transition & Climate Impact Briefing',
    meeting_url: 'https://zoom.us/j/555555555',
    meeting_start_datetime: '2025-06-05T15:00:00.000Z',
    meeting_end_datetime: '2025-06-05T16:30:00.000Z',
    location: 'Zoom',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'Nordic MPs and scientists assess the trade-offs of Arctic resource extraction under climate commitments.',
    tags: [
      'ClimateChange',
      'EnergyTransition',
      'ArcticPolicy',
      'Sustainability',
    ],
    source_table: 'mec_summit_ministerial_meeting',
  },
  {
    meeting_id: '9',
    title: 'Baltic Digital Infrastructure & Cyber Resilience Forum',
    meeting_url: 'https://teams.microsoft.com/l/meetup-join/456',
    meeting_start_datetime: '2025-06-31T11:00:00.000Z',
    meeting_end_datetime: '2025-06-31T12:30:00.000Z',
    location: 'Microsoft Teams',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'Baltic states collaborate on 5G deployment, digital sovereignty, and regional cybersecurity strategies.',
    tags: ['CyberSecurity', 'DigitalInfrastructure', 'BalticRegion', '5G'],
    source_table: 'mec_prep_bodies_meeting',
  },
  {
    meeting_id: '10',
    title: 'Alpine Biodiversity & Eco-Tourism Governance Dialogue',
    meeting_url: 'https://zoom.us/j/333333333',
    meeting_start_datetime: '2025-06-19T14:00:00.000Z',
    meeting_end_datetime: '2025-06-19T15:30:00.000Z',
    location: 'Zoom',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'Lawmakers and NGOs coordinate conservation efforts with sustainable tourism in fragile Alpine zones.',
    tags: [
      'Biodiversity',
      'SustainableTourism',
      'ClimatePolicy',
      'AlpineRegion',
    ],
    source_table: 'weekly_agenda',
  },
  {
    meeting_id: '11',
    title: 'Western Europe Smart Mobility & Urban Transport Summit',
    meeting_url: 'https://meet.google.com/def-ghi-jkl',
    meeting_start_datetime: '2025-06-20T09:30:00.000Z',
    meeting_end_datetime: '2025-06-20T10:30:00.000Z',
    location: 'Google Meet',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    description:
      'City planners and ministers explore e-mobility, traffic decarbonization, and next-gen urban transport models.',
    tags: [
      'SmartMobility',
      'UrbanTransport',
      'Sustainability',
      'WesternEurope',
      'CleanTech',
    ],
    source_table: 'ep_meetings',
  },
];
