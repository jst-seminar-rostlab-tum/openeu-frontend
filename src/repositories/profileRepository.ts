import { getCookie } from 'cookies-next';

import type { Profile } from '@/domain/entities/profile/generated-types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/profile`;

export const profileRepository = {
  async getProfile(userId: string): Promise<Profile> {
    const token = getCookie('token');

    try {
      const res = await fetch(`${API_URL}/${userId}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
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
};
