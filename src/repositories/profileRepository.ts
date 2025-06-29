import type { Profile } from '@/domain/entities/profile/generated-types';
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

  async getProfile(userId: string): Promise<Profile> {
    try {
      const res = await fetch(`${API_URL}/${userId}`);
      if (!res.ok) {
        throw new Error('Failed to get profile');
      }
      const data = await res.json();
      return data as Profile;
    } catch {
      throw new Error('Failed to get profile');
    }
  },
};
