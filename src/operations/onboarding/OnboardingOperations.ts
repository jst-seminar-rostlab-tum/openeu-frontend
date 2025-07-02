import { Calendar, FileText, Users } from 'lucide-react';

import { ProfileData } from '@/domain/entities/profile/ProfileData';

export interface ActionItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count: number;
  description: string;
  preview: string[];
  buttonText: string;
  insight: string;
}

export interface PoliticalRole {
  value: string;
  label: string;
}

export interface BusinessModel {
  value: string;
  label: string;
}

export const EU_COUNTRIES = [
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

export const INDUSTRIES = [
  'FinTech',
  'HealthTech',
  'EdTech',
  'CleanTech',
  'E-commerce',
  'SaaS',
  'AI/ML',
  'Blockchain',
  'IoT',
  'Cybersecurity',
  'Gaming',
  'Media & Entertainment',
  'Travel & Tourism',
  'Food & Beverage',
  'Fashion',
  'Real Estate',
  'Transportation',
  'Energy',
  'Manufacturing',
  'Other',
];

export const BUSINESS_MODELS: BusinessModel[] = [
  { value: 'b2b', label: 'B2B (Business to Business)' },
  { value: 'b2c', label: 'B2C (Business to Consumer)' },
  { value: 'b2b2c', label: 'B2B2C (Business to Business to Consumer)' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'saas', label: 'Software as a Service (SaaS)' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'other', label: 'Other' },
];

export const POLICY_AREAS = [
  'Digital Markets',
  'Data Protection & Privacy',
  'Financial Services',
  'Healthcare & Life Sciences',
  'Climate & Environment',
  'Competition Policy',
  'Consumer Protection',
  'Taxation',
  'Trade & Customs',
  'Employment & Social Affairs',
  'Energy',
  'Transportation',
  'Agriculture',
  'Education',
  'Foreign Affairs & Security',
  'Justice & Home Affairs',
  'Research & Innovation',
  'Regional Development',
  'Internal Market',
  'Other',
];

export const POLITICAL_ROLES: PoliticalRole[] = [
  { value: 'mep', label: 'Member of European Parliament (MEP)' },
  { value: 'national_mp', label: 'National Member of Parliament' },
  { value: 'local_representative', label: 'Local Representative/Councillor' },
  { value: 'policy_advisor', label: 'Policy Advisor' },
  { value: 'civil_servant', label: 'Civil Servant' },
  { value: 'other', label: 'Other' },
];

export const REGULATORY_AREAS = [
  'GDPR & Data Protection',
  'Financial Services (PSD2, MiFID)',
  'Digital Services Act (DSA)',
  'Digital Markets Act (DMA)',
  'AI Regulation',
  'Cybersecurity (NIS2)',
  'Environmental Regulations',
  'Labor & Employment Law',
  'Tax & VAT Compliance',
  'Medical Device Regulation (MDR)',
  'Consumer Protection',
  'Competition Law',
  'Intellectual Property',
  'Import/Export Regulations',
  'Industry-specific regulations',
];

export const getActionItemsForProfile = (
  profile: Partial<ProfileData>,
): ActionItem[] => {
  const userCategory = profile.userCategory;

  if (userCategory === 'politician') {
    return getPoliticianActionItems(profile);
  } else {
    return getEntrepreneurActionItems(profile);
  }
};

const getEntrepreneurActionItems = (
  profile: Partial<ProfileData>,
): ActionItem[] => {
  return [
    {
      id: 'meetings',
      icon: Calendar,
      title: 'Relevant Meetings This Week',
      count: 4,
      description: `EU meetings discussing ${profile.primaryIndustry || 'business'} regulations`,
      preview: [
        'Digital Services Committee - AI Regulation',
        'GDPR Working Group - Data Protection Updates',
        'Green Deal Committee - Sustainability Standards',
        'Single Market Committee - Cross-border Commerce',
      ],
      buttonText: 'View Calendar',
      insight: 'High priority - affects your business model directly',
    },
    {
      id: 'updates',
      icon: FileText,
      title: 'Regulatory Updates',
      count: 12,
      description: `New regulations affecting ${profile.businessModel || 'your'} businesses`,
      preview: [
        'AI Act implementation guidelines released',
        'GDPR enforcement in fintech sector',
        'Digital Services Act compliance deadline',
        'Green taxonomy reporting requirements',
      ],
      buttonText: 'Read Updates',
      insight: 'Critical updates requiring immediate attention',
    },
  ];
};

const getPoliticianActionItems = (
  profile: Partial<ProfileData>,
): ActionItem[] => {
  const policyAreas = profile.areaOfExpertise || [];

  return [
    {
      id: 'committees',
      icon: Users,
      title: 'Committee Meetings This Week',
      count: 6,
      description: `Committee sessions relevant to your expertise areas`,
      preview: [
        `${policyAreas[0] || 'Digital Markets'} Committee - Policy Review`,
        `${policyAreas[1] || 'Data Protection'} Working Group - Amendment Discussion`,
        'Inter-institutional Trilogue - Final Negotiations',
        'Stakeholder Consultation - Industry Input Session',
      ],
      buttonText: 'View Schedule',
      insight: 'Active legislation in your areas of expertise',
    },
    {
      id: 'legislation',
      icon: FileText,
      title: 'Legislative Updates',
      count: 8,
      description: `Recent developments in your policy focus areas`,
      preview: [
        'AI Act - Final text adopted by Parliament',
        'Digital Services Act - Implementation progress report',
        'Data Governance Act - Member State transposition status',
        'European Health Data Space - Committee position',
      ],
      buttonText: 'Review Legislation',
      insight: 'Key developments requiring your attention',
    },
    {
      id: 'stakeholders',
      icon: Calendar,
      title: 'Stakeholder Engagements',
      count: 5,
      description: `Scheduled meetings with industry and civil society`,
      preview: [
        'Tech Industry Association - DMA Impact Assessment',
        'Consumer Rights Organization - Platform Regulation',
        'SME Federation - Compliance Cost Analysis',
        'Academic Network - Policy Research Findings',
      ],
      buttonText: 'Manage Meetings',
      insight: 'Important voices in your policy areas',
    },
  ];
};

// Utility function to get action items count by category
export const getActionItemsCount = (profile: Partial<ProfileData>): number => {
  const actionItems = getActionItemsForProfile(profile);
  return actionItems.reduce((total, item) => total + item.count, 0);
};

// Utility function to get high priority action items
export const getHighPriorityActionItems = (
  profile: Partial<ProfileData>,
): ActionItem[] => {
  const actionItems = getActionItemsForProfile(profile);
  // For now, return items with count > 5, but this could be more sophisticated
  return actionItems.filter((item) => item.count > 5);
};
