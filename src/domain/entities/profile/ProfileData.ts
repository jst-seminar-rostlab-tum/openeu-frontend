export interface ProfileData {
  id: string;
  name: string;
  surname: string;
  email: string;
  password?: string; // Optional since we might not always need it after registration

  // Enhanced personalization fields
  userCategory: 'entrepreneur' | 'politician';

  // Entrepreneur-specific fields (required for entrepreneurs)
  userType?:
    | 'founder'
    | 'startup_employee'
    | 'consultant'
    | 'investor'
    | 'other';
  companyName?: string;
  companyDescription?: string;
  companyStage?:
    | 'idea'
    | 'pre_seed'
    | 'seed'
    | 'series_a'
    | 'series_b'
    | 'growth'
    | 'established';
  companySize?: '1' | '2-10' | '11-50' | '51-200' | '200+';
  primaryIndustry?: string;
  businessModel?:
    | 'b2b'
    | 'b2c'
    | 'b2b2c'
    | 'marketplace'
    | 'saas'
    | 'hardware'
    | 'other';
  regulatoryComplexity?: 'low' | 'medium' | 'high';

  // Politician-specific fields (required for politicians)
  politicalRole?:
    | 'mep'
    | 'national_mp'
    | 'local_representative'
    | 'policy_advisor'
    | 'civil_servant'
    | 'other';
  institution?: string;
  politicalParty?: string;
  areaOfExpertise?: string[];

  // Common focus area fields (required for all users)
  topicList: string[];
  geographicFocus: string[];
  keyRegulatoryAreas: string[];

  // Completion preferences (required for all users)
  newsletterFrequency: 'daily' | 'weekly' | 'none';

  // System fields
  onboardingCompleted: boolean;
}
