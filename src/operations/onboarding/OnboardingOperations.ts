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

export const INDUSTRIES = [
  { value: 'fintech', label: 'FinTech' },
  { value: 'healthtech', label: 'HealthTech' },
  { value: 'edtech', label: 'EdTech' },
  { value: 'cleantech', label: 'CleanTech' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS' },
  { value: 'ai_ml', label: 'AI/ML' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'iot', label: 'IoT' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'media_entertainment', label: 'Media & Entertainment' },
  { value: 'travel_tourism', label: 'Travel & Tourism' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'energy', label: 'Energy' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

export const COMPANY_STAGES = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'pre_seed', label: 'Pre-Seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series_a', label: 'Series A' },
  { value: 'series_b', label: 'Series B' },
  { value: 'growth', label: 'Growth' },
  { value: 'established', label: 'Established' },
];

export const COMPANY_SIZES = [
  { value: '1', label: '1 (Solo founder)' },
  { value: '2-5', label: '2-5 employees' },
  { value: '6-20', label: '6-20 employees' },
  { value: '21-50', label: '21-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '200+', label: '200+ employees' },
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
