export interface ProfileData {
  id: string;
  name: string;
  surname: string;
  companyName: string;
  companyDescription: string;
  topicList: string[];
  newsletterFrequency: 'daily' | 'weekly' | 'none';
  // Enhanced personalization fields
  userType:
    | 'founder'
    | 'startup_employee'
    | 'consultant'
    | 'investor'
    | 'other';
  companyStage:
    | 'idea'
    | 'pre_seed'
    | 'seed'
    | 'series_a'
    | 'series_b'
    | 'growth'
    | 'established';
  companySize: '1' | '2-10' | '11-50' | '51-200' | '200+';
  primaryIndustry: string;
  geographicFocus: string[];
  businessModel:
    | 'b2b'
    | 'b2c'
    | 'b2b2c'
    | 'marketplace'
    | 'saas'
    | 'hardware'
    | 'other';
  regulatoryComplexity: 'low' | 'medium' | 'high';
  keyRegulatoryAreas: string[];
  onboardingCompleted: boolean;
}
