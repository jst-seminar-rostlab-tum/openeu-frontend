'use server';

import { revalidateTag } from 'next/cache';

import {
  ChatSession,
  CreateSessionRequest,
} from '../entities/chat/ChatSession';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://openeu-backend.onrender.com';

export async function createChatSession(
  data: CreateSessionRequest,
): Promise<ChatSession> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.statusText}`);
    }

    const session = await response.json();

    // Revalidate the sessions cache
    revalidateTag(`chat-sessions-${data.user_id}`);

    return session;
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
}
