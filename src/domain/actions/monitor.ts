'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import {
  LegislativeFile,
  LegislativeFileParams,
  LegislativeFileResponse,
  LegislativeMeeting,
  LegislativeMeetingsParams,
  LegislativeMeetingsResponse,
} from '@/domain/entities/monitor/generated-types';
import { requireAuth } from '@/lib/dal';
import { createClient } from '@/lib/supabase/server';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/legislative-file`;
const MEETINGS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/legislative-files/meetings`;

export async function getLegislativeFile(
  params: LegislativeFileParams,
): Promise<LegislativeFile> {
  try {
    const token = (await cookies()).get('token')?.value;

    const searchParams = new URLSearchParams({
      id: params.id,
      ...(params.user_id && { user_id: params.user_id }),
    });

    const res = await fetch(`${API_URL}?${searchParams}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      ToastOperations.showError({
        title: 'Error fetching legislation',
        message: `Failed to fetch legislation: ${res.status} ${res.statusText}`,
      });

      throw new Error(
        `Failed to fetch legislative file: ${res.status} ${res.statusText} - ${errorText}`,
      );
    }

    const response: LegislativeFileResponse = await res.json();
    return response.legislative_file;
  } catch (error) {
    ToastOperations.showError({
      title: 'Legislation Fetch Failed',
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
    throw error;
  }
}

export async function getLegislativeMeetings(
  params: LegislativeMeetingsParams,
): Promise<LegislativeMeeting[]> {
  try {
    const token = (await cookies()).get('token')?.value;

    const searchParams = new URLSearchParams({
      legislative_id: params.legislative_id,
    });
    const res = await fetch(`${MEETINGS_API_URL}?${searchParams}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      ToastOperations.showError({
        title: 'Error fetching meetings',
        message: `Failed to fetch meetings: ${res.status} ${res.statusText}`,
      });

      throw new Error(
        `Failed to fetch legislative meetings: ${res.status} ${res.statusText} - ${errorText}`,
      );
    }

    const response: LegislativeMeetingsResponse = await res.json();
    return response.data;
  } catch (error) {
    ToastOperations.showError({
      title: 'Meetings Fetch Failed',
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
    throw error;
  }
}

export async function subscribeToLegislation(
  legislationId: string,
): Promise<void> {
  const supabase = await createClient();
  const { user } = await requireAuth();

  const { error } = await supabase
    .from('subscriptions')
    .insert({ user_id: user.id, legislation_id: legislationId });

  if (error) {
    throw new Error(`Failed to subscribe to legislation: ${error.message}`);
  }

  revalidatePath(`/monitor/${encodeURIComponent(legislationId)}`);
}

export async function unsubscribeFromLegislation(
  legislationId: string,
): Promise<void> {
  const supabase = await createClient();
  const { user } = await requireAuth();

  const { data, error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('user_id', user.id)
    .eq('legislation_id', legislationId)
    .select();

  if (error) {
    throw new Error(`Failed to unsubscribe from legislation: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error('Subscription not found');
  }

  revalidatePath(`/monitor/${encodeURIComponent(legislationId)}`);
}
