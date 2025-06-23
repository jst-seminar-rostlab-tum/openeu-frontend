import { ProfileData } from '@/domain/entities/profile/generated-types';

const API_URL = 'http://localhost:3000/profile';

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
          company_name: profileData.company_name,
          company_description: profileData.company_description,
          topic_list: profileData.topic_list,
          newsletter_frequency: profileData.newsletter_frequency,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to create profile');
      }
      return 'success';
    } catch {
      return 'error';
    }
  },
};
