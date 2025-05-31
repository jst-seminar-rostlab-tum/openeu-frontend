'use server';

import { revalidateTag } from 'next/cache';

const API_BASE_URL = 'https://openeu-backend.onrender.com';

export interface CreateSessionResult {
  session_id: number;
}

export async function createChatSession(
  title: string,
  userId: string,
): Promise<CreateSessionResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.status}`);
    }

    const data = await response.json();

    // Invalidate TanStack Query cache for user sessions
    revalidateTag('user-sessions');

    return data;
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw new Error('Failed to create chat session');
  }
}

export async function clearAllConversations(_: string): Promise<void> {
  try {
    // Implementation depends on your backend API
    // For now, just revalidate the cache
    revalidateTag('user-sessions');
  } catch (error) {
    console.error('Error clearing conversations:', error);
    throw new Error('Failed to clear conversations');
  }
}
