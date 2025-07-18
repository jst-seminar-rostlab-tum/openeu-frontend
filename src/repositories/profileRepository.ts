import { getCookie } from 'cookies-next';

import type {
  Profile,
  ProfileCreate,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/profile`;

export const profileRepository = {
  async getProfile(userId: string): Promise<Profile | null> {
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

      if (res.status === 404) {
        return null;
      }

      if (!res.ok) {
        throw new Error('Failed to get profile');
      }

      const data = await res.json();
      return data as Profile;
    } catch (error) {
      if (error instanceof Error && error.message !== 'Failed to get profile') {
        throw error;
      }
      throw new Error('Failed to get profile');
    }
  },
  createProfile: async (data: ProfileCreate) => {
    const token = getCookie('token');

    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
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
