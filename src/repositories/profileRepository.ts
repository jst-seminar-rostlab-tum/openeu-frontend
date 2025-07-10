import { getCookie } from 'cookies-next';

import type {
  Profile,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/profile`;

export const profileRepository = {
  async getProfile(userId: string): Promise<Profile> {
    const token = getCookie('token');

    try {
      const res = await fetch(`${API_URL}/${userId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to get profile');
      }
      const data = await res.json();
      return data as Profile;
    } catch {
      throw new Error('Failed to get profile');
    }
  },
  updateProfile: async (userId: string, data: ProfileUpdate) => {
    const token = getCookie('token');

    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return response.json();
  },
};
