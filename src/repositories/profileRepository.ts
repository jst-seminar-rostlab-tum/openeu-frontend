import { ProfileData } from '@/domain/entities/profile/generated-types';

const API_URL = 'https://openeu-backend-1.onrender.com/profile';
const API_URL_LOCAL = 'http://localhost:3000/profile';

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
          subscribed_newsletter: profileData.subscribed_newsletter,
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
  async getProfile(profileId?: string): Promise<ProfileData | false> {
    if (!profileId) return false;
    try {
      const res = await fetch(`${API_URL_LOCAL}/${profileId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to get profile');
      }
      return await res.json();
    } catch {
      return false;
    }
  },
};
