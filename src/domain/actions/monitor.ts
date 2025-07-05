'use server';

import { cookies } from 'next/headers';

import {
  LegislativeFile,
  LegislativeFileParams,
  LegislativeFileResponse,
} from '@/domain/entities/monitor/generated-types';
import { ToastOperations } from '@/operations/toast/toastOperations';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/legislative-file`;

export async function getLegislativeFileAction(
  params: LegislativeFileParams,
): Promise<LegislativeFile> {
  try {
    const token = (await cookies()).get('token')?.value;

    const searchParams = new URLSearchParams({ id: params.id });
    const res = await fetch(`${API_URL}?${searchParams}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
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
