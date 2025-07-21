'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Profile } from '@/domain/entities/profile/generated-types';
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

export async function getProfile(profileId: string): Promise<Profile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${API_BASE_URL}/profile/${profileId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return null;
  }
  return await res.json();
}
