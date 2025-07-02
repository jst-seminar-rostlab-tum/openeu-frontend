import type { Profile } from '@/domain/entities/profile/generated-types';
import { ProfileCreate } from '@/domain/entities/profile/generated-types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/profile`;

export const profileRepository = {
  async createProfile(profileData: ProfileCreate): Promise<string> {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      if (!res.ok) {
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
