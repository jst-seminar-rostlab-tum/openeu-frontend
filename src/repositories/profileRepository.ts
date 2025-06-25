import { ProfileData } from '@/domain/entities/profile/ProfileData';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/profile`;

export const profileRepository = {
  async createProfile(profileData: ProfileData): Promise<string> {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: profileData.id,
          name: profileData.name,
          surname: profileData.surname,
          company_name: profileData.companyName,
          company_description: profileData.companyDescription,
          topic_list: profileData.topicList,
          newsletter_frequency: profileData.newsletterFrequency,
          user_type: profileData.userType,
          company_stage: profileData.companyStage,
          company_size: profileData.companySize,
          primary_industry: profileData.primaryIndustry,
          geographic_focus: profileData.geographicFocus,
          business_model: profileData.businessModel,
          regulatory_complexity: profileData.regulatoryComplexity,
          key_regulatory_areas: profileData.keyRegulatoryAreas,
          onboarding_completed: profileData.onboardingCompleted,
        }),
      });
      if (!res.ok) {
        ToastOperations.showError({
          title: 'Error fetching profile',
          message: 'Failed to fetch profile. Please try again later.',
        });
        throw new Error('Failed to create profile');
      }
      return 'success';
    } catch {
      return 'error';
    }
  },
};
