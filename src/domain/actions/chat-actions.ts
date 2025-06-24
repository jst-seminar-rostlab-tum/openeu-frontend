'use server';

import { revalidateTag } from 'next/cache';

import { requireAuth } from '@/lib/dal';
import { ToastOperations } from '@/operations/toast/toastOperations';

import {
  CreateSessionRequest,
  CreateSessionResponse,
} from '../entities/chat/generated-types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://openeu-backend-1.onrender.com';

export async function createChatSession(
  data: Omit<CreateSessionRequest, 'user_id'>,
): Promise<CreateSessionResponse> {
  try {
    // Require authentication and get user
    const { user } = await requireAuth();

    const requestData: CreateSessionRequest = {
      ...data,
      user_id: user.id, // Use real authenticated user ID
    };

    const response = await fetch(`${API_BASE_URL}/chat/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      // Get the response text for better error debugging
      const errorText = await response.text();
      ToastOperations.showError({
        title: 'API Error',
        message: `Failed to create session: ${response.status} ${response.statusText}`,
      });

      throw new Error(
        `Failed to create session: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const session = await response.json();

    // Revalidate the sessions cache
    revalidateTag(`chat-sessions-${user.id}`);

    return session;
  } catch (error) {
    ToastOperations.showError({
      title: 'Session Creation Failed',
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
    throw error;
  }
}
