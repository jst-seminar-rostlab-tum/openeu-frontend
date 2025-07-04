'use server';

import { LegislativeFile } from '@/domain/entities/monitor/generated-types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/legislative-files`;

export async function getLegislativeFileAction(
  id: string,
): Promise<LegislativeFile | null> {
  try {
    const res = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Server-side caching for 5 minutes
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch legislative file: ${res.status}`);
    }

    const response: LegislativeFile = await res.json();
    return response;
  } catch (err) {
    console.warn('Failed to fetch legislative file:', err);
    return null;
  }
}
