'use server';

import { redirect } from 'next/navigation';

import {
  ProfileData,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';
import { createClient } from '@/lib/supabase/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://openeu-backend-1.onrender.com';

export async function updatePassword(password: string) {
  const client = await createClient();
  return client.auth.updateUser({ password });
}

export async function linkGoogleAccount() {
  const client = await createClient();
  const { data, error } = await client.auth.linkIdentity({
    provider: 'google',
  });

  if (!data && error) {
    throw error;
  }
  redirect(data.url!);
}

export async function unlinkGoogleAccount() {
  const client = await createClient();
  // retrieve all identities linked to a user
  const { data: identities, error: identitiesError } =
    await client.auth.getUserIdentities();
  if (!identitiesError) {
    // find the google identity linked to the user
    const googleIdentity = identities.identities.find(
      (identity) => identity.provider === 'google',
    );
    if (googleIdentity) {
      // unlink the google identity from the user
      return await client.auth.unlinkIdentity(googleIdentity);
    }
  }
}

export async function createProfile(
  profileData: ProfileData,
): Promise<ProfileData> {
  const res = await fetch(`${API_BASE_URL}/profile`, {
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
  return res.json();
}

export async function getProfile(
  profileId: string,
): Promise<ProfileData | false> {
  const res = await fetch(`${API_BASE_URL}/profile/${profileId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    return false;
  }
  return await res.json();
}

export async function updateProfile(
  profileId: string,
  data: ProfileUpdate,
): Promise<ProfileData> {
  const res = await fetch(`${API_BASE_URL}/profile/${profileId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log(res);
  if (!res.ok) {
    throw new Error('Failed to get profile');
  }
  return await res.json();
}
